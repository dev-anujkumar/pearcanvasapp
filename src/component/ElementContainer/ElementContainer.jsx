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
import { addComment, deleteElement, updateElement } from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import { fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import { setActiveElement, fetchElementTag } from './../CanvasWrapper/CanvasWrapper_Actions';
import { COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS } from './../../constants/Element_Constants';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import ListElement from '../ListElement';
import config from '../../config/config';
import AssessmentSlateCanvas from './../AssessmentSlateCanvas';
import PageNumberContext from '../CanvasWrapper/CanvasContexts.js';
import { authorAssetPopOver } from '../AssetPopover/openApoFunction.js';
import { LABELS } from './ElementConstants.js';
import { updateFigureData } from './ElementContainer_Actions.js';
import { createUpdatedData, createOpenerElementData } from './UpdateElements.js';
import { updatePageNumber } from '../SlateWrapper/SlateWrapper_Actions';

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
        this.setState({
            ElementId: this.props.element.id,
            btnClassName : '',
            isOpener : this.props.element.type===elementTypeConstant.OPENER
        })
    }


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
            sendDataToIframe({ 'type': 'elementFocus', 'message': { element: newProps.element } });
        } else if(newProps.element.type == "openerelement"){
            this.setState({
                borderToggle: 'active',
            })
        }
        else {
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
        if (updateFromC2Flag) {
            this.props.setActiveElement(this.props.element, this.props.index);
        }
        else {
            if(this.props.element.type == "openerelement"){
                this.setState({
                    borderToggle: 'active'
                })
            }
            else{
                this.setState({
                    borderToggle: 'active',
                    btnClassName: 'activeTagBgColor'
                })
            }   
            this.props.setActiveElement(this.props.element, this.props.index);
            this.props.fetchCommentByElement(this.props.element.id);
        }
    }

    /**
     * Checks for any difference in data before initiating saving call
     * @param {*} index element index
     * @param {*} previousElementData old element data
     */
    figureDifference = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            captionDOM = document.getElementById(`cypress-${index}-2`),
            creditsDOM = document.getElementById(`cypress-${index}-3`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        if (titleHTML !== previousElementData.html.title ||
            subtitleHTML !== previousElementData.html.subtitle ||
            captionHTML !== previousElementData.html.captions ||
            creditsHTML !== previousElementData.html.credits ||
            previousElementData.figuredata.path !== this.props.oldImage
            ){
                return true
            }
            else {
                return false
            }
    }

    /**
     * Checks for any difference in data before initiating saving call (Interactive element)
     * @param {*} index element index
     * @param {*} previousElementData old element data
     */
    figureDifferenceInteractive = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            interactiveDOM = document.getElementById(`cypress-${index}-2`),
            captionsDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            interactiveHTML = interactiveDOM ? interactiveDOM.innerHTML : "",
            captionHTML = captionsDOM ? captionsDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        if(titleHTML !== previousElementData.html.title ||
            subtitleHTML !== previousElementData.html.subtitle || 
            captionHTML !== previousElementData.html.captions ||
            creditsHTML !== previousElementData.html.credits
            ){
                return true
            }
            else {
                return false
            }
    }

    updateOpenerElement = (dataToSend) => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        dataToSend = createOpenerElementData(this.props.element, elementType, primaryOption, secondaryOption)
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        this.props.updateElement(dataToSend, 0);
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
        const {parentUrn,asideData} = this.props
        let dataToSend = {}
        switch (previousElementData.type) {
            case elementTypeConstant.AUTHORED_TEXT:
            case elementTypeConstant.BLOCKFEATURE:
                let html = node.innerHTML;
                let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
                if (previousElementData.html && html !== previousElementData.html.text && !assetPopoverPopupIsVisible) {
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                    this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
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
                            this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
                        }
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                    case elementTypeConstant.FIGURE_AUDIO:
                        if (this.figureDifference(this.props.index, previousElementData)) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
                        }
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                        this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        if(this.figureDifferenceInteractive(this.props.index, previousElementData)){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            this.props.updateElement(dataToSend, this.props.index),parentUrn,asideData;
                        }
                        break;

                    case elementTypeConstant.FIGURE_CODELISTING:
                            if(this.figureDifference(this.props.index, previousElementData)){
                                dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                                sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                                this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
                            }
                            break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                            if(this.figureDifference(this.props.index, previousElementData)){
                                dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                                sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })    
                                this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
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
            case elementTypeConstant.ASSESSMENT_SLATE :
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this)
                    this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData);
                    break;
        }
    }

    /**
     * Will be called on element blur and a saving call will be made
     */
    handleBlur = () => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let activeEditorId = tinyMCE.activeEditor ? tinyMCE.activeEditor.id : ""
        let node = document.getElementById(activeEditorId);
        //console.log("tinyMCE.activeEditor.id>>::", tinyMCE.activeEditor.id)
        if (node||elementType!=='element-assessment') {
        this.handleContentChange(node, this.props.element, elementType, primaryOption, secondaryOption, activeEditorId)
        }
    }

    /**
     * Will e called on assessment element's blur
     */
    handleBlurAssessmentSlate = (assessmentData)=>{
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let dataToSend = {...this.props.element}
       
        dataToSend.elementdata.assessmenttitle = assessmentData.title;
        dataToSend.elementdata.assessmentformat = assessmentData.format;
        dataToSend.elementdata.usagetype = assessmentData.usageType;
        dataToSend.elementdata.assessmentid = assessmentData.id;
        if (assessmentData.format === 'learningtemplate') {
            dataToSend.elementdata["learningsystem"] = assessmentData.learningsystem;
            dataToSend.elementdata["templateid"] = assessmentData.templateid;
            dataToSend.elementdata["templatetype"] = assessmentData.templatetype;
            dataToSend.elementdata["templatelabel"] = assessmentData.templatelabel;
        } 
        this.handleContentChange('', dataToSend, 'element-assessment', 'primary-assessment-slate', 'secondary-assessment-'+assessmentData.format)
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
    toggleColorPaletteList = () => {
        const { showColorPaletteList } = this.state
        this.setState({
            showColorPaletteList: !showColorPaletteList
        })
    }

    /**
     * Updates background color in opener element.
     * @param {*} event event object
     */
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
     * @param {*} figureData updated figuredata object
     * @param {*} index index of figure element
     * @param {*} cb callback method
     */
    updateFigureData = (figureData, index, cb) => {
        this.props.updateFigureData(figureData, index, cb)
    }

    toolbarHandling = (action = "") => {
        if(document.querySelector('div#tinymceToolbar .tox-toolbar')) {
            if(action === "add") {
                document.querySelector('div#tinymceToolbar .tox-toolbar').classList.add("disable");
            } else if(action === "remove") {
                document.querySelector('div#tinymceToolbar .tox-toolbar').classList.remove("disable");
            }
        }
    }

    /**
     * Render Element function takes current element from bodymatter and render it into currnet slate 
     * @param {element} 
    */
    renderElement = (element = {}) => {
        let editor = '';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo, permissions,updatePageNumber } = this.props;
        let labelText = fetchElementTag(element, index);
        config.elementToolbar = this.props.activeElement.toolbar || [];
        /* TODO need better handling with a function and dynamic component rendering with label text*/
        if (labelText) {
            switch (element.type) {
                case elementTypeConstant.ASSESSMENT_SLATE:
                    editor = <AssessmentSlateCanvas permissions={permissions} model={element} elementId={element.id} handleBlur={this.handleBlurAssessmentSlate} handleFocus={this.handleFocus} showBlocker={this.props.showBlocker} slateLockInfo={slateLockInfo} />
                    labelText = 'AS'
                    break;
                case elementTypeConstant.OPENER:
                    const { activeColorIndex } = this.state
                    editor = <OpenerElement permissions={permissions} backgroundColor={config.colors[activeColorIndex]} index={index} onClick={this.handleFocus} handleBlur={this.handleBlur} elementId={element.id} element={element} slateLockInfo={slateLockInfo} updateElement={this.updateOpenerElement} />
                    labelText = 'OE'
                    break;
                case elementTypeConstant.AUTHORED_TEXT:
                case elementTypeConstant.BLOCKFEATURE:
                    editor = <ElementAuthoring permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} />;
                    break;
                case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
                    editor = <ElementLearningObjectiveItem permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} />;
                    break;
                case elementTypeConstant.FIGURE:
                    switch (element.figuretype) {
                        case elementTypeConstant.FIGURE_IMAGE:
                        case elementTypeConstant.FIGURE_TABLE:
                        case elementTypeConstant.FIGURE_MATH_IMAGE:
                        case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        case elementTypeConstant.FIGURE_CODELISTING:
                        case elementTypeConstant.FIGURE_TABLE_EDITOR:
                            editor = <ElementFigure updateFigureData = {this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} elementId={element.id}/>;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_AUDIO:
                        case elementTypeConstant.FIGURE_VIDEO:
                            editor = <ElementAudioVideo updateFigureData = {this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                            editor = <ElementSingleAssessment showBlocker={this.props.showBlocker} permissions={permissions} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo} />;
                            labelText = 'Qu';
                            break;
                        case elementTypeConstant.INTERACTIVE:
                            switch (element.figuredata.interactiveformat) {
                                case elementTypeConstant.INTERACTIVE_MMI:
                                    editor = <ElementInteractive showBlocker={this.props.showBlocker} updateFigureData = {this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                    labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                    break;
                                case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                    editor = <ElementInteractive showBlocker={this.props.showBlocker} updateFigureData = {this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                    labelText = LABELS[element.figuredata.interactiveformat];
                                    break;
                            }
                    }
                    break;
                case elementTypeConstant.ELEMENT_LIST:
                    editor = <ListElement permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} />;
                    labelText = 'OL'
                    if (element.subtype === 'disc')
                        labelText = 'UL'
                    break;
                case elementTypeConstant.ELEMENT_ASIDE:
                    switch (element.subtype) {
                        case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                            editor = <ElementAsideContainer
                                handleCommentspanel={handleCommentspanel}
                                permissions={permissions}
                                showDeleteElemPopup={this.showDeleteElemPopup}
                                showBlocker={this.props.showBlocker}
                                setActiveElement={this.props.setActiveElement}
                                handleBlur={this.handleBlur}
                                handleFocus={this.handleFocus}
                                btnClassName={this.state.btnClassName}
                                borderToggle={this.state.borderToggle}
                                elemBorderToggle={this.props.elemBorderToggle}
                                elementSepratorProps={elementSepratorProps}
                                index={index} element={element}
                                elementId={element.id}
                                type={element.type}
                                slateLockInfo={slateLockInfo} 
                                updatePageNumber ={updatePageNumber}
                                />;
                            // labelText = LABELS[element.subtype] || 'AS';
                            break;
                        default:
                            editor = <ElementAsideContainer
                                handleCommentspanel={handleCommentspanel}
                                permissions={permissions}
                                showDeleteElemPopup={this.showDeleteElemPopup}
                                showBlocker={this.props.showBlocker}
                                setActiveElement={this.props.setActiveElement}
                                handleBlur={this.handleBlur}
                                handleFocus={this.handleFocus}
                                btnClassName={this.state.btnClassName}
                                borderToggle={this.state.borderToggle}
                                elemBorderToggle={this.props.elemBorderToggle}
                                elementSepratorProps={elementSepratorProps}
                                index={index}
                                element={element}
                                elementId={element.id}
                                type={element.type}
                                slateLockInfo={slateLockInfo}
                                updatePageNumber ={updatePageNumber}
                                 />;
                        // labelText = 'AS'
                    }
                    break;
                case elementTypeConstant.METADATA_ANCHOR:
                    editor = <ElementMetaDataAnchor showBlocker={this.props.showBlocker} permissions={permissions} handleBlur={this.handleBlur} handleFocus={this.handleFocus}  index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    labelText = 'LO'
                    break;
                case elementTypeConstant.METADATA_ANCHOR_LO_LIST:
                    editor = <ElementMetaLOList showBlocker={this.props.showBlocker} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onClick={this.handleFocus} />;
                    labelText = 'MA'
                    break;
            }
        } else {
            editor = <p className="incorrect-data">Incorrect Data - {element.id}</p>;
        }

        return (
            <div className="editor" data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                    <Button type="element-label" btnClassName={`${this.state.btnClassName} ${this.state.isOpener?' ignore-for-drag':''}`} labelText={labelText} />
                    {permissions && permissions.includes('elements_add_remove') && config.slateType !== 'assessment' ? (<Button type="delete-element" onClick={() => this.showDeleteElemPopup(true)} />)
                        : null}
                    {this.renderColorPaletteButton(element)}
                </div>
                    : ''}
                <div className={`element-container ${labelText.toLowerCase()} ${this.state.borderToggle}`} data-id={element.id} onFocus={() => this.toolbarHandling('remove')} onBlur={() => this.toolbarHandling('add')}>
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
        this.props.addComment(comment, id, this.props.asideData, this.props.parentUrn);
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
        addComment: (comments, elementId, asideData, ParentUrn) => {
            dispatch(addComment(comments, elementId, asideData, ParentUrn))
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
        updateElement: (updatedData, elementIndex,parentUrn,asideData) => {
            dispatch(updateElement(updatedData, elementIndex,parentUrn,asideData))
        },
        updateFigureData: (figureData, index, cb) => {
            dispatch(updateFigureData(figureData, index, cb))
        },
        updatePageNumber: (pagenumber, elementId, asideData, parentUrn) => {
            dispatch(updatePageNumber(pagenumber, elementId, asideData, parentUrn))
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
        permissions: state.appStore.permissions,
        oldImage: state.appStore.oldImage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
