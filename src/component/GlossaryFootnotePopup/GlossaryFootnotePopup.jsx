/**
* GlossaryFootnotePopup UI Component.
*/

import React, { Component } from 'react';
import Button from '../ElementButtons/ElementButton';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';
import  ReactEditor  from "../tinyMceGlossaryFootnoteEditor"

class GlossaryFootnotePopup extends Component {
    constructor(){
        super();
        this.state={}

    }
    componentDidMount() {

        // uncomment to run Canvas Stabilization app as stand alone app //
      // this.props.fetchSlateData(this.state.activeSlate);
    //    if(document.getElementById("glossary-0")){
    //        document.getElementById("glossary-0").focus();
    //    }
    }

    render() {
         const { glossaryFootnote ,closePopup , saveContent} = this.props;
         let index = glossaryFootnote === 'Glossary'? "1" : "0"
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
                    {glossaryFootnote === 'Glossary' && 
                    <div className="glossary-word-header">
                        <div className="glossary-word-title">Term:</div>
                        <div className="glossary-word-name glossary-word-description" id='glossary-editor'>
                            <ReactEditor className='definition-editor' placeholder="Type Something" index="0"/>
                        </div>

                    </div>
                    }
                    <div className="glossary-definition-header">
                        <div className="glossary-definition-label">{glossaryFootnote === 'Glossary'?'Definition:':'Note:'}</div>
                        <div className="glossary-editor glossary-definition-description" id="glossary-editor-attacher">
                            <ReactEditor className='definition-editor' placeholder="Type Something" index={index} />
                        </div>
                    </div>
                    <div className="glossary-definition-buttons">
                        <span className="glossary-cancel-button" onClick={closePopup}>Cancel</span>
                        <span className="glossary-save-button"  onClick={saveContent}>Save</span>
                    </div>
                </div>
            </div>

        )
    }
}

export default GlossaryFootnotePopup;