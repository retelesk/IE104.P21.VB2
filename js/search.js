"use strict";
//****************Global Variables********************** */
const url = new URL(window.location.href);
const keyword = url.searchParams.get("keyword");
var data = [];
let newsData = [];

//****************Event handler********************** */
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
document
  .querySelector("#page-search-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      let searchValue = document.querySelector("#page-search-input").value;
      if (searchValue == "") {
        searchValue = " ";
      }
      location.href = "./search.html?keyword=" + searchValue;
    }
  });
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  searchAndDisplayResults();
});

//****************Common function********************** */
// Get data from JSON file
async function loadData() {
  try {
    // Fetch data from the JSON file
    const response = await fetch("data/dataSample.json");
    data = await response.json();
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}
// Function to display search results
function displaySearchResults(results) {
  const searchResultsContainer = document.getElementById("result-area");

  // Clear any existing content
  searchResultsContainer.innerHTML = "";

  // Map through results and create HTML elements
  const resultsHTML = results
    .map((item) => {
      return `
      <a href="./news.html?id=${item.id}">
      <div class="search-result-item">
        <div class="search-result-item-thumb">
        
          <img src="${item.thumbnail}" alt="news-img" />
        </div>
        <h3 class="search-result-item-title">
          ${item.title}
        </h3>
        <p class="search-result-item-date">April 15, 2025</p>
      </div></a>
    `;
    })
    .join(""); // Join all HTML strings into one

  // Insert the HTML into the container
  searchResultsContainer.innerHTML = resultsHTML;
}
// Function search and display results
function searchAndDisplayResults() {
  const lowercaseKeyword = keyword.toLowerCase();
  newsData = data.filter((item) => {
    return item.title.toLowerCase().includes(lowercaseKeyword);
  });

  // Display results count
  if (newsData.length == 0) {
    document.querySelector("#search-result-text").textContent =
      "No result found";
  } else {
    document.querySelector("#search-result-text").textContent =
      newsData.length + " results found";
    // Display the search results
    displaySearchResults(newsData);
  }
}
