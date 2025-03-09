document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navbar = document.querySelector(".navbar");
  const body = document.body;

  // Toggle Menu
  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
    body.style.overflow = body.style.overflow === "hidden" ? "" : "hidden";
  }

  menuToggle.addEventListener("click", toggleMenu);

  // Close menu on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      body.style.overflow = "";
    });
  });

  // Scroll Effects
  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    navbar.classList.toggle("scrolled", currentScroll > scrollThreshold);

    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });
});
