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


    /**
    * @description - This function is to handle the buttons (save ,cancel, ok).
    * @param {event} 
    */
    renderButtons = (props) => {
        if(props.isLockPopup || props.isLockReleasePopup){ //Slate lock popup
            return(
                <div className={`dialog-buttons ${props.slateLockClass}`}>
                    <span className="save-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        }
        else if(props.tocDelete){
            return(
                <div className={`dialog-buttons ${props.tocDeleteClass}`}>
                    <span className="save-button" onClick={props.saveContent}>{props.saveButtonText}</span>
                    <span className="cancel-button" id='close-container' onClick={props.togglePopup}>Cancel</span>
                </div>
            )
        }else
        if(props.showDeleteElemPopup) {
            return(
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span className="save-button" onClick={props.deleteElement}>{props.yesButton}</span>
                    <span className="cancel-button" id='close-container' onClick={() => props.togglePopup(false)}>{props.cancelBtnText}</span>
                </div>
            )            
        }
        if(props.isSplitSlatePopup){
            return(
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span className={`save-button ${props.splitSlateClass}`} onClick={props.handleSplit}>Yes</span>
                    <span className={`cancel-button ${props.splitSlateClass}`} id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if(props.assessmentAndInteractive)
        return(
            <div className={`dialog-buttons ${props.assessmentAndInteractive}`}>
                <span className={`save-button ${props.splitSlateClass}`} onClick={()=>{props.handleC2Click(document.getElementById("inputUUID").value)}}>Ok</span>
                <span className={`cancel-button ${props.splitSlateClass}`} id='close-container' onClick={()=>{props.handleC2Click(document.getElementById("inputUUID").value)}}>Cancel</span>
            </div>
        )
        else {
            return(
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span className="save-button" onClick={props.saveContent}>{props.saveButtonText}</span>
                    <span className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        } 
    }

    /**
    * @description - This function is responsible for handling the Input box of the popup.
    * @param {event} 
    */
    renderInputBox = (props) => {
        if(props.showDeleteElemPopup || props.isLockReleasePopup ||  props.isSplitSlatePopup || props.tocDelete){
            return null
        }
        else if(props.isLockPopup && props.withInputBox){
            return (
                <input type="text" className={`dialog-input-textarea ${props.slateLockClass}`} disabled value={props.inputValue} rows={props.rows} cols={props.cols} />
            )  
        }
        else if(props.assessmentAndInteractive){
            return (
                <input id="inputUUID" autoFocus className={`dialog-input-textarea ${props.assessmentAndInteractive}`} type="text"
                placeholder={"UUID"}/>
              )  
        }
        else{
          return (
            <textarea autoFocus className={`dialog-input-textarea ${props.assessmentClass}`} type="text" onChange={(event)=>props.handleChange(event.target.value)}
            placeholder={props.placeholder} disabled={props.isInputDisabled} value={props.inputValue} rows={props.rows} cols={props.cols} maxLength={props.maxLength}/>
          )  
        }
    }
    renderCloseSymbol = (props) => {
        if(props.showDeleteElemPopup || props.isLockPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.tocDelete){
            return null
        }
        else{
            return (
                <span className={`close ${props.assessmentClass}`} onClick={() => props.togglePopup(false)}>&times;</span>
            )
        }
    }

    /**
    * @description - This function is responsible for rendering the Dialog text in the popup.
    * @param {event} 
    */
    
    renderDialogText = (props) => {
        if(props.showDeleteElemPopup){
            return null
        }
        else if(props.tocDelete){
            //jsx dialog text
            return(
                <>
                    <h2 className = 'tocDeleteHeader'>Warning!</h2>
                    <div className={` ${props.tocDeleteClass}`} >{props.dialogText}</div>
                </>
            )
        }
        else if(props.isLockReleasePopup){
            return(
                <div className={`dialog-window delete-element-text ${props.slateLockClass}`} >{props.dialogText}</div>
            )
        }
        else if(props.isSplitSlatePopup){
            return(
                <div className={`dialog-window ${props.splitSlateClass}`} >{props.dialogText}</div>
            )
        }
        else if(props.isLockPopup){
            return (
                <div className={`dialog-window ${props.slateLockClass}`} >{props.dialogText}</div>
            )  
        }
        else {
            return(
                <div className={`dialog-window ${props.assessmentClass}`} >{props.dialogText}</div>
            )
        }
    }
 
    
    render() {
        const { active, assessmentClass, showDeleteElemPopup, deleteInstruction, } = this.props;
        return (
            <div className="">
                {
                    active ? 
                    <div className={`model-popup ${assessmentClass}`}>
                        <div className={`modal-content ${assessmentClass}`}>
                            {this.renderCloseSymbol(this.props)}
                            {this.renderDialogText(this.props)}
                            {showDeleteElemPopup ? <div className="delete-element-text">{deleteInstruction}</div> : '' }
                            <div className={`dialog-input ${assessmentClass}`}>
                                {this.renderInputBox(this.props)}
                            </div>
                            {this.renderButtons(this.props)}
                        </div>
                    </div>
                    : null
                } 
            </div>
        );
    }
}
PopUp.displayName = "PopUp";

PopUp.defaultProps = {
    dialogText: "",
    placeholder: "Type...",
    rows: "5",
    active: true,
    saveButtonText:"Save",
    isLockPopup: false,
    yesButton : "Yes",
    cancelBtnText : "Cancel",
    deleteInstruction : "Are you sure you want to delete, this action cannot be undone?",

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