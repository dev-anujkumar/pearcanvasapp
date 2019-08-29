import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'
import Tooltip from '../Tooltip'

import '../../styles/ElementSaprator/ElementSaprator.css'

export default function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false)
    const {typeHandler, clickHandler, elementType} = props
    let buttonRef =useRef(null)
    const tooltipTextArr = ['text', 'image', 'audio/video', 'interactive', 'assessment', 'container', 'worked example', 'opener element']
    /**
     * @description: This hook is used for handling the outer click, 
     * after mounting the component or update the component state this hook will called
     */

    
    useEffect(() => {
        document.addEventListener('mousedown',(event)=>{            
            let elems = getParents(event.target)
            let dropdown = 'dropdown'
            if(elems.indexOf(dropdown)===-1){
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
        for(let i=0;i<openDropdowns.length;i++){
            let openDropdown = openDropdowns[i]
            if(openDropdown.classList.contains('show')){
                openDropdown.classList.remove('show')
            }
        }      
        setShowClass(!showClass)
    }

     function getParents(elem) {

        // Set up a parent array
        var parents = [];
    
        // Push each parent element to the array
        for ( ; elem && elem !== document; elem = elem.parentNode ) {
            parents.push(elem.className);
        }
    
        // Return our parent array
        return parents;
    
    };

    return (
        <div className="elementSapratorContainer">
        
        <div className='elemDiv-split'>
                {elementType=='WE' ?<Button type='split' onClick={splitSlateClickHandler} /> :''}
        </div> 


            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>

            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                <Tooltip direction='left' tooltipText='expend'>
                    <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
                </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content' }>
                        <ul>
                            {renderDropdownButtons(typeHandler, clickHandler, tooltipTextArr)}
                        </ul>
                    </div>
                </div>
            </div>                      
        </div>
    )
}

ElementSaprator.propTypes = {
    typeHandler : PropTypes.array.isRequired,
    clickHandler : PropTypes.array.isRequired,
    elementType : PropTypes.string
}

/**
 * @description: OnClick handler for split slate button
 */
export function splitSlateClickHandler() {
    // alert('split slate button clicked')
     console.log('split slate button clicked')
}

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
export function renderDropdownButtons(typesArr, btnClkArr, tooltipTextArr) {
    return typesArr.map((type, key) => {
            return (
            <Tooltip direction='left' tooltipText={tooltipTextArr[key]}>
                <li key={key}>
                        <Button type={type} onClick={btnClkArr[key]} />              
                </li>
            </Tooltip>)
        })
}