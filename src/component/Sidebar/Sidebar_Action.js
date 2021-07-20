import axios from 'axios';
import tinymce from 'tinymce/tinymce';
import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    ERROR_POPUP,
    GET_TCM_RESOURCES,
    UPDATE_POETRY_METADATA,
    AUTHORING_ELEMENT_UPDATE,
} from './../../constants/Action_Constants';
import elementTypes from './../Sidebar/elementTypes';
import figureDataBank from '../../js/figure_data_bank';
import { sendDataToIframe } from '../../constants/utility.js';
import { fetchSlateData } from '../CanvasWrapper/CanvasWrapper_Actions';
import { POD_DEFAULT_VALUE, allowedFigureTypesForTCM } from '../../constants/Element_Constants'
import { prepareTcmSnapshots,checkContainerElementVersion,fetchManifestStatus,fetchParentData, prepareSnapshots_ShowHide } from '../TcmSnapshots/TcmSnapshots_Utility.js';
import {  handleElementsInShowHide, onUpdateSuccessInShowHide } from '../ShowHide/ShowHide_Helper.js';
import TcmConstants from '../TcmSnapshots/TcmConstants.js';
const { ELEMENT_ASIDE, MULTI_COLUMN } = TcmConstants;
let imageSource = ['image','table','mathImage'],imageDestination = ['primary-image-figure','primary-image-table','primary-image-equation']
const elementType = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives', 'element-citation', 'stanza', 'figure', "interactive"];

