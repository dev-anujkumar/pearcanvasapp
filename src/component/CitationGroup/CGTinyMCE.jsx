/**
* Root Component of Citation Group Element Component.
*/

import React, { useContext } from 'react';
import TinyMceEditor from "../tinyMceEditor";
// import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import { CitationGroupContext } from '../ElementContainer/ElementCitationContext'
import { sendDataToIframe } from '../../constants/utility.js';
import config from '../../config/config.js';
import { getTitleSubtitleModel } from "../../constants/utility.js"

const CGTinyMCE = (props) => {
    const context = useContext(CitationGroupContext)

    const editorProps = {
        permissions : context.permissions,
        element : context.element,
        index : `${context.index}-0`,
        className : "citationTitle formatted-text",
        id : context.id,
        placeholder : "Enter Title...",
        tagName : 'h4',
        model : context.element.contents && context.element.contents["formatted-title"] && context.element.contents["formatted-title"].html && context.element.contents["formatted-title"].html.text ? getTitleSubtitleModel(context.element.contents["formatted-title"].html.text, "formatted-subtitle").replace(/&nbsp;/g, "") : `<p class="paragraphNumeroUno"><br/></p>`,
        currentElement : context.element.contents && context.element.contents["formatted-title"],
        handleEditorFocus : context.handleFocus,
        handleBlur  :  context.handleBlur,
        slateLockInfo : context.slateLockInfo,
        elementId : context.element.contents && context.element.contents["formatted-title"] && context.element.contents["formatted-title"].id,
        citationField  :  "formatted-title",
        createPopupUnit : (popupField, forceupdate, index, parentElement) => createPopupUnit(popupField, forceupdate, index, parentElement, props, context)
    }

    return (
        <TinyMceEditor {...editorProps} />
    )
}

CGTinyMCE.displayName = "CitationGroupTinyMCE";

export default CGTinyMCE

/**
 * Creates Citation Title element if not present.
 * @param {*} popupField undefined here
 * @param {*} forceupdate flag to forceupdate
 * @param {*} index index of element
 * @param {*} parentElement parent citations group element
 */
export const createPopupUnit = (popupField, forceupdate, index, parentElement, props, context) => {
    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
    config.popupCreationCallInProgress = true
    props.createPopupUnit(popupField, parentElement, (currentElementData) => context.handleBlur(forceupdate, currentElementData, index, null), index, config.slateManifestURN)
}