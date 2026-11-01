$(document).ready(function () {

    const searchInput = $("#characterSearch");
    const characters = $(".character");
    const suggestions = $("#searchSuggestions");

    // Получаем имена всех персонажей
    const characterNames = characters.map(function () {
        return $(this).find("h2").text().trim();
    }).get();

    // Фильтрация карточек
    function filterCharacters(query) {

        characters.each(function () {

            const card = $(this);
            const text = card.text().toLowerCase();

            const matches = text.includes(query);

            card.toggle(matches);
        });
    }

    // Подсказки при вводе
    function showSuggestions(query) {

        suggestions.empty();

        if (query === "") {
            return;
        }

        const matches = characterNames.filter(function (name) {
            return name.toLowerCase().includes(query);
        });

        matches.forEach(function (name) {

            const item = $("<div>")
                .addClass("suggestion-item")
                .text(name);

            // Нажатие на подсказку
            item.on("click", function () {

                searchInput.val(name);
                suggestions.empty();

                filterCharacters(name.toLowerCase());
            });

            suggestions.append(item);
        });
    }

    // Обрабатываем ввод пользователя
    searchInput.on("input", function () {

        const query = $(this).val().toLowerCase().trim();

        filterCharacters(query);
        showSuggestions(query);
    });

});