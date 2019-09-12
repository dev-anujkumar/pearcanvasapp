import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'


export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer:commentsPanelReducer    
});