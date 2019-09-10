import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import './../../styles/ElementContainer/ElementContainer.css';
import {toggleCommentsPanel,fetchComments} from '../CommentsPanel/CommentsPanel_Action'

class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false
        };
    }
    componentDidMount(){
    }
    renderElement = (element = {}) => {
        let editor = '';
        let { elementType, labelText, index,handleCommentspanel} = this.props;
        switch(element.type) {
            case 'opener':
                editor = <OpenerElement index={index} elementId={element.id} type={element.type} model={element.html} />
                labelText = 'OE'
                break

            case "element-authoredtext":
                editor = <ElementAuthoring index={index} elementId={element.id} type={elementType} model={element.html} />;
                break;

            case "element-blockfeature":
                editor = <ElementAuthoring index={index} elementId={element.id} type={element.type} model={element.html} />;
                labelText = 'BQ';
                break;

            case "figure":

                switch (element.figuretype) {
                    case "image":
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Fg';
                        break;
                    case "table":
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Tb';
                        break;
                    case "mathImage":
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'Eq';
                        break;
                    case "authoredtext":
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'MML';
                        break;
                    case "codelisting":
                        editor = <ElementFigure model={element} index={index}/>;
                        labelText = 'BCE';
                        break;
                    case "audio":
                        editor = <ElementAudioVideo model={element} index={index}/>;
                        labelText = 'AUD';
                        break;
                    case "video":
                        editor = <ElementAudioVideo model={element} index={index}/>;
                        labelText = 'VID';
                        break;
                        case "assessment":
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
                 <Button  elementId = {element.id} onClick = {handleCommentspanel} type="comment-flag" /> 
                {element.tcm && <Button type="tcm" />}
                {/* <Button type="comment-flag" />
                    <Button type="tcm" /> */}
            </div>
                { this.state.popup && <PopUp togglePopup={e => this.handleCommentPopup(e, this)} active={this.state.popup} />}
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
handleCommentPanel(){
    this.props.dispatch(toggleCommentsPanel(true));
}
render = () => {
    console.log("element container")
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

export default ElementContainer