import axios from 'axios';

import { EditorConfig } from './../../config/EditorConfig';
import {
    FETCH_SLATE_DATA,
    SET_ELEMENT_TAG,
    SET_ACTIVE_ELEMENT
} from './../../constants/Action_Constants';

import wipElementObject from './ElementWipData';

const handleElementConversion = (elementData, store) => {
    store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0 && elementData.slateId === Object.keys(store)[0]) {
        let storeElement = store[elementData.slateId];
        let bodymatter = storeElement.contents.bodymatter;
        let format = elementData.secondaryOption.replace('secondary-', '');
        bodymatter.map((element, index) => {
            if(elementData.elementId === element.id) {
                let wipData = wipElementObject[format];
                wipData.id = elementData.elementId;
                element = wipData;
                bodymatter[index] = element;
            }
        });
    }
    
    return store;
}

export const updateElement = (elementData) => (dispatch, getState) => {
    let slateLevelData = handleElementConversion(elementData, getState().appStore.slateLevelData);

    let tagList = getState().appStore.elementsTag;
    tagList[elementData.elementId] = elementData.labelText;
    
    let activeElementObject = {
        elementId: elementData.elementId,
        elementType: elementData.elementType,
        primaryOption: elementData.primaryOption,
        secondaryOption: elementData.secondaryOption,
        tag: elementData.labelText
    }
    
    dispatch({
        type: SET_ELEMENT_TAG,
        payload: tagList
    });

    dispatch({
		type: SET_ACTIVE_ELEMENT,
		payload: activeElementObject
	});

    dispatch({
        type: FETCH_SLATE_DATA,
        payload: slateLevelData
    });
}