"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { GeneCard } from "../sanity/fetch";
import { SearchIcon } from "./Icons";

export default function SearchBox({
  genes,
  placeholder,
}: {
  genes: GeneCard[];
  placeholder?: string;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return genes
      .filter((g) => {
        const hay = [
          g.symbol,
          g.nickname,
          g.indexLine,
          g.oneLine,
          g.categoryTitle,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return hay.includes(term);
      })
      .slice(0, 8);
  }, [q, genes]);

  function go(slug: string) {
    setOpen(false);
    router.push(`/gene/${slug}`);
  }

  function onKey(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[active] ?? results[0];
      if (pick) go(pick.slug);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="search">
      <div className="search__field">
        <SearchIcon size={18} />
        <input
          className="search__input"
          value={q}
          placeholder={placeholder || "Search a gene…"}
          aria-label="Search genes"
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => q && setOpen(true)}
          onBlur={() => {
            blurTimer.current = setTimeout(() => setOpen(false), 120);
          }}
          onKeyDown={onKey}
        />
        <button
          className="btn btn--primary search__go"
          onClick={() => {
            const pick = results[active] ?? results[0];
            if (pick) go(pick.slug);
          }}
        >
          Search
        </button>
      </div>

      {open && q.trim() ? (
        <div
          className="search__results"
          onMouseDown={() => {
            if (blurTimer.current) clearTimeout(blurTimer.current);
          }}
        >
          {results.length === 0 ? (
            <p className="search__empty">
              No gene matches “{q}”. Try a symbol like MTHFR or ACTN3.
            </p>
          ) : (
            results.map((g, i) => (
              <button
                key={g.slug}
                className="search__result"
                data-active={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(g.slug)}
              >
                <span className="search__result-sym">{g.symbol}</span>
                <span className="search__result-line">
                  {g.nickname ? <strong>{g.nickname}. </strong> : null}
                  {g.indexLine}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}
