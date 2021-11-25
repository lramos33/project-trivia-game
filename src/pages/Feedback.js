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
    this.getInformation();
  }

  // Define qual vai ser a mensagem de feedback e add ao estado
  getInformation() {
    const { player: { assertions, score } } = getLocalStorageItens();
    const three = 3;
    const feedback = assertions < three ? 'Podia ser melhor...' : 'Mandou bem!';
    this.setState({ feedback, assertions, score });
  }

  render() {
    const { feedback, assertions, score } = this.state;
    const result = feedback === 'Mandou bem!';

    return (
      <>
        <Header />
        <div className="feedback-div">
          <h2>
            {'Você acertou '}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {' perguntas e fez '}
            <span data-testid="feedback-total-score">{ score }</span>
            {' pontos! '}
            <span data-testid="feedback-text">{ feedback }</span>
          </h2>
          { result && <img
            className="feedback-gif"
            src="https://media0.giphy.com/media/bKBM7H63PIykM/giphy.gif?cid=790b76118c99fe7d7392105e39f1f71df5675bb4e247f357&rid=giphy.gif&ct=g"
            alt="feedback gif"
          />}
          { !result && <img
            className="feedback-gif"
            src="https://media4.giphy.com/media/3ofSBtvJgK8VY2tlUA/giphy.gif?cid=ecf05e47dj38e5hkb2iclwba8f4ayvodq6fmvnt0k5rx6skq&rid=giphy.gif&ct=g"
            alt="feedback gif"
          />}
        </div>
        <div className="buttons-div">
          <Link to="/">
            <button
              className="feedback-buttons"
              data-testid="btn-play-again"
              type="button"
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button
              className="feedback-buttons"
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
