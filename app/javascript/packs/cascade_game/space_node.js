

const SIDES = ["startX", "startY", "endX", "endY"];

export default class SpaceNode {
    constructor(
        game,
        timer,
        startX = 0,
        startY = 0,
        endX = 1,
        endY = 1,
        contents = {}
    ) {
        this.game = game;
        this.timer = timer;
        timer.add(this);
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.contents = contents;
        this.parents = []; //[parent, x, y]
        this.totalTiles = Object.values(contents).reduce((acc, total) => acc + total, 0);
    }

    score(player, amount = 1) {
        this.contents[player] = this.contents[player] ? this.contents[player] + amount : amount;
        this.totalTiles += amount;
        this.updateParents();
    }

    updateParents() {
        this.parents.forEach(([parent, x, y]) => parent.update());
    }

    update() {
        if (Math.floor(Math.sqrt(this.totalTiles)) ** 2 === this.totalTiles) {
            //create tileboard node
        } else if (this.totalTiles) {
            //create a division of the space
        }
    }

    transferTiles(player, space, amount = 1) {
        if (this.isNeighbor(space)) {
            this.score(player, -amount);
            space.score(player, amount);
            return true;
        }
        return false;
    }

    divide(num = this.totalTiles) {
        //build this after the ConnectionNode
    }

    merge(space) {
        if (this.sharesSide(space)) {
            const newBounds = SIDES.map((side, index) => {
                return Math[index < 2 ? "min" : "max"](this[side], space[side]);
            });

            let newContents = {...this.contents};

            Object.entries(space.contents).forEach((player, score) => {
                newContents[player] = newContents[player] ? newContents[player] + score : score;
            });

            let newTimer = this.timer.averageWith(space.timer);

            let newSpace = new SpaceNode(
                this.game,
                newTimer,
                ...newBounds,
                newContents
            );

            newTimer.add(newSpace);

            this.replaceSeltWith(newSpace);
            space.replaceSeltWith(newSpace);
            return true;
        }
        return false;
    }

    replaceSelfWith(space) {
        this.parents.forEach(([parent, x, y]) => {
            parent.replaceIndex(space, x, y);
            space.parents.push([parent, x, y]);
        });
        this.timer.remove(this);
    }

    isNeighbor(space) {
        let withinBounds = (side1, side2) => {
            let thisRange = [this[side1], this[side2]].sort();
            let spaceRange = [space[side1], space[side2]].sort();
            return !((thisRange[0] >= spaceRange[1]) || (spaceRange[0] >= thisRange[1]));
        };
        for (let index = 0; index < SIDES.length; index++) {
            let side = SIDES[index];
            let opposingSide1 = SIDES[(index + 1) % 4];
            let opposingSide2 = SIDES[(index + 3) % 4];
            if (this[side] === space[SIDES[(index + 2) % 4]]) {
                return withinBounds(opposingSide1, opposingSide2);
            }
        }
        return false;
    }

    sharesSide(space) {
        let isAligned = (side1, side2) => {
            let thisRange = [this[side1], this[side2]].sort();
            let spaceRange = [space[side1], space[side2]].sort();
            return ((thisRange[0] === spaceRange[0]) && (spaceRange[1] === thisRange[1]));
        };
        for (let index = 0; index < SIDES.length; index++) {
            let side = SIDES[index];
            let opposingSide1 = SIDES[(index + 1) % 4];
            let opposingSide2 = SIDES[(index + 3) % 4];
            if (this[side] === space[SIDES[(index + 2) % 4]]) {
                return isAligned(opposingSide1, opposingSide2);
            }
        }
        return false;
    }
}