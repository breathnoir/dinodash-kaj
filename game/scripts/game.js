var DinoGame = DinoGame || {};

DinoGame.init = function() {
    console.log("Initializing game");
    this.loadState('MENU');
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
