import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'
import toolbarReducer from './toolbarReducer.js';


export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer:commentsPanelReducer,
    toolbarReducer : toolbarReducer
});