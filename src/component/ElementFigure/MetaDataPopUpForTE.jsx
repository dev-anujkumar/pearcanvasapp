import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/PopUp/PopUp.css';
import { updateEditedData, saveTEMetadata } from '../ElementContainer/ElementContainer_Actions';
import moveArrow from './Assets/down-arrow.svg';
import errorMark from './Assets/shape.svg';


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
  }, [index]);

  const checkHTMLInString = (str) => {
    return /<\/?[a-z][\s\S]*>/i.test(str)
  }

  const traverseLeft = () => {
    if(index > 0){
      let newIndex = index - 1;
      updateCurrentImage(newIndex);
      updateRangeForImages(newIndex);
      setIndex(newIndex);
    }
  }

  const traverseRight = () => {
    if(index < imageList?.length-1){
      let newIndex = index + 1;
      updateCurrentImage(newIndex);
      setIndex(newIndex);
      updateRangeForImages(newIndex);
    }
  }

    const checkingForInputErr = () => {
      if(Array.isArray(imageList) && imageList.length > 0){
        let { altText, longdescription } = imageList[index];
    
        if(checkHTMLInString(altText)){
          setAltTextErr(true);
        } else {
          setAltTextErr(false);
        }
        if(checkHTMLInString(longdescription)){
          setLongDescErr(true);
        }else{
          setLongDescErr(false);
        }
      }
    }

  const updateCurrentImage = (newIndex) => {
    let { imgId, imgSrc } = imageList[newIndex];
    let altText = "", longdescription = "";
    if(Object.keys(editedImageList).length > 0 && editedImageList[imgId]){
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

  const handleButtonDisable = () => {
    if(disableButton){
      setDisableButton(false);
    }
  }

  const updateImageInStore = () => {
    let altTxt = imageList[index].altText;
    let {longdescription} = imageList[index];
    if((!checkHTMLInString(altTxt) && !checkHTMLInString(longdescription)) && (altTxt !== altText || longdescription !== longDescription)){
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
          togglePopup(false, 'TE');
        });
  }

  const handleImport = () => {
    const { index, element, asideData } = props;
    /*-- Form data to send to wip */
    let figureData = { ...element.figuredata };
    console.log("===========> figureData: ", figureData.tableasHTML)
    let dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = figureData.tableasHTML;
    // console.log("==========> dummyDiv: ", dummyDiv.querySelector(`img data-id=imageAssetContent:4819307d-7857-44f6-809a-24cae6836ff6:2648`))
    console.log("stringify: ", JSON.stringify(dummyDiv.innerHTML))
    let imgElementArray = [];
    let sources = dummyDiv.innerHTML.match(/<img [^>]*src="[^"]*"[^>]*>/gm).forEach(x=> {
      imgElementArray.push(x);})
                        

    const substring = 'imageAssetContent:07655e98-e184-407b-9db5-77ee19255e95:3730';
    let requiredImgElement = imgElementArray.find(element => {
      if (element.includes(substring)) {
        return true;
      }
    })

    
    // saveTEMetadata(editedImageList)
    //     .then(() => {
		//       /*-- Updata the image metadata in wip */
		//       // this.props.updateFigureData(figureData, index, element.id, asideData, () => {
		//       // 	// this.props.handleFocus("updateFromC2")
		//       // 	this.props.handleBlur()
		//       // })
    //     });
  }

  const handleCancel = () => {
    updateEditedData({});
    togglePopup(false, 'TE');
  }

  const handleReset = () => {
    updateEditedData({});
    updateCurrentImage(index);
  }

  let htmlErrMsg = ' HTML is not supported in this input field';

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
                   <img className='inner-img-container' src={imageSrc} id={imageID} /> 
                </div>
                <div className='outer-img-array-container'>
                  <span className='left-arrow' onClick={traverseLeft}><div className='left-arrow-icon'><img width="12px" height="12px" src={moveArrow} /></div></span>
                  <span className='inner-img-array'>
                  {imageList && imageList.map((image, imgIndex) => {
                    if(imgIndex >= lowerIndex && imgIndex <= upperIndex){
                        return (<img 
                        className='img-inside-array' 
                        src={image.imgSrc} 
                        id={image.imgId}
                        style={ image.imgSrc === imageSrc ? {  border: '2px solid #427ef5' } : {border: 'none'} } 
                      />)
                    }
                  })}
                  </span>
                  <span className='right-arrow' onClick={traverseRight}><div className='right-arrow-icon'><img width="12px" height="12px" src={moveArrow} /></div></span>
                </div>
              </div>
              <div className="right-container">
                <div className="figuremetadata-field">
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
                          handleButtonDisable();
                          checkingForInputErr();
                      }
                      }
                      onBlur={updateImageInStore}
                    />
                  </div>
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
                          handleButtonDisable();
                          checkingForInputErr();
                        }
                      }
                      onBlur={updateImageInStore}
                    ></textarea>
                  </div>
                  {longDescErr && <div className='alt-text-span' ><img width="12px" height="12px" src={errorMark} />{htmlErrMsg}
                  </div>}
                </div>
                <div className="metadata-button">
                   <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleImport}>Import in Cypress</span>
                   <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleSave}>Save All</span>
                   <span className={`cancel-button ${disableButton ? '' : "disabled"}`} id='close-container' onClick={handleReset}>Reset</span>
                   <span className="cancel-button" id='close-container' onClick={handleCancel}>Cancel</span>
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