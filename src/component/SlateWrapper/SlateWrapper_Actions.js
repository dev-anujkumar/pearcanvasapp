import axios from 'axios';
import config from '../../config/config';
import {
    AUTHORING_ELEMENT_CREATED,
    SWAP_ELEMENT,
    SET_SPLIT_INDEX,
    GET_PAGE_NUMBER,
    SET_UPDATED_SLATE_TITLE,
    UPDATE_PAGENUMBER_SUCCESS,
    UPDATE_PAGENUMBER,
    UPDATE_PAGENUMBER_FAIL,
    SET_SLATE_TYPE,
    SET_SLATE_ENTITY,
    ACCESS_DENIED_POPUP,
    FETCH_SLATE_DATA,
    SET_PARENT_NODE,
    ERROR_POPUP,
    PAGE_NUMBER_LOADER,
    WIRIS_ALT_TEXT_POPUP,
    SLATE_FIGURE_ELEMENTS,
    CYPRESS_PLUS_ENABLED,
    SET_SLATE_MATTER_TYPE,
    UPDATE_CARET_OFFSET
} from '../../constants/Action_Constants';

import { sendDataToIframe, replaceWirisClassAndAttr } from '../../constants/utility.js';
import { HideLoader, ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { tcmSnapshotsForCreate, prepareSnapshots_ShowHide } from '../TcmSnapshots/TcmSnapshotsCreate_Update';
import * as slateWrapperConstants from "./SlateWrapperConstants"
import { onPasteSuccess, checkElementExistence, prepareDataForTcmCreate } from "./slateWrapperAction_helper"
import { handleAlfrescoSiteUrl } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
import { SET_SELECTION } from './../../constants/Action_Constants.js';
import tinymce from 'tinymce'
import SLATE_CONSTANTS  from '../../component/ElementSaprator/ElementSepratorConstants';
import ElementConstants from '../ElementContainer/ElementConstants';
import { getShowHideElement, indexOfSectionType } from '../ShowHide/ShowHide_Helper';
import { isEmpty } from '../TcmSnapshots/ElementSnapshot_Utility';
const { SHOW_HIDE, TAB, MULTI_COLUMN, ELEMENT_WORKEDEXAMPLE } = ElementConstants;
import { callCutCopySnapshotAPI } from '../TcmSnapshots/TcmSnapshot_Actions';
import {preparePayloadData} from '../../component/TcmSnapshots/CutCopySnapshots_helper';
import { enableAsideNumbering } from '../Sidebar/Sidebar_Action.js';
import { getAutoNumberedElementsOnSlate } from '../FigureHeader/slateLevelMediaMapper';
import { handleAutoNumberingOnSwapping } from '../FigureHeader/AutoNumber_DeleteAndSwap_helpers';
import { handleAutonumberingOnCreate } from '../FigureHeader/AutoNumberCreate_helper';
import { autoNumberFigureTypesAllowed, AUTO_NUMBER_PROPERTIES, ELEMENT_TYPES_FOR_AUTO_NUMBER, autoNumberContainerTypesAllowed } from '../FigureHeader/AutoNumberConstants';
import { triggerCustomEventsGTM } from '../../js/ga';
const {
    MANUAL_OVERRIDE,
    NUMBERED_AND_LABEL
} = AUTO_NUMBER_PROPERTIES;
Array.prototype.move = function (from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

export const createElement = (type, index, parentUrn, asideData, outerAsideIndex, loref, cb,poetryData,blockListDetails) => (dispatch, getState) => {
    config.currentInsertedIndex = index;
    let  popupSlateData = getState().appStore.popupSlateData;
    const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled;
    localStorage.setItem('newElement', 1);
    let slateEntityUrn = parentUrn && parentUrn.contentUrn || popupSlateData && popupSlateData.contentUrn || poetryData && poetryData.contentUrn || config.slateEntityURN
    let slateVersionUrn = parentUrn && parentUrn.manifestUrn|| popupSlateData && popupSlateData.manifestUrn || poetryData && poetryData.parentUrn || config.slateManifestURN
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn":slateEntityUrn,
        "slateVersionUrn" : slateVersionUrn,
        "immediateSlateEntityUrn" : config.slateEntityURN,
        "immediateSlateVersionUrn": config.slateManifestURN,
        "projectEntityUrn": config.projectEntityUrn,
        "index": outerAsideIndex ? outerAsideIndex : index,
        "type": type
    };
    if (type == "LO") {
        _requestData.loref = loref ? loref : ""
    } 
    else if (type == 'ELEMENT_CITATION') {
        _requestData.parentType = "citations"
    }
    else if (type && type === "LO_LIST" && config.parentLabel && config.slateType && config.parentLabel === 'part' && config.slateType === SLATE_CONSTANTS.CONTAINER_INTRO) {
        _requestData.isPart = true
    }
    else if (parentUrn && parentUrn.elementType === 'group') {
        _requestData["parentType"] = "groupedcontent"
        _requestData["columnName"] = parentUrn.columnName
    }
    if (ELEMENT_TYPES_FOR_AUTO_NUMBER.includes(type) && isAutoNumberingEnabled) {
        _requestData["isAutoNumberingEnabled"] = true;
    }
    triggerCustomEventsGTM('create-element-type',_requestData );
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/element`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    ).then(async createdElemData => {
        const parentData = getState().appStore.slateLevelData;
        const newParentData = JSON.parse(JSON.stringify(parentData));
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        let currentSlateData = newParentData[config.slateManifestURN];
        const cypressPlusProjectStatus = getState()?.appStore?.isCypressPlusEnabled
        /** [PCAT-8289] ---------------------------- TCM Snapshot Data handling ------------------------------*/
        /**This will be removed when BL supports TCM */
        const tempSlateWrapperConstants = [...slateWrapperConstants.elementType].filter( item => item !== "MANIFEST_LIST")
        /**This check modified to prevent snapshots for TB. This will be removed when TB supports TCM */
        let isTbElement = asideData?.subtype === TAB || asideData?.parent?.subtype === TAB || asideData?.grandParent?.asideData?.parent?.subtype === TAB;
        //This check is for the TEXT element which gets created inside BL on Shift+Enter
        if(!blockListDetails) {
        // if (tempSlateWrapperConstants.indexOf(type) !== -1) {
        if (tempSlateWrapperConstants.indexOf(type) !== -1 && !isTbElement) {
            let containerElement = {
                asideData: asideData,
                parentUrn: parentUrn,
                poetryData: poetryData
            };
            let slateData = {
                currentParentData: newParentData,
                bodymatter: currentSlateData.contents.bodymatter,
                response: createdElemData.data,
                cypressPlusProjectStatus: cypressPlusProjectStatus
            };
            if (currentSlateData.status === 'approved') {
                await tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
            }
            else {
                tcmSnapshotsForCreate(slateData, type, containerElement, dispatch);
            }
        }}
        /**---------------------------------------------------------------------------------------------------*/

        if (currentSlateData.status === 'approved') {
            if(currentSlateData.type==="popup"){
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            } else {
            // createNewVersionOfSlate();
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
            }
        }
        const newPopupSlateData = JSON.parse(JSON.stringify(popupSlateData));
        let createdElementData = createdElemData.data;
        if (type == 'SECTION_BREAK') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == asideData.id) {
                    item.elementdata.bodymatter.splice(outerAsideIndex, 0, createdElementData)
                    /* To update redux store while creating new element inside TB->Tab->WE->New */
                } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB && item.id === asideData?.parent?.id && asideData.index) {
                    let indexes = asideData.index?.split("-");
                    item = item.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
                    if (item?.id === parentUrn.manifestUrn) {
                        item?.elementdata?.bodymatter?.splice(index, 0, createdElementData);
                    } else if (item?.subtype === ELEMENT_WORKEDEXAMPLE) {
                        item?.elementdata?.bodymatter?.map(j => {
                            if (j?.id === parentUrn.manifestUrn) {
                                j?.contents?.bodymatter?.splice(index, 0, createdElementData);
                            }
                        })
                    }
                } else if(asideData?.parent?.type === "groupedcontent" && item.id === asideData?.parent?.id){
                    /* Add element inside 2c->WE->new */
                    item?.groupeddata?.bodymatter?.map((ele) => {
                        ele?.groupdata?.bodymatter?.map(i => {
                            if (i?.id === parentUrn.manifestUrn) {
                                i?.elementdata?.bodymatter?.splice(outerAsideIndex, 0, createdElementData);
                            } else if(i?.subtype === "workedexample"){
                                i?.elementdata?.bodymatter?.map(j => {
                                    if (j?.id === parentUrn.manifestUrn) {
                                        j?.contents?.bodymatter?.splice(index, 0, createdElementData);
                                    }
                                })
                            }
                        })
                    })
                } else if (asideData?.parent?.type === "showhide" && item?.id === asideData?.parent?.id && asideData?.parent?.showHideType) {
                    item?.interactivedata[asideData?.parent?.showHideType].map( (innerElement) => {
                        if (innerElement?.id === parentUrn?.manifestUrn) {
                            innerElement?.elementdata?.bodymatter?.splice(outerAsideIndex, 0, createdElementData);
                        }
                    })
                }
            })
        } else if (asideData && asideData.type == 'element-aside'  && type !== 'SECTION_BREAK') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == parentUrn.manifestUrn) {
                    item.elementdata.bodymatter.splice(index, 0, createdElementData)
                } else if (item.type == "element-aside" && item.id == asideData.id) {
                    item.elementdata.bodymatter && item.elementdata.bodymatter.map((ele) => {
                        if (ele.id === parentUrn.manifestUrn) {
                            ele.contents.bodymatter.splice(index, 0, createdElementData)
                        }
                    })
                /* To update redux store while creating new element inside S/H->Aside->New */
                } else if (asideData?.parent?.type === "showhide" && item.id == asideData?.parent?.id) {
                    let sectionType = asideData?.parent?.showHideType;
                    if (sectionType) {
                        if (asideData.subtype === 'workedexample' && parentUrn.elementType === 'manifest') {
                            item.interactivedata[sectionType] && item.interactivedata[sectionType].map((element) => {
                                if (element.id === asideData.id) {
                                    element.elementdata.bodymatter && element.elementdata.bodymatter.map((ele) => {
                                        if (ele.id === parentUrn.manifestUrn) {
                                            ele.contents.bodymatter.splice(index, 0, createdElementData)
                                        }
                                    })
                                }
                            })
                        } else {
                            appendElementInsideShowhide(item, sectionType, asideData, 'elementdata', index, createdElementData);
                        }
                    }
                    /* To update redux store while creating new element inside TB->Tab->Aside->New */
                } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB && item.id === asideData?.parent?.id && asideData.index) {
                    let indexes = asideData.index?.split("-");
                    item = item.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
                    if (item?.id === parentUrn.manifestUrn) {
                        item?.elementdata?.bodymatter?.splice(index, 0, createdElementData);
                    } else if (item?.subtype === ELEMENT_WORKEDEXAMPLE) {
                        item?.elementdata?.bodymatter?.map(j => {
                            if (j?.id === parentUrn.manifestUrn) {
                                j?.contents?.bodymatter?.splice(index, 0, createdElementData);
                            }
                        })
                    }
                /* To update redux store while creating new element inside 2C->Aside->New */
                } else if(asideData?.parent?.type === MULTI_COLUMN && item.id === asideData?.parent?.id){
                    item?.groupeddata?.bodymatter?.map((ele) => {
                        ele?.groupdata?.bodymatter?.map(i => {
                            if (i?.id === parentUrn.manifestUrn) {
                                i?.elementdata?.bodymatter?.splice(index, 0, createdElementData);
                            } else if(i?.subtype === ELEMENT_WORKEDEXAMPLE){
                                i?.elementdata?.bodymatter?.map(j => {
                                    if (j?.id === parentUrn.manifestUrn) {
                                        j?.contents?.bodymatter?.splice(index, 0, createdElementData);
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }else if (popupSlateData && popupSlateData.type == "popup"){
            newPopupSlateData.popupdata.bodymatter.splice(index, 0, createdElementData);
        }
        /* Citation element inside S/H */
        else if (asideData && asideData?.type == 'citations' && asideData?.parent?.type === "showhide") {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == asideData?.parent?.id) {
                    appendElementInsideShowhide(item, 'show', asideData, 'contents', index, createdElementData);
                    appendElementInsideShowhide(item, 'hide', asideData, 'contents', index, createdElementData);
                }
            })
            /* Citation element inside Slate */
        } else if(asideData && asideData.type == 'citations' && asideData?.parent?.type !== "showhide") {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == parentUrn.manifestUrn) {
                    item.contents.bodymatter.splice(index, 0, createdElementData)
                }
            })
        }
        else if (poetryData && poetryData.type == "poetry"){
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == poetryData.parentUrn) {
                    item.contents.bodymatter.splice(index, 0, createdElementData)
                } 
                else if (item.type == "poetry" && item.id == poetryData.id) {
                    item.contents.bodymatter && item.contents.bodymatter.map((ele) => {
                        if (ele.id === poetryData.parentUrn) {
                            ele.contents.bodymatter.splice(index, 0, createdElementData)
                        }
                    })
                }
                /* To update redux store while creating new element inside WE/Aside->Block Poetry->Stanza */
                else if(poetryData?.parent?.type === "element-aside" && item.id === poetryData?.parent?.id){
                    item?.elementdata?.bodymatter?.map((ele) => {
                            if (ele?.id === parentUrn.manifestUrn) {
                                ele?.contents?.bodymatter?.splice(index, 0, createdElementData);
                            } else if (ele?.contents?.bodymatter) {
                                ele.contents.bodymatter.map((ele2) => {
                                    if (ele2?.id === parentUrn.manifestUrn) {
                                        ele2?.contents?.bodymatter?.splice(index, 0, createdElementData);
                                    }
                                })
                            }
                    }) /* To update redux store while creating new element inside TB->Tab->Block Poetry->Stanza */
                } else if (poetryData?.parent?.type === MULTI_COLUMN && poetryData?.parent?.subtype === TAB && item.id === poetryData?.parent?.id && poetryData.index) {
                    const poetryIndex = poetryData.index?.split("-");
                    item = item.groupeddata.bodymatter[poetryIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[poetryIndex[2]].groupdata.bodymatter[poetryIndex[3]];
                    item.contents?.bodymatter?.splice(index, 0, createdElementData);
                }
                /* To update redux store while creating new element inside 2C->Block Poetry->Stanza */
                else if(poetryData?.parent?.type === "groupedcontent" && item.id === poetryData?.parent?.id){
                    item?.groupeddata?.bodymatter?.map((ele) => {
                        ele?.groupdata?.bodymatter?.map(i => {
                            if (i?.id === parentUrn.manifestUrn) {
                                i?.contents?.bodymatter?.splice(index, 0, createdElementData);
                            }
                        })
                    })
                }
                /* To update redux store while creating new element inside SH->Block Poetry->Stanza */
                else if(poetryData?.parent?.type === "showhide" && item.id === poetryData?.parent?.id){
                    item?.interactivedata[poetryData?.parent?.showHideType].map((ele) => {
                        if(ele?.id === poetryData?.id) {
                            ele?.contents?.bodymatter?.splice(index, 0, createdElementData);
                        }
                    });
                }
            })  
        /* To update redux store while creating new element inside TB->Tab->Column */
        } else if (asideData && asideData.type === MULTI_COLUMN && asideData.subtype === TAB) {
            const parentIndexes = asideData.index && asideData.index.split("-")
            let item = newParentData[config.slateManifestURN].contents.bodymatter[parentIndexes[0]];
            item.groupeddata.bodymatter[parentIndexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[parentIndexes[2]].groupdata.bodymatter.splice(index, 0, createdElementData);
        }
        else if (asideData && asideData.type === 'groupedcontent') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item, i) => {
                if (item.id === asideData.id) {
                    item.groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter.splice(index, 0, createdElementData)
                }
            })
        /* Adding WE element inside 2C element */
        } else if(parentUrn?.elementType === "group" && !asideData){
            newParentData[config.slateManifestURN]?.contents?.bodymatter?.map((item, i) => {
                let column = item?.groupeddata?.bodymatter[parentUrn?.columnIndex] || [];
                if (column?.id === parentUrn?.manifestUrn) {
                    column?.groupdata?.bodymatter?.splice(index, 0, createdElementData)
                }
            })
        } 
        /*  Local store update for block list and Text inside block list for multiple levels. */
        else if((type==='MANIFEST_LIST' || type==='TEXT') && blockListDetails!==null){
            const indexes = blockListDetails.indexOrder.split('-');
            let parentElement = currentSlateData?.contents?.bodymatter[indexes[0]];
            let initialdata = {};
            // update store for SH,WE(body) if it has Bl inside it and its nesting level
            if((asideData.parent && asideData.parent.type === "showhide") || (parentElement?.type === 'element-aside' && parentElement?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.type === "manifestlist")){
                 initialdata = parentElement?.type === 'element-aside' ? newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter : newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter;
                 if (indexes.length === 5) { // Block list on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 7) { // Block list on 2 level nesting
                    initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 9) { // Block list on 3 level nesting
                    initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // level 4 
                    initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
            }// update store for AS/WE(header) if it has Bl inside it and its nesting level
            else if(parentElement?.type === 'element-aside'){
                initialdata =  newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter[indexes[2]].listitemdata.bodymatter;
                 if (indexes.length === 4 ) { // For AS/WE(header) Block list on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 6) { // Block list on 2 level nesting
                    initialdata[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 8) { // Block list on 3 level nesting
                    initialdata[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // level 4 
                    initialdata[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                } // Manifest List/Text element handelling for Tab element inside TB
            } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB) {
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter;
                switch (indexes.length) {
                    case 6: // TB:Tab:c1:BL Level 1 nesting
                        initialdata.splice(index, 0, createdElementData);
                        break;
                    case 8: // TB:Tab:c1:BL Level 2 nesting
                        initialdata[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                    case 10: // TB:Tab:c1:BL Level 3 nesting
                        initialdata[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter.splice(index, 0, createdElementData);
                        
                        break;
                    case 12: // TB:Tab:c1:BL Level 4 nesting
                        initialdata[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]].listdata.bodymatter[indexes[10]].listitemdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                }
            }
            else if(asideData.parent && asideData.parent.type === "groupedcontent"){
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter;
                if (indexes.length === 5) { // Block list on 1 level nesting
                   initialdata.splice(index, 0, createdElementData)
               }
               else if (indexes.length === 7) { // Block list on 2 level nesting
                   initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter.splice(index, 0, createdElementData)
               }
               else if (indexes.length === 9) { // Block list on 3 level nesting
                   initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter.splice(index, 0, createdElementData)
               }
               else { // level 4 
                   initialdata[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter[indexes[9]].listitemdata.bodymatter.splice(index, 0, createdElementData)
               }
            }
            else{
                let initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].listdata.bodymatter[indexes[1]].listitemdata.bodymatter;
                if (indexes.length === 3) { // Block list on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 5) { // Block list on 2 level nesting
                    initialdata[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 7) { // Block list on 3 level nesting
                    initialdata[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // level 4 
                    initialdata[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter.splice(index, 0, createdElementData)
                }
            }
         } 
         /*  Local store update for manifest list item inside block list for multiple levels. */
         else if(type==='MANIFEST_LIST_ITEM' && blockListDetails!==null && blockListDetails.eventType ==="ENTER"){
             const indexes = blockListDetails.indexOrder.split('-');
             let initialdata = {};
             let parentElement = currentSlateData?.contents?.bodymatter[indexes[0]]
             if((asideData.parent && asideData.parent.type === "showhide") || (parentElement?.type === 'element-aside' && parentElement?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.type === "manifestlist")){
                  initialdata = parentElement?.type === 'element-aside' ? newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter : newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter;
                 if (indexes.length === 5) { // Block list on 1 level nesting
                     initialdata.splice(index, 0, createdElementData)
                 }
                 else if (indexes.length === 7) { // Manifest List Item on 2 level nesting
                     initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
                 else if (indexes.length === 9) { // Manifest List Item on 3 level nesting
                     initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
                 else { // Manifest List Item on 4 level nesting
                     initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
             }else if(currentSlateData?.contents?.bodymatter[indexes[0]]?.type === 'element-aside'){
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter;
                if (indexes.length === 4) { // Block list on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }else if (indexes.length === 6) { // Block list on 2 level nesting
                    initialdata[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter.splice(index, 0, createdElementData)
                }else if (indexes.length === 8) { // Block list on 3 level nesting
                    initialdata[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // level 4 
                    initialdata[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                // Manifest List Item handelling for Tab element inside TB
             } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB) {
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter;
                switch (indexes.length) {
                    case 6: // TB:Tab:c1:BL Level 1 nesting
                        initialdata.splice(index, 0, createdElementData);
                        break;
                    case 8: // TB:Tab:c1:BL Level 2 nesting
                        initialdata[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                    case 10: // TB:Tab:c1:BL Level 3 nesting
                        initialdata[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                    case 12: // TB:Tab:c1:BL Level 4 nesting
                        initialdata[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter[indexes[8]].listitemdata.bodymatter[indexes[9]].listdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                }
             }
             else if(asideData.parent && asideData.parent.type === "groupedcontent"){
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter;
                if (indexes.length === 5) { // Block list on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 7) { // Manifest List Item on 2 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 9) { // Manifest List Item on 3 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // Manifest List Item on 4 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter[indexes[7]].listitemdata.bodymatter[indexes[8]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
             }
            else{
                 initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].listdata.bodymatter;
                 if (indexes.length === 3) { // Manifest List Item on 1 level nesting
                     initialdata.splice(index, 0, createdElementData)
                 }
                 else if (indexes.length === 5) { // Manifest List Item on 2 level nesting
                     initialdata[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
                 else if (indexes.length === 7) { // Manifest List Item on 3 level nesting
                     initialdata[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
                 else { // Manifest List Item on 4 level nesting
                     initialdata[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
            }
            
          } 
         /*  Local store update for manifest list item inside block list for multiple levels. */
          else if(type==='MANIFEST_LIST_ITEM' && blockListDetails!==null && blockListDetails.eventType ==="SHIFT+TAB"){
             const indexes = blockListDetails.indexOrder.split('-');
             console.log("tets",indexes);
             let initialdata = {};
             let parentElement = currentSlateData?.contents?.bodymatter[indexes[0]];
             if((asideData.parent && asideData.parent.type === "showhide") || (parentElement?.type === 'element-aside' && parentElement?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.type === "manifestlist")) {
                initialdata = parentElement?.type === 'element-aside' ?  newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].listdata.bodymatter : newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].interactivedata[asideData?.parent?.showHideType][indexes[2]].listdata.bodymatter;
                if (indexes.length === 7) { // Manifest List Item on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 9) { // Manifest List Item on 2 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // Manifest List Item on 3 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
            }else if(currentSlateData?.contents?.bodymatter[indexes[0]]?.type === 'element-aside'){
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].listdata.bodymatter;
                if (indexes.length === 6) { // Block list on 2 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 8) { // Block list on 3 level nesting
                    initialdata[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // level 4 
                    initialdata[indexes[2]].listitemdata.bodymatter[indexes[3]].listdata.bodymatter[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
            } else if (asideData?.parent?.type === MULTI_COLUMN && asideData?.parent?.subtype === TAB) {
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].listdata.bodymatter;
                switch (indexes.length) {
                    case 8: // TB:Tab:c1:BL Level 2 nesting
                        initialdata.splice(index, 0, createdElementData);
                        break;
                    case 10: // TB:Tab:c1:BL Level 3 nesting
                        initialdata[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                    case 12: // TB:Tab:c1:BL Level 4 nesting
                        initialdata[indexes[4]].listitemdata.bodymatter[indexes[5]].listdata.bodymatter[indexes[6]].listitemdata.bodymatter[indexes[7]].listdata.bodymatter.splice(index, 0, createdElementData);
                        break;
                }
            }
            else if(asideData.parent && asideData.parent.type === 'groupedcontent'){
                initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].listdata.bodymatter;
                if (indexes.length === 7) { // Manifest List Item on 1 level nesting
                    initialdata.splice(index, 0, createdElementData)
                }
                else if (indexes.length === 9) { // Manifest List Item on 2 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
                else { // Manifest List Item on 3 level nesting
                    initialdata[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter[indexes[5]].listitemdata.bodymatter[indexes[6]].listdata.bodymatter.splice(index, 0, createdElementData)
                }
            }
            else{
                 initialdata = newParentData[config.slateManifestURN].contents.bodymatter[indexes[0]].listdata.bodymatter;
                 if (indexes.length === 5) { // Manifest List Item on 1 level nesting
                     initialdata.splice(index, 0, createdElementData)
                 }
                 else if (indexes.length === 7) { // Manifest List Item on 2 level nesting
                     initialdata[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
                 else { // Manifest List Item on 3 level nesting
                     initialdata[indexes[1]].listitemdata.bodymatter[indexes[2]].listdata.bodymatter[indexes[3]].listitemdata.bodymatter[indexes[4]].listdata.bodymatter.splice(index, 0, createdElementData)
                 }
            }
            /* add a new tab element inside TB */
        } else if (type === slateWrapperConstants.TABBED_COLUMN_TAB) {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == asideData?.parentManifestUrn) {
                    item?.groupeddata?.bodymatter.splice(index, 0, createdElementData)
                }
            })
        } 
        else {
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
        }
        if (config.tcmStatus) {
            //This check is for the TEXT element which gets created inside BL on Shift+Enter
            if(!blockListDetails && !(cypressPlusProjectStatus && createdElementData?.type === 'element-pdf')) {
                //This check will be removed once BlockList will support TCM
                if(type !== "MANIFEST_LIST" && !isTbElement) {
                if (slateWrapperConstants.elementType.indexOf(type) !== -1) {
                    prepareDataForTcmCreate(type, createdElementData, getState, dispatch);
                }}
            }
        }
        const activeEditorId = tinymce && tinymce.activeEditor && tinymce.activeEditor.id
        replaceWirisClassAndAttr(activeEditorId)
        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        })
        /** ---------------------------- Auto-Numbering handling ------------------------------*/
        if (ELEMENT_TYPES_FOR_AUTO_NUMBER.includes(type) && isAutoNumberingEnabled) {
            let slateFigures = await getAutoNumberedElementsOnSlate(newParentData[config.slateManifestURN], { dispatch });
            if (slateFigures) {
                dispatch({
                    type: SLATE_FIGURE_ELEMENTS,
                    payload: {
                        slateFigures
                    }
                });
            }
            dispatch(handleAutonumberingOnCreate(type, createdElementData));
        }
        /**------------------------------------------------------------------------------------------------*/
        if (cb) {
            cb();
        }   
    }).catch(error => {
        // Opener Element mock creation

        if (type == "OPENER") {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            const parentData = getState().appStore.slateLevelData;
            const newParentData = JSON.parse(JSON.stringify(parentData));
            const createdElementData = openerData
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, createdElementData);
            dispatch({
                type: AUTHORING_ELEMENT_CREATED,
                payload: {
                    slateLevelData: newParentData
                }
            })
        }
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        console.log("create Api fail", error);
        if (cb) {
            cb();
        }
    })
}

export const appendElementInsideShowhide = (shObj, key, asideData, innerkey, index, createdElementData) => {
    shObj.interactivedata[key] && shObj.interactivedata[key].map((element) => {
        if (element.id === asideData.id) {
            element[innerkey].bodymatter.splice(index, 0, createdElementData);
        }
    })
}

/**
 * Calls Powerpaste API and appends elements to the slate
 * @param {Array} powerPasteData Elements to be pasted
 * @param {Number} index index of insertion
 */
export const createPowerPasteElements = (powerPasteData, index, parentUrn, asideData) => async (dispatch, getState) => {
    let data = []
    let slateEntityUrn = parentUrn && parentUrn.contentUrn || config.slateEntityURN
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
    const parentData = getState().appStore.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const currentSlateData = newParentData[config.slateManifestURN]
    localStorage.setItem('newElement', 1);
    let _requestData = {
        "content":data
    };
    if (asideData?.type === SHOW_HIDE) {
        _requestData.sectionType = asideData?.sectionType
    }
    let indexOfInsertion = index
    powerPasteData.forEach(pastedElement => {
        const newElement = {
            "html" : {
                text: pastedElement.html
            },
            ...slateWrapperConstants.elementDataByTag[pastedElement.tagName],
            index: indexOfInsertion++
        }
        data.push(newElement)
    });

    try {
        const url = `${config.REACT_APP_API_URL}v1/content/project/${config.projectUrn}/container/${slateEntityUrn}/powerpaste?index=${index}`
        const response = await axios.post(url, JSON.stringify(_requestData), {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        })

        /** -------------------------- TCM Snapshot Data handling ------------------------------*/
        let indexOfElement = 0
        while (indexOfElement < response.data.length) {
            if (slateWrapperConstants.elementType.indexOf("TEXT") !== -1){
                let containerElement = {
                    asideData: asideData?asideData:null,
                    parentUrn: parentUrn?parentUrn:null,
                    poetryData: null
                };
                if(asideData?.type === SHOW_HIDE) {
                    containerElement = prepareSnapshots_ShowHide(containerElement, ...response.data, index);
                }
                const slateData = {
                    currentParentData: newParentData,
                    bodymatter: currentSlateData.contents.bodymatter,
                    response: response.data[indexOfElement],
                    cypressPlusProjectStatus: getState()?.appStore?.isCypressPlusEnabled
                };
                if (currentSlateData.status === 'approved') {
                    await tcmSnapshotsForCreate(slateData, "TEXT", containerElement, dispatch);
                }
                else {
                    tcmSnapshotsForCreate(slateData, "TEXT", containerElement, dispatch);
                }

                config.tcmStatus && prepareDataForTcmCreate("TEXT", response.data[indexOfElement], getState, dispatch);
            }
            indexOfElement++
        }

        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return false;
        }

        if (asideData && asideData.type === 'groupedcontent') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item, i) => {
                if (item.id === asideData.id) {
                    item.groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter.splice(index, 0, ...response.data)
                }
            })
        } else if (asideData && asideData.type == 'element-aside') {
            newParentData[config.slateManifestURN].contents.bodymatter.map((item) => {
                if (item.id == parentUrn.manifestUrn) {
                    item.elementdata.bodymatter.splice(index, 0, ...response.data)
                } else if (item.type == "element-aside" && item.id == asideData.id) {
                    item.elementdata.bodymatter && item.elementdata.bodymatter.map((ele) => {
                        if (ele.id === parentUrn.manifestUrn) {
                            ele.contents.bodymatter.splice(index, 0, ...response.data)
                        }
                    })
                }
            })
        } else if (asideData?.type === SHOW_HIDE) {
            newParentData[config.slateManifestURN]?.contents?.bodymatter.map((item) => {
                if (item?.id === parentUrn?.manifestUrn) {
                    item?.interactivedata[asideData?.sectionType].splice(index, 0, ...response.data);
                }
            })
        }
        else {
            newParentData[config.slateManifestURN].contents.bodymatter.splice(index, 0, ...response.data);
        }
        
        dispatch({
            type: AUTHORING_ELEMENT_CREATED,
            payload: {
                slateLevelData: newParentData
            }
        });
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
    } catch (error) {
        console.error("Error in Powerpaste", error)
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
    }
    
}


export const swapElement = (dataObj, cb) => (dispatch, getState) => {
    const { oldIndex, newIndex, currentSlateEntityUrn, swappedElementData, containerTypeElem,
         asideId, poetryId, parentElement, elementIndex, sectionType } = dataObj || {};
    const slateId = config.slateManifestURN;
    swappedElementData.slateEntityUrn = currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN;

    let _requestData = {
        "projectUrn": config.projectUrn,
        "currentSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
        "destSlateEntityUrn": currentSlateEntityUrn ? currentSlateEntityUrn : config.slateEntityURN,
        "workUrn": swappedElementData.id,
        "entityUrn": swappedElementData.contentUrn,
        "type": swappedElementData.type,
        "index": newIndex
    }
    /* If swapping for inner elements of showhide then add section type also, show|hide */
    if(containerTypeElem === SHOW_HIDE){
        _requestData.sectionType = sectionType   
    }
    let parentData = getState().appStore.slateLevelData;
    let currentParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = currentParentData[config.slateManifestURN];
    config.swappedElementType = _requestData.type;
    config.swappedElementIndex = _requestData.index;
    config.citationFlag= true;
    return axios.post(`${config.REACT_APP_API_URL}v1/slate/swap`,
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        })
        .then((responseData) => {
            if (responseData && responseData.status == '200') {

                /* For hiding the spinning loader send HideLoader message to Wrapper component */
                sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
                let newParentData = JSON.parse(JSON.stringify(parentData));
                if (currentSlateData.status === 'approved') {
                    if(currentSlateData.type==="popup"){
                        sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                        dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
                    }
                    else{
                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
                        sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
                    }
                    return false;
                }
                let newBodymatter = newParentData[slateId]?.contents?.bodymatter;
                if(containerTypeElem === SHOW_HIDE) { /* Swap inner elements of ShowHide */
                    const indexes = elementIndex?.toString().split('-') || [];
                    /* Get the showhide element object from slate data using indexes */
                    const shObject = getShowHideElement(newBodymatter, (indexes?.length + 2), indexes, null, parentElement?.asideData);
                    /* After getting showhide Object, swap the elements */
                    if(!isEmpty(shObject) && shObject?.contentUrn === currentSlateEntityUrn) {
                        shObject?.interactivedata[sectionType]?.move(oldIndex, newIndex);
                    }
                }
                else if (containerTypeElem && containerTypeElem == 'we') {
                    //swap WE element
                    const indexs = elementIndex?.toString().split('-') || [];
                    let sectionType = parentElement?.showHideType;
                    /* TB->Tab->AS/WE->HEAD: Swap Elements */
                    if(parentElement?.type === ElementConstants.MULTI_COLUMN && parentElement?.subtype === ElementConstants.TAB && indexs?.length === 4) { 
                        let asid = newBodymatter[indexs[0]]?.groupeddata?.bodymatter[indexs[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[indexs[2]]?.groupdata?.bodymatter[indexs[3]];
                        if (asid.contentUrn == currentSlateEntityUrn) {
                            asid?.elementdata?.bodymatter?.move(oldIndex, newIndex);
                        }
                    } else if(parentElement?.type === "groupedcontent" && indexs?.length === 3) { /* 2C:AS: Swap Elements */
                        let asid = newBodymatter[indexs[0]]?.groupeddata?.bodymatter[indexs[1]]?.groupdata?.bodymatter[indexs[2]];
                        if (asid.contentUrn == currentSlateEntityUrn) {
                            asid?.elementdata?.bodymatter?.move(oldIndex, newIndex);
                        }
                    } else if (parentElement?.type === SHOW_HIDE && sectionType && indexs?.length === 3) { /* S/H:AS: Swap Elements */
                        let asId = newBodymatter[indexs[0]]?.interactivedata[sectionType][indexs[2]];
                        if (asId.contentUrn == currentSlateEntityUrn) {
                            asId?.elementdata?.bodymatter?.move(oldIndex, newIndex);
                        }
                    } else {
                        for (let i in newBodymatter) {
                            if (newBodymatter[i].contentUrn == currentSlateEntityUrn) {
                                newBodymatter[i].elementdata.bodymatter.move(oldIndex, newIndex);
                            }
                        }
                    }
                } else if (containerTypeElem && containerTypeElem == 'section') {
                    const indexs = elementIndex?.toString().split('-') || [];
                    let sectionType = parentElement?.showHideType;
                    /* TB->Tab->AS/WE->HEAD: Swap Elements */
                    if(parentElement?.type === ElementConstants.MULTI_COLUMN && parentElement?.subtype === ElementConstants.TAB && indexs?.length === 4) { 
                        newBodymatter[indexs[0]]?.groupeddata?.bodymatter[indexs[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[indexs[2]]?.groupdata?.bodymatter[indexs[3]]?.elementdata?.bodymatter?.map(item => {
                            if (item.contentUrn == currentSlateEntityUrn) {
                                item?.contents?.bodymatter?.move(oldIndex, newIndex);
                            }
                        })
                    } else if(parentElement?.type === "groupedcontent" && indexs?.length === 3) { /* 2C:WE:BODY:SECTION-BREAK: Swap Elements */
                        newBodymatter[indexs[0]]?.groupeddata?.bodymatter[indexs[1]]?.groupdata?.bodymatter[indexs[2]]?.elementdata?.bodymatter?.map(item => {
                            if (item.contentUrn == currentSlateEntityUrn) {
                                item?.contents?.bodymatter?.move(oldIndex, newIndex);
                            }
                        })
                    } else if (parentElement?.type === SHOW_HIDE && sectionType && indexs?.length === 3) { /* S/H:WE:BODY:SECTION-BREAK: Swap Elements */
                        newBodymatter[indexs[0]]?.interactivedata[sectionType][indexs[2]]?.elementdata?.bodymatter?.map(item => {
                            if (item.contentUrn == currentSlateEntityUrn) {
                                item?.contents?.bodymatter?.move(oldIndex, newIndex);
                            }
                        })
                    } else {
                        newBodymatter.forEach(element => {
                            if (element.id == asideId) {
                                element.elementdata.bodymatter.forEach((nestedElem) => {
                                    if (nestedElem.contentUrn == currentSlateEntityUrn) {
                                        nestedElem.contents.bodymatter.move(oldIndex, newIndex);
                                    }
                                })
                            }
                        });
                    }
                } 
                /** ----------Swapping elements inside Citations Group Element----------------- */
                else if (containerTypeElem && containerTypeElem == 'cg') {
                    const indexs = elementIndex?.split('-') || [];
                    let sectionType = parentElement?.showHideType;
                    if (parentElement?.type === SHOW_HIDE && sectionType && indexs?.length === 3) { /* S/H:CG: Swap Elements */
                        let cgId = newBodymatter[indexs[0]]?.interactivedata[sectionType][indexs[2]];
                        if (cgId.contentUrn == currentSlateEntityUrn) {
                            cgId?.contents?.bodymatter?.move(oldIndex, newIndex);
                        }
                    } else {
                        for (let i in newBodymatter) {
                            if (newBodymatter[i].contentUrn == currentSlateEntityUrn) {
                                newBodymatter[i].contents.bodymatter.move(oldIndex, newIndex);
                            }
                        }
                    }
                }
                else if (containerTypeElem && containerTypeElem == 'pe') {
                    newBodymatter.forEach(element => {
                        if (element.id == poetryId) {
                            element.contents.bodymatter.move(oldIndex, newIndex);
                        } else if (element?.type === 'element-aside') {  /** ----------Swapping block poetry elements inside Aside/WE Element----------------- */
                            element.elementdata?.bodymatter.forEach((ele) => {
                                if (ele?.type === "poetry" && ele?.id === poetryId) {
                                    ele.contents.bodymatter.move(oldIndex, newIndex);
                                } else if (ele.type === "manifest") {
                                    ele.contents.bodymatter.forEach(ele1 => {
                                        if (ele1.id === poetryId) {
                                            ele1.contents.bodymatter.move(oldIndex, newIndex);
                                        }
                                    })
                                }
                            })
                            /** ----------Swapping block poetry elements inside Tab Element----------------- */
                        } else if (element?.type === ElementConstants.MULTI_COLUMN && element?.subtype === ElementConstants.TAB) {
                            const indexs = elementIndex?.split('-') || [];
                            let poetryElement = newBodymatter[indexs[0]]?.groupeddata?.bodymatter[indexs[1]]?.groupdata?.bodymatter[0].groupeddata?.bodymatter[indexs[2]]?.groupdata?.bodymatter[indexs[3]];
                            if (poetryElement?.type === "poetry" && poetryElement?.id === poetryId) {
                                poetryElement.contents.bodymatter.move(oldIndex, newIndex);
                            }
                        } else if(element?.type === "groupedcontent"){  /** ----------Swapping block poetry elements inside Multicolumn Element----------------- */
                            element.groupeddata?.bodymatter.forEach((groupElem)=> {
                                groupElem.groupdata?.bodymatter.forEach((groupElem1)=>{
                                    if(groupElem1?.type ==="poetry" && groupElem1?.id === poetryId){
                                        groupElem1.contents.bodymatter.move(oldIndex, newIndex);
                                    }
                                })

                            })
                        // handling local redux state for swapping of stanzas inside SH->Poetry  
                        } else if (element?.type === "showhide" && sectionType) {
                            element?.interactivedata[sectionType].forEach((eachElement)=>{
                                if(eachElement?.type === "poetry" && eachElement?.id === poetryId) {
                                    eachElement.contents.bodymatter.move(oldIndex, newIndex);
                                }
                            });
                        }
                    });
                }
                else if (containerTypeElem && containerTypeElem == '2C') {
                    newBodymatter[dataObj.containerIndex].groupeddata.bodymatter[dataObj.columnIndex].groupdata.bodymatter.move(oldIndex, newIndex);
                    /* newBodymatter.forEach(element => {
                        if (element.id == poetryId) {
                            element.contents.bodymatter.move(oldIndex, newIndex);
                        }
                    }); */
                }
                else if (containerTypeElem && containerTypeElem == '3C') {
                    newBodymatter[dataObj.containerIndex].groupeddata.bodymatter[dataObj.columnIndex].groupdata.bodymatter.move(oldIndex, newIndex);
                } else if (containerTypeElem && containerTypeElem == 'TB') {
                    newBodymatter[dataObj.containerIndex].groupeddata.bodymatter.move(oldIndex, newIndex);
                } else if (containerTypeElem && containerTypeElem == 'Tab') {
                    const indexes = dataObj?.containerIndex?.split('-') || [];
                    newBodymatter[indexes[0]].groupeddata.bodymatter[[indexes[1]]].groupdata.bodymatter[0].groupeddata.bodymatter[[dataObj.columnIndex]].groupdata.bodymatter.move(oldIndex, newIndex);
                } else {
                    newParentData[slateId].contents.bodymatter.move(oldIndex, newIndex);
                }

                newParentData = JSON.parse(JSON.stringify(newParentData));

                dispatch({
                    type: SWAP_ELEMENT,
                    payload: {
                        slateLevelData: newParentData,
                    }
                })
                /** ---------------------------- Auto-Numbering handling ------------------------------*/
                const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled;
                const params = {
                    getState,
                    dispatch,
                    currentSlateData: newParentData[slateId],
                    swappedElementData
                }
                handleAutoNumberingOnSwapping(isAutoNumberingEnabled, params)
                /**-----------------------------------------------------------------------------------*/
                cb(newParentData)
            }

        })
        .catch((err) => {
            /* For hiding the spinning loader send HideLoader message to Wrapper component */
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
            dispatch({type: ERROR_POPUP, payload:{show: true}})
            console.log('Error occured while swaping element', err)
        })
}

export const setSplittedElementIndex = (index) => (dispatch, getState) => {
    return dispatch({
        type: SET_SPLIT_INDEX,
        payload: index
    })
}
export const handleSplitSlate = (newSlateObj) => (dispatch, getState) => {
    let slateDataList = []
    let splitIndex = getState().appStore.splittedElementIndex
    let oldSlateData = {
        "id": config.slateManifestURN,
        "type": "manifest",
        "contents": {
            "frontmatter": [],
            "bodymatter": [],
            "backmatter": []
        },
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "contentUrn": config.slateEntityURN,
        "versionUrn": config.slateManifestURN
    }
    let newSlateData = {
        "id": newSlateObj.containerUrn,
        "type": "manifest",
        "contents": {
            "frontmatter": [],
            "bodymatter": [],
            "backmatter": []
        },
        "schema": "http://schemas.pearson.com/wip-authoring/manifest/1",
        "contentUrn": newSlateObj.entityUrn,
        "versionUrn": newSlateObj.containerUrn
    }

    slateDataList.push(oldSlateData, newSlateData)
    let slateLevelData = getState().appStore.slateLevelData[config.slateManifestURN];
    let oldSlateBodymatterLocal = slateLevelData.contents.bodymatter;
    oldSlateBodymatterLocal.splice(splitIndex)
    slateLevelData.contents.bodymatter = oldSlateBodymatterLocal;
    return axios.put(
        `${config.REACT_APP_API_URL}v1/slate/split/${config.projectUrn}/${config.slateEntityURN}/${splitIndex}`,
        JSON.stringify({ slateDataList }),
        {
            headers: {
                "Content-Type": "application/json",
                'myCloudProxySession': config.myCloudProxySession
            }
        }
    ).then(res => {
        // Perform TCM splitSlate
        /**
        axios({
            method: 'patch',
            url: '/cypress/trackchanges-srvr/splitslatetcm',
            timeout: 1000,
            headers: { "Content-Type": "application/json", "PearsonSSOSession": config.ssoToken },
            data: {
                "splitSlateDurn": config.projectUrn, "splitSlateEurn": newSlateObj.entityUrn, "oldSlateUrn": config.slateManifestURN
            }
        })
        .then(response => {
            console.log("TCM split slate API success : ", response)
        })
        .catch(error => {
            console.log("TCM split slate API error : ", error)
        })
        */
        // Update selection store data after split
        let selection = getState().selectionReducer.selection || {};
        if(Object.keys(selection).length > 0 && selection.sourceSlateEntityUrn === config.slateEntityURN && selection.sourceElementIndex >= splitIndex) {
            selection.sourceSlateEntityUrn = newSlateObj.entityUrn;
            selection.sourceSlateManifestUrn = newSlateObj.containerUrn;
            selection.element.slateVersionUrn = newSlateObj.containerUrn;

            if('deleteElm' in selection && Object.keys(selection.deleteElm).length > 0) {
                selection.deleteElm.cutCopyParentUrn.contentUrn = newSlateObj.entityUrn;
                selection.deleteElm.cutCopyParentUrn.manifestUrn = newSlateObj.containerUrn;
                selection.deleteElm.cutCopyParentUrn.slateLevelData = null;
                selection.deleteElm.index = (selection.sourceElementIndex - splitIndex);
            }

            selection.sourceElementIndex = (selection.sourceElementIndex - splitIndex);
            dispatch({ type: SET_SELECTION, payload: selection });
        }

        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        let parentData = getState().appStore.slateLevelData;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        if (currentSlateData.status === 'approved') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            return;
        }
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: {
                [config.slateManifestURN]: slateLevelData,
            }
        })
    }).catch(error => {
        //console.log("SPLIT SLATE API ERROR : ", error)
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        dispatch({type: ERROR_POPUP, payload:{show: true}})
    })
}

/**
 * setElementPageNumber | is to set page number relative to element back to store and backend
 * @param {object} numberObject , contains pagenumber object relative to element
 */
export const setElementPageNumber = (numberObject) => (dispatch, getState) => {
    const { pageNumberData } = getState().appStore;
    let { id, type, pageid, pagenumber } = numberObject;
    // if pagenumber data is not present for current element
    if (!pageNumberData.hasOwnProperty(id)) {
        let newPageNumber = {
            id: id,
            type: type,
            pagereference: {
                pageid: pageid,
                pagenumber: pagenumber
            }
        }
        pageNumberData[id] = newPageNumber;
    }
    else {
        let existingPageNumber = pageNumberData[id];
        let { pagereference } = existingPageNumber;
        if (pagereference.pagenumber) {
            pagereference.pagenumber = pagenumber;
        }
        else {
            existingPageNumber.pagereference = {
                pageid: pageid,
                pagenumber: pagenumber
            }
        }
    }
    dispatch({
        type: GET_PAGE_NUMBER,
        payload: pageNumberData
    })
}

export const updatePageNumber = (pagenumber, elementId, asideData, parentUrn) => (dispatch, getState) => {
    dispatch({
        type: UPDATE_PAGENUMBER,
        payload: {
            pageLoading: true
        }
    })
    let data = {
        pageNumber: pagenumber
    }
    if (data.pageNumber) {
        return axios.put(
            `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementId}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'ApiKey': config.OPENER_ELEMENT_COREAPI_KEY,
                    'myCloudProxySession': config.myCloudProxySession
                }
            }
        ).then(res => {
            let pageNumberData = getState().appStore.pageNumberData;
            pageNumberData.forEach(function (element, index) {
                if (element.id.indexOf(elementId) !== -1) {
                    pageNumberData[index]["id"] = elementId
                    pageNumberData[index]["pageNumber"] = pagenumber
                }
            });
            dispatch({
                type: GET_PAGE_NUMBER,
                payload: {
                    pageNumberData: pageNumberData,
                    allElemPageData : getState().appStore.allElemPageData

                }
            });
            dispatch({
                type: UPDATE_PAGENUMBER_SUCCESS,
                payload: {
                    pageLoading: false
                }
            })
        }).catch(error => {
            dispatch({
                type: UPDATE_PAGENUMBER_FAIL,
                payload: {
                    pageLoading: false
                }
            })
            console.log("UPDATE PAGE NUMBER ERROR : ", error)
            dispatch({type: ERROR_POPUP, payload:{show: true}})
        })
    }
    else {
        return axios.delete(
            `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'ApiKey': config.OPENER_ELEMENT_COREAPI_KEY,
                    'myCloudProxySession': config.myCloudProxySession
                }
            }
        ).then(res => {
            let pageNumberData = getState().appStore.pageNumberData;
            let allElemPageData = getState().appStore.allElemPageData;
            pageNumberData = pageNumberData && pageNumberData.filter(function (pageNumber) {
            return !pageNumber.id.includes(elementId);
        });
        if(allElemPageData && allElemPageData.length >0){
            allElemPageData = allElemPageData.filter(ele => { return ele != elementId;});
        }
       
        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {pageNumberData: pageNumberData,
                allElemPageData : allElemPageData}
        });
            dispatch({
                type: UPDATE_PAGENUMBER_SUCCESS,
                payload: {
                    pageLoading: false
                }
            })
        }).catch(error => {
            dispatch({
                type: UPDATE_PAGENUMBER_FAIL,
                payload: {
                    pageLoading: false
                }
            })
            console.log("DELETE PAGE NUMBER ERROR : ", error)
        if(!(error.response.status===404 && error.response.data.message==="Not Found")){
                dispatch({type: ERROR_POPUP, payload:{show: true}})
            }
        })
    }
}

export const setUpdatedSlateTitle = (newSlateObj) => (dispatch, getState) => {
    return dispatch({
        type: SET_UPDATED_SLATE_TITLE,
        payload: newSlateObj
    })
}

export const setSlateType = (slateType) => (dispatch, getState) => {
    return dispatch({
        type: SET_SLATE_TYPE,
        payload: slateType
    })
}
// calling this function in communicationChannel 
export const cypressPlusEnabled = (flag, configValue) => dispatch => {
    return dispatch({
        type: CYPRESS_PLUS_ENABLED,
        payload: {
          isCypressPlusEnabled: flag && configValue
        }
    });
}

export const setSlateEntity = (setSlateEntityParams) => (dispatch, getState) => {
    return dispatch({
        type: SET_SLATE_ENTITY,
        payload: setSlateEntityParams
    })
}

export const accessDenied = (value) => (dispatch, getState) => {
    dispatch({
        type: ACCESS_DENIED_POPUP,
        payload: value
    })
}
export const setSlateParent = (setSlateParentParams) => (dispatch, getState) => {
    return dispatch({
        type: SET_PARENT_NODE,
        payload: setSlateParentParams
    })
}
export const setSlateMatterType = (setSlateParentParams) => (dispatch, getState) => {
    return dispatch({
        type: SET_SLATE_MATTER_TYPE,
        payload: setSlateParentParams
    })
}
export const getPageNumber = (elementID) => (dispatch, getState) => {
    dispatch({
        type: PAGE_NUMBER_LOADER,
        payload: {
            pageNumberLoading: true
        }
    })
    let pageNumberData = getState().appStore.pageNumberData;
    let allElemPageData = getState().appStore.allElemPageData;
    allElemPageData.push(elementID)
    let url = `${config.PAGE_NUMBER_UPDATE_ENDPOINT}/v2/pageNumberMapping/${elementID}`;
    return axios.get(url, {
        headers: {
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then((response) => {
        let newPageNumber = {
            id: elementID,
            pageNumber: response.data.pageNumber
        }
        pageNumberData.push(newPageNumber)
        config.pageNumberInProcess = true;

        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData:pageNumberData,
                allElemPageData:allElemPageData
            }
        });
        dispatch({
            type: PAGE_NUMBER_LOADER,
            payload: {
                pageNumberLoading: false
            }
        })
       return response.data;
    }).catch((error) => {
        console.log(error)
        let newPageNumber = {
            id: elementID,
            pageNumber: ""
        }
        pageNumberData.push(newPageNumber)
        config.pageNumberInProcess = true;
        dispatch({
            type: GET_PAGE_NUMBER,
            payload: {
                pageNumberData:pageNumberData,
                allElemPageData:allElemPageData
            }
        });
        dispatch({
            type: PAGE_NUMBER_LOADER,
            payload: {
                pageNumberLoading: false
            }
        })
    })
}
export const pageData = (pageNumberData) => (dispatch, getState) => {
    dispatch({
        type: GET_PAGE_NUMBER,
        payload: {
            pageNumberData:pageNumberData,
            allElemPageData : getState().appStore.allElemPageData
        }
    });
}

const fetchContainerData = (entityURN, manifestURN, isPopup) => {
    let apiUrl = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}`;
    if (isPopup) {
        apiUrl = `${apiUrl}?metadata=true`
    }
    return axios.get(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
})
}


