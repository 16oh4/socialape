import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER } from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    loading: false, //for loading user content
    likes: [],
    notifications: []
};

export default function(state = initialState, action) {
    switch(action.type){
        case SET_AUTHENTICATED: //when user logs in mark authentication
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: //when user logs out return initial state
            return initialState; 
        case SET_USER:
            return {
                authenticated: true,
                //getting credentials, likes, and notifications
                //The spread will self bind credentitals: credentials, likes: likes, etc
                ...action.payload,
                loading: false //because we're setting up the profile already 
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}