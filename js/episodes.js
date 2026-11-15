const episodeButton = document.getElementById("episodeButton");
const episodeResult = document.getElementById("episodeResult");
let episodes = [];
let lastPick;

episodeButton.addEventListener("click", async () => {
    episodeButton.disabled = true;
    try {
        if (!episodes.length) {
            episodeResult.textContent = "Loading episodes…";
            const response = await fetch("https://api.tvmaze.com/shows/216/episodes", {
                signal: AbortSignal.timeout(12000)
            });
            if (!response.ok) throw new Error("Episode list unavailable");
            episodes = await response.json();
            if (!episodes.length) throw new Error("Empty episode list");
        }
        const choices = episodes.length > 1 ? episodes.filter(item => item !== lastPick) : episodes;
        lastPick = choices[Math.floor(Math.random() * choices.length)];
        episodeResult.textContent = "Season " + lastPick.season + ", episode " + lastPick.number + " — " + lastPick.name;
        episodeButton.textContent = "Pick another episode";
    } catch {
        episodeResult.textContent = "The episode guide could not load. Try again.";
        episodeButton.textContent = "Try again";
    } finally {
        episodeButton.disabled = false;
    }
});
