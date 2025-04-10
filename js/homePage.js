document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("header-search")
    .addEventListener("click", function () {
      document
        .getElementById("header-search-form")
        .classList.toggle("disabled");
    });
  // BACK-TO-TOP
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
