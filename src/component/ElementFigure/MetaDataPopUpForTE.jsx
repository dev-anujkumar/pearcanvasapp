import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/PopUp/PopUp.css';
import { updateEditedData, saveTEMetadata, prepareImageDataFromTable } from '../ElementContainer/ElementContainer_Actions';
import moveArrow from './Assets/down-arrow.svg';
import errorMark from './Assets/shape.svg';
import {LargeLoader} from '../SlateWrapper/ContentLoader.jsx';

/**
 * @description This is a functional component for "Edit in Alfresco" of Table Element.
 * @param {*} props 
 */
const MetaDataPopUpForTE = (props) => {
  const {imageList, editedImageList, updateEditedData, togglePopup} = props
  const [altTextErr, setAltTextErr] = useState(false);
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
      
      if(checkHTMLInString(altText)){
        setAltTextErr(true);
      }
      if(checkHTMLInString(longdescription)){
        setLongDescErr(true);
      }
    } 
  }, [props.imageList]);

  useEffect(()=> {
    checkingForInputErr();
    disableButtonForHTML()
  }, [index]);

  useEffect(()=> {
    checkingForInputErr();
  }, [altText, longDescription]);

  const checkHTMLInString = (str) => {
    return /<\/?[a-z][\s\S]*>/i.test(str)
  }

  const disableButtonForHTML = () => {

    if(editedImageList && Object.keys(editedImageList).length > 0){
      if(checkHTMLInString(altText) || checkHTMLInString(longDescription)){
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    } else {
      setDisableButton(true);
    }
  }

  const traverseLeft = () => {
    if(index > 0){
      const newIndex = index - 1;
      updateCurrentImage(newIndex);
      updateRangeForImages(newIndex);
      setIndex(newIndex);
    }
  }

  const traverseRight = () => {
    if(index < imageList?.length-1){
      const newIndex = index + 1;
      updateCurrentImage(newIndex);
      setIndex(newIndex);
      updateRangeForImages(newIndex);
    }
  }

    const checkingForInputErr = () => {
      if(Array.isArray(imageList) && imageList.length > 0){
        if(checkHTMLInString(altText)){
          setAltTextErr(true);
        } else {
          setAltTextErr(false);
        }
        if(checkHTMLInString(longDescription)){
          setLongDescErr(true);
        }else{
          setLongDescErr(false);
        }
      }
    }

  const updateCurrentImage = (newIndex, reset = false) => {
    let { imgId, imgSrc } = imageList[newIndex];
    let altText = "", longdescription = "";
    if(Object.keys(editedImageList).length > 0 && editedImageList[imgId] && !reset){
      altText = editedImageList[imgId].altText;
      longdescription = editedImageList[imgId].longdescription;
    } else {
      altText = imageList[newIndex].altText || "";
      longdescription = imageList[newIndex].longdescription || "";
    }
    setAltText(altText);
    setLongDescription(longdescription);
    setimageID(imgId);
    setimageSrc(imgSrc);
  }

  const updateRangeForImages = (newIndex) => {
    if(newIndex > upperIndex && newIndex > lowerIndex)  {
        setUpperIndex(upperIndex+1);
        setLowerIndex(lowerIndex+1);
    }else if(newIndex < lowerIndex && newIndex < upperIndex ){
        setLowerIndex(lowerIndex-1);
        setUpperIndex(upperIndex-1);
    }
  }

  const handleButtonDisable = (alt, long) => {
    let aText = alt || altText;
    let longDesc = long || longDescription;
    if(checkHTMLInString(aText) || checkHTMLInString(longDesc)){
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }

  const updateImageInStore = () => {
    let altTxt = imageList[index].altText;
    let {longdescription} = imageList[index];
    if((!checkHTMLInString(altText) && !checkHTMLInString(longDescription)) && (altTxt !== altText || longdescription !== longDescription)){
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
    saveTEMetadata(editedImageList)
        .then(() => {
          handleCancel();
        });
  }

  const handleImport = () => {
    saveTEMetadata(editedImageList)
      .then(() => {
        const { index, element, asideData, updateFigureData, handleFocus, handleBlur } = props;
        /*-- Form data to send to wip */
        let figureData = { ...element.figuredata };
        let dummyDiv = document.createElement('div');
        dummyDiv.innerHTML = figureData.tableasHTML;
        dummyDiv.querySelectorAll('img').forEach(img => {
          let imgId = img.getAttribute('data-id');
          if(Object.keys(editedImageList).length > 0 && editedImageList[imgId]){
            let {altText, longdescription} = editedImageList[imgId];
            img.setAttribute('alttext', altText);
            img.setAttribute('longdescription', longdescription);
          }     
        });
        figureData.tableasHTML = dummyDiv.innerHTML;
		    /*-- Updata the image metadata in wip */
		    updateFigureData(figureData, index, element.id, asideData, () => {
		    	handleFocus("updateFromC2");
		    	handleBlur();
          handleCancel()
		    });
      });
  }

  const handleCancel = () => {
    updateEditedData({});
    togglePopup(false, 'TE');
    props.prepareImageDataFromTable({}); // this will delete the TE data from store
  }

  const handleReset = () => {
    updateEditedData({});
    updateCurrentImage(index, true);
  }

  let htmlErrMsg = ' HTML is not supported in this input field';

  return(
      <div className="model">
        <div tabIndex="0" className="te-model-popup">
          <div className='figure-popup editPopupforTE'>
          {imageList?.length > 0 ? 
            <React.Fragment>
              <div className="dialog-button1">
                  <span className="edit-metadata">Edit Alfresco Metadata</span>
                </div>
                <div className='left-right-container'>
                <div className="left-container">
                  <div className='outer-img-container'>
                    <img className='inner-img-container' src={imageSrc} id={imageID} /> 
                  </div>
                  <div className='outer-img-array-container'>
                  <span className={`left-arrow ${index === 0 ? 'disable' : ''}`} onClick={traverseLeft}><div className={`left-arrow-icon`}><img width="12px" height="12px" src={moveArrow} /></div></span>
                    <span className='inner-img-array'>
                    {imageList && imageList.map((image, imgIndex) => {
                      if(imgIndex >= lowerIndex && imgIndex <= upperIndex){
                          return (<img 
                          key={image.id}
                          className='img-inside-array' 
                          src={image.imgSrc} 
                          id={image.imgId}
                          style={ image.imgSrc === imageSrc ? {  border: '2px solid #427ef5' } : {border: 'none'} } 
                        />)
                      }
                    })}
                    </span>
                    <span className={`right-arrow ${index === (imageList.length - 1) ? 'disable' : '' }`} onClick={traverseRight}><div className={`right-arrow-icon`}><img width="12px" height="12px" src={moveArrow} /></div></span>
                  </div>
                </div>
                <div className="right-container">
                  <div className="figuremetadata-field-table">
                    <div className={`alt-text-body ${altTextErr === true ? "invalid" : "" }`}>
                      <p className="alt-text"> Alt Text </p>
                      <input
                        autocomplete="off"
                        id="altText_AM"
                        name="altText"
                        type="text"
                        placeholder="Enter your text here"
                        value={altText}
                        onChange={(e) => {
                            setAltText(e.target.value);
                            handleButtonDisable(e.target.value);
                        }
                        }
                        onBlur={updateImageInStore}
                      />
                    </div>
                    {/* {console.log('altTextErr : ',altTextErr)} */}
                    {altTextErr && <div className='alt-text-span'><img width="12px" height="12px" src={errorMark} />{htmlErrMsg}</div>}
                    <div className={`long-description-body ${ longDescErr === true ? "invalid" : "" }`}>
                      <p className={'long-text'}> Long Description </p>
                      <textarea
                        id="longDescription_AM"
                        name="longDescription"
                        rows="9"
                        cols="50"
                        placeholder="Enter your text here"
                        value={longDescription}
                        onChange={(e) =>{
                            setLongDescription(e.target.value);
                            handleButtonDisable(null, e.target.value);
                          }
                        }
                        onBlur={updateImageInStore}
                      ></textarea>
                    </div>
                    {longDescErr && <div className='alt-text-span' ><img width="12px" height="12px" src={errorMark} />{htmlErrMsg}
                    </div>}
                  </div>
                  <div className="te-metadata-button">
                    <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleImport}>Import in Cypress</span>
                    <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleSave}>Save All</span>
                    <span className={`cancel-button ${disableButton ? "disabled" : ""}`} id='close-container' onClick={handleReset}>Reset</span>
                    <span className="cancel-button" id='close-container' onClick={handleCancel}>Cancel</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          : <LargeLoader />} 
          </div>
        </div>
      </div>
  )
}

const mapDispatchToProps = dispatch => {
  return { 
    updateEditedData: (editedData) => {
      dispatch(updateEditedData(editedData))
    },
    prepareImageDataFromTable: (element) => {
      dispatch(prepareImageDataFromTable(element))
    }
  }
}

const mapStateToPros = state => {
  return {
    editedImageList: state.appStore.tableElementEditedData
  }
}
export default connect(mapStateToPros, mapDispatchToProps)(MetaDataPopUpForTE);