export const pasteElement = (params) => async (dispatch, getState) => {
    let selection = getState().selectionReducer.selection || {};
    let allComments = getState().commentsPanelReducer.allComments;
    if(Object.keys(selection).length > 0 && 'element' in selection) {
        const {
            index,
            parentUrn,
            asideData,
            poetryData, sectionType, index2ShowHide
        } = params
        config.currentInsertedIndex = index;
        localStorage.setItem('newElement', 1);
        const isAutoNumberingEnabled = getState().autoNumberReducer.isAutoNumberingEnabled;

        let slateEntityUrn = config.slateEntityURN;
        if(parentUrn && 'contentUrn' in parentUrn) { //sectionType && 
            slateEntityUrn = parentUrn.contentUrn;
        } else if(poetryData && 'contentUrn' in poetryData) {
            slateEntityUrn = poetryData.contentUrn;
        }

        let cutIndex = index;
        let elmExist = false;
        if(slateEntityUrn === config.slateEntityURN && selection.sourceSlateEntityUrn === config.slateEntityURN && selection.operationType === 'cut') {
            elmExist = await checkElementExistence(config.slateEntityURN, selection.element.id);
            if(cutIndex > selection.sourceElementIndex) {
                cutIndex -= elmExist ? 1 : 0;
            }
        }

        if(slateEntityUrn !== config.slateEntityURN && selection.sourceEntityUrn === slateEntityUrn && selection.operationType === 'cut') {
            elmExist = await checkElementExistence(config.slateEntityURN, selection.element.id);
            let elmIndexes = selection.sourceElementIndex.split('-');
            let sourceElementIndex = elmIndexes[elmIndexes.length -1];
            if(cutIndex > sourceElementIndex) {
                cutIndex -= elmExist ? 1 : 0;
            }
        }
        
        let elmHtml = ('html' in selection.element) ? selection.element.html : {};
        let elmType = ['figure'];
        let elmSubtype = ['assessment'];
        if(elmType.indexOf(selection.element.type) >= 0 && 
            'figuretype' in selection.element && elmSubtype.indexOf(selection.element.type) >= 0) {
            if(!('html' in selection.element)) {
                elmHtml = { "title": selection.element.title.text || "" }
            }
        }
        if (elmSubtype.indexOf(selection.element.figuretype) >= 0) {
            if(!('html' in selection.element)) {
                elmHtml = { "title": selection.element.title.text || "" }
            } else if (!('title' in selection.element.html)) {
                elmHtml = { 
                    ...elmHtml,
                    "title": "" 
                }
            }
        }
        
        if(selection.operationType === 'copy' && 'html' in selection.element && 'text' in  selection.element.html) {
            let htmlText = (selection.element.html.text);
            htmlText = htmlText.replace(/(\"page-link-[0-9]{1,2}-[0-9]{2,4}\")/gi, () => `"page-link-${Math.floor(Math.random() * 100)}-${Math.floor(Math.random() * 10000)}"`);
            selection.element.html.text = htmlText;
        }

        let _requestData = {
            "content": [{
                "type": selection.element.type,
                "index": cutIndex,
                "inputType": selection.inputType,
                "inputSubType": selection.inputSubType,
                "schema": selection.element.schema,
                "html": elmHtml,
                "slateVersionUrn": selection.sourceSlateManifestUrn,
                "id": selection.element.id,
                "elementParentEntityUrn": selection.sourceEntityUrn,// selection.sourceSlateEntityUrn,
                "versionUrn": selection.element.versionUrn,
                "contentUrn": selection.element.contentUrn,
                "destinationSlateUrn": slateEntityUrn
            }]
        };
        /* if parent Element type showhide then add sectionType where element tobe paste */
        if(sectionType) {
            _requestData.content[0].sectionType = sectionType;
            _requestData.content[0].index = index;
            if(selection?.operationType === "cut") {
                const isSameSection = asideData?.interactivedata?.[sectionType]?.find(item => {
                    return (item?.id === selection?.element?.id);
                })
                if(isSameSection) {
                    _requestData.content[0].index = cutIndex;
                }
            }
        }

        if(selection.operationType.toUpperCase() === "COPY") {
            delete _requestData.content[0].slateVersionUrn;
            delete _requestData.content[0].id;
            delete _requestData.content[0].versionUrn;
            delete _requestData.content[0].contentUrn;
        }

        if(selection.element.type === "discussion") {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "blockdata": selection.element.blockdata
                }]
            }
        }

        if (selection.element.type === "figure") {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "figuredata": selection.element.figuredata
                }]
            }
            // Check for autonumbering parameters needs to send or not in request
            if (isAutoNumberingEnabled && autoNumberFigureTypesAllowed.includes(selection?.element?.figuretype)) {
                if (selection?.element.hasOwnProperty(MANUAL_OVERRIDE) && selection?.element[MANUAL_OVERRIDE] !== undefined && Object.keys(selection?.element[MANUAL_OVERRIDE])?.length > 0) {
                    _requestData = {
                        "content": [{
                            ..._requestData.content[0],
                            'displayedlabel': selection?.element?.displayedlabel,
                            'manualoverride': selection?.element[MANUAL_OVERRIDE],
                            'numberedandlabel': selection?.element[NUMBERED_AND_LABEL]
                        }]
                    }
                } else {
                    _requestData = {
                        "content": [{
                            ..._requestData.content[0],
                            'displayedlabel': selection?.element?.displayedlabel,
                            'numberedandlabel': selection?.element[NUMBERED_AND_LABEL]
                        }]
                    }
                }
            }
        }

        if(selection.element.type === "element-dialogue") {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "elementdata": selection.element.elementdata
                }]
            }
        }
        
        const acceptedTypes=["element-aside","citations","poetry","groupedcontent","workedexample",'showhide','popup','manifestlist']
        if(acceptedTypes.includes(selection.element.type)) {
            const payloadParams = {
                ...params,
                cutIndex,
                selection
            }
            const { setPayloadForContainerCopyPaste } = (await import("./slateWrapperAction_helper.js"))
            _requestData = setPayloadForContainerCopyPaste(payloadParams)
            if (sectionType || (asideData?.sectionType)) {
                let section = sectionType ? sectionType : asideData?.sectionType;
                _requestData.content[0].sectionType = section;
            }
            if (selection?.element?.type === 'element-aside' && selection?.element?.html?.title) {
                _requestData.content[0].html = selection.element.html;

            }

            // Check for autonumbering parameters needs to send or not in request
            if (isAutoNumberingEnabled && autoNumberContainerTypesAllowed.includes(selection?.element?.type)) {
                if (selection?.element.hasOwnProperty(MANUAL_OVERRIDE) && selection?.element[MANUAL_OVERRIDE] !== undefined && Object.keys(selection?.element[MANUAL_OVERRIDE])?.length > 0) {
                    _requestData = {
                        "content": [{
                            ..._requestData.content[0],
                            'displayedlabel': selection?.element?.displayedlabel,
                            'manualoverride': selection?.element[MANUAL_OVERRIDE],
                            'numberedandlabel': selection?.element[NUMBERED_AND_LABEL]
                        }]
                    }
                } else {
                    _requestData = {
                        "content": [{
                            ..._requestData.content[0],
                            'displayedlabel': selection?.element?.displayedlabel,
                            'numberedandlabel': selection?.element[NUMBERED_AND_LABEL]
                        }]
                    }
                }
            }
        }

        if('manifestationUrn' in selection.element) {
            _requestData = {
                "content": [{
                    ..._requestData.content[0],
                    "manifestationUrn": selection.element.manifestationUrn
                }]
            }
        }
        /** Cut-Copy TCM snapshots API Payload Params*/
        let tcmSnapshotParams = {
            selection,
            asideData,
            parentUrn,
            elementType: selection.element.type,
            projectUrn: config.projectUrn,
            destnSlateManifestURN: config.slateManifestURN,
            destnSlateEntityURN: config.slateEntityURN
        }
        try {
            let url = `${config.REACT_APP_API_URL}v1/projects/${config.projectUrn}/containers/${slateEntityUrn}/element/paste?type=${selection.operationType.toUpperCase()}`
            const createdElemData = await axios.post(
                url,
                JSON.stringify(_requestData),
                {
                    headers: {
                        "Content-Type": "application/json",
                        'myCloudProxySession': config.myCloudProxySession
                    }
                }
            )
            if (createdElemData && createdElemData.status == '200') {
                let responseData = Object.values(createdElemData.data)
                const figureTypes = ["image", "mathImage", "table", "video", "audio"]
                const interactiveType = ["3rd-party", "pdf", "web-link", "pop-up-web-link", "table"]

                // Condition to check whether any conatiner element got copy and paste. Fetch new conatiner data for the same.
                if(selection.operationType === 'copy' && _requestData.content[0].hasOwnProperty('id') && _requestData.content[0].id.includes('manifest')){
                    let isPopup;
                    if (_requestData?.content[0]?.type === 'popup') {
                        isPopup = true
                    }
                    let response =  await fetchContainerData(_requestData.content[0].contentUrn,_requestData.content[0].id,isPopup);
                    responseData = [response.data[_requestData.content[0].id]]
                 }

                if((responseData[0]?.type === "figure") && (figureTypes.includes(responseData[0]?.figuretype))  || interactiveType.includes(responseData[0]?.figuredata?.interactivetype)){
                    const elementId = responseData[0].id
                    handleAlfrescoSiteUrl(elementId, selection.alfrescoSiteData)   
                }
                const pasteSuccessArgs = {
                    responseData: responseData[0],
                    index,
                    cutIndex,
                    dispatch,
                    getState,
                    elmExist,
                    parentUrn,
                    asideData,
                    poetryData,
                    slateEntityUrn, index2ShowHide, pasteSHIndex: _requestData?.content[0]?.index
                };
                await onPasteSuccess(pasteSuccessArgs)
                /** Cut-Copy TCM snapshots API */
                if (_requestData?.content[0]?.type === 'popup') {
                    tcmSnapshotParams.elementId = responseData[0].id
                    tcmSnapshotParams.elementNewEntityUrn = responseData[0]?.contentUrn
                    tcmSnapshotParams.elementStatus = responseData[0]?.status
                    let tcmSnapshotPayload = preparePayloadData(tcmSnapshotParams)
                    if (selection?.operationType === 'copy' || (selection?.operationType === 'cut' && responseData[0]?.status === 'wip')) {
                        callCutCopySnapshotAPI(tcmSnapshotPayload,isAutoNumberingEnabled)
                    }
                }
                if (selection?.element?.type === 'element-aside') {
                    const { element } = selection;
                    let hasAsideTitleData = element?.html?.title && (element.html.title !== "<p class='paragraphNumeroUno'></p>" && element.html.title !== "<p></p>") ? true : false;
                    const newToggleValue = hasAsideTitleData ? true : false;
                    const asideTitleData = getState()?.appStore?.asideTitleData
                    const setFieldsForAside = (elem, titleData) => {
                        if (elem && titleData) {
                            const asideObj = titleData.filter(obj => {
                                return obj.elementId === elem.id;
                            })
                            if (asideObj.length) {
                                return asideObj[0].isAsideNumber;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }

                    const asideTitleStatus = setFieldsForAside(element, asideTitleData)
                    dispatch(enableAsideNumbering(newToggleValue, element.id));
                    if (asideTitleStatus) {
                        dispatch(enableAsideNumbering(asideTitleStatus, responseData[0]?.id));
                    }
                }
                /******************************/
                if (responseData[0].elementdata?.type === "blockquote") {  
                    setTimeout(() => {
                        const node1 = document.querySelector(`[data-id="${responseData[0].id}"]`)
                        const node2 = node1?.querySelector(`.paragraphNummerEins`)
                        node2?.focus()
                    }, 200)
                }
                let anyOpenComment = allComments?.filter(({ commentOnEntity }) => commentOnEntity === selection?.element?.id).length > 0
                if((selection.operationType === 'cut') && (anyOpenComment) ) {
                    sendDataToIframe({'type': 'refreshCM', 'message': {status: true}})
                }
            }
        }
        catch(error) {
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
            console.error("Exceptional Error on pasting the element:::", error);   
        }
    }
}
export const wirisAltTextPopup = (data) => (dispatch) => {
    return dispatch({
        type: WIRIS_ALT_TEXT_POPUP,
        payload: data
    })
}

