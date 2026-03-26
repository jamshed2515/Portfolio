(() => {
  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
  };

  const getSavedTheme = () => {
    try {
      return localStorage.getItem("theme");
    } catch {
      return null;
    }
  };

  const saveTheme = (theme) => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // ignore
    }
  };

  const initial = getSavedTheme();
  if (initial) applyTheme(initial);

  const themeToggle = document.querySelector("[data-theme-toggle]");
  // Theme toggle not shown in current UI, but keep support if added later.
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      saveTheme(next);
    });
  }

  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = document.querySelector("[data-nav-links]");

  const closeNav = () => {
    if (!navToggle || !navLinks) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.tagName === "A") closeNav();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });

    document.addEventListener("click", (e) => {
      if (!navLinks.classList.contains("is-open")) return;
      const target = e.target;
      if (!target) return;
      if (navLinks.contains(target) || navToggle.contains(target)) return;
      closeNav();
    });
  }

  // Improve behavior for placeholder links
  document.querySelectorAll("[data-disabled-link]").forEach((a) => {
    a.addEventListener("click", (e) => e.preventDefault());
  });

  // Skills filter buttons
  const skillFilters = document.querySelectorAll("[data-skill-filter]");
  const skillCards = document.querySelectorAll("[data-skill-category]");

  if (skillFilters.length && skillCards.length) {
    skillFilters.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-skill-filter");

        skillFilters.forEach((b) => b.classList.toggle("is-active", b === btn));

        skillCards.forEach((card) => {
          const cat = card.getAttribute("data-skill-category");
          if (target === "all" || cat === target) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Resume tab navigation
  const resumeTabs = document.querySelectorAll("[data-resume-tab]");
  const resumePanels = document.querySelectorAll("[data-resume-panel]");

  if (resumeTabs.length && resumePanels.length) {
    resumeTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-resume-tab");
        resumeTabs.forEach((b) => b.classList.toggle("is-active", b === btn));
        resumePanels.forEach((panel) => {
          const id = panel.getAttribute("data-resume-panel");
          panel.classList.toggle("is-active", id === target);
        });
      });
    });
  }
  // Contact form → open Gmail compose in new tab
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = (contactForm.querySelector('[name="name"]')?.value    || '').trim();
      const email   = (contactForm.querySelector('[name="email"]')?.value   || '').trim();
      const message = (contactForm.querySelector('[name="message"]')?.value || '').trim();

      const to      = 'mdjamshedalam807@gmail.com';
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body    = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank');
    });
  }
})();

