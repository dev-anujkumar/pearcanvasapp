
import React from 'react';
import { connect } from 'react-redux';
import { createShowHideElement } from '../ElementContainer/ElementContainer_Actions.js';
import RevealAnswer from './Components/RevealAnswer.jsx';
import ShowHideUiBlock from './Components/ShowHideUiBlock.jsx';
import { addNestedElements } from './ShowHide_Helper.js';
import { swapElement, cloneContainer, saveCaretPosition } from '../SlateWrapper/SlateWrapper_Actions.js';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';

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
		const { element, index, parentElement, setActiveElement } = this.props || {};

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
			sectionType,
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: contentURN,
            containerTypeElem: element?.type,
            asideId: element?.id,
            elementIndex: index,
            parentElement: { type: parentElement?.type, asideData: this.props.asideData }
        }
		/* call swap api */
        this.props.swapElement(payload, (bodyObj) => { })
        setActiveElement(payload.swappedElementData, payload.newIndex);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        //const showHideNode = document.querySelector('.show-hide-active')
        //if(showHideNode){
        //    showHideNode.classList.remove("show-hide-active")
        //}
	}

	render() {
		const { index, element, asideData, parentUrn, sectionType } = this.props || {};
		const elementLineage = {
			...element ,
		   grandParent: {
			   asideData,
			   parentUrn
		   },
		   sectionType
	   }
		return (
			<div className="show-hide-component">
				{/* Show Section of Component*/}
				<ShowHideUiBlock 
					addNestedElements = {addNestedElements}
					sectionType = {"show"}
					sepratorIndex = {`${index}-0-0`}
					onSortUpdate = {this.onSortUpdate}
					asideData = {elementLineage}
					{...this.props}
				/>
				{/* Reveal Answer Component*/}
				<RevealAnswer {...this.props} saveCaretPosition={this.props.saveCaretPosition} />
				{/* Hide Section of Component*/}
				<ShowHideUiBlock 
					addNestedElements = {addNestedElements}
					sectionType = {"hide"}
					sepratorIndex = {`${index}-2-0`}
					onSortUpdate = {this.onSortUpdate}
					asideData = {elementLineage}
					{...this.props}
				/>
			</div>
		)
	}
}
const mapStateToProps = (state) => {
    return {
        elementSelection: state.selectionReducer.selection,
		showDiscussion: state?.projectInfo?.showDiscussion,
		showPlayscript: state?.projectInfo?.showPlayscript
    }
}
const dispatchActions = {
    createShowHideElement,
	swapElement,
	cloneContainer,
	saveCaretPosition
}
export default connect(mapStateToProps, dispatchActions)(ShowHide);