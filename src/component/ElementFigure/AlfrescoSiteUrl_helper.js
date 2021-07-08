import config from '../../config/config';
import axios from 'axios';

export const handleAlfrescoSiteUrl = (elementId, data) => {
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/platformMetadata/alfresco`
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
    let url = `${config.NARRATIVE_API_ENDPOINT}v2/${elementId}/platformMetadata/alfresco`
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