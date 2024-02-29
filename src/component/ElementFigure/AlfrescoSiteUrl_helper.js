import config from '../../config/config';
import axios from 'axios';
import { CONTENT_TYPE } from '../../constants/Element_Constants';

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
            "Content-Type": CONTENT_TYPE,
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
    }).catch(error => {
        console.log("error", error);
    })
}

export const handleSiteOptionsDropdown = (alfrescoPath, id, locationData, currentAsset) => {
    let payloadObj = {
        launchAlfrescoPopup: true,
        alfrescoPath: alfrescoPath,
        id,
        locationData,
        currentAsset
    }
    return payloadObj;
}
