import React, { Component } from 'react';
import PropTypes from 'prop-types';
// IMPORT - Components //
import TinyMceEditor from "../tinyMceEditor";

// IMPORT - Assets //
import {
    DEFAULT_IMAGE_DATA_SOURCE,
    DEFAULT_IMAGE_SOURCE
} from '../../constants/Element_Constants';
import { getAlfrescositeResponse } from './AlfrescoSiteUrl_helper.js';
import { getLabelNumberTitleHTML } from '../../constants/utility';
import figureData from './figureTypes';
import './../../styles/ElementFigure/ElementFigure.css';
import { connect } from 'react-redux';

/*** @description - ElementFigure is a class based component. It is defined simply
* to make a skeleton of the figure-type element .*/

class FigureImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: null,
            projectMetadata: false,
            alfrescoSite: '',
            alfrescoSiteData: {}
        }
    }

    componentDidMount() {
        const figureImageTypes = ["image", "mathImage", "table"];
        if(figureImageTypes.includes(this.props?.figureElementProps?.model?.figuretype)){
          getAlfrescositeResponse(this.props.figureElementProps.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title,
                alfrescoSiteData:{...response}
            })
          })
        } 
    }

    render() {
        const { figureElementProps } = this.props;
        let elementFigureAlignment = ''
        if (figureElementProps.model && figureElementProps.model.figuretype) {
            switch (figureElementProps.model.figuretype) {
                case 'table':
                case 'mathImage':
                    elementFigureAlignment = figureElementProps.model.alignment ? figureElementProps.model.alignment : 'half-text';
                    break;
                case 'image':
                default:
                    elementFigureAlignment = figureElementProps.model.alignment ? figureElementProps.model.alignment : 'text-width';
                    break;
            }
        }
        let figureType = figureData[figureElementProps.model['figuretype']]
        let figureAlignment = figureType[elementFigureAlignment]
        let divClass = figureAlignment['divClass'],
            figureClass = figureAlignment['figureClass'],
            figLabelClass = figureAlignment['figLabelClass'],
            figTitleClass = figureAlignment['figTitleClass'],
            dataType = figureAlignment['dataType'],
            imageDimension = figureAlignment['imageDimension'],
            figCaptionClass = figureAlignment['figCaptionClass'],
            figCreditClass = figureAlignment['figCreditClass'];

        let figureHtmlData = getLabelNumberTitleHTML(figureElementProps.model);
        console.log("yha aaaaaaaaaaaaaaaaaaaaaaaa rha hai")
            return (
                <div className="figureElement">
                <div className={divClass} resource="">
                <figure className={figureClass} resource="">
                    <header className="figure-header">

                        <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-0`} placeholder="Enter Label..." tagName={'h4'} className={figLabelClass + " figureLabel "} model={figureHtmlData.formattedLabel} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement}  showHideType = {figureElementProps.showHideType}/>

                        <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-1`} placeholder="Enter Number..." tagName={'h4'} className={figLabelClass + " figureNumber "} model={figureHtmlData.formattedNumber} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement}  showHideType = {figureElementProps.showHideType}/>

                        <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-2`} placeholder="Enter Title..." tagName={'h4'} className={figTitleClass + " figureTitle "} model={figureHtmlData.formattedTitle} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement}  showHideType = {figureElementProps.showHideType}/>

                    </header>
                        <div className="figure-wrapper">
                            <div className='image-figure'><p className='image-text'>Image ID: </p> <span className='image-info'> {figureElementProps.model.figuredata && figureElementProps.model.figuredata.imageid ? figureElementProps.model.figuredata.imageid : ""} </span> </div>
                            <div className='image-figure-path'><p className='image-text'>Image Path: </p> <span className='image-info'> {this.state.imgSrc ? this.state.imgSrc : (figureElementProps.model.figuredata.path && figureElementProps.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? figureElementProps.model.figuredata.path : "")}</span> </div>
                            <div className='image-figure-path'><p className='image-text'>Alfresco Site: </p> <span className='image-info'>{figureElementProps.model.figuredata && figureElementProps.model.figuredata.path && figureElementProps.model.figuredata.path !== DEFAULT_IMAGE_SOURCE ? this.state.alfrescoSite : ""} </span> </div>
                        </div>

                    <div className={`pearson-component image figureData ${figureElementProps.model.figuredata.tableasHTML !== "" ? 'table-figure-data' : ""}`} data-type={dataType} onClick={this.addFigureResource} >
                        
                            <img src={this.state.imgSrc}
                                data-src={this.state.imgSrc}
                                title=""
                                alt=""
                                className={imageDimension + ' lazyload'}
                                draggable="false" />

                    </div>
                    <figcaption >
                        <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-3`} placeholder="Enter Caption..." tagName={'p'} className={figCaptionClass + " figureCaption"} model={figureElementProps.model.html.captions} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement}  showHideType = {figureElementProps.showHideType}/>
                    </figcaption>
                    <figcredit >
                        <TinyMceEditor permissions={figureElementProps.permissions} openGlossaryFootnotePopUp={figureElementProps.openGlossaryFootnotePopUp} element={figureElementProps.model} handleEditorFocus={figureElementProps.handleFocus} handleBlur={figureElementProps.handleBlur} index={`${figureElementProps.index}-4`} placeholder="Enter Credit..." tagName={'figureCredit'} className={figCreditClass + " figureCredit"} model={figureElementProps.model.html.credits} slateLockInfo={figureElementProps.slateLockInfo} glossaryFootnoteValue={figureElementProps.glossaryFootnoteValue} glossaaryFootnotePopup={figureElementProps.glossaaryFootnotePopup} elementId={figureElementProps.elementId} parentElement={figureElementProps.parentElement}  showHideType = {figureElementProps.showHideType}/>
                    </figcredit>
                </figure>
            </div>
                </div>
            );
    }
}

const mapActionToProps = (dispatch) =>{
    return{
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption,
        launchAlfrescoPopup: state.alfrescoReducer.launchAlfrescoPopup,
        isCiteChanged : state.alfrescoReducer.isCiteChanged,
        changedSiteData: state.alfrescoReducer.changedSiteData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(FigureImage);