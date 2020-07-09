import { takeLatest, put, call, all } from 'redux-saga/effects';
import { types } from './actions';
import axios from 'axios';

function* on_search_start({ payload }) {
  try {
    console.log(payload);

    yield put({ type: types.LOADING });
    const res = yield axios.get(`https://image-gallery-2020.herokuapp.com/api/photos?count=${payload.count}&start=${payload.start}&searchField=${payload.searchField}`);
    yield put({ type: types.SEARCH_IMAGES_SUCCESS, payload: res });
    // console.log(res);
  } catch (err) {
    yield put({ type: types.SEARCH_IMAGES_FAILED, payload: err });
  }
}
function* search_start() {
  yield takeLatest(types.SEARCH_IMAGES_START, on_search_start);
}

function* on_load_start({ payload }) {
  try {
    console.log(payload.start);

    // yield put({ type: types.LOADING });
    const res = yield axios.get(`https://image-gallery-2020.herokuapp.com/api/photos?count=${payload.count}&start=${payload.start}&searchField=${payload.searchField}`);
    yield put({ type: types.LOAD_IMAGES_SUCCESS, payload: res });
    console.log(res);
  } catch (err) {
    yield put({ type: types.LOAD_IMAGES_fAILED, payload: err });
  }
}
function* load_start() {
  yield takeLatest(types.LOAD_IMAGES_START, on_load_start);
}

export default function* () {
  yield all([call(load_start), call(search_start)]);
}
