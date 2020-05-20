import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

import buttonTypes from './ButtonTypes.js'

import { 
    workedExampleIcon,
    sectionBreakElement, 
    assessmentIcon, 
    openerElement, 
    noteFlag , 
    tcmIcon, 
    addNote, 
    textIcon, 
    imageIcon, 
    interativeIcon, 
    audioIcon, 
    containerIcon, 
    lockIcon,
    metaDataAnchor,
    elmCloseWindowIcon,
    elmAssessmentItem,
    feedbackIcon,
    assessmentCloseWindowIcon,
    citationElement,
    stanzaIcon,
    blockTextIcon,
    tableElemIcon
} from '../../images/ElementButtons/ElementButtons.jsx';
import deleteIcon from '../../images/ElementButtons/deleteIcon.png'
import forwardNavActive from '../../images/ElementButtons/forwardNavActive.png'
import forwardNavDisable from '../../images/ElementButtons/forwardNav_disabled.png';
import backwardNavActive from '../../images/ElementButtons/backwardNavActive.png'
import backwardNavDisable from '../../images/ElementButtons/backwardNav_disabled.png';
import splitIcon from '../../images/ElementButtons/splitIcon.png'
import expandIcon from '../../images/ElementButtons/expandIcon.png'
import colorPalette from '../../images/ElementButtons/colorPalette.png'
import colorText from '../../images/ElementButtons/colorText.svg'
import closeContainer from '../../images/ElementButtons/container_close.png';
import ButtonTypes from './ButtonTypes.js';

class ElementButton extends Component {
   
