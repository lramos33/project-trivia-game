import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorageItens } from '../services/funcs';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
      assertions: 0,
      score: 0,
    };
  }

  componentDidMount() {
    this.getInformations();
  }

  getInformations() {
    const { player: { assertions, score } } = getLocalStorageItens();
    console.log(getLocalStorageItens());
    const tres = 3;
    const feedback = assertions < tres ? 'Podia ser melhor...' : 'Mandou bem!';
    this.setState({ feedback, assertions, score });
  }

  render() {
    const { feedback, assertions, score } = this.state;
    return (
      <>
        <Header />
        <div>
          <div className="feedback-div">
            <h2>
              {'Você acertou '}
              <span data-testid="feedback-total-question">{ assertions }</span>
              {' perguntas '}
              <span>
                {' e fez '}
              </span>
              <span data-testid="feedback-total-score">
                { score }
              </span>
              <span>{' pontos! '}</span>
              <span data-testid="feedback-text">
                { feedback }
              </span>
            </h2>
          </div>
          <Link to="/">
            <button
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              data-testid="btn-ranking"
              type="button"
            >
              Ranking
            </button>
          </Link>
        </div>
      </>
    );
  }
}

export default Feedback;
