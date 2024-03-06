import axios from "axios"
import { redirect } from "./config/redirectUtility";
// eslint-disable-next-line import/prefer-default-export
export const interceptor = () => {
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        (res) => res, (err) => errorHandler(err))
}

export const errorHandler = (err) => {
    switch (err.response.status) {
        case 400:
            console.log('Invalid Request')
            break;
        case 401:
            console.log('Unauthorized')
            redirect()
            break;
        case 403:
            console.log('This is Approved Content.Please create new version.')
            break;
        case 500:
            console.log('Server Error: Please check you token', err.response)
            if (err.response.data.includes("401") || err.response.data.includes("UNAUTHORIZED"))
                redirect()
            break;
        default:
            console.log('Unwanted Error')
    }
    return Promise.reject(err);
}