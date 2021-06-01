import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { 
    prepareTcmSnapshots,
    fetchElementWipData,
    checkContainerElementVersion,
    fetchManifestStatus 
} from '../TcmSnapshots/TcmSnapshots_Utility.js';
//Constants
import { 
    AUTHORING_ELEMENT_CREATED,
    GET_TCM_RESOURCES,
} from "./../../constants/Action_Constants";
import { elementTypeTCM, containerType, allowedFigureTypesForTCM } from "./ElementConstants";
import config from '../../config/config';
import { ShowLoader, HideLoader, TocRefreshVersioning, SendMessageForVersioning } from '../../constants/IFrameMessageTypes.js';
import tinymce from 'tinymce'

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

    const currentSlateData = newParentData[config.slateManifestURN];
    if (currentSlateData.status === 'approved') {
        return onSlateApproved(currentSlateData, dispatch, fetchSlateData)  
    }
    const args = {
        dispatch,
        elmId,
        parentUrn,
        asideData,
        index,
        poetryData,
        newParentData
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

export const deleteFromStore = (params) => {
    const {
        dispatch,
        elmId,
        parentUrn,
        asideData,
        index,
        poetryData,
        newParentData
    } = params

    if (parentUrn && parentUrn.elementType == "group") {
        const elIndex = index.toString().split('-') 
        newParentData[config.slateManifestURN].contents.bodymatter[elIndex[0]].groupeddata.bodymatter[elIndex[1]].groupdata.bodymatter.splice(elIndex[2], 1)
    } else {
        let bodymatter = newParentData[config.slateManifestURN].contents.bodymatter
        bodymatter.forEach((element, key) => {
            if (element.id === elmId) {
                bodymatter.splice(key, 1);
            } else if (parentUrn && parentUrn.elementType == "element-aside") {
                if (element.id === parentUrn.manifestUrn) {
                    element.elementdata.bodymatter.forEach((ele, indexInner) => {
                        if (ele.id === elmId) {
                            element.elementdata.bodymatter.splice(indexInner, 1);
                        }
                    })
                } else {
                    element?.groupeddata?.bodymatter?.map(item => {
                        item?.groupdata?.bodymatter?.map(i => {
                            delInsideWE(i, asideData, parentUrn, elmId);
                        })
                    })
                }
            } else if(poetryData && poetryData.type == 'poetry') {
                if (element.id === poetryData.parentUrn) {
                    element.contents.bodymatter.forEach((ele, indexInner) => {
                        if (ele.id === elmId) {
                            element.contents.bodymatter.splice(indexInner, 1);
                        }
                    })
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
            } else if (parentUrn && parentUrn.elementType == "citations"){
                if (element.id === parentUrn.manifestUrn) {
                    const innerIndex = index.split("-")
                    element.contents.bodymatter.splice([innerIndex[1] - 1], 1)
                }
            }
        })
    }

    dispatch({
        type: AUTHORING_ELEMENT_CREATED,
        payload: {
            slateLevelData: newParentData
        }
    })
}
/* Delete Element inside WE and aside */
const delInsideWE = (item, asideData, parentUrn, elmId) => {
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
    }
}

export const onSlateApproved = (currentSlateData, dispatch, fetchSlateData) => {
    if (currentSlateData.type === "popup") {
        sendDataToIframe({ 'type': TocRefreshVersioning, 'message' :true });
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
    }
    else {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        sendDataToIframe({ 'type': SendMessageForVersioning, 'message': 'updateSlate' });
    }
    return false;
}


export const prepareTCMSnapshotsForDelete = (params) => {
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
        element
    } = params

    const deleteBodymatter = cutCopyParentUrn && cutCopyParentUrn.slateLevelData ? deleteParentData[cutCopyParentUrn.sourceSlateManifestUrn].contents.bodymatter :deleteParentData[config.slateManifestURN].contents.bodymatter;
    if (elementTypeTCM.indexOf(type) !== -1 || containerType.indexOf(type) !== -1) {
        const showHideCondition = showHideObj?.currentElement?.contentUrn === contentUrn && type !== "showhide"
        const wipData = showHideCondition ? showHideObj.currentElement : fetchElementWipData(deleteBodymatter, index, type, contentUrn, "delete")
        const containerElement = {
            asideData,
            parentUrn,
            poetryData,
            parentElement: wipData && wipData.type == 'popup' ? wipData : undefined,
            metaDataField: wipData && wipData.type == 'popup' && wipData.popupdata['formatted-title'] ? 'formattedTitle' : undefined,
            sectionType : wipData && wipData.type == 'popup' ? 'postertextobject' : undefined,
            cutCopyParentUrn,
            showHideObj: showHideCondition ? showHideObj : null
        }
        const deleteData = {
            wipData: Object.keys(wipData).length > 0 ? wipData : element, /** Inside Multi-Column->Aside/WE */
            currentParentData: deleteParentData,
            bodymatter: deleteBodymatter,
            index
        }
        tcmSnapshotsForDelete(deleteData, type, containerElement)
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
export const tcmSnapshotsForDelete = async (elementDeleteData, type, containerElement) => {
    let {cutCopyParentUrn,parentUrn} =  containerElement
    if (elementDeleteData.wipData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(elementDeleteData.wipData.figuretype)) {
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
    if ((parentType.indexOf(type) === -1) || (type === "element-aside" && parentUrn && elementDeleteData.wipData.type === "manifest") ) {
        versionStatus = fetchManifestStatus(elementDeleteData.bodymatter, containerElement, type);
    }
    containerElement = await checkContainerElementVersion(containerElement, versionStatus, currentSlateData);
    prepareTcmSnapshots(elementDeleteData.wipData, actionStatus, containerElement, type,elementDeleteData.index);
}