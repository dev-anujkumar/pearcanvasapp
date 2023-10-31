import React, { useState, useRef } from 'react'
/**Import Assets */
import { DEFAULT_IMAGE_SOURCE } from '../../constants/Element_Constants';
import { hasReviewerRole } from '../../constants/utility';
import figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
import KeyboardWrapper from '../Keyboard/KeyboardWrapper.jsx';
/**Import Constants */
import { FIGURE_IMAGE_BUTTON_TITLE, IMAGE_ID, IMAGE_PATH, ALFRESCO_SITE_PATH, UPDATE_FIGURE_IMAGE_BUTTON_TITLE } from './ElementFigure_Constants'

/**
 * This is Pure Component to render Image Asset of FigureImage Component
 */
const FigureImageAsset = (props) => {
    const { imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight } = props.figureTypeData;

    const addFigureRef = useRef(null);
    const updateFigureRef = useRef(null);
    const deleteFigureRef = useRef(null);
    const [focusBackground, serFocusBackgrond] = useState(false);
    const isReviewer = hasReviewerRole();



    const focusDelete = () => {
        deleteFigureRef.current.focus();
        serFocusBackgrond(true);
    }

    const focusSelectAnImage = () => {
        addFigureRef.current.focus();
    }

    const focusUpdate = () => {
        if(props.isEnableKeyboard) {
            updateFigureRef.current.focus();
            serFocusBackgrond(true);
        }
    }

    const triggerClickOnEnter = (event) => {
        if(props.isEnableKeyboard) {     
            const keyCode = event.keyCode;
            if(keyCode === 13) {
                const node = document.activeElement;
                node.click();
            }
            if(event.keyCode === 38){
                event.preventDefault();
            }
        }
    }
    const removeFocus = () => {
        serFocusBackgrond(false);
    }


    return (
       
            <div className={`figure-image-container`}>
                <div id="figure_add_div" className={`pearson-component image figureData  ${isReviewer ? 'pointer-events-none' : ''} ${imageClass} ${props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
                    {
                        props.model.figuredata && props.model.figuredata.imageid ?
                            <img src={props.imgSrc ? props.imgSrc : (props?.model?.figuredata?.path !== "" ? props.model.figuredata.path : '')}
                                data-src={props.imgSrc}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload ' + actualSizeClass}
                                draggable="false"
                                width={imgWidth}
                                height={imgHeight}
                            /> : 
                            <KeyboardWrapper index={`${props.index}-image-asset-1`} enable={props.isEnableKeyboard}>
                                <div onClick={focusSelectAnImage}>
                                    <div onKeyDown={triggerClickOnEnter} tabIndex={0} ref={addFigureRef} className='figurebutton' onClick={(e) => props.addFigureResource(e)}>{FIGURE_IMAGE_BUTTON_TITLE}</div>
                                </div>
                            </KeyboardWrapper>
                    }
                </div>
                <div>
                    {
                        props.model.figuredata && props.model.figuredata.imageid !== "" ?
                            <div className={`${focusBackground?'image-background-focus': ''} figure-wrapper`}>
                                <div className="figure-image-info">
                                    <div className='image-figure'><p className='image-text'>{IMAGE_ID}</p> <span className='image-info'> {props.model.figuredata && props.model.figuredata.imageid ? props.model.figuredata.imageid : ""}</span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{IMAGE_PATH}</p> <span className='image-info'> {props.imgSrc ? props.imgSrc : (props.model.figuredata.path && props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? props.model.figuredata.path : "")}</span> </div>
                                    <div className='image-figure-path'><p className='image-text'>{ALFRESCO_SITE_PATH}</p> <span className='image-info'>{props.model.figuredata && props.model.figuredata.path && props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? props.alfrescoSite : ""}</span> </div>
                                </div>

                            <KeyboardWrapper index={`${props.index}-image-asset-1`} enable={props.isEnableKeyboard}>
                                <div onClick={focusUpdate}>
                                    <div onKeyDown={triggerClickOnEnter} tabIndex={0} ref={updateFigureRef} className={`updatefigurebutton ${isReviewer ? "hide-buttons" : ""}`} onClick={(e) => props.addFigureResource(e)}>{UPDATE_FIGURE_IMAGE_BUTTON_TITLE}</div>
                                </div>
                            </KeyboardWrapper>
                            <KeyboardWrapper index={`${props.index}-image-asset-2`} enable={props.isEnableKeyboard}>
                                <div onClick={focusDelete}>
                                  <div onBlur={removeFocus} onKeyDown={triggerClickOnEnter} tabIndex={0} ref={deleteFigureRef} className={`deletefigurebutton ${isReviewer ? "hide-buttons" : ""}`} onClick={() => props.toggleDeletePopup(true)}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                                </div>
                               </KeyboardWrapper>
                            </div> : ''
                    }
                </div>
            </div>
    )
}

export default FigureImageAsset;