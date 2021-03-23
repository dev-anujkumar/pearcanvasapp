import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import elementList from './elementTypes.js';
import { dropdownArrow } from './../../images/ElementButtons/ElementButtons.jsx';
 import { conversionElement, setBCEMetadata } from './Sidebar_Action';
import { updateElement } from '../ElementContainer/ElementContainer_Actions';
import { setCurrentModule } from '../ElementMetaDataAnchor/ElementMetaDataAnchor_Actions';
import './../../styles/Sidebar/Sidebar.css';
import { hasReviewerRole, getSlateType } from '../../constants/utility.js'
import config from '../../../src/config/config.js';
import PopUp from '../PopUp/index.js';
import { SYNTAX_HIGHLIGHTING } from '../SlateWrapper/SlateWrapperConstants.js';
import { showBlocker,hideBlocker } from '../../js/toggleLoader';
import { customEvent } from '../../js/utils.js';
import { disabledPrimaryOption } from '../../constants/Element_Constants.js';
import { POD_DEFAULT_VALUE } from '../../constants/Element_Constants';
import { SECONDARY_SINGLE_ASSESSMENT_LEARNOSITY } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js'


class Sidebar extends Component {
    constructor(props) {
        super(props);
        
        let elementType = this.props.activeElement.type || 'element-authoredtext';
        let elementTypeList = elementList[elementType];
        let primaryFirstOption = Object.keys(elementTypeList)[0];
        let secondaryFirstOption = Object.keys(elementTypeList[primaryFirstOption].subtype)[0];
        let labelText = elementTypeList[primaryFirstOption].subtype[secondaryFirstOption].labelText;
        let numbered = this.props.activeElement.numbered;
        let startNumber = this.props.activeElement.startNumber || "1";
        let syntaxhighlighting =  this.props.activeElement.syntaxhighlighting;
        let podwidth = this.props.activeElement.podwidth || POD_DEFAULT_VALUE;        
        this.state = {
            elementDropdown: '',
            activeElementId: this.props.activeElement.elementId || "",
            activeElementType: elementType,
            activePrimaryOption: primaryFirstOption,
            activeSecondaryOption: secondaryFirstOption,
            activeLabelText: labelText,
            attrInput: "",
            bceToggleValue: numbered,
            syntaxHighlightingToggleValue: syntaxhighlighting,
            showSyntaxHighlightingPopup : false,
            bceNumberStartFrom : startNumber,
            podOption : false,
            podValue : podwidth,
            usageType:this.props.activeElement.usageType
        };
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        if(Object.keys(nextProps.activeElement).length > 0) {
            let elementDropdown = prevState.elementDropdown;
            //let numberStartFrom = prevState.bceNumberStartFrom;
            //let bceToggle = prevState.bceToggleValue;
            //let bceSyntaxHighlight = prevState.syntaxHighlightingToggleValue;
            let podValue = prevState.podValue;
            let podOption = prevState.podOption
            if(nextProps.activeElement.elementId !== prevState.activeElementId) {
                elementDropdown = '';
                //numberStartFrom = nextProps.activeElement.startNumber;
                //bceToggle = nextProps.activeElement.numbered;
                //bceSyntaxHighlight = nextProps.activeElement.syntaxhighlighting ;
                podValue = nextProps.activeElement.podwidth;
                podOption = false
            }
            
            return {
                elementDropdown: elementDropdown,
                activeElementId: nextProps.activeElement.elementId,
                activeElementType: nextProps.activeElement.elementType,
                activePrimaryOption: nextProps.activeElement.primaryOption,
                activeSecondaryOption: nextProps.activeElement.secondaryOption,
                activeLabelText: nextProps.activeElement.tag,
                bceNumberStartFrom : nextProps.activeElement.startNumber,
                bceToggleValue : nextProps.activeElement.numbered,
                syntaxHighlightingToggleValue : nextProps.activeElement.syntaxhighlighting,
                podValue : podValue,
                podOption : podOption,
                usageType:nextProps.activeElement.usageType
            };
        }

        return null;
    }

