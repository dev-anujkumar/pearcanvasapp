import axios from 'axios';
import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT
} from './../../constants/Action_Constants';
import elementTypes from './../Sidebar/elementTypes';
import figureDataBank from '../../js/figure_data_bank';
import { sendDataToIframe } from '../../constants/utility.js';
let imageSource = ['image','table','mathImage'],imageDestination = ['primary-image-figure','primary-image-table','primary-image-equation']

const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes) => dispatch => {
    try {
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
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

        if(oldElementData.figuretype && oldElementData.figuretype === "codelisting" && newElementData['primaryOption'] === "primary-blockcode-equation") {
            oldElementData.figuredata.programlanguage = elementTypes[newElementData['elementType']][newElementData['primaryOption']].subtype[newElementData['secondaryOption']].text;
        }
    }

    let outputSubTypeEnum = outputSubType['enum'],
    outputPrimaryOptionEnum = outputPrimaryOptionType['enum']
    if (oldElementData.figuretype === "assessment") {
        let usageType=document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText;
        outputPrimaryOptionEnum=outputSubType['enum'],
        outputSubTypeEnum = usageType.toUpperCase().replace(" ", "_").replace("-", "_"),
        oldElementData.figuredata.elementdata.usagetype=usageType;
        let assessmentFormat =outputSubType.text.toLowerCase();
        let assessmentItemType ="";
        if(assessmentFormat==="cite"){
            assessmentItemType ="assessmentItem";
        }else{
            assessmentItemType = "tdxAssessmentItem";
        }        
        oldElementData.html.title = "";
        oldElementData.figuredata.elementdata.assessmentformat=assessmentFormat
        oldElementData.figuredata.elementdata.assessmentitemtype=assessmentItemType;
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
        let domHtml = editableDom.innerHTML
        if (storeHtml !== domHtml) {
            oldElementData.html.text = domHtml
        }
        /**
         * case - if bullet list is being converted into bullet again then explicitly proceed with paragraph coversion
         */
        if (inputPrimaryOptionEnum === outputPrimaryOptionEnum && inputSubTypeEnum === outputSubTypeEnum && outputSubTypeEnum === "DISC") {
            outputPrimaryOptionEnum = "AUTHORED_TEXT"
            outputSubTypeEnum = "NA"
        }
    }
    const conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum,
        projectUrn : config.projectUrn,
        slateUrn:config.slateManifestURN,
        counterIncrement: (newElementData.startvalue > 0) ? (newElementData.startvalue - 1) : 0
    }

    
    const url = `${config.REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), { 
        headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
    }).then(res =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let focusedElement = bodymatter;
        indexes.forEach(index => {
            if(newElementData.elementId === focusedElement[index].id) {
                focusedElement[index] = res.data;
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
            elementId: newElementData.elementId,
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
    })
    .catch(err =>{
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
        //console.log(err) 
    })
}
catch (error) {
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: false } })
}
}

const handleElementConversion = (elementData, store, activeElement) => dispatch => {
    store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0 && config.slateManifestURN === Object.keys(store)[0]) {
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let indexes = activeElement.index;
        indexes = indexes.toString().split("-");
        
        indexes.forEach(index => {
            if(elementData.elementId === bodymatter[index].id) {
                dispatch(convertElement(bodymatter[index], elementData, activeElement, store, indexes));
            } else {
                if(('elementdata' in bodymatter[index] && 'bodymatter' in bodymatter[index].elementdata) || ('contents' in bodymatter[index] && 'bodymatter' in bodymatter[index].contents))  {
                    bodymatter = bodymatter[index].elementdata && bodymatter[index].elementdata.bodymatter ||  bodymatter[index].contents.bodymatter
                }
                
            }
        });
    }
    
    return store;
}

export const conversionElement = (elementData) => (dispatch, getState) => {
    let appStore =  getState().appStore;
    dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement));
}