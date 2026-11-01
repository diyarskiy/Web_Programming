$(document).ready(function () {

    const images = $(".lazy-image");

    function loadVisibleImages() {

        const windowTop = $(window).scrollTop();
        const windowBottom = windowTop + $(window).height();

        images.each(function () {

            const image = $(this);

            // Если уже загружено, пропускаем
            if (image.attr("src")) {
                return;
            }

            const imageTop = image.offset().top;

            // Проверяем, приблизилось ли изображение к экрану
            if (imageTop <= windowBottom + 150) {

                const source = image.attr("data-src");

                if (source) {
                    image.attr("src", source);
                    image.removeAttr("data-src");
                }
            }
        });
    }

    // Загрузка при прокрутке
    $(window).on("scroll", loadVisibleImages);

    // Проверка при изменении размера окна
    $(window).on("resize", loadVisibleImages);

    // Проверка сразу после открытия страницы
    loadVisibleImages();

});