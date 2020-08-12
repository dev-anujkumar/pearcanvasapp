/**
 * Component for Container Type Elements
 */
import React, { useEffect, useState, useRef } from 'react'
import config from '../../config/config';
import '../../styles/ElementContainerType/ElementContainerType.css'
export default function ElementContainerType(props) {
    const { closeDropDown, data } = props
    const [top, setTop] = useState('0px');
    let myListContainer = useRef(null)

    useEffect(() => {
        let { clientHeight } = myListContainer.current;
        /**
         * Based upon the element picker position we need to add type and it's position
         */
        let elementPickerPosition = 1
        switch (props.text) {
            case 'interactive-elem-button': elementPickerPosition = 5; break;
            case 'container-elem-button': elementPickerPosition = 8; break;
            case "block-text-button" : elementPickerPosition = 4; break;
        }

        let onePickerHeight = 34;   // default pixel size of one picker element
        let listItemHeight = (clientHeight / 2)
        let pickerPosition = ((elementPickerPosition - 1) * onePickerHeight + (onePickerHeight / 2)) - listItemHeight;
        let dataPos = `${pickerPosition}px`;
        setTop(dataPos);
    }, [])

    const buttonHandlerFunc = (item) => {
        closeDropDown();
        item.buttonHandler();
    }

    const renderMenu = (propsData) => {
        let {elementType,text} = props
        return propsData && propsData.map((item, index) => {
            if (((elementType === "element-aside" || elementType === "group") && text === "block-text-button" && item.text === "Block Poetry") ||
            (text === "interactive-elem-button" && (elementType === "group" && (item.text === "Add Show Hide" || item.text === "Add Pop Up")))
            || (config.isPopupSlate && item.text === "Add Pop Up")) {
                return null
            }
            else {
                return (
                    <li key={index} onClick={() => buttonHandlerFunc(item)}>{item.text}</li>
                )
            }
        })
    }
    return (
        <div className="conatiner-other-elements" ref={myListContainer} style={{ top }}>
            <ul className="other-elements-inner">
                {renderMenu(data)}
            </ul>
        </div>

    )
}



