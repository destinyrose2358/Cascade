import React from "react";
import Game from "../../../packs/cascade_game/game";
import Space from "../../../packs/cascade_game/space";

export default class BoardDisplay extends React.Component {
    constructor(props){
        super(props);
        this.game = new Game();
        this.space1 = new Space(this.game, 0, 0, 2, 3);
        this.space2 = new Space(this.game, 2, 0, 3, 3);
        debugger;
    }

    render() {
        return (
            <div
                className="game-display"
            >

            </div>
        )
    }
}