    handlePrimaryOptionChange = e => {
        let value = e.target.getAttribute('data-value');
        let secondaryelementList = elementList[this.state.activeElementType][value].subtype;
        let secondaryFirstOption = Object.keys(secondaryelementList)[0];
        let labelText = secondaryelementList[secondaryFirstOption].labelText;

        this.setState({
            elementDropdown: '',
            activePrimaryOption: value,
            activeSecondaryOption: secondaryFirstOption,
            activeLabelText: labelText,
            podValue: POD_DEFAULT_VALUE,
            podOption: false
        });

        if(this.props.activeElement.elementId !== '' && this.props.activeElement.elementWipType !== "element-assessment") {
            this.props.conversionElement({
                elementId: this.props.activeElement.elementId,
                elementType: this.state.activeElementType,
                primaryOption: value,
                secondaryOption: secondaryFirstOption,
                labelText,
                toolbar: elementList[this.state.activeElementType][value].toolbar
            });
        }
    }

    toggleElementDropdown = e => {
        if(hasReviewerRole()){
            return true
        }
        const { activePrimaryOption } = this.state
        if(e.target.dataset && e.target.dataset.element !== "secondary"){
            if( disabledPrimaryOption.indexOf(activePrimaryOption) > -1 ){
                e.stopPropagation()
                return false
            }
        }
        let elementDropdown = e.target.getAttribute('data-element');
        if(this.state.elementDropdown === elementDropdown) {
            elementDropdown = '';
        }
        this.setState({
            elementDropdown,
            podOption: false
        });
    }

    primaryOption = () => {
        const { activePrimaryOption } = this.state
        let primaryOptions = '';
        if(this.state.activeElementType){
            let className=""
            let primaryOptionObject = elementList[this.state.activeElementType];
            let primaryOptionList = Object.keys(primaryOptionObject);
            if(primaryOptionList.length > 0) {
                if(this.state.activeElementType === 'element-assessment'){
                    delete primaryOptionList[1];
                }
                let disabledPrimaryOptions=["primary-mathml-equation", "primary-blockcode-equation", "primary-editor-table-equation", "primary-elm-interactive", "primary-mmi", "primary-smartlink", "primary-showhide", "primary-popup"];
                 if( disabledPrimaryOptions.indexOf(activePrimaryOption) > -1 ){
                    className="disabled"
                 }
                primaryOptions = primaryOptionList.map(item => {
                    if(item !== 'enumType' && item !== 'primary-mathml-equation' && item !== 'primary-blockcode-equation' && item !== 'primary-editor-table-equation') {
                        return <li key={item} data-value={item} onClick={this.handlePrimaryOptionChange}>
                            {primaryOptionObject[item].text}
                        </li>;
                    }
                });
    
                let active = '';
                if(this.state.elementDropdown === 'primary') {
                    active = 'active';
                }
                const sidebarDisableCondition = ((this.props.showHideObj && this.props.activeElement.elementType) || (this.props.activeElement?.elementType === "element-aside" && this.props.cutCopySelection?.element?.id === this.props.activeElement?.elementId && this.props.cutCopySelection?.operationType === "cut"))
                primaryOptions = <div
                    className={`element-dropdown ${sidebarDisableCondition ? "sidebar-disable": ""}`}>
                    <div className={`element-dropdown-title ${className}`} data-element="primary" onClick={this.toggleElementDropdown}>
                        {primaryOptionObject[this.state.activePrimaryOption].text}
                        {disabledPrimaryOption.indexOf(activePrimaryOption) > -1 ? null : dropdownArrow}
                    </div>
                    <ul className={`element-dropdown-content primary-options ${active}`}>
                        {primaryOptions}
                    </ul>
                </div>;
            }
    
            return primaryOptions;
        } 
        else if( this.props.activeElement.elementWipType == "element-learningobjectivemapping"){
           primaryOptions = <div className="learning-obejective-text"><b>Metadata Anchor</b>
            <div className="element-dropdown">
                <div className="element-dropdown-title" data-element="primary">Learning Objective<svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg></div>
                </div>
            </div>
          
           return primaryOptions;
        }
        else if(this.props.activeElement.elementWipType == "element-generateLOlist"){
            primaryOptions = <div className="panel_show_module">
                    <div className="learning-obejective-text"><b>Metadata Anchor</b></div>
                        <p>Show Module Name</p>
                        <label className="switch"><input type="checkbox" onClick={!config.savingInProgress && this.showModuleName} checked={this.props.showModule? true : false} /><span className="slider round"></span></label>
                        </div>;
            return primaryOptions;
        }
        
    }

