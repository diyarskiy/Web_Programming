$(document).ready(function () {

    const copyButton = $("#copyPortalBtn");
    const copyIcon = $("#copyIcon");
    const copyText = $("#copyText");
    const feedback = $("#copyFeedback");

    let feedbackTimer;

    copyButton.on("click", async function () {

        const dimension = $("#portalResult").text().trim();

        if (!dimension || dimension === "Portal is ready!") {
            feedback.text("Activate the portal first.");
            return;
        }

        try {
            await navigator.clipboard.writeText(dimension);

            // Меняем иконку и текст кнопки
            copyIcon.text("✓");
            copyText.text("Copied!");

            // Показываем подтверждение
            feedback.text("Copied to clipboard!");

            clearTimeout(feedbackTimer);

            // Возвращаем кнопку в обычное состояние
            feedbackTimer = setTimeout(function () {
                copyIcon.text("⧉");
                copyText.text("Copy dimension");
                feedback.text("");
            }, 2000);

        } catch (error) {
            feedback.text("Unable to copy text.");
            console.error("Clipboard error:", error);
        }

    });

});