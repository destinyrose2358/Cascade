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
                const newStartX = Math.min(this.startX, space.startX);
                const newStartY = Math.min(this.startY, space.startY);
                const newWidth = Math.max(this.startX + this.width, space.startX + space.width) - newStartX;
                const newHeight = Math.max(this.startY + this.height, space.startY + space.height) - newStartY;
                const newLeftNeightbors = 
                
                const newSpace = new Space(
                    this.game,
                    newStartX,
                    newStartY,
                    newWidth,
                    newHeight,
                    Math.floor(this.duration + space.duration / 2)
                );
                
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

    divide(division) {
        division = division ? parseInt(division) : this.currentScore();
        if (!division) return;
        const innerLeft = [];
        const innerRight = [];
        const innerTop = [];
        const innerBottom = [];
        const newContent = [];

        for (let newContentX = 0; newContentX < division; newContentX++) {
            let newRow = [];
            for (let newContentY = 0; newContentY < division; newContentY++) {
                let newSpace = new Space(
                    this.game,
                    this.startX + this.width * newContentX / division,
                    this.startY + this.height * newContentY / division,
                    this.width / division,
                    this.height / division,
                    this.duration
                );

                newRow.push(newSpace);

                switch (newContentX) {
                    case 0:
                        innerLeft.push(newSpace);
                        break;
                    case division - 1:
                        innerRight.push(newSpace);
                        break;
                }

                switch (newContentY) {
                    case 0:
                        innerTop.push(newSpace);
                    break;
                    case division - 1:
                        innerBottom.push(newSpace);
                    break;
                }
            }
            newContent.push(newRow);
        }

        newContent.forEach((row, x) => row.forEach((space, y) => {
            let neighbors;
            const sides = [
                [
                    "left",
                    "right",
                    x > 0,
                    x - 1,
                    y
                ],
                [
                    "right",
                    "left",
                    x < division - 1,
                    x + 1,
                    y
                ],
                [
                    "top",
                    "bottom",
                    y > 0,
                    x,
                    y - 1
                ],
                [
                    "bottom",
                    "top",
                    y < division - 1,
                    x,
                    y + 1
                ]
            ];

            sides.forEach(([spaceSelfDirection, possibleNeighborDirection, conditionMet, offsetX, offsetY]) => {
                if (conditionMet) {
                    space[spaceSelfDirection] = [newContent[offsetX][offsetY]];
                } else {
                    neighbors = this[spaceSelfDirection].filter((possibleNeighbor) => {
                        let selfIndex = possibleNeighbor[possibleNeighborDirection].indexOf(this);
                        delete possibleNeighbor[possibleNeighborDirection][selfIndex];
                        if (this.isAdjacent(possibleNeighbor)) {
                            possibleNeighbor[possibleNeighborDirection].push(space);
                            return true;
                        }
                        return false;
                    });
                    space[spaceSelfDirection] = neighbors;
                }
            });
        }));

        delete this.game.spaces[[this.startX, this.startY]];
        const newGameSpaces = {};
        newContent.flat().forEach((space) => newGameSpaces[[space.startX, space.startY]] = space);
        this.game.spaces = Object.assign({}, this.game.spaces, newGameSpaces);
    }

    score(player) {
        this.content[player] = this.content[player] ? this.content[player] + 1 : 1;
        this.tileTotal += 1;
    }

}