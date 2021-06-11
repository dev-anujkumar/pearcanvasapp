import React from 'react';
import ElementContainer from '../../ElementContainer/ElementContainer.jsx';
import { ElementSaprator } from '../../ElementSaprator/ElementSaprator.jsx';
import RevealAnswer from './RevealAnswer.jsx';

function ShowHideUiBlock(props) {
	const { index, parentUrn, asideData, element } = props || {};

	function showDifferentElements(answerBlock) {
		return element?.interactivedata[answerBlock]?.map((item, i) => {
			return (
					<>
						{ showSeprator(i) }
						{ showElements(item, i) }
						{ showSeprator(i+1) }
					</>
				)
		})
	}

	function showSeprator(i) {
		const newParentUrn = {
			contentUrn: element?.contentUrn
		}
		return <ElementSaprator
			index = {i}
			//upperOne = {true}
			//firstOne = {i === 0}
			parentUrn = {newParentUrn}
			asideData = {asideData}
			//parentIndex = {i}
			esProps = {props.elementSepratorProps(i, true, newParentUrn, asideData, "")}
			elementType = {element?.type}
			permissions = {props.permissions}
			onClickCapture = {props.onClickCapture}
			splithandlerfunction = {props.splithandlerfunction}
			userRole = {props.userRole}
			pasteElement = {props.pasteElement}
			//source={ASIDE_SOURCE}
		/>
	}

	function showElements(item, i) {
		return <ElementContainer
			element = {item}
			index = {`${index}-${i}`}
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
		/>
	}

	return (
		<div>
			<div className="showhide-heading-div">Show Element</div>
			{ showDifferentElements('show') }
			<RevealAnswer {...props} />
			<div className="showhide-heading-div">Hide Element</div>
			{ showDifferentElements('hide') }
			
		</div>
	)
}

export default ShowHideUiBlock;