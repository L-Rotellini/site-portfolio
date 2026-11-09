"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFocusTrap } from "@/lib/useFocusTrap";
import type { Product, ProductStatus } from "@/data/products";
import type { Dictionary } from "@/i18n/dictionaries/fr";

const STATUS_DOT: Record<ProductStatus, string> = {
  shipped: "var(--ok)",
  prototype: "var(--warn)",
  concept: "var(--muted)",
};

type Filter = "all" | ProductStatus;
const FILTERS: Filter[] = ["all", "shipped", "prototype"];

export default function WorkSection({
  dict,
  products,
}: {
  dict: Dictionary["work"];
  products: Product[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);

  const rows = products.filter((p) => filter === "all" || p.status === filter);
  const open = openId ? products.find((p) => p.id === openId) : undefined;

  useFocusTrap(!!open, drawerRef);

  const openDrawer = (id: string) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setOpenId(id);
  };
  const closeDrawer = () => {
    setOpenId(null);
    lastFocus.current?.focus();
  };

  useEffect(() => {
    if (open) closeBtn.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openId) closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <section className="section" id="work" data-tag="section#work">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>
              <span className="n">{dict.num}</span> / {dict.label}
            </div>
            <h2>{dict.title}</h2>
          </div>
          <p>{dict.intro}</p>
        </div>

        <div className="filters reveal">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`fbtn${filter === f ? " is-on" : ""}`}
              onClick={() => setFilter(f)}
            >
              {dict.filters[f]}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {rows.map((p, i) => (
            <button
              key={p.id}
              className="card reveal"
              data-tag="work.item"
              style={{ "--d": `${i * 40}ms` } as React.CSSProperties}
              aria-label={`${dict.cardOpenAria} ${p.name}`}
              onClick={() => openDrawer(p.id)}
            >
              <span className="card__media">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </span>
              <span className="card__top">
                <span className="card__status">
                  <span className="card__dot" style={{ background: STATUS_DOT[p.status] }}></span>
                  {p.statusLabel}
                </span>
                <span className="card__domain mono">{p.domain}</span>
              </span>
              <span className="card__name">{p.name}</span>
              <span className="card__one">{p.one}</span>
              {p.kpi ? (
                <span className="card__kpi mono">{p.kpi}</span>
              ) : (
                <span className="card__kpi card__kpi--note mono">{p.focus ?? p.metric}</span>
              )}
              <span className="card__foot">
                <span className="card__stack">
                  {p.stack.map((s) => (
                    <span key={s} className="chip mono">
                      {s.toLowerCase()}
                    </span>
                  ))}
                </span>
                <span className="card__go mono">{p.live ? dict.cardSee : dict.cardDetail}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Drawer produit */}
      <div className={`backdrop${open ? " is-open" : ""}`} onClick={closeDrawer}></div>
      <aside
        ref={drawerRef}
        className={`drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
        // Fermé, le tiroir reste dans le DOM hors écran : inert retire son bouton de la tabulation.
        inert={!open}
        aria-label={dict.drawer.ariaLabel}
      >
        <div className="drawer__bar">
          <span>{dict.drawer.sheet}</span>
          <button
            ref={closeBtn}
            className="drawer__close"
            onClick={closeDrawer}
            aria-label={dict.drawer.close}
          >
            ✕
          </button>
        </div>
        {open && (
          <div className="drawer__body">
            <div className="dr__meta">
              <span className="dr__status">
                <span className="card__dot" style={{ background: STATUS_DOT[open.status] }}></span>
                {open.statusLabel}
              </span>
              <span className="mono dr__domain">{open.domain}</span>
            </div>
            <h2 className="dr__name">{open.name}</h2>
            <p className="dr__one">{open.one}</p>
            <div className="dr__metric mono">{open.metric}</div>
            <div className="dr__media">
              <Image src={open.image.src} alt={open.image.alt} fill sizes="540px" />
            </div>
            <dl className="dr__rows">
              <div>
                <dt className="mono">{dict.drawer.problem}</dt>
                <dd>{open.problem}</dd>
              </div>
              <div>
                <dt className="mono">{dict.drawer.approach}</dt>
                <dd>{open.approach}</dd>
              </div>
              <div>
                <dt className="mono">{dict.drawer.angle}</dt>
                <dd>{open.outcome}</dd>
              </div>
              {open.ops && (
                <div>
                  <dt className="mono">{dict.drawer.ops}</dt>
                  <dd>{open.ops}</dd>
                </div>
              )}
              {open.kpi && (
                <div>
                  <dt className="mono">{dict.drawer.metric}</dt>
                  <dd>{open.kpi}</dd>
                </div>
              )}
            </dl>
            <div className="dr__stack">
              {open.stack.map((s) => (
                <span key={s} className="chip mono">
                  {s.toLowerCase()}
                </span>
              ))}
            </div>
            {open.live && open.url ? (
              <a className="dr__cta" href={open.url} target="_blank" rel="noopener noreferrer">
                {dict.drawer.open} {open.url.replace("https://", "")} <span className="mono">↗</span>
              </a>
            ) : (
              <span className="dr__nolive mono">{dict.drawer.noLive}</span>
            )}
          </div>
        )}
      </aside>
    </section>
  );
}
