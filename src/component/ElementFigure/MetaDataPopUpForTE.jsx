import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/PopUp/PopUp.css';
import { updateEditedData, saveTEMetadata } from '../ElementContainer/ElementContainer_Actions';
import moveArrow from './Assets/down-arrow.svg';


const MetaDataPopUpForTE = (props) => {
  const {imageList, editedImageList, updateEditedData} = props
  const [longDescErr, setLongDescErr] = useState(false);
  const [index, setIndex] = useState(0);
  const [lowerIndex, setLowerIndex] = useState(0);
  const [upperIndex, setUpperIndex] = useState(2);
  const [altText, setAltText] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageID, setimageID] = useState('');
  const [imageSrc, setimageSrc] = useState('');
  const [disableButton, setDisableButton] = useState(true);

    useEffect(() => {
      if(imageList?.length > 0){
        let { altText, imgId, imgSrc, longdescription } = imageList[0];
        setAltText(altText);
        setLongDescription(longdescription);
        setimageID(imgId);
        setimageSrc(imgSrc);
        let longdescDiv = String(longdescription)
        // if(/<\/?[a-z][\s\S]*>/i.test(longdescDiv)){
        //   setLongDescErr(true);
        // }
        
      }    
    }, [props.imageList]);

    const traverseLeft = () => {
      if(index > 0){
        let newIndex = index - 1;
        updateImageInStore();
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
    }

    const traverseRight = () => {
      if(index < imageList?.length-1){
        let newIndex = index + 1;
        updateImageInStore();
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
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

    const updateRangeForImages = () => {
      if(index > upperIndex && index > lowerIndex)  {
          setUpperIndex(upperIndex+1);
          setLowerIndex(lowerIndex+1);
      }else if(index < lowerIndex && index < upperIndex ){
          setLowerIndex(lowerIndex-1);
          setUpperIndex(upperIndex-1);
      }else if(lowerIndex <= index && index <= upperIndex){  
          return
      }
    }

  const handleButtonDisable = () => {
    if(disableButton){
      setDisableButton(false);
    }
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

  const handleSave = () => {
    updateImageInStore();
    saveTEMetadata(editedImageList)
        .then(() => {
          props.togglePopup(false, 'TE');
        })
        .catch(error => {   
        });
  }

    const renderImages = () => {
      
      let updatedImageList;
    
      if(index>upperIndex){
        updatedImageList = imageList.slice(lowerIndex+1,upperIndex+2)
      }else if(index<lowerIndex){
        updatedImageList = imageList.slice(lowerIndex-1,upperIndex)
      }else{
        updatedImageList = imageList.slice(lowerIndex,upperIndex+1)
      }
  
      let renderedImagesList = updatedImageList && updatedImageList.map((image, imgIndex) => (
        <img 
          className='img-inside-array' 
          src={image.imgSrc} 
          id={image.imgId}
          style={ image.imgSrc === imageSrc ? {  border: '2px solid #427ef5' } : {border: 'none'} } 
        />
      ));

      return renderedImagesList;
    }
    
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
                    <span className='left-arrow' onClick={traverseLeft}><div className='left-arrow-icon'><img width="12px" height="12px" src={moveArrow} /></div></span>
                    <span className='inner-img-array'>
                       {renderImages()}
                    </span>
                    <span className='right-arrow' onClick={traverseRight}><div className='right-arrow-icon'><img width="12px" height="12px" src={moveArrow} /></div></span>
                  </div>
                </div>
                <div className="right-container">
                  <div className="figuremetadata-field">
                    <div
                      className={'alt-text-body'}
                      // onClick={() => this.handleActiveState("altBody")}
                    >
                      <p
                        className={'alt-text'}
                      >
                        Alt Text
                      </p>
                      <input
                        autocomplete="off"
                        id="altText"
                        name="altText"
                        type="text"
                        placeholder="Enter your text here"
                        value={altText}
                        onChange={(e) => {
                            setAltText(e.target.value)
                            handleButtonDisable()
                          }
                        }
                      />
                    </div>
                    <div
                      className={`long-description-body ${
                        longDescErr === true ? "invalid" : ""
                      }`}
                    >
                      <p
                        className={'long-text'}
                      >
                        Long Description
                      </p>
                      <textarea
                        id="longDescription"
                        name="longDescription"
                        rows="9"
                        cols="50"
                        placeholder="Enter your text here"
                        value={longDescription}
                        // disabled={disabledButton ? false : true}
                        onChange={(e) =>{
                            setLongDescription(e.target.value)
                            handleButtonDisable()
                          }
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="metadata-button">
					           <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`}>Import in Cypress</span>
					           <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleSave}>Save All</span>
					           <span className={`cancel-button ${disableButton ? '' : "disabled"}`} id='close-container'>Reset</span>
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