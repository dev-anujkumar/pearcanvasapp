import React from 'react'

const CopyUrn = props => {

    const copyToClipBoard = (e, text) => {
        e.stopPropagation();
        const tempElement = document.createElement('textarea');
        tempElement.value = text;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand('copy');
        document.body.removeChild(tempElement);
        props.toggleCopyMenu(false);
        let linkNotification = document.getElementById('link-notification');
        if(text.includes('work')) {
            linkNotification.innerText = "Work URN copied to clipboard";
        } else {
            linkNotification.innerText = "Manifest URN copied to clipboard";
        }
        linkNotification.style.display = "block";
        setTimeout(() => {
            linkNotification.style.display = "none";
            linkNotification.innerText = "";
        }, 4000);
    }

    return (
        <div style={{ left: `${props.copyClickedX}px`, top: `${props.copyClickedY}px` }} className={'copyUrn'} onClick={(e) => { copyToClipBoard(e, props.elementId) }}>
            Copy {props.elementId.includes('work') ? 'Work' : 'Manifest'} URN
        </div>
    )
}

export default CopyUrn;