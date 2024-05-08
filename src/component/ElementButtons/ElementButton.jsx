import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../../styles/ElementButtons/ElementButton.css'

import buttonTypes from './ButtonTypes.js'
import Tooltip from '../Tooltip';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import {
    stageDirectionIcon,
    dialougeElementIcon,
    workedExampleIcon,
    sectionBreakElement,
    assessmentIcon,
    openerElement,
    tcmIcon,
    editInCypressPlus,
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
    tableElemIcon,
    multiColumnContainer,
    elmInteractiveIcon,
    editIcon,
    approvedIcon,
    commentFlagged,
    closeIcon
} from '../../images/ElementButtons/ElementButtons.jsx';
import deleteIcon from '../../images/ElementButtons/deleteIcon.png'
import splitIcon from '../../images/ElementButtons/splitIcon.png'
import expandIcon from '../../images/ElementButtons/expandIcon.png'
import colorPalette from '../../images/ElementButtons/colorPalette.png'
import colorText from '../../images/ElementButtons/colorText.svg'
import add2 from '../../images/ElementButtons/add2.svg'
import Shape from '../../images/ElementButtons/Shape.svg'
import closeContainer from '../../images/ElementButtons/container_close.png';
import pasteIcon from '../../images/ElementButtons/contentPaste.png'
import powerPasteIcon from '../../images/ElementButtons/powerPaste.png'
import ButtonTypes from './ButtonTypes.js';
import alfrescoMetadata from '../../images/ElementButtons/alfrescoMetadata.png';
import tabIcon from '../../images/ElementButtons/tabIcon.png'
import ElementConstants from '../ElementContainer/ElementConstants';
import blureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import { IN_PROGRESS_IMPORT_STATUS } from '../SlateWrapper/SlateWrapperConstants.js';
import { AIChatBox2 } from '../../images/TinyMce/TinyMce.jsx';
class ElementButton extends Component {

