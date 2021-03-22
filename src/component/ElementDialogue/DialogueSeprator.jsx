import React, { useState } from 'react'
import Button from './../ElementButtons';
import Tooltip from '../Tooltip';

export default function DialogueSeprator(props) {

    const [showDetails, setDetails] = useState(false);

    return (

        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                    showDetails && <div style={{ position: 'absolute', zIndex:1 }}>
                        <Tooltip tooltipText="Dailouge Element">
                            <Button
                                onClick={(event) => {
                                    setDetails(!showDetails)
                                }}
                                className="dropbtn"
                                type="expand"
                            />
                        </Tooltip>
                        <Tooltip tooltipText="Stage Direction">
                            <Button
                                onClick={(event) => {
                                    setDetails(!showDetails)
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