  /**
  * Responsible for rendering Button component according to the props received
  * @param type type of button
  * @param clickHandlerFn Handler method to be called on click event
  *  
  */
    renderButton = (type, clickHandlerFn, btnClassName = '') => {
        let buttonJSX = null
        const { labelText,elementId } = this.props
        switch(type){
            case buttonTypes.CLOSE_CONTAINER:
                buttonJSX = <span className="btn-element close-container"  onClick={clickHandlerFn}><img src={closeContainer} /></span>
                break;
            case buttonTypes.ADD_COMMENT:
                buttonJSX = <span className={`btn-element small add-comment ${btnClassName}`} title="note" onClick={clickHandlerFn}>
                    {addNote}
                    </span>
                break;
            case buttonTypes.COMMENT_FLAG:
                buttonJSX = <span className="btn-element small flag-icon" title="flag" onClick={()=>clickHandlerFn(elementId)}>
                    {noteFlag}
                    </span>
                break;
            case buttonTypes.ELEMENT_BLOCK_LABEL:
                buttonJSX = <span className={`btn-element element-label ${btnClassName}`} onClick={clickHandlerFn}>{labelText}</span>
                break;
            case buttonTypes.DELETE_ELEMENT:
                buttonJSX = <span className="btn-element delete-icon" onClick={clickHandlerFn}>
                    <img src={deleteIcon} /></span>
                break;
            case buttonTypes.TCM:
                buttonJSX = <span className="btn-element small tcm-icon" title="Track Changes" onClick={clickHandlerFn}>
                    {tcmIcon}
                    </span>
                break;
            case buttonTypes.FORWARD_NAVIGATION:
                buttonJSX = <span className="btn-element forward-nav-active" onClick={clickHandlerFn}><img src={forwardNavActive} /></span>
                break;
            case buttonTypes.FORWARD_NAVIGATION_DISABLE:
                buttonJSX = <span className="btn-element forward-nav-disable" onClick={clickHandlerFn}><img src={forwardNavDisable} /></span>
                break;
            case buttonTypes.BACKWARD_NAVIGATION:
                buttonJSX = <span className="btn-element backward-nav-active" onClick={clickHandlerFn}><img src={backwardNavActive} /></span>
                break;
            case buttonTypes.BACKWARD_NAVIGATION_DISABLE:
                buttonJSX = <span className="btn-element backward-nav-disable" onClick={clickHandlerFn}><img src={backwardNavDisable} /></span>
                break;
            case buttonTypes.EXPAND:
                buttonJSX = <span className="btn-element expand-icon" onClick={clickHandlerFn}><img src={expandIcon} /></span>
                break;
            case buttonTypes.SPLIT_SLATE:
                buttonJSX = <span className="btn-element split-icon" onClick={clickHandlerFn}><img src={splitIcon} /></span>
                break;
            case buttonTypes.COLOR_PALETTE:
                buttonJSX = <span className="btn-element color-palette" onClick={clickHandlerFn}><img src={colorPalette} /></span>
                break;
            case buttonTypes.COLOR_TEXT:
                buttonJSX = <span className="btn-element color-text" onClick={clickHandlerFn}><img src={colorText} /></span>
                break;
            case buttonTypes.TEXT_ELEMENT:
                buttonJSX = <span className="btn-element text-elem" onClick={clickHandlerFn}>
                    {textIcon}
                    </span>
                break;
            case buttonTypes.IMAGE_ELEMENT:
                buttonJSX = <span className="btn-element image-elem" onClick={clickHandlerFn}>
                    {imageIcon}
                    </span>
                break;
            case buttonTypes.AUDIO_ELEMENT:
                buttonJSX = <span className="btn-element audio-elem" onClick={clickHandlerFn}>
                    {audioIcon}
                    </span>
                break;
            case buttonTypes.INTERACTIVE_ELEMENT:                
                buttonJSX = <span className="btn-element interactive-elem-button" onClick={clickHandlerFn}>
                    {interativeIcon}
                    </span>
                break;
            case buttonTypes.CONTAINER_ELEMENT:
                buttonJSX = <span className="btn-element container-elem-button" onClick={clickHandlerFn}>
                    {containerIcon}
                    </span>
                break;
            case buttonTypes.WORKED_EXAMPLE_ELEMENT:
                buttonJSX = <span className="btn-element worked-exp-elem" onClick={clickHandlerFn}>
                    {workedExampleIcon}
                    </span>
                break;
            case buttonTypes.ASSESSMENT_ELEMENT:
                buttonJSX = <span className="btn-element assessment-elem" onClick={clickHandlerFn}>
                    {assessmentIcon}
                    </span>
                break;
            case buttonTypes.OPENER_ELEMENT:
                buttonJSX = <span className="btn-element opener-elem" onClick={clickHandlerFn}>
                    {openerElement}
                    </span>
                break;
            case buttonTypes.SECTION_BREAK_ELEMENT:
                buttonJSX = <span className="btn-element section-break-elem" onClick={clickHandlerFn}>
                    {sectionBreakElement}
                    </span>
                break;
            case buttonTypes.LOCK:
                buttonJSX = <span className="btn-element lock-icon">
                    {lockIcon}
                    </span>
                break;
            case buttonTypes.METADATA_ANCHOR:
                buttonJSX = <span className="btn-element metadata-anchor" onClick={clickHandlerFn}>
                    {metaDataAnchor}
                    </span>
                break;
            case ButtonTypes.ELM_CLOSE_WINDOW:
                buttonJSX = <span className="" onClick={clickHandlerFn}>
                    {elmCloseWindowIcon}
                </span>
                break;
            case ButtonTypes.ASSESSMENT_CLOSE_WINDOW:
                buttonJSX = <span className="" onClick={clickHandlerFn}>
                    {assessmentCloseWindowIcon}
                </span>
                break;
            case ButtonTypes.ELM_ASSESSMENT_ITEM:
                buttonJSX = <span className="" onClick={clickHandlerFn}>
                    {elmAssessmentItem}
                </span>
                break;
            case ButtonTypes.FEEDBACK:
                buttonJSX = <span className={`btn-element small feedback ${btnClassName}`} title="feedback" onClick={clickHandlerFn}>
                    {feedbackIcon}
                </span>
                break;
            case ButtonTypes.CITATION_ELEMENT:
                buttonJSX = <span className="btn-element citation-elem" onClick={clickHandlerFn}>
                    {citationElement}
                </span>
                break;
            case buttonTypes.BLOCK_TEXT:
                buttonJSX = <span className="btn-element block-text-button" onClick={clickHandlerFn}>
                    {blockTextIcon}
                </span>
                break;
            case buttonTypes.STANZA_ELEMENT:
                buttonJSX = <span className="btn-element stanza-elem" onClick={clickHandlerFn}>
                    {stanzaIcon}
                </span>
                break;
            case buttonTypes.TABLE_EDITOR:
                buttonJSX = <span className="btn-element table-editor-elem" onClick={clickHandlerFn}>
                    {tableElemIcon}
                </span>
        }
        return buttonJSX
    }
    
    render() {
        const { type, onClick, btnClassName } = this.props
        
        return(
            <>
                {this.renderButton(type, onClick, btnClassName)}             
            </>
        )
    }
}

ElementButton.defaultProps = {
    type: "expand",
    labelText: "P"
}

ElementButton.propTypes = {
    /** Type of button to be rendered */
    type : PropTypes.string.isRequired,
    /** Handler to attach on button click */
    onClick : PropTypes.func,
    /** Required in case of 'element-label' type of button */
    labelText : PropTypes.string,
    /**custom classname for the button component */
    btnClassName : PropTypes.string
}

ElementButton.displayName = 'ElementButton'

export default ElementButton
