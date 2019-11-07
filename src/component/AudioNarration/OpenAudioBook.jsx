import React from 'react';
import { connect } from 'react-redux'
import { deleteAudioNarrationForContainer, showAudioRemovePopup } from './AudioNarration_Actions'
import { hideTocBlocker } from '../../js/toggleLoader';

class OpenAudioBook extends React.Component {

    constructor(props) {
        super(props);
    }

    processConfirmation = () => {
        // this.props.closeAudioBookDialog();
        this.props.deleteAudioNarrationForContainer();
        hideTocBlocker();
        // enableHeaderCanvas();
        // this.props.closeAudioBookDialog();
    }

    openConfirmationBox = (e) => {
        // showTocBlocker();
        // disableHeaderCanvas();
        this.props.showAudioRemovePopup(true)

    }


    // componentDidMount() {
    //     document.addEventListener('mousedown', this.handleClick, false)
    // }

    handleClick = (e) => {
        if (e.target.parentElement.parentElement.className == 'audioicon') {
            return;
        }
        if (this.node.contains(e.target)) {
            console.log("clicked inside");
            return;
        }
        console.log("clicked Outside");
          this.props.closeAudioBookDialog()
    }

    // componentWillReceiveProps(nextprops) {
    //     if (this.props && this.props.audioData && this.props.audioData.containerUrn !== nextprops && nextprops.audioData && nextprops.audioData.containerUrn) {
    //         this.props.closeAudioBookDialog()
    //     }
    // }

    // static getDerivedStateFromProps(nextprops, prevState) {
    //     if (prevState && prevState.audioData && prevState.audioData.containerUrn !== nextprops && nextprops.audioData && nextprops.audioData.containerUrn) {
    //         this.props.closeAudioBookDialog()
    //     }
    //     else{
    //         return null
    //     }
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClick, false)
    //     console.log("I am in unmounting phase of open audio")
    // }

    render = () => {
        const closeIcon = <svg width="14" version="1.1" xmlns="http://www.w3.org/2000/svg" height="14" viewBox="0 0 64 64"> <g> <path fill="#1D1D1B" d="M28.941,31.786L0.613,60.114c-0.787,0.787-0.787,2.062,0,2.849c0.393,0.394,0.909,0.59,1.424,0.59 c0.516,0,1.031-0.196,1.424-0.59l28.541-28.541l28.541,28.541c0.394,0.394,0.909,0.59,1.424,0.59c0.515,0,1.031-0.196,1.424-0.59 c0.787-0.787,0.787-2.062,0-2.849L35.064,31.786L63.41,3.438c0.787-0.787,0.787-2.062,0-2.849c-0.787-0.786-2.062-0.786-2.848,0 L32.003,29.15L3.441,0.59c-0.787-0.786-2.061-0.786-2.848,0c-0.787,0.787-0.787,2.062,0,2.849L28.941,31.786z" /> </g> </svg>
        const { audioData } = this.props;
        var mediaSrc = "";
        var mediaTitle = "";
        if (audioData && audioData.data && audioData.data.length > 0) {
            mediaSrc = audioData.data[0].location;
            mediaTitle = audioData.data[0].title.en;
        }
        const { closeAudioBookDialog } = this.props;

        return (
            <div className="audiodropdown" ref={node => this.node = node} onBlur={()=> this.handleClick()}>
                <div style={{ padding: '15px' }}>
                    <h2 style={{ float: "left", color: '#3298B5' }}>Audio Book</h2>
                    <span onClick={this.props.closeAudioBookDialog()} style={{ cursor: "pointer", float: "right", color: "#000000", fontWeight: "bold" }}>{closeIcon}</span>
                </div>
                <figure>
                    <figcaption style={{ padding: '10px' }}>{mediaTitle}</figcaption>
                    <audio
                        controls
                        controlsList="nodownload"
                        src={mediaSrc}>
                        Your browser does not support the
                        <code>audio</code> element.
                    </audio>
                </figure>
                <div style={{ backgroundColor: "#F1F1F1", display: "flow-root" }}>
                    {
                        // !hasReviewerRole() &&
                        <button onClick={() => this.openConfirmationBox()} style={{ float: "right", margin: "10px" }} className="audioRemoveButton audioRemoveRound">Remove</button>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("state.audioReducer.audioData,",state.audioReducer.audioData)
    return {
        audioData: state.audioReducer.audioData,
    }
}

const mapActionToProps = {
    deleteAudioNarrationForContainer,
    showAudioRemovePopup
}

export default connect(mapStateToProps, mapActionToProps)(OpenAudioBook)