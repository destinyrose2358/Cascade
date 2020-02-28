import Space from "./space";

export default class Game {
    constructor(
        turns = 20,
        size = 400,
    ) {
        this.spaces = {[[0,0]]: new Space(this) };
        this.size = size;
    }
}