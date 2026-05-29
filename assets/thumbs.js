/* ============================================================
   Thumbnail mini-renderers — each experiment has a tiny live
   preview drawn into its card thumb. Kept procedural / monochrome.
   ============================================================ */

window.THUMBS = {
  /* 001 — Button button: a button inside a button inside a button */
  "button-button": (root) => {
    root.innerHTML = `
      <div class="thumb-bb">
        <button>BUTTON
          <button>BUTTON
            <button>BUTTON
              <button>BUTTON</button>
            </button>
          </button>
        </button>
      </div>
      <style>
        .thumb-bb { width: 100%; height: 100%; display:flex; align-items:center; justify-content:center; }
        .thumb-bb button {
          font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em;
          color: var(--fg); background: transparent;
          border: 1px solid var(--fg); padding: 14px 18px;
          display:flex; align-items:center; justify-content:center; gap: 8px;
        }
        .thumb-bb button button { padding: 8px 12px; font-size: 9px; }
        .thumb-bb button button button { padding: 4px 8px; font-size: 8px; border-color: var(--accent); color: var(--accent); }
        .thumb-bb button button button button { padding: 2px 4px; font-size: 7px; }
      </style>
    `;
  },

  /* 002 — Legion of Doom: tiny sigil grid */
  "legion-of-doom": (root) => {
    const sigils = ["/X\\", ">!<", "#@#", "[Ø]", "{∴}", "<·>", "/+\\", "+†+", "∇▲∇"];
    root.innerHTML = `
      <div class="thumb-lod">
        ${sigils.map(s => `<span>${s}</span>`).join('')}
      </div>
      <style>
        .thumb-lod {
          width: 100%; height: 100%; display: grid;
          grid-template-columns: repeat(3, 1fr);
          align-items: center; justify-items: center;
          padding: 8px; gap: 4px;
        }
        .thumb-lod span {
          font-family: var(--mono); font-size: 13px;
          color: var(--accent); letter-spacing: 0.04em;
          opacity: 0.85;
        }
      </style>
    `;
  },

  /* 003 — Notice period: countdown numerals */
  "notice-period": (root) => {    root.innerHTML = `
      <div class="thumb-np">
        <div class="np-line"><span class="np-label">NOTICE</span><span class="np-val" data-tn>090</span><span class="np-unit">d</span></div>
        <div class="np-line"><span class="np-label">REMAINING</span><span class="np-val" data-th>16</span><span class="np-unit">h</span></div>
        <div class="np-line"><span class="np-label">PERIOD</span><span class="np-val acc" data-tm>42</span><span class="np-unit">m</span></div>
        <div class="np-bar"><div class="np-bar-fill"></div></div>
      </div>
      <style>
        .thumb-np { width:100%; height:100%; padding: 12px; display:flex; flex-direction:column; gap:6px; justify-content:center; font-family: var(--mono); }
        .np-line { display:grid; grid-template-columns: 1fr auto auto; gap: 6px; align-items: baseline; font-size: 10px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; }
        .np-val { color: var(--fg); font-size: 14px; font-weight: 500; font-variant-numeric: tabular-nums; }
        .np-val.acc { color: var(--accent); }
        .np-unit { color: var(--muted); font-size: 10px; }
        .np-bar { margin-top: 6px; height: 4px; background: var(--dim); border: 1px solid var(--line); }
        .np-bar-fill { height: 100%; background: var(--accent); width: 38%; }
      </style>
    `;
    // tiny live tick so thumbnails feel alive
    const tm = root.querySelector('[data-tm]');
    let m = 42;
    setInterval(() => { m = (m + 1) % 60; if (tm) tm.textContent = String(m).padStart(2,'0'); }, 1000);
  },

  /* 004 — No pineapple: a rotating pizza SVG */
  "no-pineapple": (root) => {
    root.innerHTML = `
      <div class="thumb-pp">
        <svg viewBox="-50 -50 100 100" aria-hidden="true">
          ${[0,1,2,3,4,5,6,7].map(i => {
            const a1 = (i * 45 - 90) * Math.PI / 180;
            const a2 = ((i+1) * 45 - 90) * Math.PI / 180;
            const r = 38;
            const x1 = Math.cos(a1)*r, y1 = Math.sin(a1)*r;
            const x2 = Math.cos(a2)*r, y2 = Math.sin(a2)*r;
            return `<path d="M0 0 L${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${i % 2 ? 'transparent' : 'var(--accent)'}" stroke="var(--fg)" stroke-width="0.6"/>`;
          }).join('')}
          <circle r="4" fill="var(--bg)" stroke="var(--fg)" stroke-width="0.6"/>
        </svg>
      </div>
      <style>
        .thumb-pp { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .thumb-pp svg { width: 70%; height: 70%; animation: thumb-spin 18s linear infinite; }
        @keyframes thumb-spin { to { transform: rotate(360deg); } }
      </style>
    `;
  },

  /* 008 — Nakagin Capsule Tower: a small iso stack of capsules */
  "nakagin-capsule-tower": (root) => {
    const TW = 30, TH = 15, CH = 17;
    const cap = (c, r) => {
      const cx = (c - r) * TW / 2, cyf = (c + r) * TH / 2, cyt = cyf - CH;
      const P = (x, y) => `${x.toFixed(1)},${y.toFixed(1)}`;
      const top = [P(cx, cyt - TH/2), P(cx + TW/2, cyt), P(cx, cyt + TH/2), P(cx - TW/2, cyt)].join(" ");
      const left = [P(cx - TW/2, cyf), P(cx, cyf + TH/2), P(cx, cyt + TH/2), P(cx - TW/2, cyt)].join(" ");
      const right = [P(cx, cyf + TH/2), P(cx + TW/2, cyf), P(cx + TW/2, cyt), P(cx, cyt + TH/2)].join(" ");
      const wx = cx + TW/4, wy = cyf - CH/2 + TH/4;
      const R = 0.3, ma = (R*TW/2).toFixed(2), mb = (R*-TH/2).toFixed(2), md = (R*-CH).toFixed(2);
      return `<polygon points="${left}" class="f s"/><polygon points="${right}" class="f s"/>`
        + `<polygon points="${top}" class="t s"/>`
        + `<g transform="matrix(${ma} ${mb} 0 ${md} ${wx.toFixed(1)} ${wy.toFixed(1)})">`
        + `<circle r="1" class="w" vector-effect="non-scaling-stroke"/></g>`;
    };
    // back-to-front by depth (c+r): an L-shaped stack
    const cells = [{c:0,r:1},{c:1,r:1},{c:1,r:0},{c:0,r:0}];
    cells.sort((a,b)=>(a.c+a.r)-(b.c+b.r));
    root.innerHTML = `
      <div class="thumb-nk">
        <svg viewBox="-34 -28 68 64" aria-hidden="true">${cells.map(c=>cap(c.c,c.r)).join("")}</svg>
      </div>
      <style>
        .thumb-nk { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .thumb-nk svg { width:62%; height:62%; overflow:visible; }
        .thumb-nk .s { stroke: var(--fg); stroke-width: 1.1; stroke-linejoin: round; }
        .thumb-nk .f { fill: var(--bg); }
        .thumb-nk .t { fill: var(--dim); }
        .thumb-nk .w { fill: none; stroke: var(--accent); stroke-width: 1.1; }
      </style>
    `;
  },

  /* 010 — Onigiri: a wrapped triangle with one peeled coral tab */
  "onigiri": (root) => {
    root.innerHTML = `
      <div class="thumb-on">
        <svg viewBox="0 0 120 110" aria-hidden="true">
          <!-- rounded rice triangle -->
          <path class="rice" d="M 60 18 Q 60 14 63 18 L 96 80 Q 98 84 94 84 L 26 84 Q 22 84 24 80 Z"/>
          <!-- nori band -->
          <clipPath id="thRice"><path d="M 60 18 Q 60 14 63 18 L 96 80 Q 98 84 94 84 L 26 84 Q 22 84 24 80 Z"/></clipPath>
          <g clip-path="url(#thRice)"><rect class="nori" x="14" y="58" width="92" height="34"/></g>
          <!-- coral filling peek -->
          <circle class="fill" cx="60" cy="44" r="7"/>
          <!-- numbered pull tabs -->
          <rect class="tab" x="53" y="6" width="14" height="9" rx="2"/>
          <text class="tn" x="60" y="13" text-anchor="middle">1</text>
          <rect class="tab dim" x="84" y="64" width="14" height="9" rx="2"/>
          <text class="tn dim" x="91" y="71" text-anchor="middle">2</text>
          <rect class="tab dim" x="22" y="64" width="14" height="9" rx="2"/>
          <text class="tn dim" x="29" y="71" text-anchor="middle">3</text>
        </svg>
      </div>
      <style>
        .thumb-on { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .thumb-on svg { width:72%; height:72%; overflow:visible; }
        .thumb-on .rice { fill: var(--bg); stroke: var(--fg); stroke-width: 1.4; stroke-linejoin: round; }
        .thumb-on .nori { fill: var(--fg); }
        .thumb-on .fill { fill: var(--accent); }
        .thumb-on .tab { fill: var(--accent); }
        .thumb-on .tab.dim { opacity: 0.32; }
        .thumb-on .tn { fill: #0a0a0a; font-family: var(--mono); font-weight: 600; font-size: 7px; }
        .thumb-on .tn.dim { opacity: 0.32; }
      </style>
    `;
  },

  /* 009 — Particle Ocean: a small drifting plexus with one coral hub */
  "particle-ocean": (root) => {
    root.innerHTML = `
      <div class="thumb-po"><svg viewBox="0 0 120 90" aria-hidden="true"></svg></div>
      <style>
        .thumb-po { width:100%; height:100%; display:flex; align-items:center; justify-content:center; }
        .thumb-po svg { width:100%; height:100%; }
        .thumb-po .lnk { stroke: var(--fg); stroke-width: 0.5; }
        .thumb-po .alnk { stroke: var(--accent); stroke-width: 0.6; }
        .thumb-po .pt { fill: var(--fg); }
        .thumb-po .hub { fill: var(--accent); }
      </style>
    `;
    const svg = root.querySelector("svg");
    const N = 13, LINK = 42, R = 2;
    const pts = [];
    for (let i = 0; i < N; i++) {
      pts.push({ x: 8 + Math.random() * 104, y: 8 + Math.random() * 74, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 });
    }
    const hub = { x: 60, y: 45 };       // coral pointer node, drifts slowly
    let ha = Math.random() * Math.PI * 2;
    function tick() {
      ha += 0.012;
      hub.x = 60 + Math.cos(ha) * 30;
      hub.y = 45 + Math.sin(ha * 1.3) * 22;
      let s = "";
      // neighbour links
      for (let i = 0; i < N; i++) {
        const a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 6 || a.x > 114) a.vx *= -1;
        if (a.y < 6 || a.y > 84) a.vy *= -1;
        for (let j = i + 1; j < N; j++) {
          const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) s += `<line class="lnk" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke-opacity="${(1 - d / LINK) * 0.5}"/>`;
        }
      }
      // hub coral links
      for (const p of pts) {
        const d = Math.hypot(p.x - hub.x, p.y - hub.y);
        if (d < LINK * 1.4) s += `<line class="alnk" x1="${hub.x.toFixed(1)}" y1="${hub.y.toFixed(1)}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke-opacity="${(1 - d / (LINK * 1.4)) * 0.7}"/>`;
      }
      for (const p of pts) s += `<circle class="pt" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${R}" fill-opacity="0.8"/>`;
      s += `<circle class="hub" cx="${hub.x.toFixed(1)}" cy="${hub.y.toFixed(1)}" r="2.6"/>`;
      svg.innerHTML = s;
    }
    tick();
    setInterval(tick, 1000 / 24);
  }
};
