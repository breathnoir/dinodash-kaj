DinoGame.Playing = {
    /**
     * Initializes the game by setting up the game container, canvas, and game entities.
     * Binds the jump event handler to the document.
     * Starts the game loop by calling the draw function.
     * Sets up the obstacle timer to spawn obstacles at regular intervals.
     *
     */
    init: function () {
        const container = document.getElementById('gameContainer');
        container.innerHTML = `<h1>Game On!</h1><canvas id="canvas"></canvas>`;

        this.panel = document.getElementById('canvas');
        this.panel.width = 750;
        this.panel.height = 250;
        this.context = this.panel.getContext('2d');

        const playerName = localStorage.getItem('playerName');
        const colorPalette = localStorage.getItem('colorPalette');
        const canvasElement = document.getElementById('canvas');

        //theme change
        if (colorPalette === 'light') {
            canvasElement.className = 'canvas-light';
        } else if (colorPalette === 'dark') {
            canvasElement.className = 'canvas-dark';
        }
        // Entity and Character setup
        this.setupEntities();

        //choosing obstacles based on character
        if (localStorage.getItem('character') === 'dino') {
            this.obstacleType = 'cactus';
        } else {
            this.obstacleType = 'reedmace';
        }

        //physics
        this.obstacles = [];
        this.gravity = 0.4;
        this.velocityX = -8;
        this.score = 0;
        this.gameOver = false;

        // Bind event handlers
        document.addEventListener('keydown', this.jump.bind(this));

        // Start game loop
        requestAnimationFrame(this.draw.bind(this));
        this.obstacleTimer = setInterval(this.spawnObstacle.bind(this), 1000);
        // setInterval(() => DinoGame.Playing.spawnObstacle(), 1000);
    },

    setupEntities: function () {
        // Define the Entity base class
        DinoGame.Entity = function (x, y, width, height, imgSrc) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.img = new Image();
            this.img.src = imgSrc;
        };

        DinoGame.Entity.prototype.draw = function (context) {
            context.drawImage(this.img, this.x, this.y, this.width, this.height);
        };

        // Define the Character class
        DinoGame.Character = function (x, y) {
            this.character = localStorage.getItem('character');
            // console.log(this.character);

            DinoGame.Entity.call(this, x, y, 88, 94, `assets/sprite_${this.character}1.svg`);
            this.velocityY = 0;
            this.currentSprite = 1;
            this.frameCount = 1;
        };

        DinoGame.Character.prototype = Object.create(DinoGame.Entity.prototype);
        DinoGame.Character.prototype.constructor = DinoGame.Character;

        /**
         * Updates the character's position and sprite based on the given gravity and ground height.
         * Updates frame count and sprite for animation purposes.
         *
         * @param {number} gravity - The acceleration due to gravity.
         * @param {number} groundHeight - The height of the ground.
         */
        DinoGame.Character.prototype.update = function (gravity, groundHeight) {
            this.velocityY += gravity;
            this.y = Math.min(this.y + this.velocityY, groundHeight - this.height);
            if (this.frameCount % 10 === 0) {
                // console.log(this.character);

                this.currentSprite = this.currentSprite === 1 ? 2 : 1;
                this.img.src = `assets/sprite_${this.character}${this.currentSprite}.svg`;
            }
            this.frameCount = (this.frameCount + 1) % 10;
        };

        // Initialize the character
        this.character = new DinoGame.Character(50, this.panel.height - 94);

        // Define the Obstacle class
        DinoGame.Obstacle = function (x, y, width, imgSrc) {
            DinoGame.Entity.call(this, x, y, width, 70, imgSrc);
        };

        DinoGame.Obstacle.prototype = Object.create(DinoGame.Entity.prototype);
        DinoGame.Obstacle.prototype.constructor = DinoGame.Obstacle;
    },
    /**
     * Draws the game scene on the canvas.
     *
     * This function is responsible for updating and drawing the character and obstacles on the canvas.
     * It also handles the game over condition and updates the score display.
     *
     */
    draw: function () {
        if (this.gameOver) {
            clearInterval(this.obstacleTimer); // Ensure we stop spawning new obstacles if game is over
            return;
        }
        this.context.clearRect(0, 0, this.panel.width, this.panel.height);

        // Update and draw character
        this.character.update(this.gravity, this.panel.height);
        this.character.draw(this.context);

        // Update and draw obstacles
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.x += this.velocityX;
            obstacle.draw(this.context);
            if (this.detectCollision(this.character, obstacle)) {
                this.gameOver = true;
                const finalScore = this.score;
                localStorage.setItem('finalScore', finalScore);
                DinoGame.loadState('GAME_OVER');
            }
            return obstacle.x + obstacle.width > 0;
        });

        // Score display
        this.context.fillStyle = 'purple';
        this.context.font = '20px pixelFont';
        this.score++;
        this.context.fillText('Score: ' + this.score, 5, 20);

        requestAnimationFrame(this.draw.bind(this));
    },

    /**
     * Detects collision between two objects.
     *
     * @param {Object} o1 - The first object to check for collision.
     * @param {Object} o2 - The second object to check for collision.
     * @return {boolean} Returns true if there is a collision between the two objects, false otherwise.
     */
    detectCollision: function (o1, o2) {
        return o1.x < o2.x + o2.width && // top left corner vs top right corner
        o1.x + o1.width > o2.x && // top right corner vs top left corner
        o1.y < o2.y + o2.height && // top left corner vs bottom left corner
        o1.y + o1.height > o2.y; // bottom left corner vs top left corner
    },

    /**
     * Handles the jump event and applies the jump velocity to the character if the spacebar is pressed
     * and the character is on the ground.
     *
     * @param {KeyboardEvent} event - The keyboard event triggered by the spacebar press.
     */
    jump: function (event) {
        if (event.code === 'Space' && this.character.y >= this.panel.height - this.character.height) {
            this.character.velocityY = -10;
        }
    },

    /**
     * Spawns an obstacle on the game panel. The obstacle is randomly chosen based on the value of `placeObstacle`.
     * If `placeObstacle` is greater than 0.90, a large obstacle is spawned. If it is greater than 0.70, a medium obstacle is spawned.
     * If it is greater than 0.50, a small obstacle is spawned. The obstacle is spawned at coordinates (700, `this.panel.height - 70`)
     * with the image source determined by `this.obstacleType`. If the number of obstacles on the panel exceeds 5, the oldest obstacle is removed.
     *
     */
    spawnObstacle: function () {

        let placeObstacle = Math.random();
        if (placeObstacle > 0.90) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, 102, `assets/${this.obstacleType}3.png`);
            this.obstacles.push(obstacle);

        } else if (placeObstacle > 0.70) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, 70, `assets/${this.obstacleType}2.png`);
            this.obstacles.push(obstacle);

        } else if (placeObstacle > 0.50) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, 34, `assets/${this.obstacleType}1.png`);
            this.obstacles.push(obstacle);

        }

        if (this.obstacles.length > 5) {
            this.obstacles.shift();
        }
        // console.log('Spawning obstacle at x:', obstacle.x, 'Total obstacles:', this.obstacles.length);


    }

};
