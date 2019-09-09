import axios from 'axios';

import { EditorConfig } from './../../config/EditorConfig';
import {
    FETCH_SLATE_DATA
} from './../../constants/Action_Constants';

const handleElementConversion = (elementData, store) => {
     store = JSON.parse(JSON.stringify(store));
    if(Object.keys(store).length > 0 && elementData.slateId === Object.keys(store)[0]) {
        let element = store[elementData.slateId];
        let bodymatter = element.contents.bodymatter;
        let format = elementData.secondaryOption.replace('secondary-', '');
        bodymatter.map(element => {
            let htmlText = element.html.text;
            let openingTagIndex = htmlText.indexOf('>') + 1;
            htmlText = htmlText.substring(openingTagIndex).replace(/(<\/\w+>)$/g, '');
            
            htmlText = "<" + EditorConfig.formats[format].block +" className='" + EditorConfig.formats[format].classes + "'>" + htmlText + "</" + EditorConfig.formats[format].block + ">"
            element.html.text = htmlText;
        });
    }

    return store;
}

export const updateElement = (elementData) => (dispatch, getState) => {
    let slateLevelData = handleElementConversion(elementData, getState().appStore.slateLevelData);

    dispatch({
        type: FETCH_SLATE_DATA,
        payload: slateLevelData
    })
}