export const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes, fromToolbar,showHideObj) => (dispatch,getState) => {
    let { appStore } =  getState();
    try {
        let conversionDataToSend = {};
    // Input Element
    let oldElementFigureData ;
    const inputPrimaryOptionsList = elementTypes[oldElementInfo['elementType']],
        inputPrimaryOptionType = inputPrimaryOptionsList[oldElementInfo['primaryOption']],
        overallType = inputPrimaryOptionsList['enumType']

    const inputSubTypeList = inputPrimaryOptionType['subtype'],
        inputSubType = inputSubTypeList[[oldElementInfo['secondaryOption']]]

    let inputSubTypeEnum = inputSubType['enum'],
    inputPrimaryOptionEnum = inputPrimaryOptionType['enum']

    // Output Element
    const outputPrimaryOptionsList = elementTypes[newElementData['elementType']],
        outputPrimaryOptionType = outputPrimaryOptionsList[newElementData['primaryOption']]

    const outputSubTypeList = outputPrimaryOptionType['subtype'],
        outputSubType = outputSubTypeList[[newElementData['secondaryOption']]]

        if (oldElementData.type === "figure") {
            if (!(imageSource.includes(oldElementData.figuretype) && imageDestination.includes(newElementData['primaryOption'])) && oldElementData.figuretype !== 'codelisting' && !oldElementData.figuredata.interactivetype){
                oldElementData.figuredata = {...figureDataBank[newElementData['primaryOption']]}
            }
            if(oldElementData.figuredata.srctype){
                oldElementData.figuredata.srctype=outputSubType['wipValue']
            }
            if (oldElementData.figuredata.interactivetype) {
                oldElementFigureData = JSON.parse(JSON.stringify(oldElementData.figuredata));
                oldElementData.figuredata = {...figureDataBank[newElementData['secondaryOption']]}
                oldElementData.html.postertext = ""; /** [BG-2676] - Remove postertext on Conversion */
                if (oldElementData.figuredata && oldElementData.figuredata.postertext && oldElementData.figuredata.postertext.text) {
                    oldElementData.figuredata.postertext.text = "";
                }
            }

            /* On conversion of primary option type, change the POD value to default value */
            if((oldElementData.figuretype  === 'image'|| oldElementData.figuretype === "table" || oldElementData.figuretype === "mathImage") &&
            inputPrimaryOptionType !== outputPrimaryOptionType ){
                oldElementData.figuredata.podwidth = POD_DEFAULT_VALUE
            }

        /* on Conversion removing the tinymce instance for BCE element*/
        if ((outputPrimaryOptionType && outputPrimaryOptionType['enum'] === "BLOCK_CODE_EDITOR" || newElementData && newElementData['primaryOption'] === 'primary-blockcode-equation') &&
            newElementData['secondaryOption'] === "secondary-blockcode-language-default") {
            if (tinymce && tinymce.activeEditor && tinymce.activeEditor.id) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', false)
            }
        }
        else {
            if (tinymce && tinymce.activeEditor && tinymce.activeEditor.id && document.getElementById(tinymce.activeEditor.id)) {
                document.getElementById(tinymce.activeEditor.id).setAttribute('contenteditable', true)
            }
        }
        if(oldElementData.figuretype && oldElementData.figuretype === "codelisting" && newElementData['primaryOption'] === "primary-blockcode-equation") {
            oldElementFigureData = JSON.parse(JSON.stringify(oldElementData.figuredata));
            oldElementData.figuredata.programlanguage = elementTypes[newElementData['elementType']][newElementData['primaryOption']].subtype[newElementData['secondaryOption']].text;
             oldElementData.figuredata.preformattedtext = [];
        }
    }

    let outputSubTypeEnum = outputSubType['enum'],
    outputPrimaryOptionEnum = outputPrimaryOptionType['enum']

        if (oldElementData.figuretype === "assessment") {
            /**-----------Sidebar Conversion for Single Assessment-----------*/
            let assessmentData = prepareAssessmentDataForConversion(oldElementData, outputSubType.text)
            oldElementData = assessmentData.oldElementData;
            inputSubTypeEnum = inputSubType['enum'];
            outputSubTypeEnum = outputSubType['enum'];
        }
        /** Remove subtype key on conversion from BQ to P/H/LO*/
        let textPrimaryOption = ["primary-paragraph", "primary-heading", 'primary-learning-objective']
        if (oldElementInfo.primaryOption === "primary-blockquote" && oldElementData.subtype && (textPrimaryOption.includes(newElementData.primaryOption))) {
            delete oldElementData.subtype
        }
    /**s
     * Patch [code in If block] - in case list is being converted from toolbar and there are some unsaved changes in current element
     * then send dom html data instead of sending store data
     */
    if (newElementData.primaryOption === "primary-list") {
        let storeHtml = oldElementData.html && oldElementData.html.text || ''
        let containerDom = document.querySelector(`[data-id='${oldElementData.id}']`)
        let elementContainer = containerDom && containerDom.querySelector('.element-container')
        let editableDom = elementContainer && elementContainer.querySelector('.cypress-editable')
        if(editableDom){
          tinyMCE.$(editableDom).find('ol').removeAttr('data-mce-style')
        }
        let domHtml = editableDom ? editableDom.innerHTML : "<ol></ol>"
        if(showHideObj){
            containerDom = document.getElementById(`cypress-${showHideObj.index}`)
            if(containerDom){
                tinyMCE.$(containerDom).find('ol').removeAttr('data-mce-style')
            }
            domHtml = containerDom ? containerDom.innerHTML : "<ol></ol>"
        }
        if (storeHtml !== domHtml) {
            oldElementData.html.text = domHtml
        }
        /**
         * case - if list is being converted from sidepanel then pick counterIncrement value from element data
         */
        if (outputSubTypeEnum !== "DISC" && newElementData.startvalue === undefined && oldElementData.elementdata.type === 'list' && oldElementData.elementdata.startNumber) {
            newElementData.startvalue = parseInt(oldElementData.elementdata.startNumber)
        }
        /**
         * case - if bullet list is being converted into bullet again then explicitly proceed with paragraph coversion
         */
        if (inputPrimaryOptionEnum === outputPrimaryOptionEnum && outputPrimaryOptionEnum==="LIST" && inputSubTypeEnum === outputSubTypeEnum && fromToolbar) {
            outputPrimaryOptionEnum = "AUTHORED_TEXT"
            outputSubTypeEnum = "NA"
        }
    }
        /**
         * case - if element list is being converted into paragraph from sidepanel
         * [BG-2515] | Remove subtype during list to paragraph or heading conversion
         */
        if (oldElementInfo.primaryOption === "primary-list" && (textPrimaryOption.includes(newElementData.primaryOption)) && oldElementData.subtype) {
            delete oldElementData.subtype
        }

    if (oldElementData.subtype && oldElementData.subtype === "workedexample") {
        if (outputSubTypeEnum && outputSubTypeEnum === "WORK_EXAMPLE_2") {
            oldElementData.designtype = "workedexample2"
        }
    }
    if (oldElementData.subtype && oldElementData.subtype === "sidebar") {
        let elemDesigntype = "asideSidebar01"
        switch (outputSubTypeEnum) {
            case "SIDEBAR_02":
                elemDesigntype = "asideSidebar02"
                break;
            case "SIDEBAR_03":
                elemDesigntype = "asideSidebar03"
                break;
            case "SIDEBAR_04":
                elemDesigntype = "asideSidebar04"
                break;
            case "SIDEBAR_05":
                elemDesigntype = "asideSidebar05"
                break;
            // case "SIDEBAR_06":
            //     elemDesigntype = "asideSidebar06"
            //     break;
            case "SIDEBAR_01":
            default:
                elemDesigntype = "asideSidebar01"
                break;
        }
        oldElementData.designtype = elemDesigntype
    }
    if (oldElementData.type === "element-blockfeature") {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = oldElementData.html.text;
        tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
        oldElementData.html.text = tempDiv.innerHTML;
    }
    conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum,
        projectUrn : config.projectUrn,
        slateVersionUrn:appStore.parentUrn && Object.keys(appStore.parentUrn).length !== 0 ? appStore.parentUrn.manifestUrn: config.slateManifestURN,
        counterIncrement: (newElementData.startvalue > 0) ? (newElementData.startvalue) : 1, // earlier default by 0
        index: indexes[indexes.length - 1],
        slateEntity : appStore.parentUrn && Object.keys(appStore.parentUrn).length !== 0 ?appStore.parentUrn.contentUrn:config.slateEntityURN
    }

    if (newElementData.primaryOption !== "primary-list" && conversionDataToSend.inputType === conversionDataToSend.outputType && conversionDataToSend.inputSubType === conversionDataToSend.outputSubType) {
        return;
    }
    if(showHideObj){
        conversionDataToSend["sectionType"] = showHideObj.showHideType
        conversionDataToSend["elementParentEntityUrn"] = showHideObj.element.contentUrn
    }
    let parentEntityUrn = conversionDataToSend.elementParentEntityUrn || appStore.parentUrn && appStore.parentUrn.contentUrn || config.slateEntityURN
    conversionDataToSend["elementParentEntityUrn"] = parentEntityUrn
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.conversionInProcess = true
    if(config.elementStatus[conversionDataToSend.id] === "approved"){
        config.savingInProgress = true
    }
    config.isSavingElement = true
    const url = `${config.REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), { 
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(async res =>{
        
        let parentData = store;
        let currentParentData = JSON.parse(JSON.stringify(parentData));
        let currentSlateData = currentParentData[config.slateManifestURN];
        /** [PCAT-8289] -------------------------------- TCM Snapshot Data handling ----------------------------------*/
        if (elementType.indexOf(oldElementData.type) !== -1) {
            if(oldElementData && (oldElementData.figuretype == "codelisting" || oldElementData.figuretype == "interactive")){
                oldElementData.figuredata = oldElementFigureData
            }           
            let elementConversionData ={
                currentSlateData:{
                    status: currentSlateData.status,
                    contentUrn: currentSlateData.contentUrn
                },
                oldElementData:oldElementData,
                response:res.data
            }
            if (config.isPopupSlate) {
                elementConversionData.currentSlateData.popupSlateData = currentParentData[config.tempSlateManifestURN]
            }
            if (currentSlateData && currentSlateData.status === 'approved') {
                await tcmSnapshotsForConversion(elementConversionData, indexes, appStore, dispatch)
            }
            else {
                /**
                * @param {Object} newAppStore 
                * @description - Adding showhide data into appstore variable to form snapshots of conversion
                */
                const newAppStore = showHideObj?.element?.type === "showhide" ? {...appStore, showHideObj } : appStore;
                tcmSnapshotsForConversion(elementConversionData, indexes, newAppStore, dispatch)
            }

        }
        /**-----------------------------------------------------------------------------------------------------------*/

        if (res && res.data && res.data.type && res.data.type === 'figure' && res.data.figuretype && res.data.figuretype === 'codelisting') {
            if (res.data.figuredata && !res.data.figuredata.programlanguage) {
                res.data.figuredata.programlanguage = 'Select';
            }
        }
        if (currentSlateData.status === 'approved') {
            if(currentSlateData.type==="popup"){
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message' :true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            }
            else{
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            /**
             * PCAT-6929 : Renumbering of List element creates a new version but doesn't reorder the List numbering in element
             */
            // return false;
        }
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        config.conversionInProcess = false
        if (currentSlateData.status === 'wip') {
            config.savingInProgress = false
        }
        config.isSavingElement = false
        tinymce.activeEditor&&tinymce.activeEditor.undoManager&&tinymce.activeEditor.undoManager.clear();
        /**------------------------------------------------[BG-2676]------------------------------------------------- */
        let posterText = res.data && res.data.html && res.data.html.postertext
        let ctaNode = document.querySelector(`#cypress-${indexes[0]}-2.actionPU`)
        if (posterText === "" || posterText === '<p></p>') {
            if (ctaNode) {
                setTimeout(() => {
                    ctaNode.click();
                }, 0)
                ctaNode.classList.add("place-holder")
            }
        } 
        /**-------------------------------------------------------------------------------------------------------- */
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let focusedElement = bodymatter;
        //Separate case for element conversion in showhide
        if (showHideObj) {//newElementData.asideData && newElementData.asideData.hasOwnProperty('type') &&
            //const activeElemType = oldElementInfo['elementType']
            //focusedElement = onUpdateSuccessInShowHide(res.data, focusedElement, activeElemType, showHideObj, indexes)
            onUpdateSuccessInShowHide(res?.data, bodymatter, indexes);
        } else if (appStore.parentUrn.elementType === "group") {
            focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] = res.data
        } else if(appStore?.asideData?.parent?.type === "groupedcontent") {
            switch(indexes.length) {
                case 4:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]] = res?.data;
                    break;
                case 5:
                    focusedElement[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]] = res?.data;
                    break;
            }
        } else {
            indexes.forEach(index => {
                if(focusedElement[index]){
                if(newElementData.elementId === focusedElement[index].id) {
                    focusedElement[index] = res.data
                } else {
                    if(('elementdata' in focusedElement[index] && 'bodymatter' in focusedElement[index].elementdata) || ('contents' in focusedElement[index] && 'bodymatter' in focusedElement[index].contents) || 'interactivedata' in bodymatter[index]) {
                        //  focusedElement = focusedElement[index].elementdata.bodymatter;
                        focusedElement = focusedElement[index].elementdata && focusedElement[index].elementdata.bodymatter ||  focusedElement[index].contents && focusedElement[index].contents.bodymatter ||  bodymatter[index].interactivedata[showHideObj.showHideType]
                    }
                }
            }
            });
        }
        store[config.slateManifestURN].contents.bodymatter = bodymatter;//res.data;
        let altText="";
        let longDesc="";
        if(res.data.figuredata){
            altText=res.data.figuredata && res.data.figuredata.alttext ? res.data.figuredata.alttext : "";
            longDesc = res.data.figuredata && res.data.figuredata.longdescription ? res.data.figuredata.longdescription : "";
        }

        let activeElementObject = {
            elementId: res.data.id,
            index: indexes.join("-"),
            elementType: newElementData.elementType,
            primaryOption: newElementData.primaryOption,
            secondaryOption: newElementData.secondaryOption,
            tag: newElementData.labelText,
            toolbar: newElementData.toolbar,
            elementWipType: newElementData.elementWipType,
            altText,
            longDesc
        };
        if(newElementData.primaryOption=='primary-blockcode-equation'){
            activeElementObject.numbered= res.data.figuredata.numbered
          activeElementObject.startNumber= res.data.figuredata.startNumber
           activeElementObject.syntaxhighlighting= res.data.figuredata.syntaxhighlighting
            
        }
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: store
        });

        /**
         * PCAT-7902 || ShowHide - Content is removed completely when clicking the unordered list button twice.
         * Setting the correct active element to solve this issue.
         */
        if(showHideObj && res.data.type === "element-authoredtext"){
            activeElementObject = {
                ...activeElementObject,
                primaryOption: "primary-paragraph",
                secondaryOption: "secondary-paragraph",
                tag: "P",
                toolbar: [],
                elementWipType: "element-authoredtext"
            }
        }
        //tcm conversion code   
        if (config.tcmStatus) {
            if (elementType.indexOf(oldElementData.type) !== -1) {
                prepareDataForConversionTcm(oldElementData.id, getState, dispatch,res.data.id, res.data);
            }
        }   
        dispatch({
            type: SET_ACTIVE_ELEMENT,
            payload: activeElementObject
        });
        if (activeElementObject.tag === "BQ") {
            const node1 = document.querySelector(`[data-id="${activeElementObject.elementId}"]`)
            const node2 = node1?.querySelector(`.paragraphNummerEins`)
            node2?.focus()
        }
    })
    
    .catch(err =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        dispatch({type: ERROR_POPUP, payload:{show: true}})
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
        console.error("Conversion Error >> ",err)
    })
}
catch (error) {
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
    dispatch({type: ERROR_POPUP, payload:{show: true}})
    console.error(error)
}
}
function prepareDataForConversionTcm(updatedDataID, getState, dispatch,versionid, resData) {
    if (resData.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(resData.figuretype)) {
        return false
    }
    const tcmData = getState().tcmReducer.tcmSnapshot;
    let indexes = []
    tcmData && tcmData.filter(function (element, index) {
    if (element && element.elemURN && (element.elemURN.indexOf(updatedDataID) !== -1 && element.elemURN.includes('urn:pearson:work'))) {
            indexes.push(index)
        }
    });
    if (indexes.length == 0 || (versionid && updatedDataID !== versionid)) {
        tcmData.push({
            "txCnt": 1,
            "isPrevAcceptedTxAvailable": false,
            "elemURN": versionid && updatedDataID !== versionid ? versionid : updatedDataID,
            "feedback": null
        })
    }
    else {
        if(tcmData && tcmData[indexes] && indexes.length > 0 && updatedDataID){
        tcmData[indexes]["elemURN"] = updatedDataID
        tcmData[indexes]["txCnt"] = tcmData[indexes]["txCnt"] !== 0 ? tcmData[indexes]["txCnt"] : 1
        tcmData[indexes]["feedback"] = tcmData[indexes]["feedback"] !== null ? tcmData[indexes]["feedback"] : null
        tcmData[indexes]["isPrevAcceptedTxAvailable"] = tcmData[indexes]["isPrevAcceptedTxAvailable"] ? tcmData[indexes]["isPrevAcceptedTxAvailable"] : false
        }
    }
    if (tcmData.length>0) {
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
    }
    dispatch({
        type: GET_TCM_RESOURCES,
        payload: {
            data: tcmData
        }
    })
}

