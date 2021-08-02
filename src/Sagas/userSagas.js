import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../Sagas/config/types';
import axios from 'axios';

const getApi = () => {
  return axios
    .get('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.data)
    .catch((err) => err);
};

function* fetchUsers() {
  try {
    const users = yield call(getApi);
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUserError(error.message));
  }
}

export const getUsersSuccess = (users) => {
  return {
    type: types.GET_USERS_SUCCESS,
    payload: {
      loading: false,
      users: users,
    },
  };
};

export const getUserError = (error) => {
  return {
    type: types.GET_USERS_FAILED,
    error: error,
  };
};

export const deletePost = (id) => {
  return {
    type: types.DELETE_POST,
    id: id,
  };
};

export const addPost = (text) => {
  return {
    type: types.ADD_POST,
    payload: text,
  };
};

export const updatePost = ({ id, item }) => {
  return {
    type: types.UPDATE_POST,
    id,
    item,
  };
};

function* userSaga() {
  yield takeEvery(types.GET_USERS_REQUEST, fetchUsers);
}

export default userSaga;
