import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './scrollline.css';

/* ==========================================================
   SCROLL LINE — jedna neprekinuta linija koja prati scroll.

   Putanja (cik-cak):
     logo gore-levo -> spust niz levu ivicu
       -> u praznom prostoru ispise "Unique" na sredini
       -> izlazi skroz desno i silazi niz desnu ivicu
       -> u sledecem praznom prostoru ispise "Unique" unazad
          (pero krece od slova "e" ka "U")
       -> izlazi skroz levo i silazi... i tako do dna.
   ========================================================== */

const SVG_NS = 'http://www.w3.org/2000/svg';

/* Nagib rukopisa (italic). x' = x - y * SLANT */
const SLANT = 0.18;

/* Minimalna visina praznog prostora da bi se rec uopste ispisala */
const MIN_BAND = 130;

/* Ispod ove sirine ekrana se layer ne prikazuje (mobilni layout nema prazan prostor) */
const MIN_VIEWPORT = 768;

/* Koliko "ranije" i "kasnije" (u px scrolla) rec pocinje/zavrsava da se pise */
const SIG_LEAD = 70;

/* Deo scroll opsega reci koji otpada na ulazni i izlazni potez */
const JOIN_SHARE = 0.14;

/* Gde se na ekranu nalazi "vrh olovke" (0 = vrh ekrana, 1 = dno) */
const PEN = 0.62;

/* ----------------------------------------------------------
   KURZIVNA REC "Unique" — jedan jedini potez olovke.
   Koordinate su u jedinicama x-visine:
     baseline  y =  0
     x-visina  y = -1
     kapitala  y = -1.75
     donji rep y = +0.8
   Potez ulazi gore-levo (vrh slova U), a izlazi dole-desno
   (posle slova "e"). Kad se pise unazad, isti potez se
   prolazi obrnutim smerom — od "e" ka "U".
   ---------------------------------------------------------- */
const WORD = [
  ['M', 0.1, -1.75],
  ['C', 0.02, -1.05, 0.05, -0.3, 0.28, -0.08], // U: leva noga u luk
  ['C', 0.48, 0.08, 0.66, -0.02, 0.72, -0.45], // U: dno luka pa gore
  ['C', 0.78, -0.95, 0.84, -1.45, 0.88, -1.75], // U: desna noga do vrha
  ['C', 0.93, -1.5, 0.96, -0.7, 0.99, -0.22], // U: izlazni potez nadole
  ['C', 1.02, -0.04, 1.08, 0.02, 1.16, -0.1], // dolina na liniji
  ['C', 1.24, -0.4, 1.3, -0.78, 1.38, -1.0], // uzlazni spoj u "n"
  ['C', 1.41, -0.68, 1.43, -0.34, 1.45, 0.0], // n: leva noga
  ['C', 1.48, -0.32, 1.55, -0.96, 1.67, -0.96], // n: rame
  ['C', 1.77, -0.96, 1.81, -0.45, 1.83, 0.0], // n: desna noga
  ['C', 1.86, 0.06, 1.92, 0.02, 1.98, -0.14], // izlaz
  ['C', 2.04, -0.4, 2.09, -0.78, 2.14, -1.0], // uzlazni spoj u "i"
  ['C', 2.17, -0.68, 2.19, -0.34, 2.21, 0.0], // i: noga  <-- posle ovoga pada tacka
  ['C', 2.24, 0.06, 2.3, 0.02, 2.36, -0.14], // izlaz
  ['C', 2.46, -0.44, 2.56, -0.86, 2.66, -0.94], // uzlazni spoj u "q"
  ['C', 2.56, -1.06, 2.4, -1.02, 2.36, -0.66], // q: preko vrha pa niz levu stranu
  ['C', 2.32, -0.3, 2.44, -0.02, 2.58, -0.04], // q: dno kruga
  ['C', 2.7, -0.06, 2.78, -0.5, 2.81, -0.94], // q: desna strana, zatvara krug
  ['C', 2.84, -0.5, 2.87, 0.14, 2.9, 0.46], // q: rep ispod linije
  ['C', 2.94, 0.76, 3.1, 0.82, 3.18, 0.54], // q: kuka repa
  ['C', 3.23, 0.34, 3.2, 0.12, 3.14, -0.04], // nazad ka liniji
  ['C', 3.22, -0.34, 3.3, -0.76, 3.38, -1.0], // uzlazni spoj u "u"
  ['C', 3.41, -0.7, 3.42, -0.3, 3.48, -0.08], // u: leva noga
  ['C', 3.55, 0.06, 3.66, 0.02, 3.7, -0.34], // u: dno
  ['C', 3.73, -0.62, 3.75, -0.86, 3.76, -1.0], // u: gore
  ['C', 3.79, -0.7, 3.82, -0.34, 3.85, 0.0], // u: desna noga
  ['C', 3.88, 0.06, 3.94, 0.02, 4.0, -0.14], // izlaz
  ['C', 4.08, -0.4, 4.14, -0.58, 4.22, -0.64], // e: uspon
  ['C', 4.34, -0.72, 4.36, -1.06, 4.2, -1.04], // e: petlja preko vrha
  ['C', 4.06, -1.02, 3.99, -0.6, 4.06, -0.3], // e: leva strana
  ['C', 4.13, -0.02, 4.32, 0.04, 4.44, -0.12], // e: dno i izlaz
];

