
import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA,
    SAVE_INLINE_IMAGE_DATA
} from './../../constants/Action_Constants';

export const alfrescoPopup = (data) => {
    return {
        type: SET_ALFRESCO_POPUP,
        payload: data
    }
}

export const saveSelectedAssetData = (data) =>{
    return {
        type: SAVE_ALFRESCO_ASSET_DATA,
        payload: data
    }
}

export const saveInlineImageData = (data) =>{
    debugger
    return {
        type: SAVE_INLINE_IMAGE_DATA,
        payload: data
    }
}