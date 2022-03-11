/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import PropTypes from 'prop-types'
import { SECTION_BREAK_DELETE_TEXT } from '../../constants/Element_Constants'
import { showTocBlocker, showBlocker, hideBlocker } from '../../js/toggleLoader';
import PowerPasteElement from "../PowerPasteElement/PowerPasteElement.jsx";
import RenderTCMIcons from '../TcmButtonsRender/index.jsx'
import config from '../../config/config'
import { loadTrackChanges } from '../CanvasWrapper/TCM_Integration_Actions';
import { DO_NOT_SHOW_TXT } from '../SlateWrapper/SlateWrapperConstants';
import CommentMention from '../CommentMention/CommentMention.jsx'
/**
* @description - PopUp is a class based component. It is defined simply
* to make a skeleton of PopUps.
*/
class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordPasteProceed: false,
            isChecked: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.modelRef = React.createRef();
        this.contentRef = React.createRef();
        this.processGlossaryFootnotes = this.processGlossaryFootnotes.bind(this)
    }

    /**
     * funtion to add the callout in html.
     * @param html : consist of html string of popu
     * @returns new html having callout in title (to display on hover)
     */
    transformHtmlForCallout = (html) => {
        const calloutClasses = ["calloutOne", "calloutTwo", "calloutThree", "calloutFour"];
        const calloutContent = ["Callout: Option 1", "Callout: Option 2", "Callout: Option 3", "Callout: Option 4"]
        let newHtml = html;
        calloutClasses.forEach((item, index) => {
            var myRegExp = new RegExp(`class="${item}"`, 'g');
            newHtml = newHtml.replace(myRegExp, `title="${calloutContent[index]}" class="${item}"`)
        });
        return newHtml;
    }

    componentDidMount() {
        const refVal = this
        /**  Event Listner for close the popup on enter*/
        this.modelRef.current.addEventListener("keypress", (event) => {
            if (event.which == "13") {
                document.querySelector(".save-button").click();
            }
        });
        if (this.modelRef && this.modelRef.current && this.modelRef.current.querySelector("input, textarea")) {
            this.modelRef.current.querySelector("input, textarea").focus();
        }
        /**  Event Listner on glossary footnotes */
        if (this.props.isTCMCanvasPopup && this.contentRef !== null) {
            this.contentRef.current.addEventListener("click", (e) => {
                refVal.processGlossaryFootnotes(e)
            });
        }
    }

    componentWillUnmount() {
        this.modelRef.current.removeEventListener("keypress", (event) => {
            if (event.which == "13") {
                document.querySelector(".save-button").click();
            }
        });
        if (this.props.showConfirmation) {
            hideBlocker();
            this.props.hideCanvasBlocker(false)
        }
    }

    /**  Function to open the TCM SPA on click of glossary and footnotes*/

    processGlossaryFootnotes = (e) => {
        if (e.target.matches('a') && e.target.getAttribute('data-footnoteelementid')
            || e.target.matches('ins') && e.target.closest('a') && e.target.closest('a').getAttribute('data-footnoteelementid')
            || e.target.matches('ins') && e.target.closest('dfn')
            || e.target.matches('em') && e.target.parentNode && e.target.parentNode.tagName == 'DFN'
            || e.target.matches('dfn')
        ) {
            if (config.isSavingElement) {
                return false
            }
            e.stopPropagation();
            loadTrackChanges(this.props.tcmSnapshotData.eURN)
        }
    }
    /**
     * Enables proceed button
     * @param {*} toggleState true or false
     */
    toggleWordPasteProceed = (toggleState) => {
        this.setState({
            wordPasteProceed: toggleState
        })
    }

    handleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    /**
    * @description - This function is to handle the buttons (save ,cancel, ok).
    * @param {event} 
    */
    renderButtons = (props) => {
        if (props.isLockPopup || props.isLockReleasePopup || props.wrongAudio || props.showConfirmation || props.altText || props.wrongImage) { //Slate lock popup
            showBlocker(true); showTocBlocker();
            return (
                <div className={`dialog-buttons ${props.slateLockClass}`}>
                    <span className="save-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        } else
            if(props.alfrescoExpansionPopup){
                return null;
            }
            if (props.showDeleteElemPopup) {
                if (props.isOwnerSlate) {
                    return (
                        <div className={`dialog-buttons ${props.assessmentClass}`}>
                            <span className="lo-save-button" onClick={props.deleteElement}>{props.proceedButton}</span>
                            <span className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                        </div>
                    )
                }
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
        if (props.imageGlossary) {
            return (
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span className={`save-button ${props.splitSlateClass}`} onClick={props.removeImageContent}>Ok</span>
                    <span className={`cancel-button ${props.splitSlateClass}`} id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if (props.isElmUpdatePopup) {
            return (
                <div className={`dialog-buttons ${props.isElmUpdateClass}`}>
                    <span className={`save-button ${props.isElmUpdateClass}`} onClick={(e) => props.updateElmAssessment(e)}>Update</span>
                    <span className={`cancel-button ${props.isElmUpdateClass}`} id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if (props.isDeleteAssetPopup) {
            return (
                <div className={`dialog-buttons ${props.isDeleteAssetClass}`}>
                    <span className={`save-button `} onClick={(e) => props.deleteAssetHandler(e)}>Yes</span>
                    <span className={`cancel-button `} id='close-container' onClick={(e) => props.togglePopup(false, e)}>No</span>
                </div>
            )
        }
        if (props.WordPastePopup) {
            return (
                <div className={`dialog-buttons ${props.isElmUpdateClass}`}>
                    <span className={`powerpaste-save-button ${this.state.wordPasteProceed ? '' : "disabled"}`} onClick={props.handlePowerPaste}>Proceed</span>
                    <span className="powerpaste-cancel-button" onClick={() => props.handleCopyPastePopup(false)}>Cancel</span>
                </div>
            )
        }
        if (props.LOPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span className={`lo-save-button`} onClick={(e) => props.yesButtonHandler(e)}>{props.yesButton}</span>
                    <span className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.isTCMCanvasPopup) {
            return (
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span className={`cancel-button tcm ${props.tcmStatus === false && "disable"}`} onClick={() => props.tcmButtonHandler('Reject', props.tcmSnapshotData, props.elementData)}>Revert</span>
                    <span className="lo-save-button tcm" onClick={() => props.tcmButtonHandler('Accept', props.tcmSnapshotData, props.elementData)}>Accept</span>
                </div>
            )
        }
        if (props.AssessmentPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span className={`lo-save-button`} onClick={(e) => props.agree(false, e)}>{props.yesButton}</span>
                    <span className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.UsagePopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span className={`lo-save-button`} onClick={(e) => props.agree(true,e)}>{props.proceedButton}</span>
                    <span className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.isOwnersSlate) {
            return (
                <div className={`dialog-buttons`}>
                    <span className={`lo-save-button`} onClick={(e) => props.proceed(this.state.isChecked, false, e)}>{props.proceedButton}</span>
                    <span className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        } else if (props.isSubscribersSlate) {
            return (
                <div className={`subscriberSlate-buttons`}>
                    <span className="lo-save-button" onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        }
        if(props.showBlockCodeElemPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span className="lo-save-button" onClick={(e) => props.togglePopup(false, e)}>OK</span>
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
        if (props.alfrescoExpansionPopup || props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.removeConfirmation || props.wrongAudio || props.lockForTOC || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.LOPopup || props.imageGlossary || props.wrongImage || props.isTCMCanvasPopup || props.AssessmentPopup || props.isSubscribersSlate || props.isAddComment || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup) {
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
        } else if (props.WordPastePopup) {
            return (
                <PowerPasteElement
                    index={props.index}
                    onPowerPaste={props.onPowerPaste}
                    toggleWordPasteProceed={this.toggleWordPasteProceed}
                />
            )
        } else if (props.withCheckBox) {
            const { isChecked } = this.state
            return (
                <div className="OwnersSlateInputLine">
                    <input className="OwnersSlateCheckBox" type="checkbox" checked={isChecked} onChange={this.handleChange} />
                    <p>{DO_NOT_SHOW_TXT}</p>
                </div>
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
        if (props.showDeleteElemPopup || props.isLockPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive || props.removeConfirmation || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.WordPastePopup || props.LOPopup || props.imageGlossary || props.isTCMCanvasPopup || props.AssessmentPopup || props.isOwnersSlate || props.isSubscribersSlate || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup) {
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
        if(props.alfrescoExpansionPopup){
            let imgList = props.alfrescoExpansionMetaData.renderImages.map((image) => (
                    <img 
                      className='imageContainer' 
                      src={image.imgSrc} 
                      id={image.imgId}
                    />     
                ))
            return (
                <> 
                   <div className='tableAlfrescoPopupHeader'>{props.alfrescoExpansionMetaData.headerText}</div>
                    <div className="Please-select-an-image">{props.alfrescoExpansionMetaData.normalText}</div>
                    <div className='tableElement-img-container'>
                        {imgList}
                    </div>
                    
                </>
            )
        }
        if (props.showDeleteElemPopup) {
            if (props.sectionBreak) {
                return (
                    <div className="delete-element-text">{SECTION_BREAK_DELETE_TEXT}</div>
                )
            }
            else if (props.isOwnerSlate) {
                return (
                    <>
                        <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                        <div className="delete-element-text">{props.OwnersDeleteDialogText}<br />{'This content will be deleted from those projects as well.'}</div>
                    </>
                )
            }
            else {
                return (
                    <div className="delete-element-text">{props.deleteInstruction}</div>
                )
            }
        }
        else if (props.listConfirmation) {
            //jsx dialog text
            return (
                <>
                    <h2 className='tocDeleteHeader'>Warning</h2>
                    {<div className={`dialog-window  ${props.tocDeleteClass}`} >{props.dialogText}</div>}
                </>
            )
        }
        else if (props.isLockReleasePopup) {
            return (
                <div className={`dialog-window delete-element-text ${props.isElmApiError ? props.isElmApiError : ''} ${props.slateLockClass}`} >{props.dialogText}</div>
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
        else if (props.imageGlossary || props.wrongImage) {
            return (
                <div className={`dialog-window ${props.imageRemoveClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.removeConfirmation || props.wrongAudio) {
            return (
                <div className={`dialog-window ${props.audioRemoveClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.isElmUpdatePopup) {
            return (
                <>
                    <h2 className='tocDeleteHeader'>{this.props.elmHeaderText}</h2>
                    <div className={`dialog-window ${props.isElmUpdateClass}`} >{props.dialogText}</div>
                </>
            )
        }
        else if (props.isDeleteAssetPopup) {
            return (
                <div className={`dialog-window ${props.isDeleteAssetClass}`} >{props.dialogText}</div>
            )
        }
        else if (props.altText) {
            return (
                <>
                    <h2 className='tocDeleteHeader'>{this.props.altHeaderText}</h2>
                    <div className={`dialog-window delete-element-text ${props.isElmUpdateClass}`} >{props.dialogText}</div>
                </>
            )
        }
        else if (props.WordPastePopup) {
            return (
                <>
                    <h2 className='wordPastePopuptxt'>Paste from Word</h2>
                    <div className={`${props.wordPasteClass}`}>{props.dialogText}</div>
                </>
            )
        } else if (props.LOPopup) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br />{'Do you wish to continue?'}</div>
                </>
            )
        } else if (props.isTCMCanvasPopup) {
            return (
                <div ref={this.contentRef} className={`dialog-window ${props.assessmentClass}`} dangerouslySetInnerHTML={{ __html: this.transformHtmlForCallout(props.dialogText) }}></div>
            )
        }
        else if (props.AssessmentPopup) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br /><br />{'Do you want to proceed?'}</div>
                </>
            )
        }
        else if (props.UsagePopup) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br /><br />{'Are you sure you want to proceed?'}</div>
                </>
            )
        }
        else if (props.isOwnersSlate) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br /><br /></div>
                </>
            )
        }
        else if (props.isSubscribersSlate) {
            return (
                <>
                    <div className={`${props.lOPopupClass}`}>This is a subscribed content and cannot be edited.<br /><br />If you wish to edit the content, please use <strong>Copy Content</strong> feature from TOC or go to the owner project. Kindly note that the edits in owner project will be reflected for all the subscribers</div>
                </>
            )
        }
        else if (props.showBlockCodeElemPopup) {
            return (
                <>
                    <div className={`dialog-window blockcode-warning-text`}>Please select a language from element settings panel to start editing the Block Code element.</div>
                </>
            )
        }
        else {
            return (
                <div className={`dialog-window  ${props.isAddComment ? 'add-comment' : ""} ${props.assessmentClass}`} >{props.dialogText}</div>
            )
        }
    }


    renderTcmPopupIcons = (props) => {
        if (props.showDeleteElemPopup || props.isLockPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive || props.removeConfirmation || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.WordPastePopup || props.LOPopup || props.AssessmentPopup || props.isOwnersSlate || props.isSubscribersSlate || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup) {
            return null
        }
        else {
            if (props.isTCMCanvasPopup) {
                return (
                    <RenderTCMIcons />
                )
            }
        }
    }

    renderCommentPanelInput = (props) => {
        if (props.showDeleteElemPopup || props.isLockPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive || props.removeConfirmation || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.WordPastePopup || props.LOPopup || props.AssessmentPopup || props.isTCMCanvasPopup || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup) {
            return null
        }
        else {
            if (props.isAddComment) {
                return (
                    <CommentMention projectUsers={props.projectUsers} comment={props.comment} handleCommentChange={props.handleChange} isAddComment={props.isAddComment} />
                )
            }
        }
    }

    render() {
        const { active, assessmentClass, isGlossary, isTCMCanvasPopup, alfrescoExpansionMetaData } = this.props;
        return (
            <div className="model">
                {
                    active ?
                        <div tabIndex="0" className={`model-popup ${this.props.wirisAltTextClass ?? assessmentClass}`} ref={this.modelRef}>
                            <div className={this.props.isWordPastePopup ? 'wordPasteClass' : this.props.alfrescoExpansionPopup ? alfrescoExpansionMetaData.renderImages.length > 4 ? `modal-content alfresco-long-popup` : `modal-content alfresco-short-popup`  :`modal-content ${assessmentClass}`} id={isGlossary ? 'popup' : ''}>
                                {this.renderTcmPopupIcons(this.props)}
                                {this.renderCloseSymbol(this.props)}
                                {this.renderDialogText(this.props)}
                                <div className={this.props.isWordPastePopup ? 'dialog-input-poc' : `dialog-input ${assessmentClass}`}>
                                    {this.renderInputBox(this.props)}
                                </div>
                                {!isTCMCanvasPopup && <div className="popup-note-message">{this.props.note ? this.props.note : ''}</div>}
                                {this.renderCommentPanelInput(this.props)}
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
    proceedButton: "Proceed"

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