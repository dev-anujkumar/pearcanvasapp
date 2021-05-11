import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    launchAlfrescoPopup: false,
    alfrescoPath: {},
    alfrescoListOption: {},
    alfrescoAssetData: {},
    elementId: ''
}

const INITIAL_ACTION = {
    type: '',
    payload: {}
}

export default function alfrescoReducer(state = INITIAL_STATE, action = INITIAL_ACTION) {
    switch (action.type) {
        case SET_ALFRESCO_POPUP:
            return {
                ...state,
                launchAlfrescoPopup: action.payload.launchAlfrescoPopup,
                alfrescoPath: action.payload.alfrescoPath,
                alfrescoListOption: action.payload.alfrescoListOption
            }
        case SAVE_ALFRESCO_ASSET_DATA:
            return {
                alfrescoAssetData: action.payload.asset,
                elementId: action.payload.id
            }
        default:
            return state
    }
}