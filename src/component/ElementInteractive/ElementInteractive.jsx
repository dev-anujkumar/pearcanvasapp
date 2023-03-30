/**
* Root Component of Interactive Element Component.
*/

import React from 'react';
import PropTypes from 'prop-types'
import './../../styles/ElementInteractive/ElementInteractive.css';
import FigureUserInterface from '../ElementFigure/FigureUserInterface.jsx';
import { showTocBlocker,hideTocBlocker, disableHeader, hideToc } from '../../js/toggleLoader'
import config from '../../config/config';
import { utils } from '../../js/utils';
import axios from 'axios';
import { hasReviewerRole, getLabelNumberTitleHTML } from '../../constants/utility.js';
import RootCiteTdxComponent from '../AssessmentSlateCanvas/assessmentCiteTdx/RootCiteTdxComponent.jsx';
import RootSingleAssessmentComponent from '../AssessmentSlateCanvas/singleAssessmentCiteTdx/RootSingleAssessmentComponent.jsx'
import  {setCurrentCiteTdx, setCurrentInnerCiteTdx, getMCQGuidedData, assessmentSorting}  from '../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { connect } from 'react-redux';
import { sendDataToIframe, getCookieByName } from './../../constants/utility.js';
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
import {alfrescoPopup, saveSelectedAssetData, saveSelectedAlfrescoElement} from '../AlfrescoPopup/Alfresco_Action';
import { handleAlfrescoSiteUrl, getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper';
import { updateSmartLinkDataForCompare, updateAutoNumberingDropdownForCompare } from '../ElementContainer/ElementContainer_Actions';
import { DELETE_DIALOG_TEXT } from '../SlateWrapper/SlateWrapperConstants';
import { setAutoNumberSettingValue } from '../FigureHeader/AutoNumber_helperFunctions';

/**
* @description - Interactive is a class based component. It is defined simply
* to make a skeleton of the Interactive Element.
*/
const SMARTLINK_CONTEXTS = ['3rd-party', 'pdf', 'web-link', 'pop-up-web-link', 'table'];
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
            showUpdatePopup:false,
            alfrescoSite: '',
            alfrescoSiteData: {},
            deleteAssetPopup: false
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
        getAlfrescositeResponse(this.props.elementId, (response) => {
            this.setState({
                alfrescoSite: response.repositoryFolder ? response.repositoryFolder : response.title,
                alfrescoSiteData: { ...response }
            })
        })
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

    componentDidUpdate(prevProps) {
        const { assessmentReducer, model, elementId, alfrescoElementId, alfrescoAssetData, launchAlfrescoPopup } = this.props;
        const { itemID, interactiveTitle } = this.state;
        const isElmInteractive = model?.figuredata?.interactiveformat === ELM_INT ? true : false
        if (!config.savingInProgress && !config.isSavingElement && (isElmInteractive) && assessmentReducer) {
            const { dataFromElm } = assessmentReducer;
            if (assessmentReducer.dataFromElm && dataFromElm.resourceType == Resource_Type.INTERACTIVE && dataFromElm.elementUrn === this.props.model?.id) {
                if (dataFromElm?.type == ELM_CREATE_IN_PLACE && dataFromElm.elmUrl) {
                    window.open(dataFromElm.elmUrl);
                    handlePostMsgOnAddAssess(this.addElmInteractive, dataFromElm.usageType, Resource_Type.INTERACTIVE, 'add', 'fromCreate');
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
        if (elementId === alfrescoElementId && prevProps.alfrescoElementId !== alfrescoElementId && !launchAlfrescoPopup) {
            this.dataFromAlfresco(alfrescoAssetData)   
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
                status={false}
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
    closeUpdatePopup = (toggleValue,event) => {
        if (event) {
            event.preventDefault();
        }
        this.setState({
            showUpdatePopup: toggleValue
        })
        hideTocBlocker();
        disableHeader(false);
        this.props.showBlocker(false);
    }
    /*** @description - This function is to disable all components when update Popups are open in window */
    showCanvasBlocker = (value) => {
        if (value === true) {
            showTocBlocker();
            hideToc();
        } else {
            hideTocBlocker();
            disableHeader(false);
        }
        disableHeader(value);
        this.props.showBlocker(value);
    }
      /*** @description This function is used to render Version update Popup */
    showCustomPopup = () => {
        this.showCanvasBlocker(true);
        this.props.showBlocker(true);
        return (
            <PopUp
                dialogText={ELM_UPDATE_MSG}
                active={true}
                togglePopup={this.closeUpdatePopup}
                isElmUpdatePopup={true}
                updateElmAssessment={this.updateElmAssessment}
                isInputDisabled={true}
                isElmUpdateClass="elm-update"
                elmHeaderText={ELM_UPDATE_POPUP_HEAD}
            />
        )
    }
    updateElmAssessment = async (event) => {
        const { INTERACTIVE_TYPES : { VIDEO_MCQ, GUIDED_EXAMPLE}} = elementTypeConstant;
        const thumbnailTypes = [ VIDEO_MCQ, GUIDED_EXAMPLE ];
        let thumbnailImage="";
        this.closeUpdatePopup(false, event);
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
            const thumbnailData = await this.getVideoMCQandGuidedThumbnail(figureData.interactiveid);
            figureData.posterimage = thumbnailData?.posterImage;
            figureData.alttext = thumbnailData?.alttext;
            thumbnailImage = thumbnailData?.posterImage?.path;
        this.setState({
            itemID: figureData.interactiveid,
            interactiveTitle: figureData.interactivetitle,
            elementType: interactivetype,
            imagePath: thumbnailImage
        }, () => {
            this.props.fetchAssessmentMetadata("interactive", "",
                 { targetId: figureData.interactiveid }
            );
        })     
        this.props.updateFigureData(figureData, this.props.index, this.props.elementId, this.props.asideData, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
        disableHeader(false);
        hideTocBlocker(false);
    }

    deleteElementAsset = () => {
        const dropdownVal = setAutoNumberSettingValue(this.props?.model)
        this.props?.updateAutoNumberingDropdownForCompare({entityUrn: this.props?.model?.contentUrn, option: dropdownVal});
        const element = this.props.model;
        this.props.handleFocus();
        if (hasReviewerRole()) {
            return true
        }
        this.toggleDeletePopup(false)
        this.props.updateSmartLinkDataForCompare(element.figuredata);
        let setFigureData = {
            "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/interactive",
            "interactiveid": "",
            "interactivetype": element.figuredata.interactivetype,
            "interactiveformat": element.figuredata.interactiveformat
        }

        this.props.updateFigureData(setFigureData, this.props.index, this.props.elementId, this.props.asideData, () => {
            this.props.handleFocus("updateFromC2");
            this.props.handleBlur();
        })
        
    }
    
        /**
         * @description This function is used to toggle delete popup
         * @param {*} toggleValue Boolean value
         * @param {*} event event object
         */
         toggleDeletePopup = (toggleValue, event) => {
            if (event) {
                event.preventDefault();
            }
            this.setState({
                deleteAssetPopup: toggleValue
            })
            this.showCanvasBlocker(toggleValue);
        }
    
        /*** @description This function is used to render delete Popup */
        showDeleteAssetPopup = () => {
            const disableDeleteWarnings = getCookieByName("DISABLE_DELETE_WARNINGS");
            if (this.state.deleteAssetPopup && !disableDeleteWarnings) {
                this.showCanvasBlocker(true)
                return (
                    <PopUp
                        dialogText={DELETE_DIALOG_TEXT}
                        active={true}
                        togglePopup={this.toggleDeletePopup}
                        isDeleteAssetPopup={true}
                        deleteAssetHandler={this.deleteElementAsset}
                        isInputDisabled={true}
                        isDeleteAssetClass="delete-element-text"
                    />
                )
            } else if (this.state.deleteAssetPopup && disableDeleteWarnings) {
                this.deleteElementAsset()
                return null
            }
            else {
                return null
            }
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
      
        let figureHtmlData = getLabelNumberTitleHTML(element);

            return <FigureUserInterface model={this.props.model} interactiveformat={this.props.model.figuredata.interactiveformat} deleteElementAsset={this.toggleDeletePopup} alfrescoSite={this.state.alfrescoSite} alfrescoElementId={this.props.alfrescoElementId} alfrescoAssetData={this.props.alfrescoAssetData} launchAlfrescoPopup={this.props.launchAlfrescoPopup} handleC2MediaClick={(e) => this.togglePopup(e, true)} permissions={this.props.permissions} openGlossaryFootnotePopUp={this.props.openGlossaryFootnotePopUp} element={this.props.model} handleFocus={this.props.handleFocus} handleBlur = {this.props.handleBlur} index={index}  slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} elementId={this.props.elementId} id={this.props.id}  handleAudioPopupLocation = {this.props.handleAudioPopupLocation} handleAssetsPopupLocation={this.props.handleAssetsPopupLocation} updateElm={() => this.updateElm()}/>
    }

    /**
     * @description - This purpose of this function is for only handling the focus of container w.r.t interactive .
     * @param {event} event
     */
    handleClickElement = (event) => {
        event.stopPropagation();
        this.props.handleFocus();
    }

    /**
     * @description - This function is for toggling the c2 media uuid popup.
     * @param {event} value
     */
    togglePopup = (e,value)=>{
        this.props.handleFocus();
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
                    elementUrn: this.props.model.id,
                    parentMatter: config.parentOfParentItem    // sending parent matter details to elm
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
    addElmInteractive = async (pufObj, cb) => {
        const { INTERACTIVE_TYPES : { VIDEO_MCQ, GUIDED_EXAMPLE}} = elementTypeConstant;
        const thumbnailTypes = [ VIDEO_MCQ, GUIDED_EXAMPLE ];
        let thumbnailImage="";
        if(pufObj.elementUrn === this.props.elementId){
            showTocBlocker();
            disableHeader(true);

            let figureData = {
                schema: INTERACTIVE_SCHEMA,
                interactiveid: pufObj.id,
                interactivetype: pufObj.interactiveType,
                interactivetitle: pufObj.title,
                interactiveformat: ELM_INT
            }
            const interactiveType = pufObj.interactiveType ?? this.props?.model?.figuredata?.interactivetype;
                const thumbnailData = await this.getVideoMCQandGuidedThumbnail(pufObj.id);
                figureData.posterimage = thumbnailData?.posterImage;
                figureData.alttext = thumbnailData?.alttext;
                thumbnailImage = thumbnailData?.posterImage?.path;
            this.setState({
                itemID: pufObj.id,
                interactiveTitle: pufObj.title,
                elementType: pufObj.interactiveType,
                imagePath: thumbnailImage
            }, () => {
                this.props.fetchAssessmentMetadata("interactive", "",{ targetId: pufObj.id });
            })
            this.props.updateFigureData(figureData, this.props.index, this.props.elementId, this.props.asideData, () => {
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
    }

    /*** @description - This function is to update ELM Assessment on Save Event from ELM Portal */
    updateElmOnSaveEvent = (props) => {
        let pufObj = {
            id: this.state.itemID,
            title: props.assessmentReducer[this.state.itemID].assessmentTitle,
            interactiveType: props?.model?.figuredata?.interactivetype ?? this.state.elementType,
            elementUrn: props.model.id
        }
        this.addElmInteractive(pufObj, () => {
            hideTocBlocker();
            disableHeader(false);
        });
        if (props?.assessmentReducer?.item?.calledFrom === 'createElm') {
            this.props.setNewItemFromElm({});
        }
    }

    /**
     * Method to fetch thumbnail images for Video-MCQ & Guided-Example
     * @param {*} elementInteractiveType 
     * @returns 
     */
    getVideoMCQandGuidedThumbnail = async (assetId) => {
        let interactiveData ={};
        await getMCQGuidedData(assetId).then((resData) => {
            if (resData?.data?.thumbnail?.src) {
                interactiveData['imageId'] = resData['data']["thumbnail"]['id'];
                interactiveData['path'] = resData['data']["thumbnail"]['src'];
                interactiveData['alttext'] = resData['data']["thumbnail"]['alt'];
            }
        })
        let posterImage = {};
        posterImage['imageid'] = interactiveData['imageId'] ?? '';
        posterImage['path'] = interactiveData['path'] ?? '';
        const alttext = interactiveData['alttext'] ?? '';
        return {
            posterImage,
            alttext
        }
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
        let epsURL = imageData.epsUrl ? imageData.epsUrl : imageData?.['institution-urls'] && imageData?.['institution-urls'][0]?.publicationUrl ? imageData?.['institution-urls'][0]?.publicationUrl : "";
        let width = imageData.properties["exif:pixelXDimension"] ? imageData.properties["exif:pixelXDimension"] : "";
        let height = imageData.properties["exif:pixelYDimension"] ? imageData.properties["exif:pixelYDimension"] : "";
        let smartLinkPath = imageData.properties["avs:url"] ? imageData.properties["avs:url"] : "";
        let smartLinkString = (imageData.properties["cm:description"] && imageData.properties["cm:description"].toLowerCase() !== "eps media") ? imageData.properties["cm:description"] : "{}";
        let isSmartLinkAsset = smartLinkString !== "{}" && (smartLinkString.includes("smartLinkType") || !(imageData.hasOwnProperty('content'))) ? true :  false
        let smartlinkAvsString = (isSmartLinkAsset === true) ? smartLinkString : {}
        let smartLinkDesc = (typeof smartlinkAvsString === 'string')? JSON.parse(smartlinkAvsString) : smartlinkAvsString;
        let smartLinkType = smartLinkDesc !== "" ? smartLinkDesc.smartLinkType : "";
        const avsJsonStringData = imageData?.properties["avs:jsonString"] 
        let avsStringData = avsJsonStringData && (typeof avsJsonStringData === 'string') ? JSON.parse(avsJsonStringData) : avsJsonStringData;
        let altText = avsStringData?.imageAltText ? avsStringData.imageAltText : "";
        let longDescription = avsStringData?.linkLongDesc ? avsStringData.linkLongDesc : "";
        let smartLinkTitle = imageData?.name ? imageData.name : "";
        if (avsStringData?.width) width = avsStringData?.width;
        if (avsStringData?.height) height = avsStringData?.height;
        if (smartLinkType) {
            let uniqueIDInteractive;
            let uniqInter = imageData.id
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
                if (epsURL == "" || epsURL == undefined) {
                    epsURL = avsStringData.imageReferenceURL ? avsStringData.imageReferenceURL : INTERACTIVE_FPO;
                }
                let vendorName = avsStringData?.smartLinkThirdPartyVendorVal;
                let mobileready = avsStringData?.smartLinkOptimizedMobileVal === "yes" ? true : false;

                this.setState({ itemID: uniqueIDInteractive, posterImage: epsURL, interactivetitle: smartLinkTitle })
                let figuredata = {
                    height: height,
                    width: width,
                    mobileready: mobileready,
                    schema: INTERACTIVE_SCHEMA,
                    interactiveid: uniqueIDInteractive,
                    interactivetype: interactivetype,
                    interactiveformat: INTERACTIVE_EXTERNAL_LINK,
                    interactivetitle: smartLinkTitle,
                    vendor: vendorName,
                    posterimage: {
                        "imageid": uniqueIDInteractive,
                        "path": epsURL
                    },
                    "path": smartLinkPath
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
                /**let payloadObj = {
                    asset: {}, 
                    id: ''
                }
                this.props.saveSelectedAssetData(payloadObj) */
                this.props.updateFigureData(figuredata, this.props.index, this.props.elementId, this.props.asideData,()=>{
                    this.props.handleFocus("updateFromC2")
                    this.props.handleBlur()
                })
            let alfrescoData = config?.alfrescoMetaData?.alfresco;
            let alfrescoSiteLocation = this.state.alfrescoSiteData;
            if(this.props.isCiteChanged){
                let changeSiteAlfrescoData={
                    currentAsset: {},
                    nodeRef: this.props.changedSiteData.guid,
                    repositoryFolder: this.props.changedSiteData.title,
                    siteId: this.props.changedSiteData.id,
                    visibility: this.props.changedSiteData.visibility
                }
                handleAlfrescoSiteUrl(this.props.elementId, changeSiteAlfrescoData)
                this.setState({
                    alfrescoSite: changeSiteAlfrescoData?.repositoryFolder,
                    alfrescoSiteData:changeSiteAlfrescoData
                })
            }else{
                if((!alfrescoSiteLocation?.nodeRef) || (alfrescoSiteLocation?.nodeRef === '')){
                    handleAlfrescoSiteUrl(this.props.elementId, alfrescoData)
                    this.updateAlfrescoSiteUrl()
                }
            }
            }
        }
        const payloadObj = {
            asset: {}, 
            id: ''
        }
        this.props.saveSelectedAssetData(payloadObj)
    }

    updateAlfrescoSiteUrl = () => {
        let repositoryData = this.state.alfrescoSiteData
        if (repositoryData?.repositoryFolder || repositoryData?.title ) {
            this.setState({
                alfrescoSite: repositoryData?.repositoryFolder || repositoryData?.title
            })
        } else {
            this.setState({
                alfrescoSite: config.alfrescoMetaData?.alfresco?.repositoryFolder || config.alfrescoMetaData?.alfresco?.title
            })
        }
    }

    handleSiteOptionsDropdown = (alfrescoPath, id, currentAsset) =>{
        let that = this
        let url = `${config.ALFRESCO_EDIT_METADATA}/alfresco-proxy/api/-default-/public/alfresco/versions/1/people/-me-/sites?maxItems=1000`;
        let SSOToken = config.ssoToken;
        return axios.get(url,
            {
                headers: {
                    'Accept': 'application/json',
                    'ApiKey': config.CMDS_APIKEY,
                    'Content-Type': 'application/json',
                    'myCloudProxySession': config.myCloudProxySession
                }
            })
            .then(function (response) {
               let payloadObj = {launchAlfrescoPopup: true, 
                alfrescoPath: alfrescoPath, 
                alfrescoListOption: response.data.list.entries,
                elementId: id,
                currentAsset
            }
                that.props.alfrescoPopup(payloadObj)
            })
            .catch(function (error) {
                console.log("Error IN SITE API", error)
            });
    }
    /**
     * @description - This function is for accessing c2_assessment library for interactive.
     * @param {event} e
     */
    handleC2MediaClick = (e) => {
        const dropdownVal = setAutoNumberSettingValue(this.props?.model);
        this.props?.updateAutoNumberingDropdownForCompare({entityUrn: this.props?.model?.contentUrn, option: dropdownVal});
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
        const figureData = this.props.model.figuredata;
        let currentAsset = {};

        if (figureData) {
            const id = figureData.interactiveid;
            const type = figureData.interactivetype === 'pdf'? "smartlink:pdf" : figureData.interactivetype;
            currentAsset =  {
                id: id ? id.split(':').pop() : '', // get last
                type,
            };
        }
        var data_1 = false;
        if(alfrescoPath && alfrescoPath.alfresco && Object.keys(alfrescoPath.alfresco).length > 0 ) {
            if (alfrescoPath?.alfresco?.guid || alfrescoPath?.alfresco?.nodeRef ) {         //if alfresco location is available
                if (this.props.permissions && this.props.permissions.includes('add_multimedia_via_alfresco')) {
                    const alfrescoSiteName = alfrescoPath?.alfresco?.name ? alfrescoPath.alfresco.name : alfrescoPath.alfresco.repositoryFolder
                    const alfrescoSite = alfrescoPath?.alfresco?.title ? alfrescoPath.alfresco.title : alfrescoSiteName
                    const citeName = alfrescoSite?.split('/')?.[0] || alfrescoSite
                    const citeNodeRef = alfrescoPath?.alfresco?.guid ? alfrescoPath.alfresco.guid : alfrescoPath.alfresco.nodeRef
                    let messageObj = { appName:'cypress',citeName: citeName, 
                        citeNodeRef: citeNodeRef, 
                        elementId: this.props.elementId,
                        currentAsset
                     }
                        sendDataToIframe({ 'type': 'launchAlfrescoPicker', 'message': messageObj })
                        const messageDataToSaveSmartlink = {
                            id: this.props.elementId,
                            editor: undefined,
                            citeNodeRef: citeNodeRef
                        }
                        this.props.saveSelectedAlfrescoElement(messageDataToSaveSmartlink);
             }
            else{
                this.props.accessDenied(true)
            }
        }
        } else {
            if (this.props.permissions.includes('alfresco_crud_access')) {
               this.handleSiteOptionsDropdown(alfrescoPath, this.props.elementId, currentAsset);
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
            let tempInteractiveType = citeTdxObj.singleAssessmentID.taxonomicTypes ?String.prototype.toLowerCase.apply(citeTdxObj.singleAssessmentID.taxonomicTypes).split(","):"";
            tempInteractiveType = tempInteractiveType ? utils.getTaxonomicType(tempInteractiveType) : this.state.elementType;
               await getMCQGuidedData(itemId).then((responseData) => {
                    if(responseData && responseData['data'] && responseData['data']["thumbnail"]){
                        interactiveData['imageId'] = responseData['data']["thumbnail"]['id'];
                        interactiveData['path'] = responseData['data']["thumbnail"]['src'];
                        interactiveData['alttext'] = responseData['data']["thumbnail"]['alt'];
                        interactiveData['title'] = responseData['data']["title"];
                    }
                })
            // }
            let posterImage = {};
            posterImage['imageid'] = interactiveData['imageId'] ? interactiveData['imageId'] : '';
            posterImage['path'] = interactiveData['path'] ? interactiveData['path'] : '';
            let alttext = interactiveData['alttext'] ? interactiveData['alttext'] : '';
            let that = this;
           
               let figureData = {
                   schema: INTERACTIVE_SCHEMA,
                   interactiveid: citeTdxObj.singleAssessmentID.versionUrn,
                   interactiveparentid:citeTdxObj.id,
                   interactivetitle: interactiveData['title'] || citeTdxObj.title,
                   interactivetype: tempInteractiveType,
                   interactiveformat: "mmi"
               }
                figureData.posterimage = posterImage;
                figureData.alttext = alttext;  
            that.setState({itemID : itemId,
                imagePath:posterImage.path,
                itemParentID:citeTdxObj.id,
                interactiveTitle:citeTdxObj.title
               })
          
               that.props.updateFigureData(figureData, that.props.index, that.props.elementId, this.props.asideData, ()=>{               
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
        const isReviewer = hasReviewerRole() ? "pointer-events-none" : "";
        try {
            return (
                    <>
                        <div className={SMARTLINK_CONTEXTS.includes(model?.figuredata?.interactivetype) ? `figureElement ${isReviewer}` : `interactive-element ${isReviewer}`} onClick = {this.handleClickElement}>
                            {this.state.deleteAssetPopup && this.showDeleteAssetPopup()}
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
const mapActionToProps = (dispatch) => {
    return {
        setCurrentCiteTdx: (currentAssessmentSelected, openedFrom) => {
            dispatch(setCurrentCiteTdx(currentAssessmentSelected, openedFrom))
        },
        setCurrentInnerCiteTdx: (currentAssessmentSelected, openedFrom) => {
            dispatch(setCurrentInnerCiteTdx(currentAssessmentSelected, openedFrom))
        },
        assessmentSorting: (sortBy,sortOrder) => {
            dispatch(assessmentSorting(sortBy,sortOrder))
        },
        setNewItemFromElm: (payloadObj) => {
            dispatch(setNewItemFromElm(payloadObj))
        },
        fetchAssessmentMetadata: (type, calledFrom, assessmentData, assessmentItemData) => {
            dispatch(fetchAssessmentMetadata(type, calledFrom, assessmentData, assessmentItemData))
        },
        fetchAssessmentVersions: (entityUrn, type, createdDate, assessmentData, assessmentItemData) => {
            dispatch(fetchAssessmentVersions(entityUrn, type, createdDate, assessmentData, assessmentItemData))
        },
        updateAssessmentVersion: updateAssessmentVersion,
        setElmPickerData: (payloadObj) => {
            dispatch(setElmPickerData(payloadObj))
        },
        alfrescoPopup: (payloadObj) => {
            dispatch(alfrescoPopup(payloadObj))
        },
        saveSelectedAssetData: (payloadObj) => {
            dispatch(saveSelectedAssetData(payloadObj))
        },
        updateSmartLinkDataForCompare: (oldSmartLinkData) => {
            dispatch(updateSmartLinkDataForCompare(oldSmartLinkData))
        },
        saveSelectedAlfrescoElement: (payloadObj) => {
            dispatch(saveSelectedAlfrescoElement(payloadObj))
        },
        updateAutoNumberingDropdownForCompare: (value) => {
            dispatch(updateAutoNumberingDropdownForCompare(value))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        assessmentReducer: state.assessmentReducer,
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
)(Interactive);