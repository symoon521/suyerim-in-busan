"use client";

import { useEffect, useMemo, useState } from "react";
import { checklist } from "../app/data";

const KEY = "busan-trip-checklist";

export default function Checklist() {
  const allItems = useMemo(
    () => checklist.flatMap((g) => g.items.map((i) => `${g.group}:${i}`)),
    []
  );
  const [checked, setChecked] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch (e) {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(checked));
    } catch (e) {}
  }, [checked, ready]);

  const doneCount = allItems.filter((k) => checked[k]).length;
  const pct = Math.round((doneCount / allItems.length) * 100);
  const toggle = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }));
  const reset = () => setChecked({});

  return (
    <div className="check">
      <div className="check__top">
        <div className="check__bar">
          <div className="check__bar-fill" style={{ width: `${pct}%` }} />
          <span className="check__bar-label">
            {doneCount} / {allItems.length} 완료
          </span>
        </div>
        <button className="check__reset" onClick={reset}>
          초기화
        </button>
      </div>
      <div className="check__groups">
        {checklist.map((g) => (
          <div className="check__group" key={g.group}>
            <h3 className="check__group-title">{g.group}</h3>
            <ul>
              {g.items.map((item) => {
                const key = `${g.group}:${item}`;
                return (
                  <li key={key}>
                    <button
                      className={`check__item ${checked[key] ? "is-done" : ""}`}
                      onClick={() => toggle(key)}
                      aria-pressed={!!checked[key]}
                    >
                      <span className="check__box" aria-hidden="true" />
                      <span>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
