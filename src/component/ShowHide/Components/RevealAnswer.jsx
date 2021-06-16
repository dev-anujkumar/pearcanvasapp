import React from 'react';
import { TinyMceEditor } from '../../tinyMceEditor';


function RevealAnswer(props) {
	const { index, slateLockInfo, asideData, element } = props || {};


	return (
		<div className="showhide-reveal-ans-block">
			<div className="showhide-call-action-text-div">Call to Action Button text:</div>
			<TinyMceEditor 
				permissions = {props.permissions}
				openGlossaryFootnotePopUp = {props.openGlossaryFootnotePopUp}
				index = {`${index}-1`} 
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
				popupField = "postertextobject" 
				//createPopupUnit = {createPopupUnit}
				handleAudioPopupLocation = {props.handleAudioPopupLocation}
			/>
		</div>
	)
}

export default RevealAnswer;