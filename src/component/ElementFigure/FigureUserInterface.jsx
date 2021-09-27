import React, { Component } from 'react';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
// IMPORT - Assets //
import { getAlfrescositeResponse } from './AlfrescoSiteUrl_helper.js';
import { getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, removeUnoClass } from '../../constants/utility';
import './../../styles/ElementFigure/FigureUserInterface.css';
import { updateSmartLinkDataForCompare, updateAudioVideoDataForCompare } from '../ElementContainer/ElementContainer_Actions';
import { connect } from 'react-redux';
import videoReel from '../../images/ElementButtons/videoReel.png';
import audioReel from '../../images/ElementButtons/audioReel.png';
import updateVideoReel from '../../images/ElementButtons/updateVideoReel.png';
import updateAudioReel from '../../images/ElementButtons/updateAudioReel.png';
import {videoIcon, figureAudioIcon, smartlinkIcon} from '../../images/ElementButtons/ElementButtons.jsx';
import pdSLfPosterImage from '../../images/ElementButtons/pdSLfPosterImage.png';
import slPosterImage from '../../images/ElementButtons/slPosterImage.png'
import  figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import { labelHtmlData } from '../../constants/Element_Constants';
import figureData from './figureTypes';
import interactiveTypeData from '../ElementInteractive/interactiveTypes.js';
import { AUDIO, VIDEO, INTERACTIVE, DEFAULT_VIDEO_POSTER_IMAGE } from '../../constants/Element_Constants';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];
const BLANK_PARA_VALUES = ['<p></p>', '<p><br></p>', '<p><br/></p>', '<br data-mce-bogus="1">', '<p><br data-mce-bogus="1"></p>'];

class FigureUserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alfrescoSite: '',
            figureLabelValue: 'No Label',
            figureLabelData: [],
            figureDropDown: false,
            elementType: ''
        }
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        getAlfrescositeResponse(this.props.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title
            })
        })
        this.updateDropdownOptions();
        let figureHtmlData = getLabelNumberTitleHTML(this.props.element);
        let figureLabelValue = this.state;
        figureLabelValue = dropdownValueAtIntialize(this.state.figureLabelData, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
        if (this.props.element.figuretype === 'interactive') {
            this.props.updateSmartLinkDataForCompare(this.props.element.figuredata);
        } else if (this.props.element.figuretype === 'audio' || this.props.element.figuretype === 'video') {
            this.props.updateAudioVideoDataForCompare(this.props.element.figuredata);
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.element.figuretype !== this.state.elementType) {
            this.updateDropdownOptions();
        }
    }

    updateDropdownOptions = () => {
        let figureLabelData = [];
        switch (this.props.element.figuretype) {
            case AUDIO:
                figureLabelData = this.props.figureDropdownData.audio;
                break;
            case VIDEO:
                figureLabelData = this.props.figureDropdownData.video;
                break;
            case INTERACTIVE:
                figureLabelData = this.props.figureDropdownData.smartlinks;
                break;
            default:
                figureLabelData = [];
                break;
        }
        this.setState({ 
            figureLabelData: figureLabelData,
            elementType: this.props.element.figuretype
        });
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
            this.handleCloseDropDrown();
        }
    }

    changeFigureLabel = (figureLabelValue, data) => {
        if (!(figureLabelValue === data)) {
            this.setState({ figureLabelValue: data });
            let dropdownOptions = [];
            for (let option of this.state.figureLabelData) {
                if (!BLANK_LABEL_OPTIONS.includes(option)) {
                    dropdownOptions.push(option);
                }
            }
            if (dropdownOptions.includes(data)) {
                document.getElementById(`cypress-${this.props.index}-0`).innerHTML = `${data}`;
            } else {
                document.getElementById(`cypress-${this.props.index}-0`).innerHTML = '';
            }
            this.props.handleBlur();
        }
    }

    handleFigureDropdown = () => {
        this.props.handleFocus();
        this.setState({
            figureDropDown: !this.state.figureDropDown
        })
    }

    handleCloseDropDrown = () => {
        this.setState({
            figureDropDown: false
        })
    }

    onFigureElementFieldFocus = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) { // BG-5075
            labelElement?.nextElementSibling?.classList?.add('transition-none');
        }
        if (this.props.element.figuretype === 'interactive') {
            this.props.updateSmartLinkDataForCompare(this.props.element.figuredata);
        } else if (this.props.element.figuretype === 'audio' || this.props.element.figuretype === 'video') {
            this.props.updateAudioVideoDataForCompare(this.props.element.figuredata);
        }
        if (!labelElement?.classList.contains('actionPU')) {
            let buttonIndex = this.getIdOfButton(id);
            this.toggleHyperlinkEditable('hide', buttonIndex);
        }
    }

    onFigureElementFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.remove('transition-none');
        }
        if (id === '0-0' && labelElement?.innerHTML) {
            let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
            if (dropdownData.indexOf(labelElement?.innerHTML.toLowerCase()) > -1) {
                let { figureLabelValue } = this.state;
                let labelElementText = labelElement?.innerHTML.toLowerCase();
                figureLabelValue = labelElementText.charAt(0).toUpperCase() + labelElementText.slice(1);
                this.setState({ figureLabelValue: figureLabelValue });
            }
        }
        if (labelElement?.classList.contains('actionPU')) {
            let buttonIndex = this.getIdOfButton(id);
            this.toggleHyperlinkEditable('hide', buttonIndex);
        }
    }

    getIdOfButton = (index) => {
        let indexToReturn = '';
        let indexes = index.split('-');
        for (let i=0; i<(indexes.length-1); i++) {
            if (i === 0) {
                indexToReturn += indexes[0]; 
            } else {
                indexToReturn += `-${indexes[i]}`;
            }
        }
        return indexToReturn;
    }

    convertOptionsToLowercase = (Options) => {
        let lowercaseOptions = [];
        if (Options?.length > 0) {
            for (let option of Options) {
                if (!BLANK_LABEL_OPTIONS.includes(option)) {
                    lowercaseOptions.push(option.toLowerCase());
                }
            }
        }
        return lowercaseOptions;
    }

    generateAddAssetJSX = ( assetIcon, assetTitleText, addButtonText, assetBackgroundType, assetIdText, assetPathText) => {
        return (
            <div className="media-wrapper">
                <div className='videoIconWrapper'>
                    <div className="icon-wrapper">
                        <span className='videoIcon' >{assetIcon}</span>
                        <span className='videoTitle'>{assetTitleText}</span>
                    </div>
                    <div className="media-image-info">
                        <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> </span> </div>
                        <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> </span> </div>
                        <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'> </span> </div>
                    </div>
                </div>
                <div className="media-assets">
                    <div className='addVideobutton' onClick={this.props.handleC2MediaClick}>{addButtonText}</div>
                    <div className='videoReel'><img width="100%" height="164px" src={assetBackgroundType} />
                    </div>
                </div>
            </div>
        )
    }

    generateUpdateAssetJSX = (element, assetTitleText, assetIcon, assetPath, assetBackgroundType, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite) => {
        return (
            <div className='figure-wrapper-update'>
                <div className='videoIconWrapper'>
                    <div className="update-icon-wrapper">
                        <span className='videoIcon' >{assetIcon}</span>
                        <p className='updateVideoTitle' >{assetTitleText}</p>
                    </div>
                    <div className="media-button-group">
                        <div className='update-figure-button' onClick={this.props.handleC2MediaClick}>{updateButtonText}</div>
                        <div className={`delete-figure-button ${element.figuretype === "interactive" ? 'deleteSL' : ''}`} onClick={() => this.props.deleteElementAsset(element)}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                    </div>
                    <div className="media-image-info">
                        <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                        <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : ""}</span> </div>
                        <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? alfrescoSite && (alfrescoSite !== '' || alfrescoSite !== undefined) ? alfrescoSite : this.state.alfrescoSite : ""} </span> </div>
                    </div>
                </div>
                <div className="media-assets">
                    {this.generatePosterImageJSX(element, assetBackgroundType)}
                </div>
            </div>
        )
    }

    generatePosterImageJSX = (element, assetBackgroundType) => {
        let posterJsx;
        switch (element.figuretype) {
            case AUDIO:
                posterJsx = <div className='videoReel'><img width="246px" height="164px" src={assetBackgroundType} /></div>
                break;
            case VIDEO:
                posterJsx = element.figuredata?.posterimage?.path ?
                    <video className="videoReel" width="246px" height="164px" controls="none" preload="none"
                        poster={element?.figuredata?.posterimage?.path}>
                        <source src="" />
                        <track src="" kind="subtitles" srcLang="en" label="English" />
                    </video>
                    :
                    <div className='videoReel'><img width="246px" height="164px" src={assetBackgroundType} /></div>
                break;
            case INTERACTIVE:
                posterJsx = element.figuredata?.posterimage?.path ?
                    <div className="videoReel">
                        <img width="246px" height="164px" src={element.figuredata?.posterimage?.path} />
                    </div>
                    :
                    <div className='videoReel'><img width="246px" height="164px" src={assetBackgroundType} /></div>
                break;
        }
        return posterJsx;
    }

    renderAssetSection = (element, assetId, assetTitleText, assetIdText, assetPath, assetPathText, addButtonText, updateButtonText, alfrescoSite) => {
        let assetJsx;
        switch (element.figuretype) {
            case AUDIO:
                assetJsx =
                    assetId ?
                        this.generateUpdateAssetJSX(element, assetTitleText, figureAudioIcon, assetPath, updateAudioReel, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite) 
                        :
                        this.generateAddAssetJSX(figureAudioIcon, assetTitleText, addButtonText, audioReel, assetIdText, assetPathText)
                break;
            case VIDEO:
                assetJsx =
                    assetId ?
                        this.generateUpdateAssetJSX(element, assetTitleText, videoIcon, assetPath, updateVideoReel, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite)
                        :
                        this.generateAddAssetJSX(videoIcon, assetTitleText, addButtonText, videoReel, assetIdText, assetPathText)
                break;
            case INTERACTIVE:
                assetJsx = element.figuredata.interactivetype !== 'pdf' ?
                    (
                        assetId ?
                            this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, slPosterImage, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite)
                            :
                            this.generateAddAssetJSX(smartlinkIcon, assetTitleText, addButtonText, slPosterImage, assetIdText, assetPathText)
                    )
                    :
                    (
                        assetId ?
                            this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, pdSLfPosterImage, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite)
                            :
                            this.generateAddAssetJSX(smartlinkIcon, assetTitleText, addButtonText, pdSLfPosterImage, assetIdText, assetPathText)
                    )
                break;
        }
        return assetJsx;
    }

    toggleHyperlinkEditable = (value, id) => {
        let buttonElementDiv = document.getElementsByClassName(`Rectangle-button ${id}`);
        let hyperlinkTextDiv = document.getElementsByClassName(`actionPUdiv ${id}`);
        if (value === 'show') {
            buttonElementDiv[0]?.classList?.add('hide-field');
            hyperlinkTextDiv[0]?.classList?.remove('hide-field');
        } else {
            buttonElementDiv[0]?.classList?.remove('hide-field');
            hyperlinkTextDiv[0]?.classList?.add('hide-field');
        }
    }

    render() {
        const { element, permissions, openGlossaryFootnotePopUp, handleFocus, handleBlur, index, slateLockInfo, glossaryFootnoteValue, glossaaryFootnotePopup, elementId, alfrescoSite } = this.props;
        let figureHtmlData = getLabelNumberTitleHTML(element);
        let { figureLabelValue } = this.state;
        let figureLabelFromApi = checkHTMLdataInsideString(figureHtmlData.formattedLabel);
        let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
        
        if (dropdownData.indexOf(figureLabelFromApi.toLowerCase()) > -1) {
            figureLabelFromApi = figureLabelFromApi.toLowerCase();
            figureLabelValue = figureLabelFromApi.charAt(0).toUpperCase() + figureLabelFromApi.slice(1);
        } else if (figureLabelFromApi === '' && figureLabelValue === 'No Label') {
            figureLabelValue = 'No Label';
        } else if ((figureLabelFromApi !== '' && figureLabelValue === 'Custom') || (dropdownData.length === 0 && figureLabelFromApi !== '')) {
            figureLabelValue = 'Custom';
        }

        let divClass, figureClass, figLabelClass, figNumberClass, figTitleClass, dataType, captionDivClass, figCaptionClass, figCreditClass, id, imageDimension, hyperlinkClass;
        switch (element.figuretype) {
            case AUDIO:
            case VIDEO:
                let figureType = figureData[element['figuretype']]
                divClass = figureType['divClass'];
                figureClass = figureType['figureClass'];
                figLabelClass = figureType['figLabelClass'];
                figNumberClass = figureType['figNumberClass'];
                figTitleClass = figureType['figTitleClass'];
                dataType = figureType['dataType'];
                captionDivClass = figureType['captionDivClass'];
                figCaptionClass = figureType['figCaptionClass'];
                figCreditClass = figureType['figCreditClass'];
                break;
            case INTERACTIVE:
                let interactiveData = interactiveTypeData[element?.figuredata?.interactivetype];
                divClass = interactiveData['divImage'];
                figureClass = interactiveData['figureImage'];
                figLabelClass = 'heading4VideoNumberLabel figureLabel ';
                figNumberClass = 'heading4VideoNumberLabel figureNumber ';
                figTitleClass = 'heading4VideoTitle figureTitle';
                dataType = interactiveData['dataType'];
                id = interactiveData['id'];
                imageDimension = interactiveData['imageDimension'];
                captionDivClass = '';
                figCaptionClass = 'figureCaption';
                figCreditClass = 'paragraphVideoCredit figureCredit';
                hyperlinkClass = interactiveData['hyperlinkClass'] ? interactiveData['hyperlinkClass'] : "";
                break;
        }
        
        let assetId, assetTitleText, addButtonText, assetIdText, assetPathText, updateButtonText, assetPath;
        switch (element.figuretype) {
            case AUDIO:
                assetId = element.figuredata.hasOwnProperty('audioid') && element.figuredata.audioid ? element.figuredata.audioid : '';
                assetTitleText = 'Audio';
                addButtonText = "Add an Audio";
                assetIdText = "Audio ID:";
                assetPathText = "Audio Path:";
                updateButtonText = "Update Audio";
                assetPath = element.figuredata.audio?.path ? element.figuredata.audio.path : element.figuredata.posterimage.path;
                break;
            case VIDEO:
                assetId = element.figuredata.hasOwnProperty('videoid') && element.figuredata.videoid ? element.figuredata.videoid : '';
                assetTitleText =  "Video" // assetId ? element.figuredata?.videos[0]?.path : 'Video'; commented for future reference
                addButtonText = "Add a Video";
                assetIdText = "Video ID:";
                assetPathText = "Video Path:";
                updateButtonText = "Update Video";
                assetPath = element.figuredata.videos[0]?.path ? element.figuredata.videos[0]?.path : element.figuredata.posterimage.path;
                break;
            case INTERACTIVE:
                assetId = element.figuredata.interactiveid ? element.figuredata.interactiveid : '';
                assetTitleText = element.figuredata?.interactivetitle ? element.figuredata?.interactivetitle : element.figuredata?.path ? element.figuredata?.path : 'Smart link Title';
                addButtonText = "Add a Smart Link";
                assetIdText = "Asset ID:";
                assetPathText = "Asset Path:";
                updateButtonText = "Update Smart Link";
                assetPath = element.figuredata.path ? element.figuredata.path : '';
                break;
        }
        let posterText;
        if (element.figuretype === INTERACTIVE && imageDimension === '') {
            posterText = element.html.postertext && !BLANK_PARA_VALUES.includes(element.html.postertext) ? checkHTMLdataInsideString(element.html.postertext).replace(/&nbsp;/g, "") : '';
            let testTextarea = document.createElement("textarea");
            testTextarea.innerHTML = posterText;
            posterText = testTextarea.value;
        }

        let captionsHtml = removeUnoClass(element.html.captions);
        let creditsHtml = removeUnoClass(element.html.credits);

        return (
            <div className="figureElement">
                <div className='figure-image-wrapper'>
                    <div className={divClass} resource="">
                        <figure className={figureClass} resource="">
                            <header className="figure-header new-figure-image-header">
                                <div className='figure-label-field'>
                                    <span className={`label ${this.state.figureDropDown ? 'active' : ''}`}>Label</span>
                                    <div className="figure-label" onClick={this.handleFigureDropdown}>
                                        <span>{figureLabelValue}</span>
                                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                                    </div>
                                </div>
                                {this.state.figureDropDown &&
                                    <div className="figure-dropdown" ref={this.wrapperRef}>
                                        <ul>
                                            {this.state.figureLabelData.map((label, i) => {
                                                return (
                                                    <li key={i} onClick={() => { this.changeFigureLabel(figureLabelValue, label); this.handleCloseDropDrown() }}>{label}</li>
                                                )

                                            })}
                                        </ul>
                                    </div>
                                }
                                {
                                    figureLabelValue === 'Custom' ?
                                        <div className='image-label'>
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                        </div>
                                        :
                                        <div className='image-label hide-field'>
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass} model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                        </div>
                                }

                                <div className="floating-number-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-1`} placeholder="Number" tagName={'h4'} className={figNumberClass} model={figureHtmlData.formattedNumber} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                    <label className={checkHTMLdataInsideString(figureHtmlData.formattedNumber) ? "transition-none" : "floating-number"}>Number</label>
                                </div>

                            </header>
                            <div className="floating-title-group">
                                <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass} model={figureHtmlData.formattedTitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
                            </div>
                            {
                                    element.figuretype === INTERACTIVE && imageDimension === '' ?
                                        <div>
                                            <div className={`Rectangle-button ${index}`} onClick={() => this.toggleHyperlinkEditable('show', index)} >
                                                <span className="Enter-Button-Label">{posterText ? posterText : "Enter Button Label"}</span>
                                            </div>
                                            <div className={`hide-field actionPUdiv ${index}`} >
                                                <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} index={`${index}-3`} placeholder="Enter Button Label" className={"actionPU hyperLinkText"} tagName={'p'} model={element.html.postertext ? element.html.postertext : ""} handleEditorFocus={handleFocus} handleBlur={handleBlur} slateLockInfo={slateLockInfo} elementId={elementId} element={element} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            </div>
                                        </div>
                                        :
                                        null
                            }
                            <div className="figure-element-container interface-container">
                                <div id="figure_add_div" className={`pearson-component image figureData ${element.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                                    {this.renderAssetSection(element, assetId, assetTitleText, assetIdText, assetPath, assetPathText, addButtonText, updateButtonText, alfrescoSite)}
                                </div>
                            </div>
                            <figcaption className={captionDivClass} >
                                <div className="floating-caption-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-4` : `${index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass} model={captionsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                    <label className={checkHTMLdataInsideString(element?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                </div>
                            </figcaption>
                            <figcredit >
                                <div className="floating-credit-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-5` : `${index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass} model={creditsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                    <label className={checkHTMLdataInsideString(element?.html?.credits) ? "transition-none" : "floating-credit"}>Credit</label>
                                </div>
                            </figcredit>
                        </figure>
                    </div>
                </div>
            </div>
        );
    }
}

const mapActionToProps = (dispatch) => {
    return {
        updateSmartLinkDataForCompare: (oldSmartLinkData) => {
            dispatch(updateSmartLinkDataForCompare(oldSmartLinkData))
        },
        updateAudioVideoDataForCompare: (oldAudioVideoData) => {
            dispatch(updateAudioVideoDataForCompare(oldAudioVideoData))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        figureDropdownData: state.appStore.figureDropdownData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureUserInterface);