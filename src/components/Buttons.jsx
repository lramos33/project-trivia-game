import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeDisable } from '../actions';

const correctAnswer = (questions, position) => {
  const { difficulty } = questions[position];
};

const Buttons = (
  { correct, incorrects, disable, position, ChangeDisable, questions },
) => {
  const [couter, setCouter] = useState(0);

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
      className={ `${couter >= 1 || disable ? 'correct' : ''}` }
      disabled={ couter >= 1 || disable }
      onClick={ onBotClick }
    >
      { correct }
    </button>
  );
  const incorrectsBot = incorrects.map((name, index) => (
    <button
      key={ name }
      data-testid={ `wrong-answer-${index}` }
      type="button"
      className={ `${couter >= 1 || disable ? 'incorrect' : ''}` }
      onClick={ onBotClick }
      disabled={ couter >= 1 || disable }
    >
      { name }
    </button>
  ));
  const metade = 0.5;
  const allAnswers = [correctBot, ...incorrectsBot];
  const shuffled = allAnswers.sort(() => Math.random() - metade);
  return (<div>{ shuffled }</div>);
};

const mapStateToProps = ({ myReducer: { position, questions } }) => (
  { position, questions }
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
  ChangeDisable: PropTypes.func.isRequired,
};
