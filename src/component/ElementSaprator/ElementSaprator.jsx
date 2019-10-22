/**
 * Root Component for Element Picker
 */
import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'
import config from '../../config/config';

import '../../styles/ElementSaprator/ElementSaprator.css'

export default function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false)
    const { esProps, elementType, slateType, sectionBreak } = props
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
    function closeDropDown () {
        setShowClass(false);
    }
    
    /**
     * @description: OnClick handler for split slate button
     */
    const splitSlateClickHandler = () => {
        props.toggleSplitSlatePopup(true, props.index)
    }
    
    return (
        <div className={showClass ? 'elementSapratorContainer opacityClassOn':'elementSapratorContainer'}>
            <div className='elemDiv-split'>
                {elementType !== 'element-aside' && !props.firstOne ? <Tooltip direction='right' tooltipText='Split Slate'>
                    { config.PERMISSIONS.includes('elements_add_remove') && <Button type='split' onClick={splitSlateClickHandler} />} </Tooltip> : ''}
            </div>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='left' tooltipText='Element Picker'>
                       { config.PERMISSIONS.includes('elements_add_remove') && <Button onClick={toggleElementList} className="dropbtn" type="expand" />}
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {renderDropdownButtons(esProps, slateType, elementType, sectionBreak, closeDropDown)}
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
 * @description: rendering the dropdown
 */
export function renderDropdownButtons(esProps, slateType, elementType, sectionBreak, closeDropDown) {
    let updatedEsProps, buttonType;

    if(config.slateType == 'container-introduction' && (!config.isCO || config.isLOL)){
        // hide the metadata anchor on IS when its once created
        if(config.isLOL){
            let elements= document.getElementsByClassName("metadata-anchor");
            for(let key in elements){
                if(elements[key].className){  elements[key].className += " disabled";}
            } 
        }

        if(!config.isCO) {
            updatedEsProps = esProps.filter((btnObj) => {
                return btnObj.buttonType !== 'section-break-elem';
            })
        }else{
            updatedEsProps = esProps.filter((btnObj) => {
                buttonType = btnObj.buttonType;
                return buttonType !== 'section-break-elem' && buttonType !== 'opener-elem';
            })
        }

    }else{
        updatedEsProps = esProps.filter((btnObj) => {
            buttonType = btnObj.buttonType;
            return buttonType !== 'section-break-elem' && buttonType !== 'opener-elem';
        })
    }

    //hide the metadata anchor from frontmatter and backmatter
    if(config.parentEntityUrn == "Front Matter" || config.parentEntityUrn == "Back Matter"){
        updatedEsProps = esProps.filter((btnObj) => {
            buttonType = btnObj.buttonType;
            return  buttonType !=='metadata-anchor' && buttonType !== 'section-break-elem' && buttonType !== 'opener-elem';
        })
    }

    if(elementType == 'element-aside'){
        updatedEsProps = esProps.filter((btnObj) => {
            buttonType = btnObj.buttonType;
            if(sectionBreak){
                return  buttonType !=='worked-exp-elem' && buttonType !== 'container-elem' && buttonType !== 'opener-elem';
            }else{
                return buttonType !== 'opener-elem' && buttonType !== 'section-break-elem';
            }
        })
    }

    return updatedEsProps.map((elem, key) => {
        function buttonHandlerFunc() {
            closeDropDown();
            elem.buttonHandler();
        }

        return (
            <Tooltip direction={elem.tooltipDirection} tooltipText={elem.tooltipText}>
                <li key={key}>
                    <Button type={elem.buttonType} onClick={buttonHandlerFunc} />
                </li>
            </Tooltip>
        )
    })
}
