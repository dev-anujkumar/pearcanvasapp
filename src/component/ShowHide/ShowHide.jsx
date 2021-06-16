
import React from 'react';
import { connect } from 'react-redux';
import config from '../../config/config.js';
import { createShowHideElement } from '../ElementContainer/ElementContainer_Actions.js';
import { VIDEO, IMAGE, TEXT } from '../SlateWrapper/SlateWrapperConstants.js';
import ShowHideUiBlock from './Components/ShowHideUiBlock.jsx';

/**
* @ShowHide is container class of showhide element. 
*/
class ShowHide extends React.Component {

	/* List of Elements can be added inside showhide; Will be displayed on click of 'Seprator + Icon' */
	nestedElementsList = (index, firstOne, parentUrn, asideData, sectionType) => {
        return [{
                buttonType: 'text-elem',
                buttonHandler: () => this.addElementInShowHide(index, firstOne, sectionType, TEXT),
                tooltipText: 'Text',
                tooltipDirection: 'left'
            },{
                buttonType: 'image-elem',
                buttonHandler: () => this.addElementInShowHide(index, firstOne, sectionType, IMAGE),
                tooltipText: 'Image',
                tooltipDirection: 'left'
            },{
                buttonType: 'audio-elem',
                buttonHandler: () => this.addElementInShowHide(index, firstOne, sectionType, VIDEO),
                tooltipText: 'Audio/Video',
                tooltipDirection: 'left'
            }
		]
	}
	/* On Clicking of icons on Seprator Dropdown; */
	addElementInShowHide = (index, firstOne, sectionType, type2BAdded) => {
        //if (this.checkLockStatus()) {
        //    this.togglePopup(true)
        //    return false
        //}
        if (config.savingInProgress) {
            return false
        }

       	const { id, contentUrn, } = this.props?.element || {};
		/* Call the create element api to create new element */
		/**
		* @function createShowHideElement
		* @description - This function is to create elements inside showhide
		* @param {String} id - id of parent element (ShowHide)   
		* @param {String} sectionType - type of section in showhide element - show|hide|revealAnswer
		* @param {Object} index - Array of indexs
		* @param {String} contentUrn - of parent element(showhide)
		* @param {String} type2BAdded - type of new element to be addedd - text|image 
		*/
        this.props.createShowHideElement(id, sectionType, index, contentUrn, null, this.props?.element, this.props?.index, type2BAdded);
	}

	render() {
		return (
			<div className="show-hide-component">
				<ShowHideUiBlock 
					nestedElementsList = {this.nestedElementsList}
					{...this.props}/>
			</div>
		)
	}
}

const dispatchActions = {
    createShowHideElement
}
export default connect(null, dispatchActions)(ShowHide);