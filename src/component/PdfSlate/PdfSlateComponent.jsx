import React from 'react';

function PdfSlateComponent(props)  {

	const { showDetails, pdfId, filetitle, OpenAlfresco } = props;

	function showPDFDetails() {
		return (
			<div className="slate_fetch_canvas">
				<div className="slate_assessment_data_container">
					<div className="slate_assessment_data_content">
						<div className="slate_assessment_data_label">PDF Slate</div>
						<div className="slate_assessment_data_details">
							<div className="slate_assessment_data_title">{ filetitle }</div>
							<div className="slate_assessment_data_id">ID: { pdfId }</div>
							<div className="slate_assessment_change_button" onClick={ OpenAlfresco }>Change PDF</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="AssessmentSlateCanvas div-position-relative">
			{ 
				showDetails ? showPDFDetails() :
				<div 
					className = "slate_assessment_type_button add-pdf-button"
					onClick = { OpenAlfresco }
				>
					Add PDF
				</div>
			}
		</div>
	)
}

export default PdfSlateComponent;