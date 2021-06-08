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

                const alfrescoCiteName = alfrescoPath?.alfresco.repositoryFolder ? alfrescoPath.alfresco.repositoryFolder : alfrescoPath.alfresco.name
                let messageObj = { citeName: alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoCiteName  , 
                    citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                    elementId: props.element.id }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
         }
        else{
            props.accessDenied(true)
        }
    }} else {
        if (props.permissions.includes('alfresco_crud_access')) {
            handleSiteOptionsDropdown(alfrescoPath, props.element.id, props)
        } else {
            props.accessDenied(true)
        }
    }

}

const handleSiteOptionsDropdown = (alfrescoPath, id, props) =>{
    let url = 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
    let SSOToken = config.ssoToken;
    return axios.get(url,
 {
            headers: {
                'Accept': 'application/json',
                'ApiKey': config.CMDS_APIKEY,
                'Content-Type': 'application/json',
                'PearsonSSOSession': SSOToken
            }
        })
        .then(function (response) {
           let payloadObj = {launchAlfrescoPopup: true, 
            alfrescoPath: alfrescoPath, 
            alfrescoListOption: response.data.list.entries,
            id
        }
            props.alfrescoPopup(payloadObj)
        })
        .catch(function (error) {
            console.log("Error IN SITE API", error)
        });
}