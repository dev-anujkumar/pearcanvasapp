/**
* Root Component of Glossary Footnote Component.
*/
import React from 'react';
import GlossaryFootnotePopup from "./GlossaryFootnotePopup.jsx";
import PropTypes from 'prop-types'
import { saveGlossaryAndFootnote } from "./GlossaryFootnote_Actions.js"
import { ShowLoader } from '../../constants/IFrameMessageTypes';
import { sendDataToIframe } from '../../constants/utility.js';

/**
* @description - GlossaryFootnoteMenu is a class based component. It is defined simply
* to make a skeleton of Glossary and Footnote.
*/
class GlossaryFootnoteMenu extends React.Component {
    constructor(props) {
        super(props);
        //context=this;
        this.wrapperRef = null;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            /** Case - event target is not even wiris modal */
            if (!(document.querySelector('.wrs_modal_dialogContainer:not(.wrs_closed)') && document.querySelector('.wrs_modal_dialogContainer:not(.wrs_closed)').contains(event.target))) {
                this.saveContent()
            }
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        //this.setWrapperRef(this);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
      * Set the wrapper ref
      */
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }


    render() {
        const { showGlossaaryFootnote, glossaryFootnoteValue, glossaryFootNoteCurrentValue } = this.props;
        console.table(glossaryFootnoteValue);
        return (
            <div>
                <GlossaryFootnotePopup setWrapperRef={this.setWrapperRef} showGlossaaryFootnote={showGlossaaryFootnote} glossaryFootnoteValue={glossaryFootnoteValue} closePopup={this.closePopup} saveContent={this.saveContent} glossaryFootNoteCurrentValue={glossaryFootNoteCurrentValue} />
            </div>
        )
    }


    /**
    * @description - This function is to close the Glossary and Footnote Popup.
    * @param {event} 
    */
    closePopup = () => {
        this.props.showGlossaaryFootnote(false);
    }

    /**
     * Checks difference in glossary/footnote data
     */
    glossaryFootnoteDifference = (newTerm, newDef, oldTerm, oldDef, type) => {
        switch(type){
            case "glossary":
                if(newTerm !== oldTerm ||
                    newDef !== oldDef){
                        return true
                    }
                return false
            case "footnote":
                if(newDef !== oldDef){
                    return true
                }
                return false
        }
    }
    /**
    * @description - This function is to save the Content of Glossary and Footnote.
    * @param {event} 
    */
    saveContent = () => {
        const { glossaryFootnoteValue } = this.props;
        let { elementWorkId, elementType, glossaryfootnoteid, type, elementSubType} = glossaryFootnoteValue;
        let term = null;
        let definition = null;
        term = document.querySelector('#glossary-editor > div > p') && `${document.querySelector('#glossary-editor > div > p').innerHTML}` || "<p></p>"
        definition = document.querySelector('#glossary-editor-attacher > div > p') && `${document.querySelector('#glossary-editor-attacher > div > p').innerHTML}` || "<p></p>"
        term = term.match(/<p>/g) ? term : `<p>${term}</p>`
        definition = definition.match(/<p>/g) ? definition : `<p>${definition}</p>`
        if(this.glossaryFootnoteDifference(term, definition, this.props.glossaryFootNoteCurrentValue.glossaryContentText, this.props.glossaryFootNoteCurrentValue.footnoteContentText, glossaryFootnoteValue.type.toLowerCase())){
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
            saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType)
        }
        this.props.showGlossaaryFootnote(false);
    }
}

GlossaryFootnoteMenu.defaultProps = {
    glossaryFootnote: "Glossary"
}

GlossaryFootnoteMenu.propTypes = {
    /** Glossary or Footnote Popup to be rendered */
    glossaryFootnote: PropTypes.string,
    /** Handler to close popup on cancel button click */
    closePopup: PropTypes.func,
    /** Handler to save content of popup on save button click */
    saveContent: PropTypes.func
}

export default GlossaryFootnoteMenu;