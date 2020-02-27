import React from "react";
import { Route } from "react-router-dom";
import Space from "./utils/game/space";
import BoardDisplay from "./utils/game/board_display";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2',
      action: "divide"
    };
    window.action = "divide";
    window.value = '2';
  }
  render () {
    return (
      <>
        <BoardDisplay
          
        />
        <input
          type="text"
          value={this.state.value}
          onChange={e => {
            e.stopPropagation();
            this.setState({
              value: e.target.value
            }, () => {
              window.value = this.state.value === "" ? undefined : this.state.value;
            });
          }}
        />
        <select
          value={this.state.action}
          onChange={e => {
            this.setState({
              action: e.target.value
            }, () => window.action = this.state.action)
          }}
        >
          <option value="divide" >Divide</option>
          <option value="score" >Score</option>
        </select>
      </>
    );
  }
}

export default App
