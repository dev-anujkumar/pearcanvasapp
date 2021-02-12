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
        console.log('response', response)
    }).catch(error => {
        //console.log("error", error);
    })
}