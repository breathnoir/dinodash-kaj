//game panel

let panel;
let panelWidth = 750;
let panelHeight = 250;
let context;

//character
let characterWidth = 88;
let characterHeight = 94;

//default position
let characterX = 50;
let characterY = panelHeight - characterHeight;

let characterImage;

let character = {
    x: characterX,
    y: characterY,
    width: characterWidth,
    height: characterHeight
}

//obstacle
let obstacleArray = [];

let obstacleWidth = 70;
let obstacleHeight = 70;
let obstacleX = 700;
let obstacleY = panelHeight - obstacleHeight;

let obstacle1Image;
let obstacle2Image;
let obstacle3Image;

//physics
let velocityX = -8;
let velocityY = 0;
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function() {
    panel = document.getElementById('canvas');
    panel.width = panelWidth;
    panel.height = panelHeight;
    context = panel.getContext('2d');

    characterImage = new Image();
    characterImage.src = 'assets/character.svg';
    characterImage.onload = function() {
        context.drawImage(characterImage, character.x, character.y, character.width, character.height);
    }

    obstacle1Image = new Image();
    obstacle1Image.src = 'assets/reedmace1.svg';
    obstacle2Image = new Image();
    obstacle2Image.src = 'assets/reedmace2.svg';
    obstacle3Image = new Image();
    obstacle3Image.src = 'assets/reedmace3.svg';

    requestAnimationFrame(draw);
    setInterval(chooseObstacle, 1000);

    document.addEventListener('keydown', jump);
}

function draw() {
    requestAnimationFrame(draw);
    if(gameOver) return;
    context.clearRect(0, 0, panelWidth, panelHeight);

    velocityY += gravity;
    character.y = Math.min(character.y + velocityY, characterY);

    context.drawImage(characterImage, character.x, character.y, character.width, character.height);

    for(let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        context.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    
       if(detectCollision(character, obstacle)) gameOver = true;
    }

    //score
    context.fillStyle = 'purple';
    context.font = '20px courier';
    score++;
    context.fillText('Score: ' + score, 5, 20);
}

function jump(event) {
    if(gameOver) return;
    if ((event.code === 'Space') && (character.y == characterY)){
        velocityY = -10;
    }

}

function chooseObstacle() {
    let obstacle = {
        img: null,
        x: obstacleX,
        y: obstacleY,
        width: obstacleWidth,
        height: obstacleHeight
    }
    let placeObstacle = Math.random();
    if(placeObstacle > 0.90) {
        obstacle.img = obstacle3Image;
        obstacleArray.push(obstacle);

    } else if(placeObstacle > 0.70) {
        obstacle.img = obstacle2Image;
        obstacleArray.push(obstacle);

    } else if(placeObstacle > 0.50) {
        obstacle.img = obstacle1Image;
        obstacleArray.push(obstacle);

    }

    if (obstacleArray.length > 5) {
        obstacleArray.shift();
    }
}

function detectCollision(o1, o2) {
    return o1.x < o2.x + o2.width && // top left corner vs top right corner
        o1.x + o1.width > o2.x && // top right corner vs top left corner
        o1.y < o2.y + o2.height && // top left corner vs bottom left corner
        o1.y + o1.height > o2.y; // bottom left corner vs top left corner
}