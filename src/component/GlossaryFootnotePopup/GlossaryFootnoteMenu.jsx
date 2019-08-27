/**
* Root Component of Glossary Footnote Component.
*/
import React from 'react';
import GlossaryFootnotePopup from "./GlossaryFootnotePopup.jsx";
import PropTypes from 'prop-types'

/**
* @description - GlossaryFootnoteMenu is a class based component. It is defined simply
* to make a skeleton of Glossary and Footnote.
*/
class GlossaryFootnoteMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.closePopup = this.closePopup.bind(this);
        this.saveContent = this.saveContent.bind(this);

    }
    render() {
        const { glossaryFootnote } = this.props;
        return (
            <GlossaryFootnotePopup glossaryFootnote={glossaryFootnote} closePopup={this.closePopup} saveContent={this.saveContent} />
        )
    }

    /**
    * @description - This function is to close the Glossary and Footnote Popup.
    * @param {event} 
    */

    closePopup() {
        //alert("close")
    }

    /**
    * @description - This function is to save the Content of Glossary and Footnote.
    * @param {event} 
    */
    saveContent() {
        //alert("save")
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