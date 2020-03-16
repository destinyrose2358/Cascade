import Space from "./space";

export default class Game {
    constructor(
        turns = 20,
        deck = new Deck(),
        players,
        actions
    ) {
        this.turns = turns;
        this.timerSet = new TimerSet();
        this.root = new SpaceNode(this, this.timerSet.timers[0]);
        this.deck = deck;
        this.players = players;
    }
}