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

    const [showDetails, setDetails] = useState(true);
    const { index, elementIndex } = props;
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
                                    console.log("i will add dialouge element here " + index + " , " + elementIndex)
                                    props.addScriptElement(elementIndex, index, defaultDialougeElement);
                                }}
                                className="dropbtn"
                                type="expand"
                            />
                        </Tooltip>
                        <Tooltip tooltipText="Stage Direction">
                            <Button
                                onClick={(event) => {
                                    // add stage direction
                                    console.log("i will add stage direction here" + index + " , " + elementIndex)
                                    props.addScriptElement(elementIndex, index, defaultSDElement);
                                }}
                                className="dropbtn"
                                type="expand"
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