import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import {addComment} from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import {toggleCommentsPanel,fetchComments} from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment:""
        };
    }
    componentDidMount(){
    }
    renderElement = (element = {}) => {
        let editor = '';
        let { elementType, labelText, index,handleCommentspanel} = this.props;
        switch(element.type) {
            case elementTypeConstant.OPENER:
                editor = <OpenerElement index={index} elementId={element.id} type={element.type} model={element.html} />
                labelText = 'OE'
                break

            case elementTypeConstant.AUTHORED_TEXT:
                editor = <ElementAuthoring index={index} elementId={element.id} type={elementType} model={element.html} />;
                break;

            case elementTypeConstant.BLOCKFEATURE:
                editor = <ElementAuthoring index={index} elementId={element.id} type={element.type} model={element.html} />;
                labelText = 'BQ';
                break;

            case elementTypeConstant.FIGURE:

                switch (element.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Fg';
                        break;
                    case elementTypeConstant.FIGURE_TABLE:
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Tb';
                        break;
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Eq';
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'MML';
                        break;
                    case elementTypeConstant.FIGURE_CODELISTING:
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'BCE';
                        break;
                    case elementTypeConstant.FIGURE_AUDIO:
                        editor = <ElementAudioVideo model={element} index={index}/>;
                        labelText = 'AUD';
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                        editor = <ElementAudioVideo model={element} index={index}/>;
                        labelText = 'VID';
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        editor = <ElementSingleAssessment model={element} index={index} elementId={element.id}/>;
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
            if(element.type === "opener"){
                return <Button type="color-palette" />  
            }
            else{
                return null
            }
        }
        
    return(
            <div className = "editor" >
            <div>
                <Button type="element-label" labelText={labelText} />
                <Button type="delete-element" />
                {renderColorPaletteButton()}
            </div>
            <div className="element-container" data-id={element.id}>
                {editor}
            </div>
            <div>
                <Button type="add-comment" onClick={() => this.handleCommentPopup(true)} />
                {this.props.element.comments?<Button  elementId = {element.id} onClick = {this.handleCommentpanel} type="comment-flag" />:null }
                {element.tcm && <Button type="tcm" />}
                {/* <Button type="comment-flag" />
                    <Button type="tcm" /> */}
            </div>
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
    labelText: PropTypes.string
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments,elementId) => {
            dispatch(addComment(comments,elementId))
        },
      
      
}
}

export default connect(null, mapDispatchToProps)(ElementContainer)