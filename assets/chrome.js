/* ============================================================
   Shared chrome — header, footer, theme toggle, prev/next helper
   ============================================================ */

(function () {
  // ---- THEME ----------------------------------------------------
  const root = document.documentElement;
  const stored = localStorage.getItem("og-theme");
  if (stored) root.setAttribute("data-theme", stored);

  function toggleTheme() {
    const cur = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = cur === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("og-theme", next);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-label", "Switch to " + (next === "light" ? "dark" : "light") + " mode");
  }
  window.OG_toggleTheme = toggleTheme;

  // ---- HEADER ---------------------------------------------------
  function renderHeader(opts = {}) {
    const mount = document.querySelector("[data-header]");
    if (!mount) return;
    const homeHref = opts.homeHref || "index.html";
    mount.innerHTML = `
      <a href="${homeHref}" class="brand" aria-label="Old Guard — home">
        <span class="brand-logo" aria-hidden="true"></span>
      </a>
      <div class="header-controls">
        <button class="icon-btn theme-toggle" id="theme-toggle" title="Toggle theme" aria-label="Toggle theme">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.4"/>
            <path d="M8 2 A6 6 0 0 1 8 14 Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    `;
    document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
  }

  // ---- FOOTER ---------------------------------------------------
  function renderFooter(opts = {}) {
    const mount = document.querySelector("[data-footer]");
    if (!mount) return;
    mount.innerHTML = `
      <div>
        <span class="label">Old Guard</span>
        <span class="dot" aria-hidden="true">·</span>
        <a class="footer-link" href="${opts.colophonHref || 'colophon.html'}">Colophon</a>
      </div>
    `;
  }

  // ---- PREV / NEXT NAV (detail pages) ---------------------------
  function renderExpNav(currentSlug) {
    const mount = document.querySelector("[data-exp-nav]");
    if (!mount) return;
    const list = window.EXPERIMENTS || [];
    const idx = list.findIndex(e => e.slug === currentSlug);
    // List is sorted newest-first (highest num at idx 0).
    // "Next" = newer experiment (toward index 0)
    // "Prev" = older experiment (toward end of list)
    const next = idx > 0 ? list[idx - 1] : null;
    const prev = idx < list.length - 1 ? list[idx + 1] : null;

    mount.innerHTML = `
      <a class="prev ${prev ? '' : 'disabled'}" href="${prev ? '../' + prev.href : '#'}">
        <span class="nav-dir">&lt; Previous · ${prev ? prev.num : '—'}</span>
        <span class="nav-title">${prev ? prev.title : 'Start of index'}</span>
      </a>
      <a class="next ${next ? '' : 'disabled'}" href="${next ? '../' + next.href : '#'}">
        <span class="nav-dir">Next · ${next ? next.num : '—'} &gt;</span>
        <span class="nav-title">${next ? next.title : 'End of index'}</span>
      </a>
    `;

    // Mirror the prev/next into compact arrows at the right of the breadcrumb bar
    const crumbs = document.querySelector(".crumbs");
    if (crumbs && !crumbs.querySelector(".crumb-nav")) {
      const nav = document.createElement("span");
      nav.className = "crumb-nav";
      nav.innerHTML = `
        <a class="${prev ? '' : 'disabled'}" href="${prev ? '../' + prev.href : '#'}" aria-label="${prev ? 'Previous · ' + prev.title : 'No previous experiment'}" title="${prev ? 'Previous · ' + prev.num + ' ' + prev.title : ''}">&lt;</a>
        <a class="${next ? '' : 'disabled'}" href="${next ? '../' + next.href : '#'}" aria-label="${next ? 'Next · ' + next.title : 'No next experiment'}" title="${next ? 'Next · ' + next.num + ' ' + next.title : ''}">&gt;</a>
      `;
      crumbs.appendChild(nav);
    }
  }

  // ---- ONE-CALL SETUP for experiment detail pages --------------
  function initExp(slug) {
    renderHeader({ homeHref: "../index.html" });
    renderFooter({ colophonHref: "../colophon.html" });
    renderExpNav(slug);
  }

  window.OG = { renderHeader, renderFooter, renderExpNav, initExp };
})();