/**
 * Calls the clone API to get the request ID
 * @param {*} insertionIndex index of insertion
 * @param {*} manifestUrn container urn
 */
export const cloneContainer = (insertionIndex, manifestUrn,parentUrn,asideData) => async (dispatch) => {
    try {
        //Clone container
        const cloneApiUrl = `${config.AUDIO_NARRATION_URL}container/${manifestUrn}/clone`
        const cloneResponse = await axios.post(
            cloneApiUrl,
            null,
            {
                headers: {
                    "ApiKey": config.STRUCTURE_APIKEY,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'myCloudProxySession': config.myCloudProxySession
                }
            }
        )
        const requestId = cloneResponse.data.message.split(",")[1].replace(" request id:","")

        //Fetch Status
        const fetchAndPasteArgs = {
            insertionIndex,
            requestId,
            dispatch,
            pasteElement,
            parentUrn,
            asideData
        }
        await (await import("./slateWrapperAction_helper.js")).fetchStatusAndPaste(fetchAndPasteArgs)  
    }
    catch(error) {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } })
        console.error("Error in cloning the container:::", error);
    }
}

export const saveCaretPosition = (caretPosition) => (dispatch, getState) => {
    return dispatch({
        type: UPDATE_CARET_OFFSET,
        payload: caretPosition
    });
}

export const slateVersioning = (updateRCSlate) => (dispatch, getState) => {
    // Api to change container status from approved to WIP
    const versioningStatus = `${config.REACT_APP_API_URL}v1/project/${config.projectUrn}/container/${config.slateEntityURN}/newversion?isRCEnabled=${updateRCSlate}`;
    return axios.post(versioningStatus, null, {
        headers: {
            "Content-Type": "application/json",
            'myCloudProxySession': config.myCloudProxySession
        }
    }).then(response => {
        if(response?.data?.status === "success"){
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });      // for Toc Slate Refresh
            sendDataToIframe({ 'type': 'slateVersionStatus', 'message': false });
        }
    }).catch(error => {
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: false } })
        console.log("error", error)
    })
}