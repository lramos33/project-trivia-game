const INITIAL_STATE = {
  questions: [],
};

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return { ...state };
  default:
    return state;
  }
};

export default myReducer;
