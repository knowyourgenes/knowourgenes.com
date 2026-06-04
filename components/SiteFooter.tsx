import Link from "next/link";
import type { HomepageContent } from "../sanity/fetch";
import { LogoMark } from "./Icons";

export default function SiteFooter({ content }: { content: HomepageContent }) {
  return (
    <footer className="footer section">
      <div className="container footer__inner">
        <div className="brand">
          <span className="brand__mark">
            <LogoMark size={20} />
          </span>
          <span className="brand__text">
            <span className="brand__name" style={{ color: "#fff" }}>
              {content.brandName}
              <span style={{ color: "var(--emerald-soft)" }}>
                {content.brandTld}
              </span>
            </span>
            <span
              className="brand__tag"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {content.tagline}
            </span>
          </span>
        </div>

        {content.missionLine ? (
          <p className="footer__mission">{content.missionLine}</p>
        ) : null}

        <div className="footer__row">
          <nav className="footer__links">
            {(content.footerLinks ?? []).map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className="footer__link"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/studio" className="footer__link">
              Studio
            </Link>
          </nav>
          <span className="footer__copy">{content.footerCopy}</span>
        </div>
      </div>
    </footer>
  );
}
