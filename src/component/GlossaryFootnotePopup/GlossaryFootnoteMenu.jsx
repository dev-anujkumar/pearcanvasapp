/**
* Root Component of Glossary Footnote Component.
*/
import React from 'react';
import GlossaryFootnotePopup from "./GlossaryFootnotePopup.jsx";
import PropTypes from 'prop-types'
import { saveGlossaryAndFootnote } from "./GlossaryFootnote_Actions.js"
/**
* @description - GlossaryFootnoteMenu is a class based component. It is defined simply
* to make a skeleton of Glossary and Footnote.
*/
class GlossaryFootnoteMenu extends React.Component {
    constructor(props) {
        super(props);
        //context=this;
        this.wrapperRef=null;
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            /** Case - event target is not even wiris modal */
            if (!document.querySelector('.wrs_modal_dialogContainer:not(.wrs_closed)').contains(event.target)) {
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
    setWrapperRef=(node)=> {
        this.wrapperRef = node;
    }


    render() {
        const { showGlossaaryFootnote, glossaryFootnoteValue } = this.props;
        console.table(glossaryFootnoteValue);
        return (
            <div>
            <GlossaryFootnotePopup setWrapperRef={this.setWrapperRef} showGlossaaryFootnote={showGlossaaryFootnote} glossaryFootnoteValue={glossaryFootnoteValue} closePopup={this.closePopup} saveContent={this.saveContent} />
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
    * @description - This function is to save the Content of Glossary and Footnote.
    * @param {event} 
    */
    saveContent = () => {
        const { glossaryFootnoteValue } = this.props;
        let { elementWorkId, elementType, glossaryfootnoteid, type } = glossaryFootnoteValue;
        let term = null;
        let definition = null;
        term = document.querySelector('#glossary-editor > div > p') && `<p>${document.querySelector('#glossary-editor > div > p').innerHTML}</p>` || null
        definition = document.querySelector('#glossary-editor-attacher > div > p') && `<p>${document.querySelector('#glossary-editor-attacher > div > p').innerHTML}</p>` || null
        saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition)
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