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
        const { dialogText, placeholder, rows, active, saveContent, togglePopup, saveButtonText, cols, maxLength, assessmentClass, handleChange } = this.props;
        return (
            <div>
                {
                    active ? 
                    <div className={`modal ${assessmentClass}`}>
                        <div className={`modal-content ${assessmentClass}`}>
                            <span className={`close ${assessmentClass}`} onClick={() => togglePopup(false)}>&times;</span>
                            <div className={`dialog-window ${assessmentClass}`} >{dialogText}</div>
                            <div className={`dialog-input ${assessmentClass}`}>
                                <textarea className={`dialog-input-textarea ${assessmentClass}`} type="text" onChange={(event)=>handleChange(event.target.value)}
                                placeholder={placeholder} rows={rows} cols={cols} maxLength={maxLength}/>
                            </div>
                            <div className={`dialog-buttons ${assessmentClass}`}>
                                <span className="save-button" onClick={saveContent}>{saveButtonText}</span>
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
    dialogText: "",
    placeholder: "Type...",
    rows: "5",
    active: true,
    saveButtonText:"Save"
}

PopUp.propTypes = {
      dialogText : PropTypes.string.isRequired,      // Text responsible for header Text for the Popup.
      placeholder : PropTypes.string.isRequired,     // Text responsible for placeholder for the Popup.
      rows : PropTypes.string.isRequired,            // Responsible for no of rows in the Popup.
      cols : PropTypes.string,                       // Responsible for no of columns in the Popup.
      maxLength: PropTypes.string,                   // Responsible for max character length in the Popup.
      active : PropTypes.bool,                       // Responsible for show and hide of the Popup.
      togglePopup : PropTypes.func,                  // Function Responsible for closing of the Popup.
      saveContent : PropTypes.func   ,               // Function Responsible for saving content of the Popup.
      saveButtonText:PropTypes.string.isRequired,    // Responsible for Text in save-button in the Popup.
      assessmentClass:PropTypes.string ,             //Responsible for making the PopUp customized for Single Assessment
      cancelPopUp:PropTypes.func,                    //Function Responsible for Cancel operation of the Popup.
      closePopUp:PropTypes.func,                     //Function Responsible for Close operation of the Popup.
}

export default PopUp;