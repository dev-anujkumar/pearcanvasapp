import React, { useEffect, useState } from 'react'
import Button from '../ElementButtons/ElementButton'

import '../../styles/ElementSaprator/ElementSaprator.css'

export default function ElementSaprator() {
    const [showClass, setShowClass] = useState(false);

    /**
     * @description: This hook is used for handling the outer click, 
     * after mounting the component or update the component state this hook will called
     */
    useEffect(() => {
        window.onclick = function(event) {
            if (!event.target.matches('.dropbtn')) {
              let dropdowns = document.getElementsByClassName("dropdown-content");
              let i
              for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i]
                if (openDropdown.classList.contains('show')) {
                    setShowClass(!showClass)
                }
              }
            }
          }
    });

    /**
     * @description: This function is responsable for toggle 
     * state to render the dropdown
     */
    function toggleElementList() {       
        setShowClass(!showClass)
    }

    return (
        <div className="elementSapratorContainer">
            <div className='elemDiv1'>
                <Button type='split' onClick={splitSlateClickHandler} /> 
            </div>

            <div className='elemDiv2'>
                <hr className='horizontalLine' />
            </div>

            <div className='elemDiv3'>
                <div className="dropdown">
                    <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content' }>
                        <ul>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                            <li>
                                <Button type='split' onClick={addMediaClickHandler} />              
                            </li>
                        </ul>
                    </div>
                </div>
            </div>                      
        </div>
    )
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
