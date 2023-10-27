import config from '../../config/config.js';
import { VIDEO, IMAGE, TEXT, TABLE_EDITOR, BLOCKCODE, ELEMENT_DIALOGUE, FIGURE_MML, SMARTLINK,
    MMI_ELM, ELEMENT_DISCUSSION, INTERACTIVE, WORKED_EXAMPLE, CONTAINER, CITATION, MANIFEST_LIST,POETRY } from '../SlateWrapper/SlateWrapperConstants.js';
import ElementConstants from '../ElementContainer/ElementConstants';

export const showHideConstants = {
	SHOW: "show",
	HIDE: "hide",
	REVEAL_TEXT: "postertextobject"
}

const figElements = ['figure', "interactive", "audio", "video"];
const textElements = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives'];
export const REVEAL_TEXT_PLACEHOLDER = "This field cannot be empty, either add specific content or add in the default content of Reveal Answer"

/**
* @description findSectionType - Return the section type of showhide element
* @param {Number} index - index of show|hide|revelAnswer
*/
export function findSectionType(index){
    switch(index){
        case "0":
            return "show";
        case "1":
            return "postertextobject";
        case "2":
            return "hide";
    }
}

/* List of Elements can be added inside showhide; Will be displayed on click of 'Seprator + Icon' */
export const addNestedElements = (index, sectionType, props) => {
	let nestedElements = [{
			buttonType: 'text-elem',
			buttonHandler: () => addElementInShowHide(index, sectionType, TEXT, props),
			tooltipText: 'Text',
			tooltipDirection: 'left'
		},{
			buttonType: 'image-elem',
			buttonHandler: () => addElementInShowHide(index, sectionType, IMAGE, props),
			tooltipText: 'Image',
			tooltipDirection: 'left'
		},{
			buttonType: 'audio-elem',
			buttonHandler: () => addElementInShowHide(index, sectionType, VIDEO, props),
			tooltipText: 'Audio/Video',
			tooltipDirection: 'left'
		},{
            buttonType: 'block-text-button',
            tooltipText: 'Block Text',
            tooltipDirection: 'left'
        },{
            buttonType: 'interactive-elem-button',
            tooltipText: 'Interactive',
            tooltipDirection: 'left'
        },{
            buttonType: 'table-editor-elem-button',
            buttonHandler: () => addElementInShowHide(index, sectionType, TABLE_EDITOR, props),
            tooltipText: 'Table',
            tooltipDirection: 'left'
        }
	]
    if (props?.asideData?.type !== "groupedcontent" && props?.asideData?.type !== "element-aside" && !config.isPopupSlate) {
        nestedElements.push({
            buttonType: 'container-elem-button',
            tooltipText: 'Container',
            tooltipDirection: 'left'
        })
        nestedElements.push({
            buttonType: 'worked-exp-elem',
            buttonHandler: () => addElementInShowHide(index, sectionType, WORKED_EXAMPLE, props),
            tooltipText: 'Worked Example',
            tooltipDirection: 'left'
        })
    }
    return nestedElements;
}

