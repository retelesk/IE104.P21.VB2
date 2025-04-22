"use strict";
//*****************Global variables******************/
var data = [];
let newsData = null;
const url = new URL(window.location.href);
const id = url.searchParams.get("id");
let comment = {
  name: "",
  text: "",
};
//*****************Page Event Handler******************/
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  newsData = findObjectById(data, id);
  loadImageAndTitle();
  loadComment();
});
document.getElementById("btn-post").addEventListener("click", () => {
  //get data from input
  comment.name = document.getElementById("name").value;
  comment.text = document.getElementById("comment").value;
  //validate input
  if (comment.name == "" || comment.text == "") {
    alert("Please fill in all fields.");
    return;
  }
  //add comment to the newsData
  let commentHtml = `<div class="comment">
                  <div class="comment-avatar">
                    <img
                      src="https://avatar.iran.liara.run/username?username=${comment.name}"
                      alt="avatar"
                    />
                  </div>
                  <div class="comment-text">
                    <div class="comment-name"><p>${comment.name}</p></div>
                    <div class="comment-content">
                      <p>${comment.text}</p>
                    </div>
                  </div>
                </div>`;
  document.getElementById("comment-area").innerHTML += commentHtml;
});
//*************************Common function******************/
// Get data from JSON
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
//load data
function loadImageAndTitle() {
  //load image and title
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
}
//load comments
function loadComment() {
  //load comment
  let result = newsData.commentCount
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
  document.getElementById("comment-area").innerHTML = result;
}
