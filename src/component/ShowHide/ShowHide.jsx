
import React from 'react';
import { connect } from 'react-redux';
import { createShowHideElement } from '../ElementContainer/ElementContainer_Actions.js';
import ShowHideUiBlock from './Components/ShowHideUiBlock.jsx';
import { elementList2Add } from './ShowHide_Helper.js';

/**
* @ShowHide is container class of showhide element. 
*/
class ShowHide extends React.Component {

	render() {
		return (
			<div className="show-hide-component">
				<ShowHideUiBlock 
					elementList2Add = {elementList2Add}
					{...this.props}/>
			</div>
		)
	}
}

const dispatchActions = {
    createShowHideElement
}
export default connect(null, dispatchActions)(ShowHide);