// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"

// // IMPORT - Assets //
import './../../styles/ElementAudioVideo/ElementAudioVideo.css';

/*** @description - ElementAudioVideo is a class based component. It is defined simply to make a skeleton of the audio-video-type element ***/

export class ElementAudioVideo extends Component {
    constructor(props) {
        super(props);
    }


    onFocus = () => {
        console.log("onFocus")
    }
    onKeyup = () => {
        console.log("onKeyup")
    }
    onBlur = () => {
        console.log("onBlur")
    }
    onClick = () => {
        console.log("onClick")
    }
    /*** @description - This function is for handling the Audio-Video-element.
     * @param model object that defined the type of element*/

    renderAudioVideoType = (model = {}) => {
        var audioVideoJSX;
        switch (model.figuretype) {
            case 'audio':
                /**JSX for Audio-type element*/
                audioVideoJSX = <div className="divAudio">
                    <figure className="figureAudio"  >
                        {/* <header className="figureHeader">
                            <h4 className="heading4AudioNumberLabel" id="audio-header" >
                                <TinyMceEditor />
                            </h4>
                            <h4 className="heading4AudioTitle" >
                                <TinyMceEditor />
                            </h4>
                        </header> */}
                        <header className="figureHeader">

                            <TinyMceEditor placeholder="Enter Label..." tagName={'h4'} className="heading4AudioNumberLabel figureLabel " model={model.html.title} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />

                            <TinyMceEditor placeholder="Enter Title..." tagName={'h4'} className="heading4AudioTitle" model={model.html.subtitle} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />

                        </header>
                        <div><strong>Asset: </strong>{model.assessmentData.asset !== "" ? model.assessmentData.asset : "Asset not defined"}</div>
                        <div className="pearson-component audio" data-type="audio">
                            <audio controls="none" preload="none" className="audio">
                                <source src="" type="audio/mpeg" />
                            </audio>
                        </div>
                        <figcaption className="figcaptionAudio" >
                            <TinyMceEditor placeholder="Enter Caption..." tagName={'p'} className="" model={model.html.caption} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </figcaption>

                    </figure>
                    <div >
                        <TinyMceEditor placeholder="Enter Credit..." tagName={'p'} className="paragraphAudioCredit" model={model.html.credit} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                    </div>
                </div>
                break;
            case 'video':
                /**JSX for Video-type element*/
                audioVideoJSX = <div className="divVideo">
                    <figure className="figureVideo" >
                        {/* <header className="figureHeader">
                            <h4 className="heading4VideoNumberLabel" id="video-header" >
                                <TinyMceEditor />
                            </h4>
                            <h4 className="heading4VideoTitle" >
                                <TinyMceEditor />
                            </h4>
                        </header> */}
                        <header className="figureHeader">
                            <TinyMceEditor placeholder="Enter Label..." tagName={'h4'} className="heading4VideoNumberLabel figureLabel " model={model.html.title} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            <TinyMceEditor placeholder="Enter Title..." tagName={'h4'} className="heading4VideoTitle" model={model.html.subtitle} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </header>
                        <div className="assetDiv"><strong>Asset: </strong>{model.assessmentData.asset !== "" ? model.assessmentData.asset : "Asset not defined"}</div>
                        <div className="pearson-component video" data-type="video" >
                            {/* "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"
                        "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png", */}
                            <video className="video" width="640" height="360" controls="none" preload="none"
                                poster={model.figuredata.path !== "" ? model.figuredata.path : "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png"}
                            >
                                <source src="" />
                                <track src="" kind="subtitles" srcLang="en" label="English" />
                            </video>
                        </div>
                        <figcaption className="figcaptionVideo" >
                            <TinyMceEditor placeholder="Enter Caption..." tagName={'p'} className="" model={model.html.caption} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor placeholder="Enter Credit..." tagName={'p'} className="paragraphVideoCredit" model={model.html.credit} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                    </div>
                </div>
                break;
        }
        return audioVideoJSX;
    }


    render() {
        const { model } = this.props;
        return (
            <div className="figureElement">
                {this.renderAudioVideoType(model)}
            </div>
        );
    }
}



ElementAudioVideo.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementAudioVideo.propTypes = {

    /** Handler to return the type of element based on the figuretype and alignment */
    renderAudioVideoType: PropTypes.func,
    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func

}