/* Posle koliko poteza (gledano unapred) je slovo "i" ispisano */
const DOT_AFTER = 12;

/* Tacka na "i" */
const DOT_POS = [2.14, -1.45];

/* WORD -> lista segmenata {s, c1, c2, e}, da bi se potez mogao proci i unazad */
const WORD_SEGS = (() => {
  const out = [];
  let cur = null;

  for (const cmd of WORD) {
    if (cmd[0] === 'M') {
      cur = [cmd[1], cmd[2]];
      continue;
    }

    out.push({ s: cur, c1: [cmd[1], cmd[2]], c2: [cmd[3], cmd[4]], e: [cmd[5], cmd[6]] });
    cur = [cmd[5], cmd[6]];
  }

  return out;
})();

/* Okvir reci u lokalnim jedinicama (racuna i kontrolne tacke — sa malo rezerve) */
const WORD_BOX = (() => {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const seg of WORD_SEGS) {
    for (const [x, y] of [seg.s, seg.c1, seg.c2, seg.e]) {
      const px = x - y * SLANT;

      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  return { minX, maxX, minY, maxY, w: maxX - minX, h: maxY - minY };
})();

/* ---------------------------------------------------------- */

const n = (v) => Math.round(v * 100) / 100;
const pair = (p) => `${n(p[0])} ${n(p[1])}`;

function offsetWithin(el, root) {
  let x = 0;
  let y = 0;
  let node = el;

  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }

  return { x, y };
}

function boxOf(el, root) {
  const { x, y } = offsetWithin(el, root);

  return {
    left: x,
    top: y,
    right: x + el.offsetWidth,
    bottom: y + el.offsetHeight,
  };
}

function unionBox(boxes) {
  return boxes.reduce((acc, b) => ({
    left: Math.min(acc.left, b.left),
    top: Math.min(acc.top, b.top),
    right: Math.max(acc.right, b.right),
    bottom: Math.max(acc.bottom, b.bottom),
  }));
}

