import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";
// IMPORT - Assets //
import {
    DEFAULT_IMAGE_SOURCE
} from '../../constants/Element_Constants';
import config from '../../config/config';
import { getAlfrescositeResponse, handleAlfrescoSiteUrl, handleSiteOptionsDropdown } from './AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML, checkHTMLdataInsideString, dropdownValueAtIntialize, dropdownValueAtRender } from '../../constants/utility';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import figureData from './figureTypes';
import './../../styles/ElementFigure/ElementFigure.css';
import './../../styles/ElementFigure/FigureImage.css';
import { alfrescoPopup, saveSelectedAssetData } from '../AlfrescoPopup/Alfresco_Action';
import { updateFigureImageDataForCompare } from '../ElementContainer/ElementContainer_Actions';
import { connect } from 'react-redux';
import figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import { dropdownData, dropdownOptions, figureLabelData } from '../../constants/Element_Constants';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/
class FigureImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {},
            figureLabelValue: 'No Label',
            figureLabelData: figureLabelData,
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
        let figureHtmlData = getLabelNumberTitleHTML(this.props.model);
        let figureLabelValue = this.state;
        figureLabelValue = dropdownValueAtIntialize(dropdownData, figureHtmlData.formattedLabel);
        this.setState({ figureLabelValue: figureLabelValue });
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

    changeFigureLabel = (e, data) => {
        if (!(this.state.figureLabelValue === data)) {
            this.setState({ figureLabelValue: data });
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
        }
    }

    onFigureImageFieldBlur = (id) => {
        let labelElement = document.getElementById(`cypress-${id}`);
        if (labelElement?.nextElementSibling) {
            labelElement?.nextElementSibling?.classList?.remove('label-color-change');
        }
    }

    render() {
        const { model } = this.props;
        let elementFigureAlignment = ''
        if (model && model.figuretype) {
            switch (model.figuretype) {
                case 'table':
                case 'mathImage':
                    elementFigureAlignment = model.alignment ? model.alignment : 'half-text';
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
            figLabelClass = figureAlignment['figLabelClass'],
            figTitleClass = figureAlignment['figTitleClass'],
            dataType = figureAlignment['dataType'],
            imageDimension = figureAlignment['imageDimension'],
            figCaptionClass = figureAlignment['figCaptionClass'],
            figCreditClass = figureAlignment['figCreditClass'];

        let figureHtmlData = getLabelNumberTitleHTML(model);
        let { figureLabelValue } = this.state;
        figureLabelValue = dropdownValueAtRender(dropdownData, figureLabelValue, figureHtmlData.formattedLabel);

        return (
            <div className="figureElement">
                <div className='figure-image-wrapper'>
                    <div className={divClass} resource="">
                        <figure className={figureClass} resource="">
                            <header className="figure-header">
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
                                                    <li key={i} disabled = {this.state.figureLabelData === label} onClick={(e) => { this.changeFigureLabel(e, label); this.handleCloseDropDrown() }}>{label}</li>
                                                )

                                            })}
                                        </ul>
                                    </div>
                                }
                                {
                                    figureLabelValue === 'Custom' ?
                                        <div className='image-label'>
                                            <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-0`} placeholder="Label Name" tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                            <label className={checkHTMLdataInsideString(figureHtmlData.formattedLabel) ? "transition-none" : "floating-label"}>Label Name</label>
                                        </div>
                                        :
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
                            <div className="figure-image-container">

                                <div id="figure_add_div" className={`pearson-component image figureData ${this.props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                                    {
                                        this.props.model.figuredata && this.props.model.figuredata.imageid ?
                                            <img src={this.state.imgSrc ? this.state.imgSrc : (this.props.model.figuredata.path && this.props.model.figuredata.path !== "" ? this.props.model.figuredata.path : '')}
                                                data-src={this.state.imgSrc}
                                                title=""
                                                alt=""
                                                className={imageDimension + ' lazyload'}
                                                draggable="false" />
                                            : <div className='figurebutton' onClick={this.addFigureResource}>Select an Image</div>
                                    }

                                </div>
                                <div>
                                    {
                                        this.props.model.figuredata && this.props.model.figuredata.imageid !== "" ? <div className="figure-wrapper">
                                            <div className="figure-image-info">
                                                <div className='image-figure'><p className='image-text'>Image ID: </p> <span className='image-info'> {this.props.model.figuredata && this.props.model.figuredata.imageid ? this.props.model.figuredata.imageid : ""} </span> </div>
                                                <div className='image-figure-path'><p className='image-text'>Image Path: </p> <span className='image-info'> {this.state.imgSrc ? this.state.imgSrc : (this.props.model.figuredata.path && this.props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.props.model.figuredata.path : "")}</span> </div>
                                                <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{this.props.model.figuredata && this.props.model.figuredata.path && this.props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.state.alfrescoSite : ""} </span> </div>
                                            </div>
                                            <div className='updatefigurebutton' onClick={this.addFigureResource}>Update Image</div>
                                            <div className='deletefigurebutton' onClick={this.deleteFigureResource}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                            <figcaption >
                                <div className="floating-caption-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-3`} placeholder="Caption" tagName={'p'} className={figCaptionClass + " figureCaption"} model={this.props.model.html.captions} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
                                    <label className={checkHTMLdataInsideString(this.props?.model?.html?.captions) ? "transition-none" : "floating-caption"}>Caption</label>
                                </div>
                            </figcaption>
                            <figcredit >
                                <div className="floating-credit-group">
                                    <TinyMceEditor onFigureImageFieldFocus={this.onFigureImageFieldFocus} onFigureImageFieldBlur={this.onFigureImageFieldBlur} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${this.props.index}-4`} placeholder="Credit" tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={this.props.model.html.credits} slateLockInfo={this.props.slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props.parentElement} showHideType={this.props.showHideType} />
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
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId: state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isCiteChanged: state.alfrescoReducer.isCiteChanged,
        changedSiteData: state.alfrescoReducer.changedSiteData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureImage);