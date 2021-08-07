import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";

// IMPORT - Assets //
import {
    DEFAULT_IMAGE_DATA_SOURCE,
    DEFAULT_IMAGE_SOURCE
} from '../../constants/Element_Constants';
import config from '../../config/config';
import { getAlfrescositeResponse,handleAlfrescoSiteUrl } from './AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML } from '../../constants/utility';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader';
import figureData from './figureTypes';
import './../../styles/ElementFigure/FigureImage.css';
import {alfrescoPopup, saveSelectedAssetData} from '../AlfrescoPopup/Alfresco_Action';
import { connect } from 'react-redux';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

class FigureImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {}
        }
    }

    componentDidMount() {
        const figureImageTypes = ["image", "mathImage", "table"];
        if(figureImageTypes.includes(this.props?.figureElementProps?.model?.figuretype)){
          getAlfrescositeResponse(this.props.figureElementProps.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title,
                alfrescoSiteData:{...response}
            })
          })
        } 
    }
    componentDidUpdate(prevProps) {
        const { alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props;
        const { elementId } = this.props.figureElementProps;
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ) {
            this.dataFromNewAlfresco(alfrescoAssetData)
        }
    }

    updateAlfrescoSiteUrl = () => {
        let repositoryData = this.state.alfrescoSiteData
        if (repositoryData?.repositoryFolder || repositoryData?.title ) {
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
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */

          dataFromNewAlfresco = (data) => {
            hideTocBlocker();
            disableHeader(false);
            let imageData = data;
            let epsURL = imageData.epsUrl? imageData.epsUrl : "";
            let figureType = data?.content?.mimeType?.split('/')[0]             
            //commented lines will be used to update the element data
            let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
            let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
    
            if (figureType === "image" || figureType === "table" || figureType === "mathImage") {
    
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
    
                this.props.figureElementProps.updateFigureData(setFigureData, this.props.figureElementProps.index, this.props.figureElementProps.elementId, this.props.figureElementProps.asideData, () => {
                    this.props.figureElementProps.handleFocus("updateFromC2");
                    this.props.figureElementProps.handleBlur();
                })
                let alfrescoData = config?.alfrescoMetaData?.alfresco;
                let alfrescoSiteLocation = this.state.alfrescoSiteData;
                if(this.props.isCiteChanged){
                    let changeSiteAlfrescoData={
                        currentAsset: {},
                        nodeRef: this.props.changedSiteData.guid,
                        repositoryFolder: this.props.changedSiteData.title,
                        siteId: this.props.changedSiteData.id,
                        visibility: this.props.changedSiteData.visibility
                    }
                    handleAlfrescoSiteUrl(this.props.figureElementProps.elementId, changeSiteAlfrescoData)
                    this.setState({
                        alfrescoSite: changeSiteAlfrescoData?.repositoryFolder,
                        alfrescoSiteData:changeSiteAlfrescoData
                    })
                } else {
                    if ((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')) {
                        handleAlfrescoSiteUrl(this.props.figureElementProps.elementId, alfrescoData)
                        this.updateAlfrescoSiteUrl()
                    }
                }
                // to blank the elementId and asset data after update
                let payloadObj = {
                    asset: {}, 
                    id: ''
                }
                this.props.saveSelectedAssetData(payloadObj)
                //this.updateAlfrescoSiteUrl(alfrescoData)
            }
        }
        /**
         * @description function will be called on image src add and fetch resources from Alfresco
         */
        handleC2MediaClick = (e) => {
            this.props.figureElementProps.handleFocus();
            if (hasReviewerRole()) {
                return true
            }
            if (e.target.tagName.toLowerCase() === "p") {
                e.stopPropagation();
                return;
            }
    
            const figureDataObj = this.props.figureElementProps.model.figuredata;
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
            if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
                if (this.props.figureElementProps.permissions && this.props.figureElementProps.permissions.includes('add_multimedia_via_alfresco')) {
                    let alfrescoLocationData = this.state.alfrescoSiteData
                    let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                    alfrescoSiteName = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    let nodeRefs = alfrescoPath?.alfresco?.nodeRef ? alfrescoPath?.alfresco?.nodeRef : alfrescoPath.alfresco.guid
                    const locationSiteDataNodeRef =alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
                    nodeRefs = locationSiteDataNodeRef ? locationSiteDataNodeRef : nodeRefs;
                    const locationSiteDataTitle = alfrescoLocationData?.repositoryFolder ? alfrescoLocationData.repositoryFolder : alfrescoLocationData?.title
                    let messageObj = { citeName: locationSiteDataTitle? locationSiteDataTitle : alfrescoSiteName, 
                        citeNodeRef: nodeRefs, 
                        elementId: this.props.figureElementProps.elementId,
                        currentAsset
                     }
                    sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                }
                else {
                    this.props.figureElementProps.accessDenied(true)
                }
    
            }} else {
                if (this.props.figureElementProps.permissions.includes('alfresco_crud_access')) {
                    this.handleSiteOptionsDropdown(alfrescoPath, this.props.figureElementProps.elementId, this.state.alfrescoSiteData)
                } else {
                    this.props.figureElementProps.accessDenied(true)
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

    handleSiteOptionsDropdown = (alfrescoPath, id, locationData) =>{
        let that = this
        let url = `${config.ALFRESCO_EDIT_METADATA}/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'PearsonSSOSession': SSOToken
                }
            })
            .then(function (response) {
            
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                id,
                locationData
            }
                that.props.alfrescoPopup(payloadObj)
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }

    render() {
        const { figureElementProps } = this.props;
        let elementFigureAlignment = ''
        if (figureElementProps.model && figureElementProps.model.figuretype) {
            switch (figureElementProps.model.figuretype) {
                case 'table':
                case 'mathImage':
                    elementFigureAlignment = figureElementProps.model.alignment ? figureElementProps.model.alignment : 'half-text';
                    break;
                case 'image':
                default:
                    elementFigureAlignment = figureElementProps.model.alignment ? figureElementProps.model.alignment : 'text-width';
                    break;
            }
        }
        let figureType = figureData[figureElementProps.model['figuretype']]
        let figureAlignment = figureType[elementFigureAlignment]
        let divClass = figureAlignment['divClass'],
            figureClass = figureAlignment['figureClass'],
            figLabelClass = figureAlignment['figLabelClass'],
            figTitleClass = figureAlignment['figTitleClass'],
            dataType = figureAlignment['dataType'],
            imageDimension = figureAlignment['imageDimension'],
            figCaptionClass = figureAlignment['figCaptionClass'],
            figCreditClass = figureAlignment['figCreditClass'];

        let figureHtmlData = getLabelNumberTitleHTML(figureElementProps.model);
        console.log("yha aaaaaaaaaaaaaaaaaaaaaaaa rha hai")
            return (
                <div className="figureElement">
                    <div className={divClass} resource="">
                        <figure className={figureClass} resource="">
                            <header className="figure-header">

                                <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement} showHideType={figureElementProps.showHideType} />

                                <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-1`} placeholder="Enter Number..." tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement} showHideType={figureElementProps.showHideType} />

                                <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-2`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement} showHideType={figureElementProps.showHideType} />

                            </header>
                            <div className="figurecont">

                                <div className={`pearson-component image figureData ${figureElementProps.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                                    {
                                        figureElementProps.model.figuredata && figureElementProps.model.figuredata.imageid ?
                                            <img src={this.state.imgSrc}
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
                                       figureElementProps.model.figuredata && figureElementProps.model.figuredata.imageid !== "" ? <div className="figure-wrapper">
                                            <div className="figure-image-info">
                                                <div className='image-figure'><p className='image-text'>Image ID: </p> <span className='image-info'> {figureElementProps.model.figuredata && figureElementProps.model.figuredata.imageid ? figureElementProps.model.figuredata.imageid : ""} </span> </div>
                                                <div className='image-figure-path'><p className='image-text'>Image Path: </p> <span className='image-info'> {this.state.imgSrc ? this.state.imgSrc : (figureElementProps.model.figuredata.path && figureElementProps.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? figureElementProps.model.figuredata.path : "")}</span> </div>
                                                <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{figureElementProps.model.figuredata && figureElementProps.model.figuredata.path && figureElementProps.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.state.alfrescoSite : ""} </span> </div>
                                            </div>
                                            <div className='updatefigurebutton' onClick={this.addFigureResource}>Update Image</div>
                                        </div> : ''
                                    }
                                </div>
                            </div>
                            <figcaption >
                                <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={figureElementProps.model.html.captions} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement} showHideType={figureElementProps.showHideType} />
                            </figcaption>
                            <figcredit >
                                <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-4`} placeholder="Enter Credit..." tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={figureElementProps.model.html.credits} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement} showHideType={figureElementProps.showHideType} />
                            </figcredit>
                        </figure>
                    </div>
                </div>
            );
    }
}

const mapActionToProps = (dispatch) =>{
    return{
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isCiteChanged : state.alfrescoReducer.isCiteChanged,
        changedSiteData: state.alfrescoReducer.changedSiteData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureImage);