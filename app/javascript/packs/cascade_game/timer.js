

export default class Timer {
    constructor(duration = 1, phase = 1) {
        this.duration = duration;
        this.phase = phase;
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

}