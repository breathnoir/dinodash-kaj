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
                    <input type="text" id="playerName" name="playerName" placeholder="Enter your name" autofocus required maxlength="15"> 

                    <fieldset>
                    <legend>Choose Character</legend>
                    <ul>
                        <li><input type="radio" name="character" id="ch1" value="dino1" checked/>
                            <label for="ch1"><img src="assets/character.svg" /></label>
                        </li>
                        <li><input type="radio" name="character" id="ch2" value="dino2" />
                            <label for="ch2"><img src="assets/reedmace1.svg" /></label>
                        </li>
                    </ul>
                    </fieldset>

                    <fieldset>
                        <legend>Choose Color Palette</legend>
                        <ul>
                            <li>
                                <input type="radio" name="color" value="light" id="clr1" checked>
                                <label for="clr1"><div>Light</div></label>
                            </li>
                            <li>
                                <input type="radio" name="color" value="light" id="clr2">
                                <label for="clr2"><div>Dark</div></label>
                            </li>
                        </ul>
                    </fieldset>

                    <button type="submit">Start Game</button>
                </form>
            </article>
        </section>

        <aside id="instructions">
            <h2>How to Play</h2>
            <p>Use the spacebar to jump over obstacles. The longer you survive, the higher your score!</p>
        </aside>
    </main>
                              `;

        document.getElementById('startForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const playerName = document.getElementById('playerName').value;
            const character = document.querySelector('input[name="character"]:checked').value;
            const colorPalette = document.querySelector('input[name="color"]:checked').value;

            localStorage.setItem('playerName', playerName);
            localStorage.setItem('character', character);
            localStorage.setItem('colorPalette', colorPalette);

            DinoGame.loadState('PLAYING');
        });

    }
};