import React, { Component } from 'react';
import '../../styles/GlossaryFootnotePopup/GlossaryFootnotePopup.css';
import PropTypes from 'prop-types'

class GlossaryFootnotePopup extends Component {
    constructor(props) {
        super(props);
        this.state ={}
       
    }
    render() {
         const { glossaryFootnote , onClick} = this.props
        return (

            <div className="glossary-toolbar-wrapper">
                <div className="glossary-header">
                    <div className="glossary-title">
                        <div className="glossary-remove" onClick={onClick}></div>
                        <div className="glossary-label">{glossaryFootnote}</div>
                        <div className="clr"></div>
                    </div>
                </div>
                <div className="glossary-body">
                    <div id="glossary-toolbar"></div>
                    {glossaryFootnote === 'Glossary' && 
                    <div className="glossary-word-header">
                        <div className="glossary-word-title">Term:</div>
                        <div className="glossary-word-name glossary-word-description" id='glossary-editor'>
                            <input type="text" id='glossary-editor-textarea' placeholder="Type Something"/>
                        </div>

                    </div>
                    }
                    <div className="glossary-definition-header">
                        <div className="glossary-definition-label">{glossaryFootnote === 'Glossary'?'Definition:':'Note:'}</div>
                        <div className="glossary-editor glossary-definition-description" id="glossary-editor-attacher">
                            <input type="text" id='glossary-editor-textarea' placeholder="Type Something"/>
                        </div>
                    </div>
                    <div className="glossary-definition-buttons">
                        <span className="glossary-cancel-button" onClick={onClick}>Cancel</span>
                        <span className="glossary-save-button"  onClick={onClick}>Save</span>
                    </div>
                </div>
            </div>

        )
    }
}
GlossaryFootnotePopup.defaultProps = {
    glossaryFootnote: "Glossary"
}

GlossaryFootnotePopup.propTypes = {
      /** Glossary or Footnote Popup to be rendered */
      glossaryFootnote : PropTypes.string,
       /** Handler to attach on button click */
      onClick: PropTypes.func
}

export default GlossaryFootnotePopup;