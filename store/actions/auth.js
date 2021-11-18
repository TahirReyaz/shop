export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANahy7ce48fvjllg3rcVFgBCgOFRY_hbk', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if(!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message= 'Something went wrong! Sad Emoji.';
      if(errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!\nTry a different one.';
      } 
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch({
      type: SIGNUP, 
      token: resData.idToken, 
      userId: resData.localId 
    });
  }
}

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANahy7ce48fvjllg3rcVFgBCgOFRY_hbk', {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      })
    });

    if(!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message= 'Something went wrong! Sad Emoji.';
      if(errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!\nMaybe check for typos';
      } else if(errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!\nMaybe check for typos';
      } 
      throw new Error(message);
    }
    const resData = await response.json();
    dispatch({
      type: LOGIN, 
      token: resData.idToken, 
      userId: resData.localId 
    });
  }
}