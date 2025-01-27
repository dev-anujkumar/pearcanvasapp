import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import elementList from './elementTypes.js';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
import { conversionElement, setBCEMetadata, updateBlockListMetadata, updateContainerMetadata, enableAsideNumbering } from './Sidebar_Action';
import { updateElement } from '../ElementContainer/ElementContainer_Actions';
import { setCurrentModule } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import './../../styles/Sidebar/Sidebar.css';
import { hasReviewerRole, getSlateType, getCookieByName, isSlateLocked, removeBlankSpaceAndConvertToLowercase } from '../../constants/utility.js'
import config from '../../../src/config/config.js';
import PopUp from '../PopUp/index.js';
import { SYNTAX_HIGHLIGHTING,CHANGE_ASSESSMENT_TYPE, INTENDED_PLAYBACK_CATEGORY, SUB_CATEGORY, CATEGORY, MODAL_MESSAGE,
        PRIMARY_SMARTLINK, SMARTLINK_ELEMENT_DROPDOWN_TITLE, SECONDARY_3PI_SMARTLINK, SET_AS_DECORATIVE_IMAGE,
        DISABLE_PLAYBACK_MODE_VENDORS } from '../SlateWrapper/SlateWrapperConstants.js';
import { showBlocker, hideBlocker,hideToc} from '../../js/toggleLoader';
import { customEvent } from '../../js/utils.js';
import { disabledPrimaryOption, MULTI_COLUMN_3C, intendedPlaybackModeDropdown, DECORATIVE_IMAGE, ELEMENT_ASSESSMENT_LOWERCASE, POINTER_EVENTS_NONE, PRIMARY_BLOCKCODE_EQUATION, ELEMENT_ASIDE, SIDEBAR_DISABLE } from '../../constants/Element_Constants.js';
import { POD_DEFAULT_VALUE } from '../../constants/Element_Constants';
import { SECONDARY_SINGLE_ASSESSMENT_LEARNOSITY } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js'
import { createPSDataForUpdateAPI } from '../ElementDialogue/DialogueElementUtils.js';
import { tcmButtonHandler } from '../CanvasWrapper/TCM_Canvas_Popup_Integrations';
import { Autocomplete, TextField } from '@mui/material';
import modalIcon from '../../images/Sidebar/modalIcon.svg'
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../FigureHeader/AutoNumberConstants.js';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        let elementType = this.props.activeElement.type || 'video-audio';
        let elementTypeList = elementList[elementType];
        let primaryFirstOption = Object.keys(elementTypeList)[0];
        let secondaryFirstOption = Object.keys(elementTypeList[primaryFirstOption].subtype)[0];
        let labelText = elementTypeList[primaryFirstOption].subtype[secondaryFirstOption].labelText;
        let numbered = this.props.activeElement.numbered;
        let startNumber = this.props.activeElement.startNumber || "1";
        let syntaxhighlighting = this.props.activeElement.syntaxhighlighting;
        let podwidth = this.props.activeElement.podwidth;
        this.state = {
            elementDropdown: '',
            fontBulletElementDropdown: '',
            activeElementId: this.props.activeElement.elementId || "",
            activeElementType: elementType,
            activePrimaryOption: primaryFirstOption,
            activefontStyle: "Font Type 1" ,
            activebulletIcon: "Bullet Color 1",
            activeSecondaryOption: secondaryFirstOption,
            activeLabelText: labelText,
            attrInput: "",
            bceToggleValue: numbered,
            syntaxHighlightingToggleValue: syntaxhighlighting,
            showSyntaxHighlightingPopup: false,
            updateAssessmentTypePopup: false,
            secondaryValue:'',
            secondaryLabel:'',
            bceNumberStartFrom: startNumber,
            podOption: false,
            podValue: podwidth,
            usageType: this.props.activeElement.usageType,
            decorativePopupWarning: false,
            sidebarValue: "",
            isPlayBackDropdownOpen: false,
            selectedIntendedPlaybackModeValue : this.props.activeElement?.selectedIntendedPlaybackModeValue
        };
        this.playbackModeRef = React.createRef();
        this.playbackModeLabelRef = React.createRef();
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if (Object.keys(nextProps.activeElement).length > 0) {
            let elementDropdown = prevState.elementDropdown;
            let fontBulletElementDropdown = prevState?.fontBulletElementDropdown;
            let podValue = prevState.podValue === undefined ? POD_DEFAULT_VALUE : prevState.podValue;
            let podOption = prevState.podOption;
            let isPlayBackDropdownOpen = prevState.isPlayBackDropdownOpen;
            let selectedIntendedPlaybackModeValue = prevState?.selectedIntendedPlaybackModeValue;
            if (nextProps.activeElement.elementId !== prevState.activeElementId) {
                elementDropdown = '';
                fontBulletElementDropdown = "";
                podValue = nextProps.activeElement.podwidth;
                podOption = false;
                isPlayBackDropdownOpen = false;
            }
            if(nextProps?.activeElement?.secondaryOption === SECONDARY_3PI_SMARTLINK && nextProps?.activeElement?.assetIdFor3PISmartlink){
                selectedIntendedPlaybackModeValue = nextProps?.activeElement?.selectedIntendedPlaybackModeValue;
            }
            return {
                elementDropdown: elementDropdown,
                fontBulletElementDropdown,
                activeElementId: nextProps.activeElement.elementId,
                activeElementType: nextProps.activeElement.elementType,
                activePrimaryOption: nextProps.activeElement.primaryOption,
                activefontStyle: nextProps?.activeElement?.fontStyle,
                activebulletIcon: nextProps?.activeElement?.bulletIcon,
                activeSecondaryOption: nextProps.activeElement.secondaryOption,
                activeLabelText: nextProps.activeElement.tag,
                bceNumberStartFrom: nextProps.activeElement.startNumber,
                bceToggleValue: nextProps.activeElement.numbered,
                syntaxHighlightingToggleValue: nextProps.activeElement.syntaxhighlighting,
                podValue: podValue,
                podOption: podOption,
                usageType: nextProps.activeElement.usageType,
                selectedIntendedPlaybackModeValue: selectedIntendedPlaybackModeValue,
                isPlayBackDropdownOpen: isPlayBackDropdownOpen
            };
        }

        return null;
    }

    handleClickOutside = (event) => {
        if (this.playbackModeRef && this?.playbackModeRef?.current && this.playbackModeLabelRef &&
            this?.playbackModeLabelRef?.current && !this.playbackModeRef?.current?.contains(event.target) &&
            !this.playbackModeLabelRef?.current?.contains(event.target)) {
            this.setState({
                isPlayBackDropdownOpen: false
            })
        }
    }
    /**handling intendedPlaymode on outside click*/
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    setToggleForAside = (activeElement, asideTitleData) => {
        if (activeElement && asideTitleData) {
            const asideObj = asideTitleData.filter(obj => {
                return obj.elementId === activeElement.elementId;
              })
            if (asideObj.length) {
                return asideObj[0].isAsideNumber;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    handlePrimaryOptionChange = (e) => {
      let value = e.target.getAttribute("data-value");
      this.setState({ sidebarValue: value });
      let secondaryelementList =
        elementList[this.state.activeElementType][value].subtype;
      let secondaryFirstOption = Object.keys(secondaryelementList)[0];
      let labelText = secondaryelementList[secondaryFirstOption].labelText;
      const {activefontStyle, activebulletIcon} = this.state

    // Retrieving values of image element fields
      let titleDOM = document.getElementById(`cypress-${this.props.activeElement.index}-0`),
      numberDOM = document.getElementById(`cypress-${this.props.activeElement.index}-1`),
      subtitleDOM = document.getElementById(`cypress-${this.props.activeElement.index}-2`),
      captionDOM = document.getElementById(`cypress-${this.props.activeElement.index}-3`),
      settingDOM = document.getElementById(`autonumberSetting`)

      let titleHTML = titleDOM ? titleDOM.innerHTML : "",
      numberHTML = numberDOM ? numberDOM.innerHTML : "",
      subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
      captionHTML = captionDOM ? captionDOM.innerHTML : "",
      settingHTML = settingDOM ? settingDOM.innerText : ""

      titleHTML = titleHTML.replace(/class="paragraphNumeroUno"/g, "").replace("<p >", '').replace(/<br>/g, '').replace("</p>", '')
      numberHTML = numberHTML.replace(/<br>/g, '').replace(/\&nbsp;/g, '').trim();
      subtitleHTML = subtitleHTML.replace(/<br>/g, '').replace(/\&nbsp;/g, '').trim();
      captionHTML = captionHTML.replace(/<br>/g, '').replace(/\&nbsp;/g, '').trim();

    // showing set to decorative image popup only if image element fields have any values in them
      let popupEnableCheckForDecoConversion = (((!this.props.isAutoNumberingEnabled && titleHTML === '' && numberHTML === '') ||
      (this.props.isAutoNumberingEnabled && titleHTML === 'Figure' && settingHTML === LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES.AUTO_NUMBER_SETTING_DEFAULT))
        && subtitleHTML === '' && captionHTML === '')
      this.setState({
        elementDropdown: "",
        fontBulletElementDropdown: "",
        activePrimaryOption: value,
        activeSecondaryOption: secondaryFirstOption,
        activeLabelText: labelText,
        podValue: POD_DEFAULT_VALUE,
        podOption: false,
      });
      const {asideData} = this.props;
      if (this.props.activeElement.elementId !== "" &&this.props.activeElement.elementWipType !== ELEMENT_ASSESSMENT_LOWERCASE) {
        if (this.props.activeElement.elementWipType == "manifestlist") {
        let blockListMetaDataPayload = {
            blockListData: {
                id:this.props.activeElement.elementId,
                contentUrn:this.props.activeElement.contentUrn
            },
            elementType: this.state.activeElementType,
            primaryOption: value,
            fontStyle: activefontStyle,
            iconColor: activebulletIcon,
            secondaryOption: secondaryFirstOption,
            elementWipType: this.props.activeElement.elementWipType,
            index: this.props.activeElement.index,
            labelText,
            blockListElement:true,
            toolbar: elementList[this.state.activeElementType][value].toolbar,
            slateLevelBLIndex:typeof this.props.activeElement.index==="number"?this.props.activeElement.index: this.props.activeElement.index.split("-"),
            dataToSend:{
                columnnumber : value.split('-')[value.split('-').length-1]
            },
            asideData:asideData
          }
          this.props.updateBlockListMetadata(blockListMetaDataPayload);
        } else {
            // checking if dont ask me again checkbox is checked
            const disableDIConversionWarning = getCookieByName("DISABLE_DI_CONVERSION_WARNING");
            if (value != this.props.activeElement.primaryOption && value === DECORATIVE_IMAGE) {
                if (disableDIConversionWarning) {
                    this.props.conversionElement({
                        elementId: this.props.activeElement.elementId,
                        elementType: this.state.activeElementType,
                        primaryOption: value,
                        fontBulletOption: value,
                        secondaryOption: secondaryFirstOption,
                        labelText,
                        toolbar: elementList[this.state.activeElementType][value].toolbar,
                    })
                }
                else {
                    popupEnableCheckForDecoConversion ?
                        this.props.conversionElement({
                            elementId: this.props.activeElement.elementId,
                            elementType: this.state.activeElementType,
                            primaryOption: value,
                            fontBulletOption: value,
                            secondaryOption: secondaryFirstOption,
                            labelText,
                            toolbar: elementList[this.state.activeElementType][value].toolbar,
                        })
                        :
                        this.handleDecorativePopup(true);
                }
            } else {
                this.props.conversionElement({
                    elementId: this.props.activeElement.elementId,
                    elementType: this.state.activeElementType,
                    primaryOption: value,
                    fontBulletOption: value,
                    secondaryOption: secondaryFirstOption,
                    labelText,
                    toolbar: elementList[this.state.activeElementType][value].toolbar,
                });
            }
        }
      }
    };

    handleFontBulletOptionChange = (e) => {
        let value = e.target.getAttribute("data-value");
        let primaryOptionValue = this.state.activePrimaryOption;
        let fontValue = this.state.activefontStyle;
        let iconColorValue = this.state.activebulletIcon;
        let toolbar = [];
        let dataToSend = {}
        if(this.state.activeElementType === "manifestlist"){
          if(value?.includes('font')){
                fontValue = value;
                toolbar = elementList["fontStyle"][value]?.toolbar;
                dataToSend.fontstyle = `fontStyle${fontValue?.split('-')[fontValue?.split('-').length-1]}`;
          } else if(value?.includes('bullet')){
                iconColorValue = value;
                toolbar = elementList["bulletIcon"][value]?.toolbar;
                dataToSend.iconcolor = `iconColor${iconColorValue?.split('-')[iconColorValue?.split('-').length-1]}`;
          }
        }

        let secondaryFirstOption = this.state.activeSecondaryOption;
        let labelText = this.state.activeLabelText;

      this.setState({
        fontBulletElementDropdown: "",
        activefontStyle: fontValue,
        activebulletIcon: iconColorValue,
      });
      const {asideData} = this.props;
      if (this.props.activeElement.elementId !== "" &&this.props.activeElement?.elementWipType !== ELEMENT_ASSESSMENT_LOWERCASE) {
        if (this.props.activeElement?.elementWipType == "manifestlist") {
        let blockListMetaDataPayload = {
            blockListData: {
                id:this.props.activeElement.elementId,
                contentUrn:this.props.activeElement.contentUrn
            },
            elementType: this.state.activeElementType,
            primaryOption: primaryOptionValue,
            fontStyle: fontValue,
            iconColor: iconColorValue,
            secondaryOption: secondaryFirstOption,
            elementWipType: this.props.activeElement?.elementWipType,
            index: this.props.activeElement.index,
            labelText,
            blockListElement:true,
            toolbar,
            slateLevelBLIndex:typeof this.props.activeElement.index==="number"?this.props.activeElement.index: this.props.activeElement.index.split("-"),
            dataToSend,
            asideData:asideData
          }
          this.props.updateBlockListMetadata(blockListMetaDataPayload);
        }
      }
    };

    toggleElementDropdown = e => {
        if (hasReviewerRole()) {
            return true
        }
        const { activePrimaryOption } = this.state
        if (e.target.dataset && e.target.dataset.element !== "secondary") {
            if (disabledPrimaryOption.indexOf(activePrimaryOption) > -1) {
                e.stopPropagation()
                return false
            }
        }
        let elementDropdown = e.target.getAttribute('data-element');


        if (elementDropdown == 'font' || elementDropdown == 'bullet'){
            if(this.state.fontBulletElementDropdown === elementDropdown)  elementDropdown = '';
            this.setState({fontBulletElementDropdown: elementDropdown});
        } else {
            if(this.state.elementDropdown === elementDropdown) elementDropdown = '';
            this.setState({elementDropdown, fontBulletElementDropdown: ""});
        }
        this.setState({
            podOption: false,
            isPlayBackDropdownOpen: false
        });
    }

    primaryOption = () => {
        const { activePrimaryOption } = this.state
        const isReadOnly =  hasReviewerRole() ? POINTER_EVENTS_NONE : ''
        let primaryOptions = '';
        if (this.state.activeElementType) {
            let className = ""
            let primaryOptionObject = elementList[this.state.activeElementType];
            let primaryOptionList = Object.keys(primaryOptionObject);
            const isSmartlinkElement = this.state.activePrimaryOption === PRIMARY_SMARTLINK ? SMARTLINK_ELEMENT_DROPDOWN_TITLE: '';
            if (primaryOptionList.length > 0) {
                if (this.state.activeElementType === ELEMENT_ASSESSMENT_LOWERCASE) {
                    delete primaryOptionList[1];
                }
                let disabledPrimaryOptions = ["primary-mathml-equation",
                    PRIMARY_BLOCKCODE_EQUATION, "primary-editor-table-equation",
                    "primary-elm-interactive", "primary-mmi", "primary-smartlink",
                    "primary-showhide", "primary-popup"];
                if (disabledPrimaryOptions.indexOf(activePrimaryOption) > -1) {
                    className = "disabled"
                }
                primaryOptions = primaryOptionList.map(item => {
                    if (item !== 'enumType' && item !== 'primary-mathml-equation' && item !== PRIMARY_BLOCKCODE_EQUATION && item !== 'primary-editor-table-equation') {
                        return <li key={item} data-value={item} onClick={this.handlePrimaryOptionChange}>
                            {primaryOptionObject[item].text}
                        </li>;
                    }
                });

                let active = '';
                if (this.state.elementDropdown === 'primary') {
                    active = 'active';
                }
                const sidebarDisableCondition = (this.props.activeElement?.elementType === ELEMENT_ASIDE &&
                    this.props.cutCopySelection?.element?.id === this.props.activeElement?.elementId &&
                    this.props.cutCopySelection?.operationType === "cut")
                primaryOptions = (this.props.activeElement.elementType !== "element-dialogue") ? <div
                    className={`element-dropdown ${sidebarDisableCondition ? SIDEBAR_DISABLE : ""}`}>
                    {isSmartlinkElement && <div className='categories'>{CATEGORY}</div>}
                    <div className={`element-dropdown-title ${className} ${isSmartlinkElement}`} data-element="primary" onClick={this.toggleElementDropdown}>
                        {primaryOptionObject[this.state.activePrimaryOption].text}
                        {disabledPrimaryOption.indexOf(activePrimaryOption) > -1 ? null : dropdownArrow}
                    </div>
                    <ul className={`element-dropdown-content primary-options ${active}`}>
                        {primaryOptions}
                    </ul>
                </div> : null;
            }

            return primaryOptions;
        }
        else if (this.props.activeElement.elementWipType == "element-learningobjectivemapping") {
            primaryOptions = <div className="learning-obejective-text"><b>Metadata Anchor</b>
                <div className="element-dropdown">
                    <div className="element-dropdown-title" data-element="primary">Learning Objective<svg className="dropdown-arrow"
                    viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg></div>
                </div>
            </div>

            return primaryOptions;
        }
        else if (this.props.activeElement.elementWipType == "element-generateLOlist") {
            primaryOptions = <div className="panel_show_module">
                <div className="learning-obejective-text"><b>Metadata Anchor</b></div>
                <p>Show Module Name</p>
                <label className="switch"><input type="checkbox" onClick={!config.savingInProgress && this.showModuleName}
                disabled={hasReviewerRole()} checked={this.props.showModule ? true : false} /><span className={`slider round ${isReadOnly}`}></span></label>
            </div>;
            return primaryOptions;
        }

    }

    fontBulletOption = (data) => {
        let dataValue = "";
        let dataElement;
        let fontBulletOptions = '';
        let fontBulletOptionObject = [];

        if(data === "fontStyle") {
            fontBulletOptionObject = elementList[data];
            dataElement = "font"
            dataValue =  this.state.activefontStyle
        } else if(data === "bulletIcon") {
            fontBulletOptionObject = elementList[data];
            dataElement = "bullet"
            dataValue = this.state.activebulletIcon
        }

        let className = ""
        let fontBulletOptionList = Object.keys(fontBulletOptionObject);
        fontBulletOptions = fontBulletOptionList.map(item => {
            if (item !== 'enumType') {
                return <li key={item} data-value={item} onClick={this.handleFontBulletOptionChange}>
                    {fontBulletOptionObject[item].text}
                </li>;
            }
        });

        let active = '';
        if ((data === "fontStyle" && this.state.fontBulletElementDropdown === 'font') || (data === "bulletIcon" &&  this.state.fontBulletElementDropdown === 'bullet')) {
            active = 'active';
        }
        const sidebarDisableCondition = (this.props.activeElement?.elementType === ELEMENT_ASIDE &&
        this.props.cutCopySelection?.element?.id === this.props.activeElement?.elementId && this.props.cutCopySelection?.operationType === "cut")

        fontBulletOptions = (this.props.activeElement.elementType !== "element-dialogue") ? <div
            className={`element-dropdown ${sidebarDisableCondition ? SIDEBAR_DISABLE : ""}`}>
            <div className={`element-dropdown-title ${className}`} data-element= {dataElement} onClick={this.toggleElementDropdown}>
                {fontBulletOptionObject[dataValue]?.text}
                {disabledPrimaryOption.indexOf(dataValue) > -1 ? null : dropdownArrow}
            </div>
            <ul className={`element-dropdown-content primary-options ${active}`}>
                {fontBulletOptions}
            </ul>
        </div> : null;

        return fontBulletOptions;
    }

    // function to toggle decorative popup
    handleSetDecorativeImagePopup = () => {
        showBlocker(false);
        this.props.showCanvasBlocker(false);
        hideBlocker();
        this.setState({
            decorativePopupWarning: false,
        })
    }

    // function called when set as decorative image button is clicked
    setDecorativeImage = () => {
        showBlocker(false);
        this.props.showCanvasBlocker(false);
        hideBlocker();
        this.setState({
            decorativePopupWarning: false,
        })
        let secondaryelementList =
        elementList[this.state.activeElementType][this.state.sidebarValue].subtype;
        let secondaryFirstOption = Object.keys(secondaryelementList)[0];
        let labelText = secondaryelementList[secondaryFirstOption].labelText;
        this.props.conversionElement({
            elementId: this.props.activeElement.elementId,
            elementType: this.state.activeElementType,
            primaryOption: this.state.sidebarValue,
            fontBulletOption: this.state.sidebarValue,
            secondaryOption: secondaryFirstOption,
            labelText,
            toolbar: elementList[this.state.activeElementType][this.state.sidebarValue].toolbar,
        });
    }

    showUpdateAssessmentTypePopup=()=>{
        this.props.showCanvasBlocker(true);
        hideToc();
        showBlocker(true);
        return(
            <PopUp
                togglePopup={this.handleUpdateAssessmentTypePopup}
                dialogText={CHANGE_ASSESSMENT_TYPE}
                warningHeaderText={`Warning`}
                lOPopupClass="lo-warning-txt"
                AssessmentPopup={true}
                agree={this.setUpdatedAssessmentType}
            />
        )
    }
    setUpdatedAssessmentType=(value)=>{
        showBlocker(false);
        this.props.showCanvasBlocker(false);
        hideBlocker();
        this.setState({
            updateAssessmentTypePopup: false,
        })
        this.setSecondary(this.state.secondaryValue,this.state.secondaryLabel);

    }

    handleUpdateAssessmentTypePopup = (value) => {
        showBlocker(false);
        this.props.showCanvasBlocker(false);
        hideBlocker();
            this.setState({
            updateAssessmentTypePopup: false,
            secondaryValue: "",
            secondaryLabel: ""
        })
    }

    handleSecondaryLanguageChange = (e,value) =>{
        const selectedValue = value?.item;
        const labelText = value?.labelText;
        this.setSecondary(selectedValue, labelText);
    }

    /**@description function handles the secondaryoption change dropdown */
    handleSecondaryOptionChange = e => {
        let value = '';
        // This if condition satisfied when we select any option from BCE dropdown
        if(e?.target?.tagName == "LI" && e?.target?.querySelector('span[data-value]')?.tagName == "SPAN"){
            value = e?.target?.querySelector('span[data-value]')?.getAttribute('data-value')?.toLowerCase();
        } else {
            value = e?.target?.getAttribute('data-value')?.toLowerCase();
        }
        let elementTypeList = elementList[this.state.activeElementType];
        let labelText = elementTypeList[this.state.activePrimaryOption].subtype[value].labelText;
        if (value === this.state.activeSecondaryOption) {
            this.setState({
                elementDropdown: ''
            })
            return null;
        }
        let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
        let assessmentNode= activeElement?.querySelector("div.pearson-component");
        let isAssessmentid = assessmentNode?.getAttribute("data-assessment") ?? undefined;
        if (this.props?.activeElement?.primaryOption === 'primary-single-assessment' && isAssessmentid) {
            this.setState({
                updateAssessmentTypePopup: true,
                secondaryValue: value,
                secondaryLabel: labelText,
                elementDropdown:'',
                activeSecondaryOption: value,
                activeLabelText: labelText,
                podOption: false,
                isPlayBackDropdownOpen: false
            });
        }
        else {
            this.setSecondary(value, labelText)
        }
    }

    /**@description sets the values form the selected dropdown
     * @param-value is AssessmentType selected from the dropdown
     * @param-labelText is the label of the Element
     */
    setSecondary=(value,labelText)=>{
        this.setState({
            elementDropdown: '',
            activeSecondaryOption: value,
            activeLabelText: labelText,
            podOption: false,
            podValue: POD_DEFAULT_VALUE,
            isPlayBackDropdownOpen: false
        });

        if (this.props.activeElement.elementId !== '' && this.props.activeElement.elementWipType !== ELEMENT_ASSESSMENT_LOWERCASE) {
            this.props.conversionElement({
                elementId: this.props.activeElement.elementId,
                elementType: this.state.activeElementType,
                primaryOption: this.state.activePrimaryOption,
                secondaryOption: value,
                labelText,
                toolbar: elementList[this.state.activeElementType][this.state.activePrimaryOption].toolbar
            });
        }
    }
    secondaryOption = () => {
        let secondaryOptions = '';
        let languageDropdownOptions = [];
        let enableColumn3SecondaryOption = false;
        const isSmartlinkElement = this.state.activePrimaryOption === PRIMARY_SMARTLINK ? SMARTLINK_ELEMENT_DROPDOWN_TITLE : '';
        if(this.state.activeElementType){
            let primaryOptionObject = elementList[this.state.activeElementType];
            let secondaryOptionObject = primaryOptionObject[this.state.activePrimaryOption].subtype;
            let secondaryOptionList = Object.keys(secondaryOptionObject);
            let isLearnosityProject = this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName ? true : false;
            let showLearnosityDropdown = false;
            if (this.state.activePrimaryOption === PRIMARY_BLOCKCODE_EQUATION && this.state.activeSecondaryOption !== "secondary-blockcode-language-default") {
                secondaryOptionList.splice(0, 1)
            }
            // checking active element and primary option to allow column 3 secondary option
            if (this.state.activeElementType === "groupedcontent" && this.state.activePrimaryOption === MULTI_COLUMN_3C.ELEMENT_NAME) {
                enableColumn3SecondaryOption = true;
            }
            if(secondaryOptionList.length > 1 || enableColumn3SecondaryOption) {
                secondaryOptions = secondaryOptionList.map(item => {
                    let addClass = '';
                    if (item === SECONDARY_SINGLE_ASSESSMENT_LEARNOSITY) {
                        addClass = 'learnosity-disabled';
                        showLearnosityDropdown = true;
                    }
                    languageDropdownOptions.push({...secondaryOptionObject[item], item});
                    return <li key={item} data-value={item} className={`${addClass}`} onClick={this.handleSecondaryOptionChange}>
                        {secondaryOptionObject[item].text}
                    </li>;
                });

                let display = '';
                if (secondaryOptionList.length <= 1) {
                    display = 'hidden';
                }

                let active = '';
                if (this.state.elementDropdown === 'secondary') {
                    active = 'active';
                }
                if (isLearnosityProject && showLearnosityDropdown) {
                    active = ''
                }
                let disabled = '';
                if (this.state.usageType === "") {
                    disabled = "disabled";
                }
                //Removing Select option from dropdown values
                if (languageDropdownOptions.length )  languageDropdownOptions = languageDropdownOptions.filter(option => option.text !== 'Select')
                const sidebarDisableCondition = ((this.props.showHideObj && this.props.activeElement.elementType) ||
                    (this.props.activeElement?.elementType === ELEMENT_ASIDE &&
                    this.props.cutCopySelection?.element?.id === this.props.activeElement?.elementId &&
                    this.props.cutCopySelection?.operationType === "cut"))
                const disableClass = hasReviewerRole() ? POINTER_EVENTS_NONE : ''
                secondaryOptions = <div
                    className={`element-dropdown ${display} ${sidebarDisableCondition ? SIDEBAR_DISABLE: ""} `}>
                    {isSmartlinkElement && <div className='sub-categories'>{SUB_CATEGORY}</div>}
                    {this.props.activeElement.tag !== 'BCE' ? (<div className={`element-dropdown-title ${disabled} ${isSmartlinkElement}`}
                    data-element="secondary" onClick={enableColumn3SecondaryOption ? null : this.toggleElementDropdown}>
                        {secondaryOptionObject[this.state.activeSecondaryOption].text}
                        {((isLearnosityProject && showLearnosityDropdown) || enableColumn3SecondaryOption) ? "" : <span> {dropdownArrow} </span>}
                        </div>) : (<div className={`element-dropdown-title bce ${disabled} ${disableClass}`} data-element="secondary" onClick={enableColumn3SecondaryOption ?
                         null : this.toggleElementDropdown}>
                        <Autocomplete
                            disablePortal
                            disableClearable
                            id="language-select-demo"
                            noOptionsText={'No result found'}
                            style={{ width: 210 }}
                            ListboxProps={{ style: { maxHeight: "270px" } }}
                            value={secondaryOptionObject[this.state.activeSecondaryOption].text == 'Select' ? {"text": "","labelText": "BCE","enum": ""} :
                                    secondaryOptionObject[this.state.activeSecondaryOption]}
                            options={languageDropdownOptions}
                            onChange={(e,value)=>{this.handleSecondaryLanguageChange(e,value)}}
                            getOptionLabel={(option) => option.text}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    placeholder="Select & Search"
                                    variant="outlined"
                                    inputProps={{
                                        ...params.inputProps,
                                    }}
                                />
                            )}
                        />
                    </div>)}
                    <ul className={`element-dropdown-content secondary-options ${active}`}>
                        {secondaryOptions}
                    </ul>
                </div>;
            }
            return secondaryOptions;
        }

    }

    handleAttrChange = (event) => {
        this.setState({
            attrInput: event.target.value
        })
    }

    handleDialogueBlur = () => {
        // dialouge blur and again display element so taht api is called
        let activeBCEElementNode = document.getElementById(`cypress-${this.props.activeElement.index}-Act-Title`)
        if (activeBCEElementNode) {
            activeBCEElementNode.focus()
            activeBCEElementNode.blur()
        }

    }

    handleDialogueToggle = () => {

        this.props.setBCEMetadata('numbered', !this.state.bceToggleValue);
        this.setState({ bceToggleValue: !this.state.bceToggleValue });
        this.handleDialogueBlur();
    }

    handleDialogueNumber = (e) => {
        const regex = /^[0-9]*(?:\.\d{1,2})?$/
        if (regex.test(e.target.value)) {
            this.props.setBCEMetadata('startNumber', e.target.value);
            this.setState({ bceNumberStartFrom: e.target.value });
        }
    }


    callUpdateApi = (newPSData) => {
        /* @@createPSDataForUpdateAPI - Prepare the data to send to server */
        const { index, parentUrn, asideData, parentElement } = this.props;
        const dataToSend = createPSDataForUpdateAPI(this.props, newPSData)
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        config.isSavingElement = true
        this.props.updateElement(dataToSend, index, parentUrn, asideData, null, parentElement, null);
    }


    /* handles IntendedPlaybackMode Dropdown for 3PI smartlink  with asset
    This function triggers sets activeElement attribute and triggers save call
    */
    handleIntendedPlaybackDropdown = (e) =>{
        let value = e.target.getAttribute("data-value");
        this.props.setBCEMetadata('selectedIntendedPlaybackModeValue', value);
        this.setState({
            isPlayBackDropdownOpen : false,
            selectedIntendedPlaybackModeValue: value
        },() => this.handleBceBlur());
    }

    /**@description render playbackMode for 3PI smartlink for added alfresco assets*/
    playbackMode = () => {
        let playbackMode = '';
        const disablePlaybackMode = DISABLE_PLAYBACK_MODE_VENDORS.includes(removeBlankSpaceAndConvertToLowercase(this.props?.activeElement?.vendor))
        if (this.state.activeElementType) {
            playbackMode = intendedPlaybackModeDropdown.map(item => {
                return <li key={item?.value} data-value={item?.value} onClick={this.handleIntendedPlaybackDropdown}>
                    {item.label}
                </li>;
            });
            let active = '';
            if (this.state.isPlayBackDropdownOpen) {
                active = 'active';
            }
            let disableClass = hasReviewerRole()  ? POINTER_EVENTS_NONE : '';
            disableClass = `${disableClass} ${disablePlaybackMode ? "disablePlaybackMode" : ""}`
            playbackMode = <div
                className={`element-dropdown`}>
                <div className='categories'>{INTENDED_PLAYBACK_CATEGORY}</div>
                <div className={`element-dropdown-title intented-dropdown-banner ${disableClass}`} data-element="secondary"
                onClick={this.toggleIntendedPlaybackDropdown} ref={this.playbackModeLabelRef}>
                    {this.renderIntendedPlaybackDropdownLabel(this.state.selectedIntendedPlaybackModeValue)}
                    <span> {dropdownArrow} </span>
                </div>
                {this.modalBanner()}
                <ul ref={this.playbackModeRef} className={`element-dropdown-content secondary-options playback-dropdown ${active}`}>
                    {playbackMode}
                </ul>
            </div>;
            return playbackMode;
        }
    }

    modalBanner = () => {
        let modalBanner = ''
        modalBanner = <div className='modalBanner'>
                    <img className='modalIcon' src={modalIcon} />
                    <p className='modalText'>{MODAL_MESSAGE}</p></div>
        return modalBanner
    }

    toggleIntendedPlaybackDropdown = () => {
        this.setState({
            isPlayBackDropdownOpen : !this.state.isPlayBackDropdownOpen,
            podOption : false,
            elementDropdown: ''
        })
    }

    renderIntendedPlaybackDropdownLabel = (value) => {
        if (value === "default") {
            return "Default"
        }
        const finalValue = intendedPlaybackModeDropdown.find(obj => obj.value === value);
        if (finalValue) return finalValue.label;
    }

    attributions = () => {
        let toggleAsideNumber = false;
        if (this.props.activeElement.elementType === ELEMENT_ASIDE || this.props.activeElement.elementType === "element-workedexample") {
            toggleAsideNumber = this.setToggleForAside(this.props.activeElement, this.props.asideTitleData);
        }
        let hasAsideTitleData = this.props?.activeElement?.asideNumber || false;
        /* Show Aside toggle ON and DISABLED if autonumbering is enabled */
        if (this.props.isAutoNumberingEnabled) {
            toggleAsideNumber = true;
            hasAsideTitleData = true;
        }
        let attributions = '';
        let attributionsObject = {};
        let attributionsList = [];
        if (this.state.activeElementType) {
            let primaryOptionList = elementList[this.state.activeElementType][this.state.activePrimaryOption];
            let secondaryOptionList = primaryOptionList.subtype[this.state.activeSecondaryOption];
            if ((primaryOptionList.text && primaryOptionList.text === "Quad Interactive") && (this.props.activeElement.altText && this.props.activeElement.altText != "")) {
                primaryOptionList['attributes'] = {
                    "alt_text": {
                        "isEditable": false,
                        "text": "Alt Text"
                    }
                }
            }
            else if (primaryOptionList.text && (primaryOptionList.text === "Quad Interactive" || primaryOptionList.text === "Elm Interactive")) {
                primaryOptionList['attributes'] = {}
            }

            if (primaryOptionList.attributes) {
                attributionsObject = primaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            } else if (secondaryOptionList.attributes) {
                attributionsObject = secondaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            }

            if (attributionsList.length > 0) {
                let attrValue = ""
                attributions = attributionsList.map(item => {
                    let isDisable = (item === 'attribution' ? hasReviewerRole() : !attributionsObject[item].isEditable)
                    if (this.props?.activeElement?.elementType === "openerelement") {
                        if (item === "alt_text") {
                            attrValue = this.props?.alfrescoAltLongDescData?.hasOwnProperty("altText") ?
                            this.props?.alfrescoAltLongDescData?.altText : this.props?.activeElement?.altText ? this.props?.activeElement?.altText : ""
                        } else if (item === "long_description") {
                            attrValue = this.props?.alfrescoAltLongDescData?.hasOwnProperty("longDesc") ? this.props?.alfrescoAltLongDescData?.longDesc :
                            this.props?.activeElement?.longDesc ? this.props?.activeElement?.longDesc : ""
                        }
                    } else {
                        if (item === "alt_text") {
                            attrValue = this.props.activeElement.altText ? this.props.activeElement.altText : ""
                        }
                        else if (item === "long_description") {
                            attrValue = this.props.activeElement.longDesc ? this.props.activeElement.longDesc : ""
                        }
                    }
                    return <div key={item} data-attribution={attributionsObject[item].text}>
                        <div>{attributionsObject[item].text}</div>
                        <textarea className="attribution-editor" onBlur={this.handleBQAttributionBlur} disabled={isDisable}
                        name={item} value={attrValue} onChange={this.handleAttrChange}></textarea>
                    </div>
                });
            }
            if (this.state.activePrimaryOption === PRIMARY_BLOCKCODE_EQUATION && this.props.activeElement.elementId) {
                let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
                let attrNode = activeElement ? activeElement.querySelector(".blockCodeFigure") : null
                if (attrNode) {
                    attrNode.setAttribute("numbered", ((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true))
                    attrNode.setAttribute("startNumber", (this.state.bceNumberStartFrom ? this.state.bceNumberStartFrom : '1'))
                    attrNode.setAttribute("syntaxhighlighting", ((this.state.syntaxHighlightingToggleValue ||
                    this.state.syntaxHighlightingToggleValue === false) ? this.state.syntaxHighlightingToggleValue : true))
                }
                attributions = <div>
                    <div className="panel_show_module">
                        <div className="toggle-value-bce">Use Line Numbers</div>
                        <label className="switch"><input type="checkbox"
                        checked={(this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true}
                        onClick={!hasReviewerRole() && !config.savingInProgress && this.handleBceToggle} /><span className="slider round"></span></label>
                    </div>
                    <div className="alt-Text-LineNumber" >
                        <div className="toggle-value-bce">Start numbering from</div>
                        <input type="number" id="line-number" className="line-number" min="1" onChange={!config.savingInProgress && this.handleBceNumber}
                        value={this.state.bceNumberStartFrom} disabled={!((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true) ||
                        hasReviewerRole()} onBlur={this.handleBceBlur} />
                    </div>
                </div>
                return attributions;
            }

            if (this.state.activePrimaryOption && this.state.activePrimaryOption === "primary-element-dialogue" && this.props.activeElement.elementId) {
                attributions = <div>
                    <div className="panel_show_module">
                        <div className="toggle-value-bce">Use Line Numbers</div>
                        <label className="switch"><input type="checkbox" checked={(this.state.bceToggleValue || this.state.bceToggleValue === false) ?
                        this.state.bceToggleValue : true} onClick={!hasReviewerRole() && !config.savingInProgress && this.handleDialogueToggle} />
                        <span className="slider round"></span></label>
                    </div>
                    <div className="alt-Text-LineNumber" >
                        <div className="toggle-value-bce">Start numbering from</div>
                        <input type="number" id="line-number" className="line-number" min="1" onChange={!config.savingInProgress && this.handleDialogueNumber}
                        value={this.state.bceNumberStartFrom} disabled={!((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true) ||
                        hasReviewerRole()} onBlur={this.handleDialogueBlur} />
                    </div>
                </div>
                return attributions;
            }

            if (this.state.activePrimaryOption === "primary-poetry" && this.props.activeElement.elementId) {
                let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
                let attrNode = activeElement ? activeElement.querySelector(".element-container.pe") : null
                if (attrNode && attrNode.setAttribute) {
                    attrNode.setAttribute("numbered", ((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true))
                    attrNode.setAttribute("startNumber", (this.state.bceNumberStartFrom ? this.state.bceNumberStartFrom : '1'))
                }
                attributions = <div>
                    <div className="panel_show_module">
                        <div className="toggle-value-bce">Use Line Numbers</div>
                        <label className="switch"><input type="checkbox" checked={(this.state.bceToggleValue || this.state.bceToggleValue === false) ?
                            this.state.bceToggleValue : true} onClick={!hasReviewerRole() && !config.savingInProgress && this.handleNumberedLineToggle} />
                            <span className="slider round"></span></label>
                    </div>
                    <div className="alt-Text-LineNumber" >
                        <div className="toggle-value-bce">Start numbering from</div>
                        <input type="number" id="line-number" className="line-number" min="1" onChange={!config.savingInProgress && this.setStartLineNumber}
                        value={this.state.bceNumberStartFrom} disabled={!((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true) ||
                        hasReviewerRole()} onBlur={this.saveElementAttributes} />
                    </div>
                </div>
                return attributions;
            }
            if ((this.props.activeElement.elementType === ELEMENT_ASIDE || this.props.activeElement.elementType === "element-workedexample")) {
               attributions = <div className="asideNumberHeading">
                    <div className="toggleAsideNumber">Label, Number, Title</div>
                    <div className="setting-value" onClick={() => this.handleAsideNumber(toggleAsideNumber)}>
                        <div className={`asideSlider ${toggleAsideNumber ? 'on' : 'off'}${hasAsideTitleData === true ? ' disabled-toggle' : ''}`}></div>
                    </div>
                </div>
                return attributions;
            }

            attributions = <div className="attributions">
                {attributions}
            </div>;

            return attributions;
        }
    }

    handleBceBlur = () => {
        let activeBCEElementNode = document.getElementById(`cypress-${this.props.activeElement.index}-2`)
        let activeBCEElementNode_Decorative = document.getElementById(`cypress-${this.props.activeElement.index}-4`)
        if (activeBCEElementNode) {
            activeBCEElementNode.focus()
            activeBCEElementNode.blur()
        } else if(this.state.activePrimaryOption === DECORATIVE_IMAGE && activeBCEElementNode_Decorative) {
            activeBCEElementNode_Decorative.focus()
            activeBCEElementNode_Decorative.blur()
        }
    }


    handleNumberedLineToggle = () => {
        this.props.setBCEMetadata('numbered', !this.state.bceToggleValue);
        this.setState({
            bceToggleValue: !this.state.bceToggleValue
        }, () => this.saveElementAttributes())
    }
    setStartLineNumber = (e) => {
        const regex = /^[0-9]*(?:\.\d{1,2})?$/
        if (regex.test(e.target.value)) {
            this.props.setBCEMetadata('startNumber', e.target.value);
            this.setState({ bceNumberStartFrom: e.target.value })
        }
    }

    handleAsideNumber = (toggleAsideNumber) => {
        let hasAsideTitleData = this.props?.activeElement?.asideNumber || false;
        if(hasAsideTitleData === true){
            return false
        }
        if (!hasReviewerRole() && !config.savingInProgress) {
            let newToggleValue = toggleAsideNumber;
            this.props.enableAsideNumbering(!newToggleValue, this.state.activeElementId);
        }
    }

    saveElementAttributes = () => {
        const { elementType ,elementId } = this.props.activeElement
        switch (elementType) {
            case 'poetry':
                let activeElement = document.querySelector(`[data-id="${elementId}"]`)
                let activePoetryNode = activeElement ? activeElement.querySelector(".element-container.pe") : null
                if (activePoetryNode) {
                    let isNumbered = activePoetryNode.getAttribute("numbered");
                    let toNumber = parseInt(activePoetryNode.getAttribute("startnumber"));
                    const dataToUpdate = {
                        isNumbered: isNumbered == "true" ? true : false,
                        startNumber: toNumber
                    }
                    this.props.updateContainerMetadata(dataToUpdate)
                }
                break;
            case 'dialogue':
            case 'bce':
            default:
                break;
        }
    }


    handleBQAttributionBlur = () => {
        let activeBQNode = document.querySelector(`#cypress-${this.props.activeElement.index} p`)
        if (activeBQNode) {
            activeBQNode.focus()
            activeBQNode.blur()
        }
    }

    /**
    * handleBceToggle function responsible for handling toggle value for BCE element
    */
    handleBceToggle = () => {
        this.props.setBCEMetadata('numbered', !this.state.bceToggleValue);
        this.setState({
            bceToggleValue: !this.state.bceToggleValue
        }, () => this.handleBceBlur())
    }

    handleSyntaxHighligtingRemove = () => {
        //remove all formatting from code

        tinymce.$(`[data-id='${this.props.activeElement.elementId}'] .figureCodeContent span.codeNoHighlightLine`).each(function () {
            let boldTags = this.getElementsByTagName('STRONG');
            while (boldTags.length) {
                let innerHTML = boldTags[0].innerHTML;
                boldTags[0].outerHTML = innerHTML;
            }
            let uTags = this.getElementsByTagName('U');
            while (uTags.length) {
                let innerHTML = uTags[0].innerHTML;
                uTags[0].outerHTML = innerHTML;
            }
            let emTags = this.getElementsByTagName('EM');
            while (emTags.length) {
                let innerHTML = emTags[0].innerHTML;
                emTags[0].outerHTML = innerHTML;
            }
        })
        this.props.setBCEMetadata('syntaxhighlighting', !this.state.syntaxHighlightingToggleValue);
        this.setState({
            syntaxHighlightingToggleValue: !this.state.syntaxHighlightingToggleValue
        }, () => {
            this.handleSyntaxHighlightingPopup(false);
            this.handleBceBlur();
            customEvent.trigger('clearUndoStack');
        })
    }

    handleSyntaxHighlightingPopup = (value) => {
        if (value) {
            showBlocker();
        }
        else {
            hideBlocker()
        }
        this.props.showCanvasBlocker(value);
        this.setState({
            showSyntaxHighlightingPopup: value
        })
    }

    // function to show decorative popup
    handleDecorativePopup = (value) => {
        if (value) {
            showBlocker();
        }
        else {
            hideBlocker()
        }
        this.props.showCanvasBlocker(value);
        this.setState({
            decorativePopupWarning: value
        })
    }

    handleSyntaxHighlightingToggle = () => {
        let currentToggleValue = !((this.state.syntaxHighlightingToggleValue || this.state.syntaxHighlightingToggleValue == false) ?
        this.state.syntaxHighlightingToggleValue : true);
        if (currentToggleValue) {
            this.handleSyntaxHighlightingPopup(true);
        }
        else {
            this.props.setBCEMetadata('syntaxhighlighting', currentToggleValue);
            this.setState({
                syntaxHighlightingToggleValue: currentToggleValue
            }, () => this.handleBceBlur())
        }
    }

    /**
    * handleBceNumber function responsible for handling Number start from field value in BCE element
    */
    handleBceNumber = (e) => {
        const regex = /^[0-9]*(?:\.\d{1,2})?$/
        if (regex.test(e.target.value)) {
            this.props.setBCEMetadata('startNumber', e.target.value);                        // applying regex that will validate the value coming is only number
            this.setState({ bceNumberStartFrom: e.target.value })
        }
    }


    showModuleName = (e) => {
        const slateType = getSlateType(this.props.slateLevelData[config.slateManifestURN])
        if (this.props.activeElement.elementId) {
            this.props.setCurrentModule(e.currentTarget.checked);
            let els = document.getElementsByClassName('moduleContainer');
            let i = 0;
            let groupby = "";
            if (e.currentTarget.checked == false) {
                while (i < els.length) {
                    let children = els[i].querySelectorAll('.moduleContainer .learningObjectiveData');
                    if (children.length > 0) {
                        els[i].classList.remove('showmodule');
                    }
                    i++;
                }
            }
            else {
                groupby = "module";
                while (i < els.length) {
                    let children = els[i].querySelectorAll('.moduleContainer .learningObjectiveData');
                    if (children.length > 0) {
                        els[i].classList.add('showmodule');
                    }
                    i++;
                }
            }
            let data = {
                "elementdata": {
                    level: slateType === "partintro" ? "part" : "chapter",
                    groupby: groupby
                },
                "metaDataAnchorID": [this.props.activeElement.elementId],
                "elementVersionType": "element-generateLOlist",
                "loIndex": this.props.activeElement.index,
                "slateVersionUrn": config.slateManifestURN,
                "elementParentEntityUrn": config.slateEntityURN
            }
               if (this.props?.activeElement?.status === "approved") {
                config.savingInProgress = true
            }
            this.props.updateElement(data)

        }
    }

    renderSyntaxHighlighting = (tag) => {
        if (tag === 'BCE') {
            return <div className="panel_syntax_highlighting">
                <div className="toggle-value-bce">Syntax-highlighting</div>
                <label className="switch">
                    <input type="checkbox" checked={(this.state.syntaxHighlightingToggleValue || this.state.syntaxHighlightingToggleValue === false) ?
                    this.state.syntaxHighlightingToggleValue : true} onClick={!hasReviewerRole() && !config.savingInProgress && this.handleSyntaxHighlightingToggle} />
                    <span className="slider round"></span>
                </label>
            </div>
        }
        return null
    }

    renderLanguageLabel = (tag) => {
        if (tag === 'BCE') {
            return <div className='lang-lbl'>Language<label>*</label></div>
        }
        return null
    }

    /**
     * Responsible for toggling of print of Demand dropdown
     * @param {*} e
     */

    togglePODDropdown = (e) => {

        let selValue = e.target.getAttribute('data-value');
        if(selValue) {
            this.props.setBCEMetadata('podwidth', selValue);
        }
        this.setState({
            podOption: !this.state.podOption,
            podValue: selValue ? selValue : this.state.podValue,
            elementDropdown: '',
            isPlayBackDropdownOpen: false
        }, () => this.handleBceBlur())
    }

    /**
     * Responsible for rendering of print of Demand
     * @param {*}
     */

    podOption = () => {
        if (this.state.activePrimaryOption === 'primary-image-table' || this.state.activePrimaryOption === 'primary-image-figure' ||
            this.state.activePrimaryOption === 'primary-image-equation' || this.state.activePrimaryOption === DECORATIVE_IMAGE ||
            (this.state.activePrimaryOption === 'primary-smartlink' &&
            (this.state.activeSecondaryOption === "secondary-interactive-smartlink-third" || this.state.activeSecondaryOption === 'secondary-interactive-smartlink-tab'))) {
            let active = '';
            if (this.state.podOption) {
                active = 'active'
            }
            let printValue = this.state.podValue

            printValue = (printValue && printValue.match(/print/g)) ? printValue.slice(5) : this.state.podValue
            printValue = printValue ? (printValue.match(/%/g) ? printValue : printValue + '%') : '100%'

            let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
            let attrNode = activeElement ? activeElement.querySelector(".figureElement") : null
            let showPodValue = this.state.podValue === 'print100' ? '' : this.state.podValue
            if (attrNode) {
                attrNode.setAttribute("podwidth", showPodValue)
            }
            const hasReviewerClass = hasReviewerRole() ? POINTER_EVENTS_NONE : ''

            return (
                <div className='printOnDemand'>
                    <label>POD Width Options</label>
                    <div className='element-dropdown'>
                        <div className={`element-dropdown-pod ${hasReviewerClass}`} data-element="pod" onClick={this.togglePODDropdown}>
                            <label className='pod-value' id='pod-value'>{printValue}</label>
                            <ul className={`element-dropdown-content pod-options ${active}`}>
                                <li data-value="print25">25%</li>
                                <li data-value="print50">50%</li>
                                <li data-value="print75">75%</li>
                                <li data-value="print100">100%</li>
                            </ul>
                            <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg>
                        </div>
                    </div>
                </div>

            )
        }
        return null
    }

    render = () => {
        const isDecorativeImage = this.props.model?.figuredata?.decorative ? true : false
        const {activeElement} = this.props;
        return (
            <>
                {this.props.activeElement && Object.keys(this.props.activeElement).length !== 0 && this.props.activeElement.elementType !== "element-authoredtext" &&
                this.props.activeElement.elementType !== 'discussion' && this.props.activeElement.primaryOption !== 'primary-tabbed-elem' && <div className="canvas-sidebar">
                    <div className="canvas-sidebar-heading">Settings</div>
                    {this.primaryOption()}
                    {this.renderSyntaxHighlighting(this.props.activeElement && this.props.activeElement.tag || '')}
                    {this.renderLanguageLabel(this.props.activeElement && this.props.activeElement.tag || '')}
                    {this.secondaryOption()}
                    {activeElement?.assetIdFor3PISmartlink && this.playbackMode()}
                    {!isDecorativeImage && this.attributions()}
                    {this.podOption()}
                    {this.state.showSyntaxHighlightingPopup && <PopUp confirmCallback={this.handleSyntaxHighligtingRemove}
                    togglePopup={(value) => { this.handleSyntaxHighlightingPopup(value) }} dialogText={SYNTAX_HIGHLIGHTING} slateLockClass="lock-message" sytaxHighlight={true} />}
                    {this.state.activeElementType ==="manifestlist" && <div>
                    <div className="canvas-sidebar-font-bullet-type">Font Type</div>
                    {this.fontBulletOption("fontStyle")}
                    <div className="canvas-sidebar-font-bullet-type">Bullet Color</div>
                    {this.fontBulletOption("bulletIcon")}
                    </div>}
                </div>
                }
                {this.props.isTCMCanvasPopupLaunched &&
                    <PopUp
                        isTCMCanvasPopup={this.props.isTCMCanvasPopupLaunched}
                        assessmentClass={'tcm-canvas-popup'}
                        closeTcmPopup={this.closeTcmPopup}
                        tcmButtonHandler={this.props.tcmButtonHandler}
                        tcmSnapshotData={this.props.tcmSnapshotData}
                        dialogText={this.props.tcmSnapshotData.contentDifference}
                        elementData={this.props.elementData}
                        tcmStatus = {this.props.tcmStatus}
                        permissions = {this.props.permissions}
                        isSlateLocked = {isSlateLocked()}
                    />}
                {this.state.updateAssessmentTypePopup && this.props?.activeElement?.primaryOption === 'primary-single-assessment'  && this.showUpdateAssessmentTypePopup()}
                {this.state.decorativePopupWarning &&
                    <PopUp
                        togglePopup={this.handleSetDecorativeImagePopup}
                        dialogText={SET_AS_DECORATIVE_IMAGE}
                        lOPopupClass="lo-warning-txt"
                        warningHeaderText={`Set Image as Decorative`}
                        setDecorativePopup={true}
                        agree={this.setDecorativeImage}
                        isAutoNumberingEnabled={this.props.isAutoNumberingEnabled}
                    />
                }
            </>
        );
    }
}

Sidebar.defaultProps = {
    elementType: "video-audio"
}

Sidebar.propTypes = {
    /** Active Element Type */
    elementType: PropTypes.string,
}

const mapStateToProps = state => {
    return {
        activeElement: state.appStore.activeElement,
        showModule: state.metadataReducer.showModule,
        permissions: state.appStore.permissions,
        showHideObj: state.appStore.showHideObj,
        slateLevelData: state.appStore.slateLevelData,
        cutCopySelection: state.selectionReducer.selection,
        isLearnosityProject: state.appStore.isLearnosityProjectInfo,
        isTCMCanvasPopupLaunched: state.tcmReducer.isTCMCanvasPopupLaunched,
        tcmSnapshotData: state.tcmReducer.tcmSnapshotData,
        elementData: state.tcmReducer.elementData,
        tcmStatus: state.tcmReducer.tcmStatus,
        asideData:state.appStore.asideData,
        asideTitleData: state.appStore.asideTitleData,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        alfrescoAltLongDescData: state.alfrescoReducer.savedAltLongDesData,
    };
};

export default connect(
    mapStateToProps,
    {
        updateElement,
        setCurrentModule,
        conversionElement,
        setBCEMetadata,
        tcmButtonHandler,
        updateContainerMetadata,
        updateBlockListMetadata,
        enableAsideNumbering
    }
)(Sidebar);
