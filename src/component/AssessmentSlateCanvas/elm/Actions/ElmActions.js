import config from '../../../../config/config';
import {projectDetails} from '../../AssessmentSlateConstants';
import axios from 'axios';

export const insertElmResourceAction = () => (dispatch)=> {

    let project_urn = projectDetails.PROJECT_URN;
    // return function (dispatch) {
    //     return axios.get(`${config.ELM_END_POINT}v2/${project_urn}/alignments/resources`, {
            return axios.get("https://contentapis-qa.pearsoncms.net/manifest-api/v2/urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef/alignments/resources", {
            
            headers: {
                'ApiKey': config.STRUCTURE_APIKEY,
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