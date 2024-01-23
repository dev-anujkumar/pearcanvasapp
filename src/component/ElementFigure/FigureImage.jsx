import React, { Component, createRef } from 'react';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
import FigureImageAsset from './FigureImageAsset.jsx';
import FigureTableAsset from './FigureTableAsset.jsx';
import BlockMathCode from './BlockMathCode.jsx';
// IMPORT - Assets //
import { DEFAULT_IMAGE_SOURCE, EXIF_PIXELXDIMENSION, EXIF_PIXELYDIMENSION, IMAGE_SCHEMA_URL, INSTITUTION_URLS, labelHtmlData, TRANSITION_NONE } from '../../constants/Element_Constants';
import config from '../../config/config';
import { handleAlfrescoSiteUrl, handleSiteOptionsDropdown } from './AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, 
        dropdownValueForFiguretype, labelValueForFiguretype, getCookieByName } from '../../constants/utility';
import { hideTocBlocker, disableHeader, showTocBlocker, hideToc } from '../../js/toggleLoader';
import { decoToOtherTypeConversion, fetchOldDataAfterConversion, updateAutoNumberingDropdownForCompare } from '../ElementContainer/ElementContainer_Actions.js';
import figureData from './figureTypes';
import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureImage.css';
import { alfrescoPopup, saveSelectedAssetData, saveSelectedAlfrescoElement } from '../AlfrescoPopup/Alfresco_Action';
import { updateFigureImageDataForCompare } from '../ElementContainer/ElementContainer_Actions';
import { connect } from 'react-redux';
import PopUp from '../PopUp';
import { DELETE_DIALOG_TEXT } from '../SlateWrapper/SlateWrapperConstants';
import { setAutoNumberSettingValue, AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER,
        AUTO_NUMBER_SETTING_OVERRIDE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER } from '../FigureHeader/AutoNumber_helperFunctions.js';
import FigureHeader from '../FigureHeader/FigureHeader.jsx';
import { IMAGE, TABLE, MATH_IMAGE, TABLE_AS_MARKUP, MATH_ML, BLOCK_CODE } from './ElementFigure_Constants'
import { launchTableSPA } from './ElementFigure_Utility';
import KeyboardWrapper, { QUERY_SELECTOR } from '../Keyboard/KeyboardWrapper.jsx';
/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
const BLANK_LABEL_OPTIONS = ['No Label', 'Custom'];
const imageFigureTypes = ["image","mathImage","table","tableasmarkup","authoredtext","codelisting"];
const blockMathCodeTypes = ["authoredtext","codelisting"];

const KEYBOARD_ENABLE = [TABLE, MATH_IMAGE, MATH_ML, BLOCK_CODE, IMAGE];

