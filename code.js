document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const gridSize = 20; // Size of each grid cell
    const gameWidth = gameContainer.clientWidth;
    const gameHeight = gameContainer.clientHeight;
    const snakeSpeed = 100;
    let snake = [{ x: 100, y: 100 }];
    let direction = { x: 1, y: 0 };
    let food = { x: 0, y: 0 };
    let gameInterval;
    let isGameRunning = false;

    function createGameElement(className) {
        const element = document.createElement('div');
        element.className = className;
        return element;
    }

    function placeFood() {
        food.x = Math.floor(Math.random() * (gameWidth / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (gameHeight / gridSize)) * gridSize;
        const foodElement = createGameElement('food');
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
        gameContainer.appendChild(foodElement);
    }

    function updateGame() {
        const newHead = { x: snake[0].x + direction.x * gridSize, y: snake[0].y + direction.y * gridSize };

        if (newHead.x < 0 || newHead.x >= gameWidth || newHead.y < 0 || newHead.y >= gameHeight || isCollision(newHead)) {
            clearInterval(gameInterval);
            endGame();
            return;
        }

        snake.unshift(newHead);

        if (newHead.x === food.x && newHead.y === food.y) {
            document.querySelector('.food').remove();
            placeFood();
        } else {
            snake.pop();
        }

        renderSnake();
    }

    function isCollision(newHead) {
        return snake.some(segment => segment.x === newHead.x && segment.y === newHead.y);
    }

    function renderSnake() {
        gameContainer.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = createGameElement('snake-dot');
            snakeElement.style.left = `${segment.x}px`;
            snakeElement.style.top = `${segment.y}px`;
            gameContainer.appendChild(snakeElement);
        });
        const foodElement = createGameElement('food');
        foodElement.style.left = `${food.x}px`;
        foodElement.style.top = `${food.y}px`;
        gameContainer.appendChild(foodElement);
    }

    function startGame() {
        if (isGameRunning) return;
        isGameRunning = true;
        snake = [{ x: 100, y: 100 }];
        direction = { x: 1, y: 0 };
        placeFood();
        gameInterval = setInterval(updateGame, snakeSpeed);
    }

    function endGame() {
        gameContainer.innerHTML = ''; // Clear the game container
        isGameRunning = false;
    }

    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            case 'Space':
                startGame();
                break;
            case 'ArrowUp':
                if (direction.y === 0) direction = { x: 0, y: -1 };
                break;
            case 'ArrowDown':
                if (direction.y === 0) direction = { x: 0, y: 1 };
                break;
            case 'ArrowLeft':
                if (direction.x === 0) direction = { x: -1, y: 0 };
                break;
            case 'ArrowRight':
                if (direction.x === 0) direction = { x: 1, y: 0 };
                break;
        }
    });
});
