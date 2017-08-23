import { FETCH_JOKE, FETCH_JOKE_FAILED, ADD_JOKE, CLEAR_LOCAL_JOKES } from '../actions';

const INITIAL_STATE = {
  jokes: JSON.parse(localStorage.getItem('jokes')) || [],
  isLoading: false
};

export default (state = {...INITIAL_STATE}, action = {}) => {
  let { type, payload } = action;
  let { jokes } = state;
  switch (type) {
    case FETCH_JOKE:
      return {
          ...state,
          isLoading: true
      };
    case FETCH_JOKE_FAILED:
      return {
          ...state,
          isLoading: false
      };
    case ADD_JOKE:
      let idx = jokes.indexOf(payload);
      if (idx !== -1) {
        jokes.splice(idx, 1);
      }
      jokes = [payload, ...jokes];
      localStorage.setItem('jokes', JSON.stringify(jokes));
      return {
          ...state,
          isLoading: false,
          jokes
      };
    case CLEAR_LOCAL_JOKES:
      return {
          ...state,
          jokes: []
      };
    default:
      return state;
  }
};