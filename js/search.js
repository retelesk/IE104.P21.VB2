"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let url = new URL(window.location.href);
  let keyword = url.searchParams.get("keyword");
  document.querySelector("#keyword").innerHTML = keyword;
});

const fetchJsonData = async function (file) {
  try {
    const response = await fetch(file);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching the JSON file:", error);
  }
};
