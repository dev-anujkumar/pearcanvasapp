/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import TinyMceEditor from "../tinyMceEditor";
import { c2MediaModule } from './../../js/c2_media_module';
import { showTocBlocker,hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import config from '../../config/config';
import { utils } from '../../js/utils';
import axios from 'axios';
import { hasReviewerRole } from '../../constants/utility.js';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import  {setCurrentCiteTdx, setCurrentInnerCiteTdx, getMCQGuidedData, assessmentSorting}  from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { connect } from 'react-redux';
import { sendDataToIframe } from './../../constants/utility.js';

/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/
class Interactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID : this.props.model.figuredata && this.props.model.figuredata.interactiveid ? this.props.model.figuredata.interactiveid : "",
            posterImage : null,
            imagePath : this.props.model.figuredata && this.props.model.figuredata.posterimage && this.props.model.figuredata.posterimage.path ? this.props.model.figuredata.posterimage.path : "",
            showAssesmentpopup: false,
            elementType: this.props.model.figuredata.interactivetype || "",
            projectMetadata: false,
            showAssessmentPopup: false,
            showSinglePopup:false,
            setCurrentAssessment:{},
            parentPageNo:1,
            isReset: false,
            searchTitle : '',
            filterUUID : '',
            itemParentID: this.props.model.figuredata && this.props.model.figuredata.interactiveparentid ? this.props.model.figuredata.interactiveparentid : "",
            openedFrom:'',
            interactiveTitle: this.props.model.figuredata && this.props.model.figuredata.interactivetitle? this.props.model.figuredata.interactivetitle : "",
        
           };

    }

    resetPage = (isReset, isSearch=false) => {
        this.setState({isReset})
        if(isReset && isSearch){
            this.setState({parentPageNo:1})
        } else if (isReset){
            this.setState({parentPageNo:1})
            this.setState({searchTitle:'', filterUUID:''})
        }
    }
    AssessmentSearchTitle = (searchTitle, filterUUID) => {
        this.setState({searchTitle, filterUUID},()=>{
            console.log("SetSate for filter", searchTitle + filterUUID)
        });
    }

    componentDidMount(){
        this.setState({
            itemID : this.props.model.figuredata && this.props.model.figuredata.interactiveid ? this.props.model.figuredata.interactiveid : "",
            posterImage : this.props.model.figuredata && this.props.model.figuredata.posterimage && this.props.model.figuredata.posterimage.path ? this.props.model.figuredata.posterimage.path : "", 
            itemParentID: this.props.model.figuredata && this.props.model.figuredata.interactiveparentid ? this.props.model.figuredata.interactiveparentid : "",
            interactiveTitle: this.props.model.figuredata && this.props.model.figuredata.interactivetitle? this.props.model.figuredata.interactivetitle : "",
        
        })
    }
    /**
     * @description - This function is for accessing c2_assessment library for interactive.
     * @param {event} value
     */
     
    static getDerivedStateFromProps(nextProps, prevState) {
        if('figuredata' in nextProps.model && 'interactivetype' in nextProps.model.figuredata && nextProps.model.figuredata.interactivetype !== prevState.elementType) {
            return {
                itemID: nextProps.model.figuredata && nextProps.model.figuredata.interactiveid ? nextProps.model.figuredata.interactiveid : "",
                posterImage: null,
                imagePath : nextProps.model.figuredata && nextProps.model.figuredata.posterimage && nextProps.model.figuredata.posterimage.path ? nextProps.model.figuredata.posterimage.path : "",
                elementType: nextProps.model.figuredata.interactivetype || "",
                itemParentID:nextProps.model.figuredata && nextProps.model.figuredata.interactiveparentid ? nextProps.model.figuredata.interactiveparentid : "",
                interactiveTitle: nextProps.model.figuredata && nextProps.model.figuredata.interactivetitle? nextProps.model.figuredata.interactivetitle : "",
            };
        }

        return null;
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

            // case "mcq":
            //     divImage = 'divWidgetVideoMcq';
            //     figureImage = 'figureWidgetVideoMcq';
            //     heading4Label = 'heading4WidgetVideoMcqNumberLabel';
            //     heading4Title = 'heading4WidgetVideoMcqTitle';
            //     dataType = 'videoMcq';
            //     id = 'id-info';
            //     imageDimension = 'imageWidgetVideoMcq';
            //     figcaptionClass = 'figcaptionWidgetVideoMcq';
            //     paragraphCredit = 'paragraphWidgetVideoMcqCredit';
            //     break;

            case "pop-up-web-link":
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

            // case "web-link":
            //     divImage = 'divWidgetPUSL';
            //     figureImage = 'figureWidgetPUSL';
            //     heading4Label = 'heading4WidgetPUSLNumberLabel';
            //     heading4Title = 'heading4WidgetPUSLTitle';
            //     dataType = 'pusl';
            //     id = 'id-info';
            //     imageDimension = '';
            //     hyperlinkClass = 'buttonWidgetPUSL';
            //     figcaptionClass = 'figcaptionWidgetPUSL';
            //     paragraphCredit = 'paragraphWidgetPUSLCredit';
            //     break;

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

            case "guided-example":
                divImage = 'divWidgetGuidedExample';
                figureImage = 'figureWidgetGuidedExample';
                heading4Label = 'heading4WidgetGuidedExampleNumberLabel';
                heading4Title = 'heading4WidgetGuidedExampleTitle';
                dataType = 'guidedExample';
                id = 'id-info';
                imageDimension = 'imageWidgetGuidedExample';
                figcaptionClass = 'figcaptionWidgetGuidedExample';
                paragraphCredit = 'paragraphWidgetGuidedExampleCredit';
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
                                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className="paragraphShowHideWidgetQuestionText" placeholder="Enter shown text" tagName={'p'} 
                                     model={element.html.title} id={this.props.id} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                                    <p className="paragraphNumeroUno revealAns" resource="" aria-label="Reveal Answer">
                                    <a className="paragraphNumeroUno">
                                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} placeholder="Enter hidden text" 
                                        id={this.props.id} tagName={'p'}
                                        model={element.html.subtitle}  handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} /></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <figcaption className="figcaptionWidgetShowHide" resource=""></figcaption>
                </figure>
                <p className="paragraphWidgetShowHideCredit"></p>
            </div>
        }else if(context === 'video-mcq' || context === 'mcq' || context === "guided-example" ) {
            jsx = <div className={divImage} resource="">
                <figure className={figureImage} resource="">
                    <header>
                            <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                            <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </header>
                    <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{this.state.itemID?this.state.itemID : itemId}</div>
                    <div className={"pearson-component " + dataType} data-uri={this.state.itemID?this.state.itemID : itemId} data-type={dataType} data-width="600" data-height="399" onClick={(e)=>{this.togglePopup(e,true)}} >

                        <img src={this.state.imagePath ? this.state.imagePath : "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png"} title="View Image" alt=""
                            className={imageDimension + " lazyload"} />

                    </div>
                    <figcaption>
                        <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.captions} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.credits} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                </div>
            </div>
        }
        else {
            jsx = <div className={divImage} resource="">
                <figure className={figureImage} resource="">
                    <header>
                            <TinyMceEditor  permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
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
                                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    model={element.html.postertext? element.html.postertext : "" } handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} elementId={this.props.elementId} element={this.props.model}/>
                                 </a>
                        }
                    </div>
                    <figcaption>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.captions} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.credits} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} />
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
        if(hasReviewerRole()){
            return true;
        }
        
        if(this.props.model.figuredata.interactiveformat==="external-link"){
            if(e.target.classList.contains('actionPU')){
                return;
            }
            this.handleC2MediaClick(e);
        }
        else if(this.props.model.figuredata.interactiveformat === "mmi"){
            this.props.assessmentSorting("","");
            sendDataToIframe({ 'type': 'hideToc', 'message': {} });
            this.props.showBlocker(value);
            disableHeader(value);
            this.props.handleFocus();
            if (this.state.itemParentID && this.state.itemID) {
                this.props.setCurrentCiteTdx({
                    "versionUrn": this.state.itemParentID,
                    "name": this.state.interactiveTitle
                });
                this.props.setCurrentInnerCiteTdx({
                    "versionUrn": this.state.itemID
                });
                this.setState({
                    showSinglePopup: value,
                    setCurrentAssessment: {
                        id: this.state.itemParentID,
                        title: this.state.interactiveTitle,
                    },
                    openedFrom: 'singleAssessment'
                });
            }
            else {
                this.setState({
                    showAssessmentPopup: value
                });
            }
        }
        else {
            this.props.showBlocker(value);
            disableHeader(value);
            value ? showTocBlocker(value) : hideTocBlocker(value)
            this.props.handleFocus();
            this.setState({ showAssesmentpopup: value })
        }
    }

    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        this.props.showBlocker(false);
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

            if (smartLinkType.toLowerCase() === "website" || smartLinkType.toLowerCase() === "pdf" || smartLinkType.toLowerCase() === "3rd party interactive" || smartLinkType.toLowerCase() === "metrodigi interactive" || smartLinkType.toLowerCase() === "table"|| smartLinkType.toLowerCase() === "mdpopup" ) {
                let interactivetype="3rd-party"
                switch(smartLinkType.toLowerCase()){
                    case "website":
                        interactivetype="web-link"
                        break;
                    case "pdf":
                        interactivetype="pdf"
                        break;
                    case "3rd party interactive":
                        interactivetype="3rd-party"
                        break;
                    case "table":
                        interactivetype="table"
                        break;
                    case "mdpopup":
                        interactivetype="pop-up-web-link"
                        break;
                }
                // let posterURL = imageData['posterImageUrl'] || 'https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png';
                if (epsURL == "" || epsURL == undefined) {
                    epsURL = imageData['posterImageUrl'] ? imageData['posterImageUrl'] : "https://cite-media-stg.pearson.com/legacy_paths/32bbc5d4-f003-4e4b-a7f8-3553b071734e/FPO-interactive.png";
                }
                let vendorName = imageData['vendorName'];
                let mobileready = imageData['smartlinkoptimizedmobileval'];

                this.setState({ itemID: uniqueIDInteractive, posterImage: epsURL })
                let figuredata = {
                    height: height,
                    width: width,
                    mobileready: mobileready,
                    schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                    interactiveid: uniqueIDInteractive,
                    interactivetype: interactivetype,
                    interactiveformat: "external-link",
                    vendor: vendorName,
                    posterimage: {
                        "imageid": uniqueIDInteractive,
                        "path": epsURL
                    },
                    "path": smartLinkPath[0]
                }
                this.props.updateFigureData(figuredata, this.props.index, this.props.elementId,()=>{
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
        !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
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
        if(hasReviewerRole()){
            return true
        }
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        var data_1 = false;
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath.alfresco.nodeRef) {         //if alfresco location is available
            if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco'))    { 
            data_1 = alfrescoPath.alfresco;
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
            }
            else{
                this.props.accessDenied(true)
            }
        }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                    data_1 = { ...alfrescoData };
                    let request = {
                        eTag: alfrescoPath.etag,
                        projectId: alfrescoPath.id,
                        ...alfrescoPath,
                        additionalMetadata: { ...alfrescoData },
                        alfresco: { ...alfrescoData }
                    };

                    /*
                        preparing data according to Project api
                    */

                    request.additionalMetadata['repositoryName'] = data_1['repoName'];
                    request.additionalMetadata['repositoryFolder'] = data_1['name'];
                    request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                    request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                    request.alfresco['repositoryName'] = data_1['repoName'];
                    request.alfresco['repositoryFolder'] = data_1['name'];
                    request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                    request.alfresco['visibility'] = data_1['siteVisibility'];

                    that.handleC2ExtendedClick(data_1)
                    /*
                        API to set alfresco location on dashboard
                    */
                    let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                    let SSOToken = request.ssoToken;
                    return axios.patch(url, request.alfresco,
                        {
                            headers: {
                                'Accept': 'application/json',
                                'ApiKey': config.STRUCTURE_APIKEY,
                                'Content-Type': 'application/json',
                                'PearsonSSOSession': SSOToken,
                                'If-Match': request.eTag
                            }
                        })
                        .then(function (response) {
                            let tempData = { alfresco: alfrescoData };
                            that.setState({
                                projectMetadata: tempData
                            })
                        })
                        .catch(function (error) {
                            console.log("error", error)
                        });
                })
            }
            else {
                this.props.accessDenied(true)
            }
        }

    }
    /*** @description - This function is to close CITE/TDX PopUp
    */
   closeWindowAssessment = () => {
    this.props.setCurrentCiteTdx({});
    this.props.setCurrentInnerCiteTdx({});
    this.setState({
        showAssessmentPopup: false,
        showSinglePopup:false,
    });
    hideTocBlocker();
    disableHeader(false);
    this.props.showBlocker(false);
    }
    assessmentNavigateBack = () => {
        this.props.setCurrentInnerCiteTdx({});
        if(this.state.openedFrom === "singleAssessment"){
            this.props.setCurrentCiteTdx({});
        }
        this.setState({
            showAssessmentPopup: true,
            showSinglePopup:false,
            openedFrom:''
        });
    }

    addCiteTdxAssessment = async(citeTdxObj, parentPageNo=1) => {
        showTocBlocker();
        disableHeader(true);
        if(citeTdxObj.slateType === "singleSlateAssessment"){
            this.setState({
                showSinglePopup: true,
                setCurrentAssessment: citeTdxObj,
                showAssessmentPopup:false,
                parentPageNo
            })
        }
        else{
            let itemId = citeTdxObj.singleAssessmentID.versionUrn ? citeTdxObj.singleAssessmentID.versionUrn : "";
            let interactiveData ={};
            let tempInteractiveType = citeTdxObj.singleAssessmentID.taxonomicTypes ?String.prototype.toLowerCase.apply(citeTdxObj.singleAssessmentID.taxonomicTypes).split(","):"cite-interactive-video-with-interactive";
            tempInteractiveType = utils.getTaxonomicType(tempInteractiveType);
            if(tempInteractiveType === 'video-mcq' || tempInteractiveType === 'guided-example'){
               await getMCQGuidedData(itemId).then((responseData) => {
                    if(responseData && responseData['data'] && responseData['data']["thumbnail"]){
                        interactiveData['imageId'] = responseData['data']["thumbnail"]['id'];
                        interactiveData['path'] = responseData['data']["thumbnail"]['src'];
                        interactiveData['alttext'] = responseData['data']["thumbnail"]['alt'];
                    }
                })
            }
            let posterImage = {};
            posterImage['imageid'] = interactiveData['imageId'] ? interactiveData['imageId'] : '';
            posterImage['path'] = interactiveData['path'] ? interactiveData['path'] : '';
            let alttext = interactiveData['alttext'] ? interactiveData['alttext'] : '';
            let that = this;
           
               let figureData = {
                   schema: "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
                   interactiveid: citeTdxObj.singleAssessmentID.versionUrn,
                   interactiveparentid:citeTdxObj.id,
                   interactivetitle:citeTdxObj.title,
                   interactivetype: tempInteractiveType,
                   interactiveformat: "mmi"
               }
            if(tempInteractiveType === 'video-mcq' || tempInteractiveType === 'guided-example'){
                figureData.posterimage = posterImage;
                figureData.alttext = alttext;  
                
            }
            that.setState({itemID : itemId,
                imagePath:posterImage.path,
                itemParentID:citeTdxObj.id,
                interactivetitle:citeTdxObj.title
               })
          
               that.props.updateFigureData(figureData, that.props.index, that.props.elementId,()=>{               
                   that.props.handleFocus("updateFromC2");
                   setTimeout(()=>{
                       that.props.handleBlur()
                   },300)
                  
               })
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
                        {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} parentPageNo={this.state.parentPageNo} resetPage={this.resetPage} isReset={this.state.isReset} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />:""}
                        {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack} resetPage={this.resetPage}/>:""}
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
const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting:assessmentSorting
}

export default connect(
    null,
    mapActionToProps
)(Interactive);