import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import {
    prepareTcmSnapshots,
} from '../TcmSnapshots/TcmSnapshots_Utility.js';
//Constants
import {
    AUTHORING_ELEMENT_CREATED,
    GET_TCM_RESOURCES,
} from "./../../constants/Action_Constants";
import ElementConstants, { elementTypeTCM, containerType, allowedFigureTypesForTCM } from "./ElementConstants";
import config from '../../config/config';
import store from '../../appstore/store.js';
import { ShowLoader, HideLoader, TocRefreshVersioning, SendMessageForVersioning } from '../../constants/IFrameMessageTypes.js';
import tinymce from 'tinymce'
import TcmConstants from '../TcmSnapshots/TcmConstants.js';
import { getShowHideElement, indexOfSectionType } from '../ShowHide/ShowHide_Helper.js';
import { isEmpty } from '../TcmSnapshots/ElementSnapshot_Utility.js';
import { checkContainerElementVersion, fetchElementWipData, fetchManifestStatus, prepareSnapshots_ShowHide } from '../TcmSnapshots/TcmSnapshotsCreate_Update.js';
const { ELEMENT_ASIDE, MULTI_COLUMN, SHOWHIDE } = TcmConstants;
import { handleAutoNumberingOnDelete } from '../FigureHeader/AutoNumber_DeleteAndSwap_helpers';
import { getSlateLevelData, updateChapterPopupData, popupCutCopyParentData } from '../FigureHeader/AutoNumberActions';
export const onDeleteSuccess = (params) => {
    const {
        deleteElemData,
        dispatch,
        getState,
        elmId,
        type,
        parentUrn,
        asideData,
        contentUrn,
        index,
        poetryData,
        cutCopyParentUrn,
        fetchSlateData,
        showHideObj,
        element
    } = params

    const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
    replaceWirisClassAndAttr(activeEditorId)
    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let cutcopyParentData=  cutCopyParentUrn && cutCopyParentUrn.slateLevelData ?  cutCopyParentUrn.slateLevelData : null


    /** [PCAT-8289] -- TCM Snapshot Data handling --*/
    /** This check is to prevent the screenshots for TB element. It will be removed when TB supports TCM --*/
    let isTbElement = asideData?.subtype === ElementConstants.TAB || asideData?.parent?.subtype === ElementConstants.TAB || asideData?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB;
    if (!isTbElement) {
        const tcmDeleteArgs = {
            deleteParentData: cutcopyParentData ? JSON.parse(JSON.stringify(cutCopyParentUrn.slateLevelData)) : newParentData,
            deleteElemData,
            type,
            parentUrn,
            asideData,
            contentUrn,
            index,
            poetryData,
            cutCopyParentUrn,
            showHideObj,
            element
        }
        prepareTCMSnapshotsForDelete(tcmDeleteArgs)
    }

    const currentSlateData = newParentData[config.slateManifestURN];
    if (currentSlateData.status === 'approved') {
        const isAutoNumberingEnabled = getState()?.autoNumberReducer?.isAutoNumberingEnabled;
        const autoNumberParams = {
            type,
            getState,
            dispatch,
            contentUrn,
            isAutoNumberingEnabled,
            asideData
        }
        return onSlateApproved(currentSlateData, dispatch, fetchSlateData, autoNumberParams);
    }
    const args = {
        dispatch,
        elmId,
        parentUrn,
        asideData,
        index,
        poetryData,
        newParentData,
        getState,
        type,
        contentUrn,
        operationType: 'delete'
    }
    deleteFromStore(args)

    /** Delete Tcm data on element delete*/
    if (config.tcmStatus) {
        prepareTCMforDelete(elmId, dispatch, getState);
    }
}

/** Delete Tcm data on element delete*/
export function prepareTCMforDelete(elmId, dispatch, getState) {
    let tcmData = getState().tcmReducer.tcmSnapshot;
    tcmData = tcmData && tcmData.filter(function (tcm) {
        return !tcm.elemURN.includes(elmId);
    });
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    });
    if(tcmData.length > 0){
        tcmData.some(function (elem) {
            if (elem.txCnt > 0) {
                sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
                return true;
            }
            else {
                sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
            }
        });
    }
    else{
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });
    }

}

