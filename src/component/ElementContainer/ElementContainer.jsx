import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import ElementInteractive from '../ElementInteractive';
import ElementAsideContainer from '../ElementAsideContainer';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import {glossaaryFootnotePopup} from './../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import {addComment,deleteElement} from './ElementContainer_Actions';
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
import { PageNumberContext } from '../CanvasWrapper/CanvasContexts.js';

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
            isHovered: false
        };
        
    }
    componentDidMount(){
        

        if( this.props.index == 0 ){
            this.setState({
                borderToggle : 'active',
                btnClassName : 'activeTagBgColor'
              
            })
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
        this.props.setActiveElement(this.props.element);
        this.props.fetchCommentByElement(this.props.element.id);
    }

    handleBlur =() =>{
  
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
    /**
     * Renders color-palette button for opener element 
     * @param {e} event
     */
    renderColorPaletteButton = (element) => {
        if (element.type === "opener") {
            return <Button type="color-palette" />
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
        this.handleCommentPopup(false);
        sendDataToIframe({'type': ShowLoader,'message': { status: true }});
        // api needs to run from here
        this.props.deleteElement(id, type);
    }

    renderElement = (element = {}) => {
        let editor = '';
        let labelText = fetchElementTag(element) || 'P';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo } = this.props;
        switch(element.type) {
            case elementTypeConstant.OPENER:
                editor = <OpenerElement index={index} elementId={element.id} type={element.type} model={element.html} slateLockInfo={slateLockInfo} />
                labelText = 'OE'
                break
            case elementTypeConstant.AUTHORED_TEXT:
                editor = <ElementAuthoring openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                break;

            case elementTypeConstant.BLOCKFEATURE:
                editor = <ElementAuthoring openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                break;
            case elementTypeConstant.FIGURE:

                switch (element.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        editor = <ElementFigure openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Fg';
                        break;
                    case elementTypeConstant.FIGURE_TABLE:
                        editor = <ElementFigure openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Tb';
                        break;
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                        editor = <ElementFigure openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}   handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'Eq';
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        editor = <ElementFigure openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'MML';
                        break;
                    case elementTypeConstant.FIGURE_CODELISTING:
                        editor = <ElementFigure openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'BCE';
                        break;
                    case elementTypeConstant.FIGURE_AUDIO:
                        editor = <ElementAudioVideo openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'AUD';
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        editor = <ElementAudioVideo openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} />;
                        labelText = 'VID';
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        editor = <ElementSingleAssessment  handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo}/>;
                        labelText = 'Qu';
                        break;

                    case elementTypeConstant.INTERACTIVE:

                        switch (element.figuredata.interactiveformat) {
                            case elementTypeConstant.INTERACTIVE_MMI:
                                editor = <ElementInteractive openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlur}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                break;
                            case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                editor = <ElementInteractive openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlurAside}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = 'SL';
                                break;
                            case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                editor = <ElementInteractive openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}  handleFocus={this.handleFocus} handleBlur={this.handleBlurAside}  index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} />;
                                labelText = 'Pop';
                                break;
                                
                        }

                }
                break;

            case elementTypeConstant.ELEMENT_LIST:
                editor = <ListElement openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                labelText = 'OL'
                break;
            case elementTypeConstant.ELEMENT_ASIDE:
                switch (element.subtype) {

                    case elementTypeConstant.ELEMENT_WORKEDEXAMPLE:
                        editor = <ElementAsideContainer   setActiveElement = {this.props.setActiveElement} handleBlur = {this.handleBlur} handleFocus={this.handleFocus}  btnClassName = {this.state.btnClassName} borderToggle = {this.state.borderToggle} elemBorderToggle = {this.props.elemBorderToggle} elementSepratorProps = {elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                        labelText = 'WE';
                        break;
                    default:
                        editor = <ElementAsideContainer setActiveElement = {this.props.setActiveElement} handleBlur = {this.handleBlur} handleFocus={this.handleFocus} btnClassName = {this.state.btnClassName} borderToggle = {this.state.borderToggle} elemBorderToggle = {this.props.elemBorderToggle} elementSepratorProps = {elementSepratorProps} index={index} element={element} elementId={element.id} type={element.type} slateLockInfo={slateLockInfo} />;
                        labelText = 'AS';
                }
        }
        return(
            <div className = "editor" data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut}>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'active'?    <div>
                <Button type="element-label" btnClassName = {this.state.btnClassName} labelText={labelText} />
                { config.PERMISSIONS.includes('elements_add_remove') && <Button type="delete-element"  onClick={() => this.showDeleteElemPopup(true)} /> }
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
                showDeleteElemPopup = {this.state.showDeleteElemPopup}
                deleteElement = {this.deleteElement}
                
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
import { format } from 'url';

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
        setActiveElement: (element) => {
            dispatch(setActiveElement(element))
        },
        deleteElement: (id , type)=>{
            dispatch(deleteElement(id, type))
        },
        setActiveElement:(element) => {
            dispatch(setActiveElement(element))
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
        slateLockInfo: state.slateLockReducer.slateLockInfo
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
