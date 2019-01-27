import React, {Component} from 'react';
import './App.css';

const X_WIN = 'X win';
const O_WIN = 'O win';
const DRAW = 'Draw';
const UNFINISHED = 'Unfinished';

const lines = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]],
];

const playerWon = (player, board) =>
  lines.some((line) => line.every(([x, y]) => board[x][y] === player));

const allFilled = (board) => {
  return board.every((row) => row.every((cell) => cell !== null));
};

const getGameResult = (board) => {
  switch (true) {
    case playerWon('x', board):
      return X_WIN;
    case playerWon('o', board):
      return O_WIN;
    case allFilled(board):
      return DRAW;
    default:
      return UNFINISHED;
  }
};

const delayedAlert = (text) => setTimeout(() => alert(text), 0);

class App extends Component {
  state = {
    board: [[null, null, null], [null, null, null], [null, null, null]],
    turn: 'x',
    finished: false,
  };

  play(x, y) {
    this.setState((state) => {
      if (state.finished || state.board[x][y] !== null) {
        return;
      }

      state.board[x][y] = state.turn;
      state.turn = state.turn === 'x' ? 'o' : 'x';

      const result = getGameResult(state.board);

      switch (result) {
        case X_WIN:
          this.setState({finished: true});
          delayedAlert('X won!');
          break;
        case O_WIN:
          this.setState({finished: true});
          delayedAlert('O won!');
          break;
        case DRAW:
          this.setState({finished: true});
          delayedAlert('Draw!');
          break;
        default:
          break;
      }

      return {
        board: state.board,
        turn: state.turn,
      };
    });
  }

  replay = () => {
    this.setState({
      board: [[null, null, null], [null, null, null], [null, null, null]],
    });
  };

  render() {
    return (
      <>
        <div className="board">
          {this.state.board.map((row, x) => {
            return row.map((cell, y) => {
              return (
                <div
                  className="square"
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
        {this.state.finished && <button onClick={this.replay}>Replay</button>}
      </>
    );
  }
}

export default App;
