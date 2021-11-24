import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getQuestions, nextQuestion } from '../actions';
import { getQuestionAndAnswers, shuffleArray } from '../services/funcs';
import PropTypes from 'prop-types';

class Gaming extends Component {
  componentDidMount() {
    const { GetQuestions } = this.props;
    GetQuestions();
  }

  // Position é a posição da pergunta no array de objetos
  alternativeButtonGenerator() {
    const { questions, position } = this.props;
    if (!questions.length) return;

    const {
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers
    } = questions[position];

    const correct = (
      <button
        data-testid="correct-answer"
        type="button"
      >
        { correctAnswer }
      </button>
    );
    const incorrects = incorrectAnswers.map((name, index) => (
      <button data-testid={ `wrong-answer-${index}` } type="button">{ name }</button>
    ))

    const allAnswers = [correct, ...incorrects];
    const shuffled = shuffleArray(allAnswers);

    return shuffled;
  }

  render() {
    const { questions, position, NextQuestion } = this.props;
    let res;
    if (questions.length) {
      const { category, question } = questions[position];
      res = { category, question }
    }

    return (
      <div>
        <Header />
        <div className="question-card-game">
          <p data-testid="question-category">{ questions.length && res.category }</p>
          <p data-testid="question-text">{ questions.length && res.question }</p>
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
}

const mapStateToProps = ({ myReducer: { questions, position } }) => ({ questions, position });

const mapDispatchToProps = (dispatch) => ({
  GetQuestions: () => dispatch(getQuestions()),
  NextQuestion: () => dispatch(nextQuestion()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);

Gaming.propTypes = {
  GetQuestions: (PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object])).isRequired,
};
