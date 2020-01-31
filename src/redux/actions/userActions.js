import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

//dispatch is used for asynchronous code
//also pass history so that we may redirect the user after login

//like a mealy machine that dispatches (output values) based on the userData (input values)
//actions called with this action won't be called until this one is executed
export const loginUser = (userData, history) => (dispatch) => {
    dispatch( {type: LOADING_UI} ); //load an action

    axios.post('/login', userData)
    .then(res => {
        setAuthorizationHeader(res.data.token); //make sure axios calls are with token

        dispatch(getUserData()); //this will be called after this action is done
        dispatch({type: CLEAR_ERRORS});

        history.push('/'); //redirect to home page
    })
    .catch(err => {
        console.error(err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch( {type: LOADING_UI} ); //load an action


    axios.post('/signup', newUserData)
    .then(res => {
        setAuthorizationHeader(res.data.token); //make sure axios calls are with token
        
        dispatch(getUserData()); //this will be called after this action is done
        dispatch({type: CLEAR_ERRORS}); //clear errors  once we get user data

        history.push('/'); //redirect to home page
    })
    .catch(err => {
        console.error('HELLO ERROR' + err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED}); //clear user state
}


export const getUserData = () => (dispatch) => {
    axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data //data for dispatch to work with
        })
    })
    .catch(err => console.error(err));
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;

    //Store user account token
    localStorage.setItem('FBIdToken', `Bearer ${token}`);

    //Every time axios does a request, it will have our token header!!
    //Even to unprotected routes which is alright
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}