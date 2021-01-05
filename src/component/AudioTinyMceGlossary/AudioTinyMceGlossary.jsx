import React from 'react';
import { connect } from 'react-redux';
import { audioNarration, audioNarrationEnable } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioTinyMceGlossary/AudioTinyMceGlossary.css';

const AudioTinyMceGlossary = (props) => {
    return (
        <>
            {
                (props.addAudio) &&
                <div className="">
                    <div className='audio-icon'  title="Audio Tag" onClick={() => props.handleAudioToggle()}>
                        {audioNarration}
                    </div>
                </div>
            }

            {
                 (props.openAudio) &&
                 <div className="">
                     <div className='audio-icon' title="Audio Tag" onClick={() => props.handleAudioOpenToggle()}>
                         {audioNarrationEnable}
                     </div>
                 </div>
            }

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        addAudio: state.audioReducer.addAudio,
        openAudio: state.audioReducer.openAudio
    }
}

const mapActionToProps = {}

export default connect(mapStateToProps, mapActionToProps)(AudioTinyMceGlossary);
