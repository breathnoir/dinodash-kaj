if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('https://breathnoir.github.io/dinodash-kaj/game/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

function updateOnlineStatus() {
    if (navigator.onLine) {
        console.log('Online');
        // Additional actions when online
    } else {
        console.log('Offline');
        // Additional actions when offline
    }
}

window.addEventListener('online',  updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

updateOnlineStatus();

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

DinoGame.init = function() {
    console.log("Initializing game");
    this.loadState('MENU');
    this.checkMusicPreference();
    this.setupMusicControl();
};

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


window.addEventListener('popstate', function(event) {
    if (event.state && event.state.state === 'MENU') {
        DinoGame.loadState('MENU');
    }
});

window.onload = DinoGame.init.bind(DinoGame);
