import * as types from '../config/types';

export function fetchUsers() {
  console.log('request users');
  return {
    type: types.GET_USERS_REQUEST,
    payload: {
      loading: true,
    },
  };
}
