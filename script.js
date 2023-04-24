const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreDisplay = document.getElementById('score-display');
let isJumping = false;
let gameInterval;
let score = 0;
    

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function startGame() {
    scoreDisplay.textContent = `Score: ${score}`
    moveCactus()
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpHeight = 0;
        const jumpInterval = setInterval(() => {
            if (jumpHeight >= 150) {
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    if (jumpHeight === 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                    jumpHeight -= 10;
                    dino.style.bottom = `${jumpHeight}px`;
                }, 30);
            }
            jumpHeight += 10;
            dino.style.bottom = `${jumpHeight}px`;
        }, 30);
    }
}

function moveCactus() {
    let cactusPosition = window.innerWidth;
    let scoreUpdated = false;
    gameInterval = setInterval(() => {
        if (cactusPosition <= -40) {
            if (!scoreUpdated) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                scoreUpdated = true;
            }
            clearInterval(gameInterval);
            cactusPosition = window.innerWidth;
            moveCactus();
        }
        cactusPosition -= 5;
        cactus.style.left = `${cactusPosition}px`;
        checkCollision();
    }, 20);
}

function checkCollision() {
    const dinoPosition = dino.getBoundingClientRect();
    const cactusPositionRect = cactus.getBoundingClientRect();

    if (
        dinoPosition.bottom > cactusPositionRect.top &&
        dinoPosition.right > cactusPositionRect.left &&
        dinoPosition.left < cactusPositionRect.right &&
        cactusPositionRect.bottom > 0
    ) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameInterval);
    alert('Game Over! Refresh the page to play again.');
}

startGame();
