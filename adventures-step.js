
(() => {
    const steps = document.querySelectorAll(".form-step");

    const backBtn = document.getElementById("backBtn");
    const nextBtn = document.getElementById("nextBtn");
    const submitBtn = document.getElementById("submitBtn");

    let currentStep = 0;

    function showStep() {
        steps.forEach(function (step, index) {
            step.classList.toggle("active", index === currentStep);
        });

        backBtn.style.display =
            currentStep === 0 ? "none" : "inline-block";

        nextBtn.style.display =
            currentStep === steps.length - 1 ? "none" : "inline-block";

        submitBtn.style.display =
            currentStep === steps.length - 1 ? "inline-block" : "none";
    }

    function validateStep1() {
        const name = document.getElementById("player-name");
        const email = document.getElementById("player-email");

        const nameError = document.getElementById("nameError");
        const emailError = document.getElementById("emailError");

        let valid = true;

        nameError.textContent = "";
        emailError.textContent = "";

        if (name.value.trim() === "") {
            setError("player-name", "nameError", "Please enter your name.");
            valid = false;
}       else {
            setError("player-name", "nameError", "");
}

        if (!email.validity.valid || email.value.trim() === "") {
            setError("player-email", "emailError", "Please enter a valid email.");
            valid = false;
        }

        return valid;
    }

    function validateStep2() {
        const password = document.getElementById("player-password");
        const confirm = document.getElementById("player-confirm");

        const passwordError = document.getElementById("passwordError");
        const confirmError = document.getElementById("confirmError");

        let valid = true;

        passwordError.textContent = "";
        confirmError.textContent = "";

        if (password.value.length < 8) {
            passwordError.textContent =
                "Password must contain at least 8 characters.";
            valid = false;
        }

        if (confirm.value !== password.value || confirm.value === "") {
            confirmError.textContent = "Passwords do not match.";
            valid = false;
        }

        return valid;
    }


    function validateStep3() {
    const destination = document.getElementById("destination");
    const message = document.getElementById("adventure-message");

    const destinationError = document.getElementById("destinationError");
    const messageError = document.getElementById("messageError");

    let valid = true;

    destinationError.textContent = "";
    messageError.textContent = "";

    if (destination.value === "") {
        destinationError.textContent = "Please select a destination.";
        valid = false;
    }

    if (message.value.trim() === "") {
        messageError.textContent = "Please enter your adventure message.";
        valid = false;
    }

    return valid;
}

    nextBtn.addEventListener("click", function () {
        if (currentStep === 0 && !validateStep1()) {
            return;
        }

        if (currentStep === 1 && !validateStep2()) {
            return;
        }

        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep();
        }
    });

    backBtn.addEventListener("click", function () {
        if (currentStep > 0) {
            currentStep--;
            showStep();
        }
    });

    const adventureForm = document.getElementById("adventureForm");

    adventureForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateStep1()) {
        currentStep = 0;
        showStep();
        return;
    }

    if (!validateStep2()) {
        currentStep = 1;
        showStep();
        return;
    }

    if (!validateStep3()) {
        currentStep = 2;
        showStep();
        return;
    }

    const destination = document.getElementById("destination").value;

    alert("Form submitted successfully! Redirecting to your adventure!");

    window.location.href = "multiverse.html#" + destination;
});

    showStep();
})();
