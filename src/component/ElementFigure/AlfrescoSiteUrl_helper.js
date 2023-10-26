import config from '../../config/config';
import axios from 'axios';

export const handleAlfrescoSiteUrl = (elementId, data) => {
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/platformMetadata/alfresco`
    let repositoryFolder = data?.repositoryFolder?.split('/')?.[0] || data?.repositoryFolder
    let req = {
        ...data,
        repositoryFolder:repositoryFolder,
        currentAsset:{}
    };

    axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
    }).catch(error => {
        console.log("error", error);
    })
}

export const getAlfrescositeResponse = (elementId, callback) => {
    let url = `${config.NARRATIVE_READONLY_ENDPOINT}v2/${elementId}/platformMetadata/alfresco`
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => response.json())
        .then(response => {
            callback(response);
        }).catch(error => {
    })
}


export const handleSiteOptionsDropdown = (alfrescoPath, id, locationData, currentAsset) => {
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

                let payloadObj = {
                    launchAlfrescoPopup: true,
                    alfrescoPath: alfrescoPath,
                    alfrescoListOption: response.data.list.entries,
                    id,
                    locationData,
                    currentAsset
                }
                return payloadObj;
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
}
