import React from 'react';
import ElementContainer from '../../ElementContainer/ElementContainer.jsx';
import { ElementSaprator } from '../../ElementSaprator/ElementSaprator.jsx';
import { showHideConstants } from '../ShowHide_Helper';
import SortElement from './SortElement.jsx';

const ShowHideUiBlock = (props) => {
	const { index, parentUrn, asideData, element, addNestedElements,
			sepratorIndex, sectionType, onSortUpdate, elementAncestors } = props || {};
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
					<>
						{ renderElements(item, indexes) }
						{ showSeprator(elemSepratorIndex, sectionType) }
					</>
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
			contentUrn: element?.contentUrn
		}
		const elementLineage = {
		 	...element ,
			grandParent: {
				asideData,
				parentUrn
			}
		}
		return <ElementSaprator
			index = {i}
			//upperOne = {true}
			firstOne = {isFirst || false}
			parentUrn = {newParentUrn}
			asideData = {elementLineage}
			//parentIndex = {i}
			esProps = {addNestedElements(i, newParentUrn, asideData, sectionType, props)}
			elementType = {element?.type}
			permissions = {props.permissions}
			onClickCapture = {props.onClickCapture}
			splithandlerfunction = {props.splithandlerfunction}
			userRole = {props.userRole}
			pasteElement = {props.pasteElement}
			//source={ASIDE_SOURCE}
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
			}
		}
		return <ElementContainer
			element = {item}
			index = {eleIndex}
			parentUrn = {parentUrn}
			showBlocker = {props.showBlocker}
			asideData = {elementLineage}
			permissions = {props.permissions}
			handleCommentspanel = {props.handleCommentspanel}
			isBlockerActive = {props.isBlockerActive}
			onClickCapture = {props.onClickCapture}
			parentElement = {element}
			onListSelect = {props.onListSelect}
			userRole = {props.userRole}
			elementSepratorProps = {props.elementSepratorProps}
			splithandlerfunction = {props.splithandlerfunction}
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