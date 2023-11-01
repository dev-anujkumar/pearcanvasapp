/**
 * Root Component for Element Picker
 */
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import config from '../../config/config';
import { hasReviewerRole, sendDataToIframe, hasProjectPermission, isSubscriberRole } from '../../constants/utility.js';
import elementTypeConstant, { containerTypeArray } from './ElementSepratorConstants.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import '../../styles/ElementSaprator/ElementSaprator.css'
import ElementContainerType from '../ElementContainerType/ElementContainerType.jsx'
import { getPasteValidated, MANIFEST_LIST } from '../../constants/Element_Constants.js';
import { cloneContainer } from "../SlateWrapper/SlateWrapper_Actions.js";
import { indexOfSectionType } from '../ShowHide/ShowHide_Helper';

const { TEXT, 
    IMAGE, 
    AUDIO, 
    INTERACTIVE, 
    ASSESSMENT, 
    CONTAINER, 
    WORKED_EXP, 
    OPENER, 
    SECTION_BREAK, 
    METADATA_ANCHOR, 
    INTERACTIVE_BUTTON, 
    ELEMENT_ASIDE, 
    POETRY_ELEMENT, 
    CITATION, 
    CITATION_GROUP_ELEMENT, 
    POETRY, 
    STANZA_ELEMENT, 
    CONTAINER_BUTTON, 
    BACK_MATTER, 
    FRONT_MATTER, 
    CONTAINER_INTRO,
    MULTI_COLUMN_CONTAINER,
    MULTI_COLUMN,
    SINGLE_COLUMN,
    BLOCK_TEXT_BUTTON,
    TABLE_EDITOR,
    TOC_PARENT_TYPES,
    SHOW_HIDE,
    POPUP,
    ELEMENT_DISCUSSION,
    HIDE_SPLIT_SLATE_CONTAINER,
    TABBED_TAB,
    TAB
 } = elementTypeConstant

