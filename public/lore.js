const zeldaLore = document.getElementById("zeldaLore");
async function loadLore() {
    let zeldaAllLore = [];
    for (let page = 0; pag < 10; page++) {
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
                <strong>Lore Descriptino:</strong>
                ${game.description || "None"}
            </p>
        `;
        zeldaLore
    })
}
loadLore();