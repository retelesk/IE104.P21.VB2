document.addEventListener("DOMContentLoaded", function () {
  const carNewsItem = document.querySelector("#nav li:nth-child(3)");
  const navExpand = document.querySelector("#nav-expand-1");

  carNewsItem.addEventListener("mouseenter", function () {
    navExpand.style.display = "block";
  });

  carNewsItem.addEventListener("mouseleave", function () {
    // Small delay to allow cursor to move to the expanded menu
    setTimeout(() => {
      if (!navExpand.matches(":hover")) {
        navExpand.style.display = "none";
      }
    }, 100);
  });

  navExpand.addEventListener("mouseleave", function () {
    navExpand.style.display = "none";
  });
});
