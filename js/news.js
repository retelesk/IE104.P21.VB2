"use strict";
//*****************Global variables */
var data = [];
let newsData = null;

//*****************Main function */
async function main() {
  await loadData(); // Wait for data to be loaded

  // Get id from URL and find the corresponding object
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  newsData = findObjectById(data, id);

  // Change image and title
  if (newsData) {
    document.getElementById("news-name").innerHTML = newsData.title;
    document.getElementById("banner").style.backgroundImage =
      "url(" + newsData.thumbnail + ")";
    document.getElementById("breadCrumb-news").innerHTML = newsData.title;
  }
}
// Call the main function
main();

//*************************Common function */
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
// Function to search id in the data
function findObjectById(array, id) {
  return array.find((obj) => obj.id == id);
}
