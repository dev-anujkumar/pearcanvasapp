/**
*  Common Header Component for Media Elements
*/
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import config from '../../config/config';
import TextField from "@material-ui/core/TextField";
import TinyMceEditor from "../tinyMceEditor";
import dropdown_arrow_icon from '../../images/FigureHeader/dropdown-arrow.svg';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, setAutoNumberSettingValue, getLabelNumberPreview, getContainerNumber, getLabelNumberFieldValue, getContainerEntityUrn, getFigureIndexDefault, getNumberValue, getNumberData } from './AutoNumber_helperFunctions';
import { getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, removeUnoClass } from '../../constants/utility';
import { labelHtmlData } from '../../constants/Element_Constants';

const { 
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_RESUME_NUMBER,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_NUMBER,
    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES

export const FigureHeader = (props) => {
    const AUTO_NUMBER_SETTING_DROPDOWN_VALUES = [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER]
    const slateAncestors = useSelector((state) => state.appStore.currentSlateAncestorData)
    const figImageList = useSelector((state) => state.autoNumberReducer.figImageList)
    const autoNumberingDetails = useSelector((state) => state.autoNumberReducer.autoNumberingDetails)

    const [figureLabelValue, setFigureLabelValue] = useState(props.model?.displayedLabel ?? 'Figure');
    const [figureLabelData, setFigureLabelData] = useState(['Figure', 'Table', 'Equation']);//props.figureDropdownData
    const [labelNumberSetting, setLabelNumberSetting] = useState('Default Auto-number');
    //const [labelNumberSettingList, setLabelNumberSettingList] = useState(AUTO_NUMBER_SETTING_DROPDOWN_VALUES);
    const [labelDropDown, setLabelDropDown] = useState(false);
    const [labelNumberSettingDropDown, setLabelNumberSettingDropDown] = useState(false);
    const [showLabelField, setShowLabelField] = useState(true);
    const [showNumberField, setShowNumberField] = useState(true);
    // const [state,setState] = useState({
    //     figureLabelValue: props.model?.displayedLabel ?? 'Figure',
        
    // })
    useEffect(() => {
        const dropdownVal = setAutoNumberSettingValue(props.model)
        setLabelNumberSetting(dropdownVal)
    }, [])

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
            setLabelNumberSetting(newSettings)
            if (newSettings === AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                setShowLabelField(false)
                setShowNumberField(false)
            }
            else {//if(newSettings === AUTO_NUMBER_SETTING_RESUME_NUMBER || newSettings === AUTO_NUMBER_SETTING_OVERRIDE_NUMBER)
                setShowLabelField(true)
                setShowNumberField(true)
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
            setFigureLabelValue(newValue)
        }
    }
    /**---------------------------------------- */

    const onFigureHeaderFieldFocus = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) { // BG-5075
            labelElement?.nextElementSibling?.classList?.add('transition-none');
        }
        props.updateFigureImageDataForCompare(props.model.figuredata);
    }

    const onFigureHeaderFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.remove('transition-none');
        }
        // BG-5081 fixes
        if (id === '0-0' && labelElement?.innerHTML) {
            let dropdownData = convertOptionsToLowercase(figureLabelData);
            if (dropdownData.indexOf(labelElement?.innerHTML.toLowerCase()) > -1) {
                let figureLabelVal = figureLabelValue;
                let labelElementText = labelElement?.innerHTML.toLowerCase();
                figureLabelVal = labelElementText.charAt(0).toUpperCase() + labelElementText.slice(1);
                setFigureLabelValue(figureLabelVal)
            }
        }
    }
    const { figureHtmlData, previewClass, figLabelClass, figTitleClass, onFigureImageFieldBlur, onFigureImageFieldFocus } = props
    const containerNumber = getContainerNumber(slateAncestors, autoNumberingDetails) //F,B,P1,23
    const figIndexParent = getContainerEntityUrn(slateAncestors);
    const imgLabelValue = getLabelNumberFieldValue(props.model, figureLabelValue, containerNumber)//props.model?.displayedLabel ?? 'Figure'
    const parentNumber = containerNumber//'test'//getNumberValue(props.model, figureIndex, containerNumber, figIndexParent)//onfig.imageCount++
    let imgNumberValue = ''//getNumberData(figIndexParent,props.model)
    if (props.model.contentUrn) {
        //imgNumberValue = config.autoNumberElementsIndex.figureImageIndex[figIndexParent][props.model.contentUrn]
        imgNumberValue = figIndexParent && config.imageIndex[figIndexParent][props.model.contentUrn]
    }
    const previewData = getLabelNumberPreview(props.model, { imgLabelValue, imgNumberValue, parentNumber })
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
                    <div className="figure-number-dropdown" >
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
                    </div>
                </div>}
                {showLabelField && labelNumberSetting !== AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER && labelDropDown &&
                    <div className="figure-dropdown" >
                        <ul>
                            {figureLabelData.map((label, i) => {
                                return (
                                    <li key={i} onClick={() => { changeLabelValue(figureLabelValue, label) }}>{label}</li>
                                )

                            })}
                        </ul>
                    </div>
                }
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
                    <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-1`} placeholder="Number" tagName={'h4'} className={figLabelClass + " figureNumber "} model={imgNumberValue} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
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
                <TinyMceEditor onFigureImageFieldFocus={onFigureImageFieldFocus} onFigureImageFieldBlur={onFigureImageFieldBlur} permissions={props.permissions} openGlossaryFootnotePopUp={props.openGlossaryFootnotePopUp} element={props.model} handleEditorFocus={props.handleFocus} handleBlur={props.handleBlur} index={`${props.index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass + " figureTitle "} model={'This is sample title'} slateLockInfo={props.slateLockInfo} glossaryFootnoteValue={props.glossaryFootnoteValue} glossaaryFootnotePopup={props.glossaaryFootnotePopup} elementId={props.elementId} parentElement={props.parentElement} showHideType={props.showHideType} />
                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
            </div>
        </>
    );
}

export default FigureHeader;