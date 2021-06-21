import config from '../../config/config.js';
import { VIDEO, IMAGE, TEXT } from '../SlateWrapper/SlateWrapperConstants.js';
import ElementConstants from '../ElementContainer/ElementConstants';


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
export const elementList2Add = (index, parentUrn, asideData, sectionType, props) => {
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
	* @param {String} type2BAdded - type of new element to be addedd - text|image 
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
