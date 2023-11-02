import config from "../../config/config"
import axios from 'axios';
import FetchAllDataMapper from '../TcmSnapshots/FetchAllDataMapper/FetchAllDataMapper';
import { LAUNCH_TCM_CANVAS_POPUP, SPINNER } from '../../constants/Action_Constants'
import {handleSlateRefresh} from '../CanvasWrapper/SlateRefresh_Actions'


const getLatestPendingOrAccepted = (snapshot) => {
    if(snapshot.latestAcceptedTransaction && snapshot.latestPendingTransaction) {
        if(snapshot.latestAcceptedTransaction.changeTime > snapshot.latestPendingTransaction.changeTime) {
            return snapshot.latestAcceptedTransaction;
        }
        else {
            return snapshot.latestPendingTransaction;
        }
    }
    else {
        return snapshot.latestPendingTransaction || snapshot.latestAcceptedTransaction;
    }
}

const openTCMPopup = (elemData, index, id, dispatch) => {
    let eURN = id;
    if(elemData.elemURN.includes("+")) {
        // check if element data has plus
        // if yes send elementurn plus as elementurn
        // else send element id;
        eURN = elemData.elemURN;
    }
    elemData.elemURN = id;
    const elemIndex = [{ index, urn: id }]
    const tcmData = FetchAllDataMapper.processResponse([elemData], id, elemIndex);
    const elemEditorName = elemData.latestPendingTransaction?.elementEditor ? elemData.latestPendingTransaction.elementEditor : elemData.latestAcceptedTransaction?.elementEditor
    const tcmObject = {
         isTCMCanvasPopup: true,
         tcmElemData: tcmData.result[0],
         elemData: eURN,
         elementEditor: elemEditorName,
         tcmStatus: elemData.latestAcceptedTransaction ? true : false,
         spinnerStatus: false,
         prevElementPopup: id
        }
        dispatch({
            type: LAUNCH_TCM_CANVAS_POPUP,
            payload: {...tcmObject, theme:''},
            })
}

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
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then((res) => {
        const data = res.data
        const id = element.id
        const elementURNs = data.filter(item => {
            if(item.elemURN === id) {
                return true;
            }
            else if (item.elemURN.includes('+')){
                const splitArray = item.elemURN.split("+");
                const lastId = splitArray[splitArray.length-1];
                return (lastId === id)
            }
            else {
                return false;
            }
        })

        if(elementURNs.length === 1) {
            // normal case i.e. click on paragraph's tcm icon
            const elemData = elementURNs[0];
            openTCMPopup(elemData, index, id, dispatch);
        }
        else if(elementURNs.length > 1) {
            // cut copy case
            // in case of cut copy get latest snapshot.
             const latestElement = elementURNs.sort((a, b) => {
                if(getLatestPendingOrAccepted(a).changeTime > getLatestPendingOrAccepted(b).changeTime){
                return -1
            }
            else return 1;
            });
            const elemData = latestElement[0];
            openTCMPopup(elemData, index, id, dispatch);
        }

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
            'myCloudProxySession': config.myCloudProxySession
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
