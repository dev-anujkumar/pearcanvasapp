/**
 * Root Component for Element Picker
 */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import config from '../../config/config';
import { hasReviewerRole } from '../../constants/utility.js'
import '../../styles/ElementSaprator/ElementSaprator.css'
import ElementContainerType from '../ElementContainerType/ElementContainerType.jsx'

const METADATA_ANCHOR = 'metadata-anchor',
SECTION_BREAK = 'section-break-elem',
OPENER = 'opener-elem',
BACK_MATTER = 'Back Matter',
FRONT_MATTER = 'Front Matter',
ELEMENT_ASIDE = 'element-aside',
WORKED_EXP = 'worked-exp-elem',
CONTAINER = 'container-elem-button',
CONTAINER_INTRO = 'container-introduction',
CITATION ='citation-elem',
CITATION_GROUP_ELEMENT='citations'

export default function ElementSaprator(props) {
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
    function toggleElementList() {
        let openDropdowns = document.getElementsByClassName("show")
        for (let i = 0; i < openDropdowns.length; i++) {
            let openDropdown = openDropdowns[i]
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show')
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
                {permissions && permissions.includes('split_slate') && (elementType !== 'element-aside' && elementType !== 'citations') && !config.isPopupSlate && !props.firstOne ? <Tooltip direction='right' tooltipText='Split Slate'>
                    {permissions && permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button type='split' onClick={splitSlateClickHandler} />} </Tooltip> : ''}
            </div>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='left' tooltipText='Element Picker'>
                        {permissions.includes('elements_add_remove') && !hasReviewerRole() && <Button onClick={toggleElementList} className="dropbtn" type="expand" />}
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
 * @description: rendering the aside dropdown
 */
function asideButton(esProps,sectionBreak,elementType){
    let updatedEsProps = esProps.filter((btnObj) => {        
      let  buttonType = btnObj.buttonType;
      if(elementType==CITATION_GROUP_ELEMENT && sectionBreak){
        return buttonType == CITATION;//citation element
      }else{
        if (sectionBreak) {
            return buttonType !== WORKED_EXP && buttonType !== CONTAINER && buttonType !== OPENER &&  buttonType !== CITATION;
        } else {
            return buttonType !== OPENER && buttonType !== SECTION_BREAK && buttonType !== WORKED_EXP && buttonType !== CONTAINER && buttonType !== CITATION;
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
        if (elementType == ELEMENT_ASIDE ) {            
            esProps = asideButton(esProps, sectionBreak,elementType);
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR && buttonType !== CITATION;
            })
        } else if(elementType == CITATION_GROUP_ELEMENT){
            esProps = asideButton(esProps, sectionBreak,elementType);
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType == CITATION;
            })
        }else {            
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR && buttonType !== SECTION_BREAK && buttonType !== OPENER &&  buttonType !== CITATION;
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
            
            if (!config.isCO) {
                updatedEsProps = esProps.filter((btnObj) => {
                    return btnObj.buttonType !== SECTION_BREAK && btnObj.buttonType !== CITATION;
                })
            } else {
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== SECTION_BREAK && buttonType !== OPENER && buttonType !== CITATION;
                })
            }
            if (elementType == ELEMENT_ASIDE) {
                esProps = asideButton(esProps, sectionBreak,elementType);
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== METADATA_ANCHOR && buttonType !== CITATION;
                })
            }else if (elementType == CITATION_GROUP_ELEMENT){
                esProps = asideButton(esProps, sectionBreak,elementType);
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType == CITATION;
                })
            }
        }
        else if (elementType == ELEMENT_ASIDE|| elementType == CITATION_GROUP_ELEMENT) {
            updatedEsProps = asideButton(esProps, sectionBreak,elementType);
           
        }
       
        else {
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== SECTION_BREAK && buttonType !== OPENER && buttonType !== CITATION;
            })
        }
    }

    // useEffect(()=>{
    //     setshowInteractiveOption({status:false,type:showInteractiveOption.type})
    // },[showInteractiveOption])

    return updatedEsProps.map((elem, key) => {
        function buttonHandlerFunc() {
            if (elem.buttonType == "interactive-elem-button" || elem.buttonType == "container-elem-button") {
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
                    >
                </ElementContainerType>
            }
                <Tooltip key={key} direction={elem.tooltipDirection} tooltipText={elem.tooltipText}>
                    <li>
                        <Button type={elem.buttonType} onClick={buttonHandlerFunc} />
                    </li>

                </Tooltip>
            </>                          
        )
    })
}
  
function typeOfContainerElements(elem, props) {
    const { index, firstOne, parentUrn, asideData, parentIndex, splithandlerfunction } = props
    let containerArray = {
        "container-elem-button": {
            "Add Aside": "container-elem",
            "Add Citation": "citations-group-elem"
        },
        "interactive-elem-button":
        {
            "Add MMI": "interactive-elem",
            "Add SmartLink": "smartlink-elem",
            "Add Pop-up": "popup-elem",
            "Add Show/Hide": "show-hide-elem",
        }
    }
    let newData = containerArray[elem.buttonType];
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