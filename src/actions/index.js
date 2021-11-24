import { getToken } from '../services/funcs';

export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const NEXT_QUESTIONS = 'NEXT_QUESTION';

export const addQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const nextQuestion = () => ({ type: NEXT_QUESTIONS });

export const getQuestions = () => async (dispatch) => {
  const token = getToken();
  const questions = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((res) => res.json())
    .then((res) => res.results);
  dispatch(addQuestions(questions));
};
