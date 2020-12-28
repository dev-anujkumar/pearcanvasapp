// Constants
import axios from 'axios';
import config from '../../config/config';
import { AUTHORING_ELEMENT_CREATED, GET_TCM_RESOURCES, FETCH_COMMENTS } from '../../constants/Action_Constants';
import { HideLoader, ShowLoader, projectPendingTcStatus } from '../../constants/IFrameMessageTypes.js';
import * as slateWrapperConstants from "./SlateWrapperConstants"
//Helper methods
import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import { SET_SELECTION } from './../../constants/Action_Constants.js';
import { deleteFromStore, prepareTCMSnapshotsForDelete } from './../ElementContainer/ElementContainerDelete_helpers.js';
import tinymce from 'tinymce'

export const onPasteSuccess = async (params) => {
    const {
        responseData,
        index,
        cutIndex,
        dispatch,
        getState
    } = params    

    const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
    replaceWirisClassAndAttr(activeEditorId)
    // Store Update on Paste Element
    let operationType = '';
    let elmSelection = {};
    if (Object.keys(getState().selectionReducer.selection).length > 0 && 'operationType' in getState().selectionReducer.selection) {
        elmSelection = getState().selectionReducer.selection;
        operationType = elmSelection.operationType;
    }

    /** Create Snapshot for cut action on different slate */
    let cutSnap = true;
    if(operationType === 'cut' && 'sourceSlateEntityUrn' in elmSelection && elmSelection.sourceSlateEntityUrn === config.slateEntityURN) {
        cutSnap = false;
    }

    // let elmExist = await checkElementExistence(getState().selectionReducer.selection.sourceSlateEntityUrn, getState().selectionReducer.selection.deleteElm.id);
    if ('deleteElm' in getState().selectionReducer.selection && operationType === 'cut') {
        let deleteElm = getState().selectionReducer.selection.deleteElm;
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let cutcopyParentData =  null;
        if('cutCopyParentUrn' in deleteElm && 'slateLevelData' in deleteElm.cutCopyParentUrn) {
            cutcopyParentData = deleteElm.cutCopyParentUrn.slateLevelData;
        }

        if(getState().selectionReducer.selection.sourceSlateEntityUrn !== config.slateEntityURN) {
            const tcmDeleteArgs = {
                deleteParentData: cutcopyParentData ? JSON.parse(JSON.stringify(cutcopyParentData)) : newParentData,
                deleteElemData: { [deleteElm.id]: deleteElm.id },
                type: deleteElm.type,
                parentUrn: deleteElm.parentUrn,
                asideData: deleteElm.asideData,
                contentUrn: deleteElm.contentUrn,
                index: deleteElm.index,
                poetryData: deleteElm.poetryData,
                cutCopyParentUrn: deleteElm.cutCopyParentUrn
            }
            await prepareTCMSnapshotsForDelete(tcmDeleteArgs);
        }

        let deleteParams = {
            dispatch,
            elmId: deleteElm.id,
            parentUrn: deleteElm.parentUrn,
            asideData: deleteElm.asideData,
            index: deleteElm.index,
            poetryData: deleteElm.poetryData,
            newParentData 
        }
        deleteFromStore(deleteParams)
    }

    let feedback = null;
    if (operationType === 'copy') {
        let selection = Object.assign({}, getState().selectionReducer.selection);
        selection.activeAnimation = false;
        selection.deleteElm = {};
        dispatch({ type: SET_SELECTION, payload: selection });
    } else if (operationType === 'cut') {
        if('sourceSlateEntityUrn' in elmSelection && elmSelection.sourceSlateEntityUrn !== config.slateEntityURN) {
            if('elmComment' in elmSelection && (elmSelection.elmComment).length > 0) {
                const allComments = getState().commentsPanelReducer.allComments || [];
                allComments.push(...elmSelection.elmComment);

                dispatch({
                    type: FETCH_COMMENTS,
                    payload: { comments: allComments, title: getState().commentsPanelReducer.slateTitle || '' }
                })
            }

            if('elmFeedback' in elmSelection && (elmSelection.elmFeedback).length > 0) {
                const tcmFeedback = getState().tcmReducer.tcmData || [];
                tcmFeedback.push(...elmSelection.elmFeedback);
                feedback = (elmSelection.elmFeedback)[0].feedback || null;

                dispatch({
                    type: GET_TCM_RESOURCES,
                    payload: {
                        data: tcmFeedback
                    }
                })
            }
        }
        dispatch({ type: SET_SELECTION, payload: {} });
    }

    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = newParentData[config.slateManifestURN];

    /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
    if (slateWrapperConstants.elementType.indexOf(slateWrapperConstants.checkTCM(responseData)) !== -1 && cutSnap) {
        const snapArgs = {
            newParentData,
            currentSlateData,
            asideData: null,
            poetryData: null,
            parentUrn: null,
            type: slateWrapperConstants.checkTCM(responseData),
            responseData,
            dispatch,
            index,
            elmFeedback: feedback
        }

        await handleTCMSnapshotsForCreation(snapArgs, operationType)
    }
    /**---------------------------------------------------------------------------------------------------*/

    if (currentSlateData.status === 'approved') {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        return false;
    }

    newParentData[config.slateManifestURN].contents.bodymatter.splice(cutIndex, 0, responseData);

    if (config.tcmStatus) {
        if (slateWrapperConstants.elementType.indexOf(slateWrapperConstants.checkTCM(responseData)) !== -1 && cutSnap) {
            await prepareDataForTcmCreate(slateWrapperConstants.checkTCM(responseData), responseData, getState, dispatch);
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

export const handleTCMSnapshotsForCreation = async (params, operationType = null) => {
    const {
        newParentData,
        currentSlateData,
        asideData,
        poetryData,
        parentUrn,
        type,
        responseData,
        dispatch,
        index,
        elmFeedback
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
        await tcmSnapshotsForCreate(slateData, type, containerElement, dispatch, index, operationType, elmFeedback);
    }
    else {
        tcmSnapshotsForCreate(slateData, type, containerElement, dispatch, index, operationType, elmFeedback);
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
        case slateWrapperConstants.FIGURE_MML:
        case slateWrapperConstants.BLOCKCODE:
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