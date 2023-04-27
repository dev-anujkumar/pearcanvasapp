import React, { Component } from 'react';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
// IMPORT - Assets //
import { getAlfrescositeResponse } from './AlfrescoSiteUrl_helper.js';
import { getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, removeUnoClass, hasReviewerRole } from '../../constants/utility';
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
import { labelHtmlData, AUDIO, VIDEO, INTERACTIVE, DEFAULT_VIDEO_POSTER_IMAGE } from '../../constants/Element_Constants';
import figureData from './figureTypes';
import interactiveTypeData from '../ElementInteractive/interactiveTypes.js';
import SmallRoundedButton from './Small_RoundedButton.jsx';
import { ELM_INT, MMI } from '../AssessmentSlateCanvas/AssessmentSlateConstants';
import RoundedButton from './Rounded_Button.jsx';
import approvedIcon from './Assets/approved.svg';
import unApprovedIcon from './Assets/unapproved.svg';
import FigureHeader from '../FigureHeader/FigureHeader.jsx';
import KeyboardWrapper, { QUERY_SELECTOR } from '../Keyboard/KeyboardWrapper.jsx';
import { createRef } from 'react';
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";
import config from '../../config/config';
/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];
const BLANK_PARA_VALUES = ['<p></p>', '<p><br></p>', '<p><br/></p>', '<br data-mce-bogus="1">', '<p><br data-mce-bogus="1"></p>'];
const KEYBOARD_ENABLE = [AUDIO, VIDEO];
class FigureUserInterface extends Component {
    constructor(props) {
        super(props);
        this.deleteRef = createRef(null);
        this.updateRef = createRef(null);
        this.addVideoRef = createRef(null);
        this.figureLabelRef = createRef(null);
        this.labelListRef = createRef(null);
        this.state = {
            alfrescoSite: '',
            figureLabelValue: 'No Label',
            figureLabelData: [],
            figureDropDown: false,
            elementType: '',

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
        let figureHtmlData = this.checkForAutoNumberedContent(this.props.element) ? { formattedLabel: `<p>${this.props.element?.displayedlabel}</p>`} : getLabelNumberTitleHTML(this.props.element);
        let figureLabelValue = this.state;
        figureLabelValue = dropdownValueAtIntialize(this.state.figureLabelData, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
        if (this.props.element.figuretype === 'interactive') {
            this.props.updateSmartLinkDataForCompare(this.props.element.figuredata);
        } else if (this.props.element.figuretype === 'audio' || this.props.element.figuretype === 'video') {
            this.props.updateAudioVideoDataForCompare(this.props.element.figuredata);
        }
    }

    checkForAutoNumberedContent = (currentElement) =>{
        if((currentElement?.figuretype === 'audio' || currentElement?.figuretype === 'video' || currentElement?.figuretype === 'interactive') && this.props?.isAutoNumberingEnabled){
            return true
        }
        return false
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.element.figuretype !== this.state.elementType) {
            this.updateDropdownOptions();
        }
        if(!prevState.figureDropDown && this.state.figureDropDown) {
            if(this.isEnableKeyboard()) {
                this.setState({showingListIndex: 0});
                this.labelListRef.current.childNodes[0].focus();
                this.labelListRef.current.addEventListener('keydown', this.handleLabelKeyDown)
                this.labelListRef.current.addEventListener('click', this.handleLabelKeyDown)
            }
        }
    }

    updateDropdownOptions = () => {
        let figureLabelData = [];
        switch (this.props.element.figuretype) {
            case AUDIO:
                figureLabelData = this.checkForAutoNumberedContent(this.props.element) ? ['Audio'] : this.props.figureDropdownData.audio;
                break;
            case VIDEO:
                figureLabelData = this.checkForAutoNumberedContent(this.props.element) ? ['Video'] : this.props.figureDropdownData.video;
                break;
            case INTERACTIVE:
                figureLabelData = this.props.figureDropdownData.smartlinks;
                break;
            default:
                figureLabelData = [];
                break;
        }
        if(this.props.interactiveformat==='mmi' || this.props.interactiveformat==='mmi-elm'){
            figureLabelData = this.props.figureDropdownData.audio
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
        if (figureLabelValue !== data) {
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

    isEnableKeyboard = () => {
        if(KEYBOARD_ENABLE.indexOf(this.props.element.figuretype) > -1) {
            return true;
        }
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

    clickNode =  (event) => {
        if(event.keyCode === 13) {
           const node = document.activeElement;
           node.click();
        }
        if(event.keyCode === 38){
            event.preventDefault();
        }
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

    generateAddAssetJSX = ( assetIcon, assetTitleText, addButtonText, assetBackgroundType, assetIdText, assetPathText,interactiveformat) => {
        return (
            <div className="media-wrapper">
                <div className='videoIconWrapper'>
                    <div className="icon-wrapper">
                        <span className='videoIcon' >{assetIcon}</span>
                        <span className='videoTitle'>{assetTitleText}</span>
                    </div>
                    {
                        interactiveformat === "mmi" ?
                            <div className="media-image-info">
                                <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> </span> </div>
                            </div>
                            :
                            interactiveformat === "mmi-elm" ?
                                <div className="media-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> </span> </div>
                                </div>
                                :
                                <div className="media-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'> </span> </div>
                                </div>
                    }

                </div>

                <KeyboardWrapper enable={this.isEnableKeyboard()} index={`${this.props.index}-add-asset`}>
                        <div onClick={() => {if(this.isEnableKeyboard()) {this.addVideoRef.current.focus()}}}>
                        <div className="media-assets">
                        <div tabIndex={0} onKeyDown={this.clickNode} ref={this.addVideoRef} className='addVideobutton' onClick={this.props.handleC2MediaClick}>{addButtonText}</div>
                        <div className='videoReel'><img width="100%" height="164px" src={assetBackgroundType} />
                        
                    </div>
                </div>
            </div>
                    </KeyboardWrapper>
                    </div>
                   
        )
    }



    generateUpdateAssetJSX = (element, assetTitleText, assetIcon, assetPath, assetBackgroundType, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite, imageDimension,interactiveformat) => {
        const approval = this.props?.assessmentReducer[element.figuredata.interactiveid]?.assessmentStatus === "final";
        const buttonTitle = approval?"Approved":"Unapproved";
        const smallButtonClass = approval? "small_rounded_btn": "small_rounded_btn2";
        const smallButtonIcon = approval? approvedIcon: unApprovedIcon;
        return (
            <div className={`figure-wrapper-update ${interactiveformat === "mmi" || interactiveformat === "mmi-elm" ? 'figure-wrapper-update-quad' :''}`}>
                <div className='videoIconWrapper'>
                    <div className="update-icon-wrapper">
                        <span className='videoIcon' >{assetIcon}</span>
                        <p className='updateVideoTitle' >{assetTitleText}</p>
                    </div>
                    {
                        interactiveformat === "mmi-elm" && this.props?.assessmentReducer[element.figuredata.interactiveid]?.showUpdateStatus &&
                        <RoundedButton title="Update Available" className='rounded_btn' onClick={() => this.props.updateElm()}/>
                    }
                    <div className="media-button-group">
                        <KeyboardWrapper enable={this.isEnableKeyboard()} index={`${this.props.index}-update-asset`}>
                        <div onClick={() => {if(this.isEnableKeyboard()){this.updateRef.current.focus()}}}>
                         <div onKeyDown={this.clickNode} ref={this.updateRef} tabIndex={0} className='update-figure-button' onClick={this.props.handleC2MediaClick}>{updateButtonText}</div>
                        </div>
                        </KeyboardWrapper>
                    <KeyboardWrapper enable={this.isEnableKeyboard()} index={`${this.props.index}-delete-asset`}>
                     <div onClick={() => {if(this.isEnableKeyboard) {this.deleteRef.current.focus()}}}>
                         <div onKeyDown={this.clickNode} ref={this.deleteRef} tabIndex={0} className={`delete-figure-button ${element.figuretype === "interactive" ? 'deleteSL' : ''}`} onClick={() => this.props.deleteElementAsset(element)}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                     </div>
                        </KeyboardWrapper>
                     
                    </div>
                    {
                        interactiveformat === "mmi" ?
                            <div className="media-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                            </div>
                            :
                            interactiveformat === "mmi-elm" ?
                                <div className="media-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : ""} <SmallRoundedButton icon={smallButtonIcon} className={smallButtonClass} buttonTitle={buttonTitle} approval={approval}/> </span> </div>
                                </div>
                                :
                                <div className="media-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : ""}</span> </div>
                                    <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? alfrescoSite && (alfrescoSite !== '' || alfrescoSite !== undefined) ? alfrescoSite : this.state.alfrescoSite : ""} </span> </div>
                                </div>
                    }
                </div>
                <div className="media-assets">
                    {this.generatePosterImageJSX(element, assetBackgroundType, imageDimension)}
                </div>
            </div>
        )
    }

    generatePosterImageJSX = (element, assetBackgroundType, imageDimension) => {
        let posterJsx;
        switch (element.figuretype) {
            case AUDIO:
                posterJsx = <div className='videoReel'><img width="100%" height="164px" src={assetBackgroundType} /></div>
                break;
            case VIDEO:
                posterJsx = element.figuredata?.posterimage?.path ?
                    <video className="videoReel" width="100%" height="164px" controls="none" preload="none"
                        poster={element?.figuredata?.posterimage?.path}>
                        <source src="" />
                        <track src="" kind="subtitles" srcLang="en" label="English" />
                    </video>
                    :
                    <div className='videoReel'><img width="100%" height="164px" src={assetBackgroundType} /></div>
                break;
            case INTERACTIVE:
                posterJsx = imageDimension !== '' && element.figuredata?.posterimage?.path ?
                    <div className="videoReel">
                        <img width="100%" height="164px" src={element.figuredata?.posterimage?.path} />
                    </div>
                    :
                    <div className='videoReel'><img width="100%" height="164px" src={assetBackgroundType} /></div>
                break;
        }
        return posterJsx;
    }

    renderAssetSection = (element, assetId, assetTitleText, assetIdText, assetPath, assetPathText, addButtonText, updateButtonText, alfrescoSite, imageDimension) => {
        let assetJsx;
        switch (element.figuretype) {
            case AUDIO:
                assetJsx =
                    assetId ?
                        this.generateUpdateAssetJSX(element, assetTitleText, figureAudioIcon, assetPath, updateAudioReel, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite, imageDimension) 
                        :
                        this.generateAddAssetJSX(figureAudioIcon, assetTitleText, addButtonText, audioReel, assetIdText, assetPathText)
                break;
            case VIDEO:
                assetJsx =
                    assetId ?
                        this.generateUpdateAssetJSX(element, assetTitleText, videoIcon, assetPath, updateVideoReel, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite, imageDimension)
                        :
                        this.generateAddAssetJSX(videoIcon, assetTitleText, addButtonText, videoReel, assetIdText, assetPathText)
                break;
            case INTERACTIVE:
                assetJsx = element.figuredata.interactivetype !== 'pdf' ?
                    (

                        element.figuredata.interactiveformat === MMI ?
                            assetId ?
                                this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, slPosterImage, "Update Interactive", "Item ID:", assetId, "Version:", alfrescoSite, imageDimension, MMI)
                                :
                                this.generateAddAssetJSX(smartlinkIcon, "QuaD Interactive", "Add an Interactive", slPosterImage, "Item ID:", assetPathText, MMI)
                            :
                            element.figuredata.interactiveformat === ELM_INT ?
                                assetId ?
                                    this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, slPosterImage, "Update Interactive", "Item ID:", assetId, "Version:", alfrescoSite, imageDimension, ELM_INT)
                                    :
                                    this.generateAddAssetJSX(smartlinkIcon, "Elm Interactive", "Add an Interactive", slPosterImage, "Item ID:", "Version:", ELM_INT)
                                :
                                assetId ?
                                    this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, slPosterImage, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite, imageDimension)
                                    :
                                    this.generateAddAssetJSX(smartlinkIcon, assetTitleText, addButtonText, slPosterImage, assetIdText, assetPathText)
                    )
                    :
                    (
                        assetId ?
                            this.generateUpdateAssetJSX(element, assetTitleText, smartlinkIcon, assetPath, pdSLfPosterImage, updateButtonText, assetIdText, assetId, assetPathText, alfrescoSite, imageDimension)
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

    handleLabelKeyDown = (event) => {
       
        if(event.keyCode === 13) {
            this.labelListRef.current.childNodes[this.state.showingListIndex].click()
            this.figureLabelRef.current.focus()
        } else if(event.button == 0){
            const nodeValue = (event.target?.attributes[1]?.nodeValue)
            this.labelListRef?.current?.childNodes[nodeValue]?.click();
            this.figureLabelRef?.current?.focus();
            this.setState({showingListIndex: nodeValue});
        }
        else if (event.keyCode === 40) {
            if(this.labelListRef.current.childNodes[this.state.showingListIndex + 1]) {
                this.labelListRef.current.childNodes[this.state.showingListIndex + 1 ].focus()
                this.setState({showingListIndex: this.state.showingListIndex + 1});
            }
        } else if (event.keyCode === 38) {
            if(this.labelListRef.current.childNodes[this.state.showingListIndex - 1]) {
                this.labelListRef.current.childNodes[this.state.showingListIndex - 1].focus()
                this.setState({showingListIndex: this.state.showingListIndex - 1})
            
            }
        }
        if (event.button != 0) {
        event.stopPropagation();
        event.preventDefault();
        }
    }


    render() {
        const { element, permissions, openGlossaryFootnotePopUp, handleFocus, handleBlur, index, slateLockInfo, glossaryFootnoteValue, glossaaryFootnotePopup, elementId, alfrescoSite, isAutoNumberingEnabled } = this.props;
        let figureHtmlData = getLabelNumberTitleHTML(element);
        let { figureLabelValue } = this.state;
        let figureLabelFromApi = (isAutoNumberingEnabled && element.figuretype !== INTERACTIVE) ? this.props.element.displayedlabel : checkHTMLdataInsideString(figureHtmlData.formattedLabel);
        let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
        if (!(this.checkForAutoNumberedContent(this.props.element))) {
            if (dropdownData.indexOf(figureLabelFromApi.toLowerCase()) > -1) {
                figureLabelFromApi = figureLabelFromApi.toLowerCase();
                figureLabelValue = figureLabelFromApi.charAt(0).toUpperCase() + figureLabelFromApi.slice(1);
            } else if (figureLabelFromApi === '' && figureLabelValue === 'No Label') {
                figureLabelValue = 'No Label';
            } else if ((figureLabelFromApi !== '' && figureLabelValue === 'Custom') || (dropdownData.length === 0 && figureLabelFromApi !== '')) {
                figureLabelValue = 'Custom';
            }
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
                assetTitleText = element.figuredata?.interactivetitle ? element.figuredata?.interactivetitle : element.figuredata.interactiveformat === 'mmi' ? "QUAD" : element.figuredata.interactiveformat === 'mmi-elm' ? "Elm Interactive" : 'Smart link';
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

        let captionsHtml = removeUnoClass(element.html?.captions);
        let creditsHtml = removeUnoClass(element.html?.credits);
        const isReviewer = hasReviewerRole() ? "pointer-events-none" : "";
        captionsHtml = captionsHtml?.replace("<p>", '')?.replace("</p>", '');
        creditsHtml = creditsHtml?.replace("<p>", '')?.replace("</p>", '');
        return (
            <div className="figureElement">
                <div className='figure-image-wrapper'>
                    <div className={divClass} resource="">
                        <figure className={figureClass} resource="">
                            {this.checkForAutoNumberedContent(this.props.element) && this.props?.element?.hasOwnProperty('numberedandlabel') ?
                                <FigureHeader
                                    {...this.props}
                                    model={this.props.element}
                                    figureHtmlData={figureHtmlData}
                                    previewClass={""}
                                    figLabelClass={figLabelClass}
                                    figTitleClass={figTitleClass}
                                /> : <><header className={`figure-header new-figure-image-header ${isReviewer}`}>

                                <div className='figure-label-field'>
                                    <span className={`label ${this.state.figureDropDown ? 'active' : ''}`}>Label</span>
                                    <KeyboardWrapper index={`${this.props.index}-figure-label`} enable={this.isEnableKeyboard()}>
                                        <div onClick={() => {if(this.isEnableKeyboard()) {this.figureLabelRef.current.focus()}}}> 
                                            <div onKeyDown={this.clickNode} tabIndex={0} ref={this.figureLabelRef}  className={this.props.selectedElement === `${QUERY_SELECTOR}-${this.props.index}-figure-label` ? "figure-label-highlight" : "figure-label"} onClick={this.handleFigureDropdown}>
                                                <span>{figureLabelValue}</span>
                                                <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                                            </div>
                                        </div>
                                    </KeyboardWrapper>
                                </div>

                                {this.state.figureDropDown &&
                                    <div className="figure-dropdown" ref={this.wrapperRef}>
                                         <ul ref={this.labelListRef}>
                                            {this.state.figureLabelData.map((label, i) => {
                                                return (
                                                    <li onKeyDown={this.clickNode} tabIndex={0} currentIndex={i} className="media-dropdown-options" key={i} onClick={() => { this.changeFigureLabel(figureLabelValue, label); this.handleCloseDropDrown() }}>{label}</li>
                                                      
                                                )

                                            })}
                                        </ul>
                                    </div>
                                }
                                {
                                    figureLabelValue === 'Custom' ?
                                    <KeyboardWrapper index={`${index}-0`} enable={this.isEnableKeyboard()}>
                                        
                                        <div className='image-label'>
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                        </div>

                                    </KeyboardWrapper>
                                        :
                                        <div className='image-label hide-field'>
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass} model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                        </div>
                                }
                                <KeyboardWrapper enable={this.isEnableKeyboard()} index={`${index}-1`}>
                                    <div className="floating-number-group">
                                        <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-1`} placeholder="Number" tagName={'h4'} className={figNumberClass} model={figureHtmlData.formattedNumber} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation}  contenteditable={ !hasReviewerRole()} />
                                        <label className={checkHTMLdataInsideString(figureHtmlData.formattedNumber) ? "transition-none" : "floating-number"}>Number</label>
                                    </div>
                                </KeyboardWrapper>
                              

                            </header>
                                    <KeyboardWrapper index={`${index}-2`} enable={this.isEnableKeyboard()}>
                                        {this.props.setGrammarlyFlag ?
                                            <Grammarly clientId={config.GRAMMARLY_CLIENT_ID}>
                                                <GrammarlyEditorPlugin>
                                                    <div className="floating-title-group">
                                                        <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass} model={figureHtmlData.formattedTitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                                        <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
                                                    </div>
                                                </GrammarlyEditorPlugin>
                                            </Grammarly> :
                                            <div className="floating-title-group">
                                                <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={`${index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass} model={figureHtmlData.formattedTitle} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                                <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
                                            </div>
                                        }
                                    </KeyboardWrapper>
                               </>}
                            {
                                element.figuretype === INTERACTIVE && imageDimension === '' ?
                                    <div>
                                        <div className={`Rectangle-button ${index} ${isReviewer}`} onClick={() => this.toggleHyperlinkEditable('show', index)} >
                                            <span className="Enter-Button-Label">{posterText ? posterText : "Enter Button Label"}</span>
                                        </div>
                                        <div className={`hide-field actionPUdiv ${index}`} >
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} index={`${index}-3`} placeholder="Enter Button Label" className={"actionPU hyperLinkText"} tagName={'p'} model={element.html.postertext ? element.html.postertext : ""} handleEditorFocus={handleFocus} handleBlur={handleBlur} slateLockInfo={slateLockInfo} elementId={elementId} element={element} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                            <div className={`figure-element-container interface-container ${isReviewer}`}>
                                <div id="figure_add_div" className={`pearson-component image figureData ${element.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                                    {this.renderAssetSection(element, assetId, assetTitleText, assetIdText, assetPath, assetPathText, addButtonText, updateButtonText, alfrescoSite, imageDimension)}
                                </div>
                            </div>
                            <figcaption className={captionDivClass} >
                                <KeyboardWrapper enable={this.isEnableKeyboard()} index={element.figuretype === INTERACTIVE ? `${index}-4` : `${index}-3`} >
                                    {this.props.setGrammarlyFlag ?
                                        <Grammarly clientId={config.GRAMMARLY_CLIENT_ID}>
                                            <GrammarlyEditorPlugin>
                                                <div className="floating-caption-group">
                                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-4` : `${index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass} model={captionsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                                    <label className={checkHTMLdataInsideString(element?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                                </div>
                                            </GrammarlyEditorPlugin>
                                        </Grammarly> :
                                        <div className="floating-caption-group">
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-4` : `${index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass} model={captionsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(element?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                        </div>
                                    }
                                </KeyboardWrapper>
                            </figcaption>
                            <figcredit >
                                <KeyboardWrapper enable={this.isEnableKeyboard()} index={element.figuretype === INTERACTIVE ? `${index}-5` : `${index}-4`}>
                                    {this.props.setGrammarlyFlag ?
                                        <Grammarly clientId={config.GRAMMARLY_CLIENT_ID}>
                                            <GrammarlyEditorPlugin>
                                                <div className="floating-credit-group">
                                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-5` : `${index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass} model={creditsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                                    <label className={checkHTMLdataInsideString(element?.html?.credits) ? "transition-none" : "floating-credit"}>Credit</label>
                                                </div>
                                            </GrammarlyEditorPlugin>
                                        </Grammarly> :
                                        <div className="floating-credit-group">
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE ? `${index}-5` : `${index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass} model={creditsHtml} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                            <label className={checkHTMLdataInsideString(element?.html?.credits) ? "transition-none" : "floating-credit"}>Credit</label>
                                        </div>
                                    }
                                </KeyboardWrapper>
                            
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
        figureDropdownData: state.appStore.figureDropdownData,
        assessmentReducer: state.assessmentReducer,
        slateAncestors: state.appStore.currentSlateAncestorData,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        selectedElement: state.keyboardReducer.selectedElement,
        setGrammarlyFlag: state.appStore.setGrammarlyFlag
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureUserInterface);