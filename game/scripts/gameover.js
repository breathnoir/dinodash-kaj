DinoGame.GameOver = {
    init: function() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
            <h1>Game Over</h1>
            <p>Well played, ${localStorage.getItem('playerName')}!</p>
            <p>Your final score was ${localStorage.getItem('finalScore')}</p>
            <button onclick="DinoGame.loadState('MENU')">Menu</button>
            <button onclick="DinoGame.loadState('PLAYING')">Play Again</button>
        `;
    }
};
