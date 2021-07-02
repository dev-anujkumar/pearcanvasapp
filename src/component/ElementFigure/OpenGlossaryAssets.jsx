import React,{Component} from 'react';
import { connect } from 'react-redux'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import AddImageGlossary from './AddImageGlossary.jsx';
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import { showAudioRemovePopup } from '../../component/AudioNarration/AudioNarration_Actions.js'
import { hasReviewerRole } from '../../constants/utility.js'
import '../../styles/AudioNarration/AudioNarration.css';
import {showRemoveImageGlossaryPopup} from '../../component/GlossaryFootnotePopup/GlossaryFootnote_Actions.js'
/**
* @description - OpenFigureGlossary is a class based component. It is defined simply for opening the already figure glossary popup.
*/
class OpenGlossaryAssets extends Component {

    constructor(props) {
        super(props);
        this.state ={
            replaceAudioToggle: false,
            replaceImageToggle: false,
            tabValue: "",
            figureGlossaryData: {},
            audioGlossaryData: {}
        }
    }

    /**
    * @description - openConfirmationBox function responsible for opening confirmation popupfor removing the figure image.
    */
     openAudioConfirmationBox = (isGlossary) => {
        this.props.showAudioRemovePopup(true, isGlossary)
    }

    /**
    * @description - openImageConfirmationBox function responsible for opening confirmation popupfor removing the figure image.
    */
     openImageConfirmationBox = () => {
        this.props.showRemoveImageGlossaryPopup(true)
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        let {  figureGlossaryData, audioGlossaryData } = this.props;
        
        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            this.setState({
                tabValue: "audio",
                audioGlossaryData: audioGlossaryData
            });
        } else if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            this.setState({
                tabValue: "image",
                figureGlossaryData: figureGlossaryData
            });
        }
    }

    static getDerivedStateFromProps(nextProps, state) {
        if ((nextProps.figureGlossaryData !== state.figureGlossaryData) && Object.keys(nextProps.audioGlossaryData).length === 0 && Object.keys(nextProps.figureGlossaryData).length > 0) {
            return {
                figureGlossaryData: nextProps.figureGlossaryData,
                tabValue: "image"
            }
        }
        if ((nextProps.audioGlossaryData !== state.audioGlossaryData) && Object.keys(nextProps.figureGlossaryData).length === 0 && Object.keys(nextProps.audioGlossaryData).length > 0) {
            return {
                audioGlossaryData: nextProps.audioGlossaryData,
                tabValue: "audio"
            }
        }
        if (Object.keys(nextProps.figureGlossaryData).length > 0 && Object.keys(nextProps.audioGlossaryData).length > 0) {
            return {
                figureGlossaryData: nextProps.figureGlossaryData,
                audioGlossaryData: nextProps.audioGlossaryData,
            }
        }
        return null;
    }

    /**
    * @description - handleClick function responsible for closing the dropdown whenever clicked outside.
    */
    handleClick = (e) => {
        // console.log("handleclickkkkkkkkkkkkkkkkkkk " + this.node);
        if (this.node.contains(e.target)) {
            return;
        }
        this.props.closeAssetsPopup();
    }

    handleReplaceAudioButton = () => {
        this.setState({
            replaceAudioToggle: !this.state.replaceAudioToggle
        })
    }

    handleReplaceImageButton = () => {
        this.setState({
            replaceImageToggle: !this.state.replaceImageToggle
        })
    }

    closeFigurePopup=()=>{
        this.setState({
            replaceToggle:false
        })
    }

    closeAddAudioBook=()=>{
        this.setState({
            replaceToggle:false
        })
    }

    handleTab = (index) =>{
        this.setState({
            tabValue:index
        })
      }

    render = () => {
        const { position, imageGlossaryRemovePopup } = this.props;
        let { tabValue, replaceAudioToggle, replaceImageToggle, figureGlossaryData, audioGlossaryData } = this.state;
        let imageMediaSrc, imageMediaTitle, audioMediaSrc, audioMediaTitle = "";
        
        if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            imageMediaSrc = figureGlossaryData.path;
            imageMediaTitle = figureGlossaryData.title;
        }
        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            audioMediaSrc = audioGlossaryData.location;
            audioMediaTitle = audioGlossaryData.title.en;
        }
        
        return (
            <div className={'glossary-figuredropdown'} style={position} id='openFigureGlossary' ref={node => this.node = node} onBlur={() => this.handleClick(this)}>
                <div className="tabs-container">
                    <div className="audio-image-tab">
                        {
                            audioGlossaryData && Object.keys(audioGlossaryData).length > 0 &&
                            <div onClick={() => this.handleTab('audio')} className={`tabs ${tabValue === 'audio' ? "active-tabs" : ""}`}>Audio</div>
                        }
                        {
                            figureGlossaryData && Object.keys(figureGlossaryData).length > 0 &&
                            <div onClick={() => this.handleTab('image')} className={`tabs ${tabValue === 'image' ? "active-tabs" : ""}`}>Image</div>
                        }
                    </div>
                    <div className="close-icon-image">
                      <span className="close-icon" onClick={() => this.props.closeAssetsPopup(false)}>{audioNarrationCloseIcon}</span>
                    </div>
                </div>
                

                {
                    audioGlossaryData && Object.keys(audioGlossaryData).length > 0 &&
                    <div className={tabValue === 'audio' ? "show-content" : "content"}>
                        <h2 className="audio-text">Audio Book</h2>
                        <figure>
                            <figcaption className="audio-media-title">{audioMediaTitle}</figcaption>
                            <audio
                                controls
                                controlsList="nodownload"
                                src={audioMediaSrc}>
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </figure>

                        {replaceAudioToggle && <AddAudioBook isGlossary={true} closeAddAudioBook={this.closeAddAudioBook} />}

                        <div className="remove-button">
                            {!hasReviewerRole() &&
                                <button className="remove-text" onClick={() => this.openAudioConfirmationBox(true)} className="audioRemoveButton audioRemoveRound">Remove</button>
                            }
                            {
                                <button className="remove-text" onClick={() => this.handleReplaceAudioButton()} className="audioReplaceeButton audioRemoveRound">Replace</button>
                            }
                        </div>

                    </div>
                }

                {
                    figureGlossaryData && Object.keys(figureGlossaryData).length > 0 &&
                    <div className={tabValue === 'image' ? "show-content" : "content"}>
                        <h2 className="image-glossary-text" >Image</h2>
                        <figure>
                            <figcaption className="image-media-title">{imageMediaTitle}</figcaption>
                            <img src={imageMediaSrc}
                                data-src={imageMediaSrc}
                                title = ""
                                alt = ""
                                width = '300px'
                                height = '113px'
                                // className={imageDimension + ' lazyload'}
                                draggable = "false" />
                        </figure>

                        {replaceImageToggle && <AddImageGlossary  closeFigurePopup={this.closeFigurePopup} />}

                        <div className="remove-button">

                            {!hasReviewerRole() &&
                                <button className="remove-text" onClick={ this.openImageConfirmationBox} className="audioRemoveButton audioRemoveRound">Remove</button>
                            }
                            {
                                <button className="remove-text" onClick={() => this.handleReplaceImageButton()} className="audioReplaceeButton audioRemoveRound">Replace</button>
                            }
                        </div>
                    </div>
                }
            </div>
            
        )
    }
}


const mapStateToProps = (state) => {
    return {
        figureGlossaryData: state.appStore.figureGlossaryData,
        audioGlossaryData: state.audioReducer.audioGlossaryData,
    }
}

const mapActionToProps = {
    showAudioRemovePopup,
    showRemoveImageGlossaryPopup
}

export default connect(mapStateToProps, mapActionToProps)(OpenGlossaryAssets)