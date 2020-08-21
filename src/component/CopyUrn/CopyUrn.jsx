import React from 'react'

const CopyUrn = props => {

    const copyToClipBoard = (e,text) => {
        e.stopPropagation();
        const tempElement = document.createElement('textarea');
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
        props.toggleCopyMenu(false);
    }

    return (
        <div style={{left : `${props.copyClickedX}px` , top : `${props.copyClickedY}px`}} className={'copyUrn'} onClick={(e) => { copyToClipBoard(e,props.elementId) }}>
            Copy {props.elementId.includes('work') ? 'Work' : 'Manifest'} URN
        </div>
    )
}

export default CopyUrn;