// IMPORT - Plugins //
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// IMPORT - Components //
import SlateHeader from '../CanvasSlateHeader';
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { LargeLoader, SmalllLoader } from './ContentLoader.jsx';
import { SlateFooter } from './SlateFooter.jsx';
import {
    createElement ,createVideoElement
    , createFigureElement , createInteractiveElement
} from './SlateWrapper_Actions';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader} from '../../constants/IFrameMessageTypes.js';
import config from '../../config/config';
import {TEXT, IMAGE, VIDEO, ASSESSMENT, INTERACTIVE, CONTAINER}from './SlateWrapperConstants';
// IMPORT - Assets //
import '../../styles/SlateWrapper/style.css';
import PopUp from '../PopUp';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'

class SlateWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLockPopup: false,
            lockOwner: ""
        }
    }

    componentDidMount(){
        if(document.getElementById("cypress-0")){
            document.getElementById("cypress-0").focus();
        }
    }
    
    static getDerivedStateFromProps = (props, state) =>{
        const { slateLockInfo : { isLocked } } = props
        if(!isLocked){
            return {
                ...state,
                showLockPopup: false
            }
        }
        else{
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
                    let { title: _slateTitle } = _slateContent;
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
                    return (
                        <div className='slate-content' data-id={_slateId} slate-type={_slateType}>
                            <div className='element-list' onClickCapture={this.checkSlateLockStatus}>
                                {
                                    this.renderElement(_slateBodyMatter, config.slateType, this.props.slateLockInfo)
                                }
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
        if(slateLockInfo.isLocked){
            this.setState({
                lockOwner: slateLockInfo.userId
            })
            return true
        }
        else{
            const slateId = Object.keys(this.props.slateData)[0],
                lockDuration = 5400
            this.props.setSlateLock(slateId, lockDuration)
            return false
        }
    }
    checkSlateLockStatus = (event) => {
        if(this.checkLockStatus()){
            this.prohibitPropagation(event)
            this.togglePopup(true)
        }
        
    }
    prohibitPropagation = (event) =>{
        if(event){
            event.preventDefault()
            event.stopPropagation()
           
        }
        return false
    }
    showLockPopup = () => {
        
        if(this.state.showLockPopup){
            const { lockOwner } = this.state
            const dialogText = `The following slate is already in use by another member. In use by: `
            this.props.showBlocker(true)
            showTocBlocker();
            return(
                <PopUp  dialogText={dialogText}
                        rows="1"
                        cols="1"
                        /*maxLength*/
                        active={true}
                        togglePopup={this.togglePopup}
                        inputValue={lockOwner}
                        isLockPopup={true}
                        isInputDisabled={true}
                        assessmentClass="lock-message"
                        withInputBox={true}
                />
            )
        }
        else{
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
    
    splithandlerfunction = (type, index, firstOne,parentUrn) => {
        if(this.checkLockStatus()){
            this.togglePopup(true)
        }
        let indexToinsert
        // Detects element insertion from the topmost element separator
        if(firstOne){
            indexToinsert = Number(index)
        } else {
            indexToinsert = Number(index + 1)
        }
        /* For showing the spinning loader send HideLoader message to Wrapper component */
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});

        switch (type) {
            case 'text-elem':
                this.props.createElement(TEXT, indexToinsert,parentUrn);
                break;
            case 'image-elem':
                // this.props.createFigureElement(IMAGE, indexToinsert);
                this.props.createElement(IMAGE, indexToinsert,parentUrn);
                break;
            case 'audio-elem':
                // this.props.createVideoElement(elevideo, indexToinsert)
                this.props.createElement(VIDEO, indexToinsert,parentUrn);
                break;
            case 'interactive-elem':
                    //this.props.createInteractiveElement('INTERACTIVE', Number(index + 1))
                    this.props.createElement(INTERACTIVE, indexToinsert,parentUrn);
                break;
            case 'assessment-elem':
                    this.props.createElement(ASSESSMENT, indexToinsert,parentUrn);
                break;
            case 'container-elem':
                  this.props.createElement(CONTAINER, indexToinsert,parentUrn)
                break;
            case 'worked-exp-elem':
                   this.props.createElement("workedexample", indexToinsert,parentUrn)
                break;
            case 'opener-elem':
                break;
            default:
        }   
    }

    elementSepratorProps = (index, firstOne,parentUrn) => {
        return [
            {
                buttonType: 'text-elem',
                buttonHandler: () => this.splithandlerfunction('text-elem', index, firstOne,parentUrn),
                tooltipText: 'Text',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'image-elem',
                buttonHandler: () => this.splithandlerfunction('image-elem', index, firstOne),
                tooltipText: 'Image',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'audio-elem',
                buttonHandler: () => this.splithandlerfunction('audio-elem', index, firstOne),
                tooltipText: 'Audio/Video',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'interactive-elem',
                buttonHandler: () => this.splithandlerfunction('interactive-elem', index, firstOne),
                tooltipText: 'Interactive',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'assessment-elem',
                buttonHandler: () => this.splithandlerfunction('assessment-elem', index, firstOne),
                tooltipText: 'Assessment',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'container-elem',
                buttonHandler: () => this.splithandlerfunction('container-elem', index, firstOne,parentUrn),
                tooltipText: 'Container',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'worked-exp-elem',
                buttonHandler: () => this.splithandlerfunction('worked-exp-elem', index, firstOne,parentUrn),
                tooltipText: 'Worked Example',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'section-break-elem',
                buttonHandler: () => this.splithandlerfunction('section-break-elem', index, firstOne),
                tooltipText: 'Section Break',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'metadata-anchor',
                buttonHandler: () => this.splithandlerfunction('metadata-anchor', index, firstOne),
                tooltipText: 'Metadata Anchor',
                tooltipDirection: 'left'
            },
            {
                buttonType: 'opener-elem',
                buttonHandler: () => this.splithandlerfunction('opener-elem', index, firstOne),
                tooltipText: 'Opener Element',
                tooltipDirection: 'left'
            },
        ]

    }

    /**
     * renderElement | renders single element according to its type
     */
    renderElement(_elements, _slateType, slateLockInfo) {
        try {
            if (_elements !== null && _elements !== undefined) {
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                            index === 0 ? 
                            <ElementSaprator
                                firstOne={index === 0}
                                index={index}
                                esProps={this.elementSepratorProps(index, true)}
                                elementType={element.type}
                            />
                            : null
                             }
                            <ElementContainer
                                element={element}
                                index={index}
                                handleCommentspanel={this.props.handleCommentspanel}
                                elementSepratorProps = {this.elementSepratorProps}
                                showBlocker = {this.props.showBlocker}
                            />
                            <ElementSaprator
                                index={index}
                                esProps={this.elementSepratorProps(index, false)}
                                elementType={element.type}
                                slateType = {_slateType}
                            />
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
                {this.showLockPopup()}
            </React.Fragment>
        );
    }

}
SlateWrapper.displayName = "SlateWrapper"

SlateWrapper.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        slateLockInfo: state.slateLockReducer.slateLockInfo
    };
};


export default connect(
    mapStateToProps,
    {
        createElement,
        createVideoElement,
        createFigureElement,
        createInteractiveElement
    }
)(SlateWrapper);
