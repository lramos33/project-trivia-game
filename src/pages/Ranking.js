import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
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