/* On Clicking of icons on Seprator Dropdown; */
export const addElementInShowHide = (index, sectionType, type2BAdded, props) => {
	if (config.savingInProgress) {
		return false
	}
    const { element, asideData, parentUrn } = props || {};
	const { id, contentUrn, } = element || {};
    const elementLineage = (asideData?.type === ElementConstants.SHOW_HIDE) ? asideData : {
        ...element,
        sectionType,
        grandParent: {
            asideData,
            parentUrn
        }
    }
    type2BAdded = getElementType(type2BAdded);
	/**
	* @function createShowHideElement
	* @description - This function is to create elements inside showhide
	* @param {String} id - id of parent element (ShowHide)
	* @param {String} sectionType - type of section in showhide element - show|hide|revealAnswer
	* @param {Object} index - Array of indexs
	* @param {String} contentUrn - of parent element(showhide)
	* @param {String} elementToAdd - type of new element to be addedd - text|image
	*/
	props.createShowHideElement(id, sectionType, index, contentUrn, null, elementLineage, props?.index, type2BAdded);
}
/**
* @description getShowHideElement - Return the showhide element object from slate data
* @param {Object} _slateBodyMatter - slate data from store
* @param {Number} indexlength - indexlength of showhide element on slate
* @param {Array} iList - array of index heirarchy of showhide element on slate
*/
export function getShowHideElement(_slateBodyMatter, indexlength, iList, elementType, parentElement) {
	try {
        let sh_Element;
		switch(indexlength) {
			case 3: /* SH:Element */
				sh_Element =  _slateBodyMatter[iList[0]];
                break;
			case 4: /* AS/WE-Head:SH:Element */
				sh_Element = elementType === ElementConstants.BLOCKFEATURE ?  _slateBodyMatter[iList[0]] : _slateBodyMatter[iList[0]]?.elementdata.bodymatter[iList[1]];
                break;
			case 5:
				sh_Element =  _slateBodyMatter[iList[0]].type === ElementConstants.MULTI_COLUMN ?
					_slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]] : /* 2C:SH:Element */
					_slateBodyMatter[iList[0]]?.elementdata.bodymatter[iList[1]]?.contents.bodymatter[iList[2]]; /* WE:Body:SH:Element */
                break;
            case 6: /* TB:Tab:SH:Element */
                if (parentElement?.subtype === ElementConstants.TAB || parentElement?.parent?.subtype === ElementConstants.TAB || parentElement?.grandParent?.asideData?.subtype === ElementConstants.TAB) {
                    sh_Element =  _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[iList[2]].groupdata.bodymatter[iList[3]];
                } else {
                    /* 2C:AS/WE-Head:SH:Element */
                    sh_Element =  _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]]?.elementdata.bodymatter[iList[3]];
                }
                break;
            case 7: /* TB:Tab:AS/WE-Head:SH:Element */
                if (parentElement?.parent?.subtype === ElementConstants.TAB || parentElement?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB) {
                    sh_Element =  _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[iList[2]].groupdata.bodymatter[iList[3]]?.elementdata.bodymatter[iList[4]];
                    /* 2C:WE-Body:SH:Element */
                } else {
                    sh_Element =  _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]]?.elementdata.bodymatter[iList[3]]?.contents.bodymatter[iList[4]];
                }
                break;
            case 8: /* TB:Tab:WE-Body:SH:Element */
                sh_Element =  _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[iList[2]].groupdata.bodymatter[iList[3]]?.elementdata.bodymatter[iList[4]]?.contents.bodymatter[iList[5]];
        }
        if(sh_Element?.type === ElementConstants.SHOW_HIDE) {
            return sh_Element;
        } else {
            console.error("Something went wrong while accessing Showhide element.")
        }
    } catch(e) {
            console.error("Something went wrong while accessing showhide object...", e);
    	}
}

/* Return the section type using index */
export function indexOfSectionType(indexes) {
	let indexList = [];
    if(Array.isArray(indexes)) {
        indexList = indexes;
    } else if(typeof indexes === "string") {
        indexList = indexes ? indexes?.toString().split("-") : [];
    }
	const ilength = indexList?.length;
	if(ilength >= 3) {
		return findSectionType(indexList[ilength - 2])
	}
}

/**
 * @function handleElementsInShowHide
 * @description This function finds the inner element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} elementType type of inner element
 * @param {*} showHideObj showHide details
 */
export const handleElementsInShowHide = (bodymatter, indexes, elementType, showHideObj, calledFrom, parentElement) => {
    let dataToSend = {}
    if (calledFrom == 'glossaryFootnote') {
        if (textElements.includes(elementType)) {
            dataToSend = getTextElementInShowHide(bodymatter, indexes, showHideObj, parentElement)
        } else if (figElements.includes(elementType)) {
            dataToSend = getFigureElementsInShowHide(bodymatter, indexes, showHideObj)
        }
        return dataToSend
    } else {
        return getTextElementInShowHide(bodymatter, indexes, showHideObj, parentElement)//dataToSend
    }
}

/**
 * @function getTextElementInShowHide
 * @description This function finds the inner text element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} showHideObj showHide details
 */
