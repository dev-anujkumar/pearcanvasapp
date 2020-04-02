/**
 * Component for Conatiner Type Elements
 */
import React, {useEffect, useState, useRef} from 'react'
import '../../styles/ElementContainerType/ElementContainerType.css'
export default function ElementContainerType(props) {
    const { closeDropDown,data } = props
    const [top, setTop] = useState('0px');
    let myListContainer = useRef(null)

    useEffect(()=>{
        let { clientHeight } = myListContainer.current;
        /**
         * Based upon the element picker position we need to add type and it's position
         */
        let elementPickerPosition = 1
        switch (props.text) {
            case 'interactive-elem-button': elementPickerPosition = 4; break; 
            case 'container-elem-button': elementPickerPosition = 6; break;
        }

        let onePickerHeight = 34;   // default pixel size of one picker element
        let listItemHeight = (clientHeight / 2)
        let pickerPosition = ((elementPickerPosition - 1) * onePickerHeight + (onePickerHeight / 2)) - listItemHeight;
        let dataPos = `${pickerPosition}px`;
        setTop(dataPos);
    },[])
    
    return (
        <div className="conatiner-other-elements" ref={myListContainer} style={{top}}>
            <ul className="other-elements-inner">
                {data && data.map((item, key) => {
                    function buttonHandlerFunc() {
                        closeDropDown();
                        item.buttonHandler();
                    }
                    return (
                        <React.Fragment> <li key={key} onClick={buttonHandlerFunc}>{item.text}</li></React.Fragment>

                    )
                })}
            </ul>
        </div>

    )
}
