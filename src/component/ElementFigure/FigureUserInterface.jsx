import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
// IMPORT - Assets //
import config from '../../config/config';
import { getAlfrescositeResponse, handleAlfrescoSiteUrl, handleSiteOptionsDropdown } from './AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize } from '../../constants/utility';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader';
// import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureUserInterface.css';
import { alfrescoPopup, saveSelectedAssetData } from '../AlfrescoPopup/Alfresco_Action';
import { updateFigureImageDataForCompare } from '../ElementContainer/ElementContainer_Actions';
import { connect } from 'react-redux';
import figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import { labelHtmlData } from '../../constants/Element_Constants';
import figureData from './figureTypes';
import interactiveTypeData from '../ElementInteractive/interactiveTypes.js';
import { AUDIO, VIDEO, INTERACTIVE, DEFAULT_VIDEO_POSTER_IMAGE } from '../../constants/Element_Constants';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];

class FigureUserInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {},
            figureLabelValue: 'No Label',
            figureLabelData: this.props.figureDropdownData,
            figureDropDown: false
        }
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        getAlfrescositeResponse(this.props.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title,
                alfrescoSiteData: { ...response }
            })
        })
        let figureHtmlData = getLabelNumberTitleHTML(this.props.element);
        let figureLabelValue = this.state;
        figureLabelValue = dropdownValueAtIntialize(this.props.figureDropdownData, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
        this.props.updateFigureImageDataForCompare(this.props.element.figuredata);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        const { alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup, elementId } = this.props;
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup) {
            this.dataFromNewAlfresco(alfrescoAssetData)
        }
    }

    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef?.current?.contains(event.target)) {
            this.handleCloseDropDrown();
        }
    }

    updateAlfrescoSiteUrl = () => {
        let repositoryData = this.state.alfrescoSiteData
        if (repositoryData?.repositoryFolder || repositoryData?.title) {
            this.setState({
                alfrescoSite: repositoryData?.repositoryFolder || repositoryData?.title
            })
        } else {
            this.setState({
                alfrescoSite: config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            })
        }
    }

    /**
* @description delete image from element
*/

    deleteFigureResource = () => {
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        // store current element figuredata in store
        this.props.updateFigureImageDataForCompare(this.props.element.figuredata);
        let setFigureData = {
            schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            imageid: "",
            path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            height: "422",
            width: "680"
        }
        this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId, this.props.asideData, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
    }


    /**
* @description data after selecting an asset from alfresco c2 module
* @param {*} data selected asset data
*/

    dataFromNewAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let imageData = data;
        let epsURL = imageData.epsUrl ? imageData.epsUrl : "";
        let figureType = data?.content?.mimeType?.split('/')[0]
        //commented lines will be used to update the element data
        let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";

        let uniqID = imageData.id ? imageData.id : "";
        let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
        let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
        if (epsURL !== "") {
            this.setState({ imgSrc: epsURL })
        } else {
            this.setState({ imgSrc: DEFAULT_IMAGE_SOURCE })
        }

        let scaleMarkerData = {};
        Object.assign(scaleMarkerData, (data && data.scalemarker && data.scalemarker.properties) ? { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.id || null } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.name || "The alttext for the scale image" } : null,
            (data && data.scalemarker && data.scalemarker.epsUrl) ? { "path": data.scalemarker.epsUrl || null } : null,
            (data && data.scalemarker && data.properties) ? { "height": data.properties["exif:pixelYDimension"] || null } : null,
            (data && data.scalemarker && data.scalemarker.properties && data.properties["exif:pixelXDimension"]) ? { "width": data.properties["exif:pixelXDimension"] || null } : null,
        );
        // store current element figuredata in store
        this.props.updateFigureImageDataForCompare(this.props.element.figuredata);
        let setFigureData = {
            path: epsURL,
            height: height,
            width: width,
            schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            imageid: `urn:pearson:alfresco:${uniqID}`,
            alttext: altText,
            longdescription: longDesc,
            type: figureType,
        }

        Object.assign(setFigureData, (Object.keys(scaleMarkerData).length > 0) ? { scaleimage: scaleMarkerData } : null);

        this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId, this.props.asideData, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
        let alfrescoData = config?.alfrescoMetaData?.alfresco;
        let alfrescoSiteLocation = this.state.alfrescoSiteData;
        if (this.props.isCiteChanged) {
            let changeSiteAlfrescoData = {
                currentAsset: {},
                nodeRef: this.props.changedSiteData.guid,
                repositoryFolder: this.props.changedSiteData.title,
                siteId: this.props.changedSiteData.id,
                visibility: this.props.changedSiteData.visibility
            }
            handleAlfrescoSiteUrl(this.props.elementId, changeSiteAlfrescoData)
            this.setState({
                alfrescoSite: changeSiteAlfrescoData?.repositoryFolder,
                alfrescoSiteData: changeSiteAlfrescoData
            })
        } else {
            if ((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')) {
                handleAlfrescoSiteUrl(this.props.elementId, alfrescoData)
                this.updateAlfrescoSiteUrl()
            }
        }
        // to blank the elementId and asset data after update
        let payloadObj = {
            asset: {},
            id: ''
        }
        this.props.saveSelectedAssetData(payloadObj)
    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = async (e) => {
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }

        const figureDataObj = this.props.element.figuredata;
        const currentAsset = figureDataObj ? {
            id: figureDataObj.imageid.split(':').pop(), // get last
            type: figureDataObj.type,
        } : null;

        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        var data_1 = false;
        if (alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef) {         //if alfresco location is available
                if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    let alfrescoLocationData = this.state.alfrescoSiteData
                    let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                    alfrescoSiteName = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    let nodeRefs = alfrescoPath?.alfresco?.nodeRef ? alfrescoPath?.alfresco?.nodeRef : alfrescoPath.alfresco.guid
                    const locationSiteDataNodeRef = alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
                    nodeRefs = locationSiteDataNodeRef ? locationSiteDataNodeRef : nodeRefs;
                    const locationSiteDataTitle = alfrescoLocationData?.repositoryFolder ? alfrescoLocationData.repositoryFolder : alfrescoLocationData?.title
                    let messageObj = {
                        citeName: locationSiteDataTitle ? locationSiteDataTitle : alfrescoSiteName,
                        citeNodeRef: nodeRefs,
                        elementId: this.props.elementId,
                        currentAsset
                    }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                }
                else {
                    this.props.accessDenied(true)
                }

            }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                let payloadObj = await handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.state.alfrescoSiteData);
                this.props.alfrescoPopup(payloadObj);
            } else {
                this.props.accessDenied(true)
            }
        }
    }

    /**
 * @description function will be called on image src add and fetch resources
 */
    addFigureResource = (e) => {
        if (e) {
            e.stopPropagation();
        }
        this.handleC2MediaClick(e);
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
        this.props.updateFigureImageDataForCompare(this.props.element.figuredata);
    }

    onFigureElementFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.remove('transition-none');
        }
        // BG-5081 fixes
        if (id === '0-0' && labelElement?.innerHTML) {
            let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
            if (dropdownData.indexOf(labelElement?.innerHTML.toLowerCase()) > -1) {
                let { figureLabelValue } = this.state;
                let labelElementText = labelElement?.innerHTML.toLowerCase();
                figureLabelValue = labelElementText.charAt(0).toUpperCase() + labelElementText.slice(1);
                this.setState({ figureLabelValue: figureLabelValue });
            }
        }
    }

    convertOptionsToLowercase = (Options) => {
        let lowercaseOptions = [];
        if (Options.length > 0) {
            for (let option of Options) {
                if (!BLANK_LABEL_OPTIONS.includes(option)) {
                    lowercaseOptions.push(option.toLowerCase());
                }
            }
        }
        return lowercaseOptions;
    }

    renderAssetSection = (element, assetId, assetIdText, assetPath, assetPathText, updateButtonText) => {
        let assetJsx;
        switch (element.figuretype) {
            case AUDIO:
                assetJsx =
                    assetId && element.figuredata.posterimage.path ?
                        <audio controls="none" preload="none" className="audio" >
                            <source src={element.figuredata.posterimage.path} type="audio/mpeg" />
                        </audio> :
                        <div>RAHUL</div>
                break;
            case VIDEO:
                assetJsx =
                    assetId && element.figuredata.posterimage.path ?
                        <video className="video" width="640" height="360" controls="none" preload="none" onClick={this.props.handleC2MediaClick}
                            poster={element.figuredata.posterimage.path}>
                            <source src="" />
                            <track src="" kind="subtitles" srcLang="en" label="English" />
                        </video>
                        :
                        <div>
                            <div className="figure-wrapper">
                                <div className="figure-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : ""}</span> </div>
                                    <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? this.state.alfrescoSite : ""} </span> </div>
                                </div>
                                <div className='updatefigurebutton' onClick={this.addFigureResource}>{updateButtonText}</div>
                                <div className='deletefigurebutton' onClick={this.deleteFigureResource}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                            </div>
                        </div>
                break;
            case INTERACTIVE:
                assetJsx =
                    assetId ?
                        <div>
                            <div className="figure-wrapper">
                                <div className="figure-image-info">
                                    <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : ""}</span> </div>
                                    <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? this.state.alfrescoSite : ""} </span> </div>
                                </div>
                                <div className='updatefigurebutton' onClick={this.addFigureResource}>{updateButtonText}</div>
                                <div className='deletefigurebutton' onClick={this.deleteFigureResource}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                            </div>
                        </div>
                        :
                        <div>OK</div>
                break;
        }
        return assetJsx;
    }

    showHyperlinkEditable = () => {
        let hyperLinkInput = document.getElementsByClassName(`actionPU`);
        let spanElement = document.getElementsByClassName(`Enter-Button-Label`);
        console.log("jjjjjjjjjjjjjjjjjjjjj", hyperLinkInput, spanElement);
        spanElement?.classList?.add('hide-field');
        hyperLinkInput?.classList?.remove('hide-field');
    }

    render() {
        console.log("yha aayaaaaaaaaaaaa");
        const { element, permissions, openGlossaryFootnotePopUp, handleFocus, handleBlur, index, slateLockInfo, glossaryFootnoteValue, glossaaryFootnotePopup, elementId } = this.props;
        let figureHtmlData = getLabelNumberTitleHTML(element);
        let { figureLabelValue } = this.state;
        let figureLabelFromApi = checkHTMLdataInsideString(figureHtmlData.formattedLabel);
        let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
        
        if (dropdownData.indexOf(figureLabelFromApi.toLowerCase()) > -1) {
            figureLabelFromApi = figureLabelFromApi.toLowerCase();
            figureLabelValue = figureLabelFromApi.charAt(0).toUpperCase() + figureLabelFromApi.slice(1);
        } else if (figureLabelFromApi === '' && figureLabelValue === 'No Label') {
            figureLabelValue = 'No Label';
        } else if (figureLabelFromApi !== '' && figureLabelValue === 'Custom') {
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
        
        let assetId, addButtonText, assetIdText, assetPathText, updateButtonText, assetPath;
        switch (element.figuretype) {
            case AUDIO:
                assetId = element.figuredata.audioid ? element.figuredata.audioid : '';
                addButtonText = "Select an Audio";
                assetIdText = "Audio ID:";
                assetPathText = "Audio Path:";
                updateButtonText = "Update Audio";
                assetPath = element.figuredata.audio?.path ? element.figuredata.audio.path : element.figuredata.posterimage.path;
                break;
            case VIDEO:
                assetId = element.figuredata.videoid ? element.figuredata.videoid : '';
                addButtonText = "Select a Video";
                assetIdText = "Video ID:";
                assetPathText = "Video Path:";
                updateButtonText = "Update Video";
                assetPath = element.figuredata.videos[0]?.path ? element.figuredata.videos[0]?.path : element.figuredata.posterimage.path;
                break;
            case INTERACTIVE:
                assetId = element.figuredata.interactiveid ? element.figuredata.interactiveid : '';
                addButtonText = "Add a Smart Link";
                assetIdText = "Asset ID:";
                assetPathText = "Asset Path:";
                updateButtonText = "Update Smart Link";
                assetPath = element.figuredata.path ? element.figuredata.path : '';
                break;
        }

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
                            <div className="figure-element-container">

                                {
                                    element.figuretype === INTERACTIVE && imageDimension === '' ?
                                        <div className='Rectangle-button' onClick={this.showHyperlinkEditable} > 
                                        <span class="Enter-Button-Label">{element.html.postertext && element.html.postertext !== '<p></p>' ? element.html.postertext : "Enter Button Label"}</span>
                                            <TinyMceEditor permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} index={`${index}-3`} placeholder="Enter Button Label" className={"actionPU hide-field"} tagName={'p'} model={element.html.postertext ? element.html.postertext : ""} handleEditorFocus={handleFocus} handleBlur={handleBlur} slateLockInfo={slateLockInfo} elementId={elementId} element={element} handleAudioPopupLocation={this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                        </div>
                                        :
                                        null
                                }

                                <div id="figure_add_div" className={`pearson-component image figureData ${element.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                                    {/* {
                                        assetId ?
                                            <img src={this.state.imgSrc ? this.state.imgSrc : (element.figuredata.posterimage.path && element.figuredata.posterimage.path !== "" ? element.figuredata.posterimage.path : '')}
                                                data-src={this.state.imgSrc}
                                                title=""
                                                alt=""
                                                className={imageDimension + ' lazyload'}
                                                draggable="false" />
                                            : <div className='figurebutton' onClick={this.props.handleC2MediaClick}>{addButtonText}</div>
                                    } */}
                                    {this.renderAssetSection(element, assetId, assetIdText, assetPath, assetPathText, updateButtonText)}
                                </div>
                                {/* <div>
                                    {
                                        (assetId !== "") ? <div className="figure-wrapper">
                                            <div className="figure-image-info">
                                                <div className='image-figure'><p className='image-text'>{assetIdText} </p> <span className='image-info'> {assetId ? assetId : ""} </span> </div>
                                                <div className='image-figure-path'><p className='image-text'>{assetPathText} </p> <span className='image-info'> {this.state.imgSrc ? this.state.imgSrc : (assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? assetPath : "")}</span> </div>
                                                <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{assetPath && assetPath !== DEFAULT_VIDEO_POSTER_IMAGE ? this.state.alfrescoSite : ""} </span> </div>
                                            </div>
                                            <div className='updatefigurebutton' onClick={this.addFigureResource}>{updateButtonText}</div>
                                            <div className='deletefigurebutton' onClick={this.deleteFigureResource}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                                        </div> : ''
                                    }
                                </div> */}
                            </div>
                            <figcaption className={captionDivClass} >
                                <div className="floating-caption-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE && imageDimension === '' ? `${index}-4` : `${index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass} model={element.html.captions} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
                                    <label className={checkHTMLdataInsideString(element?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                </div>
                            </figcaption>
                            <figcredit >
                                <div className="floating-credit-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureElementFieldFocus} onFigureImageFieldBlur={this.onFigureElementFieldBlur} permissions={permissions} openGlossaryFootnotePopUp={openGlossaryFootnotePopUp} element={element} handleEditorFocus={handleFocus} handleBlur={handleBlur} index={element.figuretype === INTERACTIVE && imageDimension === '' ? `${index}-5` : `${index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass} model={element.html.credits} slateLockInfo={slateLockInfo} glossaryFootnoteValue={glossaryFootnoteValue} glossaaryFootnotePopup={glossaaryFootnotePopup} elementId={elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} />
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
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        },
        updateFigureImageDataForCompare: (oldFigureData) => {
            dispatch(updateFigureImageDataForCompare(oldFigureData))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId: state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isCiteChanged: state.alfrescoReducer.isCiteChanged,
        changedSiteData: state.alfrescoReducer.changedSiteData,
        figureDropdownData: state.appStore.figureDropdownData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureUserInterface);