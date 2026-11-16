import Image from "next/image";
import Link from "next/link";

// En-tête et pied de page communs. Chaque page passe ses liens, repris du prototype.

export function Header({
  brandHref,
  brandLabel,
  children,
}: {
  brandHref: string;
  brandLabel: string;
  children: React.ReactNode;
}) {
  return (
    <header className="top">
      <div className="wrap top__in">
        <Link className="brand" href={brandHref} aria-label={brandLabel}>
          <Image src="/icon.svg" alt="" width={40} height={40} unoptimized priority />
          <span>Louis Rotellini</span>
        </Link>
        <nav className="nav" aria-label="Navigation principale">
          {children}
        </nav>
      </div>
    </header>
  );
}

export function Footer({ links }: { links: { href: string; label: string }[] }) {
  return (
    <footer>
      <div className="wrap foot">
        <span>© 2026 Louis Rotellini, entrepreneur individuel à Lille</span>
        <nav aria-label="Pied de page">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
