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
import { updateFigureData } from './ElementContainer_Actions.js';
import { createUpdatedData } from './UpdateElements.js';

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
            isHovered: false,
            hasError: false
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
    handleFocus = (updateFromC2Flag) => {
        if(updateFromC2Flag){
            this.props.setActiveElement(this.props.element, this.props.index);
        }
        else {
            this.setState({
                borderToggle: 'active',
                btnClassName: 'activeTagBgColor'
            })
            this.props.setActiveElement(this.props.element, this.props.index);
            this.props.fetchCommentByElement(this.props.element.id);
        }   
    }

    figureDifference = (index, previousElementData) => {
        let titleHTML = document.getElementById(`cypress-${index}-0`).innerHTML,
            subtitleHTML = document.getElementById(`cypress-${index}-1`).innerHTML,
            captionHTML = document.getElementById(`cypress-${index}-2`).innerHTML,
            creditsHTML = document.getElementById(`cypress-${index}-3`).innerHTML

        if(titleHTML !== previousElementData.html.title ||
            subtitleHTML !== previousElementData.html.subtitle || 
            captionHTML !== previousElementData.html.captions ||
            creditsHTML !== previousElementData.html.credits||
            previousElementData.figuredata.path !== this.props.oldImage
            ){
                return true
            }
            else {
                return false
            }
    }
    
    /**
     * Calls API for element updation
     * @param {*} node
     * @param {*} previousElementData
     * @param {*} elementType
     * @param {*} primaryOption
     * @param {*} secondaryOption
     * @param {*} activeEditorId
     */
    handleContentChange = (node, previousElementData, elementType, primaryOption, secondaryOption, activeEditorId) => {
        let dataToSend = {}
        switch(previousElementData.type){
            case elementTypeConstant.AUTHORED_TEXT:
                let html = node.innerHTML;
                let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
                if(previousElementData.html && html !== previousElementData.html.text && !assetPopoverPopupIsVisible){
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                    this.props.updateElement(dataToSend, this.props.index);
                }
                break;
            
            case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE_EDITOR:   
                        if(this.figureDifference(this.props.index, previousElementData)){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index);
                        }
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        if(this.figureDifference(this.props.index, previousElementData)){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index);
                        }
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        if(this.figureDifference(this.props.index, previousElementData)){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index);
                        }
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        if(this.figureDifference(this.props.index, previousElementData)){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index);
                        }
                        break;
                }
                break;
            
            case elementTypeConstant.ELEMENT_ASIDE:
                    switch (previousElementData.subtype) {
                        case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:   
                        default:
                            /* dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                            this.props.updateElement(dataToSend, this.props.index); */          
                    }
                break;
            

        }
    }
    
    /**
     * function will be called on element blur and a saving call will be made
     */
    handleBlur = () => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let activeEditorId = tinyMCE.activeEditor.id
        let node = document.getElementById(activeEditorId);
        console.log("tinyMCE.activeEditor.id>>::", tinyMCE.activeEditor.id)
        if (node) {
        this.handleContentChange(node, this.props.element, elementType, primaryOption, secondaryOption, activeEditorId)
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
     * Updates figuredata to local store
     */
    updateFigureData = (figureData, index, cb) => {
        this.props.updateFigureData(figureData, index, cb)
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
                        case elementTypeConstant.FIGURE_TABLE_EDITOR:
                            editor = <ElementFigure updateFigureData = {this.updateFigureData} permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} elementId={element.id}/>;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_AUDIO:
                        case elementTypeConstant.FIGURE_VIDEO:
                            editor = <ElementAudioVideo updateFigureData = {this.updateFigureData} permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                            editor = <ElementSingleAssessment permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo} />;
                            labelText = 'Qu';
                            break;
                        case elementTypeConstant.INTERACTIVE:
                            switch (element.figuredata.interactiveformat) {
                                case elementTypeConstant.INTERACTIVE_MMI:
                                    editor = <ElementInteractive updateFigureData = {this.updateFigureData} permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                    labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                    break;
                                case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                    editor = <ElementInteractive updateFigureData = {this.updateFigureData} permissions={permissions} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlurAside} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
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
                            editor = <ElementAsideContainer handleCommentspanel={handleCommentspanel} permissions={permissions} showDeleteElemPopup={this.showDeleteElemPopup} showBlocker={this.props.showBlocker} setActiveElement={this.props.setActiveElement} handleBlur={this.handleBlur} handleFocus={this.handleFocus} btnClassName={this.state.btnClassName} borderToggle={this.state.borderToggle} elemBorderToggle={this.props.elemBorderToggle} elementSepratorProps={elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                            // labelText = LABELS[element.subtype] || 'AS';
                            break;
                        default:
                            editor = <ElementAsideContainer  handleCommentspanel= {handleCommentspanel} permissions={permissions} showDeleteElemPopup={this.showDeleteElemPopup} showBlocker={this.props.showBlocker} setActiveElement={this.props.setActiveElement} handleBlur={this.handleBlur} handleFocus={this.handleFocus} btnClassName={this.state.btnClassName} borderToggle={this.state.borderToggle} elemBorderToggle={this.props.elemBorderToggle} elementSepratorProps={elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
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
        this.props.addComment(comment, id,this.props.asideData,this.props.parentUrn);
        this.handleCommentPopup(false);
    }

    /**
     * @description - This function is for Open Glossarypopup.
     * @param {} 
     * @param 
     */
    openGlossaryFootnotePopUp = (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, callback) => {
        this.props.glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, callback);
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
        try {
            if (this.state.hasError) {
                return (
                    <p className="incorrect-data">Failed to load element {this.props.element.figuretype}, URN {this.props.element.id}</p>
                )
            }
            return this.renderElement(element);
        } catch (error) {
            return (
                <p className="incorrect-data">Failed to load element {this.props.element.figuretype}, URN {this.props.element.id}</p>
            )
        }
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

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
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
        addComment: (comments, elementId,asideData,ParentUrn) => {
            dispatch(addComment(comments, elementId,asideData,ParentUrn))
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
        glossaaryFootnotePopup: (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, callback) => {
            dispatch(glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType)).then(() => {
                if (callback) {
                    callback();
                }
            })
        },
        updateElement: (updatedData, elementIndex) => {
            dispatch(updateElement(updatedData, elementIndex))
        },
        updateFigureData : (figureData, index, cb) =>{
            dispatch(updateFigureData(figureData, index, cb))
        },
        resetTableDataAction: (isReplaced) => {
            dispatch(resetTableDataAction(isReplaced))
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
        oldImage: state.appStore.oldImage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
