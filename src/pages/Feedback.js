import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getLocalStorageItens } from '../services/funcs';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: '',
    };
  }

  componentDidMount() {
    this.getInformations();
  }

  getInformations() {
    const { player: { assertions } } = getLocalStorageItens();
    const treis = 3;
    const feedback = assertions < treis ? 'Podia ser melhor...' : 'Mandou bem!';
    this.setState({ feedback });
  }

  render() {
    const { feedback } = this.state;
    return (
      <>
        <Header />
        <div>
          <h2 data-testid="feedback-text">
            { feedback }
          </h2>
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
