import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { 
  FETCH_JOKE,
  CLEAR_LOCAL_JOKES,
  fetchJokeFailed,
  addJoke,
  clearLocalJokes
} from '../actions';

function runFetchJoke() {
  const url = 'http://api.icndb.com/jokes/random'
  return fetch(url)
  .then(res => res.json() )
  .then(data => ({ data }) )
  .catch(e => ({ e }) );
}

function* handleFetchJoke(action) {
  const { data, e } = yield call(runFetchJoke);
  
  if (e !== undefined || data.type !== 'success') {
      yield put(fetchJokeFailed());
      return
  }
  yield put(addJoke(data.value));
}

export default function* sagas() {
    yield takeEvery(FETCH_JOKE, handleFetchJoke);
}