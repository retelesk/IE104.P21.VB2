document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("header-search")
    .addEventListener("click", function () {
      document
        .getElementById("header-search-form")
        .classList.toggle("disabled");
    });
});
