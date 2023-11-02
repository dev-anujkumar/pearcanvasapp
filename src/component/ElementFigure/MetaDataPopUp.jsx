/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import axios from 'axios';
import config from '../../config/config';
import { checkImageForMetadata, checkOpenerElement, checkSmartLinkInteractive } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility';
import { showNotificationOnCanvas } from '../../constants/utility';
/**
* @description - PopUp is a class based component. It is defined simply
* to make a skeleton of PopUps.
*/
class MetaDataPopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           altText:"",
		   longDescription:"",
		   fetchedAltText: '',
		   fetchedLongDesc: '',
		   active:'',
		   disableTextFields:false,
		   disableUpdateButton:false
        }
    }

    componentDidMount() {
		/* -- Get metadata from alfresco - */
		this.getAlfrescoMetadata();
    }

	handleActiveState = (active) => {
		this.setState({
			active
		})
	}

	/**
    * @description - This function is responsible for showing alfresco metadata in the popup.
    * @param {event}
    */
	getAlfrescoMetadata = () => {
		let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/nodes/`+ this.props.imageId;
		axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				"apikey": config.CMDS_APIKEY,
				'myCloudProxySession': config.myCloudProxySession
			}
		}).then(response => {
			const { properties } = response?.data?.entry || {};
			if(this?.props?.element?.figuretype === "interactive"){
				const avsJsonStringData = properties["avs:jsonString"]
				let avsStringData = avsJsonStringData && (typeof avsJsonStringData === 'string') ? JSON.parse(avsJsonStringData) : avsJsonStringData;
				this.setState({
					metaData: properties,
					altText: avsStringData.imageAltText,
					fetchedAltText: avsStringData.imageAltText,
					fetchedLongDesc: avsStringData.linkLongDesc,
					longDescription: avsStringData.linkLongDesc,
					disableTextFields: true,
					disableUpdateButton: (this?.props?.element?.figuredata?.alttext===avsStringData?.imageAltText &&
										  this?.props?.element?.figuredata?.longdescription===avsStringData?.linkLongDesc) ? false : true
				})}
			else{
				this.setState({
					metaData: properties,
					fetchedAltText: properties.hasOwnProperty("cplg:altText") ? properties["cplg:altText"] : "",
					fetchedLongDesc: properties.hasOwnProperty("cplg:longDescription") ? properties["cplg:longDescription"] : "",
					altText: properties.hasOwnProperty("cplg:altText") ? properties["cplg:altText"] : "",
					longDescription: properties.hasOwnProperty("cplg:longDescription") ? properties["cplg:longDescription"] : "",
					disableTextFields:  true,
					disableUpdateButton: checkOpenerElement(this.props.element) ?
										 (this?.props?.element?.backgroundimage?.alttext===properties["cplg:altText"] &&
										  this?.props?.element?.backgroundimage?.longdescription===properties["cplg:longDescription"] ? false : true) :
										 (this?.props?.element?.figuredata?.alttext===properties["cplg:altText"] &&
										  this?.props?.element?.figuredata?.longdescription===properties["cplg:longDescription"]) ? false : true
				})
			}
			}).catch(error => {
				console.error("error--", error);
			})
	}
	/*- Retrive the changed data from state and Updata alfresco metadata in alfresco -*/
	sendAlfrescoMetadata = () => {
		let url = `${config.ALFRESCO_EDIT_METADATA}api/-default-/public/alfresco/versions/1/nodes/`+ this.props.imageId;
		const { metaData,altText, longDescription } = this.state;
		let body;
		if(this?.props?.element?.figuretype === "interactive"){
			const avsJsonStringData = metaData["avs:jsonString"]
        	let avsStringData = avsJsonStringData && (typeof avsJsonStringData === 'string') ? JSON.parse(avsJsonStringData) : avsJsonStringData;
			avsStringData.linkLongDesc=longDescription
			avsStringData.imageAltText=altText
			body = {
				properties: {
					"avs:jsonString": JSON.stringify(avsStringData),
				}
			}}
		else{
			body={
				properties:{
					"cplg:altText": altText,
					"cplg:longDescription": longDescription
				}
			}
		}
		axios.put(url, body, {
			headers: {
				"Content-Type": "application/json",
				"apikey": config.CMDS_APIKEY,
				'myCloudProxySession': config.myCloudProxySession
			}
		}).then(response => {
				/* -- if update alfresco metadata put call success then update wip also */
				this.updateElementData();
				if(checkImageForMetadata(this?.props?.element))
				showNotificationOnCanvas('Image Metadata has been updated', 'metadataUpdated')
				else if(checkSmartLinkInteractive(this?.props?.element))
				showNotificationOnCanvas('Smart Link Metadata has been updated', 'metadataUpdated')
				else if(checkOpenerElement(this?.props?.element))
				showNotificationOnCanvas('Opener Element has been updated', 'metadataUpdated')
			}).catch(error => {
				console.error("error--", error);
			})
		this.props.togglePopup(false);
	}

	updateElementData = () => {
		const { index, element, asideData } = this.props;
				/*-- Form data to send to wip */
		if(element?.type === "openerelement"){
			let tempElementData = {...element}
			tempElementData.backgroundimage.alttext = this.state.altText;
			tempElementData.backgroundimage.longdescription = this.state.longDescription;
			this.props.updateOpenerElement(tempElementData)
			this.props.handleFocus("updateFromC2")
			const altLongDescData = {
                altText: tempElementData.backgroundimage.alttext,
                longDesc: tempElementData.backgroundimage.longdescription
            }
            this.props.saveSelectedAltTextLongDescData(altLongDescData)
		}
		else{
		let	figureData = { ...element?.figuredata };
		figureData.alttext = this.state.altText;
		figureData.longdescription = this.state.longDescription;
		/*-- Updata the image metadata in wip */
		this.props.updateFigureData(figureData, index, element.id, asideData, () => {
			this.props.handleFocus("updateFromC2")
			this.props.handleBlur()
		})}
	}

	handleChangeAltText = (e) => {
		if(e?.target?.value===this.state.fetchedAltText && this.state.longDescription===this.state.fetchedLongDesc)
		this.setState({altText: e?.target?.value, disableUpdateButton: false})
		else
		this.setState({altText: e?.target?.value, disableUpdateButton: true})
	}

	handleChangeLongDesc = (e) => {
		if(e?.target?.value===this.state.fetchedLongDesc && this.state.altText===this.state.fetchedAltText)
		this.setState({ longDescription: e?.target?.value, disableUpdateButton: false})
		else
		this.setState({ longDescription: e?.target?.value, disableUpdateButton: true})
	}

    render() {
        const { togglePopup } = this.props;
		const { altText, longDescription, active } = this.state;
        return (
            <div className="model">
				<div tabIndex="0" className="model-popup">
					<div className="figure-popup">
						<div className="dialog-button">
						    <div className="edit-metadata">{checkImageForMetadata(this.props.element) ? 'Image Metadata' :
							 checkSmartLinkInteractive(this.props.element) ? 'Smart Link Metadata' : 'Opener Element Metadata'}</div>
							<div className='edit-metadata-sub-heading'>
								Editing the Alt Text and Long Description will update the {checkImageForMetadata(this.props.element) ? 'Image' :
								checkSmartLinkInteractive(this.props.element) ? 'Smart Link' :
								'Opener Element'} Metadata. This will impact all instances of this {checkImageForMetadata(this.props.element) ? 'image' :
								checkSmartLinkInteractive(this.props.element) ? 'Smart Link' : 'Opener Element'} in your team's Projects.
							</div>
						</div>
						<div className="figuremetadata-field">
							<div className={`alt-text-body ${active === 'altBody' ? 'active' : ""}`} onClick={()=>this.handleActiveState('altBody')} >
								<p className={`alt-text ${active === 'altBody' ? 'active' : ""}`}>Alt Text</p>
								<input
								    autocomplete="off"
									id="altText_AM"
									name="altText_AM"
									type="text"
									placeholder="Enter your text here"
									value={altText}
                                    disabled ={this.state.disableTextFields ? false : true}
									onChange={(e) => {this.handleChangeAltText(e)}}
								/>
							</div>
							<div className= {`long-description-body ${active === 'longBody' ? 'active' : ""}`} onClick={()=>this.handleActiveState('longBody')}>
								<p className={`long-text ${active === 'longBody' ? 'active' : ""}`}>Long Description</p>
								<textarea
									id="longDescription_AM"
									name="longDescription_AM"
									rows="9"
									cols="50"
									placeholder="Enter your text here"
									value={longDescription}
								    disabled ={this.state.disableTextFields ? false : true}
									onChange={(e) => {this.handleChangeLongDesc(e)}}>
								</textarea>
							</div>
						</div>
						<div className="metadata-button">
						   <span className={`metadata-import-button ${this.state.disableUpdateButton ? '' : "disabled"}`}
							onClick={(e) => this.sendAlfrescoMetadata(e)}>Update Metadata</span>
						   <span className="cancel-button" id='close-container' onClick={(e) => togglePopup(false, e)}>Cancel</span>
						</div>
					</div>
				</div>

            </div>
        );
    }
}

export default MetaDataPopUp;
