import {RandomUtils} from "../utils/random-utils.js";

export class Food {

    foodRadius = null;
    foodPosition = {
        x: 1,
        y: 1,
    }
    context = null;
    positionSize = null;
    positionCount = null;

    constructor(context, positionCount, positionSize) {
        this.context = context;
        this.positionSize = positionSize;
        this.positionCount = positionCount;

        this.foodRadius = this.positionSize / 2
    }

    setNewFoodPosition() {
        this.foodPosition = {
            x: RandomUtils.getRandomInt(1, this.positionCount),
            y: RandomUtils.getRandomInt(1, this.positionCount),
        }
    }

    showFood() {
        this.context.fillStyle = 'white';
        this.context.beginPath();
        this.context.arc(
            this.foodPosition.x * this.positionSize - this.foodRadius,
            this.foodPosition.y * this.positionSize - this.foodRadius,
            this.foodRadius, 0, 2 * Math.PI,);
        this.context.fill();
    }
}

