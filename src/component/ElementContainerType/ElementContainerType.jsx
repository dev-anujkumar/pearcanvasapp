/**
 * Component for Container Type Elements
 */
import React, { useEffect, useState, useRef } from 'react'
import config from '../../config/config';
import '../../styles/ElementContainerType/ElementContainerType.css'
import elementTypeConstant from  '../ElementContainer/ElementConstants.js';
import InputCounter from '../Tooltip/InputCounter.jsx';
const { SHOW_HIDE } = elementTypeConstant;

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
            case 'container-elem-button': elementPickerPosition = props.elementType === "showhide" ? 7 : 8; break;
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

    const renderMenu = (propsData) => {
        let { elementType, text, showPlayscript, showDiscussion, asideData, elementIndex } = props;
        const indexOfElement =  props?.elementIndex ? elementIndex.toString().split('-') : [];
        const parentIndex = props?.asideData?.index ? props?.asideData?.index.toString().split('-') : [];
        if (!showDiscussion) {
            propsData = propsData.filter( (obj) => {
                return obj.text !== 'Add Discussion';
            });
        }
        if (!showPlayscript) {
            propsData = propsData.filter( (obj) => {
                return obj.text !== 'Playscript';
            });
        }
        /**Block List option only visible on Slate Level & inside SH */
        const blocklistAllowedIn = ['','showhide',"element-aside", "group"];
        if (blocklistAllowedIn.indexOf(elementType) === -1) {
            propsData = propsData.filter( obj => obj.text !== 'Block List');
        }
        /**Block List option hidden for SH which is already in Container like 2C/3C/Aside/WE */
        if((elementType === 'showhide' && indexOfElement.length > 3) || elementType === "element-aside" && parentIndex.length >=3 || elementType === "group" && parentIndex.length >=3) {
            propsData = propsData.filter( obj => obj.text !== 'Block List');
        }
        /* Not show Popup/SH/Interactive elements inside SH interactive Picker */
        const hideElementList = ["show-hide-elem", "popup-elem", "elm-interactive-elem", "interactive-elem", "element-discussion"];
        const hideElementListMulticolumn = ["Add Pop Up","Add Discussion"]
        return propsData && propsData.map((item, index) => {
            if ((elementType === "element-aside" && asideData?.parent?.type === "groupedcontent" && text === "block-text-button" && item.text === "Block Poetry") ||
            ((elementType === "element-aside" || elementType === "group") && config.isPopupSlate && text === "block-text-button" && item.text === "Block Poetry") ||
            (text === "interactive-elem-button" && (elementType === "group" && hideElementListMulticolumn.includes(item.text)))
            || (config.isPopupSlate && item.text === "Add Pop Up") ||
            /* Not show poetry/Popup/SH inside SH interactive Picker */
            (elementType === SHOW_HIDE && (hideElementList.includes(item?.buttonType)))) {
                return null
            }
            else {
                return (
                    <span style={{display:'flex', justifyContent:'space-between'}}>
                    <li key={index} onClick={() => buttonHandlerFunc(item)}>{item.text}
                    </li>
                    <InputCounter elementType={item.buttonType} setElementCount={props.setElementCount} />

                                         </span>
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



