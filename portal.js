const portalButton = document.getElementById("activatePortal");
const portal = document.getElementById('portalAnimation');
const result = document.getElementById('portalResult');
const description = document.getElementById('portalDescription');

const universes = [
    {
        name: 'Earth C-137',
        description: 'The home dimension associated with Rick Sanchez.'
    },
    {
        name: 'Citadel of Ricks',
        description: 'A place where countless versions of Rick and Morty gather.'
    },
    {
        name: 'Cronenberg Dimension',
        description: 'A terrifying dimension filled with mutated creatures.'
    },
    {
        name: 'Blips and Chitz',
        description: 'An intergalactic arcade full of games and adventures.'
    },
    {
        name: 'Froopyland',
        description: 'A colorful artificial world created by Rick.'
    }
];

const portalSound = new Audio('sounds/portal.mp3');

portalButton.addEventListener('click', function () {
    const randomIndex = Math.floor(Math.random() * universes.length);
    const selectedUniverse = universes[randomIndex];

    result.textContent = selectedUniverse.name;
    description.textContent = selectedUniverse.description;

    portal.classList.remove('active');
    void portal.offsetWidth;
    portal.classList.add('active');

    portalSound.currentTime = 0;
    portalSound.play().catch(function (error) {
        console.log('Sound could not be played:', error);
    });
});