class FigureImage extends Component {
    constructor(props) {
        super(props);
        this.labelRef = createRef(null);
        this.labelListRef = createRef(null);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {},
            figureLabelValue: labelValueForFiguretype(this.props?.model),
            figureNumberLabelValue: 'Default Auto-number',
            figureLabelData: dropdownValueForFiguretype(this.props?.model, this.props?.figureDropdownData),
            figureNumberLabelData: [AUTO_NUMBER_SETTING_DEFAULT, AUTO_NUMBER_SETTING_RESUME_NUMBER, AUTO_NUMBER_SETTING_REMOVE_NUMBER,
                                    AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, AUTO_NUMBER_SETTING_OVERRIDE_NUMBER],
            figureDropDown: false,
            figureNumberDropDown: false,
            deleteassetPopup: false
        }
        this.wrapperRef = React.createRef();
    }

    componentDidMount() {
        const { alfrescoPlatformMetadata } = this.props.model 
        document.addEventListener('mousedown', this.handleClickOutside);

        this.setState({
            alfrescoSite: (alfrescoPlatformMetadata && Object.keys(alfrescoPlatformMetadata).length > 0) ? (alfrescoPlatformMetadata?.repositoryFolder ?
                          alfrescoPlatformMetadata?.repositoryFolder : alfrescoPlatformMetadata.title) : "",
            alfrescoSiteData: { ...alfrescoPlatformMetadata }
        })
        let figureHtmlData = this.props.isAutoNumberingEnabled && imageFigureTypes.indexOf(this.props.model.figuretype) > -1  ?
                            {formattedLabel: `<p>${this.props.model.displayedlabel}</p>`} : getLabelNumberTitleHTML(this.props.model);
        let figureLabelValue = this.state;
        const labelList = dropdownValueForFiguretype(this.props?.model, this.props?.figureDropdownData)
        let dropdownData = this.convertOptionsToLowercase(labelList);
        figureLabelValue = dropdownValueAtIntialize(dropdownData, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
        const dropdownVal = setAutoNumberSettingValue(this.props.model)
        this.setState({
            figureNumberLabelValue: dropdownVal
        });
       }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        this.wrapperRef?.current?.removeEventListener('keydown', this.wrapperRef);
      }

    componentDidUpdate(prevProps, prevState) {
        const { alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup, elementId } = this.props;
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup) {
            this.dataFromNewAlfresco(alfrescoAssetData)
        }
        if(!prevState.figureDropDown && this.state.figureDropDown) {
            this.setState({showingListIndex: 0});
            this.labelListRef.current?.childNodes[0].focus();
            this.labelListRef.current?.addEventListener('keydown', this.handleLabelKeyDown)
            this.labelListRef.current?.addEventListener('click', this.handleLabelKeyDown)
        }
    }


    handleLabelKeyDown = (event) => {
       if(this.isEnableKeyboard()) {
            if(event.keyCode === 13) {
                this.labelListRef.current.childNodes[this.state.showingListIndex].click();
                this.labelRef.current.focus();
            } else if(event.button == 0){
                const nodeValue = (event.target?.attributes[1]?.nodeValue)
                this.labelListRef?.current?.childNodes[nodeValue]?.click();
                this.labelRef?.current?.focus();
                this.setState({showingListIndex: nodeValue});
            }
            else if (event.keyCode === 40) {
                if(this.labelListRef.current.childNodes[this.state.showingListIndex + 1]) {
                    this.labelListRef.current.childNodes[this.state.showingListIndex + 1 ].focus();
                    this.setState({showingListIndex: this.state.showingListIndex + 1});
                }
            } else if (event.keyCode === 38) {
                if(this.labelListRef.current.childNodes[this.state.showingListIndex - 1]) {
                    this.labelListRef.current.childNodes[this.state.showingListIndex - 1].focus();
                    this.setState({showingListIndex: this.state.showingListIndex - 1});

                }
            }
            if(event.button != 0){
            event.stopPropagation();
            event.preventDefault();
            }
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

    isEnableKeyboard = () => {
    if (this.props.model?.figuredata?.programlanguage === "Select") {
            return false
        }
        else {
        return KEYBOARD_ENABLE.indexOf(this.props.model.figuretype) > -1
        }
    }

    /**
* @description delete image from element
*/

    deleteFigureResource = () => {
        const dropdownVal = setAutoNumberSettingValue(this.props?.model)
        this.props?.updateAutoNumberingDropdownForCompare({entityUrn: this.props?.model?.contentUrn, option: dropdownVal});
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        this.toggleDeletePopup(false)

        // store current element figuredata in store
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
        let setFigureData = {
            schema: IMAGE_SCHEMA_URL,
            imageid: "",
            path: "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
            height: "422",
            width: "680"
        }
        if (this.props.model?.figuredata?.decorative) {
            setFigureData = {
                ...setFigureData,
                decorative: true
            }
        }
        // Reset state on click of delete Asset from Figure Element
        this.setState({
            alfrescoSiteData: {}
        })
        handleAlfrescoSiteUrl(this.props.elementId, {})
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
        const disableDeleteWarnings = getCookieByName("DISABLE_DELETE_WARNINGS");
        if (this.state.deleteAssetPopup && !disableDeleteWarnings) {
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
        } else if (this.state.deleteAssetPopup && disableDeleteWarnings) {
            this.deleteFigureResource()
            return null
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
        let epsURL = imageData.epsUrl ? imageData.epsUrl : imageData?.[INSTITUTION_URLS] &&
            imageData?.[INSTITUTION_URLS][0]?.publicationUrl ?
            imageData?.[INSTITUTION_URLS][0]?.publicationUrl : "";
        let figureType = data?.content?.mimeType?.split('/')[0]
        //commented lines will be used to update the element data
        let width = imageData.properties[EXIF_PIXELXDIMENSION] ? imageData.properties[EXIF_PIXELXDIMENSION] : "";
        let height = imageData.properties[EXIF_PIXELYDIMENSION] ? imageData.properties[EXIF_PIXELYDIMENSION] : "";
        if (figureType === "image" || figureType === "table" || figureType === "mathImage" || figureType === "authoredtext" || figureType === "codelisting") {
        let uniqID = imageData.id ? imageData.id : "";
        let altText = imageData.properties["cplg:altText"] ? imageData.properties["cplg:altText"] : '';
        let longDesc = imageData.properties['cplg:longDescription'] ? imageData.properties['cplg:longDescription'] : "";
        if (epsURL !== "") {
            this.setState({ imgSrc: epsURL })
        } else {
            this.setState({ imgSrc: DEFAULT_IMAGE_SOURCE })
        }

        /**let scaleMarkerData = {};
        Object.assign(scaleMarkerData, (data && data.scalemarker &&
             data.scalemarker.properties) ? { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.id || null } : null,
            (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.name || "The alttext for the scale image" } : null,
            (data && data.scalemarker && data.scalemarker.epsUrl) ? { "path": data.scalemarker.epsUrl || null } : null,
            (data && data.scalemarker && data.properties) ? { "height": data.properties["exif:pixelYDimension"] || null } : null,
            (data && data.scalemarker && data.scalemarker.properties && data.properties["exif:pixelXDimension"]) ?
            { "width": data.properties["exif:pixelXDimension"] || null } : null,
        ); */
        let scaleMarkerAsset = {};
            if (data.scalemarker) {
                scaleMarkerAsset = {
                    'schema': IMAGE_SCHEMA_URL,
                    'imageid': data.scalemarker?.id ?? data?.id ?? null,
                    'alttext': data.scalemarker?.name ?? "The alttext for the scale image",
                    'path': data.scalemarker?.epsUrl ? data.scalemarker?.epsUrl :
                        data.scalemarker?.[INSTITUTION_URLS]?.[0]?.publicationUrl ?
                        data.scalemarker[INSTITUTION_URLS][0].publicationUrl : "",
                    'height': data.scalemarker?.properties?.[EXIF_PIXELYDIMENSION] ?? null,
                    'width': data.scalemarker?.properties?.[EXIF_PIXELXDIMENSION] ?? null
                };
            }

        // store current element figuredata in store
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
        let setFigureData = {
            path: epsURL,
            height: height,
            width: width,
            schema: IMAGE_SCHEMA_URL,
            imageid: `urn:pearson:alfresco:${uniqID}`,
            alttext: altText,
            longdescription: longDesc
        }
        if (this.props.model?.figuredata?.decorative) {
            setFigureData = {
                ...setFigureData,
                decorative: true
            }
        }

        Object.assign(setFigureData, (Object.keys(scaleMarkerAsset).length > 0) ? { scaleimage: scaleMarkerAsset } : null);

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
        const figureType = this.props?.model?.figuretype ? "image" : null;
        const currentAsset = figureDataObj ? {
            id: figureDataObj?.imageid ? figureDataObj.imageid.split(':').pop() : '', // get last
            type: figureType,
        } : null;

        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
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
                        appName:'cypress',
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
                let payloadObj = await handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.state.alfrescoSiteData, currentAsset);
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
        launchTableSPA(this.props.elementId, this.props.parentEntityUrn, this.props?.asideData?.sectionType, this.props.handleFocus);
    }

    /**
     * @description function will be called on image src add and fetch resources
     */
    addFigureResource = (e) => {
        const dropdownVal = setAutoNumberSettingValue(this.props?.model)
        this.props?.updateAutoNumberingDropdownForCompare({entityUrn: this.props?.model?.contentUrn, option: dropdownVal});
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
        if (labelElement?.nextElementSibling && labelElement?.nextElementSibling?.classList?.contains(TRANSITION_NONE)) {
            labelElement?.nextElementSibling?.classList?.add('label-color-change');
        } else if (!(labelHtmlData.includes(labelElement?.innerHTML)) && !(labelElement?.nextElementSibling?.classList?.contains(TRANSITION_NONE))) { // BG-5075
            labelElement?.nextElementSibling?.classList?.add(TRANSITION_NONE);
        }
        this.props.updateFigureImageDataForCompare(this.props.model.figuredata);
    }

    onFigureImageFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
        if (labelHtmlData.includes(labelElement?.innerHTML) && labelElement?.nextElementSibling?.classList?.contains(TRANSITION_NONE)) {
            labelElement?.nextElementSibling?.classList?.remove(TRANSITION_NONE);
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

    renderAssetSection = (figureTypeData) => {
        let figureJsx;
        if (this.props.model && this.props.model.figuretype) {
            switch (this.props.model.figuretype) {
                case TABLE_AS_MARKUP:
                    figureJsx = <FigureTableAsset {...this.props} figureTypeData={figureTypeData} addFigureResource={this.addFigureResource} />
                break;
                case MATH_ML:
                case BLOCK_CODE:
                    figureJsx = <BlockMathCode isEnableKeyboard={this.isEnableKeyboard()}
                    {...this.props} figureTypeData={figureTypeData} onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} />
                break;
                case TABLE:
                case MATH_IMAGE:
                case IMAGE:
                default:
                    figureJsx = <FigureImageAsset isEnableKeyboard={this.isEnableKeyboard()} {...this.props} figureTypeData={figureTypeData}
                    imgSrc={this.state.imgSrc} alfrescoSite={this.state.alfrescoSite} addFigureResource={this.addFigureResource} toggleDeletePopup={this.toggleDeletePopup} />
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
                case TABLE:
                case MATH_IMAGE:
                    elementFigureAlignment = model.alignment ? model.alignment : 'half-text';
                    break;
                case TABLE_AS_MARKUP:
                    elementFigureAlignment = model.alignment ? model.alignment : 'table-editor';
                    break;
                case MATH_ML:
                    elementFigureAlignment = model.alignment ? model.alignment : 'mathml';
                    break;
                case BLOCK_CODE:
                    elementFigureAlignment = 'code-listing';
                    break;
                case IMAGE:
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
        let figureHtmlData = getLabelNumberTitleHTML(model);
        let { figureLabelValue } = this.state;
        let figureLabelFromApi = isAutoNumberingEnabled && imageFigureTypes.indexOf(this.props.model.figuretype) > -1 ?
                                model.displayedlabel : checkHTMLdataInsideString(figureHtmlData.formattedLabel);
        let dropdownData = this.convertOptionsToLowercase(this.state.figureLabelData);
        if (!(isAutoNumberingEnabled)) {
            if (this.props.decoToOtherTypes && model?.id === this.props.conversionData?.id) { // if the image conversion is from decorative to any other figure type
                this.state.figureLabelValue = 'No Label';
                this.props.decoToOtherTypeConversion(false);
            }
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
        const actualSizeClass = this.props.model.figuredata?.width > '600' ? "" : "img-actual-size";
        const imageClass = imageFigureTypes.indexOf(this.props.model.figuretype) > -1  ? "figure-image" : "";
        let preformattedText = model.html && model.html.preformattedtext && model.html.preformattedtext.replace(/<p>/g, "")
            preformattedText = preformattedText && preformattedText.replace(/<\/p>/g, "")
        let processedText = preformattedText ? preformattedText : '<span class="codeNoHighlightLine"><br /></span>';
        if (!preformattedText || preformattedText === '<p></p>') {
            processedText = '<span class="codeNoHighlightLine"><br /></span>'
        }
        let posterText = model.html.text
        if (posterText === "" || posterText === '<p></p>') {
            posterText = '<br />';
        }
        let figureTypeData = {
            imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight, figTitleClass, figureHtmlData, processedText, posterText
        }
        const autoNumberedElement = imageFigureTypes.indexOf(this.props.model.figuretype) > -1 ? true : false;
        const captionsHtml = this.props?.model?.html?.captions?.replace("<p>", '')?.replace("</p>", '');
        const creditsHtml = this.props?.model?.html?.credits?.replace("<p>", '')?.replace("</p>", '');
        const isReviewer = hasReviewerRole();
        const isDecorativeImage = this.props.model?.figuredata?.decorative ? true : false
        return (
            <div className="figureElement">
                {this.state.deleteAssetPopup && this.showDeleteAssetPopup()}
                <div className='figure-image-wrapper'>
                    <div className={`${divClass} ${model?.figuretype === 'codelisting' ? 'blockCodeFigure' : '' }`} resource="">
                        <figure className={figureClass} resource="">
                            {isDecorativeImage ? '' :
                            <>
                            {this.props.isAutoNumberingEnabled && autoNumberedElement ?
                                <FigureHeader
                                    {...this.props}
                                    figureHtmlData={figureHtmlData}
                                    previewClass={previewClass}
                                    figLabelClass={figLabelClass}
                                    figTitleClass={figTitleClass}
                                /> :
                                <>
                                    <header className={`figure-header new-figure-image-header ${isReviewer ? "pointer-events-none" : ""}`}>
                                        <div className='figure-label-field'>
                                            <span className={`label ${this.state.figureDropDown ? 'active' : ''}`}>Label</span>
                                            <KeyboardWrapper index={`${this.props.index}-label-1`} enable={this.isEnableKeyboard()} focus>
                                                <div ref={this.labelRef} tabIndex={0} onKeyDown={(e) => {
                                                    if(this.isEnableKeyboard()) {
                                                        const key = e.which || e.keyCode || e.button;
                                                        if(key === 13 || key === 0) {
                                                            this.handleFigureDropdown();
                                                        }
                                                        if(key === 38) {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                        }
                                                    }
                                                }}>
                                                    <div className={this.props.selectedElement === `${QUERY_SELECTOR}-${this.props.index}-label-1` ?
                                                    "figure-label-highlight" : "figure-label"} onClick={this.handleFigureDropdown}>
                                                        <span>{figureLabelValue}</span>
                                                        <span> <svg className="dropdown-arrow" viewBox="0 0 9 4.5"><path d="M0,0,4.5,4.5,9,0Z"></path></svg> </span>
                                                    </div>
                                                </div>
                                            </KeyboardWrapper>
                                        </div>
                                        {this.state.figureDropDown &&
                                            <div tabIndex={0} className="figure-dropdown" ref={this.wrapperRef}>
                                                <ul ref={this.labelListRef}>
                                                    {this.state.figureLabelData.map((label, i) => {
                                                        return (
                                                            <li tabIndex={0} currentIndex={i} key={i} onClick={() => {
                                                                this.changeFigureLabel(figureLabelValue, label); this.handleCloseDropDrown() }}>{label}</li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        }
                                        {figureLabelValue === 'Custom' ?
                                            <KeyboardWrapper index={`${this.props.index}-0`}  enable={this.isEnableKeyboard()}>
                                            <div className='image-label'>
                                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus}
                                                            onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                                            permissions={this.props.permissions}
                                                            openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                                            element={this.props.model}
                                                            handleEditorFocus={this.props.handleFocus}
                                                            handleBlur={this.props.handleBlur} index={`${this.props.index}-0`} placeholder="Label Name"
                                                            tagName={'h4'} className={figLabelClass + " figureLabel "}
                                                            model={figureHtmlData.formattedLabel}
                                                            slateLockInfo={this.props.slateLockInfo}
                                                            glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                                            glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                                                            parentElement={this.props.parentElement}
                                                            showHideType={this.props.showHideType} />

                                                <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? TRANSITION_NONE : "floating-label"}>Label Name</label>
                                            </div> </KeyboardWrapper>:
                                            <div className='image-label hide-field'>
                                                {/* <KeyboardWrapper index={`${this.props.index}-0`}  enable>  */}
                                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                                    permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                                    element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur}
                                                    index={`${this.props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "}
                                                    model={figureHtmlData.formattedLabel} slateLockInfo={this.props.slateLockInfo}
                                                    glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                                    elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                                {/* </KeyboardWrapper> */}
                                                        <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ?
                                                            TRANSITION_NONE : "floating-label"}>Label Name</label>
                                            </div>
                                        }
                                    <KeyboardWrapper index={`${this.props.index}-1`} enable={this.isEnableKeyboard()}>
                                        <div className={`floating-number-group`}>
                                                <TinyMceEditor 
                                                            onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                                            permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                                            element={this.props.model} handleEditorFocus={this.props.handleFocus}
                                                            handleBlur={this.props.handleBlur} index={`${this.props.index}-1`} placeholder="Number" tagName={'h4'}
                                                            className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber}
                                                            slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                                            glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                                                            parentElement={this.props.parentElement}
                                                            showHideType={this.props.showHideType}
                                                            contenteditable={!hasReviewerRole()} />

                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedNumber) ? TRANSITION_NONE : "floating-number"}>Number</label>
                                        </div>
                                        </KeyboardWrapper>
                                    </header>
                                    <KeyboardWrapper index={`${this.props.index}-2`} enable={this.isEnableKeyboard()}>
                                        <div className={`floating-title-group`}>
                                                    <TinyMceEditor
                                                        onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                                        permissions={this.props.permissions}
                                                        openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                                                        handleEditorFocus={this.props.handleFocus}
                                                        handleBlur={this.props.handleBlur} index={`${this.props.index}-2`} placeholder="Title"
                                                        tagName={'h4'} className={figTitleClass + " figureTitle "}
                                                        model={figureHtmlData.formattedTitle} slateLockInfo={this.props.slateLockInfo}
                                                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                                                        parentElement={this.props.parentElement}
                                                        showHideType={this.props.showHideType} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedTitle) ? TRANSITION_NONE : "floating-title"}>Title</label>
                                        </div>
                                    </KeyboardWrapper>
                                </>
                            }
                            </>
                            }
                            <>
                                {
                                    this.renderAssetSection(figureTypeData)
                                }
                            </>
                            {isDecorativeImage ? '' : <figcaption >
                            <KeyboardWrapper enable={this.isEnableKeyboard()}
                             index={blockMathCodeTypes.includes(this.props?.model?.figuretype)?`${this.props.index}-4`:`${this.props.index}-3`}>
                                <div className={`floating-caption-group`}>
                                        <TinyMceEditor
                                            onFigureImageFieldFocus={this.onFigureImageFieldFocus}
                                            onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                            permissions={this.props.permissions}
                                            openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                            element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur}
                                            index={blockMathCodeTypes.includes(this.props?.model?.figuretype)
                                                ? `${this.props.index}-4` : `${this.props.index}-3`}
                                            placeholder="Caption" tagName={'p'}
                                            className={figCaptionClass + " figureCaption"}
                                            model={captionsHtml} slateLockInfo={this.props.slateLockInfo}
                                            glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                            elementId={this.props.elementId}
                                            parentElement={this.props.parentElement}
                                            showHideType={this.props.showHideType} />
                                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.captions) ? TRANSITION_NONE : "floating-caption"}>Caption</label>
                                </div>
                                </KeyboardWrapper>
                            </figcaption>}
                            <figcredit >
                            <KeyboardWrapper enable={this.isEnableKeyboard()}
                            index={blockMathCodeTypes.includes(this.props?.model?.figuretype)?`${this.props.index}-5`:`${this.props.index}-4`}>
                                <div className={`floating-credit-group`}>
                                        <TinyMceEditor
                                            onFigureImageFieldFocus={this.onFigureImageFieldFocus}
                                            onFigureImageFieldBlur={this.onFigureImageFieldBlur}
                                            permissions={this.props.permissions}
                                            openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                                            element={this.props.model}
                                            handleEditorFocus={this.props.handleFocus}
                                            handleBlur={this.props.handleBlur}
                                            index={blockMathCodeTypes.includes(this.props?.model?.figuretype) ?
                                                `${this.props.index}-5` : `${this.props.index}-4`}
                                            placeholder="Credit" tagName={'figureCredit'}
                                            className={figCreditClass + " figureCredit"}
                                            model={creditsHtml} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                                            glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                                            elementId={this.props.elementId}
                                            parentElement={this.props.parentElement}
                                            showHideType={this.props.showHideType} />
                                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.credits) ? TRANSITION_NONE : "floating-credit"}>Credit</label>
                                </div>
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
        },
        updateAutoNumberingDropdownForCompare: (value) => {
            dispatch(updateAutoNumberingDropdownForCompare(value))
        },
        decoToOtherTypeConversion : (value) => {
            dispatch(decoToOtherTypeConversion(value));
        },
        fetchOldDataAfterConversion : (conversionData) => {
            dispatch(fetchOldDataAfterConversion(conversionData));
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
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        selectedElement: state.keyboardReducer.selectedElement,
        decoToOtherTypes: state.appStore.decoToOtherTypes,
        conversionData: state.appStore.conversionData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureImage);
