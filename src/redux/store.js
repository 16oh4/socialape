//Package imports
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //middleware or store enhancer

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

//combineReducers pretty much does what it says...
//that way for the human it's more readable in multiple files,
//but for redux it's all in one big file
const reducers = combineReducers({
    data: dataReducer,
    user: userReducer,  //this is accessed by state.user in files with export 'connect'
    
    UI: uiReducer
});

const store = createStore(
    reducers, 
    initialState, 
    compose(
        applyMiddleware(...middleware), 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store; //contains application state