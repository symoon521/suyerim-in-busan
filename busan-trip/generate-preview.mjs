import { readFileSync, writeFileSync } from "fs";
import { trip, facts, highlights, days, checklist, tips, nav } from "./app/data.js";

const css = readFileSync(new URL("./app/globals.css", import.meta.url), "utf8");

const navLinks = nav.map((n) => `<li><a href="#${n.id}" data-nav="${n.id}">${n.label}</a></li>`).join("");

const factsHtml = facts.map((f) => `
        <li class="fact reveal reveal--in"><span class="fact__label">${f.label}</span><span class="fact__value">${f.value}</span></li>`).join("");

const hlHtml = highlights.map((h) => `
        <a href="#itinerary" class="hl reveal reveal--in">
          <span class="hl__day">${h.day}</span>
          <h3 class="hl__name">${h.name}</h3>
          <span class="hl__en">${h.en}</span>
          <p class="hl__desc">${h.desc}</p>
          <span class="hl__go">일정 보기 →</span>
        </a>`).join("");

const tabsHtml = days.map((d, i) => `
        <button class="daytab ${i === 0 ? "is-active" : ""}" data-tab="${d.n}"><strong>Day ${d.n}</strong><span>${d.label}</span></button>`).join("");

const daysHtml = days.map((day, i) => `
      <div class="day" data-day="${day.n}"${i === 0 ? "" : " hidden"}>
        <div class="day__head">
          <span class="day__label">${day.label}</span>
          <h3 class="day__title">${day.title}</h3>
          <p class="day__summary">${day.summary}</p>
        </div>
        <ol class="timeline">
          ${day.items.map((item, idx) => `
          <li class="tl${idx === 0 ? " is-open" : ""}">
            <div class="tl__rail"><span class="tl__dot"></span></div>
            <button class="tl__head" aria-expanded="${idx === 0 ? "true" : "false"}">
              <span class="tl__time">${item.time}</span>
              <span class="tl__heading"><span class="tl__title">${item.title}</span><span class="tl__place-mini">${item.place}</span></span>
              <span class="tl__chev">⌄</span>
            </button>
            <div class="tl__panel"><div class="tl__panel-in">
              <p class="tl__desc">${item.desc}</p>
              <div class="tl__tags">${item.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
              <a class="tl__map" href="${item.map}" target="_blank" rel="noopener noreferrer"><span class="tl__pin"></span>지도에서 보기</a>
            </div></div>
          </li>`).join("")}
        </ol>
      </div>`).join("");

const allChecks = checklist.flatMap((g) => g.items.map((i) => `${g.group}:${i}`));
const checkHtml = checklist.map((g) => `
          <div class="check__group"><h3 class="check__group-title">${g.group}</h3><ul>
            ${g.items.map((item) => `<li><button class="check__item" data-key="${g.group}:${item}"><span class="check__box"></span><span>${item}</span></button></li>`).join("")}
          </ul></div>`).join("");

const tipsHtml = tips.map((t, i) => `
        <div class="tip reveal reveal--in"><span class="tip__num">${String(i + 1).padStart(2, "0")}</span><h3 class="tip__title">${t.title}</h3><p class="tip__text">${t.text}</p></div>`).join("");

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${trip.place} ${trip.title} 여행 플랜</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Black+Han+Sans&family=IBM+Plex+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
<style>
${css}
</style>
</head>
<body>
<a href="#overview" class="skip-link">본문으로 건너뛰기</a>
<div class="progress"><div class="progress__bar" id="prog" style="width:0%"></div></div>
<nav class="nav" id="nav"><div class="nav__inner">
  <a href="#top" class="nav__brand">${trip.place}<span>TRIP</span></a>
  <button class="nav__burger" id="burger" aria-label="메뉴"><span></span><span></span><span></span></button>
  <ul class="nav__links" id="navlinks">${navLinks}</ul>
</div></nav>
<button class="totop" id="totop" aria-label="맨 위로">↑</button>
<main id="top">
  <header class="hero">
    <div class="hero__glow"></div><div class="hero__grain"></div>
    <div class="hero__inner">
      <p class="hero__kicker"><span class="dot"></span> TRAVEL PLAN · ${trip.placeEn}</p>
      <h1 class="hero__title"><span class="hero__place">${trip.place}</span><span class="hero__big">${trip.title}</span></h1>
      <p class="hero__sub">${trip.subtitle}</p>
      <p class="hero__dates">${trip.dates}</p>
      <a href="#itinerary" class="hero__cta">일정 보기 <span>→</span></a>
    </div>
    <div class="hero__scroll"><span>SCROLL</span><span class="hero__line"></span></div>
  </header>

  <section class="section overview" id="overview"><div class="wrap">
    <div class="section__head reveal reveal--in"><span class="eyebrow">Overview</span><p class="overview__intro">${trip.intro}</p></div>
    <ul class="facts__grid">${factsHtml}
    </ul>
    <h2 class="overview__sub">대표 코스</h2>
    <div class="highlights">${hlHtml}
    </div>
  </div></section>

  <section class="section itinerary" id="itinerary"><div class="wrap">
    <div class="section__head reveal reveal--in"><span class="eyebrow">Itinerary</span><h2 class="section__title">하루별 일정</h2><p class="section__hint">탭으로 날짜를 바꾸고, 일정을 눌러 자세히 보세요.</p></div>
    <div class="itin">
      <div class="daytabs">${tabsHtml}
      </div>
      ${daysHtml}
    </div>
  </div></section>

  <section class="section" id="checklist"><div class="wrap">
    <div class="section__head reveal reveal--in"><span class="eyebrow">Checklist</span><h2 class="section__title">준비물</h2><p class="section__hint">체크 상태는 자동 저장돼요.</p></div>
    <div class="check">
      <div class="check__top">
        <div class="check__bar"><div class="check__bar-fill" id="checkfill" style="width:0%"></div><span class="check__bar-label" id="checklabel">0 / ${allChecks.length} 완료</span></div>
        <button class="check__reset" id="checkreset">초기화</button>
      </div>
      <div class="check__groups">${checkHtml}
      </div>
    </div>
  </div></section>

  <section class="section tips" id="tips"><div class="wrap">
    <div class="section__head reveal reveal--in"><span class="eyebrow">Tips</span><h2 class="section__title">여행 팁</h2></div>
    <div class="tips__grid">${tipsHtml}
    </div>
  </div></section>

  <footer class="foot"><p class="foot__big">좋은 여행 되세요</p><p class="foot__small">${trip.place} ${trip.title} · have a wonderful trip</p></footer>
</main>
<script>
(function(){
  var doc = document.documentElement;
  var nav = document.getElementById('nav');
  var prog = document.getElementById('prog');
  var totop = document.getElementById('totop');
  function onScroll(){
    var st = doc.scrollTop, h = doc.scrollHeight - doc.clientHeight;
    prog.style.width = (h > 0 ? st / h * 100 : 0) + '%';
    nav.classList.toggle('nav--solid', st > 40);
    totop.classList.toggle('totop--show', st > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  totop.addEventListener('click', function(){ window.scrollTo({ top: 0, behavior: 'smooth' }); });

  var burger = document.getElementById('burger'), links = document.getElementById('navlinks');
  burger.addEventListener('click', function(){ links.classList.toggle('nav__links--open'); });
  var navAs = links.querySelectorAll('a');
  Array.prototype.forEach.call(navAs, function(a){ a.addEventListener('click', function(){ links.classList.remove('nav__links--open'); }); });
  var sio = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ Array.prototype.forEach.call(navAs, function(a){ var on = a.getAttribute('data-nav') === e.target.id; a.classList.toggle('is-active', on); if(on){ a.setAttribute('aria-current','true'); } else { a.removeAttribute('aria-current'); } }); } }); }, { rootMargin: '-45% 0px -50% 0px' });
  ['overview','itinerary','checklist','tips'].forEach(function(id){ var el = document.getElementById(id); if(el) sio.observe(el); });

  var tabs = document.querySelectorAll('.daytab');
  var dayEls = document.querySelectorAll('.day[data-day]');
  Array.prototype.forEach.call(tabs, function(tab){
    tab.addEventListener('click', function(){
      var n = tab.getAttribute('data-tab');
      Array.prototype.forEach.call(tabs, function(t){ t.classList.toggle('is-active', t === tab); });
      Array.prototype.forEach.call(dayEls, function(d){ d.hidden = d.getAttribute('data-day') !== n; });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('.tl__head'), function(head){
    head.addEventListener('click', function(){
      var li = head.closest('.tl');
      var open = li.classList.toggle('is-open');
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  var KEY = 'busan-trip-checklist', total = ${allChecks.length};
  var fill = document.getElementById('checkfill'), label = document.getElementById('checklabel');
  var items = document.querySelectorAll('.check__item');
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { state = {}; }
  function renderChecks(){
    var done = 0;
    Array.prototype.forEach.call(items, function(btn){
      var on = !!state[btn.getAttribute('data-key')];
      btn.classList.toggle('is-done', on);
      if(on) done++;
    });
    fill.style.width = Math.round(done / total * 100) + '%';
    label.textContent = done + ' / ' + total + ' 완료';
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch(e) {}
  }
  Array.prototype.forEach.call(items, function(btn){
    btn.addEventListener('click', function(){ var k = btn.getAttribute('data-key'); state[k] = !state[k]; renderChecks(); });
  });
  document.getElementById('checkreset').addEventListener('click', function(){ state = {}; renderChecks(); });
  renderChecks();
})();
</script>
</body>
</html>`;

writeFileSync(new URL("./preview.html", import.meta.url), html);
console.log("preview.html generated");
