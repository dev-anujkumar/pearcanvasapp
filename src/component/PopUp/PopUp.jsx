/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import importPopupSS1 from './Assets/importPopup-ss-1.svg';
import importPopupSS2 from './Assets/importPopup-ss-2.svg';
import importPopupSS3 from './Assets/importPopup-ss-3.svg';
import importPopupSS4 from './Assets/importPopup-ss-4.svg';
import importPopupSS5 from './Assets/importPopup-ss-5.svg';
import importPopupSS6 from './Assets/importPopup-ss-6.svg';
import importPopupSS7 from './Assets/importPopup-ss-7.svg';
import importPopupSS8 from './Assets/importPopup-ss-8.svg';
import importPopupSS11 from './Assets/importPopup-ss-11.svg';
import importPopupSS12 from './Assets/importPopup-ss-12.svg';
import importPopupSS13 from './Assets/importPopup-ss-13.svg';
import importPopupSS14 from './Assets/importPopup-ss-14.svg';
import importPopupSS15 from './Assets/importPopup-ss-15.svg';
import importPopupSS16 from './Assets/importPopup-ss-16.svg';
import importPopupSS17 from './Assets/importPopup-ss-17.svg';
import importPopupSS18 from './Assets/importPopup-ss-18.svg';
import CloseIcon from './Assets/CloseIcon.svg';
import PropTypes from 'prop-types'
import { COMPLETED_TEXT, EMPTY_FILE_ERROR_MESSAGE, FILE_SIZE_ERROR_MESSAGE, IMPORTING_TIPS_CONTENT_TEXT_FIFTH, IMPORTING_TIPS_CONTENT_TEXT_FIRST, IMPORTING_TIPS_CONTENT_TEXT_FOURTH, IMPORTING_TIPS_CONTENT_TEXT_SECOND, IMPORTING_TIPS_CONTENT_TEXT_SEVENTH, IMPORTING_TIPS_CONTENT_TEXT_SIXTH, IMPORTING_TIPS_CONTENT_TEXT_THIRD, IMPORTING_TIPS_TEXT, NEXT_BUTTON_TEXT, PREVIEW_POPUP_HEADING, PREVIEW_POPUP_STEPPER_TEXT_FIRST, PREVIEW_POPUP_STEPPER_TEXT_SECOND, SECTION_BREAK_DELETE_TEXT, START_IMPORTING_BUTTON_TEXT, STEPPER_TEXT_PREVIEW, STEPPER_TEXT_UPLOAD_WORD_FILE, SUPPORTED_FILE_MESSAGE, UNSUPPORTED_FILE_ERROR_MESSAGE, UPLOAD_CONTAINER_TEXT, UPLOAD_CONTAINER_TEXT_SECOND_HALF, WARNING_TEXT_FOR_IMPORT_WORD_FILE, notAllowedTCMElementTypes } from '../../constants/Element_Constants'
import { showTocBlocker, showBlocker, hideBlocker } from '../../js/toggleLoader';
import PowerPasteElement from '../PowerPasteElement/PowerPasteElement.jsx';
import PreviewWordFile from '../PreviewWordFile/PreviewWordFile.jsx';
import RenderTCMIcons from '../TcmButtonsRender/index.jsx'
import config from '../../config/config'
import { loadTrackChanges } from '../CanvasWrapper/TCM_Integration_Actions';
import { DELETE_INSTRUCTION_FOR_TCM, DONT_ASK_TEXT, DO_NOT_SHOW_TXT,UNSUPPORTED_CONTENT_ERR_MSG, SET_AS_DECORATIVE_IMAGE_AUTONUM,
        SET_AS_DECORATIVE_IMAGE_NON_AUTONUM, SET_AS_DECORATIVE_IMAGE_NOTE, pasteElementLimit, PASTE_LIMIT_WARNING_1, PASTE_LIMIT_WARNING_2 } from '../SlateWrapper/SlateWrapperConstants';
