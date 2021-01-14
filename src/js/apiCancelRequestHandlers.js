/**
 * This module consists of a handler function for cancelling axios API request in case of multiple API requests
 */
import axios from 'axios';
import config from '../config/config';

const axiosRequestCreator = () => {
    let apiCall;
    return url => {
        if (apiCall) {
            apiCall.cancel("Only one request allowed at a time.");
        }
        apiCall = axios.CancelToken.source();
        return axios.get(url, {
            cancelToken: apiCall.token,
            headers:{
            PearsonSSOSession: config.ssoToken            
        }});
    };
};
export const axiosGetAPI = axiosRequestCreator();