/**
 * @function tcmSnapshotsForConversion
 * @description-This function is to prepare snapshot during create element process
 * @param {Object} elementConversionData - Object containing required element data
 * @param {String} indexes - index of element
 * @param {Object} appStore - store data
 * @param {Function} dispatch to dispatch tcmSnapshots
*/
export const tcmSnapshotsForConversion = async (elementConversionData,indexes,appStore,dispatch) => {
    const { oldElementData, response, currentSlateData } = elementConversionData
    if (response.hasOwnProperty("figuretype") && !allowedFigureTypesForTCM.includes(response.figuretype)) {
        return false
    }
    let actionStatus = {
        action:"update",
        status:"",
        fromWhere:"conversion"
    }
    let convertAppStore = JSON.parse(JSON.stringify(appStore.slateLevelData));
    let convertSlate = convertAppStore[config.slateManifestURN];
    let convertBodymatter = convertSlate.contents.bodymatter;
    let convertParentData = fetchParentData(convertBodymatter,indexes, appStore.showHideObj, response);
    let versionStatus = fetchManifestStatus(convertBodymatter, convertParentData,response.type);
    /** latest version for WE/CE/PE/AS/2C*/
    convertParentData = await checkContainerElementVersion(convertParentData, versionStatus, currentSlateData)
    /** 
    * @description For SHOWHIDE Element - create showHideObj/AsideData/parentUrn to prepare 
    * snapshots of showhide element
    * @param {String} typeOfElement
    */
    const typeOfElement = convertParentData?.asideData?.grandParent?.asideData?.type;
    if([ELEMENT_ASIDE, MULTI_COLUMN].includes(typeOfElement)) {
        convertParentData = prepareSnapshots_ShowHide(convertParentData, response, indexes);
    }
    if (oldElementData.id !== response.id) {
        oldElementData.id = response.id
        oldElementData.versionUrn = response.id
        let actionStatusVersioning = Object.assign({}, actionStatus);
        actionStatusVersioning.action="create"
        actionStatusVersioning.status ="accepted"
        prepareTcmSnapshots(oldElementData, actionStatusVersioning, convertParentData, "",indexes);
    }
   
    prepareTcmSnapshots(response,actionStatus, convertParentData,"",indexes);
}

