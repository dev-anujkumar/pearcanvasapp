import axios from 'axios';
import config from '../../config/config';
import {
	FETCH_SLATE_DATA,
	SET_ACTIVE_ELEMENT,
	OPEN_POPUP_SLATE,
	CLOSE_POPUP_SLATE,
    SET_OLD_IMAGE_PATH,
    AUTHORING_ELEMENT_UPDATE,
    SET_PARENT_ASIDE_DATA,
    SET_PARENT_SHOW_DATA,
    ERROR_POPUP,
    SLATE_TITLE
} from '../../constants/Action_Constants';
import { fetchComments, fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action';
import elementTypes from './../Sidebar/elementTypes';
import { sendDataToIframe, requestConfigURI } from '../../constants/utility.js';
import { HideLoader } from '../../constants/IFrameMessageTypes.js';
import elementDataBank from './elementDataBank'
import figureData from '../ElementFigure/figureTypes.js';
import {poetryElem} from '../../../fixtures/ElementPoetryTestData'
import { fetchAllSlatesData, setCurrentSlateAncestorData } from '../../js/getAllSlatesData.js';
const findElementType = (element, index) => {
    let elementType = {};
    elementType['tag'] = '';
    let altText = "";
    let longDesc = "";
    try {
        switch (element.type) {
            case 'element-authoredtext':
                elementType['elementType'] = elementDataBank[element.type]["elementType"];
                if ('elementdata' in element && 'headers' in element.elementdata && element.elementdata.headers) {
                    elementType['primaryOption'] = elementDataBank["element-authoredtext-heading"]["primaryOption"];
                    elementType['secondaryOption'] = 'secondary-heading-' + element.elementdata.headers[0].level;
                } else {
                    elementType['primaryOption'] = elementDataBank[element.type]["primaryOption"];
                    elementType['secondaryOption'] = elementDataBank[element.type]["secondaryOption"];
                }
                break;
            case 'element-blockfeature':
                elementType = {
                    ...elementDataBank[element.type][element.elementdata.type]
                }
                break;
            case 'figure':
                switch (element.figuretype) {
                    case "image":
                    case "table":
                    case "mathImage":
                    case "authoredtext":
                    case "tableasmarkup":
                        /**----------------subtype is now set on the basis of figuretype & alignment basis----------------*/
                        let subType = ""
                        if (element.figuretype === "tableasmarkup") {
                            subType = undefined
                        } else if (element.figuretype === "authoredtext") {
                            subType = "mathml"
                        } else {
                            let figureType = figureData[element['figuretype']];
                            let figureAlignment = figureType[element['alignment']]
                            subType = figureAlignment['imageDimension']
                        }
                        //  if (element.subtype == "" || element.subtype == undefined) {                        
                        element.subtype = subType
                        //  } 
                        altText = element.figuredata.alttext ? element.figuredata.alttext : ""
                        longDesc = element.figuredata.longdescription ? element.figuredata.longdescription : ""
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            altText,
                            longDesc,
                            ...elementDataBank[element.type][element.figuretype][element.subtype]
                        }
                        if (!elementType.secondaryOption) {
                            if (element.figuretype === "tableasmarkup") {
                                elementType.secondaryOption = "secondary-editor-table-equation";
                            }
                        }
                        break;
                    case "codelisting":
                        if(element.subtype == "" || element.subtype == undefined) {
                            element.subtype = "codelisting"
                        }
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            numbered: element.figuredata.numbered,
                            startNumber: element.figuredata.startNumber
                        }
                        if(element.figuredata && !element.figuredata.programlanguage) {
                            element.figuredata.programlanguage = 'Select';
                        }
                        let languageBCE = element.figuredata.programlanguage.toLowerCase()
                        if (element.figuredata.programlanguage === "Select") {
                            elementType.secondaryOption = `secondary-blockcode-language-default`
                        } else {
                            elementType.secondaryOption = `secondary-blockcode-language-${(languageBCE).replace(" ", "_")}`
                        }
                        break;
                    case "video":
                    case "audio":
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            ...elementDataBank[element.type][element.figuretype][element.figuredata.srctype || 'externallink']
                        }
                        break;
                    case "interactive":
                        altText = element.figuredata.alttext ? element.figuredata.alttext : "";
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype][element.figuredata.interactivetype]["primaryOption"],
                            secondaryOption: elementDataBank[element.type][element.figuretype][element.figuredata.interactivetype]["secondaryOption"],
                            altText
                        }
                        break;
                    case "assessment":
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            ...elementDataBank[element.type][element.figuretype][element.figuredata.elementdata.assessmentformat]
                        }
                        break;
                }
                break;
            case 'element-aside':
             	if(element.subtype =="" || element.subtype == undefined){
                    element.subtype = "sidebar";
                    element.designtype = "asideLearningObjective";
                }
                else if (element.subtype === "workedexample" && (element.designtype == "" || element.designtype == undefined)) {
                    element.designtype = "workedexample1";
                }
                else if (element.subtype !== "workedexample" && (element.designtype == "" || element.designtype == undefined)) {
                    element.designtype = "asideLearningObjective";
                }
                
                elementType = {
                    elementType: elementDataBank[element.type][element.subtype]["elementType"],
                    ...elementDataBank[element.type][element.subtype][element.designtype]
                }
                break;
            case 'element-list': {
                let type = element.type
                let subtype = element.subtype || element.elementdata.subtype
                elementType = {
                    ...elementDataBank[type][subtype]
                }
                break;
            }
            case 'element-learningobjectivemapping':
            case 'element-generateLOlist':
            case 'element-learningobjectives':
            case "popup":
                elementType = { ...elementDataBank[element.type] }
                break;
            case 'openerelement':
                altText = element.backgroundimage.alttext ? element.backgroundimage.alttext : ""
                longDesc = element.backgroundimage.longdescription ? element.backgroundimage.longdescription : ""
                elementType = {
                    altText,
                    longDesc,
                    ...elementDataBank[element.type]
                }
                break;
            case "showhide":
            case  'poetry':
                elementType = {
                    elementType: elementDataBank[element.type]["elementType"],
                    primaryOption: elementDataBank[element.type]["primaryOption"],
                    secondaryOption: elementDataBank[element.type]["secondaryOption"]
                }
                break;
            // case "poetry":
            //     elementType = {
            //         elementType : elementDataBank[element.type]["elementType"],
            //         primaryOption: elementDataBank[element.type]["primaryOption"],
            //         secondaryOption: elementDataBank[element.type]["secondaryOption"]
            //     }
            //     break;
            default:
                elementType = { ...elementDataBank["element-authoredtext"] }
        }
    } catch (err) {
        elementType = {
            elementType: ''
        }
    }
    elementType['elementId'] = element.id;
    elementType['index'] = index;
    elementType['elementWipType'] = element.type;
    elementType['toolbar'] = [];
    if (elementType.elementType && elementType.elementType !== '') {
        elementType['tag'] = elementTypes[elementType.elementType][elementType.primaryOption] && elementTypes[elementType.elementType][elementType.primaryOption].subtype[elementType.secondaryOption].labelText;
        elementType['toolbar'] = elementTypes[elementType.elementType][elementType.primaryOption] && elementTypes[elementType.elementType][elementType.primaryOption].toolbar;
    }
    return elementType;
}
export const fetchElementTag = (element, index = 0) => {
    if (Object.keys(element).length > 0) {
        return findElementType(element, index).tag || "";
    }
}
export const fetchSlateData = (manifestURN, entityURN, page, versioning) => (dispatch, getState) => {
    // if(config.isFetchSlateInProgress){
    //  return false;
    // }
    /** [TK-3289]- Fetch Data for All Slates */
    dispatch(fetchAllSlatesData());
    /**sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} }); */
    // sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
    localStorage.removeItem('newElement');
    config.isFetchSlateInProgress = true;
    if (config.totalPageCount <= page) {
        page = config.totalPageCount;
    }
    config.page = page;
    return axios.get(`${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}?page=${page}`, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(slateData => {
        let newVersionManifestId=Object.values(slateData.data)[0].id
        slateData.data[newVersionManifestId].contents.bodymatter.push(poetryElem)

		if(slateData.data && slateData.data[newVersionManifestId] && slateData.data[newVersionManifestId].type === "popup"){
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
            config.isPopupSlate = true
			if (config.slateManifestURN === Object.values(slateData.data)[0].id) {
				let messageTcmStatus = {
					TcmStatus: {
						tc_activated: JSON.stringify(slateData.data[manifestURN].tcm)
					}
				}
                sendDataToIframe({
                    'type': "TcmStatusUpdated",
                    'message': messageTcmStatus
                })
				config.totalPageCount = slateData.data[newVersionManifestId].pageCount;
				config.pageLimit = slateData.data[newVersionManifestId].pageLimit;
				let parentData = getState().appStore.slateLevelData;
				let currentParentData;
				if ((slateData.data[newVersionManifestId]) && (!config.fromTOC) && slateData.data[newVersionManifestId].pageNo > 0) {
					currentParentData = JSON.parse(JSON.stringify(parentData));
					let currentContent = currentParentData[config.slateManifestURN].contents
					let oldbodymatter = currentContent.bodymatter;
					let newbodymatter = slateData.data[newVersionManifestId].contents.bodymatter;
					currentContent.bodymatter = [...oldbodymatter, ...newbodymatter];
					currentParentData = currentParentData[manifestURN];
					config.scrolling = true;
				} else {
					currentParentData = slateData.data[newVersionManifestId];
				}
				dispatch({
					type: OPEN_POPUP_SLATE,
					payload: {
						[manifestURN]: currentParentData
					}
                });
                dispatch({
                    type: SET_ACTIVE_ELEMENT,
                    payload: {}
                });
            }
            else if(versioning && versioning.type==="popup"){
                let parentData = getState().appStore.slateLevelData;
                let newslateData = JSON.parse(JSON.stringify(parentData));
                newslateData[config.slateManifestURN] = Object.values(slateData.data)[0];
                return dispatch({
                    type: AUTHORING_ELEMENT_UPDATE,
                    payload: {
                        slateLevelData: newslateData
                    }
                })
            }
		}
		else{
			if (Object.values(slateData.data).length > 0) {
                if(versioning && (versioning.type === 'element-aside' || versioning.type === 'showhide')){
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    let index =versioning.type === 'showhide'? versioning.indexes:versioning.indexes[0];
                    newslateData[config.slateManifestURN].contents.bodymatter[index] = Object.values(slateData.data)[0];
                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })
                }else if (config.slateManifestURN === Object.values(slateData.data)[0].id) {
                    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
                    let contentUrn = slateData.data[manifestURN].contentUrn;
                    let title = slateData.data[manifestURN].contents.title ? slateData.data[manifestURN].contents.title.text : '';
                    let messageTcmStatus = {
                        TcmStatus: {
                            tc_activated: JSON.stringify(slateData.data[manifestURN].tcm)
                        }
                    }
                    sendDataToIframe({
                        'type': "TcmStatusUpdated",
                        'message': messageTcmStatus
                    })
                     /**
                     * [BG-1522]- On clicking the Notes icon, only the comments of last active element should be 
                     * displayed in the Comments Panel, when user navigates back to the slate or refreshes the slate 
                     */
                    // let appData =  appData1 && appData1.id? appData1.id : appData1;
                    let appData =  config.lastActiveElementId;
                    if(appData){
                        dispatch(fetchComments(contentUrn, title))
                        dispatch(fetchCommentByElement(appData))
                    }
                    else{
                        dispatch(fetchComments(contentUrn, title))
                    }
                    config.totalPageCount = slateData.data[manifestURN].pageCount;
                    config.pageLimit = slateData.data[manifestURN].pageLimit;
                    let parentData = getState().appStore.slateLevelData;
                    let currentParentData;
                    if ((Object.keys(parentData).length !== 0) && (!config.fromTOC) && Object.values(slateData.data)[0].pageNo > 0) {
                        currentParentData = JSON.parse(JSON.stringify(parentData));
                        let currentContent = currentParentData[config.slateManifestURN].contents
                        let oldbodymatter = currentContent.bodymatter;
                        let newbodymatter = slateData.data[manifestURN].contents.bodymatter;
                        currentContent.bodymatter = [...oldbodymatter, ...newbodymatter];
                        currentParentData = currentParentData[manifestURN];
                        config.scrolling = true;
                    } else {
                        currentParentData = slateData.data[manifestURN];
                    }
                    dispatch({
                        type: FETCH_SLATE_DATA,
                        payload: {
                            [manifestURN]: currentParentData
                        }
                    });
                    dispatch({
                        type: SET_ACTIVE_ELEMENT,
                        payload: {}
                    });
                    //}
                    // config.isFetchSlateInProgress = false;
                }else{
                    console.log("incorrect data comming...")
                }
            }
        }
        /** [TK-3289]- To get Current Slate details */
        dispatch(setCurrentSlateAncestorData(getState().appStore.allSlateData))
        
        if(slateData.data && Object.values(slateData.data).length > 0) {
            let slateTitle = SLATE_TITLE;
            if('title' in slateData.data[manifestURN].contents && 'text' in slateData.data[manifestURN].contents.title) {
                slateTitle = slateData.data[manifestURN].contents.title.text || SLATE_TITLE;
            }
            sendDataToIframe({
                'type': "setSlateDetails",
                'message': setSlateDetail(slateTitle, manifestURN)
            });
        }
    });
};

