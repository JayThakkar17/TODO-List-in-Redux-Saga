import { combineReducers } from 'redux';
import * as types from '../config/types';

const initialState = {
  loading: false,
  users: [],
  error: null,
};

const deleteById = (state, id) => {
  const post = state.users.filter((post) => {
    if (post.id !== id) {
      return true;
    }
    return false;
  });
  return post;
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
    case types.DELETE_POST: {
      return {
        ...state,
        users: deleteById(state, action.id),
      };
    }

    case types.ADD_POST: {
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    }

    case types.UPDATE_POST: {
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.id ? { ...item, name: action.item } : item
        ),
      };
    }

    default:
      return state;
  }
};

export default combineReducers({
  users: userReducer,
});
