
import React from 'react';
import ShowHideUiBlock from './Components/ShowHideUiBlock.jsx';
class ShowHide extends React.Component {

	render() {
		return (
			<div className="show-hide-component">
				<ShowHideUiBlock {...this.props}/>
			</div>
		)
	}
}

export default ShowHide;