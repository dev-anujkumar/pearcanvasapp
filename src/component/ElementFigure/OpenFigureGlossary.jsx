import React,{Component} from 'react';
import { connect } from 'react-redux'
import { hideTocBlocker } from '../../js/toggleLoader';
import { audioNarrationCloseIcon } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioNarration/AudioNarration.css'
import { hasReviewerRole } from '../../constants/utility.js'
import AddFigureImage from './AddFigureImage.jsx'
/**
* @description - OpenFigureGlossary is a class based component. It is defined simply for opening the already figure glossary popup.
*/
class OpenFigureGlossary extends Component {

    constructor(props) {
        super(props);
        this.state ={
            replaceToggle:false
        }
    }

    /**
    * @description - openConfirmationBox function responsible for opening confirmation popupfor removing the figure image.
    */
    openConfirmationBox = (isGlossary) => {
        this.props.showAudioRemovePopup(true,isGlossary)
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

    render = () => {
        const {  figureGlossaryData, isGlossary } = this.props;
        var mediaSrc = "";
        var mediaTitle = "";
        // if(isGlossary){
            if(figureGlossaryData && Object.keys(figureGlossaryData).length > 0){
                mediaSrc = figureGlossaryData.path;
                mediaTitle = figureGlossaryData.imageid;
            }
        // }
        return (
            <div className={'glossary-figuredropdown'} style={ this.props.position }  id='openFigureGlossary' ref={node => this.node = node} onBlur={() => this.handleClick(this)}>
                <div className="audio-close">
                    <h2 className="audio-book-text">Image</h2>
                    <span className="close-icon-audio" onClick={() => this.props.closeAudioBookDialog()}>{audioNarrationCloseIcon}</span>
                </div>
                <figure>
                    <figcaption className="media-title">{mediaTitle}</figcaption>
                        <img src={mediaSrc}
                                data-src={mediaSrc}
                                title=""
                                alt=""
                                width = '300px'
                                height= '113px'
                                // className={imageDimension + ' lazyload'}
                                draggable="false" />
                </figure>

                {this.state.replaceToggle && <AddFigureImage isGlossary={true} closeFigurePopup={this.closeFigurePopup} />}

                <div className="remove-button">
                    
                    { !hasReviewerRole() &&
                        <button className="remove-text" onClick={() => this.openConfirmationBox(isGlossary)} className="audioRemoveButton audioRemoveRound">Remove</button>
                    }
                    {
                         <button className="remove-text" onClick={() => this.handleReplaceButton()} className="audioReplaceeButton audioRemoveRound">Replace</button>
                    }   
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        figureGlossaryData:state.appStore.figureGlossaryData
    }
}

const mapActionToProps = {
}

export default connect(mapStateToProps, mapActionToProps)(OpenFigureGlossary)