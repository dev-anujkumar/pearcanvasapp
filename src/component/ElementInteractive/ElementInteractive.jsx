/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import TinyMceEditor from "../tinyMceEditor";
import { c2MediaModule } from './../../js/c2_media_module';
import { showTocBlocker,hideTocBlocker, disableHeader, showBlocker, hideToc } from '../../js/toggleLoader'
import config from '../../config/config';
import { utils } from '../../js/utils';
import axios from 'axios';
import { hasReviewerRole } from '../../constants/utility.js';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import  {setCurrentCiteTdx, setCurrentInnerCiteTdx, getMCQGuidedData, assessmentSorting}  from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import {resetElmStore} from '../AssessmentSlateCanvas/elm/Actions/ElmActions.js';
import { connect } from 'react-redux';
import { sendDataToIframe } from './../../constants/utility.js';
import { INTERACTIVE_FPO, INTERACTIVE_SCHEMA, AUTHORED_TEXT_SCHEMA } from '../../constants/Element_Constants.js';
import interactiveTypeData from './interactiveTypes.js';
import elementTypeConstant from '../ElementContainer/ElementConstants.js';
import TcmConstants from '../TcmSnapshots/TcmConstants.js';
import { setNewItemFromElm, fetchAssessmentMetadata, fetchAssessmentVersions, updateAssessmentVersion, setElmPickerData } from "../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js"
import ElmUpdateButton from '../AssessmentSlateCanvas/ElmUpdateButton.jsx';
import { ELM_UPDATE_BUTTON, ELM_UPDATE_POPUP_HEAD, ELM_UPDATE_MSG, ELM_INT,Resource_Type } from "../AssessmentSlateCanvas/AssessmentSlateConstants.js"
import PopUp from '../PopUp';
import { OPEN_ELM_PICKER, TOGGLE_ELM_SPA, SAVE_ELM_DATA, ELM_CREATE_IN_PLACE } from '../../constants/IFrameMessageTypes';
import { handlePostMsgOnAddAssess } from '../ElementContainer/AssessmentEventHandling';
import {alfrescoPopup, saveSelectedAssetData} from '../AlfrescoPopup/Alfresco_Action'
/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/
class Interactive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemID : this.props.model.figuredata && this.props.model.figuredata.interactiveid ? this.props.model.figuredata.interactiveid : "",
            posterImage : null,
            imagePath : this.props.model.figuredata && this.props.model.figuredata.posterimage && this.props.model.figuredata.posterimage.path ? this.props.model.figuredata.posterimage.path : "",
            showAssesmentpopup: false,
            elementType: this.props.model.figuredata.interactivetype || "",
            projectMetadata: false,
            showAssessmentPopup: false,
            showSinglePopup:false,
            setCurrentAssessment:{},
            parentPageNo:1,
            isReset: false,
            searchTitle : '',
            filterUUID : '',
            itemParentID: this.props.model.figuredata && this.props.model.figuredata.interactiveparentid ? this.props.model.figuredata.interactiveparentid : "",
            openedFrom:'',
            interactiveTitle: this.props.model.figuredata && this.props.model.figuredata.interactivetitle? this.props.model.figuredata.interactivetitle : "",
            showUpdatePopup:false
           };

    }

    componentDidMount(){
        if(this.props.model && this.props.model.figuredata){
            this.setState({
                itemID : this.props.model.figuredata.interactiveid ? this.props.model.figuredata.interactiveid : "",
                posterImage : this.props.model.figuredata.posterimage && this.props.model.figuredata.posterimage.path ? this.props.model.figuredata.posterimage.path : "", 
                itemParentID: this.props.model.figuredata.interactiveparentid ? this.props.model.figuredata.interactiveparentid : "",
                interactiveTitle: this.props.model.figuredata.interactivetitle? this.props.model.figuredata.interactivetitle : "",
            
            })
        }
    }

    componentDidUpdate(prevProps) {
        const { elementId, alfrescoElementId, alfrescoAssetData } = this.props
        console.log('Interactive ASSET DATA', alfrescoAssetData)
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId) {
            this.dataFromAlfresco(alfrescoAssetData)
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if('figuredata' in nextProps.model && 'interactivetype' in nextProps.model.figuredata && nextProps.model.figuredata.interactivetype !== prevState.elementType) {
            return {
                itemID: nextProps.model.figuredata && nextProps.model.figuredata.interactiveid ? nextProps.model.figuredata.interactiveid : "",
                posterImage: null,
                imagePath : nextProps.model.figuredata && nextProps.model.figuredata.posterimage && nextProps.model.figuredata.posterimage.path ? nextProps.model.figuredata.posterimage.path : "",
                elementType: nextProps.model.figuredata.interactivetype || "",
                itemParentID:nextProps.model.figuredata && nextProps.model.figuredata.interactiveparentid ? nextProps.model.figuredata.interactiveparentid : "",
                interactiveTitle: nextProps.model.figuredata && nextProps.model.figuredata.interactivetitle? nextProps.model.figuredata.interactivetitle : "",
            };
        }
        return null;
    }

   componentDidUpdate() { 
       const { assessmentReducer } = this.props;
       const { itemID, interactiveTitle, elementType } = this.state;
       if (!config.savingInProgress && !config.isSavingElement && (elementType === ELM_INT) && assessmentReducer) {
           const { dataFromElm } = assessmentReducer;
           if (assessmentReducer.dataFromElm && dataFromElm.resourceType == Resource_Type.INTERACTIVE && dataFromElm.elementUrn === this.props.model?.id) {
               if (dataFromElm?.type == ELM_CREATE_IN_PLACE && dataFromElm.elmUrl) {
                   window.open(dataFromElm.elmUrl);
                   handlePostMsgOnAddAssess(this.addElmInteractive, dataFromElm.usageType);
               } else if (dataFromElm?.type == SAVE_ELM_DATA && dataFromElm.pufObj) {
                   this.addElmInteractive(dataFromElm.pufObj);
               }
               this.props.setElmPickerData({});
           } else if ((itemID && assessmentReducer[itemID])) {
               const newPropsTitle = assessmentReducer[itemID]?.assessmentTitle;
               if ((assessmentReducer[itemID].showUpdateStatus === false && (interactiveTitle !== newPropsTitle))) {
                   this.updateElmOnSaveEvent(this.props);
               }
           }
       }
   }

     /*** @description This function is to show Approved/Unapproved Status on interative */
    showElmVersionStatus = () => {
        let elmInt =  this.props?.assessmentReducer[this.state.itemID];
        if (elmInt) {
            return (<ElmUpdateButton
                elmAssessment={elmInt}
                updateElmVersion={this.updateElm}
                buttonText={ELM_UPDATE_BUTTON}
                embeddedElmClass="elm-int-status-alignment"
                elementType={ELM_INT}
            />)
        }
    }
    /*** @description This function is used to open Version update Popup */
    updateElm = (event) => {
        this.prohibitPropagation(event);
        if (hasReviewerRole() || !(this.props.permissions && this.props.permissions.includes('elements_add_remove'))) {
            return true;
        }
        this.toggleUpdatePopup(true, event);
    }
    /**
     * Prevents event propagation and default behaviour
     * @param {*} event event object
     */
    prohibitPropagation = (event) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        return false
    }
      /**
     * @description This function is used to toggle update elm popup
     * @param {*} toggleValue Boolean value
     * @param {*} event event object
     */
    toggleUpdatePopup = (toggleValue, event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            showUpdatePopup: toggleValue
        })
        this.showCanvasBlocker(toggleValue);
    }
    /*** @description - This function is to disable all components when update Popups are open in window */
    showCanvasBlocker = (value) => {
        if (value === true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker(value);
        }
        disableHeader(value);
        showBlocker(value);
    }
      /*** @description This function is used to render Version update Popup */
    showCustomPopup = () => {
        this.showCanvasBlocker(true);
        return (
            <PopUp
                dialogText={ELM_UPDATE_MSG}
                active={true}
                togglePopup={this.toggleUpdatePopup}
                isElmUpdatePopup={true}
                updateElmAssessment={this.updateElmAssessment}
                isInputDisabled={true}
                isElmUpdateClass="elm-update"
                elmHeaderText={ELM_UPDATE_POPUP_HEAD}
            />
        )
    }
    updateElmAssessment = async (event) => {
        this.toggleUpdatePopup(false, event);
        this.showCanvasBlocker(false);
        let oldWorkUrn = this.props?.model?.figuredata?.interactiveid;
        let oldReducerData = this.props.assessmentReducer[oldWorkUrn]??{};
        oldReducerData.targetId = oldWorkUrn;
        await this.props.fetchAssessmentVersions(oldReducerData.assessmentEntityUrn, 'interactiveUpdate', oldReducerData.createdDate, oldReducerData, {})
        const latestReducerData = this.props.assessmentReducer[this.props?.model?.figuredata?.interactiveid]
        const { latestVersion, secondLatestVersion } = latestReducerData;
        const newVersion = (latestVersion && (latestVersion.status !== 'wip' || latestVersion.latestCleanVersion == false)) ? latestVersion : secondLatestVersion;
        const { interactiveid, interactivetype, interactivetitle } = this.props?.model?.figuredata;
        let figureData = {
            schema: INTERACTIVE_SCHEMA,
            interactiveid: interactiveid,
            interactivetype: interactivetype,
            interactivetitle: interactivetitle || latestReducerData?.assessmentTitle,
            interactiveformat: ELM_INT
        }
        if (newVersion) {
            figureData.interactiveid = newVersion.id;
            figureData.interactivetitle = latestVersion.title;
        }
        this.setState({
            itemID: figureData.interactiveid,
            interactiveTitle: figureData.interactivetitle,
            elementType: interactivetype
        }, () => {
            this.props.fetchAssessmentMetadata("interactive", "",
                 { targetId: figureData.interactiveid }
            );
        })     
        this.props.updateFigureData(figureData, this.props.index, this.props.elementId, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
        disableHeader(false);
        hideTocBlocker(false);
    }

    /**
     * @description - This function is for rendering the Jsx Part of different Interactive Elements.
     * @param {event} element
     * @param {event} itemId
     * @param {event} index
     */
    renderInteractiveType = (element, itemId, index, slateLockInfo) => {
        let jsx, divImage, figureImage, heading4Label, heading4Title, dataType, id, imageDimension, figcaptionClass, paragraphCredit, hyperlinkClass,path;
        var context = element && element.figuredata && element.figuredata.interactivetype;
        /**------------------ Set classes for jsx based on interactivetype value ------------------*/

        let interactiveData = interactiveTypeData.hasOwnProperty(context) === true ? interactiveTypeData[context] : interactiveTypeData["fpo"];
        divImage = interactiveData['divImage'];
        figureImage = interactiveData['figureImage'];
        heading4Label = interactiveData['heading4Label'];
        heading4Title = interactiveData['heading4Title'];
        dataType = interactiveData['dataType'];
        id = interactiveData['id'];
        imageDimension = interactiveData['imageDimension'];
        figcaptionClass = interactiveData['figcaptionClass'];
        paragraphCredit = interactiveData['paragraphCredit'];
        hyperlinkClass = interactiveData['hyperlinkClass'] ? interactiveData['hyperlinkClass'] : "";

        if(context === 'video-mcq' || context === 'mcq' || context === "guided-example" ) {
            jsx = <div className={divImage} resource="">
                <figure className={figureImage} resource="">
                    <header>
                            <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                              handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                            <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                             handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation} />
                    </header>
                    <div className={id +' interactive-id'} onClick={()=> this.handleClickElement()}><strong>{path ? path : 'ITEM ID: '} </strong><span>{this.state.itemID?this.state.itemID : itemId}</span></div>
                    {element.figuredata.interactiveformat === ELM_INT && <div className={id+' interactive-title elm-int-title'} onClick={(event) => this.handleClickElement(event)}><strong>{path ? path : 'INTERACTIVE TITLE: '} </strong><span>{this.state.interactiveTitle ? this.state.interactiveTitle : ""}</span></div>}
                    {(element.figuredata.interactiveformat === ELM_INT ) && <div className={id+' interactive-status cls-display-flex eml-int-status-padding'}><strong className="eml-int-status-label-tm">{ 'CURRENT VERSION: '} </strong>{ this.showElmVersionStatus() }</div> }
                    <div className={"pearson-component " + dataType} data-uri={this.state.itemID?this.state.itemID : itemId} data-type={dataType} data-width="600" data-height="399" onClick={(e)=>{this.togglePopup(e,true)}} >

                        <img src={this.state.imagePath ? this.state.imagePath : INTERACTIVE_FPO} title="View Image" alt="" className={imageDimension + " lazyload"} />

                    </div>
                    <figcaption>
                        <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.captions} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor element={this.props.model} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.credits} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                </div>
            </div>
        }
        else {
            jsx = <div className={divImage} resource="">
                <figure className={figureImage} resource="">
                    <header>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-0`} className={heading4Label + ' figureLabel'} id={this.props.id} placeholder="Enter Label..." tagName={'h4'} model={element.html.title}
                            handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-1`} className={heading4Title + ' figureTitle'} id={this.props.id} placeholder="Enter Title..." tagName={'h4'} model={element.html.subtitle}
                            handleEditorFocus={this.props.handleFocus} handleBlur={this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                    </header>
                    <div className={id+" interactive-id"} onClick={(event) => this.handleClickElement(event)}><strong>{path ? path : 'ITEM ID: '} </strong><span>{this.state.itemID ? this.state.itemID : itemId}</span></div>
                    {element.figuredata.interactiveformat === ELM_INT && <div className={id+' interactive-title elm-int-title'} onClick={(event) => this.handleClickElement(event)}><strong>{path ? path : 'INTERACTIVE TITLE: '} </strong><span>{this.state.interactiveTitle ? this.state.interactiveTitle : ""}</span></div>}
                    {(element.figuredata.interactiveformat === ELM_INT ) && this.state?.itemID && <div className={id+' interactive-status cls-display-flex eml-int-status-padding'}><strong className="eml-int-status-label-tm">{ 'CURRENT VERSION: '} </strong>{ this.showElmVersionStatus() }</div> }
                    <div className={"pearson-component " + dataType} data-uri="" data-type={dataType} data-width="600" data-height="399" onClick={(e) => { this.togglePopup(e, true) }} >
                        {
                            imageDimension !== '' ?
                                (context === 'table' ?
                                    <a className="" href="javascript:void(0)">
                                        <img src={this.state.posterImage ? this.state.posterImage : INTERACTIVE_FPO} data-src={INTERACTIVE_FPO} title="View Image" alt="" className={imageDimension + " lazyload"} />
                                    </a>
                                    : <img src={this.state.posterImage ? this.state.posterImage : INTERACTIVE_FPO} title="View Image" alt="" className={imageDimension + " lazyload"} />
                                )
                                : 
                                 <a className={hyperlinkClass} href="javascript:void(0)">
                                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} index={`${index}-2`} placeholder="Enter call to action..." className={"actionPU"} tagName={'p'} 
                                    model={element.html.postertext? element.html.postertext:""} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} elementId={this.props.elementId} element={this.props.model} handleAudioPopupLocation = {this.props.handleAudioPopupLocation}/>
                                 </a>
                        }
                    </div>
                    <figcaption>
                        <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-3`} className={figcaptionClass + " figureCaption"} id={this.props.id} placeholder="Enter caption..." tagName={'p'} 
                         model={element.html.captions} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation} />
                    </figcaption>
                </figure>
                <div>
                    <TinyMceEditor permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} index={`${index}-4`} className={paragraphCredit + " figureCredit"} id={this.props.id} placeholder="Enter credit..." tagName={'p'}
                     model={element.html.credits} handleEditorFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} handleAudioPopupLocation = {this.props.handleAudioPopupLocation} />
                </div>
            </div>
        }
        return jsx;
    }

    /**
     * @description - This purpose of this function is for only handling the focus of container w.r.t interactive .
     * @param {event} event
     */
    handleClickElement = (event) => {
        event.stopPropagation();
    }

    /**
     * @description - This function is for toggling the c2 media uuid popup.
     * @param {event} value
     */
    togglePopup = (e,value)=>{
        if(hasReviewerRole()){
            return true;
        }
        e.stopPropagation();
        if(this.props.model.figuredata.interactiveformat==="external-link"){
            if(e.target.classList.contains('actionPU')){
                return;
            }
            this.handleC2MediaClick(e);
        }
        else if(this.props.model.figuredata.interactiveformat === "mmi"){
            this.props.assessmentSorting("","");
            sendDataToIframe({ 'type': 'hideToc', 'message': {} });
            this.props.showBlocker(value);
            disableHeader(value);
            this.props.handleFocus();
            if (this.state.itemParentID && this.state.itemID) {
                this.props.setCurrentCiteTdx({
                    "versionUrn": this.state.itemParentID,
                    "name": this.state.interactiveTitle
                });
                this.props.setCurrentInnerCiteTdx({
                    "versionUrn": this.state.itemID
                });
                this.setState({
                    showSinglePopup: value,
                    setCurrentAssessment: {
                        id: this.state.itemParentID,
                        title: this.state.interactiveTitle,
                    },
                    openedFrom: 'singleAssessment'
                });
            }
            else {
                this.setState({
                    showAssessmentPopup: value
                });
            }
        }
        else if (this.props.model.figuredata.interactiveformat === ELM_INT) {
            sendDataToIframe({
                'type': TOGGLE_ELM_SPA,
                'message': {
                    type: OPEN_ELM_PICKER,
                    usageType: '',
                    elementType: ELM_INT,
                    resourceType: Resource_Type.INTERACTIVE,
                    elementUrn: this.props.model.id
                }
            });
        }
        else {
            this.props.showBlocker(value);
            disableHeader(value);
            value ? showTocBlocker(value) : hideTocBlocker(value)
            this.props.handleFocus();
            this.setState({ showAssesmentpopup: value })
        }
    }

    /**---------------- This section consists of Elm Interactive related methods ----------------*/

    /**
     * @description This function is to add Elm Interactive Asset ot Interactive Element 
     * @param {Object} pufObj Objeact containing elmInteractive Asset details
    */
    addElmInteractive = (pufObj, cb) => {

        let figureData = {
            schema: INTERACTIVE_SCHEMA,
            interactiveid: pufObj.id,
            interactivetype: pufObj.interactiveType,
            interactivetitle: pufObj.title,
            interactiveformat: ELM_INT
        }
        this.setState({
            itemID: pufObj.id,
            interactiveTitle: pufObj.title,
            elementType: pufObj.interactiveType
        }, () => {
            this.props.fetchAssessmentMetadata("interactive", "",{ targetId: pufObj.id });
        })
        this.props.updateFigureData(figureData, this.props.index, this.props.elementId, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
        if(pufObj.callFrom === "fromEventHandling"){
            hideTocBlocker();
            disableHeader(false);
        }
        if (cb) {
            cb();
        }
    }

    /*** @description - This function is to update ELM Assessment on Save Event from ELM Portal */
    updateElmOnSaveEvent = (props) => {
        let pufObj = {
            id: this.state.itemID,
            title: props.assessmentReducer[this.state.itemID].assessmentTitle,
            usagetype: this.state.elementType
        }
        this.addElmInteractive(pufObj, () => {
            hideTocBlocker();
            disableHeader(false);
        });
        this.props.setNewItemFromElm({});
    }
    /**------------------------------------------------------------------------------------------*/
    
    /**---------------- This section consists of Alfresco Assets related methods ----------------*/
    /**
     * @description function will be called on image src add and fetch resources from Alfresco
     */
    dataFromAlfresco = (data) => {
        hideTocBlocker();
        disableHeader(false);
        this.props.showBlocker(false);
        let imageData = data;
        let epsURL = imageData['EpsUrl'] ? imageData['EpsUrl'] : "";              //commented lines will be used to update the element data
        //let figureType = imageData['assetType'] ? imageData['assetType'] : "";
        let width = imageData['width'] ? imageData['width'] : "";
        let height = imageData['height'] ? imageData['height'] : "";
        let smartLinkPath = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:url'].value) ? imageData.body.results[0].properties['s.avs:url'].value : "";
        let smartLinkString = (imageData.desc && imageData.desc.toLowerCase() !== "eps media") ? imageData.desc : "{}";
        let smartLinkDesc = smartLinkString !== "{}" ? JSON.parse(smartLinkString) : "";
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
        let altText = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:jsonString'].value && imageData.body.results[0].properties['s.avs:jsonString'].value[0].imageAltText) ? imageData.body.results[0].properties['s.avs:jsonString'].value[0].imageAltText : "";
        let longDescription = (imageData.body && imageData.body.results && imageData.body.results[0] && imageData.body.results[0].properties['s.avs:jsonString'].value && imageData.body.results[0].properties['s.avs:jsonString'].value[0].linkLongDesc) ? imageData.body.results[0].properties['s.avs:jsonString'].value[0].linkLongDesc : "";
        if (smartLinkType) {
            let uniqInterString = imageData && imageData.req && imageData.req.url;
            let uniqueIDInteractive;
            let uniqInter = (uniqInterString) ? uniqInterString.split('s.cmis:objectId = ')[1].replace(/\'/g, '') : "";
            if (uniqInter) {
                uniqueIDInteractive = "urn:pearson:alfresco:" + uniqInter
            }

            if (elementTypeConstant.SMARTLINK_ALFRESCO_TYPES.indexOf(smartLinkType.toLowerCase()) > -1) {
                const { SMARTLINK_ALFRESCO_TYPES, INTERACTIVE_EXTERNAL_LINK } = elementTypeConstant;
                const { interactiveSubtypeConstants: { THIRD_PARTY, EXTERNAL_WEBSITE_LINK, PDF, TABLE, LEGACY_WEB_LINK } } = TcmConstants;
                const ctaSmartLinks = [PDF, EXTERNAL_WEBSITE_LINK, LEGACY_WEB_LINK]
                let interactivetype = THIRD_PARTY;
                switch (smartLinkType.toLowerCase()) {
                    case SMARTLINK_ALFRESCO_TYPES[0]:
                        interactivetype = EXTERNAL_WEBSITE_LINK;
                        break;
                    case SMARTLINK_ALFRESCO_TYPES[1]:
                        interactivetype = PDF;
                        break;
                    case SMARTLINK_ALFRESCO_TYPES[2]:
                        interactivetype = THIRD_PARTY;
                        break;
                    case SMARTLINK_ALFRESCO_TYPES[4]:
                        interactivetype = TABLE;
                        break;
                    case SMARTLINK_ALFRESCO_TYPES[5]:
                        interactivetype = LEGACY_WEB_LINK;
                        break;
                }
                // let posterURL = imageData['posterImageUrl'] || 'https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png';
                if (epsURL == "" || epsURL == undefined) {
                    epsURL = imageData['posterImageUrl'] ? imageData['posterImageUrl'] : INTERACTIVE_FPO;
                }
                let vendorName = imageData['vendorName'];
                let mobileready = imageData['smartlinkoptimizedmobileval'];

                this.setState({ itemID: uniqueIDInteractive, posterImage: epsURL })
                let figuredata = {
                    height: height,
                    width: width,
                    mobileready: mobileready,
                    schema: INTERACTIVE_SCHEMA,
                    interactiveid: uniqueIDInteractive,
                    interactivetype: interactivetype,
                    interactiveformat: INTERACTIVE_EXTERNAL_LINK,
                    vendor: vendorName,
                    posterimage: {
                        "imageid": uniqueIDInteractive,
                        "path": epsURL
                    },
                    "path": smartLinkPath[0]
                }
                if (interactivetype === THIRD_PARTY) {
                    figuredata.alttext = altText
                }
                if (interactivetype === THIRD_PARTY || interactivetype === EXTERNAL_WEBSITE_LINK) {
                    figuredata.longdescription = longDescription
                }
                if (ctaSmartLinks.indexOf(interactivetype) > -1) {
                    let pdfPosterTextDOM = document.getElementById(`cypress-${this.props.index}-2`);
                    let posterText = pdfPosterTextDOM ? pdfPosterTextDOM.innerText : ""
                    figuredata.postertext = {
                        schema: AUTHORED_TEXT_SCHEMA,
                        text: posterText,
                        textsemantics: []
                    }
                }
                this.props.updateFigureData(figuredata, this.props.index, this.props.elementId,()=>{
                    this.props.handleFocus("updateFromC2")
                    this.props.handleBlur()
                })
            }
        }
    }

    handleSiteOptionsDropdown = (alfrescoPath, id) =>{
        let that = this
        let url = 'https://staging.api.pearson.com/content/cmis/uswip-aws/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000';
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'PearsonSSOSession': SSOToken
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                elementId: id
            }
                that.props.alfrescoPopup(payloadObj)
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }

    /**
     * @description Open C2 module with predefined Alfresco location
     * @param {*} locationData alfresco locationData
     */
    handleC2ExtendedClick = (locationData) => {
        let data_1 = locationData;
        let that = this;
        !hasReviewerRole() && c2MediaModule.productLinkOnsaveCallBack(data_1, function (data_2) {
            c2MediaModule.AddanAssetCallBack(data_2, function (data) {
                that.dataFromAlfresco(data);
            })
        })

    }

    /**
     * @description - This function is for accessing c2_assessment library for interactive.
     * @param {event} e
     */
    handleC2MediaClick = (e) => {
        this.props.handleFocus();
        if(hasReviewerRole()){
            return true
        }
        if (e.target.tagName.toLowerCase() === "p") {
            e.stopPropagation();
            return;
        }
        let that = this;
        let alfrescoPath = config.alfrescoMetaData;
        if (alfrescoPath && this.state.projectMetadata) {
            alfrescoPath.alfresco = this.state.projectMetadata.alfresco;
        }
        var data_1 = false;
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
        //if (alfrescoPath.alfresco.nodeRef) {         //if alfresco location is available
             //if(this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco'))    { 
                
            //data_1 = alfrescoPath.alfresco;
            /*
                data according to new project api 
            */
            // data_1['repositoryName'] = data_1['repoName'] ? data_1['repoName'] : data_1['repositoryName']
            // data_1['repositoryFolder'] = data_1['name'] ? data_1['name'] : data_1['repositoryFolder']
            // data_1['repositoryUrl'] = data_1['repoInstance'] ? data_1['repoInstance'] : data_1['repositoryUrl']
            // data_1['visibility'] = data_1['siteVisibility'] ? data_1['siteVisibility'] : data_1['visibility']

            // /*
            //     data according to old core api and c2media
            // */
            // data_1['repoName'] = data_1['repositoryName'] ? data_1['repositoryName'] : data_1['repoName']
            // data_1['name'] = data_1['repositoryFolder'] ? data_1['repositoryFolder'] : data_1['name']
            // data_1['repoInstance'] = data_1['repositoryUrl'] ? data_1['repositoryUrl'] : data_1['repoInstance']
            // data_1['siteVisibility'] = data_1['visibility'] ? data_1['visibility'] : data_1['siteVisibility']

            // this.handleC2ExtendedClick(data_1)
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
                if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    let messageObj = { citeName: alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoPath.alfresco.name  , 
                        citeNodeRef: alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef , 
                        elementId: this.props.elementId }
                        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
             }
            else{
                this.props.accessDenied(true)
            }
        }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
               this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId)
                // c2MediaModule.onLaunchAddAnAsset(function (alfrescoData) {
                //     data_1 = { ...alfrescoData };
                //     let request = {
                //         eTag: alfrescoPath.etag,
                //         projectId: alfrescoPath.id,
                //         ...alfrescoPath,
                //         additionalMetadata: { ...alfrescoData },
                //         alfresco: { ...alfrescoData }
                //     };

                //     /*
                //         preparing data according to Project api
                //     */

                //     request.additionalMetadata['repositoryName'] = data_1['repoName'];
                //     request.additionalMetadata['repositoryFolder'] = data_1['name'];
                //     request.additionalMetadata['repositoryUrl'] = data_1['repoInstance'];
                //     request.additionalMetadata['visibility'] = data_1['siteVisibility'];

                //     request.alfresco['repositoryName'] = data_1['repoName'];
                //     request.alfresco['repositoryFolder'] = data_1['name'];
                //     request.alfresco['repositoryUrl'] = data_1['repoInstance'];
                //     request.alfresco['visibility'] = data_1['siteVisibility'];

                //     that.handleC2ExtendedClick(data_1)
                //     /*
                //         API to set alfresco location on dashboard
                //     */
                //     let url = config.PROJECTAPI_ENDPOINT + '/' + request.projectId + '/alfrescodetails';
                //     let SSOToken = request.ssoToken;
                //     return axios.patch(url, request.alfresco,
                //         {
                //             headers: {
                //                 'Accept': 'application/json',
                //                 'ApiKey': config.STRUCTURE_APIKEY,
                //                 'Content-Type': 'application/json',
                //                 'PearsonSSOSession': SSOToken,
                //                 'If-Match': request.eTag
                //             }
                //         })
                //         .then(function (response) {
                //             let tempData = { alfresco: alfrescoData };
                //             that.setState({
                //                 projectMetadata: tempData
                //             })
                //         })
                //         .catch(function (error) {
                //             console.log("error", error)
                //         });
                // })
            }
            else {
                this.props.accessDenied(true)
            }
        }

    }
    /**------------------------------------------------------------------------------------------*/

    /**---------------- This section consists of CITE/TDX Assets related methods ----------------*/
    /*** @description - This function is to close CITE/TDX PopUp
    */
    closeWindowAssessment = () => {
    this.props.setCurrentCiteTdx({});
    this.props.setCurrentInnerCiteTdx({});
    this.setState({
        showAssessmentPopup: false,
        showSinglePopup:false,
    });
    hideTocBlocker();
    disableHeader(false);
    this.props.showBlocker(false);
    }

    assessmentNavigateBack = () => {
        this.props.setCurrentInnerCiteTdx({});
        if(this.state.openedFrom === "singleAssessment"){
            this.props.setCurrentCiteTdx({});
        }
        this.setState({
            showAssessmentPopup: true,
            showSinglePopup:false,
            openedFrom:''
        });
    }

    resetPage = (isReset, isSearch=false) => {
        this.setState({isReset})
        if(isReset && isSearch){
            this.setState({parentPageNo:1})
        } else if (isReset){
            this.setState({parentPageNo:1})
            this.setState({searchTitle:'', filterUUID:''})
        }
    }
    
    AssessmentSearchTitle = (searchTitle, filterUUID) => {
        this.setState({searchTitle, filterUUID});
    }

    addCiteTdxAssessment = async(citeTdxObj, parentPageNo=1) => {
        showTocBlocker();
        disableHeader(true);
        if(citeTdxObj.slateType === "singleSlateAssessment"){
            this.setState({
                showSinglePopup: true,
                setCurrentAssessment: citeTdxObj,
                showAssessmentPopup:false,
                parentPageNo
            })
        }
        else{
            let itemId = citeTdxObj.singleAssessmentID.versionUrn ? citeTdxObj.singleAssessmentID.versionUrn : "";
            let interactiveData ={};
            let tempInteractiveType = citeTdxObj.singleAssessmentID.taxonomicTypes ?String.prototype.toLowerCase.apply(citeTdxObj.singleAssessmentID.taxonomicTypes).split(","):"cite-interactive-video-with-interactive";
            tempInteractiveType = utils.getTaxonomicType(tempInteractiveType);
            if(tempInteractiveType === 'video-mcq' || tempInteractiveType === 'guided-example'){
               await getMCQGuidedData(itemId).then((responseData) => {
                    if(responseData && responseData['data'] && responseData['data']["thumbnail"]){
                        interactiveData['imageId'] = responseData['data']["thumbnail"]['id'];
                        interactiveData['path'] = responseData['data']["thumbnail"]['src'];
                        interactiveData['alttext'] = responseData['data']["thumbnail"]['alt'];
                    }
                })
            }
            let posterImage = {};
            posterImage['imageid'] = interactiveData['imageId'] ? interactiveData['imageId'] : '';
            posterImage['path'] = interactiveData['path'] ? interactiveData['path'] : '';
            let alttext = interactiveData['alttext'] ? interactiveData['alttext'] : '';
            let that = this;
           
               let figureData = {
                   schema: INTERACTIVE_SCHEMA,
                   interactiveid: citeTdxObj.singleAssessmentID.versionUrn,
                   interactiveparentid:citeTdxObj.id,
                   interactivetitle:citeTdxObj.title,
                   interactivetype: tempInteractiveType,
                   interactiveformat: "mmi"
               }
            if(tempInteractiveType === 'video-mcq' || tempInteractiveType === 'guided-example'){
                figureData.posterimage = posterImage;
                figureData.alttext = alttext;  
                
            }
            that.setState({itemID : itemId,
                imagePath:posterImage.path,
                itemParentID:citeTdxObj.id,
                interactiveTitle:citeTdxObj.title
               })
          
               that.props.updateFigureData(figureData, that.props.index, that.props.elementId,()=>{               
                   that.props.handleFocus("updateFromC2");
                   setTimeout(()=>{
                       that.props.handleBlur()
                   },300)
                  
               })
        }
        
    }
    /**------------------------------------------------------------------------------------------*/

    render() {
        const { model, itemId, index, slateLockInfo } = this.props;
        try {
            return (
                    <>
                        <div className="interactive-element" onClick = {this.handleClickElement}>
                            {this.renderInteractiveType(model, itemId, index, slateLockInfo)}
                            {this.state.showAssessmentPopup? <RootCiteTdxComponent openedFrom = {'singleSlateAssessment'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.elementType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAsseessmentUsageType} parentPageNo={this.state.parentPageNo} resetPage={this.resetPage} isReset={this.state.isReset} AssessmentSearchTitle={this.AssessmentSearchTitle} searchTitle={this.state.searchTitle} filterUUID={this.state.filterUUID} />:""}
                            {this.state.showSinglePopup ? <RootSingleAssessmentComponent setCurrentAssessment ={this.state.setCurrentAssessment} activeAssessmentType={this.state.activeAssessmentType} openedFrom = {'singleSlateAssessmentInner'} closeWindowAssessment = {()=>this.closeWindowAssessment()} assessmentType = {this.state.activeAssessmentType} addCiteTdxFunction = {this.addCiteTdxAssessment} usageTypeMetadata = {this.state.activeAssessmentUsageType} assessmentNavigateBack = {this.assessmentNavigateBack} resetPage={this.resetPage}/>:""}
                        </div>
                        {this.state.showUpdatePopup && this.showCustomPopup()}
                    </>
            )
        } catch (error) {
            return (
                <div className="interactive-element">
                </div>
            )
        } 
    }
}
Interactive.displayName = "Interactive";

Interactive.defaultProps = {
    /** Detail of element in JSON object */
    itemId: ""
}

Interactive.propTypes = {

    /** Handler to attach on element click */
    onClick: PropTypes.func,
    /** Handler to attach on element blur */
    onBlur: PropTypes.func,
    /** Handler to attach on element keyup */
    onKeyup: PropTypes.func,
    /** Handler to attach on element focus */
    onFocus: PropTypes.func,
    /** itemId coming from c2module */
    itemId: PropTypes.string
}
const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx: setCurrentInnerCiteTdx,
    assessmentSorting:assessmentSorting,
    resetElmStore:resetElmStore,
    setNewItemFromElm: setNewItemFromElm,
    fetchAssessmentMetadata: fetchAssessmentMetadata,
    fetchAssessmentVersions: fetchAssessmentVersions,
    updateAssessmentVersion: updateAssessmentVersion,
    setElmPickerData: setElmPickerData,
    alfrescoPopup: alfrescoPopup,
    saveSelectedAssetData: saveSelectedAssetData
}

const mapStateToProps = (state) => {
    return {
        assessmentReducer: state.assessmentReducer,
        alfrescoAssetData: state.alfrescoReducer.alfrescoAssetData,
        alfrescoElementId : state.alfrescoReducer.elementId,
        alfrescoListOption: state.alfrescoReducer.alfrescoListOption
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(Interactive);