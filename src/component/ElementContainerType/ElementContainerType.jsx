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
            case 'container-elem-button': elementPickerPosition = 7; break;
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
    return (
        <div className="conatiner-other-elements" ref={myListContainer} style={{ top }}>
            <ul className="other-elements-inner">
                {data && data.map((item, index) => {
                    return (
                        <li key={index} onClick={() =>buttonHandlerFunc(item)}>{item.text}</li>)
                })}
            </ul>
        </div>

    )
}

