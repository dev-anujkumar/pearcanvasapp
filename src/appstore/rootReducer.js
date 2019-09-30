import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'
import toolbarReducer from './toolbarReducer.js';
import glossaryFootnoteReducer from './glossaryFootnoteReducer';

export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer:commentsPanelReducer,
    toolbarReducer : toolbarReducer,
    glossaryFootnoteReducer:glossaryFootnoteReducer
});