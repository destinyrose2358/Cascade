import React from "react";
import BoardDisplay from "./utils/game/board_display";
import Game from "../packs/cascade_game/game";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '2',
      action: "divide",
      game: new Game()
    };
    window.action = "divide";
    window.value = '2';
  }

  render () {
    const { value, action, game } = this.state;
    return (
      <div
        className="app"
      >
        <BoardDisplay
          game={game}
        />
        <input
          type="text"
          value={value}
          onChange={e => {
            e.stopPropagation();
            const newValue = e.target.value
            this.setState({
              value: newValue
            }, () => {
              window.value = newValue === "" ? undefined : newValue;
            });
          }}
        />
        <select
          value={action}
          onChange={e => {
            const newAction = e.target.value;
            this.setState({
              action: newAction
            }, () => {
              window.action = newAction;
            });
          }}
        >
          <option value="divide" >Divide</option>
          <option value="score" >Score</option>
          <option value="merge">Merge</option>
        </select>
      </div>
    );
  }
}

export default App
