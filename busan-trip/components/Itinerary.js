"use client";

import { useEffect, useState } from "react";
import { days } from "../app/data";

export default function Itinerary() {
  const [active, setActive] = useState(days[0].n);
  const [open, setOpen] = useState({});

  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/day-(\d+)/);
      if (m && days.some((d) => d.n === m[1])) setActive(m[1]);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  const day = days.find((d) => d.n === active) || days[0];
  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }));

  const selectDay = (n) => {
    setActive(n);
    if (history.replaceState) history.replaceState(null, "", `#day-${n}`);
  };

  return (
    <div className="itin">
      <div className="daytabs" role="tablist">
        {days.map((d) => (
          <button
            key={d.n}
            role="tab"
            aria-selected={active === d.n}
            className={`daytab ${active === d.n ? "is-active" : ""}`}
            onClick={() => selectDay(d.n)}
          >
            <strong>Day {d.n}</strong>
            <span>{d.label}</span>
          </button>
        ))}
      </div>

      <div className="day" key={day.n}>
        <div className="day__head">
          <div className="day__meta">
            <span className="day__label">{day.label}</span>
            <h3 className="day__title">{day.title}</h3>
            <p className="day__summary">{day.summary}</p>
          </div>
        </div>

        <ol className="timeline">
          {day.items.map((item, i) => {
            const key = `${day.n}-${i}`;
            const isOpen = !!open[key];
            return (
              <li className={`tl ${isOpen ? "is-open" : ""}`} key={key}>
                <div className="tl__rail" aria-hidden="true">
                  <span className="tl__dot" />
                </div>
                <button
                  className="tl__head"
                  onClick={() => toggle(key)}
                  aria-expanded={isOpen}
                >
                  <span className="tl__time">{item.time}</span>
                  <span className="tl__heading">
                    <span className="tl__title">{item.title}</span>
                    <span className="tl__place-mini">{item.place}</span>
                  </span>
                  <span className="tl__chev" aria-hidden="true">
                    ⌄
                  </span>
                </button>
                <div className="tl__panel">
                  <div className="tl__panel-in">
                    <p className="tl__desc">{item.desc}</p>
                    <div className="tl__tags">
                      {item.tags.map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      className="tl__map"
                      href={item.map}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="tl__pin" aria-hidden="true" />
                      지도에서 보기
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
