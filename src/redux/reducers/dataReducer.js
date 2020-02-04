import { 
    SET_SCREAMS, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    LOADING_DATA,
    DELETE_SCREAM
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
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            console.log('IN DATA REDUCER FOR LIKE AND UNLIKE');
            // console.log(`SCREAM ARRAY:\n${JSON.stringify(state.screams)}`)
            //the findIndex function 
            let index = state.screams.findIndex( scream => (scream.id === action.payload.screamId));
            // console.log(index);
            // console.log(`SCREAMS BEFORE: ${JSON.stringify(state.screams)}`);
            state.screams[index].likeCount = action.payload.likeCount; //update the scream with the updated scream document from backend
            // console.log(`SCREAMS AFTER: ${JSON.stringify(state.screams)}`);
            return {...state};
        case DELETE_SCREAM:
            console.log('IN DATA REDUCER DELETING SCREAM');

            let index2 = state.screams.findIndex( scream => (scream.id === action.payload));

            state.screams.splice(index2, 1); //remove N elements from array starting at index

            console.log(`DATA STATE\n${state}`);
            console.log(`DATA STATE\n${{...state}}`);
            return {...state};
        default:
            return state;
    }
}