import { 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    LOADING_UI,
    STOP_LOADING_UI,
    LOADING_UI_SCREAM,
    STOP_LOADING_UI_SCREAM,
    SUBMITTED,
    CLEAR_SUBMIT
} from '../types';

const initialState = {
    loading: false, //for the loading animation
    errors: null,
    submitted: false,
    loadingScream: false,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ERRORS:
            console.log('IN SET_ERRORS\n\n')
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            console.log('IN CLEAR_ERRORS\n\n')
            return {
                ...state,
                loading: false,
                errors: null
            };
        case SUBMITTED:
            console.log('SUBMITTED!\n\n');
            return {
                ...state,
                submitted: true
            }
        case CLEAR_SUBMIT:
            console.log('CLEAR_SUBMIT!\n\n');
            return {
                ...state,
                submitted: false
            }
        case LOADING_UI:
            console.log('IN LOADING_UI\n\n\n\n\n');
            return {
                ...state,
                loading: true,
            }
        case STOP_LOADING_UI:
            console.log('IN STOP_LOADING_UI\n\n\n\n\n')
            return {
                ...state,
                loading: false,
            }
        case LOADING_UI_SCREAM:
            return {
                ...state,
                loadingScream: true
            }
        case STOP_LOADING_UI_SCREAM:
            return {
                ...state,
                loadingScream: false
            }
        default:
            return state;
    }
}