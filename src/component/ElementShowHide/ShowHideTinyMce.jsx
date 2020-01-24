/**
* Root Component of Interactive Element Component.
*/

import React, { useContext } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import TinyMceEditor from "../tinyMceEditor";
// import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import '../../styles/ElementShowHide/ElementShowHide.css'
import { deleteShowHideUnit } from "../ElementContainer/ElementContainer_Actions.js"
import ListElement from '../ListElement'
import ElementContainerContext from '../ElementContainer/ElementContainerContext.js'
const ShowHideTinyMce = (props) => {
    const context = useContext(ElementContainerContext)
    const { permissions,
        openAssetPopoverPopUp,
        openGlossaryFootnotePopUp,
        handleFocus,
        handleBlur,
        index,
        elementId,
        element,
        model,
        slateLockInfo,
        onListSelect,
        glossaryFootnoteValue,
        glossaaryFootnotePopup
     } = context;
     const {currentElement,activeShowHide,createShowHideElement,deleteShowHideUnit,innerIndex,placeholder,showHideType} = props;
    if (currentElement.type == 'element-list') {
        <ListElement
            permissions={permissions}
            openAssetPopoverPopUp={openAssetPopoverPopUp}
            openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            index={props.index}
            elementId={currentElement.id}
            element={element}
            model={currentElement.html}
            slateLockInfo={slateLockInfo}
            onListSelect={onListSelect}
            glossaryFootnoteValue={glossaryFootnoteValue}
            glossaaryFootnotePopup={glossaaryFootnotePopup} />
    }
    return (
        <TinyMceEditor permissions={permissions}
            openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
            element={element}
            index={props.index}
            innerIndex={innerIndex}
            placeholder={placeholder}
            id={currentElement.id}
            model={props.model}
            handleEditorFocus={handleFocus}
            handleBlur={handleBlur}
            slateLockInfo={slateLockInfo}
            glossaryFootnoteValue={glossaryFootnoteValue}
            glossaaryFootnotePopup={glossaaryFootnotePopup}
            elementId={elementId}
            activeShowHide={activeShowHide}
            showHideType={showHideType}
            createShowHideElement={createShowHideElement}
            currentElement={currentElement}
            onListSelect={onListSelect}
            deleteShowHideUnit={deleteShowHideUnit}
        />)
}

ShowHideTinyMce.displayName = "ElementShowHide";

ShowHideTinyMce.defaultProps = {
    /** Detail of element in JSON object */
    itemId: ""
}

ShowHideTinyMce.propTypes = {

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func,
    /** itemId coming from c2module */
    itemId: PropTypes.string
}

ShowHideTinyMce.contextType = ElementContainerContext;

export default ShowHideTinyMce
// export default ElementShowHide;