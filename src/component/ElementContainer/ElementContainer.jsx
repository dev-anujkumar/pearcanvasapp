import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes, { element } from 'prop-types';
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import FigureImage from './../ElementFigure/FigureImage.jsx'
import ElementInteractive from '../ElementInteractive';
import ElementAsideContainer from '../ElementAsideContainer';
import ElementMetaDataAnchor from '../ElementMetaDataAnchor';
import ElementMetaLOList from '../ElementMetaLOList';
import ElementLearningObjectiveItem from '../ElementLearningObjectiveItem';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import { glossaaryFootnotePopup } from './../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import {markedIndexPopup } from './../MarkIndexPopup/MarkIndex_Action'
import { addComment, deleteElement, updateElement, createShowHideElement, deleteShowHideUnit, getElementStatus, updateMultipleColumnData, storeOldAssetForTCM, updateAsideNumber } from './ElementContainer_Actions';
import { deleteElementAction } from './ElementDeleteActions.js';
import './../../styles/ElementContainer/ElementContainer.css';
import { fetchCommentByElement, getProjectUsers } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import { setActiveElement, fetchElementTag, openPopupSlate, createPoetryUnit } from './../CanvasWrapper/CanvasWrapper_Actions';
import { COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS, MULTI_COLUMN_3C, MULTI_COLUMN_2C, OWNERS_ELM_DELETE_DIALOG_TEXT, AUDIO, VIDEO, IMAGE, INTERACTIVE, labelHtmlData } from './../../constants/Element_Constants';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import { sendDataToIframe, hasReviewerRole, matchHTMLwithRegex, encodeHTMLInWiris, createTitleSubtitleModel, removeBlankTags, removeUnoClass, getShowhideChildUrns, createLabelNumberTitleModel, isSubscriberRole, isOwnerRole, removeSpellCheckDOMAttributes } from '../../constants/utility.js';
import { ShowLoader, CanvasActiveElement, AddOrViewComment } from '../../constants/IFrameMessageTypes.js';
import ListElement from '../ListElement';
import config from '../../config/config';
import AssessmentSlateCanvas from './../AssessmentSlateCanvas';
import PageNumberContext from '../CanvasWrapper/PageNumberContext.js';
import { authorAssetPopOver } from '../AssetPopover/openApoFunction.js';
import { LABELS } from './ElementConstants.js';
import { updateFigureData } from './ElementContainer_Actions.js';
import { createUpdatedData, createOpenerElementData, handleBlankLineDom, updateAutoNumberedElement } from './UpdateElements.js';
import ElementPopup from '../ElementPopup'
import { updatePageNumber, accessDenied } from '../SlateWrapper/SlateWrapper_Actions';
import { releaseSlateLock } from '../CanvasWrapper/SlateLock_Actions.js';
import ElementContainerContext from './ElementContainerContext'
import { CitationGroupContext } from './ElementCitationContext'
import CitationGroup from '../CitationGroup'
import CitationElement from '../CitationElement'
import ElementPoetry from '../ElementPoetry';
import ElementPoetryStanza from '../ElementPoetry/ElementPoetryStanza.jsx';
import MultiColumnContext from "./MultiColumnContext.js"
import MultiColumnContainer from "../MultiColumnElement"
import MultipleColumnContainer from "../MultipleColumnElement/MultipleColumnContainer.jsx";
import { handleTCMData } from '../TcmSnapshots/TcmSnapshot_Actions.js';
import CutCopyDialog from '../CutCopyDialog';
import { OnCopyContext } from '../CutCopyDialog/copyUtil.js'
import { setSelection } from '../CutCopyDialog/CopyUrn_Action.js';
import { openElmAssessmentPortal, fetchAssessmentMetadata, resetAssessmentStore, editElmAssessmentId } from '../AssessmentSlateCanvas/AssessmentActions/assessmentActions.js';
import { handleElmPortalEvents, handlePostMsgOnAddAssess } from '../ElementContainer/AssessmentEventHandling.js';
import { checkFullElmAssessment, checkEmbeddedElmAssessment, checkInteractive, checkFigureMetadata } from '../AssessmentSlateCanvas/AssessmentActions/assessmentUtility.js';
import { setScroll } from './../Toolbar/Search/Search_Action.js';
import { SET_SEARCH_URN, SET_COMMENT_SEARCH_URN } from './../../constants/Search_Constants.js';
import { ELEMENT_ASSESSMENT, PRIMARY_SINGLE_ASSESSMENT, SECONDARY_SINGLE_ASSESSMENT, PRIMARY_SLATE_ASSESSMENT, SECONDARY_SLATE_ASSESSMENT, SLATE_TYPE_PDF, SLATE_TYPE_ASSESSMENT, ELEMENT_FIGURE } from '../AssessmentSlateCanvas/AssessmentSlateConstants.js';
import elementTypes from './../Sidebar/elementTypes.js';
import {enableAsideNumbering} from './../Sidebar/Sidebar_Action';
import OpenAudioBook from '../AudioNarration/OpenAudioBook.jsx';
import { getAlfrescositeResponse } from '../ElementFigure/AlfrescoSiteUrl_helper.js'
import ElementDialogue from '../ElementDialogue';
import ElementDiscussion from '../ElementDiscussion';
import PdfSlate from '../PdfSlate/PdfSlate.jsx';
import MetaDataPopUp from '../ElementFigure/MetaDataPopUp.jsx';
import { closeTcmPopup, handleTCM } from '../CanvasWrapper/TCM_Canvas_Popup_Integrations'
import OpenGlossaryAssets from '../ElementFigure/OpenGlossaryAssets.jsx';
import ShowHide from '../ShowHide/ShowHide.jsx';
import { loadTrackChanges } from '../CanvasWrapper/TCM_Integration_Actions'
import TcmConstants from '../TcmSnapshots/TcmConstants.js';
import BlockListWrapper from '../BlockListComponent/BlockListWrapper.jsx';
import {prepareCommentsManagerIcon} from './CommentsManagrIconPrepareOnPaste.js'
import * as slateWrapperConstants from "../SlateWrapper/SlateWrapperConstants"
import { getOverridedNumberValue, getContainerEntityUrn, getNumberData, updateAutonumberingOnElementTypeUpdate, updateAutonumberingKeysInStore, setAutonumberingValuesForPayload, updateAutonumberingOnOverridedCase, validateLabelNumberSetting, generateDropdownDataForFigures } from '../FigureHeader/AutoNumber_helperFunctions';
import { updateAutoNumberSequenceOnDelete } from '../FigureHeader/AutoNumber_DeleteAndSwap_helpers';
import { handleAutonumberingOnCreate } from '../FigureHeader/AutoNumberCreate_helper';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES } from '../FigureHeader/AutoNumberConstants';
import {INCOMING_MESSAGE,REFRESH_MESSAGE} from '../../constants/IFrameMessageTypes'

