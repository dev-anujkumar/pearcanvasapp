/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import TinyMceEditor from "../tinyMceEditor";
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { c2MediaModule } from './../../js/c2_media_module';
import { showTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import { utils } from '../../js/utils';
import PopUp from '../PopUp'


/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/
class Interactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID : null,
            posterImage : null,
            showAssesmentpopup: false
        };

    }

    /**
     * @description - This function is for accessing c2_assessment library for interactive.
     * @param {event} value
     */

    handleC2InteractiveClick = (value) => {

        let that = this;
        let fileName = "";
        let filterType = [this.props.model.figuredata.interactiveformat.toUpperCase()] || ['CITE'];
        let searchMode = "partial";
        let searchSelectAssessmentURN = "";
        let productId = "";
        let searchTypeOptVal = "";
        showTocBlocker();
        disableHeader(true);
        this.togglePopup(false);
        productId = (value && value !== "") ? value : "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal, async function (interactiveData) {
            let tempInteractiveType = utils.getTaxonomicType(interactiveData['itemsData']['taxonomicType'][1]);

            if (tempInteractiveType === 'video-mcq') {
                let responseData = await axios.get(config_object.SCAPI_ENDPOINT + "/" + interactiveData['workExample'][0],
                    {
                        headers: {
                            "x-apikey": config.MANIFEST_APIKEY
                        }
                    });
                interactiveData['imageId'] = responseData['data']["thumbnail"]['id'];
                interactiveData['path'] = responseData['data']["thumbnail"]['src'];
                interactiveData['alttext'] = responseData['data']["thumbnail"]['alt'];
            }
            let posterImage = {};
            let itemsData = interactiveData['itemsData'];
            let id = interactiveData['id'] ? interactiveData['id'] : "";
            let itemId = interactiveData['itemID'] ? interactiveData['itemID'] : "";
            let totalduration = interactiveData['totalduration'] ? interactiveData['totalduration'] : '';
            posterImage['imageid'] = interactiveData['imageId'] ? interactiveData['imageId'] : '';
            posterImage['path'] = interactiveData['path'] ? interactiveData['path'] : '';
            let alttext = interactiveData['alttext'] ? interactiveData['alttext'] : '';
            let workExample = (interactiveData['itemsData']['workExample'] && interactiveData['itemsData']['workExample'][0]) ? interactiveData['itemsData']['workExample'][0] : "";
            let imageId = "";
            let epsURL = interactiveData['EpsUrl'] ? interactiveData['EpsUrl'] : "";
            that.setState({itemID : workExample})
            let figureData = {
                schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                interactiveid: workExample,
                interactivetype: tempInteractiveType,
                interactiveformat: "mmi"
            }
            that.props.updateFigureData(figureData, this.props.index, ()=>{
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur()
            })
        }); 
    }
     
    renderInteractiveType = (element, itemId, index, slateLockInfo) => {
        let jsx, divImage, figureImage, heading4Label, heading4Title, dataType, id, imageDimension, figcaptionClass, paragraphCredit, hyperlinkClass,path;
        var context = element && element.figuredata && element.figuredata.interactivetype;
        switch (context) {

            case "fpo":
                divImage = 'divImageTextWidth';
                figureImage = 'figureImageTextWidth';
                heading4Label = 'heading4ImageTextWidthNumberLabel';
                heading4Title = 'heading4ImageTextWidthTitle';
                dataType = 'image';
                id = 'id-info';
                imageDimension = 'imageTextWidth';
                figcaptionClass = 'figcaptionImageTextWidth';
                paragraphCredit = 'paragraphImageTextWidthCredit';
                break;

            case "flashcards":
                divImage = 'divWidgetFlashcards';
                figureImage = 'figureWidgetFlashcards';
                heading4Label = 'heading4WidgetFlashcardsNumberLabel';
                heading4Title = 'heading4WidgetFlashcardsTitle';
                dataType = 'flashcards';
                id = 'id-info';
                imageDimension = 'imageWidgetFlashcards';
                figcaptionClass = 'figcaptionWidgetFlashcards';
                paragraphCredit = 'paragraphWidgetFlashcardsCredit';
                break;

            case "pdf":
                divImage = 'divWidgetPDF';
                figureImage = 'figureWidgetPDF';
                heading4Label = 'heading4WidgetPDFNumberLabel';
                heading4Title = 'heading4WidgetPDFTitle';
                dataType = 'pdf';
                id = 'id-info';
                imageDimension = '';
                hyperlinkClass = 'buttonWidgetPDF';
                path = 'PATH: ';
                figcaptionClass = 'figcaptionWidgetPDF';
                paragraphCredit = 'paragraphWidgetPDFCredit';
                break;

            case "3rd-party":
                divImage = 'divWidget3PI';
                figureImage = 'figureWidget3PI';
                heading4Label = 'heading4Widget3PINumberLabel';
                heading4Title = 'heading4Widget3PITitle';
                dataType = '3pi';
                id = 'id-info';
                imageDimension = 'imageWidget3PI';
                figcaptionClass = 'figcaptionWidget3PI';
                paragraphCredit = 'paragraphWidget3PICredit';
                break;

            case "graph":
                divImage = 'divWidgetGraph';
                figureImage = 'figureWidgetVidSlideshow';
                heading4Label = 'heading4WidgetGraphNumberLabel';
                heading4Title = 'heading4WidgetGraphTitle';
                dataType = 'graph';
                id = 'id-info';
                imageDimension = 'imageWidgetGraph';
                figcaptionClass = 'figcaptionWidgetGraph';
                paragraphCredit = 'paragraphWidgetGraphCredit';
                break;

            case "simulation":
                divImage = 'divWidgetUCA';
                figureImage = 'figureWidgetUCA';
                heading4Label = 'heading4WidgetUCANumberLabel';
                heading4Title = 'heading4WidgetUCATitle';
                dataType = 'uca';
                id = 'id-info';
                imageDimension = 'imageWidgetUCA';
                figcaptionClass = 'figcaptionWidgetUCA';
                paragraphCredit = 'paragraphWidgetUCACredit';
                break;

            case "survey":
                divImage = 'divWidgetSurvey';
                figureImage = 'figureWidgetSurvey';
                heading4Label = 'heading4WidgetSurveyNumberLabel';
                heading4Title = 'heading4WidgetSurveyTitle';
                dataType = 'uca';
                id = 'id-info';
                imageDimension = 'imageWidgetSurvey';
                figcaptionClass = 'figcaptionWidgetSurvey';
                paragraphCredit = 'paragraphWidgetSurveyCredit';
                break;

            case "timeline":
                divImage = 'divWidgetTimeline';
                figureImage = 'figureWidgetTimeline';
                heading4Label = 'heading4WidgetTimelineNumberLabel';
                heading4Title = 'heading4WidgetTimelineTitle';
                dataType = 'timeline';
                id = 'id-info';
                imageDimension = 'imageWidgetTimeline';
                figcaptionClass = 'figcaptionWidgetTimeline';
                paragraphCredit = 'paragraphWidgetTimelineCredit';
                break;

            case "hotspot":
                divImage = 'divWidgetHotspot';
                figureImage = 'figureWidgetHotspot';
                heading4Label = 'heading4WidgetHotspotNumberLabel';
                heading4Title = 'heading4WidgetHotspotTitle';
                dataType = 'hotspot';
                id = 'id-info';
                imageDimension = 'imageWidgetHotspot';
                figcaptionClass = 'figcaptionWidgetHotspot';
                paragraphCredit = 'paragraphWidgetHotspotCredit';
                break;

            case "accountingtable":
                divImage = 'divWidgetAccountingtable';
                figureImage = 'figureWidgetAccountingtable';
                heading4Label = 'heading4WidgetAccountingtableNumberLabel';
                heading4Title = 'heading4WidgetAccountingtableTitle';
                dataType = 'accountingtable';
                id = 'id-info';
                imageDimension = 'imageWidgetAccountingtable';
                figcaptionClass = 'figcaptionWidgetAccountingtable';
                paragraphCredit = 'paragraphWidgetAccountingtableCredit';
                break;

            case "fill-in-blank":
                divImage = 'divWidgetFIB';
                figureImage = 'figureWidgetFIB';
                heading4Label = 'heading4WidgetFIBNumberLabel';
                heading4Title = 'heading4WidgetFIBTitle';
                dataType = 'fib';
                id = 'id-info';
                imageDimension = 'imageWidgetFIB';
                figcaptionClass = 'figcaptionWidgetFIB';
                paragraphCredit = 'paragraphWidgetFIBCredit';
                break;

            case "gallery-image":
                divImage = 'divWidgetImgSlideshow';
                figureImage = 'figureWidgetImgSlideshow';
                heading4Label = 'heading4WidgetImgSlideshowNumberLabel';
                heading4Title = 'heading4WidgetImgSlideshowTitle';
                dataType = 'imgSlideshow';
                id = 'id-info';
                imageDimension = 'imageWidgetImgSlideshow';
                figcaptionClass = 'figcaptionWidgetImgSlideshow';
                paragraphCredit = 'paragraphWidgetImgSlideshowCredit';
                break;

            case "gallery-video":
                divImage = 'divWidgetVidSlideshow';
                figureImage = 'figureWidgetVidSlideshow';
                heading4Label = 'heading4WidgetVidSlideshowNumberLabel';
                heading4Title = 'heading4WidgetVidSlideshowTitle';
                dataType = 'vidSlideshow';
                id = 'id-info';
                imageDimension = 'imageWidgetVidSlideshow';
                figcaptionClass = 'figcaptionWidgetVidSlideshow';
                paragraphCredit = 'paragraphWidgetVidSlideshowCredit';
                break;

            case "video-mcq":
                divImage = 'divWidgetVideoMcq';
                figureImage = 'figureWidgetVideoMcq';
                heading4Label = 'heading4WidgetVideoMcqNumberLabel';
                heading4Title = 'heading4WidgetVideoMcqTitle';
                dataType = 'videoMcq';
                id = 'id-info';
                imageDimension = 'imageWidgetVideoMcq';
                figcaptionClass = 'figcaptionWidgetVideoMcq';
                paragraphCredit = 'paragraphWidgetVideoMcqCredit';
                break;

            case "mcq":
                divImage = 'divWidgetVideoMcq';
                figureImage = 'figureWidgetVideoMcq';
                heading4Label = 'heading4WidgetVideoMcqNumberLabel';
                heading4Title = 'heading4WidgetVideoMcqTitle';
                dataType = 'videoMcq';
                id = 'id-info';
                imageDimension = 'imageWidgetVideoMcq';
                figcaptionClass = 'figcaptionWidgetVideoMcq';
                paragraphCredit = 'paragraphWidgetVideoMcqCredit';
                break;

            case "pop-up-web-link":
                divImage = 'divWidgetPUSL';
                figureImage = 'figureWidgetPUSL';
                heading4Label = 'heading4WidgetPUSLNumberLabel';
                heading4Title = 'heading4WidgetPUSLTitle';
                dataType = 'pusl';
                id = 'id-info';
                imageDimension = '';
                hyperlinkClass = 'buttonWidgetPUSL';
                figcaptionClass = 'figcaptionWidgetPUSL';
                paragraphCredit = 'paragraphWidgetPUSLCredit';
                break;

            case "web-link":
                divImage = 'divWidgetPUSL';
                figureImage = 'figureWidgetPUSL';
                heading4Label = 'heading4WidgetPUSLNumberLabel';
                heading4Title = 'heading4WidgetPUSLTitle';
                dataType = 'pusl';
                id = 'id-info';
                imageDimension = '';
                hyperlinkClass = 'buttonWidgetPUSL';
                figcaptionClass = 'figcaptionWidgetPUSL';
                paragraphCredit = 'paragraphWidgetPUSLCredit';
                break;

            case "table":
                divImage = 'divWidgetTableSL';
                figureImage = 'figureWidgetTableSL';
                heading4Label = 'heading4WidgetTableSLNumberLabel';
                heading4Title = 'heading4WidgetTableSLTitle';
                dataType = 'tablesl';
                id = 'id-info';
                imageDimension = 'imageWidgetTableSL';
                hyperlinkClass = '';
                figcaptionClass = 'figcaptionWidgetTableSL';
                paragraphCredit = 'paragraphWidgetTableSLCredit';
                break;

            case "popup":
                divImage = 'divWidgetPU';
                figureImage = 'figureWidgetPU';
                heading4Label = 'heading4WidgetPUNumberLabel';
                heading4Title = 'heading4WidgetPUTitle';
                dataType = 'pu';
                id = 'id-info';
                imageDimension = '';
                hyperlinkClass = 'buttonWidgetPU';
                figcaptionClass = 'figcaptionWidgetPU';
                paragraphCredit = 'paragraphWidgetPUCredit';
                break;

        }
        if (context === 'showhide') {
            jsx = <div className="divWidgetShowHide" resource="">
                <figure className="figureWidgetShowHide" resource="">
                    <header>
                        <h4 className="heading4WidgetShowHideTitle" resource=""></h4>
                    </header>
                    <div className="pearson-component showHide" data-uri="" data-type="showHide" data-width="600" data-height="399" >
                        <div data-reactroot="">
                            <div className="sh-container">
                                <div>
                                    <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className="paragraphShowHideWidgetQuestionText" placeholder="Enter shown text" tagName={'p'} 
                                     model={element.html.title} id={this.props.id} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                                    <p className="paragraphNumeroUno revealAns" resource="" aria-label="Reveal Answer">
                                    <a className="paragraphNumeroUno">
                                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} placeholder="Enter hidden text" 
                                        id={this.props.id} tagName={'p'}
                                        model={element.html.subtitle}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figcaption className="figcaptionWidgetShowHide" resource=""></figcaption>
                </figure>
                <p className="paragraphWidgetShowHideCredit"></p>
            </div>
        }
        else {
            jsx = <div className={divImage} resource="">
                <figure className={figureImage} resource="">
                    <header>
                            <TinyMceEditor  openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                            <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                    </header>
                    <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div>
                    <div className={"pearson-component " + dataType} data-uri="" data-type={dataType} data-width="600" data-height="399" onClick={(e)=>{this.togglePopup(e,true)}} >
                        {
                            imageDimension !== '' ?
                                (context === 'table' ?
                                    <a className="" href="javascript:void(0)">
                                        <img src={this.state.posterImage?this.state.posterImage:"https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"}
                                            data-src="https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png" title="View Image" alt=""
                                            className={imageDimension + " lazyload"} />
                                    </a>
                                    : <img src={this.state.posterImage?this.state.posterImage:"https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"} title="View Image" alt=""
                                        className={imageDimension + " lazyload"} />
                                )
                                : 
                                 <a className={hyperlinkClass} href="javascript:void(0)">
                                    <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    model={element.figuredata.postertext.text} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                                 </a>
                        }
                    </div>
                    <figcaption>
                        <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.captions} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.credits} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                </div>
            </div>
        }
        return jsx;
    }

    /**
     * @description - This function is for toggling the c2 media uuid popup.
     * @param {event} value
     */

    togglePopup = (e,value)=>{
        if(this.props.model.figuredata.interactiveformat==="external-link"){
            this.handleC2MediaClick(e);
        }
        else{
            this.props.handleFocus();
            this.setState({showAssesmentpopup:value})
        }
    }

    dataFromAlfresco = (data) => {
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";              //commented lines will be used to update the element data
        //let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";
        let smartLinkPath = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:url'].value) ? imageData.body.results[0].properties['s.avs:url'].value : "";
        let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
        let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";


        if (smartLinkType) {
            let uniqInterString = imageData && imageData.req && imageData.req.url;
            let uniqueIDInteractive;
            let uniqInter = (uniqInterString) ? uniqInterString.split('s.cmis:objectId = ')[1].replace(/\'/g, '') : "";
            if (uniqInter) {
                uniqueIDInteractive = "urn:pearson:alfresco:" + uniqInter
            }

            if (smartLinkType.toLowerCase() === "3rd party interactive" || smartLinkType.toLowerCase() === "metrodigi interactive" || smartLinkType.toLowerCase() === "table") {
                let posterURL = imageData['posterImageUrl'] || 'https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png';
                if (epsURL == "" || epsURL == undefined) {
                    epsURL = imageData['posterImageUrl'] ? imageData['posterImageUrl'] : "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png";
                }
                let vendorName = imageData['vendorName'];
                let mobileready = imageData['smartlinkoptimizedmobileval'];

                this.setState({ itemID: uniqueIDInteractive, posterImage: posterURL })
                let figuredata = {
                    height: height,
                    width: width,
                    mobileready: mobileready,
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                    interactiveid: uniqueIDInteractive,
                    interactivetype: "3rd-party",
                    interactiveformat: "external-link",
                    vendor: vendorName,
                    posterimage: {
                        "imageid": uniqueIDInteractive,
                        "path": posterURL
                    },
                    "path": smartLinkPath
                }
                this.props.updateFigureData(figuredata, this.props.index, ()=>{
                    this.props.handleFocus("updateFromC2")
                    this.props.handleBlur()
                })
            }
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
     * @description - This function is for rendering the Jsx Part of different Interactive Elements.
     * @param {event} element
     * @param {event} itemId
     * @param {event} index
     */

    render() {
        const { model, itemId, index, slateLockInfo } = this.props;
        try {
            return (
               
                    <div className="interactive-element">
                        {this.renderInteractiveType(model, itemId, index, slateLockInfo)}
                        {this.state.showAssesmentpopup? <PopUp handleC2Click ={this.handleC2InteractiveClick} togglePopup={this.togglePopup}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
                    </div>
                
            )
        } catch (error) {
            return (
                <div className="interactive-element">
                </div>
            )
        } 
    }
}
Interactive.displayName = "Interactive";

Interactive.defaultProps = {
    /** Detail of element in JSON object */
    itemId: ""
}

Interactive.propTypes = {

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func,
    /** itemId coming from c2module */
    itemId: PropTypes.string
}
export default Interactive;