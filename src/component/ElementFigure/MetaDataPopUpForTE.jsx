import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/PopUp/PopUp.css';
import { updateEditedData, saveTEMetadata } from '../ElementContainer/ElementContainer_Actions';
import moveArrow from './Assets/down-arrow.svg';


const MetaDataPopUpForTE = (props) => {
  const {imageList, editedImageList, updateEditedData} = props
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
      
        
        if(/<\/?[a-z][\s\S]*>/i.test(altText)){
          setAltTextErr(true);
        }else if(/<\/?[a-z][\s\S]*>/i.test(longdescription)){
          setLongDescErr(true);
        }
        
      }    
    }, [props.imageList]);


    // useEffect()

    const checkHTMLInString = (str) => {
      return /<\/?[a-z][\s\S]*>/i.test(str)
    }

    const traverseLeft = () => {
      if(index > 0){
        let newIndex = index - 1;
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
      checkingForInputErr('leftShift');
    }

    const traverseRight = () => {
      if(index < imageList?.length-1){
        let newIndex = index + 1;
        updateCurrentImage(newIndex);
        setIndex(newIndex);
      }
      updateRangeForImages();
      checkingForInputErr('rightShift');
    }

    const checkingForInputErr = (shiftType=null) => {
      console.log('Inside checkingForInputErr index value : ',index)
      let altText;
      let longdescription;
      if(shiftType === 'rightShift'){
        ({ altText, longdescription } = imageList[index+1]);
      }else if(shiftType === 'leftShift'){
        ({ altText, longdescription } = imageList[index-1]);
      }
    
      
      if(/<\/?[a-z][\s\S]*>/i.test(altText)){
        setAltTextErr(true);
        setLongDescErr(false);
      }else if(/<\/?[a-z][\s\S]*>/i.test(longdescription)){
        setAltTextErr(false);
        setLongDescErr(true);
      }else{
        setAltTextErr(false);
        setLongDescErr(false);

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
          props.togglePopup(false, 'TE');
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
      imgElementArray.push(x);
      console.log('x => ',x)})
                          
    console.log('imgElementArray : ',imgElementArray)

    const substring = 'imageAssetContent:07655e98-e184-407b-9db5-77ee19255e95:3730';
    let requiredImgElement = imgElementArray.find(element => {
      if (element.includes(substring)) {
        return true;
      }
    })

    console.log('requiredImgElement : ',requiredImgElement)
    // saveTEMetadata(editedImageList)
    //     .then(() => {
		//       /*-- Updata the image metadata in wip */
		//       // this.props.updateFigureData(figureData, index, element.id, asideData, () => {
		//       // 	// this.props.handleFocus("updateFromC2")
		//       // 	this.props.handleBlur()
		//       // })
    //     });
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
                     <img className='inner-img-container' src={imageSrc} id={imageID} /> 
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
                    {altTextErr && <span className='alt-text-span'><i class="fa-solid fa-triangle-exclamation"></i>Special characters are not supported in the Alt Text input field</span>}
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
                    {longDescErr && <span style={ {  color: 'red' } }><i class="fa-solid fa-triangle-exclamation"></i>Special characters are not supported in the Long Description input field</span>}
                  </div>
                  <div className="metadata-button">
					           <span className={`metadata-import-button ${disableButton ? "disabled" : ""}`} onClick={handleImport}>Import in Cypress</span>
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