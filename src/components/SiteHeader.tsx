"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUi } from "@/components/UiProvider";
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
              <svg viewBox="0 0 4374.38 3693.51" role="img">
                <path
                  fill="currentColor"
                  d="M1974.99,3547.01c169.25-347.98,250.42-699.17,231.13-1075.85-5.11-99.73,40.28-170.06,110.22-233.7l234.64-213.51c-93.29,4.21-177.19,19.7-248.8,42.05-131.64,155.81-227.66,21.26-373.21,161.42l-215.49,207.52c-200.58,188.8-429.38,330.4-703.6,379.43-29.34-9.44-61.85-19.77-75.2-32.75-16.02-15.58,12.66-72.53,30.01-88.71,259.16-83.11,485.19-217.2,687.39-395.44l161.27-205.36c34.43-43.85,97.73-71.76,160.46-96.49l-210.85-182.48c-124.68,99.68-293.08,127.91-442.46,59.56l-244.13-111.7c-11,16.22-35.68,63.37-42.58,86.69-28,94.63-111.54,159.17-210.53,121.72l-205.94-77.93c-317.85-120.27-419.1,122.36-557.34,75.21-29.27-9.98-59.39-60.49-59.99-108.14,236.18-151.08,540.31-137.82,786.17-3.79,63.23,34.47,124.18-13.49,150.7-64.44,39.45-75.77,20.76-122.9,8.31-205.45-19.68-130.49,20.63-287.49,82.64-408.31,48.67-94.82,295.89-192.88,145.02-373.24-225.65-58.17-405.18-154.24-547.92-353.65-31.84-44.48-98.56-143.74-45.04-190.87,64.29-56.62,156.32,16.1,173.01,86.16,73.83,310.01,340.88,297.18,533.24,404.37,89.12,49.66,51.43,191.96,17.4,271.75l350.12,63.76c122.82,22.37,183.31,161.18,225.52,275.87l314.39-34.27c10.46-100.09-94.15-171.06-93.79-281.76,1.95-614.09-384.42-857.7-347.09-1020.33,27.87-121.38,410.6,214.06,502.35,935.81,32.11,252.6,260.15,220.73,221.21,483.11l188.69,233.62,127.08-471.01c19.41-71.96,123.26-119.13,187.41-153.05,313.79-165.96,587.1-367,784.77-662.86,30.69,20.24,59.27,40.27,63.8,58.82,21.5,87.9-159.96,329.7-311.56,437.37-123.85,87.97-254.06,167.9-391.5,235-113.43,55.38-205.69,125.14-246.62,251.61l-84.61,261.41c64.62,7.38,101.14-17.69,135.2-59.26l199.7-243.82c33.18-40.51,128.23-52.57,181.76-53.45l308.27-5.08c469.09-7.73,625.67-314.19,726.84-265.7,27.98,13.41,35.31,86.81,23.49,128.16-246.83,199.89-561.12,279.57-883.62,249.14-201.09-22.03-369.52,73.1-459.82,252.47l4.55,61.12c1.29,17.27,53.27,17.48,73.52,17.5,202.67-101.87,419.16-96.21,630.39-24.1,222.79,67.93,416.06,197.27,522.96,406.38,82.57,161.51,34,352.59-139.72,444.37-367.98,194.4-856.72,82.04-1120.45-244.46-32.37-40.07-70.39-68.83-114.24-72.16-124.44-9.45-243.63,291.6-97.34,512.63,168.49,254.56,254.3,524.72,222.7,841.38-3.51,35.21-14.99,88.75-38.11,104.94-23.11,16.19-98.59,9.68-122.85-7.91l18.97-222.15c14.89-174.41-16.56-341.71-95.37-498.63l-164.81-328.17c-100.89-200.9,190.11-425.1,14.65-484.11l-192.2,186.41c-63.22,61.32-87.13,145.91-88.07,236.3-3.56,341.6-22.64,715.51-230.45,968.81-31.39,38.26-89.09,48.36-134.67,12.21Z"
                />
              </svg>
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