export const deleteFromPopupInStore = (cutCopyParentData, popupContent) => {
    updateChapterPopupData(popupContent, cutCopyParentData?.versionUrn);
}

export const deleteFromStore = async (params) => {
    const {
        dispatch,
        elmId,
        parentUrn,
        asideData,
        index,
        poetryData,
        newParentData,
        getState,
        type,
        contentUrn,
        operationType
    } = params

    /* Get the slate bodymatter data */
    const cutCopyParentData = getState().autoNumberReducer?.popupCutCopyParentData;
    const popupParentSlateData = getState().autoNumberReducer?.popupParentSlateData;
    let bodymatter = [];
    const indexes = asideData?.index?.toString()?.split("-") || [];
    const elIndex = index?.toString()?.split('-') || [];
    /* To check if the element is cutted from popup slate */
    if ((cutCopyParentData?.isPopupSlate && operationType === 'cut') && popupParentSlateData?.isPopupSlate && (cutCopyParentData?.versionUrn === popupParentSlateData?.versionUrn)) {    // popup slate cut & paste on same slate
        const popupContent = await getSlateLevelData(cutCopyParentData?.versionUrn, cutCopyParentData?.contentUrn);
        deleteFromPopupInStore(cutCopyParentData, popupContent);
        bodymatter = newParentData[config.slateManifestURN]?.contents?.bodymatter;
        /* To check if the cutted element is pasted on popup slate */
    } else if (cutCopyParentData?.isPopupSlate && operationType === 'cut') {
        // Call api to get popup slate data
        const popupContent = await getSlateLevelData(cutCopyParentData?.versionUrn, cutCopyParentData?.contentUrn);
        deleteFromPopupInStore(cutCopyParentData, popupContent);
        return;
        /* To check if the cutted element is pasted on popup slate */
    } else if (popupParentSlateData?.isPopupSlate && operationType === 'cut') {
        bodymatter = newParentData[popupParentSlateData?.parentSlateId]?.contents?.bodymatter;
    } else {
        bodymatter = newParentData[config.slateManifestURN]?.contents?.bodymatter;
    }
    const iList = index?.toString()?.split("-") || [];
    /* update the store on /cut/paste of showhide elements */
    if(asideData?.type === SHOWHIDE && iList?.length >= 3) {
        /* Get the showhide Element */
        const sh_Object = getShowHideElement(bodymatter, iList?.length, iList);
        if(sh_Object?.type === SHOWHIDE) {
            const cCIndex = iList[iList?.length - 1];
            /* get the section type of showhide */
            const sectionType = indexOfSectionType(iList);
            /* delete the element inside showhide on cut from sh */
            sh_Object?.interactivedata[sectionType]?.splice(cCIndex, 1);
        }
        /* To update redux store while deleting Tab element from TB */
    } else if (parentUrn?.type === ElementConstants.MULTI_COLUMN && parentUrn?.subtype === ElementConstants.TAB && (asideData?.parentManifestUrn === newParentData[config.slateManifestURN]?.contents?.bodymatter[elIndex[0]]?.id)) {
        newParentData[config.slateManifestURN].contents.bodymatter[elIndex[0]].groupeddata.bodymatter.splice(elIndex[1], 1);
        /* To update redux store while deleting element from TB->Tab->Column */
    } else if (parentUrn?.elementType === "group" && asideData?.subtype === ElementConstants.TAB && (parentUrn?.tbId === newParentData[config.slateManifestURN]?.contents?.bodymatter[elIndex[0]]?.id)) {
        newParentData[config.slateManifestURN].contents.bodymatter[elIndex[0]].groupeddata.bodymatter[elIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[elIndex[2]].groupdata.bodymatter.splice(elIndex[3], 1);
    } else if (parentUrn && parentUrn.elementType == "group" && (parentUrn?.mcId === newParentData[config.slateManifestURN]?.contents?.bodymatter[elIndex[0]]?.id)) {
        newParentData[config.slateManifestURN].contents.bodymatter[elIndex[0]].groupeddata.bodymatter[elIndex[1]].groupdata.bodymatter.splice(elIndex[2], 1)
    } else {
        bodymatter.forEach((element, key) => {
            if (element.id === elmId) {
                bodymatter.splice(key, 1);
                /* To delete element from TB->Tab->AS/WE->element */
            } else if (asideData?.parent?.type === ElementConstants.MULTI_COLUMN && asideData?.parent?.subtype === ElementConstants.TAB && element.id === asideData?.parent?.id && asideData?.type !== ElementConstants.BLOCK_LIST) {
                element = element.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]];
                element?.groupdata?.bodymatter?.map(item => {
                    delInsideWE(item, asideData, parentUrn, elmId);
                })
            } else if (parentUrn && parentUrn.elementType == "element-aside" && asideData?.parent?.type !== 'showhide') {
                if (element.id === parentUrn.manifestUrn) {
                    element.elementdata.bodymatter.forEach((ele, indexInner) => {
                        if (ele.id === elmId) {
                            element.elementdata.bodymatter.splice(indexInner, 1);
                        }
                    })
                } else {
                    /* Delete inside 2C:WE/AS:ELEMETNS */
                    element?.groupeddata?.bodymatter?.map(item => {
                        item?.groupdata?.bodymatter?.map(i => {
                            delInsideWE(i, asideData, parentUrn, elmId);
                        })
                    })
                }
          /* Delete element inside S/H:AS/WE:ELEMENTS */
        } else if (asideData?.parent?.type === 'showhide' && asideData?.type === 'element-aside' && element.id === asideData?.parent?.id) {
            let section = asideData?.parent?.showHideType;
            delInsideWE(element.interactivedata[section][iList[2]], asideData, parentUrn, elmId);
        } else if (poetryData && poetryData.type == 'poetry') {
                if (element.id === poetryData.parentUrn) {
                    element.contents.bodymatter.forEach((ele, indexInner) => {
                        if (ele.id === elmId) {
                            element.contents.bodymatter.splice(indexInner, 1);
                        }
                    })
                } else if (element?.type == 'element-aside' && element.id === poetryData?.parent?.id) {  /* To update redux store while deleting new element inside WE/Aside->Block Poetry->Stanza */
                  element?.elementdata?.bodymatter.forEach((ele) => {
                        if (ele?.type == "poetry" && ele.id == poetryData?.parentUrn) {
                            ele.contents?.bodymatter.forEach((ele1, indexInner) => {
                                if (ele1.id === elmId) {
                                    ele.contents.bodymatter.splice(indexInner, 1);
                                }
                            })
                        } else if (ele.type == "manifest") {  /* To update redux store while deleting new element inside WE->Block Poetry->Stanza After Section Break */
                            ele.contents?.bodymatter.forEach((ele1) => {
                                if (ele1.type == "poetry" && ele1.id == poetryData?.parentUrn) {
                                    ele1.contents?.bodymatter.forEach((ele2, indexInner) => {
                                        if (ele2.id === elmId) {
                                            ele1.contents.bodymatter.splice(indexInner, 1);
                                        }
                                    })
                                }
                            })
                        }
                    }) /* To update redux store while deleting element inside TB->Tab->Block Poetry->Stanza */
                } else if (poetryData?.parent?.type === ElementConstants.MULTI_COLUMN && poetryData?.parent?.subtype === ElementConstants.TAB && element.id === poetryData?.parent?.id && poetryData.index) {
                    const poetryIndex = poetryData.index?.split("-");
                    element = element.groupeddata.bodymatter[poetryIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[poetryIndex[2]].groupdata.bodymatter[poetryIndex[3]];
                    if (element.type == "poetry" && element.id == poetryData?.parentUrn) {
                        element.contents?.bodymatter.forEach((stanza, innerIndex) => {
                            if (stanza.id === elmId) {
                                element.contents.bodymatter.splice(innerIndex, 1);
                            }
                        })
                    }
                } else if (element?.type == "groupedcontent" && element?.id === poetryData?.parent?.id) {  /* To update redux store while deleting new element inside Multi-column->Block Poetry->Stanza */
                  element.groupeddata?.bodymatter.forEach((ele) => {
                        ele.groupdata?.bodymatter.forEach((ele1) =>{
                            if (ele1.type == "poetry" && ele1.id == poetryData?.parentUrn) {
                                ele1.contents?.bodymatter.forEach((ele2, innerIndex) => {
                                    if (ele2.id === elmId) {
                                        ele1.contents.bodymatter.splice(innerIndex, 1);
                                    }
                                })
                            }
                        })

                    })
                /* To update redux store while deleting new element inside SH->Block Poetry->Stanza */
                } else if (element?.type == "showhide" && element?.id === poetryData?.parent?.id) {
                    element?.interactivedata[poetryData?.parent?.showHideType].map((ele) => {
                        ele?.contents?.bodymatter.forEach((ele2, innerIndex) => {
                            if (ele2.id === elmId) {
                                ele.contents.bodymatter.splice(innerIndex, 1);
                            }
                        });
                    });
                }
            }
            else if (parentUrn && parentUrn.elementType == "manifest") {
                /*
                if (element.id === asideData.id) {
                    element.elementdata.bodymatter.forEach((ele) => {
                        if (ele.id == parentUrn.manifestUrn) {
                            ele.contents.bodymatter.forEach((el, indexInner) => {
                                if (el.id === elmId) {
                                    ele.contents.bodymatter.splice(indexInner, 1);
                                }
                            })
                        }
                    })
                } else
                */
                /* Delete element inside 2C->WE->element */
                if(element?.type === "groupedcontent") {
                    element?.groupeddata?.bodymatter?.map(item => {
                        item?.groupdata?.bodymatter?.map(i => {
                            delInsideWE(i, asideData, parentUrn, elmId);
                        })
                    })
                } else {
                    delInsideWE(element, asideData, parentUrn, elmId);
                }
            } else if (parentUrn && parentUrn.elementType == "citations") {
                const innerIndex = index.split("-");
                /* Check if CG is contained by S/H */
                if (asideData?.parent?.type === SHOWHIDE && element.id === asideData?.parent?.id && innerIndex.length === 4) {
                    let section = asideData?.parent?.showHideType;
                    element.interactivedata[section][iList[2]].contents.bodymatter.splice([iList[3] - 1], 1);
                }
                if (element.id === parentUrn.manifestUrn) {
                    element.contents.bodymatter.splice([innerIndex[1] - 1], 1)
                }
            } else if (asideData?.parent?.type === 'showhide' && element.id === asideData?.parent?.id && asideData?.type === "manifestlist") {
                let section = asideData?.parent?.showHideType;
                if (section && indexes.length >= 3) {
                    let blElemInSh = element.interactivedata[section][indexes[2]];
                    deleteBlockListElement(elmId, blElemInSh);
                }
            } // check Aside/WE header has a blockList in it and then delete
            else if (element?.type === "element-aside" && element?.elementdata?.bodymatter[indexes[1]]?.type === "manifestlist"){
                let blEleminAS = element?.elementdata?.bodymatter[indexes[1]];
                deleteBlockListElement(elmId, blEleminAS);
            } // check WE body has a blockList in it and then delete
            else if (element?.type === "element-aside" && element?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.type === "manifestlist"){
                let blEleminWE = element?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]];
                deleteBlockListElement(elmId, blEleminWE);
            }else if (element?.type === "groupedcontent" && element?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.type === "manifestlist"){
                let blEleminAS = element?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]];
                deleteBlockListElement(elmId, blEleminAS); // check multicolumn has a blocklist inside it and then delete
                // If Tab element has blocklist inside it then delete
            } else if (element?.type === ElementConstants.MULTI_COLUMN && element?.subtype === ElementConstants.TAB && element?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]]?.type === ElementConstants.BLOCK_LIST) {
                let blEleminAS = element?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[indexes[2]]?.groupdata?.bodymatter[indexes[3]];
                deleteBlockListElement(elmId, blEleminAS);
            }else if (element?.type === "manifestlist") {
                deleteBlockListElement(elmId, element)
            }
        })
    }

    dispatch({
        type: AUTHORING_ELEMENT_CREATED,
        payload: {
            slateLevelData: newParentData
        }
    })

    /** ---------------------------- Auto-Numbering handling ------------------------------*/
    const isAutoNumberingEnabled = getState()?.autoNumberReducer?.isAutoNumberingEnabled;
    const autoNumberParams = {
        type,
        getState,
        dispatch,
        contentUrn,
        isAutoNumberingEnabled,
        asideData
    }
    handleAutoNumberingOnDelete(autoNumberParams)
    /**-----------------------------------------------------------------------------------*/
}

