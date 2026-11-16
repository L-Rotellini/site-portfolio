import Image from "next/image";

// Logos SVG : servis tels quels ; largeur et hauteur au ratio du viewBox, la taille affichée
// vient de site.css (hauteur fixe, largeur automatique).
const LOGOS = {
  decathlon: { alt: "Decathlon", w: 1985.61 },
  damart: { alt: "Damart", w: 1849.77 },
  blancheporte: { alt: "Blancheporte", w: 1642.23 },
  promod: { alt: "Promod", w: 2009.17 },
  "credit-mutuel": { alt: "Crédit Mutuel", w: 2101.79 },
  "la-foir-fouille": { alt: "La Foir'Fouille", w: 981.42 },
  "tape-a-loeil": { alt: "Tape à l'Œil", w: 551.51 },
  "disneyland-paris": { alt: "Disneyland Paris", w: 1062.15 },
} as const;

export function Logo({ name, className }: { name: keyof typeof LOGOS; className?: string }) {
  const { alt, w } = LOGOS[name];
  return (
    <Image
      className={className}
      src={`/logos/${name}.svg`}
      alt={alt}
      width={Math.round(w)}
      height={300}
      unoptimized
      loading="eager"
    />
  );
}

// Captures des réalisations (.page__shot) : dimensions des fichiers de public/.
const SHOTS = {
  "/travaux/damart-be-fetes-fr.jpg": [1280, 800],
  "/travaux/decathlon-rappels-produits.jpg": [800, 556],
  "/travaux/damart-services-livraison.jpg": [960, 1275],
  "/travaux/damart-guide-tailles.png": [1280, 2320],
  "/projects/doctap-desktop.jpg": [3142, 2384],
  "/projects/relancia-desktop.jpg": [2694, 2384],
  "/projects/horizon-desktop.jpg": [2418, 1792],
  "/projects/assistant-tri-offres-desktop.jpg": [2616, 1661],
} as const;

export function Shot({ src, alt }: { src: keyof typeof SHOTS; alt: string }) {
  const [width, height] = SHOTS[src];
  return (
    <div className="page__shot">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 200px, 270px"
      />
    </div>
  );
}

export function TextShot({ label }: { label: string }) {
  return (
    <div className="page__shot page__shot--txt" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}

// Carte du premier écran : portrait, nom, rôle et bouton de contact.
export function Card({ role, cta }: { role: string; cta: string }) {
  return (
    <div className="card">
      <Image
        src="/louis-rotellini.jpg"
        alt="Portrait de Louis Rotellini"
        width={640}
        height={640}
        sizes="(max-width: 820px) 120px, 340px"
        priority
      />
      <div className="card__txt">
        <strong>Louis Rotellini</strong>
        <span>{role}</span>
      </div>
      <a className="btn btn--full" href="#contact">
        {cta}
      </a>
    </div>
  );
}
