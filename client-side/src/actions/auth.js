import jwtDecode from 'jwt-decode';
import {API_BASE_URL} from '../config'
import {normalizeResponseErrors} from './utils';
import {Link, Redirect} from 'react-router-dom';

export const SAVE_USER_ID = 'SAVE_USER_ID';
export const saveUserId = (userId) => ({
    type: SAVE_USER_ID,
    userId
})

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = userId => ({
    type: AUTH_SUCCESS,
    userId
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});


const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
}

export const login = (username, password) => dispatch => {
    let authTokenSave;
    let userIdSave;
    console.log('attempting login')
    return (
        //Grab authToken
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => {
            authTokenSave = authToken;
            return storeAuthInfo(authToken, dispatch)
        })
        .catch(err => {
            dispatch(authError(err));
            dispatch(clearAuth());
        })
        //Get the user ID
        .then(() => {
            fetch(`${API_BASE_URL}/api/users`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authTokenSave}`
                }
            })
            .then(res => normalizeResponseErrors(res))
            .then((res) => res.json(res))
            .then((res) => res.forEach((user) => {
                if (user.username === username) {
                    userIdSave = user.id;
                    dispatch(saveUserId(user.id));
                }
            }))
        })
        .catch(err => {
            console.log(err);
        })
    )
}

export const signUp = (username, password) => {
    console.log(JSON.stringify({
        username,
        password
    }))
    return (
        //Grab authToken
        fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then((res) => res.json(res))
        .then((res) => {
            if (res.message) {
                alert(res.message)
            }
            else if (res[0].id) {
                alert('Account Created, proceed to the login screen to login.')
            }
        })
        .catch((err) => alert(err))
    )
}