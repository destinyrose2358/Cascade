import Game from "./game";

export default class Space {

    constructor(
        game,
        startX = 0,
        startY = 0,
        width = 400,
        height = 400,
        duration = 2,
        content = {}
    ) {
        this.game = game;
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
        this.left = [];
        this.right = [];
        this.bottom = [];
        this.top = [];
        this.duration = duration;
        this.content = content;
        this.tileTotal = Object.values(this.content).reduce((acc, item) => {
            if (typeof item === "number") {
                return acc + item;
            } else {
                return acc;
            }
        }, 0);
    }

    currentScore() {
        return this.tileTotal || Object.values(this.content).reduce((acc, item) => {
            if (item.__proto__.constructor === Space) {
                return acc + item.currentScore();
            } else {
                return acc;
            }
        }, 0);
    }

    merge(space) {
        if ((this.left.includes(space) ||
            this.right.includes(space) ||
            this.bottom.includes(space) ||
            this.top.includes(space)) &&
            this.sideShared(space)) {

            }
    }

    isAdjacent(space) {
        return (
            (
                (
                    (
                        this.startY >= space.startY &&
                        this.startY < space.startY + space.height
                    ) ||
                    (
                        space.startY >= this.startY &&
                        space.startY < this.startY + this.height
                    )
                ) &&
                (
                    this.startX + this.width === space.startX ||
                    this.startX - space.width === space.startX
                )
            ) ||
            (
                (
                    (
                        this.startX >= space.startX &&
                        this.startX < space.startX + space.width
                    ) ||
                    (
                        space.startX >= this.startX &&
                        space.startX < this.startX + this.width
                    )
                ) &&
                (
                    this.startY + this.height === space.startY ||
                    this.startY - space.height === space.startY
                )
            )
        );
    }

    sharesSide(space) {
        const xDiff = this.startX - space.startX;
        const yDiff = this.startY - space.startY;
        const heightDiff = this.height - space.height;
        const widthDiff = this.width - space.width;
        return (
            (
                yDiff === 0 &&
                heightDiff === 0 &&
                (
                    this.startX + this.width === space.startX ||
                    this.startX - space.width === space.startX
                )
            ) ||
            (
                xDiff === 0 &&
                widthDiff === 0 &&
                (
                    this.starty + this.height === space.startY ||
                    this.starty - space.height === space.startY
                )
            )
        );
    }

    divide(num) {
        num = num || this.currentScore();
        const innerLeft = {};
        const innerRight = {};
        const innerTop = {};
        const innerBottom = {};
    }
}