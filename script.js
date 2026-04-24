function rollDice() {

    const numOfD4 = document.getElementById("d4").value;
    const numOfD6 = document.getElementById("d6").value;
    const numOfD8 = document.getElementById("d8").value;
    const numOfD10 = document.getElementById("d10").value;
    const numOfD12 = document.getElementById("d12").value;
    const numOfD20 = document.getElementById("d20").value;
    const numOfD100 = document.getElementById("d100").value;
    const diceResults = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    const values = [];
    const images = [];

    for (let i = 0; i < numOfD4; i++) {
        const value = Math.floor(Math.random() * 4) + 1;
        values.push(value);
        images.push(`<img src=D4/${value}.png alt="D4">`);
    }

    diceResults.textContent = `Résultats: ${values.join(", ")}`;
    diceImages.innerHTML = images.join("");
}