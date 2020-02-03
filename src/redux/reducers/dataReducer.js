import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA } from '../types';

const initialState = {
    screams: [], //for all recent screams
    scream: {}, //for one scream
    loading: false
};

export default (state=initialState, action) => {
    switch(action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case UNLIKE_SCREAM: //fall-through
        case LIKE_SCREAM:
            //the findIndex function 
            let index = state.screams.findIndex( scream => (scream.screamId === action.payload.screamId));
            if(index === (-1)) return state;
            else {
                state.screams[index] = action.payload; //update the scream with the updated scream document from backend
                return state;
            }
        default:
            return state;
    }
}