import React, { useState } from 'react'
import Button from './../ElementButtons';
import Tooltip from '../Tooltip';

export default function DialogueSeprator(props) {

    // console.log('DialogueSaprator====', props)

    const [showClass, setShowClass] = useState(false);
    const [showInteractiveOption, setshowInteractiveOption] = useState({status: false, type: ""});

    const ToggleElementList = (event) => {
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
        setshowInteractiveOption({status: false, type: ""})
    }

    return (
        <div className={showClass ? 'elementSapratorContainer opacityClassOn ignore-for-drag' : 'elementSapratorContainer ignore-for-drag'}>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div className='elemDiv-expand'>
                <div className="dropdown">
                    <Tooltip direction='left' tooltipText='Element Picker'>
                        {
                            props.permissions.includes('elements_add_remove') &&
                            <Button
                                onClick={(event) => ToggleElementList(event)}
                                className="dropbtn"
                                type="expand"
                            />
                        }
                    </Tooltip>
                    <div id="myDropdown" className={showClass ? 'dropdown-content show' : 'dropdown-content'}>
                        <ul>
                            {/* {renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)} */}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}