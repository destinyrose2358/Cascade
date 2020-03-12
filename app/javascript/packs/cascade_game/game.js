import Space from "./space";

export default class Game {
    constructor(
        turns = 20,
        deck = new Deck(),
        players,
        actions
    ) {
        this.turns = turns;
        this.timer = new TimerSet();
        this.root = new SpaceNode(this, this.timer);
        this.deck = deck;
        this.players = players;
    }
}