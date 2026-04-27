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
        images.push(`<img src="D4/${value}.png" alt="D4">`);
    }
    for (let i = 0; i < numOfD6; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="D6/${value}.png" alt="D6">`);
    }
    for (let i = 0; i < numOfD8; i++) {
        const value = Math.floor(Math.random() * 8) + 1;
        values.push(value);
        images.push(`<img src="D8/${value}.png" alt="D8">`);
    }
    for (let i = 0; i < numOfD10; i++) {
        const value = Math.floor(Math.random() * 10) + 1;
        values.push(value);
        images.push(`<img src="D10/${value}.png" alt="D10">`);
    }
    for (let i = 0; i < numOfD12; i++) {
        const value = Math.floor(Math.random() * 12) + 1;
        values.push(value);
        images.push(`<img src="D12/${value}.png" alt="D12">`);
    }
    for (let i = 0; i < numOfD20; i++) {
        const value = Math.floor(Math.random() * 20) + 1;
        values.push(value);
        images.push(`<img src="D20/${value}.png" alt="D20">`);
    }
    for (let i = 0; i < numOfD100; i++) {
        const value = (Math.floor(Math.random() * 10) + 1) * 10;
        values.push(value);
        images.push(`<img src="D100/${value}.png" alt="D100">`);
    }
    

    diceResults.textContent = `Résultats: ${values.join(", ")}`;
    diceImages.innerHTML = images.join("");
}

function resetDice() {
    const diceResults = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    
    diceImages.innerHTML = "";
    diceResults.textContent = "";
}
