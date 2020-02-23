import React from "react";

export default class Space extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            left: null,
            right: null,
            top: null,
            bottom: null,
            step: 1,
            duration: props.duration,
            content: {}
        };
    }

    render() {
        return (
            <div
                className="space-edges"
            >
            </div>
        )
    }
} 