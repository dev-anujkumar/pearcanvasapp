/**
 * Root Component for Element Picker
 */
import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import config from '../../config/config';
import { hasReviewerRole } from '../../constants/utility.js';
import elementTypeConstant, { containerTypeArray } from './ElementSepratorConstants.js';
import '../../styles/ElementSaprator/ElementSaprator.css'
import ElementContainerType from '../ElementContainerType/ElementContainerType.jsx'

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
    SINGLE_COLUMN
 } = elementTypeConstant

export function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false);
    const [data, setData] = useState([]);
    const [showInteractiveOption, setshowInteractiveOption] = useState({status:false,type:""});
    let propsData={data,setData,showInteractiveOption,setshowInteractiveOption,props}
    const { esProps, elementType, sectionBreak, permissions } = props
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
        if(props.openAudio){
            props.showAudioSplitPopup(true , props.index)
        }
        else {
            props.toggleSplitSlatePopup(true, props.index)
        }
    }

    return (
        <div className={showClass ? 'elementSapratorContainer opacityClassOn ignore-for-drag' : 'elementSapratorContainer ignore-for-drag'}>
            <div className='elemDiv-split' onClickCapture={(e) => props.onClickCapture(e)}>
                {permissions && permissions.includes('split_slate') && (elementType !== 'element-aside' && elementType !== 'citations' && elementType !== 'poetry' && elementType !== 'group') && !config.isPopupSlate && !props.firstOne && !(props.setSlateParent == 'part' && config.slateType == CONTAINER_INTRO) ? <Tooltip direction='right' tooltipText='Split Slate'>
                    {permissions && permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button type='split' onClick={splitSlateClickHandler} />} </Tooltip> : ''}
            </div>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='left' tooltipText='Element Picker'>
                        {permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button onClick={(event) => toggleElementList(event)} className="dropbtn" type="expand" />}
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)}
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
 * @description: OnClick handler for add Element button
 */
export function addMediaClickHandler() {
    console.log('add media button clicked')
}

/**
 * @description: Rendering the element picker dropdown based on type of Container Element
 */

function renderConditionalButtons(esProps,sectionBreak,elementType){
    let updatedEsProps = esProps.filter((btnObj) => {        
      let  buttonType = btnObj.buttonType;
        if (elementType == CITATION_GROUP_ELEMENT && sectionBreak) { /** Container : Citation Group |Render Citation Element*/
            return buttonType == CITATION;
        } else if (elementType == POETRY){                           /** Container : Poetry Element |Render Stanza Element*/
            return buttonType === STANZA_ELEMENT;
        }
        // else if (elementType == SINGLE_COLUMN) {                     /** Container : C1/C2 in Multi-Column Element*/
        //     return buttonType == TEXT && buttonType == IMAGE && buttonType == AUDIO && buttonType == INTERACTIVE && buttonType == ASSESSMENT && buttonType == BLOCK_TEXT && buttonType == METADATA_ANCHOR
        // } 
        else {
        if (sectionBreak) {                                          /** Container : Other cases in Wored Example*/
            return buttonType !== WORKED_EXP && buttonType !== CONTAINER_BUTTON && buttonType !== OPENER &&  buttonType !== CITATION && buttonType !== STANZA_ELEMENT && buttonType !== POETRY_ELEMENT && buttonType !== MULTI_COLUMN_CONTAINER;
        } else {                                                     /** Container : Aside| Section in WE| C1/C2 in Multi-Column Element*/
            return buttonType !== OPENER && buttonType !== SECTION_BREAK && buttonType !== WORKED_EXP && buttonType !== CONTAINER_BUTTON && buttonType !== CITATION && buttonType !== STANZA_ELEMENT && buttonType !== POETRY_ELEMENT && buttonType !== MULTI_COLUMN_CONTAINER;
        }
    }
    })
    return updatedEsProps;
}

/**
 * @description: rendering the dropdown
 */
export function renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData) {
    let {data,setData,showInteractiveOption,setshowInteractiveOption,props} =propsData
    let updatedEsProps, buttonType;
    if (config.parentEntityUrn == FRONT_MATTER || config.parentEntityUrn == BACK_MATTER) {
        if (elementType == ELEMENT_ASIDE || elementType == POETRY || elementType == CITATION_GROUP_ELEMENT || elementType == SINGLE_COLUMN) {
            esProps = renderConditionalButtons(esProps, sectionBreak,elementType);
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== METADATA_ANCHOR;
                })
            
        }else {            
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR && buttonType !== SECTION_BREAK && buttonType !== OPENER &&  buttonType !== CITATION && buttonType !== STANZA_ELEMENT;
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
                    && buttonType !== CITATION && btnObj.buttonType !== STANZA_ELEMENT;
                })
            }else{
                updatedEsProps = esProps.filter((btnObj) => {
                    return btnObj.buttonType !== SECTION_BREAK && btnObj.buttonType !== CITATION 
                    && btnObj.buttonType !== STANZA_ELEMENT;
                })
            }
            if (elementType == ELEMENT_ASIDE || elementType == POETRY || elementType == CITATION_GROUP_ELEMENT || elementType == SINGLE_COLUMN) {
                esProps = renderConditionalButtons(esProps, sectionBreak,elementType);
                    updatedEsProps = esProps.filter((btnObj) => {
                        buttonType = btnObj.buttonType;
                        return buttonType !== METADATA_ANCHOR;
                    })
                
            }

        }
        else if (elementType == ELEMENT_ASIDE || elementType == CITATION_GROUP_ELEMENT || elementType === POETRY || elementType == SINGLE_COLUMN) {
                updatedEsProps = renderConditionalButtons(esProps, sectionBreak, elementType);
        }          
        else {
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== SECTION_BREAK && buttonType !== OPENER && buttonType !== CITATION && buttonType !== STANZA_ELEMENT;
            })
        }
    }

    return updatedEsProps.map((elem, key) => {
        function buttonHandlerFunc(event) {
            if(event){
                event.stopPropagation();
            }
            if (elem.buttonType === "interactive-elem-button" || elem.buttonType === "container-elem-button" || elem.buttonType === "block-text-button") {
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
  
function typeOfContainerElements(elem, props) {
    const { index, firstOne, parentUrn, asideData, parentIndex, splithandlerfunction } = props
    let newData = containerTypeArray[elem.buttonType];
    if(newData){
        let data = Object.entries(newData).map(function (num) {
            return {
                buttonType: num[1],
                text: num[0],
                buttonHandler: () => splithandlerfunction(num[1], index, firstOne, parentUrn, asideData, parentIndex),
            }
        })
        return data;
    }
    else{
        return;
    }
    
}

const mapStateToProps = (state) => ({
    setSlateParent :  state.appStore.setSlateParent
})

export default connect(mapStateToProps, {})(ElementSaprator)