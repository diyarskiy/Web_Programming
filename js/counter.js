$(document).ready(function () {

    const statsSection = $(".multiverse-stats");

    // Запускаем анимацию счётчиков
    function startCounters() {

        $(".counter").each(function () {

            const counter = $(this);

            // Получаем конечное число
            const target = Number(counter.attr("data-target"));

            // Анимируем значение от 0 до target
            $({ count: 0 }).animate(
                { count: target },
                {
                    duration: 4500,
                    easing: "linear",

                    step: function (now) {
                        counter.text(Math.floor(now));
                    },

                    complete: function () {
                        counter.text(target);
                    }
                }
            );

        });
    }

    // Следим за появлением секции на экране
    if (statsSection.length) {

        const observer = new IntersectionObserver(
            function (entries) {

                if (entries[0].isIntersecting) {

                    startCounters();

                    // Запускаем только один раз
                    observer.disconnect();
                }
            },
            {
                threshold: 0.3
            }
        );

        observer.observe(statsSection[0]);
    }

});