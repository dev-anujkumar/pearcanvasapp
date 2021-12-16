/**
*  Common Header Component for Media Elements
*/
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import TextField from "@material-ui/core/TextField";
import TinyMceEditor from "../tinyMceEditor";
import { updateAutoNumberingDropdownForCompare } from '../ElementContainer/ElementContainer_Actions.js';
import dropdown_arrow_icon from '../../images/FigureHeader/dropdown-arrow.svg';
import { setAutoNumberSettingValue, getLabelNumberPreview, getContainerNumber, getLabelNumberFieldValue, getContainerEntityUrn, getNumberData } from './AutoNumber_helperFunctions';
import { checkHTMLdataInsideString } from '../../constants/utility';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from './AutoNumberConstants';
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
function useOutsideAlerter(ref, setLabelNumberSettingDropDown, setLabelDropDown) {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                const div = ref.current;
                if (div?.className === 'figure-number-dropdown') {
                    setLabelNumberSettingDropDown(false);
                } else if (div?.className === 'figure-dropdown') {
                    setLabelDropDown(false);
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

export const FigureHeader = (props) => {
    const AUTO_NUMBER_SETTING_DROPDOWN_VALUES = [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER]
    const [slateAncestors, setSlateAncestors] = useState(props.currentSlateAncestorData || {});
    const [figureLabelValue, setFigureLabelValue] = useState(props.model?.displayedLabel ?? 'Figure');
    const [figureLabelData, setFigureLabelData] = useState(['Figure', 'Table', 'Equation']);//props.figureDropdownData
    const [labelNumberSetting, setLabelNumberSetting] = useState(null);
    const [labelDropDown, setLabelDropDown] = useState(false);
    const [labelNumberSettingDropDown, setLabelNumberSettingDropDown] = useState(false);
    const [showLabelField, setShowLabelField] = useState(true);
    const [showNumberField, setShowNumberField] = useState(true);
    const [state, setState] = useState({
        slateAncestors: props.currentSlateAncestorData || {},
        figureLabelData: ['Figure', 'Table', 'Equation'],
        figureLabelValue: props.model?.displayedLabel ?? 'Figure',
        labelNumberSetting: null,
        labelDropDown: false,
        labelNumberSettingDropDown: false,
        showLabelField: true,
        showNumberField: true
    });
    const settingDropdownWrapperRef = useRef(null);
    useOutsideAlerter(settingDropdownWrapperRef, setLabelNumberSettingDropDown, setLabelDropDown);
    const labelDropdownWrapperRef = useRef(null);
    useOutsideAlerter(labelDropdownWrapperRef, setLabelNumberSettingDropDown, setLabelDropDown);

    useEffect(() => {
        const dropdownVal = setAutoNumberSettingValue(props.model)
        setLabelNumberSetting(dropdownVal)
    }, [])
    useEffect(() => {
        if (props.activeElement.elementId === props.model.id) {
            props.handleBlur();
        }
    }, [props.autoNumberOption]);
    useEffect(() => {
        setSlateAncestors(props.currentSlateAncestorData);
    }, [props.currentSlateAncestorData]);
    // console.log('figImageList', figImageList)
    // console.log('config.imageIndex',config.imageIndex)
    /**---------------------------------------- */
    const handleCloseDropDrown = () => {
        setLabelDropDown(false)
        setLabelNumberSettingDropDown(false)
    }
    /**---------------------------------------- */
    const handleSettingsDropdown = () => {
        setLabelDropDown(false)
        setLabelNumberSettingDropDown(!labelNumberSettingDropDown)
    }
    const changeAutoNumberSettings = (oldSettings, newSettings) => {
        handleCloseDropDrown();
        if (oldSettings !== newSettings) {
            setLabelNumberSetting(newSettings);
            if (newSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                setShowLabelField(false)
                setShowNumberField(false)
            }
            else {//if(newSettings === AUTO_NUMBER_SETTING_RESUME_NUMBER || newSettings === AUTO_NUMBER_SETTING_OVERRIDE_NUMBER)
                setShowLabelField(true)
                setShowNumberField(true)
            }
            props.updateAutoNumberingDropdownForCompare(newSettings);
        }
    }
    /**---------------------------------------- */
    const handleLabelDropdown = () => {
        setLabelDropDown(!labelDropDown)
        setLabelNumberSettingDropDown(false)
    }

    const changeLabelValue = (oldValue, newValue) => {
        handleCloseDropDrown();
        if (oldValue !== newValue) {
            setFigureLabelValue(newValue)
        }
    }


    const { figureHtmlData, previewClass, figLabelClass, figTitleClass, onFigureImageFieldBlur, onFigureImageFieldFocus } = props
    const containerNumber = getContainerNumber(slateAncestors, props.autoNumberingDetails) //F,B,P1,23
    const figIndexParent = getContainerEntityUrn(slateAncestors);
    const imgLabelValue = getLabelNumberFieldValue(props.model, figureLabelValue, containerNumber)//props.model?.displayedLabel ?? 'Figure'
    const parentNumber = containerNumber
    let imgNumberValue = getNumberData(figIndexParent, props.model, props.autoNumberElementsIndex || {})
    const previewData = getLabelNumberPreview(props.model, { imgLabelValue, imgNumberValue, parentNumber })
    console.log("figure header content", figureHtmlData, previewData);
    return (
        <>
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
                {showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && <div className='figure-label-field'>
                    <span className={`label ${labelDropDown ? 'active' : ''}`}>Label</span>
                    <div className="figure-label" onClick={handleLabelDropdown}>
                        <span>{imgLabelValue}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                        {showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && labelDropDown &&
                            <div className="figure-dropdown" style={{top: '10px', left: 0}} ref={labelDropdownWrapperRef} >
                                <ul>
                                    {figureLabelData.map((label, i) => {
                                        return (
                                            <li key={i} onClick={() => { changeLabelValue(figureLabelValue, label) }}>{label}</li>
                                        )

                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>}
                {
                    showLabelField && labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ?
                        <div className='image-label'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(imgLabelValue) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>
                        :
                        <div className='image-label hide-field'>
                            <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                        </div>
                }
                {showNumberField && <div className="floating-number-group">
                    <TinyMceEditor contenteditable={labelNumberSetting !== AUTO_NUMBER_SETTING_DEFAULT} onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-1`} placeholder="Number" tagName={'h4'} className={figLabelClass + " figureNumber "} model={imgNumberValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                    <label className={"transition-none"}>Number</label>
                </div>}

            </header>
            <div className="preview">
                <label className={"transition-none"}>Preview</label>
                <form className={previewClass} noValidate autoComplete="off" >
                    <TextField id="filled-full-width" label="" placeholder="" multiline variant="filled" value={previewData} fullWidth />
                </form>
            </div>
            <div className="floating-title-group">
                <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
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
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(FigureHeader);