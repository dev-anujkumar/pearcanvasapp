import React, { Component } from 'react';
import { hasReviewerRole } from '../../constants/utility.js';
import { c2MediaModule } from '../../js/c2_media_module.js';
import { getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js';
import { handleC2MediaClick } from './Alfresco.js';
import PdfSlateComponent from "./PdfSlateComponent.jsx"

class PdfSlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showDetails: false,
			uniqueID: "",
			displayName: ""
		}
	}

	componentDidMount() {
		const elementId = "urn:pearson:work:81ee4cba-f16e-473a-9582-c6ccfec8c3ae" //this.props.elementId;
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
				console.log("data---",pdfData);
				if(pdfData?.uniqueID && pdfData.displayName) {
					that.setState({
						showDetails: true,
						title: pdfData?.displayName,
						pdfId: pdfData?.uniqueID
					})
				} else {
					console.log("Error while getting data...");
				}
			})
		})
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

export default PdfSlate;
