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

    divide(division) {
        division = division || this.currentScore();
        const innerLeft = [];
        const innerRight = [];
        const innerTop = [];
        const innerBottom = [];
        const newContent = [];

        for (let x = 0; x < division; x++) {
            let newRow = [];
            for (let y = 0; y < division; y++) {
                let newSpace = new Space(
                    this.game,
                    startX + width * x / division,
                    startY + height * y / division,
                    width / division,
                    height / division,
                    duration
                );

                newRow.push(newSpace);

                switch (x) {
                    case 0:
                        innerLeft.push(newSpace);
                        break;
                    case division - 1:
                        innerRight.push(newSpace);
                        break;
                }

                switch (y) {
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

        const sides = {
            "top": "bottom",
            "bottom": "top",
            "left": "right",
            "right": "left"
        };

        newContent.forEach((row, x) => row.forEach((space, y) => {
            let neighbors;
            Object.entries(sides).forEach(([spaceSelfDirection, possibleNeighborDirection]) => {
                let boundaries = [];
                [x, y].forEach((coord, ind) => {
                    let negativeOffsetX;
                    let negativeOffsetY;
                    let positiveOffsetX;
                    let positiveOffsetY;
                    switch (ind) {
                        case 0:
                            negativeOffsetX = x - 1;
                            negativeOffsetY = y;
                            positiveOffsetX = x + 1;
                            positiveOffsetY = y;
                        case 1:
                            negativeOffsetY = y - 1;
                            negativeOffsetX = x;
                            positiveOffsetY = y + 1;
                            positiveOffsetX = x;
                    }
                    if (coord > 0) {
                        space[spaceSelfDirection] = [newContent[negativeOffsetX][negativeOffsetY]]
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
            });
            if (x > 0) {
                space.left = [newContent[x - 1][y]];
            } else {
                neighbors = this.left.filter((possibleNeighbor) => {
                    let selfIndex = possibleNeighbor.right.indexOf(this);
                    delete possibleNeighbor.right[selfIndex];
                    if (this.isAdjacent(possibleNeighbor)) {
                        possibleNeighbor.right.push(space);
                        return true;
                    }
                    return false;
                });
                space.left = neighbors;
            }
            if (x < division - 1) {
                space.right = [newContent[x + 1][y]];
            } else {
                neighbors = [this.right.filter((possibleNeighbor) => {
                    let selfIndex = possibleNeighbor.left.indexOf(this);
                    delete possibleNeighbor.left[selfIndex];
                    if (this.isAdjacent(possibleNeighbor)) {
                        possibleNeighbor.left.push(space);
                        return true;
                    }
                    return false;
                })];
                space.right = neighbors;
            }
            if (y > 0) {
                space.top = [newContent[x][y - 1]];
            } else {
                neighbors = [this.top.filter((possibleNeighbor) => {
                    let selfIndex = possibleNeighbor.bottom.indexOf(this);
                    delete possibleNeighbor.bottom[selfIndex];
                    if (this.isAdjacent(possibleNeighbor)) {
                        possibleNeighbor.bottom.push(space);
                        return true;
                    }
                    return false;
                })];
                space.top = neighbors;
            }
            if (y < division - 1) {
                space.bottom = [newContent[x][y + 1]];
            } else {
                neighbors = [this.bottom.filter((possibleNeighbor) => {
                    let selfIndex = possibleNeighbor.top.indexOf(this);
                    delete possibleNeighbor.top[selfIndex];
                    if (this.isAdjacent(possibleNeighbor)) {
                        possibleNeighbor.top.push(space);
                        return true;
                    }
                    return false;
                })];
                space.bottom = neighbors;
            }
        }))
    }

}