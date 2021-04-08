import React from 'react'
import config from './../../config/config';
const CutCopyDialog = props => {

    const positionStyle = { left: `${props.copyClickedX}px`, top: `${props.copyClickedY}px` }
    return (
        <div style={positionStyle} className="copy-menu-container">
            <div className="copy-menu">
                {!config.isPopupSlate && renderCutCopyOption(props)}
                <div className="copyUrn" onClick={(e) => { copyToClipBoard(e, props) }}>Copy {props.element.id.includes('work') ? 'Work' : 'Manifest'} URN</div>
            </div>
            
            <div className='blockerBgDiv' tabIndex="0" onClick={(e) => { hideAPOOnOuterClick(e, props.toggleCopyMenu) }}></div>
        </div>
    )
}

export default CutCopyDialog;

export const renderCutCopyOption = (componentProps) => {
    const { userRole,permissions, element: { type,subtype } } = componentProps
    const acceptedTypes = ["element-authoredtext", "element-blockfeature", "element-learningobjectives", "element-list", "figure", "stanza", "element-citation","citations","poetry","groupedcontent"],
            allowedRoles = ["admin", "manager", "edit", "default_user"];
    if ((acceptedTypes.includes(type) || (subtype))  && (allowedRoles.includes(userRole) ||  permissions.includes('cut/copy')) ) {
        return (
            <>
                <div className="copyUrn" onClick={(e) => performCutCopy(e, componentProps, "copy")}>
                    Copy Selection
                </div>
                <div className="copyUrn" onClick={(e) => performCutCopy(e, componentProps, "cut")}>
                    Cut Selection
                </div>
            </>
        )
    }
    return null
}

export const performCutCopy = (event, componentProps, type) => {
    event.stopPropagation()
    let elementDetailsToSet = {
        element: {
            ...componentProps.element
        },
        operationType: type,
        activeAnimation: true,
        sourceElementIndex: componentProps.index
    }
    componentProps.setElementDetails(elementDetailsToSet)
    componentProps.toggleCopyMenu(false)
}

export const copyToClipBoard = (e, _props) => {
    e.stopPropagation();
    const text = _props.element.id || _props.element.versionUrn
    const tempElement = document.createElement('textarea');
    tempElement.value = text;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand('copy');
    document.body.removeChild(tempElement);
    _props.toggleCopyMenu(false);
    let linkNotification = document.getElementById('link-notification');
    if (linkNotification) {
        if (text.includes('work')) {
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
}

export const hideAPOOnOuterClick = (e, toggleCopyMenu) => {
    toggleCopyMenu(false);
    e.stopPropagation();
}
