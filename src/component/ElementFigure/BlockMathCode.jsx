import React from 'react'
/**Import Components */
import TinyMceEditor from "../tinyMceEditor";
/**Import Functions */
import { getLabelClass } from "./ElementFigure_Utility";
/**Import Constants */
import { BLOCK_CODE, BLOCK_MATH_CODE_CLASSES } from './ElementFigure_Constants';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';

const BlockMathCode = (props) => {
    let { processedText, posterText } = props?.figureTypeData
    const replacePosterText = posterText?.replace("<p>", '')?.replace("</p>", '');
    let elementType = props?.model?.figuretype
    let { divClass, placeHolder, tagName, tinyMceClass } = BLOCK_MATH_CODE_CLASSES[`${elementType}`]
    let model = (elementType === BLOCK_CODE ? processedText : replacePosterText);

    return (
        <KeyboardWrapper index={`${props.index}-3`} enable={props.isEnableKeyboard}>
            <div className={divClass}>
                <TinyMceEditor onFigureImageFieldFocus={props.onFigureImageFieldFocus}
                onFigureImageFieldBlur={props.onFigureImageFieldBlur} permissions={props.permissions}
                openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model}
                handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-3`}
                placeholder={placeHolder} tagName={tagName} className={tinyMceClass} model={model}
                slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue}
                glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement}
                showHideType={props.showHideType} />
                <label className={getLabelClass(elementType, props)}>{placeHolder}</label>
            </div>
        </KeyboardWrapper>
    )
}

export default BlockMathCode
