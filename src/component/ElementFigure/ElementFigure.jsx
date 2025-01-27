import React, { Component } from 'react'
import PropTypes from 'prop-types'
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";

// IMPORT - Assets //
import './../../styles/ElementFigure/ElementFigure.css';
import {
    DEFAULT_IMAGE_DATA_SOURCE,
    DEFAULT_IMAGE_SOURCE,
    EXIF_PIXELXDIMENSION,
    EXIF_PIXELYDIMENSION
} from '../../constants/Element_Constants';
import config from '../../config/config';
import axios from 'axios';
import { sendDataToIframe, hasReviewerRole, getLabelNumberTitleHTML } from '../../constants/utility';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader'
import figureData from './figureTypes';
import { handleAlfrescoSiteUrl } from './AlfrescoSiteUrl_helper.js'
import {alfrescoPopup, saveSelectedAssetData} from '../AlfrescoPopup/Alfresco_Action'
import { connect } from 'react-redux';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

class ElementFigure extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.model.figuretype === 'tableasmarkup' || nextProps.model.figuretype === 'authoredtext' || nextProps.model.figuretype === 'codelisting') {
            this.setState({
                imgSrc: null
            })
        }
    }

    componentDidMount() {
        const { alfrescoPlatformMetadata } = this.props.model
        const figureImageTypes = ["image", "mathImage", "table"]
        if(figureImageTypes.includes(this.props?.model?.figuretype)){
            this.setState({
                alfrescoSite: (alfrescoPlatformMetadata && Object.keys(alfrescoPlatformMetadata).length > 0) ? (alfrescoPlatformMetadata?.repositoryFolder ?
                              alfrescoPlatformMetadata?.repositoryFolder : alfrescoPlatformMetadata?.title) : "",
                alfrescoSiteData: { ...alfrescoPlatformMetadata }
            })
        }
    }

    componentDidUpdate(prevProps) {
        const { elementId, alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props
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
        let width = imageData.properties[EXIF_PIXELXDIMENSION] ? imageData.properties[EXIF_PIXELXDIMENSION] : "";
        let height = imageData.properties[EXIF_PIXELYDIMENSION] ? imageData.properties[EXIF_PIXELYDIMENSION] : "";

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
            Object.assign(scaleMarkerData, (data && data.scalemarker && data.scalemarker.properties) ?
            { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
                (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.id || null } : null,
                (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.name || "The alttext for the scale image" } : null,
                (data && data.scalemarker && data.scalemarker.epsUrl) ? { "path": data.scalemarker.epsUrl || null } : null,
                (data && data.scalemarker && data.properties) ? 
                { "height": data.properties[EXIF_PIXELYDIMENSION] || null } : null,
                (data && data.scalemarker && data.scalemarker.properties &&
                data.properties[EXIF_PIXELXDIMENSION]) ? { "width": data.properties[EXIF_PIXELXDIMENSION] || null } : null,
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

            this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId,this.props.asideData, () => {
                this.props.handleFocus("updateFromC2")
                this.props.handleBlur()
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
                handleAlfrescoSiteUrl(this.props.elementId, changeSiteAlfrescoData)
                this.setState({
                    alfrescoSite: changeSiteAlfrescoData?.repositoryFolder,
                    alfrescoSiteData:changeSiteAlfrescoData
                })
            }else{
                if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')){
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
            //this.updateAlfrescoSiteUrl(alfrescoData)
        }
    }
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    handleC2MediaClick = (e) => {
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

        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
            if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                let alfrescoLocationData = this.state.alfrescoSiteData
                let alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.siteId
                alfrescoSiteName = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                let nodeRefs = alfrescoPath?.alfresco?.nodeRef ? alfrescoPath?.alfresco?.nodeRef : alfrescoPath.alfresco.guid
                const locationSiteDataNodeRef =alfrescoLocationData?.nodeRef ? alfrescoLocationData.nodeRef : alfrescoLocationData?.guid
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
            }
            else {
                this.props.accessDenied(true)
            }

        }} else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
                this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, this.state.alfrescoSiteData)
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
            AlfrescoSiteAPIUrl: config.ALFRESCO_EDIT_METADATA,
            myCloudProxySession: config.myCloudProxySession
        }
        const configAPIKey = JSON.parse(JSON.stringify(tableConfig));
         sendDataToIframe({ 'type': 'launchTableSPA', 'message': {}, "id": this.props.elementId, editable ,slateData, configAPIKey});
    }
    /**
     * @description function will be called on image src add and fetch resources based on figuretype
     */
    addFigureResource = (e) => {
        if(e){
            e.stopPropagation();
        }
        if (this.props.model.figuretype === "tableasmarkup") {
            this.launchSPA();
        }
        else {
            this.handleC2MediaClick(e);
        }
    }

    handleSiteOptionsDropdown = (alfrescoPath, id, locationData) =>{
        let that = this
        let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
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
    /*** @description - This function is for handling the different types of figure-element.
        * @param model object that defined the type of element
        * @param index index of the current element
        * @param slateLockInfo object that defines the slate lock details */
    renderFigureType = (model, index, slateLockInfo) => {
        const { type } = this.props;
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
                case 'codelisting':
                    elementFigureAlignment = 'code-listing';
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
        var figureJsx;

        let figureHtmlData = getLabelNumberTitleHTML(model);

        if (model && model.figuretype === 'authoredtext') {
            let posterText = model.html.text
            if (posterText === "" || posterText === '<p></p>') {
                posterText = '<br />';
            }
            /**JSX for MathML/ChemML Editor*/
            figureJsx = <div className={divClass}>
                <figure className={figureClass} resource="">
                    <header>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur}
                        index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "}
                        model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`}
                        placeholder="Enter Number..." tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber}
                        slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props?.parentElement}
                        showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`}
                        placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle}
                        slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        elementId={this.props.elementId} parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                    </header>
                    <div data-type={dataType}>

                        <TinyMceEditor permissions={this.props.permissions} element={model} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`}
                        placeholder="Type Something..." tagName={'p'} className="paragraphNumeroUno mathml figureData mathmlDiv" model={posterText} type={type}
                        slateLockInfo={slateLockInfo} elementId={this.props.elementId} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        parentElement={this.props?.parentElement}showHideType = {this.props?.showHideType}/>

                    </div>
                    <figcaption className={figCaptionClass} >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`}
                        placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                    element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-5`}
                    placeholder="Enter Credit..." tagName={'p'} className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo}
                    glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                    parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                </div>
            </div>
        } else if (model && model.figuretype === 'codelisting') {

            let preformattedText = model.html && model.html.preformattedtext && model.html.preformattedtext.replace(/<p>/g, "")
            preformattedText = preformattedText && preformattedText.replace(/<\/p>/g, "")
            let processedText = preformattedText ? preformattedText : '<span class="codeNoHighlightLine"><br /></span>';
            if (!preformattedText || preformattedText === '<p></p>'){
                processedText = '<span class="codeNoHighlightLine"><br /></span>'
            }

            /**JSX for Block Code Editor*/
            figureJsx = <div className={`${divClass} blockCodeFigure`}>
                <figure className={figureClass} >
                    <header>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`}
                        placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel}
                        slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        elementId={this.props.elementId} parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`}
                        placeholder="Enter Number..." tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber}
                        slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        elementId={this.props.elementId} parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                        element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`}
                        placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle}
                        slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        elementId={this.props.elementId} parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                    </header>
                    <div className="pearson-component blockcode codeSnippet blockCodeDiv" data-type={dataType} >
                        <pre className="code-listing" >
                            <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp}
                            element={this.props.model} handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`}
                            placeholder="Enter block code..." tagName={'code'} className="codeNoHighlightLineWrapper" model={processedText} slateLockInfo={slateLockInfo}
                            elementId={this.props.elementId} parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                        </pre>
                    </div>
                    <figcaption >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Caption..." tagName={'p'}
                        className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                    handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-5`} placeholder="Enter Credit..." tagName={'figureCredit'}
                    className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                    glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} parentElement={this.props?.parentElement}
                    showHideType = {this.props?.showHideType}/>
                </div>

            </div>
        } else {
            /**JSX for Table Editor*/
            figureJsx = <div className={divClass} resource="">
                <figure className={figureClass} resource="">
                    <header className="figure-header">

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-0`} placeholder="Enter Label..." tagName={'h4'}
                        className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-1`} placeholder="Enter Number..." tagName={'h4'}
                        className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-2`} placeholder="Enter Title..." tagName={'h4'}
                        className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>

                    </header>{
                        model && model.figuretype !== 'tableasmarkup' && <div className="figure-wrapper">
                            <div className='image-figure'><p className='image-text'>Image ID: </p> <span className='image-info'>
                                {model.figuredata && model.figuredata.imageid ? model.figuredata.imageid : ""} </span> </div>
                            <div className='image-figure-path'><p className='image-text'>Image Path: </p> <span className='image-info'>
                                {this.state.imgSrc ? this.state.imgSrc : (model.figuredata.path && model.figuredata.path !== DEFAULT_IMAGE_SOURCE ?
                                model.figuredata.path : "")}</span> </div>
                            <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>
                                {model.figuredata && model.figuredata.path && model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.state.alfrescoSite : ""} </span> </div>
                        </div>
                    }

                    <div className={`pearson-component image figureData ${this.props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType}
                        onClick={this.addFigureResource} >
                        {this.props.model.figuretype === "tableasmarkup" && (this.props.model.figuredata.tableasHTML && (this.props.model.figuredata.tableasHTML !== "" ||
                        this.props.model.figuredata.tableasHTML !== undefined)) ?
                            <div id={`${index}-tableData`} className={imageDimension} dangerouslySetInnerHTML={{ __html: this.props.model.figuredata.tableasHTML }} ></div>
                            :
                            <img src={this.state.imgSrc && this.props.model.figuretype != "tableasmarkup" ? this.state.imgSrc :
                            (model.figuredata.path && model.figuredata.path !== "" ? model.figuredata.path : DEFAULT_IMAGE_SOURCE)}
                                data-src={this.state.imgSrc && this.props.model.figuretype != "tableasmarkup" ? this.state.imgSrc :
                                (model.figuredata.path && model.figuredata.path !== "" || model.figuredata.path !== undefined) ? model.figuredata.path : DEFAULT_IMAGE_DATA_SOURCE}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />
                        }
                    </div>
                    <figcaption >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-3`} placeholder="Enter Caption..." tagName={'p'}
                        className={figCaptionClass + " figureCaption"} model={model.html.captions} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                    </figcaption>
                    <figcredit >
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model}
                        handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} index={`${index}-4`} placeholder="Enter Credit..." tagName={'figureCredit'}
                        className={figCreditClass + " figureCredit"} model={model.html.credits} slateLockInfo={slateLockInfo}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId}
                        parentElement={this.props?.parentElement}  showHideType = {this.props?.showHideType}/>
                    </figcredit>
                </figure>

            </div>
        }
        return figureJsx;
    }
    render() {
        const { model, index, slateLockInfo } = this.props;
        try {
            return (
                <div className="figureElement">
                    {this.renderFigureType(model, index, slateLockInfo)}
                </div>
            );
        } catch (error) {
            return (
                <div className="figureElement">
                </div>
            );
        }

    }
}

ElementFigure.displayName = "ElementFigure"

ElementFigure.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementFigure.propTypes = {
    /** Handler to return the type of element based on the figuretype and alignment */
    renderFigureType: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func
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
)(ElementFigure);
