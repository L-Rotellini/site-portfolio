#!/usr/bin/env bash
# Hook PreToolUse de Claude Code (.claude/settings.json) : une PR ne s'ouvre pas sans trace de
# /code-review et de /security-review dans sa description.
#
# Entrée : le JSON du hook sur stdin. Créations contrôlées et texte lu :
#   - outil Bash ou PowerShell (tool_input.command) :
#       gh pr create : la commande, plus le fichier passé à --body-file ou -F s'il existe ;
#       gh api vers un chemin qui finit par /pulls, en POST (-X POST, --method POST, ou champs
#       -f/-F/--field/--raw-field/--input sans méthode GET) : la commande, plus le fichier passé à
#       --input s'il existe ;
#     chemin relatif lu depuis le champ cwd du hook ; toute autre commande sort en 0 ;
#   - outil MCP de création de PR (mcp__<serveur>__create_pull_request) : tool_input.body.
# Sortie 2 avec le motif sur stderr si l'une des deux mentions manque, sinon sortie 0 sans rien écrire.
# Sans jq ou sur JSON illisible : refus seulement si le texte brut montre une création de PR.
#
# Les filtres "if" de settings.json ne laissent arriver ici que gh pr create et gh api ; le script refait
# le tri lui-même, au cas où un filtre ne serait pas appliqué. Écrit pour bash 3.2 (macOS) et plus.

set -u

readonly MOTIF="PR refusée : passe /code-review et /security-review, puis note leur résultat dans la description (une PR sans code peut écrire « /code-review : sans objet, documentation seule » et de même pour /security-review)."

entree=$(cat)

refuser() {
	[[ $# -gt 0 ]] && printf '%s\n' "$1" >&2
	printf '%s\n' "$MOTIF" >&2
	exit 2
}

creation_pr() { # $1 : texte d'une commande ; vrai si elle contient gh pr create
	[[ "$1" =~ gh[[:space:]]+pr[[:space:]]+create ]]
}

api_cree_pr() { # $1 : un bout de commande ; vrai si c'est un gh api POST vers .../pulls
	local t=" $1 " methode
	[[ "$t" =~ gh[[:space:]]+api[[:space:]] ]] || return 1
	grep -qE "[[:space:]][\"']?[^[:space:]\"':]*/pulls[\"']?[[:space:]]" <<<"$t" || return 1
	methode=$(grep -oE -- "[[:space:]](-X[[:space:]]*=?|--method[[:space:]=]+)[\"']?[A-Za-z]+" <<<"$t" |
		tail -n 1 | grep -oE '[A-Za-z]+$' | tr '[:lower:]' '[:upper:]')
	if [[ -n "$methode" ]]; then
		[[ "$methode" == POST ]]
		return
	fi
	grep -qE -- "[[:space:]](-[fF]|--field|--raw-field|--input)" <<<"$t"
}

creation_api() { # $1 : texte d'une commande ; vrai si l'un de ses appels gh api crée une PR
	local t=$1 bout
	api_cree_pr "$t" && return 0
	t=${t//&&/$'\n'}
	t=${t//||/$'\n'}
	t=${t//;/$'\n'}
	t=${t//|/$'\n'}
	while IFS= read -r bout; do
		api_cree_pr "$bout" && return 0
	done <<<"$t"
	return 1
}

illisible() {
	# Entrée illisible : refus seulement si le texte brut montre une création de PR.
	local brut=${entree//\\\"/\"}
	brut=${brut//\\n/$'\n'}
	brut=${brut//\\t/ }
	if creation_pr "$brut" || [[ "$brut" == *create_pull_request* ]] || creation_api "$brut"; then
		refuser "$1 : la description de la PR ne peut pas être contrôlée."
	fi
	exit 0
}

command -v jq >/dev/null 2>&1 || illisible "jq introuvable"
outil=$(jq -r '.tool_name // ""' <<<"$entree" 2>/dev/null) || illisible "entrée JSON illisible"
texte=""
dossier=""
fichiers=()

ajouter_fichiers() { # $1 : expression des options (ex. --input) ; ajoute les fichiers lisibles nommés
	local valeur
	while IFS= read -r valeur; do
		valeur=$(sed -E "s/^$1//; s/^=//; s/^[[:space:]]+//" <<<"$valeur")
		case "$valeur" in
			\"*\") valeur=${valeur:1:${#valeur}-2} ;;
			\'*\') valeur=${valeur:1:${#valeur}-2} ;;
		esac
		case "$valeur" in
			"" | -) continue ;; # « - » : le contenu vient de stdin, déjà dans la commande (heredoc).
			"~/"*) valeur="$HOME/${valeur#\~/}" ;;
		esac
		[[ "$valeur" == /* || -z "$dossier" ]] || valeur="$dossier/$valeur"
		[[ -f "$valeur" && -r "$valeur" ]] && fichiers+=("$valeur")
	done < <(grep -oE -- "[[:space:]]$1(=|[[:space:]]*)(\"[^\"]*\"|'[^']*'|[^[:space:];&|<>]+)" <<<" $texte" |
		sed -E 's/^[[:space:]]+//')
}

case "$outil" in
	Bash | PowerShell)
		texte=$(jq -r '.tool_input.command // ""' <<<"$entree")
		dossier=$(jq -r '.cwd // ""' <<<"$entree")
		pr=0
		api=0
		creation_pr "$texte" && pr=1
		creation_api "$texte" && api=1
		[[ $pr == 1 || $api == 1 ]] || exit 0
		[[ $pr == 1 ]] && ajouter_fichiers "(--body-file|-F)"
		[[ $api == 1 ]] && ajouter_fichiers "--input"
		;;
	mcp__*create_pull_request)
		texte=$(jq -r '.tool_input.body // ""' <<<"$entree")
		;;
	*)
		exit 0
		;;
esac

mentionne() {
	{
		printf '%s\n' "$texte"
		[[ ${#fichiers[@]} -gt 0 ]] && cat -- "${fichiers[@]}" 2>/dev/null
	} | grep -qF -- "$1"
}

if mentionne "/code-review" && mentionne "/security-review"; then
	exit 0
fi

refuser
