/**Import -Plugins */
import axios from 'axios';
/**Import -other dependencies */
import config from '../../../config/config';
/**Import -constants */
import { GET_USAGE_TYPE } from "../../../constants/Action_Constants";

/**
 * This action creator is used to fetch usage-type based on entityType
 */
export const fetchUsageTypeData = (entityType) => async (dispatch) => {

    let url = `${config.AUDIO_NARRATION_URL}/usagetypes/v3/${entityType}?locale=en`;
    return await axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken
        }
    }).then((res) => {
        let usageTypeDropdown = {};
        if (res && res.data && res.data.length) {
            res.data.filter(usageType => {
                return Object.assign(usageTypeDropdown, {
                    [usageType.usagetype]: usageType.label.en
                })
            })
        }
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: usageTypeDropdown,
                apiStatus: 200,
            }
        })
    }).catch(() => {
        dispatch({
            type: GET_USAGE_TYPE,
            payload: {
                entityType: entityType,
                usageTypeList: {},
                apiStatus: 404,
            }
        })
    })
}
