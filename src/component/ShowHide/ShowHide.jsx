
import React from 'react';
import { connect } from 'react-redux';
import { createShowHideElement } from '../ElementContainer/ElementContainer_Actions.js';
import RevealAnswer from './Components/RevealAnswer.jsx';
import ShowHideUiBlock from './Components/ShowHideUiBlock.jsx';
import { elementList2Add } from './ShowHide_Helper.js';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions.js';
import { sendDataToIframe } from '../../constants/utility.js';

/**
* @ShowHide is container class of showhide element. 
*/
class ShowHide extends React.Component {

	/**
	* @function onSortUpdate
	* @description - This function is to sort inner element by dragging inside showhide
	* @param {String} event - event data
	* @param {String} sectionType - section of ShowHide - show|hide|revealAnswer   
	*/
	onSortUpdate = (event, sectionType) => {
		const { element, index, parentElement, swapElement, setActiveElement } = this.props || {};

		let swappedElementData;
        let sectionObj = [];
        let contentURN;
        if(sectionType){
            contentURN =element?.contentUrn;
            sectionObj = element?.interactivedata[sectionType];
        }
        if(sectionObj[event.oldDraggableIndex]) {
            swappedElementData = sectionObj[event.oldDraggableIndex];
        }
		/* Form payload to send swap api */
        const payload = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: contentURN,
            containerTypeElem: sectionType,
            asideId: element?.id,
            elementIndex: index,
            parentElement: { type: parentElement?.type }
        }
		/* call swap api */
        swapElement(payload, (bodyObj) => { })
        setActiveElement(payload.swappedElementData, payload.newIndex);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        const showHideNode = document.querySelector('.show-hide-active')
        if(showHideNode){
            showHideNode.classList.remove("show-hide-active")
        }
	}

	render() {
		const { index } = this.props || {};
		return (
			<div className="show-hide-component">
				{/* Show Section of Component*/}
				<ShowHideUiBlock 
					elementList2Add = {elementList2Add}
					sectionType = {"show"}
					sepratorIndex = {`${index}-0-0`}
					onSortUpdate = {this.onSortUpdate}
					{...this.props}
				/>
				{/* Reveal Answer Component*/}
				<RevealAnswer {...this.props} />
				{/* Hide Section of Component*/}
				<ShowHideUiBlock 
					elementList2Add = {elementList2Add}
					sectionType = {"hide"}
					sepratorIndex = {`${index}-2-0`}
					onSortUpdate = {this.onSortUpdate}
					{...this.props}
				/>
			</div>
		)
	}
}

const dispatchActions = {
    createShowHideElement,
	swapElement
}
export default connect(null, dispatchActions)(ShowHide);