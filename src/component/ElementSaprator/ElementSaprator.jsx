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
            let elems = getParents(event.target)
            let dropdown = 'dropdown'
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

    function getParents(elem) {
        // Set up a parent array
        var parents = [];
        // Push each parent element to the array
        for (; elem && elem !== document; elem = elem.parentNode) {
            parents.push(elem.className);
        }
        // Return our parent array
        return parents;
    };

    /**
     * @description: OnClick handler for split slate button
     */
    const splitSlateClickHandler = () => {
        // alert('split slate button clicked')
        props.handleSplitSlate(props.index)
        console.log('split slate button clicked')
    }
    
    return (
        <div className={showClass ? 'elementSapratorContainer opacityClassOn':'elementSapratorContainer'}>
                <div className='elemDiv-split'>
                    {elementType !== 'element-aside' && !props.firstOne ? <Tooltip direction='right' tooltipText='Split Slate'>
                        <Button type='split' onClick={splitSlateClickHandler} /> </Tooltip> : ''}
                </div>

            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>

            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Tooltip direction='left' tooltipText='Element Picker'>
                        <Button onClick={toggleElementList} className="dropbtn" type="expand" />
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {renderDropdownButtons(esProps, slateType, elementType, sectionBreak)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

ElementSaprator.propTypes = {
    esProps: PropTypes.array.isRequired,
    elementType: PropTypes.string
}

/**
 * @description: OnClick handler for split slate button
 */
/* export function splitSlateClickHandler() {
    // alert('split slate button clicked')
    props.handleSplitSlate()
    console.log('split slate button clicked')
} */

/**
 * @description: OnClick handler for add Element button
 */
export function addMediaClickHandler() {
    // alert('add media button clicked')
    console.log('add media button clicked')
}

/**
 * @description: rendering the dropdown
 */
export function renderDropdownButtons(esProps, slateType, elementType, sectionBreak) {
    let updatedEsProps;

    if(config.slateType == 'container-introduction'){
        updatedEsProps = esProps.filter((btnObj) => {
            return btnObj.buttonType !== 'section-break-elem';
        })
    }else{
        updatedEsProps = esProps.filter((btnObj) => {
            return btnObj.buttonType !== 'section-break-elem' && btnObj.buttonType !== 'opener-elem';
        })
    }

    if(elementType == 'element-aside'){
        updatedEsProps = esProps.filter((btnObj) => {
            if(sectionBreak){
                return  btnObj.buttonType !=='worked-exp-elem' && btnObj.buttonType !== 'container-elem' && btnObj.buttonType !== 'opener-elem';
            }else{
                return btnObj.buttonType !=='worked-exp-elem' && btnObj.buttonType !== 'container-elem' && btnObj.buttonType !== 'opener-elem' && btnObj.buttonType !== 'section-break-elem';
            }
        })
    }

    return updatedEsProps.map((elem, key) => {
        return (
            <Tooltip direction={elem.tooltipDirection} tooltipText={elem.tooltipText}>
                <li key={key}>
                    <Button type={elem.buttonType} onClick={elem.buttonHandler} />
                </li>
            </Tooltip>)
    })
}
