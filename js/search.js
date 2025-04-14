"use strict";

const url = new URL(window.location.href);
const keyword = url.searchParams.get("keyword");

document.querySelector("#keyword").innerHTML = keyword;

document
  .getElementById("page-search-btn")
  .addEventListener("click", function () {
    let searchValue = document.getElementById("page-search-input").value;
    if (searchValue == "") {
      searchValue = " ";
    }
    window.location.href = "./search.html?keyword=" + searchValue;
  });
