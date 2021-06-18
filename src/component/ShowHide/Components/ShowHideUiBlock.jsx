import React from 'react';
import ElementContainer from '../../ElementContainer/ElementContainer.jsx';
import { ElementSaprator } from '../../ElementSaprator/ElementSaprator.jsx';
import SortElement from './SortElement.jsx';

function ShowHideUiBlock(props) {
	const { index, parentUrn, asideData, element, elementList2Add,
			sepratorIndex, sectionType, onSortUpdate } = props || {};
	/** @description sectionHeading - get the heading of section of showhide */
	const sectionHeading = sectionType === "show" ? "Show" : "Hide";

	/**
	* @function showDifferentElements
	* @description-This function is to display seprator and elements in show|hide section inside showhide
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer   
	*/
	function showDifferentElements() {
		return element?.interactivedata[sectionType]?.map((item, i) => {
			/* Form the indexes */
			const indexs = sectionType === "show" ? `${index}-0-${i}` : `${index}-2-${i}`;
			const indexSepra = sectionType === "show" ? `${index}-0-${i+1}` : `${index}-2-${i+1}`;
			return (
					<>
						{ showElements(item, indexs) }
						{ showSeprator(indexSepra) }
					</>
				)
		})
	}

	/**
	* @function showSeprator
	* @description-This function is to display seprator at different levels inside showhide
	* @param {String} i - indexs of elements - "showhide-show|hide|revealAnswer-element"
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
			esProps = {elementList2Add(i, newParentUrn, asideData, sectionType, props)}
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
	* @function showElements
	* @description-This function is to display different elements inside showhide
	* @param {Object} item - data of element(Text|Image) inside ShowHide   
	* @param {String} i - indexs of elements - "showhide-show|hide|revealAnswer-element"
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer
	*/
	function showElements(item, i) {
		const elementLineage = {
		 	...element ,
			grandParent: {
				asideData,
				parentUrn
			}
		}

		return <ElementContainer
			element = {item}
			index = {i}
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
			handleFocus = {props.handleFocus}
			//showHideType = {sectionType}
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
				{ showDifferentElements() }
			</SortElement>	
		</div>
	)
}

export default ShowHideUiBlock;