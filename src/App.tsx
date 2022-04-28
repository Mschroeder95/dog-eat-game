import React from 'react';
import './App.css';
import { Game } from './game/game';

export class App extends React.Component {
  render () {
    return <div id='game-container'></div>
  }
  
  componentDidMount() {
    let gameContainer = document.getElementById('game-container') as HTMLElement;
    Game.run(window.innerHeight, window.innerWidth, gameContainer);

  }
}
