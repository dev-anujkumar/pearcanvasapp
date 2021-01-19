import React from 'react';
import { connect } from 'react-redux';
import { audioNarration, audioNarrationEnable } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioTinyMceGlossary/AudioTinyMceGlossary.css';

const AudioTinyMceGlossary = (props) => {
    return (
        <>
            {
                props.glossaryFootnoteValue && (!props.addAudioGlossaryPopup) &&
                <div className='audio-icon' title="Audio Tag" id= 'audioNarration' onClick={() => props.handleAudioToggle()}>
                    {audioNarration}
                </div>
            }

            {
                props.addAudioGlossaryPopup &&
                <div className='audio-icon' title="Audio Tag" id='audioNarrationEnable'>
                    {audioNarrationEnable}
                </div>
            }

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        glossaryFootnoteValue: state.glossaryFootnoteReducer.glossaryFootnoteValue.popUpStatus,
        openAudioGlossaryPopup: state.audioReducer.openAudioGlossaryPopup,
        addAudioGlossaryPopup: state.audioReducer.addAudioGlossaryPopup
    }
}

const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(AudioTinyMceGlossary);
