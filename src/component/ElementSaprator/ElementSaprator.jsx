/**
 * Root Component for Element Picker
 */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import config from '../../config/config';

import '../../styles/ElementSaprator/ElementSaprator.css'

const METADATA_ANCHOR = 'metadata-anchor',
SECTION_BREAK = 'section-break-elem',
OPENER = 'opener-elem',
BACK_MATTER = 'Back Matter',
FRONT_MATTER = 'Front Matter',
ELEMENT_ASIDE = 'element-aside',
WORKED_EXP = 'worked-exp-elem',
CONTAINER = 'container-elem',
CONTAINER_INTRO = 'container-introduction'

export default function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false)
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
    };

    /**
     * Close dropdown
     */
    function closeDropDown() {
        setShowClass(false);
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
            <div className='elemDiv-split'>
                {permissions && permissions.includes('split_slate') && elementType !== 'element-aside' && !props.firstOne ? <Tooltip direction='right' tooltipText='Split Slate'>
                    {permissions && permissions.includes('elements_add_remove') && <Button type='split' onClick={splitSlateClickHandler} />} </Tooltip> : ''}
            </div>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='left' tooltipText='Element Picker'>
                        {permissions.includes('elements_add_remove') && <Button onClick={toggleElementList} className="dropbtn" type="expand" />}
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown)}
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
function asideButton(esProps,sectionBreak){
    let updatedEsProps = esProps.filter((btnObj) => {
      let  buttonType = btnObj.buttonType;
        if (sectionBreak) {
            return buttonType !== WORKED_EXP && buttonType !== CONTAINER && buttonType !== OPENER;
        } else {
            return buttonType !== OPENER && buttonType !== SECTION_BREAK && buttonType !== WORKED_EXP && buttonType !== CONTAINER;
        }
    })
    return updatedEsProps;
}

/**
 * @description: rendering the dropdown
 */
export function renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown) {
    let updatedEsProps, buttonType;
    if (config.parentEntityUrn == FRONT_MATTER || config.parentEntityUrn == BACK_MATTER) {
        if (elementType == ELEMENT_ASIDE) {
            esProps = asideButton(esProps, sectionBreak);
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR;
            })

        } else {
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== METADATA_ANCHOR && buttonType !== SECTION_BREAK && buttonType !== OPENER;
            })
        }

    }
    else {
        if (config.slateType == CONTAINER_INTRO && (!config.isCO || config.isLOL)) {
            // hide the metadata anchor on IS when its once created
            if (config.isLOL) {
                let elements = document.getElementsByClassName(METADATA_ANCHOR);
                for (let key in elements) {
                    if (elements[key].className) { elements[key].className += " disabled"; }
                }
            }

            if (!config.isCO) {
                updatedEsProps = esProps.filter((btnObj) => {
                    return btnObj.buttonType !== SECTION_BREAK;
                })
            } else {
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== SECTION_BREAK && buttonType !== OPENER;
                })
            }
            if (elementType == ELEMENT_ASIDE) {
                esProps = asideButton(esProps, sectionBreak);
                updatedEsProps = esProps.filter((btnObj) => {
                    buttonType = btnObj.buttonType;
                    return buttonType !== METADATA_ANCHOR;
                })
            }

        }
        else if (elementType == ELEMENT_ASIDE) {
            updatedEsProps = asideButton(esProps, sectionBreak);
           
        }
       
        else {
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== SECTION_BREAK && buttonType !== OPENER;
            })
        }
    }

    

    return updatedEsProps.map((elem, key) => {
        function buttonHandlerFunc() {
            closeDropDown();
            elem.buttonHandler();
        }

        return (
            <Tooltip key={key} direction={elem.tooltipDirection} tooltipText={elem.tooltipText}>
                <li>
                    <Button type={elem.buttonType} onClick={buttonHandlerFunc} />
                </li>
            </Tooltip>
        )
    })
}
  
  