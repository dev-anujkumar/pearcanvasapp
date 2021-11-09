import React from 'react';
import { connect } from 'react-redux';
import { imageIcon } from '../../images/ElementButtons/ElementButtons.jsx'
import './../../styles/ElementFigure/ElementFigure.css';

const FigureTinyMceGlossary = (props) => {
    
    return (
        <>
            {
                props.glossaryFootnoteValue && (!props.addfigureGlossarypopup) &&
                <div className='audio-icon' title="Image Tag" id= 'audioNarration' onClick={props.handleFigureToggle}>
                    {imageIcon}
                </div>
            }

            {
                props.addfigureGlossarypopup &&
                <div className='figure-glossary-icon' title="Image Tag" id='audioNarrationEnable'>
                    {imageIcon}
                </div>
            }

        </>
    );
}

const mapStateToProps = (state) => {
    return {
        glossaryFootnoteValue: state.glossaryFootnoteReducer.glossaryFootnoteValue.popUpStatus,
        addfigureGlossarypopup:state.appStore.addfigureGlossarypopup
    }
}

export default connect(mapStateToProps)(FigureTinyMceGlossary);
