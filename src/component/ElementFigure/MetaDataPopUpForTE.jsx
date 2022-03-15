import React, { useState } from 'react';
import '../../styles/PopUp/PopUp.css';



const MetaDataPopUpForTE = (props) => {

    const { togglePopup, showAlfrescoEditPopupforTE } = props
    const [active, setActive] = useState('');
    const [altText, setAltText] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    
    return(
        <div className="model">
            <div tabIndex="0" className="model-popup">
              <div
                className={`figure-popup ${
                  showAlfrescoEditPopupforTE ? "editPopupforTE" : ""
                }`}
              >
                <div className="dialog-button1">
                  <span className="edit-metadata">Edit Alfresco Metadata</span>
                </div>
                <div className='left-right-container'>
                <div className="left-container">
                  <div className='outer-img-container'>
                     <img 
                      className='inner-img-container' 
                      src='https://cite-media-stg.pearson.com/legacy_paths/6b860521-9132-4051-b6cc-dfa020866864/Chrysanthemum.jpg' 
                      id='imageAssetContent:6b860521-9132-4051-b6cc-dfa020866864:6550'
                     /> 
                  </div>
                </div>
                <div className="right-container">
                  <div className="figuremetadata-field">
                    <div
                      className={`alt-text-body ${
                        active === "altBody" ? "active" : ""
                      }`}
                      // onClick={() => this.handleActiveState("altBody")}
                    >
                      <p
                        className={`alt-text ${
                          active === "altBody" ? "active" : ""
                        }`}
                      >
                        Alt Text
                      </p>
                      <input
                        autocomplete="off"
                        id="altText_AM"
                        name="altText_AM"
                        type="text"
                        placeholder="Enter your text here"
                        value={altText}
                        disabled={disabledButton ? false : true}
                        onChange={(e) =>
                          setAltText(e.target.value)
                        }
                      />
                    </div>
                    <div
                      className={`long-description-body ${
                        active === "longBody" ? "active" : ""
                      }`}
                      // onClick={() => this.handleActiveState("longBody")}
                    >
                      <p
                        className={`long-text ${
                          active === "longBody" ? "active" : ""
                        }`}
                      >
                        Long Description
                      </p>
                      <textarea
                        id="longDescription_AM"
                        name="longDescription_AM"
                        rows="9"
                        cols="50"
                        placeholder="Enter your text here"
                        value={longDescription}
                        disabled={disabledButton ? false : true}
                        onChange={(e) =>
                          setLongDescription(e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="metadata-button">
					           <span className={`metadata-import-button ${disabledButton ? '' : "disabled"}`}>Import in Cypress</span>
					           <span className={`metadata-import-button ${disabledButton ? '' : "disabled"}`}>Save All</span>
					           <span className="cancel-button disable" id='close-container'>Reset</span>
					           <span className="cancel-button" id='close-container' onClick={(e) => togglePopup(false, e)}>Cancel</span>
				          </div>
                </div>
				       </div>
              </div>
            </div>
          </div>
    )
}

export default MetaDataPopUpForTE;