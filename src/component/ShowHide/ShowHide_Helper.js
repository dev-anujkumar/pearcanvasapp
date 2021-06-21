import config from '../../config/config.js';
import { VIDEO, IMAGE, TEXT } from '../SlateWrapper/SlateWrapperConstants.js';
import ElementConstants from '../ElementContainer/ElementConstants';

export const showHideConstants = {
	SHOW: "show",
	HIDE: "hide",
	REVEAL_TEXT: "postertextobject"
}

const figElements = ['figure', "interactive", "audio", "video"];
const textElements = ['element-authoredtext', 'element-list', 'element-blockfeature', 'element-learningobjectives'];

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
export const addNestedElements = (index, parentUrn, asideData, sectionType, props) => {
	return [{
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
		}
	]
}

/* On Clicking of icons on Seprator Dropdown; */
const addElementInShowHide = (index, sectionType, type2BAdded, props) => {
	/*if (this.checkLockStatus()) {
	    this.togglePopup(true)
	    return false
	}*/
	if (config.savingInProgress) {
		return false
	}
	const { id, contentUrn, } = props?.element || {};
	/**
	* @function createShowHideElement
	* @description - This function is to create elements inside showhide
	* @param {String} id - id of parent element (ShowHide)   
	* @param {String} sectionType - type of section in showhide element - show|hide|revealAnswer
	* @param {Object} index - Array of indexs
	* @param {String} contentUrn - of parent element(showhide)
	* @param {String} elementToAdd - type of new element to be addedd - text|image 
	*/
	props.createShowHideElement(id, sectionType, index, contentUrn, null, props?.element, props?.index, type2BAdded);
}
/** 
* @description getShowHideElement - Return the showhide element object from slate data
* @param {Object} _slateBodyMatter - slate data from store
* @param {Number} indexlength - indexlength of showhide element on slate
* @param {Array} iList - array of index heirarchy of showhide element on slate
*/
export function getShowHideElement(_slateBodyMatter, indexlength, iList) {
	try {
		switch(indexlength) {
			case 3: /* SH:Element */
				return _slateBodyMatter[iList[0]];
			case 4: /* AS/WE-Head:SH:Element */
				return _slateBodyMatter[iList[0]]?.elementdata.bodymatter[iList[1]];
			case 5:
				return _slateBodyMatter[iList[0]].type === ElementConstants.MULTI_COLUMN ? 
					_slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]] : /* 2C:SH:Element */
					_slateBodyMatter[iList[0]]?.elementdata.bodymatter[iList[1]]?.contents.bodymatter[iList[2]]; /* WE:Body:SH:Element */
			case 6: /* 2C:AS/WE-Head:SH:Element */
				return _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]]?.elementdata.bodymatter[iList[3]];
			case 7: /* 2C:WE-Body:SH:Element */
				return _slateBodyMatter[iList[0]]?.groupeddata.bodymatter[iList[1]].groupdata.bodymatter[iList[2]]?.elementdata.bodymatter[iList[3]]?.contents.bodymatter[iList[4]];
		}
    } catch(e) {
            console.error("Something went wrong while accessing showhide object...", e);
    	}
}

<<<<<<< HEAD
/* Return the section type using index */
export function indexOfSectionType(indexes){
	const indexList = indexes ? indexes?.toString().split("-") : [];
	const ilength = indexList?.length
	if(ilength >= 3) {
		return findSectionType(indexList[ilength - 2])
	}
=======

/**
 * @function handleElementsInShowHide
 * @description This function finds the inner element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} elementType type of inner element
 * @param {*} showHideObj showHide details
 */
 export const handleElementsInShowHide = (bodymatter, indexes, elementType, showHideObj) => {
    let currentElement
    if (textElements.includes(elementType)) {
        currentElement = getTextElementInShowHide(bodymatter, indexes, showHideObj)
    } else if (figElements.includes(elementType)) {
        currentElement = getFigureElementsInShowHide(bodymatter, indexes, showHideObj)
    }
    return currentElement
}

/**
 * @function getTextElementInShowHide
 * @description This function finds the inner text element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} showHideObj showHide details
 */
const getTextElementInShowHide = (bodymatter, indexes, showHideObj) => {
    let currentElement = {}
    switch (indexes.length) {
        case 3:
            currentElement = bodymatter[indexes[0]].interactivedata[showHideObj.showHideType][indexes[2]]
            break;
        case 4:
            currentElement = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideObj.showHideType][indexes[3]]
            break;
        case 5:
            currentElement = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideObj.showHideType][indexes[4]]
            break;
        case 6:
            currentElement = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideObj.showHideType][indexes[5]]
            break;
        case 7:
            currentElement = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideObj.showHideType][indexes[6]]
            break;
    }
    return currentElement
}
/**
 * @function getFigureElementsInShowHide
 * @description This function finds the inner figure element in show-hide to add G/Fn or Convert
 * @param {*} bodymatter slate bodymatter
 * @param {*} indexes Array of indexs
 * @param {*} showHideObj showHide details
 */
const getFigureElementsInShowHide = (bodymatter, indexes, showHideObj) => {
    let currentElement = {}
    switch (indexes.length) {
        case 4:
            currentElement = bodymatter[indexes[0]].interactivedata[showHideObj.showHideType][indexes[2]]
            break;
        case 5:
            currentElement = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideObj.showHideType][indexes[3]]
            break;
        case 6:
            currentElement = bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideObj.showHideType][indexes[4]]
            break;
        case 7:
            currentElement = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideObj.showHideType][indexes[5]]
            break;
        case 8:
            currentElement = bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideObj.showHideType][indexes[6]]
            break;
    }
    return currentElement
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
export const onUpdateSuccessInShowHide = (resData, bodymatter, activeElemType, showHideObj, indexes) => {
    switch (indexes.length) {
        case 3:
            bodymatter[indexes[0]].interactivedata[showHideObj.showHideType][indexes[2]] = resData
            break;
        case 4:
            if (textElements.includes(activeElemType)) {
                bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideObj.showHideType][indexes[2]] = resData
            } else if (figElements.includes(activeElemType)) {
                bodymatter[indexes[0]].interactivedata[showHideObj.showHideType][indexes[2]] = resData
            }
            break
        case 5:
            if (textElements.includes(activeElemType)) {
                bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideObj.showHideType][indexes[4]] = resData
            } else if (figElements.includes(activeElemType)) {
                bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].interactivedata[showHideObj.showHideType][indexes[3]] = resData
            }
            break
        case 6:
            if (textElements.includes(activeElemType)) {
                bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideObj.showHideType][indexes[5]] = resData
            } else if (figElements.includes(activeElemType)) {
                bodymatter[indexes[0]].elementdata.bodymatter[indexes[1]].contents.bodymatter[indexes[2]].interactivedata[showHideObj.showHideType][indexes[4]] = resData
            }
            break
        case 7:
            if (textElements.includes(activeElemType)) {
                bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideObj.showHideType][indexes[6]] = resData
            } else if (figElements.includes(activeElemType)) {
                bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].interactivedata[showHideObj.showHideType][indexes[5]] = resData
            }
            break
        case 8:
            if (figElements.includes(activeElemType)) {
                bodymatter[indexes[0]].groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]].elementdata.bodymatter[indexes[3]].contents.bodymatter[indexes[4]].interactivedata[showHideObj.showHideType][indexes[6]] = resData
            }
            break
    }
    return bodymatter
>>>>>>> 75425ec3e490d190088bc880e0f100b1afc4a96d
}