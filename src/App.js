import React, {Component} from 'react';
import './App.css';

class App extends Component {
  state = {
    board: [[null, null, null], [null, null, null], [null, null, null]],
    turn: 'x',
  };

  play(x, y) {
    this.setState((state) => {
      state.board[x][y] = state.turn;
      state.turn = state.turn === 'x' ? 'o' : 'x';
      return {
        board: state.board,
        turn: state.turn,
      };
    });
  }

  render() {
    return (
      <div class="board">
        {this.state.board.map((row, x) => {
          return row.map((cell, y) => {
            return (
              <div
                class="square"
                onClick={(event) => {
                  this.play(x, y);
                }}
              >
                {cell}
              </div>
            );
          });
        })}
      </div>
    );
  }
}

export default App;
