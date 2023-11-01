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
  const [active, setActive] = useState("");

  useEffect(() => {
    if(imageList?.length > 0){
      let { altText, imgId, imgSrc, longdescription } = imageList[0];
      setAltText(altText);
      setLongDescription(longdescription);
      setDisableButton(false);
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
  }, [index]);

  useEffect(()=> {
    checkingForInputErr();
  }, [altText, longDescription]);

  const checkHTMLInString = (str) => {
    return /<\/?[a-z][\s\S]*>/i.test(str)
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
    setDisableButton(false);
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

  const updateImageInStore = () => {
    handleActiveState("");
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
            img.setAttribute('alt', altText);
            img.setAttribute('data-longdescription', longdescription);
            img.removeAttribute('data-alttext')
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
    props.prepareImageDataFromTable({}); // this will delete the TE data from store
    togglePopup(false, 'TE');
  }


  let htmlErrMsg = 'HTML tags are present. Please remove as this is not supported.';

  const handleActiveState = (active) => {
		setActive(active)
	}

  const changeImageOnClick = (newIndex) => {
    updateCurrentImage(newIndex);
    updateRangeForImages(newIndex);
    setIndex(newIndex);
  }

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
                  {imageList.length > 3 && <span className={`left-arrow ${index === 0 ? 'disable' : ''}`}
                   onClick={traverseLeft}><div className={`left-arrow-icon`}><img width="12px" height="12px" src={moveArrow} /></div></span>}
                    <span className='inner-img-array'>
                    {imageList && imageList.map((image, imgIndex) => {
                      if(imgIndex >= lowerIndex && imgIndex <= upperIndex){
                          return (
                          <div className={`img-inside-array ${(imageList.length <= 3 && imgIndex === 0) ? 'first-img' : '' }`}>
                             <img 
                               key={image.imgId}
                               className='seperate-img' 
                               src={image.imgSrc} 
                               id={image.imgId}
                               onClick={() => changeImageOnClick(imgIndex)}
                               style={ ( image.imgId === imageID && index == imgIndex ) ? {  border: '1px solid #005a70' } : {border: 'none'} } 
                             />
                          </div>
                          )
                      }
                    })}
                    </span>
                    {imageList.length > 3 && <span className={`right-arrow ${index === (imageList.length - 1) ? 'disable' : '' }`}
                    onClick={traverseRight}><div className={`right-arrow-icon`}>{imageList.length > 3 && <img width="12px" height="12px" src={moveArrow} />}</div></span>}
                  </div>
                </div>
                <div className="right-container">
                  <div className="figuremetadata-field-table">
                    <div className={`alt-text-body-table ${altTextErr === true ? "invalid" : active === 'altBody' ? 'active' : "" }`}>
                      <p className={`alt-text ${altTextErr === true ? "invalid" : active === 'altBody' ? 'active' : "" }`}> Alt Text </p>
                      <input
                        autocomplete="off"
                        id="altText_AM"
                        name="altText"
                        type="text"
                        placeholder="Enter your text here"
                        value={altText}
                        onChange={(e) => {
                            setAltText(e.target.value);
                        }
                        }
                        onClick={() => handleActiveState('altBody')}
                        onBlur={updateImageInStore}
                      />
                    </div>
                    {altTextErr && <div className='alt-text-span'>
                      <span className='err-msg-img-span'>
                        <img width="12px" height="12px" src={errorMark} />
                      </span>
                      <span>{htmlErrMsg}</span>
                    </div>}
                    <div className={`long-description-body-table ${longDescErr === true ? "invalid" : active === 'longBody' ? 'active' : ""}`}>
                      <p className={`long-text ${longDescErr === true ? "invalid" : active === 'longBody' ? 'active' : ""}`}> Long Description </p>
                      <textarea
                        id="longDescription_AM"
                        name="longDescription"
                        rows="9"
                        cols="50"
                        placeholder="Enter your text here"
                        value={longDescription}
                        onChange={(e) =>{
                            setLongDescription(e.target.value);
                          }
                        }
                        onClick={() => handleActiveState('longBody')}
                        onBlur={updateImageInStore}
                      ></textarea>
                    </div>
                    {longDescErr && <div className='alt-text-span' >
                      <span className='err-msg-img-span'>
                        <img width="12px" height="12px" src={errorMark} />
                      </span>
                      <span>{htmlErrMsg}</span>
                    </div>}
                  </div>
                  <div className="te-metadata-button">
                    <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleImport}>Import in Cypress</span>
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