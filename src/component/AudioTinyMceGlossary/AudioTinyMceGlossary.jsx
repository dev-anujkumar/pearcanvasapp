import React from 'react';
import { audioNarration } from '../../images/TinyMce/TinyMce.jsx'
import '../../styles/AudioTinyMceGlossary/AudioTinyMceGlossary.css';

const AudioTinyMceGlossary = (props) => {
    return (
        <div className="">
            <div className='audio-icon' title="Audio Tag" onClick={() =>props.handleAudioToggle()}>
                {audioNarration}
            </div>
        </div>
    );
}

export default AudioTinyMceGlossary;
