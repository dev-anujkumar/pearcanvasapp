/**
 * Component for Container Type Elements
 */
import React, { useEffect, useState, useRef } from 'react'
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

    const renderMenu = (data) => {
        return data && data.map((item, index) => {
            if (((props.elementType === "element-aside" || props.elementType === "group") && props.text === "block-text-button" && item.text === "Block Poetry") ||
                (props.elementType === "group" && props.text === "interactive-elem-button" && (item.text === "Add Show Hide" || item.text === "Add Pop Up"))) {
                return null
            }
            else {
                return (
                    <li key={index} onClick={() =>buttonHandlerFunc(item)}>{item.text}</li>
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



