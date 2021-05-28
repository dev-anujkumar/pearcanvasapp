import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA,
    SAVE_INLINE_IMAGE_DATA
} from '../constants/Action_Constants';

const INITIAL_STATE = {
    launchAlfrescoPopup: false,
    alfrescoPath: {},
    alfrescoListOption: {},
    alfrescoAssetData: {},
    elementId: '',
    Permission : [],
    editor : {},
    isCiteChanged: false,
    changedSiteData: {}
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
                alfrescoListOption: action.payload.alfrescoListOption,
                elementId: action.payload.id
            }
        case SAVE_ALFRESCO_ASSET_DATA:
            return {
                alfrescoAssetData: action.payload.asset,
                elementId: action.payload.id,
                isCiteChanged: action.payload.changedSiteUrl,
                changedSiteData: action.payload.changedAlfrescoData
            }
        case SAVE_INLINE_IMAGE_DATA:
            return {
                Permission: action.payload.permissions,
                editor: action.payload.editor,
                elementId: action.payload.element
            }
        default:
            return state
    }
}