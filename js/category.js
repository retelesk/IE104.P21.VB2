"use strict";
//****************Global Variables********************** */
const url = new URL(window.location.href);
const keyword = url.searchParams.get("cat");
var data = [];

//****************Main function********************** */
document.querySelector(".title-text").innerHTML = keyword;
async function main() {
  await loadData();
  displayData(data);
}
// Call the main function
main();

//****************Common function********************** */
// Get data from JSON file
async function loadData() {
  try {
    // Fetch data from the JSON file
    const response = await fetch("../data/dataSample.json");
    data = await response.json();
  } catch (error) {
    console.error("Error loading JSON data:", error);
  }
}

// Function to display data
function displayData(results) {
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
        <p class="search-result-item-date">May 10, 2016</p>
      </div></a>
    `;
    })
    .join(""); // Join all HTML strings into one

  // Insert the HTML into the container
  searchResultsContainer.innerHTML = resultsHTML;
}
