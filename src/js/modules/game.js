import {Snake} from "./snake.js";
import {Food} from "./food.js";

export class Game {
    snake = null;
    context = null;
    positionSize = null;
    positionCount = null;
    score = 0;
    scoreElement = null;
    interval = null;

    constructor(context, settings) {
        this.context = context;

        this.positionSize = settings.positionSize;
        this.positionCount = settings.positionCount;

        this.scoreElement = document.getElementById('score');

        document.getElementById('start').onclick = () => {
            this.startGame();
        }
        document.getElementById('start-mob').onclick = () => {
            this.startGame();
        }

    }

    startGame() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.food = new Food(this.context, this.positionCount, this.positionSize);
        this.snake = new Snake(this.context, this.positionCount, this.positionSize);
        this.food.setNewFoodPosition();

        this.interval = setInterval((this.gameProcess.bind(this)), 150)
    }

    gameProcess() {
        this.context.clearRect(0, 0, this.positionSize * this.positionCount,
            this.positionCount * this.positionSize);

        // this.showGrid();
        this.food.showFood();
        let result = this.snake.showSnake(this.food.foodPosition);
        if (result.collision) {
            this.endGame();
        } else if (result.gotFood) {
            this.score += 1;
            this.scoreElement.innerText = this.score;
            this.food.setNewFoodPosition();
        }
    }

    endGame() {
        clearInterval(this.interval);

        this.context.clearRect(0, 0, this.positionSize * this.positionCount,
            this.positionCount * this.positionSize);
        this.snake = null;
        this.food = null;

        this.context.fillStyle = 'red';
        const fontSize = window.innerWidth < 480 ? 30 : 48
        this.context.font = `bold ${fontSize}px Arial`;
        this.context.textAlign = 'center';
        this.context.fillText(`Your score: ${this.score}`,
            (this.positionSize * this.positionCount) / 2,
            (this.positionSize * this.positionCount) / 2);
    }

    showGrid() {
        const size = this.positionCount * this.positionSize;
        for (let x = 0; x <= size; x += this.positionSize) {
            this.context.moveTo(0.5 + x + this.positionSize, 0);
            this.context.lineTo(0.5 + x + this.positionSize, size + this.positionSize);
        }

        for (let x = 0; x <= size; x += this.positionSize) {
            this.context.moveTo(0, 0.5 + x + this.positionSize);
            this.context.lineTo(size + this.positionSize, 0.5 + x + this.positionSize);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();
    }
}