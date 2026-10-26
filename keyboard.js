
document.addEventListener("DOMContentLoaded", function () {
    const menuLinks = document.querySelectorAll(
        "#mainNav .nav-link"
    );

    console.log("Navigation links found:", menuLinks.length);

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
