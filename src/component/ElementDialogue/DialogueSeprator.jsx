import React, { useState } from 'react'
import Button from './../ElementButtons';
import Tooltip from '../Tooltip';
import { connect } from 'react-redux';
import { addScriptElement } from './DialougeActions';


const defaultSDElement = {
    "type": "stagedirection",
    "text": "<p></p>"
}

const defaultDialougeElement = {
    "type": "lines",
    "characterName": "",
    "text": "<p></p>"
}


const DialogueSeprator = (props) => {

    const [showDetails, setDetails] = useState(false);
    const { index, elementIndex, firstOne } = props;
    const updatedIndex = firstOne ?  index : index+1;
    return (
        <div
            className="elementSapratorContainer"
            style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div style={{ position: 'relative' }}>
                <Tooltip tooltipText="Element Picker">
                    <Button
                        onClick={(event) => {
                            setDetails(!showDetails)
                        }}
                        className="dropbtn"
                        type="expand"
                    />
                </Tooltip>
                {
                    showDetails && <div style={{ position: 'absolute', zIndex: 1 }}>
                        <Tooltip tooltipText="Dailouge Element">
                            <Button
                                onClick={(event) => {
                                    // add dialouge element
                                    props.addScriptElement(elementIndex, updatedIndex, defaultDialougeElement);
                                    setDetails(false);
                                }}
                                className="dropbtn"
                                type="dialogue-element"
                            />
                        </Tooltip>
                        <Tooltip tooltipText="Stage Direction">
                            <Button
                                onClick={(event) => {
                                    // add stage direction
                                   
                                    props.addScriptElement(elementIndex, updatedIndex, defaultSDElement);
                                    setDetails(false);
                                }}
                                className="dropbtn"
                                type="stage-direction"
                            />
                        </Tooltip>
                    </div>
                }
            </div>

        </div>
    )
}

const dispatchProps = {
    addScriptElement
}
export default connect(null, dispatchProps)(DialogueSeprator)