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

const matchingCharacters = Array.from(characters).filter(function (card) {
    const text = card.textContent.toLowerCase();

    return text.includes(query);
});

const matchingNames = matchingCharacters.map(function (card) {
    return card.querySelector("h2").textContent;
});

characters.forEach(function (card) {
    card.style.display = matchingCharacters.includes(card)
        ? ""
        : "none";
});

console.log("Found characters:", matchingNames);
}
