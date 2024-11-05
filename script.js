// script.js

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add fade-in effect on page load
window.addEventListener("load", () => {
  document.body.style.opacity = 1;
  document.body.style.transition = "opacity 1s ease-in-out";
});
