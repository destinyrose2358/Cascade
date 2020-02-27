import Space from "./space";


export default class Board {
    constructor() {
        this.spaces = {[[0,0]]: new Space({duration: 2, width: 400, height: 400, startX: 0, startY: 0})};
    }

    divide(space, num) {
        const currentSpace = this.spaces[currentSpace];
        delete this.spaces[currentSpace];

        for (let row = 0; row < (num || currentSpace.score); row++ ) {
            for (let col = 0; col < (num || currentSpace.score); col++ ) {
                this.spaces[[row]]
            }
        }
    }
}