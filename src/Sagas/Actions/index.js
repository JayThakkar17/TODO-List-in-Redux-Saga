import * as types from '../config/types';

export function fetchUsers() {
  return {
    type: types.GET_USERS_REQUEST,
    payload: {
      loading: true,
    },
  };
}