import { 
    SET_SCREAMS, 
    SET_SCREAM,
    POST_SCREAM,
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM,

    LOADING_DATA,
    LOADING_UI,
    STOP_LOADING_UI,

    SET_ERRORS,
    CLEAR_ERRORS,
    
    SUBMITTED,
    CLEAR_SUBMIT
 } from '../types';
 
import axios from 'axios';

export const postScream = (newScream) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/scream', newScream)
    .then(res => {
        dispatch({type: STOP_LOADING_UI});
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });
        dispatch({
            type: CLEAR_ERRORS
        })
        dispatch({
            type: SUBMITTED
        })
    })
    .catch(err => {
        dispatch({type: STOP_LOADING_UI});
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    })
    
}

// get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA} ); //set the content to loading state while we fetch screams

    axios.get('/screams')
    .then(res => {
        // console.log(JSON.stringify(res.data));
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        });
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: [] //return empty screams if error
        });
    })
}

// Like a scream
export const likeScream = (screamId) => (dispatch) => {
    axios.get(`scream/${screamId}/like`)
    .then(res => {
        dispatch({ //tell redux dispatcher to asses the new type of action and send the payload
            type: LIKE_SCREAM, //this is the state PARAMETER in the reducer
            payload: res.data //this is the action PARAMETER in the reducer
        })
        // console.log(`Scream liked: ${JSON.stringify(res.data)}`);
        // history.push('/');
    })
    .catch(err => {
        console.error(err);
    })

    
}

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`scream/${screamId}/unlike`)
    .then(res => {
        dispatch({ //tell redux dispatcher to asses the new type of action and send the payload
            type: UNLIKE_SCREAM,
            payload: res.data
        })
        // console.log(`Scream unliked: ${JSON.stringify(res.data)}`);
        // history.push('/');
        // window.location.href = '/';
    })
    .catch(err => {
        console.error(err);
    })
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`scream/${screamId}`)
    .then(() => {
        console.log('IN DATA ACTIONS DELETING SCREAM')
        dispatch( { type: DELETE_SCREAM, payload: screamId } )
    })
    .catch(err => {
        console.error(err);
    })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}

export const clearSubmit = () => dispatch => {
    dispatch({type: CLEAR_SUBMIT});
}

export const getScream = (screamId) => dispatch => {
    dispatch( {type: LOADING_UI } ); //display loading circle until data is fetched
    axios.get(`/scream/${screamId}`)
    .then(res => {
        dispatch({
            type: SET_SCREAM, //
            payload: res.data
        })
        dispatch( {type: STOP_LOADING_UI} ); //remove loading circle
    })
    .catch(err => {
        dispatch( {type: STOP_LOADING_UI} );
        console.error(err);
    })
}