$(document).ready(function () {

    const searchInput = $("#multiverseSearch");
    const content = $(".multiverse-layout");

    function removeHighlights() {

        content.find("mark.search-highlight").each(function () {

            $(this).replaceWith(
                document.createTextNode($(this).text())
            );

        });

        content[0]?.normalize();
    }

    function highlightText(query) {

        removeHighlights();

        if (!query) {
            return;
        }

        const walker = document.createTreeWalker(
            content[0],
            NodeFilter.SHOW_TEXT
        );

        const textNodes = [];

        while (walker.nextNode()) {
            const node = walker.currentNode;

            if (
                node.nodeValue.trim() &&
                !$(node.parentNode).closest(
                    "script, style, mark"
                ).length
            ) {
                textNodes.push(node);
            }
        }

        textNodes.forEach(function (node) {

            const text = node.nodeValue;
            const lowerText = text.toLowerCase();
            const lowerQuery = query.toLowerCase();

            let position = 0;
            let index;

            const fragment = document.createDocumentFragment();

            while (
                (index = lowerText.indexOf(
                    lowerQuery, position
                )) !== -1
            ) {

                fragment.appendChild(
                    document.createTextNode(
                        text.slice(position, index)
                    )
                );

                const mark = document.createElement("mark");
                mark.className = "search-highlight";
                mark.textContent = text.slice(
                    index,
                    index + query.length
                );

                fragment.appendChild(mark);

                position = index + query.length;
            }

            if (position > 0) {

                fragment.appendChild(
                    document.createTextNode(
                        text.slice(position)
                    )
                );

                node.replaceWith(fragment);
            }
        });
    }

    searchInput.on("input", function () {

        const query = $(this).val().trim();

        highlightText(query);

    });

});