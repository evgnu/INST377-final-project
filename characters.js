const zeldaCharacters = document.getElementById("zeldaCharacters");
async function loadCharacters() {
    let zeldaAll = [];
    for (let page = 0; page < 10; page++) {
        const response = await fetch(`https://zelda.fanapis.com/api/characters?limit=50&page=${page}`);
        const zeldaData = await response.json();
        zeldaAll = zeldaAll.concat(zeldaData.data);
    }
    const zeldaShuffler = zeldaAll.sort(() => Math.random() - 0.5);

    const zeldaRandoms = zeldaShuffler.slice(0,20);
    zeldaRandoms.forEach(async character => {
        const characterInfo = document.createElement("div");
        characterInfo.classList.add("Zelda-Character-Information");
        let zeldaNames = "Unknown";
        if (character.appearances.length > 0) {
            const zeldaHolder = character.appearances.map(async gameURL => {
                const gameResponse = await fetch(gameURL);
                const gameData = await gameResponse.json();
                return gameData.data.name;
            });
            const games = await Promise.all(zeldaHolder);
            zeldaNames = games.join(", ");
        }
        characterInfo.innerHTML = `
            <h2>${character.name}</h2>
            <p>
                <strong>Gender:</strong>
                ${character.gender || "Unknown"}
            </p>
            <p>
                <strong>Race:</strong>
                ${character.race || "Unknown"}
            </p>
            <p>
                <strong>Appears In:</strong>
                ${zeldaNames}
            </p>
            <p>
                <strong>Description:</strong>
                ${character.description || "None available."}
            </p>
        `;
        zeldaCharacters.appendChild(characterInfo);
    });
}
loadCharacters();