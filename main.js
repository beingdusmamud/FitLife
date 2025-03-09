// Main JavaScript file
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }

  // DOM Element Selectors
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");
  const body = document.body;
  const textElement = document.getElementById("changingText");
  const videoModal = document.getElementById("videoModal");
  const watchVideoBtn = document.getElementById("watchVideo");
  const closeModalBtn = document.getElementById("closeModal");
  const scrollIndicator = document.querySelector(
    ".fitpro-hero__scroll-indicator"
  );

  // Toggle Menu
  function toggleMenu() {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (!menuToggle || !navMenu) return;
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Scroll Effects
  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;

    navbar.classList.toggle("scrolled", currentScroll > scrollThreshold);
    navbar.style.transform =
      currentScroll > lastScroll && currentScroll > scrollThreshold
        ? "translateY(-100%)"
        : "translateY(0)";

    lastScroll = currentScroll;
  });

  // Animated Text
  if (textElement) {
    const words = ["Today", "Forever", "Now"];
    let wordIndex = 0;

    function animateText() {
      textElement.style.opacity = "0";
      setTimeout(() => {
        textElement.textContent = words[wordIndex];
        textElement.style.opacity = "1";
        wordIndex = (wordIndex + 1) % words.length;
      }, 500);
    }

    setInterval(animateText, 3000);
    animateText();
  }

  // Counter Animation
  const animateCounter = (element, final) => {
    let current = 0;
    const increment = final / 50;
    const timer = setInterval(() => {
      current += increment;
      element.textContent = Math.round(current);
      if (current >= final) {
        element.textContent = final;
        clearInterval(timer);
      }
    }, 40);
  };

  // Intersection Observer for Stats
  const stats = document.querySelectorAll(".fitpro-hero__stat-number");
  if (window.IntersectionObserver) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.getAttribute("data-count"));
            if (!isNaN(count)) {
              animateCounter(target, count);
              observer.unobserve(target);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
  }

  // Video Modal Handler
  if (watchVideoBtn && videoModal && closeModalBtn) {
    watchVideoBtn.addEventListener("click", () => {
      const videoId = "aZiOJbuZ4YY";
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
      const container = document.querySelector(
        ".fitpro-modal__video-container"
      );

      container.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          src="${embedUrl}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `;

      videoModal.style.display = "block";
      body.style.overflow = "hidden";
    });

    closeModalBtn.addEventListener("click", () => {
      const container = document.querySelector(
        ".fitpro-modal__video-container"
      );
      container.innerHTML = "";
      videoModal.style.display = "none";
      body.style.overflow = "";
    });

    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        closeModalBtn.click();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.style.display === "block") {
        closeModalBtn.click();
      }
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Parallax Effect
  const heroElement = document.querySelector(".fitpro-hero");
  if (heroElement) {
    window.addEventListener("scroll", () => {
      const scroll = window.pageYOffset;
      heroElement.style.backgroundPositionY = `${scroll * 0.5}px`;
    });
  }

  // Scroll Progress Indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      const maxHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      progressBar.style.transform = `scaleX(${progress / 100})`;
    });
  };

  // Hide scroll indicator
  let scrollTimeout;
  if (scrollIndicator) {
    window.addEventListener("scroll", () => {
      scrollIndicator.style.opacity = "0";
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (window.scrollY < 100) {
          scrollIndicator.style.opacity = "1";
        }
      }, 1000);
    });

    scrollIndicator.addEventListener("click", (e) => {
      e.preventDefault();
      const heroHeight = document.querySelector(".fitpro-hero").offsetHeight;
      window.scrollTo({
        top: heroHeight,
        behavior: "smooth",
      });
    });
  }

  // Initialize scroll progress
  createScrollProgress();

  // Card Effects
  const cards = document.querySelectorAll(".fitpro-service-card");

  // Card parallax effect
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;

      const angleX = (mouseY - cardY) / 30;
      const angleY = (mouseX - cardX) / -30;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });
  });

  // Testimonials Carousel Class
  class TestimonialsCarousel {
    constructor() {
      this.track = document.getElementById("testimonialsTrack");
      if (!this.track) return;

      this.slides = Array.from(this.track.children);
      this.nextBtn = document.getElementById("nextBtn");
      this.prevBtn = document.getElementById("prevBtn");
      this.indicators = document.getElementById("indicators");
      this.currentIndex = 0;
      this.slideWidth = this.slides[0].getBoundingClientRect().width;
      this.autoplayInterval = null;
      this.autoplayDelay = 5000;

      this.init();
    }

    init() {
      this.createIndicators();
      this.updateSlidePositions();
      this.addEventListeners();
      this.startAutoplay();
      this.updateIndicators();
    }

    createIndicators() {
      this.slides.forEach((_, index) => {
        const indicator = document.createElement("div");
        indicator.classList.add("testimonials__indicator");
        indicator.addEventListener("click", () => this.goToSlide(index));
        this.indicators.appendChild(indicator);
      });
    }

    updateSlidePositions() {
      this.slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${
          100 * (index - this.currentIndex)
        }%)`;
        slide.classList.toggle("active", index === this.currentIndex);
      });
    }

    updateIndicators() {
      const indicators = Array.from(this.indicators.children);
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === this.currentIndex);
      });
    }

    goToSlide(index) {
      this.currentIndex = index;
      this.updateSlidePositions();
      this.updateIndicators();
      this.resetAutoplay();
    }

    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.goToSlide(this.currentIndex);
    }

    prevSlide() {
      this.currentIndex =
        (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(this.currentIndex);
    }

    startAutoplay() {
      this.autoplayInterval = setInterval(
        () => this.nextSlide(),
        this.autoplayDelay
      );
    }

    resetAutoplay() {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    }

    addEventListeners() {
      this.nextBtn.addEventListener("click", () => this.nextSlide());
      this.prevBtn.addEventListener("click", () => this.prevSlide());

      // Touch events
      let touchStartX = 0;
      let touchEndX = 0;

      this.track.addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
      });

      this.track.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
          this.nextSlide();
        } else if (touchEndX - touchStartX > 50) {
          this.prevSlide();
        }
      });

      // Pause autoplay on hover
      this.track.addEventListener("mouseenter", () =>
        clearInterval(this.autoplayInterval)
      );
      this.track.addEventListener("mouseleave", () => this.startAutoplay());
    }
  }

  // Initialize testimonials carousel
  if (document.getElementById("testimonialsTrack")) {
    new TestimonialsCarousel();
  }

  // Form Validation and Submission
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }

  function validatePhone(phone) {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  }

  // Form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleSubmit);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    let isValid = true;

    // Reset previous errors
    form.querySelectorAll(".form__input").forEach((input) => {
      input.classList.remove("error");
    });

    // Validate each field
    formData.forEach((value, key) => {
      const input = form.querySelector(`[name="${key}"]`);
      if (!value.trim()) {
        input.classList.add("error");
        isValid = false;
      }

      if (key === "email" && !validateEmail(value)) {
        input.classList.add("error");
        isValid = false;
      }

      if (key === "phone" && !validatePhone(value)) {
        input.classList.add("error");
        isValid = false;
      }
    });

    if (isValid) {
      // Simulate form submission
      form.style.display = "none";
      const successMessage = document.querySelector(".form__success");
      if (successMessage) {
        successMessage.style.display = "block";
      }

      // Reset form after successful submission
      setTimeout(() => {
        form.reset();
        form.style.display = "block";
        if (successMessage) {
          successMessage.style.display = "none";
        }
      }, 5000);
    }
  }

  // Input animations
  document.querySelectorAll(".form__input").forEach((input) => {
    input.addEventListener("focus", () => {
      const formGroup = input.closest(".form__group");
      if (formGroup) {
        formGroup.classList.add("active");
      }
    });

    input.addEventListener("blur", () => {
      const formGroup = input.closest(".form__group");
      if (formGroup && !input.value) {
        formGroup.classList.remove("active");
      }
    });
  });

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const input = this.querySelector("input");
      const successMessage = document.getElementById("newsletterSuccess");

      if (validateEmail(input.value)) {
        this.style.opacity = "0.5";
        this.style.pointerEvents = "none";

        setTimeout(() => {
          this.style.opacity = "1";
          this.style.pointerEvents = "auto";
          input.value = "";
          if (successMessage) {
            successMessage.style.display = "block";
          }

          setTimeout(() => {
            if (successMessage) {
              successMessage.style.display = "none";
            }
          }, 5000);
        }, 1000);
      }
    });
  }
});
