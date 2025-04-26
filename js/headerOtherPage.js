document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("header-search");
  const searchForm = document.getElementById("header-search-form");
  const searchInput = document.querySelector(".searchBox");
  const searchButton = document.querySelector(".searchBtn");

  if (!searchIcon || !searchForm || !searchInput || !searchButton) return;

  // Hàm xử lý tìm kiếm
  function handleSearch() {
    const value = searchInput.value.trim();
    const keyword = value === "" ? " " : value;
    searchForm.classList.add("disabled");
    location.href = "./search.html?keyword=" + keyword;
  }

  // Bấm vào icon kính lúp để hiện form
  searchIcon.addEventListener("click", function (event) {
    searchForm.classList.remove("disabled");
    event.stopPropagation();
  });

  // Bấm nút "Search"
  searchButton.addEventListener("click", handleSearch);

  // Nhấn phím Enter
  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault(); // Ngăn reload nếu form nằm trong <form>
      handleSearch();
    }
  });

  // Bấm trong form không bị đóng
  searchForm.addEventListener("click", function (event) {
    event.stopPropagation();
  });

  // Bấm ngoài form sẽ ẩn nó nếu đang mở
  document.addEventListener("click", function () {
    if (!searchForm.classList.contains("disabled")) {
      searchForm.classList.add("disabled");
    }
  });
});