    handleSecondaryOptionChange = e => {
        let value = e.target.getAttribute('data-value').toLowerCase();
        let elementTypeList = elementList[this.state.activeElementType];
        let labelText = elementTypeList[this.state.activePrimaryOption].subtype[value].labelText;
        this.setState({
            elementDropdown: '',
            activeSecondaryOption: value,
            activeLabelText: labelText,
            podOption: false
        });

        if(this.props.activeElement.elementId !== '' && this.props.activeElement.elementWipType !== "element-assessment") {
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
        if(this.state.activeElementType){
            let primaryOptionObject = elementList[this.state.activeElementType];
            let secondaryOptionObject = primaryOptionObject[this.state.activePrimaryOption].subtype;
            let secondaryOptionList = Object.keys(secondaryOptionObject);
            if(this.state.activePrimaryOption==="primary-blockcode-equation"&&this.state.activeSecondaryOption!=="secondary-blockcode-language-default"){
               secondaryOptionList.splice(0,1)
            }
            if(secondaryOptionList.length > 1) {
                secondaryOptions = secondaryOptionList.map(item => {
                    let addClass = '';
                    if(item === SECONDARY_SINGLE_ASSESSMENT_LEARNOSITY){
                        addClass = 'learnosity-disabled'
                    }
                    return <li key={item} data-value={item} className={`${addClass}`} onClick={this.handleSecondaryOptionChange}>
                        {secondaryOptionObject[item].text}
                    </li>;
                });
    
                let display = '';
                if(secondaryOptionList.length <= 1) {
                    display = 'hidden';
                }
    
                let active = '';
                if(this.state.elementDropdown === 'secondary') {
                    active = 'active';
                }
                if(this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName){
                    active = ''
                }
                let disabled= '';
                if(this.state.usageType === ""){
                    disabled="disabled";
                }
                const sidebarDisableCondition = ((this.props.showHideObj && this.props.activeElement.elementType) || (this.props.activeElement?.elementType === "element-aside" && this.props.cutCopySelection?.element?.id === this.props.activeElement?.elementId && this.props.cutCopySelection?.operationType === "cut"))
                secondaryOptions = <div
                    className={`element-dropdown ${display} ${sidebarDisableCondition ? "sidebar-disable": ""} `}>
                    <div className={`element-dropdown-title ${disabled}`} data-element="secondary" onClick={this.toggleElementDropdown}>
                        {secondaryOptionObject[this.state.activeSecondaryOption].text}
                        {(this.props.isLearnosityProject && this.props.isLearnosityProject[0]?.ItemBankName) ? "" : <span> {dropdownArrow} </span>}
                    </div>
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
    
    attributions = () => {
        let attributions = '';
        let attributionsObject = {};
        let attributionsList = [];
        if(this.state.activeElementType){
            let primaryOptionList = elementList[this.state.activeElementType][this.state.activePrimaryOption];
            let secondaryOptionList = primaryOptionList.subtype[this.state.activeSecondaryOption];
            if((primaryOptionList.text && primaryOptionList.text==="Quad Interactive" )&& (this.props.activeElement.altText && this.props.activeElement.altText!="")){
                primaryOptionList['attributes']={
                    "alt_text":{
                        "isEditable": false,
                        "text": "Alt Text"
                    }
                }
            }
            else if(primaryOptionList.text && (primaryOptionList.text==="Quad Interactive" || primaryOptionList.text==="Elm Interactive" ) ){
                primaryOptionList['attributes']={}
            }

            if(primaryOptionList.attributes) {
                attributionsObject = primaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            } else if(secondaryOptionList.attributes) {
                attributionsObject = secondaryOptionList.attributes;
                attributionsList = Object.keys(attributionsObject);
            }
    
            if(attributionsList.length > 0) {
                //let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
                //let attrNode = activeElement ? activeElement.querySelector(".blockquoteTextCredit") : null
                let attrValue = ""
                attributions = attributionsList.map(item => {
                    let isDisable = (item === 'attribution' ? hasReviewerRole() : !attributionsObject[item].isEditable) 
                    if(item==="alt_text"){
                        attrValue=this.props.activeElement.altText?this.props.activeElement.altText:""
                    }
                    else if(item==="long_description"){
                        attrValue=this.props.activeElement.longDesc?this.props.activeElement.longDesc:""
                    }
                    return <div key={item} data-attribution={attributionsObject[item].text}>
                        <div>{attributionsObject[item].text}</div>
                        <textarea className="attribution-editor" onBlur={this.handleBQAttributionBlur} disabled={isDisable} name={item} value={attrValue} onChange={this.handleAttrChange}></textarea>
                    </div>
                });
            }
            if(this.state.activePrimaryOption === "primary-blockcode-equation" && this.props.activeElement.elementId){
                let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
                let attrNode = activeElement ? activeElement.querySelector(".blockCodeFigure") : null
                if( attrNode ){
                    attrNode.setAttribute("numbered", ((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true))
                    attrNode.setAttribute("startNumber", (this.state.bceNumberStartFrom ? this.state.bceNumberStartFrom : '1'))
                    attrNode.setAttribute("syntaxhighlighting", ((this.state.syntaxHighlightingToggleValue || this.state.syntaxHighlightingToggleValue === false) ? this.state.syntaxHighlightingToggleValue : true))
                }
                attributions = <div>
                    <div className="panel_show_module">
                        <div className="toggle-value-bce">Use Line Numbers</div>
                        <label className="switch"><input type="checkbox" checked={(this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true} onClick={ !hasReviewerRole() && !config.savingInProgress && this.handleBceToggle}/>
                        <span className="slider round"></span></label>
                    </div>
                    <div className="alt-Text-LineNumber" >
                        <div className="toggle-value-bce">Start numbering from</div>
                        <input type="number" id="line-number" className="line-number" min="1" onChange={!config.savingInProgress && this.handleBceNumber} value={this.state.bceNumberStartFrom}
                        disabled={!((this.state.bceToggleValue || this.state.bceToggleValue === false) ? this.state.bceToggleValue : true) || hasReviewerRole()} onBlur={this.handleBceBlur}/>
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
        let activeBCEElementNode = document.getElementById(`cypress-${this.props.activeElement.index}-1`)
        if (activeBCEElementNode) {
            activeBCEElementNode.focus()
            activeBCEElementNode.blur()
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
        this.props.setBCEMetadata('numbered',!this.state.bceToggleValue);
        this.setState({
            bceToggleValue : !this.state.bceToggleValue
        }, () => this.handleBceBlur() )
    }

    handleSyntaxHighligtingRemove = () => {
        //remove all formatting from code

        tinymce.$(`[data-id='${this.props.activeElement.elementId}'] .codeNoHighlightLineWrapper span.codeNoHighlightLine`).each(function () {
            // this.innerHTML = this.innerText;
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
        this.props.setBCEMetadata('syntaxhighlighting',!this.state.syntaxHighlightingToggleValue);
        this.setState({
            syntaxHighlightingToggleValue: !this.state.syntaxHighlightingToggleValue
        }, () => {
            this.handleSyntaxHighlightingPopup(false);
            this.handleBceBlur();
            customEvent.trigger('clearUndoStack');
        })
    }

    handleSyntaxHighlightingPopup = (value) => {
        if(value){
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

    handleSyntaxHighlightingToggle = () => {
        let currentToggleValue = !((this.state.syntaxHighlightingToggleValue || this.state.syntaxHighlightingToggleValue == false) ? this.state.syntaxHighlightingToggleValue : true);
        if (currentToggleValue) {
            this.handleSyntaxHighlightingPopup(true);
        }
        else {
            this.props.setBCEMetadata('syntaxhighlighting',currentToggleValue);
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
        if(regex.test(e.target.value)){      
            this.props.setBCEMetadata('startNumber',e.target.value);                        // applying regex that will validate the value coming is only number
            this.setState({ bceNumberStartFrom: e.target.value })
        }
    }

    
    showModuleName = (e) => {
        const slateType = getSlateType(this.props.slateLevelData[config.slateManifestURN])
       if(this.props.activeElement.elementId){
        this.props.setCurrentModule(e.currentTarget.checked);
        let els = document.getElementsByClassName('moduleContainer');
        let i = 0;
        let groupby ="";
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
            groupby="module";
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
            "loIndex" : this.props.activeElement.index,
            "slateVersionUrn": config.slateManifestURN,
            "elementParentEntityUrn":config.slateEntityURN
        }
        if (config.elementStatus[this.props.activeElement.elementId] === "approved") {
            config.savingInProgress = true
        }
        this.props.updateElement(data)

    }}

    renderSyntaxHighlighting = (tag) => {
        if (tag === 'BCE') {
            return <div className="panel_syntax_highlighting">
                <div className="toggle-value-bce">Syntax-highlighting</div>
                <label className="switch">
                    <input type="checkbox" checked={(this.state.syntaxHighlightingToggleValue || this.state.syntaxHighlightingToggleValue === false) ? this.state.syntaxHighlightingToggleValue : true} onClick={!hasReviewerRole() && !config.savingInProgress && this.handleSyntaxHighlightingToggle} />
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
        this.setState({
            podOption: !this.state.podOption,
            podValue : selValue ? selValue : this.state.podValue,
            elementDropdown: ''
        }, () => this.handleBceBlur())    
    }

    /**
     * Responsible for rendering of print of Demand 
     * @param {*} 
     */

    podOption = () => {
        if (this.state.activePrimaryOption === 'primary-image-table' || this.state.activePrimaryOption === 'primary-image-figure' ||
            this.state.activePrimaryOption === 'primary-image-equation') {
            let active = '';
            if (this.state.podOption) {
                active = 'active'
            }
            let printValue = this.state.podValue

            printValue = ( printValue && printValue.match(/print/g)) ? printValue.slice(5) : this.state.podValue
            printValue = printValue ? (printValue.match(/%/g) ? printValue : printValue + '%') : '100%'

            let activeElement = document.querySelector(`[data-id="${this.props.activeElement.elementId}"]`)
            let attrNode = activeElement ? activeElement.querySelector(".figureElement") : null
            let showPodValue = this.state.podValue === 'print100' ? '' : this.state.podValue
            if (attrNode) {
                attrNode.setAttribute("podwidth", showPodValue)
            }

            return (
                <div className='printOnDemand'>
                    <label>POD Width Options</label>
                    <div className='element-dropdown'>
                        <div className="element-dropdown-pod" data-element="pod" onClick={this.togglePODDropdown}>
                            <label className='pod-value' id='pod-value'>{printValue}</label>
                            <ul className={`element-dropdown-content pod-options ${active}`}>
                                <li data-value="print25">25%</li>
                                <li data-value="print50">50%</li>
                                <li data-value="print75">75%</li>
                                <li data-value="print100">100%</li>
                            </ul>
                            <svg class="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg>
                        </div>
                    </div>
                </div>

            )
        }
        return null
    }

    render = () => {
        return (
            this.props.activeElement && Object.keys(this.props.activeElement).length !== 0 && this.props.activeElement.elementType !== "element-authoredtext" && <div className="canvas-sidebar">
                <div className="canvas-sidebar-heading">Settings</div>
                {this.primaryOption()}
                {this.renderSyntaxHighlighting(this.props.activeElement && this.props.activeElement.tag || '')}
                {this.renderLanguageLabel(this.props.activeElement && this.props.activeElement.tag || '')}
                {this.secondaryOption()}
                {this.attributions()}
                {this.podOption()}
                {this.state.showSyntaxHighlightingPopup && <PopUp confirmCallback={this.handleSyntaxHighligtingRemove} togglePopup={(value)=>{this.handleSyntaxHighlightingPopup(value)}} dialogText={SYNTAX_HIGHLIGHTING} slateLockClass="lock-message" sytaxHighlight={true}/>}
            </div>
        );
    }
}

Sidebar.defaultProps = {
    elementType: "element-authoredtext"
}

Sidebar.propTypes = {
    /** Active Element Type */
    elementType : PropTypes.string,
}

const mapStateToProps = state => {
    return {
        activeElement: state.appStore.activeElement,
        showModule:state.metadataReducer.showModule,
        permissions : state.appStore.permissions,
        showHideObj:state.appStore.showHideObj,
        slateLevelData: state.appStore.slateLevelData,
        cutCopySelection: state.selectionReducer.selection,
        isLearnosityProject: state.appStore.isLearnosityProjectInfo
    };
};

export default connect(
    mapStateToProps, 
    {
        updateElement,
        setCurrentModule,
        conversionElement,
        setBCEMetadata
    }
)(Sidebar);
