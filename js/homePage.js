document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("header-search")
    .addEventListener("click", function () {
      console.log("button clicked");

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

// Fetch dữ liệu từ file JSON
fetch("../data/dataSample.json")
  .then((response) => response.json())
  .then((data) => {
    data.articles.forEach((article) => {
      console.log(
        `Bài viết: ${article.title} | Tác giả: ${article.author.name}`
      );
    });
  });

// Truy cập dữ liệu trực tiếp (nếu đã parse)
const firstArticle = data.articles[0];
console.log(firstArticle.thumbnail); // Output URL hình ảnh
