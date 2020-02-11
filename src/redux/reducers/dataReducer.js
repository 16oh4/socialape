import { 
    SET_SCREAMS,
    SET_SCREAM,
    LIKE_SCREAM, 
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    POST_SCREAM,
    LOADING_DATA,
    SUBMIT_COMMENT
    
} from '../types';

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
                screams: action.payload, //this replaces the screams entry in spread ...state
                loading: false
            }
        case SET_SCREAM:
            console.log('IN SET_SCREAM\n\n\n\n\n');
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex( scream => (scream.id === action.payload.screamId));
            state.screams[index].likeCount = action.payload.likeCount; //update the scream with the updated scream document from backend
            
            //update scream used in dialog also

            // if the currently fetched scream dialog is the same as the one just liked,
            // copy the data from the liked scream onto the scream dialog
            if(state.scream.screamId === action.payload.screamId) {
                state.scream.likeCount = action.payload.likeCount;
            }
            
            return {...state};
        case DELETE_SCREAM:
            let index2 = state.screams.findIndex( scream => (scream.id === action.payload));
            state.screams.splice(index2, 1); //remove N elements from array starting at index
            return {...state};
        case POST_SCREAM:
            action.payload.id = action.payload.screamId;
            return {
                ...state,
                screams: [
                    action.payload, //put scream at the top because it's the newest one
                    ...state.screams
                ]
            };
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    //add the new comment to the top of the ScreamDialog scream object!!
                    comments: [action.payload, ...state.scream.comments]
                }
            };
        default:
            return state;
    }
}