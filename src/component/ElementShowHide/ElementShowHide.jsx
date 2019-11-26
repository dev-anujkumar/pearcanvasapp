/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementShowHide/ElementShowHide.css';
import TinyMceEditor from "../tinyMceEditor";
import { showTocBlocker,hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';

class ShowHide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID : ""
        };

    }
   
   


    render() {
        const { model } = this.props;
        try {
            return (
               
                    <div className="interactive-element">
                        {this.renderInteractiveType(model, itemId, index, slateLockInfo)}
                        {this.state.showAssesmentpopup? <PopUp handleC2Click ={this.handleC2InteractiveClick} togglePopup={this.togglePopup}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
                    </div>
                
            )
        } catch (error) {
            return (
                <div className="interactive-element">
                </div>
            )
        } 
    }
}
Interactive.displayName = "Interactive";

Interactive.defaultProps = {
    /** Detail of element in JSON object */
    itemId: ""
}

Interactive.propTypes = {

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func,
    /** itemId coming from c2module */
    itemId: PropTypes.string
}
export default ShowHide;