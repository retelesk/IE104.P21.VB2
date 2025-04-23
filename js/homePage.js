document.addEventListener("DOMContentLoaded", function () {
  const TRENDING_ITEMS_PER_PAGE = 6;
  const TRENDING_TITLE_CHANGE_INTERVAL = 3000;
  // 1. Search Form in Header Menu
  const searchButton = document.getElementById("header-search");
  if (searchButton) {
    searchButton.addEventListener("click", function () {
      console.log("button clicked");
      document
        .getElementById("header-search-form")
        .classList.toggle("disabled");
    });
  }

  // 2. Back-to-top Button
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("active", window.pageYOffset > 300);
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 3. Carousel Initialization with JSON Data
  fetch("data/dataSample.json")
    .then((response) => response.json())
    .then((data) => {
      data = data;
      // BANNER CAROUSEL
      const bannerItems = data.filter((item) => item.banner);
      if (bannerItems.length > 0) {
        initializeCarousel(bannerItems);
      } else {
        console.log("No banner items found in the JSON data");
      }
      // SECTION TRENDING
      const trendingArticles = data.filter((item) => item.trending);
      if (trendingArticles.length > 0) {
        renderTrendingArticles(trendingArticles);
        setupTitleRotation(trendingArticles);
        setupPagination(trendingArticles);
      } else {
        console.log("No trending articles found");
        document.querySelector(".section-trending").style.display = "none";
      }

      //load must read
      let newsData = data.slice(0, 15);
      let newDataHtml = newsData
        .map((news) => {
          return `<a class="mustRead-item" href="./news.html?id=${news.id}">
            <img
              src="${news.thumbnail}"
              alt="Must Read section images"
              class="mustRead-img"
            />
            <h3 class="mustRead-title">
              ${news.title}
            </h3>
          </a>`;
        })
        .join("");
      document.querySelector(".mustRead-lists").innerHTML = newDataHtml;
      //load recommended
      let recommended = data.filter((item) => item.recommended);
      let recommendedHtml = recommended
        .map((news) => {
          return `<a href="./news.html?id=${news.id}" class="recommended-item">
              <img
                src="${news.thumbnail}"
                alt="thumbnail"
                class="recommended-img"
              />
              <h3 class="recommended-title">
                ${news.title}
              </h3>
              <div class="recommended-meta-info">
                <p class="recommended-author">Le Phong Vu</p>
                <p class="recommended-date">April 10, 2025</p>
                <div class="recommended-comments-box">
                  <p class="recommended-comments">${news.commentCount.length}</p>
                </div>
              </div>
            </a>`;
        })
        .join("");
      document.querySelector(".recommended-lists").innerHTML = recommendedHtml;
      //load latest
      let latest = data.slice(0, 9);
      let latestHtml = latest
        .map((news) => {
          return `<a href="./news.html?id=${news.id}" class="lastestArticles-item">
            <img
              src="${news.thumbnail}"
              alt="thumbnail"
              class="lastestArticles-img"
            />
            <h3 class="lastestArticles-title">
              ${news.title}
            </h3>
            <div class="lastestArticles-meta-info">
              <p class="lastestArticles-author">Le Phong Vu</p>
              <p class="lastestArticles-date">April 10, 2025</p>
              <div class="lastestArticles-comments-box">
                <p class="lastestArticles-comments">${news.commentCount.length}</p>
              </div>
            </div>
          </a>`;
        })
        .join("");
      document.querySelector(".lastestArticles-lists").innerHTML = latestHtml;
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });

  // BANNER CAROUSEL
  function initializeCarousel(bannerItems) {
    const carousel = document.querySelector(".carousel-container");
    if (!carousel) return;

    const inner = document.querySelector(".carousel-inner");
    const indicatorsContainer = document.querySelector(".carousel-indicators");

    // Clear existing content
    inner.innerHTML = "";
    indicatorsContainer.innerHTML = "";

    // Create carousel items
    bannerItems.forEach((item, index) => {
      // Create carousel item
      const carouselItem = document.createElement("a");
      carouselItem.className = "carousel-item";
      carouselItem.href = `./news.html?id=${item.id}`;

      const itemContent = `
        <div>
          <img src="./${item.thumbnail}" alt="${item.title}">
          <p>${item.title}</p>
        </div>
      `;

      carouselItem.innerHTML = itemContent;
      inner.appendChild(carouselItem);

      // Create indicator
      const indicator = document.createElement("span");
      indicator.className = "indicator";
      indicator.dataset.index = index;
      indicatorsContainer.appendChild(indicator);
    });

    // Get DOM elements after creation
    const items = document.querySelectorAll(".carousel-item");
    const indicators = document.querySelectorAll(".indicator");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let currentIndex = 0;
    const itemCount = items.length;
    let interval;

    // Initialize first item
    if (itemCount > 0) {
      items[0].classList.add("active");
      indicators[0].classList.add("active");
    }

    // Navigation functions
    function goToNext() {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }

    function goToPrev() {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      updateCarousel();
    }

    function goToIndex(index) {
      currentIndex = index;
      updateCarousel();
    }

    function updateCarousel() {
      inner.style.transform = `translateX(-${currentIndex * 100}%)`;

      items.forEach((item, index) => {
        item.classList.toggle("active", index === currentIndex);
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === currentIndex);
      });
    }

    function startAutoRotation() {
      interval = setInterval(goToNext, 5000);
    }

    // Event listeners
    if (nextBtn) nextBtn.addEventListener("click", goToNext);
    if (prevBtn) prevBtn.addEventListener("click", goToPrev);

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", function () {
        goToIndex(parseInt(this.dataset.index));
      });
    });

    // Auto-rotation with pause on hover
    if (itemCount > 1) {
      startAutoRotation();

      carousel.addEventListener("mouseenter", () => {
        clearInterval(interval);
      });

      carousel.addEventListener("mouseleave", startAutoRotation);
    }
  }
  // RENDER TRENDING
  function renderTrendingArticles(articles, page = 0) {
    const trendingContainer = document.querySelector(".trending-lists");
    const startIdx = page * TRENDING_ITEMS_PER_PAGE;
    const paginatedArticles = articles.slice(
      startIdx,
      startIdx + TRENDING_ITEMS_PER_PAGE
    );

    // Clear existing content
    trendingContainer.innerHTML = "";

    // Create article elements
    paginatedArticles.forEach((article) => {
      const articleEl = document.createElement("a");
      articleEl.className = "trending-item";
      articleEl.href = `./news.html?id=${article.id}`;

      // Format date
      const articleDate = article.date
        ? new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "Apr 15, 2025";

      articleEl.innerHTML = `
        <img src="${article.thumbnail}" alt="${
        article.title
      }" class="trending-img">
        <h3 class="trending-title">${article.title}</h3>
        <div class="trending-meta-info">
          <p class="trending-author">${
            article.author?.name || "Le Phong Vu"
          }</p>
          <p class="trending-date">${articleDate}</p>
          <div class="trending-comments-box">
            <p class="trending-comments">${
              article.commentCount?.length || 0
            }</p>
          </div>
        </div>
      `;

      trendingContainer.appendChild(articleEl);
    });
  }

  function setupTitleRotation(articles) {
    const displayArea = document.querySelector(".trending-now--display-area");
    let currentTitleIndex = 0;
    let fadeInterval;

    function fadeToNextTitle() {
      // Start fade out
      displayArea.style.opacity = "0";
      displayArea.style.transition = "opacity 0.5s ease";

      // After fade out completes, change title and fade in
      setTimeout(() => {
        currentTitleIndex = (currentTitleIndex + 1) % articles.length;
        displayArea.textContent = articles[currentTitleIndex].title;
        displayArea.style.opacity = "1";
      }, 500);
    }

    // Initialize with first title
    if (articles.length > 0) {
      displayArea.textContent = articles[0].title;

      // Only start auto-rotation if there are multiple articles
      if (articles.length > 1) {
        fadeInterval = setInterval(
          fadeToNextTitle,
          TRENDING_TITLE_CHANGE_INTERVAL
        );

        // Pause on hover
        displayArea.addEventListener("mouseenter", () => {
          clearInterval(fadeInterval);
        });

        displayArea.addEventListener("mouseleave", () => {
          fadeInterval = setInterval(
            fadeToNextTitle,
            TRENDING_TITLE_CHANGE_INTERVAL
          );
        });
      }
    }
  }

  function setupPagination(articles) {
    const prevBtn = document.querySelector(
      ".trending-now--next-prev .prev-box"
    );
    const nextBtn = document.querySelector(
      ".trending-now--next-prev .next-box"
    );
    const totalPages = Math.ceil(articles.length / TRENDING_ITEMS_PER_PAGE);
    let currentPage = 0;

    // Hide navigation if not needed
    if (totalPages <= 1) {
      document.querySelector(".trending-now--next-prev").style.display = "none";
      return;
    }

    // Update pagination state
    function updatePagination() {
      renderTrendingArticles(articles, currentPage);

      // Disable prev button on first page
      prevBtn.style.opacity = currentPage === 0 ? "0.5" : "1";
      prevBtn.style.cursor = currentPage === 0 ? "not-allowed" : "pointer";

      // Disable next button on last page
      nextBtn.style.opacity = currentPage === totalPages - 1 ? "0.5" : "1";
      nextBtn.style.cursor =
        currentPage === totalPages - 1 ? "not-allowed" : "pointer";
    }

    // Navigation handlers
    prevBtn.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        updatePagination();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        updatePagination();
      }
    });

    // Initialize
    updatePagination();
  }
});
