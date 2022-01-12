import React from 'react'
/**Import Assets */
import { DEFAULT_IMAGE_SOURCE } from '../../constants/Element_Constants';
import figureDeleteIcon from '../../images/ElementButtons/figureDeleteIcon.svg';
/**Import Constants */
import { FIGURE_IMAGE_BUTTON_TITLE, IMAGE_ID, IMAGE_PATH, ALFRESCO_SITE_PATH, UPDATE_FIGURE_IMAGE_BUTTON_TITLE } from './ElementFigure_Constants'

/**
 * This is Pure Component to render Image Asset of FigureImage Component
 */
const FigureImageAsset = (props) => {
    const { imageClass, dataType, imageDimension, actualSizeClass, imgWidth, imgHeight } = props.figureTypeData
    return (
        <>
            <div id="figure_add_div" className={`pearson-component image figureData ${imageClass} ${props.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} >
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
                        /> : <div className='figurebutton' onClick={(e) => props.addFigureResource(e)}>{FIGURE_IMAGE_BUTTON_TITLE}</div>
                }
            </div>
            <div>
                {
                    props.model.figuredata && props.model.figuredata.imageid !== "" ?
                        <div className="figure-wrapper">
                            <div className="figure-image-info">
                                <div className='image-figure'><p className='image-text'>{IMAGE_ID}</p> <span className='image-info'> {props.model.figuredata && props.model.figuredata.imageid ? props.model.figuredata.imageid : ""}</span> </div>
                                <div className='image-figure-path'><p className='image-text'>{IMAGE_PATH}</p> <span className='image-info'> {props.imgSrc ? props.imgSrc : (props.model.figuredata.path && props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? props.model.figuredata.path : "")}</span> </div>
                                <div className='image-figure-path'><p className='image-text'>{ALFRESCO_SITE_PATH}</p> <span className='image-info'>{props.model.figuredata && props.model.figuredata.path && props.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? props.alfrescoSite : ""}</span> </div>
                            </div>
                            <div className='updatefigurebutton' onClick={(e) => props.addFigureResource(e)}>{UPDATE_FIGURE_IMAGE_BUTTON_TITLE}</div>
                            <div className='deletefigurebutton' onClick={() => props.toggleDeletePopup(true)}><img width="24px" height="24px" src={figureDeleteIcon} /></div>
                        </div> : ''
                }
            </div>
        </>
    )
}

export default FigureImageAsset;