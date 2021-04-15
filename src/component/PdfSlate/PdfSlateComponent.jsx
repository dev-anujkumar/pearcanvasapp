import React, { Component } from 'react';
import { getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js';
import { handleC2MediaClick } from './Alfresco.js';


class PdfSlateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
			pdfDetails: false
		}
	}

	componentDidMount() {
		const elementId = "urn:pearson:work:5c31230c-830b-4270-99b8-9beb83505f6c" //this.props.elementId;
		getAlfrescositeResponse(elementId, (response) => {
			this.setState({
				alfrescoSite: response.repositoryFolder,
				alfrescoSiteData: { ...response }
			})
		})
    }

	
	OpenAlfresco = () => {
		//this.setState({ pdfDetails: true });
		handleC2MediaClick(this.props, this.state.alfrescoSiteData);
	}

	showPDFDetails = () => {
		return (
			<div className="slate_fetch_canvas">
				<div className="slate_assessment_data_container">
					<div className="slate_assessment_data_content">
						<div className="slate_assessment_data_label">PDF Slate</div>
						<div className="slate_assessment_data_details">
							<div className="slate_assessment_data_title">PDF 1</div>
							<div className="slate_assessment_data_id">ID: urn:pearson:work:b0a895ed-5fdd-4f35-82f9-2c56c09d2e55</div>
							<div className="slate_assessment_change_button">Change PDF</div>
						</div>
						
					</div>
				</div>
			</div>
		)
	};

	render(){
		return(
			<div className="AssessmentSlateCanvas div-position-relative">
				{ 
					this.state.pdfDetails ? this.showPDFDetails() :
                	<div 
						className="slate_assessment_type_button add-pdf-button"
						onClick={this.OpenAlfresco}
					>
					 	Add PDF
					</div>
				}
			</div>
		)
	}
}

export default PdfSlateComponent;
