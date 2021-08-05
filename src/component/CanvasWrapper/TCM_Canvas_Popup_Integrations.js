import config from "../../config/config"
import axios from 'axios';
import FetchAllDataMapper from '../TcmSnapshots/FetchAllDataMapper/FetchAllDataMapper';
import { LAUNCH_TCM_CANVAS_POPUP, SPINNER } from '../../constants/Action_Constants'
import {handleSlateRefresh} from '../CanvasWrapper/SlateRefresh_Actions'

/**
* This function opens TCM w.r.t. current Element
*/
export const handleTCM = (element, index, isPopupOpen, prevElementId) => (dispatch) => {
    const currentProjectUrn = config.projectUrn;
    const currentSlateUrn = config.tcmslatemanifest ? config.tcmslatemanifest : config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
    let url = `${config.TCM_CANVAS_POPUP_DATA}/proj/${currentProjectUrn}/slate/${currentSlateUrn}`
    if (config.isSavingElement) {
        return false
    }
    if(isPopupOpen && element.id === prevElementId){
        return false
    }
    dispatch({
        type: SPINNER,
        payload:true
    })
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
                const elemEditorName = elemData.latestPendingTransaction?.elementEditor ? elemData.latestPendingTransaction.elementEditor : elemData.latestAcceptedTransaction?.elementEditor
                const tcmObject = { isTCMCanvasPopup: true, tcmElemData: tcmData.result[0], elemData: eURN, elementEditor: elemEditorName, tcmStatus: elemData.latestAcceptedTransaction ? true : false,spinnerStatus: false,
                prevElementPopup: id}
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
       handleRefreshSlate()
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

const handleRefreshSlate = () => {
    localStorage.removeItem('newElement');
    config.slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN
    config.slateEntityURN = config.tempSlateEntityURN ? config.tempSlateEntityURN : config.slateEntityURN
    config.tempSlateManifestURN = null
    config.tempSlateEntityURN = null
    config.isPopupSlate = false
}