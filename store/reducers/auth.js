import { AUTHENTICATE, LOGOUT, SET_TRIED_AL } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  triedAutoLogin: false
}

export default (state= initialState, action) => {
  switch(action.type) {
    case SET_TRIED_AL:
      return {
        ...state,
        triedAutoLogin: true
      }
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        triedAutoLogin: true
      }
    case LOGOUT:
      return {
        ...initialState,
        triedAutoLogin: true
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   }
    default:
      return state;
  }
}