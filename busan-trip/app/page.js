import { trip, facts, highlights } from "./data";
import Reveal from "../components/Reveal";
import Nav from "../components/Nav";
import ScrollProgress from "../components/ScrollProgress";
import BackToTop from "../components/BackToTop";
import Itinerary from "../components/Itinerary";
import Checklist from "../components/Checklist";

export default function Home() {
  return (
    <>
      <a href="#overview" className="skip-link">본문으로 건너뛰기</a>
      <ScrollProgress />
      <Nav />
      <BackToTop />
      <main id="top">
        {/* ───────── HERO ───────── */}
        <header className="hero">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__grain" aria-hidden="true" />
          <div className="hero__inner">
            <p className="hero__kicker">
              <span className="dot" /> TRAVEL PLAN · {trip.placeEn}
            </p>
            <h1 className="hero__title">
              <span className="hero__place">{trip.place}</span>
              <span className="hero__big">{trip.title}</span>
            </h1>
            <p className="hero__sub">{trip.subtitle}</p>
            <p className="hero__dates">{trip.dates}</p>
            <a href="#itinerary" className="hero__cta">
              일정 보기 <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            <span>SCROLL</span>
            <span className="hero__line" />
          </div>
        </header>

        {/* ───────── OVERVIEW ───────── */}
        <section className="section overview" id="overview">
          <div className="wrap">
            <Reveal className="section__head">
              <span className="eyebrow">Overview</span>
              <p className="overview__intro">{trip.intro}</p>
            </Reveal>

            <ul className="facts__grid">
              {facts.map((f, i) => (
                <Reveal as="li" key={f.label} delay={i * 70} className="fact">
                  <span className="fact__label">{f.label}</span>
                  <span className="fact__value">{f.value}</span>
                </Reveal>
              ))}
            </ul>

            <h2 className="overview__sub">대표 코스</h2>
            <div className="highlights">
              {highlights.map((h, i) => (
                <Reveal key={h.name} delay={i * 70}>
                  <a href="#itinerary" className="hl">
                    <span className="hl__day">{h.day}</span>
                    <h3 className="hl__name">{h.name}</h3>
                    <span className="hl__en">{h.en}</span>
                    <p className="hl__desc">{h.desc}</p>
                    <span className="hl__go" aria-hidden="true">일정 보기 →</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── ITINERARY ───────── */}
        <section className="section itinerary" id="itinerary">
          <div className="wrap">
            <Reveal className="section__head">
              <span className="eyebrow">Itinerary</span>
              <h2 className="section__title">하루별 일정</h2>
              <p className="section__hint">탭으로 날짜를 바꾸고, 일정을 눌러 자세히 보세요.</p>
            </Reveal>
            <Itinerary />
          </div>
        </section>

        {/* ───────── CHECKLIST ───────── */}
        <section className="section" id="checklist">
          <div className="wrap">
            <Reveal className="section__head">
              <span className="eyebrow">Checklist</span>
              <h2 className="section__title">준비물</h2>
              <p className="section__hint">체크 상태는 자동 저장돼요.</p>
            </Reveal>
            <Reveal>
              <Checklist />
            </Reveal>
          </div>
        </section>

        {/* ───────── TIPS ───────── */}
        <Tips />

        {/* ───────── FOOTER ───────── */}
        <footer className="foot">
          <p className="foot__big">좋은 여행 되세요</p>
          <p className="foot__small">
            {trip.place} {trip.title} · have a wonderful trip
          </p>
        </footer>
      </main>
    </>
  );
}

import { tips } from "./data";
function Tips() {
  return (
    <section className="section tips" id="tips">
      <div className="wrap">
        <Reveal className="section__head">
          <span className="eyebrow">Tips</span>
          <h2 className="section__title">여행 팁</h2>
        </Reveal>
        <div className="tips__grid">
          {tips.map((t, i) => (
            <Reveal key={t.title} delay={i * 70} className="tip">
              <span className="tip__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="tip__title">{t.title}</h3>
              <p className="tip__text">{t.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
