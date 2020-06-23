/**Import -Plugins */
import axios from 'axios';
/**Import -other dependencies */
import config from '../../../config/config';
/**Import -constants */
import { GET_USAGE_TYPE } from "../../../constants/Action_Constants";

/**
 * This action creator is used to fetch usage-type based on entityType
 */
export const fetchUsageTypeData = (entityType) => (dispatch) => {

    let url = `${config.AUDIO_NARRATION_URL}/usagetypes/v3/${entityType}?locale=en`;
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let usageTypeList = [];
        if (res && res.data && res.data.length) {
            res.data.filter(usageType => {
                usageTypeList.push(usageType.label.en)
            })
        }
        console.log('usageTypeList',usageTypeList)
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: usageTypeList,
                apiStatus: 200,
            }
        })
    }).catch(() => {
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: [],
                apiStatus: 404,
            }
        })
    })
}