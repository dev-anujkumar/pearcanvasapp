/**
 * Element Deletion Actions
 */

import axios from 'axios';
import config from '../../config/config';
import { hideBlocker } from '../../js/toggleLoader';
import { ShowLoader, HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { AUTHORING_ELEMENT_UPDATE, ERROR_POPUP } from "./../../constants/Action_Constants";
import tinymce from 'tinymce';

export const deleteElementAction = (elementId, type, eleIndex, activeElement, containerElements, cb) => (dispatch, getState) => {
    const elementIndex = eleIndex.toString().split('-')
    const { showHideObj } = getState().appStore
    const { cutCopyParentUrn, parentUrn, parentElement, asideData } = containerElements
    // const parentElementUrn = getState().appStore.parentUrn
    if(type === 'popup'){
        dispatch(fetchPOPupSlateData(elmId, contentUrn, 0 , element, index)) 
    }
    const _requestData = prepareDeleteRequestData(type, { elementId, elementIndex, parentElement, parentUrn, activeElement, cutCopyParentUrn })
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        }
    ).then(async (response) => {
        console.log('delete success')
        let newIndex = eleIndex.split("-")
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        hideBlocker()
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = newParentData[config.slateManifestURN];
        const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
        replaceWirisClassAndAttr(activeEditorId)

        /** ----------------------- TCM Snapshot Data handling -------------------------*/

        const deleteData = {
            deleteElemData: response.data,
            deleteParentData: newParentData,
            index: eleIndex,
            showHideObj,
            type,
            parentUrn,
            asideData,
            contentUrn: activeElement.contentUrn,
            sectionType: showHideType[elementIndex[elementIndex.length - 2].toString()],
            newIndex,
            element: activeElement,
            // poetryData,
            cutCopyParentUrn
        }
        const { prepareTCMSnapshotsForDelete } = (await import("./ElementContainerDelete_helpers.js"))
        prepareTCMSnapshotsForDelete(deleteData);

        /** --------- When slate is Approved: Refresh TOC ------------------------------*/
        const { onSlateApproved } = (await import("./ElementContainerDelete_helpers.js"))
        if (currentSlateData.status === 'approved') {
            return onSlateApproved(currentSlateData, dispatch, fetchSlateData)
        }

        /** --------- When slate is Wip: Update Store ---------------------------------*/
        const deleteParams = {
            newIndex,
            index: elementIndex[elementIndex.length - 1].toString(),
            newParentData,
            dispatch
        }
        updateStorePostDelete(deleteParams);

        if (cb) {
            cb(false);
        }

        /** -------------------------- TCM Icon handling -----------------------------*/
        if (config.tcmStatus) {
            const { prepareTCMforDelete } = (await import("./ElementContainerDelete_helpers.js"))
            prepareTCMforDelete(elementId, dispatch, getState);
        }
    }).catch(error => {
        showError(error, dispatch, "error while creating element")
        if (cb) {
            cb(false);
        }
    })
}


const updateStorePostDelete = (deleteParams) => {
    const {
        index,
        newIndex,
        newParentData,
        dispatch
    } = deleteParams
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    let elementToUpdate;

    switch (newIndex.length) {
        case 2:
            elementToUpdate = newBodymatter[newIndex[0]]
            if (elementToUpdate?.type == 'element-aside') {
                elementToUpdate.elementdata.bodymatter.splice(index, 1);
            }
            newBodymatter[newIndex[0]] = elementToUpdate;
            break;
        case 3: // sh:show:p
            elementToUpdate = newBodymatter[newIndex[0]]
            if (elementToUpdate?.type == 'showhide') {
                newBodymatter[newIndex[0]].interactivedata[showHideType[newIndex[1]]].splice(index, 1)
            }
            break;
        case 4:// we:head:sh:show:p | as:sh:show:p
            elementToUpdate = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
            if (elementToUpdate?.type == 'showhide') {
                newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].interactivedata[showHideType[newIndex[2]]].splice(index, 1)
            }
            break;
        case 5: // we:body:sh:show:p
            elementToUpdate = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]]
            if (elementToUpdate?.type == 'showhide') {
                newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]].contents.bodymatter[newIndex[2]].interactivedata[showHideType[newIndex[3]]].splice(index, 1)
            }
            break;
        case 6: // 2c:c1:we:head:sh:show:p | 2c:c1:as:sh:show:p
            elementToUpdate = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]];
            if (elementToUpdate?.type == 'showhide') {
                elementToUpdate.interactivedata[showHideType[newIndex[5]]].splice(index, 1)
            }
            newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]] = elementToUpdate;
            break;
        case 7: // 2c:c1:we:body:sh:show:p
            elementToUpdate = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
            if (elementToUpdate?.type == 'showhide') {
                elementToUpdate.interactivedata[showHideType[newIndex[6]]].splice(index, 1)
            }
            newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]] = elementToUpdate;
            break;

        case 1:/** Element on slate level */
        default:
            newBodymatter.splice(index, 1)
            break;
    }
    console.log('newBodymatter', newBodymatter)
    // return newBodymatter
    newParentData[config.slateManifestURN].contents.bodymatter = newBodymatter
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newParentData
        }
    })
}


const showError = (error, dispatch, errorMessage) => {
    dispatch({ type: ERROR_POPUP, payload: { show: true } })
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    hideBlocker()
    console.error(errorMessage, error)
}

const prepareDeleteRequestData = (elementType, payloadParams) => {
    const {
        elementId,
        parentUrn,
        elementIndex,
        activeElement,
        cutCopyParentUrn,
        parentElement
    } = payloadParams
    const containerElements = ["element-aside", "element-workedexample", "showhide", "popup", "citations", "poetry", "groupedcontent"];
    let requestPayload = {
        "index": elementIndex[elementIndex.length - 1]?.toString() || "0",
        "projectUrn": config.projectUrn        
    }
    if (containerElements.indexOf(elementType) > -1) {
        requestPayload.entityUrn = activeElement.contentUrn
        requestPayload.elementParentEntityUrn = cutCopyParentUrn? cutCopyParentUrn.contentUrn: parentUrn ? parentUrn.contentUrn : config.slateEntityURN
    } else {
        requestPayload.workUrn = elementId;
        const parentEntity = parentElement?.contentUrn
        requestPayload.entityUrn = parentEntity ?? config.slateEntityURN
        requestPayload.elementParentEntityUrn = parentEntity ?? config.slateEntityURN
    }
    if (elementType === 'showhide' || parentElement.type === 'showhide') {
        requestPayload.sectionType = showHideType[elementIndex[elementIndex.length - 2].toString()]
    }
    return requestPayload
}

const showHideType = {
    "0": "show",
    "1": "postertextobject",
    "2": "hide"
}