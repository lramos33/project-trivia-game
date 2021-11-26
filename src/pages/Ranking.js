import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const verificacao = (a, b) => a - b;
    ranking.sort((a, b) => verificacao(a.score, b.score));
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        { ranking.map((item, index) => (
          <div key={ index }>
            <img src={ item.player.gravatarEmail } alt="avatar" />
            <p data-testid={ `player-name-${index}` }>{ item.player.name }</p>
            <p data-testid={ `player-score-${index}` }>{ item.player.score }</p>
          </div>
        )) }
        <Link to="/">
          <button
            data-testid="btn-go-home"
            type="button"
          >
            Início
          </button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
