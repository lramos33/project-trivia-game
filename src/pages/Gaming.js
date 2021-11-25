import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Timer from '../components/Timer';
import { nextQuestion } from '../actions';
import Buttons from '../components/Buttons';
import { addRanking } from '../services/funcs';

class Gaming extends Component {
  // Gera os botões de perguntas
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
        incorrect={ incorrectAnswers }
      />
    );
  }

  // Renderiza a página com todos os componentes
  renderPage() {
    const { questions, position, NextQuestion, disable } = this.props;
    const { category, question } = questions[position];
    const maxQuestions = 4;

    return (
      <div>
        <Header />
        <div className="question-answer-content">
          <div className="question-card">
            <p data-testid="question-category" className="question-category">
              { category }
            </p>
            <p data-testid="question-text" className="question-content">
              { question }
            </p>
          </div>
          <div className="answers-card">
            { this.alternativeButtonGenerator() }
          </div>
        </div>
        <Timer />
        { disable && position < maxQuestions && (
          <button
            data-testid="btn-next"
            type="button"
            onClick={ NextQuestion }
          >
            Próxima
          </button>
        ) }
        { position >= maxQuestions && (
          <Link to="/feedback">
            <button
              data-testid="btn-next"
              type="button"
              onClick={ addRanking }
            >
              Finalizar
            </button>
          </Link>
        ) }
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

Gaming.propTypes = {
  NextQuestion: PropTypes.func.isRequired,
  questions: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gaming);