/* Ispisuje rec. `reversed` znaci da pero ide od "e" ka "U". */
function buildWord(scale, originX, baselineY, reversed) {
  const P = ([x, y]) => [
    originX + (x - y * SLANT - WORD_BOX.minX) * scale,
    baselineY + y * scale,
  ];

  const segs = WORD_SEGS.map((seg) => ({
    s: P(seg.s),
    c1: P(seg.c1),
    c2: P(seg.c2),
    e: P(seg.e),
  }));

  const cmds = reversed
    ? [...segs].reverse().map((seg) => `C ${pair(seg.c2)} ${pair(seg.c1)} ${pair(seg.s)}`)
    : segs.map((seg) => `C ${pair(seg.c1)} ${pair(seg.c2)} ${pair(seg.e)}`);

  /* Unazad se do slova "i" stigne posle (N - DOT_AFTER + 1) poteza */
  const dotCount = reversed ? segs.length - DOT_AFTER + 1 : DOT_AFTER;

  const first = segs[0].s;
  const last = segs[segs.length - 1].e;

  return {
    d: cmds.join(' '),
    dotPrefix: cmds.slice(0, dotCount).join(' '),
    entry: reversed ? last : first,
    exit: reversed ? first : last,
    dot: P(DOT_POS),
    dotR: Math.max(2, scale * 0.075),
    width: WORD_BOX.w * scale,
    height: WORD_BOX.h * scale,
  };
}

/* ----------------------------------------------------------
   Merenje layouta i sklapanje putanje
   ---------------------------------------------------------- */

