/**
* Root Component of PopUp .
*/

import React from 'react';
import '../../styles/PopUp/PopUp.css';
import axios from 'axios';
import config from '../../config/config';
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
		   active:'',
		   disabledButton:false
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
		let url = `${config.ALFRESCO_EDIT_METADATA}alfresco-proxy/api/-default-/public/alfresco/versions/1/nodes/`+ this.props.imageId;
		axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				"PearsonSSOSession": config.ssoToken,
				"apikey": config.CMDS_APIKEY
			}
		}).then(response => {
			const { properties } = response?.data?.entry || {};	
				this.setState({
					metaData: properties,
					altText: properties.hasOwnProperty("cplg:altText") ? properties["cplg:altText"] : "",
					longDescription: properties.hasOwnProperty("cplg:longDescription") ? properties["cplg:longDescription"] : "",
					disabledButton:true
				})
			}).catch(error => {
				console.error("error--", error);
			})
	}
	/*- Retrive the changed data from state and Updata alfresco metadata in alfresco -*/
	sendAlfrescoMetadata = () => {
		let url = `${config.ALFRESCO_EDIT_METADATA}alfresco-proxy/api/-default-/public/alfresco/versions/1/nodes/`+ this.props.imageId;
		const { altText, longDescription } = this.state;
		const body = {
			properties: { 
				"cplg:altText": altText,
				"cplg:longDescription": longDescription
			}
		}
		axios.put(url, body, {
			headers: {
				"Content-Type": "application/json",
				"PearsonSSOSession": config.ssoToken,
				"apikey": config.CMDS_APIKEY
			}
		}).then(response => {
				/* -- if update alfresco metadata put call success then update wip also */
				this.updateElementData();
			}).catch(error => {
				console.error("error--", error);
			})
		this.props.togglePopup(false);
	}

	updateElementData = () => {
		const { index, element } = this.props;
		/*-- Form data to send to wip */
		let figureData = { ...element.figuredata };
		figureData.alttext = this.state.altText;
		figureData.longdescription = this.state.longDescription;
		/*-- Updata the image metadata in wip */
		this.props.updateFigureData(figureData, index, element.id, () => {
			this.props.handleFocus("updateFromC2")
			this.props.handleBlur()
		})
	}

    render() {
        const { togglePopup } = this.props;
		const { altText, longDescription, active } = this.state;
        return (
            <div className="model">
				<div tabIndex="0" className="model-popup">
					<div className="figure-popup">
						<div className="dialog-button">
						    <span className="edit-metadata">Edit Alfresco Metadata</span>
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
                                    disabled ={this.state.disabledButton ? false : true}
									onChange={(e) => this.setState({ altText: e.target.value })}
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
								    disabled ={this.state.disabledButton ? false : true}
									onChange={(e) => this.setState({ longDescription: e.target.value })}>
								</textarea>
							</div>
						</div>
						<div className="metadata-button">
						   <span className={`metadata-import-button ${this.state.disabledButton ? '' : "disabled"}`} onClick={(e) => this.sendAlfrescoMetadata(e)}>Import in Cypress</span>
						   <span className="cancel-button" id='close-container' onClick={(e) => togglePopup(false, e)}>Cancel</span>
						</div>
					</div>
				</div>
                        
            </div>
        );
    }
}

export default MetaDataPopUp;