import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasReviewerRole } from '../../constants/utility.js';
import { c2MediaModule } from '../../js/c2_media_module.js';
//import { getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js';
import { handleC2MediaClick } from './Alfresco.js';
import PdfSlateComponent from "./PdfSlateComponent.jsx"
import { updateElement } from "../ElementContainer/ElementContainer_Actions.js";
import { ELEMENT_PDF } from '../SlateWrapper/SlateWrapperConstants.js';
import { ELEMENT_TYPE_PDF } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import config from '../../config/config.js';

class PdfSlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showDetails: false,
			pdfId: "",
			filetitle: "",
			path: "",
			alfrescoSiteData: {}
		}
	}

	componentDidMount() {
		//const elementId = this.props?.element?.id;
		//getAlfrescositeResponse(elementId, (response) => {
		//	this.setState({
		//		//alfrescoSite: response.repositoryFolder,
		//		alfrescoSiteData: { ...response }
		//	})
		//})
		/* if already pdf is selected from alfresco than show pdf data on UI */
		const { assetid, filetitle } = this.props?.element?.elementdata || {};
		if(assetid){
			this.setState({
				showDetails: true,
				filetitle: filetitle,
				pdfId: assetid
			})
		}
    }
	/* --- Open alfresco Picker --- */
	OpenAlfresco = () => {
		handleC2MediaClick(this.props, this.handleC2ExtendedClick);
	}
	/** @description Open C2 module with predefined Alfresco location
	* @param {*} locationData alfresco locationData
	*/
	handleC2ExtendedClick = (locationData) => {
		const that = this;
		!hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(locationData, function (data_2) {
			c2MediaModule.AddanAssetCallBack(data_2, function (pdfData) {
				that.getAlfrescoData(pdfData);
			})
		})
	}
	/* Getting data from alfresco picker */
	getAlfrescoData = (pdfData) => {
		/* Check "desc" property should not be other than "PDF" */
		const isPdf = pdfData?.desc.toLowerCase() !== "eps media" ? 
			JSON.parse(pdfData?.desc)?.smartLinkType === "PDF" : false;
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
			console.log("Error please import pdf");
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
			<div className="AssessmentSlateCanvas div-position-relative">
				<PdfSlateComponent 
					showDetails = {this.state.showDetails}
					pdfId = {this.state.pdfId}
					filetitle = {this.state.filetitle}
					OpenAlfresco = {this.OpenAlfresco}
				/>
			</div>
		)
	}
}

const dispatchActions = {
    updateElement
}
export default connect(null, dispatchActions)(PdfSlate);