const setSlateDetail = (slateTitle, slateManifestURN) => {
    let env = requestConfigURI().toLowerCase();
    return {
        slateTitle: slateTitle,
        slateManifestURN: slateManifestURN,
        env: env.replace(env.charAt(0), env.charAt(0).toUpperCase())
    }
}

const setOldImagePath = (getState, activeElement, elementIndex = 0) => {
    let parentData = getState().appStore.slateLevelData,
        oldPath,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter,
        bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == activeElement.id) {
            oldPath = bodymatter[index].figuredata.path || ""
        }
    } else {
        let indexes = index.split('-');
        let indexesLen = indexes.length, condition;
        if (indexesLen == 2) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.path
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.path
            }
        }
    }
    return oldPath || ""
}
const setOldAudioVideoPath = (getState, activeElement, elementIndex, type) => {
    let parentData = getState().appStore.slateLevelData,
        oldPath,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter,
        bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    switch (type) {
        case "audio":
            if (typeof (index) == 'number') {
                if (newBodymatter[index].versionUrn == activeElement.id) {
                    oldPath = (bodymatter[index].figuredata.audio && bodymatter[index].figuredata.audio.path) || ""
                }
            } else {
                let indexes = index.split('-');
                let indexesLen = indexes.length, condition;
                if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.audio && bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.audio.path
                    }
                } else if (indexesLen == 3) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.audio && bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.audio.path
                    }
                }
            }
            break;
        case "video":
            if (typeof (index) == 'number') {
                if (newBodymatter[index].versionUrn == activeElement.id) {
                    oldPath = bodymatter[index].figuredata.videos[0].path || ""
                }
            } else {
                let indexes = index.split('-');
                let indexesLen = indexes.length, condition;
                if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.videos[0].path
                    }
                } else if (indexesLen == 3) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.videos[0].path
                    }
                }
            }
            break;
    }

    return oldPath || ""
}
const setOldinteractiveIdPath = (getState, activeElement, elementIndex) => {
    let parentData = getState().appStore.slateLevelData,
        oldPath,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter,
        bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    if (typeof (index) == 'number') {
        if (newBodymatter[index].versionUrn == activeElement.id) {
            oldPath = bodymatter[index].figuredata.interactiveid || ""
        }
    } else {
        let indexes = index.split('-');
        let indexesLen = indexes.length, condition;
        if (indexesLen == 2) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.interactiveid || ""
            }
        } else if (indexesLen == 3) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.interactiveid || ""
            }
        }
    }
    return oldPath || ""
}
export const setActiveElement = (activeElement = {}, index = 0,parentUrn = {},asideData={} , updateFromC2Flag = false,showHideObj) => (dispatch, getState) => {
    dispatch({
        type: SET_ACTIVE_ELEMENT,
        payload: findElementType(activeElement, index)
    });
    dispatch({
        type: SET_PARENT_ASIDE_DATA,
        payload: {
            parentUrn : parentUrn,
            asideData:asideData
        }
    })
    dispatch({
        type: SET_PARENT_SHOW_DATA,
        payload: {
            showHideObj : showHideObj,
        }
    })
    switch (activeElement.figuretype) {
        case "image":
        case "mathImage":
        case "table":
            let oldPath = updateFromC2Flag ? "" : setOldImagePath(getState, activeElement, index)
            dispatch({
                type: SET_OLD_IMAGE_PATH,
                payload: {
                    oldImage: oldPath
                }
            })
            break;
        case "audio":
            let oldAudioId = setOldAudioVideoPath(getState, activeElement, index, activeElement.figuretype)
            dispatch({
                type: SET_OLD_IMAGE_PATH,
                payload: {
                    oldImage: oldAudioId
                }
            })
            break;
        case "video":
            let oldVideoId = setOldAudioVideoPath(getState, activeElement, index, activeElement.figuretype)
            dispatch({
                type: SET_OLD_IMAGE_PATH,
                payload: {
                    oldImage: oldVideoId
                }
            })
            break;
        case "interactive":
            let interactiveId = updateFromC2Flag ? "" : setOldinteractiveIdPath(getState, activeElement, index)
            dispatch({
                type: SET_OLD_IMAGE_PATH,
                payload: {
                    oldImage: interactiveId
                }
            })
            break;
    }
}
export const fetchAuthUser = () => dispatch => {
    return axios.get(`${config.JAVA_API_URL}v2/dashboard/userInfo/users/${config.userId}?userName=${config.userId}`, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then((response) => {
        let userInfo = response.data;
		config.userEmail = userInfo.email;
		document.cookie = (userInfo.firstName)?`FIRST_NAME=${userInfo.firstName};path=/;`:`FIRST_NAME=;path=/;`;
		document.cookie = (userInfo.lastName)?`LAST_NAME=${userInfo.lastName};path=/;`:`LAST_NAME=;path=/;`;
    })
        .catch(err => {
            console.log('axios Error', err);
            //dispatch({type: 'FETCH_AUTH_USER_REJECTED', payload: err}) // NOt using
        })
}

export const openPopupSlate = (element, popupId) => dispatch => {
	if(element){
		/* dispatch({
			type: OPEN_POPUP_SLATE,
			payload: {
				[element.id]: popupData[element.id],
			}
		}); */
	}
	else{
		dispatch({
			type: CLOSE_POPUP_SLATE,
			payload: {
				popupId
			}
		});
	}
}

export const createPopupUnit = (popupField, parentElement, cb, popupElementIndex, slateManifestURN) => (dispatch, getState) => {
    let popupFieldType = ""
    if(popupField === "formatted-subtitle"){
        popupFieldType = "formattedSubtitle"
    }
    else{
        popupFieldType = "formattedTitle"
    }
    
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentElement.contentUrn,
        "slateUrn": parentElement.id,
        "type": "TEXT",
        "updatePopupElementField" : popupFieldType
    };
    let url = `${config.REACT_APP_API_URL}v1/slate/element`
    return axios.post(url, 
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })
    .then((response) => {
        let elemIndex = `cypress-${popupElementIndex}`
        let elemNode = document.getElementById(elemIndex)
        popupElementIndex = Number(popupElementIndex.split("-")[0])
        const parentData = getState().appStore.slateLevelData
        let newslateData = JSON.parse(JSON.stringify(parentData))
        let _slateObject = newslateData[slateManifestURN]
        let targetPopupElement = _slateObject.contents.bodymatter[popupElementIndex]
        if(targetPopupElement){
            targetPopupElement.popupdata[popupField] = response.data
            targetPopupElement.popupdata[popupField].html.text = elemNode.innerHTML
            targetPopupElement.popupdata[popupField].elementdata.text = elemNode.innerText
            _slateObject.contents.bodymatter[popupElementIndex] = targetPopupElement
        }
        dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
        if(cb) cb(response.data)
    })
    .catch((error) => {
        console.log("%c ERROR RESPONSE", "font: 30px; color: red; background: black", error)
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
    })
}


