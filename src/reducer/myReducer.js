import { ADD_QUESTIONS, NEXT_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  position: 0,
};

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case NEXT_QUESTIONS:
    return { ...state, position: state.position + 1 };
  default:
    return state;
  }
};

export default myReducer;
