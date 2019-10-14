import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'
import toolbarReducer from './toolbarReducer.js';
import glossaryFootnoteReducer from './glossaryFootnoteReducer';
import slateLockReducer from './slateLockReducer';

import assetPopOverSearch from './assetPopoverReducer';

export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer:commentsPanelReducer,
    toolbarReducer : toolbarReducer,
    glossaryFootnoteReducer:glossaryFootnoteReducer,
    slateLockReducer,
    assetPopOverSearch
});