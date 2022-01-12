import React from 'react'
/**Import Components */
import TinyMceEditor from "../tinyMceEditor";
/**Import Functions */
import { checkHTMLdataInsideString } from '../../constants/utility';
/**Import Constants */
import { BLOCK_CODE, BLOCK_CODE_DIV_CLASS, MATH_ML_DIV_CLASS, BLOCK_CODE_PLACEHOLDER, MATH_ML_PLACEHOLDER, BLOCK_CODE_TAG_NAME, MATH_ML_TAG_NAME, BLOCK_CODE_CLASS_NAME, MATH_ML_CLASS_NAME } from './ElementFigure_Constants'

const BlockMathCode = (props) => {
    let { figureHtmlData, processedText, posterText } = props.figureTypeData
    let elementType = props?.model?.figuretype
    let divClass = (elementType === BLOCK_CODE ? BLOCK_CODE_DIV_CLASS : MATH_ML_DIV_CLASS),
        placeHolder = (elementType === BLOCK_CODE ? BLOCK_CODE_PLACEHOLDER : MATH_ML_PLACEHOLDER),
        tagName = (elementType === BLOCK_CODE ? BLOCK_CODE_TAG_NAME : MATH_ML_TAG_NAME),
        tinyMceClass = (elementType === BLOCK_CODE ? BLOCK_CODE_CLASS_NAME : MATH_ML_CLASS_NAME),
        model = (elementType === BLOCK_CODE ? processedText : posterText);

    return (
        <div className={divClass}>
            <TinyMceEditor onFigureImageFieldFocus={props.onFigureImageFieldFocus} onFigureImageFieldBlur={props.onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-3`} placeholder={placeHolder} tagName={tagName} className={tinyMceClass} model={model} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
            {
                elementType === BLOCK_CODE ?
                    <label className={(figureHtmlData.preformattedText === '' || figureHtmlData.preformattedText == undefined) ? "floating-code-content" : "transition-none"}>{BLOCK_CODE_PLACEHOLDER}</label>
                    : <label className={checkHTMLdataInsideString(props?.model?.html?.text) ? "transition-none" : "floating-math-content"}>{MATH_ML_PLACEHOLDER}</label>
            }
        </div>
    )
}

export default BlockMathCode
