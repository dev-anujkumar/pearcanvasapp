import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons'

import '../../styles/ElementSaprator/ElementSaprator.css'

export default function ElementSaprator(props) {
    const [showClass, setShowClass] = useState(false)
    const {typeHandler, clickHandler, elementType} = props
    let buttonRef =useRef(null)

    /**
     * @description: This hook is used for handling the outer click, 
     * after mounting the component or update the component state this hook will called
     */

    
    useEffect(() => {
        
        // window.onclick = function(event) {
        //     if (!event.target.matches('.dropbtn')) {
        //       let dropdowns = document.getElementsByClassName("dropdown-content");
        //       let i
        //       for (i = 0; i < dropdowns.length; i++) {
        //        let openDropdown = dropdowns[i]
        //        if (openDropdown.classList.contains('show')) {
        //             setShowClass(!showClass)
        //        }
        //       }
        //     }
        //   }
        document.addEventListener('mousedown',(event)=>{            
            let elems = getParents(event.target)
            let dropdown = 'dropdown';
            if(elems.indexOf(dropdown)===-1)
            {
                setShowClass(false)
            }           
        })
    }, []);

    /**
     * @description: This function is responsable for toggle 
     * state to render the dropdown
     */
    function toggleElementList() {       
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
                <Button type='split' onClick={splitSlateClickHandler} /> 
            </div>

            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>

            <div className='elemDiv-expand'>
                <div className="dropdown" ref={buttonRef}>
                    <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content' }>
                        <ul>
                            {renderDropdownButtons(typeHandler, clickHandler)}
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
export function renderDropdownButtons(typesArr, btnClkArr) {
    return typesArr.map((type, key) => {
            return (<li key={key}>
                    <Button type={type} onClick={btnClkArr[key]} />              
            </li>)
        })
}