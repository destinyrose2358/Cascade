

export default class Timer {
    constructor(timerSet, duration = 1, phase = 1) {
        this.duration = duration;
        this.phase = phase;
        this.timerSet = timerSet;
        this.nodes = new Set();
    }

    update() {
        this.phase = Math.floor((this.phase + 1) % this.duration);
        if (!this.phase) this.nodes.forEach(node => node.update());
    }

    add(space) {
        this.nodes.add(space);
    }

    remove(space) {
        this.nodes.delete(space);
    }

    averageWith(timer) {
        return this.timerSet.createNewTimer((this.duration + timer.duration) / 2, (this.phase + timer.phase) / 2);
    }

}