function buildGeometry(container) {
  const W = container.clientWidth;
  const H = container.scrollHeight;

  if (!W || !H || W < MIN_VIEWPORT) return null;

  const navbar = container.querySelector('.navbar');
  const logo = navbar && navbar.querySelector('.nav-logo');
  const banner = container.querySelector('.top-banner');
  const footer = container.querySelector('.footer');

  if (!navbar || !logo) return null;

  /* Navbar je sticky — zato pocetnu tacku racunamo iz visina, ne iz rect-a */
  const startX = logo.offsetLeft + logo.offsetWidth * 0.5;
  const startY = (banner ? banner.offsetHeight : 0) + navbar.offsetHeight;

  /* Blokovi sadrzaja: hero + svaka sekcija */
  const blocks = [];
  const heroContent = container.querySelector('.hero-content');

  if (heroContent) blocks.push(boxOf(heroContent, container));

  ['#news', '#how-to-join', '#videos', '#gallery'].forEach((sel) => {
    const section = container.querySelector(sel);
    if (!section) return;

    const parts = Array.from(
      section.querySelectorAll(':scope > .section-sidebar, :scope > .section-content')
    );
    if (!parts.length) return;

    blocks.push(unionBox(parts.map((el) => boxOf(el, container))));
  });

  if (blocks.length < 2) return null;

  /* Prazni pojasevi izmedju blokova */
  const bands = [];

  for (let i = 0; i < blocks.length - 1; i += 1) {
    bands.push({ top: blocks[i].bottom, bottom: blocks[i + 1].top });
  }

  const lastBlock = blocks[blocks.length - 1];
  const footerTop = footer ? offsetWithin(footer, container).y : H;

  bands.push({ top: lastBlock.bottom, bottom: footerTop });

  /* Trake po kojima linija putuje — u marginama, izvan sadrzaja */
  const contentLeft = Math.min(...blocks.map((b) => b.left));
  const contentRight = Math.max(...blocks.map((b) => b.right));

  /* Minimum 30px od ivice — talasanje trake ide do 24px u stranu,
     pa linija nikad ne izlazi izvan sirine strane. */
  const laneL = Math.round(Math.min(Math.max(contentLeft * 0.5, 30), 90));
  const laneR = Math.round(W - Math.min(Math.max((W - contentRight) * 0.5, 30), 90));

  /* --- Sklapanje putanje ---
     Svaki chunk nosi svoj deo `d` stringa, pa se kumulativne duzine
     mere prostim nadovezivanjem (bez parsiranja komandi). */
  const chunks = [];
  const dots = [];

  const head = `M ${n(startX)} ${n(startY)}`;

  let side = 'left';
  let cy = startY;
  let wob = 1;

  const laneX = () => (side === 'left' ? laneL : laneR);

  /* Uvodni potez: od logotipa dole-levo do leve trake */
  const settleY = Math.min(blocks[0].top + 60, startY + 260);

  chunks.push({
    sy0: startY,
    sy1: settleY,
    d: `C ${n(startX)} ${n(startY + 70)} ${n(laneL)} ${n(settleY - 80)} ${n(laneL)} ${n(settleY)}`,
  });
  cy = settleY;

  /* Spust niz trenutnu traku */
  const run = (toY, sy0, sy1) => {
    const x = laneX();
    const h = toY - cy;
    if (h <= 2) return;

    const bow = Math.min(24, Math.max(8, h * 0.05)) * wob;
    wob *= -1;

    chunks.push({
      sy0,
      sy1,
      d: `C ${n(x + bow)} ${n(cy + h * 0.34)} ${n(x - bow)} ${n(cy + h * 0.72)} ${n(x)} ${n(toY)}`,
    });
    cy = toY;
  };

  bands.forEach((band) => {
    const bandH = band.bottom - band.top;
    if (bandH < MIN_BAND || band.top < cy + 40) return;

    /* Velicina reci: staje u pojas po visini i u ekran po sirini */
    let wordH = Math.min(Math.max(bandH * 0.66, 78), 190);
    let scale = wordH / WORD_BOX.h;

    const maxW = (laneR - laneL) * 0.78;
    if (WORD_BOX.w * scale > maxW) scale = maxW / WORD_BOX.w;

    wordH = WORD_BOX.h * scale;
    if (wordH < 70) return;

    const reversed = side === 'right';
    const wordW = WORD_BOX.w * scale;

    /* Rec ide na sredinu praznog prostora — i vodoravno i uspravno */
    const originX = (W - wordW) / 2;
    const baselineY = band.top + (bandH - wordH) / 2 - WORD_BOX.minY * scale;

    const word = buildWord(scale, originX, baselineY, reversed);

    const sigStart = Math.max(cy + 30, band.top - SIG_LEAD);
    const sigEnd = band.bottom + SIG_LEAD;
    const span = Math.max(sigEnd - sigStart, 60);

    /* 1) spust niz traku do vrha praznog prostora */
    const fromX = laneX();
    run(Math.max(band.top + 6, cy + 4), cy, sigStart);

    /* 2) ulazni potez ka pocetku reci.
       Unapred pero sleti na vrh slova "U" (mala kuka odozgo);
       unazad dolazi zdesna, na izlaz slova "e". */
    const hIn = word.entry[1] - cy;

    const inC2 = reversed
      ? [word.entry[0] + (fromX - word.entry[0]) * 0.35, word.entry[1] - 34]
      : [word.entry[0] + 16, word.entry[1] - 46];

    chunks.push({
      sy0: sigStart,
      sy1: sigStart + span * JOIN_SHARE,
      d: `C ${n(fromX)} ${n(cy + hIn * 0.55)} ${pair(inC2)} ${n(word.entry[0])} ${n(word.entry[1])}`,
    });

    /* 3) sama rec */
    chunks.push({
      sy0: sigStart + span * JOIN_SHARE,
      sy1: sigEnd - span * JOIN_SHARE,
      d: word.d,
      dotPrefix: word.dotPrefix,
    });

    dots.push({ x: word.dot[0], y: word.dot[1], r: word.dotR, after: chunks.length - 1 });

    /* 4) izlazni potez ka suprotnoj traci */
    side = side === 'left' ? 'right' : 'left';

    const toX = laneX();
    const outY = Math.max(band.bottom - 6, word.exit[1] + 60);
    const hOut = outY - word.exit[1];

    /* Unapred pero izlazi zamahom udesno (posle "e"), unazad sa vrha slova "U" */
    const outC1 = reversed
      ? [word.exit[0] + 14, word.exit[1] - 34]
      : [word.exit[0] + (toX - word.exit[0]) * 0.35, word.exit[1] - 30];

    chunks.push({
      sy0: sigEnd - span * JOIN_SHARE,
      sy1: sigEnd,
      d: `C ${pair(outC1)} ${n(toX)} ${n(word.exit[1] + hOut * 0.45)} ${n(toX)} ${n(outY)}`,
    });

    cy = outY;
  });

  /* Spust niz traku sve do futera — poslednji pojas je obicno preuzak za rec,
     pa bez ovoga linija ide dijagonalno preko sekcije i nestaje iza kartica. */
  const descendTo = Math.max(footerTop - 24, cy + 8);
  run(descendTo, cy, descendTo);

  /* Zavrsni potez — linija se spaja sa logotipom "UNIQUERP" u futeru */
  const footerLogo = footer && footer.querySelector('.nav-logo');

  if (footerLogo) {
    const lb = boxOf(footerLogo, container);
    const ex = lb.left - 10;
    const ey = lb.top + lb.height * 0.55;
    const x = laneX();
    const h = Math.max(ey - cy, 60);

    chunks.push({
      sy0: cy,
      sy1: ey,
      d: `C ${n(x)} ${n(cy + h * 0.85)} ${n(ex + (x - ex) * 0.35)} ${n(ey + 6)} ${n(ex)} ${n(ey)}`,
    });
  }

  /* --- Duzine segmenata (offscreen merenje) --- */
  const holder = document.createElementNS(SVG_NS, 'svg');
  holder.setAttribute('width', '0');
  holder.setAttribute('height', '0');
  holder.style.position = 'absolute';
  holder.style.opacity = '0';
  holder.style.pointerEvents = 'none';

  const probe = document.createElementNS(SVG_NS, 'path');
  holder.appendChild(probe);
  document.body.appendChild(holder);

  /* Kumulativna duzina: nadovezujemo `d` chunk po chunk */
  let acc = head;
  let prevLen = 0;

  chunks.forEach((chunk) => {
    if (chunk.dotPrefix) {
      probe.setAttribute('d', `${acc} ${chunk.dotPrefix}`);
      chunk.dotLen = probe.getTotalLength();
    }

    acc += ` ${chunk.d}`;
    probe.setAttribute('d', acc);

    const len = probe.getTotalLength();

    chunk.len0 = prevLen;
    chunk.len1 = len;
    prevLen = len;
  });

  const d = acc;
  const total = prevLen;

  document.body.removeChild(holder);

  if (!total || !Number.isFinite(total)) return null;

  chunks.forEach((chunk, i) => {
    dots.forEach((dot) => {
      if (dot.after === i) dot.len = chunk.dotLen != null ? chunk.dotLen : chunk.len1;
    });
  });

  /* Monotona skala scroll-a */
  let guard = startY;

  chunks.forEach((chunk) => {
    chunk.sy0 = Math.max(chunk.sy0, guard);
    chunk.sy1 = Math.max(chunk.sy1, chunk.sy0 + 1);
    guard = chunk.sy1;
  });

  return { width: W, height: H, d, chunks, dots, total, startY };
}

