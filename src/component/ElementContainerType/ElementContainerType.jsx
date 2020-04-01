/**
 * Component for Conatiner Type Elements
 */
import React from 'react'
import '../../styles/ElementContainerType/ElementContainerType.css'
export default function ElementContainerType(props) {
    const { closeDropDown,data,asideClass } = props
   if(data!=[]){
    return (
        <div className={`conatiner-other-elements ${asideClass ? asideClass : ''}`}>
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
    
}
