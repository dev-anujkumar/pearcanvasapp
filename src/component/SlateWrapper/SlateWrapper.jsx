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
import {
    createElement , swapElement,
    setSplittedElementIndex, createElementMeta,
    createElementMetaList
} from './SlateWrapper_Actions';
import ListComponent from '../ListElement'; // In Testing Phase
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader, SPLIT_CURRENT_SLATE } from '../../constants/IFrameMessageTypes.js';
import ListButtonDropPortal from '../ListButtonDrop/ListButtonDropPortal.jsx';
import ListButtonDrop from '../ListButtonDrop/ListButtonDrop.jsx';
import config from '../../config/config';
import {TEXT, IMAGE, VIDEO, ASSESSMENT, INTERACTIVE, CONTAINER,WORKED_EXAMPLE,SECTION_BREAK,METADATA_ANCHOR,LO_LIST,ASSESSMENT_SLATE}from './SlateWrapperConstants';
import PageNumberElement from './PageNumberElement.jsx';
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';
import PopUp from '../PopUp';
import { hideBlocker, showTocBlocker, hideTocBlocker , disableHeader } from '../../js/toggleLoader';
import { guid } from '../../constants/utility.js';

let random = guid();
class SlateWrapper extends Component {
    constructor(props) {
        super(props);

        this.setListDropRef = this.setListDropRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.customListDropClickAction = this.customListDropClickAction.bind(this);
        this.state = {
            previousSlateId : null,
            showLockPopup: false,
            lockOwner: "",
            showSplitSlatePopup: false,
            splittedSlateIndex : 0,
            hasError : false
        }
    }

