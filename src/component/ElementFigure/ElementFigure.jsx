// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "./../tinyMceEditor"

// IMPORT - Assets //
// import './../../styles/ElementFigure/Book.css';
import './../../styles/ElementFigure/ElementFigure.css';

/**
* @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .
*/
export class ElementFigure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFocus: false
        }
    }
    onClick = () => {

    }
    onBlur = () => {

    }
    onKeyup = () => {

    }
    /**
 * @description - This function is for changing the container border colour on focus.
 * @param getFocus boolean type parameter indicating element in focus
 */

    onFocus = (getFocus) => {
        if (getFocus === true) {
            this.setState({
                currentFocus: true
            })
        }
    }
    /**
     * @description - This function is for handling the different types of figure-element.
     * @param element object that defined the type of element
     */

    renderFigureType = (element = {}) => {
        let figureType = '';
        switch (element.figuretype) {
            case 'image':


                figureType = <div class="pearson-component image figureData" id="figureELE" data-type="figureImage">
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        data-src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        title=""
                        alt=""
                        class={`imgg ${this.props.element.subtype}`}
                        draggable="false" />
                </div>

                break;
            case 'table':

                figureType = <div class="pearson-component image figureData" data-type="tableImage">
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        data-src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        title=""
                        alt=""
                        class={`imgg ${this.props.element.subtype}`}
                        draggable="false" />
                </div>

                break;
            case 'mathImage':


                figureType = <div class="pearson-component image figureData" data-type="mathImage">
                    <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        data-src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                        title=""
                        alt=""
                        class={`imgg ${this.props.element.subtype}`}
                        draggable="false" />
                </div>

                break;
            case 'mathml':


                figureType = <p class={`paragraphNumeroUno ${this.props.element.figuretype} figureData `}><div data-type="mathml">
                    <TinyMceEditor
                        class={this.props.element.class}
                        
                    />
                </div>
                </p>


                break;
            case 'blockcode':

                figureType = <div class={`pearson-component ${this.props.element.figuretype} codeSnippet`} data-type="codeSnippet">
                    <TinyMceEditor
                        class={this.props.element.class}
                        
                    />
                </div>
                break;
        }
        return figureType;
    }


    render() {
        const { element } = this.props;
        return (

            <div className="wrapper">
                <div className="header" id="tinymceToolbar">
                    <h1 >Canvas</h1>
                </div>
                <div className="container">
                    <div className="element-container" >
                        <div className="left-buttons">
                        </div>


                        <div className={` ${this.props.element.divClass} editor-container`} id={this.currentFocus ? "on-focus" : "not-focus"}>
                            <figure class={`${this.props.element.figureClass}`}>
                                <h4 class={` ${this.props.element.header.labelClass} figureLabel`}>
                                <div id="figure-label">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        format="p"
                                        class={this.props.element.header.labelClass}
                                        className="figureLabel"
                                        // placeHolderText={this.props.element.header.labelPlaceHolderText}
                                    />
                                </div>
                                </h4>
                                <h4 class={` ${this.props.element.header.titleClass} figureTitle`} >
                                <div id="figure-title">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        format="p"
                                        class={this.props.element.titleClass}
                                        className="figureTitle"
                                        // placeHolderText={this.props.element.header.titlePlaceHolderText}
                                    />
                                </div>
                                </h4>
                                <div className="figureElement">
                                    {this.renderFigureType(element)}
                                </div>

                                <figcaption class={` ${this.props.element.footer.captionClass} figureCaption`}>
                                <div id="figure-caption" >
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        format="p"
                                        class={this.props.element.captionClass}
                                        className="figureCaption"
                                        // placeHolderText={this.props.element.footer.captionPlaceHolderText}
                                    />
                                </div>
                                </figcaption >
                                </figure>
                                <p class={` ${this.props.element.footer.creditClass} figureCredit`}>
                                <div id="figure-credit">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        format="p"
                                        class={this.props.element.creditClass}
                                        className="figureCredit"
                                        // placeHolderText={this.props.element.footer.creditPlaceHolderText}
                                    />
                                </div>
                                </p>
                           
                        </div>


                        <div className="right-buttons">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


ElementFigure.defaultProps = {
    /** Detail of element in JSON object */
    element: PropTypes.object,

}

ElementFigure.propTypes = {
    /** Type of element to be rendered */
    type: PropTypes.string.isRequired,
    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func
}