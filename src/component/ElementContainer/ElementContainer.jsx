import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import ElementInteractive from '../ElementInteractive';
import ElementAsideContainer from '../ElementAsideContainer';
import ElementMetaDataAnchor from '../ElementMetaDataAnchor';
import ElementMetaLOList from '../ElementMetaLOList';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import {glossaaryFootnotePopup} from './../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import {assetPopoverPopup} from '../AssetPopover/AssetPopover_Actions';
import {addComment,deleteElement,updateElement} from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import { fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import { setActiveElement, fetchElementTag } from './../CanvasWrapper/CanvasWrapper_Actions';
import {COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS} from './../../constants/Element_Constants';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader} from '../../constants/IFrameMessageTypes.js';
import ListElement from '../ListElement';
import config from '../../config/config';
import arrowButton from '../../images/OpenerElement/arrow.png'
import {AssessmentSlateCanvas} from './../AssessmentSlateCanvas/AssessmentSlateCanvas.jsx';
import {ASSESSMENT_SLATE} from './../../constants/Element_Constants';
import { PageNumberContext } from '../CanvasWrapper/CanvasContexts.js';
import { authorAssetPopOver} from '../AssetPopover/openApoFunction.js';

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment:"",
            borderToggle : 'showBorder',
            btnClassName : '',
            showDeleteElemPopup : false,
            ElementId: this.props.index==0?this.props.element.id:'',
            showColorPalette : false,
            activeColorIndex: 0,
            isHovered: false
        };
    }
    componentDidMount(){
        if( this.props.index == 0 ){
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
    componentWillReceiveProps(newProps){      
        if( this.state.ElementId != newProps.activeElement.elementId || newProps.elemBorderToggle !== this.props.elemBorderToggle ){           
             if(newProps.elemBorderToggle){
                this.setState({
                    borderToggle : 'showBorder',
                    btnClassName : ''
                })
            } else {
                this.setState({
                    borderToggle : 'hideBorder',
                    btnClassName : ''
                })
            } 
        }else{
            this.setState({
                borderToggle : 'active',
                btnClassName : 'activeTagBgColor'
            })
        }
    }

    handleFocus = () => {
        this.setState({
            borderToggle: 'active',
            btnClassName: 'activeTagBgColor'
        })
        this.props.setActiveElement(this.props.element, this.props.index);
        this.props.fetchCommentByElement(this.props.element.id);
    }

    handleBlur =() =>{
        let node = document.getElementById(tinyMCE.activeEditor.id);
        let html = node.innerHTML;
        let text = node.innerText;
        let dataToSend = {
            "id": this.props.element.id,
            "type": this.props.element.type,
            "schema": this.props.element.schema,
            "versionUrn": this.props.element.versionUrn,
            "contentUrn": this.props.element.contentUrn,
            "elementdata": {
                "schema": this.props.element.elementdata.schema,
                "text": text,
                "groupby": null
            },
            "html": {
                "text": html
            }
        }
        console.log("prepared Data",JSON.stringify(dataToSend));
        updateElement(dataToSend);
  
    }

    
    handleBlurAside = () => {
        if(this.props.elemBorderToggle){
            this.setState({
                borderToggle : 'showBorder',
                btnClassName : ''
            })
        } else {
            this.setState({
                borderToggle : 'hideBorder',
                btnClassName : ''
            })
        } 
    }
    learningObjectiveOperations = (text) =>{
        let currentSlateLOData = this.props.currentSlateLOData;
        // let isLOExist= this.state.isLOExists;
        let apiKeys = [config.LEARNING_OBJECTIVES_ENDPOINT, config.ASSET_POPOVER_ENDPOINT,config.STRUCTURE_APIKEY,config.COREAPI_ENDPOINT];
        if(text =="View Learning Objective" && config.slateType !== 'assessment'){
            sendDataToIframe({'type': 'openLoPopup','message':{'text':'VIEW LEARNING OBJECTIVE','data':currentSlateLOData,'chapterContainerUrn':config.parentContainerUrn,'isLOExist':true,'editAction':''}},config.WRAPPER_URL);
        }
        if(text =="View Learning Objective" && config.slateType === 'assessment'){
            sendDataToIframe({'type': 'openLoPopup','message':{'text':'VIEW ASSESSMENT ITEM LO TAGGING','data':currentSlateLOData,'chapterContainerUrn':config.parentContainerUrn,'isLOExist':isLOExist,'editAction':''}},config.WRAPPER_URL);
        }
        // else if( !this.state.slateLockSatus){
            if(text =="Add a New Learning Objective" &&  config.PERMISSIONS.includes('lo_edit_metadata')){
                sendDataToIframe({'type': 'openLoPopup','message':{'text':'LEARNING OBJECTIVE','data':'','currentSlateId':config.slateManifestURN,'chapterContainerUrn':'','projectTitle':document.cookie.split(',')[3].split(':')[1],'isLOExist':true,'editAction':'','apiConstants':apiKeys}},config.WRAPPER_URL)
            }
      
            else if(text =="Add From Existing or Edit" && config.PERMISSIONS.includes('lo_edit_metadata')){
                sendDataToIframe({'type': 'openLoPopup','message':{'text':'CHOOSE FROM EXISTING LEARNING OBJECTIVE','data' : currentSlateLOData,'currentSlateId':config.slateManifestURN,'chapterContainerUrn':config.parentContainerUrn,'projectTitle':document.cookie.split(',')[3].split(':')[1],'isLOExist':true,'editAction':true,'apiConstants':apiKeys}},config.WRAPPER_URL)
            }

            else if(text =="Add From Existing" && config.PERMISSIONS.includes('lo_edit_metadata')){
                sendDataToIframe({'type': 'openLoPopup','message':{'text':'ASSESSMENT ITEM LO TAGGING','data' : currentSlateLOData,'currentSlateId':config.slateManifestURN,'chapterContainerUrn':config.parentContainerUrn,'projectTitle':document.cookie.split(',')[3].split(':')[1],'isLOExist':true,'editAction':true,'apiConstants':apiKeys}},config.WRAPPER_URL)
            }
        //  }
        //  else(
        //      this.slateLockAlert(this.state.SlatelockUserInfo)
        //  )
        //this.setState({lodropdown : false})
        //$(".learningobjectiveicon svg").replaceWith('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="Artboard_2" data-name="Artboard – 2" clip-path="url(#clip-Artboard_2)"><g id="baseline-label-24px"><path id="Path_1664" data-name="Path 1664" d="M17.63,5.84A1.994,1.994,0,0,0,16,5L5,5.01A2,2,0,0,0,3,7V17a2,2,0,0,0,2,1.99L16,19a1.994,1.994,0,0,0,1.63-.84L22,12,17.63,5.84Z" fill="#42a316"/></g><g id="check" transform="translate(4.6 3.4)"><path id="Path_1665" data-name="Path 1665" d="M5.907,10.346,4.027,8.466,3.4,9.093,5.907,11.6l5.373-5.373L10.654,5.6Z" transform="translate(-1)" fill="#fff"/></g></g></svg>')
        }
        toggleColorPaletteList = () => {
        const { showColorPaletteList } = this.state
        this.setState({
            showColorPaletteList : !showColorPaletteList
        })
    }
    selectColor = (event) => {
        const selectedColor = event.target.getAttribute('data-value')
        this.setState({
            activeColorIndex : config.colors.indexOf(selectedColor)
        })
    }
    
    renderPaletteList = () =>{
        const { showColorPaletteList, activeColorIndex } = this.state
        if(showColorPaletteList){
            return config.colors.map( (color, index) => {
                        return <li className={`color-palette-item ${index === activeColorIndex ? 'selected': ''}`} onClick={(event)=> this.selectColor(event)} key={index} data-value={color}></li>
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
            showDeleteElemPopup : true
        });
    }

    deleteElement = () => {
        const {id, type}=this.props.element;
        const {parentUrn,asideData} = this.props;
        this.handleCommentPopup(false);
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        // api needs to run from here
        this.props.deleteElement(id, type,parentUrn,asideData);
    }

    renderElement = (element = {}) => {
        let editor = '';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo } = this.props;
        let labelText = fetchElementTag(element, index);
        switch(element.type) {
            case elementTypeConstant.ASSESSMENT_SLATE:
                editor =<AssessmentSlateCanvas model={element} elementId={element.id} handleBlur = {this.handleBlur} handleFocus={this.handleFocus}/>
                labelText = 'AS'
                break;
            case elementTypeConstant.OPENER:
                const { activeColorIndex } = this.state
                editor = <OpenerElement backgroundColor={config.colors[activeColorIndex]} index={index} handleFocus={this.handleFocus} handleBlur = {this.handleBlur} elementId={element.id} element={element} /* model={element.html} */ slateLockInfo={slateLockInfo} />
                labelText = 'OE'
                break;

            case elementTypeConstant.AUTHORED_TEXT:
                editor = <ElementAuthoring  openAssetPopoverPopUp = {this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                break;

            case elementTypeConstant.BLOCKFEATURE:
                editor = <ElementAuthoring openAssetPopoverPopUp = {this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                break;

            case elementTypeConstant.FIGURE:
                switch (element.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        editor = <ElementFigure currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Fg';
                        break;
                    case elementTypeConstant.FIGURE_TABLE:
                        editor = <ElementFigure currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Tb';
                        break;
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                        editor = <ElementFigure currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}   handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Eq';
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        editor = <ElementFigure currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'MML';
                        break;
                    case elementTypeConstant.FIGURE_CODELISTING:
                        editor = <ElementFigure currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'BCE';
                        break;
                    case elementTypeConstant.FIGURE_AUDIO:
                        editor = <ElementAudioVideo currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'AUD';
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        editor = <ElementAudioVideo currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'VID';
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        editor = <ElementSingleAssessment currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations}  handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo}/>;
                        labelText = 'Qu';
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        switch (element.figuredata.interactiveformat) {
                            case elementTypeConstant.INTERACTIVE_MMI:
                                editor = <ElementInteractive currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                break;
                            case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                editor = <ElementInteractive currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlurAside}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = 'SL';
                                break;
                            case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                editor = <ElementInteractive currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations}  openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlurAside}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = 'Pop';
                                break;
                        }
                }
                break;

            case elementTypeConstant.ELEMENT_LIST:
                editor = <ListElement openAssetPopoverPopUp = {this.openAssetPopoverPopUp} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                labelText = 'OL'
                break;

            case elementTypeConstant.ELEMENT_ASIDE:
                switch (element.subtype) {
                    case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                        editor = <ElementAsideContainer   showDeleteElemPopup = {this.showDeleteElemPopup} showBlocker={this.props.showBlocker}  setActiveElement = {this.props.setActiveElement} handleBlur = {this.handleBlur} handleFocus={this.handleFocus}  btnClassName = {this.state.btnClassName} borderToggle = {this.state.borderToggle} elemBorderToggle = {this.props.elemBorderToggle} elementSepratorProps = {elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                        labelText = 'WE';
                        break;
                    default:
                        editor = <ElementAsideContainer   showDeleteElemPopup = {this.showDeleteElemPopup} showBlocker={this.props.showBlocker}setActiveElement = {this.props.setActiveElement} handleBlur = {this.handleBlur} handleFocus={this.handleFocus} btnClassName = {this.state.btnClassName} borderToggle = {this.state.borderToggle} elemBorderToggle = {this.props.elemBorderToggle} elementSepratorProps = {elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                        labelText = 'AS';
                }
                break;
                
            case elementTypeConstant.METADATA_ANCHOR:
                editor = <ElementMetaDataAnchor  openAssetPopoverPopUp = {this.openAssetPopoverPopUp} showBlocker = {this.props.showBlocker} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                labelText = 'LO'
                break;
                
            case elementTypeConstant.METADATA_ANCHOR_LO_LIST:
                editor = <ElementMetaLOList  openAssetPopoverPopUp = {this.openAssetPopoverPopUp} showBlocker = {this.props.showBlocker} currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.learningObjectiveOperations} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                labelText = 'MA'
                break;
        }

        return(
            <div className = "editor" data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'active'?    <div>
                <Button type="element-label" btnClassName = {this.state.btnClassName} labelText={labelText} />
                { config.slateType !=='assessment'? ( config.PERMISSIONS.includes('elements_add_remove') && <Button type="delete-element"  onClick={() => this.showDeleteElemPopup(true)} /> )
                : null }
                {this.renderColorPaletteButton(element)}
            </div>
            : ''}
            <div className={`element-container ${this.state.borderToggle}`} data-id={element.id}>
                {editor}
            </div>
            {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'active'?<div>
                {config.PERMISSIONS.includes('notes_adding') && <Button type="add-comment" btnClassName = {this.state.btnClassName} onClick={() => this.handleCommentPopup(true)} />}
                {config.PERMISSIONS.includes('note_viewer') && element.comments && <Button elementId={element.id} onClick = {handleCommentspanel} type="comment-flag" />} 
                {element.tcm && <Button type="tcm" />}
                </div> :''}
            { this.state.popup && <PopUp 
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
                            ({ isPageNumberEnabled }) => this.props.children(this.state.isHovered, isPageNumberEnabled, this.props.activeElement)
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
            showDeleteElemPopup : false
        });
        this.props.showBlocker(false);
        hideBlocker();
    }

    // handleCommentPopup(popup){
    //     this.setState({
    //         popup
    //     });
    // }


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
        
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        this.props.addComment(comment, id);
        this.handleCommentPopup(false);
    }
    openGlossaryFootnotePopUp = (glossaaryFootnote, popUpStatus) => {
        this.props.glossaaryFootnotePopup(glossaaryFootnote, popUpStatus);
    }
    openAssetPopoverPopUp = (toggleApoPopup) => {
        authorAssetPopOver(toggleApoPopup)
        // this.props.assetPopoverPopup(toggleApoPopup)
    }

    render = () => {
        const { element } = this.props;
        return this.renderElement(element);
    }
    handleOnMouseOver = () => {
        this.setState({ isHovered: true })
    }
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
    elemBorderToggle : PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments, elementId) => {
            dispatch(addComment(comments, elementId))
        },
        fetchCommentByElement:(elementId)=>{
          dispatch(fetchCommentByElement(elementId))
        },
        setActiveElement: (element, index) => {
            dispatch(setActiveElement(element, index))
        },
        deleteElement: (id , type,parentUrn,asideData)=>{
            dispatch(deleteElement(id, type,parentUrn,asideData))
        },
        glossaaryFootnotePopup:(glossaaryFootnote,popUpStatus)=>{
            dispatch(glossaaryFootnotePopup(glossaaryFootnote,popUpStatus))
        }
    }
}

const mapStateToProps = (state) => {

    return {
        elemBorderToggle: state.toolbarReducer.elemBorderToggle,
        activeElement: state.appStore.activeElement,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        currentSlateLOData: state.metadataReducer.currentSlateLOData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
