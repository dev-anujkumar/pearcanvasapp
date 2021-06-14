import React from 'react';
import ElementContainer from '../../ElementContainer/ElementContainer.jsx';
import { ElementSaprator } from '../../ElementSaprator/ElementSaprator.jsx';
import RevealAnswer from './RevealAnswer.jsx';

function ShowHideUiBlock(props) {
	const { index, parentUrn, asideData, element, elementList2Add } = props || {};

	/**
	* @function showDifferentElements
	* @description-This function is to display seprator and elements in show|hide section inside showhide
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer   
	*/
	function showDifferentElements(sectionType) {
		return element?.interactivedata[sectionType]?.map((item, i) => {
			/* Form the indexes */
			const indexs = sectionType === "show" ? `${index}-0-${i}` : `${index}-2-${i}`;
			const indexSepra = sectionType === "show" ? `${index}-0-${i+1}` : `${index}-2-${i+1}`;
			return (
					<>
						{ showElements(item, indexs) }
						{ showSeprator(indexSepra, sectionType) }
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
	function showSeprator(i, sectionType, isFirst) {
		const newParentUrn = {
			contentUrn: element?.contentUrn
		}
		return <ElementSaprator
			index = {i}
			//upperOne = {true}
			firstOne = {isFirst || false}
			parentUrn = {newParentUrn}
			asideData = {asideData}
			//parentIndex = {i}
			esProps = {elementList2Add(i, true, newParentUrn, asideData, sectionType)}
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
	*/
	function showElements(item, i) {
		return <ElementContainer
			element = {item}
			index = {i}
			parentUrn = {parentUrn}
			showBlocker = {props.showBlocker}
			asideData = {asideData}
			permissions = {props.permissions}
			handleCommentspanel = {props.handleCommentspanel}
			isBlockerActive = {props.isBlockerActive}
			onClickCapture = {props.onClickCapture}
			parentElement =   {props.element}
			onListSelect = {props.onListSelect}
			userRole = {props.userRole}
			elementSepratorProps = {props.elementSepratorProps}
			splithandlerfunction = {props.splithandlerfunction}
			pasteElement = {props.pasteElement}
			//showHideType = "show"
		/>
	}

	return (
		<div>
			{/* Show Section */}
			<div className="showhide-heading-div">Show Element</div>
			{ showSeprator(`${index}-0-0`, 'show', true) }
			{ showDifferentElements('show') }

			{/* Reveal Answer Component*/}
			<RevealAnswer {...props} />

			{/* Hide Section */}
			<div className="showhide-heading-div">Hide Element</div>
			{ showSeprator(`${index}-2-0`, 'hide', true) }
			{ showDifferentElements('hide') }
			
		</div>
	)
}

export default ShowHideUiBlock;