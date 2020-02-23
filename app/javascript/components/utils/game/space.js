import React from "react";
import { object } from "prop-types";

export default class Space extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: [],
            right: [],
            top: [],
            bottom: [],
            step: 1,
            duration: props.duration,
            content: props.content || {},
            total: 0
        };
        if (props.access) props.access.bind(this);
        this.divide = this.divide.bind(this);
    }

    update(field) {
        return value => this.setState({
            [field]: value
        })
    }

    divide(division = this.state.total) {
        // get all variables needed
        const { startX, startY, width, height } = this.props;
        const { duration } = this.state;
        let left = [];
        let right = [];
        let top = [];
        let bottom = [];
        let newContent = [];
        let accessContent = [];

        // loop through x and y and create a space at each position
        for (let x = 0; x < division; x++) {
            let newRow = [];
            let accessRow = [];
            for (let y = 0; y < division; y++) {
                let access = (func, ...args) => {func.call(this, ...args)};
                let newSpace = <Space
                    startX={startX + width * x / division}
                    width={width / division}
                    startY={startY + height * y / division}
                    height={height / division}
                    duration={duration}
                    access={access}
                />;

                // group spaces together for left top bottom and right

                newRow.push(newSpace);
                accessRow.push(access);
                switch (x) {
                    case 0:
                        left.push(newSpace);
                        break;
                    case division - 1:
                        right.push(newSpace);
                        break;
                }
                switch (y) {
                    case 0:
                        top.push(newSpace);
                        break;
                    case division - 1:
                        bottom.push(newSpace);
                        break;
                }
            }
            newContent.push(newRow);
            accessContent.push(accessRow);
        }

        // go through each space and assign their left top bottom right
        accessContent.forEach((row, y) => row.forEach((space, x) => {
            if (y > 0) {
                space(this.update("top"), (newContent[y - 1][x]));
            } else {
                space(this.update("top"), (this.state.top));
            }
            if (x > 0) {
                space(this.update("left"), (newContent[y][x - 1]));
            } else {
                space(this.update("left"), (this.state.left));
            }
            if (y < division - 1) {
                space(this.update("bottom"), (newContent[y + 1][x]));
            } else {
                space(this.update("bottom"), (this.state.bottom));
            }
            if (x < division - 1) {
                space(this.update("right"), (newContent[y][x + 1]));
            } else {
                space(this.update("right"), (this.state.right));
            }
        }));

        // create the final content object
        const finalNewContent = {
            content: newContent.flat(),
            left,
            right,
            top,
            bottom
        };

        // go through the neighbors and assign their side to the proper group
        const sides = {"top": "bottom", "bottom": "top", "left": "right", "right": "left"};

        Object.entries(sides).forEach(([side, counterSide]) => {
            this.state[side].forEach(neighbor => {
                neighbor.update(counterSide)(this.state[side]);
            });
        });

        this.setState({
            content: finalNewContent
        });
    }

    score(player) {
        this.setState((prevState) => {
            const newContent = {...prevState.content};
            newContent[player] = newContent[player] ? newContent[player] + 1 : 1;
            return {
            content: newContent,
            total: prevState.total + 1
        }})
    }

    render() {
        const { startX, startY, width, height } = this.props;
        const { content } = this.state;
        if (content['content']) {
            return (
                <>
                    {content['content']}
                </>
            )
        } else {
            const playerCounters = Object.entries(content).map(([key, value]) => {
                let counterStyle = {
                    backgroundColor: `#${ Math.floor(key * (255 ** 3) / 20).toString(16) }`
                };
                console.log(counterStyle);
                return (
                    <div
                        className={`player-${key}`}
                        style={ counterStyle }
                    >
                        {value}
                    </div>
                )
            });
            const styling = {
                left: `${startX}px`,
                top: `${startY}px`,
                border: "1px solid black",
                width: `${width}px`,
                height: `${height}px`
            };

            return (
                <div
                    className="space-edges"
                    style={styling}
                    onClick={() => {
                        this[window.action](window.value);
                    }}
                >
                    {playerCounters}
                </div>
            );
        }
    }
} 