import React from 'react';
import config from '../../config/config';
import Tooltip from '../Tooltip';
import {CYPRESS_PLUS_TOOLTIP} from '../../constants/ToolTip_Constant'
function PdfSlateComponent(props)  {

	const { showDetails, pdfId, filetitle, OpenAlfresco ,element} = props;

	function showPDFDetails() {
		return (
			<div className="slate_fetch_canvas">
				<div className="slate_assessment_data_container">
					<div className="slate_assessment_data_content">
						<div className="slate_assessment_data_label">PDF Slate</div>
						<div className="slate_assessment_data_details">
							<div className="slate_assessment_data_title">{ filetitle }</div>
							<div className="slate_pdf_data_id">ID: { pdfId }</div>
							{(!config.SHOW_CYPRESS_PLUS || !config.isCypressPlusEnabled ) && (<div className="slate_assessment_change_button" onClick={ OpenAlfresco }>Change PDF</div>)}
						</div>
								{config.isCypressPlusEnabled && config.SHOW_CYPRESS_PLUS && element?.elementdata?.conversionstatus  &&
						<div className='slate_cypress_plus_enhance' >

						<Tooltip direction='enhance' tooltipText={CYPRESS_PLUS_TOOLTIP} >
							<div className="slate_assessment_cypress_plus_enhance">Cypress+ Enhanced</div>
						</Tooltip>

							</div>
	}
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