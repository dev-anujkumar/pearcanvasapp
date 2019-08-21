import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from '../ElementButtons/ElementButton'

import '../../styles/ElementSaprator/ElementSaprator.css'

export default function ElementSaprator() {
    const [showClass, setShowClass] = useState(false);

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

    function toggleElementList() {
        setShowClass(!showClass)
    }

    return (
        <div className="elementSapratorContainer">
            <div>
                <Button type='split' onClick={splitSlateClickHandler} />              
                <hr className='horizontalLine' />
                <div className="dropdown">
                    <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
                    {/* <button onClick={() => setShowClass(!showClass)} className="dropbtn">Dropdown</button> */}
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content' }>
                        <ul>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                            <li>
                            <Button type='split' onClick={splitSlateClickHandler} />              
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

function splitSlateClickHandler() {
    alert('split slate button clicked')
}

function addMediaClickHandler() {
    alert('add media button clicked')
}
