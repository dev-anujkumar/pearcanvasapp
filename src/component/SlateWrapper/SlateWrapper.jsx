// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sortable from 'react-sortablejs';

// IMPORT - Components //
import SlateHeader from '../CanvasSlateHeader';
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import { SlateFooter } from './SlateFooter.jsx';

/** pasteElement function location to be changed */
import { createElement, swapElement, setSplittedElementIndex, updatePageNumber, accessDenied, pasteElement, wirisAltTextPopup } from './SlateWrapper_Actions';
import { sendDataToIframe, getSlateType, defaultMathImagePath, isOwnerRole, isSubscriberRole, guid, releaseOwnerPopup, getCookieByName } from '../../constants/utility.js';
import { ShowLoader, SplitCurrentSlate, OpenLOPopup, WarningPopupAction, AddEditLearningObjectiveDropdown } from '../../constants/IFrameMessageTypes.js';
import ListButtonDropPortal from '../ListButtonDrop/ListButtonDropPortal.jsx';
import ListButtonDrop from '../ListButtonDrop/ListButtonDrop.jsx';
import config from '../../config/config';
import { TEXT, IMAGE, VIDEO, ASSESSMENT, INTERACTIVE, CONTAINER, WORKED_EXAMPLE, SECTION_BREAK, METADATA_ANCHOR, LO_LIST, ELEMENT_ASSESSMENT, OPENER,
    ALREADY_USED_SLATE , REMOVE_LINKED_AUDIO, NOT_AUDIO_ASSET, SPLIT_SLATE_WITH_ADDED_AUDIO , ACCESS_DENIED_CONTACT_ADMIN, IN_USE_BY, LOCK_DURATION, SHOW_HIDE,POP_UP ,
    CITATION, ELEMENT_CITATION,SMARTLINK,POETRY ,STANZA, BLOCKCODE, TABLE_EDITOR, FIGURE_MML, MULTI_COLUMN, MMI_ELM, ELEMENT_DIALOGUE, ELEMENT_DISCUSSION, ELEMENT_PDF,
    MULTI_COLUMN_3C, REMOVE_LINKED_IMAGE_GLOSSARY, NOT_IMAGE_ASSET, MANIFEST_LIST, OWNER_SLATE_POPUP
} from './SlateWrapperConstants';
import PageNumberElement from './PageNumberElement.jsx';
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';
import PopUp from '../PopUp';
import Toast from '../Toast';
import { hideBlocker, showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { fetchAudioNarrationForContainer, deleteAudioNarrationForContainer, showAudioRemovePopup, showAudioSplitPopup , showWrongAudioPopup, audioGlossaryPopup} from '../AudioNarration/AudioNarration_Actions'
import { setSlateLock, releaseSlateLock, setLockPeriodFlag, getSlateLockStatus } from '../CanvasWrapper/SlateLock_Actions'
import { fetchSlateData, setActiveElement,openPopupSlate, isOwnersSubscribedSlate } from '../CanvasWrapper/CanvasWrapper_Actions';
import { showSlateLockPopup, toggleLOWarningPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import { getMetadataAnchorLORef } from '../ElementMetaDataAnchor/ExternalLO_helpers.js';
import { handleTCMData } from '../TcmSnapshots/TcmSnapshot_Actions.js'
import { assessmentConfirmationPopup } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions';
import { reloadSlate } from '../../component/ElementContainer/AssessmentEventHandling';
import LazyLoad, {forceCheck} from "react-lazyload";
import { createPowerPasteElements } from './SlateWrapper_Actions.js';

import { getCommentElements } from './../Toolbar/Search/Search_Action.js';
import { TEXT_SOURCE, CYPRESS_LF, cypressLOWarningtxt, externalLOWarningtxt } from '../../constants/Element_Constants.js';
import AlfrescoPopup from '../AlfrescoPopup/AlfrescoPopup.jsx';
import { SLATE_TYPE_ASSESSMENT, SLATE_TYPE_PDF } from '../AssessmentSlateCanvas/AssessmentSlateConstants';
import { ADD_FIGURE_GLOSSARY_POPUP, SET_FIGURE_GLOSSARY } from '../../constants/Action_Constants.js'
import store from '../../appstore/store';
import { showWrongImagePopup, showRemoveImageGlossaryPopup } from '../../component/GlossaryFootnotePopup/GlossaryFootnote_Actions.js';
import {alfrescoPopup} from '../AlfrescoPopup/Alfresco_Action.js';
import KeyboardUpDown from '../Keyboard/KeyboardUpDown.jsx';
import { savePopupParentSlateData } from '../FigureHeader/AutoNumberCreate_helper';

let random = guid();

class SlateWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previousSlateId: null,
            showLockPopup: false,
            showCustomPopup: false,
            customPopupMessage: '',
            lockOwner: "",
            lockOwnerName: "",
            showSplitSlatePopup: false,
            splittedSlateIndex: 0,
            hasError: false,
            showReleasePopup: false,
            isWordPastePopup:false,
            showpocpopup:false,
            pastedindex:null,
            powerPasteData: [],
            updatedindex:'',
            showOwnerSlatePopup: false,
            parentUrn:null
        }
        this.isDefaultElementInProgress = false;
    }

    componentDidMount() {
        forceCheck();
        if (document.getElementById("cypress-0")) {
            document.getElementById("cypress-0").focus();
        }

        // binds handleClickOutside to document mousedown //
        document.addEventListener("mousedown", this.handleClickOutside);
        window.addEventListener('scroll',this.handleScroll)
    }

    componentDidUpdate() {
        let divObj = 0;
        if(this.props.searchParent !== '' && document.querySelector(`div[data-id="${this.props.searchParent}"]`) && !this.props.searchScroll) {
            divObj = document.querySelector(`div[data-id="${this.props.searchParent}"]`).offsetTop;
            if(this.props.searchNode !== '' && document.querySelector(`div[data-id="${this.props.searchNode}"]`) && this.props.searchNode !== this.props.searchParent) {
                divObj += document.querySelector(`div[data-id="${this.props.searchNode}"]`).offsetTop;
            }

            divObj = Math.round(divObj);
            document.getElementById('slateWrapper').scrollTop = divObj;
        }

        if(this.props.commentSearchParent !== '' && document.querySelector(`div[data-id="${this.props.commentSearchParent}"]`)) {
            divObj = document.querySelector(`div[data-id="${this.props.commentSearchParent}"]`).offsetTop;
            if(this.props.commentSearchNode !== '' && document.querySelector(`div[data-id="${this.props.commentSearchNode}"]`) && this.props.commentSearchNode !== this.props.commentSearchParent) {
                divObj += document.querySelector(`div[data-id="${this.props.commentSearchNode}"]`).offsetTop;
            }

            divObj = Math.round(divObj);
            if(!this.props.commentSearchScroll) {
                document.getElementById('slateWrapper').scrollTop = divObj;
            }
            
            if(this.props.commentSearchScrollTop === divObj) {
                this.props.getCommentElements('');
            }
        }
    }

    handleScroll = (e) => {
        forceCheck();
        if (config.totalPageCount <= config.page) return false;
        let scrollPosition = Number(e.target.scrollTop + e.target.clientHeight + 100);
        let scrollingPosition = Number(e.target.scrollTop);
        if (this.props.slateData[config.slateManifestURN] && (this.props.slateData[config.slateManifestURN].type === 'manifest')) {
            config.scrollPosition = scrollingPosition;
        }
        if ((scrollPosition >= e.target.scrollHeight) && config.scrolling) {
            config.scrolling = false;
            config.fromTOC = false;
            this.props.loadMorePages();
        }
    }
    

    /**
     * setListDropRef | sets list drop ref to listDropRef
     * @param {*} node | node reference to ListButtonDrop component
     */
    setListDropRef = (node) => {
        this.listDropRef = node;
    }

    /**
     * handleClickOutside | currently handles when clicked outside of list drop
     * @param {*} event | current triggerd event with target
     */
    handleClickOutside = (event) => {
        // *********************************************************************
        // handle when clicked outside of listdrop 
        if (this.listDropRef && !this.listDropRef.contains(event.target)) {
            if (event.target.classList.contains('fa-list-ol') ||
                (event.target.type === "button" && event.target.getAttribute('aria-label') === "Ordered List"))
                return;
            let _listWrapperDiv = document.querySelector('#listDropWrapper');
            if (_listWrapperDiv)
                _listWrapperDiv.querySelector('.fr-popup').classList.remove('fr-active');
        }
        // *********************************************************************
    }

    static getDerivedStateFromProps = (props, state) => {
        forceCheck();
        /**
         * updateTimer is for updating Time for slate refresh
         */

        if (typeof props.updateTimer !== "undefined") {
            props.updateTimer();
        }
        /**
         * First chunk of block manages previous rendered slateId and changes only when new slate renders in canvas
         * and in case of new slate being rendered it removes all previous tinymce instances
         */
        let stateChanged = false;
        let _state = state;
        //**************************************************** */
        // let _slateObject = Object.values(props.slateData)[0];
        let _slateObject = props.slateData[config.slateManifestURN];
        if (_slateObject) {
            let { id: _slateId } = _slateObject;
            if (_slateId !== state.previousSlateId) {
                if (document.getElementById('slateWrapper')) {
                    document.getElementById('slateWrapper').scrollTop = 0;
                }
                _state = {
                    ..._state,
                    previousSlateId: _slateId
                };
                for (let i = tinymce.editors.length - 1; i > -1; i--) {
                    let ed_id = tinymce.editors[i].id;
                    tinymce.remove(`#${ed_id}`)
                    tinymce.$('.wrs_modal_desktop').remove();
                }
                stateChanged = true;
            }
        }
        //**************************************************** */
        /**
         * This chunk manages slatelock info
         */
        const { slateLockInfo: { isLocked, userId, userFirstName, userLastName },projectSubscriptionDetails:{projectSharingRole,projectSubscriptionDetails:{isSubscribed}} } = props
        if (!isLocked) {
            _state = {
                ..._state,
                showLockPopup: false
            }
            stateChanged = true;
        }
        if (stateChanged) {
            return _state;
        }
        if (props.showSlateLockPopupValue) {
            _state = {
                ..._state,
                showLockPopup: true,
                lockOwner: userId,
                lockOwnerName: `${userFirstName} ${userLastName}`
            }
            return _state;
        }
        else if(isOwnerRole(projectSharingRole,isSubscribed) || isSubscriberRole(projectSharingRole,isSubscribed)){
            _state={
                ..._state,
                showOwnerSlatePopup: true
            }
        }
        else {
            return null
        }

    }

    /**
     * Prepares data after element swapping occurs
     * @param {*} event event object
     */
    prepareSwapData = (event) => {
        const { slateData } = this.props
        const _slateBodyMatter = slateData[config.slateManifestURN].contents.bodymatter
        const swappedElementData = _slateBodyMatter[event.oldDraggableIndex]
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            workedExample: false,
        }
        return dataObj
    }

    /**
     * renderSlateHeader | renders slate title area with its slate type and title
     */
    renderSlateHeader({ slateData: _slateData }) {
        const { slateLockInfo, projectSubscriptionDetails:{projectSharingRole,projectSubscriptionDetails:{isSubscribed}} } = this.props
        try {
            if (_slateData !== null && _slateData !== undefined && _slateData[config.slateManifestURN]) {
                return (
                    <SlateHeader slateLockInfo={slateLockInfo} projectSharingRole={projectSharingRole} projectSubscriptionDetails={isSubscribed}/>
                )
            } else {
                return (
                    <SmalllLoader />
                )
            }
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Checks for opener element and prevents swapping.
     */
    checkOpener = evt => {
        if (evt.newDraggableIndex === 0 && config.isCO) {
            return true
        }
        return false
    }

    /*** renderSlate | renders slate editor area with all elements it contain*/
    renderSlate({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let _slateObject = _slateData[config.slateManifestURN];
                    if(_slateObject==undefined){
                        return false
                    }
                    let _slateContent = _slateObject.contents
                    let { id: _slateId, type: _slateType } = _slateObject;
                    let { bodymatter: _slateBodyMatter } = _slateContent
                    this['cloneCOSlateControlledSource_' + random] = this.renderElement(_slateBodyMatter, config.slateType, this.props.slateLockInfo)
                    let _context = this;
                    const {projectSubscriptionDetails:{projectSharingRole, projectSubscriptionDetails:{isSubscribed}}}=this.props
                    return (
                        <div className={`slate-content ${isOwnerRole(projectSharingRole,isSubscribed) ? 'ownerSlateBackGround' :'' } ${config.slateType === 'assessment' ? 'assessment-slate' : ''}`} data-id={_slateId} slate-type={_slateType}>
                            <div className='element-list'>
                                <Sortable
                                    options={{
                                        sort: true,  // sorting inside list
                                        //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                                        animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                                        dragoverBubble: false,
                                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                                        scrollSpeed: 10,
                                        handle: '.element-label', //Drag only by element tag name button
                                        dataIdAttr: 'data-id',
                                        scroll: true, // or HTMLElement
                                        filter: ".ignore-for-drag",
                                        draggable: ".lazyload-wrapper",
                                        // ignoreNextClick : false,
                                        preventOnFilter: false,
                                        forceFallback: true,
                                        onStart: function (/**Event*/evt) {
                                            // same properties as onEnd
                                            _context.checkSlateLockStatus(evt)
                                        },

                                        // Element dragging ended
                                        onUpdate: (/**Event*/evt) => {
                                            if (this.checkOpener(evt) || config.savingInProgress) {
                                                evt.preventDefault()
                                                evt.stopPropagation()
                                                return false
                                            }
                                            let dataObj = this.prepareSwapData(evt)
                                            this.props.swapElement(dataObj, () => { })
                                            this.props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                            let showHideNode = document.querySelector('.show-hide-active')
                                            if(showHideNode){
                                                showHideNode.classList.remove("show-hide-active")
                                            }
                                        },
                                    }}
                                    ref={(c) => {
                                        if (c) {
                                            //let sortable = c.sortable;
                                        }
                                    }}
                                    tag="div"
                                    onChange={function (items, sortable, evt) { }}
                                >
                                    {this['cloneCOSlateControlledSource_' + random]}
                                </Sortable>
                            </div>
                            <SlateFooter elements={_slateBodyMatter} projectSharingRole={projectSharingRole} isSubscribed={isSubscribed}/>
                        </div>
                    )
                }
                else {
                    return (
                        <React.Fragment>
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                            <LargeLoader />
                        </React.Fragment>
                    )
                }
            }
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    /**
     * Calls release lock API
     */
    releaseSlateLock = (projectUrn, slateId) => {
        this.props.showBlocker(true)
        showTocBlocker();
        sendDataToIframe({ 'type': 'showReleasePopup', 'message': { status: true } })
        this.props.releaseSlateLock(projectUrn, slateId)
    }

    /**
     * Sets countdown for release slate lock immediately after the slate is locked.
     */
    debounceReleaseLock = (callback) => {
        //900000ms - 15mins
        let timer;
        let _context = this
        return function () {
            clearTimeout(timer)
            timer = setTimeout(() => {
                this.debounceReleaseHandler(callback, _context)
            }, LOCK_DURATION)
        }
    }

    /**
     * Calls release lock API and shows notification popup.
     */
    debounceReleaseHandler = (callback, context) => {
        if (context.props.withinLockPeriod) {
            callback(config.projectUrn, Object.keys(context.props.slateData)[0])
            context.props.setLockPeriodFlag(false)
        }
    }

    debounceReleaseTimeout = this.debounceReleaseLock(this.releaseSlateLock);

    /**
     * Sets slate lock
     * @param {*} slateId slate ID
     * @param {*} lockDuration duration of lock
     */
    setSlateLock = (slateId, lockDuration) => {
        if (this.props.withinLockPeriod) {
            this.debounceReleaseTimeout()
        }
        else {
            const { projectUrn } = config
            // this.props.setLockPeriodFlag(true)                       // For local testing purpose
            this.props.setSlateLock(projectUrn, slateId, lockDuration)
            this.debounceReleaseTimeout()
        }
    }

    /**
     * Shows lock release popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    toggleLockReleasePopup = (toggleValue, event) => {
        this.setState({
            showReleasePopup: toggleValue
        })
        this.props.showBlocker(toggleValue)
        hideBlocker()
        this.prohibitPropagation(event)
    }

    /**
     * Prevents event propagation and default behaviour
     * @param {*} event event object
     */
    prohibitPropagation = (event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        return false
    }

    checkLockStatus = () => {
        const { slateLockInfo,projectSubscriptionDetails:{projectSharingRole, projectSubscriptionDetails:{isSubscribed}}} = this.props
        let lockedUserId = slateLockInfo.userId.replace(/.*\(|\)/gi, ''); // Retrieve only PROOT id
        if (slateLockInfo.isLocked && config.userId !== lockedUserId) {
            this.setState({
                lockOwner: slateLockInfo.userId,
                lockOwnerName: `${slateLockInfo.userFirstName} ${slateLockInfo.userLastName}`
            })
            return true
        }else if(isOwnerRole(projectSharingRole,isSubscribed)){
            const slateId = Object.keys(this.props.slateData)[0],
                lockDuration = 5400
            this.setSlateLock(slateId, lockDuration)
            return this.props.projectSubscriptionDetails.isOwnersSubscribedSlateChecked
        }else if(isSubscriberRole(projectSharingRole,isSubscribed)){
            return true
        }
        else {
            const slateId = Object.keys(this.props.slateData)[0],
                lockDuration = 5400
            this.setSlateLock(slateId, lockDuration)
            return false
        }
    }

    /**
     * Checks whether the slate is locked or not.
     * @param {*} event event object
     */
    checkSlateLockStatus = (event) => {
        if (this.checkLockStatus()) {
            this.prohibitPropagation(event)
            this.togglePopup(true)
        }
        else{
            if(config.savingInProgress){
                window.tinymce && window.tinymce.activeEditor && window.tinymce.activeEditor.selection.placeCaretAt(0, 0);
                this.prohibitPropagation(event)
            }
            this.props.getSlateLockStatus(config.projectUrn, config.slateManifestURN)
        }
    }

    openCustomPopup = (message) => {
        this.setState({
            showCustomPopup: true,
            customPopupMessage: message
        })
    }

    showCustomPopup = () => {

        if (this.state.showCustomPopup) {
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={this.state.customPopupMessage}
                    rows="1"
                    cols="1"
                    active={true}
                    togglePopup={this.toggleCustomPopup}
                    isLockPopup={true}
                    isInputDisabled={true}
                    slateLockClass="lock-message"
                    withInputBox={true}
                    lockForTOC={false}
                />
            )
        }
        else {
            return null
        }
    }

    /**
     * Shows 'slate locked' popup
     */
    showLockPopup = () => {
        const {projectSubscriptionDetails:{projectSharingRole, projectSubscriptionDetails:{isSubscribed}}}=this.props;
        var isOwnerKeyExist= localStorage.getItem('hasOwnerEdit');
        if (this.state.showLockPopup) {
            const { lockOwner } = this.state
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={ALREADY_USED_SLATE}
                    rows="1"
                    cols="1"
                    active={true}
                    togglePopup={this.togglePopup}
                    inputValue={lockOwner}
                    isLockPopup={true}
                    isInputDisabled={true}
                    slateLockClass="lock-message"
                    withInputBox={true}
                    addonText={IN_USE_BY}
                    lockForTOC={false}
                />
            )
        } else if (isOwnerRole(projectSharingRole,isSubscribed) && this.state.showOwnerSlatePopup && isOwnerKeyExist === null) {
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={OWNER_SLATE_POPUP}
                    togglePopup={this.togglePopup}
                    isOwnersSlate={true}
                    proceed={this.proceedButtonHandling}
                    warningHeaderText={`Warning`}
                    lOPopupClass="lo-warning-txt"
                    withCheckBox={true}
                />
            )
        }
        else if (isSubscriberRole(projectSharingRole,isSubscribed) && this.state.showOwnerSlatePopup ) {
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp
                    togglePopup={this.togglePopup}
                    isSubscribersSlate={true}
                    lOPopupClass="lo-warning-txt"
                />
            )
        }
        else {
            return null
        }
    }


    toggleCustomPopup = (toggleValue, event) => {
        this.setState({
            showCustomPopup: toggleValue
        })
        this.props.showBlocker(toggleValue)
        hideBlocker()
        this.prohibitPropagation(event)
    }

    closeAudioBookDialog =()=>{
        this.props.audioGlossaryPopup(false);
    }
    /**
     * Toggles popup
     */
    togglePopup = (toggleValue, event) => {
        this.setState({
            showLockPopup: toggleValue,
            showOwnerSlatePopup: toggleValue
        })
        this.props.showBlocker(toggleValue);
        this.props.showSlateLockPopup(false);
        hideBlocker()
        this.prohibitPropagation(event)
    }

    proceedButtonHandling = (isChecked, toggleValue, e) => {
        this.setState({
            showOwnerSlatePopup: toggleValue
        })
        this.props.showBlocker(toggleValue);
        this.props.showSlateLockPopup(false);
        hideBlocker()
        this.prohibitPropagation(e);
        if (isChecked) {
            releaseOwnerPopup(isChecked);
        }
        this.props.isOwnersSubscribedSlate(false);
    }

    handleCopyPastePopup = (wordPastePopup,index,parentUrn, asideData)=>{
      this.setState({
        isWordPastePopup: wordPastePopup,
        pastedindex: index,
        parentUrn:parentUrn,
        asideData
      })
  }

    splithandlerfunction = (type, index, firstOne, parentUrn, asideData, outerAsideIndex ,poetryData) => {
        if (this.checkLockStatus()) {
            this.togglePopup(true)
            return false
        }
        if (config.savingInProgress) {
            return false
        }
        let indexToinsert
        let outerIndex
        // Detects element insertion from the topmost element separator
        if (((firstOne || type === "opener-elem") && (!config.isCO)) || (firstOne && parentUrn)) {
            indexToinsert = Number(index)
        } else {
            indexToinsert = Number(index + 1)
        }
        /* For showing the spinning loader send HideLoader message to Wrapper component */
        if (type) { sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } }); }
        switch (type) {
            case 'image-elem':
                this.props.createElement(IMAGE, indexToinsert, parentUrn, asideData, null, null, null);
                break;
            case 'audio-elem':
                this.props.createElement(VIDEO, indexToinsert, parentUrn, asideData, null, null, null);
                break;
            case 'interactive-elem':
                this.props.createElement(INTERACTIVE, indexToinsert, parentUrn, asideData, null, null, null);
                break;
            case 'assessment-elem':
                this.props.createElement(ASSESSMENT, indexToinsert, parentUrn, asideData, null, null, null);
                break;
            case 'container-elem':
                this.props.createElement(CONTAINER, indexToinsert, parentUrn, asideData, null, null, null)
                break;
            case 'worked-exp-elem':
                this.props.createElement(WORKED_EXAMPLE, indexToinsert, parentUrn, null, null, null, null)
                break;
            case 'opener-elem':
                this.props.createElement(OPENER, indexToinsert, parentUrn, null, null, null, null)
                break;
            case 'section-break-elem':
                parentUrn.contentUrn = asideData.contentUrn
                parentUrn.manifestUrn = asideData.id
                if (typeof (outerAsideIndex) == "string") {
                    if (asideData?.parent?.type === "groupedcontent" || asideData?.parent?.type === "showhide") {
                        /** When WE is inside Mult-column */
                        outerIndex = outerAsideIndex.split("-")[3];
                        if (!outerIndex) { /** Add Section-Break after Head */
                            outerIndex = indexToinsert;
                        }
                    }else{
                        outerIndex = outerAsideIndex.split("-")[1]
                    }
                    if (outerIndex !== 1) {
                        outerIndex = Number(outerIndex) + 1
                    }
                } else {
                    outerIndex = indexToinsert;
                }
                this.props.createElement(SECTION_BREAK, indexToinsert, parentUrn, asideData, outerIndex, null, null)
                break;
            case 'metadata-anchor':
                if (config.slateType == "container-introduction") {
                    this.props.createElement(LO_LIST, indexToinsert, parentUrn, null, null, null, null);

                }
                else {
                    let LOUrn = this.props.getMetadataAnchorLORef();
                    this.props.createElement(METADATA_ANCHOR, indexToinsert, parentUrn, asideData, null, LOUrn, null)
                }

                break;
            case 'citation-elem':
                this.props.createElement(ELEMENT_CITATION, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'citations-group-elem':
                this.props.createElement(CITATION, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'show-hide-elem':
                this.props.createElement(SHOW_HIDE, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'popup-elem':
                this.props.createElement(POP_UP, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'smartlink-elem':
                this.props.createElement(SMARTLINK, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'poetry-elem':
                this.props.createElement(POETRY, indexToinsert, parentUrn,asideData,null,null,null,poetryData);
                break;
            case 'stanza-elem':
                this.props.createElement(STANZA, indexToinsert, parentUrn,asideData,null,null,null,poetryData);
                break;
            case 'figure-mml-elem':
                this.props.createElement(FIGURE_MML, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'blockcode-elem':
                this.props.createElement(BLOCKCODE, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'table-editor-elem-button':
                this.props.createElement(TABLE_EDITOR, indexToinsert, parentUrn, asideData, null, null);
                break;
            case 'multi-column-group':
                this.props.createElement(MULTI_COLUMN, indexToinsert, parentUrn, asideData, null, null, null, null)
                break;
            case 'multi-column-group-column-3':
                this.props.createElement(MULTI_COLUMN_3C, indexToinsert, parentUrn, asideData, null, null, null, null)
                break;
            case 'elm-interactive-elem':
                this.props.createElement(MMI_ELM, indexToinsert, parentUrn, asideData, null, null, null);
                break;
            case 'element-dialogue':
                this.props.createElement(ELEMENT_DIALOGUE, indexToinsert, parentUrn, asideData, null, null, null, null);
                break;
            case 'element-discussion': 
                this.props.createElement(ELEMENT_DISCUSSION, indexToinsert, parentUrn, asideData, null, null, null, null);
                break;
            case 'blocklist-elem':
                this.props.createElement(MANIFEST_LIST, indexToinsert, parentUrn, asideData, null, null, null, null,null);
                break;
            case 'text-elem':
            default:
                this.props.createElement(TEXT, indexToinsert, parentUrn, asideData, null, null, null, null, null);
                break;
        }
    }

    elementSepratorProps = (index, firstOne, parentUrn, asideData, outerAsideIndex , poetryData) => {
        
        return [
            {
                buttonType: 'text-elem',
                buttonHandler: () => this.splithandlerfunction('text-elem', index, firstOne, parentUrn, asideData),
                tooltipText: 'Text',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'image-elem',
                buttonHandler: () => this.splithandlerfunction('image-elem', index, firstOne, parentUrn, asideData),
                tooltipText: 'Image',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'audio-elem',
                buttonHandler: () => this.splithandlerfunction('audio-elem', index, firstOne, parentUrn, asideData),
                tooltipText: 'Audio/Video',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'block-text-button',
                buttonHandler: () => this.splithandlerfunction('block-text-button'),
                tooltipText: 'Block Text',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'interactive-elem-button',
                buttonHandler: () => this.splithandlerfunction('interactive-elem-button'),
                tooltipText: 'Interactive',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'table-editor-elem-button',
                buttonHandler: () => this.splithandlerfunction('table-editor-elem-button', index, firstOne, parentUrn, asideData ),
                tooltipText: 'Table',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'assessment-elem',
                buttonHandler: () => this.splithandlerfunction('assessment-elem', index, firstOne, parentUrn, asideData),
                tooltipText: 'Assessment',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'container-elem-button',
                buttonHandler: () => this.splithandlerfunction('container-elem-button'),
                tooltipText: 'Container',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'worked-exp-elem',
                buttonHandler: () => this.splithandlerfunction('worked-exp-elem', index, firstOne, parentUrn),
                tooltipText: 'Worked Example',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'multi-column-group',
                buttonHandler: () => this.splithandlerfunction('multi-column-group', index, firstOne, parentUrn),
                tooltipText: 'Multi Column',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'section-break-elem',
                buttonHandler: () => this.splithandlerfunction('section-break-elem', index, firstOne, parentUrn, asideData, outerAsideIndex),
                tooltipText: 'Section Break',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'metadata-anchor',
                buttonHandler: () => this.splithandlerfunction('metadata-anchor', index, firstOne, parentUrn, asideData),
                tooltipText: 'Metadata Anchor',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'opener-elem',
                buttonHandler: () => this.splithandlerfunction('opener-elem', 0, firstOne),
                tooltipText: 'Opener Element',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'citation-elem',
                buttonHandler: () => this.splithandlerfunction('citation-elem', index, firstOne, parentUrn, asideData),
                tooltipText: 'Citation Element',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'stanza-elem',
                buttonHandler: () => {
                    this.splithandlerfunction('stanza-elem', index, firstOne, parentUrn, asideData, outerAsideIndex, poetryData)
                },
                tooltipText: 'Stanza',
                tooltipDirection: 'left'
            }
        ]

    }
    showSplitSlatePopup = () => {
        if (this.state.showSplitSlatePopup) {
            const dialogText = `Are you sure you want to split this slate at the selected section? `
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={dialogText}
                    active={true}
                    togglePopup={this.toggleSplitSlatePopup}
                    isSplitSlatePopup={true}
                    confirmCallback={this.handleSplitSlate}
                    isInputDisabled={true}
                    splitSlateClass="split-slate"
                />
            )
        }
        else {
            return null
        }
    }

    toggleSplitSlatePopup = (value, index) => {
        this.setState({
            showSplitSlatePopup: value,
        })
        if (value) {
            this.setState({
                splittedSlateIndex: index + 1
            })
        }
        else {
            this.props.showBlocker(value)
            hideBlocker();
        }
    }

    handleSplitSlate = () => {
        this.toggleSplitSlatePopup(false)
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        sendDataToIframe({ 'type': SplitCurrentSlate, 'message': { type:`${ config.slateType }`} });
        this.props.setSplittedElementIndex(this.state.splittedSlateIndex)
    }


    /**
     * @description - hide opener elment and disable MA option once created in IS
     * @param {object} _elements
     */
    renderButtonsonCondition(_elements) {
        config.isCO = false;
        config.isLOL = false
        if (_elements.filter(element => element.type == "openerelement").length) {
            config.isCO = true
        }
        //set the value in slate when once metadata anchor is created on IS
        if (_elements.filter(element => element.type == "element-generateLOlist").length) {
            config.isLOL = true
        }

    }

    onPowerPaste = (powerPasteData, index) => {
        this.setState({
            powerPasteData: powerPasteData,
            updatedindex: index
        })
    }

    /**
     * Calls Powerpaste API when user clicks Proceed button
     */
    handlePowerPaste = () => {
        const { powerPasteData, updatedindex, parentUrn, asideData  } = this.state
        powerPasteData.length && this.props.createPowerPasteElements(powerPasteData, updatedindex, parentUrn, asideData);
        this.handleCopyPastePopup(false)
        this.setState({
            powerPasteData:[]
        })
    }

    /**
     * Displays power paste popup
     */
    showWordPastePopup = () => {
        if (this.state.isWordPastePopup) {
            const dialogText = `Press Ctrl/Cmd + V/v in the textbox below to paste your copied content.`
            return (
                <PopUp dialogText={dialogText}
                    active={true}
                    WordPastePopup={true}
                    onPowerPaste = {this.onPowerPaste}
                    handleCopyPastePopup={this.handleCopyPastePopup}
                    wordPasteClass="word-paste"
                    index={this.state.pastedindex}
                    handlePowerPaste = {this.handlePowerPaste}
                    isWordPastePopup = {this.state.isWordPastePopup}
                />
            )
        }
    
        return null 
    }

    /**
     * Renders blank slate with one element picker (Separator)
     * @param {object} _props Slatewrapper props
     */
    renderBlankSlate = (_props) => {
        return (
            <>
                <ElementSaprator
                    userRole={_props.userRole}
                    firstOne={true}
                    index={0}
                    esProps={this.elementSepratorProps(0, true)}
                    elementType=""
                    permissions={_props.permissions}
                    showAudioSplitPopup={_props.showAudioSplitPopup}
                    openAudio={_props.openAudio}
                    onClickCapture={this.checkSlateLockStatus}
                    splithandlerfunction={this.splithandlerfunction}
                    pasteElement={this.props.pasteElement}
                    source={TEXT_SOURCE}
                    handleCopyPastePopup={this.handleCopyPastePopup}
                />
            </>
        )
    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements, _slateType, slateLockInfo) {
        const { pageLoading, projectSubscriptionDetails } = this.props;
        try {
            if (_elements !== null && _elements !== undefined) {
                this.renderButtonsonCondition(_elements);
                /* @-isPdf_Assess-@ - TO check TYPE of current slate  */
                const isPdf_Assess = [SLATE_TYPE_ASSESSMENT, SLATE_TYPE_PDF].includes(config.slateType);
                if (_elements.length === 0 && isPdf_Assess && config.isDefaultElementInProgress && !isSubscriberRole(projectSubscriptionDetails?.projectSharingRole, projectSubscriptionDetails?.projectSubscriptionDetails?.isSubscribed)) {
                    config.isDefaultElementInProgress = false;
                    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                    const typeOfEle = _slateType === SLATE_TYPE_ASSESSMENT ? ELEMENT_ASSESSMENT : ELEMENT_PDF;
                    this.props.createElement(typeOfEle, "0", '', '', '', '', () => {
                        config.isDefaultElementInProgress = true;
                    });
                }
                else if (_elements.length === 0 && _slateType != "assessment") {
                    return this.renderBlankSlate(this.props)
                }
                /* @hideSapratorFor@ List of slates where seprator is hidden */
                const hideSapratorFor = [SLATE_TYPE_ASSESSMENT, SLATE_TYPE_PDF].includes(_slateType);
                return _elements.map((element, index) => {
                        return (
                           <React.Fragment key={element.id}>
                               <LazyLoad 
                                    once={true}
                                    placeholder={<div data-id={element.id}><LargeLoader /></div>}
                                >
                                    {
                                        index === 0 && !hideSapratorFor && config.isCO === false ?
                                            <ElementSaprator
                                                userRole={this.props.userRole}
                                                firstOne={index === 0}
                                                index={index}
                                                esProps={this.elementSepratorProps(index, true)}
                                                elementType=""
                                                permissions={this.props.permissions}
                                                showAudioSplitPopup={this.props.showAudioSplitPopup}
                                                openAudio={this.props.openAudio}
                                                onClickCapture={this.checkSlateLockStatus}
                                                splithandlerfunction={this.splithandlerfunction}
                                                pasteElement={this.props.pasteElement}
                                                source={TEXT_SOURCE}
                                                handleCopyPastePopup={this.handleCopyPastePopup}
                                                />
                                            : index === 0 && config.isCO === true ? <div className="noSeparatorContainer"></div> : null
                                    }
                                    <ElementContainer
                                        userRole={this.props.userRole}
                                        openCustomPopup = {this.openCustomPopup}
                                        slateType={_slateType}
                                        element={element}
                                        index={index}
                                        handleCommentspanel={this.props.handleCommentspanel}
                                        elementSepratorProps={this.elementSepratorProps}
                                        showBlocker={this.props.showBlocker}
                                        isBlockerActive={this.props.isBlockerActive}
                                        onListSelect={this.props.convertToListElement}
                                        onClickCapture={this.checkSlateLockStatus}
                                        isLOExist={this.props.isLOExist}
                                        splithandlerfunction={this.splithandlerfunction}
                                        pasteElement={this.props.pasteElement}
                                        projectSharingRole={this.props.projectSubscriptionDetails.projectSharingRole}
                                        projectSubscriptionDetails={this.props.projectSubscriptionDetails.projectSubscriptionDetails.isSubscribed}
                                        hideElementSeperator={this.props.hideElementSeperator}
                                        handleCopyPastePopup={this.handleCopyPastePopup}
                                        closeUndoTimer = {this.props.closeUndoTimer}
                                    >
                                        {
                                            (isHovered, isPageNumberEnabled, activeElement, permissions) => (
                                                <PageNumberElement pageLoading={pageLoading}
                                                    updatePageNumber={this.props.updatePageNumber}
                                                    element={element} _slateType={_slateType}
                                                    isHovered={isHovered}
                                                    isPageNumberEnabled={isPageNumberEnabled}
                                                    activeElement={activeElement}
                                                    permissions={permissions} />
                                            )
                                        }
                                    </ElementContainer>
                                    {!hideSapratorFor ?
                                        <ElementSaprator
                                            userRole={this.props.userRole}
                                            index={index}
                                            esProps={this.elementSepratorProps(index, false)}
                                            elementType=""
                                            slateType={_slateType}
                                            toggleSplitSlatePopup={this.toggleSplitSlatePopup}
                                            permissions={this.props.permissions}
                                            showAudioSplitPopup={this.props.showAudioSplitPopup}
                                            openAudio={this.props.openAudio}
                                            onClickCapture={this.checkSlateLockStatus}
                                            splithandlerfunction={this.splithandlerfunction}
                                            pasteElement={this.props.pasteElement}
                                            handleCopyPastePopup={this.handleCopyPastePopup}
                                            source={TEXT_SOURCE}
                                            dataId = {element.id}
                                        />
                                        : null
                                    }
                                </LazyLoad>
                            </React.Fragment>
                           
                          
                        )
                })
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
            //console.error(error);
        }
    }

    /**
    * @description - processRemoveConfirmation function responsible for opening confirmation popup for removing the narrative audio.
    */

    processRemoveConfirmation = () => {
        hideBlocker()
        hideTocBlocker()
        if (this.props.openRemovePopUp) {
            this.props.showAudioRemovePopup(false)
            this.props.deleteAudioNarrationForContainer(this.props.isGlossary);
        }
        else if (this.props.openSplitPopUp) {
            this.props.showAudioSplitPopup(false)
            this.toggleSplitSlatePopup(true, this.props.indexSplit)
        }
        this.props.showBlocker(false)
    }
    /**
    * @description - toggleAudioPopup function responsible for show/hide remove popup.
    */
    toggleAudioPopup = () => {
        this.props.showBlocker(false)
        hideTocBlocker()
        hideBlocker()
        if (this.props.openRemovePopUp) {
            this.props.showAudioRemovePopup(false)
        }
        else if (this.props.openSplitPopUp) {
            this.props.showAudioSplitPopup(false)
        }
    }

    /**
   * @description - toggleWrongAudioPopup function responsible for wrong Audio selection popup.
   */
    toggleWrongAudioPopup = () => {
        this.props.showBlocker(false)
        hideTocBlocker()
        hideBlocker()
        if(this.props.accesDeniedPopup){
            this.props.accessDenied(false)
        }
        else{
        this.props.showWrongAudioPopup(false)
        }
    }
    /**
    * @description - toggleAssessmentPopup function responsible for showing popup for latest version.
    */
    toggleAssessmentPopup = () => {
        this.props.showBlocker(false)
        hideTocBlocker()
        hideBlocker()
        if(this.props.showConfirmationPopup){
            reloadSlate();
            this.props.assessmentConfirmationPopup(false)
        }
    }
    /**
    * @description - processRemoveConfirmation function responsible for opening confirmation popup for removing the narrative audio.
    */

    showAudioRemoveConfirmationPopup = () => {
        
        let dialogText;
        let audioRemoveClass;
        if (this.props.openRemovePopUp) {
            dialogText = REMOVE_LINKED_AUDIO
            audioRemoveClass = 'audioRemoveClass'
        } else if (this.props.openSplitPopUp) {
            dialogText = SPLIT_SLATE_WITH_ADDED_AUDIO
            audioRemoveClass = 'audioWrongPop'
        } else if (this.props.openWrongAudioPopup) {
            dialogText = NOT_AUDIO_ASSET
            audioRemoveClass = 'audioRemoveClass'
        }
        if (this.props.openRemovePopUp || this.props.openSplitPopUp) {
            this.props.showBlocker(true)
            showTocBlocker()
            const disableDeleteWarnings = getCookieByName("DISABLE_DELETE_WARNINGS");
            if (disableDeleteWarnings && this.props.openRemovePopUp) {
                this.processRemoveConfirmation();
                return null;
            } else {
                return (
                    <PopUp
                        openRemovePopUp={this.props.openRemovePopUp}
                        dialogText={dialogText}
                        active={true}
                        removeConfirmation={true}
                        audioRemoveClass={audioRemoveClass}
                        saveButtonText='OK'
                        saveContent={this.processRemoveConfirmation}
                        togglePopup={this.toggleAudioPopup}
                        isGlossary ={this.props.isGlossary}
                    />
                )
            }
        }
        else if (this.props.openWrongAudioPopup) {
            this.props.showBlocker(true)
            showTocBlocker()
            return (
                <PopUp
                    dialogText={dialogText}
                    active={true}
                    wrongAudio={true}
                    audioRemoveClass={audioRemoveClass}
                    saveButtonText='OK'
                    togglePopup={this.toggleWrongAudioPopup}
                />
            )
        }
        else {
            return null
        }
    }

    /**
    * @description - showImageGlossaryRemoveConfirmationPopup function responsible for opening confirmation popup for remove glosssary image .
    */
    showImageGlossaryRemoveConfirmationPopup = () => {
        let dialogText;
        let imageRemoveClass;
        if(this.props.removeGlossaryImage){
           dialogText = REMOVE_LINKED_IMAGE_GLOSSARY
           imageRemoveClass = 'remove-glossary-image'
        } else if (this.props.openWrongImagePopup){
           dialogText = NOT_IMAGE_ASSET
           imageRemoveClass = 'remove-glossary-image'
        }

        if(this.props.removeGlossaryImage){
            this.props.showBlocker(true)
            showTocBlocker()
            return (
                <PopUp
                    dialogText={dialogText}
                    active={true}
                    imageGlossary={true}
                    imageRemoveClass={imageRemoveClass}
                    saveButtonText='OK'
                    removeImageContent={this.processRemoveImageGlossaryConfirmation}
                    togglePopup={this.toggleImageGlossaryPopup}
                />
            )
        }else if (this.props.openWrongImagePopup) {
            this.props.showBlocker(true)
            showTocBlocker()
            return (
                <PopUp
                    dialogText={dialogText}
                    active={true}
                    wrongImage={true}
                    imageRemoveClass={imageRemoveClass}
                    saveButtonText='OK'
                    togglePopup={this.toggleWrongImagePopup}
                />
            )
        }
        else {
            return null
        }
    }

   /**
   * @description - toggleImageGlossaryPopup function responsible for toggle Image glossary popup.
   */
    toggleImageGlossaryPopup = () => {
        this.props.showBlocker(false)
        hideTocBlocker()
        hideBlocker()
        if(this.props.removeGlossaryImage){
            this.props.showRemoveImageGlossaryPopup(false);
        }
    }

    /**
   * @description - toggleWrongImagePopup function responsible for wrong Image selection popup.
   */
    toggleWrongImagePopup = () => {
        this.props.showBlocker(false)
        hideTocBlocker()
        hideBlocker()
        if(this.props.accesDeniedPopup){
            this.props.accessDenied(false)
        }
        else{
        this.props.showWrongImagePopup(false)
        }
    }

    /**
   * @description - processRemoveImageGlossaryConfirmation function responsible for removing Image Glossary.
   */
    processRemoveImageGlossaryConfirmation = () => {
        hideBlocker()
        hideTocBlocker()
        if(this.props.removeGlossaryImage){
          this.props.showRemoveImageGlossaryPopup(false);
          store.dispatch(this.handleFigureGlossaryActions(false,{}))
        }
        this.props.showBlocker(false)
    }

     handleFigureGlossaryActions = (imagepopup,figuredata) => dispatch => {
        dispatch({ type: ADD_FIGURE_GLOSSARY_POPUP, payload: imagepopup })
        dispatch({ type: SET_FIGURE_GLOSSARY, payload: figuredata })
    }

    /**
    * @description - showAssessmentConfirmationPopup function responsible for opening confirmation popup for updating embeded assessments .
    */
    showAssessmentConfirmationPopup = () => {
        if (this.props.showConfirmationPopup) {
            this.props.showBlocker(true)
            showTocBlocker();
            const dialogText = ` All other Assessment Items in this project will now be updated to the new version of this Assessment`
            return (
                <PopUp dialogText={dialogText}
                    active={true}
                    saveButtonText='OK'
                    showConfirmation={true}
                    assessmentClass="lock-message"
                    togglePopup={this.toggleAssessmentPopup}
                    hideCanvasBlocker={this.props.showBlocker}
                />
            )
        }
        else {
            return null
        }
    }
    showLockReleasePopup = () => {
        if (this.state.showReleasePopup) {
            this.props.showBlocker(true)
            showTocBlocker();
            const dialogText = `Due to inactivity, this slate has been unlocked, and all your work has been saved`
            return (
                <PopUp dialogText={dialogText}
                    active={true}
                    togglePopup={this.toggleLockReleasePopup}
                    isLockReleasePopup={true}
                    isInputDisabled={true}
                />
            )
        }
        else {
            return null
        }
    }

    accessDeniedPopup = () => {
        if (this.props.accesDeniedPopup ) {
            this.props.showBlocker(true)
            showTocBlocker()
            return (
                <PopUp
                    dialogText={ACCESS_DENIED_CONTACT_ADMIN}
                    active={true}
                    wrongAudio={true}
                    audioRemoveClass={audioRemoveClass}
                    saveButtonText='OK'
                    togglePopup={this.toggleWrongAudioPopup}
                />
            )
        }
    }

    saveAndClose = () =>{
        if(this.props && config.tempSlateManifestURN && this.props.slateData[config.tempSlateManifestURN] && this.props.slateData[config.tempSlateManifestURN].status === "approved"){
            if (config.savingInProgress || config.isSavingElement) {
                setTimeout(this.closePopup, 8000)
            }else{
                setTimeout(this.closePopup, 0)
            }
        }else{
            setTimeout(this.closePopup, 800)
        }
    }

    closePopup = () =>{
        let popupId = config.slateManifestURN
        if(this.props.slateData[config.tempSlateManifestURN].status === "approved" && this.props.slateData[config.slateManifestURN].status === "wip"){
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        // When normal slate is Wip but popupslate is approved. BG-2742
        if((this.props.slateData[config.slateManifestURN].id !== config.cachedActiveElement.element.id) && config.cachedActiveElement.element.status === "approved"){
            this.props.slateData[config.slateManifestURN].index = config.cachedActiveElement.index;
            this.props.fetchSlateData(this.props.slateData[config.slateManifestURN].id, this.props.slateData[config.slateManifestURN].contentUrn,0 , this.props.slateData[config.slateManifestURN],"",true); 
        }
        config.slateManifestURN = config.tempSlateManifestURN
        config.slateEntityURN = config.tempSlateEntityURN
        config.tempSlateManifestURN = null
        config.tempSlateEntityURN = null
        config.isPopupSlate = false
        config.tcmslatemanifest= null
        this.props.openPopupSlate(undefined, popupId)
        this.props.setActiveElement(config.cachedActiveElement.element, config.cachedActiveElement.index)
        this.props.savePopupParentSlateData({});
        if(config.tcmStatus){
            this.props.handleTCMData(config.slateManifestURN)
        }
        // Scrolling to the previous element after SAVE  & CLOSE is clicked
        setTimeout(() => {
            let elementDom = document.querySelector(`[data-id="${config.cachedActiveElement.element.id}"]`)
            if(elementDom){
                elementDom.querySelector(`#cypress-${config.cachedActiveElement.index}-0`).click()
            }
        },0);
    }
    wirisAltTextPopup = () => {
        if(this.props.wirisAltText && this.props.wirisAltText.showPopup){
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={this.props.wirisAltText.altText}
                    active={true}
                    altHeaderText={`Alt Text`}
                    togglePopup={this.closeWirisAltTextPopup}
                    altText={true}
                    isInputDisabled={true}
                    splitSlateClass="split-slate"
                    wirisAltTextClass="wiris-alt-text-popup"
                />
            )
        }
        else {
            return null
        }
    }
    closeWirisAltTextPopup = () => {
        this.props.wirisAltTextPopup({showPopup : false, altText : ''})
        this.props.showBlocker(false)
        hideBlocker()
    }

    /**
     * This method renders LO Warning Popup based on Selection 
     */
    showLOWarningPopup = () => {
        const currentSlateLF = this.props.currentSlateLF;
        const loWarningDialogTxt = (currentSlateLF === CYPRESS_LF) ? cypressLOWarningtxt : externalLOWarningtxt;
        if (this.props?.loWarningPopupData?.toggleValue) {
            this.props.showBlocker(true);
            showTocBlocker();
            return (
                <PopUp dialogText={loWarningDialogTxt}
                    active={true}
                    warningHeaderText={`Warning`}
                    togglePopup={this.toggleWarningPopup}
                    isInputDisabled={true}
                    lOPopupClass="lo-warning-txt"
                    LOPopup={true}
                    yesButtonHandler={this.unlinkSlateLOs}
                />
            )
        } else {
            return null
        }
    }

    /**
     * LO Warning Popup
     * This method is called on click of Cancel Button 
     */
    toggleWarningPopup = (toggleValue, event) => {
        this.props.toggleLOWarningPopup(toggleValue, "");
        this.props.showBlocker(false);
        hideBlocker();
        this.prohibitPropagation(event)
    }

    /**
     * LO Warning Popup
     * This method is called on click of Yes Button 
     * It unlinks the current slate LOs and then launches new popup
     */
    unlinkSlateLOs = (e) => {
        const slateManifestURN = config.tempSlateManifestURN ? config.tempSlateManifestURN : config.slateManifestURN;
        const { currentSlateLOData } = this.props;
        const apiKeys_LO = {
            'loApiUrl': config.LEARNING_OBJECTIVES_ENDPOINT,
            'strApiKey': config.STRUCTURE_APIKEY,
            'mathmlImagePath': config.S3MathImagePath ?? defaultMathImagePath,
            'productApiUrl': config.PRODUCTAPI_ENDPOINT,
            'manifestApiUrl': config.ASSET_POPOVER_ENDPOINT,
            'assessmentApiUrl': config.ASSESSMENT_ENDPOINT
        };
        let externalLFUrn = '';
        if (this?.props?.projectLearningFrameworks?.externalLF?.length) {
            externalLFUrn = this.props.projectLearningFrameworks.externalLF[0].urn;
        }
        const warningActionIntiator = this.props?.loWarningPopupData?.warningActionIntiator ?? "";
        const editActionStatus = warningActionIntiator == AddEditLearningObjectiveDropdown ? true : "";
        sendDataToIframe({
            'type': OpenLOPopup, 'message': {
                'text': WarningPopupAction,
                'data': currentSlateLOData,
                'currentSlateId': slateManifestURN,
                'chapterContainerUrn': '',
                'isLOExist': true,
                'editAction': editActionStatus,
                'apiConstants': apiKeys_LO,
                'warningActionIntiator': warningActionIntiator,
                'externalLFUrn': externalLFUrn,
                'currentSlateLF': this.props.currentSlateLF
            }
        });
        this.props.toggleLOWarningPopup(false, "");
    }

       /**
     * This method renders Alfresco Product Link Popup based on Selection 
     */
        showAlfrescoPopup = () => {
            if (this.props.launchAlfrescoPopup) {
                this.props.showBlocker(true)
                showTocBlocker();
                return (
                    <AlfrescoPopup 
                    alfrescoPath = {this.props.alfrescoPath}
                    alfrescoListOption= {this.props.alfrescoListOption}
                    handleCloseAlfrescoPicker={this.handleCloseAlfrescoPicker}
                    />
                )
            }
            else {
                return null
            }
        }

        handleCloseAlfrescoPicker = () => {
            this.props.showBlocker(false)
            hideTocBlocker()
            disableHeader(false)
            let payloadObj = { launchAlfrescoPopup: false, alfrescoPath: {} }
            this.props.alfrescoPopup(payloadObj)
        };

    /**
     * render | renders title and slate wrapper
     */
    render() {
        if (this.state.hasError) {
            return (
                <div className='slate-content'>
                    <h3>Error occurred while loading elements</h3>
                    <React.Fragment>
                        <LargeLoader />
                        <LargeLoader />
                    </React.Fragment>
                </div>
            )
        }
        const slateType = getSlateType(this.props.slateData[config.slateManifestURN])
        return (
            <React.Fragment>
                <div className='title-head-wrapper'>
                     {
                        this.props.slateData[config.slateManifestURN] && this.props.slateData[config.slateManifestURN].type === 'popup' ?
                          <button className="popup-button" onClick={this.saveAndClose}>SAVE & CLOSE</button>
                          :this.renderSlateHeader(this.props)
                    } 
                </div>
                <div id="slateWrapper" className={`slate-wrapper ${slateType === "popup" ? "popup-slate": ""}`} onScroll={this.handleScroll}>
                <KeyboardUpDown>
                    {
                        this.renderSlate(this.props)
                    }
                </KeyboardUpDown>
                </div>
                <div id="link-notification"></div>
                {this.props.showToast  && <Toast active={true}/>}
                <ListButtonDropPortal slateData={this.props.slateData}>
                    {
                        (selectedType, startValue, inputRef) => (
                            <ListButtonDrop
                                selectedOption={selectedType}
                                startValue={startValue}
                                setListDropRef={this.setListDropRef}
                                onListSelect={this.props.convertToListElement}
                                inputRef={inputRef}
                                activeElement={this?.props?.activeElement}
                                slateData={this?.props?.slateData}
                                asideData={this?.props?.asideData}
                            />
                        )
                    }
                </ListButtonDropPortal>
                {this.showLockPopup()}
                {this.showCustomPopup()}
                {this.showSplitSlatePopup()}
                {/* ***************Audio Narration remove Popup **************** */}
                {this.showAudioRemoveConfirmationPopup()}
                {this.showImageGlossaryRemoveConfirmationPopup()}
                {this.showLockReleasePopup()}
                {this.showAssessmentConfirmationPopup()}
                {this.wirisAltTextPopup()}
                {/* **************** Word Paste Popup ************ */}
                {this.showWordPastePopup()}
                {this.showLOWarningPopup()}{/* **************** LO Warning Popup ************ */}
               {/* **************** Alfresco Popup ************ */}
               {this.showAlfrescoPopup()}
            </React.Fragment>
        );
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log("ERROR::", error)
        return { hasError: true };
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.handleScroll)
    }
}
SlateWrapper.displayName = "SlateWrapper"

SlateWrapper.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        pageLoading: state.appStore.pageLoading,
        slateTitleUpdated: state.appStore.slateTitleUpdated,
        permissions: state.appStore.permissions,
        currentSlateLOData: state.metadataReducer.currentSlateLOData,
        openRemovePopUp: state.audioReducer.openRemovePopUp,
        isGlossary: state.audioReducer.isGlossary,
        openSplitPopUp: state.audioReducer.openSplitPopUp,
        openWrongAudioPopup: state.audioReducer.openWrongAudioPopup,
        withinLockPeriod: state.slateLockReducer.withinLockPeriod,
        openAudio: state.audioReducer.openAudio,
        indexSplit : state.audioReducer.indexSplit,
        accesDeniedPopup : state.appStore.accesDeniedPopup,
        showSlateLockPopupValue: state.metadataReducer.showSlateLockPopup,
        searchParent: state.searchReducer.parentId,
        searchNode: state.searchReducer.searchTerm,
        searchScroll: state.searchReducer.scroll,
        commentSearchParent: state.commentSearchReducer.parentId,
        commentSearchNode: state.commentSearchReducer.commentSearchTerm,
        commentSearchScroll: state.commentSearchReducer.scroll,
        commentSearchScrollTop: state.commentSearchReducer.scrollTop,
        showToast: state.appStore.showToast,
        showConfirmationPopup: state.assessmentReducer.showConfirmationPopup,
        userRole: state.appStore.roleId,
        wirisAltText: state.appStore.wirisAltText,
        currentSlateLF: state.metadataReducer.currentSlateLF,
        loWarningPopupData: state.metadataReducer.loWarningPopupData,
        projectLearningFrameworks: state.metadataReducer.projectLearningFrameworks,
        openWrongImagePopup:state.appStore.openWrongImagePopup,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        alfrescoPath : state.alfrescoReducer.alfrescoPath,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        removeGlossaryImage:state.appStore.removeGlossaryImage,
        projectSubscriptionDetails:state?.projectInfo,
        activeElement: state.appStore.activeElement,
        asideData: state.appStore.asideData
    };
};


export default connect(
    mapStateToProps,
    {
        createElement,
        swapElement,
        setSplittedElementIndex,
        updatePageNumber,
        fetchAudioNarrationForContainer,
        deleteAudioNarrationForContainer,
        showAudioRemovePopup,
        showAudioSplitPopup,
        setLockPeriodFlag,
        setSlateLock,
        releaseSlateLock,
        setActiveElement,
        showWrongAudioPopup,
        getSlateLockStatus,
        accessDenied,
        openPopupSlate,
        showSlateLockPopup,
        handleTCMData,
        fetchSlateData,
        assessmentConfirmationPopup,
        getCommentElements,
        pasteElement,
        wirisAltTextPopup,
        audioGlossaryPopup,
        createPowerPasteElements,
        getMetadataAnchorLORef,
        toggleLOWarningPopup,
        showWrongImagePopup,
        alfrescoPopup,
        showRemoveImageGlossaryPopup,
        isOwnersSubscribedSlate,
        savePopupParentSlateData
    }
)(SlateWrapper);
