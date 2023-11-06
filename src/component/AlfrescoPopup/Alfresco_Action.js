
import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA,
    SAVE_INLINE_IMAGE_DATA,
    SAVE_ALFRESCO_ELEMENT,
    SAVE_ALFRESCO_ALT_LONG_DESC_DATA
} from './../../constants/Action_Constants';
import config from '../../config/config';
import axios from 'axios';

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
export const saveSelectedAlfrescoElement = (data) =>{
    return {
        type: SAVE_ALFRESCO_ELEMENT,
        payload: data
    }
}
export const saveInlineImageData = (data) =>{
    return {
        type: SAVE_INLINE_IMAGE_DATA,
        payload: data
    }
}

export const saveSelectedAltTextLongDescData = (data) => {
    return {
        type: SAVE_ALFRESCO_ALT_LONG_DESC_DATA,
        payload: data
    }
}
/**
 * This method is used to fetch Alfresco Site list
 * @param {*} calledFrom
 * @returns
 */
export const fetchAlfrescoSiteDropdownList = (calledFrom) => {
    let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=2500`;
    return axios.get(url,
        {
            headers: {
                'Accept': 'application/json',
                'ApiKey': config.CMDS_APIKEY,
                'Content-Type': 'application/json',
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        .then(function (response) {
            if (response?.data?.list?.entries?.length > 0) {
                if (calledFrom === 'projectAlfrescoSettings') {
                    /**
                     * Set NodeRef for root level of AlfrescoSite when inner folders
                     * of Alfresco selected from UDB for cover art selection
                     */
                    const apiData = response.data.list.entries.map(sitedata => sitedata?.entry)
                    const projectAlfrescoSite = apiData?.find(siteitem => siteitem?.id === config.alfrescoMetaData?.alfresco?.siteId)
                    const oldNodeRef = config.alfrescoMetaData?.alfresco?.nodeRef
                    config.alfrescoMetaData.alfresco.nodeRef = projectAlfrescoSite?.guid || oldNodeRef
                    console.log('ProjectAlfresco>>>>>>>', config.alfrescoMetaData?.alfresco)
                }
            }
        })
        .catch(function (error) {
            console.log("Error IN AlfrescoSite API", error)
        });
}
