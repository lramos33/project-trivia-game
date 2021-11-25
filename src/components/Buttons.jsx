import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPoints } from '../services/funcs';
import { changeDisable } from '../actions';

// Função para cálculo dos pontos
const correctAnswer = (difficulty, time) => {
  const one = 1;
  const two = 2;
  const three = 3;
  const ten = 10;
  let hold;

  switch (difficulty) {
  case 'easy':
    hold = one;
    break;
  case 'medium':
    hold = two;
    break;
  case 'hard':
    hold = three;
    break;
  default:
    hold = 0;
  }

  const sum = ten + (Number(time) * hold);
  addPoints(sum);
};

// Componente em forma de função
const Buttons = (
  { correct, incorrect, disable, position, ChangeDisable, time, questions },
) => {
  const [counter, setCounter] = useState(0);
  const { difficulty } = questions[position];
  useEffect(() => {
    setCounter(0);
  }, [position]);
  const onButtonClick = () => {
    setCounter(counter + 1);
    ChangeDisable(true);
  };
  const correctButton = (
    <button
      key={ 3 }
      data-testid="correct-answer"
      type="button"
      className={ `${counter >= 1 || disable ? 'correct' : ''} answer-button` }
      disabled={ counter >= 1 || disable }
      onClick={ () => {
        correctAnswer(difficulty, time);
        onButtonClick();
      } }
    >
      { correct }
    </button>
  );

  const incorrectButtons = incorrect.map((name, index) => (
    <button
      key={ index }
      data-testid={ `wrong-answer-${index}` }
      type="button"
      className={ `${counter >= 1 || disable ? 'incorrect' : ''} answer-button` }
      onClick={ onButtonClick }
      disabled={ counter >= 1 || disable }
    >
      { name }
    </button>
  ));
  const metade = 0.5;
  const allAnswers = [correctButton, ...incorrectButtons];
  const shuffled = allAnswers.sort(() => Math.random() - metade);

  return (
    <div className="shuffled-buttons">
      { shuffled }
    </div>
  );
};

const mapStateToProps = ({ myReducer: { position, questions, time } }) => (
  { position, questions, time }
);

const mapDispatchToProps = (dispatch) => ({
  ChangeDisable: (disable) => dispatch(changeDisable(disable)),
});

Buttons.propTypes = {
  correct: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
  disable: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  ChangeDisable: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
