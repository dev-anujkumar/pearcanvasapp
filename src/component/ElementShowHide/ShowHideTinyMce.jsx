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
    const { currentElement, activeShowHide, createShowHideElement, deleteShowHideUnit, innerIndex, placeholder, showHideType } = props;
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
            glossaaryFootnotePopup={glossaaryFootnotePopup}
            showHideType={showHideType} />
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

ShowHideTinyMce.propTypes = {

    /** Index of the element */
    index: PropTypes.string,
    /** Nested index of the element */
    innerIndex: PropTypes.number,
    /**  Html to show of the element */
    model: PropTypes.string,
    /**  Handler to show active show hide element */
    activeShowHide: PropTypes.func,
     /**  Placeholder of the element */
    placeholder: PropTypes.string,
      /**  Type of the element : Show,hide,reveal */
    showHideType: PropTypes.string,
     /** Stores the object of the current element of the show hide */
    currentElement: PropTypes.object,
       /** Handler to create new show hide on enter */
    createShowHideElement: PropTypes.func,
     /** Handler to delete new show hide on backspace */
    deleteShowHideUnit: PropTypes.func,
}

ShowHideTinyMce.contextType = ElementContainerContext;

export default ShowHideTinyMce