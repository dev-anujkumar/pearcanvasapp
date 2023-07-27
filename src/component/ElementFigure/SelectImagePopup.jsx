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
const SelectImagePopup = (props) => {
  const { imageList, togglePopup, selectImageHandler } = props
  const [altTextErr, setAltTextErr] = useState(false);
  const [longDescErr, setLongDescErr] = useState(false);
  const [index, setIndex] = useState(0);
  const [lowerIndex, setLowerIndex] = useState(0);
  const [upperIndex, setUpperIndex] = useState(2);
  const [altText, setAltText] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [imageSrc, setimageSrc] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [active, setActive] = useState("");

  useEffect(() => {
    if(imageList?.length > 0){
      let { imageAltText, imageLongDes } = props;
      let { url } = imageList[0];
      setAltText(imageAltText);
      setLongDescription(imageLongDes);
      setDisableButton(false);
      setimageSrc(url);
      
      if(checkHTMLInString(imageAltText)){
        setAltTextErr(true);
      }
      if(checkHTMLInString(imageLongDes)){
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
        let { url } = imageList[newIndex];
        let { imageAltText, imageLongDes } = props;
        setAltText(imageAltText);
        setLongDescription(imageLongDes);
        setDisableButton(false);
        setimageSrc(url);
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

  const handleCancel = () => {
    togglePopup(); // this will hide the popup
  }

  const handleSave = () => {
    selectImageHandler(imageList[index].url);
  }


  let htmlErrMsg = 'HTML tags are present. Please remove as this is not supported.';

  const changeImageOnClick = (newIndex) => {
    updateCurrentImage(newIndex);
    updateRangeForImages(newIndex);
    setIndex(newIndex);
  }

    return (
        <div className="model">
            <div tabIndex="0" className="te-model-popup">
                <div className='figure-popup editPopupforTE'>
                    {imageList?.length > 0 ?
                        <React.Fragment>
                            <div className="dialog-button1">
                                <span className="edit-metadata">Select An Image</span>
                            </div>
                            <div className='left-right-container'>
                                <div className="left-container">
                                    <div className='outer-img-container'>
                                        <img className='inner-img-container' src={imageSrc} id={imageSrc} />
                                    </div>
                                    <div className='outer-img-array-container'>
                                        {imageList.length > 3 && <span className={`left-arrow ${index === 0 ? 'disable' : ''}`} onClick={traverseLeft}><div className={`left-arrow-icon`}><img width="12px" height="12px" src={moveArrow} /></div></span>}
                                        <span className='inner-img-array'>
                                            {imageList && imageList.map((image, imgIndex) => {
                                                if (imgIndex >= lowerIndex && imgIndex <= upperIndex) {
                                                    return (
                                                        <div className={`img-inside-array ${(imageList.length <= 3 && imgIndex === 0) ? 'first-img' : ''}`}>
                                                            <img
                                                                key={image.url}
                                                                className='seperate-img'
                                                                src={image.url}
                                                                onClick={() => changeImageOnClick(imgIndex)}
                                                                style={(index == imgIndex) ? { border: '4px solid #005a70' } : { border: 'none' }}
                                                            />
                                                        </div>
                                                    )
                                                }
                                            })}
                                        </span>
                                        {imageList.length > 3 && <span className={`right-arrow ${index === (imageList.length - 1) ? 'disable' : ''}`} onClick={traverseRight}><div className={`right-arrow-icon`}>{imageList.length > 3 && <img width="12px" height="12px" src={moveArrow} />}</div></span>}
                                    </div>
                                </div>
                                <div className="right-container">
                                    <div className="figuremetadata-field-table">
                                        <div className={`alt-text-body-table ${altTextErr === true ? "invalid" : active === 'altBody' ? 'active' : ""}`}>
                                            <p className={`alt-text ${altTextErr === true ? "invalid" : active === 'altBody' ? 'active' : ""}`}><b> Alt Text </b></p>
                                            <div
                                                id="altText_AM"                                                
                                            >{altText}</div>
                                        </div>
                                        {altTextErr && <div className='alt-text-span'>
                                            <span className='err-msg-img-span'>
                                                <img width="12px" height="12px" src={errorMark} />
                                            </span>
                                            <span>{htmlErrMsg}</span>
                                        </div>}
                                        <div className={`long-description-body-table ${longDescErr === true ? "invalid" : active === 'longBody' ? 'active' : ""}`}>
                                            <p className={`long-text ${longDescErr === true ? "invalid" : active === 'longBody' ? 'active' : ""}`}><b> Long Description </b></p>
                                            <div
                                                id="longDescription_AM"
                                                name="longDescription"
                                                
                                            >{longDescription}</div>
                                        </div>
                                        {longDescErr && <div className='alt-text-span' >
                                            <span className='err-msg-img-span'>
                                                <img width="12px" height="12px" src={errorMark} />
                                            </span>
                                            <span>{htmlErrMsg}</span>
                                        </div>}
                                    </div>
                                    <div className="te-metadata-button">
                                        <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleSave}>Select</span>
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
    }
}
export default connect(mapStateToPros, mapDispatchToProps)(SelectImagePopup);