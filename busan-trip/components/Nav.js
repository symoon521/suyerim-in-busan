"use client";

import { useEffect, useState } from "react";
import { nav, trip } from "../app/data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("overview");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((n) => document.getElementById(n.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <nav className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__brand">
          {trip.place}<span>TRIP</span>
        </a>
        <button
          className="nav__burger"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
        <ul className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className={active === n.id ? "is-active" : ""}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
