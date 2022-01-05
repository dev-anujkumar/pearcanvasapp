import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
// IMPORT - Assets //
import tableIcon from "../../../src/images/ElementButtons/tableIcon.svg";
import blankTable from "../../../src/images/ElementButtons/combined-shape.svg";
import {
    DEFAULT_IMAGE_DATA_SOURCE,
    DEFAULT_IMAGE_SOURCE
} from '../../constants/Element_Constants';
import config from '../../config/config';
import { getAlfrescositeResponse, handleAlfrescoSiteUrl, handleSiteOptionsDropdown } from './AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize } from '../../constants/utility';
import { hideTocBlocker, disableHeader, showTocBlocker, hideToc } from '../../js/toggleLoader';
import figureData from './figureTypes';
import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureImage.css';
import { alfrescoPopup, saveSelectedAssetData, saveSelectedAlfrescoElement } from '../AlfrescoPopup/Alfresco_Action';
import { updateFigureImageDataForCompare } from '../ElementContainer/ElementContainer_Actions';
import { connect } from 'react-redux';
import figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import { labelHtmlData } from '../../constants/Element_Constants';
import PopUp from '../PopUp';
import { DELETE_DIALOG_TEXT } from '../SlateWrapper/SlateWrapperConstants';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import { setAutoNumberSettingValue, getLabelNumberPreview, getContainerNumber, AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER } from '../FigureHeader/AutoNumber_helperFunctions.js';
import FigureHeader from '../FigureHeader/FigureHeader.jsx';
/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];
//const BLANK_NUMBER_LABEL_OPTIONS = ['Default Auto-number', 'Override number only'];
const BLANK_NUMBER_LABEL_OPTIONS = [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER]

class FigureImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {},
            figureLabelValue: 'No Label',
            figureNumberLabelValue: 'Default Auto-number',
            figureLabelData: this.props.figureDropdownData?.image,
            figureNumberLabelData: [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER],
            figureDropDown: false,
            figureNumberDropDown: false,
            deleteassetPopup: false
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
        let figureHtmlData = this.props.isAutoNumberingEnabled ? { formattedLabel: `<p>${this.props.model.displayedlabel}</p>`} : getLabelNumberTitleHTML(this.props.model);
        let figureLabelValue = this.state;
        figureLabelValue = dropdownValueAtIntialize(this.props.figureDropdownData.image, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
        const dropdownVal = setAutoNumberSettingValue(this.props.model)
        this.setState({
            figureNumberLabelValue: dropdownVal
        })
        //Dropdown List for Table Element
        if(this.props?.model?.figuretype === 'tableasmarkup') {
            this.setState({
                figureLabelData: this.props.figureDropdownData?.table ? this.props.figureDropdownData.table : ['Table']
            })
        }
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
        this.toggleDeletePopup(false)
    
        // store current element figuredata in store
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
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
    
    /*** @description This function is used to handle Canvas Blocker on delete */
    showCanvasBlocker = (value) => {
        if (value == true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker(value);
        }
        disableHeader(value);
        this.props.showBlocker(value);
    }
    /**
     * @description This function is used to toggle delete popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
     toggleDeletePopup = (toggleValue, event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            deleteAssetPopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }

    /*** @description This function is used to render delete Popup */
    showDeleteAssetPopup = () => {
        if (this.state.deleteAssetPopup) {
            this.showCanvasBlocker(true)
            return (
                <PopUp
                    dialogText={DELETE_DIALOG_TEXT}
                    active={true}
                    togglePopup={this.toggleDeletePopup}
                    isDeleteAssetPopup={true}
                    deleteAssetHandler={this.deleteFigureResource}
                    isInputDisabled={true}
                    isDeleteAssetClass="delete-element-text"
                    
                />
            )
        }
        else {
            return null
        }
    }


    /**
* @description data after selecting an asset from alfresco c2 module
* @param {*} data selected asset data
*/

    dataFromNewAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        let imageData = data;
        let epsURL = imageData.epsUrl ? imageData.epsUrl : imageData?.['institution-urls'][0]?.publicationUrl ? imageData?.['institution-urls'][0]?.publicationUrl : "";
        let figureType = data?.content?.mimeType?.split('/')[0]
        //commented lines will be used to update the element data
        let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext") {
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
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
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

        const figureDataObj = this.props.model.figuredata;
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
                    const alfrescoSite = locationSiteDataTitle ? locationSiteDataTitle : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    let messageObj = {
                        citeName: citeName,
                        citeNodeRef: nodeRefs,
                        elementId: this.props.elementId,
                        currentAsset
                    }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                    const messageDataToSave = {
                        id: this.props.elementId,
                        editor: undefined,
                        citeNodeRef: nodeRefs
                    }
                    this.props.saveSelectedAlfrescoElement(messageDataToSave);
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
     * @description function will be called to launch Table Editor SPA
     */
    launchSPA = () => {
        let editable = true;
        if (hasReviewerRole()) {
            editable = false;
        }
        this.props.handleFocus()
        let slateData = {
            elementId : this.props.elementId,
            currentProjectId: config.projectUrn,
            slateEntityUrn: config.slateEntityURN,
            parentEntityUrn: this.props.parentEntityUrn,
            sectionType: this.props?.asideData?.sectionType || "bodymatter"
        }
        let tableConfig = {
            S3MathImagePath: config.S3MathImagePath ? config.S3MathImagePath : "https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/",
            alfrescoMetaData: config?.alfrescoMetaData ?? {},
            CMDS_APIKEY: config.CMDS_APIKEY,
            CMDS_DATABASE: config.CMDS_DATABASE,
            CMIS_REPO: config.CMIS_REPO,
            CMDS_AUTHORIZATION: config.CMDS_AUTHORIZATION,
            EPS_API: config.EPS_API,
            PROJECTAPI_ENDPOINT: config.PROJECTAPI_ENDPOINT,
            STRUCTURE_APIKEY:config.STRUCTURE_APIKEY,
            AlfrescoSiteAPIUrl: config.ALFRESCO_EDIT_METADATA
        }
        const configAPIKey = JSON.parse(JSON.stringify(tableConfig));
        sendDataToIframe({ 'type': 'launchTableSPA', 'message': {}, "id": this.props.elementId, editable ,slateData, configAPIKey});
    }

    /**
     * @description function will be called on image src add and fetch resources
     */
    addFigureResource = (e) => {
        if (e) {
            e.stopPropagation();
        }
        if (this.props?.model?.figuretype === "tableasmarkup") {
            this.launchSPA();
        }
        else {
            this.handleC2MediaClick(e);
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
        this.setState({
            figureDropDown: !this.state.figureDropDown
        })
    }

    handleCloseDropDrown = () => {
        this.setState({
            figureDropDown: false
        })
    }

    onFigureImageFieldFocus = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains('transition-none')) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains('transition-none'))) { // BG-5075
            labelElement?.nextElementSibling?.classList?.add('transition-none');
        }
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
    }

    onFigureImageFieldBlur = (id) => {
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
        if (Options?.length > 0) {
            for (let option of Options) {
                if (!BLANK_LABEL_OPTIONS.includes(option)) {
                    lowercaseOptions.push(option.toLowerCase());
                }
            }
        }
        return lowercaseOptions;
    }

    renderTableAsset = (dataType, imageDimension) => {
        return (
            <>
                <div className="figure-element-container interface-container">
                    <div id="figure_add_div" className={`pearson-component image figureData ${this.props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                        <div className="tableMediaWrapper">
                            <div className="tableIconWrapper">
                                <div className="table-icon-wrapper">
                                    <img className='tableIcon' src={tableIcon}/>
                                    <span className='tableTitle'>Table</span>
                                </div>
                            </div>
                            <div className="tableAssetWrapper">
                                {
                                    this.props.model.figuretype === "tableasmarkup" && (this.props.model.figuredata.tableasHTML && (this.props.model.figuredata.tableasHTML !== "" || this.props.model.figuredata.tableasHTML !== undefined)) ?
                                    <div className="table-asset-wrapper-with-asset" onClick={this.addFigureResource}>
                                        <div id={`${this.props.index}-tableData`} className={imageDimension} dangerouslySetInnerHTML={{ __html: this.props.model.figuredata.tableasHTML }} ></div>
                                    </div> :
                                    <div className="table-asset-wrapper-without-asset">
                                        <img className="blankTable" src={blankTable}/>
                                        <button className="table-asset-button" onClick={this.addFigureResource}>
                                            <span className="table-asset-button-label">
                                                Add a Table
                                            </span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    renderImageAsset = (imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight) => {
        return (
            <>
                <div id="figure_add_div" className={`pearson-component image figureData ${imageClass} ${this.props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                    {
                        this.props.model.figuredata && this.props.model.figuredata.imageid ?
                        <img src={this.state.imgSrc ? this.state.imgSrc : (this.props?.model?.figuredata?.path !== "" ? this.props.model.figuredata.path : '')}
                            data-src={this.state.imgSrc}
                            title=""
                            alt=""
                            className={imageDimension + ' lazyload ' + actualSizeClass}
                            draggable="false" 
                            width={imgWidth}
                            height={imgHeight}
                        />
                        : <div className='figurebutton' onClick={this.addFigureResource}>Select an Image</div>
                    }
                </div>
                <div>
                    {
                        this.props.model.figuredata && this.props.model.figuredata.imageid !== "" ? 
                        <div className="figure-wrapper">
                            <div className="figure-image-info">
                                <div className='image-figure'><p className='image-text'>Image ID: </p> <span className='image-info'> {this.props.model.figuredata && this.props.model.figuredata.imageid ? this.props.model.figuredata.imageid : ""} </span> </div>
                                <div className='image-figure-path'><p className='image-text'>Image Path: </p> <span className='image-info'> {this.state.imgSrc ? this.state.imgSrc : (this.props.model.figuredata.path && this.props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.props.model.figuredata.path : "")}</span> </div>
                                <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{this.props.model.figuredata && this.props.model.figuredata.path && this.props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.state.alfrescoSite : ""} </span> </div>
                            </div>
                            <div className='updatefigurebutton' onClick={this.addFigureResource}>Update Image</div>
                            <div className='deletefigurebutton' onClick={() => this.toggleDeletePopup(true)}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                        </div> : ''
                    }
                </div>
            </>
        )
    }

    renderMathML = (figureHtmlData) => {
        return (
            <>
                <div className="floating-content-group">
                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-3`} placeholder = "Math Block Content" tagName={'p'} className={"figureContent "} model={figureHtmlData.formattedContent} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.text) ? "transition-none" : "floating-content"}>Math Block Content</label>
                </div>
            </>
        )
    }

    renderAssetSection = (figureTypeData) => {
        let { imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight, figTitleClass, figureHtmlData } = figureTypeData
        let figureJsx;
        if (this.props.model && this.props.model.figuretype) {
            switch (this.props.model.figuretype) {
                case 'tableasmarkup':
                    figureJsx = this.renderTableAsset(dataType, imageDimension);
                break;
                case 'authoredtext':
                    figureJsx = this.renderMathML(figureHtmlData);
                break;
                case 'table':
                case 'mathImage':
                case 'image':
                default:
                    figureJsx = this.renderImageAsset(imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight);
                break;
            }
        }
        return figureJsx;
    }

    render() {
        const { model, isAutoNumberingEnabled } = this.props;
        let elementFigureAlignment = ''
        if (model && model.figuretype) {
            switch (model.figuretype) {
                case 'table':
                case 'mathImage':
                    elementFigureAlignment = model.alignment ? model.alignment : 'half-text';
                    break;
                case 'tableasmarkup':
                    elementFigureAlignment = model.alignment ? model.alignment : 'table-editor';
                    break;
                case 'authoredtext':
                    elementFigureAlignment = model.alignment ? model.alignment : 'mathml';
                    break;
                case 'image':
                default:
                    elementFigureAlignment = model.alignment ? model.alignment : 'text-width';
                    break;
            }
        }
        let figureType = figureData[model['figuretype']]
        let figureAlignment = figureType[elementFigureAlignment]
        let divClass = figureAlignment['divClass'],
            figureClass = figureAlignment['figureClass'],
            previewClass = figureAlignment['previewClass'],
            figLabelClass = figureAlignment['figLabelClass'],
            figTitleClass = figureAlignment['figTitleClass'],
            dataType = figureAlignment['dataType'],
            imageDimension = figureAlignment['imageDimension'],
            figCaptionClass = figureAlignment['figCaptionClass'],
            figCreditClass = figureAlignment['figCreditClass'];
         console.log('Model: ',model)
        let figureHtmlData = getLabelNumberTitleHTML(model);
        if(model.figuretype === "authoredtext") {
            figureHtmlData["formattedContent"] = "<p class=\"paragraphNumeroUno\"></p>";
        }
        let { figureLabelValue } = this.state;
        let figureLabelFromApi = isAutoNumberingEnabled ? model.displayedlabel : checkHTMLdataInsideString(figureHtmlData.formattedLabel);
        let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
        if(!(isAutoNumberingEnabled)){
            if (dropdownData.indexOf(figureLabelFromApi?.toLowerCase()) > -1) {
                figureLabelFromApi = figureLabelFromApi?.toLowerCase();
                figureLabelValue = figureLabelFromApi.charAt(0)?.toUpperCase() + figureLabelFromApi?.slice(1);
            } else if (figureLabelFromApi === '' && figureLabelValue === 'No Label') {
                figureLabelValue = 'No Label';
            } else if (figureLabelFromApi !== '' && figureLabelValue === 'Custom') {
                figureLabelValue = 'Custom';
            }
        }
        let imgWidth = ''
        let imgHeight = ''
        if(this.props?.model?.figuredata && this.props.model.alignment === 'actual-size'){
            imgWidth = this.props.model.figuredata?.width && this.props.model.figuredata?.width !== '' ? `${this.props.model.figuredata?.width}px` : ''
            imgHeight = this.props.model.figuredata?.height && this.props.model.figuredata?.height !== '' ? `${this.props.model.figuredata?.height}px` : ''
        }
        const imageFigureTypes = ["image","mathImage","table"]
        const blockMathCodeTypes = ["authoredtext","codelisting"]
        const actualSizeClass = this.props.model.figuredata?.width > '600' ? "" : "img-actual-size";
        const imageClass = imageFigureTypes.indexOf(this.props.model.figuretype) > -1  ? "figure-image" : "";

        let figureTypeData = {
            imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight, figTitleClass, figureHtmlData
        }

        return (
            <div className="figureElement">
                {this.state.deleteAssetPopup && this.showDeleteAssetPopup()}
                <div className='figure-image-wrapper'>
                    <div className={divClass} resource="">
                        <figure className={figureClass} resource="">
                            {this.props.isAutoNumberingEnabled ?
                                <FigureHeader
                                    {...this.props}
                                    figureHtmlData={figureHtmlData}
                                    previewClass={previewClass}
                                    figLabelClass={figLabelClass}
                                    figTitleClass={figTitleClass}
                                /> :
                                <>
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
                                        {figureLabelValue === 'Custom' ?
                                            <div className='image-label'>
                                                <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                                <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                            </div> :
                                            <div className='image-label hide-field'>
                                                <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                                <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                            </div>
                                        }

                                        <div className="floating-number-group">
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-1`} placeholder="Number" tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedNumber) ? "transition-none" : "floating-number"}>Number</label>
                                        </div>

                                    </header>
                                    <div className="floating-title-group">
                                        <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-2`} placeholder="Title" tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                        <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? "transition-none" : "floating-title"}>Title</label>
                                    </div>
                                </>
                            }
                            <>
                                {
                                    this.renderAssetSection(figureTypeData)
                                }
                            </>
                            <figcaption >
                                <div className="floating-caption-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={blockMathCodeTypes.includes(this.props?.model?.figuretype)?`${this.props.index}-4`:`${this.props.index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass + " figureCaption"} model={this.props.model.html.captions} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                </div>
                            </figcaption>
                            <figcredit >
                                <div className="floating-credit-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={blockMathCodeTypes.includes(this.props?.model?.figuretype)?`${this.props.index}-5`:`${this.props.index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={this.props.model.html.credits} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.credits) ? "transition-none" : "floating-credit"}>Credit</label>
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
        saveSelectedAlfrescoElement: (payloadObj) => {
            dispatch(saveSelectedAlfrescoElement(payloadObj))
        }
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
        figureDropdownData: state.appStore.figureDropdownData,
        figImageList: state.autoNumberReducer.figImageList,
        slateAncestors: state.appStore.currentSlateAncestorData,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureImage);