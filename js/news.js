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
  //load prev and next article
  const currentIndex = data.findIndex((item) => item.id === newsData.id);

  if (currentIndex == 0) {
    document.getElementById(
      "next-article"
    ).innerHTML = `<p>Next Article</p><a href="./news.html?id=${data[1].id}">${data[1].title}</a>`;
    document.getElementById("prev-article").innerHTML =
      "<p>Previous Article</p>";
  } else if (currentIndex === data.length - 1) {
    document.getElementById("next-article").innerHTML = "<p>Next Article</p>";
    document.getElementById(
      "prev-article"
    ).innerHTML = `<p>Previous Article</p><a href="./news.html?id=${
      data[currentIndex - 1].id
    }">${data[currentIndex - 1].title}</a>`;
  } else {
    document.getElementById(
      "next-article"
    ).innerHTML = `<p>Next Article</p><a href="./news.html?id=${
      data[currentIndex + 1].id
    }">${data[currentIndex + 1].title}</a>`;
    document.getElementById(
      "prev-article"
    ).innerHTML = `<p>Previous Article</p><a href="./news.html?id=${
      data[currentIndex - 1].id
    }">${data[currentIndex - 1].title}</a>`;
  }
  //load comment
  let contentComment = newsData.commentCount
    .map((comment) => {
      return `<div class="comment">
                  <div class="comment-avatar">
                    <img
                      src="${comment.avatar}"
                      alt="avatar"
                    />
                  </div>
                  <div class="comment-text">
                    <div class="comment-name"><p>${comment.name}</p></div>
                    <div class="comment-content">
                      <p>${comment.comment}</p>
                    </div>
                  </div>
                </div>`;
    })
    .join("");
  console.log(contentComment);

  document.getElementById("comment-area").innerHTML = contentComment;
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
