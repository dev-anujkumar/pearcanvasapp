import axios from 'axios';
import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT
} from './../../constants/Action_Constants';
import elementTypes from './../Sidebar/elementTypes';
import figureDataBank from '../../js/figure_data_bank';

const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes) => dispatch => {
    
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
        inputSubTypeEnum=document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText.toUpperCase();
    }
    
    // Output Element
    const outputPrimaryOptionsList = elementTypes[newElementData['elementType']],
        outputPrimaryOptionType = outputPrimaryOptionsList[newElementData['primaryOption']]

    const outputSubTypeList = outputPrimaryOptionType['subtype'],
        outputSubType = outputSubTypeList[[newElementData['secondaryOption']]]

    if (oldElementData.type === "figure") {
        oldElementData.figuredata = figureDataBank[newElementData['primaryOption']]
        if(oldElementData.figuredata.srctype){
            oldElementData.figuredata.srctype=outputSubType['wipValue']
        }
        if(oldElementData.figuredata.interactivetype){
            oldElementData.figuredata.interactivetype=outputSubType['wipValue'];
        }
    }

    let outputSubTypeEnum = outputSubType['enum'],
    outputPrimaryOptionEnum = outputPrimaryOptionType['enum']
    if (oldElementData.figuretype === "assessment") {
        let usageType=document.querySelector(`div[data-id='${oldElementData.id}'] span.singleAssessment_Dropdown_currentLabel`).innerText;
        outputPrimaryOptionEnum=outputSubType['enum'],
        outputSubTypeEnum = usageType.toUpperCase(),
        oldElementData.figuredata.elementdata.usagetype=usageType;
    }

    const conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum,
        projectUrn : config.projectUrn
    }

    
    const url = `${config.REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), { 
        headers: {
			"Content-Type": "application/json",
			"PearsonSSOSession": config.ssoToken
		}
    }).then(res =>{
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

        let activeElementObject = {
            elementId: newElementData.elementId,
            index: indexes.join("-"),
            elementType: newElementData.elementType,
            primaryOption: newElementData.primaryOption,
            secondaryOption: newElementData.secondaryOption,
            tag: newElementData.labelText,
            toolbar: newElementData.toolbar
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
        //console.log(err) 
    })
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

export const updateElement = (elementData) => (dispatch, getState) => {
    let appStore =  getState().appStore;
    dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement));
}