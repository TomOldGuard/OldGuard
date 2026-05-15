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
  }
};
