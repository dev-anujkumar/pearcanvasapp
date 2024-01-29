/**
 * Element Deletion Actions
 */

import axios from 'axios';
import config from '../../config/config';
import { hideBlocker } from '../../js/toggleLoader';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { deleteBlockListElement } from '../ElementContainer/ElementContainerDelete_helpers';
import { AUTHORING_ELEMENT_UPDATE, ERROR_POPUP } from "./../../constants/Action_Constants";
import tinymce from 'tinymce';
import { handleAutoNumberingOnDelete } from '../FigureHeader/AutoNumber_DeleteAndSwap_helpers';
import { getAutoNumberedElementsOnSlate } from '../FigureHeader/slateLevelMediaMapper';
import ElementConstants from '../ElementContainer/ElementConstants';

export const deleteElementAction = (elementId, type, eleIndex, activeElement, containerElements, cb) => (dispatch, getState) => {
    const elementIndex = eleIndex?.toString()?.split('-')
    const { cutCopyParentUrn, parentUrn, parentElement, asideData, showHideObj, isSectionBreak } = containerElements
    const _requestData = prepareDeleteRequestData(type, { elementId, elementIndex, parentElement, parentUrn, activeElement, cutCopyParentUrn, isSectionBreak })
    // sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/deleteElement`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                
            }
        }
    ).then(async (response) => {

        let newIndex = typeof eleIndex == 'number' ? eleIndex : eleIndex.split("-")
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
            type: isSectionBreak?.type ? isSectionBreak.type: type,
            parentUrn,
            asideData,
            contentUrn: activeElement.contentUrn,
            newIndex,
            element: activeElement,
            isSectionBreak,
            cutCopyParentUrn
        }
        // This check will remove when TB supports tcm
        let isTbElement = asideData?.subtype === ElementConstants.TAB || asideData?.parent?.subtype === ElementConstants.TAB ||
                         asideData?.grandParent?.asideData?.subtype === ElementConstants.TAB || asideData?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB;
        if (!isTbElement) {
            const { prepareTCMSnapshotsForDelete } = (await import("./ElementContainerDelete_helpers.js"))
            prepareTCMSnapshotsForDelete(deleteData);
        }

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
            isSectionBreak,
            asideData,
            elementId,
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

        //--------------------- Handle Auto-numbering -----------------------------------
        const slateData = getState()?.appStore?.slateLevelData;
        const newslateData = JSON.parse(JSON.stringify(slateData));
        const slateLevelData = newslateData[config.slateManifestURN];
        getAutoNumberedElementsOnSlate(slateLevelData, {dispatch});

        const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled;
        const autoNumberParams = {
            element: activeElement,
            type,
            getState,
            dispatch,
            contentUrn: activeElement?.contentUrn,
            isAutoNumberingEnabled,
            asideData
        }
        handleAutoNumberingOnDelete(autoNumberParams);
    }).catch(error => {
        showError(error, dispatch, "error while creating element")
        if (cb) {
            cb(false);
        }
    })
}


