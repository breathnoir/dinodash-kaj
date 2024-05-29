DinoGame.Menu = {
    init: function () {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `
        
    <header>
        <h1>Dino Dash</h1>
    </header>

    <main>
        <section id="gameIntro">
            <article>
                <form id="startForm">
                    <label for="playerName">Player Name:</label>
                    <input type="text" id="playerName" name="playerName" placeholder="Enter your name" autofocus required>

                    <fieldset>
                        <legend>Choose Your Character</legend>
                        <label>
                            <input type="radio" name="character" value="dino1" checked>
                            Dino 1
                        </label>
                        <label>
                            <input type="radio" name="character" value="dino2">
                            Dino 2
                        </label>
                    </fieldset>

                    <fieldset>
                        <legend>Choose Color Palette</legend>
                        <label>
                            <input type="radio" name="color" value="light" checked>
                            Light
                        </label>
                        <label>
                            <input type="radio" name="color" value="dark">
                            Dark
                        </label>
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