import { takeEvery, put, call } from 'redux-saga/effects';
import { 
  FETCH_JOKE,
  fetchJokeFailed,
  addJoke
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
  
  if (e !== undefined) {
    yield put(fetchJokeFailed('Unable to load new joke, please check your network connection.'));
    return
  }

  if (data.type !== 'success') {
    yield put(fetchJokeFailed('Sorry, the joker teller is currently not available.'));
  }
  yield put(addJoke(data.value));
}

export default function* sagas() {
    yield takeEvery(FETCH_JOKE, handleFetchJoke);
}