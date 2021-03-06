import { createAction } from 'redux-actions';

// types
export const FETCH_JOKE = 'FETCH_JOKE';
export const FETCH_JOKE_FAILED = 'FETCH_JOKE_FAILED';
export const ADD_JOKE = 'ADD_JOKE';
export const CLEAR_LOCAL_JOKES = 'CLEAR_LOCAL_JOKES';

// actions
export const fetchJoke = createAction(FETCH_JOKE);
export const clearLocalJokes = createAction(CLEAR_LOCAL_JOKES);
export function fetchJokeFailed(errorMsg) {
  return {
    type: FETCH_JOKE_FAILED,
    errorMsg
  }
};
export function addJoke(joke) {
  return {
    type: ADD_JOKE,
    joke
  }
};
