document.addEventListener("DOMContentLoaded", function () {
  /* =====================
     AOS
  ====================== */
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  /* =====================
     NAVIGATION + SCROLL
  ====================== */
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Allow normal navigation for external / html links
      if (href && (href.startsWith("http") || href.includes(".html"))) {
        closeMobileMenu();
        return;
      }

      if (!href || !href.startsWith("#")) return;

      e.preventDefault();

      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }

      closeMobileMenu();
    });
  });

  /* =====================
     NAVBAR SCROLL EFFECT
  ====================== */
  const navbar = document.getElementById("main-nav");
  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  /* =====================
     MOBILE MENU (FINAL)
  ====================== */
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");

  function openMobileMenu() {
    mobileMenu.classList.add("active");
    mobileMenuBackdrop.classList.remove("hidden");
    menuToggle.classList.add("open");
    document.body.classList.add("menu-open");
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("active");
    mobileMenuBackdrop.classList.add("hidden");
    menuToggle.classList.remove("open");
    document.body.classList.remove("menu-open");

    document.querySelectorAll(".mobile-dropdown-menu").forEach((menu) => {
      menu.classList.add("hidden");
    });
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.contains("active")
        ? closeMobileMenu()
        : openMobileMenu();
    });
  }

  // Close menu when clicking on backdrop
  if (mobileMenuBackdrop) {
    mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
  }

  /* =====================
     MOBILE DROPDOWNS
  ====================== */
  document.querySelectorAll(".mobile-dropdown-toggle").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const dropdown = toggle.closest(".mobile-dropdown");
      const menu = dropdown ? dropdown.querySelector(".mobile-dropdown-menu") : null;
      const icon = toggle.querySelector("i");

      if (menu) menu.classList.toggle("hidden");
      if (icon) {
        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
      }
    });
  });

  /* =====================
     DESKTOP DROPDOWNS
  ====================== */
  document.querySelectorAll(".group").forEach((group) => {
    const menu = group.querySelector(".dropdown-menu");
    let hideTimeout;

    if (menu) {
      group.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
        menu.classList.remove("hidden");
      });

      group.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          menu.classList.add("hidden");
        }, 200); // Small delay to allow moving to menu
      });

      menu.addEventListener("mouseenter", () => {
        clearTimeout(hideTimeout);
      });

      menu.addEventListener("mouseleave", () => {
        hideTimeout = setTimeout(() => {
          menu.classList.add("hidden");
        }, 200);
      });
    }
  });

  /* =====================
     SWIPER
  ====================== */
  if (
    typeof Swiper !== "undefined" &&
    document.querySelector(".testimonialSwiper")
  ) {
    new Swiper(".testimonialSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: { delay: 5000 },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
    });
  }

  /* =====================
     CAREER TOGGLES
  ====================== */
  document.querySelectorAll(".job-details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const details = btn.parentElement.nextElementSibling;
      details.classList.toggle("hidden");

      const en = btn.querySelector(".lang-en");
      const sr = btn.querySelector(".lang-sr");

      if (details.classList.contains("hidden")) {
        if (en) en.textContent = "View Details";
        if (sr) sr.textContent = "Pogledaj detalje";
      } else {
        if (en) en.textContent = "Hide Details";
        if (sr) sr.textContent = "Sakrij detalje";
      }
    });
  });

  /* =====================
     PORTFOLIO FILTER
  ====================== */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) =>
        b.classList.remove("bg-blue-600", "text-white")
      );
      btn.classList.add("bg-blue-600", "text-white");

      const filter = btn.dataset.filter;
      portfolioItems.forEach((item) => {
        item.classList.toggle(
          "hidden",
          filter !== "all" && item.dataset.category !== filter
        );
      });
    });
  });

  /* =====================
     LANGUAGE TOGGLE
  ====================== */
  const langEn = document.getElementById("lang-en");
  const langSr = document.getElementById("lang-sr");

  function setLanguage(lang) {
    localStorage.setItem("language", lang);
    document
      .querySelectorAll(".lang-en")
      .forEach((el) => el.classList.toggle("hidden", lang !== "en"));
    document
      .querySelectorAll(".lang-sr")
      .forEach((el) => el.classList.toggle("hidden", lang !== "sr"));
  }

  setLanguage(localStorage.getItem("language") || "en");
  if (langEn) langEn.onclick = () => setLanguage("en");
  if (langSr) langSr.onclick = () => setLanguage("sr");

  /* =====================
     COUNTERS
  ====================== */
  const counters = document.querySelectorAll(".counter-value");
  if (counters.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.innerText);
            let current = 0;
            const step = target / 100;

            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.innerText = target;
                clearInterval(timer);
              } else {
                el.innerText = Math.floor(current);
              }
            }, 20);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  /* =====================
     COOKIES
  ====================== */
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptCookies = document.getElementById("accept-cookies");

  if (!localStorage.getItem("cookieAccepted") && cookieConsent) {
    cookieConsent.classList.remove("hidden");
  }

  if (acceptCookies) {
    acceptCookies.onclick = () => {
      localStorage.setItem("cookieAccepted", "true");
      cookieConsent.classList.add("hidden");
    };
  }
});
