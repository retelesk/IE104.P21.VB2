document.addEventListener("DOMContentLoaded", function () {
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
  fetch("../data/dataSample.json")
    .then((response) => response.json())
    .then((data) => {
      // For logging articles data (optional)
      if (data.articles) {
        data.articles.forEach((article) => {
          console.log(
            `Bài viết: ${article.title} | Tác giả: ${article.author.name}`
          );
        });
      }

      // Initialize banner carousel
      const bannerItems = data.filter((item) => item.banner);
      if (bannerItems.length > 0) {
        initializeCarousel(bannerItems);
      } else {
        console.log("No banner items found in the JSON data");
      }
    })
    .catch((error) => {
      console.error("Error loading JSON data:", error);
    });

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
      carouselItem.href = `#${item.id}`;

      const itemContent = `
        <div>
          <img src="${item.thumbnail}" alt="${item.title}">
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
});
