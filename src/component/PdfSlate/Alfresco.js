//import axios from "axios";
import config from "../../config/config";
import { hasReviewerRole } from "../../constants/utility";
import { c2MediaModule } from "../../js/c2_media_module";

let projectMetadata;

/**
* @description function will be called on image src add and fetch resources from Alfresco
*/
export const handleC2MediaClick = (props, alfrescoSiteData) => {
    props.handleFocus();
    if (hasReviewerRole()) {
        return true
    }
    const currentAsset = {};

    let alfrescoPath = config.alfrescoMetaData;
    if (alfrescoPath && projectMetadata) {
        alfrescoPath.alfresco = projectMetadata.alfresco;
    }
    var data_1 = false;
    if(alfrescoPath?.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
    if (alfrescoPath.alfresco?.nodeRef) {         //if alfresco location is available
        if (props?.permissions.includes('add_multimedia_via_alfresco')) {
            data_1 = alfrescoPath.alfresco;
            data_1.currentAsset = currentAsset;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']
            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            return data_1;
        }
        else {
            props.accessDenied(true)
        }
    }} else {
        if (props.permissions.includes('alfresco_crud_access')) {
            c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                data_1 = {
                    ...alfrescoData,
                    currentAsset: currentAsset,
                };

                let request = {
                    eTag: alfrescoPath.etag,
                    projectId: alfrescoPath.id,
                    ...alfrescoPath,
                    additionalMetadata: { ...alfrescoData },
                    alfresco: { ...alfrescoData }
                };
                /*
                    preparing data according to Project api
                */
                request.additionalMetadata['repositoryName'] = data_1['repoName'];
                request.additionalMetadata['repositoryFolder'] = data_1['name'];
                request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                request.alfresco['repositoryName'] = data_1['repoName'];
                request.alfresco['repositoryFolder'] = data_1['name'];
                request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                request.alfresco['visibility'] = data_1['siteVisibility'];

                return data_1;
                /*
                    API to set alfresco location on dashboard
                */
                //let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                //let SSOToken = request.ssoToken;
                //return axios.patch(url, request.alfresco,
                //    {
                //        headers: {
                //            'Accept': 'application/json',
                //            'ApiKey': config.STRUCTURE_APIKEY,
                //            'Content-Type': 'application/json',
                //            'PearsonSSOSession': SSOToken,
                //            'If-Match': request.eTag
                //        }
                //    })
                //    .then(function (response) {
                //        let tempData = { alfresco: alfrescoData };
                //        //that.setState({
                //        //    projectMetadata: tempData
                //        //})
                //        projectMetadata = tempData;
                //    })
                //    .catch(function (error) {
                //        console.log("error", error)
                //    });
            })
        } else {
            props.accessDenied(true)
        }
    }

}