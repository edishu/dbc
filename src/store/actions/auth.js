import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart);
        axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCffk3xqMgU5ZSWNFceOBmqelZXMCPHXY8", email, password)
        .then(payload => console.log(payload))
        .catch(error => console.log(error));
    }
}