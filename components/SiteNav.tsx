"use client";

import Link from "next/link";
import { useState } from "react";
import type { HomepageContent } from "../sanity/fetch";
import { LogoMark, Menu, Close, ArrowRight } from "./Icons";

export default function SiteNav({ content }: { content: HomepageContent }) {
  const [open, setOpen] = useState(false);
  const links = content.navLinks ?? [];

  return (
    <header className="nav section">
      <div className="container nav__inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">
            <LogoMark size={22} />
          </span>
          <span className="brand__text">
            <span className="brand__name">
              {content.brandName}
              <span>{content.brandTld}</span>
            </span>
            <span className="brand__tag">{content.tagline}</span>
          </span>
        </Link>

        <nav className="nav__links">
          {links.map((l) => (
            <Link key={l.href + l.label} href={l.href} className="nav__link">
              {l.label}
            </Link>
          ))}
          {content.navCtaLabel ? (
            <Link
              href={content.navCtaHref || "/a-z"}
              className="btn btn--primary nav__cta"
            >
              {content.navCtaLabel}
              <ArrowRight size={14} />
            </Link>
          ) : null}
        </nav>

        <button
          className="nav__burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="nav__drawer">
          <div className="container nav__drawer-inner">
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="nav__drawer-link"
                onClick={() => setOpen(false)}
              >
                {l.label}
                <ArrowRight size={15} />
              </Link>
            ))}
            {content.navCtaLabel ? (
              <Link
                href={content.navCtaHref || "/a-z"}
                className="btn btn--primary nav__drawer-cta"
                onClick={() => setOpen(false)}
              >
                {content.navCtaLabel}
                <ArrowRight size={14} />
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
