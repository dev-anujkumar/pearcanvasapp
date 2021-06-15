import config from '../../config/config.js';
import { VIDEO, IMAGE, TEXT } from '../SlateWrapper/SlateWrapperConstants.js';


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