function lengthAt(geo, y) {
  const { chunks, total } = geo;

  if (y <= chunks[0].sy0) return 0;

  for (let i = 0; i < chunks.length; i += 1) {
    const c = chunks[i];

    if (y < c.sy1) {
      const t = (y - c.sy0) / (c.sy1 - c.sy0);
      return c.len0 + Math.max(0, Math.min(1, t)) * (c.len1 - c.len0);
    }
  }

  return total;
}

/* ---------------------------------------------------------- */

export default function ScrollLine() {
  const [geo, setGeo] = useState(null);

  const pathRef = useRef(null);
  const tipRef = useRef(null);
  const dotsRef = useRef([]);
  const geoRef = useRef(null);
  const animRef = useRef({ raf: 0, current: 0, target: 0, running: false });

  geoRef.current = geo;

  /* --- Merenje --- */
  useLayoutEffect(() => {
    const container = document.querySelector('.app-container');
    if (!container) return undefined;

    let frame = 0;

    const remeasure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setGeo(buildGeometry(container)));
    };

    remeasure();

    /* Slike/videi mogu da pomere layout — merimo jos jednom kasnije */
    const timer = window.setTimeout(remeasure, 400);

    window.addEventListener('load', remeasure);
    window.addEventListener('resize', remeasure);

    const ro = new ResizeObserver(remeasure);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener('load', remeasure);
      window.removeEventListener('resize', remeasure);
      ro.disconnect();
    };
  }, []);

  /* --- Crtanje po scroll-u --- */
  useEffect(() => {
    if (!geo || !pathRef.current) return undefined;

    const path = pathRef.current;
    const anim = animRef.current;

    path.style.strokeDasharray = `${geo.total}`;

    /* Uz "reduce motion" linija i dalje prati scroll — samo bez omeksavanja,
       jer je crtanje vezano za korisnikov scroll, a ne samostalna animacija. */
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduced ? 1 : 0.12;

    const readTarget = () => {
      const model = geoRef.current;
      if (!model) return;

      const doc = document.documentElement;
      const scrolled = window.scrollY || doc.scrollTop || document.body.scrollTop || 0;
      const vh = window.innerHeight;

      const base = model.startY;
      const focus = Math.max(vh * PEN, base);

      /* Na vrhu strane linija jos nije nacrtana — "pero" stoji na svom pocetku
         i tek prvim scroll-om stize na svoje mesto (62% visine ekrana). */
      const ramp = Math.min(1, scrolled / (vh * 0.5));

      const y = scrolled + base + (focus - base) * ramp;
      const penLen = lengthAt(model, y);

      /* Donjih (1 - PEN) visina ekrana strane pero nikad ne moze da dosegne —
         ta zona je uvek ispod njega. Zato u poslednjem delu scrolla dopunjujemo
         duzinu do kraja putanje, tako da na samom dnu linija bude spojena
         sa logotipom. Ne zavisi ni od kakvog merenja strane. */
      const maxScroll = Math.max(1, doc.scrollHeight - vh);
      const tail = Math.max(1, vh * (1 - PEN));
      const rest = maxScroll - scrolled;

      if (rest < tail) {
        const k = Math.min(1, Math.max(0, 1 - rest / tail));
        anim.target = penLen + (model.total - penLen) * k;
      } else {
        anim.target = penLen;
      }
    };

    const tick = () => {
      const diff = anim.target - anim.current;

      anim.current += diff * ease;
      if (Math.abs(diff) < 0.4) anim.current = anim.target;

      const len = anim.current;

      path.style.strokeDashoffset = `${geo.total - len}`;

      if (tipRef.current) {
        if (len > 4 && len < geo.total - 2) {
          const p = path.getPointAtLength(len);

          tipRef.current.setAttribute('cx', p.x);
          tipRef.current.setAttribute('cy', p.y);
          tipRef.current.style.opacity = '1';
        } else {
          tipRef.current.style.opacity = '0';
        }
      }

      geo.dots.forEach((dot, i) => {
        const el = dotsRef.current[i];
        if (el) el.style.opacity = len >= dot.len ? '1' : '0';
      });

      if (Math.abs(anim.target - anim.current) > 0.4) {
        anim.raf = requestAnimationFrame(tick);
      } else {
        anim.running = false;
      }
    };

    const kick = () => {
      readTarget();
      if (anim.running) return;

      anim.running = true;
      anim.raf = requestAnimationFrame(tick);
    };

    /* Pri (re)merenju krecemo od trenutne pozicije bez animacije */
    readTarget();
    anim.current = anim.target;
    tick();

    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);

    return () => {
      cancelAnimationFrame(anim.raf);
      anim.running = false;
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [geo]);

  if (!geo) return null;

  return (
    <svg
      className="scroll-line-layer"
      viewBox={`0 0 ${geo.width} ${geo.height}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="usl-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="35%" stopColor="#a855f7" />
          <stop offset="75%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <path ref={pathRef} className="scroll-line-path" d={geo.d} />

      {geo.dots.map((dot, i) => (
        <circle
          key={i}
          ref={(el) => {
            dotsRef.current[i] = el;
          }}
          className="scroll-line-dot"
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
        />
      ))}

      <circle ref={tipRef} className="scroll-line-tip" cx={0} cy={0} r={4} />
    </svg>
  );
}