const prepareAssessmentDataForConversion = (oldElementData, format) => {

    let usageType = document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText;
    let assessmentFormat = format == "Elm" ? "puf" : format.toLowerCase();
    let assessmentItemType = assessmentFormat == 'tdx' ? "tdxAssessmentItem" : "assessmentItem";
	if (assessmentFormat === "quad cite") {
        assessmentFormat = "cite"
    }
    oldElementData.figuredata.elementdata={
        usagetype : usageType,
        assessmentid : "",
        assessmentitemid : "",
        assessmenttitle: "",
        assessmentitemtitle: "",
        assessmentformat : assessmentFormat,
        assessmentitemtype : assessmentItemType,
        schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment"
    }

    if (oldElementData && oldElementData.html && oldElementData.html.title) {
        oldElementData.html.title = "";
    }
    if (oldElementData && oldElementData.title && oldElementData.title.text) {
        oldElementData.title.text = "";
    }
    
    /** [PCAT-6792] | WIP changes in embedded assessment */
    /** [PCAT-7961] | case(1) - As no unique figuredata.id is present for the assessment,the  'figuredata.id' key is removed */
    if (oldElementData && oldElementData.figuredata && (oldElementData.figuredata.id || oldElementData.figuredata.id == "")) {
        delete oldElementData.figuredata.id;
    }
    /** [PCAT-7961] | case(2) - As no image is present for the assessment,the  'posterimage' key is removed */
    let isPosterImage = oldElementData && oldElementData.figuredata && oldElementData.figuredata.elementdata && oldElementData.figuredata.elementdata.posterimage;
    if (isPosterImage) {
        delete oldElementData.figuredata.elementdata.posterimage
    }
    let asessmentConversionData = {
        oldElementData: oldElementData
    }

    return asessmentConversionData
}

