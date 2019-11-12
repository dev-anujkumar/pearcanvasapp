// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor"

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
import { c2MediaModule } from './../../js/c2_media_module';
import { 
DEFAULT_IMAGE_DATA_SOURCE,
DEFAULT_IMAGE_SOURCE} from '../../constants/Element_Constants';
import config from '../../config/config';
import { sendDataToIframe } from '../../constants/utility';


/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

export class ElementFigure extends Component {
    constructor(props) {
        super(props);
        this.state={
            imgSrc: null
        }
    }

    /**
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */
    dataFromAlfresco = (data) => {
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";              //commented lines will be used to update the element data
        let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";

        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {

            let uniqID = imageData['uniqueID'] ? imageData['uniqueID'] : "";
            let altText = imageData['alt-text'] ? imageData['alt-text'] : "";
            let longDesc = imageData['longDescription'] ? imageData['longDescription'] : "";
            if (epsURL !== "") {
                this.setState({ imgSrc: epsURL })
            } else {
                this.setState({ imgSrc: DEFAULT_IMAGE_SOURCE })
            }
            document.querySelector("[name='alt_text']").innerHTML = altText;
            document.querySelector("[name='long_description']").innerHTML = longDesc;
            let figureData = {
                path : epsURL,
                height : height,
                width: width,
                schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                imageid: `urn:pearson:alfresco:${uniqID}`,
                alttext: altText,
                longdescripton: longDesc
            }
            this.props.updateFigureData(figureData, this.props.index, ()=>{
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur()
            })   
        }
    }
    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
        let that = this;
        c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
        this.props.handleFocus();
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        var data_1 = false;

        if (alfrescoPath && alfrescoPath.nodeRef) {         //if alfresco location is available
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
           if(this.props.permissions.includes('alfresco_crud_access')){ 
               c2MediaModule.onLaunchAddAnAsset(function (data_1) {                                                                           // alfresco location is not assigned to project
                c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
                    c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                        that.dataFromAlfresco(data);
                    })
                })
            })
            }
        }

    }
    


    /**
     * @description function will be called to launch Table Editor SPA
     */
    launchSPA=()=>{
    let editable = true;
    let tableId = this.props.elementId;
    sendDataToIframe({'type':'launchTableSPA', 'message':{}, "id" : tableId, "editable" :editable });
}
    /**
     * @description function will be called on image src add and fetch resources based on figuretype
     */   
    addFigureResource = (e) => {
        if (this.props.model.figuretype === "tableasmarkup") {
            this.launchSPA();
        }
         else {
            this.handleC2MediaClick(e);
        }      
    }