import CommentMention from '../CommentMention/CommentMention.jsx'
import {LargeLoader} from '../SlateWrapper/ContentLoader.jsx';
import { PRIMARY_BUTTON, SECONDARY_BUTTON, CHECKBOX_MESSAGE, sendDataToIframe } from '../../../src/constants/utility.js';
import { isPrimaryButtonFocused, isSecondaryButtonFocused, focusElement, blurElement, focusPopupButtons } from './PopUp_helpers.js';
import { DISABLE_DELETE_WARNINGS, DISABLE_DI_CONVERSION_WARNING } from '../../constants/IFrameMessageTypes';
/**
* @description - PopUp is a class based component. It is defined simply
* to make a skeleton of PopUps.
*/
class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordPasteProceed: false,
            isChecked: false,
            focusedButton: this.setFocus(props),
            deleteWarningPopupCheckbox: false,
            isPowerPasteInvalidContent: false,
            setAsDecorativePopUpCheckbox: false,
            isPowerPasteLimitExceeding: false,
            fileToBeUploaded: this.props.fileToBeUploaded || {},
            errorFileType: false,
            errorFileSize: false,
            errorFileEmpty: false,
            importwordFileCheckbox: false,
            enableImport: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChangeOnInput = this.handleFileChangeOnInput.bind(this);
        this.modelRef = React.createRef();
        this.contentRef = React.createRef();
        this.wordPastePopupTextAreaRef = React.createRef();
        this.processGlossaryFootnotes = this.processGlossaryFootnotes.bind(this)
        this.inputRef = React.createRef();
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

    checkInvalidPowerPasteContent = (flag) => {
        this.setState({isPowerPasteInvalidContent: flag})
    }
    checkPowerPasteLimit = (flag) => {
        this.setState({isPowerPasteLimitExceeding: flag})
    }
    componentDidMount() {
        const refVal = this
        if (this.modelRef && this.modelRef.current && this.modelRef.current.querySelector("input, textarea")) {
            this.modelRef.current.querySelector("input, textarea").focus();
        }
        /**  Event Listner on glossary footnotes */
        if (this.props.isTCMCanvasPopup && this.contentRef !== null) {
            this.contentRef.current.addEventListener("click", (e) => {
                refVal.processGlossaryFootnotes(e)
            });
        }
        if(this.modelRef && this.modelRef.current) {
            /** Focus on Modal Component when it gets Open */
            this.modelRef.current.focus();
            /** Add Event Listener on Popup Buttons */
            this.modelRef.current.addEventListener('keydown', this.handleKeyDown);
        }
        /**  Focus on Popup PRIMARY Button or SECONDARY Button*/
        focusElement(this.state.focusedButton);
        if (this.props.WordPastePopup) {
            document.addEventListener('mousedown', this.handleClickOutside);
        }
    }

    componentWillUnmount() {
        if (this.props.showConfirmation || this.props.isApprovedSlate) {
            hideBlocker();
            this.props.hideCanvasBlocker(false)
        }
        if(this.modelRef && this.modelRef.current) {
            /** Remove Event Listener on Popup Buttons */
            this.modelRef.current.removeEventListener('keydown', this.handleKeyDown);
        }
        if (this.props.WordPastePopup) {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }
    }

    handleClickOutside = (event) => {
        if (this.wordPastePopupTextAreaRef && !this.wordPastePopupTextAreaRef.current.contains(event.target)) {
            focusPopupButtons();
        }
    }

    /**  Function to open the TCM SPA on click of glossary and footnotes*/

    processGlossaryFootnotes = (e) => {
        if (e.target.matches('a') && e.target.getAttribute('data-footnoteelementid')
            || e.target.matches('ins') && e.target.closest('a') && e.target.closest('a').getAttribute('data-footnoteelementid')
            || e.target.matches('ins') && e.target.closest('dfn')
            || e.target.matches('em') && e.target.parentNode && e.target.parentNode.tagName == 'DFN'
            || e.target.matches('dfn')
            || e.target.parentNode && (e.target.parentNode.tagName == 'INS' || e.target.parentNode && e.target.parentNode.tagName == 'DFS')
            || (e.target.matches('abbr') || e.target.parentNode.matches('abbr')) && (e.target.getAttribute('asset-id') || e.target.parentNode.getAttribute('asset-id'))
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

    processImageID = (imgId) => {
        let id = imgId.substring(imgId.indexOf(":") + 1, imgId.lastIndexOf(":"));
        this.props.openInNewWindow(id)
    }

    /**Function to set initial state of focused button based on props*/
    setFocus = (props) => {
        if(props.isTCMCanvasPopup) {
            if(props.tcmStatus === false || !this.props.permissions?.includes('trackchanges_approve_reject')) {
                return SECONDARY_BUTTON
            } else {
                return PRIMARY_BUTTON
            }
        } else {
            if(props.showDeleteElemPopup || props.isDeleteAssetPopup || props.isLockReleasePopup || props.wrongAudio ||
                props.showConfirmation || props.altText || props.wrongImage || props.isSubscribersSlate || props.showBlockCodeElemPopup ||
                props.removeMarkedIndex || props.isApprovedSlate || props.setDecorativePopup) {
                return PRIMARY_BUTTON;
            } else {
                return SECONDARY_BUTTON;
            }
        }
    }

    /**Function to perform click event on element which is currently focused */
    clickElement = (value) => {
        const element = document.querySelector(`[option=${value}]`);
        let isButtonDisabled = false;
        //Check if Word Paste Popup Proceed Button is disabled if not disabled then perform click operation
        if(this.props.WordPastePopup) {
            isButtonDisabled = element?.classList?.contains('disabled');
        }
        //Check if TCM Canvas Popup Revert Button is disabled if not disabled then perform click operation
        else if(this.props.isTCMCanvasPopup) {
            isButtonDisabled = element?.classList?.contains('disable');
        }
        if(element && !isButtonDisabled) {
            element?.click();
        }
    }

    /**Function to handle keyboard event of Enter, Left & Right arrow keys */
    handleKeyDown = (e) => {
        if(e.keyCode === 13) {
            this.clickElement(this.state.focusedButton);
        }
        if(e.keyCode === 27) {
            let element;
            if(this.props.isTCMCanvasPopup) {
                element = document.getElementById('tcmIcon close');
            } else {
                element = document.querySelector(`[option=${SECONDARY_BUTTON}]`) !== null ?
                document.querySelector(`[option=${SECONDARY_BUTTON}]`) : document.querySelector(`[option=${PRIMARY_BUTTON}]`);
            }
            element?.click();
        }
        if (e.keyCode === 37 && (this.state.focusedButton === PRIMARY_BUTTON || isPrimaryButtonFocused())) {
            const element = document.querySelector(`[option=${SECONDARY_BUTTON}]`)
            if(element && element?.classList) {
                this.setState({
                    focusedButton: SECONDARY_BUTTON
                })
                blurElement(PRIMARY_BUTTON);
                focusElement(SECONDARY_BUTTON);
            }
        } else if (e.keyCode === 39 && (this.state.focusedButton === SECONDARY_BUTTON || isSecondaryButtonFocused())) {
            const element = document.querySelector(`[option=${PRIMARY_BUTTON}]`)
            if(element && element?.classList && !element.classList.contains('disabled')) {
                this.setState({
                    focusedButton: PRIMARY_BUTTON
                })
                blurElement(SECONDARY_BUTTON);
                focusElement(PRIMARY_BUTTON);
            }
        }
    }

    closeGlossaryAssetPopup = () => {
        let element = document.getElementById("glossary-asset-close-icon");
        if(element) {
            element?.click();
        }
    }

    handleImageGlossaryButtonsClick = (e) => {
        this.closeGlossaryAssetPopup();
        let buttonClicked = e?.target?.attributes['option']?.value;
        if(buttonClicked === PRIMARY_BUTTON) {
            this.props.removeImageContent();
        } else {
            this.props.togglePopup(false, e);
        }
    }

    handleAudioGlossaryButtonsClick = (e) => {
        this.closeGlossaryAssetPopup();
        let buttonClicked = e?.target?.attributes['option']?.value;
        if(buttonClicked === PRIMARY_BUTTON) {
            this.props.saveContent();
        } else {
            this.props.togglePopup(false, e);
        }
    }

    handleClickOnButton = () => {
        if (this.state.deleteWarningPopupCheckbox) sendDataToIframe({ 'type': DISABLE_DELETE_WARNINGS, 'message': { disableDeleteWarnings: true } });
    }

    handleDeleteWarningPopupCheckbox = (event) => {
        this.setState({
            deleteWarningPopupCheckbox: event?.target?.checked
        });
    }

    // When "Set as Decorative Image" button is clicked
    handleClickOnSetButton = () => {
        if (this.state.setAsDecorativePopUpCheckbox) sendDataToIframe({ 'type': DISABLE_DI_CONVERSION_WARNING, 'message': { disableDIConversionWarning: true } });
    }

    // When "Don't ask me again" checkbox of decorative popup is checked
    handleSetAsDecorativeWarningPopupCheckbox = (event) => {
        this.setState({
            setAsDecorativePopUpCheckbox: event?.target?.checked
        });
    }

    /**
    * @description - This function is to handle the buttons (save ,cancel, ok).
    * @param {event}
    */
    renderButtons = (props) => {
        if(props.isSlateLocked) return null;

        if (props.isLockReleasePopup || props.wrongAudio || props.showConfirmation || props.altText || props.wrongImage) { //Slate lock popup
            showBlocker(true); showTocBlocker();
            return (
                <div className={`dialog-buttons ${props.slateLockClass}`}>
                    <span option={PRIMARY_BUTTON} className="save-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        } else if (props.alfrescoExpansionPopup) {
            return null;
        }
        if (props.showDeleteElemPopup) {
            if (props.isOwnerSlate) {
                return (
                    <div className={`dialog-buttons ${props.assessmentClass}`}>
                        <span option={PRIMARY_BUTTON} className="lo-save-button" onClick={props.deleteElement}>{props.proceedButton}</span>
                        <span option={SECONDARY_BUTTON} className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                    </div>
                )
            }
            return (
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span option={PRIMARY_BUTTON} className="save-button" onClick={props.deleteElement}>{props.yesButton}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.isSplitSlatePopup || props.sytaxHighlight) {
            return (
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.splitSlateClass}`} onClick={props.confirmCallback}>Yes</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.splitSlateClass}`} id='close-container'
                    onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if (props.assessmentAndInteractive) {
            return (
                <div className={`dialog-buttons ${props.assessmentAndInteractive}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.splitSlateClass}`}
                    onClick={() => { props.handleC2Click(document.getElementById("inputUUID").value) }}>Ok</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.splitSlateClass}`} id='close-container'
                    onClick={(e) => props.togglePopup(e, false)}>Cancel</span>
                </div>
            )
        }
        if (props.imageGlossary) {
            return (
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.splitSlateClass}`}
                    onClick={(e) => this.handleImageGlossaryButtonsClick(e)}>Ok</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.splitSlateClass}`} id='close-container'
                    onClick={(e) => this.handleImageGlossaryButtonsClick(e)}>Cancel</span>
                </div>
            )
        }
        if (props.removeMarkedIndex) {
            return (
                <div className={`dialog-buttons ${props.removeMarkedClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.removeMarkedClass}`} onClick={(e) => props.removeMarkedIndexContent(e)}>Yes</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.removeMarkedClass}`} id='close-container'
                    onClick={(e) => props.toggleMarkedIndexPopup(e)}>Cancel</span>
                </div>
            )
        }
        if (props.openRemovePopUp) {
            return (
                <div className={`dialog-buttons ${props.splitSlateClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.splitSlateClass}`}
                    onClick={(e) => {this.handleAudioGlossaryButtonsClick(e);this.handleClickOnButton();}}>Ok</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.splitSlateClass}`} id='close-container'
                    onClick={(e) => this.handleAudioGlossaryButtonsClick(e)}>Cancel</span>
                </div>
            )
        }
        if (props.isElmUpdatePopup) {
            return (
                <div className={`dialog-buttons ${props.isElmUpdateClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button ${props.isElmUpdateClass}`} onClick={(e) => props.updateElmAssessment(e)}>Update</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button ${props.isElmUpdateClass}`} id='close-container'
                    onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
        if (props.isDeleteAssetPopup) {
            return (
                <div className={`dialog-buttons ${props.isDeleteAssetClass}`}>
                    <span option={PRIMARY_BUTTON} className={`save-button `} onClick={(e) => {props.deleteAssetHandler(e);this.handleClickOnButton();}}>Yes</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button `} id='close-container' onClick={(e) => props.togglePopup(false, e)}>No</span>
                </div>
            )
        }
        if (props.WordPastePopup) {
            return (
                <div className={`dialog-buttons ${props.isElmUpdateClass}`}>
                    <span option={PRIMARY_BUTTON} className={`powerpaste-save-button ${this.state.wordPasteProceed ? '' : "disabled"}`}
                    onClick={props.handlePowerPaste}>Proceed</span>
                    <span option={SECONDARY_BUTTON} className="powerpaste-cancel-button" onClick={() => props.handleCopyPastePopup(false)}>Cancel</span>
                </div>
            )
        }
        if (props.LOPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`lo-save-button`} onClick={(e) => props.yesButtonHandler(e)}>{props.yesButton}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.isTCMCanvasPopup) {
            if(props.tcmStatus === false || !this.props.permissions?.includes('trackchanges_approve_reject')) {
                return (
                    <div className={`dialog-buttons ${props.assessmentClass}`}>
                        <span className={`cancel-button tcm disable`} onClick={() => props.tcmButtonHandler('Reject', props.tcmSnapshotData, props.elementData)}>Revert</span>
                        <span option={SECONDARY_BUTTON} className={`lo-save-button tcm ${!this.props.permissions?.includes('trackchanges_approve_reject') && "disable"}`}
                        onClick={() => props.tcmButtonHandler('Accept', props.tcmSnapshotData, props.elementData)}>Accept</span>
                    </div>
                )
            } else {
                return (
                    <div className={`dialog-buttons ${props.assessmentClass}`}>
                        <span option={PRIMARY_BUTTON} className={`cancel-button tcm`}
                        onClick={() => props.tcmButtonHandler('Reject', props.tcmSnapshotData, props.elementData)}>Revert</span>
                        <span option={SECONDARY_BUTTON} className={`lo-save-button tcm ${!this.props.permissions?.includes('trackchanges_approve_reject') && "disable"}`}
                        onClick={() => props.tcmButtonHandler('Accept', props.tcmSnapshotData, props.elementData)}>Accept</span>
                    </div>
                )
            }
        }
        if (props.AssessmentPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`lo-save-button`} onClick={(e) => props.agree(false, e)}>{props.yesButton}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.setDecorativePopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`save-button`} onClick={(e) => {props.agree(false, e);this.handleClickOnSetButton();}}>{props.setAsDecorative}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.UsagePopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`lo-save-button`} onClick={(e) => props.agree(true,e)}>{props.proceedButton}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.isCurrentSlate === 'owner') {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`lo-save-button`} onClick={(e) => props.proceed(this.state.isChecked, false, e)}>{props.proceedButton}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        if (props.unlockSlateToggle) { // Warning buttons actions on unlock button clicked by Admin
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className={`save-button`} onClick={(e) =>props.handleUnlockSlate('ok')}>OK</span>
                    <span option={SECONDARY_BUTTON} className={`cancel-button`} onClick={(e) => props.handleCancelUnlock('cancel')}>{props.cancelBtnText}</span>
                </div>
            )
        } else if (props.isCurrentSlate === 'subscriber') {
            return (
                <div className={`subscriberSlate-buttons`}>
                    <span option={PRIMARY_BUTTON} className="subscriberSlate-ok-button" onClick={(e) => props.proceed(this.state.isChecked, false, e)}>OK</span>
                </div>
            )
        }
        if(props.showBlockCodeElemPopup) {
            return (
                <div className={`dialog-buttons`}>
                    <span option={PRIMARY_BUTTON} className="lo-save-button" onClick={(e) => props.togglePopup(false, e)}>OK</span>
                </div>
            )
        }
        if(props.importWordFilePopup){
            return(
            <div className='import-word-checkbox-message'>
                <div className={`dialog-buttons`}>
                    <span className="start-import-button" onClick={(e) => {props.proceed(false, e)}}>{START_IMPORTING_BUTTON_TEXT}</span>
                </div>
            </div>
            )
        }
        if(props.importAndDropPopup){
            return(
            <div className='dialog-buttons-upload-file'>
                <div className='importing-tip-container' onClick={props?.handleImportingTipsClick}>
                    <img src={importPopupSS14} height='20px' width='20px' />
                    <span className='importing-tip-text'>{IMPORTING_TIPS_TEXT}</span>
                </div>
                <div>
                    <button type='button' id='nextButtonForImport' className={this.state.fileToBeUploaded.name ? "start-import-button" : "start-import-button-disabled"} onClick={(e) => props.toggleNextButton(false, e, this.state.fileToBeUploaded)}>{NEXT_BUTTON_TEXT}<ArrowForwardIosIcon className='forward-arrow'/></button>
                    <span className="cancel-button-import" onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            </div>
            )
        }
        else if(props.previewUploadedFilePopup){
            return (
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span className={this.state.enableImport ? "import-button-import-word" :"import-button-import-word-disable"} onClick={(e) => props.proceed(false, e)}>{props.saveButtonText}<img src={importPopupSS18} /></span>
                    <span className="cancel-button-import" id='close-container-preview' onClick={(e) => props.togglePopup(false, e)}>{props.cancelBtnText}</span>
                </div>
            )
        }
        else {
            return (
                <div className={`dialog-buttons ${props.assessmentClass}`}>
                    <span option={PRIMARY_BUTTON} className="save-button" onClick={props.saveContent}>{props.saveButtonText}</span>
                    <span option={SECONDARY_BUTTON} className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, e)}>Cancel</span>
                </div>
            )
        }
    }
    /**
    * @description - This function is responsible for handling the Input box of the popup.
    * @param {event}
    */
    renderInputBox = (props) => {
        if (props.alfrescoExpansionPopup || props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.removeConfirmation ||
            props.wrongAudio || props.lockForTOC || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation ||
            props.altText || props.LOPopup || props.imageGlossary || props.wrongImage || props.isTCMCanvasPopup || props.AssessmentPopup ||
            props.setDecorativePopup || props.isSubscribersSlate || props.isAddComment || props.isDeleteAssetPopup || props.UsagePopup ||
            props.showBlockCodeElemPopup || props.removeMarkedIndex || props.isApprovedSlate || props.unlockSlateToggle || props.importWordFilePopup || 
            props.previewUploadedFilePopup || props.importAndDropPopup) {
            return null
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
                    checkInvalidPowerPasteContent={this.checkInvalidPowerPasteContent}
                    isPowerPasteInvalidContent={this.state.isPowerPasteInvalidContent}
                    checkPowerPasteLimit={this.checkPowerPasteLimit}
                    isPowerPasteLimitExceeding={this.state.isPowerPasteLimitExceeding}
                />
            )
        } else if (props.withCheckBox) {
            const { isChecked } = this.state
            return (
                <div className="OwnersSlateInputLine">
                    <input className="OwnersSlateCheckBox" type="checkbox" checked={isChecked} onChange={this.handleChange} />
                    {props.isCurrentSlate === "subscriber" ? <p>{DONT_ASK_TEXT}</p> : <p>{DO_NOT_SHOW_TXT}</p>}
                </div>
            )
        }
        else {
            return (
                <textarea autoFocus className={`dialog-input-textarea ${props.assessmentClass}`} type="text" onChange={(event) => props.handleChange(event.target.value)}
                onClick={(event) => this.handleClickTextArea(event)}
                placeholder={props.placeholder} disabled={props.isInputDisabled} value={props.inputValue} rows={props.rows} cols={props.cols} maxLength={props.maxLength} />
            )
        }
    }

    handleClickTextArea = (event) => {
        event.stopPropagation();
    }

    checkValidation = (file) => {
        if(!file.name.endsWith(".docx"))
        {
            this.setState({errorFileType: true});
            return;
        }
        if( (Math.round((file.size / 1048576)).toFixed(2)) > 10)
        {
            this.setState({errorFileSize: true});
            return;
        }
        if( file.size === 0 )
        {
            this.setState({errorFileEmpty: true});
            return;
        }
        this.setState({fileToBeUploaded: file});
    }

    handleFiledrop = (event) => {
        event.preventDefault();
        if(event.dataTransfer.files[0]){
            const file = event.dataTransfer.files[0];
            this.checkValidation(file);
        }
       
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleFileChangeOnInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            this.setState({errorFileSize: false, errorFileType: false, errorFileEmpty: false});
            this.checkValidation(file);
        };
        }

    renderCloseSymbol = (props) => {
        if (props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive || props.removeConfirmation ||
            props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.WordPastePopup ||
            props.LOPopup || props.imageGlossary || props.isTCMCanvasPopup || props.AssessmentPopup || props.setDecorativePopup || props.isOwnersSlate ||
            props.isSubscribersSlate || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup || props.removeMarkedIndex ||
            props.isApprovedSlate || props.renderTcmPopupIcons || props.unlockSlateToggle|| props.importAndDropPopup || props.previewUploadedFilePopup) {
            return null
        }
        else {
            return (
                <span className={`close ${props.assessmentClass}`} onClick={(e) => props.togglePopup(false, e)}>&times;</span>
            )
        }
    }

    enableImportButton = () => {
        this.setState({enableImport: true});
    }

    /**
    * @description - This function is responsible for rendering the Dialog text in the popup.
    * @param {event}
    */
    renderDialogText = (props) => {
        if(props.alfrescoExpansionPopup){
            let imgList = props?.alfrescoExpansionMetaData?.renderImages?.map((image) => (
                  <div className='imageContainer'>
                    <img
                      className='img-inside-container'
                      src={image.imgSrc}
                      id={image.imgId}
                      onClick={() => this.processImageID(image.imgId)}
                    />
                  </div>
                ))
            return (
                <>
                   <div className='tableAlfrescoPopupHeader'>{props?.alfrescoExpansionMetaData?.headerText}</div>
                    <div className="Please-select-an-image">{props?.alfrescoExpansionMetaData?.normalText}</div>
                    <div className='tableElement-img-container'>
                        {props.alfrescoExpansionMetaData.renderImages.length > 0 ? imgList : <LargeLoader/>}
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
                    <div className="delete-element-text">{config.tcmStatus && !notAllowedTCMElementTypes.includes(props?.elementType) &&
                        !notAllowedTCMElementTypes.includes(props?.figureType) ? DELETE_INSTRUCTION_FOR_TCM : props.deleteInstruction}</div>
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
        else if (props.removeMarkedIndex) {
            //jsx dialog text
            return (
                <>
                    <h2 className='markedIndexWarning'>Warning</h2>
                    {<div className={`dialog-window  ${props.removeMarkedClass}`} >{props.dialogText}</div>}
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
        else if (props.sytaxHighlight) {
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
                    {this.state.isPowerPasteInvalidContent && <div className={`${this.state.isPowerPasteInvalidContent && this.state.isPowerPasteLimitExceeding ? 'multiple-warning-messages' : 'unsupContent'}`}>{UNSUPPORTED_CONTENT_ERR_MSG}</div>}
                    {this.state.isPowerPasteLimitExceeding && <div className={`${this.state.isPowerPasteInvalidContent && this.state.isPowerPasteLimitExceeding ? 'multiple-warning-messages' : 'unsupContent'}`}>{PASTE_LIMIT_WARNING_1}{pasteElementLimit}{PASTE_LIMIT_WARNING_2}</div>}
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
                <div ref={this.contentRef} className={`dialog-window ${props.assessmentClass}`}
                dangerouslySetInnerHTML={{ __html: this.transformHtmlForCallout(props.dialogText) }}></div>
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
        else if (props.setDecorativePopup) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br /><br />{this.props.isAutoNumberingEnabled ?
                    SET_AS_DECORATIVE_IMAGE_AUTONUM : SET_AS_DECORATIVE_IMAGE_NON_AUTONUM}<br /><br />{SET_AS_DECORATIVE_IMAGE_NOTE}</div>
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
        else if (props.isCurrentSlate === 'owner') {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.lOPopupClass}`}>{props.dialogText}<br /><br /></div>
                </>
            )
        }
        else if(props.importAndDropPopup){
            return(
                <>
                    <div className='import-and-drop-file-heading'>
                        {props.dialogText}
                    </div>
                    <div className='import-and-drop-file-stepper'>
                        <span className='stepper1'><img src={importPopupSS8} width='23px' height='24px'/><span>{STEPPER_TEXT_UPLOAD_WORD_FILE}</span></span>
                        <span className='stepper1'><img src={importPopupSS11} width='290px' height='6px'/></span>
                        <span className='stepper1'><img src={importPopupSS16} width='23px' height='24px'/><span></span>{STEPPER_TEXT_PREVIEW}</span>
                    </div>
                    {this.state.fileToBeUploaded.name ? <div className='file-description-container'>
                        <div className='file-description-sub-container'>
                            <span className='file-details-container'>
                                <img src={importPopupSS12} width='40px' height='40px'/>
                                <div>{this.state.fileToBeUploaded.name}</div>
                            </span>
                            <span className='close-icon-file-container' onClick={()=>{this.setState({fileToBeUploaded: {}, errorFileSize: false, errorFileType: false, errorFileEmpty: false}); }}><img src={CloseIcon} width='48px' height='48px'/></span>
                        </div>
                        <div className='file-metadata-container'>
                            <span>{this.state?.fileToBeUploaded?.size <= 102400 ? (this.state?.fileToBeUploaded?.size/1000).toFixed(2) : (this.state?.fileToBeUploaded?.size/1048576).toFixed(2)}{this.state?.fileToBeUploaded?.size <= 102400 ? 'KB' : 'MB'}</span>
                            <span>{COMPLETED_TEXT}</span>
                        </div>
                    </div> :
                    <div className={this.state.errorFileType || this.state.errorFileSize || this.state.errorFileEmpty ? 'file-container-error-file-type':'file-container'} onDrop={(event) => this.handleFiledrop(event)} onDragOver={(event) => this.handleDragOver(event)}>
                        <input type='file' accept='.docx' hidden ref={this.inputRef} onChange={(event) => this.handleFileChangeOnInput(event)}/>
                        <span>{this.state.errorFileSize || this.state.errorFileType || this.state.errorFileEmpty ? <img src={importPopupSS13} width='40px' height='40px'/> : <img src={importPopupSS12} width='40px' height='40px'/>}</span>
                        <span className='file-container-text-1'><span className={this.state.errorFileType || this.state.errorFileSize || this.state.errorFileEmpty ? 'file-container-text-link-error' :'file-container-text-link'} onClick={() => this?.inputRef?.current?.click()}><u>{UPLOAD_CONTAINER_TEXT}</u></span>{UPLOAD_CONTAINER_TEXT_SECOND_HALF}</span>
                        {this.state.errorFileSize ? <span className='file-container-text-2-error'>{FILE_SIZE_ERROR_MESSAGE}</span> : (this.state.errorFileType ? <span className='file-container-text-2-error'>{UNSUPPORTED_FILE_ERROR_MESSAGE}</span> : this.state.errorFileEmpty ? <span className='file-container-text-2-error'>{EMPTY_FILE_ERROR_MESSAGE}</span> : <span className='file-container-text-2'>{SUPPORTED_FILE_MESSAGE}</span>)}
                    </div>}
                </>
            )
        }
        else if (props.importWordFilePopup) {
            return (
              <>
                {/* <div className='loPopupHeader'>{`${props.dialogText}`}</div> */}
                <div className="import-wordpopup-heading">
                  {props.dialogText}
                  <br />
                  <br />
                </div>
                <div className="import-wordpopup-content">
                  <div className='import-wordpopup-content-description'>
                            {IMPORTING_TIPS_CONTENT_TEXT_FIRST}
                        </div>
                        <div className='import-wordpopup-content-title'>
                            <strong>{IMPORTING_TIPS_CONTENT_TEXT_SECOND}</strong>{IMPORTING_TIPS_CONTENT_TEXT_THIRD}
                        </div>
                        <div className='import-wordpopup-content-title-2'>
                            <strong>{IMPORTING_TIPS_CONTENT_TEXT_FOURTH}</strong>{IMPORTING_TIPS_CONTENT_TEXT_FIFTH}
                        </div>
                        <div className='import-wordpopup-content-title-3'>
                            <img src={importPopupSS1} width='70px' height='47px' />
                            <img src={importPopupSS2} width='70px' height='47px' />
                            <img src={importPopupSS3} width='70px' height='47px' />
                            <img src={importPopupSS4} width='70px' height='47px' />
                        </div>
                        <div className='import-wordpopup-content-title-4'>
                            <strong>{IMPORTING_TIPS_CONTENT_TEXT_SIXTH}</strong>{IMPORTING_TIPS_CONTENT_TEXT_SEVENTH}
                        </div>
                        <div className='import-wordpopup-content-title-3'>
                            <img src={importPopupSS5} width='48px' height='62px' />
                            <img src={importPopupSS6} width='68px' height='62px' />
                            <img src={importPopupSS7} width='84px' height='62px' />
                        </div>
                </div>
            </>
            );
        }
        else if(props.previewUploadedFilePopup){
            return (                
                <div>
                    <div className='import-and-drop-file-heading'>{PREVIEW_POPUP_HEADING}</div>
                    <br/>
                    <div className='import-and-drop-file-stepper-preview'>
                        <span className='stepper1'><img src={importPopupSS15} width='23px' height='24px'/><span>{PREVIEW_POPUP_STEPPER_TEXT_FIRST}</span></span>
                        <span className='stepper1'><img src={importPopupSS11} width='239px' height='10px'/></span>
                        <span className='stepper1'><img src={importPopupSS17} width='23px' height='24px'/><span>{PREVIEW_POPUP_STEPPER_TEXT_SECOND}</span></span>
                    </div>
                <div className='preview-container'>
                </div>
                    <PreviewWordFile fileToBeUploaded={this.props.fileToBeUploaded} onImport={this.props.onImport} enableImportButton={this.enableImportButton} togglePopup={props.togglePopup}/> 
                </div>
            )
        }
        else if (props.isCurrentSlate === 'subscriber') {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.
                    lOPopupClass}`}>This is a non-editable content as it is subscribed from another project. You may contact the owner of this content to make any changes.
                    </div>
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
        else if (props.isApprovedSlate) {
            return (
                <>
                    <div className='loPopupHeader'>{`${props.warningHeaderText}`}</div>
                    <div className={`${props.approvePopupClass}`}>{props.dialogText}<br /><br /></div>
                </>
            )
        }
        else if (props.unlockSlateToggle) {
            //jsx dialog text to show unlock warning message on Admin side
            return (
                <>
                    <h2 className='tocDeleteHeader'>Warning</h2>
                    {<div className={`dialog-window  ${props.tocDeleteClass}`} >{props.dialogText}</div>}
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
        if (props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive ||
            props.removeConfirmation || props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation ||
            props.altText || props.WordPastePopup || props.LOPopup || props.AssessmentPopup || props.setDecorativePopup || props.isOwnersSlate ||
            props.isSubscribersSlate || props.isDeleteAssetPopup || props.UsagePopup || props.showBlockCodeElemPopup || props.removeMarkedIndex || props.unlockSlateToggle || 
            props.importWordFilePopup) {
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
        if (props.showDeleteElemPopup || props.isLockReleasePopup || props.isSplitSlatePopup || props.assessmentAndInteractive || props.removeConfirmation ||
            props.sytaxHighlight || props.listConfirmation || props.isElmUpdatePopup || props.showConfirmation || props.altText || props.WordPastePopup ||
            props.LOPopup || props.AssessmentPopup || props.setDecorativePopup || props.isTCMCanvasPopup || props.isDeleteAssetPopup || props.UsagePopup ||
            props.showBlockCodeElemPopup || props.unlockSlateToggle) {
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

    // function to render checkbox inside delete element warning popup
    renderPopupCheckbox = (props) => {
        if (props.showDeleteElemPopup) {
            return (
                <div className='popup-checkbox-message'>
                    <input className='popup-checkbox' type="checkbox" value={props.warningPopupCheckbox} checked={props.warningPopupCheckbox}
                    onChange={(event) => props?.handleCheckboxPopup(event)} />
                    <p className='popup-checkbox-text'>{CHECKBOX_MESSAGE}</p>
                </div>
            )
        } else if (props.listConfirmation) {
            return (
                <div className='popup-checkbox-message'>
                    <input className='popup-checkbox' type="checkbox" value={props.listElementWarningPopupCheckbox}
                    checked={props.listElementWarningPopupCheckbox} onChange={(event) => props?.handleListElementWarningPopupCheckbox(event)} />
                    <p className='popup-checkbox-text'>{CHECKBOX_MESSAGE}</p>
                </div>
            )
        } else if (props.openRemovePopUp || props.isDeleteAssetPopup) {
            return (
                <div className='popup-checkbox-message'>
                    <input className='popup-checkbox' type="checkbox" value={this.state.deleteWarningPopupCheckbox}
                    checked={this.state.deleteWarningPopupCheckbox} onChange={(event) => this.handleDeleteWarningPopupCheckbox(event)} />
                    <p className='popup-checkbox-text'>{CHECKBOX_MESSAGE}</p>
                </div>
            )
        } else if (props.setDecorativePopup) {
            return (
                <div className='popup-checkbox-message'>
                    <input className='popup-checkbox' type="checkbox" value={this.state.setAsDecorativePopUpCheckbox}
                    checked={this.state.setAsDecorativePopUpCheckbox} onChange={(event) => this.handleSetAsDecorativeWarningPopupCheckbox(event)} />
                    <p className='popup-checkbox-text'>{CHECKBOX_MESSAGE}</p>
                </div>
            )
        }
        else {
            return null
        }
    }

    render() {
        const { active, assessmentClass, isGlossary, isTCMCanvasPopup, alfrescoExpansionMetaData, assessmentConfirmation } = this.props;
        return (
            <div className="model">
                {
                    active ?
                        <div tabIndex="0" className={`model-popup ${this.props.wirisAltTextClass ?? assessmentClass}`} ref={this.modelRef}>
                            <div className={this.props.isWordPastePopup ? `wordPasteClass ${this.state.isPowerPasteInvalidContent || this.state.isPowerPasteLimitExceeding ? 'wPasteClswithInvalidContent': ''}` :
                            this.props.alfrescoExpansionPopup ? alfrescoExpansionMetaData.renderImages.length > 4 ? `modal-content alfresco-long-popup` :
                            `modal-content alfresco-short-popup`  : this.props.importWordFilePopup ? 'import-word-file-popup' : (this.props.previewUploadedFilePopup ? 'preview-file-popup' : this.props.importAndDropPopup ? 'import-and-drop-file-popup': `modal-content ${assessmentConfirmation} ${assessmentClass}`)} id={isGlossary ? 'popup' : 'popup-visible'}>
                                {this.renderTcmPopupIcons(this.props)}
                                {this.props.isCurrentSlate !== 'subscriber' ? this.renderCloseSymbol(this.props) : ''}
                                {this.renderDialogText(this.props)}
                                {this.renderPopupCheckbox(this.props)}
                                <div ref={this.wordPastePopupTextAreaRef} className={this.props.isWordPastePopup ?
                                    `dialog-input-poc ${this.state.wordPasteProceed && 'enable-scrolling'}` : `dialog-input ${assessmentClass}`}>
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
    yesButton: "Yes",
    cancelBtnText: "Cancel",
    deleteInstruction: "Are you sure you want to delete, this action cannot be undone?",
    proceedButton: "Proceed",
    setAsDecorative: "Set as Decorative Image"

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
