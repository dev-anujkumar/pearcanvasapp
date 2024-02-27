import axios from "axios"
import { getCookieByName } from "./constants/utility";

// eslint-disable-next-line import/prefer-default-export
export const interceptor = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['myCloudProxySession'] = getCookieByName('myCloudProxySession')
}