import { FETCH_JOKE, FETCH_JOKE_FAILED, ADD_JOKE, CLEAR_LOCAL_JOKES } from '../actions';

const INITIAL_STATE = {
  jokes: JSON.parse(localStorage.getItem('jokes')) || [],
  isLoading: false,
  errorMsg: ''
};

export default (state = {...INITIAL_STATE}, action = {}) => {
  let { type, joke, errorMsg = "" } = action;
  let { jokes } = state;
  switch (type) {
    case FETCH_JOKE:
      return {
          ...state,
          isLoading: true,
          errorMsg
      };
    case FETCH_JOKE_FAILED:
      return {
          ...state,
          isLoading: false,
          errorMsg
      };
    case ADD_JOKE:
      let idx = jokes.indexOf(joke);
      if (idx !== -1) {
        jokes.splice(idx, 1);
      }
      jokes = [joke, ...jokes];
      localStorage.setItem('jokes', JSON.stringify(jokes));
      return {
          ...state,
          isLoading: false,
          errorMsg,
          jokes
      };
    case CLEAR_LOCAL_JOKES:
      localStorage.removeItem("jokes");
      return {
          ...state,
          errorMsg,
          jokes: []
      };
    default:
      return state;
  }
};