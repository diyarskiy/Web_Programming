const menuButton = document.getElementById("menuButton");
const links = document.getElementById("siteLinks");
menuButton.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
});

const themeButton = document.getElementById("themeButton");
function updateThemeButton() {
    themeButton.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
}
themeButton.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portal.theme", theme);
    updateThemeButton();
});
window.addEventListener("pageshow", () => {
    document.documentElement.dataset.theme = localStorage.getItem("portal.theme") || "light";
    updateThemeButton();
});
updateThemeButton();

document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(
        "#mainNav .nav-link"
    );


    menuLinks.forEach(function (link, index) {
        link.addEventListener("keydown", function (event) {
            let nextIndex;

            switch (event.key) {
                case "ArrowRight":
                    nextIndex = (index + 1) % menuLinks.length;
                    break;

                case "ArrowLeft":
                    nextIndex =
                        (index - 1 + menuLinks.length) % menuLinks.length;
                    break;

                default:
                    return;
            }

            event.preventDefault();
            menuLinks[nextIndex].focus();
        });
    });
});
