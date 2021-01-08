import React from 'react';
import { connect } from 'react-redux'
import { deleteAudioNarrationForContainer, showAudioRemovePopup } from './AudioNarration_Actions'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioNarration/AudioNarration.css'
import { hasReviewerRole } from '../../constants/utility.js'

/**
* @description - OpenAudioBook is a class based component. It is defined simply for opening the already Narrative audio popup.
*/
class OpenAudioBook extends React.Component {

    constructor(props) {
        super(props);
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
    openConfirmationBox = (e) => {
        this.props.showAudioRemovePopup(true)
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false)
    }

    /**
    * @description - handleClick function responsible for closing the dropdown whenever clicked outside.
    */
    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }
        this.props.closeAudioBookDialog()
    }


    static getDerivedStateFromProps(nextprops, prevState) {
        if (prevState && prevState.audioData && prevState.audioData.containerUrn !== nextprops && nextprops.audioData && nextprops.audioData.containerUrn) {
            this.props.closeAudioBookDialog()
        }
        else {
            return null
        }
    }

    render = () => {
        const { audioData, currentAudioGlossaryData, isGlossary } = this.props;
        var mediaSrc = "";
        var mediaTitle = "";

        if(isGlossary){
            if(currentAudioGlossaryData && currentAudioGlossaryData.data && currentAudioGlossaryData.data.length > 0){
                mediaSrc = currentAudioGlossaryData.data[0].location;
                mediaTitle = currentAudioGlossaryData.data[0].title.en;
            }
        }
        else if(audioData && audioData.data && audioData.data.length > 0) {
            mediaSrc = audioData.data[0].location;
            mediaTitle = audioData.data[0].title.en;
        }

        return (
            <div className={!isGlossary ?'audiodropdown':'glossary-audiodropdown'} id='openAudioBook' ref={node => this.node = node} onBlur={() => this.handleClick(this)}>
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
                <div className="remove-button">
                    { !hasReviewerRole() &&
                        <button className="remove-text" onClick={() => this.openConfirmationBox()} className="audioRemoveButton audioRemoveRound">Remove</button>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        audioData: state.audioReducer.audioData,
        currentAudioGlossaryData:state.audioReducer.currentAudioGlossaryData
    }
}

const mapActionToProps = {
    deleteAudioNarrationForContainer,
    showAudioRemovePopup
}

export default connect(mapStateToProps, mapActionToProps)(OpenAudioBook)