const {
    AUTO_NUMBER_SETTING_DEFAULT,
    AUTO_NUMBER_SETTING_REMOVE_NUMBER
} = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
class ElementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: false,
            comment: "",
            borderToggle: 'showBorder',
            btnClassName: '',
            showDeleteElemPopup: false,
            ElementId: this.props.index == 0 ? this.props.element.id : '',
            showColorPaletteList: false,
            showColorTextList: false,
            activeColorIndex: this.props.element?.backgroundcolor ? config.colors.indexOf(this.props.element.backgroundcolor) : 0,
            activeTextColorIndex: this.props.element?.textcolor ? config.textcolors.indexOf(this.props.element.textcolor) : 0,
            isHovered: false,
            hasError: false,
            sectionBreak: null,
            audioPopupStatus: false,
            position: {},
            editInteractiveId: "",
            isfigurePopup: false,
            figureUrl: "",
            assetsPopupStatus: false,
            isActive: false,
            showBlockCodeElemPopup: false
        };


    }

    getElementVersionStatus = (element, elementStatus) => {
        if (element && element?.id && element.id.match(/work/g) && elementStatus && !elementStatus.hasOwnProperty(element.id)) {
            // call element status API
            this.props.getElementStatus(element.id, this.props.index)
        }
        else if (element && element.type === "popup") {
            if (element.popupdata.hasOwnProperty("formatted-title")) {
                !elementStatus[element.popupdata["formatted-title"].id] && this.props.getElementStatus(element.popupdata["formatted-title"].id, this.props.index)
            }
            if (element.popupdata.hasOwnProperty("formatted-subtitle")) {
                !elementStatus[element.popupdata["formatted-subtitle"].id] && this.props.getElementStatus(element.popupdata["formatted-subtitle"].id, this.props.index)
            }
            if (element.popupdata.hasOwnProperty("postertextobject")) {
                !elementStatus[element.popupdata["postertextobject"][0].id] && this.props.getElementStatus(element.popupdata["postertextobject"][0].id, this.props.index)
            }
        }
        else if (element && (element.type === "poetry" || element.type === "citations")) {
            if (element.contents && element.contents.hasOwnProperty("formatted-title")) {
                !elementStatus[element.contents["formatted-title"].id] && this.props.getElementStatus(element.contents["formatted-title"].id, this.props.index)
            }
            if (element.contents && element.contents.hasOwnProperty("creditsarray")) {
                !elementStatus[element.contents["creditsarray"][0].id] && this.props.getElementStatus(element.contents["creditsarray"][0].id, this.props.index)
            }
        }
    }

    componentDidMount() {
        this.getElementVersionStatus(this.props.element, config.elementStatus)
        this.setState({
            ElementId: this.props.element.id,
            btnClassName: '',
            isOpener: this.props.element.type === elementTypeConstant.OPENER
        })
        /** Updating Embedded Assessments - Elm(PCAT-8907) & Learnosity(PCAT-9590) */
        let { element } = this.props
        let embeddedAssessment = checkEmbeddedElmAssessment(element);
        if (this.props.element && embeddedAssessment === true) {
            const assessmentID = element.figuredata.elementdata.assessmentid;
            const assessmentItemID = element.figuredata.elementdata.assessmentitemid;
            const itemData = {
                itemId: assessmentItemID,
                parentId: assessmentID,
                targetItemid: assessmentItemID
            }
            this.props.fetchAssessmentMetadata('assessment', 'fromElementContainer', { targetId: assessmentID }, itemData);
        }
        const elmInteractiveElem = checkInteractive(element)
        if (element && elmInteractiveElem === true) {
            const interactiveData = {
                targetId: element?.figuredata?.interactiveid
            }
            this.props.fetchAssessmentMetadata('interactive', 'fromElementContainer', interactiveData);
        }
        if(element?.type === 'element-aside'){
            const showAsideTitle =  element?.html?.title && (element.html.title !== "<p class='paragraphNumeroUno'></p>" && element.html.title !== "<p></p>") ? true : false
            this.props.enableAsideNumbering(showAsideTitle,element.id)
        }
        document.addEventListener('click', () => {
            this.setState({ showCopyPopup: false })
        });
    }

    componentDidUpdate() {
        let divObj = 0;
        if (this.props.searchParent !== '' && document.querySelector(`div[data-id="${this.props.searchParent}"]`)) {
            divObj = document.querySelector(`div[data-id="${this.props.searchParent}"]`).offsetTop;
            if (this.props.searchUrn !== '' && document.querySelector(`div[data-id="${this.props.searchUrn}"]`) && this.props.searchUrn !== this.props.searchParent) {
                divObj += document.querySelector(`div[data-id="${this.props.searchUrn}"]`).offsetTop;
            }

            divObj = Math.round(divObj);
            if (this.props.searchScrollTop !== divObj) {
                this.props.setScroll({ 'type': SET_SEARCH_URN, scrollTop: divObj });
                const slatewrapperNode = document.getElementById('slateWrapper')
                if (slatewrapperNode) {
                    slatewrapperNode.scrollTop = divObj;
                }
            }
        }

        if (this.props.commentSearchParent !== '' && document.querySelector(`div[data-id="${this.props.commentSearchParent}"]`)) {
            divObj = document.querySelector(`div[data-id="${this.props.commentSearchParent}"]`).offsetTop;
            if (this.props.commentSearchUrn !== '' && document.querySelector(`div[data-id="${this.props.commentSearchUrn}"]`) && this.props.commentSearchUrn !== this.props.commentSearchParent) {
                divObj += document.querySelector(`div[data-id="${this.props.commentSearchUrn}"]`).offsetTop;
            }

            divObj = Math.round(divObj);
            if (this.props.commentSearchScrollTop !== divObj) {
                this.props.setScroll({ 'type': SET_COMMENT_SEARCH_URN, scrollTop: divObj });
                document.getElementById('slateWrapper').scrollTop = divObj;
            }
        }
    }

    componentWillUnmount() {
        if (config.releaseCallCount === 0) {
            this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
            config.releaseCallCount += 1
        }
        handleElmPortalEvents('remove');/** Remove Elm-Assessment Update eventListener */
        handlePostMsgOnAddAssess("", "", "", "remove", "")
    }

    componentWillReceiveProps(newProps) {
        if (!(newProps.permissions && (newProps.permissions.includes('access_formatting_bar') || newProps.permissions.includes('elements_add_remove'))) && !hasReviewerRole()) {
            return true
        }
        if (this.state.ElementId != newProps.activeElement.elementId || newProps.elemBorderToggle !== this.props.elemBorderToggle) {
            if (newProps.elemBorderToggle) {
                this.setState({
                    borderToggle: 'showBorder',
                    btnClassName: ''
                })
            } else {
                this.setState({
                    borderToggle: 'hideBorder',
                    btnClassName: ''
                })
            }
            // ** This post message is require to enable comments panel icon in wrapper when element focused **/
            sendDataToIframe({ 'type': 'elementFocus', 'message': { element: newProps.element } });
        } else if (newProps.element.type == "openerelement") {
            this.setState({
                borderToggle: 'active',
                btnClassName: 'activeTagBgColor'
            })
        }
        else {
            if ((newProps.element.type !== "element-citation") || (newProps.element.type == "element-citation" && config.citationFlag == true)) {
                this.setState({
                    borderToggle: 'active',
                    btnClassName: 'activeTagBgColor'
                })
            }
        }
    }

    changeInPodwidth = (newPodwidth, oldPodwidth) => {
        if(newPodwidth === 'print100' && oldPodwidth == "")
        {
            return false;
        }
        return newPodwidth !== oldPodwidth;
    }

    /**
     * function will be called on element focus of tinymce instance
     */
    handleFocus = (updateFromC2Flag, showHideObj, event, labelText) => {
        if (event && labelText !== 'fg') {
            event.stopPropagation();
        }
        let element = this.props.element,
            index = this.props.index
        const lastFocusedElementId = config.lastActiveElementId
        if (element.id !== lastFocusedElementId && element.id !== this.props.tcmSnapshotData?.eURN) {
            this.props.closeTcmPopup()
        }
        if (showHideObj) {
            element = showHideObj.currentElement
            index = showHideObj.index
        } else {
            let showHideNode = document.querySelector('.show-hide-active')
            if (showHideNode) {
                showHideNode.classList.remove("show-hide-active")
            }
        }
        if (!(this.props.permissions && (this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) && !hasReviewerRole()) {
            return true
        }
        if (updateFromC2Flag == "updateFromC2") {
            if (this.props.element.type === "openerelement") {
                this.setState({
                    borderToggle: 'active'
                })
            }
            else {
                this.setState({
                    borderToggle: 'active',
                    btnClassName: 'activeTagBgColor'
                })
            }
            config.lastActiveElementId = element.id
            this.props.setActiveElement(element, index, this.props.parentUrn, this.props.asideData, true, showHideObj);
        }
        else {
            if (this.props.element.type === "openerelement") {
                this.setState({
                    borderToggle: 'active'
                })
            }
            else {
                this.setState({
                    borderToggle: 'active',
                    btnClassName: 'activeTagBgColor'
                })
            }
            config.lastActiveElementId = element?.id
            this.props.setActiveElement(element, index, this.props.parentUrn, this.props.asideData, "", showHideObj);
            this.props.fetchCommentByElement(this.props.element.id);
        }
        this.handleCommunication(this.props.element.id);
    }

    removeClassesFromHtml = (html) => {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tinyMCE.$(tempDiv).find('p').removeAttr('class')
        return this.replaceUnwantedtags(tempDiv.innerHTML);
    }

    replaceUnwantedtags = (html) => {
        if (!html) {
            return;
        }
        let tempDiv = document.createElement('div');
        // PCAT-2426 - calling function to remove tinymcespellchecker DOM attributes from innerHTML
        html = removeSpellCheckDOMAttributes(html);
        html = html.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula').replace(/\uFEFF/g, "").replace(/>\s+</g, '><').replace(/data-mce-href="#"/g, '').replace(/ reset/g, '');
        html = html.trim();
        tempDiv.innerHTML = html;
        tinyMCE.$(tempDiv).find('br').remove();
        tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
        tinyMCE.$(tempDiv).find('span#_mce_caret').remove();
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('img').removeAttr('data-custom-editor');
        tinyMCE.$(tempDiv).find('p').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h1').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h2').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h3').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h4').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h5').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('h6').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('ol').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('ol').removeAttr('style');
        tinyMCE.$(tempDiv).find('img').removeAttr('style');
        tinyMCE.$(tempDiv).find('p').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('blockquote').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('blockquote').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('code').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('height');
        tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('width');
        tinyMCE.$(tempDiv).find('.blockquoteMarginalia').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('.paragraphNummerEins').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('img').removeAttr('draggable');
        tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeClass('fr-draggable');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-href');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-custom-editor');
        tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('src');
        tinyMCE.$(tempDiv).find('img.Wirisformula, img.temp_Wirisformula').removeAttr('data-mce-src');
        tinyMCE.$(tempDiv).find('img.imageAssetContent').removeAttr('data-mce-src');
        tempDiv.innerHTML = removeBlankTags(tempDiv.innerHTML)
        return encodeHTMLInWiris(tempDiv.innerHTML);
    }


    asideDifference=(index, previousElementData)=>{
        let labelDOM = document.getElementById(`cypress-${index}-t1`),
            numberDOM = document.getElementById(`cypress-${index}-t2`),
            titleDOM = document.getElementById(`cypress-${index}-t3`),
            labeleHTML = labelDOM ? labelDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            titleHTML = titleDOM ? titleDOM.innerHTML : ""

        labeleHTML = labeleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        titleHTML = createLabelNumberTitleModel(labeleHTML, numberHTML, titleHTML);
        titleHTML = this.removeClassesFromHtml(titleHTML)
        let oldTitleHTML = ""
        if (!(previousElementData?.html?.title)) {
            oldTitleHTML = createLabelNumberTitleModel("", "", "")
        } else {
            oldTitleHTML = this.removeClassesFromHtml(previousElementData?.html?.title)
        }
        return titleHTML !== oldTitleHTML
    }

    /**
     * Checks for any difference in data before initiating saving call
     * @param {*} index element index
     * @param {*} previousElementData old element data
     */
    figureDifference = (index, previousElementData) => {

        let titleDOM = document.getElementById(`cypress-${index}-0`),
            numberDOM = document.getElementById(`cypress-${index}-1`),
            subtitleDOM = document.getElementById(`cypress-${index}-2`),
            captionDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        captionHTML = captionHTML.match(/<p>/g) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = creditsHTML.match(/<p>/g) ? creditsHTML : `<p>${creditsHTML}</p>`
        titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        if (!this.props.isAutoNumberingEnabled) {
            titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
        }

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)

        let defaultImageUrl = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";

        let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.figureElement`)
            || document.querySelector(`div.element-container.fg.showBorder[data-id="${previousElementData.id}"] div.figureElement`)
        let podwidth = getAttributeBCE && getAttributeBCE.getAttribute("podwidth")
        let oldImage = this.props.oldImage;
        if (previousElementData.figuretype) {
            oldImage = this.props.oldFigureDataForCompare.path;
        }
        if (this.props?.isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
            // Not selecting remove label and number
            if (this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                let isValidValues = setAutonumberingValuesForPayload(this.props.autoNumberOption.option, titleHTML, numberHTML, true);
                if (!isValidValues) return false;
            }
            // Selecting default case 
            if ((previousElementData?.hasOwnProperty('manualoverride') || (previousElementData?.hasOwnProperty('numberedandlabel') && !previousElementData?.numberedandlabel)) && this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_DEFAULT) {
                return true;
            }

            let isNumberDifferent = false;
            let imgNumberValue = '';
            let overridedNumber = getOverridedNumberValue(previousElementData);
            let isOverridedLabelDifferent = false;
            if (overridedNumber && overridedNumber !== '') {
                isNumberDifferent = overridedNumber?.toString() !== numberHTML?.toString();
            } else {
                const figIndexParent = getContainerEntityUrn(this.props.currentSlateAncestorData);
                imgNumberValue = getNumberData(figIndexParent, previousElementData, this.props.autoNumberElementsIndex || {});
                isNumberDifferent = imgNumberValue?.toString() !== numberHTML?.toString();
            }
            if (previousElementData.hasOwnProperty('manualoverride') && previousElementData?.manualoverride.hasOwnProperty('overridelabelvalue')) {
                isOverridedLabelDifferent = previousElementData?.manualoverride?.overridelabelvalue !== titleHTML;
            }
            subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
            const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
            if (!titleHTML || titleHTML === '' || !(validDropdownOptions.includes(titleHTML))) {
                titleHTML = previousElementData.displayedlabel;
            }
            const isLabelDifferent = previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue') ? titleHTML !== previousElementData?.manualoverride?.overridelabelvalue : titleHTML !== previousElementData.displayedlabel;
                return (isLabelDifferent || this.removeClassesFromHtml(subtitleHTML) !== this.removeClassesFromHtml(previousElementData.html.title)
                || isNumberDifferent || isOverridedLabelDifferent ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                (oldImage ? oldImage : defaultImageUrl) !== (previousElementData.figuredata.path ? previousElementData.figuredata.path : defaultImageUrl)
                || podwidth !== (previousElementData.figuredata.podwidth ?
                    previousElementData.figuredata.podwidth : '') && podwidth !== null
            );
        }

        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            (oldImage ? oldImage : defaultImageUrl) !== (previousElementData.figuredata.path ? previousElementData.figuredata.path : defaultImageUrl)
            || podwidth !== (previousElementData.figuredata.podwidth ?
                previousElementData.figuredata.podwidth : '') && podwidth !== null
        );
    }

    figureDifferenceBlockCode = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            numberDOM = document.getElementById(`cypress-${index}-1`),
            subtitleDOM = document.getElementById(`cypress-${index}-2`),
            preformattedText = document.getElementById(`cypress-${index}-3`) ? document.getElementById(`cypress-${index}-3`).innerHTML.trim() : '<span class="codeNoHighlightLine"><br /></span>',
            captionDOM = document.getElementById(`cypress-${index}-4`),
            creditsDOM = document.getElementById(`cypress-${index}-5`);

        preformattedText = `<p>${preformattedText}</p>`
        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.blockCodeFigure`) || document.querySelector(`div.element-container.bce.showBorder[data-id="${previousElementData.id}"] div.blockCodeFigure`)
        let startNumber = getAttributeBCE && getAttributeBCE.getAttribute("startnumber")
        let isNumbered = getAttributeBCE && getAttributeBCE.getAttribute("numbered")
        let isSyntaxhighlighted = getAttributeBCE && getAttributeBCE.getAttribute("syntaxhighlighting")
        if (typeof (isNumbered) == "string") {
            isNumbered = JSON.parse(isNumbered)
        }
        if (typeof (isSyntaxhighlighted) == "string") {
            isSyntaxhighlighted = JSON.parse(isSyntaxhighlighted)
        }
        captionHTML = captionHTML.match(/<p>/g) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = creditsHTML.match(/<p>/g) ? creditsHTML : `<p>${creditsHTML}</p>`
        titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        preformattedText = this.removeClassesFromHtml(preformattedText)

        if (previousElementData.html && previousElementData.html.preformattedtext === '<p></p>') {
            previousElementData.html.preformattedtext = '<p><span class="codeNoHighlightLine"></span></p>'
        }

        //Handle Autonumbering
        if (this.props?.isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
            // Not selecting remove label and number
            if (this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                let isValidValues = setAutonumberingValuesForPayload(this.props.autoNumberOption.option, titleHTML, numberHTML, true);
                if (!isValidValues) return false;
            }
            // Selecting default case 
            if ((previousElementData?.hasOwnProperty('manualoverride') || (previousElementData?.hasOwnProperty('numberedandlabel') && !previousElementData?.numberedandlabel)) && this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_DEFAULT) {
                return true;
            }

            let isNumberDifferent = false;
            let imgNumberValue = '';
            let overridedNumber = getOverridedNumberValue(previousElementData);
            let isOverridedLabelDifferent = false;
            if (overridedNumber && overridedNumber !== '') {
                isNumberDifferent = overridedNumber?.toString() !== numberHTML?.toString();
            } else {
                const figIndexParent = getContainerEntityUrn(this.props.currentSlateAncestorData);
                imgNumberValue = getNumberData(figIndexParent, previousElementData, this.props.autoNumberElementsIndex || {});
                isNumberDifferent = imgNumberValue?.toString() !== numberHTML?.toString();
            }
            if (previousElementData?.hasOwnProperty('manualoverride') && previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue')) {
                isOverridedLabelDifferent = previousElementData?.manualoverride?.overridelabelvalue !== titleHTML;
            }
            subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
            if (!titleHTML || titleHTML === '' || !(displayLabelsForImage.includes(titleHTML))) {
                titleHTML = previousElementData.displayedlabel;
            }
            const isLabelDifferent = previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue') ? titleHTML !== previousElementData?.manualoverride?.overridelabelvalue : titleHTML !== previousElementData.displayedlabel;
                return (isLabelDifferent || this.removeClassesFromHtml(subtitleHTML) !== this.removeClassesFromHtml(previousElementData.html.title)
                || isNumberDifferent || isOverridedLabelDifferent ||
                titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                preformattedText !== this.removeClassesFromHtml(previousElementData.html.preformattedtext) ||
                Number(startNumber) !== Number(previousElementData.figuredata.startNumber) ||
                isNumbered !== previousElementData.figuredata.numbered ||
                isSyntaxhighlighted !== previousElementData.figuredata.syntaxhighlighting
            );
        }

        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            preformattedText !== this.removeClassesFromHtml(previousElementData.html.preformattedtext) ||
            Number(startNumber) !== Number(previousElementData.figuredata.startNumber) ||
            isNumbered !== previousElementData.figuredata.numbered ||
            isSyntaxhighlighted !== previousElementData.figuredata.syntaxhighlighting
        );
    }

    /**
     * Checks for any difference in data before initiating saving call (Interactive element)
     * @param {*} index element index
     * @param {*} previousElementData old element data
     */
    figureDifferenceInteractive = (index, previousElementData) => {

        let newInteractiveid = previousElementData.figuredata.interactiveid || ""
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            numberDOM = document.getElementById(`cypress-${index}-1`),
            subtitleDOM = document.getElementById(`cypress-${index}-2`),
            captionsDOM = document.getElementById(`cypress-${index}-4`),
            creditsDOM = document.getElementById(`cypress-${index}-5`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionsDOM ? captionsDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""
        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        if (!this.props.isAutoNumberingEnabled) {
            titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
        }

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        
        let smartlinkContexts = ['3rd-party', 'pdf', 'web-link', 'pop-up-web-link', 'table'];
        let podwidth = this.props?.activeElement?.podwidth;
        let oldImage = this.props.oldImage;
        // if (smartlinkContexts.includes(previousElementData.figuredata.interactivetype)) {
             oldImage = this.props.oldSmartLinkDataForCompare.interactiveid;
        // }

        if (this.props?.isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel') && (previousElementData.figuretype !== 'tableasmarkup')) {
            let isValid = validateLabelNumberSetting(this.props, previousElementData, this.removeClassesFromHtml, titleHTML, numberHTML, subtitleHTML, captionHTML, creditsHTML, oldImage, podwidth, smartlinkContexts, index, this.changeInPodwidth);
            return isValid;
        }
      
        if (previousElementData.figuredata.interactivetype === "pdf" || previousElementData.figuredata.interactivetype === "pop-up-web-link" ||
            previousElementData.figuredata.interactivetype === "web-link" || previousElementData.figuredata.interactivetype === '3rd-party' || 
            previousElementData.figuredata.interactivetype === 'table') {
            let pdfPosterTextDOM = document.getElementById(`cypress-${index}-3`)
            let posterTextHTML = pdfPosterTextDOM ? pdfPosterTextDOM.innerHTML : ""
            posterTextHTML = posterTextHTML.match(/(<p.*?>.*?<\/p>)/g) ? posterTextHTML : `<p>${posterTextHTML}</p>`

            let oldPosterText = previousElementData.html && previousElementData.html.postertext ? previousElementData.html.postertext.match(/(<p.*?>.*?<\/p>)/g) ? previousElementData.html.postertext : `<p>${previousElementData.html.postertext}</p>` : "<p></p>";
            return (subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                this.removeClassesFromHtml(posterTextHTML) !== this.removeClassesFromHtml(oldPosterText) ||
                oldImage !== newInteractiveid ||
                this.changeInPodwidth(podwidth, previousElementData?.figuredata?.posterimage?.podwidth)
            );
        }
        else {
            return (subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                oldImage !== newInteractiveid
            );
        }
    }
    figureDifferenceAT = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            numberDOM = document.getElementById(`cypress-${index}-1`),
            subtitleDOM = document.getElementById(`cypress-${index}-2`),
            text = document.getElementById(`cypress-${index}-3`) ? document.getElementById(`cypress-${index}-3`).innerHTML : "<p></p>",
            captionDOM = document.getElementById(`cypress-${index}-4`),
            creditsDOM = document.getElementById(`cypress-${index}-5`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : "",
            oldtext = previousElementData.html.text ? previousElementData.html.text : ""

        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
        text = matchHTMLwithRegex(text) ? text : `<p>${text}</p>`
        oldtext = matchHTMLwithRegex(oldtext) ? oldtext : `<p>${oldtext}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        text = this.removeClassesFromHtml(text)
        oldtext = this.removeClassesFromHtml(oldtext)

        let oldTitle = this.removeClassesFromHtml(previousElementData.html.title),
            oldCaption = this.removeClassesFromHtml(previousElementData.html.captions),
            oldCredit = this.removeClassesFromHtml(previousElementData.html.credits)
        
        //Handle Autonumbering
        if (this.props?.isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
            // Not selecting remove label and number
            if (this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                let isValidValues = setAutonumberingValuesForPayload(this.props.autoNumberOption.option, titleHTML, numberHTML, true);
                if (!isValidValues) return false;
            }
            // Selecting default case 
            if ((previousElementData?.hasOwnProperty('manualoverride') || (previousElementData?.hasOwnProperty('numberedandlabel') && !previousElementData?.numberedandlabel)) && this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_DEFAULT) {
                return true;
            }

            let isNumberDifferent = false;
            let imgNumberValue = '';
            let overridedNumber = getOverridedNumberValue(previousElementData);
            let isOverridedLabelDifferent = false;
            if (overridedNumber && overridedNumber !== '') {
                isNumberDifferent = overridedNumber?.toString() !== numberHTML?.toString();
            } else {
                const figIndexParent = getContainerEntityUrn(this.props.currentSlateAncestorData);
                imgNumberValue = getNumberData(figIndexParent, previousElementData, this.props.autoNumberElementsIndex || {});
                isNumberDifferent = imgNumberValue?.toString() !== numberHTML?.toString();
            }
            if (previousElementData?.hasOwnProperty('manualoverride') && previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue')) {
                isOverridedLabelDifferent = previousElementData?.manualoverride?.overridelabelvalue !== titleHTML;
            }
            subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
            if (!titleHTML || titleHTML === '' || !(displayLabelsForImage.includes(titleHTML))) {
                titleHTML = previousElementData.displayedlabel;
            }
            const isLabelDifferent = previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue') ? titleHTML !== previousElementData?.manualoverride?.overridelabelvalue : titleHTML !== previousElementData.displayedlabel;
                return (isLabelDifferent || this.removeClassesFromHtml(subtitleHTML) !== this.removeClassesFromHtml(previousElementData.html.title)
                || isNumberDifferent || isOverridedLabelDifferent ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                titleHTML !== oldTitle ||
                captionHTML !== oldCaption ||
                creditsHTML !== oldCredit ||
                text !== oldtext
            );
        }
        
        return (titleHTML !== oldTitle ||
            captionHTML !== oldCaption ||
            creditsHTML !== oldCredit ||
            // formattedText!==formattedOldText
            text !== oldtext
        );
    }

    figureDifferenceAudioVideo = (index, previousElementData) => {

        let titleDOM = document.getElementById(`cypress-${index}-0`),
            numberDOM = document.getElementById(`cypress-${index}-1`),
            subtitleDOM = document.getElementById(`cypress-${index}-2`),
            captionDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            numberHTML = numberDOM ? numberDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        titleHTML = titleHTML.replace(/<br data-mce-bogus="1">/g, '');
        numberHTML = numberHTML.replace(/<br data-mce-bogus="1">/g, '');
        if (!this.props.isAutoNumberingEnabled) {
            titleHTML = createLabelNumberTitleModel(titleHTML, numberHTML, subtitleHTML);
        }

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        let assetId = previousElementData.figuretype == 'video' ? previousElementData.figuredata.videoid : (previousElementData.figuredata.audioid ? previousElementData.figuredata.audioid : "");
        let oldImage = this.props.oldImage;
        oldImage = this.props.oldAudioVideoDataForCompare?.videoid ? this.props.oldAudioVideoDataForCompare?.videoid : this.props.oldAudioVideoDataForCompare?.audioid ? this.props.oldAudioVideoDataForCompare?.audioid : "";
        if (this.props.isAutoNumberingEnabled && previousElementData?.hasOwnProperty('numberedandlabel')) {
            // Not selecting remove label and number
            if (this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option !== AUTO_NUMBER_SETTING_REMOVE_NUMBER) {
                let isValidValues = setAutonumberingValuesForPayload(this.props.autoNumberOption.option, titleHTML, numberHTML, true);
                if (!isValidValues) return false;
            }
            // Selecting default case 
            if ((previousElementData?.hasOwnProperty('manualoverride') || (previousElementData?.hasOwnProperty('numberedandlabel') && !previousElementData?.numberedandlabel)) && this.props?.autoNumberOption?.entityUrn === previousElementData?.contentUrn && this.props?.autoNumberOption?.option === AUTO_NUMBER_SETTING_DEFAULT) {
                return true;
            }

            let isNumberDifferent = false;
            let imgNumberValue = '';
            let overridedNumber = getOverridedNumberValue(previousElementData);
            let isOverridedLabelDifferent = false;
            if (overridedNumber && overridedNumber !== '') {
                isNumberDifferent = overridedNumber?.toString() !== numberHTML?.toString();
            } else {
                const figIndexParent = getContainerEntityUrn(this.props.currentSlateAncestorData);
                imgNumberValue = getNumberData(figIndexParent, previousElementData, this.props.autoNumberElementsIndex || {});
                isNumberDifferent = imgNumberValue?.toString() !== numberHTML?.toString();
            }
            if (previousElementData.hasOwnProperty('manualoverride') && previousElementData?.manualoverride.hasOwnProperty('overridelabelvalue')) {
                isOverridedLabelDifferent = previousElementData?.manualoverride?.overridelabelvalue !== titleHTML;
            }
            let podwidth = this.props?.oldAudioVideoDataForCompare?.figuredata?.podwidth;
            subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`;
            const validDropdownOptions = generateDropdownDataForFigures(previousElementData)
            if (!titleHTML || titleHTML === '' || !(validDropdownOptions.includes(titleHTML))) {
                titleHTML = previousElementData.displayedlabel;
            }
            return (titleHTML !== previousElementData.displayedlabel ||
                this.removeClassesFromHtml(subtitleHTML) !== this.removeClassesFromHtml(previousElementData.html.title) || isNumberDifferent || isOverridedLabelDifferent ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                (oldImage !== assetId)
                || podwidth !== (previousElementData.figuredata.podwidth ? previousElementData.figuredata.podwidth : undefined) && (podwidth !== null && podwidth !== undefined)
            );
        }
        // let defaultImageUrl =  "https://cite-media-stg.pearson.com/legacy_paths/af7f2e5c-1b0c-4943-a0e6-bd5e63d52115/FPO-audio_video.png";
        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            oldImage !== assetId
            // (defaultImageUrl !== (previousElementData.figuredata.posterimage && previousElementData.figuredata.posterimage.path)) //PCAT-6815  fixes
        );
    }

    // updateAside

    updateOpenerElement = (dataToSend) => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        if (!config.savingInProgress) {
            dataToSend = createOpenerElementData(this.props.element, elementType, primaryOption, secondaryOption)
            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
            this.props.updateElement(dataToSend, 0, undefined, undefined, undefined, undefined);
        }
    }

    /**
     * Calls API for element updation
     * @param {*} node
     * @param {*} previousElementData
     * @param {*} elementType
     * @param {*} primaryOption
     * @param {*} secondaryOption
     * @param {*} activeEditorId
     */
    handleContentChange = (node, previousElementData, elementType, primaryOption, secondaryOption, activeEditorId, forceupdate, parentElement, showHideType, elemIndex, cgTitleFieldData) => {
        let { parentUrn, asideData } = this.props;
        asideData = cgTitleFieldData?.asideData && Object.keys(cgTitleFieldData?.asideData).length > 0 ? cgTitleFieldData?.asideData : asideData;
        parentElement = cgTitleFieldData?.parentElement && Object.keys(cgTitleFieldData?.parentElement).length > 0 ? cgTitleFieldData?.parentElement : parentElement;
        let dataToSend = {}
        let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
        let checkCanvasBlocker = document.querySelector("div.canvas-blocker");
        switch (previousElementData.type) {
            case elementTypeConstant.AUTHORED_TEXT:
            case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
            case elementTypeConstant.BLOCKFEATURE:
            case elementTypeConstant.POETRY_STANZA:
                let index = (parentElement.type == "showhide" || parentElement.type == "popup" || parentElement.type == "poetry" || parentElement.type == "citations" || parentElement.type == "groupedcontent") ? activeEditorId : `cypress-${this.props.index}`
                if (this.props.element && this.props.element.type === "element-blockfeature" && this.props.element.subtype === "quote" && tinyMCE.activeEditor && tinyMCE.activeEditor.id && !tinyMCE.activeEditor.id.includes("footnote")) {
                    let blockqtText = document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins') ? document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').innerText : "";
                    if (!blockqtText.trim()) {
                        var MLtext = document.querySelector('#' + tinymce.activeEditor.id + ' > p > img') || document.querySelector('#' + tinymce.activeEditor.id + ' > img')
                        if (MLtext) {
                            tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').find('br').remove();
                            document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append(MLtext)
                            tinyMCE.$('#' + tinymce.activeEditor.id).find('p[data-mce-caret="before"]').remove();
                            tinyMCE.$('#' + tinymce.activeEditor.id).find('span#mce_1_start').remove();
                            tinyMCE.$('#' + tinymce.activeEditor.id).find('div.mce-visual-caret').remove();
                            tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append("&nbsp;")
                        }
                    }
                }
                let currentNode = document.getElementById(index)
                let html = currentNode && currentNode.innerHTML;
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                //tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
                html = tempDiv.innerHTML;
                /** [BG-2293 - mathML/chemML is not captured in postertextobject field in show-hide */
                if (parentElement.type == "showhide" && index && showHideType == 'postertextobject' && html.match(/<img/)) {
                    tinyMCE.$(tempDiv).find('br').remove()
                    tinyMCE.$(html).find('br').remove()
                }
                let poetryData;
                if (parentElement && parentElement.type === "poetry") {
                    poetryData = {
                        type: "poetry",
                        parentUrn: parentElement.id,
                        id: parentElement.id,
                        contentUrn: parentElement.contentUrn
                    };
                }
                let isPosterTextSelected = parentElement && parentElement.type === "popup" && parentElement.popupdata["postertextobject"] && parentElement.popupdata["postertextobject"].length && parentElement.popupdata["postertextobject"][0].id === previousElementData.id
                if ((parentElement.type === "poetry" && previousElementData.type !== "stanza" && !(parentElement.contents["creditsarray"] && parentElement.contents["creditsarray"].length && parentElement.contents.creditsarray[0].id === previousElementData.id)) || parentElement.type === "citations" || (parentElement.type === "popup" && !isPosterTextSelected)) {
                    let titleDOMNode = document.getElementById(`cypress-${this.props.index}-0`),
                        subtitleDOMNode = document.getElementById(`cypress-${this.props.index}-1`)

                    let titleHTML = titleDOMNode && titleDOMNode.innerHTML,
                        subtitleHTML = subtitleDOMNode && subtitleDOMNode.innerHTML

                    titleHTML = titleHTML && titleHTML.replace(/<br>/g, "").replace(/<br data-mce-bogus="1">/g, "")
                    subtitleHTML = subtitleHTML && subtitleHTML.replace(/<br>/g, "").replace(/<br data-mce-bogus="1">/g, "")

                    let imgTaginLabel = titleDOMNode && titleDOMNode.getElementsByTagName("img")
                    let imgTaginTitle = subtitleDOMNode && subtitleDOMNode.getElementsByTagName("img")
                    let blankLineLabel = titleDOMNode && titleDOMNode.getElementsByClassName("answerLineContent")
                    let blankLineTitle = subtitleDOMNode && subtitleDOMNode.getElementsByClassName("answerLineContent")
                    if (parentElement.type === "poetry" || parentElement.type === "popup") {
                        if ((titleDOMNode.textContent === '') && !(imgTaginLabel && imgTaginLabel.length) && !(blankLineLabel && blankLineLabel.length)) {
                            titleHTML = ""
                        }
                        if ((subtitleDOMNode.textContent === '') && !(imgTaginTitle && imgTaginTitle.length) && !(blankLineTitle && blankLineTitle.length)) {
                            subtitleHTML = ""
                        }
                        tempDiv.innerHTML = createTitleSubtitleModel(titleHTML, subtitleHTML)
                    }
                    else if (parentElement.type === "citations") {
                        if ((titleDOMNode.textContent === '') && !(imgTaginLabel && imgTaginLabel.length) && !(blankLineLabel && blankLineLabel.length)) {
                            titleHTML = ""
                        }
                        tempDiv.innerHTML = createTitleSubtitleModel("", titleHTML)
                    }
                    html = tempDiv.innerHTML
                    // html = html.replace(/<br data-mce-bogus="1">/g, "<br>")
                    parentElement["index"] = this.props.index
                }
                else if ((parentElement.type === "poetry" && parentElement.contents["creditsarray"] && parentElement.contents["creditsarray"].length && parentElement.contents.creditsarray[0].id === previousElementData.id) || isPosterTextSelected) {
                    tempDiv.innerHTML = matchHTMLwithRegex(tempDiv.innerHTML) ? tempDiv.innerHTML : `<p class="paragraphNumeroUno">${tempDiv.innerHTML}</p>`
                    html = html.replace(/<br data-mce-bogus="1">/g, "<br>")
                    html = matchHTMLwithRegex(html) ? html : `<p class="paragraphNumeroUno">${html}</p>`
                    parentElement["index"] = this.props.index
                }
                else if (previousElementData.type === "stanza") {
                    html = `<p>${html}</p>`
                }
                if (parentElement && parentElement.type === "popup") {
                    html = html.replace(/(<sup><\/sup>)|(<sup><br><\/sup>)/g, "<br>");
                    html = html.replace(/<br data-mce-bogus="1">/g, '<br>')
                    tempDiv.innerHTML = html
                    if (!isPosterTextSelected) {
                        previousElementData.html.text = removeUnoClass(previousElementData.html.text) //BG-3278 (support to be improved)
                    }
                }
                html = html.replace(/(\r\n|\n|\r)/gm, '')
                previousElementData.html.text = previousElementData.html.text.replace(/<br data-mce-bogus="1">/g, "<br>").replace(/(\r\n|\n|\r)/gm, '');
                previousElementData.html.text = previousElementData.html.text.replace(/data-mce-bogus="all"/g, '')
                tempDiv.innerHTML = removeBlankTags(tempDiv.innerHTML)
                if (html && previousElementData.html && (this.replaceUnwantedtags(html) !== this.replaceUnwantedtags(previousElementData.html.text) || forceupdate) && !assetPopoverPopupIsVisible && !config.savingInProgress && !checkCanvasBlocker && elementType && primaryOption && secondaryOption) {
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, tempDiv, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, showHideType, asideData, poetryData)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                    config.isSavingElement = true
                    /*** @description For showhide Element, ON RevealAnswer text update, sending RevealAnswer element index */
                    if ((this.props.element?.type === elementTypeConstant.SHOW_HIDE) && (showHideType === "postertextobject")) {
                        /* Contains the data of parent elemens Ex.- 2C/Aside/POP||AgainContainer:SH */
                        const elementLineage = {
                            ...this.props.element, grandParent: { asideData, parentUrn }
                        }   
                        this.props.updateElement(dataToSend, elemIndex, parentUrn, elementLineage, showHideType, parentElement, poetryData);
                    } else {
                        this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, showHideType, parentElement, poetryData);
                    }
                }
                break;

            case elementTypeConstant.ELEMENT_ASIDE:
                if (this.asideDifference(this.props.index, previousElementData) && previousElementData?.id !== "") {
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                    config.isSavingElement = true
                    this.props.updateAsideNumber(previousElementData,this.props.index);
                }
            break;

            case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE_EDITOR:
                        if (this.figureDifference(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData, this.props.isAutoNumberingEnabled, this.props?.autoNumberOption?.option);
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement);
                            if (this.props.isAutoNumberingEnabled) {
                                this.handleAutonumberAfterUpdate(previousElementData, dataToSend, this.props.autoNumberedElements, this.props.currentSlateAncestorData, this.props.slateLevelData);
                            }
                        }
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                    case elementTypeConstant.FIGURE_AUDIO:
                        if (this.figureDifferenceAudioVideo(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData, this.props.isAutoNumberingEnabled, this.props?.autoNumberOption?.option)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement);
                            if (this.props.isAutoNumberingEnabled) {
                                this.handleAutonumberAfterUpdate(previousElementData, dataToSend, this.props.autoNumberedElements, this.props.currentSlateAncestorData, this.props.slateLevelData);
                            }
                        }
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:

                        const data = JSON.parse(JSON.stringify(previousElementData));
                        this.props.storeOldAssetForTCM(data.figuredata);
                        dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                        config.isSavingElement = true
                        this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement);
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        if (this.figureDifferenceInteractive(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData, this.props.isAutoNumberingEnabled, this.props?.autoNumberOption?.option)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement)
                            if (this.props.isAutoNumberingEnabled) {
                                this.handleAutonumberAfterUpdate(previousElementData, dataToSend, this.props.autoNumberedElements, this.props.currentSlateAncestorData, this.props.slateLevelData);
                            }
                        }
                        break;

                    case elementTypeConstant.FIGURE_CODELISTING:
                        if (this.figureDifferenceBlockCode(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData, this.props.isAutoNumberingEnabled, this.props?.autoNumberOption?.option)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement);
                            if (this.props.isAutoNumberingEnabled) {
                                this.handleAutonumberAfterUpdate(previousElementData, dataToSend, this.props.autoNumberedElements, this.props.currentSlateAncestorData, this.props.slateLevelData);
                            }
                        }
                        break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        if (this.figureDifferenceAT(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, undefined, asideData, this.props.isAutoNumberingEnabled, this.props?.autoNumberOption?.option)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, parentElement);
                            if (this.props.isAutoNumberingEnabled) {
                                this.handleAutonumberAfterUpdate(previousElementData, dataToSend, this.props.autoNumberedElements, this.props.currentSlateAncestorData, this.props.slateLevelData);
                            }
                        }
                        break;
                }
                break;

            case elementTypeConstant.ASSESSMENT_SLATE:
                dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, undefined, undefined, undefined)
                this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, undefined);
                break;
            case elementTypeConstant.ELEMENT_LIST:
                {
                    // let html = node.innerHTML;
                    let parentIndex = parentElement.type == "showhide" || parentElement.type == "popup" ? activeEditorId : `cypress-${this.props.index}`
                    let currentListNode = document.getElementById(parentIndex)
                    tinyMCE.$(currentListNode).find('ol').removeAttr('data-mce-style');
                    currentListNode.innerHTML = currentListNode.innerHTML.replace(/counter-increment:section/g, "counter-increment: section")
                    for (let i = 0; i < tinyMCE.$(currentListNode).find('li').length; i++) {
                        tinyMCE.$(currentListNode).find('li')[i].innerHTML = tinyMCE.$(currentListNode).find('li')[i].innerHTML.replace(/[\r\n]+/gm, "");
                        tinyMCE.$(currentListNode).find('li')[i].innerHTML = tinyMCE.$(currentListNode).find('li')[i].innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                        tinyMCE.$(currentListNode).find('li')[i].innerHTML = tinyMCE.$(currentListNode).find('li')[i].innerHTML.replace(/(<sup><\/sup>)|(<sup><br><\/sup>)/g, "");
                    }
                    currentListNode.innerHTML = removeBlankTags(currentListNode.innerHTML)
                    let nodehtml = currentListNode.innerHTML;
                    if (nodehtml && previousElementData.html) {
                        let prevData = this.replaceUnwantedtags(previousElementData.html.text);
                        prevData = prevData && prevData.replace(/(reset | reset|↵)/g, "").replace(/data-mce-href="#"/g, '');
                        let nodeData = this.replaceUnwantedtags(nodehtml);
                        nodeData = nodeData && nodeData.replace(/(reset | reset|↵)/g, "").replace(/data-mce-href="#"/g, '');
                        if ((nodeData !== prevData || forceupdate && !config.savingInProgress) && !assetPopoverPopupIsVisible && !checkCanvasBlocker) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, currentListNode, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, showHideType, undefined)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            config.isSavingElement = true
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, showHideType, parentElement);
                        }
                    }
                    break;
                }
            case elementTypeConstant.CITATION_ELEMENT:
                let ceIndex = `cypress-${this.props.index}`
                let ceCurrentNode = document.getElementById(ceIndex)
                let ceHtml = ceCurrentNode && ceCurrentNode.innerHTML;
                let tempDivForCE = document.createElement('div');
                tempDivForCE.innerHTML = ceHtml;
                ceHtml = tempDivForCE.innerHTML;
                tempDivForCE.innerHTML = removeBlankTags(tempDivForCE.innerHTML)
                tempDivForCE.innerHTML = handleBlankLineDom(tempDivForCE.innerHTML);
                ceHtml = removeBlankTags(ceHtml)
                if (ceHtml && previousElementData.html && (this.replaceUnwantedtags(ceHtml) !== this.replaceUnwantedtags(previousElementData.html.text) || forceupdate) && !config.savingInProgress) {
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, tempDivForCE, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, showHideType, asideData)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                    parentElement["index"] = this.props.index
                    config.isSavingElement = true
                    this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, showHideType, parentElement);
                }
                break;
        }
    }
    
    handleAutonumberAfterUpdate = (previousElementData, dataToSend, autoNumberedElements, currentSlateAncestorData, slateLevelData) => {
        const parentIndex = getContainerEntityUrn(currentSlateAncestorData);
        const  labelNumberSetting = this.props?.autoNumberOption?.option
        const finalValue =  updateAutoNumberedElement(labelNumberSetting,dataToSend,{ displayedlabel: dataToSend?.displayedlabel,    manualoverride: dataToSend?.manualoverride })
        // remove/override to default means gets added to numbering system
        if ((!previousElementData?.numberedandlabel || previousElementData?.manualoverride?.hasOwnProperty('overridelabelvalue')) && dataToSend.numberedandlabel && (!dataToSend?.manualoverride?.hasOwnProperty('overridelabelvalue'))) {
            if (dataToSend.hasOwnProperty('manualoverride') && dataToSend?.manualoverride.hasOwnProperty('resumenumbervalue')) {
                dataToSend = {
                    ...dataToSend,
                    manualoverride: {
                        resumenumbervalue: parseInt(dataToSend?.manualoverride?.resumenumbervalue)
                    }
                }
            }
            this.props.handleAutonumberingOnCreate(dataToSend?.figuretype?.toUpperCase(), dataToSend);
        } else if (previousElementData?.numberedandlabel && !dataToSend.numberedandlabel) { //default/resume to remove
            this.props.updateAutoNumberSequenceOnDelete(parentIndex, dataToSend.contentUrn, autoNumberedElements);
        } else if ( (previousElementData?.numberedandlabel) && (previousElementData?.displayedlabel !== dataToSend.displayedlabel) && (dataToSend?.manualoverride?.hasOwnProperty('resumenumbervalue')) ) {
            // resume case
            dataToSend = {
                ...dataToSend,
                manualoverride: {
                    resumenumbervalue: parseInt(dataToSend?.manualoverride?.resumenumbervalue)
                }
            }
            this.props.updateAutonumberingOnElementTypeUpdate(dataToSend, previousElementData, autoNumberedElements, currentSlateAncestorData, slateLevelData);
        } else if ((previousElementData?.numberedandlabel) && (!dataToSend.hasOwnProperty('displayedlabel')) && (dataToSend && dataToSend.manualoverride && dataToSend.manualoverride.hasOwnProperty('overridelabelvalue'))) {
            // override label and number case 
            // this.props.updateAutonumberingOnOverridedCase(dataToSend?.displayedlabel, dataToSend, autoNumberedElements, currentSlateAncestorData);
            this.props.updateAutoNumberSequenceOnDelete(parentIndex, dataToSend.contentUrn, autoNumberedElements);
        } else if ((previousElementData?.numberedandlabel) && (previousElementData?.displayedlabel === dataToSend.displayedlabel) && (dataToSend && dataToSend.manualoverride && dataToSend.manualoverride.hasOwnProperty('overridenumbervalue'))) {
            // override number only case 
            this.props.updateAutonumberingOnElementTypeUpdate(dataToSend, previousElementData, autoNumberedElements, currentSlateAncestorData, slateLevelData);
        } else if ( (previousElementData?.numberedandlabel) && (!(dataToSend.hasOwnProperty('manualoverride'))) ) { 
            // default case
            this.props.updateAutonumberingOnElementTypeUpdate(dataToSend, previousElementData, autoNumberedElements, currentSlateAncestorData, slateLevelData);
        } else {
            this.props.updateAutonumberingKeysInStore(dataToSend, autoNumberedElements, currentSlateAncestorData);
        }
    }

    /**
     * Will be called on element blur and a saving call will be made
     */
    handleBlur = (forceupdate, currrentElement, elemIndex, showHideType, calledFrom, cgTitleFieldData = {}) => {
        const { elementType, primaryOption, secondaryOption, elementId } = this.props.activeElement;
        let activeEditorId = elemIndex ? `cypress-${elemIndex}` : (tinyMCE.activeEditor ? tinyMCE.activeEditor.id : '')
        let node = document.getElementById(activeEditorId);
        let element = currrentElement ? currrentElement : this.props.element;
        /* setting parent element for showhide inner elements on update */
        const { SHOW_HIDE, MULTI_COLUMN, POETRY_ELEMENT } = elementTypeConstant;
        const containerParent = [SHOW_HIDE, MULTI_COLUMN, POETRY_ELEMENT].includes(this.props?.parentElement?.type);
        let parentElement
        /* Update title/credit of block poetry inside multicolumn */
        if (containerParent && this.props?.parentElement?.type == "groupedcontent" && this.props?.element?.type == "poetry") {
            this.props.parentElement?.groupeddata?.bodymatter.map((ele) => {
                ele.groupdata?.bodymatter?.map((ele1) => {
                    if(ele1.type == "poetry" && ele1.id === this.props.element?.id) {
                        parentElement = ele1
                    }
                })
            })
        } else {
            parentElement = ((currrentElement && currrentElement.type === elementTypeConstant.CITATION_ELEMENT) || containerParent) ? this.props.parentElement : this.props.element
        }  
        if (calledFrom && calledFrom == 'fromEmbeddedAssessment') {
            const seconadaryAssessment = SECONDARY_SINGLE_ASSESSMENT + this.props.element.figuredata.elementdata.assessmentformat;
            this.handleContentChange(node, element, ELEMENT_ASSESSMENT, PRIMARY_SINGLE_ASSESSMENT, seconadaryAssessment, activeEditorId, forceupdate, parentElement, showHideType, null, cgTitleFieldData);
        } else {
            this.handleContentChange(node, element, elementType, primaryOption, secondaryOption, activeEditorId, forceupdate, parentElement, showHideType, elemIndex, cgTitleFieldData)
        }
    }

    /**
     * Will e called on assessment element's blur
     */
    handleBlurAssessmentSlate = (assessmentData) => {
        // const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        const oldAssessmentData = JSON.parse(JSON.stringify(this.props.element));
        this.props.storeOldAssetForTCM(oldAssessmentData.elementdata);
        let dataToSend = { ...this.props.element }
        if (assessmentData?.calledFrom == 'updateAssessmentFormat') {
            dataToSend.elementdata = {
                schema: "http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
                assessmentid: "",
                assessmenttitle: "",
                usagetype: assessmentData.usageType,
                assessmentformat: assessmentData.format
            }
            this.handleContentChange('', dataToSend, ELEMENT_ASSESSMENT, PRIMARY_SLATE_ASSESSMENT, SECONDARY_SLATE_ASSESSMENT + assessmentData.format)
        }
        else if (assessmentData.id) {
            dataToSend.elementdata.assessmentformat = assessmentData.format;
            dataToSend.elementdata.usagetype = assessmentData.usageType;
            dataToSend.elementdata.assessmentid = assessmentData.id;
            if (assessmentData.format === 'learningtemplate') {
                dataToSend.elementdata["learningsystem"] = assessmentData.learningsystem;
                dataToSend.elementdata["templateid"] = assessmentData.templateid;
                dataToSend.elementdata["templatetype"] = assessmentData.templatetype;
                dataToSend.elementdata["templatelabel"] = assessmentData.templatelabel;
            } else {
                dataToSend.elementdata.assessmenttitle = assessmentData.title;
            }
            this.handleContentChange('', dataToSend, ELEMENT_ASSESSMENT, PRIMARY_SLATE_ASSESSMENT, SECONDARY_SLATE_ASSESSMENT + assessmentData.format)
        } else {
            dataToSend.elementdata.usagetype = assessmentData;
            this.handleContentChange('', dataToSend, ELEMENT_ASSESSMENT, PRIMARY_SLATE_ASSESSMENT, SECONDARY_SLATE_ASSESSMENT + this.props.element.elementdata.assessmentformat)
        }

    }

    toggleColorPaletteList = () => {
        if (config.savingInProgress) return false
        const { showColorPaletteList } = this.state;
        this.handleFocus();
        this.setState({
            showColorPaletteList: !showColorPaletteList
        })
    }

    toggleColorTextList = () => {
        if (config.savingInProgress) return false
        const { showColorTextList } = this.state;
        this.handleFocus();
        this.setState({
            showColorTextList: !showColorTextList
        })
    }

    /**
     * Updates background color in opener element.
     * @param {*} event event object
     */
    selectColor = (event) => {
        const selectedColor = event.target.getAttribute('data-value');
        const elementData = this.props.element;
        this.setState({
            activeColorIndex: config.colors.indexOf(selectedColor),
            showColorPaletteList: false
        });

        elementData.backgroundcolor = selectedColor;
        if (this.props.element.backgroundcolor !== config.colors[this.state.activeColorIndex]) {
            this.updateOpenerElement(elementData);
        }
    }

    /**
     * Rendering Opener element color palette
     * @param {e} event
     */
    renderPaletteList = () => {
        const { showColorPaletteList, activeColorIndex } = this.state
        if (showColorPaletteList) {
            return config.colors.map((color, index) => {
                return <li className={`color-palette-item ${index === activeColorIndex ? 'selected' : ''}`} onClick={(event) => this.selectColor(event)} key={index} data-value={color}></li>
            })
        }
        else {
            return null
        }
    }


    /**
     * Renders color-palette button for opener element 
     * @param {e} event
     */
    renderColorPaletteButton = (element, permissions,isSubscribersSlate) => {
        const isPermitted = permissions.includes('elements_add_remove')
        if (element.type === elementTypeConstant.OPENER && isPermitted) {
            return (
                <>
                    <Button isSubscribersSlate={isSubscribersSlate} onClick={this.toggleColorPaletteList} type="color-palette" />
                    <ul className="color-palette-list">{this.renderPaletteList()}</ul>
                </>
            )
        }
        else {
            return null
        }
    }


    selectTextColor = (event) => {
        const selectedTextColor = event.target.getAttribute('data-value');
        const elementData = this.props.element;
        this.setState({
            activeTextColorIndex: config.textcolors.indexOf(selectedTextColor),
            showColorTextList: false
        });
        elementData.textcolor = selectedTextColor;
        if (this.props.element.textcolor !== config.textcolors[this.state.activeTextColorIndex]) {
            this.updateOpenerElement(elementData);
        }

    }

    /**
    * Rendering Opener element text color 
    * @param {e} event
    */
    renderTextColorList = () => {
        const { showColorTextList, activeTextColorIndex } = this.state
        if (showColorTextList) {
            return config.textcolors.map((colortext, index) => {
                return <li className={`color-text-item ${index === activeTextColorIndex ? 'selected' : ''}`} onClick={(event) => this.selectTextColor(event)} key={index} data-value={colortext}></li>
            })
        }
        else {
            return null
        }
    }


    /**
     * Renders color-text button for opener element 
     * @param {e} event
     */
    renderColorTextButton = (element, permissions,isSubscribersSlate) => {
        const isPermitted = permissions.includes('elements_add_remove')
        if (element.type === elementTypeConstant.OPENER && isPermitted) {
            return (
                <>
                    <Button isSubscribersSlate={isSubscribersSlate} onClick={this.toggleColorTextList} type="color-text" />
                    <ul className="color-text-list">{this.renderTextColorList()}</ul>
                </>
            )
        }
        else {
            return null
        }
    }

    /**
     * show Delete element Popup 
     * @param {elementId} 
     */
    showDeleteElemPopup = (e, popup, sectionBreak) => {
        e.stopPropagation();
        this.props.showBlocker(true);
        showTocBlocker();
        this.setState({
            popup,
            showDeleteElemPopup: true,
            sectionBreak: sectionBreak ? sectionBreak : null
        });
    }

    /**
     * show Block Code element warning Popup 
     */
     showBlockCodeElemWarningPopup = (e, popup) => {
        e.stopPropagation();
        this.props.showBlocker(true);
        showTocBlocker();
        this.setState({
            popup,
            showBlockCodeElemPopup: true
        });
    }

    /**
     * For deleting slate level element
     */
    deleteElement = (e) => {
        let { id, type, contentUrn } = this.props.element;
        let { parentUrn, asideData, element, poetryData, parentElement, showHideType, index } = this.props;
        //let { contentUrn } = this.props.element
        //let index = this.props.index

        if (this.state.sectionBreak) {
            parentUrn = {
                elementType: element.type,
                manifestUrn: element.id,
                contentUrn: element.contentUrn,
            }
            if (this.props.parentUrn?.elementType === "group") {
                parentUrn = {
                    ...parentUrn,
                    multiColumnType: this.props.parentUrn.multiColumnType,
                    multiColumnDetails: {
                        columnName: this.props.parentUrn.columnName,
                        columnId: this.props.parentUrn.manifestUrn,
                        mcId: this.props.parentUrn.mcId,
                        type: "groupedcontent"
                    }
                }
            }
            contentUrn = this.state.sectionBreak.contentUrn
            id = this.state.sectionBreak.id
        }
        const containerElements = {
            parentUrn,
            asideData,
            poetryData,
            parentElement,
            showHideObj: {
                currentElement: element,
                element: parentElement,
                index: index,
                showHideType
            },
            isSectionBreak: this.state.sectionBreak ?? {}
        }
        this.handleCommentPopup(false, e);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        // api needs to run from here
        if (parentElement?.type === elementTypeConstant.SHOW_HIDE) {// || element.type === elementTypeConstant.SHOW_HIDE
            this.props.deleteElementAction(id, type, index, this.props.element, containerElements, this.props.showBlocker);
        }
        else {
            this.props.deleteElement(id, type, parentUrn, asideData, contentUrn, index, poetryData, this.props.element, null);
        }
        this.setState({
            sectionBreak: null
        })
    }

    /**
     * Updates figuredata to local store
     * @param {*} figureData updated figuredata object
     * @param {*} index index of figure element
     * @param {*} cb callback method
     */
    updateFigureData = (figureData, index, elementId, asideData, cb) => {
        this.props.updateFigureData(figureData, index, elementId, asideData, cb)
    }

    toolbarHandling = (action = "") => {
        let toolbar = document.querySelector('div#tinymceToolbar .tox-toolbar')
        if (action === "add") {
            toolbar?.classList?.add("disable");
        } else if (action === "remove") {
            toolbar?.classList?.remove("disable");
        }
    }

    /**
   * @description - createPoetryElements is responsible for creating the Label,title,caption.credit for poetry element
   * @param {*} poetryField is value of the field ie. label, title etc of poetry element
   * @param {*} index
   * @param {*} parentElement
   */
    createPoetryElements = (poetryField, forceupdate, index, parentElement) => {
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        config.popupCreationCallInProgress = true
        if (!config.poetryElementCreationInProgress) {
            const { showHideType } = this.props;
            config.poetryElementCreationInProgress = poetryField === "creditsarray" ? true : false
            if(parentElement && Object.keys(parentElement).length && showHideType) parentElement["showHideType"] = showHideType;
            this.props.createPoetryUnit(poetryField, parentElement, (currentElementData) =>
                this.handleBlur(forceupdate, currentElementData, index, showHideType), index, config.slateManifestURN, this.props?.element)
        }
    }

    toggleCopyMenu = (value, copyClickedX, copyClickedY) => {
        this.copyClickedX = copyClickedX;
        this.copyClickedY = copyClickedY;
        this.setState({ showCopyPopup: value })
    }

    /**
     * Handling border style and properties
     * @param {*} elemBorderToggleFromProp Slate level border based on toggle
     * @param {*} borderToggleFromState Element level border based on focus
     */
    setBorderToggle = (elemBorderToggleFromProp, borderToggleFromState) => {
        if (elemBorderToggleFromProp !== 'undefined' && elemBorderToggleFromProp) {
            if (borderToggleFromState == 'active') {
                return borderToggleFromState
            }
            else {
                return 'showBorder'
            }
        }
        else {
            if (borderToggleFromState == 'active') {
                return borderToggleFromState
            }
            else {
                return 'hideBorder'
            }
        }
    }

    /**
    * @description - getPopupChildUrns is responsible for creating an array of wUrn of child elements of Popup Element
    * @param {*} element active element - Popup
    */
    getPopupChildUrns = (element) => {
        let popupChildUrns = [];
        if (element && element.type == 'popup') {
            if (element.popupdata && element.popupdata.bodymatter && element.popupdata.bodymatter.length > 0) {
                popupChildUrns.push(element.popupdata.bodymatter[0].id);
            }
            if (element.popupdata && element.popupdata['formatted-title']) {
                popupChildUrns.push(element.popupdata['formatted-title'].id);
            }
            if (element.popupdata && element.popupdata.postertextobject[0]) {
                popupChildUrns.push(element.popupdata.postertextobject[0].id);
            }
        }
        return popupChildUrns
    }

    /**
     * Gives TCM and feedback status for showhide element
     * @param {Array} tcmData tcm data for elements on the slate
     * @param {Object} element active element id
     * @param {String} defaultWorkUrn work urn test string
     * @param {String} defaultManifestUrn manifest urn test string
     */
    getShowHideTCMStatus = (tcmData, element, defaultWorkUrn, defaultManifestUrn) => {
        let tcmStatus = {};
        const showHideChildren = getShowhideChildUrns(element);
        let showHideTcmCount = 0;
        let status = {
            tcm: false,
            feedback: false
        };
        tcmStatus = this.checkTCMStatus(tcmData, element.id, defaultManifestUrn)
        if (tcmStatus.tcm || tcmStatus.feedback) {
            return tcmStatus;
        } else {
            tcmStatus.tcm = false;
            tcmStatus.feedback = false;
            for (const child of showHideChildren) {
                if (showHideTcmCount < 1) {
                    status = this.checkTCMStatus(tcmData, child, defaultWorkUrn)
                    if (status && (status.tcm || status.feedback)) {
                        showHideTcmCount++;
                    }
                } else {
                    break;
                }
            }
        }
        tcmStatus.tcm = status.tcm
        tcmStatus.feedback = status.feedback
        return tcmStatus
    }

    handleAudioPopupLocation = (status, position) => {
        this.setState({
            audioPopupStatus: status,
            position: position
        })
    }

    handleAssetsPopupLocation = (status, position) => {
        this.setState({
            assetsPopupStatus: status,
            position: position
        })
    }
    /**
    * @description - checkTCMStatus is responsible for setting the tcm status for the element
    * @param {*} tcmData tcm data for elements on the slate
    * @param {*} element active element id
    */
    checkTCMStatus = (tcmData, elementId, defaultUrn) => {
        let tcmButtonStatus = {}, tcm, feedback;
        tcm = tcmData.filter(tcmelm => {
            let elementUrn = tcmelm.elemURN;
            return (elementId.includes(defaultUrn) && elementUrn.indexOf(elementId) !== -1) && tcmelm.txCnt && tcmelm.txCnt > 0
        }).length > 0;
        feedback = tcmData.filter(feedbackelm => {
            let elementUrn = feedbackelm.elemURN;
            return (elementId.includes(defaultUrn) && elementUrn.indexOf(elementId) !== -1) && feedbackelm.feedback && feedbackelm.feedback !== null
        }).length > 0;
        tcmButtonStatus = {
            tcm: tcm,
            feedback: feedback
        }
        return tcmButtonStatus;
    }
    /**
    * @description - showTCMButton is responsible for showing the tcm/feedback icon on the element
    * @param {*} tcmData tcm data for elements on the slate
    * @param {*} element active element
    */
    showTCMButton = (tcmData, element) => {
        let tcmStatus = {};
        let defaultWorkUrn = 'urn:pearson:work';
        let defaultManifestUrn = 'urn:pearson:manifest';
        if (element.type == 'popup') {
            let popupChildren = this.getPopupChildUrns(element);
            let popupTcmCount = 0;
            let status = {
                tcm: false,
                feedback: false
            };
            tcmStatus = this.checkTCMStatus(tcmData, element.id, defaultManifestUrn)
            if (tcmStatus && (tcmStatus.tcm || tcmStatus.feedback)) {
                return tcmStatus;
            } else {
                tcmStatus.tcm = false;
                tcmStatus.feedback = false;
                for (let index = 0; index < popupChildren.length; index++) {
                    if (popupTcmCount < 1) {
                        status = this.checkTCMStatus(tcmData, popupChildren[index], defaultWorkUrn)
                        if (status && (status.tcm || status.feedback)) {
                            popupTcmCount++;
                        }
                    } else {
                        break;
                    }
                }
            }
            tcmStatus.tcm = status.tcm
            tcmStatus.feedback = status.feedback
        }
        else if (element.type === 'showhide') {
            tcmStatus = this.getShowHideTCMStatus(tcmData, element, defaultWorkUrn, defaultManifestUrn)
        }
        else {
            tcmStatus = this.checkTCMStatus(tcmData, element.id, defaultWorkUrn)
        }
        return tcmStatus;
    }

    /**
     * Render Element function takes current element from bodymatter and render it into current slate 
     * @param {element} 
    */
    renderElement = (element = {}) => {
        let editor = '';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo, permissions, allComments, splithandlerfunction, tcmData, spellCheckToggle } = this.props;
        let labelText = fetchElementTag(element, index);
        config.elementToolbar = this.props.activeElement.toolbar || [];
        let anyOpenComment = allComments?.filter(({ commentStatus, commentOnEntity }) => commentOnEntity === element.id).length > 0
        let anyFlaggedComment = allComments?.filter(({ commentFlag, commentOnEntity }) => commentOnEntity === element.id && commentFlag).length > 0
        let isQuadInteractive = "";
        /** Handle TCM for tcm enable elements */
        let tcm = false;
        let feedback = false;
        let tcmStatus = {};
        tcmStatus = this.showTCMButton(tcmData, element)
        tcm = tcmStatus.tcm
        feedback = tcmStatus.feedback

        /* TODO need better handling with a function and dynamic component rendering with label text*/
        const commonProps = {
            index,
            elementId: element.id,
            permissions,
            slateLockInfo,
            handleBlur: this.handleBlur,
            handleFocus: this.handleFocus,
            showHideType: this.props?.showHideType,
            parentElement: this.props?.parentElement,
            glossaryFootnoteValue: this.props.glossaryFootnoteValue,
            glossaaryFootnotePopup: this.props.glossaaryFootnotePopup,
            openAssetPopoverPopUp: this.openAssetPopoverPopUp,
            openGlossaryFootnotePopUp: this.openGlossaryFootnotePopUp,
            handleAudioPopupLocation: this.handleAudioPopupLocation,
            handleAssetsPopupLocation: this.handleAssetsPopupLocation,
            openMarkedIndexPopUp: this.openMarkedIndexPopUp,
            markedIndexValue: this.props.markedIndexValue,
            markedIndexPopup:this.props.markedIndexPopup

        }
        if (labelText) {
            switch (element.type) {
                case elementTypeConstant.ASSESSMENT_SLATE:
                    editor = <AssessmentSlateCanvas openCustomPopup={this.props.openCustomPopup} permissions={permissions} model={element} elementId={element.id} handleBlur={this.handleBlurAssessmentSlate} handleFocus={this.handleFocus} showBlocker={this.props.showBlocker} slateLockInfo={slateLockInfo} isLOExist={this.props.isLOExist} />
                    labelText = 'AS'
                    break;
                case elementTypeConstant.OPENER:
                    const { activeColorIndex, activeTextColorIndex } = this.state
                    editor = <OpenerElement accessDenied={this.props.accessDenied} permissions={permissions} backgroundColor={config.colors[activeColorIndex]} textColor={config.textcolors[activeTextColorIndex]} index={index} onClick={this.handleFocus} handleBlur={this.handleBlur} elementId={element.id} element={element} slateLockInfo={slateLockInfo} updateElement={this.updateOpenerElement} />
                    labelText = 'OE'
                    break;
                case elementTypeConstant.AUTHORED_TEXT:
                    editor = <ElementAuthoring isBlockList={this.props.isBlockList} element={element} model={element.html} onListSelect={this.props.onListSelect} parentManifestListItem={this?.props?.parentManifestListItem} {...commonProps} placeholder={this.props.placeholder}/>;
                    break;
                case elementTypeConstant.BLOCKFEATURE:
                    editor = <ElementAuthoring tagName="blockquote" element={element} onListSelect={this.props.onListSelect} model={element.html} {...commonProps} />;
                    break;
                case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
                    editor = <ElementLearningObjectiveItem model={element.html} element={element} {...commonProps} />;
                    break;
                case elementTypeConstant.FIGURE:
                    switch (element.figuretype) {
                        case elementTypeConstant.FIGURE_IMAGE:
                        case elementTypeConstant.FIGURE_TABLE:
                        case elementTypeConstant.FIGURE_MATH_IMAGE:
                            editor = <FigureImage model={element} showBlocker={this.props.showBlocker} accessDenied={this.props.accessDenied} asideData={this.props.asideData} updateFigureData={this.updateFigureData} {...commonProps}/>
                            break;
                        case elementTypeConstant.FIGURE_TABLE_EDITOR:
                        case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        case elementTypeConstant.FIGURE_CODELISTING:
                            editor = <FigureImage model={element} accessDenied={this.props.accessDenied} asideData={this.props.asideData} updateFigureData={this.updateFigureData} parentEntityUrn={this.props.parentUrn} {...commonProps} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_AUDIO:
                        case elementTypeConstant.FIGURE_VIDEO:
                            editor = <ElementAudioVideo model={element} showBlocker={this.props.showBlocker} accessDenied={this.props.accessDenied} asideData={this.props.asideData} updateFigureData={this.updateFigureData} parentEntityUrn={this.props.parentUrn} {...commonProps} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                            editor = <ElementSingleAssessment openCustomPopup={this.props.openCustomPopup} accessDenied={this.props.accessDenied} updateFigureData={this.updateFigureData} showBlocker={this.props.showBlocker} permissions={permissions} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo} parentElement={this.props?.parentElement} />;
                            labelText = 'Qu';
                            break;
                        case elementTypeConstant.INTERACTIVE:
                            editor = <ElementInteractive accessDenied={this.props.accessDenied} asideData={this.props.asideData} showBlocker={this.props.showBlocker} updateFigureData={this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} handleAudioPopupLocation={this.handleAudioPopupLocation} editInteractiveId={this.state.editInteractiveId} parentElement={this.props?.parentElement} handleAssetsPopupLocation={this.handleAssetsPopupLocation} />;
                            labelText = LABELS[element.figuredata.interactiveformat];
                            isQuadInteractive = labelText === "Quad" ? "quad-interactive" : "";
                            break;
                    }
                    break;
                case elementTypeConstant.ELEMENT_LIST:
                    editor = <ListElement showBlocker={this.props.showBlocker} permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} markedIndexValue={this.props.markedIndexValue} openMarkedIndexPopUp={this.openMarkedIndexPopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} handleAudioPopupLocation={this.handleAudioPopupLocation} parentElement={this.props?.parentElement} handleAssetsPopupLocation={this.handleAssetsPopupLocation} showHideType={this.props?.showHideType} />;
                    labelText = 'OL'
                    if ((element.subtype || element.elementdata.subtype) === 'disc')
                        labelText = 'UL'
                    break;
                case elementTypeConstant.ELEMENT_ASIDE:
                    editor = <ElementAsideContainer
                        handleCommentspanel={handleCommentspanel}
                        permissions={permissions}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        showBlocker={this.props.showBlocker}
                        setActiveElement={this.props.setActiveElement}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        btnClassName={this.state.btnClassName}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        elementSepratorProps={elementSepratorProps}
                        deleteElement={this.deleteElement}
                        index={index}
                        element={element}
                        elementId={element.id}
                        type={element.type}
                        slateLockInfo={slateLockInfo}
                        updatePageNumber={this.props.updatePageNumber}
                        isBlockerActive={this.props.isBlockerActive}
                        onClickCapture={this.props.onClickCapture}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        onListSelect={this.props.onListSelect}
                        splithandlerfunction={splithandlerfunction}
                        pasteElement={this.props.pasteElement}
                        userRole={this.props.userRole}
                        handleAudioPopupLocation={this.handleAudioPopupLocation}
                        parentElement={this.props.parentElement}
                        handleAssetsPopupLocation={this.handleAssetsPopupLocation}
                        markedIndexValue= {this.props.markedIndexValue}
                        markedIndexPopup= {this.props.markedIndexPopup}
                        showHideType = {this.props.showHideType}
                        handleCopyPastePopup={this.props.handleCopyPastePopup}
                    />;
                    break;
                case elementTypeConstant.METADATA_ANCHOR:
                    editor = <ElementMetaDataAnchor showBlocker={this.props.showBlocker} permissions={permissions} handleBlur={this.handleBlur} handleFocus={this.handleFocus} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} />;
                    labelText = 'LO'
                    break;
                case elementTypeConstant.METADATA_ANCHOR_LO_LIST:
                    editor = <ElementMetaLOList showBlocker={this.props.showBlocker} permissions={permissions} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onClick={this.handleFocus} />;
                    labelText = 'MA'
                    break;
                case elementTypeConstant.POOPUP_ELEMENT:
                    editor = <ElementPopup showBlocker={this.props.showBlocker}
                        permissions={permissions} handleFocus={this.handleFocus}
                        handleBlur={this.handleBlur}
                        index={index}
                        elementId={element.id}
                        element={element}
                        model={element.html}
                        slateLockInfo={slateLockInfo}
                        onClick={this.handleFocus}
                        openPopupSlate={this.props.openPopupSlate}
                        accessDenied={this.props.accessDenied}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        activeElement={this.props.activeElement}
                        handleAudioPopupLocation={this.handleAudioPopupLocation}
                        handleAssetsPopupLocation={this.handleAssetsPopupLocation}
                        parentElement={this.props?.parentElement}
                    />;
                    labelText = 'Pop'
                    break;
                case elementTypeConstant.SHOW_HIDE:
                    editor = <ShowHide
                        onListSelect={this.props.onListSelect}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        setActiveElement={this.props.setActiveElement}
                        btnClassName={this.state.btnClassName}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        deleteElement={this.deleteElement}
                        showHideId={this.props.showHideId}
                        //createShowHideElement = {this.props.createShowHideElement}
                        //deleteShowHideUnit = {this.props.deleteShowHideUnit}
                        activeElement={this.props.activeElement}
                        showBlocker={this.props.showBlocker}
                        permissions={permissions}
                        handleFocus={this.handleFocus}
                        handleBlur={this.handleBlur}
                        index={index}
                        element={element}
                        elementId={element.id}
                        type={element.type}
                        updatePageNumber={this.props.updatePageNumber}
                        isBlockerActive={this.props.isBlockerActive}
                        slateLockInfo={slateLockInfo}
                        onClick={this.handleFocus}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        openAssetPopoverPopUp={this.openAssetPopoverPopUp}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        getElementStatus={this.props.getElementStatus}
                        userRole={this.props.userRole}
                        elementSepratorProps={elementSepratorProps}
                        onClickCapture={this.props.onClickCapture}
                        asideData={this.props?.asideData}
                        parentUrn={this.props?.parentUrn}
                        handleCommentspanel={handleCommentspanel}
                        pasteElement={this.props.pasteElement}
                        splithandlerfunction={splithandlerfunction}
                    />;
                    labelText = 'SH'
                    break;

                case elementTypeConstant.CITATION_GROUP:
                    editor = <CitationGroupContext.Provider value={{
                        activeElement: this.props.activeElement,
                        showBlocker: this.props.showBlocker,
                        permissions: permissions,
                        index: index,
                        element: element,
                        slateLockInfo: slateLockInfo,
                        updatePageNumber: this.props.updatePageNumber,
                        handleCommentspanel: handleCommentspanel,
                        isBlockerActive: this.props.isBlockerActive,
                        onClickCapture: this.props.onClickCapture,
                        elementSeparatorProps: elementSepratorProps,
                        setActiveElement: this.props.setActiveElement,
                        parentElement: this.props.parentElement,
                        showHideType: this.props.showHideType,
                        asideData: this.props.asideData,
                        handleFocus: this.handleFocus,
                        handleBlur: this.handleBlur,
                        deleteElement: this.deleteElement,
                    }}><CitationGroup userRole={this.props.userRole} pasteElement={this.props.pasteElement}
                        />
                    </CitationGroupContext.Provider >;
                    labelText = 'CG'
                    break;
                case elementTypeConstant.CITATION_ELEMENT:
                    editor = <CitationElement
                        activeElement={this.props.activeElement}
                        showBlocker={this.props.showBlocker}
                        permissions={permissions}
                        index={index}
                        element={this.props.parentElement}
                        showHideType={this.props.showHideType}
                        model={element.html}
                        slateLockInfo={slateLockInfo}
                        updatePageNumber={this.props.updatePageNumber}
                        currentElement={element}
                        handleFocus={this.handleFocus}
                        handleBlur={this.handleBlur}
                        asideData={this.props.asideData}
                    />
                    labelText = 'CT'
                    break;
                case elementTypeConstant.POETRY_ELEMENT:
                    editor = <ElementPoetry index={index}
                        asideData={this.props.asideData}
                        accessDenied={this.props.accessDenied}
                        handleCommentspanel={handleCommentspanel}
                        updateFigureData={this.updateFigureData}
                        permissions={permissions}
                        showBlocker={this.props.showBlocker}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        handleFocus={this.handleFocus}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        handleBlur={this.handleBlur}
                        model={element}
                        element={element}
                        slateLockInfo={slateLockInfo}
                        setActiveElement={this.props.setActiveElement}
                        deleteElement={this.deleteElement}
                        btnClassName={this.state.btnClassName}
                        isBlockerActive={this.props.isBlockerActive}
                        tagName={"div"}
                        currentElement={element}
                        updatePageNumber={this.props.updatePageNumber}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        elementId={element.id}
                        createPoetryElements={this.createPoetryElements}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        onClickCapture={this.props.onClickCapture}
                        onListSelect={this.props.onListSelect}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        elementSepratorProps={elementSepratorProps}
                        pasteElement={this.props.pasteElement}
                        userRole={this.props.userRole}
                        parentUrn={this.props?.parentUrn}
                        parentElement={this.props.parentElement}
                        showHideType = {this.props.showHideType}
                    />
                    labelText = 'PE'
                    break;
                case elementTypeConstant.POETRY_STANZA:
                    editor = <ElementPoetryStanza index={index}
                        asideData={this.props.asideData}
                        permissions={permissions}
                        openAssetPopoverPopUp={this.openAssetPopoverPopUp}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        handleFocus={this.handleFocus}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        handleBlur={this.handleBlur}
                        setActiveElement={this.props.setActiveElement}
                        handleCommentspanel={handleCommentspanel}
                        deleteElement={this.deleteElement}
                        updatePageNumber={this.props.updatePageNumber}
                        btnClassName={this.state.btnClassName}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        elementId={element.id}
                        tagName={"div"}
                        element={element}
                        model={element}
                        parentElement={this.props.parentElement}
                        slateLockInfo={slateLockInfo}
                        onListSelect={this.props.onListSelect}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        handleAudioPopupLocation={this.handleAudioPopupLocation}
                        handleAssetsPopupLocation={this.handleAssetsPopupLocation}
                    />
                    labelText = 'ST'
                    break;

                case elementTypeConstant.MULTI_COLUMN:
                    // checking if labelText is 3C to render 3 column component
                    if (labelText === MULTI_COLUMN_3C.ELEMENT_TAG_NAME) {
                        editor = editor = <MultiColumnContext.Provider value={{
                            activeElement: this.props.activeElement,
                            showBlocker: this.props.showBlocker,
                            permissions: permissions,
                            index: index,
                            element: element,
                            slateLockInfo: slateLockInfo,
                            handleCommentspanel: handleCommentspanel,
                            isBlockerActive: this.props.isBlockerActive,
                            onClickCapture: this.props.onClickCapture,
                            elementSepratorProps: elementSepratorProps,
                            setActiveElement: this.props.setActiveElement,
                            onListSelect: this.props.onListSelect,
                            handleFocus: this.handleFocus,
                            handleBlur: this.handleBlur,
                            deleteElement: this.deleteElement,
                            splithandlerfunction: this.props.splithandlerfunction,
                        }}><MultipleColumnContainer labelText={labelText} userRole={this.props.userRole} pasteElement={this.props.pasteElement}  handleCopyPastePopup={this.props.handleCopyPastePopup} />
                        </MultiColumnContext.Provider>;
                    } else {
                        labelText = MULTI_COLUMN_2C.ELEMENT_TAG_NAME
                        editor = <MultiColumnContext.Provider value={{
                            activeElement: this.props.activeElement,
                            showBlocker: this.props.showBlocker,
                            permissions: permissions,
                            index: index,
                            element: element,
                            slateLockInfo: slateLockInfo,
                            handleCommentspanel: handleCommentspanel,
                            isBlockerActive: this.props.isBlockerActive,
                            onClickCapture: this.props.onClickCapture,
                            elementSepratorProps: elementSepratorProps,
                            setActiveElement: this.props.setActiveElement,
                            onListSelect: this.props.onListSelect,
                            handleFocus: this.handleFocus,
                            handleBlur: this.handleBlur,
                            deleteElement: this.deleteElement,
                            splithandlerfunction: this.props.splithandlerfunction,
                        }}><MultipleColumnContainer labelText={labelText} userRole={this.props.userRole} pasteElement={this.props.pasteElement}  handleCopyPastePopup={this.props.handleCopyPastePopup} />
                        </MultiColumnContext.Provider>;
                    }
                    break;

                case elementTypeConstant.ELEMENT_DIALOGUE:
                    editor = <ElementDialogue
                        permissions={permissions}
                        btnClassName={this.state.btnClassName}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        elementSepratorProps={elementSepratorProps}
                        index={index}
                        element={element}
                        elementId={element.id}
                        slateLockInfo={slateLockInfo}
                        asideData={this.props?.asideData}
                        parentUrn={this.props?.parentUrn}
                        userRole={this.props.userRole}
                        activeElement={this.props.activeElement}
                        onClickCapture={this.props.onClickCapture}
                        showBlocker={this.props.showBlocker}
                        setActiveElement={this.props.setActiveElement}
                        parentElement={this.props.parentElement}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        deleteElement={this.deleteElement}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        handleAudioPopupLocation={this.handleAudioPopupLocation}
                        handleAssetsPopupLocation={this.handleAssetsPopupLocation}
                    />;
                    labelText = 'PS'
                    break;
                case elementTypeConstant.ELEMENT_DISCUSSION:
                    editor = <ElementDiscussion
                        permissions={permissions}
                        btnClassName={this.state.btnClassName}
                        borderToggle={this.state.borderToggle}
                        elemBorderToggle={this.props.elemBorderToggle}
                        elementSepratorProps={elementSepratorProps}
                        index={index}
                        element={element}
                        elementId={element.id}
                        slateLockInfo={slateLockInfo}
                        // splithandlerfunction={splithandlerfunction}
                        userRole={this.props.userRole}
                        activeElement={this.props.activeElement}
                        onClickCapture={this.props.onClickCapture}
                        showBlocker={this.props.showBlocker}
                        setActiveElement={this.props.setActiveElement}
                        parentElement={this.props.parentElement}
                        showDeleteElemPopup={this.showDeleteElemPopup}
                        handleBlur={this.handleBlur}
                        handleFocus={this.handleFocus}
                        deleteElement={this.deleteElement}
                    />
                    labelText = 'DI'
                    break;

                case elementTypeConstant.PDF_SLATE:
                    editor = <PdfSlate
                        permissions={permissions}
                        index={index}
                        element={element}
                        slateLockInfo={slateLockInfo}
                        userRole={this.props.userRole}
                        activeElement={this.props.activeElement}
                        showBlocker={this.props.showBlocker}
                        parentElement={this.props.parentElement}
                        handleFocus={this.handleFocus}
                        handleBlur={this.handleBlur}
                        model={this.props.model}
                    />;
                    labelText = 'PDF'
                    break;

                case elementTypeConstant.BLOCK_LIST:
                    editor = <BlockListWrapper grandParentManifestList={this.props?.currentManifestList} asideData={this.props?.asideData} indexTemp={this.props.indexTemp || ''} element={element} onListSelect={this.props.onListSelect} onClickCapture={this.props.onClickCapture} showBlocker={this.props.showBlocker} borderToggle={this.state.borderToggle} handleCommentspanel={handleCommentspanel} parentManifestListItem={this?.props?.parentManifestListItem} {...commonProps} isBlockList={true}/>;
                    labelText = 'BL'
                    break;

            }
        } else {
            editor = <p className="incorrect-data">Incorrect Data - {element.id}</p>;
        }

        let borderToggle = this.setBorderToggle(this.props.elemBorderToggle, this.state.borderToggle)
        let btnClassName = this.state.btnClassName;
        let bceOverlay = "";
        let elementOverlay = '';
        let showEditButton = checkFullElmAssessment(element) || checkEmbeddedElmAssessment(element, this.props.assessmentReducer) || checkInteractive(element) || checkFigureMetadata(element, 'editButton');
        let showAlfrescoExpandButton = checkFigureMetadata(element, 'alfrescoExpandButton')
        if (!hasReviewerRole() && this.props.permissions && !(this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) {
            elementOverlay = <div className="element-Overlay disabled" onClick={() => this.handleFocus()}></div>
        }
        if (element.type === elementTypeConstant.FIGURE && element.figuretype === elementTypeConstant.FIGURE_CODELISTING) {
            if ((element.figuredata && element.figuredata.programlanguage && element.figuredata.programlanguage == "Select") || (this.props.activeElement.secondaryOption === "secondary-blockcode-language-default" && this.props.activeElement.elementId === element.id)) {
                bceOverlay = <div className="bce-overlay disabled" onClick={(event) => {this.handleFocus("", "", event);this.showBlockCodeElemWarningPopup(event,true);}}></div>;
                borderToggle = (this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? 'showBorder' : 'hideBorder';
                btnClassName = '';
            }
        }

        // Check if searched URN match the element URN
        let searched = '';
        if (this.props.searchUrn !== '' && this.props.searchUrn === element.id) {
            searched = 'searched';
        }

        let selection = '';
        let selectionOverlay = '';
        if (this.props.elementSelection && Object.keys(this.props.elementSelection).length > 0 &&
            'element' in this.props.elementSelection && element.id === this.props.elementSelection.element.id &&
            'activeAnimation' in this.props.elementSelection && this.props.elementSelection.activeAnimation) {
            selection = 'copy';
            if ('operationType' in this.props.elementSelection && this.props.elementSelection.operationType === 'cut') {
                selection = 'cut';
                selectionOverlay = <div className="element-Overlay disabled"></div>;
            }
        }

        let noTCM = ['TE', 'PS', 'MA', 'DE'];
        if (noTCM.indexOf(labelText) >= 0) {
            tcm = false;
        }

        /* @hideDeleteBtFor@ List of slates where DeleteElement Button is hidden */
        const hideDeleteBtFor = [SLATE_TYPE_ASSESSMENT, SLATE_TYPE_PDF];
        const inContainer = this.props.parentUrn ? true : false;
        let { projectSharingRole, projectSubscriptionDetails } = this.props.projectInfo;
        let isOwner = isOwnerRole(projectSharingRole, projectSubscriptionDetails?.isSubscribed);
        return (
                <div className={`editor ${searched} ${selection}`} data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClickCapture={(e) => this.props.onClickCapture(e)}>
                    {this.renderCopyComponent(this.props, index, inContainer, tcm)}
                    {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                        <Button type="element-label"  elementType={element?.type} btnClassName={`${btnClassName} ${isQuadInteractive} ${this.state.isOpener ? ' ignore-for-drag' : ''}`} labelText={labelText} copyContext={(e) => { OnCopyContext(e, this.toggleCopyMenu) }} onClick={(event) => this.labelClickHandler(event)} />
                        {/* Render 3 column labels when labelText is 3C OR Render 2 column labels when labelText is 2C*/}
                        {(labelText === MULTI_COLUMN_3C.ELEMENT_TAG_NAME || MULTI_COLUMN_2C.ELEMENT_TAG_NAME) && <div>{this.renderMultipleColumnLabels(element)}</div>}
                        {permissions && permissions.includes('elements_add_remove') && !hasReviewerRole() && !(hideDeleteBtFor.includes(config.slateType)) ? (<Button type="delete-element" elementType={element?.type} onClick={(e) => this.showDeleteElemPopup(e, true)} />)
                            : null}
                        {this.renderColorPaletteButton(element, permissions)}
                        {this.renderColorTextButton(element, permissions)}
                    </div>
                        : ''}
                    <div className={`element-container ${(labelText.toLowerCase() == "2c" || labelText.toLowerCase() == "3c") ? "multi-column" : "" + labelText.toLowerCase()} ${borderToggle}`} data-id={element.id} onFocus={() => this.toolbarHandling('remove')} onBlur={() => this.toolbarHandling('add')} onClick={(e) => this.handleFocus("", "", e, labelText)} spellcheck={`${spellCheckToggle}`}>
                        {selectionOverlay}{elementOverlay}{bceOverlay}{editor}
                        {/* {this.state.audioPopupStatus && <OpenAudioBook closeAudioBookDialog={()=>this.handleAudioPopupLocation(false)} isGlossary ={true} position = {this.state.position}/>} */}
                        {this.state.assetsPopupStatus && <OpenGlossaryAssets closeAssetsPopup={() => { this.handleAssetsPopupLocation(false) }} position={this.state.position} isImageGlossary={true} isGlossary={true} />}
                    </div>
                    {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                        {permissions && permissions.includes('notes_adding') && !anyOpenComment && <Button type="add-comment" btnClassName={btnClassName}  elementType={element?.type} onClick={ (e) => this.addOrViewComment(e, element.id,'addComment')} />}          
                        {permissions && permissions.includes('note_viewer') && (anyOpenComment && !anyFlaggedComment) && <Button elementId={element.id} btnClassName={btnClassName} onClick={(e) => this.addOrViewComment(e, element.id,'viewComment')} type="view-comment" elementType={element?.type} />}
                        {permissions && permissions.includes('note_viewer') && (anyOpenComment && anyFlaggedComment) && <Button elementId={element.id} btnClassName={btnClassName} onClick={(e) => this.addOrViewComment(e, element.id,'viewComment')} type="comment-flagged" elementType={element?.type} />}
                     {  /* edit-button-cypressplus will launch you to cypressplus spa within same pdf*/}
                     {permissions && permissions?.includes('access-to-cypress+') && element?.type === elementTypeConstant.PDF_SLATE && config?.isCypressPlusEnabled && config?.SHOW_CYPRESS_PLUS &&  element?.elementdata?.conversionstatus
                        && <Button type="edit-button-cypressplus" btnClassName={btnClassName}  elementType={element?.type} onClick={(e)=>{this.handleEditInCypressPlus(e,element?.id)}}/>
                        }
                        {permissions && permissions.includes('elements_add_remove') && showEditButton && <Button type="edit-button" btnClassName={btnClassName} onClick={(e) => this.handleEditButton(e)} />}
                        {permissions && permissions.includes('elements_add_remove') && showAlfrescoExpandButton && <Button type="alfresco-metadata" btnClassName={btnClassName} onClick={(e) => this.handleAlfrescoMetadataWindow(e)} />}
                        {feedback ? <Button elementId={element.id} type="feedback" onClick={(event) => this.handleTCMLaunch(event, element)} /> : (tcm && <Button type="tcm" onClick={(event) => this.handleTCMLaunch(event, element)} />)}
                    </div> : ''}
                    {this.state.popup && <PopUp
                        togglePopup={this.handleCommentPopup}
                        active={this.state.popup}
                        handleChange={this.handleCommentChange}
                        saveContent={this.saveNewComment}
                        rows={COMMENTS_POPUP_ROWS}
                        dialogText={COMMENTS_POPUP_DIALOG_TEXT}
                        isOwnerSlate={isOwner}
                        warningHeaderText={`Warning`}
                        OwnersDeleteDialogText={OWNERS_ELM_DELETE_DIALOG_TEXT}
                        showDeleteElemPopup={this.state.showDeleteElemPopup}
                        sectionBreak={this.state.sectionBreak}
                        deleteElement={this.deleteElement}
                        isAddComment={true}
                        projectUsers={this.props.projectUsers}
                        comment={this.state.comment}
                        showBlockCodeElemPopup={this.state.showBlockCodeElemPopup}
                    />}
                    {this.state.isfigurePopup &&
                        <MetaDataPopUp
                            figureUrl={this.state.figureUrl}
                            togglePopup={this.handleFigurePopup}
                            imageId={this.state.imageId}
                            updateFigureData={this.updateFigureData}
                            handleFocus={this.handleFocus}
                            handleBlur={this.handleBlur}
                            element={this.props.element}
                            index={this.props.index}
                            asideData={this.props.asideData}
                        />}
                    {this.props.children &&
                        <PageNumberContext.Consumer>
                            {
                                ({ isPageNumberEnabled }) => this.props.children(this.state.isHovered, isPageNumberEnabled, this.props.activeElement, this.props.permissions)
                            }
                        </PageNumberContext.Consumer>
                    }
                </div >

        );
    }

    // function to render multiple columns for 3 column container based on bodymatter
    renderMultipleColumnLabels = (element) => {
        let activeColumnLabel = "C1"
        for (let propsElementObject of this.props.multipleColumnData) {
            if (propsElementObject.containerId === element.id) {
                activeColumnLabel = propsElementObject.columnIndex;
            }
        }
        if (element && 'groupeddata' in element && element.groupeddata && 'bodymatter' in element.groupeddata &&
            element.groupeddata.bodymatter && element.groupeddata.bodymatter.length > 0) {
            return element.groupeddata.bodymatter.map((bodymatter, index) => {
                return (
                    <Button key={index} btnClassName={activeColumnLabel === `C${index + 1}` ? "activeTagBgColor" : ""} labelText={`C${index + 1}`} onClick={() => this.updateColumnValues(index, element)} type="label-clickable-button" />
                )
            });
        }
    }

    updateColumnValues = (index, element) => {
        if(config.popupCreationCallInProgress){ /** Restrict click on 2C if saving is inprogress PE */
            return false
        }
        let objKey = element.id;
        let multipleColumnObjData = {
            containerId: objKey,
            columnIndex: `C${index + 1}`
        }
        this.props.updateMultipleColumnData(multipleColumnObjData, objKey);
    }

    /**
     * Renders the Cut/Copy Urn/element dialog menu
     * @param {*} _props 
     * @param {*} index 
     * @param {*} inContainer 
     */
    renderCopyComponent = (_props, index, inContainer, tcmFlag) => {
        if (this.state.showCopyPopup) {
            return (
                <CutCopyDialog
                    userRole={_props.userRole}
                    index={index}
                    inContainer={inContainer}
                    tcmFlag={tcmFlag}
                    setElementDetails={this.setElementDetails}
                    element={_props.element}
                    toggleCopyMenu={this.toggleCopyMenu}
                    copyClickedX={this.copyClickedX}
                    copyClickedY={this.copyClickedY}
                    permissions={_props.permissions}
                />
            )
        }
        return null
    }

    /**
     * Sets element details to store
     * @param {*} elementDetails Element details along with type of operation (Cut/Copy)
     */
    setElementDetails = (elementDetails) => {
        let { parentUrn, asideData, element, poetryData } = this.props;
        let { id, type, contentUrn } = element;
        let index = this.props.index;
        let inputType = '';
        let inputSubType = '';
        let cutCopyParentUrn = {};
        if (!parentUrn) {
            cutCopyParentUrn = {
                manifestUrn: config.slateManifestURN,
                contentUrn: config.slateEntityURN
            }
        }
        cutCopyParentUrn.sourceSlateManifestUrn = config.slateManifestURN
        cutCopyParentUrn.slateLevelData = this.props.slateLevelData
        if ('activeElement' in this.props && Object.keys(this.props.activeElement).length > 0 && 'elementType' in this.props.activeElement &&
            'primaryOption' in this.props.activeElement && 'secondaryOption' in this.props.activeElement) {
            let { elementType, primaryOption, secondaryOption } = this.props.activeElement;
            inputType = elementTypes[elementType][primaryOption]['enum'] || '';
            inputSubType = elementTypes[elementType][primaryOption]['subtype'][secondaryOption]['enum'] || '';
        }

        if (elementDetails.element && elementDetails.element.type === "element-blockfeature" &&
            'html' in elementDetails.element && 'text' in elementDetails.element.html) {
            let attribution = (elementDetails.element.html.text).match(new RegExp(`(<p class="blockquoteTextCredit".*?><\/p>)`, 'gi'));

            if (!attribution && (elementDetails.element && elementDetails.element.elementdata && elementDetails.element.elementdata.type !== "pullquote")) {
                inputSubType = "MARGINALIA";
            }
        }

        if (elementDetails.element && elementDetails.element.type === "element-list") {
            elementDetails.element.html.text = elementDetails.element.html.text.replace(/counter-increment:section/g, "counter-increment: section")
        }
        const detailsToSet = {
            ...elementDetails,
            sourceSlateManifestUrn: config.slateManifestURN,
            sourceSlateEntityUrn: config.slateEntityURN,
            sourceEntityUrn: (parentUrn && 'contentUrn' in parentUrn) ? parentUrn.contentUrn : config.slateEntityURN,
            deleteElm: { id, type, parentUrn, asideData, contentUrn, index, poetryData, cutCopyParentUrn },
            inputType,
            inputSubType,
            //type: enum type to be included
            multiColumnType: (element.type === 'groupedcontent' && element?.groupeddata?.bodymatter) ? `${element?.groupeddata?.bodymatter.length}C` : undefined,
            //This property will be remove once BL will be supported in all container elements AS,WE,2C & 3C
            containsBlockList: false
        }

        if ('operationType' in detailsToSet && detailsToSet.operationType === 'cut') {
            let elmUrn = []
            let elmComment

            if (element && element.elementdata?.bodymatter?.length || element.groupeddata?.bodymatter?.length || element.contents?.bodymatter?.length || element.interactivedata || element.popupdata) {
             (this.props.allComments).filter(({ commentOnEntity }) => {
                  if (commentOnEntity === detailsToSet.element.id) { elmUrn.push(detailsToSet.element.id) }
            });
                elmComment = prepareCommentsManagerIcon(slateWrapperConstants.checkTCM(element), element, elmUrn, this.props.allComments);
            } else {
                elmComment = (this.props.allComments).filter(({ commentOnEntity }) => {
                    return commentOnEntity === detailsToSet.element.id
                });
            }
            
            detailsToSet['elmComment'] = elmComment || [];

            let elmFeedback = (this.props.tcmData).filter(({ elemURN }) => {
                return elemURN === detailsToSet.element.id
            });
            detailsToSet['elmFeedback'] = elmFeedback || [];
        }
        const figureTypes = ["image", "mathImage", "table", "video", "audio"]
        const interactiveType = ["3rd-party", "pdf", "web-link", "pop-up-web-link", "table"]
        if ((element?.type === "figure") && (figureTypes.includes(element?.figuretype)) || interactiveType.includes(element?.figuredata?.interactivetype) ) {
            getAlfrescositeResponse(id, (response) => {
                detailsToSet['alfrescoSiteData'] = response
            })
        }
        /**
         Check if Copied ShowHide contains any BlockList Element
         Note:- This piece of code and also the propertry named 
            as 'containsBlockList' in const detailsToSet will be removed once BL will be supported  in AS,WE,2C & 3C
        */
        if(element?.type === 'showhide') {
            let elementsList = [...element?.interactivedata?.show.concat(...element?.interactivedata?.hide)]
            detailsToSet['containsBlockList'] = elementsList.some(item => item.type === 'manifestlist')
        }

        console.log("Element Details action to be dispatched from here", detailsToSet)

        /** Dispatch details to the store */
        this.props.setSelection(detailsToSet);
    }

    /**
     * @description - This function is for handling the closing and opening of popup.
     * @param {event} popup
     */
    handleCommentPopup = (popup, event) => {
        event.stopPropagation();
        if (popup) {
            this.props.showBlocker(true);
            showTocBlocker();
        } else {
            this.props.showBlocker(false);
            hideBlocker();
        }
        this.setState({
            popup,
            showDeleteElemPopup: false,
            showBlockCodeElemPopup: false,
            comment: ""
        });
        if (this.props.isBlockerActive) {
            this.props.showBlocker(false)
            hideBlocker();
        }
        this.props.getProjectUsers();
    }

    handleCommunication = ( elementId ) => {
        sendDataToIframe({
            'type': CanvasActiveElement,
            'message': {"id":elementId, "active":true}
        });   
    }

    addOrViewComment = (e, elementId, type) => {
        const {slateLockInfo} = this.props
        this.props.setActiveElement(this.props.element);
        let lockedUserId = slateLockInfo?.userId?.replace(/.*\(|\)/gi, ''); // Retrieve only PROOT id
        if (slateLockInfo?.isLocked && config.userId === lockedUserId) {
            sendDataToIframe({
                'type': AddOrViewComment,
                'message': { "id": elementId, "mode": type }
            });
        }
        e.stopPropagation();
    }

     /**
     * @description - This function is for opening edit  button in Cypress Plus
     */
    handleEditInCypressPlus = (e,elementId) =>{
        e.stopPropagation();
        const urlCypressPlus=`${config.CYPRESS_PLUS_URL}?project_d_urn=${config.projectUrn}&project_e_urn=${config.projectEntityUrn}&project_manifest_urn=${config.slateManifestURN}&project_w_urn=${elementId}`
        const cypressPlusWindow = window.open(urlCypressPlus ,'_blank')
        config.CYPRESS_PLUS_WINDOW= cypressPlusWindow
       const obj ={type:INCOMING_MESSAGE,message:REFRESH_MESSAGE}
     setTimeout(()=>{
       cypressPlusWindow?.postMessage(obj,urlCypressPlus)
     },2000)
    }
    /**
     * @description - This function is for handling click event on the label button.
     * @param {event}
     */
    labelClickHandler = (event) => {
        event.stopPropagation();
    }

    /**
     * @description - This function is for handleChange of popup.
     * @param newComment
     */
    handleCommentChange = (newComment) => {
        // const commentAdded = newComment.replace(/[\[\]']+/g,'')
        this.setState({
            comment: newComment
        })
    }

    /**
     * @description - This function is for ADD COMMENT API.
     */
    saveNewComment = (e) => {
        const { comment } = this.state;
        const { id } = this.props.element;
        this.props.showBlocker(false);
        hideBlocker();
        if (comment.trim() !== '') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
            this.props.addComment(comment, id, this.props.asideData, this.props.parentUrn);
        }
        this.handleCommentPopup(false, e);
    }

    /**
     * @description - This function is for Open Glossarypopup.
     * @param {} 
     * @param 
     */
    openGlossaryFootnotePopUp = (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup, poetryField) => {
        this.props.glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup, poetryField);
    }

    /**
     * @description - This function is for Open openMarkedIndexPopUp.
     * @param {} 
     * @param 
     */
     openMarkedIndexPopUp = (popUpStatus, popupType, markIndexid, elementId, elementType, index, elementSubType, markIndexText, callback, typeWithPopup, poetryField, isNewIndex) => {
        this.props.markedIndexPopup(popUpStatus, popupType, markIndexid, elementId, elementType, index, elementSubType, markIndexText, callback, typeWithPopup, poetryField, isNewIndex);
    }

    /**
     * @description - This function is for open assest popover.
     */
    openAssetPopoverPopUp = (toggleApoPopup) => {
        authorAssetPopOver(toggleApoPopup)
        // this.props.assetPopoverPopup(toggleApoPopup)
    }

    handleFigurePopup = (togglePopup) => {
        let imageId = this.props?.element?.figuredata?.imageid;
        imageId = imageId.replace('urn:pearson:alfresco:', '');

        this.props.showBlocker(togglePopup);
        this.setState({
            isfigurePopup: togglePopup,
            imageId
        })
        if (togglePopup) {
            showTocBlocker();
        } else {
            hideBlocker();
        }
    }

    /**
     * @description - This function is used to open alfresco metadata in new window.
     */

    handleAlfrescoMetadataWindow = () => {
        let imageId
        switch(this.props?.element?.figuretype){
            case IMAGE:
                imageId=this.props?.element?.figuredata?.imageid
                break;
            case AUDIO :
                imageId=this.props?.element?.figuredata?.audioid
                break;
            case VIDEO:
                imageId=this.props?.element?.figuredata?.videoid
                break;
            case  INTERACTIVE:
                imageId=this.props?.element?.figuredata?.interactiveid
                break;
            default: imageId=null
        }
        imageId = imageId.replace('urn:pearson:alfresco:', '');
        const Url = `${config.ALFRESCO_EDIT_ENDPOINT}${imageId}`
        window.open(Url);
    }

    /**
     * @description - This function is to launch Elm Portal from Cypress.
     * @param event the click event triggered
     */
    handleEditButton = (event) => {
        event.stopPropagation();
        const { element } = this.props;
        const figureImageTypes = ["image", "mathImage", "table"]
        if (element?.type === 'figure' && figureImageTypes.includes(element?.figuretype)) {
            this.handleFigurePopup(true);
        }
        else {
            let fullAssessment = checkFullElmAssessment(element);
            let embeddedAssessment = checkEmbeddedElmAssessment(element);
            const isInteractive = checkInteractive(element);
            let dataToSend = {
                assessmentWorkUrn: fullAssessment ? element.elementdata.assessmentid : embeddedAssessment ? element.figuredata.elementdata.assessmentid : "",
                projDURN: config.projectUrn,
                containerURN: config.slateManifestURN,
                assessmentItemWorkUrn: embeddedAssessment ? element.figuredata.elementdata.assessmentitemid : "",
                interactiveId: isInteractive ? element.figuredata.interactiveid : "",
                elementId: this.props?.element?.id
            }
            handleElmPortalEvents('add', 'fromUpdate');/** Add Elm-Assessment Update eventListener */
            this.props.openElmAssessmentPortal(dataToSend);
            embeddedAssessment && this.props.editElmAssessmentId(element.figuredata.elementdata.assessmentid, element.figuredata.elementdata.assessmentitemid);
            isInteractive && this.setState({ editInteractiveId: element.figuredata.interactiveid });
        }

    }

    handleTCMLaunch = (event, element) => {
        const { AUTHORED_TEXT, ELEMENT_LIST, CITATION_ELEMENT, POETRY_STANZA, BLOCKFEATURE, LEARNING_OBJECTIVE } = TcmConstants
        const tcmPopupSupportedElements = [AUTHORED_TEXT, ELEMENT_LIST, CITATION_ELEMENT, POETRY_STANZA, BLOCKFEATURE, LEARNING_OBJECTIVE]
        const { prevSelectedElement, isTCMCanvasPopupLaunched } = this.props
        if (element?.type && tcmPopupSupportedElements.includes(element.type) && !config.isPopupSlate) {
            this.props.handleTCM(element, this.props.index, isTCMCanvasPopupLaunched, prevSelectedElement)
        } else {
            if (config.isSavingElement) {
                return false
            }
            event.stopPropagation();
            loadTrackChanges(element.id)
        }
    }

    render = () => {
        const { element } = this.props;
        try {
            if (this.state.hasError) {
                return (
                    <p className="incorrect-data">Failed to load element {this.props.element.figuretype}, URN {this.props.element.id}</p>
                )
            }
            return this.renderElement(element);
        } catch (error) {
            return (
                <p className="incorrect-data">Failed to load element {this.props.element.figuretype}, URN {this.props.element.id}</p>
            )
        }
    }

    /**
     * @description - This function is for handling hover on element and showing page numbering box.
     */
    handleOnMouseOver = () => {
        this.setState({ isHovered: true })
    }

    /**
     * @description - This function is for handling mouse out on element and hiding page numbering box.
     */
    handleOnMouseOut = () => {
        this.setState({ isHovered: false })
    }

    static getDerivedStateFromError(error) {
        console.log("Catch Derived Error >>>>", error);
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
}

