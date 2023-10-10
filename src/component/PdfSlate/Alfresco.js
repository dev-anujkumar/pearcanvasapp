import axios from "axios";
import config from "../../config/config";
import { hasReviewerRole, sendDataToIframe } from "../../constants/utility";

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
                    citeName: citeName,
                    citeNodeRef: citeNodeRef,
                    elementId: props.element.id,
                    currentAsset: { type: "Pdf" }
                }
                sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
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
        } else {
            props.accessDenied(true)
        }
    }

}

const handleSiteOptionsDropdown = (alfrescoPath, id, props, currentAsset) =>{
    let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
    let SSOToken = config.ssoToken;
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
           let payloadObj = {launchAlfrescoPopup: true, 
            alfrescoPath: alfrescoPath, 
            alfrescoListOption: response.data.list.entries,
            id,
            currentAsset
        }
            props.alfrescoPopup(payloadObj)
        })
        .catch(function (error) {
            console.log("Error IN SITE API", error)
        });
}