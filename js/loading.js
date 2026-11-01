$(document).ready(function () {

    const button = $("#submitBtn");
    const spinner = $("#submitSpinner");
    const text = $("#submitText");

    if (submitBtn.disabled) {
    return;
}

    window.adventureLoading = {

        show: function () {
            button.prop("disabled", true);
            spinner.removeClass("d-none");
            text.text("Please wait...");
        },

        hide: function () {
            button.prop("disabled", false);
            spinner.addClass("d-none");
            text.text("Start Adventure");
        }

    };

});