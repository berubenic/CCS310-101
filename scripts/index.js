// vanilla js
// on document load, get url and set is active on the nav item
document.addEventListener("DOMContentLoaded", function () {
  let url = window.location.pathname;
  // remove slash from the url
  url = url.substring(1);
  const navItems = document.querySelectorAll(".nav-link");
  // if url has query param ?lang=fr
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang");

  navItems.forEach((item) => {
    if (
      item.getAttribute("href") === url ||
      (item.getAttribute("href") === "/" && url === "")
    ) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }

    // if url has query param ?lang=fr, add the lang to the href
    if (langParam === "fr") {
      item.setAttribute("href", item.getAttribute("href") + "?lang=fr");
    }
  });
});

console.log("Hello from index.js");