export function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false);
    const [data, setData] = useState([]);
    const [pasteIcon, togglePaste] = useState(true);
    const [showInteractiveOption, setshowInteractiveOption] = useState({status:false,type:""});
    let propsData={data,setData,showInteractiveOption,setshowInteractiveOption,props}
    const { esProps, elementType, sectionBreak, permissions, subtype } = props
    let buttonRef = useRef(null)

    /**
     * @description: This hook is used for handling the outer click, 
     * after mounting the component or update the component state this hook will called
     */
    useEffect(() => {
        document.addEventListener('mousedown', (event) => {
            let elems, dropdown
            elems = getParents(event.target)
            dropdown = 'dropdown'
            if (elems.indexOf(dropdown) === -1) {
                setShowClass(false)
            }
        })

        if(!pasteIcon && props.elementSelection && Object.keys(props.elementSelection).length == 0) {
            togglePaste(true);
        }
    });

    /**
     * @description: This function is responsable for toggle 
     * state to render the dropdown. First close all open dropdowns
     * then open new one
     */
    function toggleElementList(event) {
        event.stopPropagation()
        let openDropdowns = document.getElementsByClassName("show")
        for (let i = 0; i < openDropdowns.length; i++) {
            let openDropdown = openDropdowns[i]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
                // BG-2040 fix
                let openedSeparator = document.getElementsByClassName("opacityClassOn")
                if(openedSeparator && openedSeparator.length){
                    openedSeparator[0].classList.remove('opacityClassOn')
                }
            }
        }
        setShowClass(!showClass)
        setshowInteractiveOption({status:false,type:""})
    }

    /**
     * Get parent nodes of a dom node
     * @param {Element node} elem 
     */
    function getParents(elem) {
        var parents = [];
        for (; elem && elem !== document; elem = elem.parentNode) {
            parents.push(elem.className);
        }
        return parents;
    }

    /**
     * Close dropdown
     */
    function closeDropDown() {
        setShowClass(false);
        setshowInteractiveOption({status:false,type:""})
    }

    /**
     * @description: OnClick handler for split slate button
     */
    const splitSlateClickHandler = () => {
        if(config.savingInProgress) return false
        if(props.openAudio){
            props.showAudioSplitPopup(true , props.index)
        }
        else {
            props.toggleSplitSlatePopup(true, props.index)
        }
    }

    const renderPasteButton = (separatorProps, type) => {
        const allowedRoles = ["admin", "manager", "edit", "default_user"];
        let sourceComp = 'source' in props ? props.source : '';
        let inputType = 'inputType' in props.elementSelection ? props.elementSelection.inputType : '';
        let pasteValidation = getPasteValidated(props, sourceComp, inputType);
        const popupSlateNotAcceptedTypes = ["groupedcontent", "showhide", "popup", 'citations', 'element-citation', 'poetry', 'stanza'];
        let isChildElementNotAcceptedInPopup = false;
        if(config.isPopupSlate && props.elementSelection?.element?.type === 'element-aside'){
            let asideNotAcceptedTypes=['poetry', 'stanza', 'popup', 'showhide', 'groupedcontent'];
            isChildElementNotAcceptedInPopup = asideNotAcceptedTypes.includes(props?.asideData?.type)
        }
        let allowToShowPasteIcon = config.isPopupSlate && popupSlateNotAcceptedTypes.includes(props?.elementSelection?.element?.type) ? false : true;
        if (allowToShowPasteIcon && (allowedRoles.includes(props.userRole) || permissions.includes('cut/copy')) && pasteValidation &&
            !isChildElementNotAcceptedInPopup && separatorProps?.asideData?.parent?.subtype !== TAB && separatorProps?.asideData?.grandParent?.asideData?.parent?.subtype !== TAB) {
            return (
                <div className={`elemDiv-expand paste-button-wrapper ${(type == 'cut' && !pasteIcon) ? 'disabled' : ''}`} onClickCapture={(e) => props.onClickCapture(e)}>
                    <Tooltip direction='paste' tooltipText='Paste element'>
                        <Button type="paste" onClick={() => pasteElement(separatorProps, togglePaste, type)} />
                    </Tooltip>
                </div>
            )
        }
        return null  
    }

    const renderWordPasteButton = (parentElementType, { firstOne, index, userRole, onClickCapture }) => {
        const { parentUrn, asideData } = props
        const inContainer = [POETRY, CITATION_GROUP_ELEMENT]
        const allowedRoles = ["admin", "manager", "edit", "default_user"];
        const parentContainer = ["groupedcontent", "showhide"]
        const parentContainerForShowHide = ["groupedcontent", "element-aside"]
        const hasPasteFromWordPermission = hasProjectPermission("paste_from_word") ;
        let isPasteFromWordBtn = (allowedRoles.includes(userRole) || hasPasteFromWordPermission)
        if (inContainer.includes(parentElementType) || config.isPopupSlate || !isPasteFromWordBtn ||
            (asideData?.type ==='element-aside' && parentContainer.includes(asideData?.parent?.type)) ||
            (asideData?.type === SHOW_HIDE && parentContainerForShowHide.includes(asideData?.grandParent?.asideData?.type)) ||
            (parentUrn?.subtype === TAB) || (asideData?.type === MULTI_COLUMN && asideData?.subtype === TAB)) {
            return null;
        }
        let insertionIndex = firstOne ? index : index + 1

        if(asideData?.type === SHOW_HIDE) {
            const indexs = index?.toString()?.split("-") || [];
            const insertionIndexForShowHide = indexs[indexs?.length - 1];
            insertionIndex = insertionIndexForShowHide
        }
        return (
            <div className={'elemDiv-expand'} onClickCapture={onClickCapture} >
                <Tooltip direction='poc' tooltipText='Paste from Word'>
                    <Button type="powerpaste" onClick={() => props.handleCopyPastePopup(true, insertionIndex, parentUrn, asideData)} />
                </Tooltip>
            </div>
        )
    }
    
    let pasteRender = false;
    let operationType = '';
    if(props.elementSelection && Object.keys(props.elementSelection).length > 0) {
        pasteRender = true;
        operationType = props.elementSelection.operationType || '';
    }
    /** 
     Hide Paste Button for Container Elements when there is BL inside ShowHide
     Note:- This will removed once BL will be supported in AS,WE,2C & 3C 
    */
    if(['element-aside','groupedcontent'].indexOf(props?.asideData?.type) > -1 && props?.elementSelection?.containsBlockList) {
        pasteRender = false;
    }
    /* @hideSplitSlateIcon@ hide split slate icon in following list of elements */
    const hideSplitSlateIcon = !(['element-aside', 'citations', 'poetry', 'group','showhide'].includes(elementType));
    let hideElementSeperator = hasReviewerRole() ? 'hideToolbar' : '';
    return (
        <div className={showClass ? `elementSapratorContainer opacityClassOn ignore-for-drag ${hideElementSeperator}` :
        `elementSapratorContainer ignore-for-drag ${hideElementSeperator}`} id = {props.dataId}>
            <div className='elemDiv-split' onClickCapture={(e) => props.onClickCapture(e)}>
                {permissions && permissions.includes('split_slate') && hideSplitSlateIcon && !config.isPopupSlate && !props.firstOne &&
                !(HIDE_SPLIT_SLATE_CONTAINER.includes(props.setSlateParent)  && config.slateType == CONTAINER_INTRO) ? <Tooltip direction='right' tooltipText='Split Slate'>
                    {permissions && permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button type='split' onClick={splitSlateClickHandler} />} </Tooltip> : ''}
            </div>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            {renderWordPasteButton(elementType, props)}
            {pasteRender ? renderPasteButton(props, operationType) : ''}
            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='picker' tooltipText='Element Picker' showClass={showClass}>
                        {permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button onClick={(event) => toggleElementList(event)}
                        className="dropbtn" type="expand" />}
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData, subtype)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 * Default props for Element Saprator
 */
