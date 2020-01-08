import axios from 'axios';
import tinymce from 'tinymce/tinymce';
import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT,
    ERROR_POPUP
} from './../../constants/Action_Constants';
import elementTypes from './../Sidebar/elementTypes';
import figureDataBank from '../../js/figure_data_bank';
import { sendDataToIframe } from '../../constants/utility.js';
let imageSource = ['image','table','mathImage'],imageDestination = ['primary-image-figure','primary-image-table','primary-image-equation']

export const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes, fromToolbar) => (dispatch,getState) => {
    let appStore =  getState().appStore;
    try {
        let conversionDataToSend = {};
    // Input Element
    const inputPrimaryOptionsList = elementTypes[oldElementInfo['elementType']],
        inputPrimaryOptionType = inputPrimaryOptionsList[oldElementInfo['primaryOption']],
        overallType = inputPrimaryOptionsList['enumType']

    const inputSubTypeList = inputPrimaryOptionType['subtype'],
        inputSubType = inputSubTypeList[[oldElementInfo['secondaryOption']]]

    let inputSubTypeEnum = inputSubType['enum'],
    inputPrimaryOptionEnum = inputPrimaryOptionType['enum']
    if(oldElementData.figuretype==="assessment"){
        inputPrimaryOptionEnum=inputSubType['enum'];
        inputSubTypeEnum=document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText.toUpperCase().replace(" ", "_").replace("-", "_");
    }
    
    // Output Element
    const outputPrimaryOptionsList = elementTypes[newElementData['elementType']],
        outputPrimaryOptionType = outputPrimaryOptionsList[newElementData['primaryOption']]

    const outputSubTypeList = outputPrimaryOptionType['subtype'],
        outputSubType = outputSubTypeList[[newElementData['secondaryOption']]]

    if (oldElementData.type === "figure") {
        if (!(imageSource.includes(oldElementData.figuretype) && imageDestination.includes(newElementData['primaryOption']))){
            oldElementData.figuredata = {...figureDataBank[newElementData['primaryOption']]}
        }
        if(oldElementData.figuredata.srctype){
            oldElementData.figuredata.srctype=outputSubType['wipValue']
        }
        if(oldElementData.figuredata.interactivetype){
            oldElementData.figuredata.interactivetype=outputSubType['wipValue'];
        }

        /* on Conversion removing the tinymce instance for BCE element*/
        if ((outputPrimaryOptionType && outputPrimaryOptionType['enum'] === "BLOCK_CODE_EDITOR" || newElementData && newElementData['primaryOption'] === 'primary-blockcode-equation') &&
            newElementData['secondaryOption'] === "secondary-blockcode-language-Default") {
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
            oldElementData.figuredata.programlanguage = elementTypes[newElementData['elementType']][newElementData['primaryOption']].subtype[newElementData['secondaryOption']].text;
        }
    }

    let outputSubTypeEnum = outputSubType['enum'],
    outputPrimaryOptionEnum = outputPrimaryOptionType['enum']
    if (oldElementData.figuretype === "assessment") {
        let usageType=document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText;
        outputPrimaryOptionEnum=outputSubType['enum'];
        outputSubTypeEnum = usageType.toUpperCase().replace(" ", "_").replace("-", "_");
        oldElementData.figuredata.elementdata.usagetype=usageType;
        let assessmentFormat =outputSubType.text.toLowerCase();
        let assessmentItemType ="";
        if(assessmentFormat==="cite"){
            assessmentItemType ="assessmentItem";
        }else{
            assessmentItemType = "tdxAssessmentItem";
        }
        // oldElementData['html']['title'] = "";
        oldElementData.figuredata.elementdata.assessmentformat=assessmentFormat
        oldElementData.figuredata.elementdata.assessmentitemtype=assessmentItemType;
        oldElementData.html.title="";
    }
    /**
     * Patch [code in If block] - in case list is being converted from toolbar and there are some unsaved changes in current element
     * then send dom html data instead of sending store data
     */
    if (newElementData.primaryOption === "primary-list") {
        let storeHtml = oldElementData.html && oldElementData.html.text || ''
        let containerDom = document.querySelector(`[data-id='${oldElementData.id}']`)
        let elementContainer = containerDom && containerDom.querySelector('.element-container')
        let editableDom = elementContainer && elementContainer.querySelector('.cypress-editable')
        let domHtml = editableDom ? editableDom.innerHTML : "<ol></ol>"
        if (storeHtml !== domHtml) {
            oldElementData.html.text = domHtml
        }
        /**
         * case - if list is being converted from sidepanel then pick counterIncrement value from element data
         */
        if (outputSubTypeEnum !== "DISC" && newElementData.startvalue === undefined && oldElementData.elementdata.type === 'list' && oldElementData.elementdata.startNumber) {
            newElementData.startvalue = parseInt(oldElementData.elementdata.startNumber) + 1 
        }
        /**
         * case - if bullet list is being converted into bullet again then explicitly proceed with paragraph coversion
         */
        if (inputPrimaryOptionEnum === outputPrimaryOptionEnum && inputSubTypeEnum === outputSubTypeEnum && outputSubTypeEnum === "DISC" && fromToolbar) {
            outputPrimaryOptionEnum = "AUTHORED_TEXT"
            outputSubTypeEnum = "NA"
        }
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
            case "SIDEBAR_06":
                elemDesigntype = "asideSidebar06"
                break;
            case "SIDEBAR_01":
            default:
                elemDesigntype = "asideSidebar01"
                break;
        }
        oldElementData.designtype = elemDesigntype
    }
    conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum,
        projectUrn : config.projectUrn,
        projectURN : config.projectUrn,
        slateUrn:appStore.parentUrn?appStore.parentUrn.manifestUrn: config.slateManifestURN,
        counterIncrement: (newElementData.startvalue > 0) ? (newElementData.startvalue - 1) : 0,
        index: indexes[indexes.length - 1],
        slateEntity : appStore.parentUrn?appStore.parentUrn.contentUrn:config.slateEntityURN
    }

    let elmIndexes = indexes ? indexes : 0;
    let slateBodyMatter = store[config.slateManifestURN].contents.bodymatter;
    if(elmIndexes.length === 2 && slateBodyMatter[elmIndexes[0]].subtype == "workedexample" ){
        if(slateBodyMatter[elmIndexes[0]].elementdata.bodymatter[elmIndexes[1]].id === conversionDataToSend.id){
            conversionDataToSend.isHead = true;
            conversionDataToSend.parentType = "workedexample";
        }
    }else if(elmIndexes.length === 3 && slateBodyMatter[elmIndexes[0]].subtype == "workedexample"){
        if(slateBodyMatter[elmIndexes[0]].elementdata.bodymatter[elmIndexes[1]].contents.bodymatter[elmIndexes[2]].id === conversionDataToSend.id){
            conversionDataToSend.isHead = false;
            conversionDataToSend.parentType = "workedexample";
        }
    }else if(elmIndexes.length === 2 && slateBodyMatter[elmIndexes[0]].subtype == "sidebar"){
        if(slateBodyMatter[elmIndexes[0]].elementdata.bodymatter[elmIndexes[1]].id === conversionDataToSend.id){
            conversionDataToSend.isHead = false;
            conversionDataToSend.parentType = "element-aside";
        }
    }

    if(conversionDataToSend.outputType==="SHOW_HIDE"||conversionDataToSend.outputType==="POP_UP"){
        slateBodyMatter.forEach((elem)=>{
            if(elem.type==="element-aside"){
                elem.elementdata.bodymatter.forEach((nestElem)=>{
                    if(nestElem.id===conversionDataToSend.id){
                        conversionDataToSend.slateUrn = elem.versionUrn;
                        conversionDataToSend.slateEntity = elem.contentUrn;
                    }
                })
            }
        })
    }

    if (newElementData.primaryOption !== "primary-list" && conversionDataToSend.inputType === conversionDataToSend.outputType && conversionDataToSend.inputSubType === conversionDataToSend.outputSubType) {
        return;
    }

    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })

    const url = `${config.REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), { 
        headers: {
            "Content-Type": "application/json",
            "PearsonSSOSession": config.ssoToken
        }
    }).then(res =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })

        tinymce.activeEditor&&tinymce.activeEditor.undoManager&&tinymce.activeEditor.undoManager.clear();

        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let focusedElement = bodymatter;
        indexes.forEach(index => {
            if(newElementData.elementId === focusedElement[index].id) {
                focusedElement[index] = res.data//ElementWipData.showhide;
            } else {
                if(('elementdata' in focusedElement[index] && 'bodymatter' in focusedElement[index].elementdata) || ('contents' in focusedElement[index] && 'bodymatter' in focusedElement[index].contents)) {
                    //  focusedElement = focusedElement[index].elementdata.bodymatter;
                    focusedElement = focusedElement[index].elementdata && focusedElement[index].elementdata.bodymatter ||  focusedElement[index].contents.bodymatter
                }
            }
        });
        store[config.slateManifestURN].contents.bodymatter = bodymatter;//res.data;
        let altText="";
        let longDesc="";
        if(res.data.figuredata){
            altText=res.data.figuredata && res.data.figuredata.alttext ? res.data.figuredata.alttext : "";
            longDesc = res.data.figuredata && res.data.figuredata.longdescription ? res.data.figuredata.longdescription : "";
        }

        let activeElementObject = {
            elementId: res.data.id,
            // elementId: newElementData.elementId,
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
        dispatch({
            type: FETCH_SLATE_DATA,
            payload: store
        });

        dispatch({
            type: SET_ACTIVE_ELEMENT,
            payload: activeElementObject
        });

        if(activeElementObject.primaryOption === "primary-showhide"){
           let showHideRevealElement = document.getElementById(`cypress-${indexes[0]}-2-0`)
           if(showHideRevealElement){
                showHideRevealElement.focus()
                showHideRevealElement.blur()
           } 
        }
    })
    
    .catch(err =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        console.log("Conversion Error >> ",err) 
        dispatch({type: ERROR_POPUP, payload:{show: true}})
    })
}
catch (error) {
    console.log(error)
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
    dispatch({type: ERROR_POPUP, payload:{show: true}})
}
}

export const handleElementConversion = (elementData, store, activeElement, fromToolbar) => dispatch => {
    store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0) {
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let indexes = activeElement.index;
        indexes = indexes.toString().split("-");
        
        indexes.forEach(index => {
            if(elementData.elementId === bodymatter[index].id) {
                dispatch(convertElement(bodymatter[index], elementData, activeElement, store, indexes, fromToolbar));
            } else {
                if(('elementdata' in bodymatter[index] && 'bodymatter' in bodymatter[index].elementdata) || ('contents' in bodymatter[index] && 'bodymatter' in bodymatter[index].contents))  {
                    bodymatter = bodymatter[index].elementdata && bodymatter[index].elementdata.bodymatter ||  bodymatter[index].contents.bodymatter
                }
                
            }
        });
    }
    
    return store;
}

/**
 * 
 * @param {Object} elementData | element's data which is being converted
 * @param {Boolean} fromToolbar | conversion from toolbar (only list type)
 */
export const conversionElement = (elementData, fromToolbar) => (dispatch, getState) => {
    let appStore =  getState().appStore;
    dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement, fromToolbar));
}