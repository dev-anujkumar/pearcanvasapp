// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "../tinyMceEditor"

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
import {
    FIGURE,
    IMAGE,
    TABLE,
    MATH_IMAGE,
    AUTHORED_TEXT,
    MATHML,
    CODELISTING,
    HALF_TEXT,
    TEXT_WIDTH,
    WIDER,
    FULL,
    DEFAULT_IMAGE_DATA_SOURCE,
    DEFAULT_IMAGE_SOURCE
} from '../../constants/Element_Constants';
import figureSubTypeList from './FigureSubTypes.js';
//import './../../styles/ElementFigure/Book.css';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class FigureComponent extends Component {
    constructor(props) {
        super(props);
    }

    onKeyup = () => {
        console.log("onKeyup")
    }
    onClick = () => {
        console.log("onClick")
    }
    /*** @description - This function is for handling the different types of figure-element.
     * @param model object that defined the type of element*/

    renderFigureType = (subtype, index) => {
        var figureDiv = "";
        switch (subtype) {
            case IMAGE:
            case TABLE:
            case MATH_IMAGE:
                figureDiv = <div className="pearson-component image figureData" data-type={dataType} >
                    <img src={model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_SOURCE}
                        data-src={model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_DATA_SOURCE}
                        title=""
                        alt=""
                        className={imageDimension + ' lazyload'}
                        draggable="false" />
                </div>
                break;
            case MATHML:
                figureDiv = <div data-type="mathml">

                    <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`} placeholder="Type Something..." tagName={'p'} className="paragraphNumeroUno mathml figureData mathmlDiv" model={model.html.postertext} type={type} onKeyup={this.onKeyup} onClick={this.onClick} />

                </div>

                break;
            case CODELISTING:
                figureDiv = <div className="pearson-component blockcode codeSnippet blockCodeDiv" data-type="codeSnippet" >
                    <pre className="code-listing" >
                        <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`} placeholder="Enter block code..." tagName={'code'} className="" model={model.figuredata.preformattedtext} onKeyup={this.onKeyup} onClick={this.onClick} />
                    </pre>
                </div>
                break;
        }
        return figureDiv;
    }


    render() {
        const { subtype, index } = this.props;
        return (
            <div className="figureElement">
                <div className={divClass} resource="">
                    <figure className={figureClass} resource="">
                        <header className="figure-header">

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} onKeyup={this.onKeyup} onClick={this.onClick} />

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} onKeyup={this.onKeyup} onClick={this.onClick} />

                        </header>
                        {this.renderFigureType(subtype, index)}
                        <figcaption >
                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} onKeyup={this.onKeyup} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} onKeyup={this.onKeyup} onClick={this.onClick} />
                    </div>

                </div>
            </div>
        );
    }
}

FigureComponent.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

FigureComponent.propTypes = {
    /** Handler to return the type of element based on the figuretype and alignment */
    renderFigureType: PropTypes.func,
    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func
}