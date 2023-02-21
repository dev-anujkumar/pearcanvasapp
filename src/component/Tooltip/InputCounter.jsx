import React, { useState,useEffect } from "react";
import './InputCounter.css'
import plus from './plus.svg';
import minus from './minus.svg'

const InputCounter = (props) => {
    const [counter,setCoutner] = useState(1)
    const handleIncrement = () => {
        if(counter >= 5) {
            setCoutner(5)
        } else {
        setCoutner(counter + 1)
        }
    }
    const handleDecrement = () => {
        if(counter <= 1) {
            setCoutner(1)
        } else {
        setCoutner(counter - 1)
        }
    }

    useEffect(() => {
        props.setElementCount({[props.elementType]: counter})
    },[counter])
    return (
        <div class="number">
            <span class="minus" onClick={handleDecrement}><img src={minus} /></span>
            <input type="number" min="0" max="5"  value={counter} />
            <span class="plus" onClick={handleIncrement}><img src={plus} /></span>
        </div>
    )
}

export default InputCounter;