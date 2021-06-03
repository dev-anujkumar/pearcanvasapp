import React, { Component } from 'react';
import { connect } from 'react-redux';
import { c2MediaModule } from '../../js/c2_media_module.js';
import { handleC2MediaClick } from './Alfresco.js';
import PdfSlateComponent from "./PdfSlateComponent.jsx"
import { updateElement } from "../ElementContainer/ElementContainer_Actions.js";
import { ELEMENT_PDF } from '../SlateWrapper/SlateWrapperConstants.js';
import { ELEMENT_TYPE_PDF } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import config from '../../config/config.js';
import TinyMceEditor from '../tinyMceEditor.js';
import { handleAlfrescoSiteUrl, getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { alfrescoPopup, saveSelectedAssetData } from '../AlfrescoPopup/Alfresco_Action';
import { hideTocBlocker, disableHeader } from '../../js/toggleLoader.js';
import axios from "axios";

class PdfSlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showDetails: false,
			pdfId: "",
			filetitle: "",
			path: "",
			projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {}
		}
	}

	componentDidMount() {
		/* if already pdf is selected from alfresco than show pdf data on UI */
		const { assetid, filetitle } = this.props?.element?.elementdata || {};
		if(assetid){
			this.setState({
				showDetails: true,
				filetitle: filetitle,
				pdfId: assetid
			})
		}
		getAlfrescositeResponse(this.props.elementId, (response) => {
            this.setState({
                alfrescoSite: response.title,
                alfrescoSiteData:{...response}
            })
        })
    }

	componentDidUpdate(prevProps) {
        const { elementId, alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ) {
            this.dataFromNewAlfresco(alfrescoAssetData)
        }
    }

	 /**
     * @description data after selecting an asset from alfresco c2 module
     * @param {*} data selected asset data
     */
	  dataFromNewAlfresco = (data) => {
        debugger
        hideTocBlocker();
        disableHeader(false);
        let assetData = data;
        let uniqID = assetData.id ? assetData.id : "";
        let epsURL = assetData.epsUrl? assetData.epsUrl : "";
        let fileName = assetData.name? assetData.name : "";
        let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1); 
        // let figureType = data?.content?.mimeType?.split('/')[0]             
        //commented lines will be used to update the element data
        if (fileExtension === "pdf") {
            if(uniqID && fileName && epsURL) {
                this.setState({
                    showDetails: true,
                    filetitle: fileName,
                    pdfId: "urn:pearson:alfresco:" + uniqID,
                    path: epsURL
                })
            }
            // let altText = assetData.properties["cplg:altText"] ? assetData.properties["cplg:altText"] : '';
            // let longDesc = assetData.properties['cplg:longDescription'] ? assetData.properties['cplg:longDescription'] : "";
            // if (epsURL !== "") {
            //     this.setState({ imgSrc: epsURL })
            // } else {
            //     this.setState({ imgSrc: DEFAULT_IMAGE_SOURCE })
            // }

            // let scaleMarkerData = {};
            // Object.assign(scaleMarkerData, (data && data.scalemarker && data.scalemarker.properties) ? { schema: 'http://schemas.pearson.com/wip-authoring/image/1#/definitions/image' } : null,
            //     (data && data.scalemarker && data.scalemarker.properties) ? { "imageid": data.id || null } : null,
            //     (data && data.scalemarker && data.scalemarker.properties) ? { "alttext": data.name || "The alttext for the scale image" } : null,
            //     (data && data.scalemarker && data.scalemarker.epsUrl) ? { "path": data.scalemarker.epsUrl || null } : null,
            //     (data && data.scalemarker && data.properties) ? { "height": data.properties["exif:pixelYDimension"] || null } : null,
            //     (data && data.scalemarker && data.scalemarker.properties && data.properties["exif:pixelXDimension"]) ? { "width": data.properties["exif:pixelXDimension"] || null } : null,
            // );

            // let setFigureData = {
            //     path: epsURL,
            //     height: height,
            //     width: width,
            //     schema: "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
            //     imageid: `urn:pearson:alfresco:${uniqID}`,
            //     alttext: altText,
            //     longdescription: longDesc,
            //     type: figureType,
            // }
            
            // Object.assign(setFigureData, (Object.keys(scaleMarkerData).length > 0) ? { scaleimage: scaleMarkerData } : null);

            // this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId, () => {
            //     this.props.handleFocus("updateFromC2")
            //     this.props.handleBlur()
            // })
            let alfrescoData = config?.alfrescoMetaData?.alfresco;
            alfrescoData = this.props.isCiteChanged ? this.props.changedSiteData : alfrescoData
            let alfrescoSiteLocation = this.state.alfrescoSiteData
            if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '' || this.props.isCiteChanged)){
                handleAlfrescoSiteUrl(this.props.elementId, alfrescoData)
            }
            // to blank the elementId and asset data after update
            let payloadObj = {
                asset: {}, 
                id: ''
            }
            this.props.saveSelectedAssetData(payloadObj)
            this.updateAlfrescoSiteUrl(alfrescoData)
        } else {
            console.info("Please import pdf");
        }
    }

	updateAlfrescoSiteUrl = (alfrescoData) => {
        let repositoryData = alfrescoData.title
        if(repositoryData){
            this.setState({
                alfrescoSite: repositoryData
            })  
        } else {
            this.setState({
                alfrescoSite: config.alfrescoMetaData.alfresco.repositoryFolder
            }) 
        }
    }

	/* --- Open alfresco Picker --- */
	OpenAlfresco = () => {
		this.handleC2MediaClick(this.props);
	}

    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
     handleC2MediaClick = (e) => {
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        // if (e.target.tagName.toLowerCase() === "p") {
        //     e.stopPropagation();
        //     return;
        // }

        // const figureDataObj = this.props.model.figuredata;
        // const currentAsset = figureDataObj ? {
        //     id: figureDataObj.imageid.split(':').pop(), // get last
        //     type: figureDataObj.type,
        // } : null;

        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        var data_1 = false;
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
                let messageObj = { citeName: locationSiteDataTitle? locationSiteDataTitle : alfrescoSiteName, 
                    citeNodeRef: nodeRefs, 
                    elementId: this.props.elementId }
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

    handleSiteOptionsDropdown = (alfrescoPath, id, locationData) =>{
        let that = this
        let url = 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
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

	/** @description Open C2 module with predefined Alfresco location
	* @param {*} locationData alfresco locationData
	*/
	handleC2ExtendedClick = (locationData) => {
		const location = { 
			...locationData,
			currentAsset: { 
				id: this.state?.pdfId?.split(":")[3],
			}
		}
		const that = this;
		!hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(location, function (data_2) {
			c2MediaModule.AddanAssetCallBack(data_2, function (pdfData) {
				that.getAlfrescoData(pdfData);
			})
		},"fromPdfSlate")
	}
	/* Getting data from alfresco picker */
	getAlfrescoData = (pdfData) => {
		try {
			/* Check "desc" property should not be other than "PDF" */
			const isPdf = pdfData && pdfData.desc && pdfData.desc.toLowerCase() !== "eps media" ? 
				JSON.parse(pdfData.desc)?.smartLinkType === "PDF" : false;
			if (isPdf) {
				/* Get data from alfresco and save to react state to update UI and call API */
				const results = pdfData?.body?.results || [] ;
				const smartLinkPath = results[0]?.properties['s.avs:url']?.value ?
						results[0].properties['s.avs:url'].value : [""];
				if (pdfData?.uniqueID && pdfData.displayName) {
					this.setState({
						showDetails: true,
						filetitle: pdfData?.displayName,
						pdfId: "urn:pearson:alfresco:" + pdfData?.uniqueID,
						path: smartLinkPath[0]
					})
					/* Send retrived data to server to save */
					this.sumbitElement();
				} 
			} else {
				console.info("Please import pdf");
			} 
		} catch (error){
			console.error("Error - ",error);
		}
	}

	sumbitElement = () => {
		const { index, element } = this.props;
		const { id, contentUrn, versionUrn, schema } = element || {};
		const reqBody = {
			"id": id,
			"type": ELEMENT_TYPE_PDF,
			"schema": schema,
			"elementdata": {
				"assetid": this.state.pdfId,
				"path": this.state.path,
				"filetitle": this.state.filetitle
			},
			"versionUrn": versionUrn,
			"contentUrn": contentUrn,
			"status": "wip",
			"inputType": ELEMENT_PDF,
			"inputSubType": "NA",
			"slateVersionUrn": config.slateManifestURN,
			"index": index,
			"elementParentEntityUrn": config.slateEntityURN, //"urn:pearson:entity:937f01cc-b1f5-4e0b-a84e-43562d4e4b72",
			"projectUrn": config.projectUrn
		}
		/* ------ Call Update element API to save data ------- */
		this.props.updateElement(reqBody, this.props.index, "", "", null, "", null)
	}
	
	render(){
		return(
			<div className="AssessmentSlateCanvas div-position-relative pdf-slate">
				<PdfSlateComponent 
					showDetails = {this.state.showDetails}
					pdfId = {this.state.pdfId}
					filetitle = {this.state.filetitle}
					OpenAlfresco = {this.OpenAlfresco}
				/>
				<TinyMceEditor
                    slateLockInfo={this.props.slateLockInfo}
                    handleBlur={this.props.handleBlur}
                    model={this.props.element}
                    handleEditorFocus={this.props.handleFocus}
                    className="addLOdata"
                    permissions={this.props.permissions}
                    element={this.props.element}
                />
			</div>
		)
	}
}

// const dispatchActions = {
//     updateElement
// }

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

export default connect(mapStateToProps, mapActionToProps)(PdfSlate);