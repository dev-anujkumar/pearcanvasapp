/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import PropTypes from 'prop-types'
import { SECTION_BREAK_DELETE_TEXT } from '../../constants/Element_Constants'
import { showTocBlocker, showBlocker } from '../../js/toggleLoader';
/**
* @description - PopUp is a class based component. It is defined simply
* to make a skeleton of PopUps.
*/
class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.modelRef = React.createRef();
    }

    componentDidMount() {

        /**  Event Listner for close the popup on enter*/
        this.modelRef.current.addEventListener("keypress", (event) => {
            if (event.which == "13") {
                document.querySelector(".save-button").click();
            }
        });
        if (this.modelRef && this.modelRef.current && this.modelRef.current.querySelector("input, textarea")) {
            this.modelRef.current.querySelector("input, textarea").focus();
        }
    }

    componentWillUnmount() {
        this.modelRef.current.removeEventListener("keypress", (event) => {
            if (event.which == "13") {
                document.querySelector(".save-button").click();
            }
        });
    }
    /**
    * @description - This function is to handle the buttons (save ,cancel, ok).
    * @param {event} 
    */
    renderButtons = (props) => {
        if (props.isLockPopup || props.isLockReleasePopup || props.wrongAudio) { //Slate lock popup
            showBlocker(true); showTocBlocker();
            return (
                <div className={`dialog-buttons ${props.slateLockClass}`}>
                    <span className="save-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        }
        else if (props.tocDelete) {
            if (props.saveButtonText === 'Okay') {
                return (
                    <div className={`dialog-buttons ${props.tocDeleteClass}`}>
                        <span className="save-button" onClick={props.saveContent}>{props.saveButtonText}</span>
                    </div>
                )
            }
            else {
                return (
                    <div className={`dialog-buttons ${props.tocDeleteClass}`}>
                        <span className="save-button" onClick={props.saveContent}>{props.saveButtonText}</span>
                        <span className="cancel-button" id='close-container' onClick={props.togglePopup}>Cancel</span>
                    </div>
                )
            }
        } else
            if (props.showDeleteElemPopup) {
                return (
                    <div className={`dialog-buttons ${props.assessmentClass}`}>
                        <span className="save-button" onClick={props.deleteElement}>{props.yesButton}</span>
                        <span className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                    </div>
                )
            }
        if (props.isSplitSlatePopup || props.sytaxHighlight) {
            return (
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span className={`save-button ${props.splitSlateClass}`} onClick={props.confirmCallback}>Yes</span>
                    <span className={`cancel-button ${props.splitSlateClass}`} id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if (props.assessmentAndInteractive) {
            return (
                <div className={`dialog-buttons ${props.assessmentAndInteractive}`}>
                    <span className={`save-button ${props.splitSlateClass}`} onClick={() => { props.handleC2Click(document.getElementById("inputUUID").value) }}>Ok</span>
                    <span className={`cancel-button ${props.splitSlateClass}`} id='close-container' onClick={(e) => props.togglePopup(e, false)}>Cancel</span>
                </div>
            )
        }
        if (props.isElmUpdatePopup) {
            return (
                <div className={`dialog-buttons ${props.isElmUpdateClass}`}>
                    <span className={`save-button ${props.isElmUpdateClass}`} onClick={props.updateElmAssessment}>Update</span>
                    <span className={`cancel-button ${props.isElmUpdateClass}`} id='close-container' onClick={(e) => props.togglePopup(false,e)}>Cancel</span>
                </div>
            )
        }
        else {
            return (
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
        if (props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.tocDelete || props.removeConfirmation || props.wrongAudio || props.lockForTOC || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup) {
            return null
        }
        else if (props.isLockPopup && props.withInputBox && !props.lockForTOC) {
            return (
                <div className="lockInputBox">{props.addonText}<input disabled value={props.inputValue} /></div>
            )
        }
        else if (props.assessmentAndInteractive) {
            return (
                <input id="inputUUID" autoFocus className={`dialog-input-textarea ${props.assessmentAndInteractive}`} type="text"
                    placeholder={"UUID"} />
            )
        }
        else {
            return (
                <textarea autoFocus className={`dialog-input-textarea ${props.assessmentClass}`} type="text" onChange={(event) => props.handleChange(event.target.value)} onClick={(event) => this.handleClickTextArea(event)}
                    placeholder={props.placeholder} disabled={props.isInputDisabled} value={props.inputValue} rows={props.rows} cols={props.cols} maxLength={props.maxLength} />
            )
        }
    }

    handleClickTextArea = (event) => {
        event.stopPropagation();
    }

    renderCloseSymbol = (props) => {
        if (props.showDeleteElemPopup || props.isLockPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.tocDelete || props.assessmentAndInteractive || props.removeConfirmation || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup) {
            return null
        }
        else {
            return (
                <span className={`close ${props.assessmentClass}`} onClick={(e) => props.togglePopup(false, e)}>&times;</span>
            )
        }
    }

    /**
    * @description - This function is responsible for rendering the Dialog text in the popup.
    * @param {event} 
    */

    renderDialogText = (props) => {
        if (props.showDeleteElemPopup) {
            if (props.sectionBreak) {
                return (
                    <div className="delete-element-text">{SECTION_BREAK_DELETE_TEXT}</div>
                )
            }
            else {
                return (
                    <div className="delete-element-text">{props.deleteInstruction}</div>
                )
            }
        }
        else if (props.tocDelete || props.listConfirmation) {
            //jsx dialog text
            return (
                <>
                    <h2 className = 'tocDeleteHeader'>Warning</h2>
                    {props.tocDelete && props.deleteContainer ? (props.itemName ? <div className={` ${props.tocDeleteClass}`} >Are you sure you want to delete '<strong>{props.itemName}</strong>'.This action cannot be undone?</div> : <div className={` ${props.tocDeleteClass}`} >Are you sure you want to delete '<strong>Untitled</strong>'.This action cannot be undone?</div>) :  <div className={` ${props.tocDeleteClass}`} >{props.dialogText}</div>}
                </>
            )
        }
        else if (props.isLockReleasePopup) {
            return (
                <div className={`dialog-window delete-element-text ${props.slateLockClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.isSplitSlatePopup) {
            return (
                <div className={`dialog-window ${props.splitSlateClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.isLockPopup || props.sytaxHighlight) {
            return (
                <div className={`dialog-window ${props.slateLockClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.removeConfirmation || props.wrongAudio) {
            return (
                <div className={`dialog-window ${props.audioRemoveClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.isElmUpdatePopup) {
            return (
                <div className={`dialog-window ${props.isElmUpdateClass}`} >{props.dialogText}</div>
            )
        }
        else {
            return (
                <div className={`dialog-window ${props.assessmentClass}`} >{props.dialogText}</div>
            )
        }
    }

    showElmHeader = () => {
        return (
            <>
                <div className={`${this.props.isElmUpdatePopup ? 'elm-header' : ""}`}>{this.props.elmHeaderText}</div>
                <hr className={`${this.props.isElmUpdatePopup ? 'elm-header-bottom' : ""}`} />
            </>
        )
    }
    render() {
        const { active, assessmentClass, isElmUpdateClass } = this.props;
        return (
            <div className="model">
                {
                    active ?
                        <div tabIndex="0" className={`model-popup ${assessmentClass}`} ref={this.modelRef}>
                            <div className={`modal-content ${assessmentClass}`}>
                                {/*  ${isElmUpdateClass ? isElmUpdateClass : ''} */}
                                {this.renderCloseSymbol(this.props)}
                                {this.props.isElmUpdatePopup && this.showElmHeader()}
                                {this.renderDialogText(this.props)}
                                <div className={`dialog-input ${assessmentClass}`}>
                                    {this.renderInputBox(this.props)}
                                </div>
                                <div className="popup-note-message">{this.props.note ? this.props.note : ''}</div>
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
    saveButtonText: "Save",
    isLockPopup: false,
    yesButton: "Yes",
    cancelBtnText: "Cancel",
    deleteInstruction: "Are you sure you want to delete, this action cannot be undone?",

}

PopUp.propTypes = {
    dialogText: PropTypes.string.isRequired,      // Text responsible for header Text for the Popup.
    placeholder: PropTypes.string.isRequired,     // Text responsible for placeholder for the Popup.
    rows: PropTypes.string.isRequired,            // Responsible for no of rows in the Popup.
    cols: PropTypes.string,                       // Responsible for no of columns in the Popup.
    maxLength: PropTypes.string,                   // Responsible for max character length in the Popup.
    active: PropTypes.bool,                       // Responsible for show and hide of the Popup.
    togglePopup: PropTypes.func,                  // Function Responsible for closing of the Popup.
    saveContent: PropTypes.func,               // Function Responsible for saving content of the Popup.
    saveButtonText: PropTypes.string.isRequired,    // Responsible for Text in save-button in the Popup.
    assessmentClass: PropTypes.string,             //Responsible for making the PopUp customized for Single Assessment
    cancelPopUp: PropTypes.func,                    //Function Responsible for Cancel operation of the Popup.
    closePopUp: PropTypes.func,                     //Function Responsible for Close operation of the Popup.
}

export default PopUp;