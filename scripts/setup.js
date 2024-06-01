var DinoGame = DinoGame || {};

DinoGame.music = new Audio('assets/music.mp3');
DinoGame.music.loop = true;  // Loop the music

DinoGame.checkMusicPreference = function() {
    var musicPreference = localStorage.getItem('music');
    var musicIcon = document.getElementById('musicToggle');
    if (musicPreference === 'off') {
        DinoGame.music.pause();
        musicIcon.className = 'fas fa-volume-mute'; // Icon for muted state
    } else {
        DinoGame.music.play();
        musicIcon.className = 'fas fa-volume-up'; // Icon for playing state
    }
};

/**
 * Sets up the music control functionality.
 *
 */
DinoGame.setupMusicControl = function() {
    document.getElementById('musicToggle').addEventListener('click', function() {
        if (this.className.includes('fa-volume-up')) {
            DinoGame.music.pause();
            this.className = 'fas fa-volume-mute'; // Change icon to muted
            localStorage.setItem('music', 'off');
        } else {
            DinoGame.music.play();
            this.className = 'fas fa-volume-up'; // Change icon to volume up
            localStorage.setItem('music', 'on');
        }
    });
};

/**
 * Initializes the game by loading the menu state, checking the music preference, and setting up the music control.
 *
 */
DinoGame.init = function() {
    console.log("Initializing game");
    this.loadState('MENU');
    this.checkMusicPreference();
    this.setupMusicControl();
};

/**
 * Loads the specified state of the game and updates the URL.
 *
 * @param {string} state - The state to load ('MENU', 'PLAYING', or 'GAME_OVER').
 */
DinoGame.loadState = function(state) {
    switch (state) {
        case 'MENU':
            DinoGame.Menu.init();
            break;
        case 'PLAYING':
            DinoGame.Playing.init();
            break;
        case 'GAME_OVER':
            DinoGame.GameOver.init();
            break;
    }
    history.pushState({state: state}, state, `#${state.toLowerCase()}`);
};

//coming back to the menu state via browser back button
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.state === 'MENU') {
        DinoGame.loadState('MENU');
    }
});

window.onload = DinoGame.init.bind(DinoGame);
