// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "../tinyMceEditor"

// // IMPORT - Assets //
import './../../styles/ElementAudioVideo/ElementAudioVideo.css';

/*** @description - ElementAudioVideo is a class based component. It is defined simply to make a skeleton of the audio-video-type element ***/

export class ElementAudioVideo extends Component {
    constructor(props) {
        super(props);
    }

    handleOnClick = () => {
        console.log("audio-video component");
    }

    renderAudioVideoType = (element = {}) => {
        var audioVideoJSX;
        switch (element.figuretype) {
            case 'audio':
                audioVideoJSX = <div className="divAudio">
                    <figure className="figureAudio"  >
                        <header className="figureHeader">
                            <h4 className="heading4AudioNumberLabel" id="audio-header" >
                                <TinyMceEditor />
                            </h4>
                            <h4 className="heading4AudioTitle" >
                                <TinyMceEditor />
                            </h4>
                        </header>
                        <div><strong>Asset: </strong>{element.assessmentData.asset !== "" ? element.assessmentData.asset : "Asset not defined"}</div>
                        <div className="pearson-component audio" data-type="audio" onClick={() => this.handleOnClick()}>
                            <audio controls="none" preload="none" className="audio">
                                <source src="" type="audio/mpeg" />
                            </audio>
                        </div>
                        <figcaption className="figcaptionAudio" >
                            <TinyMceEditor />
                        </figcaption>
                    </figure>
                    <p className="paragraphAudioCredit">
                        <TinyMceEditor />
                    </p>
                </div>
                break;
            case 'video':
                audioVideoJSX = <div className="divVideo">
                    <figure className="figureVideo" >
                        <header className="figureHeader">
                            <h4 className="heading4VideoNumberLabel" id="video-header" >
                                <TinyMceEditor />
                            </h4>
                            <h4 className="heading4VideoTitle" >
                                <TinyMceEditor />
                            </h4>
                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{element.assessmentData.asset !== "" ? element.assessmentData.asset : "Asset not defined"}</div>
                        <div className="pearson-component video" data-type="video" onClick={() => this.handleOnClick()}>
                            {/* "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"
                        "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png", */}
                            <video className="video" width="640" height="360" controls="none" preload="none"
                                poster={element.posterPath !== "" ? element.posterPath : "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"}
                            >
                                <source src="" />
                                <track src="" kind="subtitles" srcLang="en" label="English" />
                            </video>
                        </div>
                        <figcaption className="figcaptionVideo" >
                            <TinyMceEditor />
                        </figcaption>
                    </figure>
                    <p className="paragraphVideoCredit">
                        <TinyMceEditor />
                    </p>
                </div>
                break;

        }
        return audioVideoJSX;
    }


    render() {
        const { element } = this.props;
        return (
            <div className="wrapper">
                <div className="header" id="tinymceToolbar">
                    <h1 >Canvas</h1>
                </div>
                <div className="container">
                    <div className="element-container" >

                        <div className="figureElement">
                            {this.renderAudioVideoType(element)}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



ElementAudioVideo.defaultProps = {
    /** Detail of element in JSON object */
    element: PropTypes.object,

}

ElementAudioVideo.propTypes = {

    /** Handler to attach on element click */
    handleOnClick: PropTypes.func,


}