/*** @description - This function is for handling the different types of figure-element.
    * @param model object that defined the type of element
    * @param index index of the current element
    * @param slateLockInfo object that defines the slate lock details */
    renderFigureType = (model,index, slateLockInfo) => {
        const { type } = this.props;

        var figureJsx;
                let divClass = '', figureClass = '', figLabelClass = '', figTitleClass = '', dataType = '', imageDimension = '', figCaptionClass = '', figCreditClass = '';
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
                    case 'imageTextWidthTableEditor':
                        divClass = 'divImageTextWidth';
                        figureClass = 'figureImageTextWidth';
                        figLabelClass = 'heading4ImageTextWidthNumberLabel';
                        figTitleClass = 'heading4ImageTextWidthTitle';
                        dataType = 'tableasmarkup';
                        imageDimension = 'imageTextWidth';
                        figCaptionClass = 'figcaptionImageTextWidth';
                        figCreditClass = 'paragraphImageTextWidthCredit';
                        break;

                }

                /**JSX for Figure Image, Table Image, Math Image*/
                figureJsx = <div className={divClass} resource="">
                    <figure className={figureClass} resource="">
                        <header className="figure-header">

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title? model.html.title:"label"} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle? model.html.subtitle:"title"} slateLockInfo={slateLockInfo} />

                        </header>
                        <div className={`pearson-component image figureData ${this.props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} onClick={this.addFigureResource} >
                            {this.props.model.figuretype === "tableasmarkup" && (this.props.model.figuredata.tableasHTML && (this.props.model.figuredata.tableasHTML !== "" || this.props.model.figuredata.tableasHTML !== undefined)) ?
                                <div id={`${index}-tableData`} className={imageDimension} dangerouslySetInnerHTML={{ __html: this.props.model.figuredata.tableasHTML }} ></div>
                                :
                                <img src={this.state.imgSrc ? this.state.imgSrc : (model.figuredata.path && model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_SOURCE)}
                                    data-src={(model.figuredata.path && model.figuredata.path !== "" || model.figuredata.path !== undefined) ? model.figuredata.path : DEFAULT_IMAGE_DATA_SOURCE}
                                    title=""
                                    alt=""
                                    className={imageDimension + ' lazyload'}
                                    draggable="false" />
                            }
                        </div>
                        <figcaption >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div >
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
         
            
            switch (model.subtype) {
            case "mathml":
                figLabelClass = "heading4TextNumberLabel"; figTitleClass = "heading4TextTitle"; figCaptionClass = "figcaptionText"; figCreditClass = "paragraphTextCredit";
                /**JSX for MathML/ChemML Editor*/
                figureJsx = <div className="divTextFigure">
                    <figure className="figureText" resource="">
                        <header>

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} slateLockInfo={slateLockInfo} />

                        </header>
                        <div data-type="mathml">

                            <TinyMceEditor element = {model} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Type Something..." tagName={'p'} className="paragraphNumeroUno mathml figureData mathmlDiv" model={model.figuredata.elementdata.text} type={type} slateLockInfo={slateLockInfo} />

                        </div>
                        <figcaption className="figcaptionText" >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
                break;
            case "codelisting":
                figLabelClass = "heading4CodeSnippetNumberLabel"; figTitleClass = "heading4CodeSnippetTitle"; figCaptionClass = "figcaptionCodeSnippet"; figCreditClass = "paragraphCodeSnippetCredit";
                let preformattedText = model.figuredata.preformattedtext
                let processedText = ""
                preformattedText.forEach(function(item){
                    let encodedItem1 = item.replace(/</g, "&lt;")             //Encoded '<' and '>' to prevent TinyMCE to treat them as HTML tags.
                    let encodedItem2 = encodedItem1.replace(/>/g, "&gt;")
                    processedText+=`<div>${encodedItem2}</div>`            
                })
                /**JSX for Block Code Editor*/
                figureJsx = <div className="divCodeSnippetFigure blockCodeFigure">
                    <figure className="figureCodeSnippet" >
                        <header>

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={model.html.title} slateLockInfo={slateLockInfo} />

                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-1`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={model.html.subtitle} slateLockInfo={slateLockInfo} />

                        </header>
                        <div className="pearson-component blockcode codeSnippet blockCodeDiv" data-type="codeSnippet" >
                            <pre className="code-listing" >
                                <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-2`} placeholder="Enter block code..." tagName={'code'} className="" model={processedText} slateLockInfo={slateLockInfo} />
                            </pre>
                        </div>
                        <figcaption >
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo} />
                        </figcaption>
                    </figure>
                    <div>
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}  index={`${index}-4`} placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo} />
                    </div>

                </div>
                break;
        }
        return figureJsx;
    }
    render() {
        const { model, index, slateLockInfo } = this.props;
        try {
            return (
                <div className="figureElement">
                    {this.renderFigureType(model, index, slateLockInfo)}
                </div>
            );
        } catch (error) {
            return (
                <div className="figureElement">
                </div>
            );
        }
        
    }
}

ElementFigure.displayName = "ElementFigure"

ElementFigure.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementFigure.propTypes = {
    /** Handler to return the type of element based on the figuretype and alignment */
    renderFigureType: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func
}

export default ElementFigure;