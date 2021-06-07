import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleC2MediaClick } from './Alfresco.js';
import PdfSlateComponent from "./PdfSlateComponent.jsx"
import { updateElement } from "../ElementContainer/ElementContainer_Actions.js";
import { ELEMENT_PDF } from '../SlateWrapper/SlateWrapperConstants.js';
import { ELEMENT_TYPE_PDF } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import config from '../../config/config.js';
import TinyMceEditor from '../tinyMceEditor.js';
import { alfrescoPopup, saveSelectedAssetData } from '../AlfrescoPopup/Alfresco_Action';

class PdfSlate extends Component {
    constructor(props) {
        super(props);
        this.state = {
			showDetails: false,
			pdfId: "",
			filetitle: "",
			path: "",
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
    }

    componentDidUpdate(prevProps) {
        const {alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props
        if (this.props.element.id === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup ) {
            this.getAlfrescoData(alfrescoAssetData)
        }
    }

	/* --- Open alfresco Picker --- */
	OpenAlfresco = () => {
		handleC2MediaClick(this.props);
	}
	/** @description Open C2 module with predefined Alfresco location
	* @param {*} locationData alfresco locationData
	*/

	/* Getting data from alfresco picker */
	getAlfrescoData = (pdfData) => {
		let that = this
		try {
			/* Check "desc" property should not be other than "PDF" */
			const isPdf = pdfData && pdfData?.content?.mimeType?.split('/')[1]
			if (isPdf && isPdf == "pdf") {
				/* Get data from alfresco and save to react state to update UI and call API */
				const smartLinkPath = pdfData && pdfData.epsUrl
				if (pdfData?.id && pdfData.properties["cm:title"]) {
					this.setState({
						showDetails: true,
						filetitle: pdfData.properties["cm:title"],
						pdfId: "urn:pearson:alfresco:" + pdfData?.id,
						path: smartLinkPath
					}, () =>{
						that.sumbitElement();
					})
					/* Send retrived data to server to save */
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

const dispatchActions = {
    updateElement,
	alfrescoPopup,
	saveSelectedAssetData

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
export default connect(mapStateToProps, dispatchActions)(PdfSlate);