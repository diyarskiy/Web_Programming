const button = document.getElementById('colorBtn');
const nav = document.getElementById('mainNav');

const color=["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black"];
let index = 0;

button.addEventListener('click', function () {
    nav.classList.remove('bg-dark');
    nav.style.backgroundColor = color[index];

    index = (index + 1) % color.length;
});
