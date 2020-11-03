// Constants
import config from '../../config/config';
import { AUTHORING_ELEMENT_CREATED, GET_TCM_RESOURCES } from '../../constants/Action_Constants';
import { HideLoader, ShowLoader, projectPendingTcStatus } from '../../constants/IFrameMessageTypes.js';
import * as slateWrapperConstants from "./SlateWrapperConstants"
//Helper methods
import { sendDataToIframe } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';

import { SET_SELECTION } from './../../constants/Action_Constants.js';

export const onPasteSuccess = async (params) => {
    const {
        responseData,
        dispatch,
        getState
    } = params

    // Store Update on Paste Element
    let operationType = '';
    if(Object.keys(getState().selectionReducer.selection).length > 0 && 'operationType' in getState().selectionReducer.selection) {
        operationType = getState().selectionReducer.selection.operationType;
    }

    if(operationType === 'copy') {
        let selection = Object.assign({}, getState().selectionReducer.selection);
        selection.activeAnimation = false;
        dispatch({ type: SET_SELECTION, payload: selection });
    } else if(operationType === 'cut') {
        dispatch({ type: SET_SELECTION, payload: {} });
    }

    // sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    // const parentData = getState().appStore.slateLevelData;
    // const newParentData = JSON.parse(JSON.stringify(parentData));
    // const currentSlateData = newParentData[config.slateManifestURN];

    // /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
    // if (slateWrapperConstants.elementType.indexOf(type) !== -1) {
    //     const snapArgs = {
    //         newParentData,
    //         currentSlateData,
    //         asideData: null,
    //         poetryData: null,
    //         parentUrn: null,
    //         type,
    //         responseData,
    //         dispatch
    //     }

    //     handleTCMSnapshotsForCreation(snapArgs)
    // }
    // /**---------------------------------------------------------------------------------------------------*/

    // if (currentSlateData.status === 'approved') {
    //     if(currentSlateData.type==="popup"){
    //         sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
    //         sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
    //         dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
    //     } else {
    //         sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
    //         sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
    //         return false;
    //     }
    // }
    // else {
    //     newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, responseData);
    // }

    // if (config.tcmStatus) {
    //     if (slateWrapperConstants.elementType.indexOf(type) !== -1) {
    //         prepareDataForTcmCreate(type, responseData, getState, dispatch);
    //     }
    // }
    
    // dispatch({
    //     type: AUTHORING_ELEMENT_CREATED,
    //     payload: {
    //         slateLevelData: newParentData
    //     }
    // })

    // if (cb) {
    //     cb();
    // }
}

export const handleTCMSnapshotsForCreation = async (params) => {
    const {
        newParentData,
        currentSlateData,
        asideData,
        poetryData,
        parentUrn,
        type,
        responseData,
        dispatch
    } = params

    const containerElement = {
        asideData: asideData,
        parentUrn: parentUrn,
        poetryData: poetryData
    };
    const slateData = {
        currentParentData: newParentData,
        bodymatter: currentSlateData.contents.bodymatter,
        response: responseData
    };
    if (currentSlateData.status === 'approved') {
        await tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
    }
    else {
        tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
    }
}

export function prepareDataForTcmCreate(type, createdElementData, getState, dispatch) {
    let elmUrn = [];
    const tcmData = getState().tcmReducer.tcmSnapshot;

    switch(type){
        case slateWrapperConstants.WORKED_EXAMPLE:
        case slateWrapperConstants.CONTAINER:
            createdElementData.elementdata.bodymatter.map((item) => {
                if (item.type == "manifest") {
                    item.contents.bodymatter.map((ele) => {
                        elmUrn.push(ele.id)
                    })
                }
                else {
                    elmUrn.push(item.id)
                }
    
            })
            break;
        case slateWrapperConstants.SECTION_BREAK:
        case slateWrapperConstants.CITATION:
        case slateWrapperConstants.POETRY:
            createdElementData.contents.bodymatter.map((item) => {
                elmUrn.push(item.id)
            })
            break;
        case slateWrapperConstants.TEXT:
        case slateWrapperConstants.ELEMENT_CITATION:
        case slateWrapperConstants.STANZA:
        case slateWrapperConstants.IMAGE:
        case slateWrapperConstants.VIDEO:
        case slateWrapperConstants.AUDIO:
            elmUrn.push(createdElementData.id)
            break;
        case slateWrapperConstants.MULTI_COLUMN:
            /** First Column */
            createdElementData.groupeddata.bodymatter[0].groupdata.bodymatter.map(item => {
                elmUrn.push(item.id)
            })
            /** Second Column */
            createdElementData.groupeddata.bodymatter[1].groupdata.bodymatter.map(item => {
                elmUrn.push(item.id)
            })
            break;
        case slateWrapperConstants.POP_UP:
            elmUrn.push(createdElementData.popupdata.postertextobject[0].id)
            elmUrn.push(createdElementData.popupdata.bodymatter[0].id)
            break;
    }

    elmUrn.map((item) => {
        return tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": item,
            "feedback": null
        })
    })

    if(tcmData.length > 0 ){
        sendDataToIframe({ 'type': projectPendingTcStatus, 'message': 'true' })
    }

    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}