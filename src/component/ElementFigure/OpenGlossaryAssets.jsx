import React,{Component} from 'react';
import { connect } from 'react-redux'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import AddFigureImage from './AddFigureImage.jsx';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx';
import { hasReviewerRole } from '../../constants/utility.js'
import '../../styles/AudioNarration/AudioNarration.css';
/**
* @description - OpenFigureGlossary is a class based component. It is defined simply for opening the already figure glossary popup.
*/
class OpenGlossaryAssets extends Component {

    constructor(props) {
        super(props);
        this.state ={
            replaceToggle:false,
            tabValue: ""
        }
    }

    /**
    * @description - openConfirmationBox function responsible for opening confirmation popupfor removing the figure image.
    */
    openConfirmationBox = (isGlossary) => {
        this.props.showAudioRemovePopup(true,isGlossary)
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
    // handleClick = (e) => {
    //     // alert("1");
    //     if (this.node?.contains(e.target)) {
    //         return;
    //     }
    //     this.props.closeAssetsPopup()
    // }

    handleReplaceButton =()=>{
        this.setState({
            replaceToggle:!this.state.replaceToggle
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
        const { tabValue, replaceToggle } = this.state;
        let mediaSrc = "";
        let mediaTitle = "";
        
        if (figureGlossaryData && Object.keys(figureGlossaryData).length > 0) {
            mediaSrc = figureGlossaryData.path;
            mediaTitle = figureGlossaryData.imageid;
        }
        
        return (
            <div className={'glossary-figuredropdown'} style={this.props.position} id='openFigureGlossary' >
                <div className="audio-close">
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
                </div>

                {
                    audioGlossaryData && Object.keys(audioGlossaryData).length > 0 &&
                    <div className={tabValue === 'audio' ? "showconetnt" : "content"}>
                        <OpenAudioBook isGlossary ={true} closeAudioBookDialog={this.props.closeAssetsPopup} />
                    </div>
                }

                {
                    figureGlossaryData && Object.keys(figureGlossaryData).length > 0 &&
                    <div className={tabValue === 'image' ? "showconetnt" : "content"}>
                        {/* <span className="close-icon-image" onClick={() => this.props.closeAssetsPopup()}>{audioNarrationCloseIcon}</span> */}
                        <figure>
                            <figcaption className="media-title">{mediaTitle}</figcaption>
                            <img src={mediaSrc}
                                data-src={mediaSrc}
                                title=""
                                alt=""
                                width='300px'
                                height='113px'
                                // className={imageDimension + ' lazyload'}
                                draggable="false" />
                        </figure>

                        {replaceToggle && <AddFigureImage isGlossary={true} closeFigurePopup={this.closeFigurePopup} />}

                        <div className="remove-button">

                            {!hasReviewerRole() &&
                                <button className="remove-text" onClick={() => this.openConfirmationBox(isGlossary)} className="audioRemoveButton audioRemoveRound">Remove</button>
                            }
                            {
                                <button className="remove-text" onClick={() => this.handleReplaceButton()} className="audioReplaceeButton audioRemoveRound">Replace</button>
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