  /**
  * Responsible for rendering Button component according to the props received
  * @param type type of button
  * @param clickHandlerFn Handler method to be called on click event
  *
  */
    renderButton = (type, clickHandlerFn, elementType, btnClassName = '', isButtonDisabled = false) => {
        let buttonJSX = null
        const elementTypeClassName = (elementType === ElementConstants.BLOCK_LIST) ? elementType : '';
        const { labelText,elementId,isSubscribersSlate, isgreyBorder, importStatus } = this.props;
        const isBorderOff = isgreyBorder ? "greyElementTag" : "";
        switch(type){
            case buttonTypes.CLOSE_CONTAINER:
                buttonJSX = <span className="btn-element close-container"  onClick={clickHandlerFn}><img src={closeContainer} /></span>
                break;
            case buttonTypes.ADD_COMMENT:
                buttonJSX = <div className='add-comment-btn'>
                    <Tooltip direction='comment' tooltipText="Add Comment">
                        <span className={`btn-element small add-comment ${btnClassName} ${(isSubscribersSlate || (importStatus === IN_PROGRESS_IMPORT_STATUS))  ? 'subscriberSlate' : ''} ${elementTypeClassName}`}
                         onClick={clickHandlerFn}>
                            <img src={add2} />
                        </span>
                    </Tooltip>
                </div>
                break;
            case buttonTypes.EDIT_BUTTON_CYPRESSSPLUS:
                buttonJSX = <Tooltip direction='picker' tooltipText="Edit in Cypress+">
                    <span className={`btn-element small ${btnClassName} cypress-plus ${isSubscribersSlate ? 'subscriberSlate' : ''} ${elementTypeClassName}`}
                     onClick={clickHandlerFn}>
                    {editInCypressPlus}
                </span></Tooltip>
                break;
            case buttonTypes.VIEW_COMMENT:
                buttonJSX = <div className='view-comment-btn'>
                    <Tooltip direction='view-comment' tooltipText="Go To Comment">
                        <span className={`btn-element small add-comment ${btnClassName} ${elementTypeClassName}`} onClick={(e) => clickHandlerFn(e, elementId)}>
                            <img src={Shape} />
                        </span>
                    </Tooltip>
                </div>
                break;
            case buttonTypes.ELEMENT_BLOCK_LABEL:
                buttonJSX = <span className={`btn-element element-label ${isBorderOff} ${btnClassName} ${elementTypeClassName}`}
                onContextMenu={this.props.copyContext} onClick={clickHandlerFn}>{labelText}</span>
                break;
            case buttonTypes.DELETE_ELEMENT:
                buttonJSX = isButtonDisabled ? <span className={`btn-element delete-icon ${elementTypeClassName} icon-disabled`} > <img src={blureDeleteIcon} /></span>
                : <span className={`btn-element delete-icon ${elementTypeClassName}`} onClick={clickHandlerFn}> <img src={deleteIcon} /></span>
                break;
            case buttonTypes.TCM:
                buttonJSX = <span className={`btn-element small tcm-icon ${btnClassName}`} title="Track Changes" onClick={clickHandlerFn}>
                    {tcmIcon}
                    </span>
                break;
            case buttonTypes.EXPAND:
                buttonJSX = <span className="btn-element expand-icon" onClick={clickHandlerFn}><img src={expandIcon} /></span>
                break;
            case buttonTypes.SPLIT_SLATE:
                buttonJSX = <span className="btn-element split-icon" onClick={clickHandlerFn}><img src={splitIcon} /></span>
                break;
            case buttonTypes.COLOR_PALETTE:
                buttonJSX = <span className={`btn-element color-palette`} onClick={clickHandlerFn}><img src={colorPalette} /></span>
                break;
            case buttonTypes.COLOR_TEXT:
                buttonJSX = <span className={`btn-element color-text`} onClick={clickHandlerFn}><img src={colorText} /></span>
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
                buttonJSX = <span className={`btn-element small feedback ${btnClassName} ${isSubscribersSlate ? 'subscriberSlate' :''}`} title="feedback" onClick={clickHandlerFn}>
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
                break;
            case buttonTypes.MULTI_COLUMN_CONTAINER:
                buttonJSX = <span className="btn-element multi-column-group" onClick={clickHandlerFn}>
                    {multiColumnContainer}
                </span>
                break;
            case buttonTypes.TABBED_TAB:
                buttonJSX = <span className="btn-element multi-column-group-tabbed-tab" onClick={clickHandlerFn}>
                    <img src={tabIcon} />
                </span>
                break;
            case ButtonTypes.ELM_INTERACTIVE_ICON:
                buttonJSX = <span className="" onClick={clickHandlerFn}>
                    {elmInteractiveIcon}
                </span>
                break;
            case ButtonTypes.EDIT_BUTTON:
                buttonJSX = <span className={`btn-element small edit-button ${btnClassName} ${isSubscribersSlate ? 'subscriberSlate' :''}`} title="edit" onClick={clickHandlerFn}>
                    {editIcon}
                </span>
                break;
            case ButtonTypes.EDIT_TE_BUTTON:
                buttonJSX = <div  className='te-btn'>
                <Tooltip className='tooltip te-btn' direction='picker-for-table' tooltipText="Edit Alfresco Metadata">
                <span className={`btn-element small edit-button ${btnClassName} ${isSubscribersSlate ? 'subscriberSlate' :''}`}
                 title="" onClick={clickHandlerFn}> {editIcon} </span>
                </Tooltip>
                </div>
                break;
            case ButtonTypes.APPROVE_TICK_ICON:
                buttonJSX = <span className={`btn-element small approve-icon ${btnClassName}`} onClick={clickHandlerFn}>
                    {approvedIcon}
                </span>
                break;
            case ButtonTypes.PASTE:
                buttonJSX = <span className="btn-element paste-icon" onClick={clickHandlerFn}><img src={pasteIcon} /></span>
                break;
            case ButtonTypes.POWERPASTE:
                buttonJSX = <span className="btn-element power-paste-icon" onClick={clickHandlerFn}><img src={powerPasteIcon} /></span>
                break;
            case "ai-gen-icon":
                buttonJSX = <span className="btn-element power-paste-icon ai-gen-icon " onClick={clickHandlerFn}>
                    {/* <AutoAwesomeOutlinedIcon 
                    style={{backgroundColor:'blue', color: 'white', borderRadius:'50%'}} 
                    />  */opw
                    {AIChatBox2}
                </span>
                break;
            case ButtonTypes.ALFRESCO_METADATA:
                buttonJSX = <span className= {`btn-element alfresco-metadata-icon  ${isSubscribersSlate ? 'subscriberSlate' :''} ${btnClassName}`}
                 onClick={clickHandlerFn} title="Expand in Alfresco" ><img src={alfrescoMetadata} /></span>
                break;
            case ButtonTypes.ALFRESCO_TE_METADATA:
                buttonJSX = <div  className='expand-te-btn'>
                <Tooltip direction='picker-for-table' tooltipText="Expand in Alfresco">
                <span className= {`btn-element alfresco-metadata-icon  ${isSubscribersSlate ? 'subscriberSlate' :''} ${btnClassName}`}
                 onClick={clickHandlerFn} title="" ><img src={alfrescoMetadata} /></span>
                </Tooltip>
                </div>
                break;
            case ButtonTypes.STAGE_DIRECTION:
                buttonJSX = <span className={`btn-element text-elem`} onClick={clickHandlerFn}>
                    {stageDirectionIcon}
                </span>
                break;
            case ButtonTypes.DIALOGUE_ELEMENT:
                buttonJSX = <span className={`btn-element text-elem`} onClick={clickHandlerFn}>
                    {dialougeElementIcon}
                </span>
                break;
            case buttonTypes.ELEMENT_LABEL_CLICKABLE:
                buttonJSX = <span className={`btn-element element-label-clickable-button ${isBorderOff} ${btnClassName}`} onClick={clickHandlerFn}>{labelText}</span>
                break;
            case buttonTypes.COMMENT_FLAGGED:
                buttonJSX = <div className='flag-te-btn'>
                    <Tooltip direction='flag' tooltipText="Flagged Comment">
                        <span className={`btn-element small flag-comment ${btnClassName} ${elementTypeClassName}`} onClick={(e) => clickHandlerFn(e, elementId)}>
                            {commentFlagged}
                        </span>
                    </Tooltip>
                </div>
               break;
            case ButtonTypes.TOAST_CLOSE_ICON:
                buttonJSX = <div className={`toast-close-icon`} onClick={clickHandlerFn}>
                    {closeIcon}
                </div>
                break;
        }
        return buttonJSX
    }

    render() {
        const { type, onClick, btnClassName, elementType, isButtonDisabled } = this.props

        return(
            <>
                {this.renderButton(type, onClick, elementType, btnClassName, isButtonDisabled )}
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
