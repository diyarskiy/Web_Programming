// Apply the saved theme before the browser paints the page.
document.documentElement.dataset.theme = localStorage.getItem("portal.theme") || "light";
