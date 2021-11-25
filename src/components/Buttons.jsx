import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPoints } from '../services/funcs';
import { changeDisable } from '../actions';

const correctAnswer = (difficulty, time) => {
  const treis = 3;
  let hold;
  switch (difficulty) {
  case 'easy':
    hold = 1;
    break;
  case 'medium':
    hold = 2;
    break;
  case 'hard':
    hold = treis;
    break;
  default:
    hold = 0;
  }
  const dez = 10;
  const sum = dez + (Number(time) * hold);
  addPoints(sum);
};

const Buttons = (
  { correct, incorrects, disable, position, ChangeDisable, time, questions },
) => {
  const [couter, setCouter] = useState(0);
  const { difficulty } = questions[position];
  useEffect(() => {
    setCouter(0);
  }, [position]);

  const onBotClick = () => {
    setCouter(couter + 1);
    ChangeDisable(true);
  };

  const correctBot = (
    <button
      data-testid="correct-answer"
      type="button"
      className={ `${couter >= 1 || disable ? 'correct' : ''} answer-button` }
      disabled={ couter >= 1 || disable }
      onClick={ () => {
        correctAnswer(difficulty, time);
        onBotClick();
      } }
    >
      { correct }
    </button>
  );
  const incorrectsBot = incorrects.map((name, index) => (
    <button
      key={ name }
      data-testid={ `wrong-answer-${index}` }
      type="button"
      className={ `${couter >= 1 || disable ? 'incorrect' : ''} answer-button` }
      onClick={ onBotClick }
      disabled={ couter >= 1 || disable }
    >
      { name }
    </button>
  ));
  const metade = 0.5;
  const allAnswers = [correctBot, ...incorrectsBot];
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

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);

Buttons.propTypes = {
  correct: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  incorrects: PropTypes.arrayOf(PropTypes.string).isRequired,
  disable: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  ChangeDisable: PropTypes.func.isRequired,
  time: PropTypes.number.isRequired,
};
