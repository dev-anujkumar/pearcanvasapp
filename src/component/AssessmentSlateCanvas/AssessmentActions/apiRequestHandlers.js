
import axios from 'axios';
import config from '../../../config/config';

const makeRequestCreator = () => {
    let call;
    return url => {
        if (call) {
            call.cancel("Only one request allowed at a time.");
        }
        call = axios.CancelToken.source();
        return axios.get(url, {
            cancelToken: call.token,
            headers:{
            PearsonSSOSession: config.ssoToken            
        }});
    };
};
export const axiosGetAPI = makeRequestCreator();