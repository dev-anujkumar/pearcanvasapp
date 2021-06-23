import React,{Component} from 'react';
import { connect } from 'react-redux'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import AddFigureImage from './AddFigureImage.jsx';
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';
import { hasReviewerRole } from '../../constants/utility.js'
import '../../styles/AudioNarration/AudioNarration.css';
/**
* @description - OpenFigureGlossary is a class based component. It is defined simply for opening the already figure glossary popup.
*/
class OpenGlossaryAssets extends Component {

    constructor(props) {
        super(props);
        this.state ={
            replaceAudioToggle: false,
            replaceImageToggle: false,
            tabValue: ""
        }
    }

    /**
    * @description - openConfirmationBox function responsible for opening confirmation popupfor removing the figure image.
    */
     openAudioConfirmationBox = (isGlossary) => {
        this.props.showAudioRemovePopup(true, isGlossary)
    }


    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick, false);
        const {  figureGlossaryData, audioGlossaryData } = this.props;
        
        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            this.setState({ tabValue: "audio" });
        } else if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            this.setState({ tabValue: "image" });
        }
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

    handleTab = (index) =>{
        this.setState({
            tabValue:index
        })
      }

    render = () => {
        const {  figureGlossaryData, audioGlossaryData, position } = this.props;
        let { tabValue, replaceAudioToggle, replaceImageToggle } = this.state;
        let imageMediaSrc, imageMediaTitle, audioMediaSrc, audioMediaTitle = "";
        
        
        if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            imageMediaSrc = figureGlossaryData.path;
            imageMediaTitle = figureGlossaryData.imageid;
        }
        if (audioGlossaryData && Object.keys(audioGlossaryData).length > 0) {
            audioMediaSrc = audioGlossaryData.location;
            audioMediaTitle = audioGlossaryData.title.en;
        }
        
        return (
            <div className={'glossary-figuredropdown'} style={position} id='openFigureGlossary' ref={node => this.node = node} onBlur={() => this.handleClick(this)}>
                <div className="tabs-container">
                        {
                            audioGlossaryData && Object.keys(audioGlossaryData).length > 0 &&
                            <div onClick={() => this.handleTab('audio')} className={`tabs ${tabValue === 'audio' ? "active-tabs" : ""}`}>Audio</div>
                        }
                        {
                            figureGlossaryData && Object.keys(figureGlossaryData).length > 0 &&
                            <div onClick={() => this.handleTab('image')} className={`tabs ${tabValue === 'image' ? "active-tabs" : ""}`}>Image</div>
                        }
                    </div>
                <div className="audio-close" style={{backgroundColor:"pink"}}>
                    <span className="close-icon-image" onClick={() => this.props.closeAssetsPopup()}>{audioNarrationCloseIcon}</span>
                </div>

                {
                    audioGlossaryData && Object.keys(audioGlossaryData).length > 0 &&
                    <div className={tabValue === 'audio' ? "showconetnt" : "content"}>
                        <h2 className="audio-book-text">Audio Book</h2>
                        <figure>
                            <figcaption className="media-title">{audioMediaTitle}</figcaption>
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
                    <div className={tabValue === 'image' ? "showconetnt" : "content"}>
                        <h2 className="audio-book-text">Image Book</h2>
                        <figure>
                            <figcaption className="media-title">{imageMediaTitle}</figcaption>
                            <img src={imageMediaSrc}
                                data-src={imageMediaSrc}
                                title = ""
                                alt = ""
                                width = '300px'
                                height = '113px'
                                // className={imageDimension + ' lazyload'}
                                draggable = "false" />
                        </figure>

                        {replaceImageToggle && <AddFigureImage isGlossary={true} closeFigurePopup={this.closeFigurePopup} />}

                        <div className="remove-button">

                            {!hasReviewerRole() &&
                                <button className="remove-text" onClick={() => this.openConfirmationBox(true)} className="audioRemoveButton audioRemoveRound">Remove</button>
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
        audioGlossaryData: state.audioReducer.audioGlossaryData
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(OpenGlossaryAssets)