// All three steps stay in the form, so Back keeps the user's answers.
const form = document.getElementById("adventureForm");
const steps = form.querySelectorAll(".form-step");
const back = document.getElementById("backBtn");
const next = document.getElementById("nextBtn");
const submit = document.getElementById("submitBtn");
let currentStep = 0;

function showStep(number) {
    currentStep = number;
    document.querySelectorAll(".trip-steps li").forEach((item, index) => {
        if (index === number) item.setAttribute("aria-current", "step");
        else item.removeAttribute("aria-current");
    });
    steps.forEach((step, index) => step.classList.toggle("active", index === number));
    back.style.display = number === 0 ? "none" : "inline-block";
    next.style.display = number === steps.length - 1 ? "none" : "inline-block";
    submit.style.display = number === steps.length - 1 ? "inline-block" : "none";
}

function validateStep(number) {
    let valid = true;
    for (const field of steps[number].querySelectorAll("input, select, textarea")) {
        let message = "";
        if (!field.value.trim()) {
            message = "Please fill in this field.";
        } else if (field.id === "player-email" && !validEmail(field.value.trim())) {
            message = "Please enter a valid email.";
        } else if (field.id === "player-password" && !validPassword(field.value)) {
            message = "Use at least 8 characters with uppercase, lowercase and a number.";
        } else if (field.id === "player-confirm" && field.value !== form.querySelector("#player-password").value) {
            message = "Passwords do not match.";
        }
        field.nextElementSibling.textContent = message;
        field.classList.toggle("invalid", message !== "");
        if (message) valid = false;
    }
    return valid;
}

next.addEventListener("click", () => {
    if (validateStep(currentStep)) showStep(currentStep + 1);
});
back.addEventListener("click", () => showStep(currentStep - 1));

form.addEventListener("submit", event => {
    event.preventDefault();
    if (submit.disabled) return;
    for (let i = 0; i < steps.length; i++) {
        if (!validateStep(i)) {
            showStep(i);
            return;
        }
    }
    const destination = document.getElementById("destination").value;
    submit.disabled = true;
    back.disabled = true;
    $("#submitSpinner").removeClass("d-none");
    $("#submitText").text("Please wait...");
    $("#adventureToast").addClass("show");
    setTimeout(() => $("#adventureToast").removeClass("show"), 1800);
    setTimeout(() => {
        submit.disabled = false;
        back.disabled = false;
        $("#submitSpinner").addClass("d-none");
        $("#submitText").text("Start Adventure");
        location.href = "multiverse.html#" + destination;
    }, 2000);
});
showStep(0);

const destinationMenu = document.getElementById("destination");
const photos = {
    "earth-c137": "c137_.jpeg", "citadel": "citadel.jpg",
    "blips-and-chitz": "blipsandchitz.jpg", "prime-dimension": "prime.jpg",
    "doofus-dimension": "doofus.jpg"
};

destinationMenu.addEventListener("change", () => {
    const stop = destinationMenu.value;
    const name = stop ? destinationMenu.selectedOptions[0].text : "Citadel of Ricks";
    const image = document.getElementById("ticketImage");
    image.src = "images/" + photos[stop || "citadel"];
    image.alt = name;
    document.getElementById("ticketName").textContent = name;
    document.getElementById("ticketLabel").textContent = stop ? "Selected destination" : "Featured destination";
    document.getElementById("ticketNote").textContent = stop ? "Your portal will open here." : "Choose your own stop in step 3.";
});
