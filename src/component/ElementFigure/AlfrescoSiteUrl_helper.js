import config from '../../config/config';
import cypressConfig from '../../config/cypressConfig';
import axios from 'axios';

export const handleAlfrescoSiteUrl = (elementId) => {
    const data = config.alfrescoMetaData && config.alfrescoMetaData.alfresco;
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/platformMetadata/alfresco`
    let req = {
        ...data,
        currentAsset:{}
    };

    axios.put(url, req, {
        headers: {
            "Content-Type": "application/json",
            PearsonSSOSession: config.ssoToken
        }
    }).then(response => {
    }).catch(error => {
        console.error("error", error);
    })
}

export const getAlfrescositeResponse = (elementId, callback) => {
    let url = `${config.STRUCTURE_API_URL}narrative-api/v2/${elementId}/platformMetadata/alfresco`
    fetch(url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            "PearsonSSOSession": config.ssoToken,
            'Cache-Control': 'no-cache'
        }
    }).then(response => response.json())
        .then(response => {
            callback(response);
        }).catch(error => {
            //console.log("error", error);
        })
}