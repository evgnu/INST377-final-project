const zeldaLore = document.getElementById("zeldaLore");
const zeldaDungeons = document.getElementById("zeldaDungeons");
const zeldaPlaces = document.getElementById("zeldaPlaces");
async function loadLore() {
    let zeldaAllLore = [];
    for (let page = 0; page < 10; page++) {
        const response = await fetch(`https://zelda.fanapis.com/api/games?limit=50&page=${page}`);
        const zeldaDataL = await response.json();
        zeldaAllLore = zeldaAllLore.concat(zeldaDataL.data);
    }
    const zeldaShufflerL = zeldaAllLore.sort(() => Math.random() - 0.5);

    const zeldaRandomsL = zeldaShufflerL.slice(0,20);
    zeldaRandomsL.forEach(game => {
        const loreInfo = document.createElement("div");
        loreInfo.classList.add("Zelda-Game-Information");
        loreInfo.innerHTML = `
            <h2>${game.name}</h2>
            <p>
                <strong>Released:</strong>
                ${game.released_date || "Unknown"}
            </p>
            <p>
                <strong>Developer:</strong>
                ${game.developer ||  "Unknown"}
            </p>
            <p>
                <strong>Publisher:</strong>
                ${game.publisher || "Unknown"}
            </p>
            <p>
                <strong>Lore Description:</strong>
                ${game.description || "None"}
            </p>
        `;
        zeldaLore.appendChild(loreInfo);
    });
}
async function loadDungeons() {
    const response = await fetch ("https://zelda.fanapis.com/api/dungeons?limit=20");
    const dungeonData = await response.json();
    dungeonData.data.forEach(dungeon => {
        const dungeonInfo = document.createElement("div");
        dungeonInfo.classList.add("Zelda-Game-Information");
        dungeonInfo.innerHTML = `
            <h2>${dungeon.name}</h2>
            <p>
                <strong>Description:</strong>
                ${dungeon.description || "None"}
            </p>
        `;
        zeldaDungeons.appendChild(dungeonInfo);
    });
}
async function loadPlaces() {
    const response = await fetch("https://zelda.fanapis.com/api/places?limit=20");
    const placeData = await response.json();
    placeData.data.forEach(place => {
        const placeInfo = document.createElement("div");
        placeInfo.classList.add("Zelda-Game-Information");
        let inhabitants = "Unknown";
        if (place.inhabitants && place.inhabitants.length > 0) {
            const zeldaInhabitants = place.inhabitants.map(async characterURL => {
                const characterResponse = await fetch(characterURL);
                const characterData = await characterResponse.json();
                return characterData.data.name;
            });
            const zeldaInhabitantNames = await Promise.all(zeldaInhabitants);
            inhabitants = zeldaInhabitantNames.join(", ");

        }
        placeInfo.innerHTML = `
            <h2>${place.name}</h2>
            <p>
                <strong>Inhabitants:</strong>
                ${inhabitants}
            </p>
            <p>
                <strong>Description:</strong>
                ${place.description || "None"}
            </p>
        `;
        zeldaPlaces.appendChild(placeInfo);
    });
}

loadLore();
loadDungeons();
loadPlaces();