ElementSaprator.propTypes = {
    esProps: PropTypes.array.isRequired,
    elementType: PropTypes.string
}

/**
 * @description: Rendering the element picker dropdown based on type of Container Element
 */

function renderConditionalButtons(esProps,sectionBreak,elementType,subtype){
    let updatedEsProps = esProps.filter((btnObj) => {        
      let  buttonType = btnObj.buttonType;
        if (elementType == CITATION_GROUP_ELEMENT && sectionBreak) { /** Container : Citation Group |Render Citation Element*/
            return buttonType == CITATION;
        } else if (elementType == POETRY){                           /** Container : Poetry Element |Render Stanza Element*/
            return buttonType === STANZA_ELEMENT;
        }
        else if (elementType === SINGLE_COLUMN && subtype === TAB) { /** Container : Tabbed 2-Column Element*/
            return buttonType === TABBED_TAB;
        }
        else if (elementType == SINGLE_COLUMN) {                     /** Container : C1/C2 in Multi-Column Element*/
            let  MultiColumnPicker = [ TEXT, IMAGE, AUDIO, BLOCK_TEXT_BUTTON, INTERACTIVE_BUTTON, TABLE_EDITOR, ASSESSMENT, CONTAINER_BUTTON, WORKED_EXP ];                  
            if(config.isPopupSlate){
                MultiColumnPicker.length = MultiColumnPicker.length -2;
            }
            return MultiColumnPicker.includes(buttonType);
        } 
        else {
        if (sectionBreak) {                                          /** Container : Other cases in Wored Example*/
            return buttonType !== WORKED_EXP && buttonType !== CONTAINER_BUTTON && buttonType !== OPENER &&  buttonType !== CITATION &&
            buttonType !== STANZA_ELEMENT && buttonType !== POETRY_ELEMENT && buttonType !== MULTI_COLUMN_CONTAINER && buttonType !== TABBED_TAB;
        } else {                                                     /** Container : Aside| Section in WE*/
            return buttonType !== OPENER && buttonType !== SECTION_BREAK && buttonType !== WORKED_EXP && buttonType !== CONTAINER_BUTTON &&
            buttonType !== CITATION && buttonType !== STANZA_ELEMENT && buttonType !== POETRY_ELEMENT && buttonType !== MULTI_COLUMN_CONTAINER && buttonType !== TABBED_TAB;
        }
    }
    })
    return updatedEsProps;
}

/**
 * @description: rendering the dropdown
 */
