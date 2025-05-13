// let text = document.querySelector(".text");
// let textString = text.textContent;
// let splitText = textString.split("");
// text.textContent = "";

// for (let i = 0; i < splitText.length; i++) {
//   //adds spaces for readability
//   let char = splitText[i];
//   if (char === " ") {
//     text.innerHTML += "<span>&nbsp;</span>";
//   } else if (char === "\n") {
//     text.innerHTML += "<br/>";
//   } else {
//     text.innerHTML += "<span>" + char + "</span>";
//   }
// }
///////////
// for (let i = 0; i < splitText.length; i++) {
//   text.innerHTML += "<span>" + splitText[i] + "</span";
// }

let text = document.querySelector(".text");
let textHTML = text.innerHTML;

// Replace <br> tags with a marker (e.g., [br]) so we can preserve them while splitting
let markedHTML = textHTML.replace(/<br\s*\/?>/gi, "[br][br]");
let splitText = markedHTML.split("");

text.innerHTML = ""; // Clear the element

for (let i = 0; i < splitText.length; i++) {
  let char = splitText[i];
  // Re-insert line breaks
  if (
    char === "[" &&
    splitText[i + 1] === "b" &&
    splitText[i + 2] === "r" &&
    splitText[i + 3] === "]"
  ) {
    text.innerHTML += "<br/>";
    i += 3; // Skip next 3 characters
  } else if (char === " ") {
    text.innerHTML += "<span>&nbsp;</span>";
  } else {
    text.innerHTML += `<span>${char}</span>`;
  }
}

const allPages = [
  "heartbeat.html",
  "question.html",
  "shimmer.html",
  "june-2021.html",
  "bathroom.html",
  "auntie.html",
  "zora.html",
  "tomato-mart.html",
  "buzzcut-girl.html",
  "queen.html",
  "breakfast-club.html",
  "offski-leaned-in.html",
];

const currentPage = window.location.pathname.split("/").pop();

// Get visited pages from localStorage
let visited = JSON.parse(localStorage.getItem("visitedPages")) || [];

// Add current page to visited if not already there
if (!visited.includes(currentPage)) {
  visited.push(currentPage);
  localStorage.setItem("visitedPages", JSON.stringify(visited));
}

// Find pages not yet visited
const remaining = allPages.filter(
  (p) => !visited.includes(p) && p !== currentPage
);

// Button click logic
document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("me_button");

  if (remaining.length === 0) {
    // All pages visited – you can reset or show a message
    button.innerText = "read again";
    button.onclick = () => {
      localStorage.removeItem("visitedPages");
      window.location.href =
        allPages[Math.floor(Math.random() * allPages.length)];
    };
  } else {
    // Continue to a random unvisited page
    const nextPage = remaining[Math.floor(Math.random() * remaining.length)];
    button.onclick = () => {
      window.location.href = nextPage;
    };
  }
});
// Get current page's filename
//const currentPage = window.location.pathname.split("/").pop();

// Filter out the current page from the list
// const otherPages = pages.filter((page) => page !== currentPage);

// // Pick a random page
// const randomPage = otherPages[Math.floor(Math.random() * otherPages.length)];

// // Assign random page to the button
// document.getElementById("enter_button").addEventListener("click", function () {
//   window.location.href = randomPage;
// });

// function visitGallery() {
//   window.location = "gallery.html";
// }
