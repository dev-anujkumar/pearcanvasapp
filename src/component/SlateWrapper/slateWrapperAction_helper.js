// Constants
import axios from 'axios';
import config from '../../config/config';
import { AUTHORING_ELEMENT_CREATED, GET_TCM_RESOURCES, FETCH_COMMENTS } from '../../constants/Action_Constants';
import { HideLoader, ShowLoader, projectPendingTcStatus } from '../../constants/IFrameMessageTypes.js';
import * as slateWrapperConstants from "./SlateWrapperConstants"
//Helper methods
import { sendDataToIframe, replaceWirisClassAndAttr, getShowhideChildUrns } from '../../constants/utility.js';
import { prepareSnapshots_ShowHide, tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import { SET_SELECTION } from './../../constants/Action_Constants.js';
import { deleteFromStore, prepareTCMSnapshotsForDelete } from './../ElementContainer/ElementContainerDelete_helpers.js';
import tinymce from 'tinymce'
import ElementConstants from '../ElementContainer/ElementConstants.js';
const { SHOW_HIDE, ELEMENT_ASIDE, MULTI_COLUMN } = ElementConstants;

export const onPasteSuccess = async (params) => {
    const {
        responseData,
        index,
        cutIndex,
        dispatch,
        getState,
        elmExist,
        parentUrn,
        asideData,
        poetryData,
        slateEntityUrn, index2ShowHide, pasteSHIndex
    } = params
    
    const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
    replaceWirisClassAndAttr(activeEditorId)
    // Store Update on Paste Element
    let operationType = '';
    let sourceElementIndex = "";
    let elmSelection = {};
    if (Object.keys(getState().selectionReducer.selection).length > 0 && 'operationType' in getState().selectionReducer.selection) {
        elmSelection = getState().selectionReducer.selection;
        operationType = elmSelection.operationType;
        sourceElementIndex = elmSelection?.sourceElementIndex;
    }

    /** Create Snapshot for cut action on different slate */
    let cutSnap = true;
    if(operationType === 'cut' && elmExist) {
        if('sourceSlateEntityUrn' in elmSelection && 'sourceEntityUrn' in elmSelection &&
        ((elmSelection.sourceSlateEntityUrn === elmSelection.sourceEntityUrn && elmSelection.sourceSlateEntityUrn === config.slateEntityURN) ||
        (elmSelection.sourceSlateEntityUrn !== elmSelection.sourceEntityUrn && elmSelection.sourceEntityUrn === slateEntityUrn))) {           
            cutSnap = false;
        }
    }

    if ('deleteElm' in getState().selectionReducer.selection && operationType === 'cut') {
        let deleteElm = getState().selectionReducer.selection.deleteElm;
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        let cutcopyParentData =  null;
        if('cutCopyParentUrn' in deleteElm && 'slateLevelData' in deleteElm.cutCopyParentUrn) {
            cutcopyParentData = deleteElm.cutCopyParentUrn.slateLevelData;
        }

        // if(getState().selectionReducer.selection.sourceSlateEntityUrn !== config.slateEntityURN) {
        if(cutSnap || asideData?.type === SHOW_HIDE) {
            const tcmDeleteArgs = {
                deleteParentData: cutcopyParentData ? JSON.parse(JSON.stringify(cutcopyParentData)) : newParentData,
                deleteElemData: { [deleteElm.id]: deleteElm.id },
                type: deleteElm.type,
                parentUrn: deleteElm.parentUrn,
                asideData: deleteElm.asideData,
                contentUrn: deleteElm.contentUrn,
                index: deleteElm.index,
                poetryData: deleteElm.poetryData,
                cutCopyParentUrn: {
                    ...deleteElm.cutCopyParentUrn,
                    manifestUrn: deleteElm.cutCopyParentUrn.sourceSlateManifestUrn
                },
                element: responseData
            }
            await prepareTCMSnapshotsForDelete(tcmDeleteArgs, operationType);
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
    if (slateWrapperConstants.elementType.indexOf(slateWrapperConstants.checkTCM(responseData)) !== -1 && (cutSnap || asideData?.type === SHOW_HIDE)) {
        const snapArgs = {
            newParentData,
            currentSlateData,
            asideData: asideData || null,
            poetryData: poetryData || null,
            parentUrn: parentUrn || null,
            type: slateWrapperConstants.checkTCM(responseData),
            responseData,
            dispatch,
            index,
            elmFeedback: feedback, index2ShowHide
        }
        await handleTCMSnapshotsForCreation(snapArgs, operationType)
    }
    /**---------------------------------------------------------------------------------------------------*/

    if (currentSlateData.status === 'approved') {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        return false;
    }
    /* update the store on /cut/copy/paste of showhide elements */
    if(asideData?.type === SHOW_HIDE) {
        const manifestUrn = parentUrn?.manifestUrn;
        try {
            currentSlateData?.contents?.bodymatter?.map(item => {
                if(item?.id === manifestUrn) {
                    pasteInShowhide(item, responseData, pasteSHIndex);
                } else if(item?.type === 'element-aside') {
                    pasteShowhideInAside(item, manifestUrn, responseData, pasteSHIndex)
                } else if(item?.type === "groupedcontent") {
                    item?.groupeddata?.bodymatter?.map(item_4 => {
                        item_4?.groupdata?.bodymatter?.map(item_5 => {
                            if(item_5?.type === 'element-aside') {
                                pasteShowhideInAside(item_5, manifestUrn, responseData, pasteSHIndex);
                            }
                        })
                    })
                }
            })
        } catch(error){
            console.error(error);
        }
    } else
    if (asideData && asideData.type == 'element-aside') {
        newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
            if (item.id == parentUrn.manifestUrn) {
                item.elementdata.bodymatter.splice(cutIndex, 0, responseData)
            } else if (item.type == "element-aside" && item.id == asideData.id) {
                item.elementdata.bodymatter && item.elementdata.bodymatter.map((ele) => {
                    if (ele.id === parentUrn.manifestUrn) {
                        ele.contents.bodymatter.splice(cutIndex, 0, responseData)
                    }
                })
            } else if(asideData?.parent?.type === "groupedcontent" && item.id === asideData?.parent?.id) {
                /* 2C:ASIDE/WE:Elements; Update the store */
                const indexs = asideData?.index?.split("-") || [];
                if(indexs.length === 3) { /* Inside 2C:AS; COPY-PASTE elements */
                    const selcetIndex = sourceElementIndex?.toString().split("-") || [];
                    /* @newIndex@ for cut form same column to inner aside/we */
                    let newIndex;
                    if (operationType === 'cut') {
                        newIndex = (selcetIndex?.length === 3) && indexs[2] !== selcetIndex[2] ? selcetIndex : indexs;
                    } else {
                        newIndex = indexs
                    }
                    if(asideData?.subtype === "workedexample" && parentUrn?.elementType === "manifest" && selcetIndex.length === 5 ) { /* paste inner level elements inside 2C/Aside */
                        item?.groupeddata?.bodymatter[selcetIndex[1]]?.groupdata?.bodymatter[selcetIndex[2]]?.elementdata?.bodymatter[selcetIndex[3]]?.contents.bodymatter?.splice(cutIndex, 0, responseData);
                    } else if(asideData?.subtype === "workedexample" && parentUrn?.elementType === "manifest") { /* paste slate level elements inside 2C/WE/Body */ 
                        item?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[newIndex[2]]?.elementdata?.bodymatter?.map(item_L2 => {
                            if(item_L2.id === parentUrn?.manifestUrn) {
                                item_L2?.contents?.bodymatter?.splice(cutIndex, 0, responseData);
                            }
                        })
                    } else { /* paste slate level elements inside 2C/WE/Head */
                        item?.groupeddata?.bodymatter[newIndex[1]]?.groupdata?.bodymatter[newIndex[2]]?.elementdata?.bodymatter?.splice(cutIndex, 0, responseData)
                    }
                }
            }
        })
    } else if(asideData && asideData.type == 'citations'){
        newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
            if (item.id == parentUrn.manifestUrn) {
                item.contents.bodymatter.splice(cutIndex, 0, responseData)
            }
        })
    } else if (poetryData && poetryData.type == "poetry"){
        newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
            if (item.id == poetryData.parentUrn) {
                item.contents.bodymatter.splice(cutIndex, 0, responseData)
            } 
            else if (item.type == "poetry" && item.id == poetryData.id) {
                item.contents.bodymatter && item.contents.bodymatter.map((ele) => {
                    if (ele.id === poetryData.parentUrn) {
                        ele.contents.bodymatter.splice(cutIndex, 0, responseData)
                    }
                })
            }
        })  
    } else if (asideData && asideData.type === 'groupedcontent') {
        newParentData[config.slateManifestURN].contents.bodymatter.map((item, i) => {
            if (item.id === asideData.id) {
                item.groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter.splice(cutIndex, 0, responseData)
            }
        })
    } else {
        newParentData[config.slateManifestURN].contents.bodymatter.splice(cutIndex, 0, responseData);
    }

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
/**/
function pasteInShowhide(element, responseData, cutIndex) {
    /**/
    if(element?.type === SHOW_HIDE) {
        if(element?.interactivedata?.hasOwnProperty(responseData?.sectionType)) {
            element?.interactivedata[responseData?.sectionType]?.splice(cutIndex, 0, responseData);
        } else { /* if interactivedata dont have sectiontype [when all elements of show/hide deleted] */
            let sectionOfSH = [];
            sectionOfSH.push(responseData);
            element.interactivedata[responseData?.sectionType] = sectionOfSH;
        }
    }
}
/**/
function pasteShowhideInAside(item, manifestUrn, responseData, cutIndex) {
    item?.elementdata?.bodymatter.map(item_2 => {
        if(item_2?.id === manifestUrn) {
            pasteInShowhide(item_2, responseData, cutIndex);
        } else if(item_2?.type === "manifest") {
            item_2?.contents?.bodymatter?.map(item_3 => {
                if(item_3?.id === manifestUrn) {
                    pasteInShowhide(item_3, responseData, cutIndex);
                }
            })
        } 
    })
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
        elmFeedback, index2ShowHide
    } = params

    let containerElement = {
        asideData: asideData,
        parentUrn: parentUrn,
        poetryData: poetryData,
    };
   /**/
    if(asideData?.type === SHOW_HIDE) {
        containerElement = prepareSnapshots_ShowHide(containerElement, responseData, index2ShowHide);
    }
    if(responseData.type==="popup" && responseData.popupdata['formatted-title']){
        containerElement.parentElement = responseData;
        containerElement.metaDataField = "formattedTitle";
    }
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
            showTcmIconInAside(createdElementData, elmUrn)
            /*createdElementData.elementdata.bodymatter.map((item) => {
                if (item.type == "manifest") {
                    item.contents.bodymatter.map((ele) => {
                        elmUrn.push(ele.id)
                    })
                }
                else {
                    elmUrn.push(item.id)
                }

            })*/
            break;
        case slateWrapperConstants.SECTION_BREAK:
        case slateWrapperConstants.CITATION:
        case slateWrapperConstants.POETRY:
            createdElementData.contents.bodymatter.map((item) => {
                elmUrn.push(item.id)
            })
            break;
        case slateWrapperConstants.TEXT:
        case slateWrapperConstants.ASSESSMENT:
        case slateWrapperConstants.ELEMENT_ASSESSMENT:
        case slateWrapperConstants.ELEMENT_CITATION:
        case slateWrapperConstants.STANZA:
        case slateWrapperConstants.IMAGE:
        case slateWrapperConstants.VIDEO:
        case slateWrapperConstants.AUDIO:
        case slateWrapperConstants.FIGURE_MML:
        case slateWrapperConstants.BLOCKCODE:
        case slateWrapperConstants.SMARTLINK:
        case slateWrapperConstants.MMI_ELM:
        case slateWrapperConstants.INTERACTIVE:
            elmUrn.push(createdElementData.id)
            break;
        case slateWrapperConstants.MULTI_COLUMN:
        case slateWrapperConstants.MULTI_COLUMN_3C:
            /** Column */
            showTcmIconInMultiCol(createdElementData, elmUrn);
            break;
         /** case slateWrapperConstants.MULTI_COLUMN_3C:
            First Column 
            createdElementData.groupeddata.bodymatter[0].groupdata.bodymatter.map(item => {
                elmUrn.push(item.id)
            })
            /** Second Column 
            createdElementData.groupeddata.bodymatter[1].groupdata.bodymatter.map(item => {
                elmUrn.push(item.id)
            })
            /** Third Column 
            createdElementData.groupeddata.bodymatter[2].groupdata.bodymatter.map(item => {
                elmUrn.push(item.id)
            }) 
            break; */
        case slateWrapperConstants.POP_UP:
            elmUrn.push(createdElementData.popupdata.postertextobject[0].id)
            createdElementData.popupdata.bodymatter.length>0 && elmUrn.push(createdElementData.popupdata.bodymatter[0].id)
            break;
        case slateWrapperConstants.SHOW_HIDE:
            elmUrn = getShowhideChildUrns(createdElementData)
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
/**
* @function showTcmIconInAside
* @description Show tcm icon in right side of element inside Asdie containers; Ex. - Aside:P
*/
function showTcmIconInAside(element, elmUrn) {
    if(element?.type === ELEMENT_ASIDE) {
        element?.elementdata?.bodymatter?.map((item) => {
            if(item?.type === SHOW_HIDE) {
               showTcmIconInSH(item, elmUrn);
            } else
            if (item?.type === "manifest") {
                item?.contents?.bodymatter?.map((ele) => {
                    if(ele?.type === SHOW_HIDE) { /* Ex. -  WE:Body/SectionBreak:SH:P*/
                        showTcmIconInSH(ele, elmUrn);
                    } 
                    else { elmUrn.push(ele.id) } /* Ex. -  WE:Body/SectionBreak:P*/
                })
            } else {
                elmUrn.push(item.id) /* Ex. -  Aside/(WE:Head):P*/
            }
        })
    }
}
/**
* @function showTcmIconInMultiCol
* @description Show tcm icon in right side of element inside containers; Ex. -  2C:P || 2C:Aside:P
*/
function showTcmIconInMultiCol(element, elmUrn) {
    if(element?.type === MULTI_COLUMN) {
        element?.groupeddata?.bodymatter?.map(grpItem => {
            grpItem?.groupdata?.bodymatter?.map(item => {
                if(item?.type === ELEMENT_ASIDE) { /* Show Icon in 2C:Aside:Element */
                    showTcmIconInAside(item, elmUrn);
                } else {
                    elmUrn.push(item.id); /* Show Icon in 2C:Element */
                }
            })
        })
    }
}
/**
* @function showTcmIconInSH
* @description Show tcm icon in right side of element inside Shohide; Ex. -  SH:P 
*/
function showTcmIconInSH(element, elmUrn) {
    ["show","hide"].forEach(sectionType => {
        element?.interactivedata?.[sectionType]?.map(item => {
            elmUrn.push(item?.id);
        })
    })
}
export const setPayloadForContainerCopyPaste = (params) => {
    const {
        cutIndex,
        selection,
        manifestUrn,
        containerEntityUrn
    } = params

    const acceptedTypes=["element-aside","citations","poetry","groupedcontent","workedexample","showhide","popup","discussion"]
    if (acceptedTypes.includes(selection.element.type)) {
        if (selection.operationType === "cut") {
            return {
                "content": [{
                    "type": selection.element.type,
                    "index": cutIndex,
                    "id": selection.element.id,
                    "elementParentEntityUrn": selection.sourceEntityUrn,// selection.sourceSlateEntityUrn,
                    "contentUrn": selection.element.contentUrn
                }]
            }
        }
        return {
            "content": [{
                "type": selection.element.type,
                "index": cutIndex,
                "id": manifestUrn,
                // "elementParentEntityUrn": selection.sourceEntityUrn,// selection.sourceSlateEntityUrn,
                "contentUrn": containerEntityUrn
            }]
        }
    }
}

