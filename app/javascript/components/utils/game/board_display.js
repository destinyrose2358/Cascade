import React from "react";
import SpaceWrapper from "./space_wrapper";

export default class BoardDisplay extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        let { game } = this.props;
        const spaces = Object.values(game.spaces).map(space => (
            <SpaceWrapper space={space} />
        ));
        return (
            <div
                className="game-display"
                style={{
                    width: `${game.size}px`,
                    height: `${game.size}px`,

                }}
                onClick={() => this.forceUpdate()}
            >
                { spaces }
            </div>
        )
    }
}