import axios from 'axios';
import config from '../../config/config';
import store from '../../appstore/store.js'
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
    SLATE_TITLE,
    GET_PAGE_NUMBER,
    SET_SLATE_LENGTH,
    SET_CURRENT_SLATE_DATA,
    GET_TCM_RESOURCES,
    LEARNOSITY_PROJECT_INFO,
    PROJECT_LEARNING_FRAMEWORKS,
    UPDATE_PROJECT_INFO,
    UPDATE_USAGE_TYPE,
    UPDATE_DISCUSSION_ITEMS,
    UPDATE_LOB_PERMISSIONS,
    SET_PROJECT_SHARING_ROLE,
    SET_PROJECT_SUBSCRIPTION_DETAILS,
    OWNERS_SUBSCRIBED_SLATE,
    UPDATE_FIGURE_DROPDOWN_OPTIONS,
    ERROR_API_POPUP
} from '../../constants/Action_Constants';
import { SLATE_API_ERROR } from '../../constants/Element_Constants';

import { fetchComments, fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action';
import elementTypes from './../Sidebar/elementTypes';
import { sendDataToIframe, requestConfigURI, createTitleSubtitleModel } from '../../constants/utility.js';
import { sendToDataLayer } from '../../constants/ga';
import { HideLoader, UPDATE_PROJECT_METADATA } from '../../constants/IFrameMessageTypes.js';
import elementDataBank from './elementDataBank'
import figureData from '../ElementFigure/figureTypes.js';
import { fetchAllSlatesData, setCurrentSlateAncestorData } from '../../js/getAllSlatesData.js';
import { handleTCMData } from '../TcmSnapshots/TcmSnapshot_Actions.js';
import { POD_DEFAULT_VALUE, MULTI_COLUMN_3C } from '../../constants/Element_Constants'
import { ELM_INT, FIGURE_ASSESSMENT, ELEMENT_ASSESSMENT, LEARNOSITY } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import { tcmSnapshotsForCreate } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import { fetchAssessmentMetadata , resetAssessmentStore } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { isElmLearnosityAssessment } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
import { getContainerData } from './../Toolbar/Search/Search_Action.js';
import { createLabelNumberTitleModel } from '../../constants/utility.js';
import { getShowHideElement, indexOfSectionType } from '../ShowHide/ShowHide_Helper';
import ElementConstants from "../ElementContainer/ElementConstants.js"
const { SHOW_HIDE } = ElementConstants;

export const findElementType = (element, index) => {
    let elementType = {};
    elementType['tag'] = '';
    let altText = "";
    let longDesc = "";
    let podwidth = POD_DEFAULT_VALUE
    try {
        switch (element.type) {
            case "manifestlist":
                elementType = {
                    elementType: elementDataBank[element.type]["elementType"],
                    //primaryOption : "primary-column-1",
                    primaryOption: `primary-column-${element.columnnumber}`,
                    secondaryOption: `secondary-column-${element.columnnumber}`,
                    contentUrn : element.contentUrn
                    //secondaryOption: elementDataBank[element.type]["secondaryOption"]
                }
                break;
            case 'element-authoredtext':
            case 'stanza':
                elementType['elementType'] = elementDataBank[element.type]["elementType"];
                if ('elementdata' in element && 'headers' in element.elementdata && element.elementdata.headers) {
                    elementType['primaryOption'] = elementDataBank["element-authoredtext-heading"]["primaryOption"];
                    elementType['secondaryOption'] = 'secondary-heading-' + element.elementdata.headers[0].level;
                } else if (element && element.elementdata && element.elementdata.designtype) {
                    const designType = element.elementdata.designtype;
                    if(designType === 'handwritingstyle') {
                        elementType['primaryOption'] = elementDataBank["element-authoredtext-handwriting"]["primaryOption"];
                        elementType['secondaryOption'] = elementDataBank["element-authoredtext-handwriting"]["secondaryOption"];
                    }
                } 
                else {
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
                            subType = element['alignment'] === 'actual-size' ? element?.subtype : figureAlignment['imageDimension']
                        }
                        if(element.figuretype === "image" || element.figuretype === "table" || element.figuretype === "mathImage"){
                            if(element.figuredata && !element.figuredata.podwidth){
                                element.figuredata.podwidth = POD_DEFAULT_VALUE
                            }
                        }
                        //  if (element.subtype == "" || element.subtype == undefined) {                        
                        element.subtype = subType
                        //  } 
                        altText = element.figuredata.alttext ? element.figuredata.alttext : ""
                        longDesc = element.figuredata.longdescription ? element.figuredata.longdescription : ""
                        podwidth = element.figuredata.podwidth
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            altText,
                            longDesc,
                            podwidth,
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
                           // element.subtype = "codelisting"    // As per requirement removing Subtype key from codelisting
                        }
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            numbered: element.figuredata.numbered,
                            startNumber: element.figuredata.startNumber,
                            syntaxhighlighting: element.figuredata.syntaxhighlighting
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
                                if(element.figuredata.srctype && element.figuredata.srctype==='internal'){
                                    element.figuredata.srctype='externallink'
                                }
                                elementType = {
                                    elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                                    primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                                    ...elementDataBank[element.type][element.figuretype][element.figuredata.srctype || 'externallink']
                                }
                                break;
                    case "interactive":
                        altText = element.figuredata.alttext ? element.figuredata.alttext : "";
                        longDesc = element.figuredata.longdescription ? element.figuredata.longdescription : ""
                        let interactiveFormat = element.figuredata.interactiveformat;
                        let podwidth = element?.figuredata?.posterimage?.podwidth;
                        let interactiveData = (interactiveFormat == "mmi" || interactiveFormat == ELM_INT) ? element.figuredata.interactiveformat : element.figuredata.interactivetype;
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype][interactiveData]["primaryOption"],
                            altText,
                            longDesc,
                            podwidth,
                            ...elementDataBank[element.type][element.figuretype][interactiveData]
                        }
                        break;
                    case "assessment":
                        if(!element.html){
                            let assessmentTitle = element.figuredata.elementdata.assessmenttitle ?? element?.title?.text ?? ""
                            element.html={
                                "title":`<p>${assessmentTitle}</p>`
                            }
                        }
                        let assessmentFormat = element.figuredata.elementdata.assessmentformat.toLowerCase()
                        const isLearnosityProjectInfo = store?.getState()?.appStore?.isLearnosityProjectInfo
                        if(isLearnosityProjectInfo && isLearnosityProjectInfo[0]?.ItemBankName){
                            assessmentFormat = LEARNOSITY
                        }else{
                            assessmentFormat = element.figuredata.elementdata.assessmentformat.toLowerCase()
                        }
                        elementType = {
                            elementType: elementDataBank[element.type][element.figuretype]["elementType"],
                            primaryOption: elementDataBank[element.type][element.figuretype]["primaryOption"],
                            ...elementDataBank[element.type][element.figuretype][assessmentFormat]
                        }
                        element.figuredata.elementdata.assessmentformat = assessmentFormat 
                        elementType["usageType"]= element.figuredata.elementdata.usagetype ? element.figuredata.elementdata.usagetype : ""
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
            case "citations":
            case "element-citation":
                elementType = {
                    elementType: elementDataBank[element.type]["elementType"],
                    primaryOption: elementDataBank[element.type]["primaryOption"],
                    secondaryOption: elementDataBank[element.type]["secondaryOption"]
                }
                break;
            case 'poetry':
                elementType = {
                    elementType: elementDataBank[element.type]["elementType"],
                    primaryOption: elementDataBank[element.type]["primaryOption"],
                    secondaryOption: elementDataBank[element.type]["secondaryOption"],
                    numbered: element.numberedline ?? false,
                    startNumber: element.startlinenumber && element.numberedline ? element.startlinenumber : '1',
                }
                break;
            case "element-assessment":
                if (element.elementdata && element.elementdata.assessmentformat) {
                    element.elementdata.assessmentformat = element.elementdata.assessmentformat.toLowerCase()  /**PCAT-7526 fixes */
                }
                elementType = { ...elementDataBank["element-authoredtext"] }
                break;
            case  'groupedcontent':
                elementType = {
                    elementType: elementDataBank[element.type]["elementType"],
                    primaryOption: elementDataBank[element.type]["primaryOption"]  
                }
                if (element.width && element.groupproportions) {
                    // checking for column 3 proportion to set primaryOption 
                    if(element.groupproportions === MULTI_COLUMN_3C.ELEMENT_PROPORTION) elementType["primaryOption"] = MULTI_COLUMN_3C.ELEMENT_NAME; 
                    elementType["secondaryOption"] = elementDataBank[element.type][`${element.width}-${element.groupproportions}`]["secondaryOption"]
                }
                else {
                    elementType["secondaryOption"] = elementDataBank[element.type]["wider-50-50"]["secondaryOption"] 
                }
                break;

            case "element-dialogue": {
                    let dialogueType = element.type;
                    elementType = {
                        elementType: elementDataBank[dialogueType]["elementType"],
                        primaryOption: elementDataBank[dialogueType]["primaryOption"],
                        secondaryOption: elementDataBank[dialogueType]["secondaryOption"],
                        numbered: element.elementdata.numberedlines,
                        startNumber: element.elementdata.startNumber,
                    }
                    break;
                }
            case "discussion" : {
                let dialogueType = 'discussion';
                elementType = {
                    elementType: elementDataBank[dialogueType]["elementType"],
                    primaryOption: elementDataBank[dialogueType]["primaryOption"],
                    secondaryOption: elementDataBank[dialogueType]["secondaryOption"],
                 
                }
                break;
            }
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

export const fetchFigureDropdownOptions = () => (dispatch) => {
    // Api to get Figure dropdown options
    const figureDropdownOptionsURL = `${config.REACT_APP_API_URL}v1/images-type`;
    return axios.get(figureDropdownOptionsURL, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(response => {
        let dropdownOptionsObj = response?.data;
        if (Object.keys(dropdownOptionsObj).length > 0) {
            dispatch({
                type: UPDATE_FIGURE_DROPDOWN_OPTIONS,
                payload: dropdownOptionsObj
            })
        }
    }).catch(error => {
        console.log("Get figure dropdown options API Failed !!", error)
    })
}

export const getProjectDetails = () => (dispatch, getState) => {
    let lobURL = `${config.PROJECTAPI_ENDPOINT}/${config.projectUrn}`;
    console.log("the lob url is " + lobURL)
    return axios.get(lobURL, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then (response => {
        dispatch({
            type: UPDATE_PROJECT_INFO,
            payload: response.data
        })
        // PCAT-10682 - Passing project metadata response to toc wrapper for updating the sharing context role if required
        if (response?.data && Object.keys(response.data).length > 0) {
            sendDataToIframe({
                'type': UPDATE_PROJECT_METADATA,
                'message': response.data
            })
        }
        const data = JSON.parse(JSON.stringify(response.data))
        const {lineOfBusiness} = data;
        if(lineOfBusiness) {
            // Api to get LOB Permissions
            const lobPermissionsURL = `${config.REACT_APP_API_URL}v1/lobs/permissions/setting/${lineOfBusiness}`;
            axios.get(lobPermissionsURL, {
                headers: {
                    "Content-Type": "application/json",
                    "PearsonSSOSession": config.ssoToken
                }
            }).then (response => {
                const { elementPermissions } = response.data;
                if (Object.keys(elementPermissions).length > 0) {
                    dispatch({
                        type: UPDATE_LOB_PERMISSIONS,
                        payload: elementPermissions
                    })
                }
            }).catch(error => {
                console.log("Get LOB permissions API Failed!!")
            })

            // call api to get usage types
            
            const usageTypeEndPoint = 'structure-api/usagetypes/v3/discussion';
            const usageTypeUrl = `${config.STRUCTURE_API_URL}${usageTypeEndPoint}`;
            console.log("the usage type url is ", config.STRUCTURE_API_URL, usageTypeEndPoint)
             axios.get(usageTypeUrl, {
                headers: {
                    ApiKey:config.STRUCTURE_APIKEY,
                    PearsonSSOSession:config.ssoToken,
                    'Content-Type':'application/json',
                    Authorization:config.CMDS_AUTHORIZATION
                }
            }).then (usageTypeResponse => {
                console.log("the usage type response is", usageTypeResponse);
                const data = usageTypeResponse?.data;
                if(Array.isArray(data)){
                    const usageType = data.map(item => ({label:item.label.en}))
                dispatch({
                    type: UPDATE_USAGE_TYPE,
                    payload: usageType
                })
            }
                
            }).catch(error => {
            }) 



            // call api to get discussion items
            const discussionURLEndPoint = 'v1/discussion/discussions';
            // 'https://dev-structuredauthoring.pearson.com/cypress/canvas-srvr/cypress-api/v1/discussion/discussions'
            const discussionUrl = `${config.REACT_APP_API_URL}${discussionURLEndPoint}`;
            return axios.post(discussionUrl, {
                "lineOfBusinesses" : [
                    lineOfBusiness
                ]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "PearsonSSOSession": config.ssoToken
                }
            }).then (discussionResponse => {
                if(Array.isArray(discussionResponse?.data)) {
                    dispatch({
                        type: UPDATE_DISCUSSION_ITEMS,
                        payload: discussionResponse.data
                    })
                }
            }).catch(error => {
            }) 
        }
    }).catch(error => {
        console.log("API Failed!!!")
    })  
}



export const fetchSlateData = (manifestURN, entityURN, page, versioning, calledFrom, versionPopupReload) => (dispatch, getState) => {
    // if(config.isFetchSlateInProgress){
    //  return false;
    // }
    /** [TK-3289]- Fetch Data for All Slates */
    const startTime = performance.now();
    dispatch(fetchAllSlatesData());
    /**sendDataToIframe({ 'type': 'fetchAllSlatesData', 'message': {} }); */
    // sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
    localStorage.removeItem('newElement');
    config.isFetchSlateInProgress = true;
    if (config.totalPageCount <= page) {
        page = config.totalPageCount;
    }
    config.page = page;
    /** Page Number removed  */
    dispatch({
        type: GET_PAGE_NUMBER,
        payload: {
            pageNumberData: [],
            allElemPageData: []
        }
    });
   
    let isPopupSlate = config.cachedActiveElement && config.cachedActiveElement.element && config.cachedActiveElement.element.type == "popup" ? true :false;

    if (config.cachedActiveElement && config.cachedActiveElement.element && config.cachedActiveElement.element.type == "popup") {
        config.popupParentElement = {
            ...config.popupParentElement,
            parentElement: config.cachedActiveElement.element
        }
        if(calledFrom!== "containerVersioning"){
            config.popupParentElement.popupAsideData= getState().appStore.asideData;
            config.popupParentElement.popupParentUrn= getState().appStore.parentUrn
        }
    }
    /** Project level and element level TCM status */
    if ((page === 0 && config.tcmStatus && (versioning == ""))) {
        /** Show TCM icon header if TCM is on for project level*/
        let messageTcmStatus = {
            TcmStatus: {
                tc_activated: "true"
            }
        }
        sendDataToIframe({
            'type': "TcmStatusUpdated",
            'message': messageTcmStatus
        })
        let tcmManifestUrn
        //  = isPopupSlate && config.tempSlateManifestURN ? config.tempSlateManifestURN : manifestURN
        if (isPopupSlate && config.cachedActiveElement && config.cachedActiveElement.element && config.cachedActiveElement.element.id == config.slateManifestURN) {
            tcmManifestUrn = config.tempSlateManifestURN
        } else {
            tcmManifestUrn = manifestURN
        }
        dispatch(handleTCMData(tcmManifestUrn));
    }
    dispatch(resetAssessmentStore());//reset Assessment Store
    const elementCount = getState().appStore.slateLength;
    let apiUrl = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}?page=${page}&elementCount=${elementCount}`
    if (versionPopupReload) {
        apiUrl = `${config.REACT_APP_API_URL}v1/slate/content/${config.projectUrn}/${entityURN}/${manifestURN}?page=${page}&metadata=true&elementCount=${elementCount}`
    } 
    return axios.get(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(slateData => { 
        if (slateData.data[config.slateManifestURN].contents.bodymatter) {
            slateData.data[config.slateManifestURN].contents.bodymatter = slateData.data[config.slateManifestURN].contents.bodymatter?.map(ele => {
                if (ele?.type === "element-aside") {
                    ele.html = {
                        title: "<p><label>Test1&nbsp;</label><number>22&nbsp;</number>cc</p>"
                    }
                }
                return ele
            })
        }
         /* Slate tag issue */
         if (document.getElementsByClassName("slate-tag-icon").length) {
            document.getElementsByClassName("slate-tag-icon")[0].classList.remove("disable");
         }     
        let newVersionManifestId=Object.values(slateData.data)[0].id
        if(config.slateManifestURN !== newVersionManifestId && (slateData.data[newVersionManifestId].type === 'manifest' || slateData.data[newVersionManifestId].type === "chapterintro" || slateData.data[newVersionManifestId].type === "titlepage")){
            config.slateManifestURN = newVersionManifestId
            manifestURN = newVersionManifestId
        }
        /** PCAT-8900 - Updating Full Assessments - Elm */
        if (config.slateType == FIGURE_ASSESSMENT && slateData && slateData.data[newVersionManifestId]) {
            let slateBodymatter = slateData.data[newVersionManifestId].contents.bodymatter
            if (slateBodymatter[0] && slateBodymatter[0].type == ELEMENT_ASSESSMENT && isElmLearnosityAssessment(slateBodymatter[0].elementdata) && slateBodymatter[0].elementdata.assessmentid) {
                const assessmentData = { targetId: slateBodymatter[0].elementdata.assessmentid }
                config.saveElmOnAS = true
                dispatch(fetchAssessmentMetadata(FIGURE_ASSESSMENT, 'fromFetchSlate', assessmentData, {}));
            }
        }
		if(slateData.data && slateData.data[newVersionManifestId] && slateData.data[newVersionManifestId].type === "popup"){
            sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
            config.isPopupSlate = true;
            config.savingInProgress = false;
            if (versionPopupReload) {
                config.isPopupSlate = false;
                let parentData = getState().appStore.slateLevelData;
                let newslateData = JSON.parse(JSON.stringify(parentData));
                newslateData[config.slateManifestURN].contents.bodymatter[versioning.index] = Object.values(slateData.data)[0];
                return dispatch({
                    type: AUTHORING_ELEMENT_UPDATE,
                    payload: {
                        slateLevelData: newslateData
                    }
                })
            }
            else if(versioning && versioning.type==="popup"){
                let parentData = getState().appStore.slateLevelData;
                let newslateData = JSON.parse(JSON.stringify(parentData));
                delete Object.assign(newslateData, {[Object.values(slateData.data)[0].id]: newslateData[config.slateManifestURN] })[config.slateManifestURN];     
                config.slateManifestURN= Object.values(slateData.data)[0].id
                newslateData[config.slateManifestURN] = Object.values(slateData.data)[0];
                return dispatch({
                    type: AUTHORING_ELEMENT_UPDATE,
                    payload: {
                        slateLevelData: newslateData
                    }
                })       
            }
			else {
                config.slateManifestURN= Object.values(slateData.data)[0].id
                manifestURN= Object.values(slateData.data)[0].id
                if (config.slateManifestURN === Object.values(slateData.data)[0].id) {
                    config.totalPageCount = slateData.data[newVersionManifestId].pageCount? slateData.data[newVersionManifestId].pageCount: 0;
                    config.pageLimit = slateData.data[newVersionManifestId].pageLimit ? slateData.data[newVersionManifestId].pageLimit :0;
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
            }
            
		}
		else{
			if (Object.values(slateData.data).length > 0) {
                if(versioning && (versioning.type === 'element-aside')) {
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    if (versioning.indexes.length === 4 && versioning.parent.type === 'groupedcontent') {
                        newslateData[config.slateManifestURN].contents.bodymatter[versioning.indexes[0]].groupeddata.bodymatter[versioning.indexes[1]] = Object.values(slateData.data)[0].groupeddata.bodymatter[versioning.indexes[1]];
                    } else if ((versioning.indexes.length === 4 || versioning.indexes.length === 5) && versioning?.parent?.type === 'showhide' && versioning?.parent?.showHideType) {
                        newslateData[config.slateManifestURN].contents.bodymatter[versioning.indexes[0]] = Object.values(slateData.data)[0];
                    } else {
                        let index = versioning.indexes[0];
                        newslateData[config.slateManifestURN].contents.bodymatter[index] = Object.values(slateData.data)[0];
                    }
                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })
                } else if (versioning?.type == "citations" && versioning?.parent?.type === 'showhide' && versioning?.parent?.showHideType) {
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    newslateData[config.slateManifestURN].contents.bodymatter[versioning.indexes[0]] = Object.values(slateData.data)[0];

                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })
                }
                else if ((versioning?.type === 'showhide' || (versioning.calledFrom == 'showhide'))) {
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    let index ;
                    let showhideIndex = versioning.indexes || versioning.index ;
                    if(typeof showhideIndex === "number"){
                        index = showhideIndex;
                    }
                    else if(typeof showhideIndex === "string"){
                        index = showhideIndex.split("-")[0];
                    }
                    newslateData[config.slateManifestURN].contents.bodymatter[index] = Object.values(slateData.data)[0];
                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })
                }
                else if (versioning.type === 'citations' || versioning.type === 'poetry' || versioning.type === 'groupedcontent') {
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    let index
                    if(typeof versioning.index === "number"){
                        index = versioning.index;
                    }
                    else if(typeof versioning.index === "string"){
                        index = versioning.index.split("-")[0];
                    }
                    newslateData[config.slateManifestURN].contents.bodymatter[index] = Object.values(slateData.data)[0];
                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })

                } 
                else if (versioning.type === 'manifestlist') {
                    let parentData = getState().appStore.slateLevelData;
                    let newslateData = JSON.parse(JSON.stringify(parentData));
                    let index
                    const indexVar = versioning.index || versioning.indexes
                    if (typeof indexVar === "number") {
                        index = indexVar;
                    }
                    else if (typeof indexVar === "string") {
                        index = indexVar.split("-")[0];
                    }
                    else if (Array.isArray(indexVar) && indexVar.length) {
                        index = indexVar[0]
                    }
                    newslateData[config.slateManifestURN].contents.bodymatter[index] = Object.values(slateData.data)[0];
                    return dispatch({
                        type: AUTHORING_ELEMENT_UPDATE,
                        payload: {
                            slateLevelData: newslateData
                        }
                    })
                } else if (config.slateManifestURN === Object.values(slateData.data)[0].id) {
                    sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
                    let contentUrn = slateData.data[manifestURN].contentUrn;
                    let title = slateData.data[manifestURN].contents.title ? slateData.data[manifestURN].contents.title.text : '';
                     /**
                     * [BG-1522]- On clicking the Notes icon, only the comments of last active element should be 
                     * displayed in the Comments Panel, when user navigates back to the slate or refreshes the slate 
                     */
                    // let appData =  appData1 && appData1.id? appData1.id : appData1;
                    let appData =  config.lastActiveElementId;
                    if (page === 0) {
                        if (appData) {
                            dispatch(fetchComments(contentUrn, title))
                            dispatch(fetchCommentByElement(appData))
                        }
                        else {
                            dispatch(fetchComments(contentUrn, title))
                        }
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
                        dispatch({
                            type: FETCH_SLATE_DATA,
                            payload: {
                                [manifestURN]: currentParentData
                            }
                        });
                    } else {
                        currentParentData = slateData.data[manifestURN];
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

                        let slateWrapperNode = document.getElementById('slateWrapper');
                        if (slateWrapperNode) {
                            slateWrapperNode.scrollTop = 0;
                        }
                    }
                    //}
                    // config.isFetchSlateInProgress = false;
                }else{
                    console.log("incorrect data comming...")
                }
            }
        }
        /** [TK-3289]- To get Current Slate details */
        dispatch(setCurrentSlateAncestorData(getState().appStore.allSlateData))
        if (slateData.data[newVersionManifestId].type !== "popup") {
            if(slateData.data && Object.values(slateData.data).length > 0) {
                let slateTitle = SLATE_TITLE;
                if('title' in slateData.data[newVersionManifestId].contents && 'text' in slateData.data[newVersionManifestId].contents.title) {
                    slateTitle = slateData.data[newVersionManifestId].contents.title.text || SLATE_TITLE;
                }
                sendDataToIframe({
                    'type': "setSlateDetails",
                    'message': setSlateDetail(slateTitle, newVersionManifestId)
                });
            }

            dispatch(fetchSlateAncestorData());
        }
        const elapsedTime = performance.now() - startTime;
        
        sendToDataLayer('slate-load', {
            elapsedTime,
            manifestURN,
            entityURN,
            projectURN: config.projectUrn,
        });

        // Read element URN to search from project URL
        let queryStrings = new URLSearchParams(window.location.search);
        if(queryStrings.get('searchElement') && getState().searchReducer.deeplink) {
            let searchTerm = queryStrings.get('searchElement') || '';
            dispatch(getContainerData(searchTerm));
        }
    })
    .catch(err => {
        sendDataToIframe({ 'type': HideLoader, 'message': { status: false } });
        dispatch({type: ERROR_API_POPUP, payload:{show: true,message:SLATE_API_ERROR}})
        console.error('Error in fetch Slate api', err);
    })
   
};

export const fetchSlateAncestorData = (tocNode = {}) => (dispatch, getState) => {
    let structure = [];
    let changeFlag = false;
    let currentSlateData = getState().appStore.currentSlateAncestorData;
    let newSlateData = currentSlateData;
    if(Object.keys(currentSlateData).length > 0) {
        while('ancestor' in currentSlateData && currentSlateData.ancestor.label !== 'project') {
            let ancestorTitle = currentSlateData.ancestor.title || 'Untitled';
            if(Object.keys(tocNode).length > 0 && tocNode.entityUrn === currentSlateData.ancestor.entityUrn &&
                ancestorTitle !== tocNode.title) {
                ancestorTitle = tocNode.title;
                changeFlag = true;
                currentSlateData.ancestor.title = tocNode.title;
            }

            structure.unshift(ancestorTitle);
            currentSlateData = currentSlateData.ancestor;
        }
    }

    if(changeFlag) {
        dispatch({
            type: SET_CURRENT_SLATE_DATA,
            payload: {
                currentSlateAncestorData: newSlateData
            }
        });
    }
    
    sendDataToIframe({ 'type': 'projectStructure', 'message': { structure } })
}

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
        { parentUrn, asideData } = getState().appStore || {},
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
        let indexes = index?.split('-') || [];
        let indexesLen = indexes?.length, condition;
        /* update the store on update of figure elements inside showhide elements */
        if(asideData?.type === SHOW_HIDE && indexesLen >= 3) {
            oldPath = getPathOfFigureAsset(bodymatter, indexes, "path", activeElement?.id);
        } else if (indexesLen == 2) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.path
            }
        } else if (indexesLen == 3 && parentUrn && parentUrn.elementType === "group") {
            condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = condition.figuredata.path || ""
            }
        } else if (indexesLen == 3 && newBodymatter[indexes[0]].type !== "showhide") {
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
        { parentUrn, asideData } = getState().appStore,
        oldPath,
        index = elementIndex;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    let newBodymatter = newParentData[config.slateManifestURN].contents.bodymatter,
        bodymatter = parentData[config.slateManifestURN].contents.bodymatter;
    switch (type) {
        case "audio":
            if (typeof (index) == 'number') {
                if (newBodymatter[index].versionUrn == activeElement.id) {
                    oldPath = bodymatter[index].figuredata.audioid || ""
                }
            } else {
                let indexes = index?.split('-');
                let indexesLen = indexes?.length, condition;
                /* update the store on update of figure elements inside showhide elements */
                if(asideData?.type === SHOW_HIDE && indexesLen >= 3) {
                    oldPath = getPathOfFigureAsset(bodymatter, indexes, "audioid", activeElement?.id);
                } else
                if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.audio && bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.audioid
                    }
                } else if (indexesLen == 3 && parentUrn && parentUrn.elementType === "group") {
                    condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = condition.figuredata.audioid || ""
                    }
                } else if (indexesLen == 3 && newBodymatter[indexes[0]].type !== "showhide") {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.audioid 
                        // && bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.audio.path
                    }
                }
            }
            break;
        case "video":
            if (typeof (index) == 'number') {
                if (newBodymatter[index].versionUrn == activeElement.id) {
                    oldPath = bodymatter[index].figuredata.videoid || ""
                    // bodymatter[index].figuredata.videos[0].path || ""
                }
            } else {
                let indexes = index?.split('-');
                let indexesLen = indexes?.length, condition;
                /* update the store on update of figure elements inside showhide elements */
                if(asideData?.type === SHOW_HIDE && indexesLen >= 3) {
                    oldPath = getPathOfFigureAsset(bodymatter, indexes, "videoid", activeElement?.id);
                } else
                if (indexesLen == 2) {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.videoid
                    }
                } else if (indexesLen == 3 && parentUrn && parentUrn.elementType === "group") {
                    condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = condition.figuredata.videoid || ""
                    }
                } else if (indexesLen == 3 && newBodymatter[indexes[0]].type !== "showhide") {
                    condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]]
                    if (condition.versionUrn == activeElement.id) {
                        oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].figuredata.videoid
                    }
                }
            }
            break;
    }

    return oldPath || ""
}
/* Return the image/audio/vedio path/Id */
function getPathOfFigureAsset(bodymatter, indexes, keyName, activeID) {
    const indexesLen = indexes?.length;
    /* Get the showhide */
    const sh_Object = getShowHideElement(bodymatter, indexesLen, indexes);
    if(sh_Object?.type === SHOW_HIDE) {
        /* Get the sectiontype of showhide */
        const sectionType = indexOfSectionType(indexes);
        /* Get the Figure element of showhide */
        let figureObject = sh_Object?.interactivedata[sectionType][indexes[indexesLen - 1]] || {};
        if (figureObject.versionUrn === activeID) {
            /* Get the path of Figure element of showhide */
            return figureObject?.figuredata?.hasOwnProperty(keyName) ? figureObject.figuredata[keyName] : "";
        }
    }  
}

const setOldinteractiveIdPath = (getState, activeElement, elementIndex) => {
    let parentData = getState().appStore.slateLevelData,
        { parentUrn, asideData } = getState().appStore,
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
         /* update the store on update of interactive elements inside showhide elements */
        if(asideData?.type === SHOW_HIDE && indexesLen >= 3) {
            oldPath = getPathOfFigureAsset(bodymatter, indexes, "interactiveid", activeElement?.id);
        } else
        if (indexesLen == 2) {
            condition = newBodymatter[indexes[0]].elementdata.bodymatter[indexes[1]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].figuredata.interactiveid || ""
            }
        } else if (indexesLen == 3 && parentUrn && parentUrn.elementType === "group") {
            condition = newBodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
            if (condition.versionUrn == activeElement.id) {
                oldPath = condition.figuredata.interactiveid || ""
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
export const setActiveElement = (activeElement = {}, index = 0,parentUrn = {},asideData={} , updateFromC2Flag = false, showHideObj = undefined) => (dispatch, getState) => {
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
        case "tableasmarkup":
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
        config.fullName = userInfo.lastName + ',' + userInfo.firstName
        document.cookie = (userInfo.userId)?`USER_ID=${userInfo.userId};path=/;`:`USER_ID=;path=/;`;
		document.cookie = (userInfo.firstName)?`FIRST_NAME=${userInfo.firstName};path=/;`:`FIRST_NAME=;path=/;`;
		document.cookie = (userInfo.lastName)?`LAST_NAME=${userInfo.lastName};path=/;`:`LAST_NAME=;path=/;`;
    })
        .catch(err => {
            console.error('axios Error', err);
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

/**
 * Create the pre-snapshots for cos converted projects
 * @param {*}  
 */

export const tcmCosConversionSnapshot = () => dispatch => {
    return axios.patch(`/cypress/trackchanges-srvr/pre-snapshot/${config.projectUrn}`, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken,
            "Accept": "application/json"
        }
    }).then((response) => {
        // console.log("response", response)
    })
        .catch(err => {
            console.error('axios Error', err);
        })
}

/**
 * Appends the created Unit element to the parent element and then to the slate.
 * @param {*} paramObj 
 * @param {*} responseData 
 */
export const appendCreatedElement = async (paramObj, responseData) => {
    let {
        popupElementIndex,
        getState,
        slateManifestURN,
        parentElement,
        dispatch,
        cb,
        popupField,
        createdFromFootnote,
        cgTitleFieldData
    } = paramObj

    let elemIndex = `cypress-${popupElementIndex}`
    let elemNode = document.getElementById(elemIndex)
    popupElementIndex = popupElementIndex.split("-")
    const parentData = getState().appStore.slateLevelData
    let newslateData = JSON.parse(JSON.stringify(parentData))
    let _slateObject = newslateData[slateManifestURN]

    if(parentElement.type === "popup"){
        let targetPopupElement=_slateObject.contents.bodymatter[popupElementIndex[0]];
        switch(popupElementIndex?.length) {
            case 3:
                targetPopupElement = targetPopupElement.elementdata.bodymatter[popupElementIndex[1]]
                break;
            case 4:
                targetPopupElement = targetPopupElement.elementdata.bodymatter[popupElementIndex[1]].contents.bodymatter[popupElementIndex[2]]
                break;
            case 5:
                targetPopupElement = targetPopupElement.groupeddata.bodymatter[popupElementIndex[1]].groupdata.bodymatter[popupElementIndex[2]].elementdata.bodymatter[popupElementIndex[3]]          
                break;
            case 6:
                targetPopupElement = targetPopupElement.groupeddata.bodymatter[popupElementIndex[1]].groupdata.bodymatter[popupElementIndex[2]].elementdata.bodymatter[popupElementIndex[3]].contents.bodymatter[popupElementIndex[4]]          
                break;
        }
        if (targetPopupElement) {
            targetPopupElement.popupdata["formatted-title"] = responseData
            if (popupField === "formatted-title") {
                
                targetPopupElement.popupdata["formatted-title"].html.text = createTitleSubtitleModel(elemNode.innerHTML, "")
            }
            else {
                targetPopupElement.popupdata["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML)
            }
            targetPopupElement.popupdata["formatted-title"].elementdata.text = elemNode.innerText
            switch(popupElementIndex?.length) {
                case 3:
                    _slateObject.contents.bodymatter[popupElementIndex[0]].elementdata.bodymatter[popupElementIndex[1]] = targetPopupElement;
                    break;
                case 4:
                   _slateObject.contents.bodymatter[popupElementIndex[0]].elementdata.bodymatter[popupElementIndex[1]].contents.bodymatter[popupElementIndex[2]] = targetPopupElement;
                    break;
                case 5:
                    _slateObject.contents.bodymatter[popupElementIndex[0]].groupeddata.bodymatter[popupElementIndex[1]].groupdata.bodymatter[popupElementIndex[2]].elementdata.bodymatter[popupElementIndex[3]] = targetPopupElement;          
                    break;
                case 6:
                    _slateObject.contents.bodymatter[popupElementIndex[0]].groupeddata.bodymatter[popupElementIndex[1]].groupdata.bodymatter[popupElementIndex[2]].elementdata.bodymatter[popupElementIndex[3]].contents.bodymatter[popupElementIndex[4]] = targetPopupElement;          
                    break;
                default:
                    _slateObject.contents.bodymatter[popupElementIndex[0]] = targetPopupElement;
            }
        }
    }
    else if (parentElement.type === "citations") {
        let targetCG;
        // Check if CG is created inside S/H
        if (popupElementIndex.length === 4) {
            let sectionType = cgTitleFieldData?.asideData?.parent?.showHideType;
            if (sectionType) {
                targetCG = _slateObject.contents.bodymatter[popupElementIndex[0]].interactivedata[sectionType][popupElementIndex[2]];
            }
            if (targetCG) {
                targetCG.contents["formatted-title"] = responseData;
                targetCG.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML);
                targetCG.contents["formatted-title"].elementdata.text = elemNode.innerText;
                _slateObject.contents.bodymatter[popupElementIndex[0]].interactivedata[sectionType][popupElementIndex[2]] = targetCG;
            }
        } else {
            targetCG = _slateObject.contents.bodymatter[popupElementIndex[0]];
            if (targetCG) {
                targetCG.contents["formatted-title"] = responseData;
                targetCG.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML);
                targetCG.contents["formatted-title"].elementdata.text = elemNode.innerText;
                _slateObject.contents.bodymatter[popupElementIndex[0]] = targetCG;
            }
        }
    }
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: newslateData
        }
    })
    if(cb && !createdFromFootnote){
        await cb(responseData)
    }
}

/**
 * @description prepareDataForTcmCreate -> tracks tcm txCnt for creation of metadat-field.
 * @param {*} parentElement Parent popup element/ citation group container
 * @param {*} popupField formatted title or formatted-subtitle
 * @param {*} responseData API response
 * @param {*} getState store
 * @param {*} dispatch dispatch fn
 */
function prepareDataForTcmCreate(parentElement, popupField , responseData, getState, dispatch) {
    let elmUrn = [];
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let formattedTitleField = ['formattedTitle','formattedTitleOnly','formattedSubtitle' ];
    if (parentElement && parentElement.type =='popup' && formattedTitleField.indexOf(popupField) !==-1 ) {
        elmUrn.push(responseData.id)
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
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });}
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}

/**
 * Creates request data for creating popup/citation unit.
 * @param {*} parentElement Parent popup element/ citation group container
 * @param {*} popupField formatted title or formatted-subtitle
 */
const getRequestData = (parentElement) => {
    let dataToSend = {}
    let metaDataField = "formattedTitle" 
    dataToSend = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentElement.contentUrn,
        "slateUrn": parentElement.id,
        "type": "TEXT",
        "metaDataField" : metaDataField
    }
    return dataToSend
}
export const createPopupUnit = (popupField, parentElement, cb, popupElementIndex, slateManifestURN, createdFromFootnote, cgTitleFieldData = {}) => (dispatch, getState) => {
    let _requestData =  getRequestData(parentElement)
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
        let argObj = {
            popupElementIndex,
            getState,
            slateManifestURN,
            parentElement,
            dispatch,
            cb,
            popupField,
            createdFromFootnote,
            cgTitleFieldData
        }
        if (parentElement && parentElement.type == 'popup') {
            const parentData = getState().appStore.slateLevelData;
            const newParentData = JSON.parse(JSON.stringify(parentData));
            let currentSlateData = newParentData[config.slateManifestURN];
            let containerElement = {
                parentElement: parentElement,
                asideData: getState().appStore.asideData,
                parentUrn: getState().appStore.parentUrn,
                metaDataField: _requestData.metaDataField,
                isMetaFieldExist: true
            };
            let slateData = {
                currentParentData:newParentData,
                bodymatter: currentSlateData.contents.bodymatter,
                response: response.data
            };
            if(config.tcmStatus){
                prepareDataForTcmCreate(parentElement, _requestData.metaDataField, response.data, getState, dispatch)
            }
            tcmSnapshotsForCreate(slateData, _requestData.metaDataField, containerElement, dispatch);
        }
        appendCreatedElement(argObj, response.data)

    })
    .catch((error) => {
        console.log("%c ERROR RESPONSE", "font: 30px; color: red; background: black", error)
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
    })
}

export const createPoetryUnit = (poetryField, parentElement,cb, ElementIndex, slateManifestURN, element) => (dispatch, getState) => {
    let _requestData = {
        "projectUrn": config.projectUrn,
        "slateEntityUrn": parentElement.contentUrn,
        "type": "TEXT"
    }
    if (poetryField === 'creditsarray') {
        _requestData.sectionType = 'creditsarray';
    } else {
        _requestData.metaDataField = "formattedTitle";
    }
    
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

        let elemIndex = `cypress-${ElementIndex}`
        let elemNode = document.getElementById(elemIndex)
        ElementIndex = Number(ElementIndex.split("-")[0])
        const parentData = getState().appStore.slateLevelData
        let newslateData = JSON.parse(JSON.stringify(parentData))
        let _slateObject = newslateData[slateManifestURN]
        let targetPoetryElement = _slateObject.contents.bodymatter[ElementIndex]
        const activeElementId = element?.id

        if(targetPoetryElement){
            if(poetryField==="creditsarray"){
                if(targetPoetryElement?.type == "element-aside"){ /* update credit of PE inside aside */
                    targetPoetryElement?.elementdata?.bodymatter.map((element, index)=>{
                        if (element.type == "poetry" && element.id == activeElementId) {
                            element.contents[poetryField] = [response.data]
                            element.contents[poetryField][0].html.text  = elemNode.innerHTML
                            element.contents[poetryField][0].elementdata.text = elemNode.innerText
                            targetPoetryElement.elementdata.bodymatter[index] = element
                        } else if (element?.type == "manifest") { /* update credit of PE inside WE in section break */
                            element.contents?.bodymatter.map((element1, maniIndex) => {
                                if (element1?.type == "poetry" && element1?.id == activeElementId) {
                                element1.contents[poetryField] = [response.data]
                                element1.contents[poetryField][0].html.text  = elemNode.innerHTML
                                element1.contents[poetryField][0].elementdata.text = elemNode.innerText
                                targetPoetryElement.elementdata.bodymatter[index].contents.bodymatter[maniIndex] = element1
                                }
                            })
                        }
                    })
                } else if (targetPoetryElement?.type == "groupedcontent") { /* update credit of PE inside MultiColumn */
                    targetPoetryElement.groupeddata?.bodymatter.map((groupElem1, groupIndex) => {
                        groupElem1.groupdata?.bodymatter.map((groupElem2, groupIndex1) => {
                            if (groupElem2.type == "poetry" && groupElem2.id == activeElementId) {
                                groupElem2.contents[poetryField] = [response.data]
                                groupElem2.contents[poetryField][0].html.text  = elemNode.innerHTML
                                groupElem2.contents[poetryField][0].elementdata.text = elemNode.innerText
                                targetPoetryElement.groupeddata.bodymatter[groupIndex].groupdata.bodymatter[groupIndex1] = groupElem2
                            }
                        })
                    })
                } 
                else {
                if(!targetPoetryElement.contents[poetryField]){
                    targetPoetryElement.contents[poetryField] = [];
                }
                targetPoetryElement.contents[poetryField][0] = response.data
                targetPoetryElement.contents[poetryField][0].html.text  = elemNode.innerHTML
                targetPoetryElement.contents[poetryField][0].elementdata.text = elemNode.innerText
            }
        }
            else if(poetryField==="formatted-title"){
                if(targetPoetryElement?.type == "element-aside"){ /* update Title of PE inside aside */
                    targetPoetryElement?.elementdata?.bodymatter.map((element, index)=>{
                        if (element.type == "poetry" && element.id == activeElementId) {
                            element.contents[poetryField] = response.data
                            element.contents[poetryField].html.text = createTitleSubtitleModel(elemNode.innerHTML, "")
                            element.contents[poetryField].elementdata.text = elemNode.innerText
                            targetPoetryElement.elementdata.bodymatter[index] = element
                        } else if (element?.type == "manifest") { /* update title of PE inside WE in section break */
                            element.contents?.bodymatter.map((element1, maniIndex) => {
                                if (element1?.type == "poetry" && element1?.id == activeElementId) {
                                    element1.contents[poetryField] = response.data
                                    element1.contents[poetryField].html.text = createTitleSubtitleModel(elemNode.innerHTML, "")
                                    element1.contents[poetryField].elementdata.text = elemNode.innerText
                                    targetPoetryElement.elementdata.bodymatter[index].contents.bodymatter[maniIndex] = element1
                                }
                            })
                        }
                    })
                } else if (targetPoetryElement?.type == "groupedcontent") { /* update title of PE inside MultiColumn */
                    targetPoetryElement.groupeddata?.bodymatter.map((groupElem1, groupIndex) => {
                        groupElem1.groupdata?.bodymatter.map((groupElem2, groupIndex1) => {
                            if (groupElem2.type == "poetry" && groupElem2.id == activeElementId) {
                                groupElem2.contents[poetryField] = response.data
                                groupElem2.contents[poetryField].html.text = createTitleSubtitleModel(elemNode.innerHTML, "")
                                groupElem2.contents[poetryField].elementdata.text = elemNode.innerText
                                targetPoetryElement.groupeddata.bodymatter[groupIndex].groupdata.bodymatter[groupIndex1] = groupElem2
                            }
                        })
                    })
                } else {
                targetPoetryElement.contents[poetryField] = response.data
                targetPoetryElement.contents[poetryField].html.text = createTitleSubtitleModel(elemNode.innerHTML, "")
                targetPoetryElement.contents[poetryField].elementdata.text = elemNode.innerText
            }
        }
            else if(poetryField==="formatted-subtitle"){
                if (targetPoetryElement?.type == "element-aside") {
                    targetPoetryElement?.elementdata?.bodymatter.map((element, index) => {
                        if (element.type == "poetry" && element.id == activeElementId) { /* update subtitle of PE inside Aside/WE */
                            element.contents["formatted-title"] = response.data
                            element.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML)
                            targetPoetryElement.elementdata.bodymatter[index] = element
                        } else if (element.type == "manifest") { /* update subtitle of PE inside WE in section break */
                            element.contents?.bodymatter.map((element1, maniIndex) => {
                                if (element1?.type == "poetry" && element1?.id == activeElementId) {
                                    element1.contents["formatted-title"] = response.data
                                    element1.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML)
                                    targetPoetryElement.elementdata.bodymatter[index].contents.bodymatter[maniIndex] = element1
                                }
                            })
                        }
                    })
                } else if (targetPoetryElement?.type == "groupedcontent") { /* update subtitle of PE inside MultiColumn */
                    targetPoetryElement.groupeddata?.bodymatter.map((groupElem1, groupIndex) => {
                        groupElem1.groupdata?.bodymatter.map((groupElem2, groupIndex1) => {
                            if (groupElem2.type == "poetry" && groupElem2.id == activeElementId) {
                                groupElem2.contents["formatted-title"] = response.data
                                groupElem2.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML)
                                targetPoetryElement.groupeddata.bodymatter[groupIndex].groupdata.bodymatter[groupIndex1] = groupElem2
                            }
                        })
                    })
                }
                else {
                targetPoetryElement.contents["formatted-title"] = response.data
                targetPoetryElement.contents["formatted-title"].html.text = createTitleSubtitleModel("", elemNode.innerHTML)
                }
            }
            _slateObject.contents.bodymatter[ElementIndex] = targetPoetryElement
        }
        dispatch({
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
                slateLevelData: newslateData
            }
        })
        config.poetryElementCreationInProgress = false
        if(cb) cb(response.data)
    })
    .catch((error) => {
        console.log("%c ERROR RESPONSE", "font: 30px; color: red; background: black", error)
       // dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.savingInProgress = false
    })
}

export const setSlateLength = (length) => {
    return {
        type: SET_SLATE_LENGTH,
        payload: length
    }
}


export const fetchLearnosityContent = () => dispatch => {
    return axios.get(`${config.LEARNOSITY_CONTENT_BRIDGE_API}${config.projectEntityUrn}?PearsonSSOSession=${config.ssoToken}`, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then((response) => {
     if(response.status==200){
           dispatch({
               type: LEARNOSITY_PROJECT_INFO,
                payload: response.data
            });
        }
    })
        .catch(err => {
            console.error('axios Error', err);
        })
}


/**
 * This API fetches the Learning Framework(s) linked to the project
 */
export const fetchProjectLFs = () => dispatch => {
    axios.get(`${config.ASSET_POPOVER_ENDPOINT}v2/${config.projectUrn}/learningframeworks`, {
        headers: {
            "ApiKey": config.STRUCTURE_APIKEY,
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken,
            "x-Roles": "ContentPlanningAdmin"
        }
    }).then(response => {
        if (response.status === 200 && response?.data?.learningFrameworks?.length > 0) {
            const learningFrameworks = response.data.learningFrameworks;
            const cypressLF = learningFrameworks.find(learningFramework => config.book_title.includes(learningFramework?.label?.en));
            const externalLF = learningFrameworks.filter(learningFramework => !config.book_title.includes(learningFramework?.label?.en))
            dispatch({
                type: PROJECT_LEARNING_FRAMEWORKS,
                payload: {
                    cypressLF: cypressLF ?? {},
                    externalLF: externalLF ?? []
                }
            });
        }
    }).catch(error => {
        console.log('Error in fetching Learning Framework linked to the project>>>> ', error)
        dispatch({
            type: PROJECT_LEARNING_FRAMEWORKS,
            payload: {}
        });
    })

};

/**
 * setProjectSharingRole is responsible to dispatch an action to set 
 * project sharing role
 * @param {String} role
 */
export const setProjectSharingRole = role => (dispatch) => {
    dispatch({
        type: SET_PROJECT_SHARING_ROLE,
        payload: role
    });
}

/**
 * setProjectSubscriptionDetails is responsible to dispatch an action to 
 * set project subscription details based on toc container selection
 * @param {Object} subscriptionDetails 
 */
export const setProjectSubscriptionDetails = (subscriptionDetails) => (dispatch) => {
    dispatch({
        type: SET_PROJECT_SUBSCRIPTION_DETAILS,
        payload: subscriptionDetails
    });

}

/**
 * Action Creator
 * Retrieves the Owner's Slate status
 */
 export const isOwnersSubscribedSlate = (showPopup) => (dispatch, getState) => {
    return dispatch({
        type: OWNERS_SUBSCRIBED_SLATE,
        payload: showPopup
    })
}