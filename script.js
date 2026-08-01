const gameDiv = document.getElementById("game");

gameDiv.innerHTML = `
    <p>Click to generate a number:</p>
    <button id="btn">Generate</button>
    <p id="number"></p>
`;

document.getElementById("btn").addEventListener("click", () => {
    const n = Math.floor(Math.random() * 20) + 1; // 1 to 20
    document.getElementById("number").textContent = "Number: " + n;
});