    componentDidMount() {
        if (document.getElementById("cypress-0")) {
            document.getElementById("cypress-0").focus();
        }

        // binds handleClickOutside to document mousedown //
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    /**
     * setListDropRef | sets list drop ref to listDropRef
     * @param {*} node | node reference to ListButtonDrop component
     */
    setListDropRef(node) {
        this.listDropRef = node;
    }

    /**
     * handleClickOutside | currently handles when clicked outside of list drop
     * @param {*} event | current triggerd event with target
     */
    handleClickOutside(event) {
        // *********************************************************************
        // handle when clicked outside of listdrop 
        if (this.listDropRef && !this.listDropRef.contains(event.target)) {
            if (event.target.classList.contains('fa-list-ol') ||
                (event.target.type === "button" && event.target.getAttribute('aria-label') === "Insert Ordered List"))
                return;
            let _listWrapperDiv = document.querySelector('#listDropWrapper');
            if (_listWrapperDiv)
                _listWrapperDiv.querySelector('.fr-popup').classList.remove('fr-active');
        }
        // *********************************************************************
    }

    /**
     * customListDropClickAction | handle when user clicks one of the ordered list option 
     * @param {string} type | chosen orderd list type
     * @param {number} value | entered numeric value
     */
    customListDropClickAction(type, value) {
        console.log(type, value);
    }

    componentDidUpdate() {
        this.renderDefaultElement();
    }

    renderDefaultElement = () =>{
        let _slateData = this.props.slateData;
        if (_slateData !== null && _slateData !== undefined) {
            if (Object.values(_slateData).length > 0 && config.slateType !== 'assessment') {
                let _slateObject = Object.values(_slateData)[0];
                let { contents: _slateContent } = _slateObject;
                let { bodymatter: _slateBodyMatter } = _slateContent;
                if (_slateBodyMatter.length == 0 ) {
                    /* For showing the spinning loader send HideLoader message to Wrapper component */
                    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                    this.props.createElement(TEXT, "0");
                }
            }else if(Object.values(_slateData).length> 0 && Object.values(_slateData)[0].contents.bodymatter<1 && config.slateType === 'assessment' ){
                 sendDataToIframe({'type': ShowLoader,'message': { status: true }});
                 this.props.createElement(ASSESSMENT_SLATE, "0");
             }
        }
    }

    static getDerivedStateFromProps = (props, state) => {
        /**
         * First chunk of block manages previous rendered slateId and changes only when new slate renders in canvas
         * and in case of new slate being rendered it removes all previous tinymce instances
         */
        let stateChanged = false;
        let _state = state;
        //**************************************************** */
        let _slateObject = Object.values(props.slateData)[0];
        if (_slateObject) {
            let { id: _slateId } = _slateObject;
            if (_slateId !== state.previousSlateId) {
                _state = {
                    ..._state,
                    previousSlateId: _slateId
                };
                for (let i = tinymce.editors.length - 1 ; i > -1 ; i--) {
                    let ed_id = tinymce.editors[i].id;
                    tinymce.remove(`#${ed_id}`)
                }
                stateChanged = true;
            }
        }
        //**************************************************** */
        /**
         * This chunk manages slatelock info
         */
        const { slateLockInfo: { isLocked } } = props
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
        else {
            return null
        }
    }
    /**
     * renderSlateHeader | renders slate title area with its slate type and title
     */
    renderSlateHeader({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                if (Object.values(_slateData).length > 0) {
                    let _slateObject = Object.values(_slateData)[0];
                    // let _finalSlateObject = Object.values(_slateObject)[0];
                    let { type: _slateType, contents: _slateContent } = _slateObject;
                    let title ={
                        text:this.props.slateTitleUpdated
                    }
                    let _slateTitle =  title.text? title: _slateContent.title
                   // let { title: _slateTitle } = _slateContent;
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

    /*** renderSlate | renders slate editor area with all elements it contain*/
    renderSlate({ slateData: _slateData }) {
        try {
            if (_slateData !== null && _slateData !== undefined) {
                    if (Object.values(_slateData).length > 0) {
                    let _slateObject = Object.values(_slateData)[0];
                    // let _finalSlateObject = Object.values(_slateObject)[0];
                    let { id: _slateId, type: _slateType, contents: _slateContent } = _slateObject;
                    let { title: _slateTitle, bodymatter: _slateBodyMatter } = _slateContent;
                    this['cloneCOSlateControlledSource_' + random] = this.renderElement(_slateBodyMatter, config.slateType, this.props.slateLockInfo)
                    let _context = this
                    return (
                        <div className='slate-content' data-id={_slateId} slate-type={_slateType}>
                            <div className='element-list' onClickCapture={this.checkSlateLockStatus}>
                                <Sortable
                                    options={{
                                        // group: "editor",  // or { name: "...", pull: [true, false, clone], put: [true, false, array] }
                                        sort: true,  // sorting inside list
                                        preventOnFilter: true, // Call `event.preventDefault()` when triggered `filter`
                                        animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
                                        dragoverBubble: false,
                                        removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it


                                        fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.


                                        scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                                        scrollSpeed: 10,
                                        handle: '.element-label', //Drag only by element tag name button
                                        dataIdAttr: 'data-id',
                                        scroll: true, // or HTMLElement
                                        filter: ".elementSapratorContainer",
                                        draggable: ".editor",
                                        forceFallback: true,
                                        onStart: function (/**Event*/evt) {
                                            // same properties as onEnd
                                            _context.checkSlateLockStatus(evt)
                                        },

                                        // Element dragging ended
                                        onUpdate: (/**Event*/evt) => {
                                            let swappedElementData, swappedElementId;
                                            swappedElementData = _slateBodyMatter[evt.oldDraggableIndex]
                                            // swappedElementId =tinymce.$(evt.item).find('.cypress-editable').attr('id');
                                            // console.log('this is active editor id', swappedElementId)
                                            //  tinymce.remove('#'+swappedElementId);
                                            let dataObj = {
                                                oldIndex: evt.oldDraggableIndex,
                                                newIndex: evt.newDraggableIndex,
                                                swappedElementData: swappedElementData,
                                                // slateId:_slateId,
                                                workedExample: false,
                                                swappedElementId: swappedElementId
                                            }
                                            // if(tinymce.activeEditor.id==swappedElementId){
                                            //     tinymce.remove('#'+swappedElementId);
                                            // }
                                            this.props.swapElement(dataObj, () => {
                                                // if(tinymce.activeEditor.id==swappedElementId){
                                                //     document.getElementById(tinymce.activeEditor.id).contentEditable = true;
                                                //     document.getElementById(tinymce.activeEditor.id).focus();
                                                // }
                                                // if(swappedElementType === "element-authoredtext")

                                            })
                                            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                        },

                                    }}

                                    // [Optional] Use ref to get the sortable instance
                                    // https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
                                    ref={(c) => {
                                        if (c) {
                                            let sortable = c.sortable;
                                        }
                                    }}

                                    // [Optional] A tag to specify the wrapping element. Defaults to "div".
                                    tag="div"

                                    onChange={(items, sortable, evt) => { }}
                                >
                                    {
                                        this['cloneCOSlateControlledSource_' + random]
                                        //this.renderElement(_slateBodyMatter, config.slateType, this.props.slateLockInfo)
                                    }
                                </Sortable>
                            </div>
                            <SlateFooter />
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

    checkLockStatus = () => {
        const { slateLockInfo } = this.props
        if(slateLockInfo.isLocked && config.userId !== slateLockInfo.userId){
            this.setState({
                lockOwner: slateLockInfo.userId
            })
            return true
        }
        else {
            const slateId = Object.keys(this.props.slateData)[0],
                lockDuration = 5400
            this.props.setSlateLock(slateId, lockDuration)
            return false
        }
    }
    checkSlateLockStatus = (event) => {
        if (this.checkLockStatus()) {
            this.prohibitPropagation(event)
            this.togglePopup(true)
        }

    }
    prohibitPropagation = (event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()

        }
        return false
    }
    showLockPopup = () => {

        if (this.state.showLockPopup) {
            const { lockOwner } = this.state
            const dialogText = `The following slate is already in use by another member. In use by: `
            this.props.showBlocker(true)
            showTocBlocker();
            return (
                <PopUp dialogText={dialogText}
                    rows="1"
                    cols="1"
                    /*maxLength*/
                    active={true}
                    togglePopup={this.togglePopup}
                    inputValue={lockOwner}
                    isLockPopup={true}
                    isInputDisabled={true}
                    slateLockClass="lock-message"
                    withInputBox={true}
                />
            )
        }
        else {
            return null
        }
    }
    togglePopup = (toggleValue, event) => {
        this.setState({
            showLockPopup: toggleValue
        })
        this.props.showBlocker(toggleValue)
        hideBlocker()
        this.prohibitPropagation(event)
    }

    splithandlerfunction = (type, index, firstOne, parentUrn, asideData, outerAsideIndex) => {
        if (this.checkLockStatus()) {
            this.togglePopup(true)
            return false
        }
        let indexToinsert
        let outerIndex
        // Detects element insertion from the topmost element separator
        if(firstOne || type == "opener-elem"){
            indexToinsert = Number(index)
        } else {
            indexToinsert = Number(index + 1)
        }
        /* For showing the spinning loader send HideLoader message to Wrapper component */
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });

        switch (type) {
            case 'text-elem':
                this.props.createElement(TEXT, indexToinsert, parentUrn, asideData);
                break;
            case 'image-elem':
                // this.props.createFigureElement(IMAGE, indexToinsert);
                this.props.createElement(IMAGE, indexToinsert, parentUrn, asideData);
                break;
            case 'audio-elem':
                // this.props.createVideoElement(elevideo, indexToinsert)
                this.props.createElement(VIDEO, indexToinsert, parentUrn, asideData);
                break;
            case 'interactive-elem':
                //this.props.createInteractiveElement('INTERACTIVE', Number(index + 1))
                this.props.createElement(INTERACTIVE, indexToinsert, parentUrn, asideData);
                break;
            case 'assessment-elem':
                this.props.createElement(ASSESSMENT, indexToinsert, parentUrn, asideData);
                break;
            case 'container-elem':
                this.props.createElement(CONTAINER, indexToinsert, parentUrn, asideData)
                break;
            case 'worked-exp-elem':
                this.props.createElement(WORKED_EXAMPLE, indexToinsert, parentUrn)
                break;
            case 'opener-elem':
                    this.props.createElement(OPENER, indexToinsert, parentUrn)
                break;
            case 'section-break-elem':
                parentUrn.contentUrn = asideData.contentUrn
                parentUrn.manifestUrn = asideData.id
                if (typeof (outerAsideIndex) == "string") {
                    outerIndex = outerAsideIndex.split("-")[1]
                    if (outerIndex !== 1) {
                        outerIndex = Number(outerIndex) + 1
                    }
                }
                this.props.createElement(SECTION_BREAK, indexToinsert, parentUrn, asideData, outerIndex)
                break;
                case 'metadata-anchor':
                    if(config.slateType == "container-introduction"){
                        this.props.createElementMetaList(LO_LIST, indexToinsert,parentUrn)
                    }
                    else{
                        this.props.createElementMeta(METADATA_ANCHOR, indexToinsert,parentUrn)
                    }
                   
                break;
            default:
        }
    }

    elementSepratorProps = (index, firstOne, parentUrn, asideData, outerAsideIndex) => {
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
                buttonType: 'interactive-elem',
                buttonHandler: () => this.splithandlerfunction('interactive-elem', index, firstOne, parentUrn, asideData),
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
                buttonType: 'container-elem',
                buttonHandler: () => this.splithandlerfunction('container-elem', index, firstOne, parentUrn),
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
        ]

    }
    showSplitSlatePopup = () => {
        if (this.state.showSplitSlatePopup) {
            const dialogText = `Are you sure you want to split this slate at the selected section? `
            this.props.showBlocker(true)
            showTocBlocker();
            return(
                <PopUp  dialogText={dialogText}
                        active={true}
                        togglePopup={this.toggleSplitSlatePopup}
                        isSplitSlatePopup={true}
                        handleSplit={this.handleSplitSlate}
                        isInputDisabled={true}
                        splitSlateClass="split-slate"
                />
            )
        }
        else{
            return null
        }
    }

    toggleSplitSlatePopup = (value, index) => {
        this.setState({
            showSplitSlatePopup: value,
        })
        if (value) {
            this.setState({
                splittedSlateIndex : index + 1
            }) 
        }
        else{
            this.props.showBlocker(value)
            hideBlocker();
        }
    }

    handleSplitSlate = () => {
        this.toggleSplitSlatePopup(false)
        sendDataToIframe({ 'type': ShowLoader, 'message':{status: true}});
        sendDataToIframe({ 'type': SPLIT_CURRENT_SLATE, 'message': {} });
        this.props.setSplittedElementIndex(this.state.splittedSlateIndex)
    }
    
    deleteAccepted = () => { 
        sendDataToIframe({ 'type': 'deleteAccepted', 'message': this.props.tocDeleteMessage })
        this.deleteRejected()
    }

    deleteRejected = () => {
        hideBlocker();
        hideTocBlocker();
        disableHeader(true) ;
        this.props.modifyState(false)
        sendDataToIframe({ 'type': 'deleteRejected', 'message': {} });
    }

    showTocDeletePopup= () => {
        if(this.props.toggleTocDelete){
            return(
                <PopUp 
                togglePopup={this.deleteRejected}
                active={true}
                saveContent={this.deleteAccepted}
                saveButtonText='Yes'
                dialogText='Are you sure you want to delete, this action cannot be undone?'
                tocDelete = {true}
                tocDeleteClass = 'tocDeleteClass'
                />
                
            )
        }
    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements, _slateType, slateLockInfo) {
        try {
            console.log("_slateType",_slateType);
            if (_elements !== null && _elements !== undefined) {
                    if(_elements.filter(element => element.type == "chapterintro").length){
                        config.isCO = true
                    }
                    else{
                        config.isCO = false
                    }
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                            index === 0 &&  _slateType !== 'assessment'? 
                            <ElementSaprator
                                firstOne={index === 0}
                                index={index}
                                esProps={this.elementSepratorProps(index, true)}
                                elementType={element.type}
                            />
                            : null
                             }
                            <ElementContainer  
                                slateType={_slateType}                          
                                element={element}
                                index={index}
                                handleCommentspanel={this.props.handleCommentspanel}
                                elementSepratorProps={this.elementSepratorProps}
                                showBlocker={this.props.showBlocker}
                            >
                            {
                                   (isHovered, isPageNumberEnabled, activeElement) => (
                                       <PageNumberElement element={element} isHovered={isHovered} isPageNumberEnabled={isPageNumberEnabled} activeElement={activeElement} />
                                   )
                               }
                           </ElementContainer>
                            { _slateType !== 'assessment'? 
                            <ElementSaprator
                                index={index}
                                esProps={this.elementSepratorProps(index, false)}
                                elementType=""
                                slateType={_slateType}
                                toggleSplitSlatePopup={this.toggleSplitSlatePopup}
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
            console.error(error);
        }
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
                        this.renderSlateHeader(this.props)
                    }
                </div>
                <div className='slate-wrapper'>
                    {
                        this.renderSlate(this.props)
                    }
                </div>
                <ListButtonDropPortal refToToolBar={this.props.refToToolBar} slateData={this.props.slateData}>
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
                {this.showSplitSlatePopup()}
                {this.showTocDeletePopup()}
            </React.Fragment>
        );
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
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
        slateTitleUpdated:state.appStore.slateTitleUpdated
    };
};


export default connect(
    mapStateToProps,
    {
        createElement,
        createElementMeta,
        createElementMetaList,
        swapElement,
        setSplittedElementIndex,
        createAssessmentSlateElement
    }
)(SlateWrapper);
