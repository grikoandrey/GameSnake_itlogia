import {Game} from "./modules/game.js";

class App {

    settings = {
        positionCount: 30,
        positionSize: 20,
    }

    constructor() {
        if (window.innerWidth < 620) {
            this.settings.positionCount = 30; // Уменьшаем количество позиций
            this.settings.positionSize = 15;  // Уменьшаем размер одной позиции
        }
        if (window.innerWidth < 470) {
            this.settings.positionCount = 30; // Уменьшаем количество позиций
            this.settings.positionSize = 13;  // Уменьшаем размер одной позиции
        }
        if (window.innerWidth < 408) {
            this.settings.positionCount = 30; // Уменьшаем количество позиций
            this.settings.positionSize = 10;  // Уменьшаем размер одной позиции
        }

        const canvas = document.createElement('canvas');
        canvas.setAttribute('width', (this.settings.positionCount * this.settings.positionSize).toString());
        canvas.setAttribute('height', (this.settings.positionCount * this.settings.positionSize).toString());
        document.getElementById('canvas').appendChild(canvas);

        const context = canvas.getContext('2d');

        new Game(context, this.settings);
    }
}

(new App());