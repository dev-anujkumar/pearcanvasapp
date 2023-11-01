/**
* Root Component of Citation Group Element Component.
*/

import React, { useContext } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import config from '../../config/config.js';
import { getTitleSubtitleModel } from "../../constants/utility.js";
import { labelHtmlData } from '../../constants/Element_Constants';

const onTabTitleFieldFocus = (id) => {
    let labelElement = document.getElementById(`cypress-${id}`);
    if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
        labelElement?.nextElementSibling?.classList?.add('label-color-change');
    } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) {
        labelElement?.nextElementSibling?.classList?.add('transition-none');
    } else if (labelHtmlData.includes(labelElement?.innerHTML)) {
        labelElement?.nextElementSibling?.classList?.add('transition-none');
    }
}

const onTabTitleFieldBlur = (id) => {
    let labelElement = document.getElementById(`cypress-${id}`);
    if (labelElement?.nextElementSibling) {
        labelElement?.nextElementSibling?.classList?.remove('label-color-change');
    }
    if (labelHtmlData.includes(labelElement?.innerHTML)) {
        labelElement?.nextElementSibling?.classList?.remove('transition-none');
        labelElement?.nextElementSibling?.classList?.add('floating-title');
    }
}


const TabbedTinyMCE = (props) => {
    const editorProps = {
        permissions : props.permissions,
        element : props.element,
        currentElement : props.element,
        index : `${props.index}-0`,
        className : "figureTitle formatted-text",
        id : props.id,
        tagName : 'h4',
        model : props.element?.hasOwnProperty('html') && props.element["html"].title ?
                getTitleSubtitleModel(props.element["html"].title, "formatted-subtitle").replace(/&nbsp;/g, ""): `<p class="paragraphNumeroUno"><br/></p>`,
        handleEditorFocus : props.handleFocus,
        handleBlur  :  props.handleBlur,
        slateLockInfo : props.slateLockInfo,
        onTabTitleFieldFocus : onTabTitleFieldFocus,
        onTabTitleFieldBlur : onTabTitleFieldBlur,
        // elementId : context.element.contents && context.element.contents["formatted-title"] && context.element.contents["formatted-title"].id,
        parentElement : props.parentElement,
        tabTitle : true
    }

    return (
        <TinyMceEditor {...editorProps} />
    )
}

export default TabbedTinyMCE