import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import {addComment} from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import {fetchCommentByElement} from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import {COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS} from './../../constants/Element_Constants';
class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment:"",
            borderToggle : 'showBorder',
            btnClassName : ''
        };
        
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    componentWillReceiveProps(nextProps){
        if(nextProps.elemBorderToggle !== this.props.elemBorderToggle){
            if(nextProps.elemBorderToggle ==true){
                this.setState({
                    borderToggle: 'showBorder',
                    btnClassName : ''
                })
            }else{
                this.setState({
                    borderToggle: 'hideBorder',
                    btnClassName : ''
                })
            }
        }
    }

    handleFocus = () => {
        this.setState({
            borderToggle : 'active',
            btnClassName : 'activeTagBgColor'
        })
        this.props.fetchCommentByElement(this.props.element.id);
    }

    handleBlur = () => {
        if(this.props.elemBorderToggle){
            this.setState({
                borderToggle : 'showBorder',
                btnClassName : ''
            })
        }else{
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
        if(element.type === "opener"){
            return <Button type="color-palette" />  
        }
        else{
            return null
        }
    }

    renderElement = (element = {}) => {
        let editor = '';
        let { labelText, index, handleCommentspanel} = this.props;
        switch(element.type) {
            case elementTypeConstant.OPENER:
                editor = <OpenerElement index={index} elementId={element.id} type={element.type} model={element.html} />
                labelText = 'OE'
                break

            case elementTypeConstant.AUTHORED_TEXT:
                editor = <ElementAuthoring handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} />;
                break;

            case elementTypeConstant.BLOCKFEATURE:
                editor = <ElementAuthoring handleFocus={this.handleFocus} handleBlur = {this.handleBlur} index={index} elementId={element.id}  element={element} model={element.html} />;
                break;

            case elementTypeConstant.FIGURE:

                switch (element.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'Fg';
                        break;
                    case elementTypeConstant.FIGURE_TABLE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'Tb';
                        break;
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'Eq';
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'MML';
                        break;
                    case elementTypeConstant.FIGURE_CODELISTING:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'BCE';
                        break;
                    case elementTypeConstant.FIGURE_AUDIO:
                        editor = <ElementAudioVideo handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'AUD';
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        editor = <ElementAudioVideo handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index}/>;
                        labelText = 'VID';
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        editor = <ElementSingleAssessment handleFocus={this.handleFocus} handleBlur = {this.handleBlur} model={element} index={index} elementId={element.id}/>;
                        labelText = 'QU';
                        break;
                }
                break;
        }
        
        return(
            <div className = "editor" >
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'active'?    <div>
                <Button type="element-label" btnClassName = {this.state.btnClassName} labelText={labelText} />
                <Button type="delete-element" />
                {this.renderColorPaletteButton(element)}
            </div>
            : ''}
            <div className={`element-container ${this.state.borderToggle}`} data-id={element.id}>
                {editor}
            </div>
            {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'element-container active'?<div>
                <Button type="add-comment" onClick={() => this.handleCommentPopup(true)} />
                {element.comments && <Button elementId={element.id} onClick = {handleCommentspanel} type="comment-flag" />} 
                {element.tcm && <Button type="tcm" />}
                </div> :''}
            { this.state.popup && <PopUp 
                togglePopup={e => this.handleCommentPopup(e, this)} 
                active={this.state.popup} 
                handleChange={this.handleCommentChange}
                saveContent={this.saveNewComment}
                rows={COMMENTS_POPUP_ROWS}
                dialogText={COMMENTS_POPUP_DIALOG_TEXT}
                />}
            </div >
        );
    }

    /**
     * @description - This function is for handling the closing and opening of popup.
     * @param {event} popup
     */
    handleCommentPopup(popup){
        this.setState({
            popup
        });
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
    handleCommentChange=(newComment)=>{
        this.setState({
            comment:newComment
        })
    }

    /**
     * @description - This function is for ADD COMMENT API.
     */
    saveNewComment=()=>{
        const {comment}=this.state;  
        const {id}=this.props.element;
        this.props.addComment(comment,id);
        this.handleCommentPopup(false);
    }

    render = () => {
        const { element } = this.props;
        return this.renderElement(element);
    }
}

ElementContainer.defaultProps = {
    element: {},
    elementType: 'heading-4',
    labelText: 'P'
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element: PropTypes.object,
    elementType: PropTypes.string,
    labelText: PropTypes.string,
    elemBorderToggle : PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments,elementId) => {
            dispatch(addComment(comments,elementId))
        },
        fetchCommentByElement:(elementId)=>{
          dispatch(fetchCommentByElement(elementId))
        }
      
      
}
}


const mapStateToProps = (state) => {
    
    return {
        elemBorderToggle: state.toolbarReducer.elemBorderToggle
    }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(ElementContainer);
