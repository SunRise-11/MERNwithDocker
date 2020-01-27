import * as actionTypes from '../actions/types';

const INITIAL_STATE = {
  user: {},
  token: null,
  expiresAt: null,
  processing: false,
  processed: false,
  error: null
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
    case actionTypes.SIGN_UP:
      return { ...state, processed: false, processing: true, error: null };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true,
        token: action.payload.token,
        expiresAt: action.payload.expiresAt,
        user: { ...action.payload.user }
      };
    case actionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        processing: false,
        processed: true
      };
    case actionTypes.SIGN_IN_FAIL:
    case actionTypes.SIGN_UP_FAIL:
      return {
        ...state,
        processing: false,
        processed: true,
        error: action.payload
      };
    case actionTypes.UNLOAD_AUTH_SCREEN:
      return {
        ...state,
        processing: false,
        processed: false,
        error: null
      };
    default:
      return state;
  }
};

export default authReducer;