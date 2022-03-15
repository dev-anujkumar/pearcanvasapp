import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/PopUp/PopUp.css';
import { updateEditedData } from '../ElementContainer/ElementContainer_Actions';

const MetaDataPopUpForTE = (props) => {
  const {imageList, editedImageList, updateEditedData} = props
  const [active, setActive] = useState('');
  const [index, setIndex] = useState(0);
  const [altText, setAltText] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageID, setimageID] = useState('');
  const [imageSrc, setimageSrc] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);

    useEffect(() => {
      if(imageList?.length > 0){
        let { altText, imgId, imgSrc, longdescription } = imageList[0];
        setAltText(altText);
        setLongDescription(longdescription);
        setimageID(imgId);
        setimageSrc(imgSrc);
      }
    }, [props.imageList]);

    const traverseLeft = () => {
      if(index > 0){
        let newIndex = index - 1;
        updateImageInStore();
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
    }

    const traverseRight = () => {
      if(index < imageList?.length-1){
        let newIndex = index + 1;
        updateImageInStore();
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
    }

    const updateCurrentImage = (newIndex) => {
      let { imgId, imgSrc } = imageList[newIndex];
      let altText = "", longdescription = "";
      if(editedImageList[imgId]){
        altText = editedImageList[imgId].altText;
        longdescription = editedImageList[imgId].longdescription;
      } else {
        altText = imageList[newIndex].altText;
        longdescription = imageList[newIndex].longdescription;
      }
      setAltText(altText);
      setLongDescription(longdescription);
      setimageID(imgId);
      setimageSrc(imgSrc);
    }

    const updateImageInStore = () => {
      let altTxt = imageList[index].altText;
      let {longdescription} = imageList[index];

      if(altTxt !== altText || longdescription !== longDescription){
        let editedData = {}
        editedData[imageID] = {
          altText,
          longdescription: longDescription,
          imgSrc: imageSrc,
          imgId: imageID
        }
  
        updateEditedData(editedData);
      }
    }

    let renderedImages = imageList && imageList.map((image) => (
      <img 
        className='img-inside-array' 
        src={image.imgSrc} 
        id={image.imgId}
        // onClick={() => this.processImageID(image.imgId)}
      />
    ));

    return(
        <div className="model">
            <div tabIndex="0" className="model-popup">
              <div className='figure-popup editPopupforTE'>
                <div className="dialog-button1">
                  <span className="edit-metadata">Edit Alfresco Metadata</span>
                </div>
                <div className='left-right-container'>
                <div className="left-container">
                  <div className='outer-img-container'>
                     <img 
                      className='inner-img-container' 
                      src={imageSrc}
                      id={imageID}
                     /> 
                  </div>
                  <div className='outer-img-array-container'>
                    <span className='left-arrow' onClick={traverseLeft}> &lt;</span>
                    <span className='inner-img-array'>
                       {renderedImages}
                    </span>
                    <span className='right-arrow' onClick={traverseRight}> &gt;</span>
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
                        // disabled={disabledButton ? false : true}
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
                        // disabled={disabledButton ? false : true}
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
					           <span className="cancel-button" id='close-container' onClick={(e) => props.togglePopup(false, 'TE')}>Cancel</span>
				          </div>
                </div>
				       </div>
              </div>
            </div>
          </div>
    )
}

const mapDispatchToProps = dispatch => {
  return { 
    updateEditedData: (editedData) => {
      dispatch(updateEditedData(editedData))
    }
  }
}

const mapStateToPros = state => {
  return {
    editedImageList: state.appStore.tableElementEditedData
  }
}
export default connect(mapStateToPros, mapDispatchToProps)(MetaDataPopUpForTE);