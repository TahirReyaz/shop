import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_TRIED_AL= 'SET_TRIED_AL';

let timer;

export const setTriedAl = () => {
  return {type: SET_TRIED_AL };
} 

export const authenticate = (userId, token, expiryTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, userId: userId, token: token});
  }
}

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
    dispatch(authenticate(
      resData.localId, 
      resData.idToken, 
      parseInt(resData.expiresIn) * 1000)
    );
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.localId, resData.idToken, expirationDate);
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
    dispatch(
      authenticate(
        resData.localId, 
        resData.idToken, 
        parseInt(resData.expiresIn) * 1000
      )
    );
    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(resData.localId, resData.idToken, expirationDate);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT };
}

const clearLogoutTimer = () => {
  if(timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime)
  }
}

const saveDataToStorage = (userId, token, expirationDate) => {
  AsyncStorage.setItem(
    'userData', 
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString()
    })
  );
};