/**
 * function to find selected block list element inside block list data
 * to delete
 * @param {String} elementId
 * @param {Object} elementData
 */
export const deleteBlockListElement = (elementId, elementData) => {
    if (elementData?.listdata?.bodymatter) {
        elementData.listdata?.bodymatter.forEach((listData, index) => {
            if (listData.id === elementId) {
                elementData.listdata.bodymatter.splice(index, 1);
                return;
            }
            deleteBlockListElement(elementId, listData)
        })
    }
    if (elementData?.listitemdata?.bodymatter) {
        elementData.listitemdata.bodymatter.forEach((listItemData, index) => {
            if (listItemData.id === elementId) {
                elementData.listitemdata.bodymatter.splice(index, 1);
                return;
            }
            deleteBlockListElement(elementId, listItemData);
        });
    }
}

/* Delete Element inside WE and aside */
export const delInsideWE = (item, asideData, parentUrn, elmId) => {
    /* Delete elements inside 2C:WE/AS */
    if (item.id === asideData?.id) {
        item?.elementdata?.bodymatter?.forEach((ele,index) => {
            if (ele.id == parentUrn.manifestUrn) {
                ele.contents.bodymatter.forEach((el, indexInner) => {
                    if (el.id === elmId) {
                        ele.contents.bodymatter.splice(indexInner, 1);
                    }
                })
            } else if (ele.id === elmId) {
                item.elementdata.bodymatter.splice(index, 1);
            }
        })
    } else if (item.id === parentUrn?.manifestUrn) {
        /* Delete Section break inside 2C:WE */
        item?.elementdata?.bodymatter?.forEach((item_L1, index) => {
            if (item_L1.id === elmId) {
                item.elementdata.bodymatter.splice(index, 1);
            }
        })
    }
}

