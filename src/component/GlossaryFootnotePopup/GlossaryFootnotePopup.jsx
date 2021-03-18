/**
* GlossaryFootnotePopup UI Component.
*/

import React, { Component } from 'react';
import Button from '../ElementButtons/ElementButton.jsx';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';
import { GLOSSARY } from './../../constants/Element_Constants';
import ReactEditor from "../tinyMceGlossaryFootnoteEditor"
import { checkforToolbarClick } from '../../js/utils'
import { hasReviewerRole } from '../../constants/utility.js'
import { setFormattingToolbar } from './GlossaryFootnote_Actions.js';
import AudioTinyMceGlossary from '../AudioTinyMceGlossary';
import AddAudioBook from '../AudioNarration/AddAudioBook.jsx';

class GlossaryFootnotePopup extends Component {
    constructor() {
        super();
        this.state = {
            audioToggle:false
        }

    }

    handleAudioToggle =() =>{
        this.setState({
            audioToggle:!this.state.audioToggle
        })
    }
    closeAddAudioBook=()=>{
        this.setState({
            audioToggle:false
        })
    }

    toolbarHandling = (e, action = "") => {
        let relatedTargets = (e && e.relatedTarget && e.relatedTarget.classList) ? e.relatedTarget.classList : [];
        if (e && checkforToolbarClick(relatedTargets)) {
            e.stopPropagation();
            return;
        }
        if (e && e.type == 'blur') {
            /** to disable both toolbars on glossary editor blur */
            setFormattingToolbar('disableTinymceToolbar')
            setFormattingToolbar('disableGlossaryFootnoteToolbar')
        }
        if (document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar__primary')) {
            if (action === "add") {
                setFormattingToolbar('disableGlossaryFootnoteToolbar')
            } else if (action === "remove") {
                setFormattingToolbar('disableTinymceToolbar')
                setFormattingToolbar('enableGlossaryFootnoteToolbar')
            }
        }
    }
    

    render() {
        const { glossaryFootnoteValue, closePopup, saveContent,permissions } = this.props;
        const glossaryFootnote = glossaryFootnoteValue.type;
        let id = glossaryFootnote === GLOSSARY ? 'glossary-1' : 'footnote-0';
        let accessToolbar = (permissions && permissions.includes('access_formatting_bar')) ? "" : " disableToolbar"

        return (
            <div ref={this.props.setWrapperRef} className="glossary-toolbar-wrapper">
                <div className="glossary-header">
                    <div className="glossary-title">
                        <Button type="close-container" onClick={saveContent} />
                        <div className="glossary-label">{glossaryFootnote}</div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div id="toolbarGlossaryFootnote"></div>
                {
                    glossaryFootnote === GLOSSARY &&<div className = {'audio-wrapper'+ accessToolbar} id='glossary-audio'><AudioTinyMceGlossary handleAudioToggle={this.handleAudioToggle} /></div>
                }

                {this.state.audioToggle && <AddAudioBook isGlossary={true} closeAddAudioBook={this.closeAddAudioBook}/>}

                <div className="glossary-body">
                    <div id="glossary-toolbar"></div>
                    {
                        (glossaryFootnote === GLOSSARY) &&
                        <div className="glossary-word-header">
                            <div className="glossary-word-title">Term:</div>
                            <div className="glossary-word-name glossary-word-description" id='glossary-editor' onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                                <ReactEditor permissions={this.props.permissions} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue.glossaryContentText} className='definition-editor place-holder' placeholder="Type Something" id='glossary-0' />
                            </div>
                        </div>
                    }
                    <div className="glossary-definition-header">
                        <div className="glossary-definition-label">{(glossaryFootnote === GLOSSARY) ? 'Definition:' : 'Note:'}</div>
                        <div className="glossary-editor glossary-definition-description" id="glossary-editor-attacher" onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                            <ReactEditor permissions={this.props.permissions} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaryFootNoteCurrentValue = {this.props.glossaryFootNoteCurrentValue.footnoteContentText} className='definition-editor place-holder' placeholder="Type Something" id={id} />
                        </div>
                    </div>
                    <div className="glossary-definition-buttons">
                        <span className="glossary-cancel-button" onClick={closePopup}>Cancel</span>
                        <span className="glossary-save-button" disabled={hasReviewerRole('elements_add_remove')} onClick={saveContent}>Save</span>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        
        for (let i = tinymce.editors.length - 1; i > -1; i--) {
            let ed_id = tinymce.editors[i].id;
            if (ed_id.includes('glossary') || ed_id.includes('footnote')) {
                /*
                    change wiris images to avoid converting to mathml
                */
               let tempContainerHtml = tinyMCE.$("#" + ed_id).html();          
               tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
               document.getElementById( ed_id ).innerHTML = tempContainerHtml;
   
                tinymce.remove(`#${ed_id}`)
                tinymce.$('.wrs_modal_desktop').remove();
            }
        }
    }
}

export default GlossaryFootnotePopup;