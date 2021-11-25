import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { nextQuestion } from '../actions';
import Buttons from '../components/Buttons';

class Gaming extends Component {
  // Position é a posição da pergunta no array de objetos

  alternativeButtonGenerator() {
    const { questions, position, disable } = this.props;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[position];

    return (
      <Buttons
        disable={ disable }
        correct={ correctAnswer }
        incorrects={ incorrectAnswers }
      />
    );
  }

  renderPage() {
    const { questions, position, NextQuestion } = this.props;
    const { category, question } = questions[position];

    return (
      <div>
        <Header />
        <Timer />
        <div className="question-card-game">
          <p data-testid="question-category">{ category }</p>
          <p data-testid="question-text">{ question }</p>
        </div>
        <div className="answers-card-game">
          { this.alternativeButtonGenerator() }
        </div>
        <button
          type="button"
          onClick={ NextQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    const { questions } = this.props;

    return (
      <div>
        { !!questions.length && this.renderPage() }
      </div>
    );
  }
}

const mapStateToProps = ({ myReducer: { questions, position, disable } }) => (
  { questions, position, disable }
);

const mapDispatchToProps = (dispatch) => ({
  NextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);

Gaming.propTypes = {
  NextQuestion: PropTypes.func.isRequired,
  questions: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
};