export const onSlateApproved = (currentSlateData, dispatch, fetchSlateData, autoNumberParams) => {
    if (currentSlateData.type === "popup") {
        sendDataToIframe({ 'type': TocRefreshVersioning, 'message' :true });
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
        handleAutoNumberingOnDelete(autoNumberParams);
    }
    else {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        sendDataToIframe({ 'type': SendMessageForVersioning, 'message': 'updateSlate' });
    }
    return false;
}


export const prepareTCMSnapshotsForDelete = async (params, operationType = null) => {
    const {
        deleteParentData,
        type,
        parentUrn,
        asideData,
        contentUrn,
        index,
        poetryData,
        cutCopyParentUrn,
        showHideObj,
        element,
        isSectionBreak,
        deleteElemData
    } = params

    const deleteBodymatter = cutCopyParentUrn && cutCopyParentUrn.slateLevelData ? deleteParentData[cutCopyParentUrn.sourceSlateManifestUrn]?.contents.bodymatter :deleteParentData[config.slateManifestURN].contents.bodymatter;
    if (elementTypeTCM.indexOf(type) !== -1 || containerType.indexOf(type) !== -1) {
        let wipData={}
        if(showHideObj?.currentElement?.type === 'element-aside' && isSectionBreak?.type === 'manifest'){
            wipData = isSectionBreak
        }
        else{
            wipData = showHideObj?.currentElement || fetchElementWipData(deleteBodymatter, index, type, contentUrn, "delete");
        }
        let containerElement = {
            asideData,
            parentUrn,
            poetryData,
            parentElement: wipData && wipData.type == 'popup' ? wipData : undefined,
            metaDataField: wipData && wipData.type == 'popup' && wipData.popupdata['formatted-title'] ? 'formattedTitle' : undefined,
            sectionType : wipData && wipData.type == 'popup' ? 'postertextobject' : undefined,
            cutCopyParentUrn,
            showHideObj: showHideObj //showHideCondition ? showHideObj : null
        }
        const deleteData = {
            wipData: wipData && Object.keys(wipData).length > 0 ? wipData : element, /** Inside Multi-Column->Aside/WE */
            currentParentData: deleteParentData,
            bodymatter: deleteBodymatter,
            index,
            deletedElementVersionUrn: deleteElemData.versionUrn
        }
        /**
        * @description For SHOWHIDE Element - prepare parent element data
        * Update - 2C/Aside/POP:SH:New
        */
        const typeOfElement = asideData?.type;
        if (typeOfElement === "showhide") {
            if (showHideObj?.currentElement?.type === 'element-aside' && type === 'manifest') {
                containerElement = {
                    parentElement: { ...asideData, sectionType: showHideObj?.showHideType },
                    asideData: {
                        ...showHideObj?.currentElement,
                        parent: {...showHideObj?.element,
                            showHideType: showHideObj?.showHideType}
                    },
                    parentUrn,
                    showHideObj,
                    sectionType: showHideObj?.showHideType
                }
            } else {
                containerElement = prepareSnapshots_ShowHide(containerElement, deleteData.wipData, index);
            }
            if (asideData?.grandParent?.asideData?.type === "groupedcontent" && !isEmpty(cutCopyParentUrn)) {
                deleteData.wipData = element;
            }
        }
        await tcmSnapshotsForDelete(deleteData, type, containerElement, operationType)
    }
}

