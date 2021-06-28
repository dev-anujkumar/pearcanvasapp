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
            case "multi-column-group": elementPickerPosition = 10; break;
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

    const indexOfObject = (array, value) => {
        let myArray = [...array];
        let index = myArray.findIndex((item) => {
            if(item.text == `${value}`)
                return true;
        });
        return index;
    }
    
    const removeObject = (array, value) => {
        const index = indexOfObject(array, value);
        if(index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    const checkObject = (array, value) => {
        let found = array.find(function(post) {
            if(post.text == `${value}`)
                return true;
        });
        return found ? true : false
    }

    const renderMenu = (propsData) => {
        let {elementType,text,showPlayscript,showDiscussion} = props
        console.log("Show Playscript: ",showPlayscript)
        console.log("Show Discussion: ",showDiscussion)
        let newpropsData = [...propsData];
        if(!showDiscussion && checkObject(propsData,'Add Discussion')) {
            let tempArray = [...propsData];
            newpropsData = removeObject(tempArray,'Add Discussion');
        }
        if(!showPlayscript && checkObject(propsData,'Playscript')) {
            let tempArray = [...propsData];
            newpropsData = removeObject(tempArray,'Playscript');
        }
        return newpropsData && newpropsData.map((item, index) => {
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



