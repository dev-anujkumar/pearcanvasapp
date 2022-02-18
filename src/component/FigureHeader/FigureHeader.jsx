/**
*  Common Header Component for Media Elements
*/
import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import config from '../../config/config';
import TextField from "@material-ui/core/TextField";
import TinyMceEditor from "../tinyMceEditor";
import { updateAutoNumberingDropdownForCompare, updateAudioVideoDataForCompare } from '../ElementContainer/ElementContainer_Actions.js';
import { setAutoNumberSettingValue, getLabelNumberPreview, getContainerNumber, getLabelNumberFieldValue, getContainerEntityUrn, getNumberData, getValueOfLabel } from './AutoNumber_helperFunctions';
import { checkHTMLdataInsideString } from '../../constants/utility';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, LABEL_DROPDOWN_VALUES } from './AutoNumberConstants';
import { IMAGE, TABLE, MATH_IMAGE, AUDIO, VIDEO, labelHtmlData, INTERACTIVE, TABLE_AS_MARKUP, AUTHORED_TEXT, CODELISTING } from '../../constants/Element_Constants';
import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureImage.css';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';

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
    const [figureLabelValue, setFigureLabelValue] = useState(props.model?.displayedlabel ?? props.model?.manualoverride?.overridelabelvalue ?? '');
    const [figureLabelData, setFigureLabelData] = useState([]);
    const [labelNumberSetting, setLabelNumberSetting] = useState(setAutoNumberSettingValue(props.model));
    const [labelDropDown, setLabelDropDown] = useState(false);
    const [labelNumberSettingDropDown, setLabelNumberSettingDropDown] = useState(false);
    const [showLabelField, setShowLabelField] = useState(true);
    const [showNumberField, setShowNumberField] = useState(true);
    const [currentLabelValue, setCurrentLabelValue] = useState(getLabelNumberFieldValue(props.model, figureLabelValue, labelNumberSetting));
    const [currentNumberValue, setCurrentNumberValue] = useState("");
    const settingDropdownWrapperRef = useRef(null);
    useOutsideAlerter(settingDropdownWrapperRef, setLabelNumberSettingDropDown, setLabelDropDown);
    const labelDropdownWrapperRef = useRef(null);
    useOutsideAlerter(labelDropdownWrapperRef, setLabelNumberSettingDropDown, setLabelDropDown);
    const updateDropdownOptions = () => {
        let figureLabelDropdownVal = [];
        const figureCustom = props.figureDropdownData.imageCustom ? [ ...props.figureDropdownData.image, ...props.figureDropdownData.imageCustom] : props.figureDropdownData.image;
        const audioCustom = props.figureDropdownData.audioCustom ? [ ...props.figureDropdownData.audio, ...props.figureDropdownData.audioCustom] : props.figureDropdownData.audio;
        const videoCustom = props.figureDropdownData.videoCustom ? [ ...props.figureDropdownData.video, ...props.figureDropdownData.videoCustom] : props.figureDropdownData.video;
        const interactiveCustom = props.figureDropdownData.interactiveCustom ? [ ...props.figureDropdownData.interactive, ...props.figureDropdownData.interactiveCustom] : props.figureDropdownData.interactive;
        const tableasmarkupCustom = props.figureDropdownData.tableasmarkupCustom ? [...props.figureDropdownData.tableasmarkup, ...props.figureDropdownData.tableasmarkupCustom] : props.figureDropdownData.tableasmarkup;
        const mathmlCustom = props.figureDropdownData.mathmlCustom ? [...props.figureDropdownData.mathml, ...props.figureDropdownData.mathmlCustom] : props.figureDropdownData.mathml;
        const preformattedtextCustom = props.figureDropdownData.preformattedtextCustom ? [...props.figureDropdownData.preformattedtext, ...props.figureDropdownData.preformattedtextCustom] : props.figureDropdownData.preformattedtext;

        switch (props.model.figuretype) {
            case AUDIO:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? audioCustom : props.figureDropdownData.audio;
                break;
            case VIDEO:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? videoCustom : props.figureDropdownData.video;
                break;
            case IMAGE: case TABLE: case MATH_IMAGE:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? figureCustom : props.figureDropdownData.video;
                break;
            case INTERACTIVE:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? interactiveCustom : props.figureDropdownData.smartlinks;
                break;
            case TABLE_AS_MARKUP:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? tableasmarkupCustom : props.figureDropdownData.tableasmarkup;
                break;
            //AUTHORED_TEXT is for Math ML
            case AUTHORED_TEXT:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? mathmlCustom : props.figureDropdownData.mathml;
                break;
            case CODELISTING:
                figureLabelDropdownVal = props.isAutoNumberingEnabled ? preformattedtextCustom : props.figureDropdownData.preformattedtext;
                break;
            default:
                figureLabelDropdownVal = [];
                break;
        }
        setFigureLabelData(figureLabelDropdownVal)
    }
    useEffect(() => {
        const dropdownVal = setAutoNumberSettingValue(props.model)
        setLabelNumberSetting(dropdownVal);
        props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: dropdownVal});
        updateDropdownOptions();
        if (!props?.model.hasOwnProperty('displayedlabel')) {
            let label = getValueOfLabel(props?.model?.figuretype);
            setFigureLabelValue(label);
        }
    }, [])
    useEffect(() => {
        if (props.activeElement.elementId === props.model.id) {
            props.handleBlur();
        }
    }, [props.autoNumberOption]);
    useEffect(() => {
        updateDropdownOptions();
        const figIndexParent3 = getContainerEntityUrn(props.currentSlateAncestorData);
        let activeNumber = getNumberData(figIndexParent3, props.model, props.autoNumberElementsIndex || {})
        if(activeNumber && typeof activeNumber === 'string' && activeNumber.trim() !== ""){
            activeNumber?.replace(/&nbsp;/g, ' ')
        }
        setCurrentNumberValue(activeNumber)
    }, [props.autoNumberElementsIndex]);
    useEffect(() => {
        updateDropdownOptions(); // update the dropdown options if any new value is introduced via Controlled Vocab in the Project Settings
    }, [props.figureDropdownData]);
    useEffect(() => {
        setSlateAncestors(props.currentSlateAncestorData);
        const figIndexParent2 = getContainerEntityUrn(props.currentSlateAncestorData);
        let currentNumber = getNumberData(figIndexParent2, props.model, props.autoNumberElementsIndex || {})
        if(currentNumber && typeof currentNumber === 'string' && currentNumber.trim() !== ""){
            currentNumber?.replace(/&nbsp;/g, ' ')
        }
        setCurrentNumberValue(currentNumber)
    }, [props.currentSlateAncestorData]);
    useEffect(() => {
        updateDropdownOptions();
        const defaultElementLabel = getValueOfLabel(props.model?.figuretype) || props.model?.manualoverride?.overridelabelvalue || ''
        setFigureLabelValue(props.model?.displayedlabel ?? defaultElementLabel);
    }, [props.model.figuretype]);
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
            props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: newSettings});
            if (newSettings === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && document.getElementById(`cypress-${props.index}-0`)) {
                document.getElementById(`cypress-${props.index}-0`).innerHTML = `${props?.model?.displayedlabel || props?.model?.manualoverride?.overridelabelvalue || ''}`;
            }
            if (newSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                setShowLabelField(false)
                setShowNumberField(false)
            } else {
                setShowLabelField(true)
                setShowNumberField(true)
            }
            if (oldSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER || oldSettings === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER) {
                updateDropdownOptions();
                setFigureLabelValue(props.model?.displayedlabel);
            }
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
            setFigureLabelValue(newValue);
            document.getElementById(`cypress-${props.index}-0`).innerHTML = `${newValue}`;
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
        const imagetypes = ['image','table','mathImage']
        if (imagetypes.indexOf(props?.model?.figuretype) > -1) {
            props.updateFigureImageDataForCompare(props.model.figuredata);
        } else if (props?.model?.figuretype == 'audio' || props?.model?.figuretype == 'video') {
            props.updateAudioVideoDataForCompare(props.model.figuredata);
        }

        props.updateAutoNumberingDropdownForCompare({entityUrn: props.model.contentUrn, option: labelNumberSetting});
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

    const handleFigureLabelChange = (evt, fieldType) => {
        if (fieldType == 'Label') {
            setCurrentLabelValue(evt.target.innerText?.replace(/&nbsp;/g, ' '))
        } else {
            if (evt?.target?.innerText?.length > 9) {
                return false;
            }
            let isnum = true;
            if (evt?.target?.innerText?.length > 0) {
                const numberVal = parseInt(evt.target.innerText)
                isnum = /^[1-9][0-9]*$/.test(numberVal);
            }
            if (labelNumberSettingDropDown === AUTO_NUMBER_SETTING_RESUME_NUMBER && !isnum) {
                return false;
            } else {
                setCurrentNumberValue(evt.target.innerText?.replace(/&nbsp;/g, ' ')?.replaceAll('&nbsp;', ' '));
            }
        }
    }
    const { figureHtmlData, figLabelClass, figTitleClass } = props
    const containerNumber = getContainerNumber(slateAncestors, props.autoNumberingDetails) //F,B,P1,23
    const figIndexParent = getContainerEntityUrn(slateAncestors);
    let imgLabelValue = getLabelNumberFieldValue(props.model, figureLabelValue, labelNumberSetting);
    let imgNumberValue = getNumberData(figIndexParent, props.model, props.autoNumberElementsIndex || {})
    imgNumberValue = props?.model?.manualoverride?.hasOwnProperty('overridelabelvalue') && labelNumberSetting === AUTO_NUMBER_SETTING_RESUME_NUMBER ? '' : imgNumberValue;
    const previewData = getLabelNumberPreview(props.model, { imgLabelValue, imgNumberValue, parentNumber:containerNumber, currentLabelValue,labelNumberSetting, currentNumberValue })
    imgNumberValue = `${imgNumberValue?.toString()}`
    const newClass = labelNumberSetting === AUTO_NUMBER_SETTING_DEFAULT ? 'disable-number-field': '';
    const removeLabelCondition = labelNumberSetting !== AUTO_NUMBER_SETTING_REMOVE_NUMBER ? true : false;
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
                {removeLabelCondition && showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && <div className='figure-label-field'>
                    <span className={`label ${labelDropDown ? 'active' : ''}`}>Label</span>
                    <div className="figure-label" onClick={handleLabelDropdown}>
                        <span>{imgLabelValue}</span>
                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                        {showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && labelDropDown &&
                            <div className="figure-dropdown" style={{top: '9px', left: 0}} ref={labelDropdownWrapperRef} >
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
                   removeLabelCondition &&  (showLabelField && labelNumberSetting === AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER ?
                        <div className='image-label'>
                            <TinyMceEditor onFigureLabelChange={handleFigureLabelChange} onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label" tagName={'h4'} className={figLabelClass + " figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(`<p>${imgLabelValue}</p>`) ? "transition-none" : "floating-label"}>Label</label>
                        </div>
                        :
                        <div className='image-label hide-field'>
                            <TinyMceEditor onFigureLabelChange={handleFigureLabelChange} onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-0`} placeholder="Label" tagName={'h4'} className={figLabelClass + " figureLabel "} model={imgLabelValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                            <label className={checkHTMLdataInsideString(`<p>${imgLabelValue}</p>`) ? "transition-none" : "floating-label"}>Label</label>
                        </div>)
                }
                {removeLabelCondition && showNumberField && <div className="floating-number-group">
                    <TinyMceEditor onFigureLabelChange={handleFigureLabelChange} labelNumberSetting={labelNumberSetting} contenteditable={labelNumberSetting !== AUTO_NUMBER_SETTING_DEFAULT} onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-1`} placeholder="Number" tagName={'h4'} className={figLabelClass + " figureNumber " + newClass} model={imgNumberValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                    <label className={checkHTMLdataInsideString(`<p>${imgNumberValue}</p>`) ? "transition-none" : "floating-number"}>Number</label>
                </div>}

            </header>
            <div className="preview">
                <label className={"transition-none"}>Preview</label>
                <TextField disabled id="filled-disabled" className={"figure-preview"} variant="filled" placeholder="" defaultValue="" multiline value={previewData} fullWidth />
            </div>
            <KeyboardWrapper enable index={`${props.index}-2`}>
                <div className="floating-title-group">
                    <TinyMceEditor onFigureImageFieldFocus={onFigureHeaderFieldFocus} onFigureImageFieldBlur={onFigureHeaderFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                    <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
                </div>
            </KeyboardWrapper>
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

export default connect(mapStateToProps, mapActionsToProps)(FigureHeader);