/**
 * @function tcmSnapshotsForDelete
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementUpdateData - Object containing required element data
 * @param {String} type - type of element
 * @param {Object} containerElement - Element Parent Data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForDelete = async (elementDeleteData, type, containerElement, operationType) => {
    let {cutCopyParentUrn,parentUrn} =  containerElement
    if (elementDeleteData?.wipData?.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM?.includes(elementDeleteData.wipData.figuretype)) {
        return false
    }
    const actionStatus = {
        action:"delete",
        status:"pending",
        fromWhere:"delete"
    }
    const parentType = ['element-aside', 'citations', 'poetry', 'groupedcontent', 'popup'];
    let versionStatus = {};
    let currentSlateData = cutCopyParentUrn && cutCopyParentUrn.sourceSlateManifestUrn? elementDeleteData.currentParentData[cutCopyParentUrn.sourceSlateManifestUrn] :elementDeleteData.currentParentData[config.slateManifestURN]
    if(config.isPopupSlate){
        currentSlateData.popupSlateData = elementDeleteData.currentParentData[config.tempSlateManifestURN]
    }
    if ((parentType.indexOf(type) === -1) || (type === "element-aside" && parentUrn && elementDeleteData?.wipData?.type === "manifest") ) {
        versionStatus = fetchManifestStatus(elementDeleteData.bodymatter, containerElement, type);
    }
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, currentSlateData, actionStatus.action, elementDeleteData?.wipData?.type);
    let popupCutCopyParent = store?.getState()?.autoNumberReducer?.popupCutCopyParentData || {};
    if (currentSlateData?.type === 'popup' && currentSlateData?.status === 'approved' && popupCutCopyParent?.operationType === 'cut' && popupCutCopyParent?.isPopupSlate) {
        popupCutCopyParent = { ...popupCutCopyParent, versionUrn: containerElement?.slateManifest }
        popupCutCopyParentData(popupCutCopyParent);
    }
    await prepareTcmSnapshots(elementDeleteData.wipData, actionStatus, containerElement, type,elementDeleteData.index,"",operationType, elementDeleteData.deletedElementVersionUrn);
}