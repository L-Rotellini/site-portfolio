"use client";

import { useEffect, useRef, useState } from "react";

// Le numéro n'est ni dans le HTML servi ni en clair dans le bundle : il est assemblé au clic,
// comme dans le prototype (docs/refonte/prototype/Maintenance.html). Seule la page
// /mentions-legales l'affiche en clair, par obligation légale.
function assemble() {
  const d = ["27", "27", "67", "51", "60"].reverse().map((x) => x.split("").reverse().join(""));
  return { href: "tel:+33" + d.join("").slice(1), label: d.join(" ") };
}

export default function PhoneButton() {
  const [phone, setPhone] = useState<{ href: string; label: string } | null>(null);
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (phone) link.current?.focus();
  }, [phone]);

  if (phone) {
    return (
      <a ref={link} className="bigtel" href={phone.href}>
        {phone.label}
      </a>
    );
  }
  return (
    <button type="button" className="btn btn--ghost" onClick={() => setPhone(assemble())}>
      Afficher mon numéro de téléphone
    </button>
  );
}
