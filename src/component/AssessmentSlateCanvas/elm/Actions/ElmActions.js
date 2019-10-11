const config = require('../../../../js/config').GET_CONFIG();
const {
    STRUCTURE_APIKEY, ASSET_POPOVER_ENDPOINT
} = config;
var projectDetails = require('../../../../js/constants/projectData').projectDetails;
import axios from 'axios';

export const insertElmResourceAction = () => {

    let project_urn = projectDetails.PROJECT_URN;
    return function (dispatch) {
        return axios.get(`${ASSET_POPOVER_ENDPOINT}v2/${project_urn}/alignments/resources`, {
            headers: {
                'ApiKey': STRUCTURE_APIKEY,
                'PearsonSSOSession': getOldCookie('PearsonSSOSession')
            }
        }).then((res) => {
            dispatch({
                type: 'GET_ELM_RESOURCES',
                payload: {
                    data: res.data,
                    errFlag: false,
                    apiStatus: "200"
                }
            })
        }).catch((error) => {
            console.log("error",error)
            dispatch({
                type: 'GET_ELM_RESOURCES',
                payload: {
                    data: [],
                    errFlag: true,
                    apiStatus: error.response.status
                }
            })
        })
    }
}

function getOldCookie(cname) {

    var name = cname + "=";

    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}