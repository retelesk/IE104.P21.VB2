document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("header-search")
    .addEventListener("click", function () {
      document
        .getElementById("header-search-form")
        .classList.remove("disabled");
    });
  document.querySelector(".searchBtn").addEventListener("click", function () {
    document.getElementById("header-search-form").classList.add("disabled");
    location.href = "../search.html";
  });
});
