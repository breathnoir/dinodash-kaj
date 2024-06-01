DinoGame.Menu = {
    init: function () {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
        
    <header>
    <h1>
    <span>D</span><span>i</span><span>N</span><span>o</span> <span>D</span><span>a</span><span>S</span><span>h</span>
    </h1>
    </header>

    <main>
        <section id="gameIntro">
            <article>
                <form id="startForm">
                    <label for="playerName">Player Name:</label>
                    <input class="textInput" type="text" id="playerName" name="playerName" placeholder="Enter your name" 
                    value="${localStorage.getItem('playerName') ? localStorage.getItem('playerName') : ''}" autofocus required maxlength="15"> 
<div id="selecting">
                    <fieldset id="charSelect">
                    <legend>Choose Character</legend>
                    <ul>
                        <li><input type="radio" name="character" id="ch1" value="dino" checked/>
                            <label for="ch1"><img src="assets/sprite_dino1.svg" /></label>
                        </li>
                        <li><input type="radio" name="character" id="ch2" value="frog" />
                            <label for="ch2"><img src="assets/sprite_frog1.svg" /></label>
                        </li>
                        <li><input type="radio" name="character" id="ch3" value="mouse" />
                            <label for="ch3"><img src="assets/sprite_mouse2.svg" /></label>
                        </li>
                    </ul>
                    </fieldset>

                    <fieldset id="colorSelect">
                        <legend>Choose Game Palette</legend>
                        <ul>
                            <li>
                                <input type="radio" name="color" value="light" id="clr1" checked>
                                <label for="clr1"><div>Light</div></label>
                            </li>
                            <li>
                                <input type="radio" name="color" value="dark" id="clr2">
                                <label for="clr2"><div>Dark</div></label>
                            </li>
                        </ul>
                    </fieldset>
</div>
                    <button type="submit">Start Game</button>
                </form>
            </article>
        </section>

        <aside id="instructions">
            <h2>How to Play</h2>
            <p>Use the spacebar to jump over obstacles. <br> The longer you survive, the higher your score!</p>
        </aside>
    </main>
                              `;

        this.setupForm();

    },

        /**
     * Sets up the form for starting the game.
     *
     * This function initializes the form for starting the game by retrieving the player name from local storage,
     * setting the default character and color palette, and adding event listeners for form submission and theme
     * adjustment. It also sets the initial theme based on the stored value or a default value.
     *
     */
    setupForm: function () {
        const bodyElement = document.body;
        const form = document.getElementById('startForm');
        const playerNameInput = document.getElementById('playerName');
        playerNameInput.value = localStorage.getItem('playerName') || '';

        const storedCharacter = localStorage.getItem('character') || 'dino';
        document.querySelector(`input[name="character"][value="${storedCharacter}"]`).checked = true;

        const storedColor = localStorage.getItem('colorPalette') || 'light';
        document.querySelector(`input[name="color"][value="${storedColor}"]`).checked = true;

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const playerName = playerNameInput.value;
            const character = document.querySelector('input[name="character"]:checked').value;
            const colorPalette = document.querySelector('input[name="color"]:checked').value;

            localStorage.setItem('playerName', playerName);
            localStorage.setItem('character', character);
            localStorage.setItem('colorPalette', colorPalette);

            DinoGame.loadState('PLAYING');
        });

        // Add change listeners for theme adjustment
        document.querySelectorAll('input[name="color"]').forEach(input => {
            input.addEventListener('change', function() {
                bodyElement.className = this.value === 'light' ? 'body-light' : 'body-dark';
            });
        });

        // Set initial theme based on stored value or default
        bodyElement.className = storedColor === 'light' ? 'body-light' : 'body-dark';
    }

};