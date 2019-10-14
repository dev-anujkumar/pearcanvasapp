/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import TinyMceEditor from "../tinyMceEditor";
import { c2AssessmentModule } from './../../js/c2_assessment_module';
import { showTocBlocker, hideTocBlocker, disableHeader } from '../../js/toggleLoader'
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
            showAssesmentpopup: false
        };

    }

    /**
     * @description - This function is for rendering the Jsx Part of different Interactive Elements.
     * @param {event} element
     * @param {event} itemId
     * @param {event} index
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

        //  vex.dialog.prompt({
        //     message: 'PLEASE ENTER A PRODUCT UUID',
        //     placeholder: 'UUID',
        //     callback: function (value) {
        productId = (value && value !== "") ? value : "Unspecified";

        
        //productId = "Unspecified";
        c2AssessmentModule.launchAssetBrowser(fileName, filterType, searchMode, searchSelectAssessmentURN, productId, searchTypeOptVal, async function (interactiveData) {
            console.log(interactiveData)
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
            var interactiveFormat;
            that.setState({itemID : workExample})


            // if (interactiveData['itemsData'] && interactiveData['itemsData']['taxonomicType'] && interactiveData['itemsData']['taxonomicType'][0] && typeof interactiveData['itemsData']['taxonomicType'][0] === 'string') {
            //     interactiveFormat = editor_utils.getTaxonomicFormat(interactiveData['itemsData']['taxonomicType'][0]);
            // } else {
            //     if (interactiveData.type === 'MMI') {
            //         interactiveFormat = 'mmi';
            //     }
            //     else {
            //         interactiveFormat = "";
            //         vex.dialog.alert("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
            //     }
            // }

            // var interactiveTaxonomicType;
            // if (interactiveData['itemsData'] && interactiveData['itemsData']['taxonomicType'] && interactiveData['itemsData']['taxonomicType'][1] && typeof interactiveData['itemsData']['taxonomicType'][1] === 'string') {
            //     interactiveTaxonomicType = editor_utils.getTaxonomicType(interactiveData['itemsData']['taxonomicType'][1]);
            // } else {
            //     vex.dialog.alert("There was an error loading asset due to malformed 'taxonomicType' data.  Please contact the helpdesk and reference id: " + id);
            // }
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredatainteractiveid", workExample);
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredatainteractivetype", interactiveTaxonomicType);
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredatainteractiveformat", interactiveFormat);
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredataposterimageid", imageId);
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredataposterpath", epsURL);

            // if (interactiveTaxonomicType === 'video-mcq') {
            //     if (totalduration) {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredatatotalduration", totalduration);
            //     }
            //     else {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredatatotalduration");
            //     }
            //     if (posterImage['imageId'] || posterImage['path']) {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredataposterimage", JSON.stringify(posterImage));
            //     }
            //     else {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataposterimage");
            //     }
            //     if (posterImage['path']) {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredataposterpath", posterImage['path']);
            //     }
            //     else {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataposterpath");
            //     }

            //     if (alttext) {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').attr("data-figuredataalttext", alttext);
            //     }
            //     else {
            //         $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataalttext");
            //     }
            // }
            // else {
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredatatotalduration");
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataposterimage");
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataalttext");
            //     $('.editor-instance[data-id="' + that.state.elementid + '"]').removeAttr("data-figuredataposterpath");

            // }
            // that.state.editorContext = interactiveTaxonomicType;
            // /* that.setState({
            //     editorContext : interactiveTaxonomicType
            // }) */

            // /*
            //     opening alt text sidebar when asset is added by clicking on the title part of the element
            // */
            // $('.editor-instance[data-id="' + that.state.elementid + '"]').find('header .fr-element').eq(0).click()
        }); 
        //     }
        // })

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
                                    <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className="paragraphShowHideWidgetQuestionText" placeholder="Enter shown text" tagName={'p'} 
                                     model={element.html.title} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} id={this.props.id} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                                    <p className="paragraphNumeroUno revealAns" resource="" aria-label="Reveal Answer">
                                    <a className="paragraphNumeroUno">
                                        <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} placeholder="Enter hidden text" 
                                        onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} id={this.props.id} tagName={'p'}
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
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                             onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                            <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                             onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                    </header>
                    <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div>
                    <div className={"pearson-component " + dataType} data-uri="" data-type={dataType} data-width="600" data-height="399" onClick={(e)=>{this.togglePopup(true)}} >
                        {
                            imageDimension !== '' ?
                                (context === 'table' ?
                                    <a className="" href="javascript:void(0)">
                                        <img src="https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"
                                            data-src="https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png" title="View Image" alt=""
                                            className={imageDimension + " lazyload"} />
                                    </a>
                                    : <img src="https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png" title="View Image" alt=""
                                        className={imageDimension + " lazyload"} />
                                )
                                : 
                                 <a className={hyperlinkClass} href="javascript:void(0)">
                                    <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    model={element.figuredata.postertext.text} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                                 </a>
                        }
                    </div>
                    <figcaption>
                        <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.caption} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor currentSlateLOData={this.props.currentSlateLOData} learningObjectiveOperations={this.props.learningObjectiveOperations} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.caption} onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} />
                </div>
            </div>
        }
        return jsx;
    }

    togglePopup = (value)=>{
        this.setState({showAssesmentpopup:value})
    }




    render() {
        const { model, itemId, index, slateLockInfo } = this.props;
        try {
            return (
               
                    <div className="interactive-element">
                        {this.renderInteractiveType(model, itemId, index, slateLockInfo)}
                        {this.state.showAssesmentpopup? <PopUp handleC2Click ={this.handleC2InteractiveClick}  assessmentAndInteractive={"assessmentAndInteractive"} dialogText={'PLEASE ENTER A PRODUCT UUID'}/>:''}
                    </div>
                
            )
        } catch (error) {
            return (
                <div className="interactive-element">
                </div>
            )
        } 
    }

    onFocus = () => {

    }
    onKeyup = () => {

    }
    onBlur = () => {

    }
    onClick = () => {

    }
}

Interactive.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,
    itemId: "urn:pearson:work:9f54762e-6b4f-4538-aca3-c94b98888b93"
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
    itemId: PropTypes.string,
    model: PropTypes.object.isRequired
}
export default Interactive;