/**
 * Checks the clone container status and take actions accordingly
 * @param {*} params contains clone request Id, index of insertion, dispatch and paste method
 */
export const fetchStatusAndPaste = async (params) => {
    const {
        insertionIndex,
        requestId,
        dispatch,
        pasteElement,
        parentUrn,
        asideData
    } = params

    let isCloneSucceed = false,
        newContainerData = null,
        statusAPICallInProgress = false;

    let statusCheckInterval = setInterval(async () => {
        if (statusAPICallInProgress) return false
        if (isCloneSucceed) {
            clearInterval(statusCheckInterval)
            return prepareAndPasteElement(newContainerData, insertionIndex, pasteElement, dispatch,parentUrn,asideData)
        }
        try {
            const getStatusApiUrl = `${config.AUDIO_NARRATION_URL}container/request/${requestId}`
            statusAPICallInProgress = true
            const statusResponse = await axios.get(
                getStatusApiUrl,
                {
                    headers: {
                        "ApiKey": config.STRUCTURE_APIKEY,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "PearsonSSOSession": config.ssoToken
                    }
                }
            )
            statusAPICallInProgress = false
            const statusResponseData = statusResponse.data
            if (statusResponseData.auditResponse?.status === "SUCCESS") {
                isCloneSucceed = true
                newContainerData = statusResponseData.baseContainer
                clearInterval(statusCheckInterval)
                return prepareAndPasteElement(newContainerData, insertionIndex, pasteElement, dispatch,parentUrn,asideData)
            }
        }
        catch (error) {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            console.error("Error in getting the clone status of container:::", error);
        }
    }, slateWrapperConstants.CLONE_STATUS_INTERVAL);
}

/**
 * Dispatches paste element action
 * @param {*} newContainerData clone container details
 * @param {*} insertionIndex index of insertion
 * @param {*} pasteElement paste action
 * @param {*} dispatch dispatch action method
 */
export const prepareAndPasteElement = (newContainerData, insertionIndex, pasteElement, dispatch,parentUrn,asideData) => {
    const pasteArgs = {
        index: insertionIndex,
        manifestUrn: newContainerData?.id,
        containerEntityUrn: newContainerData?.entityUrn,
        parentUrn: parentUrn,
        asideData:asideData
    }
    return dispatch(pasteElement(pasteArgs))
}
