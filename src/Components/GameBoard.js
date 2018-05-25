import React, { Component } from 'react';
import GameSquare from './GameSquare';
import $ from 'jquery';

class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      nextMove: 'X'
    };
  }

  changeSquareColor(a, b, c)  {
    const squares = $('.GameSquare');
    for(let i=0; i<3; i++) {
      $(squares[arguments[i]]).css({
        backgroundColor: 'red'
      });
    }
    $('.play-again').animate({opacity:1}, 750);

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
        this.changeSquareColor(a, b, c);
        return squares[a];
      }
    }
    return false;
  }

  handleClick(i) {
    if(this.thereIsAWinner(this.state.squares)) {
      return;
    }
    if(this.state.squares[i] == null) {
      const squares = this.state.squares.slice();
      squares[i] = this.state.nextMove;
      this.setState({
        squares: squares,
        nextMove: (this.state.nextMove === 'X' ? 'O' : 'X')
      }, function() {
        if(this.boardIsFull()) {
          setTimeout(this.resetGame.bind(this), 1500)
        }
      });
    }
  }

  boardIsFull() {
    return this.state.squares.indexOf(null) === -1;
  }

  resetGame() {
    $('.play-again').css('opacity', 0);
    const squares = Array(9).fill(null);
    this.setState({
      squares: squares,
      nextMove: (this.state.nextMove === 'X' ? 'O' : 'X')
    });

    const squareBoxes = $('.GameSquare');
    for(let i=0; i<9; i++) {
      $(squareBoxes[i]).css({
        backgroundColor: 'darkorange'
      });
    }
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

    return (

        <div className="GameBoard" >
          <h1>tmf | tic-tac-toe</h1>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}

          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}

          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}

          <h3 className="play-again" onClick={this.resetGame.bind(this)}>play again →</h3>
        </div>
      );
    }
}


export default GameBoard;