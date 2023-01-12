/**
* Root Component of Citation Group Element Component.
*/

import React, { useContext } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import config from '../../config/config.js';
import { getTitleSubtitleModel } from "../../constants/utility.js"

const TabbedTinyMCE = (props) => {
    const editorProps = {
        permissions : props.permissions,
        element : props.element,
        currentElement : props.element,
        index : `${props.index}-0`,
        className : "citationTitle tabTitle formatted-text",
        id : props.id,
        placeholder : "Enter tab name (max. 25 characters)",
        tagName : 'h4',
        // model : props.element?.groupdata.hasOwnProperty('title') && props.element.groupdata["title"].text ? getTitleSubtitleModel(props.element.groupdata["title"].text, "formatted-subtitle").replace(/&nbsp;/g, "") : `<p class="paragraphNumeroUno"><br/></p>`,
        model : `<p><em><strong>abcd</strong></em></p`,
        handleEditorFocus : props.handleFocus,
        handleBlur  :  props.handleBlur,
        slateLockInfo : props.slateLockInfo,
        // elementId : context.element.contents && context.element.contents["formatted-title"] && context.element.contents["formatted-title"].id,
        parentElement : props.parentElement,
        // citationAsideData : props.citationAsideData
    }

    return (
        <TinyMceEditor {...editorProps} />
    )
}

export default TabbedTinyMCE