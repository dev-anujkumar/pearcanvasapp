/**
* Root Component of Citation Group Element Component.
*/

import React, { useContext } from 'react';
import TinyMceEditor from "../tinyMceEditor";
// import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import { CitationGroupContext } from '../ElementContainer/ElementCitationContext'

const CGTinyMCE = (props) => {
    const context = useContext(CitationGroupContext)

     /**
     * Creates Citation Title element if not present.
     */
    const createPopupUnit = (popupField, forceupdate, index, parentElement) => {
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        config.popupCreationCallInProgress = true
        props.createPopupUnit(popupField, parentElement, (currentElementData) => context.handleBlur(forceupdate, currentElementData, index, null), index, config.slateManifestURN)
    }

    const editorProps = {
        permissions : context.permissions,
        element : context.element,
        index : `${context.index}-0`,
        className : "citationTitle",
        id : context.id,
        placeholder : "Enter Title...",
        tagName : 'h4',
        model : context.element.contents && context.element.contents["formatted-title"] && context.element.contents["formatted-title"].html.text ? context.element.contents["formatted-title"].html.text : '',
        currentElement : context.element.contents && context.element.contents["formatted-title"],
        handleEditorFocus : context.handleFocus,
        handleBlur  :  context.handleBlur,
        slateLockInfo : context.slateLockInfo,
        elementId : context.elementId,
        citationField  :  "formatted-title",
        createPopupUnit
    }
    /**
     * Creates Title/Subtitle element if not present.
     */
    
    return (
        <TinyMceEditor {...editorProps} />
    )
}

CGTinyMCE.displayName = "CitationGroupTinyMCE";

CGTinyMCE.contextType = CitationGroupContext;

export default CGTinyMCE