export function renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData,subtype) {
    let {data,setData,showInteractiveOption,setshowInteractiveOption,props} =propsData
    let updatedEsProps, buttonType;
    if (config.parentEntityUrn == FRONT_MATTER || config.parentEntityUrn == BACK_MATTER || TOC_PARENT_TYPES.includes(config.parentOfParentItem)) {
        if (elementType == ELEMENT_ASIDE || elementType == POETRY || elementType == CITATION_GROUP_ELEMENT || elementType == SINGLE_COLUMN) {
            esProps = renderConditionalButtons(esProps, sectionBreak, elementType, subtype);
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== METADATA_ANCHOR;
                })
            
        }else {            
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR && buttonType !== SECTION_BREAK && buttonType !== OPENER &&  buttonType !== CITATION &&
                buttonType !== STANZA_ELEMENT && buttonType !== TABBED_TAB;
            })
        }

    }
    else {
        if (config.slateType == CONTAINER_INTRO) {
            // hide the metadata anchor on IS when its once created
            if(document.getElementsByClassName(METADATA_ANCHOR).length > 0){
                let elements = document.getElementsByClassName(METADATA_ANCHOR);
                elements = Array.from(elements);
                elements.forEach(function(item,index){
                    if (item.classList && item.classList.contains("disabled")) { item.classList.remove("disabled") }
                })
            }
            
            if (config.isLOL) {
                let elements = document.getElementsByClassName(METADATA_ANCHOR);
                for (let key in elements) {
                    if (elements[key].className && !elements[key].classList.contains("disabled")) { elements[key].className += " disabled"; }
                }
            }
            
            if(config.isPopupSlate || config.isCO){
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== SECTION_BREAK && buttonType !== OPENER 
                    && buttonType !== CITATION && btnObj.buttonType !== STANZA_ELEMENT && btnObj.buttonType !== TABBED_TAB;
                })
            }else{
                updatedEsProps = esProps.filter((btnObj) => {
                    return btnObj.buttonType !== SECTION_BREAK && btnObj.buttonType !== CITATION 
                    && btnObj.buttonType !== STANZA_ELEMENT && btnObj.buttonType !== TABBED_TAB;
                })
            }
            if (elementType == ELEMENT_ASIDE || elementType == POETRY || elementType == CITATION_GROUP_ELEMENT || elementType == SINGLE_COLUMN) {
                esProps = renderConditionalButtons(esProps, sectionBreak, elementType, subtype);
                    updatedEsProps = esProps.filter((btnObj) => {
                        buttonType = btnObj.buttonType;
                        return buttonType !== METADATA_ANCHOR;
                    })
                
            }

        }
        else if (elementType == ELEMENT_ASIDE || elementType == CITATION_GROUP_ELEMENT || elementType === POETRY || elementType == SINGLE_COLUMN) {
                updatedEsProps = renderConditionalButtons(esProps, sectionBreak, elementType, subtype);
        }          
        else {
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== SECTION_BREAK && buttonType !== OPENER && buttonType !== CITATION && buttonType !== STANZA_ELEMENT && buttonType !== TABBED_TAB;
            })
        }
    }

    return updatedEsProps.map((elem, key) => {
        function buttonHandlerFunc(event) {
            if(event){
                event.stopPropagation();
            }
            if (elem.buttonType === "interactive-elem-button" || elem.buttonType === "container-elem-button" || elem.buttonType === "block-text-button" ||
            elem.buttonType === "multi-column-group") {
                setData(typeOfContainerElements(elem, props));
                if(elem.buttonType !== showInteractiveOption.type){
                    setshowInteractiveOption({status:true,type:elem.buttonType});
                }
                else{
                    setshowInteractiveOption({status:!showInteractiveOption.status,type:elem.buttonType});
                }
            }
            else {
                closeDropDown();
                elem.buttonHandler();
            }
        }

        return (
            <>{data && data.length >0 && showInteractiveOption && showInteractiveOption.status && showInteractiveOption.type == elem.buttonType &&
                <ElementContainerType 
                    text={elem.buttonType}
                    closeDropDown={closeDropDown}
                    data={data}
                    sectionBreak={sectionBreak}
                    elementType={elementType}
                    showPlayscript={props.showPlayscript}
                    showDiscussion={props.showDiscussion}
                    asideData={props.asideData}
                    elementIndex={props.index}
                >
                </ElementContainerType>
            }
                <Tooltip key={key} direction={elem.tooltipDirection} tooltipText={elem.tooltipText}>
                    <li>
                        <Button type={elem.buttonType} onClick={(event) => buttonHandlerFunc(event)} />
                    </li>

                </Tooltip>
            </>                          
        )
    })
}
  
