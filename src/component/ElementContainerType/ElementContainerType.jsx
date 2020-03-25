/**
 * Component for Conatiner Type Elements
 */
import React, { useEffect, useState } from 'react'
export default function ElementContainerType(props) {
    const { closeDropDown, splithandlerfunction,index } = props
    let data = [
        {
            buttonType: 'interactive-elem',
            buttonHandler: () => splithandlerfunction('interactive-elem',index),
            text: 'Add Existing Interactive',
        },
        {
            buttonType: 'interactive-elem',
            buttonHandler: () => splithandlerfunction(),
            text: 'Add Show Hide',
        },
        {
            buttonType: 'interactive-elem',
            buttonHandler: () => splithandlerfunction(),
            text: 'Add Pop-up',
        }
    ]
    return (
        <div className="">
            <ul>
                {data.map((item, key) => {
                    function buttonHandlerFunc() {
                        closeDropDown();
                        item.buttonHandler();

                    }
                    return (
                        <React.Fragment> <li onClick={buttonHandlerFunc}>{item.text}</li></React.Fragment>

                    )
                })}
            </ul>
        </div>

    )
}
