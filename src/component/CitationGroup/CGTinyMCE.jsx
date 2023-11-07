/**
* Root Component of Citation Group Element Component.
*/

import React, { useContext } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { CitationGroupContext } from '../ElementContainer/ElementCitationContext'
import config from '../../config/config.js';
import { getTitleSubtitleModel, sendDataToIframe } from "../../constants/utility.js"
import { formattedTitleText } from '../../constants/Element_Constants';

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
        model : context.element.contents && context.element.contents[formattedTitleText] && context.element.contents[formattedTitleText].html && context.element.contents[formattedTitleText].html.text ? getTitleSubtitleModel(context.element.contents[formattedTitleText].html.text, "formatted-subtitle").replace(/&nbsp;/g, "") : `<p class="paragraphNumeroUno"><br/></p>`,
        currentElement : context.element.contents && context.element.contents[formattedTitleText],
        handleEditorFocus : context.handleFocus,
        handleBlur  :  context.handleBlur,
        slateLockInfo : context.slateLockInfo,
        elementId : context.element.contents && context.element.contents[formattedTitleText] && context.element.contents[formattedTitleText].id,
        citationField  :  formattedTitleText,
        createPopupUnit : (popupField, forceupdate, index, parentElement) => createPopupUnit(popupField, forceupdate, index, parentElement, props, context),
        parentElement : context.element,
        citationAsideData : props.citationAsideData
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
    config.popupCreationCallInProgress = true;
    let cgTitleFieldData = {};
    // PCAT-12764 - changed the name of asideData in props to citationAsideData for fixing bug
    // if (props.asideData?.parent?.type === "showhide") {
    //     cgTitleFieldData.asideData = props.asideData;
    //     cgTitleFieldData.parentElement = context.element;
    // }
    if (props?.citationAsideData?.parent?.type === "showhide") {
        cgTitleFieldData.asideData = props.citationAsideData;
        cgTitleFieldData.parentElement = context.element;
    }
    props.createPopupUnit(popupField, parentElement, (currentElementData) => context.handleBlur(true, currentElementData, index, null, null, cgTitleFieldData), index, config.slateManifestURN, null, cgTitleFieldData)
}