export const createPoetryUnit = (poetryField, parentElement) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentElement.contentUrn,
        "slateUrn": parentElement.id,
        "type": "TEXT",
        "updatePopupElementField" : poetryField
    };
    console.log("response",_requestData)
    let url = `${config.REACT_APP_API_URL}v1/slate/element`
    return axios.post(url, 
        JSON.stringify(_requestData),
        {
            headers: {
                "Content-Type": "application/json",
                "PearsonSSOSession": config.ssoToken
            }
        })
    .then((response) => {
        console.log("response",response)
        // let elemIndex = `cypress-${popupElementIndex}`
        // let elemNode = document.getElementById(elemIndex)
        // popupElementIndex = Number(popupElementIndex.split("-")[0])
        // const parentData = getState().appStore.slateLevelData
        // let newslateData = JSON.parse(JSON.stringify(parentData))
        // let _slateObject = newslateData[slateManifestURN]
        // let targetPopupElement = _slateObject.contents.bodymatter[popupElementIndex]
        // if(targetPopupElement){
        //     targetPopupElement.popupdata[popupField] = response.data
        //     targetPopupElement.popupdata[popupField].html.text = elemNode.innerHTML
        //     targetPopupElement.popupdata[popupField].elementdata.text = elemNode.innerText
        //     _slateObject.contents.bodymatter[popupElementIndex] = targetPopupElement
        // }
        // dispatch({
        //     type: AUTHORING_ELEMENT_UPDATE,
        //     payload: {
        //         slateLevelData: newslateData
        //     }
        // })
       // if(cb) cb(response.data)
    })
    .catch((error) => {
        console.log("%c ERROR RESPONSE", "font: 30px; color: red; background: black", error)
       // dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
    })
}
