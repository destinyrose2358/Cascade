import React from "react";

export default class SpaceWrapper extends React.Component {
    render() {
        const { space } = this.props;
        const { startX, startY, width, height, content } = space;
        const playerCounters = Object.entries(content).map(([key, value]) => {
            let counterStyle = {
                backgroundColor: `#${ Math.floor(key * (255 ** 3) / 20).toString(16) }`
            };
            return (
                <div
                    className={`player-${key}`}
                    style={ counterStyle }
                    key={key}
                >
                    {value}
                </div>
            )
        });

        const styling = {
            left: `${startX}px`,
            top: `${startY}px`,
            width: `${width}px`,
            height: `${height}px`
        };

        return (
            <div
                className={`space-edges space-${startX}-${startY}`}
                style={styling}
                onClick={() => {
                    space[window.action](window.value);
                }}
            >
                { playerCounters }
            </div>
        )
    }
}