const getTextElementInShowHide = (bodymatter, indexes, showHideObj, parentElement) => {
    const indexLength = Array.isArray(indexes) ? indexes.length : 0;
    let currentElement = {}, showHideElement = {};

    switch (indexes.length) {
        case 3:
            showHideElement = bodymatter[indexes[0]]
            break;
        case 4:
            showHideElement = bodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]
            break;
        case 5:
            showHideElement = bodymatter[indexes[0]].type === ElementConstants.MULTI_COLUMN ?
					bodymatter[indexes[0]]?.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]] : /* 2C:SH:Element */
					bodymatter[indexes[0]]?.elementdata.bodymatter[indexes[1]]?.contents.bodymatter[indexes[2]]; /* WE:Body:SH:Element */
            break;
        case 6: /*TB:Tab:SH:Element */
            if (parentElement?.grandParent?.asideData?.type === ElementConstants.MULTI_COLUMN && parentElement?.grandParent?.asideData?.subtype === ElementConstants.TAB) {
                showHideElement =  bodymatter[indexes[0]]?.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]];
            } else { /* 2C:AS/WE-Head:SH:Element */
                showHideElement = bodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.elementdata?.bodymatter[indexes[3]]
            }
            break;
        case 7:
            // TB->Tab->AS/WE->HEAD->S/H
            if (parentElement?.grandParent?.asideData?.parent?.type === ElementConstants.MULTI_COLUMN && parentElement?.grandParent?.asideData?.parent?.subtype === ElementConstants.TAB) {
                showHideElement =  bodymatter[indexes[0]]?.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]];
            } else {
                showHideElement = bodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata.bodymatter[indexes[2]]?.elementdata?.bodymatter[indexes[3]]?.contents?.bodymatter[indexes[4]];
            }
            break;
        case 8: // TB->Tab->WE->BODY->S/H
            showHideElement =  bodymatter[indexes[0]]?.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[0]?.groupeddata.bodymatter[indexes[2]].groupdata.bodymatter[indexes[3]].elementdata.bodymatter[indexes[4]].contents.bodymatter[indexes[5]];
            break;
    }
    const showHideType = findSectionType(indexes[indexLength -2])
    currentElement = showHideType && showHideElement && showHideElement.interactivedata[showHideType][indexes[indexLength -1]]
    return {currentElement,showHideType}
}
/**
 * @function getFigureElementsInShowHide
 * @description This function finds the inner figure element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} showHideObj showHide details
 */
const getFigureElementsInShowHide = (bodymatter, indexes, showHideObj) => {
    const indexLength = Array.isArray(indexes) ? indexes.length : 0;
    let currentElement = {}, showHideElement = {};
    switch (indexes.length) {
        case 4:
            showHideElement = bodymatter[indexes[0]]//.interactivedata[showHideObj.showHideType][indexes[2]]
            break;
        case 5:
            showHideElement = bodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]//.interactivedata[showHideObj.showHideType][indexes[3]]
            break;
        case 6:
            showHideElement = bodymatter[indexes[0]]?.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]//.interactivedata[showHideObj.showHideType][indexes[4]]
            break;
        case 7:
            showHideElement = bodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.elementdata?.bodymatter[indexes[3]]//.interactivedata[showHideObj.showHideType][indexes[5]]
            break;
        case 8:
            showHideElement = bodymatter[indexes[0]]?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.elementdata?.bodymatter[indexes[3]]?.contents?.bodymatter[indexes[4]]//.interactivedata[showHideObj.showHideType][indexes[6]]
            break;
    }
    const showHideType = (indexLength > 2) && findSectionType(indexes[indexLength -3])
    currentElement = showHideType && showHideElement?.interactivedata[showHideType][indexes[indexLength -2]]
    return {currentElement,showHideType}
}

/**
 * @function getShowHideIndex
 * @description This function prepares the index of figure element inside ShowHide
 * @param {*} tempIndex
 */
export const getShowHideIndex = (tempIndex) => {
    let eleIndex;
    let index = tempIndex;
    index.length = index.length - 1;
    eleIndex = index.join('-');
    return eleIndex;
}

/**
 * @function onUpdateSuccessInShowHide
 * @description This function updates the store with the API response
 * @param {*} resData  API response
 * @param {*} bodymatter slate bodymatter
 * @param {*} activeElemType type of inner element
 * @param {*} showHideObj showHide details
 * @param {*} indexes element index
 * @returns
 */
