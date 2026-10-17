const form = document.getElementById('adventureForm');

function setError(inputId, errorId, text) {
    document.getElementById(errorId).textContent = text;
    document.getElementById(inputId).classList.toggle('invalid', text !== '');
}

if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('player-name').value.trim();
        const email = document.getElementById('player-email').value.trim();
        const password = document.getElementById('player-password').value;
        const confirmPassword = document.getElementById('player-confirm').value;
        const destination = document.getElementById('destination').value;
        const message = document.getElementById('adventure-message').value.trim();

        let valid = true;

        if (name === '') {
            setError('player-name', 'nameError', 'Please enter your name');
            valid = false;
        } else {
            setError('player-name', 'nameError', '');
        }

        if (email === '') {
            setError('player-email', 'emailError', 'Please enter your email');
            valid = false;
        } else if (!email.includes('@') || !email.includes('.')) {
            setError('player-email', 'emailError', 'Enter a valid email, e.g. name@mail.com');
            valid = false;
        } else {
            setError('player-email', 'emailError', '');
        }

        if (password.length < 8) {
            setError('player-password', 'passwordError', 'Password must be at least 8 characters');
            valid = false;
        } else {
            setError('player-password', 'passwordError', '');
        }

        if (confirmPassword === '') {
            setError('player-confirm', 'confirmError', 'Please confirm your password');
            valid = false;
        } else if (confirmPassword !== password) {
            setError('player-confirm', 'confirmError', 'Passwords do not match');
            valid = false;
        } else {
            setError('player-confirm', 'confirmError', '');
        }

        if (destination === '') {
            setError('destination', 'destinationError', 'Please select a destination');
            valid = false;
        } else {
            setError('destination', 'destinationError', '');
        }

        if (message === '') {
            setError('adventure-message', 'messageError', 'Please write your adventure message');
            valid = false;
        } else {
            setError('adventure-message', 'messageError', '');
        }

        if (valid) {
            window.location.href = 'multiverse.html#' + destination;
        }
    });
}