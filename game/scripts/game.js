DinoGame.Playing = {
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

        if (colorPalette === 'light') {
            canvasElement.className = 'canvas-light';
        } else if (colorPalette === 'dark') {
            canvasElement.className = 'canvas-dark';
        }
        // Entity and Character setup
        this.setupEntities();

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
        DinoGame.Obstacle = function (x, y, imgSrc) {
            DinoGame.Entity.call(this, x, y, 70, 70, imgSrc);
        };

        DinoGame.Obstacle.prototype = Object.create(DinoGame.Entity.prototype);
        DinoGame.Obstacle.prototype.constructor = DinoGame.Obstacle;
    },

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

    detectCollision: function (o1, o2) {
        return o1.x < o2.x + o2.width && o1.x + o1.width > o2.x &&
            o1.y < o2.y + o2.height && o1.y + o1.height > o2.y;
    },

    jump: function (event) {
        if (event.code === 'Space' && this.character.y >= this.panel.height - this.character.height) {
            this.character.velocityY = -10;
        }
    },

    spawnObstacle: function () {
        let placeObstacle = Math.random();
        if (placeObstacle > 0.90) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, "assets/reedmace3.svg");
            this.obstacles.push(obstacle);

        } else if (placeObstacle > 0.70) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, "assets/reedmace2.svg");
            this.obstacles.push(obstacle);

        } else if (placeObstacle > 0.50) {
            let obstacle = new DinoGame.Obstacle(700, this.panel.height - 70, "assets/reedmace1.svg");
            this.obstacles.push(obstacle);

        }

        if (this.obstacles.length > 5) {
            this.obstacles.shift();
        }
        // console.log('Spawning obstacle at x:', obstacle.x, 'Total obstacles:', this.obstacles.length);


    }

};
