import React, { Component } from 'react';
import GameSquare from './GameSquare';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextMove: 'X'
    };
  }

  thereIsAWinner(squares) {
    let winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for(let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
        return squares[a];
      }
    }
    return false;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.nextMove;
    this.setState({
      squares: squares,
      nextMove: (this.state.nextMove == 'X' ? 'O' : 'X')
    });
  }



  renderSquare(i) {
    return (
      <GameSquare
        label={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {

    const winner = this.thereIsAWinner(this.state.squares);
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.nextMove);
    }
    console.log(status);

    return (

        <div className="GameBoard" >
          <h1>tmf | tix-tac-toe</h1>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}

          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}

          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}

        </div>
      );
    }
}


export default GameBoard;