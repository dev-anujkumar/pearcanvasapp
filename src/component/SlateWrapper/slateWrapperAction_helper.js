// Constants
import axios from 'axios';
import config from '../../config/config';
import { AUTHORING_ELEMENT_CREATED, GET_TCM_RESOURCES } from '../../constants/Action_Constants';
import { HideLoader, ShowLoader, projectPendingTcStatus } from '../../constants/IFrameMessageTypes.js';
import * as slateWrapperConstants from "./SlateWrapperConstants"
//Helper methods
import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';

import { SET_SELECTION } from './../../constants/Action_Constants.js';
import { deleteElement } from './../ElementContainer/ElementContainer_Actions.js';
import tinymce from 'tinymce'
export const onPasteSuccess = async (params) => {
    const {
        responseData,
        index,
        dispatch,
        getState
    } = params    

    const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
    replaceWirisClassAndAttr(activeEditorId)
    // Store Update on Paste Element
    let operationType = '';
    if (Object.keys(getState().selectionReducer.selection).length > 0 && 'operationType' in getState().selectionReducer.selection) {
        operationType = getState().selectionReducer.selection.operationType;
    }

    let cutIndex = index;
    let elmExist = await checkElementExistence(getState().selectionReducer.selection.sourceSlateEntityUrn, getState().selectionReducer.selection.deleteElm.id);
    if ('deleteElm' in getState().selectionReducer.selection && operationType === 'cut' && elmExist) {
        let deleteElm = getState().selectionReducer.selection.deleteElm;
        if(getState().selectionReducer.selection.sourceSlateEntityUrn === config.slateEntityURN &&
            cutIndex > getState().selectionReducer.selection.sourceElementIndex) {
            cutIndex -= 1;
        }
        await dispatch(deleteElement(deleteElm.id, deleteElm.type, deleteElm.parentUrn, deleteElm.asideData, deleteElm.contentUrn, deleteElm.index, deleteElm.poetryData, getState().selectionReducer.selection.element, deleteElm.cutCopyParentUrn));
    }

    if (operationType === 'copy') {
        let selection = Object.assign({}, getState().selectionReducer.selection);
        selection.activeAnimation = false;
        selection.deleteElm = {};
        dispatch({ type: SET_SELECTION, payload: selection });
    } else if (operationType === 'cut') {
        dispatch({ type: SET_SELECTION, payload: {} });
    }

    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = newParentData[config.slateManifestURN];

    /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
    if (slateWrapperConstants.elementType.indexOf("TEXT") !== -1) {
        const snapArgs = {
            newParentData,
            currentSlateData,
            asideData: null,
            poetryData: null,
            parentUrn: null,
            type: "TEXT",
            responseData,
            dispatch,
            index
        }

        await handleTCMSnapshotsForCreation(snapArgs)
    }
    /**---------------------------------------------------------------------------------------------------*/

    if (currentSlateData.status === 'approved' && operationType === 'copy') {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        return false;
    }

    newParentData[config.slateManifestURN].contents.bodymatter.splice(cutIndex, 0, responseData);

    if (config.tcmStatus) {
        if (slateWrapperConstants.elementType.indexOf("TEXT") !== -1) {
            await prepareDataForTcmCreate("TEXT", responseData, getState, dispatch);
        }
    }

    dispatch({
        type: AUTHORING_ELEMENT_CREATED,
        payload: {
            slateLevelData: newParentData
        }
    })
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
}

export const checkElementExistence = async (slateEntityUrn = '', elementEntity = '') => {
    let exist = false;
    let bodymatter = [];
    if (slateEntityUrn && elementEntity) {
        const axiosObject = axios.create({
            headers: {
                'Content-Type': 'application/json',
                'PearsonSSOSession': config.ssoToken
            }
        });

        await axiosObject.get(`${config.REACT_APP_API_URL}v1/slate/${config.projectUrn}/contentHierarchy/${slateEntityUrn}/elementids`)
            .then(res => {
                if (res && res.status == 200) {
                    bodymatter = (Object.values(res.data)[0]).contents.bodymatter || [];
                }
            })
            .catch(error => {
                console.log('Element IDs API error:::', error);
            });

        if (bodymatter.length > 0) {
            let matches = ((JSON.stringify(bodymatter)).match(new RegExp(`(id(\"|\'|):(\"|\'|)${elementEntity})`, 'g'))) || [];
            if (matches.length > 0) {
                exist = true;
            }
        }
    }

    return exist;
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
        dispatch,
        index
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
        await tcmSnapshotsForCreate(slateData, type, containerElement, dispatch, index);
    }
    else {
        tcmSnapshotsForCreate(slateData, type, containerElement, dispatch, index);
    }
}

export function prepareDataForTcmCreate(type, createdElementData, getState, dispatch) {
    let elmUrn = [];
    const tcmData = getState().tcmReducer.tcmSnapshot;

    switch (type) {
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

    if (tcmData.length > 0) {
        sendDataToIframe({ 'type': projectPendingTcStatus, 'message': 'true' })
    }

    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}