import Timer from "./timer";

export default class TimerSet {
    constructor() {
        this.timers = [new Timer(this)];
    }

    update() {
        this.timers.forEach(timer => timer.update());
    }

    createNewTimer(duration = 1, phase = 1) {
        const newTimer = new Timer(this, duration, phase);
        this.timers.push(newTimer);
        return newTimer;
    }

}