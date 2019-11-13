/**
* GlossaryFootnotePopup UI Component.
*/

import React, { Component } from 'react';
import Button from '../ElementButtons/ElementButton.jsx';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';
import ReactEditor from "../tinyMceGlossaryFootnoteEditor"

class GlossaryFootnotePopup extends Component {
    constructor() {
        super();
        this.state = {}

    }

    render() {
        const { glossaryFootnoteValue, closePopup, saveContent } = this.props;
        const glossaryFootnote = glossaryFootnoteValue.type;
        let id = glossaryFootnote === 'Glossary' ? 'glossary-1' : 'footnote-0';

        return (
            <div className="glossary-toolbar-wrapper">
                <div className="glossary-header">
                    <div className="glossary-title">
                        <Button type="close-container" onClick={saveContent} />
                        <div className="glossary-label">{glossaryFootnote}</div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div id="toolbarGlossaryFootnote"></div>
                <div className="glossary-body">
                    <div id="glossary-toolbar"></div>
                    {
                        (glossaryFootnote === 'Glossary') &&
                        <div className="glossary-word-header">
                            <div className="glossary-word-title">Term:</div>
                            <div className="glossary-word-name glossary-word-description" id='glossary-editor'>
                                <ReactEditor glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue} className='definition-editor place-holder' placeholder="Type Something" id='glossary-0' />
                            </div>
                        </div>
                    }
                    <div className="glossary-definition-header">
                        <div className="glossary-definition-label">{(glossaryFootnote === 'Glossary') ? 'Definition:' : 'Note:'}</div>
                        <div className="glossary-editor glossary-definition-description" id="glossary-editor-attacher">
                            <ReactEditor glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue} className='definition-editor place-holder' placeholder="Type Something" id={id} />
                        </div>
                    </div>
                    <div className="glossary-definition-buttons">
                        <span className="glossary-cancel-button" onClick={closePopup}>Cancel</span>
                        <span className="glossary-save-button" onClick={saveContent}>Save</span>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        for (let i = tinymce.editors.length - 1; i > -1; i--) {
            let ed_id = tinymce.editors[i].id;
            if (ed_id.includes('glossary') || ed_id.includes('footnote')) {
                tinymce.remove(`#${ed_id}`)
            }
        }
    }
}

export default GlossaryFootnotePopup;