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
    render() {
        const { dialogText , placeholder , rows , model , saveContent , closePopup } = this.props;

        return (
            <div>
                {
                    model ? 
                    <div>
                        <div className="modal-content">
                            <span className="close">&times;</span>
                            <div className="dialog-window">
                                <p className="dialog-text">{dialogText}</p>
                            </div>
                            <div className="dialog-input">
                                <textarea className="dialog-input-textarea" type="text" placeholder={placeholder} rows={rows} />
                            </div>
                            <div className="dialog-buttons">
                                <span className="save-button" onClick={saveContent}>Save</span>
                                <span className="cancel-button" onClick={closePopup}>Cancel</span>
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
    model: true
}

PopUp.propTypes = {
      dialogText : PropTypes.string.isRequired,     // Text responsible for header Text for the Popup.
      placeholder : PropTypes.string.isRequired,    // Text responsible for placeholder for the Popup.
      rows : PropTypes.string.isRequired,           // Responsible for no of rows in the Popup.
      model : PropTypes.bool,                       // Responsible for show and hide of the Popup.
      closePopup : PropTypes.func,                  // Function Responsible for closing of the Popup.
      saveContent : PropTypes.func                  // Function Responsible for saving content of the Popup.
}

export default PopUp;