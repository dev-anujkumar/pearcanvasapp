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
		   longDescription:""
        }
    }

    componentDidMount() {
		/*--- */
		this.getAlfrescoMetadata();
    }

    componentWillUnmount() {
        if (this.props.showConfirmation) {
            hideBlocker();
            this.props.hideCanvasBlocker(false)
        }
    }
	/**
    * @description - This function is responsible for rendering the Dialog text in the popup.
    * @param {event} 
    */
	getAlfrescoMetadata = () => {
		let url = "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/nodes/" + this.props.imageId;
		axios.get(url, {
			headers: {
				"Content-Type": "application/json",
				"PearsonSSOSession": config.ssoToken,
				"apikey": config.CMDS_APIKEY
			}
		}).then(response => {				
				this.setState({
					metaData: response.data.entry.properties,
					altText: response.data.entry.properties["cplg:altText"],
					longDescription: response.data.entry.properties["cplg:longDescription"]
				})
			}).catch(error => {
				console.error("error--", error);
			})
	}
	/*--*/
	sendAlfrescoMetadata = () => {
		const url = "https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/nodes/" + this.props.imageId;
		
		const { altText, longDescription } = this.state;
		const body = {
			properties: { 
				...this.state.metaData,
				"cplg:altText": altText,
				"cplg:longDescription": longDescription
			}
		}
		console.log(JSON.stringify(body));
		axios.put(url, body, {
			headers: {
				"Content-Type": "application/json",
				"PearsonSSOSession": config.ssoToken,
				"apikey": config.CMDS_APIKEY,
				"Accept": "*/*",
				"Access-Control-Allow-Origin": "*"
			}
		}).then(response => {
				console.log("response--", response);
				/* -- */
				this.updateElementData();
			}).catch(error => {
				console.error("error--", error);
			})
	}

	updateElementData = () => {
		const { index, element } = this.props;
		/*--*/
		let figureData = { ...element.figuredata };
		figureData.alttext = this.state.altText;
		figureData.longdescription = this.state.longDescription;
		/*--*/
		this.props.updateFigureData(figureData, index, element.id, () => {
			this.props.handleFocus("updateFromC2")
			this.props.handleBlur()
		})
	}

    render() {
        const { togglePopup } = this.props;
		const { altText, longDescription } = this.state;
        return (
            <div className="model">
				<div tabIndex="0" className="model-popup">
					<div className="figure-popup">
						<div className="dialog-button">
						    <span className="edit-metadata">Edit Alfresco Metadata</span>
						</div>
						<div className="figuremetadata-field">
							<div className="alt-text-body" >
								<p className="alt-text">Alt Text:</p>
								<input 
									id="altText_AM" 
									name="altText_AM" 
									type="text" 
									placeholder="Enter your text here" 
									value={altText}
									onChange={(e) => this.setState({ altText: e.target.value })}
								/>
							</div>
							<div className="long-description-body">
								<p className='long-text'>Long Description:</p>
								<textarea 
									id="longDescription_AM" 
									name="longDescription_AM" 
									rows="9" 
									cols="50" 
									placeholder="Enter your text here" 
									value={longDescription}
									onChange={(e) => this.setState({ longDescription: e.target.value })}>
								</textarea>
							</div>
						</div>
						<div className="metadata-button">
						   <span className="save-buttons" onClick={(e) => this.sendAlfrescoMetadata(e)}>Import in Cypress</span>
						   <span className="cancel-button" id='close-container' onClick={(e) => togglePopup(false, e)}>Cancel</span>
						</div>
					</div>
				</div>
                        
            </div>
        );
    }
}

export default MetaDataPopUp;