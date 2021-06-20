import React from 'react';
import { TinyMceEditor } from '../../tinyMceEditor';
import { showHideConstants } from '../ShowHide_Helper';

function RevealAnswer(props) {
	const { index, slateLockInfo, element } = props || {};


	return (
		<div className="showhide-reveal-ans-block">
			<div className="showhide-call-action-text-div">Call to Action Button text:</div>
			<TinyMceEditor 
				permissions = {props.permissions}
				openGlossaryFootnotePopUp = {props.openGlossaryFootnotePopUp}
				index = {`${index}-1-0`} 
				placeholder = "Enter call to action..." 
				className = {"actionPU formatted-text"} 
				id = {props.id}
				element = {element}
				currentElement = {element?.interactivedata?.postertextobject[0]}
				model = {element?.interactivedata?.postertextobject[0]?.html?.text}
				handleEditorFocus = {props.handleFocus}
				handleBlur = {props.handleBlur} 
				slateLockInfo = {slateLockInfo} 
				elementId = {props?.element?.id}
				popupField = {showHideConstants.REVEAL_TEXT} 
				//createPopupUnit = {createPopupUnit}
				handleAudioPopupLocation = {props.handleAudioPopupLocation}
				parentElement = {element}
				showHideType = {showHideConstants.REVEAL_TEXT}
			/>
		</div>
	)
}

export default RevealAnswer;