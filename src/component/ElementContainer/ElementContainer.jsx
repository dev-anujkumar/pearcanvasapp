import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure'
import ElementAsideContainer from './../ElementAsideContainer';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import {addComment} from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import { toggleCommentsPanel, fetchComments } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment:"",
            borderToggle : 'element-container showBorder'
        };
    }
    componentDidMount() {
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    componentWillReceiveProps(nextProps) {
        if (nextProps.elemBorderToggle !== this.props.elemBorderToggle) {
            if (nextProps.elemBorderToggle == true) {
                this.setState({
                    borderToggle: 'element-container showBorder'
                })
            } else {
                this.setState({
                    borderToggle: 'element-container hideBorder'
                })
            }
        }
    }

    handleFocus = () => {
        this.setState({
            borderToggle: 'element-container active'
        })
    }

    handleBlur = () => {
        if (this.props.elemBorderToggle) {
            this.setState({
                borderToggle: 'element-container showBorder'
            })
        } else {
            this.setState({
                borderToggle: 'element-container hideBorder'
            })
        }
    }
    renderElement = (element = {}) => {
        let editor = '';
        let { elementType, labelText, index, handleCommentspanel } = this.props;
        switch (element.type) {
            case elementTypeConstant.OPENER:
                editor = <OpenerElement index={index} elementId={element.id} type={element.type} model={element.html} />
                labelText = 'OE'
                break
            case elementTypeConstant.AUTHORED_TEXT:
                editor = <ElementAuthoring handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} type={elementType} model={element.html} />;
                break;

            case elementTypeConstant.BLOCKFEATURE:
                editor = <ElementAuthoring handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} type={element.type} model={element.html} />;
                labelText = 'BQ';
                break;
            case elementTypeConstant.ELEMENT_ASIDE:
                editor = <ElementAsideContainer index={index} element = {element} elementId={element.id} type={element.type} model={element.html} />;
                labelText = 'WE';
                break;
            case elementTypeConstant.FIGURE:

                switch (element.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'Fg';
                        break;
                    case elementTypeConstant.FIGURE_TABLE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'Tb';
                        break;
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'Eq';
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'MML';
                        break;
                    case elementTypeConstant.FIGURE_CODELISTING:
                        editor = <ElementFigure handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'BCE';
                        break;
                    case elementTypeConstant.FIGURE_AUDIO:
                        editor = <ElementAudioVideo handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'AUD';
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        editor = <ElementAudioVideo handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} />;
                        labelText = 'VID';
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        editor = <ElementSingleAssessment handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} />;
                        labelText = 'QU';
                        break;
                }
                break;
        }

        /**
         * Renders color-palette button for opener element 
         * @param {e} event
         */
        const renderColorPaletteButton = () => {
            if (element.type === "opener") {
                return <Button type="color-palette" />
            }
            else {
                return null
            }
        }
        
    return(
            <div className = "editor" >
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'element-container active'?    <div>
                <Button type="element-label" labelText={labelText} />
                <Button type="delete-element" />
                {renderColorPaletteButton()}
            </div>
            : ''}
            <div className={this.state.borderToggle} data-id={element.id}>
                {editor}
            </div>
            {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) ||  this.state.borderToggle == 'element-container active'?<div>
                <Button type="add-comment" onClick={() => this.handleCommentPopup(true)} />
                {this.props.element.comments?<Button  elementId = {element.id} onClick = {this.handleCommentpanel} type="comment-flag" />:null }
                {element.tcm && <Button type="tcm" />}
                {/* <Button type="comment-flag" />
                    <Button type="tcm" /> */}
            </div> :''}
            { this.state.popup && <PopUp 
                togglePopup={e => this.handleCommentPopup(e, this)} 
                active={this.state.popup} 
                handleChange={this.handleCommentChange}
                saveContent={this.saveNewComment}
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
/**
 * @description - This function is for handling the closing and opening of comments panel.
 */
handleCommentPanel(){
    this.props.dispatch(toggleCommentsPanel(true));
}

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
    elemBorderToggle: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments,elementId) => {
            dispatch(addComment(comments,elementId))
        },
}
}

const mapStateToProps = (state) => {
    
    return {
        elemBorderToggle: state.toolbarReducer.elemBorderToggle
    }
}
    
export default connect(mapStateToProps,mapDispatchToProps)(ElementContainer);
