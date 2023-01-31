import React from 'react'
import store from '../../appstore/store';
import config from './../../config/config';
import { popupCutCopyParentData} from '../FigureHeader/AutoNumberActions';
import elementConstant from '../ElementSaprator/ElementSepratorConstants';

// function to be called on click of refresh option
const refreshElement = (props) => {
    let index = null;
    // handling blockquote index for element refresh 
    if(props?.element?.elementdata?.type === 'blockquote' && props?.index) {
        index = props?.index + '-0';
    }
    props.handleBlur(true, null, index, null, null, null, 'REFRESH_ELEMENT');
    // calling the function to close copy menu 
    props.toggleCopyMenu(false);
}

const CutCopyDialog = props => {
    
    const positionStyle = { left: `${props.copyClickedX}px`, top: `${props.copyClickedY}px` }
    const popupSlateNotAcceptedTypes = ['groupedcontent', 'showhide', 'citations', 'element-citation', 'poetry', 'stanza'];
    const refreshRestrictedElementTypes = ['groupedcontent', 'showhide', 'citations', 'element-aside', 'manifestlist', 'popup', 'discussion', 'poetry', 'element-dialogue', 'openerelement', 'element-generateLOlist', 'element-learningobjectivemapping', 'element-pdf', 'element-assessment', 'manifest'];
    let allowToShowOptions = config.isPopupSlate && popupSlateNotAcceptedTypes.includes(props?.element?.type) ? false : true;
    const showRefreshOption = (refreshRestrictedElementTypes.includes(props?.element?.type) || (props?.element?.type == 'figure' && props?.element?.figuretype === 'assessment')) ? false : true 
    return (
        <div style={positionStyle} className="copy-menu-container">
            <div className="copy-menu">
                {allowToShowOptions && renderCutCopyOption(props)}
                <div className="copyUrn" onClick={(e) => { copyToClipBoard(e, props) }}>Copy {props.element.id.includes('work') ? 'Work' : 'Manifest'} URN</div>
            </div>
            {
                showRefreshOption && <div className="copyUrn" onClick={() => refreshElement(props)}>
                    Refresh
                </div>
            }
            <div className='blockerBgDiv' tabIndex="0" onClick={(e) => { hideAPOOnOuterClick(e, props.toggleCopyMenu) }}></div>
        </div>
    )
}

export default CutCopyDialog;

export const renderCutCopyOption = (componentProps) => {
    const { userRole,permissions, asideData, element: { type,subtype } } = componentProps
    const acceptedTypes = ["element-authoredtext", "element-blockfeature", "element-learningobjectives", "element-list", "figure", "stanza", "element-citation","citations","poetry","groupedcontent","showhide","discussion","popup","element-dialogue"],
            allowedRoles = ["admin", "manager", "edit", "default_user"]
    if ((acceptedTypes.includes(type) || (subtype))  && (allowedRoles.includes(userRole) ||  permissions.includes('cut/copy')) && asideData?.parent?.subtype !== elementConstant.TAB && asideData?.grandParent?.asideData?.parent?.subtype !== elementConstant.TAB) {
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
        sourceElementIndex: componentProps.index,
        tcmFlag: componentProps?.tcmFlag
    }
    componentProps.setElementDetails(elementDetailsToSet)
    componentProps.toggleCopyMenu(false);
    const popupParentData = store.getState().autoNumberReducer?.popupParentSlateData;
    const isPopupSlate = popupParentData?.isPopupSlate;
    const parentData = store.getState().appStore?.slateLevelData;
    const newParentData = JSON.parse(JSON.stringify(parentData));
    const slateStatus = newParentData[config.slateManifestURN]?.status;
    let data = {
        contentUrn: isPopupSlate ? popupParentData?.contentUrn : '',
        versionUrn: isPopupSlate ? popupParentData?.versionUrn : '',
        index: componentProps?.index,
        isPopupSlate: isPopupSlate ? popupParentData?.isPopupSlate : false,
        parentSlateEntityUrn: isPopupSlate ? popupParentData?.parentSlateEntityUrn : Object.values(componentProps?.slateLevelData)[0]?.contentUrn,
        parentSlateId: isPopupSlate ? popupParentData?.parentSlateId : Object.keys(componentProps?.slateLevelData)[0],
        operationType: type,
        isSlateApproved: slateStatus === 'approved' ? true : false
    }
    popupCutCopyParentData(data);
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
