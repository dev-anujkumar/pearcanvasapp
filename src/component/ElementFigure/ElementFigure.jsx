// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import { TinyMceEditor } from "../tinyMceEditor"

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
import { FIGURE,
IMAGE,
TABLE,
MATH_IMAGE,
AUTHORED_TEXT ,
CODELISTING,
HALF_TEXT,
TEXT_WIDTH,
WIDER,
FULL,
DEFAULT_IMAGE_DATA_SOURCE,
DEFAULT_IMAGE_SOURCE} from '../../constants/Element_Constants';

//import './../../styles/ElementFigure/Book.css';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class ElementFigure extends Component {
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

    renderFigureType = (model={},index) => {
        const { type} = this.props;

        var figureJsx;
        // switch (model.type) {

        //     case IMAGE:
        //     case TABLE:
        //     case MATH_IMAGE:
                var divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
                switch (model.subtype) {
                    case "image25Text":
                        divClass = 'divImage25Text',
                            figureClass = 'figureImage25Text',
                            figLabelClass = 'heading4Image25TextNumberLabel',
                            figTitleClass = 'heading4Image25TextTitle',
                            dataType = 'image',
                            imageDimension = 'image25Text',
                            figCaptionClass = 'figcaptionImage25Text',
                            figCreditClass = 'paragraphImage25TextCredit';
                        break;
                    case "image50Text":
                        divClass = 'divImage50Text',
                            figureClass = 'figureImage50Text',
                            figLabelClass = 'heading4Image50TextNumberLabel',
                            figTitleClass = 'heading4Image50TextTitle',
                            dataType = 'image',
                            imageDimension = 'image50Text',
                            figCaptionClass = 'figcaptionImage50Text',
                            figCreditClass = 'paragraphImage50TextCredit';
                        break;
                    case 'image50TextTableImage':
                        divClass = 'divImage50TextTableImage',
                            figureClass = 'figureImage50TextTableImage',
                            figLabelClass = 'heading4Image50TextTableImageNumberLabel',
                            figTitleClass = 'heading4Image50TextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'image50TextTableImage',
                            figCaptionClass = 'figcaptionImage50TextTableImage',
                            figCreditClass = 'paragraphImage50TextTableImageCredit';
                        break;
                    case 'image50TextMathImage':
                            figureClass = 'figureImage50TextMathImage',
                            figLabelClass = 'heading4Image50TextMathImageNumberLabel',
                            figTitleClass = 'heading4Image50TextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'image50TextMathImage',
                            figCaptionClass = 'figcaptionImage50TextMathImage',
                            figCreditClass = 'paragraphImage50TextMathImageCredit';
                        break;
                    case 'imageTextWidth':
                        divClass = 'divImageTextWidth',
                            figureClass = 'figureImageTextWidth',
                            figLabelClass = 'heading4ImageTextWidthNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTitle',
                            dataType = 'image',
                            imageDimension = 'imageTextWidth',
                            figCaptionClass = 'figcaptionImageTextWidth',
                            figCreditClass = 'paragraphImageTextWidthCredit';
                        break;
                    case 'imageTextWidthTableImage':
                        divClass = 'divImageTextWidthTableImage',
                            figureClass = 'figureImageTextWidthTableImage',
                            figLabelClass = 'heading4ImageTextWidthTableImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageTextWidthTableImage',
                            figCaptionClass = 'figcaptionImageTextWidthTableImage',
                            figCreditClass = 'paragraphImageTextWidthTableImageCredit';
                        break;
                    case 'imageTextWidthMathImage':
                        divClass = 'divImageTextWidthMathImage',
                            figureClass = 'figureImageTextWidthMathImage',
                            figLabelClass = 'heading4ImageTextWidthMathImageNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageTextWidthMathImage',
                            figCaptionClass = 'figcaptionImageTextWidthMathImage',
                            figCreditClass = 'paragraphImageTextWidthMathImageCredit';
                        break;

                    case 'imageWiderThanText':
                        divClass = 'divImageWiderThanText',
                            figureClass = 'figureImageWiderThanText',
                            figLabelClass = 'heading4ImageWiderThanTextNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTitle',
                            dataType = 'image',
                            imageDimension = 'imageWiderThanText',
                            figCaptionClass = 'figcaptionImageWiderThanText',
                            figCreditClass = 'paragraphImageWiderThanTextCredit';
                        break;
                    case 'imageWiderThanTextTableImage':
                        divClass = 'divImageWiderThanTextTableImage',
                            figureClass = 'figureImageWiderThanTextTableImage',
                            figLabelClass = 'heading4ImageWiderThanTextTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageWiderThanTextTableImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextTableImage',
                            figCreditClass = 'paragraphImageWiderThanTextTableImageCredit';
                        break;
                    case 'imageWiderThanTextMathImage':
                        divClass = 'divImageWiderThanTextMathImage',
                            figureClass = 'figureImageWiderThanTextMathImage',
                            figLabelClass = 'heading4ImageWiderThanTextMathImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextMathImageTitle',
                            dataType = 'mathImage',
                            imageDimension = 'imageWiderThanTextMathImage',
                            figCaptionClass = 'figcaptionImageWiderThanTextMathImage',
                            figCreditClass = 'paragraphImageWiderThanTextMathImageCredit';
                        break;
                    case 'imageFullscreen':
                        divClass = 'divImageFullscreenImage',
                            figureClass = 'figureImageFullscreen',
                            figLabelClass = 'heading4ImageFullscreenNumberLabel',
                            figTitleClass = 'heading4ImageFullscreenTitle',
                            dataType = 'image',
                            imageDimension = 'imageFullscreen',
                            figCaptionClass = 'figcaptionImageFullscreen',
                            figCreditClass = 'paragraphImageFullscreen';
                        break;
                    case 'imageFullscreenTableImage':
                        divClass = 'divImageFullscreenTableImage',
                            figureClass = 'figureImageFullscreenTableImage',
                            figLabelClass = 'heading4ImageFullscreenTableImageNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextTableImageTitle',
                            dataType = 'table',
                            imageDimension = 'imageFullscreenTableImage',
                            figCaptionClass = 'figcaptionImageFullscreenTableImage',
                            figCreditClass = 'paragraphImageFullscreenTableImageCredit';
                        break;
                    case 'imageFullscreenMathImage':
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
                /**JSX for Figure Image, Table Image, Math Image*/
                figureJsx = <div className={divClass} resource="">
                    <figure className={figureClass} resource="">
                        <header className="figure-header">

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} onKeyup={this.onKeyup} onClick={this.onClick} />

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} onKeyup={this.onKeyup} onClick={this.onClick} />

                        </header>
                        <div className="pearson-component image figureData" data-type={dataType} >
                            <img src= {model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_SOURCE}
                                data-src={model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_DATA_SOURCE}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />
                        </div>
                        <figcaption >
                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} onKeyup={this.onKeyup} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} onKeyup={this.onKeyup} onClick={this.onClick} />
                    </div>

                </div>
         
            
            switch (model.subtype) {
            case "mathml":
                figLabelClass = "heading4TextNumberLabel"; figTitleClass = "heading4TextTitle"; figCaptionClass = "figcaptionText"; figCreditClass = "paragraphTextCredit";
                /**JSX for MathML/ChemML Editor*/
                figureJsx = <div className="divTextFigure">
                    <figure className="figureText" resource="">
                        <header>

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} onKeyup={this.onKeyup} onClick={this.onClick} />

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} onKeyup={this.onKeyup} onClick={this.onClick} />

                        </header>
                        <div data-type="mathml">

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Type Something..." tagName={'p'} className="paragraphNumeroUno mathml figureData mathmlDiv" model={model.html.postertext} type={type} onKeyup={this.onKeyup} onClick={this.onClick} />

                        </div>
                        <figcaption className="figcaptionText" >
                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} onKeyup={this.onKeyup} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} onKeyup={this.onKeyup} onClick={this.onClick} />
                    </div>

                </div>
                break;
            case "codelisting":
                figLabelClass = "heading4CodeSnippetNumberLabel"; figTitleClass = "heading4CodeSnippetTitle"; figCaptionClass = "figcaptionCodeSnippet"; figCreditClass = "paragraphCodeSnippetCredit";
                /**JSX for Block Code Editor*/
                figureJsx = <div className="divCodeSnippetFigure blockCodeFigure">
                    <figure className="figureCodeSnippet" >
                        <header>

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.title.text} onKeyup={this.onKeyup} onClick={this.onClick} />

                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.subtitle.text} onKeyup={this.onKeyup} onClick={this.onClick} />

                        </header>
                        <div className="pearson-component blockcode codeSnippet blockCodeDiv" data-type="codeSnippet" >
                            <pre className="code-listing" >
                                <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter block code..." tagName={'code'} className="" model={model.figuredata.preformattedtext} onKeyup={this.onKeyup} onClick={this.onClick} />
                            </pre>
                        </div>
                        <figcaption >
                            <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.captions.text} onKeyup={this.onKeyup} onClick={this.onClick} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.credits.text} onKeyup={this.onKeyup} onClick={this.onClick} />
                    </div>

                </div>
                break;
        }
        return figureJsx;
    }
    render() {
        const { model,index} = this.props;
        return (
            <div className="figureElement">
                {this.renderFigureType(model,index)}
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