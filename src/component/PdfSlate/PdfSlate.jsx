import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hasReviewerRole } from '../../constants/utility.js';
import { c2MediaModule } from '../../js/c2_media_module.js';
import { getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js';
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
			uniqueID: "",
			displayName: "",
			path: ""
		}
	}

	componentDidMount() {
		const elementId = this.props?.element?.id;
		getAlfrescositeResponse(elementId, (response) => {
			this.setState({
				//alfrescoSite: response.repositoryFolder,
				alfrescoSiteData: { ...response }
			})
		})
    }

	/* --- */
	OpenAlfresco = () => {
		const locationData = handleC2MediaClick(this.props, this.state.alfrescoSiteData);
		this.handleC2ExtendedClick(locationData);	
	}

	/** @description Open C2 module with predefined Alfresco location
	* @param {*} locationData alfresco locationData
	*/
	handleC2ExtendedClick = (locationData) => {
		const that = this;
		!hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(locationData, function (data_2) {
			c2MediaModule.AddanAssetCallBack(data_2, function (pdfData) {

				const isPdf = JSON.parse(pdfData?.desc)?.smartLinkType === "PDF";
				if (pdfData?.desc.toLowerCase() !== "eps media" && isPdf) {
				const results = pdfData?.body?.results || [] ;
        		const smartLinkPath = results[0]?.properties['s.avs:url']?.value ?
					 results[0].properties['s.avs:url'].value : [""];

					if (pdfData?.uniqueID && pdfData.displayName) {
						that.setState({
							showDetails: true,
							title: pdfData?.displayName,
							pdfId: "urn:pearson:alfresco:" + pdfData?.uniqueID,
							path: smartLinkPath[0]
						})
						that.sumbitElement();
					} 
				} else {
					console.log("Error please import pdf");
				} 
			})
		})
	}

	/* ------------- */
	sumbitElement = () => {
		const { index, element } = this.props;
		const { id, contentUrn, versionUrn } = element || {};
		const reqBody = {
			"id": id,
			"type": ELEMENT_TYPE_PDF,
			"elementdata": {
				"assetid": this.state.pdfId,
				"path": this.state.path,
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

		this.props.updateElement(reqBody, this.props.index, "", "", null, "", null)
	}
	
	render(){
		return(
			<div className="AssessmentSlateCanvas div-position-relative">
				<PdfSlateComponent 
					showDetails = {this.state.showDetails}
					pdfId = {this.state.pdfId}
					title = {this.state.title}
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