import { 
    SET_USER, 
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED, 
    LOADING_USER,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    MARK_NOTIFICATIONS_READ
} from '../types';

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
        case LIKE_SCREAM:
            console.log('IN USER REDUCER FOR LIKE');

            return {
                ...state,
                likes: [
                    ...state.likes, //append the new like
                    {
                        userHandle: state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM:
            console.log('IN USER REDUCER FOR UNLIKE');
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(notif => notif.read = true);
            return {
                ...state
            };
        default:
            return state;
    }
}