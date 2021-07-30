import { combineReducers } from 'redux';
import * as types from '../config/types';

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload.users,
      };
    }
    case types.GET_USERS_FAILED: {
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  users: userReducer,
});
