const accountsKey = "portal.accounts";
const sessionKey = "portal.traveler";
const accounts = JSON.parse(localStorage.getItem(accountsKey) || "[]");
const form = document.querySelector("form");

async function digest(value) {
    const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
    return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
}

if (form) {
    let creating = false;
    const login = document.querySelector("#login");
    const signup = document.querySelector("#signup");
    const message = document.querySelector("#message");
    function setMode(isSignup) {
        creating = isSignup;
        login.setAttribute("aria-pressed", String(!creating));
        signup.setAttribute("aria-pressed", String(creating));
        document.querySelectorAll(".extra").forEach(label => label.hidden = !creating);
        form.elements.password.autocomplete = creating ? "new-password" : "current-password";
        document.querySelector("#formTitle").textContent = creating ? "Create your account" : "Log in to your account";
        document.querySelector("#submit").textContent = creating ? "Create account" : "Log in";
        message.textContent = "";
    }
    login.onclick = () => setMode(false);
    signup.onclick = () => setMode(true);
    form.onsubmit = async event => {
        event.preventDefault();
        const name = form.elements.name.value.trim();
        const email = form.elements.email.value.trim().toLowerCase();
        const phone = form.elements.phone.value.trim();
        const password = form.elements.password.value;
        if (creating && !name) {
            message.textContent = "Enter your name.";
        } else if (!validEmail(email)) {
            message.textContent = "Enter a valid email address.";
        } else if (creating && !/^\+?\d{7,15}$/.test(phone.replace(/[ ()-]/g, ""))) {
            message.textContent = "Enter a phone number with 7 to 15 digits.";
        } else if (creating && !validPassword(password)) {
            message.textContent = "Use at least 8 characters with uppercase, lowercase and a number.";
        } else {
            const account = accounts.find(person => person.email === email);
            const hash = await digest(password);
            if (creating) {
                if (account) {
                    message.textContent = "That email already has an account.";
                    return;
                }
                accounts.push({name, email, phone, hash});
                localStorage.setItem(accountsKey, JSON.stringify(accounts));
                setMode(false);
                form.elements.password.value = "";
                message.textContent = "Account created. Log in to view your profile.";
                return;
            }
            if (!account || account.hash !== hash) {
                message.textContent = "Check your email and password.";
                return;
            }
            localStorage.setItem(sessionKey, email);
            location.href = "profile.html";
        }
    };
} else {
    const traveler = accounts.find(person => person.email === localStorage.getItem(sessionKey));
    if (traveler) {
        document.querySelector("#signInPrompt").hidden = true;
        document.querySelector(".pass").hidden = false;
        document.querySelector(".profile-actions").hidden = false;
        document.querySelector("#record").textContent = "Personal account";
        document.querySelector("#initials").textContent = traveler.name.trim().split(/\s+/).slice(0, 2).map(word => Array.from(word)[0]).join("").toUpperCase();
        document.querySelector("#traveler").textContent = traveler.name;
        document.querySelector("#phone").textContent = traveler.phone;
        document.querySelector("#email").textContent = traveler.email;
        const link = document.querySelector("#accountLink");
        link.textContent = "Log out";
        link.onclick = () => localStorage.removeItem(sessionKey);
    }
}

// A restored browser tab must reflect a logout from another page.
window.addEventListener("pageshow", event => {
    if (event.persisted) location.reload();
});
