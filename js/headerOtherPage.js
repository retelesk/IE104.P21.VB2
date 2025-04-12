document.addEventListener("DOMContentLoaded", function () {
  // Open search box when search icon is clicked
  document
    .getElementById("header-search")
    .addEventListener("click", function (event) {
      document
        .getElementById("header-search-form")
        .classList.remove("disabled");
      event.stopPropagation();
    });

  // Search functionality when search button is clicked
  document.querySelector(".searchBtn").addEventListener("click", function () {
    document.getElementById("header-search-form").classList.add("disabled");
    let searchValue = document.querySelector(".searchBox").value;
    if (searchValue == "") {
      searchValue = " ";
    }
    location.href = "./search.html?keyword=" + searchValue;
  });

  // Search functionality when Enter key is pressed
  document
    .querySelector(".searchBox")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        document.getElementById("header-search-form").classList.add("disabled");
        let searchValue = document.querySelector(".searchBox").value;
        if (searchValue == "") {
          searchValue = " ";
        }
        location.href = "./search.html?keyword=" + searchValue;
      }
    });

  // Prevent search box from closing when clicking inside it
  document
    .getElementById("header-search-form")
    .addEventListener("click", function (event) {
      event.stopPropagation();
    });

  // Close search box when clicking anywhere else on the document
  document.addEventListener("click", function (event) {
    // Check if search form is open (doesn't have 'disabled' class)
    const searchForm = document.getElementById("header-search-form");
    if (!searchForm.classList.contains("disabled")) {
      searchForm.classList.add("disabled");
    }
  });
});
