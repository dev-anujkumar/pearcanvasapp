// IMPORT - plugins
// IMPORT - constants
// import {
//     FETCH_SLATE_DATA,
//     SET_ACTIVE_ELEMENT
// } from './../../constants/Action_Constants';
import { LIST_TYPE_MAPPINGS } from '../../constants/Element_Constants';
// IMPORT - other dependencies
import elementList from '../Sidebar/elementTypes.js';
import { conversionElement } from '../Sidebar/Sidebar_Action.js';

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
let _ullistObjectTemplate_ = {
    "id": "",
    "type": "element-list",
    "subtype": "disc",
    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
    "designtype": "list",
    "elementdata": {
        "schema": "http://schemas.pearson.com/wip-authoring/list/1#/definitions/list",
        "type": "list",
        "listtype": "unordered",
        "designtype": "list",
        "subtype": "disc",
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

export const convertToListElement = (type, startvalue, fromToolbar=true) => (dispatch, getState) => {
    const { activeElement, asideData } = getState().appStore;
    // const newParentData = JSON.parse(JSON.stringify(parentData));
    // const slateObject = Object.values(newParentData)[0];
    // const { contents } = slateObject;
    // const { bodymatter } = contents;
    // let listObjectTemplate = (type === 'disc') ? JSON.parse(JSON.stringify(_ullistObjectTemplate_)) : JSON.parse(JSON.stringify(_listObjectTemplate_));

    // bodymatter.map((element, index) => {
    //     if (activeElement.elementId === element.id) {
    //         //***************************************************************
    //         //************ this is to cover wip conversion case *************
    //         if (!element.html) {
    //             element.html = {
    //                 "text": "<ol class='upper-alpha' treelevel='1' style='counter-increment: none;'><li class='reset listItemNumeroUnoUpperAlpha'>This is a default text and will perform working once wip conversion is ready</li></ol>"
    //             }
    //         }
    //         //***************************************************************
    //         listObjectTemplate.id = element.id;
    //         listObjectTemplate.subtype = type;
    //         listObjectTemplate.elementdata.subtype = type;
    //         listObjectTemplate.elementdata.startNumber = startvalue;
    //         listObjectTemplate.versionUrn = element.versionUrn;
    //         listObjectTemplate.contentUrn = element.versionUrn;
    //         listObjectTemplate.html.text = getInitialListContent(type, startvalue, element.html.text);
    //         bodymatter[index] = listObjectTemplate;
    //     }
    // });


    dispatch(conversionElement({
        elementId: activeElement.elementId,
        elementType: activeElement.elementType,
        primaryOption: "primary-list",
        secondaryOption: LIST_TYPE_MAPPINGS[type].mapType,
        labelText: LIST_TYPE_MAPPINGS[type].tag,
        toolbar: elementList[activeElement.elementType]['primary-list'].toolbar,
        elementWipType: "element-list",
        startvalue,
        asideData
    }, fromToolbar));

    // dispatch(updateElementType(activeElement, type));
    // dispatch({
    //     type: FETCH_SLATE_DATA,
    //     payload: newParentData
    // });
}

// const updateElementType = (activeElement, type) => (dispatch) => {
//     const newActiveElement = {
//         ...activeElement,
//         elementId: activeElement.elementId,
//         elementType: "element-authoredtext",
//         elementWipType: "element-list",
//         primaryOption: "primary-list",
//         secondaryOption: LIST_TYPE_MAPPINGS[type].mapType,
//         tag: LIST_TYPE_MAPPINGS[type].tag
//     }

//     dispatch({
//         type: SET_ACTIVE_ELEMENT,
//         payload: newActiveElement
//     });
// }

// const getInitialListContent = (type, startvalue, preText) => {
//     let htmlContent = new DOMParser().parseFromString(preText, "text/xml");
//     let innerText = htmlContent.firstChild.textContent || '<br />';
//     startvalue = (startvalue > 0) && (startvalue - 1) || 0;

//     switch (type) {
//         case 'decimal':
//             return `<ol class='decimal' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoNumber'>${innerText}</li></ol>`;
//         case 'upper-alpha':
//             return `<ol class='upper-alpha' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoUpperAlpha'>${innerText}</li></ol>`;
//         case 'lower-alpha':
//             return `<ol class='lower-alpha' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoLowerAlpha'>${innerText}</li></ol>`;
//         case 'upper-roman':
//             return `<ol class='upper-roman' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoUpperRoman'>${innerText}</li></ol>`;
//         case 'lower-roman':
//             return `<ol class='lower-roman' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoLowerRoman'>${innerText}</li></ol>`;
//         case 'no-style':
//             return `<ol class='none' treelevel='1' style='counter-increment: none;'><li class='listItemNumeroUnoNone reset'>${innerText}</li></ol>`;
//         case 'disc':
//             return `<ul class='disc' treelevel='1' style='counter-increment: section ${startvalue};'><li class='reset listItemNumeroUnoBullet'>${innerText}</li></ul>`;
//         default:
//             return `<ol class='none' treelevel='1' style='counter-increment: none;'><li class='listItemNumeroUnoNone reset'>${innerText}</li></ol>`
//     }
// }