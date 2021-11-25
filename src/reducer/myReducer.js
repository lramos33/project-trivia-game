import { ADD_QUESTIONS, CHANGE_DISABLE, NEXT_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  position: 0,
  disable: false,
};

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case NEXT_QUESTIONS:
    return { ...state, position: state.position + 1 };
  case CHANGE_DISABLE:
    return { ...state, disable: action.disable };
  default:
    return state;
  }
};

export default myReducer;
