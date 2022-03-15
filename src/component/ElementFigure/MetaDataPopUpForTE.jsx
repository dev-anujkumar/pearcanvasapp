import React, { useState, useEffect } from 'react';
import '../../styles/PopUp/PopUp.css';

const MetaDataPopUpForTE = (props) => {
  const {imageList} = props
    const [active, setActive] = useState('');
    const [index, setIndex] = useState(0);
    const [lowerIndex, setLowerIndex] = useState(0);
    const [upperIndex, setUpperIndex] = useState(2);
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
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
    }

    const traverseRight = () => {
      if(index < imageList?.length-1){
        let newIndex = index + 1;
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
    }

    const updateRangeForImages = () => {
      if(index > upperIndex && index > lowerIndex)  {
          setUpperIndex(upperIndex+1);
          setLowerIndex(lowerIndex+1);
      }else if(index < lowerIndex && index < upperIndex ){
          setLowerIndex(lowerIndex-1);
          setUpperIndex(upperIndex-1);
      }else if(lowerIndex <= index <= upperIndex){
          return
      }
    }

    const updateCurrentImage = (newIndex) => {
      let { altText, imgId, imgSrc, longdescription } = imageList[newIndex];
      setAltText(altText);
      setLongDescription(longdescription);
      setimageID(imgId);
      setimageSrc(imgSrc);
    }

    let updatedImageList = imageList.slice(lowerIndex,upperIndex+1)

    let renderedImages = updatedImageList && updatedImageList.map((image) => (
      <img 
        className='img-inside-array' 
        src={image.imgSrc} 
        id={image.imgId}
        // onClick={() => this.processImageID(image.imgId)}
      />     
    ))

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

export default MetaDataPopUpForTE;