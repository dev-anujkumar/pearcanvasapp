
import {
    SET_ALFRESCO_POPUP,
    SAVE_ALFRESCO_ASSET_DATA,
    SAVE_INLINE_IMAGE_DATA,
    SAVE_ALFRESCO_ELEMENT,
    SAVE_ALFRESCO_ALT_LONG_DESC_DATA
} from './../../constants/Action_Constants';
import config from '../../config/config';
import axios from 'axios';
import { sendDataToIframe } from '../../constants/utility';
import { LAUNCH_CAT_TOOL } from '../../constants/IFrameMessageTypes';

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

/**
 * This function updates the project CAT site
 * @param {Object} props Component Props
 * @param {\Object} selectedSite Site selected using CAT site picker
 * @returns 
 */
export const sendSelectedSiteData = (props, selectedSite) => {
    // aflresco site details payload for alfrescoDetails API
    let alfrescoData = {
        guid: selectedSite?.site?.rootNodeId,
        id: selectedSite?.site?.title,
        title: selectedSite?.site?.rootNodeName,
        visibility: selectedSite?.site?.visibility,
        preset: selectedSite?.site?.preset,
        role: selectedSite?.site?.role,
        repositoryFolder: selectedSite?.site?.repositoryFolder
    }

    let tempData = props.alfrescoPath || {}
    tempData.alfresco = alfrescoData
    config.alfrescoMetaData = tempData
    let payloadObj = {
        launchAlfrescoPopup: false,
        alfrescoPath: props.alfrescoPath
    }

    props.alfrescoPopup(payloadObj)
    const editor = props.isInlineEditorOpen === true
    let alfrescoLocationData = props.locationData
    let locationSiteDataNodeRef = alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
    locationSiteDataNodeRef = locationSiteDataNodeRef ? locationSiteDataNodeRef : alfrescoData.guid;
    const locationSiteDataTitle = alfrescoLocationData?.repositoryFolder ? alfrescoLocationData.repositoryFolder : alfrescoLocationData?.title
    // message send to CAT tool to open CAT picker after site picker
    let messageObj = {
        appName: 'cypress', rootNodeName: locationSiteDataTitle ? locationSiteDataTitle : alfrescoData.title, rootNodeId: locationSiteDataNodeRef,
        elementId: props.alfrescoElementId, editor, calledFromGlossaryFootnote: props.calledFromGlossaryFootnote,
        calledFromImageGlossaryFootnote: props.calledFromImageGlossaryFootnote, currentAsset: props.currentAsset,
        defaultCategory: props.defaultCategory || props.currentAsset.type
    }
    sendDataToIframe({ 'type': LAUNCH_CAT_TOOL, 'message': messageObj })
    // saving the current element data
    const messageDataToSave = {
        id: props.alfrescoElementId,
        calledFromGlossaryFootnote: props.calledFromGlossaryFootnote,
        editor: editor,
        citeNodeRef: locationSiteDataNodeRef,
        calledFromImageGlossaryFootnote: props.calledFromImageGlossaryFootnote
    }
    props.saveSelectedAlfrescoElement(messageDataToSave)
    let request = {
        eTag: props.alfrescoPath.etag,
        projectId: props.alfrescoPath.id,
        ...props.alfrescoPath,
        additionalMetadata: { ...alfrescoData },
        alfresco: { ...alfrescoData }
    };
    /*
        API to set alfresco location on dashboard
    */
    let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
    return axios.patch(url, request.alfresco,
        {
            headers: {
                'Accept': 'application/json',
                'ApiKey': config.STRUCTURE_APIKEY,
                'Content-Type': 'application/json',
                'If-Match': request.eTag,
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        .then(function (response) {
            console.log('Updated Project Alfresco site',response)
        })
        .catch(function (eror) {
            console.error("Error in updating roject Alfresco Site", error)
        });
}