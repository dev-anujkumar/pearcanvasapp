import axios from 'axios';

import config  from './../../config/config';
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT
} from './../../constants/Action_Constants';

import wipElementObject from './ElementWipData';
import elementTypes from './../Sidebar/elementTypes';

const { REACT_APP_API_URL, ssoToken } = config;

const headers = {
    "Content-Type" : "application/json",
    "PearsonSSOSession": ssoToken
}

const convertElement = (oldElementData, newElementData, oldElementInfo, store, indexes) => dispatch => {
    
    // Input Element
    const inputPrimaryOptionsList = elementTypes[oldElementInfo['elementType']],
        inputPrimaryOptionType = inputPrimaryOptionsList[oldElementInfo['primaryOption']],
        inputPrimaryOptionEnum = inputPrimaryOptionType['enum'],
        overallType = inputPrimaryOptionsList['enumType']

    const inputSubTypeList = inputPrimaryOptionType['subtype'],
        inputSubType = inputSubTypeList[[oldElementInfo['secondaryOption']]],
        inputSubTypeEnum = inputSubType['enum']
    
    // Output Element
    const outputPrimaryOptionsList = elementTypes[newElementData['elementType']],
        outputPrimaryOptionType = outputPrimaryOptionsList[newElementData['primaryOption']],
        outputPrimaryOptionEnum = outputPrimaryOptionType['enum']

    const outputSubTypeList = outputPrimaryOptionType['subtype'],
        outputSubType = outputSubTypeList[[newElementData['secondaryOption']]],
        outputSubTypeEnum = outputSubType['enum']

    const conversionDataToSend = {
        ...oldElementData,
        inputType : inputPrimaryOptionEnum,
        inputSubType : inputSubTypeEnum,
        outputType : outputPrimaryOptionEnum,
        outputSubType: outputSubTypeEnum
    }
    
    const url = `${REACT_APP_API_URL}v1/slate/elementTypeConversion/${overallType}`
    axios.post(url, JSON.stringify(conversionDataToSend), { headers })
    .then(res =>{
        let storeElement = store[config.slateManifestURN];
        let bodymatter = storeElement.contents.bodymatter;
        let focusedElement = bodymatter;
        indexes.forEach(index => {
            if(newElementData.elementId === focusedElement[index].id) {
                focusedElement[index] = res.data;
            } else {
                if('elementdata' in focusedElement[index] && 'bodymatter' in focusedElement[index].elementdata) {
                    focusedElement = focusedElement[index].elementdata.bodymatter;
                }
            }
        });
        store[config.slateManifestURN].contents.bodymatter = bodymatter;//res.data;

        let activeElementObject = {
            elementId: newElementData.elementId,
            index: indexes,
            elementType: newElementData.elementType,
            primaryOption: newElementData.primaryOption,
            secondaryOption: newElementData.secondaryOption,
            tag: newElementData.labelText
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
        console.log(err) 
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
                if('elementdata' in bodymatter[index] && 'bodymatter' in bodymatter[index].elementdata) {
                    bodymatter = bodymatter[index].elementdata.bodymatter;
                }
                
            }
        });
    }
    
    return store;
}

export const updateElement = (elementData) => (dispatch, getState) => {
    let appStore =  getState().appStore;
    dispatch(handleElementConversion(elementData, appStore.slateLevelData, appStore.activeElement));
    // let slateLevelData = handleElementConversion(elementData, getState().appStore.slateLevelData);
    
    // let activeElementObject = {
    //     elementId: elementData.elementId,
    //     elementType: elementData.elementType,
    //     primaryOption: elementData.primaryOption,
    //     secondaryOption: elementData.secondaryOption,
    //     tag: elementData.labelText
    // }

    // dispatch({
	// 	type: SET_ACTIVE_ELEMENT,
	// 	payload: activeElementObject
	// });

    // dispatch({
    //     type: FETCH_SLATE_DATA,
    //     payload: slateLevelData
    // });
}