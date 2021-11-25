import { setToken } from '../services/funcs';

export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const NEXT_QUESTIONS = 'NEXT_QUESTION';
export const CHANGE_DISABLE = 'CHANGE_DISABLE';
export const TIME = 'TIME';

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const changeDisable = (disable) => ({ type: CHANGE_DISABLE, disable });

export const nextQuestion = () => ({ type: NEXT_QUESTIONS });

export const changeTime = (time) => ({ type: TIME, time });

export const getQuestions = () => async (dispatch) => {
  const token = await setToken();
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json())
    .then((res) => res.results);
  dispatch(addQuestions(questions));
};