ElementContainer.defaultProps = {
    element: {}
}

ElementContainer.propTypes = {
    /** Detail of element in JSON object */
    element: PropTypes.object
}

const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (comments, elementId, asideData, ParentUrn) => {
            dispatch(addComment(comments, elementId, asideData, ParentUrn))
        },
        fetchCommentByElement: (elementId) => {
            dispatch(fetchCommentByElement(elementId))
        },
        setActiveElement: (element, index, parentUrn, asideData, updateFromC2Flag, showHideObj) => {
            dispatch(setActiveElement(element, index, parentUrn, asideData, updateFromC2Flag, showHideObj))
        },
        deleteElement: (id, type, parentUrn, asideData, contentUrn, index, poetryData, element) => {
            dispatch(deleteElement(id, type, parentUrn, asideData, contentUrn, index, poetryData, element))
        },
        glossaaryFootnotePopup: (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup, poetryField) => {
            dispatch(glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, typeWithPopup, poetryField)).then(() => {
                if (callback) {
                    callback();
                }
            })
        },
        markedIndexPopup: (popUpStatus, popupType, markIndexid, elementId, elementType, index, elementSubType, markIndexText, callback, typeWithPopup, poetryField, isNewIndex) => {
            dispatch(markedIndexPopup(popUpStatus, popupType, markIndexid, elementId, elementType, index, elementSubType, markIndexText, typeWithPopup, poetryField, isNewIndex)).then(() => {
                if (callback) {
                    callback();
                }
            })
        },
        updateElement: (updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement, poetryData) => {
            dispatch(updateElement(updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement, poetryData))
        },
        updateFigureData: (figureData, index, elementId, asideData, cb) => {
            dispatch(updateFigureData(figureData, index, elementId, asideData, cb))
        },
        updatePageNumber: (pagenumber, elementId, asideData, parentUrn) => {
            dispatch(updatePageNumber(pagenumber, elementId, asideData, parentUrn))
        },
        resetTableDataAction: (isReplaced) => {
            dispatch(resetTableDataAction(isReplaced))
        },
        openPopupSlate: (element) => {
            dispatch(openPopupSlate(element))
        },
        accessDenied,
        releaseSlateLock,
        createShowHideElement: (element, type, index, parentContentUrn, cb, parentElement, parentElementIndex) => {
            dispatch(createShowHideElement(element, type, index, parentContentUrn, cb, parentElement, parentElementIndex))
        },
        deleteShowHideUnit: (id, type, contentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex) => {
            dispatch(deleteShowHideUnit(id, type, contentUrn, index, eleIndex, parentId, cb, parentElement, parentElementIndex))
        },
        createPoetryUnit: (poetryField, parentElement, cb, popupElementIndex, slateManifestURN, element) => {
            dispatch(createPoetryUnit(poetryField, parentElement, cb, popupElementIndex, slateManifestURN, element))
        },
        handleTCMData: () => {
            dispatch(handleTCMData())
        },
        getElementStatus: (elementWorkId, index) => {
            dispatch(getElementStatus(elementWorkId, index))
        },
        openElmAssessmentPortal: (dataToSend) => {
            dispatch(openElmAssessmentPortal(dataToSend))
        },
        fetchAssessmentMetadata: (type, calledFrom, assessmentData, assessmentItemData) => {
            dispatch(fetchAssessmentMetadata(type, calledFrom, assessmentData, assessmentItemData))
        },
        resetAssessmentStore: () => {
            dispatch(resetAssessmentStore())
        },
        setScroll: (type) => {
            dispatch(setScroll(type))
        },
        setSelection: (params) => {
            dispatch(setSelection(params))
        },
        editElmAssessmentId: (assessmentId, assessmentItemId) => {
            dispatch(editElmAssessmentId(assessmentId, assessmentItemId))
        },
        closeTcmPopup: () => {
            dispatch(closeTcmPopup())
        },
        deleteElementAction: (id, type, parentUrn, asideData, contentUrn, index, poetryData, element) => {
            dispatch(deleteElementAction(id, type, parentUrn, asideData, contentUrn, index, poetryData, element))
        },
        updateMultipleColumnData: (multipleColumnObjData, objKey) => {
            dispatch(updateMultipleColumnData(multipleColumnObjData, objKey))
        },
        storeOldAssetForTCM: (data) => {
            dispatch(storeOldAssetForTCM(data))
        },
        handleTCM: (element, index, isTCMCanvasPopupLaunched, prevSelectedElement) => {
            dispatch(handleTCM(element, index, isTCMCanvasPopupLaunched, prevSelectedElement))
        },
        getProjectUsers: () => {
            dispatch(getProjectUsers())
        },
        enableAsideNumbering: (data,id) => {
            dispatch(enableAsideNumbering(data,id))
        },
        updateAsideNumber: (previousElementData, index) => {
            dispatch(updateAsideNumber(previousElementData, index))
        },
        updateAutonumberingOnElementTypeUpdate: (titleHTML, previousElementData, autoNumberedElements, currentSlateAncestorData, slateLevelData) => {
            dispatch(updateAutonumberingOnElementTypeUpdate(titleHTML, previousElementData, autoNumberedElements, currentSlateAncestorData, slateLevelData))
        },
        updateAutonumberingKeysInStore: (dataToSend, autoNumberedElements, currentSlateAncestorData) => {
            dispatch(updateAutonumberingKeysInStore(dataToSend, autoNumberedElements, currentSlateAncestorData))
        },
        handleAutonumberingOnCreate: (type, elementData) => {
            dispatch(handleAutonumberingOnCreate(type, elementData))
        },
        updateAutonumberingOnOverridedCase: (elementType, element, autoNumberedElements, currentSlateAncestorData) => {
            dispatch(updateAutonumberingOnOverridedCase(elementType, element, autoNumberedElements, currentSlateAncestorData))
        },
        updateAutoNumberSequenceOnDelete: (parentIndex, contentUrn, numberedElements) => {
            dispatch(updateAutoNumberSequenceOnDelete(parentIndex, contentUrn, numberedElements))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        elemBorderToggle: state.toolbarReducer.elemBorderToggle,
        activeElement: state.appStore.activeElement,
        slateLockInfo: state.slateLockReducer.slateLockInfo,
        permissions: state.appStore.permissions,
        oldImage: state.appStore.oldImage,
        glossaryFootnoteValue: state.glossaryFootnoteReducer.glossaryFootnoteValue,
        allComments: state.commentsPanelReducer.allComments,
        showHideId: state.appStore.showHideId,
        tcmData: state.tcmReducer.tcmSnapshot,
        searchUrn: state.searchReducer.searchTerm,
        searchParent: state.searchReducer.parentId,
        searchScroll: state.searchReducer.scroll,
        searchScrollTop: state.searchReducer.scrollTop,
        commentSearchUrn: state.commentSearchReducer.commentSearchTerm,
        commentSearchParent: state.commentSearchReducer.parentId,
        commentSearchScroll: state.commentSearchReducer.scroll,
        commentSearchScrollTop: state.commentSearchReducer.scrollTop,
        currentSlateAncestorData: state.appStore.currentSlateAncestorData,
        elementSelection: state.selectionReducer.selection,
        slateLevelData: state.appStore.slateLevelData,
        assessmentReducer: state.assessmentReducer,
        tcmSnapshotData: state.tcmReducer.tcmSnapshotData,
        multipleColumnData: state.appStore.multipleColumnData,
        oldFigureDataForCompare: state.appStore.oldFigureDataForCompare,
        isTCMCanvasPopupLaunched: state.tcmReducer.isTCMCanvasPopupLaunched,
        prevSelectedElement: state.tcmReducer.prevElementId,
        projectUsers: state.commentsPanelReducer.users,
        projectInfo: state.projectInfo,
        oldSmartLinkDataForCompare: state.appStore.oldSmartLinkDataForCompare,
        oldAudioVideoDataForCompare: state.appStore.oldAudioVideoDataForCompare,
        markedIndexCurrentValue: state.markedIndexReducer.markedIndexCurrentValue,
        markedIndexValue: state.markedIndexReducer.markedIndexValue,
        isAutoNumberingEnabled: state.autoNumberReducer.isAutoNumberingEnabled,
        autoNumberOption: state.autoNumberReducer.autoNumberOption,
        autoNumberElementsIndex: state.autoNumberReducer.autoNumberElementsIndex,
        autoNumberedElements: state.autoNumberReducer.autoNumberedElements,
        spellCheckToggle: state.toolbarReducer.spellCheckToggle,
        figureDropdownData: state.appStore.figureDropdownData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
