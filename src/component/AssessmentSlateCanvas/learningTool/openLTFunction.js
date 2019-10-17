import config from '../../../config/config';

/**
 * @description - Download discipline data from the URL.
 *
 * @async
 * @function getDisAsync
 * @return {Array>} The data from the URL.
 */
async function getDisAsync() {
    let response = await fetch(config.STRUCTURE_API_URL + 'core/learningtemplate/v2/taxonomy/disciplines?locale=en', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'apikey': config.STRUCTURE_APIKEY,
            'pearsonssosession': config.ssoToken
          }
    })
    let data = await response.json()
    return data;
}
/**
 * @description - Responsable for opening the LT popup and dispatching the actions for conditional rendering of LT/LA
 * @function openLTFunction
 * 
 */
export const openLTFunction = (getDiscipline) => {
    getDisAsync().then(
        (data) => {
            getDiscipline(data);
        });
}