export const updateStorePostDelete = (deleteParams) => {
    const {
        index,
        newIndex,
        newParentData,
        dispatch,
        isSectionBreak,
        asideData,
        elementId
    } = deleteParams
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter;
    let elementToUpdate;

    if (asideData?.grandParent?.asideData?.subtype === ElementConstants.TAB || asideData?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB) {
        switch (newIndex.length) {
            case 6: // TB:Tab:c1:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]]?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[0]?.groupeddata?.bodymatter[newIndex[2]]
                ?.groupdata?.bodymatter[newIndex[3]];
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate?.interactivedata[showHideType[newIndex[4]]].splice(index, 1)
                }
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[newIndex[2]].groupdata
                .bodymatter[newIndex[3]] = elementToUpdate;
                break;
            case 7: // TB:Tab:c1:AS/WE:HEAD:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]]?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[0]?.groupeddata
                ?.bodymatter[newIndex[2]]?.groupdata?.bodymatter[newIndex[3]].elementdata.bodymatter[newIndex[4]];
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate.interactivedata[showHideType[newIndex[5]]].splice(index, 1)
                }
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[newIndex[2]]
                .groupdata.bodymatter[newIndex[3]].elementdata.bodymatter[newIndex[4]] = elementToUpdate;
                break;
            case 8: // TB:Tab:c1:WE:BODY:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]]?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[0]?.groupeddata
                ?.bodymatter[newIndex[2]]?.groupdata?.bodymatter[newIndex[3]].elementdata.bodymatter[newIndex[4]].contents.bodymatter[newIndex[5]];
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate.interactivedata[showHideType[newIndex[6]]].splice(index, 1)
                }
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[newIndex[2]]
                .groupdata.bodymatter[newIndex[3]].elementdata.bodymatter[newIndex[4]].contents.bodymatter[newIndex[5]] = elementToUpdate;
                break;
            case 1:/** Element on slate level */
            default:
                newBodymatter.splice(index, 1)
                break;
        }
    } else if (asideData?.parent?.type !== 'showhide' && asideData?.type !== "manifestlist") {
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
                    if (isSectionBreak?.id) {
                        const sectionBreakParent = newBodymatter[newIndex[0]]?.interactivedata[showHideType[newIndex[1]]][newIndex[2]]
                        const updatedWorkedEx = delSBInsideWE(isSectionBreak, sectionBreakParent)
                        newBodymatter[newIndex[0]].interactivedata[showHideType[newIndex[1]]][newIndex[2]] = updatedWorkedEx
                    } else {
                        newBodymatter[newIndex[0]]?.interactivedata[showHideType[newIndex[1]]].splice(index, 1)
                    }
                }
                break;
            case 4:// we:head:sh:show:p | as:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]].elementdata.bodymatter[newIndex[1]]
                if (elementToUpdate?.type == 'showhide') {
                    newBodymatter[newIndex[0]]?.elementdata?.bodymatter[newIndex[1]]?.interactivedata[showHideType[newIndex[2]]].splice(index, 1)
                }
                break;
            case 5: // we:body:sh:show:p | 2c:c1:sh:show:p
                let inWorkedExample = newBodymatter[newIndex[0]]?.elementdata?.bodymatter[newIndex[1]]?.contents?.bodymatter[newIndex[2]]
                let inMultiColumn = newBodymatter[newIndex[0]]?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[newIndex[2]]
                elementToUpdate = inMultiColumn || inWorkedExample
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate?.interactivedata[showHideType[newIndex[3]]].splice(index, 1)
                }
                break;
            case 6: // 2c:c1:we:head:sh:show:p | 2c:c1:as:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]]?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[newIndex[2]]?.elementdata?.bodymatter[newIndex[3]];
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate?.interactivedata[showHideType[newIndex[4]]].splice(index, 1)
                }
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata.bodymatter[newIndex[3]] = elementToUpdate;
                break;
            case 7: // 2c:c1:we:body:sh:show:p
                elementToUpdate = newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata
                .bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]];
                if (elementToUpdate?.type == 'showhide') {
                    elementToUpdate.interactivedata[showHideType[newIndex[5]]].splice(index, 1)
                }
                newBodymatter[newIndex[0]].groupeddata.bodymatter[newIndex[1]].groupdata.bodymatter[newIndex[2]].elementdata
                .bodymatter[newIndex[3]].contents.bodymatter[newIndex[4]] = elementToUpdate;
                break;

            case 1:/** Element on slate level */
            default:
                newBodymatter.splice(index, 1)
                break;
        }
    } else if (asideData?.parent?.type === 'showhide' && asideData?.type === "manifestlist") {
        let section = asideData?.parent?.showHideType;
        let element = newBodymatter[newIndex[0]]
        if (section && newIndex.length >= 3) {
            let blElemInSh = element.interactivedata[section][newIndex[2]];
            deleteBlockListElement(elementId, blElemInSh);
        }
    }

    // return newBodymatter
    newParentData[config.slateManifestURN].contents.bodymatter = newBodymatter
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newParentData
        }
    })
}


export const showError = (error, dispatch, errorMessage) => {
    dispatch({ type: ERROR_POPUP, payload: { show: true } })
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    hideBlocker()
    console.error(errorMessage, error)
}

export const prepareDeleteRequestData = (elementType, payloadParams) => {
    const {
        elementId,
        parentUrn,
        elementIndex,
        activeElement,
        cutCopyParentUrn,
        parentElement,
        isSectionBreak
    } = payloadParams
    const containerElements = ["element-aside", "element-workedexample", "showhide", "popup", "citations", "poetry", "groupedcontent", "manifestlist"];
    let requestPayload = {
        "index": elementIndex[elementIndex.length - 1]?.toString() || "0",
        "projectUrn": config.projectUrn
    }
    if (containerElements.indexOf(elementType) > -1) {
        requestPayload.entityUrn = isSectionBreak?.type === 'manifest' ? isSectionBreak.contentUrn : activeElement.contentUrn
        requestPayload.elementParentEntityUrn = cutCopyParentUrn? cutCopyParentUrn.contentUrn: parentUrn ? parentUrn.contentUrn : config.slateEntityURN
    } else {
        requestPayload.workUrn = elementId;
        const parentEntity = parentElement?.contentUrn
        requestPayload.entityUrn = parentEntity ?? config.slateEntityURN
        requestPayload.elementParentEntityUrn = parentEntity ?? config.slateEntityURN
    }
    if (parentElement?.type === 'showhide') {
        requestPayload.sectionType = showHideType[elementIndex[elementIndex.length - 2].toString()]
    }
    return requestPayload
}

const showHideType = {
    "0": "show",
    "1": "postertextobject",
    "2": "hide"
}

const delSBInsideWE = (sectionBreakElement, weData) => {
    /* Delete SB inside SH:WE */
    if (weData?.id) {
        weData?.elementdata?.bodymatter?.forEach((item_L1, index) => {
            if (item_L1.id === sectionBreakElement?.id) {
                weData.elementdata.bodymatter.splice(index, 1);
            }
        })
    }
    return weData
}
