import { ADD_QUESTIONS,
  CHANGE_DISABLE,
  NEXT_QUESTIONS,
  TIME,
  CLEAR_STATE } from '../actions';

const INITIAL_STATE = {
  questions: [],
  position: 0,
  disable: false,
  time: 30,
};

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case NEXT_QUESTIONS:
    return { ...state, position: state.position + 1 };
  case TIME:
    return { ...state, time: action.time };
  case CHANGE_DISABLE:
    return { ...state, disable: action.disable };
  case CLEAR_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default myReducer;
