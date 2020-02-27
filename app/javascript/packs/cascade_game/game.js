import Space from "./space";

export default class Game {
    constructor(
        turns = 20
    ) {
        this.spaces = {[[0,0]]: new Space(this) };
    }
}