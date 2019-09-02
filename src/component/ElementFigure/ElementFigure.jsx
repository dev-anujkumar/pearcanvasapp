// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "../tinyMceEditor"

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
//import './../../styles/ElementFigure/Book.css';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class ElementFigure extends Component {
    constructor(props) {
        super(props);
    }

    onFocus = () => {
        console.log("onFocus")
    }
    onKeyup = () => {
        console.log("onKeyup")
    }
    onBlur = () => {
        console.log("onBlur")
    }
    onClick = () => {
        console.log("onClick")
    }
    /*** @description - This function is for handling the different types of figure-element.
 * @param element object that defined the type of element*/

    renderFigureType = (model = {}) => {
        const { type } = this.props;

        var figureJsx;
        switch (model.figuretype) {
            case 'image':
            case 'table':
            case 'mathImage':
                var divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
                switch (true) {
                    case (model.figuretype === "image" && model.alignment === 'half-text'):
                        divClass = 'divImage50Text',
                            figureClass = 'figureImage50Text',
                            figLabelClass = 'heading4Image50TextNumberLabel',
                            figTitleClass = 'heading4Image50TextTitle',
                            dataType = 'image',
                            imageDimension = 'image50Text',
                            figCaptionClass = 'figcaptionImage50Text',
                            figCreditClass = 'paragraphImage50TextCredit';
                        break;
                    case (model.figuretype === "table" && model.alignment === 'half-text'):
                        divClass = 'divImage50TextTableImage',
                            figureClass = 'figureImage50TextTableImage',
                            figLabelClass = 'heading4Image50TextTableImageNumberLabel',
                            figTitleClass = 'heading4Image50TextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'image50TextTableImage',
                            figCaptionClass = 'figcaptionImage50TextTableImage',
                            figCreditClass = 'paragraphImage50TextTableImageCredit';
                        break;
                    case (model.figuretype === "mathImage" && model.alignment === 'half-text'):
                        divClass = 'divImage50TextMathImage',
                            figureClass = 'figureImage50TextMathImage',
                            figLabelClass = 'heading4Image50TextMathImageNumberLabel',
                            figTitleClass = 'heading4Image50TextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'image50TextMathImage',
                            figCaptionClass = 'figcaptionImage50TextMathImage',
                            figCreditClass = 'paragraphImage50TextMathImageCredit';
                        break;
                    case (model.figuretype === "image" && model.alignment === 'text-width'):
                        divClass = 'divImageTextWidth',
                            figureClass = 'figureImageTextWidth',
                            figLabelClass = 'heading4ImageTextWidthNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTitle',
                            dataType = 'image',
                            imageDimension = 'imageTextWidth',
                            figCaptionClass = 'figcaptionImageTextWidth',
                            figCreditClass = 'paragraphImageTextWidthCredit';
                        break;
                    case (model.figuretype === "table" && model.alignment === 'text-width'):
                        divClass = 'divImageTextWidthTableImage',
                            figureClass = 'figureImageTextWidthTableImage',
                            figLabelClass = 'heading4ImageTextWidthTableImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageTextWidthTableImage',
                            figCaptionClass = 'figcaptionImageTextWidthTableImage',
                            figCreditClass = 'paragraphImageTextWidthTableImageCredit';
                        break;
                    case (model.figuretype === "mathImage" && model.alignment === 'text-width'):
                        divClass = 'divImageTextWidthMathImage',
                            figureClass = 'figureImageTextWidthMathImage',
                            figLabelClass = 'heading4ImageTextWidthMathImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageTextWidthMathImage',
                            figCaptionClass = 'figcaptionImageTextWidthMathImage',
                            figCreditClass = 'paragraphImageTextWidthMathImageCredit';
                        break;

                    case (model.figuretype === 'image' && model.alignment === 'wider'):
                        divClass = 'divImageWiderThanText',
                            figureClass = 'figureImageWiderThanText',
                            figLabelClass = 'heading4ImageWiderThanTextNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTitle',
                            dataType = 'image',
                            imageDimension = 'imageWiderThanText',
                            figCaptionClass = 'figcaptionImageWiderThanText',
                            figCreditClass = 'paragraphImageWiderThanTextCredit';
                        break;
                    case (model.figuretype === "table" && model.alignment === 'wider'):
                        divClass = 'divImageWiderThanTextTableImage',
                            figureClass = 'figureImageWiderThanTextTableImage',
                            figLabelClass = 'heading4ImageWiderThanTextTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageWiderThanTextTableImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextTableImage',
                            figCreditClass = 'paragraphImageWiderThanTextTableImageCredit';
                        break;
                    case (model.figuretype === "mathImage" && model.alignment === 'wider'):
                        divClass = 'divImageWiderThanTextMathImage',
                            figureClass = 'figureImageWiderThanTextMathImage',
                            figLabelClass = 'heading4ImageWiderThanTextMathImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageWiderThanTextMathImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextMathImage',
                            figCreditClass = 'paragraphImageWiderThanTextMathImageCredit';
                        break;
                    case (model.figuretype === "image" && model.alignment === 'full'):
                        divClass = 'divImageFullscreenImage',
                            figureClass = 'figureImageFullscreen',
                            figLabelClass = 'heading4ImageFullscreenNumberLabel',
                            figTitleClass = 'heading4ImageFullscreenTitle',
                            dataType = 'image',
                            imageDimension = 'imageFullscreen',
                            figCaptionClass = 'figcaptionImageFullscreen',
                            figCreditClass = 'paragraphImageFullscreen';
                        break;
                    case (model.figuretype === "table" && model.alignment === 'full'):
                        divClass = 'divImageFullscreenTableImage',
                            figureClass = 'figureImageFullscreenTableImage',
                            figLabelClass = 'heading4ImageFullscreenTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageFullscreenTableImage',
                            figCaptionClass = 'figcaptionImageFullscreenTableImage',
                            figCreditClass = 'paragraphImageFullscreenTableImageCredit';
                        break;
                    case (model.figuretype === "mathImage" && model.alignment === 'full'):
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
                            <div>
                            <TinyMceEditor placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title}  type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                            <div>
                            <TinyMceEditor placeholder= "Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                        </header>
                        <div className="pearson-component image figureData" data-type={dataType} >
                            <img src="https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"
                                data-src={model.figuredata.path !== "" ? model.figuredata.path : "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png"}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />
                        </div>
                        <figcaption className={figCaptionClass + " figureCaption"} >
                            <TinyMceEditor placeholder= "Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div className={figCreditClass + " figureCredit"}>
                        <TinyMceEditor placeholder= "Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                    </div>

                </div>
                break;
            case 'authoredtext':
                    figLabelClass="heading4TextNumberLabel";figTitleClass="heading4TextTitle";figCaptionClass="figcaptionText";figCreditClass="paragraphTextCredit";
                figureJsx = <div className="divTextFigure">
                    <figure className="figureText" resource="">
                    <header>
                            <div>
                            <TinyMceEditor placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title}  onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                            <div>
                            <TinyMceEditor placeholder= "Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                        </header>
                        <p className="paragraphNumeroUno mathml figureData" data-type="mathml">
                            <p className={`paragraphNumeroUno ${model.figuretype} figureData `}>
                                <div id="mathmlDiv" data-type="mathml">
                                    <TinyMceEditor placeholder="Type Something..."  model={model.html.postertext} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                                </div>
                            </p>
                        </p>
                        <figcaption className="figcaptionText figureCaption" >
                        <TinyMceEditor placeholder= "Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div className={figCreditClass + " figureCredit"}>
                        <TinyMceEditor placeholder= "Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                    </div>

                </div>
                break;
            case 'codelisting':
                    figLabelClass="heading4CodeSnippetNumberLabel";figTitleClass="heading4CodeSnippetTitle";figCaptionClass="figcaptionCodeSnippet";figCreditClass="paragraphCodeSnippetCredit";
                figureJsx = <div className="divCodeSnippetFigure" id="blockCodeFigure" >
                    <figure className="figureCodeSnippet" >
                    <header>
                            <div>
                            <TinyMceEditor placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title}  onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                            <div>
                            <TinyMceEditor placeholder= "Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                            </div>
                        </header>
                        <div className="pearson-component blockcode codeSnippet" id="blockCodeDiv" data-type="codeSnippet" >
                            <pre className="code-listing" >
                                <code id="codeListing">
                                    <TinyMceEditor placeholder="Enter Block Code..."  model={model.html.postertext} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                                </code>
                            </pre>
                        </div>
                        <figcaption className="figcaptionCodeSnippet" >
                        <TinyMceEditor placeholder= "Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div className={figCreditClass + " figureCredit"}>
                        <TinyMceEditor placeholder= "Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} type={type} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} />
                    </div>

                </div>
                break;
        }
        return figureJsx;
    }
    render() {
        const { model } = this.props;
        return (
            

                <div className="figureElement">
                    {this.renderFigureType(model)}
                </div>

           
        );
    }
}


ElementFigure.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementFigure.propTypes = {
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