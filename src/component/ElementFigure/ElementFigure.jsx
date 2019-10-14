// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
import { c2MediaModule } from './../../js/c2_media_module';
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
import config from '../../config/config';

//import './../../styles/ElementFigure/Book.css';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class ElementFigure extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc: null
        }
    }

    onKeyup = () => {
        console.log("onKeyup")
    }
    onClick = () => {
        console.log("onClick")
    }
    dataFromAlfresco = (data) => {
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";
        let smartLinkPath = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:url'].value) ? imageData.body.results[0].properties['s.avs:url'].value : "";
        //console.log("SMART LINK PATH: " + '',smartLinkPath);
        let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
        //console.log("SMART LINK STRING: " + '',smartLinkString);
        let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
        //console.log("SMART LINK DESC: " + '',smartLinkDesc);
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
        //console.log("SMART LINK TYPE: " + '',smartLinkType);

        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {

            let imageId = imageData['workURN'] ? imageData['workURN'] : "";
            let previewURL = imageData['previewUrl'] ? imageData['previewUrl'] : "";
            let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
            this.setState({ imgSrc: epsURL })
            document.querySelector("[name='alt_text']").innerHTML = altText;
            document.querySelector("[name='long_description']").innerHTML = longDesc;

        }
    }
    handleC2ExtendedClick = (data) => {
        let data_1 = data;
        let that = this;
        c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

    }
    handleC2MediaClick = (e) => {
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        ////console.log("LAUNCHING C2 MEDIA MODAL");
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;

        if (alfrescoPath && alfrescoPath.nodeRef) {
            data_1 = alfrescoPath;
            /*
                data according to new project api 
            */
            data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

            /*
                data according to old core api and c2media
            */
            data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            this.handleC2ExtendedClick(data_1)

        } else {
           if(config.PERMISSIONS.includes('alfresco_crud_access')){ 
               c2MediaModule.onLaunchAddAnAsset(function (data_1) {
                c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                    c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                        that.dataFromAlfresco(data);
                    })
                })
            })
            }
        }

    }
    /*** @description - This function is for handling the different types of figure-element.
     * @param model object that defined the type of element*/

    renderFigureType = (model={},index, slateLockInfo) => {
        const { type } = this.props;

        var figureJsx;
        // switch (model.type) {

        //     case IMAGE:
        //     case TABLE:
        //     case MATH_IMAGE:
                var divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
                switch (model.subtype) {
                    case "image25Text":
                        divClass = 'divImage25Text';
                        figureClass = 'figureImage25Text';
                        figLabelClass = 'heading4Image25TextNumberLabel';
                        figTitleClass = 'heading4Image25TextTitle';
                        dataType = 'image';
                        imageDimension = 'image25Text';
                        figCaptionClass = 'figcaptionImage25Text';
                        figCreditClass = 'paragraphImage25TextCredit';
                        break;
                    case "image50Text":
                        divClass = 'divImage50Text';
                        figureClass = 'figureImage50Text';
                        figLabelClass = 'heading4Image50TextNumberLabel';
                        figTitleClass = 'heading4Image50TextTitle';
                        dataType = 'image';
                        imageDimension = 'image50Text';
                        figCaptionClass = 'figcaptionImage50Text';
                        figCreditClass = 'paragraphImage50TextCredit';
                        break;
                    case 'image50TextTableImage':
                        divClass = 'divImage50TextTableImage';
                        figureClass = 'figureImage50TextTableImage';
                        figLabelClass = 'heading4Image50TextTableImageNumberLabel';
                        figTitleClass = 'heading4Image50TextTableImageTitle';
                        dataType = 'table';
                        imageDimension = 'image50TextTableImage';
                        figCaptionClass = 'figcaptionImage50TextTableImage';
                        figCreditClass = 'paragraphImage50TextTableImageCredit';
                        break;
                    case 'image50TextMathImage':
                        figureClass = 'figureImage50TextMathImage';
                        figLabelClass = 'heading4Image50TextMathImageNumberLabel';
                        figTitleClass = 'heading4Image50TextMathImageTitle';
                        dataType = 'mathImage';
                        imageDimension = 'image50TextMathImage';
                        figCaptionClass = 'figcaptionImage50TextMathImage';
                        figCreditClass = 'paragraphImage50TextMathImageCredit';
                        break;
                    case 'imageTextWidth':
                        divClass = 'divImageTextWidth';
                        figureClass = 'figureImageTextWidth';
                        figLabelClass = 'heading4ImageTextWidthNumberLabel';
                        figTitleClass = 'heading4ImageTextWidthTitle';
                        dataType = 'image';
                        imageDimension = 'imageTextWidth';
                        figCaptionClass = 'figcaptionImageTextWidth';
                        figCreditClass = 'paragraphImageTextWidthCredit';
                        break;
                    case 'imageTextWidthTableImage':
                        divClass = 'divImageTextWidthTableImage';
                        figureClass = 'figureImageTextWidthTableImage';
                        figLabelClass = 'heading4ImageTextWidthTableImageNumberLabel';
                        figTitleClass = 'heading4ImageTextWidthTableImageTitle';
                        dataType = 'table';
                        imageDimension = 'imageTextWidthTableImage';
                        figCaptionClass = 'figcaptionImageTextWidthTableImage';
                        figCreditClass = 'paragraphImageTextWidthTableImageCredit';
                        break;
                    case 'imageTextWidthMathImage':
                        divClass = 'divImageTextWidthMathImage';
                        figureClass = 'figureImageTextWidthMathImage';
                        figLabelClass = 'heading4ImageTextWidthMathImageNumberLabel';
                        figTitleClass = 'heading4ImageTextWidthMathImageTitle';
                        dataType = 'mathImage';
                        imageDimension = 'imageTextWidthMathImage';
                        figCaptionClass = 'figcaptionImageTextWidthMathImage';
                        figCreditClass = 'paragraphImageTextWidthMathImageCredit';
                        break;

                    case 'imageWiderThanText':
                        divClass = 'divImageWiderThanText';
                        figureClass = 'figureImageWiderThanText';
                        figLabelClass = 'heading4ImageWiderThanTextNumberLabel';
                        figTitleClass = 'heading4ImageWiderThanTextTitle';
                        dataType = 'image';
                        imageDimension = 'imageWiderThanText';
                        figCaptionClass = 'figcaptionImageWiderThanText';
                        figCreditClass = 'paragraphImageWiderThanTextCredit';
                        break;
                    case 'imageWiderThanTextTableImage':
                        divClass = 'divImageWiderThanTextTableImage';
                        figureClass = 'figureImageWiderThanTextTableImage';
                        figLabelClass = 'heading4ImageWiderThanTextTableImageNumberLabel';
                        figTitleClass = 'heading4ImageWiderThanTextTableImageTitle';
                        dataType = 'table';
                        imageDimension = 'imageWiderThanTextTableImage';
                        figCaptionClass = 'figcaptionImageWiderThanTextTableImage';
                        figCreditClass = 'paragraphImageWiderThanTextTableImageCredit';
                        break;
                    case 'imageWiderThanTextMathImage':
                        divClass = 'divImageWiderThanTextMathImage';
                        figureClass = 'figureImageWiderThanTextMathImage';
                        figLabelClass = 'heading4ImageWiderThanTextMathImageNumberLabel';
                        figTitleClass = 'heading4ImageWiderThanTextMathImageTitle';
                        dataType = 'mathImage';
                        imageDimension = 'imageWiderThanTextMathImage';
                        figCaptionClass = 'figcaptionImageWiderThanTextMathImage';
                        figCreditClass = 'paragraphImageWiderThanTextMathImageCredit';
                        break;
                    case 'imageFullscreen':
                        divClass = 'divImageFullscreenImage';
                        figureClass = 'figureImageFullscreen';
                        figLabelClass = 'heading4ImageFullscreenNumberLabel';
                        figTitleClass = 'heading4ImageFullscreenTitle';
                        dataType = 'image';
                        imageDimension = 'imageFullscreen';
                        figCaptionClass = 'figcaptionImageFullscreen';
                        figCreditClass = 'paragraphImageFullscreen';
                        break;
                    case 'imageFullscreenTableImage':
                        divClass = 'divImageFullscreenTableImage';
                        figureClass = 'figureImageFullscreenTableImage';
                        figLabelClass = 'heading4ImageFullscreenTableImageNumberLabel';
                        figTitleClass = 'heading4ImageWiderThanTextTableImageTitle';
                        dataType = 'table';
                        imageDimension = 'imageFullscreenTableImage';
                        figCaptionClass = 'figcaptionImageFullscreenTableImage';
                        figCreditClass = 'paragraphImageFullscreenTableImageCredit';
                        break;
                    case 'imageFullscreenMathImage':
                        divClass = 'divImageFullscreenMathImage';
                        figureClass = 'figureImageFullscreenMathImage';
                        figLabelClass = 'heading4ImageFullscreenMathImageNumberLabel';
                        figTitleClass = 'heading4ImageFullscreenMathImageTitle';
                        dataType = 'mathImage';
                        imageDimension = 'imageFullscreenMathImage';
                        figCaptionClass = 'figcaptionImageFullscreenMathImage';
                        figCreditClass = 'paragraphImageFullscreenMathImageCredit';
                        break;
                        case 'image50TextEditorTable':
                            divClass = 'divImage50TextTableEditor',
                                figureClass = 'figureImage50TextEditorTable',
                                figLabelClass = 'heading4ImageFullscreenTableEditorNumberLabel',
                                figTitleClass = 'heading4Image50TextEditorTableNumberLabel',
                                dataType = 'tableasmarkup',
                                imageDimension = 'image50TextEditorTable',
                                figCaptionClass = 'figcaptionImage50TextEditorTable',
                                figCreditClass = 'paragraphImage50TextEditorTableCredit';
                            break;
                            case 'imageTextWidthTableEditor':
                        divClass = 'divImageTextWidthTableEditor',
                            figureClass = 'figureImageTextWidthTableEditor',
                            figLabelClass = 'heading4ImageTextWidthTableEditorNumberLabel',
                            figTitleClass = 'heading4ImageTextWidthEditorTableNumberLabel',
                            dataType = 'tableasmarkup',
                            imageDimension = 'imageTextWidthTableEditor',
                            figCaptionClass = 'figcaptionImageTextWidthEditorTable',
                            figCreditClass = 'paragraphImageTextWidthEditorTableCredit';
                        break;
                        case 'imageWiderThanTextEditorTable':
                        divClass = 'divImageWiderThanTextTableEditor',
                            figureClass = 'figureImageWiderThanTextEditorTable',
                            figLabelClass = 'heading4ImageWiderThanTextTableEditorNumberLabel',
                            figTitleClass = 'heading4ImageWiderThanTextEditorTableNumberLabel',
                            dataType = 'tableasmarkup',
                            imageDimension = 'imageWiderThanTextEditorTable',
                            figCaptionClass = 'figcaptionImageWiderThanTextEditorTable',
                            figCreditClass = 'paragraphImageWiderThanTextEditorTableCredit';
                        break;
                        case 'imageFullscreenTableEditor':
                        divClass = 'divImageFullscreenTableEditor',
                            figureClass = 'figureImageFullscreenEditorTable',
                            figLabelClass = 'heading4ImageFullscreenEditorTableNumberLabel',
                            figTitleClass = 'heading4ImageFullscreenEditorTableNumberLabel',
                            dataType = 'tableasmarkup',
                            imageDimension = 'imageFullscreenTableEditor',
                            figCaptionClass = 'figcaptionImageFullscreenEditorTable',
                            figCreditClass = 'paragraphImageFullscreenEditorTableCredit';
                        break;
                }
                /**JSX for Figure Image, Table Image, Math Image*/
                figureJsx = <div className={divClass} resource="">
                    <figure className={figureClass} resource="">
                        <header className="figure-header">

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                        </header>
                        <div className="pearson-component image figureData" data-type={dataType} onClick={this.handleC2MediaClick} >
                            <img src= {this.state.imgSrc? this.state.imgSrc : (model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_SOURCE)}
                                data-src={model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_DATA_SOURCE}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />
                        </div>
                        <figcaption >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
         
            
            switch (model.subtype) {
            case "mathml":
                figLabelClass = "heading4TextNumberLabel"; figTitleClass = "heading4TextTitle"; figCaptionClass = "figcaptionText"; figCreditClass = "paragraphTextCredit";
                /**JSX for MathML/ChemML Editor*/
                figureJsx = <div className="divTextFigure">
                    <figure className="figureText" resource="">
                        <header>

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                        </header>
                        <div data-type="mathml">

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Type Something..." tagName={'p'} className="paragraphNumeroUno mathml figureData mathmlDiv" model={model.figuredata.mathml} type={type} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                        </div>
                        <figcaption className="figcaptionText" >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.caption} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credit} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
                break;
            case "codelisting":
                figLabelClass = "heading4CodeSnippetNumberLabel"; figTitleClass = "heading4CodeSnippetTitle"; figCaptionClass = "figcaptionCodeSnippet"; figCreditClass = "paragraphCodeSnippetCredit";
                /**JSX for Block Code Editor*/
                figureJsx = <div className="divCodeSnippetFigure blockCodeFigure">
                    <figure className="figureCodeSnippet" >
                        <header>

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.title.text} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.subtitle.text} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />

                        </header>
                        <div className="pearson-component blockcode codeSnippet blockCodeDiv" data-type="codeSnippet" >
                            <pre className="code-listing" >
                                <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter block code..." tagName={'code'} className="" model={model.figuredata.preformattedtext} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                            </pre>
                        </div>
                        <figcaption >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.captions.text} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.credits.text} onKeyup={this.onKeyup} onClick={this.onClick} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
                break;
        }
        return figureJsx;
    }
    render() {
        const { model, index, slateLockInfo } = this.props;
        return (
            <div className="figureElement">
                {this.renderFigureType(model,index, slateLockInfo)}
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