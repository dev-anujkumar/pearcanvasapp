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
import { createElement, swapElement, setSplittedElementIndex, updatePageNumber, accessDenied } from './SlateWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader, SplitCurrentSlate } from '../../constants/IFrameMessageTypes.js';
import ListButtonDropPortal from '../ListButtonDrop/ListButtonDropPortal.jsx';
import ListButtonDrop from '../ListButtonDrop/ListButtonDrop.jsx';
import config from '../../config/config';
import { TEXT, IMAGE, VIDEO, ASSESSMENT, INTERACTIVE, CONTAINER, WORKED_EXAMPLE, SECTION_BREAK, METADATA_ANCHOR, LO_LIST, ELEMENT_ASSESSMENT, OPENER,
    ALREADY_USED_SLATE , REMOVE_LINKED_AUDIO, NOT_AUDIO_ASSET, SPLIT_SLATE_WITH_ADDED_AUDIO , ACCESS_DENIED_CONTACT_ADMIN, IN_USE_BY, LOCK_DURATION, SHOW_HIDE,POP_UP ,
    CITATION, ELEMENT_CITATION,SMARTLINK,POETRY ,STANZA} from './SlateWrapperConstants';
import PageNumberElement from './PageNumberElement.jsx';
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';
import PopUp from '../PopUp';
import { hideBlocker, showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import { guid } from '../../constants/utility.js';
import { fetchAudioNarrationForContainer, deleteAudioNarrationForContainer, showAudioRemovePopup, showAudioSplitPopup , showWrongAudioPopup } from '../AudioNarration/AudioNarration_Actions'
import { setSlateLock, releaseSlateLock, setLockPeriodFlag, getSlateLockStatus } from '../CanvasWrapper/SlateLock_Actions'
import { setActiveElement,openPopupSlate } from '../CanvasWrapper/CanvasWrapper_Actions';
// import { OPEN_AM } from '../../js/auth_module';
import { showSlateLockPopup } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';

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
            showReleasePopup: false
        }
        this.isDefaultElementInProgress = false;
    }

    componentDidMount() {
        if (document.getElementById("cypress-0")) {
            document.getElementById("cypress-0").focus();
        }

        // binds handleClickOutside to document mousedown //
        document.addEventListener("mousedown", this.handleClickOutside);
        window.addEventListener('scroll',this.handleScroll)
    }

    handleScroll = (e) =>{
        if(config.totalPageCount <= config.page) return false;
        // const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;        
        let scrollPosition = Number(e.target.scrollTop+e.target.clientHeight+100);
        let scrollingPosition = Number(e.target.scrollTop);
        if(this.props.slateData[config.slateManifestURN] && (this.props.slateData[config.slateManifestURN].type === 'manifest')){
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

    componentDidUpdate() {
        this.renderDefaultElement();
    }


    renderDefaultElement = () => {
        if(this.isDefaultElementInProgress){
            // condition added to detect if element creationis already in progress and to avoid multiple default element creation
            return false;
        }
        let _slateData = this.props.slateData;
        if (_slateData !== null && _slateData !== undefined) {
            if(_slateData[config.slateManifestURN] && config.slateType !== 'assessment'){
                let _slateObject =_slateData[config.slateManifestURN];
                let _slateContent = _slateObject.contents
                let { bodymatter: _slateBodyMatter } = _slateContent /* || _slateData.popupdata; */
                if (_slateBodyMatter.length == 0) {
                    this.isDefaultElementInProgress = true;
                    /* For showing the spinning loader send HideLoader message to Wrapper component */
                    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                    this.props.createElement(TEXT, "0", '', '', '','',()=>{
                        this.isDefaultElementInProgress = false;
                    });
                }
            } else if (Object.values(_slateData).length > 0 && Object.values(_slateData)[0].contents.bodymatter < 1 && config.slateType === 'assessment') {
                this.isDefaultElementInProgress = true;
                sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                this.props.createElement(ELEMENT_ASSESSMENT, "0", '', '', '','',()=>{
                    this.isDefaultElementInProgress = false;
                });
            }            
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        /** Default Red Dot indicator to false */
        sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'false' });

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
        const { slateLockInfo: { isLocked, userId, userFirstName, userLastName } } = props
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
        // const _slateBodyMatter = slateData[Object.keys(slateData)[0]].contents.bodymatter
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
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if(_slateData[config.slateManifestURN]){
                // if (Object.values(_slateData).length > 0) {
                    // let _slateObject = Object.values(_slateData)[0];
                    let _slateObject = _slateData[config.slateManifestURN];
                    let { contents: _slateContent } = _slateObject;
                    let title = {
                        text: this.props.slateTitleUpdated
                    }
                    let _slateTitle = title.text ? title : _slateContent.title
                    return (
                        <SlateHeader onNavigate={this.props.navigate} slateType={config.slateType} slateTitle={_slateTitle} slateLockInfo={this.props.slateLockInfo} />
                    )
                }
                else {
                    return (
                        <SmalllLoader />
                    )
                }
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
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
                    let _slateContent = _slateObject.contents
                    let { id: _slateId, type: _slateType } = _slateObject;
                    let { bodymatter: _slateBodyMatter } = _slateContent
                    this['cloneCOSlateControlledSource_' + random] = this.renderElement(_slateBodyMatter, config.slateType, this.props.slateLockInfo)
                    let _context = this;
                    return (
                        <div className={`slate-content ${config.slateType === 'assessment' ? 'assessment-slate' : ''}`} data-id={_slateId} slate-type={_slateType}>
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
                                        draggable: ".editor",
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
                            <SlateFooter elements={_slateBodyMatter} />
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
            else {
                // handle error
            }
        } catch (error) {
            // handle error
        }
    }

    /**
     * Calls release lock API
     */
    releaseSlateLock = (projectUrn, slateId) => {
        this.setState({
            showReleasePopup: true
        })
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
            /* context.setState({
                showReleasePopup: true
            }) */
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
        const { slateLockInfo } = this.props
        let lockedUserId = slateLockInfo.userId.replace(/.*\(|\)/gi, ''); // Retrieve only PROOT id
        if (slateLockInfo.isLocked && config.userId !== lockedUserId) {
            this.setState({
                lockOwner: slateLockInfo.userId,
                lockOwnerName: `${slateLockInfo.userFirstName} ${slateLockInfo.userLastName}`
            })
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
                window.tinymce.activeEditor.selection.placeCaretAt(0, 0);
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

    /**
     * Toggles popup
     */
    togglePopup = (toggleValue, event) => {
        this.setState({
            showLockPopup: toggleValue
        })
        this.props.showBlocker(toggleValue);
        this.props.showSlateLockPopup(false);
        hideBlocker()
        this.prohibitPropagation(event)
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
        if ((firstOne || type === "opener-elem") && (!config.isCO)) {
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
                    outerIndex = outerAsideIndex.split("-")[1]
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
                    let LOUrn = this.props.currentSlateLOData.id ? this.props.currentSlateLOData.id : this.props.currentSlateLOData.loUrn;
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
                this.props.createElement(POETRY, indexToinsert, parentUrn,null,null,null,null,poetryData);
                break;
            case 'stanza-elem':
                this.props.createElement(STANZA, indexToinsert, parentUrn,null,null,null,null,poetryData);
                break;
            case 'text-elem':
            default:
                this.props.createElement(TEXT, indexToinsert, parentUrn, asideData, null, null, null);
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
                buttonType: 'poetry-elem',
                buttonHandler: () => this.splithandlerfunction('poetry-elem',index, firstOne, parentUrn,"",outerAsideIndex,poetryData),
                tooltipText: 'Poetry',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'interactive-elem-button',
                buttonHandler: () => this.splithandlerfunction('interactive-elem-button'),
                tooltipText: 'Interactive',
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
                buttonHandler: () => this.splithandlerfunction('stanza-elem', index, firstOne, parentUrn, "", outerAsideIndex, poetryData),
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
        sendDataToIframe({ 'type': SplitCurrentSlate, 'message': {} });
        this.props.setSplittedElementIndex(this.state.splittedSlateIndex)
    }

    deleteAccepted = () => {
        if(this.props.tocDeleteMessage.messageType !== 'singleContainerDelete'){
            sendDataToIframe({ 'type': 'deleteAccepted', 'message': this.props.tocDeleteMessage })
        }
        this.deleteRejected()
    }

    deleteRejected = () => {
        hideBlocker();
        hideTocBlocker();
        disableHeader(true);
        this.props.modifyState(false)
        sendDataToIframe({ 'type': 'deleteRejected', 'message': {} });
    }

    showTocDeletePopup = () => {
        /**
         * Need to refactor these all condition and minimize them
         */
        if (this.props.toggleTocDelete) {
            if(this.props.tocDeleteMessage&& this.props.tocDeleteMessage.messageType === 'singleContainerDelete'){
                return (
                    <PopUp
                        togglePopup={this.deleteRejected}
                        active={true}
                        saveContent={this.deleteAccepted}
                        saveButtonText='Okay'
                        dialogText='A project must have at least one Part/Chapter. Please add another Part/Chapter before deleting this one'
                        tocDelete={true}
                        tocDeleteClass='tocDeleteClass'
                    />                   
                   
                )
            }
            else if(this.props.tocDeleteMessage && this.props.tocDeleteMessage.messageType === 'withPendingTrack'){
                return (
                    <PopUp
                        togglePopup={this.deleteRejected}
                        active={true}
                        saveContent={this.deleteAccepted}
                        saveButtonText='Yes'
                        dialogText=' Are you sure you want to delete this slate/container with pending changes?'
                        note='Note:There will be no undo available after deletion'
                        tocDelete={true}
                        tocDeleteClass='tocDeleteClass'
                    />
    
                )
            }
            else{
                return (
                    <PopUp
                        togglePopup={this.deleteRejected}
                        active={true}
                        saveContent={this.deleteAccepted}
                        saveButtonText='Yes'
                        dialogText='Are you sure you want to delete, this action cannot be undone?'
                        tocDelete={true}
                        tocDeleteClass='tocDeleteClass'
                    />
    
                )
            }
        }
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


    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements, _slateType, slateLockInfo) {
        const { pageLoading } = this.props;
        try {
            if (_elements !== null && _elements !== undefined) {
                this.renderButtonsonCondition(_elements);
                return _elements.map((element, index) => {
                        return (
                           <React.Fragment key={element.id}>
                                {
                                    index === 0 && _slateType !== 'assessment' && config.isCO === false ?
                                        <ElementSaprator
                                            firstOne={index === 0}
                                            index={index}
                                            esProps={this.elementSepratorProps(index, true)}
                                            elementType=""
                                            permissions={this.props.permissions}
                                            showAudioSplitPopup={this.props.showAudioSplitPopup}
                                            openAudio={this.props.openAudio}
                                            onClickCapture={this.checkSlateLockStatus}
                                            splithandlerfunction={this.splithandlerfunction}
                                        />
                                        : index === 0 && config.isCO === true ? <div className="noSeparatorContainer"></div> : null
                                }
                                <ElementContainer
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
                                {_slateType !== 'assessment' ?
                                    <ElementSaprator
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
                                    />
                                    : null
                                }
                              
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
            this.props.deleteAudioNarrationForContainer();
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
            return (
                <PopUp
                    dialogText={dialogText}
                    active={true}
                    removeConfirmation={true}
                    audioRemoveClass={audioRemoveClass}
                    saveButtonText='OK'
                    saveContent={this.processRemoveConfirmation}
                    togglePopup={this.toggleAudioPopup}
                />
            )
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
    closePopup = () =>{
        let popupId = config.slateManifestURN
        let newVersionManifestId = document.getElementsByClassName('slate-content ')[0];
        if( newVersionManifestId && newVersionManifestId.getAttribute('data-id')!==popupId){
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
            sendDataToIframe({ 'type': 'sendMessageForVersioning', 'message': 'updateSlate' });
        }
        config.slateManifestURN = config.tempSlateManifestURN
        config.slateEntityURN = config.tempSlateEntityURN
        config.tempSlateManifestURN = null
        config.tempSlateEntityURN = null
        config.isPopupSlate = false
        this.props.openPopupSlate(undefined, popupId)
        this.props.setActiveElement(config.cachedActiveElement.element, config.cachedActiveElement.index)
        
        // Scrolling to the previous element after SAVE  & CLOSE is clicked
        setTimeout(() => {
            let elementDom = document.querySelector(`[data-id="${config.cachedActiveElement.element.id}"]`)
            if(elementDom){
                elementDom.querySelector(`#cypress-${config.cachedActiveElement.index}-0`).click()
            }
        },0);
    }

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
        return (
            <React.Fragment>
                <div className='title-head-wrapper'>
                     {
                        this.props.slateData[config.slateManifestURN] && this.props.slateData[config.slateManifestURN].type === 'popup' ?
                          <button className="popup-button" onClick={this.closePopup}>SAVE & CLOSE</button>
                          :this.renderSlateHeader(this.props)
                    } 
                </div>
                <div id="slateWrapper" className='slate-wrapper' onScroll={this.handleScroll}>
                    {
                        this.renderSlate(this.props)
                    }
                </div>
                <ListButtonDropPortal slateData={this.props.slateData}>
                    {
                        (selectedType, startValue, inputRef) => (
                            <ListButtonDrop
                                selectedOption={selectedType}
                                startValue={startValue}
                                setListDropRef={this.setListDropRef}
                                onListSelect={this.props.convertToListElement}
                                inputRef={inputRef}
                            />
                        )
                    }
                </ListButtonDropPortal>
                {this.showLockPopup()}
                {this.showCustomPopup()}
                {this.showSplitSlatePopup()}
                {this.showTocDeletePopup()}
                {/* ***************Audio Narration remove Popup **************** */}
                {this.showAudioRemoveConfirmationPopup()}
                {this.showLockReleasePopup()}
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
        openSplitPopUp: state.audioReducer.openSplitPopUp,
        openWrongAudioPopup: state.audioReducer.openWrongAudioPopup,
        withinLockPeriod: state.slateLockReducer.withinLockPeriod,
        openAudio: state.audioReducer.openAudio,
        indexSplit : state.audioReducer.indexSplit,
        accesDeniedPopup : state.appStore.accesDeniedPopup,
        showSlateLockPopupValue: state.metadataReducer.showSlateLockPopup
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

    }
)(SlateWrapper);