export function typeOfContainerElements(elem, props) {
    const { index, firstOne, parentUrn, asideData, parentIndex, splithandlerfunction, sectionType } = props
    let newData = containerTypeArray[elem.buttonType];
    /* Do not show Citation Group option if inside Multicolumn  */
    newData = (elem?.buttonType === "container-elem-button" && asideData?.type === "groupedcontent") ? {["Add Aside"]: newData["Add Aside"]} : newData;
    /* Do not show Tabbed 2 column option inside Popup slate  */

    newData = (elem?.buttonType === "multi-column-group" && (config.isPopupSlate || !config.ENABLE_TAB_ELEMENT)) ? {["2-column"]:
                newData["2-column"], ["3-column"]: newData["3-column"]} : newData;
    /* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */
    /* Do not show SH and Pop up option if Aside/WE is inside SH  */
    /* Do not show block poetry option inside SH if SH is inside Aside/WE/MultiColumn */
    if ((asideData?.type === ELEMENT_ASIDE && asideData?.parent?.type === SHOW_HIDE) || (asideData?.grandParent?.asideData &&
        Object.keys(asideData.grandParent.asideData).length)) {
        switch (elem?.buttonType) {
            case "interactive-elem-button":
                newData = {
                    ["Add Elm Interactive"]: newData["Add Elm Interactive"],
                    ["Add Quad Interactive"]: newData["Add Quad Interactive"],
                    ["Add Smart Link"]: newData["Add Smart Link"],
                    ["Add Discussion"]: newData["Add Discussion"]
                }
                break;
            case "block-text-button":
                newData = {
                    ["Block Math"]: newData["Block Math"],
                    ["Block Code"]: newData["Block Code"],
                    ["Playscript"]: newData["Playscript"]
                }
                break;
        }
    }

    if(newData){
        return Object.entries(newData).map(function (num) {
            /* If Showhide Element, different set of params required to create elements inside SH */
            const splitHandlerList = asideData?.type === "showhide" ? [index, sectionType, num[1], props]
                : [num[1], index, firstOne, parentUrn, asideData, parentIndex];
            return {
                buttonType: num[1],
                text: num[0],
                buttonHandler: () => splithandlerfunction(...splitHandlerList),
            }
        })
        //return data;
    }
    else{
        return;
    }
    
}

export const pasteElement = (separatorProps, togglePaste, type) => {
    if(config.savingInProgress) return false
    sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } })
    if(type == 'cut') {
        togglePaste(false);
    }
    const index = separatorProps.index;
    const firstOne = separatorProps.firstOne || false;
    let insertionIndex = firstOne ? index : index + 1;
    /* For cut/copy paste functionality in showhide element */
    let sectionType, index2ShowHide;
    if(separatorProps?.elementType === SHOW_HIDE) {
        const indexs = index?.toString()?.split("-") || [];
        insertionIndex = indexs[indexs?.length - 1];
        sectionType = indexOfSectionType(indexs);
        index2ShowHide = index;
    }
    const selectedElement = separatorProps.elementSelection.element
    const acceptedTypes=[ELEMENT_ASIDE,CITATION_GROUP_ELEMENT,POETRY,MULTI_COLUMN,SHOW_HIDE,POPUP,MANIFEST_LIST]
    if ((acceptedTypes.includes(selectedElement.type)) && type === 'copy'){
        const parentUrn = separatorProps.parentUrn ?? null
        const asideData = separatorProps.asideData ?? null
        return separatorProps.cloneContainer(insertionIndex, selectedElement.id,parentUrn,asideData)
    }
    const pasteFnArgs = {
        index: insertionIndex,
        parentUrn: 'parentUrn' in separatorProps ? separatorProps.parentUrn : null,
        asideData: 'asideData' in separatorProps ? separatorProps.asideData : null,
        poetryData: 'poetryData' in separatorProps ? separatorProps.poetryData : null,
        sectionType,
        index2ShowHide
    }
    separatorProps?.pasteElement(pasteFnArgs)
}

const mapStateToProps = (state) => ({
    setSlateParent :  state.appStore.setSlateParent,
    elementSelection: state.selectionReducer.selection,
    showPlayscript: state.projectInfo.showPlayscript,
    showDiscussion: state.projectInfo.showDiscussion,
    projectSubscriptionDetails:state.projectInfo
})

const mapActionToProps = {
    cloneContainer
}
export default connect(mapStateToProps, mapActionToProps)(ElementSaprator)