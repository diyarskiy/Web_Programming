const openBtn = document.getElementById('openPopup');
const closeBtn = document.getElementById('closePopup');
const overlay = document.getElementById('popupOverlay');
const form = document.getElementById('subscribeForm');

if (openBtn && overlay) {
    openBtn.addEventListener('click', function () {
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', function () {
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    form.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('subscribeEmail');
    const message = document.getElementById('subscribeMessage');

    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        message.textContent = 'Please enter a valid email';
        return;
    }

    message.textContent = 'Thanks for subscribing!';
    emailInput.value = '';

    setTimeout(function () {
        overlay.classList.remove('active');
        message.textContent = '';
    }, 1500);
});
}
