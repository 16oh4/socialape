import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';
import axios from 'axios';

//dispatch is used for asynchronous code
//also pass history so that we may redirect the user after login

//like a mealy machine that dispatches (output values) based on the userData (input values)
//actions called with this action won't be called until this one is executed
export const loginUser = (userData, history) => (dispatch) => {
    dispatch( {type: LOADING_UI} ); //load an action


    axios.post('/login', userData)
    .then(res => {
        console.log(res.data);
    
        const FBIdToken = `Bearer ${res.data.token}`;

        //Store user login token
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);

        //Every time axios does a request, it will have our token header!!
        //Even to unprotected routes which is alright
        axios.defaults.headers.common['Authorization'] = FBIdToken;

        dispatch(getUserData()); //this will be called after this action is done
        dispatch({type: CLEAR_ERRORS});

        history.push('/'); //redirect to home page

        //Send user to homepage on successful login
        this.props.history.push('/'); //from React Router DOM
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
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