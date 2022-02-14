/**
*  Common Header Component for Media Elements
*/
import React, { useRef, useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import TextField from "@material-ui/core/TextField";
import TinyMceEditor from "../tinyMceEditor";
import { updateAutoNumberingDropdownForCompare, updateAudioVideoDataForCompare } from '../ElementContainer/ElementContainer_Actions.js';
import { setAutoNumberSettingValue, getLabelNumberPreview, getContainerNumber, getLabelNumberFieldValue, getContainerEntityUrn, getNumberData } from '../FigureHeader/AutoNumber_helperFunctions';
import { checkHTMLdataInsideString } from '../../constants/utility';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, SIDEBAR, WORKED_EXAMPLE } from '../FigureHeader/AutoNumberConstants';
import { labelHtmlData } from '../../constants/Element_Constants';
import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureImage.css';

const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, setState) {
    useEffect(() => {
        
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                const div = ref.current;
                if (div?.className === 'figure-number-dropdown') {
                    setState({ labelNumberSettingDropDown: false });
                } else if (div?.className === 'figure-dropdown') {
                    setState({ labelDropDown: false });
                }
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
  

export const ContainerHeader = (props) => {
    const AUTO_NUMBER_SETTING_DROPDOWN_VALUES = [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER]
    const [slateAncestors, setSlateAncestors] = useState(props.currentSlateAncestorData || {});
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            elementLabelValue: props.model?.displayedlabel ?? 'Aside',
            elementLabelData: [],
            labelNumberSetting: null,
            labelDropDown: false,
            labelNumberSettingDropDown: false,
            showLabelField: true,
            showNumberField: true
        }
    );

    const settingDropdownWrapperRef = useRef(null);
    useOutsideAlerter(settingDropdownWrapperRef, setState);
    const labelDropdownWrapperRef = useRef(null);
    useOutsideAlerter(labelDropdownWrapperRef, setState);
    const updateDropdownOptions = () => {
        let elementLabelDropdownVal = [];
        switch (props?.model?.subtype) {
            case SIDEBAR:
                elementLabelDropdownVal = props.isAutoNumberingEnabled ? ['Aside'] : [];
                break;
            case WORKED_EXAMPLE:
                elementLabelDropdownVal = props.isAutoNumberingEnabled ? ['Worked Example'] : [];
                break;
            default:
                elementLabelDropdownVal = [];
                break;
        }
        setState({ elementLabelData: elementLabelDropdownVal });
    }
    useEffect(() => {
        const dropdownVal = setAutoNumberSettingValue(props.model);
        setState({ labelNumberSetting: dropdownVal });
        props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: dropdownVal});
        updateDropdownOptions();
    }, [])
    useEffect(() => {
        if (props.activeElement.elementId === props.model.id && props?.autoNumberOption?.entityUrn === props?.model?.contentUrn) {
            props.handleBlur();
        }
    }, [props.autoNumberOption]);
    useEffect(() => {
        setSlateAncestors(props.currentSlateAncestorData);
    }, [props.currentSlateAncestorData]);
    // useEffect(() => {
    //     updateDropdownOptions();
    //     setFigureLabelValue(props.model?.displayedlabel ?? 'Figure');
    // }, [props.model.figuretype]);
    /**---------------------------------------- */
    const handleCloseDropDrown = () => {
        setState({ labelDropDown: false, labelNumberSettingDropDown: false });
    }
    /**---------------------------------------- */
    const handleSettingsDropdown = () => {
        setState({ labelDropDown: false, labelNumberSettingDropDown: !state.labelNumberSettingDropDown });
    }
    const changeAutoNumberSettings = (oldSettings, newSettings) => {
        handleCloseDropDrown();
        if (oldSettings !== newSettings) {
            setState({ labelNumberSetting: newSettings });
            props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: newSettings});
            if (newSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                setState({ showLabelField: false, showNumberField: false });
            } else {
                setState({ showLabelField: true, showNumberField: true });
            }
            if (oldSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER || oldSettings === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) {
                updateDropdownOptions();
                setState({ elementLabelValue: props.model?.displayedlabel ?? 'Aside' });
            }
        }
    }
    /**---------------------------------------- */
    const handleLabelDropdown = () => {
        setState({ labelDropDown: !state.labelDropDown, labelNumberSettingDropDown: false });
    }

    const changeLabelValue = (oldValue, newValue) => {
        handleCloseDropDrown();
        if (oldValue !== newValue) {
            setState({ elementLabelValue: newValue });
            document.getElementById(`cypress-${props.index}-t1`).innerHTML = `${newValue}`;
            props.handleBlur();
        }
    }

    const onFigureHeaderFieldFocus = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) { // BG-5075
            labelElement?.nextElementSibling?.classList?.add('transition-none');
        }

        props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: state.labelNumberSetting});
    }

    const onFigureHeaderFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.remove('transition-none');
            if (id === '0-0') {
                labelElement?.nextElementSibling?.classList?.add('floating-label');
            } else {
                labelElement?.nextElementSibling?.classList?.add('floating-number');
            }
        }
    }

    const { labelNumberSetting, labelNumberSettingDropDown, showLabelField, showNumberField, labelDropDown, elementLabelData, elementLabelValue } = state;
    const containerNumber = getContainerNumber(slateAncestors, props.autoNumberingDetails) //F,B,P1,23
    const figIndexParent = getContainerEntityUrn(slateAncestors);
    let imgLabelValue = getLabelNumberFieldValue(props.model, elementLabelValue, containerNumber);
    imgLabelValue = labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ? props?.model?.displayedlabel : imgLabelValue;
    const parentNumber = containerNumber;
    let imgNumberValue = getNumberData(figIndexParent, props.model, props.autoNumberElementsIndex || {});
    const previewData = getLabelNumberPreview(props.model, { imgLabelValue, imgNumberValue, parentNumber })
    imgNumberValue = `${imgNumberValue?.toString()}`
    const newClass = labelNumberSetting === AUTO_NUMBER_SETTING_DEFAULT ? 'disable-number-field': '';
    const removeLabelCondition = labelNumberSetting !== AUTO_NUMBER_SETTING_REMOVE_NUMBER ? true : false;
    return (
        <>
        <div className="asideHeader">
            <header className="figure-header new-figure-image-header">
                <div className='figure-label-number-field'>
                    <span className={`label ${labelNumberSettingDropDown ? 'active' : ''}`}>Label & Number Settings</span>
                    <div className="figure-label-number" onClick={handleSettingsDropdown}>
                        <span>{labelNumberSetting}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                    </div>
                </div>
                {labelNumberSettingDropDown &&
                    <div className="figure-number-dropdown" ref={settingDropdownWrapperRef}>
                        <ul>
                            {AUTO_NUMBER_SETTING_DROPDOWN_VALUES.map((label, i) => {
                                return (
                                    <li key={i} onClick={() => { changeAutoNumberSettings(labelNumberSetting, label); }}>{label}</li>
                                )
                            })}
                        </ul>
                    </div>
                }
                {removeLabelCondition && showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && <div className='figure-label-field'>
                    <span className={`label ${labelDropDown ? 'active' : ''}`}>Label</span>
                    <div className="figure-label" onClick={handleLabelDropdown}>
                        <span>{imgLabelValue}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                        {showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && labelDropDown &&
                            <div className="figure-dropdown" style={imgLabelValue === 'Worked Example' ? {width: '132px', top: '9px', left: 0} : {top: '9px', left: 0} } ref={labelDropdownWrapperRef} >
                                <ul>
                                    {elementLabelData.map((label, i) => {
                                        return (
                                            <li key={i} onClick={() => { changeLabelValue(elementLabelValue, label) }}>{label}</li>
                                        )

                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>}
                {
                   removeLabelCondition &&  (showLabelField && labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ?
                        <div className='image-label'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-t1`} placeholder="Label Name" tagName={'h4'} className={"heading4Image50TextNumberLabel figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(`<p>${imgLabelValue}</p>`) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>
                        :
                        <div className='image-label hide-field'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-t1`} placeholder="Label Name" tagName={'h4'} className={"heading4Image50TextNumberLabel figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(`<p>${imgLabelValue}</p>`) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>)
                }
                {removeLabelCondition && showNumberField && <div className="floating-number-group">
                    <TinyMceEditor contenteditable={labelNumberSetting !== AUTO_NUMBER_SETTING_DEFAULT} onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-t2`} placeholder="Number" tagName={'h4'} className={"heading4Image50TextNumberLabel figureNumber " + newClass} model={imgNumberValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                    <label className={checkHTMLdataInsideString(`<p>${imgNumberValue}</p>`) ? "transition-none" : "floating-number"}>Number</label>
                </div>}

            </header>
            </div>
            <div className="preview">
                <label className={"transition-none"}>Preview</label>
                <TextField disabled id="filled-disabled" className="figure-preview" variant="filled" placeholder="" defaultValue="" multiline value={previewData} fullWidth />
            </div>
            <div className="floating-title-group">
                <TinyMceEditor onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-t3`} placeholder="Title" tagName={'h4'} className={"heading4Image25TextTitle figureTitle "} model={props?.elementHtmlData?.formattedTitle} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                <label className={checkHTMLdataInsideString(props?.elementHtmlData?.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    autoNumberOption: state.autoNumberReducer.autoNumberOption,
    currentSlateAncestorData: state.appStore.currentSlateAncestorData,
    activeElement: state.appStore.activeElement,
    autoNumberElementsIndex: state.autoNumberReducer.autoNumberElementsIndex,
    autoNumberingDetails: state.autoNumberReducer.autoNumberingDetails
})

const mapActionsToProps = (dispatch) => {
    return {
        updateAutoNumberingDropdownForCompare: (value) => {
            dispatch(updateAutoNumberingDropdownForCompare(value))
        },
        updateAudioVideoDataForCompare: (value) => {
            dispatch(updateAudioVideoDataForCompare(value))
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(ContainerHeader);