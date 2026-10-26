// filter.js
const searchInput = document.getElementById('characterSearch');
const characters = document.querySelectorAll('.character');

if (searchInput) {
    searchInput.addEventListener('input', function (e) {
        const query = e.target.value.toLowerCase().trim();

        // Пример использования массива и метода высшего порядка (forEach / filter концепт)
        characters.forEach(card => {
            const title = card.querySelector('h2').textContent.toLowerCase();
            const text = card.querySelector('p').textContent.toLowerCase();

            if (title.includes(query) || text.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}