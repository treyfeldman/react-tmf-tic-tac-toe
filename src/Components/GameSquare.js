import React, { Component } from 'react';
import '../App.css';

class GameSquare extends Component {
  render() {
    return (
      <div className="GameSquare" onClick={() => this.props.onClick()}>
        {this.props.label}
      </div>
    );
  }
}

export default GameSquare;