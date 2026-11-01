// greeting.js
const greetingElement = document.getElementById('timeGreeting');

if (greetingElement) {
    const hour = new Date().getHours();
    let message = '';

    // Используем классическую конструкцию if-else для определения времени суток
    if (hour < 12) {
        message = '🌅 Good Morning, traveler! Ready for a morning portal jump?';
    } else if (hour >= 12 && hour < 18) {
        message = '☀️ Good Afternoon! Time to explore new dimensions.';
    } else {
        message = '🌙 Good Evening, dimension traveler! Watch out for the Federation.';
    }

    greetingElement.textContent = message;
}