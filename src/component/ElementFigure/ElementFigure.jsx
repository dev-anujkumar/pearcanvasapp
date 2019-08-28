// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "../tinyMceEditor"

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';


/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class ElementFigure extends Component {
    constructor(props) {
        super(props);
    }
    /**
 * @description - This function is for changing the container border colour on focus.
 * @param getFocus boolean type parameter indicating element in focus
 */

 /**
     * @description - This function is for handling the different types of figure-element.
     * @param element object that defined the type of element
     */
    renderFigureType = (element = {}) => {
        var figureJsx;
        switch (element.figuretype) {
            case 'image':
            case 'table':
            case 'mathImage':
                var divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
                switch (true) {
                    case (element.figuretype === "image" && element.figureAlignment === 'half-text'):
                        divClass = 'divImage50Text',
                            figureClass = 'figureImage50Text',
                            figLabelClass = 'heading4Image50TextNumberLabel',
                            figTitleClass = 'heading4Image50TextTitle',
                            dataType = 'image',
                            imageDimension = 'image50Text',
                            figCaptionClass = 'figcaptionImage50Text',
                            figCreditClass = 'paragraphImage50TextCredit';
                        break;
                    case (element.figuretype === "table" && element.figureAlignment === 'half-text'):
                        divClass = 'divImage50TextTableImage',
                            figureClass = 'figureImage50TextTableImage',
                            figLabelClass = 'heading4Image50TextTableImageNumberLabel',
                            figTitleClass = 'heading4Image50TextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'image50TextTableImage',
                            figCaptionClass = 'figcaptionImage50TextTableImage',
                            figCreditClass = 'paragraphImage50TextTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && element.figureAlignment === 'half-text'):
                        divClass = 'divImage50TextMathImage',
                            figureClass = 'figureImage50TextMathImage',
                            figLabelClass = 'heading4Image50TextMathImageNumberLabel',
                            figTitleClass = 'heading4Image50TextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'image50TextMathImage',
                            figCaptionClass = 'figcaptionImage50TextMathImage',
                            figCreditClass = 'paragraphImage50TextMathImageCredit';
                        break;
                    case (element.figuretype === "image" && element.figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidth',
                            figureClass = 'figureImageTextWidth',
                            figLabelClass = 'heading4ImageTextWidthNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTitle',
                            dataType = 'image',
                            imageDimension = 'imageTextWidth',
                            figCaptionClass = 'figcaptionImageTextWidth',
                            figCreditClass = 'paragraphImageTextWidthCredit';
                        break;
                    case (element.figuretype === "table" && element.figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidthTableImage',
                            figureClass = 'figureImageTextWidthTableImage',
                            figLabelClass = 'heading4ImageTextWidthTableImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageTextWidthTableImage',
                            figCaptionClass = 'figcaptionImageTextWidthTableImage',
                            figCreditClass = 'paragraphImageTextWidthTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && element.figureAlignment === 'text-width'):
                        divClass = 'divImageTextWidthMathImage',
                            figureClass = 'figureImageTextWidthMathImage',
                            figLabelClass = 'heading4ImageTextWidthMathImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageTextWidthMathImage',
                            figCaptionClass = 'figcaptionImageTextWidthMathImage',
                            figCreditClass = 'paragraphImageTextWidthMathImageCredit';
                        break;

                    case (element.figuretype === 'image' && element.figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanText',
                            figureClass = 'figureImageWiderThanText',
                            figLabelClass = 'heading4ImageWiderThanTextNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTitle',
                            dataType = 'image',
                            imageDimension = 'imageWiderThanText',
                            figCaptionClass = 'figcaptionImageWiderThanText',
                            figCreditClass = 'paragraphImageWiderThanTextCredit';
                        break;
                    case (element.figuretype === "table" && element.figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanTextTableImage',
                            figureClass = 'figureImageWiderThanTextTableImage',
                            figLabelClass = 'heading4ImageWiderThanTextTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageWiderThanTextTableImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextTableImage',
                            figCreditClass = 'paragraphImageWiderThanTextTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && element.figureAlignment === 'wider'):
                        divClass = 'divImageWiderThanTextMathImage',
                            figureClass = 'figureImageWiderThanTextMathImage',
                            figLabelClass = 'heading4ImageWiderThanTextMathImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageWiderThanTextMathImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextMathImage',
                            figCreditClass = 'paragraphImageWiderThanTextMathImageCredit';
                        break;
                    case (element.figuretype === "image" && element.figureAlignment === 'full'):
                        divClass = 'divImageFullscreenImage',
                            figureClass = 'figureImageFullscreen',
                            figLabelClass = 'heading4ImageFullscreenNumberLabel',
                            figTitleClass = 'heading4ImageFullscreenTitle',
                            dataType = 'image',
                            imageDimension = 'imageFullscreen',
                            figCaptionClass = 'figcaptionImageFullscreen',
                            figCreditClass = 'paragraphImageFullscreen';
                        break;
                    case (element.figuretype === "table" && element.figureAlignment === 'full'):
                        divClass = 'divImageFullscreenTableImage',
                            figureClass = 'figureImageFullscreenTableImage',
                            figLabelClass = 'heading4ImageFullscreenTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageFullscreenTableImage',
                            figCaptionClass = 'figcaptionImageFullscreenTableImage',
                            figCreditClass = 'paragraphImageFullscreenTableImageCredit';
                        break;
                    case (element.figuretype === "mathImage" && element.figureAlignment === 'full'):
                        divClass = 'divImageFullscreenMathImage',
                            figureClass = 'figureImageFullscreenMathImage',
                            figLabelClass = 'heading4ImageFullscreenMathImageNumberLabel',
                            figTitleClass = 'heading4ImageFullscreenMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageFullscreenMathImage',
                            figCaptionClass = 'figcaptionImageFullscreenMathImage',
                            figCreditClass = 'paragraphImageFullscreenMathImageCredit';
                        break;
                }
                figureJsx = <div className={divClass} resource="">
                    <figure className={figureClass} resource="">
                        <header>
                            <h4 className={figLabelClass + " figureLabel"} >
                                <div id="figure-label">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureLabel"
                                        placeholder="Enter Label..."
                                    />
                                </div>
                            </h4>
                            <h4 className={figTitleClass + " figureTitle"}>
                                <div id="figure-title">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureTitle"
                                        placeholder="Enter Title..."
                                    />
                                </div>
                            </h4>
                        </header>
                        <div className="pearson-component image figureData" data-type={dataType} >
                              <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                                data-src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />
                        </div>
                        <figcaption className={figCaptionClass + " figureCaption"} >
                            <div id="figure-caption" >
                                <TinyMceEditor
                                    onFocus={this.onFocus}
                                    className="figureCaption"
                                    placeholder="Enter Caption..."
                                />
                            </div>
                        </figcaption>
                    </figure>
                    <div id="figure-credit">
                        <p className={figCreditClass + " figureCredit"}>
                            <TinyMceEditor
                                onFocus={this.onFocus}
                                className="figureCredit"
                                placeholder="Enter Credit..."
                            />
                        </p>
                    </div>
                </div>
                break;
            case 'authoredtext':
                figureJsx = <div className="divTextFigure">
                    <figure className="figureText" resource="">
                        <header>
                            <h4 className="heading4TextNumberLabel figureLabel" >
                                <div id="figure-label">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureLabel"
                                        placeholder="Enter Label..."
                                    />
                                </div>
                            </h4>
                            <h4 className="heading4TextTitle figureTitle" >
                                <div id="figure-title">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureTitle"
                                        placeholder="Enter Title..."
                                    />
                                </div>
                            </h4>
                        </header>
                        <p className="paragraphNumeroUno mathml figureData" data-type="mathml">
                            <p className={`paragraphNumeroUno ${this.props.element.figuretype} figureData `}>
                                <div data-type="mathml">
                                    <TinyMceEditor
                                        placeholder="Type something..."
                                    />
                                </div>
                            </p>
                        </p>
                        <figcaption className="figcaptionText figureCaption" >
                            <div id="figure-caption" >
                                <TinyMceEditor
                                    onFocus={this.onFocus}
                                    className="figureCaption"
                                    placeholder="Enter Caption..."
                                />
                            </div>
                        </figcaption>
                    </figure>
                    <div id="figure-credit">
                        <p className="paragraphTextCredit figureCredit">
                            <TinyMceEditor
                                onFocus={this.onFocus}
                                className="figureCredit"
                                placeholder="Enter Credit..."
                            />
                        </p>
                    </div>
                </div>
                break;
            case 'codelisting':
                figureJsx = <div className="divCodeSnippetFigure" id="blockCodeFigure" >
                    <figure className="figureCodeSnippet" >
                        <header>
                            <h4 className="heading4CodeSnippetNumberLabel" >
                                <div id="figure-label">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureLabel"
                                        placeholder="Enter Label..."
                                    />
                                </div>
                            </h4>
                            <h4 className="heading4CodeSnippetTitle" >
                                <div id="figure-title">
                                    <TinyMceEditor
                                        onFocus={this.onFocus}
                                        className="figureTitle"
                                        placeholder="Enter Title..."
                                    />
                                </div>
                            </h4>
                        </header>
                        <div className="pearson-component blockcode codeSnippet" data-type="codeSnippet" >
                            <pre className="code-listing" >
                                <code id="codeListing">
                                    <TinyMceEditor
                                        placeholder="Enter Block Code..."
                                    />
                                </code>
                            </pre>
                        </div>
                        <figcaption className="figcaptionCodeSnippet" >
                            <div id="figure-caption" >
                                <TinyMceEditor
                                    onFocus={this.onFocus}
                                    className="figureCaption"
                                    placeholder="Enter Caption..."
                                />
                            </div>
                        </figcaption>
                    </figure>
                    <div id="figure-credit">
                        <p className="paragraphCodeSnippetCredit">
                            <TinyMceEditor
                                onFocus={this.onFocus}
                                className="figureCredit"
                                placeholder="Enter Credit..."
                            />
                        </p>
                    </div>
                </div>
                break;
        }
        return figureJsx;
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
                        <div className="figureElement">
                            {this.renderFigureType(element)}
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

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func
}