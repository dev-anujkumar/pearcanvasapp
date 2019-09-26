/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import { TinyMceEditor } from "../tinyMceEditor"


/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/
class Interactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    /**
     * @description - This function is for rendering the Jsx Part of different Interactive Elements.
     * @param {event} element
     * @param {event} itemId
     * @param {event} index
     */

    renderInteractiveType = (element, itemId, index) => {
        let jsx, divImage, figureImage, heading4Label, heading4Title, dataType, id, imageDimension, figcaptionClass, paragraphCredit, hyperlinkClass,path;
        var context = element && element.figuredata && element.figuredata.interactivetype;
        switch (context) {

            case "fpo":
                divImage = 'divImageTextWidth',
                    figureImage = 'figureImageTextWidth',
                    heading4Label = 'heading4ImageTextWidthNumberLabel',
                    heading4Title = 'heading4ImageTextWidthTitle',
                    dataType = 'image',
                    id = 'id-info'
                imageDimension = 'imageTextWidth',
                    figcaptionClass = 'figcaptionImageTextWidth',
                    paragraphCredit = 'paragraphImageTextWidthCredit';
                break;

            case "flashcards":
                divImage = 'divWidgetFlashcards',
                    figureImage = 'figureWidgetFlashcards',
                    heading4Label = 'heading4WidgetFlashcardsNumberLabel',
                    heading4Title = 'heading4WidgetFlashcardsTitle',
                    dataType = 'flashcards',
                    id = 'id-info'
                imageDimension = 'imageWidgetFlashcards',
                    figcaptionClass = 'figcaptionWidgetFlashcards',
                    paragraphCredit = 'paragraphWidgetFlashcardsCredit';
                break;

            case "pdf":
                divImage = 'divWidgetPDF',
                    figureImage = 'figureWidgetPDF',
                    heading4Label = 'heading4WidgetPDFNumberLabel',
                    heading4Title = 'heading4WidgetPDFTitle',
                    dataType = 'pdf',
                    id = 'id-info'
                imageDimension = '',
                    hyperlinkClass = 'buttonWidgetPDF',
                    path = 'PATH: '
                    figcaptionClass = 'figcaptionWidgetPDF',
                    paragraphCredit = 'paragraphWidgetPDFCredit';
                break;

            case "3rd-party":
                divImage = 'divWidget3PI',
                    figureImage = 'figureWidget3PI',
                    heading4Label = 'heading4Widget3PINumberLabel',
                    heading4Title = 'heading4Widget3PITitle',
                    dataType = '3pi',
                    id = 'id-info'
                imageDimension = 'imageWidget3PI',
                    figcaptionClass = 'figcaptionWidget3PI',
                    paragraphCredit = 'paragraphWidget3PICredit';
                break;

            case "graph":
                divImage = 'divWidgetGraph',
                    figureImage = 'figureWidgetVidSlideshow',
                    heading4Label = 'heading4WidgetGraphNumberLabel',
                    heading4Title = 'heading4WidgetGraphTitle',
                    dataType = 'graph',
                    id = 'id-info'
                imageDimension = 'imageWidgetGraph',
                    figcaptionClass = 'figcaptionWidgetGraph',
                    paragraphCredit = 'paragraphWidgetGraphCredit';
                break;

            case "simulation":
                divImage = 'divWidgetUCA',
                    figureImage = 'figureWidgetUCA',
                    heading4Label = 'heading4WidgetUCANumberLabel',
                    heading4Title = 'heading4WidgetUCATitle',
                    dataType = 'uca',
                    id = 'id-info'
                imageDimension = 'imageWidgetUCA',
                    figcaptionClass = 'figcaptionWidgetUCA',
                    paragraphCredit = 'paragraphWidgetUCACredit';
                break;

            case "survey":
                divImage = 'divWidgetSurvey',
                    figureImage = 'figureWidgetSurvey',
                    heading4Label = 'heading4WidgetSurveyNumberLabel',
                    heading4Title = 'heading4WidgetSurveyTitle',
                    dataType = 'uca',
                    id = 'id-info'
                imageDimension = 'imageWidgetSurvey',
                    figcaptionClass = 'figcaptionWidgetSurvey',
                    paragraphCredit = 'paragraphWidgetSurveyCredit';
                break;

            case "timeline":
                divImage = 'divWidgetTimeline',
                    figureImage = 'figureWidgetTimeline',
                    heading4Label = 'heading4WidgetTimelineNumberLabel',
                    heading4Title = 'heading4WidgetTimelineTitle',
                    dataType = 'timeline',
                    id = 'id-info'
                imageDimension = 'imageWidgetTimeline',
                    figcaptionClass = 'figcaptionWidgetTimeline',
                    paragraphCredit = 'paragraphWidgetTimelineCredit';
                break;

            case "hotspot":
                divImage = 'divWidgetHotspot',
                    figureImage = 'figureWidgetHotspot',
                    heading4Label = 'heading4WidgetHotspotNumberLabel',
                    heading4Title = 'heading4WidgetHotspotTitle',
                    dataType = 'hotspot',
                    id = 'id-info'
                imageDimension = 'imageWidgetHotspot',
                    figcaptionClass = 'figcaptionWidgetHotspot',
                    paragraphCredit = 'paragraphWidgetHotspotCredit';
                break;

            case "accountingtable":
                divImage = 'divWidgetAccountingtable',
                    figureImage = 'figureWidgetAccountingtable',
                    heading4Label = 'heading4WidgetAccountingtableNumberLabel',
                    heading4Title = 'heading4WidgetAccountingtableTitle',
                    dataType = 'accountingtable',
                    id = 'id-info'
                imageDimension = 'imageWidgetAccountingtable',
                    figcaptionClass = 'figcaptionWidgetAccountingtable',
                    paragraphCredit = 'paragraphWidgetAccountingtableCredit';
                break;

            case "fill-in-blank":
                divImage = 'divWidgetFIB',
                    figureImage = 'figureWidgetFIB',
                    heading4Label = 'heading4WidgetFIBNumberLabel',
                    heading4Title = 'heading4WidgetFIBTitle',
                    dataType = 'fib',
                    id = 'id-info'
                imageDimension = 'imageWidgetFIB',
                    figcaptionClass = 'figcaptionWidgetFIB',
                    paragraphCredit = 'paragraphWidgetFIBCredit';
                break;

            case "gallery-image":
                divImage = 'divWidgetImgSlideshow',
                    figureImage = 'figureWidgetImgSlideshow',
                    heading4Label = 'heading4WidgetImgSlideshowNumberLabel',
                    heading4Title = 'heading4WidgetImgSlideshowTitle',
                    dataType = 'imgSlideshow',
                    id = 'id-info'
                imageDimension = 'imageWidgetImgSlideshow',
                    figcaptionClass = 'figcaptionWidgetImgSlideshow',
                    paragraphCredit = 'paragraphWidgetImgSlideshowCredit';
                break;

            case "gallery-video":
                divImage = 'divWidgetVidSlideshow',
                    figureImage = 'figureWidgetVidSlideshow',
                    heading4Label = 'heading4WidgetVidSlideshowNumberLabel',
                    heading4Title = 'heading4WidgetVidSlideshowTitle',
                    dataType = 'vidSlideshow',
                    id = 'id-info'
                imageDimension = 'imageWidgetVidSlideshow',
                    figcaptionClass = 'figcaptionWidgetVidSlideshow',
                    paragraphCredit = 'paragraphWidgetVidSlideshowCredit';
                break;

            case "video-mcq":
                divImage = 'divWidgetVideoMcq',
                    figureImage = 'figureWidgetVideoMcq',
                    heading4Label = 'heading4WidgetVideoMcqNumberLabel',
                    heading4Title = 'heading4WidgetVideoMcqTitle',
                    dataType = 'videoMcq',
                    id = 'id-info'
                imageDimension = 'imageWidgetVideoMcq',
                    figcaptionClass = 'figcaptionWidgetVideoMcq',
                    paragraphCredit = 'paragraphWidgetVideoMcqCredit';
                break;

            case "mcq":
                divImage = 'divWidgetVideoMcq',
                    figureImage = 'figureWidgetVideoMcq',
                    heading4Label = 'heading4WidgetVideoMcqNumberLabel',
                    heading4Title = 'heading4WidgetVideoMcqTitle',
                    dataType = 'videoMcq',
                    id = 'id-info'
                imageDimension = 'imageWidgetVideoMcq',
                    figcaptionClass = 'figcaptionWidgetVideoMcq',
                    paragraphCredit = 'paragraphWidgetVideoMcqCredit';
                break;

            case "pop-up-web-link":
                divImage = 'divWidgetPUSL',
                    figureImage = 'figureWidgetPUSL',
                    heading4Label = 'heading4WidgetPUSLNumberLabel',
                    heading4Title = 'heading4WidgetPUSLTitle',
                    dataType = 'pusl',
                    id = 'id-info'
                imageDimension = '',
                    hyperlinkClass = 'buttonWidgetPUSL',
                    figcaptionClass = 'figcaptionWidgetPUSL',
                    paragraphCredit = 'paragraphWidgetPUSLCredit';
                break;

            case "web-link":
                divImage = 'divWidgetPUSL',
                    figureImage = 'figureWidgetPUSL',
                    heading4Label = 'heading4WidgetPUSLNumberLabel',
                    heading4Title = 'heading4WidgetPUSLTitle',
                    dataType = 'pusl',
                    id = 'id-info'
                imageDimension = '',
                    hyperlinkClass = 'buttonWidgetPUSL',
                    figcaptionClass = 'figcaptionWidgetPUSL',
                    paragraphCredit = 'paragraphWidgetPUSLCredit';
                break;

            case "table":
                divImage = 'divWidgetTableSL',
                    figureImage = 'figureWidgetTableSL',
                    heading4Label = 'heading4WidgetTableSLNumberLabel',
                    heading4Title = 'heading4WidgetTableSLTitle',
                    dataType = 'tablesl',
                    id = 'id-info'
                imageDimension = 'imageWidgetTableSL',
                    hyperlinkClass = '',
                    figcaptionClass = 'figcaptionWidgetTableSL',
                    paragraphCredit = 'paragraphWidgetTableSLCredit';
                break;

            case "popup":
                divImage = 'divWidgetPU',
                    figureImage = 'figureWidgetPU',
                    heading4Label = 'heading4WidgetPUNumberLabel',
                    heading4Title = 'heading4WidgetPUTitle',
                    dataType = 'pu',
                    id = 'id-info'
                imageDimension = '',
                    hyperlinkClass = 'buttonWidgetPU',
                    figcaptionClass = 'figcaptionWidgetPU',
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
                                    <TinyMceEditor index={`${index}-0`} className="paragraphShowHideWidgetQuestionText" placeholder="Enter shown text" tagName={'p'} 
                                     onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} id={this.props.id} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                                    <p className="paragraphNumeroUno revealAns" resource="" aria-label="Reveal Answer">
                                    <a className="paragraphNumeroUno">
                                        <TinyMceEditor index={`${index}-1`} placeholder="Enter hidden text" 
                                        onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} id={this.props.id} tagName={'p'}
                                        handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur}/></a>
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
                            <TinyMceEditor index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} 
                             onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                            <TinyMceEditor index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} 
                             onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                    </header>
                    <div className={id}><strong>{path ? path : 'ITEM ID: '} </strong>{itemId}</div>
                    <div className={"pearson-component " + dataType} data-uri="" data-type={dataType} data-width="600" data-height="399" >
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
                                    <TinyMceEditor index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                                 </a>
                        }
                    </div>
                    <figcaption>
                        <TinyMceEditor index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     onFocus={this.onFocus} onKeyup={this.onKeyup} onBlur={this.onBlur} onClick={this.onClick} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} />
                </div>
            </div>
        }
        return jsx;
    }




    render() {
        const { model, itemId, index } = this.props;
        return (
            <div className="interactive-element">
                {this.renderInteractiveType(model, itemId,index)}
            </div>
        )
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