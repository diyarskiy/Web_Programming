const questions = document.querySelectorAll('.faq-question');

questions.forEach(function (question) {
    question.addEventListener('click', function () {
        question.parentElement.classList.toggle('open');
    });
});
