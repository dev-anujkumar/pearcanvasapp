import React, { useState } from 'react'
import Button from './../ElementButtons';
import Tooltip from '../Tooltip';
import { connect } from 'react-redux';


const defaultSDElement = {
    type: "stagedirection",
    text: "<p></p>"
}

const defaultDialougeElement = {
    type: "lines",
    characterName: '<p></p>',
    text: '<p><span class="dialogueLine"><br></span></p>'
}


const DialogueSeprator = (props) => {

    const [showDetails, setDetails] = useState(false);
    const { index, elementIndex, firstOne, element: psElement } = props;
    const updatedIndex = firstOne ?  index : index+1;
    return (
        <div
            className="elementSapratorContainer"
            style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='elemDiv-hr'>
                <hr className='horizontalLine' />
            </div>
            <div style={{ position: 'relative' }}>
                <Tooltip direction='picker' tooltipText="Element Picker" showDetails={showDetails}>
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
                        <Tooltip tooltipText="Dialogue Element">
                            <Button
                                onClick={(event) => {
                                    // add dialouge element

                                    props.addElement(elementIndex, updatedIndex, defaultDialougeElement, psElement);
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
                                   
                                    props.addElement(elementIndex, updatedIndex, defaultSDElement, psElement);
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
}
export default connect(null, dispatchProps)(DialogueSeprator)