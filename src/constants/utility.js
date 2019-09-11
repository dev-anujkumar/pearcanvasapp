import config from './../../config/config';

const WRAPPER_URL = config.WRAPPER_URL; // TO BE IMPORTED

export const sendDataToIframe = (messageObj) => {
    window.parent.postMessage(messageObj, WRAPPER_URL)
}