import React from 'react';
import { SHOW_HIDE } from '../../../constants/Element_Constants.js';
import ElementContainer from '../../ElementContainer/ElementContainer.jsx';
import { ElementSaprator } from '../../ElementSaprator/ElementSaprator.jsx';
import { addElementInShowHide, showHideConstants } from '../ShowHide_Helper';
import SortElement from './SortElement.jsx';

const ShowHideUiBlock = (props) => {
	const { index, parentUrn, asideData, element, addNestedElements,
			sepratorIndex, sectionType, onSortUpdate, showDiscussion, showPlayscript } = props || {};
	/** @description sectionHeading - get the heading of section of showhide */
	const sectionHeading = sectionType === showHideConstants.SHOW ? "Show" : "Hide";

	/**
	* @function renderNestedElements
	* @description-This function is to display seprator and elements in show|hide section inside showhide
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer   
	*/
	function renderNestedElements() {
		return element?.interactivedata[sectionType]?.map((item, i) => {
			/* Form the indexes */
			const indexes = sectionType === showHideConstants.SHOW ? `${index}-0-${i}` : `${index}-2-${i}`;
			const elemSepratorIndex = sectionType === showHideConstants.SHOW ? `${index}-0-${i+1}` : `${index}-2-${i+1}`;
			return (
					<React.Fragment key={item?.id}>
						{ renderElements(item, indexes) }
						{ showSeprator(elemSepratorIndex) }
					</React.Fragment>
				)
		})
	}

	/**
	* @function showSeprator
	* @description-This function is to display seprator at different levels inside showhide
	* @param {String} i - indexes of elements - "showhide-show|hide|revealAnswer-element"
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer   
	* @param {Boolean} isFirst - is this first seprator in section of showhide
	*/
	function showSeprator(i, isFirst) {
		const newParentUrn = {
			contentUrn: element?.contentUrn,
			manifestUrn: element.id
		}
		const elementLineage = {
		 	...element ,
			grandParent: {
				asideData,
				parentUrn
			},
			sectionType
		}
		return <ElementSaprator
			index = {i}
			parentUrn = {newParentUrn}
			asideData = {elementLineage}
			esProps = {addNestedElements(i, sectionType, props)}
			elementType = {element?.type}
			permissions = {props.permissions}
			onClickCapture = {props.onClickCapture}
			userRole = {props.userRole}
			pasteElement = {props.pasteElement}
			source={SHOW_HIDE}
			elementSelection = {props?.elementSelection}
			splithandlerfunction = {addElementInShowHide}
			sectionType = {sectionType}
			createShowHideElement = {props?.createShowHideElement}
			element = {props?.element}
			showPlayscript = {showPlayscript}
			showDiscussion = {showDiscussion}
		/>
	}

	/**
	* @function renderElements
	* @description-This function is to display different elements inside showhide
	* @param {Object} item - data of element(Text|Image) inside ShowHide   
	* @param {String} eleIndex - indexes of elements - "showhide-show|hide|revealAnswer-element"
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer
	*/
	function renderElements(item, eleIndex) {
		const elementLineage = {
		 	...element ,
			grandParent: {
				asideData,
				parentUrn
			},
			sectionType
		}
		const shParentUrn = {
			contentUrn: element.contentUrn,
			elementType: "showhide",
			manifestUrn: element.id
		}
		return <ElementContainer
			element = {item}
			index = {eleIndex}
			parentUrn = {shParentUrn}
			showBlocker = {props.showBlocker}
			asideData = {elementLineage}
			permissions = {props.permissions}
			handleCommentspanel = {props.handleCommentspanel}
			isBlockerActive = {props.isBlockerActive}
			onClickCapture = {props.onClickCapture}
			parentElement = {element}
			onListSelect = {props.onListSelect}
			userRole = {props.userRole}
			pasteElement = {props.pasteElement}
			showHideType = {sectionType}
			handleFocus = {props.handleFocus}
		/>
	}

	return (
		<div>
			{/* Show/Hide Section */}
			<div className="showhide-heading-div">{ sectionHeading } Element</div>
			{ showSeprator(sepratorIndex, true) }
			{/* SortElement to sort innner elements */}
			<SortElement 
				onSortUpdate = {onSortUpdate}
				sectionType = {sectionType}
			>
				{ renderNestedElements() }
			</SortElement>	
		</div>
	)
}

export default ShowHideUiBlock;