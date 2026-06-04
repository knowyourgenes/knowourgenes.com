"use client";

import { useState } from "react";
import type { HomepageContent } from "../sanity/fetch";

export default function Newsletter({ content }: { content: HomepageContent }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" className="block section">
      <div className="container">
        <div className="newsletter__box">
          <h2 className="newsletter__title">{content.newsletterTitle}</h2>
          {content.newsletterBody ? (
            <p className="newsletter__body">{content.newsletterBody}</p>
          ) : null}

          {done ? (
            <p
              className="newsletter__body"
              style={{ marginTop: 22, fontWeight: 600 }}
            >
              You&apos;re on the list. One gene a week, starting soon.
            </p>
          ) : (
            <form
              className="newsletter__form"
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setDone(true);
              }}
            >
              <input
                className="newsletter__input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={content.newsletterPlaceholder || "your@email.com"}
                aria-label="Email address"
              />
              <button type="submit" className="btn newsletter__btn">
                {content.newsletterCta || "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
