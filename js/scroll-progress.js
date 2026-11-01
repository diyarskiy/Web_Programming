$(document).ready(function () {

    const progressBar = $("#scrollProgress");

    function updateProgress() {

        // Сколько пикселей пользователь прокрутил
        const scrollTop = $(window).scrollTop();

        // Полная высота документа
        const documentHeight = $(document).height();

        // Высота видимой области браузера
        const windowHeight = $(window).height();

        // Максимальная возможная прокрутка
        const scrollableHeight = documentHeight - windowHeight;

        // Рассчитываем процент
        const progress = scrollableHeight > 0
            ? (scrollTop / scrollableHeight) * 100
            : 100;

        // Обновляем ширину полосы
        progressBar.css(
            "width",
            Math.min(100, Math.max(0, progress)) + "%"
        );
    }

    // Запускаем при прокрутке
    $(window).on("scroll", updateProgress);

    // Обновляем при изменении размера окна
    $(window).on("resize", updateProgress);

    // Устанавливаем правильное значение при загрузке
    updateProgress();

});