export const handleElementConversion = (elementData, store, activeElement, fromToolbar,showHideObj) => (dispatch, getState) => {
    let { appStore } = getState()
    store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0) {
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let indexes = activeElement.index;
        indexes = indexes.toString().split("-");
        //Separate case for element conversion in showhide
        if(showHideObj || (appStore?.asideData?.type === 'showhide')) {
            const innerElementType = activeElement.elementType
            let oldElementData = handleElementsInShowHide(bodymatter, indexes, innerElementType, showHideObj)
            let showhideElement = {
                currentElement: oldElementData.currentElement,
                index: activeElement.index,
                element: appStore?.asideData,
                showHideType: oldElementData.showHideType
            }
            dispatch(convertElement(oldElementData.currentElement, elementData, activeElement, store, indexes, fromToolbar, showhideElement))
        } else if (appStore && appStore.parentUrn && appStore.parentUrn.elementType === "group") {
            let elementOldData = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
            dispatch(convertElement(elementOldData, elementData, activeElement, store, indexes, fromToolbar, showHideObj))
        } else if(appStore?.asideData?.parent?.type === "groupedcontent") {
            let elementOldData2C;
            switch(indexes.length) {
                case 4:
                    elementOldData2C = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]];
                    break;
                case 5:
                    elementOldData2C = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]];
                    break;
            }
            dispatch(convertElement(elementOldData2C, elementData, activeElement, store, indexes, fromToolbar, showHideObj));
        } else {
            indexes.forEach(index => {
                if(bodymatter[index]){
                    if(elementData.elementId === bodymatter[index].id) {
                        dispatch(convertElement(bodymatter[index], elementData, activeElement, store, indexes, fromToolbar,showHideObj));
                    } else {
                        if( bodymatter[index] && (('elementdata' in bodymatter[index] && 'bodymatter' in bodymatter[index].elementdata) || ('contents' in bodymatter[index] && 'bodymatter' in bodymatter[index].contents) || 'interactivedata' in bodymatter[index])) {
                            
                            bodymatter = bodymatter[index].elementdata && bodymatter[index].elementdata.bodymatter ||   bodymatter[index].contents && bodymatter[index].contents.bodymatter ||  bodymatter[index].interactivedata[showHideObj.showHideType]
                        }
                        
                    }
                }
            
            });
        }
    }
    
    return store;
}

