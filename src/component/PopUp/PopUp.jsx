/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import PropTypes from 'prop-types'

/**
* @description - PopUp is a class based component. It is defined simply
* to make a skeleton of PopUps.
*/
class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state ={ }
    }

    render() {
        const { dialogText , placeholder , rows , active , saveContent , togglePopup } = this.props;

        return (
            <div>
                {
                    active ? 
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => togglePopup(false)}>&times;</span>
                            <div className="dialog-window">
                                <p className="dialog-text">{dialogText}</p>
                            </div>
                            <div className="dialog-input">
                                <textarea className="dialog-input-textarea" type="text" placeholder={placeholder} rows={rows} />
                            </div>
                            <div className="dialog-buttons">
                                <span className="save-button" onClick={saveContent}>Save</span>
                                <span className="cancel-button" id='close-container' onClick={() => togglePopup(false)}>Cancel</span>
                            </div>
                        </div>
                    </div>
                         : null
                } 
            </div>
        );
    }
}

PopUp.defaultProps = {
    dialogText: "Please enter a comment:",
    placeholder: "Type...",
    rows: "5",
    active: true
}

PopUp.propTypes = {
      dialogText : PropTypes.string.isRequired,     // Text responsible for header Text for the Popup.
      placeholder : PropTypes.string.isRequired,    // Text responsible for placeholder for the Popup.
      rows : PropTypes.string.isRequired,           // Responsible for no of rows in the Popup.
      active : PropTypes.bool,                       // Responsible for show and hide of the Popup.
      togglePopup : PropTypes.func,                  // Function Responsible for closing of the Popup.
      saveContent : PropTypes.func                  // Function Responsible for saving content of the Popup.
}

export default PopUp;