"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "@/components/UiProvider";
import BrandMark from "@/components/BrandMark";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { scrollToId } from "@/lib/scroll";
import { frOnlyPaths, localizedHref, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";

const SECTION_IDS = ["work", "live", "machine", "approach", "about", "contact"] as const;
type SectionId = (typeof SECTION_IDS)[number];

export default function SiteHeader({
  dict,
  banner,
  locale,
  home,
}: {
  dict: Dictionary["nav"];
  banner: Dictionary["agentBanner"];
  locale: Locale;
  home: string;
}) {
  const { agentView, toggleAgentView, setPaletteOpen } = useUi();
  const pathname = usePathname();
  const [active, setActive] = useState<SectionId | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useFocusTrap(menuOpen, menuRef);

  const onHome = pathname === home || pathname === `${home}/`;

  // Lien vers la même page dans l'autre locale.
  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const basePath = pathname.replace(/^\/en(?=\/|$)/, "") || "/";
  const frOnly = frOnlyPaths.includes(basePath);
  const switchHref = localizedHref(otherLocale, frOnly ? "/" : basePath) || "/";

  const hrefFor = (id: SectionId) => (onHome ? `#${id}` : `${home === "/" ? "/" : home}#${id}`);

  const onNavClick = (e: React.MouseEvent, id: SectionId) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToId(id);
  };

  /* scroll-spy */
  useEffect(() => {
    if (!onHome) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id as SectionId);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [onHome, pathname]);

  /* menu mobile */
  const closeMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("mm-open");
  };
  const toggleMenu = () => {
    setMenuOpen((open) => {
      document.body.classList.toggle("mm-open", !open);
      return !open;
    });
  };
  useEffect(() => {
    if (!menuOpen) return;
    menuRef.current?.querySelector<HTMLElement>("a,button")?.focus();
  }, [menuOpen]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("mm-open");
    };
  }, []);

  return (
    <>
      {/* Hors accueil, #work n'existe pas : le lien d'évitement vise <main id="top">. */}
      <a className="skip" href={onHome ? "#work" : "#top"}>
        {dict.skip}
      </a>

      <header className="nav" data-tag="site.header">
        <div className="nav__in">
          <Link className="brand" href={home} aria-label={dict.homeAria}>
            <span className="brand__m" aria-hidden="true">
              <BrandMark />
            </span>
            <span>
              Louis Rotellini<small>{dict.brandRole}</small>
            </span>
          </Link>
          <nav className="nav__links" aria-label="Sections">
            {SECTION_IDS.map((id) => (
              <a
                key={id}
                className={`nav__link${active === id ? " is-active" : ""}`}
                href={hrefFor(id)}
                onClick={(e) => onNavClick(e, id)}
              >
                {dict.links[id]}
              </a>
            ))}
            <Link className="nav__link" href={switchHref} aria-label={dict.switchAria} rel={frOnly ? undefined : "alternate"}>
              {dict.switchLabel}
            </Link>
          </nav>
          <button className="agentbtn" onClick={toggleAgentView} aria-label={dict.agentAria} aria-pressed={agentView}>
            <span className="mono">◫</span>{" "}
            <span className="agentbtn__l">{agentView ? dict.agentQuit : dict.agentView}</span>
          </button>
          <button className="cmdk" onClick={() => setPaletteOpen(true)} aria-label={dict.paletteAria}>
            <span className="mono">⌕</span> <kbd>⌘K</kbd>
          </button>
          <button
            className="menu-btn"
            onClick={toggleMenu}
            aria-label={dict.menuAria}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className="agent-banner">
        <span className="mono">◫</span> <b>{banner.title}</b> {banner.text}
        <button onClick={toggleAgentView}>{banner.exit}</button>
      </div>

      <div ref={menuRef} className={`mobile-menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
        <nav className="mm__nav" aria-label={dict.mobileNav}>
          {SECTION_IDS.map((id) => (
            <a
              key={id}
              href={hrefFor(id)}
              onClick={(e) => {
                closeMenu();
                onNavClick(e, id);
              }}
            >
              {dict.links[id]}
            </a>
          ))}
        </nav>
        <div className="mm__foot">
          <button
            onClick={() => {
              closeMenu();
              toggleAgentView();
            }}
          >
            <span className="mono">◫</span> {dict.agentView}
          </button>
          <button
            onClick={() => {
              closeMenu();
              setPaletteOpen(true);
            }}
          >
            <span className="mono">⌕</span> {dict.search}
          </button>
          <Link href={switchHref} onClick={closeMenu} aria-label={dict.switchAria}>
            {dict.switchLabel}
          </Link>
          <Link href={localizedHref(locale, "/mentions-legales")} onClick={closeMenu}>
            {dict.legal}
          </Link>
        </div>
      </div>
    </>
  );
}
