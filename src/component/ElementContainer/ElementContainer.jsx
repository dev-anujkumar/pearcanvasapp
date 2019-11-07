import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import ElementInteractive from '../ElementInteractive';
import ElementAsideContainer from '../ElementAsideContainer';
import ElementMetaDataAnchor from '../ElementMetaDataAnchor';
import ElementMetaLOList from '../ElementMetaLOList';
import ElementLearningObjectiveItem from '../ElementLearningObjectiveItem';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import { glossaaryFootnotePopup } from './../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import { assetPopoverPopup } from '../AssetPopover/AssetPopover_Actions';
import { addComment, deleteElement, updateElement } from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import { fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import { setActiveElement, fetchElementTag } from './../CanvasWrapper/CanvasWrapper_Actions';
import { COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS } from './../../constants/Element_Constants';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader,OpenLOPopup, ViewLearningObjectiveSlate,ViewLearningObjectiveAssessment,AddLearningObjectiveSlate, AddLearningObjectiveAssessment,AddEditLearningObjective,UnlinkSlate,AddLearningObjectiveSlateDropdown,AddEditLearningObjectiveDropdown,ViewLearningObjectiveSlateDropdown,UnlinkSlateDropdown,AddLearningObjectiveAssessmentDropdown} from '../../constants/IFrameMessageTypes.js';
import ListElement from '../ListElement';
import config from '../../config/config';
import AssessmentSlateCanvas from './../AssessmentSlateCanvas';
import arrowButton from '../../images/OpenerElement/arrow.png'
import { ASSESSMENT_SLATE } from './../../constants/Element_Constants';
import PageNumberContext from '../CanvasWrapper/CanvasContexts.js';
import { authorAssetPopOver } from '../AssetPopover/openApoFunction.js';
import { LABELS } from './ElementConstants.js';
import elementTypes from './../Sidebar/elementTypes';

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment: "",
            borderToggle: 'showBorder',
            btnClassName: '',
            showDeleteElemPopup: false,
            ElementId: this.props.index == 0 ? this.props.element.id : '',
            showColorPalette: false,
            activeColorIndex: this.props.element.backgroundcolor ? config.colors.indexOf(this.props.element.backgroundcolor) : 0,
            isHovered: false
        };
    }
    componentDidMount() {
        if (this.props.index == 0) {
            // this.setState({
            //     borderToggle : 'active',
            //     btnClassName : 'activeTagBgColor'

            // })
        }
        this.setState({
            ElementId: this.props.element.id
        })
    }


    // static getDerivedStateFromProps(nextProps, prevState) {
    componentWillReceiveProps(newProps) {
        if (this.state.ElementId != newProps.activeElement.elementId || newProps.elemBorderToggle !== this.props.elemBorderToggle) {
            if (newProps.elemBorderToggle) {
                this.setState({
                    borderToggle: 'showBorder',
                    btnClassName: ''
                })
            } else {
                this.setState({
                    borderToggle: 'hideBorder',
                    btnClassName: ''
                })
            }
         // ** This post message is require to enable comments panel icon in wrapper when element focused **/
            sendDataToIframe({ 'type': 'elementFocus', 'message': {element:newProps.element}});
        } else {
            this.setState({
                borderToggle: 'active',
                btnClassName: 'activeTagBgColor'
            })
         
        }
    }

    /**
     * function will be called on element focus of tinymce instance
     */
    handleFocus = () => {
        this.setState({
            borderToggle: 'active',
            btnClassName: 'activeTagBgColor'
        })
        this.props.setActiveElement(this.props.element, this.props.index);
        this.props.fetchCommentByElement(this.props.element.id);
    }

    createUpdatedData = (type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId) => {
        let dataToReturn = {}
        switch (type){
            case elementTypeConstant.AUTHORED_TEXT:
                let { innerHTML, innerText } = node;
                dataToReturn = {
                    ...previousElementData,
                    elementdata : {
                        text : innerText
                    },
                    html : {
                        text : innerHTML,
                        footnotes : previousElementData.html.footnotes || {},
                        glossaryentries : previousElementData.html.glossaryentries || {},
                    },
                    inputType : elementTypes[elementType][primaryOption]['enum'],
                    inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']          
                }
                break;

            case elementTypeConstant.FIGURE:
                    switch (previousElementData.figuretype) {
                        
                        case elementTypeConstant.FIGURE_IMAGE:
                            let titleHTML = document.getElementById(`cypress-${this.props.index}-0`).innerHTML,
                                subtitleHTML = document.getElementById(`cypress-${this.props.index}-1`).innerHTML,
                                captionHTML = document.getElementById(`cypress-${this.props.index}-2`).innerHTML,
                                creditsHTML = document.getElementById(`cypress-${this.props.index}-3`).innerHTML
                        console.log("FIGURE DATA UPDATED TITLE:",titleHTML, "SUBTITLE:", subtitleHTML, "CAPTION:", captionHTML, "CREDITS:", creditsHTML)
                            dataToReturn = { 
                                ...previousElementData,
                                html : {
                                    captions: `<p>${captionHTML}</p>`,
                                    credits: `<p>${creditsHTML}</p>`,
                                    footnotes: {},
                                    glossaryentries: {},
                                    subtitle: subtitleHTML ,
                                    title: titleHTML
                                },
                                inputType : elementTypes[elementType][primaryOption]['enum'],
                                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'] 
                            }
                            break;
                        case elementTypeConstant.FIGURE_VIDEO:
                                console.log("Figure VIDEO new data::>>", node.innerHTML)
                            dataToReturn = { 
                                ...previousElementData,
                                inputType : elementTypes[elementType][primaryOption]['enum'],
                                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'] 
                            }
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                                console.log("Figure ASSESSMENT new data::>>", node.innerHTML)
                            dataToReturn = { 
                                ...previousElementData,
                                inputType : elementTypes[elementType][primaryOption]['enum'],
                                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
                            }
                            break;
                    }
                    break;
                
            case elementTypeConstant.ELEMENT_ASIDE:
                    switch (previousElementData.subtype) {
                        case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                                console.log("Worked example new data::>>", node.innerHTML)
                        default:
                            dataToReturn = { 
                                ...previousElementData,
                                inputType : elementTypes[elementType][primaryOption]['enum'],
                                inputSubType : elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum']
                        }
                    }
                break;
        }
        return dataToReturn
    }
    
    handleContentChange = (node, previousElementData, elementType, primaryOption, secondaryOption, activeEditorId) => {
        let dataToSend = {}
        switch(previousElementData.type){
            case elementTypeConstant.AUTHORED_TEXT:
                let html = node.innerHTML;
                let text = node.innerText;
                let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
                if(previousElementData.html && html !== previousElementData.html.text && !assetPopoverPopupIsVisible){
                    dataToSend = this.createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                    this.props.updateElement(dataToSend, this.props.index);
                }
                break;
            
            case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        dataToSend = this.createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                        this.props.updateElement(dataToSend, this.props.index);
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        dataToSend = this.createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                        this.props.updateElement(dataToSend, this.props.index);
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        dataToSend = this.createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                        this.props.updateElement(dataToSend, this.props.index);
                        break;
                }
                break;
            
            case elementTypeConstant.ELEMENT_ASIDE:
                    switch (previousElementData.subtype) {
                        case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:   
                        default:
                            dataToSend = this.createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index);
                    
                            
                    }
                break;
            

        }
    }
    
    /**
     * function will be called on element blur and a saving call will be made
     */
    handleBlur = () => {
        const{ elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let activeEditorId = tinyMCE.activeEditor.id
        let node = document.getElementById(activeEditorId);
        console.log("tinyMCE.activeEditor.id>>::", tinyMCE.activeEditor.id)
        if (node) {
        this.handleContentChange(node, this.props.element, elementType, primaryOption, secondaryOption, activeEditorId)
/*             let html = node.innerHTML;
            let text = node.innerText;
            let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
            if (this.props.element.html && html !== this.props.element.html.text && !assetPopoverPopupIsVisible) {  //checking if current dom ids equal to previous                                      
                const dataToSend = this.props.element;  // prepare data to update
                dataToSend.elementdata.text = text;
                dataToSend.html.text = html;
                dataToSend.html.footnotes = this.props.element.html.footnotes || {};
                dataToSend.html.glossaryentries = this.props.element.html.glossaryentries || {};
                dataToSend.inputType = elementTypes[elementType][primaryOption]['enum'];
                dataToSend.inputSubType = elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'];
                sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                this.props.updateElement(dataToSend, this.props.index);                         //update Current element data
            } */
        }
    }

    /**
     * Checks mouse event out side of canvas area and handdling element border state
     */
    handleBlurAside = () => {
        if (this.props.elemBorderToggle) {
            this.setState({
                borderToggle: 'showBorder',
                btnClassName: ''
            })
        } else {
            this.setState({
                borderToggle: 'hideBorder',
                btnClassName: ''
            })
        }
    }
    /**
   * @description - slate tag dropdown opeartions
   * @param {string} text | text of the option selected from dropdown
    */
    learningObjectiveOperations = (text) => {
        let currentSlateLOData = this.props.currentSlateLOData;
        // let isLOExist= this.state.isLOExists;
        let apiKeys = [config.LEARNING_OBJECTIVES_ENDPOINT, config.ASSET_POPOVER_ENDPOINT, config.STRUCTURE_APIKEY, config.COREAPI_ENDPOINT, config.PRODUCTAPI_ENDPOINT];
        if (text == ViewLearningObjectiveSlateDropdown && config.slateType !== 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveSlate, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': true, 'editAction': '' } });
        }
        if (text == ViewLearningObjectiveSlateDropdown && config.slateType === 'assessment') {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': ViewLearningObjectiveAssessment, 'data': currentSlateLOData, 'chapterContainerUrn': config.parentContainerUrn, 'isLOExist': true, 'editAction': '' } });
        }
        // else if( !this.state.slateLockSatus){
        if (text == AddLearningObjectiveSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveSlate, 'data': '', 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': '', 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': true, 'editAction': '', 'apiConstants': apiKeys } })
        }

        else if (text == AddEditLearningObjectiveDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddEditLearningObjective, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': true, 'editAction': true, 'apiConstants': apiKeys } })
        }

        else if (text == AddLearningObjectiveAssessmentDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': AddLearningObjectiveAssessment, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': config.parentContainerUrn, 'projectTitle': document.cookie.split(',')[3].split(':')[1], 'isLOExist': true, 'editAction': true, 'apiConstants': apiKeys } })
        }
        else if (text == UnlinkSlateDropdown && this.props.permissions.includes('lo_edit_metadata')) {
            sendDataToIframe({ 'type': OpenLOPopup, 'message': { 'text': UnlinkSlate, 'data': currentSlateLOData, 'currentSlateId': config.slateManifestURN, 'chapterContainerUrn': '', 'isLOExist': true, 'editAction': '', 'apiConstants': apiKeys } })
        }

        //  }
        //  else(
        //      this.slateLockAlert(this.state.SlatelockUserInfo)
        //  )
    }
    toggleColorPaletteList = () => {
        const { showColorPaletteList } = this.state
        this.setState({
            showColorPaletteList: !showColorPaletteList
        })
    }


    selectColor = (event) => {
        const selectedColor = event.target.getAttribute('data-value')
        this.setState({
            activeColorIndex: config.colors.indexOf(selectedColor)
        })
    }

    /**
     * Rendering Opener element color palette
     * @param {e} event
     */
    renderPaletteList = () => {
        const { showColorPaletteList, activeColorIndex } = this.state
        if (showColorPaletteList) {
            return config.colors.map((color, index) => {
                return <li className={`color-palette-item ${index === activeColorIndex ? 'selected' : ''}`} onClick={(event) => this.selectColor(event)} key={index} data-value={color}></li>
            })
        }
        else {
            return null
        }
    }
    /**
     * Renders color-palette button for opener element 
     * @param {e} event
     */
    renderColorPaletteButton = (element) => {
        if (element.type === elementTypeConstant.OPENER) {
            return (
                <>
                    <Button onClick={this.toggleColorPaletteList} type="color-palette" />
                    <ul className="color-palette-list">{this.renderPaletteList()}</ul>
                </>
            )
        }
        else {
            return null
        }
    }

    /**
     * show Delete element Popup 
     * @param {elementId} 
     */
    showDeleteElemPopup = (popup) => {
        this.props.showBlocker(true);
        showTocBlocker();
        this.setState({
            popup,
            showDeleteElemPopup: true
        });
    }

    /**
     * For deleting slate level element
     */
    deleteElement = () => {
        const { id, type, contentUrn } = this.props.element;
        const { parentUrn, asideData } = this.props;
        this.handleCommentPopup(false);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        // api needs to run from here
        this.props.deleteElement(id, type, parentUrn, asideData, contentUrn);
    }

    /**
     * Render Element function takes current element from bodymatter and render it into currnet slate 
     * @param {element} 
    */

    renderElement = (element = {}) => {
        let editor = '';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo, permissions } = this.props;
        let labelText = fetchElementTag(element, index);
        config.elementToolbar = this.props.activeElement.toolbar || [];
        /* TODO need better handling with a function and dynamic component rendering with label text*/
        if(labelText) {
            switch (element.type) {
                case elementTypeConstant.ASSESSMENT_SLATE:
                    editor = <AssessmentSlateCanvas permissions={permissions} model={element} elementId={element.id} handleBlur={this.handleBlur} handleFocus={this.handleFocus} showBlocker={this.props.showBlocker} />
                    labelText = 'AS'
                    break;
                case elementTypeConstant.OPENER:
                    const { activeColorIndex } = this.state
                    editor = <OpenerElement permissions={permissions} backgroundColor={config.colors[activeColorIndex]} index={index} onClick={this.handleFocus} handleBlur={this.handleBlur} elementId={element.id} element={element} slateLockInfo={slateLockInfo} />
                    labelText = 'OE'
                    break;
                case elementTypeConstant.AUTHORED_TEXT:
                case elementTypeConstant.BLOCKFEATURE:
                    editor = <ElementAuthoring permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    break;
                case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
                    editor = <ElementLearningObjectiveItem permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    break;
                case elementTypeConstant.FIGURE:
                    switch (element.figuretype) {
                        case elementTypeConstant.FIGURE_IMAGE:
                        case elementTypeConstant.FIGURE_TABLE:
                        case elementTypeConstant.FIGURE_MATH_IMAGE:
                        case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        case elementTypeConstant.FIGURE_CODELISTING:
                            editor = <ElementFigure permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                            labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_AUDIO:
                        case elementTypeConstant.FIGURE_VIDEO:
                            editor = <ElementAudioVideo permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                            labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                            editor = <ElementSingleAssessment permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo} />;
                            labelText = 'Qu';
                            break;
                        case elementTypeConstant.INTERACTIVE:
                            switch (element.figuredata.interactiveformat) {
                                case elementTypeConstant.INTERACTIVE_MMI:
                                    editor = <ElementInteractive permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                    labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                    break;
                                case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                    editor = <ElementInteractive permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlurAside} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                    labelText = LABELS[element.figuredata.interactiveformat];
                                    break;
                            }
                    }
                    break;
                case elementTypeConstant.ELEMENT_LIST:
                    editor = <ListElement permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    labelText = 'OL'
                    break;
                case elementTypeConstant.ELEMENT_ASIDE:
                    switch (element.subtype) {
                        case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                            editor = <ElementAsideContainer permissions={permissions} showDeleteElemPopup={this.showDeleteElemPopup} showBlocker={this.props.showBlocker} setActiveElement={this.props.setActiveElement} handleBlur={this.handleBlur} handleFocus={this.handleFocus} btnClassName={this.state.btnClassName} borderToggle={this.state.borderToggle} elemBorderToggle={this.props.elemBorderToggle} elementSepratorProps={elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                            // labelText = LABELS[element.subtype] || 'AS';
                            break;
                        default:
                            editor = <ElementAsideContainer  permissions={permissions} showDeleteElemPopup={this.showDeleteElemPopup} showBlocker={this.props.showBlocker} setActiveElement={this.props.setActiveElement} handleBlur={this.handleBlur} handleFocus={this.handleFocus} btnClassName={this.state.btnClassName} borderToggle={this.state.borderToggle} elemBorderToggle={this.props.elemBorderToggle} elementSepratorProps={elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                            // labelText = 'AS'
                    }
                    break;
                case elementTypeConstant.METADATA_ANCHOR:
                    editor = <ElementMetaDataAnchor permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} showBlocker={this.props.showBlocker} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    labelText = 'LO'
                    break;
                case elementTypeConstant.METADATA_ANCHOR_LO_LIST:
                    editor = <ElementMetaLOList permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} showBlocker={this.props.showBlocker} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    labelText = 'MA'
                    break;
            }
        } else {
            editor = <p className="incorrect-data">Incorrect Data - {element.id}</p>;
        }

        return (
            <div className="editor" data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                    <Button type="element-label" btnClassName={this.state.btnClassName} labelText={labelText} />
                    {permissions && permissions.includes('elements_add_remove') && config.slateType !== 'assessment' ? (<Button type="delete-element" onClick={() => this.showDeleteElemPopup(true)} />)
                        : null}
                    {this.renderColorPaletteButton(element)}
                </div>
                    : ''}
                <div className={`element-container ${this.state.borderToggle}`} data-id={element.id}>
                    {editor}
                </div>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                    {permissions && permissions.includes('notes_adding') && <Button type="add-comment" btnClassName={this.state.btnClassName} onClick={() => this.handleCommentPopup(true)} />}
                    {permissions && permissions.includes('note_viewer') && element.comments && <Button elementId={element.id} onClick={handleCommentspanel} type="comment-flag" />}
                    {element.tcm && <Button type="tcm" />}
                </div> : ''}
                {this.state.popup && <PopUp
                    togglePopup={e => this.handleCommentPopup(e, this)}
                    active={this.state.popup}
                    handleChange={this.handleCommentChange}
                    saveContent={this.saveNewComment}
                    rows={COMMENTS_POPUP_ROWS}
                    dialogText={COMMENTS_POPUP_DIALOG_TEXT}
                    showDeleteElemPopup={this.state.showDeleteElemPopup}
                    deleteElement={this.deleteElement}
                />}
                {
                    <PageNumberContext.Consumer>
                        {
                            ({ isPageNumberEnabled }) => this.props.children(this.state.isHovered, isPageNumberEnabled, this.props.activeElement, this.props.permissions)
                        }
                    </PageNumberContext.Consumer>
                }
            </div >
        );
    }

    /**
     * @description - This function is for handling the closing and opening of popup.
     * @param {event} popup
     */
    handleCommentPopup(popup) {
        this.setState({
            popup,
            showDeleteElemPopup: false
        });
        if (this.props.isBlockerActive) {
            this.props.showBlocker(false)
            hideBlocker();
        }
    }

    /**
     * @description - This function is for handleChange of popup.
     * @param newComment
     */
    handleCommentChange = (newComment) => {
        this.setState({
            comment: newComment
        })
    }

    /**
     * @description - This function is for ADD COMMENT API.
     */
    saveNewComment = () => {
        const { comment } = this.state;
        const { id } = this.props.element;

        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        this.props.addComment(comment, id);
        this.handleCommentPopup(false);
    }

    /**
     * @description - This function is for Open Glossarypopup.
     * @param {} 
     * @param 
     */
    openGlossaryFootnotePopUp = (glossaaryFootnote, popUpStatus) => {
        this.props.glossaaryFootnotePopup(glossaaryFootnote, popUpStatus);
    }

    /**
     * @description - This function is for open assest popover.
     */
    openAssetPopoverPopUp = (toggleApoPopup) => {
        authorAssetPopOver(toggleApoPopup)
        // this.props.assetPopoverPopup(toggleApoPopup)
    }

    render = () => {
        const { element } = this.props;
        return this.renderElement(element);
    }
    /**
     * @description - This function is for handling hover on element and showing page numbering box.
     */
    handleOnMouseOver = () => {
        this.setState({ isHovered: true })
    }

    /**
     * @description - This function is for handling mouse out on element and hiding page numbering box.
     */
    handleOnMouseOut = () => {
        this.setState({ isHovered: false })
    }
}

ElementContainer.defaultProps = {
    element: {}
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element: PropTypes.object,
    elemBorderToggle: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments, elementId) => {
            dispatch(addComment(comments, elementId))
        },
        fetchCommentByElement: (elementId) => {
            dispatch(fetchCommentByElement(elementId))
        },
        setActiveElement: (element, index) => {
            dispatch(setActiveElement(element, index))
        },
        deleteElement: (id, type, parentUrn, asideData, contentUrn) => {
            dispatch(deleteElement(id, type, parentUrn, asideData, contentUrn))
        },
        glossaaryFootnotePopup: (glossaaryFootnote, popUpStatus) => {
            dispatch(glossaaryFootnotePopup(glossaaryFootnote, popUpStatus))
        },
        updateElement: (updatedData, elementIndex) => {
            dispatch(updateElement(updatedData, elementIndex))
        }
    }
}

const mapStateToProps = (state) => {

    return {
        elemBorderToggle: state.toolbarReducer.elemBorderToggle,
        activeElement: state.appStore.activeElement,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        currentSlateLOData: state.metadataReducer.currentSlateLOData,
        permissions: state.appStore.permissions,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
