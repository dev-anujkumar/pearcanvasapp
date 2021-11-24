/**
*  Common Header Component for Media Elements
*/
import React, { useState } from 'react';
import TinyMceEditor from "../tinyMceEditor";
import { getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, removeUnoClass } from '../../constants/utility';
export const FigureHeader = (props) => {
    // const [figureDropDown, setFigureDropDown] = useState(false);
    // const [figureLabelData, setFigureLabelData] = useState(props.figureDropdownData);
    // const [figureLabelValue, setFigureLabelValue] = useState('No Label');
    // const [figureNumberLabelValue, setFigureNumberLabelValue] = useState('Default Auto-number');
    // const [figureDropDown, setFigureDropDown] = useState(false);
    // const [figureDropDown, setFigureDropDown] = useState(false);
    // // const { searchClass, searchId, maxInputLimit, placeholderText, searchValueHandler } = props;

    // const onFigureImageFieldFocus = (id) => {
    //     let labelElement = document.getElementById(`cypress-${id}`);
    //     if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
    //         labelElement?.nextElementSibling?.classList?.add('label-color-change');
    //     } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) { // BG-5075
    //         labelElement?.nextElementSibling?.classList?.add('transition-none');
    //     }
    //     props.updateFigureImageDataForCompare(props.model.figuredata);
    // }
    // const handleFigureDropdown = () => {
    //     setFigureDropDown(!figureDropDown)
    // }

    // const handleCloseDropDrown = () => {
    //     setFigureDropDown(false)
    // }
    // const onFigureImageFieldBlur = (id) => {
    //     let labelElement = document.getElementById(`cypress-${id}`);
    //     if (labelElement?.nextElementSibling) {
    //         labelElement?.nextElementSibling?.classList?.remove('label-color-change');
    //     }
    //     if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
    //         labelElement?.nextElementSibling?.classList?.remove('transition-none');
    //     }
    //     // BG-5081 fixes
    //     if (id === '0-0' && labelElement?.innerHTML) {
    //         let dropdownData = convertOptionsToLowercase(figureLabelData);
    //         if (dropdownData.indexOf(labelElement?.innerHTML.toLowerCase()) > -1) {
    //             let figureLabelVal = figureLabelValue;
    //             let labelElementText = labelElement?.innerHTML.toLowerCase();
    //             figureLabelVal = labelElementText.charAt(0).toUpperCase() + labelElementText.slice(1);
    //             setFigureLabelValue(figureLabelVal)
    //         }
    //     }
    // }
    // let figureHtmlData = getLabelNumberTitleHTML(model);
    // let { figureLabelValue } = state;
    // let { figureNumberLabelValue } = state;
    // let figureLabelFromApi = checkHTMLdataInsideString(figureHtmlData.formattedLabel);
    // let dropdownData = convertOptionsToLowercase(figureLabelData);

    // if (dropdownData.indexOf(figureLabelFromApi.toLowerCase()) > -1) {
    //     figureLabelFromApi = figureLabelFromApi.toLowerCase();
    //     figureLabelValue = figureLabelFromApi.charAt(0).toUpperCase() + figureLabelFromApi.slice(1);
    // } else if (figureLabelFromApi === '' && figureLabelValue === 'No Label') {
    //     figureLabelValue = 'No Label';
    // } else if (figureLabelFromApi !== '' && figureLabelValue === 'Custom') {
    //     figureLabelValue = 'Custom';
    // }
    return (
        <>
            {/* <header className="figure-header new-figure-image-header">
                <div className='figure-label-number-field'>
                    <span className={`label ${state.figureNumberDropDown ? 'active' : ''}`}>Label & Number Settings</span>
                    <div className="figure-label-number" onClick={handleFigureNumberDropdown}>
                        <span>{figureNumberLabelValue}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                    </div>
                </div>
                {state.figureNumberDropDown &&
                    <div className="figure-number-dropdown" ref={wrapperRef}>
                        <ul>
                            {BLANK_NUMBER_LABEL_OPTIONS.map((label, i) => {
                                return (
                                    <li key={i} onClick={() => { changeFigureLabel(figureLabelValue, label); handleCloseDropDrown() }}>{label}</li>
                                )
                            })}
                        </ul>
                    </div>
                }
                <div className='figure-label-field'>
                    <span className={`label ${state.figureDropDown ? 'active' : ''}`}>Label</span>
                    <div className="figure-label" onClick={handleFigureDropdown}>
                        <span>{figureLabelValue}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                    </div>
                </div>
                {state.figureDropDown &&
                    <div className="figure-dropdown" ref={wrapperRef}>
                        <ul>
                            {state.figureLabelData.map((label, i) => {
                                return (
                                    <li key={i} onClick={() => { changeFigureLabel(figureLabelValue, label); handleCloseDropDrown() }}>{label}</li>
                                )

                            })}
                        </ul>
                    </div>
                }
                {
                    figureLabelValue === 'Custom' ?
                        <div className='image-label'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>
                        :
                        <div className='image-label hide-field'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>
                }
                <div className="floating-number-group">
                    <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-1`} placeholder="Number" tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                    <label className={checkHTMLdataInsideString(figureHtmlData.formattedNumber) ? "transition-none" : "floating-number"}>Number</label>
                </div>

            </header>
            <div className="preview">
                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Preview</label>
                <form className={previewClass} noValidate autoComplete="off" >
                    <TextField id="filled-full-width" label="PreviewData" variant="filled" fullWidth />
                </form>
            </div>
            <div className="floating-title-group">
                <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
            </div> */}
        </>
    );
}
