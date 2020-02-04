import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types';
import axios from 'axios';

// get all screams
export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA} ); //set the content to loading state while we fetch screams

    axios.get('/screams')
    .then(res => {
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