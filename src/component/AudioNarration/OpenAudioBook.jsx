import React from 'react';
import { connect } from 'react-redux'
import { deleteAudioNarrationForContainer, showAudioRemovePopup } from './AudioNarration_Actions'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioNarration/AudioNarration.css'
import { hasReviewerRole } from '../../constants/utility.js'
import AddAudioBook from './AddAudioBook.jsx'
/**
* @description - OpenAudioBook is a class based component. It is defined simply for opening the already Narrative audio popup.
*/
class OpenAudioBook extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            replaceToggle:false
        },
        this.wrapperRef = React.createRef();
    }

    /**
    * @description - processConfirmation function responsible for deleting the narrative audio.
    */
    processConfirmation = (type) => {
        if(type !== 'test'){                    // added for test cases Purpose
            this.props.deleteAudioNarrationForContainer();
        }
        hideTocBlocker();
    }

    /**
    * @description - openConfirmationBox function responsible for opening confirmation popupfor removing the narrative audio.
    */
    openConfirmationBox = (isGlossary) => {
        this.props.showAudioRemovePopup(true,isGlossary)
    }


    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    /**
    * @description - handleClick function responsible for closing the dropdown whenever clicked outside.
    */
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.props.closeAudioBookDialog()
        }
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    static getDerivedStateFromProps(nextprops, prevState) {
        if (prevState && prevState.audioData && prevState.audioData.containerUrn !== nextprops && nextprops.audioData && nextprops.audioData.containerUrn) {
            this.props.closeAudioBookDialog()
        }
        else {
            return null
        }
    }

    handleReplaceButton =()=>{
        this.setState({
            replaceToggle:!this.state.replaceToggle
        })
    }

    closeAddAudioBook=()=>{
        this.setState({
            replaceToggle:false
        })
    }

    render = () => {
        const { audioData, audioGlossaryData, isGlossary } = this.props;
        var mediaSrc = "";
        var mediaTitle = "";

        if(isGlossary){
            if(audioGlossaryData && Object.keys(audioGlossaryData).length > 0){
                mediaSrc = audioGlossaryData.location;
                mediaTitle = audioGlossaryData.title.en;
            }
        }
        else if(audioData && audioData.data && audioData.data.length > 0) {
            mediaSrc = audioData.data[0].location;
            mediaTitle = audioData.data[0].title.en;
        }

        return (
            <div className={!isGlossary ?'audiodropdown':'glossary-audiodropdown'} style={isGlossary ? this.props.position :null}  id='openAudioBook' ref={this.wrapperRef} >
                <div className="audio-close">
                    <h2 className="audio-book-text">Audio Book</h2>
                    <span className="close-icon-audio" onClick={() => this.props.closeAudioBookDialog()}>{audioNarrationCloseIcon}</span>
                </div>
                <figure>
                    <figcaption className="media-title">{mediaTitle}</figcaption>
                    <audio
                        controls
                        controlsList="nodownload"
                        src={mediaSrc}>
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                </figure>

                {this.state.replaceToggle && <AddAudioBook isGlossary={true} closeAddAudioBook={this.closeAddAudioBook} />}

                <div className="remove-button">

                    { (!hasReviewerRole()) &&
                        <button className="remove-text audioRemoveButton audioRemoveRound" onClick={() => this.openConfirmationBox(isGlossary)}>Remove</button>
                    }
                    { (!hasReviewerRole()) &&
                        isGlossary && <button className="remove-text audioReplaceeButton audioRemoveRound" onClick={() => this.handleReplaceButton()} >Replace</button>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        audioData: state.audioReducer.audioData,
        audioGlossaryData:state.audioReducer.audioGlossaryData
    }
}

const mapActionToProps = {
    deleteAudioNarrationForContainer,
    showAudioRemovePopup
}

export default connect(mapStateToProps, mapActionToProps)(OpenAudioBook)
