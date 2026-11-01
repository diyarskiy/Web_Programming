function setError(inputId, errorId, text) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);

    error.textContent = text;
    input.classList.toggle("invalid", text !== "");

}

$(document).ready(function() {
    console.log("jQuery is ready!");
});