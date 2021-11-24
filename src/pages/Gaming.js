import React, { Component } from 'react';
import Header from '../components/Header';

export default class Gaming extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="question-card-game">
          <p data-testid="question-category">category</p>
          <p data-test-id="question-text">question</p>
        </div>
        <div className="answer-card-game">
        </div>
      </div>
    );
  }
}
