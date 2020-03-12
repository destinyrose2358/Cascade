

export default class TimerSet {
    constructor() {
        this.timers = [new Timer()];
    }

    update() {
        this.timers.forEach(timer => timer.update());
    }

}