import { combineReducers } from 'redux';
import appReducer from './reducers';
import commentsPanelReducer from './commentsPanelReducer.js'
import toolbarReducer from './toolbarReducer.js';
import glossaryFootnoteReducer from './glossaryFootnoteReducer';
import slateLockReducer from './slateLockReducer';
import learningToolReducer from './learningToolReducer';
import metadataReducer from './metadataReducer';
import assetPopOverSearch from './assetPopoverReducer';
import elmReducer from './elmReducer';
import audioReducer from './audioNarrationReducer';
import errorPopup from './errorPopupReducer';
import citeTdxReducer from './citeTdxReducer';
import tcmReducer from './tcmReducer';
import elementStatusReducer from "./elementStatusReducer";

export default combineReducers({
    appStore: appReducer,
    commentsPanelReducer: commentsPanelReducer,
    toolbarReducer: toolbarReducer,
    glossaryFootnoteReducer: glossaryFootnoteReducer,
    metadataReducer: metadataReducer,
    slateLockReducer,
    assetPopOverSearch,
    elmReducer,
    learningToolReducer,
    audioReducer,
    errorPopup,
    citeTdxReducer,
    tcmReducer,
    elementStatusReducer
});