/**
 * 
 * @param {Object} elementData | element's data which is being converted
 * @param {Boolean} fromToolbar | conversion from toolbar (only list type)
 */
export const conversionElement = (elementData, fromToolbar) => (dispatch, getState) => {
    if(!config.conversionInProcess && !config.savingInProgress && !config.isSavingElement){
        let appStore =  getState().appStore;
        dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement, fromToolbar,appStore.showHideObj));
    } else {
        return false;
    }
}

export const setBCEMetadata = (attribute,value) => (dispatch, getState) => {
    let activeElement =  getState().appStore.activeElement;
    activeElement[attribute]=value
    dispatch({
        type: SET_ACTIVE_ELEMENT,
        payload: activeElement
    });

}

export const updateContainerMetadata = (dataToUpdate) => (dispatch, getState) => {
    const parentData = getState().appStore.slateLevelData;
    const currentParentData = JSON.parse(JSON.stringify(parentData));
    let currentSlateData = currentParentData[config.slateManifestURN];
    const updateParams = {
        dataToUpdate,
        activeElement: getState().appStore.activeElement,
        currentSlateData
    }
    let dataToSend = {
        numberedline: dataToUpdate.isNumbered
    }
    if (dataToUpdate.isNumbered == true) {
        dataToSend.startlinenumber = dataToUpdate.startNumber
    }
    let elementEntityUrn = ""
    const updatedData = dispatch(updateContainerMetadataInStore(updateParams,""))
    if(updatedData?.elementEntityUrn){
        elementEntityUrn = updatedData.elementEntityUrn
    }
    dispatch({
        type: AUTHORING_ELEMENT_UPDATE,
        payload: {
            slateLevelData: {[config.slateManifestURN] : updatedData.currentSlateData}
        }
    })
    const url = `${config.REACT_APP_API_URL}v1/${config.projectUrn}/container/${elementEntityUrn}/metadata`
    return axios.put(url, dataToSend, {
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res => {
        if (currentSlateData?.status === 'approved') {
            if (currentSlateData.type === "popup") {
                sendDataToIframe({ 'type': "tocRefreshVersioning", 'message': true });
                sendDataToIframe({ 'type': "ShowLoader", 'message': { status: true } });
                dispatch(fetchSlateData(currentSlateData.id, currentSlateData.contentUrn, 0, currentSlateData, ""));
            }
            else {
                sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
            }
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            config.conversionInProcess = false
            if (currentSlateData.status === 'wip') {
                config.savingInProgress = false
            }
            config.isSavingElement = false
        } else {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            const newParentData = getState().appStore.slateLevelData;
            const parsedParentData = JSON.parse(JSON.stringify(newParentData));
            let newSlateData = parsedParentData[config.slateManifestURN];
            const newParams = {
                dataToUpdate,
                activeElement: getState().appStore.activeElement,
                currentSlateData: newSlateData,
                resData: res.data
            }
            const updatedStore = dispatch(updateContainerMetadataInStore(newParams));
            dispatch({
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: {[config.slateManifestURN] : updatedStore.currentSlateData}
                }
            })
        }
       
        config.conversionInProcess = false
        config.savingInProgress = false
        config.isSavingElement = false
    })
        .catch(err => {
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
            dispatch({ type: ERROR_POPUP, payload: { show: true } })
            config.conversionInProcess = false
            config.savingInProgress = false
            config.isSavingElement = false
            console.error("Conversion Error >> ", err)
        })

}
const updateContainerMetadataInStore = (updateParams, elementEntityUrn="") => (dispatch) => {
    const {
        dataToUpdate,
        activeElement,
        currentSlateData,
        versionedElement
    } = updateParams;
    const { index } = activeElement;
    let tmpIndex = typeof index === 'number' ? index : index.split("-")
    if (typeof tmpIndex === 'number') {
        const updatedElement = prepareElementToUpdate(dataToUpdate, tmpIndex, activeElement, currentSlateData, versionedElement)
        elementEntityUrn = updatedElement.contentUrn
        currentSlateData.contents.bodymatter[tmpIndex] = updatedElement
    }
    return {
        elementEntityUrn, currentSlateData
    }

}

const prepareElementToUpdate = (dataToUpdate, index, activeElement, currentSlateData, versionedElement) => {
    let updatedElement = {};
    if (versionedElement) {
        return versionedElement
    } else {
        if (typeof index === 'number') {
            const { elementType } = activeElement
            updatedElement = currentSlateData.contents.bodymatter[index]
            if (elementType == 'poetry') {
                console.log('dataToUpdate', dataToUpdate)
                updatedElement = {
                    ...updatedElement,
                    numberedline: dataToUpdate.isNumbered,
                    startlinenumber: dataToUpdate.startNumber
                }
            }
        }
        return updatedElement
    }
}
