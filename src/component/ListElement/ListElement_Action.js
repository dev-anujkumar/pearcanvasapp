// IMPORT - plugins
import axios from 'axios';
// IMPORT - constants
import {
    FETCH_SLATE_DATA,
    SET_ACTIVE_ELEMENT
} from './../../constants/Action_Constants';
// IMPORT - other dependencies

// ************************************************************************
// *************************** List Template ****************************** 
let _listObjectTemplate_ = {
    "id": "",
    "type": "element-list",
    "subtype": "",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "designtype": "list",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/list/1#/definitions/list",
        "type": "list",
        "listtype": "ordered",
        "designtype": "list",
        "subtype": "",
        "startNumber": "",
        "listitems": []
    },
    "html": {
        "text": ``
    },
    "comments": false,
    "tcm": true,
    "versionUrn": "",
    "contentUrn": ""
}
// ************************************************************************

export const convertToListElement = (type, startvalue) => (dispatch, getState) => {
    const { slateLevelData: parentData, activeElement } = getState().appStore;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const slateObject = Object.values(newParentData)[0];
    const { contents } = slateObject;
    const { bodymatter } = contents;
    bodymatter.map((element, index) => {
        if (activeElement.elementId === element.id) {
            _listObjectTemplate_.id = element.id;
            _listObjectTemplate_.subtype = type;
            _listObjectTemplate_.elementdata.subtype = type;
            _listObjectTemplate_.elementdata.startNumber = startvalue;
            _listObjectTemplate_.versionUrn = element.versionUrn;
            _listObjectTemplate_.contentUrn = element.versionUrn;
            _listObjectTemplate_.html.text = getInitialListContent(type, startvalue, element.html.text);
            bodymatter[index] = JSON.parse(JSON.stringify(_listObjectTemplate_));
        }
    });

    dispatch(updateElementType(activeElement));
    dispatch({
        type: FETCH_SLATE_DATA,
        payload: newParentData
    });
}

const updateElementType = (activeElement) => (dispatch) => {
    const newActiveElement = {
        elementId: activeElement.elementId,
        elementType: "element-authoredtext",
        elementWipType: "element-list",
        primaryOption: "primary-list",
        secondaryOption: "secondary-list-3",
        tag: "OL"
    }

    dispatch({
        type: SET_ACTIVE_ELEMENT,
        payload: newActiveElement
    });
}

const getInitialListContent = (type, startvalue, preText) => {
    let htmlContent = new DOMParser().parseFromString(preText, "text/xml");
    let innerText = htmlContent.firstChild.textContent || '<br />';
    startvalue = (startvalue > 0) && (startvalue - 1) || 0;

    switch (type) {
        case 'decimal':
            return `<ol class='decimal' data-treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoNumber'>${innerText}</li></ol>`;
        case 'upper-alpha':
            return `<ol class='upper-alpha' data-treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoUpperAlpha'>${innerText}</li></ol>`;
        case 'lower-alpha':
            return `<ol class='lower-alpha' data-treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoLowerAlpha'>${innerText}</li></ol>`;
        case 'upper-roman':
            return `<ol class='upper-roman' data-treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoUpperRoman'>${innerText}</li></ol>`;
        case 'lower-roman':
            return `<ol class='lower-roman' data-treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoLowerRoman'>${innerText}</li></ol>`;
        case 'no-style':
            return `<ol class='none' data-treelevel='1' style='counter-increment: none;'><li class='listItemNumeroUnoNone reset'>${innerText}</li></ol>`;
        default:
            return `<ol class='none' data-treelevel='1' style='counter-increment: none;'><li class='listItemNumeroUnoNone reset'>${innerText}</li></ol>`
    }
}