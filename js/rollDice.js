function rollDice() {

    const numOfD4 = parseInt(document.getElementById("d4").value) || 0;
    const numOfD6 = parseInt(document.getElementById("d6").value) || 0;
    const numOfD8 = parseInt(document.getElementById("d8").value) || 0;
    const numOfD10 = parseInt(document.getElementById("d10").value) || 0;
    const numOfD12 = parseInt(document.getElementById("d12").value) || 0;
    const numOfD20 = parseInt(document.getElementById("d20").value) || 0;
    const numOfD100 = parseInt(document.getElementById("d100").value) || 0;

    const diceResults = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    
    const values = [];
    const images = [];

    for (let i = 0; i < numOfD4; i++) {
        const value = Math.floor(Math.random() * 4) + 1;
        values.push(value);
        images.push(`<img src="D4/${value}.png" alt="D4 : ${value}">`);
    }
    for (let i = 0; i < numOfD6; i++) {
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="D6/${value}.png" alt="D6 : ${value}">`);
    }
    for (let i = 0; i < numOfD8; i++) {
        const value = Math.floor(Math.random() * 8) + 1;
        values.push(value);
        images.push(`<img src="D8/${value}.png" alt="D8 : ${value}">`);
    }
    for (let i = 0; i < numOfD10; i++) {
        const value = Math.floor(Math.random() * 10) + 1;
        values.push(value);
        images.push(`<img src="D10/${value}.png" alt="D10 : ${value}">`);
    }
    for (let i = 0; i < numOfD12; i++) {
        const value = Math.floor(Math.random() * 12) + 1;
        values.push(value);
        images.push(`<img src="D12/${value}.png" alt="D12 : ${value}">`);
    }
    for (let i = 0; i < numOfD20; i++) {
        const value = Math.floor(Math.random() * 20) + 1;
        values.push(value);
        images.push(`<img src="D20/${value}.png" alt="D20 : ${value}">`);
    }
    for (let i = 0; i < numOfD100; i++) {
        const value = (Math.floor(Math.random() * 10) + 1) * 10;
        values.push(value);
        images.push(`<img src="D100/${value}.png" alt="D100 : ${value}">`);
    }
    
// Calcul du total 
    const total = values.reduce((acc, val) => acc + val, 0);
    diceResults.textContent = values.length > 0
        ? `Résultats : ${values.join(", ")} — Total : ${total}`
        : "";
    diceImages.innerHTML = images.join("");
}

function resetDice() {
    const diceResults = document.getElementById("diceResult");
    const diceImages = document.getElementById("diceImages");
    
    diceImages.innerHTML = "";
    diceResults.textContent = "";

    ["d4","d6","d8","d10","d12","d20","d100"].forEach(id => {
        document.getElementById(id).value = 1;
    });
}
