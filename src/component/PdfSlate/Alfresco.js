import axios from "axios";
import config from "../../config/config";
import { hasReviewerRole, sendDataToIframe } from "../../constants/utility";
import { LAUNCH_CAT_TOOL, LAUNCH_SITE_PICKER } from "../../constants/IFrameMessageTypes";

var projectMetadata;

/**
* @description function will be called on image src add and fetch resources from Alfresco
*/
export const handleC2MediaClick = (props) => {
    props.handleFocus();
    if (hasReviewerRole()) {
        return true
    }
    let alfrescoPath = config.alfrescoMetaData;
    if (alfrescoPath && projectMetadata) {
        alfrescoPath.alfresco = projectMetadata.alfresco;
    }
    if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
            if (props.permissions && props.permissions.includes('add_multimedia_via_alfresco')) {
                const alfrescoSiteName = alfrescoPath?.alfresco.repositoryFolder ? alfrescoPath.alfresco.repositoryFolder : alfrescoPath.alfresco.name
                const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                const citeNodeRef = alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef
                let messageObj = {
                    appName:'cypress',
                    rootNodeName: citeName,
                    rootNodeId: citeNodeRef,
                    elementId: props.element.id,
                    currentAsset: { type: "Pdf" },
                    defaultCategory:'other'
                }
                sendDataToIframe({ 'type': LAUNCH_CAT_TOOL, 'message': messageObj })
                const messageDataToSave = {
                    id: props.element.id,
                    editor: undefined,
                    citeNodeRef: citeNodeRef
                }
                props.saveSelectedAlfrescoElement(messageDataToSave);
            }
        else{
            props.accessDenied(true)
        }
    }} else {
        if (props.permissions.includes('alfresco_crud_access')) {
            let currentAsset = { type: "Pdf" }
            handleSiteOptionsDropdown(alfrescoPath, props.element.id, props, currentAsset);
            sendDataToIframe({ 'type': LAUNCH_SITE_PICKER, 'message': { browse: false } })
        } else {
            props.accessDenied(true)
        }
    }

}

const handleSiteOptionsDropdown = (alfrescoPath, id, props, currentAsset) => {
    let payloadObj = {
        launchAlfrescoPopup: true,
        alfrescoPath: alfrescoPath,
        id,
        currentAsset
    }
    props.alfrescoPopup(payloadObj)
}
