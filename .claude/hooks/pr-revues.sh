#!/usr/bin/env bash
# Hook PreToolUse de Claude Code (.claude/settings.json) : une PR ne s'ouvre pas sans trace de
# /code-review et de /security-review dans sa description.
#
# Entrée : le JSON du hook sur stdin. Texte contrôlé :
#   - outil Bash : tool_input.command, plus le contenu du fichier passé à --body-file ou -F s'il existe
#     (chemin relatif lu depuis le champ cwd du hook) ;
#   - outil MCP de création de PR (mcp__<serveur>__create_pull_request) : tool_input.body.
# Sortie 2 avec le motif sur stderr si l'une des deux mentions manque, sinon sortie 0 sans rien écrire.
#
# Le filtre "if": "Bash(gh pr create*)" de settings.json ne laisse arriver ici que les créations de PR ;
# une commande Bash sans « gh pr create » passe tout de même, au cas où ce filtre ne serait pas appliqué.

set -u

readonly MOTIF="PR refusée : passe /code-review et /security-review, puis note leur résultat dans la description (une PR sans code peut écrire « /code-review : sans objet, documentation seule » et de même pour /security-review)."

entree=$(cat)

if ! command -v jq >/dev/null 2>&1; then
	# Sans jq, rien n'est lisible : une création de PR est refusée plutôt que laissée passer sans contrôle.
	case "$entree" in
		*"gh pr create"* | *create_pull_request*)
			printf '%s\n' "jq introuvable : la description de la PR ne peut pas être contrôlée." "$MOTIF" >&2
			exit 2
			;;
	esac
	exit 0
fi

outil=$(jq -r '.tool_name // ""' <<<"$entree" 2>/dev/null) || outil=""
texte=""
fichiers=()

case "$outil" in
	Bash)
		texte=$(jq -r '.tool_input.command // ""' <<<"$entree")
		[[ "$texte" =~ gh[[:space:]]+pr[[:space:]]+create ]] || exit 0
		dossier=$(jq -r '.cwd // ""' <<<"$entree")
		# --body-file chemin, --body-file=chemin, -F chemin, -Fchemin ; guillemets simples ou doubles.
		while IFS= read -r valeur; do
			valeur=${valeur#--body-file}
			valeur=${valeur#-F}
			valeur=${valeur#=}
			valeur=${valeur#"${valeur%%[![:space:]]*}"}
			case "$valeur" in
				\"*\") valeur=${valeur:1:${#valeur}-2} ;;
				\'*\') valeur=${valeur:1:${#valeur}-2} ;;
			esac
			case "$valeur" in
				"" | -) continue ;; # « - » : le corps vient de stdin, déjà dans la commande (heredoc).
				"~/"*) valeur="$HOME/${valeur#\~/}" ;;
			esac
			[[ "$valeur" == /* || -z "$dossier" ]] || valeur="$dossier/$valeur"
			[[ -f "$valeur" && -r "$valeur" ]] && fichiers+=("$valeur")
		done < <(grep -oE -- "[[:space:]](--body-file(=|[[:space:]]+)|-F[[:space:]]*)(\"[^\"]*\"|'[^']*'|[^[:space:];&|<>]+)" <<<" $texte" |
			sed -E 's/^[[:space:]]+//')
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
		((${#fichiers[@]})) && cat -- "${fichiers[@]}" 2>/dev/null
	} | grep -qF -- "$1"
}

if mentionne "/code-review" && mentionne "/security-review"; then
	exit 0
fi

printf '%s\n' "$MOTIF" >&2
exit 2
