import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'
import toolbarReducer from './toolbarReducer.js';
import glossaryFootnoteReducer from './glossaryFootnoteReducer';
import slateLockReducer from './slateLockReducer';
import learningToolReducer from './learningToolReducer';
import metadataReducer from './metadataReducer';
import assetPopOverSearch from './assetPopoverReducer';

export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer: commentsPanelReducer,
    toolbarReducer: toolbarReducer,
    glossaryFootnoteReducer: glossaryFootnoteReducer,
    metadataReducer: metadataReducer,
    slateLockReducer,
    learningToolReducer,
    assetPopOverSearch
});