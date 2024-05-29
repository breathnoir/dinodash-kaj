DinoGame.GameOver = {
    init: function() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <h1>Game Over</h1>
            <p>Your score: 123</p> <!-- Dynamically update based on actual score -->
            <button onclick="DinoGame.loadState('MENU')">Return to Menu</button>
        `;
    }
};
