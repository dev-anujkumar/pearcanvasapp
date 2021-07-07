import config from "../../config/config"
import axios from 'axios';
import { loadTrackChanges } from './TCM_Integration_Actions'
import FetchAllDataMapper from '../TcmSnapshots/FetchAllDataMapper/FetchTcmDataMapper';
import { LAUNCH_TCM_CANVAS_POPUP, SPINNER } from '../../constants/Action_Constants'
import {handleSlateRefresh} from '../CanvasWrapper/SlateRefresh_Actions'

/**
* This function opens TCM w.r.t. current Element
*/
export const handleTCM = (element, index) => (dispatch) => {
    dispatch({
        type: SPINNER,
        payload:true
    })
    const currentProjectUrn = config.projectUrn;
    const currentSlateUrn = config.tcmslatemanifest ? config.tcmslatemanifest : config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
    let url = `${config.TCM_CANVAS_POPUP_DATA}/proj/${currentProjectUrn}/slate/${currentSlateUrn}`
    if (config.isSavingElement) {
        return false
    }
    return axios.get(url, {
        headers: {
            PearsonSSOSession: config.ssoToken,
        }
    }).then((res) => {
        const data = res.data
        const id = element.id
        data.map((elemData) => {
            let eURN = elemData.elemURN
            // to check the element ids which has manifest + work id
            let Check = elemData.elemURN.includes('+')
            let elementId = Check === true && elemData.elemURN.split('+')
            elemData.elemURN = Check === true ? elementId[elementId.length - 1] : elemData.elemURN
            if (elemData.elemURN === id) {
                const elemIndex = [{ index, urn: id }]
                const tcmData = FetchAllDataMapper.processResponse([elemData], id, elemIndex);
                const tcmObject = { isTCMCanvasPopup: true, tcmElemData: tcmData.result[0], elemData: eURN, elementEditor: elemData.latestPendingTransaction?.elementEditor, tcmStatus: elemData.latestAcceptedTransaction ? true : false,spinnerStatus: false}
                dispatch({
                    type: LAUNCH_TCM_CANVAS_POPUP,
                    payload: tcmObject,
                })
            }
        })
    }).catch((error) => {
        console.error(error)
    })
}

/**
    * This function handle Accept and Revert functionality w.r.t. current Element
   */

export const tcmButtonHandler = (status, tcmSnapshotData, elementData) => (dispatch) => {
    const currentProjectUrn = config.projectUrn;
    const currentSlateUrn = config.tcmslatemanifest ? config.tcmslatemanifest : config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
    let timeStamp = tcmSnapshotData?.originalLastUpdatedTimestamp;
    let eURN = elementData
    let body = { "lastUpdatedTimestamp": timeStamp, "changeStatus": status };
    let url = `${config.TCM_CANVAS_POPUP_DATA}/proj/${currentProjectUrn}/slate/${currentSlateUrn}/elem/${eURN}`
    return axios.patch(url, body, {
        headers: {
            PearsonSSOSession: config.ssoToken,
        }
    }).then((res) => {
        const tcmObject = { isTCMCanvasPopup: false }
        dispatch({
            type: LAUNCH_TCM_CANVAS_POPUP,
            payload: tcmObject
        })
        dispatch(handleSlateRefresh(currentSlateUrn, () => {}))
    }).catch((error) => {
        console.error(error)
    })
}

/**
    * This function close TCM Popup w.r.t. current Element
   */

export const closeTcmPopup = () => (dispatch) => {
    const tcmObject = { isTCMCanvasPopup: false }
    dispatch({
        type: LAUNCH_TCM_CANVAS_POPUP,
        payload: tcmObject
    })
}