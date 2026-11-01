$(document).ready(function () {

    const toast = $("#adventureToast");

    let toastTimer;

    window.showAdventureToast = function () {

        clearTimeout(toastTimer);

        toast.addClass("show");

        // Плавно скрываем уведомление
        toastTimer = setTimeout(function () {
            toast.removeClass("show");
        }, 1800);
    };

});