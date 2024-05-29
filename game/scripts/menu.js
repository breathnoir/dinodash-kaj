DinoGame.Menu = {
    init: function() {
        const container = document.getElementById('gameContainer');
        container.innerHTML = '<h1>Welcome to Dino Dash</h1>' + 
                              '<button onclick="DinoGame.loadState(\'PLAYING\')">Start Game</button>';
    }
};