export const onUpdateSuccessInShowHide = (resData, bodymatter, indexes, parentElement) => {
    let showHideElement = getShowHideElement(bodymatter, indexes?.length, indexes, null, parentElement);
    if(showHideElement?.type === ElementConstants.SHOW_HIDE) {
        const showHideType = indexOfSectionType(indexes);
        if(showHideType) {
            showHideElement.interactivedata[showHideType][indexes[indexes.length - 1]] = resData;
        }
    }
}
export const onGlossaryFnUpdateSuccessInShowHide = (resData, bodymatter, activeElemType, sectionType, indexes, asideParent = {}) => {
    try {
        let shAtIndex = indexes?.length;
        const indexLength = indexes?.length;
        /* if element type is playscript then get the index of SH Element */
        if(activeElemType === "element-dialogue") {
            const indexString = Array.isArray(indexes) ? indexes?.join("-") : indexes?.toString();
            /* get the placeholder of Playscript to find excat type of inner element(SD/DE) in PS and index of SH at slate */
            const placeHolder = document.getElementById(`cypress-${indexString}`)?.getAttribute("placeholder");
            /* Based on placeholder of SD/DE of PS; Calculate index length to get SH Element from slate data */
            if(indexLength > 3 && placeHolder === "Enter Stage Directions...") {
                shAtIndex = indexLength - 1;
            } else if(indexLength > 4 && ["Enter Character Name...", "Enter Dialogue..."].includes(placeHolder)) {
                shAtIndex = indexLength - 2;
            }
        } else /* if element type is figure then get SH Element by calculating length */
            if(activeElemType === "figure") {
                shAtIndex = indexLength - 1;
        }
        /* Get the SH element to update footnote and glossery of inner element */
        let sh_Object = getShowHideElement(bodymatter, shAtIndex, indexes, activeElemType, asideParent);
        if(sh_Object?.type === ElementConstants.SHOW_HIDE && sectionType && shAtIndex) {
            const elementInSH = activeElemType === ElementConstants.BLOCKFEATURE ? sh_Object.interactivedata[sectionType][indexes[shAtIndex - 2]] : sh_Object.interactivedata[sectionType][indexes[shAtIndex - 1]];
            /* Folloing condition is to get element where Footnote and Glossery added */
            if(typeof (resData) === "string" && resData === "GetElementWithFnGlry_SH") {
                /** @function onGlossaryFnUpdateSuccessInShowHide - Being reused to get element when - */
                /* Footnote/Glossery popup opened to display data; Called from glossaaryFootnotePopup Function */
                return elementInSH;
            }
            /* Update the slate level data to update redux store */
            if( activeElemType === ElementConstants.BLOCKFEATURE){
                sh_Object.interactivedata[sectionType][indexes[shAtIndex - 2]] = {
                    ...elementInSH,
                    html: {...elementInSH?.html, ...resData?.html},
                    elementdata: resData?.elementdata
                }
            }else{
                sh_Object.interactivedata[sectionType][indexes[shAtIndex - 1]] = {
                    ...elementInSH,
                    html: {...elementInSH?.html, ...resData?.html},
                    elementdata: resData?.elementdata
                }
            }
        }
        return bodymatter;
    } catch(error) {
        console.error("Something went wrong on updating Footnote/Glossery...",error);
    }
}
/*
export const onGlossaryFnUpdateSuccessInShowHide123 = (resData, bodymatter, activeElemType, showHideObj, indexes) => {
    const indexLength = Array.isArray(indexes) ? indexes.length : 0;
    const showHideIndex = (indexLength > 2) ? (textElements.includes(activeElemType)) ? indexes[indexLength - 2] : (figElements.includes(activeElemType)) ? indexes[indexLength - 3] : "" : ""
    const showHideType = findSectionType(showHideIndex)
    if (activeElemType && showHideType) {
        switch (indexes.length) {
            case 3:
                bodymatter[indexes[0]].interactivedata[showHideType][indexes[2]] = resData
                break;
            case 4:
                if (textElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideType][indexes[2]] = resData
                } else if (figElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].interactivedata[showHideType][indexes[2]] = resData
                }
                break
            case 5:
                if (textElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideType][indexes[4]] = resData
                } else if (figElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideType][indexes[3]] = resData
                }
                break
            case 6:
                if (textElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideType][indexes[5]] = resData
                } else if (figElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideType][indexes[4]] = resData
                }
                break
            case 7:
                if (textElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideType][indexes[6]] = resData
                } else if (figElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideType][indexes[5]] = resData
                }
                break
            case 8:
                if (figElements.includes(activeElemType)) {
                    bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideType][indexes[6]] = resData
                }
                break
        }
    }
    return bodymatter
}
*/
/**
 * @function getElementType
 * @description This function return the element type in format which required for element creation
 * @param {*} type2BAdded  type of element ex. - "blockcode-elem"
 * @returns
 */
function getElementType(type2BAdded) {
    switch(type2BAdded){
        case "figure-mml-elem": return FIGURE_MML;
        case "blockcode-elem": return BLOCKCODE;
        case "element-dialogue": return ELEMENT_DIALOGUE;
        case "smartlink-elem": return SMARTLINK;
        case "element-discussion": return ELEMENT_DISCUSSION;
        case "elm-interactive-elem": return MMI_ELM;
        case "interactive-elem": return INTERACTIVE;
        case "container-elem": return CONTAINER;
        case "citations-group-elem": return CITATION;
        case "blocklist-elem" :return MANIFEST_LIST
        case "poetry-elem": return POETRY;
        default: return type2BAdded;
    }
}