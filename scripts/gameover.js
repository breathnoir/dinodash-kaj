DinoGame.GameOver = {
    /**
     * Initializes the game over screen by setting the innerHTML of the game container element showing
     * player name and score. Also calls the loadState function to load the menu state.
     *
     */
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
