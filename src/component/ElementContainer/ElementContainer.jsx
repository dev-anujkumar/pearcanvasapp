import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ElementSingleAssessment from './../ElementSingleAssessment';
import ElementAuthoring from './../ElementAuthoring';
import ElementAudioVideo from './../ElementAudioVideo';
import ElementFigure from './../ElementFigure';
import ElementInteractive from '../ElementInteractive';
import ElementAsideContainer from '../ElementAsideContainer';
import ElementMetaDataAnchor from '../ElementMetaDataAnchor';
import ElementMetaLOList from '../ElementMetaLOList';
import ElementLearningObjectiveItem from '../ElementLearningObjectiveItem';
import Button from './../ElementButtons';
import PopUp from '../PopUp';
import OpenerElement from "../OpenerElement";
import { glossaaryFootnotePopup } from './../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import { addComment, deleteElement, updateElement, createShowHideElement, deleteShowHideUnit } from './ElementContainer_Actions';
import './../../styles/ElementContainer/ElementContainer.css';
import { fetchCommentByElement } from '../CommentsPanel/CommentsPanel_Action'
import elementTypeConstant from './ElementConstants'
import { setActiveElement, fetchElementTag, openPopupSlate } from './../CanvasWrapper/CanvasWrapper_Actions';
import { COMMENTS_POPUP_DIALOG_TEXT, COMMENTS_POPUP_ROWS } from './../../constants/Element_Constants';
import { showTocBlocker, hideBlocker } from '../../js/toggleLoader'
import { sendDataToIframe, hasReviewerRole, matchHTMLwithRegex, encodeHTMLInWiris } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import ListElement from '../ListElement';
import config from '../../config/config';
import AssessmentSlateCanvas from './../AssessmentSlateCanvas';
import PageNumberContext from '../CanvasWrapper/CanvasContexts.js';
import { authorAssetPopOver } from '../AssetPopover/openApoFunction.js';
import { LABELS } from './ElementConstants.js';
import { updateFigureData } from './ElementContainer_Actions.js';
import { createUpdatedData, createOpenerElementData } from './UpdateElements.js';
import { loadTrackChanges } from '../CanvasWrapper/TCM_Integration_Actions';
import ElementPopup from '../ElementPopup'
import { updatePageNumber, accessDenied } from '../SlateWrapper/SlateWrapper_Actions';
import { releaseSlateLock } from '../CanvasWrapper/SlateLock_Actions.js';
import ElementShowHide from '../ElementShowHide';
import ElementContainerContext from './ElementContainerContext'
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
            activeColorIndex: this.props.element.backgroundcolor ? config.colors.indexOf(this.props.element.backgroundcolor) : 0,
            isHovered: false,
            hasError: false,
            sectionBreak: null
        };


    }
    componentDidMount() {
        this.setState({
            ElementId: this.props.element.id,
            btnClassName: '',
            isOpener: this.props.element.type === elementTypeConstant.OPENER
        })
    }

    componentWillUnmount() {
        if (config.releaseCallCount === 0) {
            this.props.releaseSlateLock(config.projectUrn, config.slateManifestURN)
            config.releaseCallCount += 1
        }
    }

    componentWillReceiveProps(newProps) {
        if (!(newProps.permissions && (newProps.permissions.includes('access_formatting_bar')|| newProps.permissions.includes('elements_add_remove'))) && !hasReviewerRole()) {
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
            })
        }
        else {
            this.setState({
                borderToggle: 'active',
                btnClassName: 'activeTagBgColor'
            })
        }
    }

    /**
     * function will be called on element focus of tinymce instance
     */
    handleFocus = (updateFromC2Flag, showHideObj,event) => {
        if(event){
            event.stopPropagation();
        }
        let element = this.props.element,
            index = this.props.index
        if(showHideObj) {
            element = showHideObj.currentElement
            index = showHideObj.index
        }else{
            let showHideNode = document.querySelector('.show-hide-active')
            if(showHideNode){
                showHideNode.classList.remove("show-hide-active")
            }
        }
        if (!(this.props.permissions && (this.props.permissions.includes('access_formatting_bar') || this.props.permissions.includes('elements_add_remove'))) && !hasReviewerRole()) {
            return true
        }
        if (updateFromC2Flag) {
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
            config.lastActiveElementId=element.id
            this.props.setActiveElement(element, index, "", "", true, showHideObj);
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
            config.lastActiveElementId=element.id
            this.props.setActiveElement(element, index, this.props.parentUrn, this.props.asideData, "", showHideObj);
            this.props.fetchCommentByElement(this.props.element.id);
        }
    }

    removeClassesFromHtml = (html) => {
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tinyMCE.$(tempDiv).find('p').removeAttr('class')
        return this.replaceUnwantedtags(tempDiv.innerHTML);
    }

    replaceUnwantedtags = (html) => {
        if(!html){
            return;
        }
        let tempDiv = document.createElement('div');
        html = html.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula').replace(/\uFEFF/g,"").replace(/>\s+</g,'><');
        html=html.trim();
        tempDiv.innerHTML = html;
        tinyMCE.$(tempDiv).find('br').remove();
        tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
        tinyMCE.$(tempDiv).find('span#_mce_caret').remove();
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('img').removeAttr('data-custom-editor');
        tinyMCE.$(tempDiv).find('ol').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('ol').removeAttr('style');
        tinyMCE.$(tempDiv).find('img').removeAttr('style');
        tinyMCE.$(tempDiv).find('p').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('blockquote').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('blockquote').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('code').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('img').removeAttr('height');
        tinyMCE.$(tempDiv).find('img').removeAttr('width');
        tinyMCE.$(tempDiv).find('.blockquoteMarginalia').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('.paragraphNummerEins').removeAttr('contenteditable');
        tinyMCE.$(tempDiv).find('img').removeAttr('draggable');
        tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeClass('fr-draggable');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-href');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-custom-editor');
        return encodeHTMLInWiris(tempDiv.innerHTML);
    }

    /**
     * Checks for any difference in data before initiating saving call
     * @param {*} index element index
     * @param {*} previousElementData old element data
     */
    figureDifference = (index, previousElementData) => {

        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            captionDOM = document.getElementById(`cypress-${index}-2`),
            creditsDOM = document.getElementById(`cypress-${index}-3`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        captionHTML = captionHTML.match(/<p>/g) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = creditsHTML.match(/<p>/g) ? creditsHTML : `<p>${creditsHTML}</p>`
        subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
        titleHTML = titleHTML.match(/<p>/g) ? titleHTML : `<p>${titleHTML}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        subtitleHTML = this.removeClassesFromHtml(subtitleHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)

        let defaultImageUrl = "https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png";
        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.subtitle) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            (this.props.oldImage ? this.props.oldImage : defaultImageUrl) !== (previousElementData.figuredata.path ? previousElementData.figuredata.path : defaultImageUrl)
        );
    }

    figureDifferenceBlockCode = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            preformattedText = document.getElementById(`cypress-${index}-2`) ? document.getElementById(`cypress-${index}-2`).innerText.trim() : "",
            captionDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        let getAttributeBCE = document.querySelector(`div.element-container.active[data-id="${previousElementData.id}"] div.blockCodeFigure`)
        let startNumber = getAttributeBCE && getAttributeBCE.getAttribute("startnumber")
        let isNumbered = getAttributeBCE && getAttributeBCE.getAttribute("numbered")
        if (typeof (isNumbered) == "string") {
            isNumbered = JSON.parse(isNumbered)
        }
        captionHTML = captionHTML.match(/<p>/g) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = creditsHTML.match(/<p>/g) ? creditsHTML : `<p>${creditsHTML}</p>`
        subtitleHTML = subtitleHTML.match(/<p>/g) ? subtitleHTML : `<p>${subtitleHTML}</p>`
        titleHTML = titleHTML.match(/<p>/g) ? titleHTML : `<p>${titleHTML}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        subtitleHTML = this.removeClassesFromHtml(subtitleHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        preformattedText = this.removeClassesFromHtml(preformattedText)

        // if (titleHTML !== previousElementData.html.title ||
        //     subtitleHTML !== previousElementData.html.subtitle ||
        //     captionHTML !== previousElementData.html.captions ||
        //     creditsHTML !== previousElementData.html.credits ||
        //     preformattedText !== previousElementData.figuredata.preformattedtext.join('\n').trim() ||
        //     startNumber !== previousElementData.figuredata.startNumber ||
        //     isNumbered !== previousElementData.figuredata.numbered
        //     ){
        //         return 1
        //     }
        //     else {
        //         return 0
        //     }
        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.subtitle) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            preformattedText !== this.removeClassesFromHtml(previousElementData.figuredata.preformattedtext.join('\n').trim()) ||
            Number(startNumber) !== Number(previousElementData.figuredata.startNumber) ||
            isNumbered !== previousElementData.figuredata.numbered
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
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            captionsDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionsDOM ? captionsDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""
        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        subtitleHTML = matchHTMLwithRegex(subtitleHTML) ? subtitleHTML : `<p>${subtitleHTML}</p>`
        titleHTML = matchHTMLwithRegex(titleHTML) ? titleHTML : `<p>${titleHTML}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        subtitleHTML = this.removeClassesFromHtml(subtitleHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        if (previousElementData.figuredata.interactivetype === "pdf" || previousElementData.figuredata.interactivetype === "pop-up-web-link" ||
            previousElementData.figuredata.interactivetype === "web-link") {
            let pdfPosterTextDOM = document.getElementById(`cypress-${index}-2`)
            let posterTextHTML = pdfPosterTextDOM ? pdfPosterTextDOM.innerHTML : ""
            posterTextHTML = posterTextHTML.match(/(<p.*?>.*?<\/p>)/g)?posterTextHTML:`<p>${posterTextHTML}</p>`
            
            // if(titleHTML !== previousElementData.html.title ||
            //     subtitleHTML !== previousElementData.html.subtitle || 
            //     captionHTML !== previousElementData.html.captions ||
            //     creditsHTML !== previousElementData.html.credits || 
            //     posterTextHTML !== previousElementData.html.postertext
            //     ){
            //         return 1
            //     }
            //     else {
            //         return 0
            //     }
            return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
                subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.subtitle) ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                posterTextHTML !== this.removeClassesFromHtml(previousElementData.html.postertext.match(/(<p.*?>.*?<\/p>)/g)?previousElementData.html.postertext:`<p>${previousElementData.html.postertext}</p>`) ||
                this.props.oldImage !== newInteractiveid
            );
        }
        else {
            return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
                subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.subtitle) ||
                captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
                creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
                this.props.oldImage !== newInteractiveid
            );
        }
    }
    figureDifferenceAT = (index, previousElementData) => {
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            text = document.getElementById(`cypress-${index}-2`) ? document.getElementById(`cypress-${index}-2`).innerHTML : "<p></p>",
            captionDOM = document.getElementById(`cypress-${index}-3`),
            creditsDOM = document.getElementById(`cypress-${index}-4`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : "",
            oldtext = previousElementData.html.text ? previousElementData.html.text : ""

        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        subtitleHTML = matchHTMLwithRegex(subtitleHTML) ? subtitleHTML : `<p>${subtitleHTML}</p>`
        titleHTML = matchHTMLwithRegex(titleHTML) ? titleHTML : `<p>${titleHTML}</p>`
        text = matchHTMLwithRegex(text) ? text : `<p>${text}</p>`
        oldtext = matchHTMLwithRegex(oldtext) ? oldtext : `<p>${oldtext}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        subtitleHTML = this.removeClassesFromHtml(subtitleHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        text = this.removeClassesFromHtml(text)
        oldtext = this.removeClassesFromHtml(oldtext)
       
        let oldTitle =  this.removeClassesFromHtml(previousElementData.html.title),
        oldSubtitle =  this.removeClassesFromHtml(previousElementData.html.subtitle),
        oldCaption =  this.removeClassesFromHtml(previousElementData.html.captions),
        oldCredit =  this.removeClassesFromHtml(previousElementData.html.credits)

        return (titleHTML !==oldTitle ||
            subtitleHTML !== oldSubtitle ||
            captionHTML !== oldCaption ||
            creditsHTML !== oldCredit ||
            // formattedText!==formattedOldText
            text!==oldtext
            );
    }

    figureDifferenceAudioVideo = (index, previousElementData) => {
        // let newAudioVideoId = ""  can be removed after regression testing
        // if (previousElementData.figuretype === "audio") {
        //     newAudioVideoId = previousElementData.figuredata.audio && previousElementData.figuredata.audio.path || ""
        // }
        // else {
        //     newAudioVideoId = previousElementData.figuredata.videos[0].path
        // }
        let titleDOM = document.getElementById(`cypress-${index}-0`),
            subtitleDOM = document.getElementById(`cypress-${index}-1`),
            captionDOM = document.getElementById(`cypress-${index}-2`),
            creditsDOM = document.getElementById(`cypress-${index}-3`)

        let titleHTML = titleDOM ? titleDOM.innerHTML : "",
            subtitleHTML = subtitleDOM ? subtitleDOM.innerHTML : "",
            captionHTML = captionDOM ? captionDOM.innerHTML : "",
            creditsHTML = creditsDOM ? creditsDOM.innerHTML : ""

        captionHTML = matchHTMLwithRegex(captionHTML) ? captionHTML : `<p>${captionHTML}</p>`
        creditsHTML = matchHTMLwithRegex(creditsHTML) ? creditsHTML : `<p>${creditsHTML}</p>`
        subtitleHTML = matchHTMLwithRegex(subtitleHTML) ? subtitleHTML : `<p>${subtitleHTML}</p>`
        titleHTML = matchHTMLwithRegex(titleHTML) ? titleHTML : `<p>${titleHTML}</p>`

        captionHTML = this.removeClassesFromHtml(captionHTML)
        creditsHTML = this.removeClassesFromHtml(creditsHTML)
        subtitleHTML = this.removeClassesFromHtml(subtitleHTML)
        titleHTML = this.removeClassesFromHtml(titleHTML)
        let defaultImageUrl =  "https://d12m40tknrppbi.cloudfront.net/cite/images/FPO-audio_video.png";
        return (titleHTML !== this.removeClassesFromHtml(previousElementData.html.title) ||
            subtitleHTML !== this.removeClassesFromHtml(previousElementData.html.subtitle) ||
            captionHTML !== this.removeClassesFromHtml(previousElementData.html.captions) ||
            creditsHTML !== this.removeClassesFromHtml(previousElementData.html.credits) ||
            //    this.props.oldImage !== newAudioVideoId
            (defaultImageUrl !== (previousElementData.figuredata.posterimage && previousElementData.figuredata.posterimage.path)) //PCAT-6815  fixes
        );
    }

    updateOpenerElement = (dataToSend) => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        dataToSend = createOpenerElementData(this.props.element, elementType, primaryOption, secondaryOption)
        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
        if(dataToSend.status === "approved"){
            config.savingInProgress = true
        }
        this.props.updateElement(dataToSend, 0,undefined,undefined,undefined,undefined);
    }

    /**
     * This function opens TCM w.r.t. current Element
     */
    handleTCM = () => {
        loadTrackChanges(this.props.element.id)
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
    handleContentChange = (node, previousElementData, elementType, primaryOption, secondaryOption, activeEditorId, forceupdate, parentElement, showHideType) => {
        const { parentUrn, asideData } = this.props
        let dataToSend = {}
        switch (previousElementData.type) {
            case elementTypeConstant.AUTHORED_TEXT:
            case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
            case elementTypeConstant.BLOCKFEATURE:
            let index  = parentElement.type == "showhide" ||  parentElement.type == "popup"? activeEditorId:`cypress-${this.props.index}`
            if (this.props.element && this.props.element.type === "element-blockfeature" && this.props.element.subtype === "quote" && tinyMCE.activeEditor && tinyMCE.activeEditor.id  && !tinyMCE.activeEditor.id.includes("footnote")) {
                let blockqtText = document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins')?document.querySelector('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').innerText:"";
                if (!blockqtText.trim()) {
                    var MLtext = document.querySelector('#'+ tinymce.activeEditor.id +' > p > img') || document.querySelector('#'+ tinymce.activeEditor.id +' > img')
                    if(MLtext){
                        tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').find('br').remove();
                        document.querySelector('#'+ tinymce.activeEditor.id +' blockquote p.paragraphNummerEins').append(MLtext)
                        tinyMCE.$('#' + tinymce.activeEditor.id).find('p[data-mce-caret="before"]').remove();
                        tinyMCE.$('#' + tinymce.activeEditor.id).find('span#mce_1_start').remove();
                        tinyMCE.$('#' + tinymce.activeEditor.id).find('div.mce-visual-caret').remove();
                        tinyMCE.$('#' + tinymce.activeEditor.id + ' blockquote p.paragraphNummerEins').append("&nbsp;")
                    }
                }
            } 
                let currentNode = document.getElementById(index)
                let html = currentNode.innerHTML;
                let tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                //tinyMCE.$(tempDiv).find('.blockquote-hidden').remove();
                html = tempDiv.innerHTML;
                if(parentElement.type === "popup"){
                    tempDiv.innerHTML = matchHTMLwithRegex(tempDiv.innerHTML) ? tempDiv.innerHTML : `<p class="paragraphNumeroUno">${tempDiv.innerHTML}</p>`
                    html = html.replace(/<br data-mce-bogus="1">/g, "<br>")
                    html = matchHTMLwithRegex(html) ? html : `<p class="paragraphNumeroUno">${html}</p>`
                }
                html =html.replace(/(\r\n|\n|\r)/gm, '')                
                let assetPopoverPopupIsVisible = document.querySelector("div.blockerBgDiv");
                previousElementData.html.text= previousElementData.html.text.replace(/<br data-mce-bogus="1">/g, "<br>").replace(/(\r\n|\n|\r)/gm, '');
                previousElementData.html.text = previousElementData.html.text.replace(/data-mce-bogus="all"/g, '')
                if (html && previousElementData.html && (this.replaceUnwantedtags(html) !== this.replaceUnwantedtags(previousElementData.html.text) || forceupdate) && !assetPopoverPopupIsVisible && !config.savingInProgress) {
                    dataToSend = createUpdatedData(previousElementData.type, previousElementData, tempDiv, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this,parentElement,showHideType, asideData)
                    sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                    if(dataToSend.status === "approved"){
                        config.savingInProgress = true
                    }
                    this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, showHideType, parentElement);
                }
                break;

            case elementTypeConstant.FIGURE:
                switch (previousElementData.figuretype) {
                    case elementTypeConstant.FIGURE_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE:
                    case elementTypeConstant.FIGURE_MATH_IMAGE:
                    case elementTypeConstant.FIGURE_TABLE_EDITOR:
                        if(this.figureDifference(this.props.index, previousElementData) || forceupdate && !config.savingInProgress){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this,undefined,undefined, asideData)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            if(dataToSend.status === "approved"){
                                config.savingInProgress = true
                            }
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData,undefined,undefined);
                        }
                        break;
                    case elementTypeConstant.FIGURE_VIDEO:
                    case elementTypeConstant.FIGURE_AUDIO:
                        if (this.figureDifferenceAudioVideo(this.props.index, previousElementData) || forceupdate && !config.savingInProgress) {
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, undefined, undefined, asideData)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            if(dataToSend.status === "approved"){
                                config.savingInProgress = true
                            }
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, undefined, undefined);
                        }
                        break;
                    case elementTypeConstant.FIGURE_ASSESSMENT:
                        dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, undefined, undefined, asideData)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                        if(dataToSend.status === "approved"){
                            config.savingInProgress = true
                        }
                        this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData,undefined,undefined);
                        break;
                    case elementTypeConstant.INTERACTIVE:
                        if(this.figureDifferenceInteractive(this.props.index, previousElementData) || forceupdate && !config.savingInProgress){
                            dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this,undefined,undefined, asideData)
                            sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                            if(dataToSend.status === "approved"){
                                config.savingInProgress = true
                            }
                            this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData,undefined,undefined)
                        }
                        break;

                    case elementTypeConstant.FIGURE_CODELISTING:
                            if(this.figureDifferenceBlockCode(this.props.index, previousElementData) || forceupdate && !config.savingInProgress){
                                dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this,undefined,undefined, asideData)
                                sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                                if(dataToSend.status === "approved"){
                                    config.savingInProgress = true
                                 }
                                this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData,undefined,undefined);
                            }
                            break;
                    case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                            if(this.figureDifferenceAT(this.props.index, previousElementData) || forceupdate && !config.savingInProgress){
                                dataToSend = createUpdatedData(previousElementData.type, previousElementData, node, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this,undefined,undefined, asideData)
                                sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                                if(dataToSend.status === "approved"){
                                    config.savingInProgress = true
                                }
                                this.props.updateElement(dataToSend, this.props.index,parentUrn,asideData,undefined,undefined);
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
                    let nodehtml = currentListNode.innerHTML;
                    for (let i = 0; i < tinyMCE.$(currentListNode).find('li').length; i++) {
                        tinyMCE.$(currentListNode).find('li')[i].innerHTML = tinyMCE.$(currentListNode).find('li')[i].innerHTML.replace(/^\s+|\s+$/g, '&nbsp;');
                    }                    
                    if (nodehtml && previousElementData.html && (this.replaceUnwantedtags(nodehtml) !== this.replaceUnwantedtags(previousElementData.html.text) || forceupdate && !config.savingInProgress)) {
                        dataToSend = createUpdatedData(previousElementData.type, previousElementData, currentListNode, elementType, primaryOption, secondaryOption, activeEditorId, this.props.index, this, parentElement, showHideType,undefined)
                        sendDataToIframe({ 'type': 'isDirtyDoc', 'message': { isDirtyDoc: true } })
                        if(dataToSend.status === "approved"){
                            config.savingInProgress = true
                        }
                        this.props.updateElement(dataToSend, this.props.index, parentUrn, asideData, showHideType, parentElement);
                    }
                    break;
                }
        }
    }

    /**
     * Will be called on element blur and a saving call will be made
     */
    handleBlur = (forceupdate, currrentElement, elemIndex, showHideType) => {
        const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let activeEditorId = elemIndex ? `cypress-${elemIndex}` : (tinyMCE.activeEditor ? tinyMCE.activeEditor.id : '')
        let node = document.getElementById(activeEditorId);
        let element = currrentElement ? currrentElement : this.props.element
        this.handleContentChange(node, element, elementType, primaryOption, secondaryOption, activeEditorId, forceupdate, this.props.element, showHideType)
    }

    /**
     * Will e called on assessment element's blur
     */
    handleBlurAssessmentSlate = (assessmentData) => {
        // const { elementType, primaryOption, secondaryOption } = this.props.activeElement;
        let dataToSend = { ...this.props.element }
        if (assessmentData.id) {
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
            this.handleContentChange('', dataToSend, 'element-assessment', 'primary-assessment-slate', 'secondary-assessment-' + assessmentData.format)
        } else {
            dataToSend.elementdata.usagetype = assessmentData;
            this.handleContentChange('', dataToSend, 'element-assessment', 'primary-assessment-slate', 'secondary-assessment-' + this.props.element.elementdata.assessmentformat)
        }

    }

    /**
     * Checks mouse event out side of canvas area and handdling element border state
     */
    handleBlurAside = () => {
        if (this.props.elemBorderToggle) {
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
    }

    toggleColorPaletteList = () => {
        if(config.savingInProgress) return false
        const { showColorPaletteList } = this.state;
        this.handleFocus();
        this.setState({
            showColorPaletteList: !showColorPaletteList
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
        if(this.props.element.backgroundcolor !== config.colors[this.state.activeColorIndex]){
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
    renderColorPaletteButton = (element) => {
        if (element.type === elementTypeConstant.OPENER) {
            return (
                <>
                    <Button onClick={this.toggleColorPaletteList} type="color-palette" />
                    <ul className="color-palette-list">{this.renderPaletteList()}</ul>
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
    showDeleteElemPopup = (popup, sectionBreak) => {
        this.props.showBlocker(true);
        showTocBlocker();
        this.setState({
            popup,
            showDeleteElemPopup: true,
            sectionBreak: sectionBreak ? sectionBreak : null
        });
    }

    /**
     * For deleting slate level element
     */
    deleteElement = () => {
        let { id, type } = this.props.element;
        let { parentUrn, asideData, element } = this.props;
        let { contentUrn } = this.props.element
        let index = this.props.index

        if (this.state.sectionBreak) {
            parentUrn = {
                elementType: element.type,
                manifestUrn: element.id,
                contentUrn: element.contentUrn,
            }
            contentUrn = this.state.sectionBreak.contentUrn
            id = this.state.sectionBreak.id
        }
        this.handleCommentPopup(false);
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });

        /** This condition to delete whole aside element when only one element in it deleted */
        if (this.props.parentElement && this.props.parentElement.subtype !== "workedexample" && this.props.parentElement.elementdata.bodymatter.length === 1) {
            id = this.props.parentElement.id
            type = this.props.parentElement.type
            contentUrn = this.props.parentElement.contentUrn
        }

        // api needs to run from here
        this.props.deleteElement(id, type, parentUrn, asideData, contentUrn, index);
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
    updateFigureData = (figureData, index, elementId, cb) => {
        this.props.updateFigureData(figureData, index, elementId, cb)
    }

    toolbarHandling = (action = "") => {
        if (document.querySelector('div#tinymceToolbar .tox-toolbar')) {
            if (action === "add") {
                document.querySelector('div#tinymceToolbar .tox-toolbar').classList.add("disable");
            } else if (action === "remove") {
                document.querySelector('div#tinymceToolbar .tox-toolbar').classList.remove("disable");
            }
        }
    }

    /**
     * Render Element function takes current element from bodymatter and render it into currnet slate 
     * @param {element} 
    */
    renderElement = (element = {}) => {
        let editor = '';
        let { index, handleCommentspanel, elementSepratorProps, slateLockInfo, permissions, updatePageNumber, accessDenied, allComments, splithandlerfunction} = this.props;
        let labelText = fetchElementTag(element, index);
        config.elementToolbar = this.props.activeElement.toolbar || [];
        let anyOpenComment = allComments.filter(({ commentStatus, commentOnEntity }) => commentOnEntity === element.id && commentStatus.toLowerCase() === "open").length > 0
        /** Handle TCM for tcm enable elements */
        let tcm = false;
        let feedback = false;
        if (element.type == 'element-authoredtext' || element.type == 'element-list' || element.type == 'element-blockfeature' || element.type == 'element-learningobjectives') {
            if (element.tcm) {
                tcm = element.tcm;
                sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
            }
            if (element.feedback) {
                feedback = element.feedback;
                sendDataToIframe({ 'type': 'projectPendingTcStatus', 'message': 'true' });
            }
        }

        /* TODO need better handling with a function and dynamic component rendering with label text*/
        if (labelText) {
            switch (element.type) {
                case elementTypeConstant.ASSESSMENT_SLATE:
                    editor = <AssessmentSlateCanvas openCustomPopup={this.props.openCustomPopup} permissions={permissions} model={element} elementId={element.id} handleBlur={this.handleBlurAssessmentSlate} handleFocus={this.handleFocus} showBlocker={this.props.showBlocker} slateLockInfo={slateLockInfo} isLOExist={this.props.isLOExist} />
                    labelText = 'AS'
                    break;
                case elementTypeConstant.OPENER:
                    const { activeColorIndex } = this.state
                    editor = <OpenerElement accessDenied={accessDenied} permissions={permissions} backgroundColor={config.colors[activeColorIndex]} index={index} onClick={this.handleFocus} handleBlur={this.handleBlur} elementId={element.id} element={element} slateLockInfo={slateLockInfo} updateElement={this.updateOpenerElement} />
                    labelText = 'OE'
                    break;
                case elementTypeConstant.AUTHORED_TEXT:
                    editor = <ElementAuthoring permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                    break;
                case elementTypeConstant.BLOCKFEATURE:
                    editor = <ElementAuthoring tagName="blockquote" permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                    break;
                case elementTypeConstant.LEARNING_OBJECTIVE_ITEM:
                    editor = <ElementLearningObjectiveItem permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} />;
                    break;
                case elementTypeConstant.FIGURE:
                    switch (element.figuretype) {
                        case elementTypeConstant.FIGURE_IMAGE:
                        case elementTypeConstant.FIGURE_TABLE:
                        case elementTypeConstant.FIGURE_MATH_IMAGE:
                        case elementTypeConstant.FIGURE_AUTHORED_TEXT:
                        case elementTypeConstant.FIGURE_CODELISTING:
                        case elementTypeConstant.FIGURE_TABLE_EDITOR:
                            editor = <ElementFigure accessDenied={accessDenied} updateFigureData={this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} elementId={element.id} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_AUDIO:
                        case elementTypeConstant.FIGURE_VIDEO:
                            editor = <ElementAudioVideo accessDenied={accessDenied} updateFigureData={this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} slateLockInfo={slateLockInfo} elementId={element.id} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                            //labelText = LABELS[element.figuretype];
                            break;
                        case elementTypeConstant.FIGURE_ASSESSMENT:
                            editor = <ElementSingleAssessment openCustomPopup={this.props.openCustomPopup} accessDenied={accessDenied} updateFigureData={this.updateFigureData} showBlocker={this.props.showBlocker} permissions={permissions} handleFocus={this.handleFocus} handleBlur={this.handleBlur} model={element} index={index} elementId={element.id} slateLockInfo={slateLockInfo} />;
                            labelText = 'Qu';
                            break;
                        case elementTypeConstant.INTERACTIVE:
                            switch (element.figuredata.interactiveformat) {
                                case elementTypeConstant.INTERACTIVE_MMI:
                                    editor = <ElementInteractive accessDenied={accessDenied} showBlocker={this.props.showBlocker} updateFigureData={this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                                    labelText = element.figuredata.interactivetype == 'showhide' ? 'SH' : 'MMI';
                                    break;
                                case elementTypeConstant.INTERACTIVE_EXTERNAL_LINK:
                                case elementTypeConstant.INTERACTIVE_NARRATIVE_LINK:
                                    editor = <ElementInteractive accessDenied={accessDenied} showBlocker={this.props.showBlocker} updateFigureData={this.updateFigureData} permissions={permissions} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} model={element} slateLockInfo={slateLockInfo} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
                                    labelText = LABELS[element.figuredata.interactiveformat];
                                    break;
                            }
                    }
                    break;
                case elementTypeConstant.ELEMENT_LIST:
                    editor = <ListElement permissions={permissions} openAssetPopoverPopUp={this.openAssetPopoverPopUp} openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp} handleFocus={this.handleFocus} handleBlur={this.handleBlur} index={index} elementId={element.id} element={element} model={element.html} slateLockInfo={slateLockInfo} onListSelect={this.props.onListSelect} glossaryFootnoteValue={this.props.glossaryFootnoteValue} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} glossaaryFootnotePopup={this.props.glossaaryFootnotePopup} />;
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
                        updatePageNumber={updatePageNumber}
                        isBlockerActive={this.props.isBlockerActive}
                        onClickCapture={this.props.onClickCapture}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        onListSelect={this.props.onListSelect}
                        splithandlerfunction={splithandlerfunction}
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
                        accessDenied={accessDenied}
                        openGlossaryFootnotePopUp={this.openGlossaryFootnotePopUp}
                        glossaryFootnoteValue={this.props.glossaryFootnoteValue}
                        glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
                        activeElement={this.props.activeElement}
                    />;
                    labelText = 'Pop'
                    break;
                case elementTypeConstant.SHOW_HIDE:
                    editor = <ElementContainerContext.Provider value={{
                        onListSelect: this.props.onListSelect,
                        showHideId: this.props.showHideId,
                        createShowHideElement: this.props.createShowHideElement,
                        deleteShowHideUnit: this.props.deleteShowHideUnit,
                        activeElement: this.props.activeElement,
                        showBlocker: this.props.showBlocker,
                        permissions: permissions,
                        handleFocus: this.handleFocus,
                        handleBlur: this.handleBlur,
                        index: index,
                        element: element,
                        model: element.html,
                        slateLockInfo: slateLockInfo,
                        onClick: this.handleFocus,
                        glossaryFootnoteValue: this.props.glossaryFootnoteValue,
                        openAssetPopoverPopUp: this.openAssetPopoverPopUp,
                        openGlossaryFootnotePopUp: this.openGlossaryFootnotePopUp,
                    }}><ElementShowHide />
                    </ElementContainerContext.Provider >;
                    labelText = 'SH'
                    break;
            }
        } else {
            editor = <p className="incorrect-data">Incorrect Data - {element.id}</p>;
        }

        let borderToggle = this.state.borderToggle;
        let btnClassName = this.state.btnClassName;
        let bceOverlay = "";
        let elementOverlay = ''
        if (!hasReviewerRole() && this.props.permissions && !(this.props.permissions.includes('access_formatting_bar')||this.props.permissions.includes('elements_add_remove')) ) {
            elementOverlay = <div className="element-Overlay disabled" onClick={() => this.handleFocus()}></div>
        }
        if (element.type === elementTypeConstant.FIGURE && element.figuretype === elementTypeConstant.FIGURE_CODELISTING) {
            if ((element.figuredata && element.figuredata.programlanguage && element.figuredata.programlanguage == "Select") || (this.props.activeElement.secondaryOption === "secondary-blockcode-language-default" && this.props.activeElement.elementId === element.id)) {
                bceOverlay = <div className="bce-overlay disabled" onClick={() => this.handleFocus()}></div>;
                borderToggle = (this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? 'showBorder' : 'hideBorder';
                btnClassName = '';
            }
        }

        return (
            <div className="editor" data-id={element.id} onMouseOver={this.handleOnMouseOver} onMouseOut={this.handleOnMouseOut} onClickCapture={(e) => this.props.onClickCapture(e)}>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                    <Button type="element-label" btnClassName={`${btnClassName} ${this.state.isOpener ? ' ignore-for-drag' : ''}`} labelText={labelText} />
                    {permissions && permissions.includes('elements_add_remove') && !hasReviewerRole() && config.slateType !== 'assessment' ? (<Button type="delete-element" onClick={() => this.showDeleteElemPopup(true)} />)
                        : null}
                    {this.renderColorPaletteButton(element)}
                </div>
                    : ''}
                <div className={`element-container ${labelText.toLowerCase()} ${borderToggle}`} data-id={element.id} onFocus={() => this.toolbarHandling('remove')} onBlur={() => this.toolbarHandling('add')}>
                    {elementOverlay}{bceOverlay}{editor}
                </div>
                {(this.props.elemBorderToggle !== 'undefined' && this.props.elemBorderToggle) || this.state.borderToggle == 'active' ? <div>
                    {permissions && permissions.includes('notes_adding') && <Button type="add-comment" btnClassName={btnClassName} onClick={() => this.handleCommentPopup(true)} />}
                    {permissions && permissions.includes('note_viewer') && anyOpenComment && <Button elementId={element.id} onClick={() => handleCommentspanel(element.id, this.props.index)} type="comment-flag" />}
                    {feedback ? <Button elementId={element.id} type="feedback" onClick={this.handleTCM} /> : (tcm && <Button type="tcm" onClick={this.handleTCM} />)}
                </div> : ''}
                {this.state.popup && <PopUp
                    togglePopup={e => this.handleCommentPopup(e, this)}
                    active={this.state.popup}
                    handleChange={this.handleCommentChange}
                    saveContent={this.saveNewComment}
                    rows={COMMENTS_POPUP_ROWS}
                    dialogText={COMMENTS_POPUP_DIALOG_TEXT}
                    showDeleteElemPopup={this.state.showDeleteElemPopup}
                    sectionBreak={this.state.sectionBreak}
                    deleteElement={this.deleteElement}
                />}
                {
                    <PageNumberContext.Consumer>
                        {
                            ({ isPageNumberEnabled }) => this.props.children(this.state.isHovered, isPageNumberEnabled, this.props.activeElement, this.props.permissions)
                        }
                    </PageNumberContext.Consumer>
                }
            </div >
        );
    }

    /**
     * @description - This function is for handling the closing and opening of popup.
     * @param {event} popup
     */
    handleCommentPopup(popup) {
        this.setState({
            popup,
            showDeleteElemPopup: false,
            comment: ""
        });
        if (this.props.isBlockerActive) {
            this.props.showBlocker(false)
            hideBlocker();
        }
    }

    /**
     * @description - This function is for handleChange of popup.
     * @param newComment
     */
    handleCommentChange = (newComment) => {
        this.setState({
            comment: newComment
        })
    }

    /**
     * @description - This function is for ADD COMMENT API.
     */
    saveNewComment = () => {
        const { comment } = this.state;
        const { id } = this.props.element;
        if (comment.trim() !== '') {
            sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
            this.props.addComment(comment, id, this.props.asideData, this.props.parentUrn);
        }
        this.handleCommentPopup(false);
    }

    /**
     * @description - This function is for Open Glossarypopup.
     * @param {} 
     * @param 
     */
    openGlossaryFootnotePopUp = (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup) => {
        this.props.glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup);
    }

    /**
     * @description - This function is for open assest popover.
     */
    openAssetPopoverPopUp = (toggleApoPopup) => {
        authorAssetPopOver(toggleApoPopup)
        // this.props.assetPopoverPopup(toggleApoPopup)
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
    element: PropTypes.object,
    elemBorderToggle: PropTypes.string
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
        deleteElement: (id, type, parentUrn, asideData, contentUrn, index) => {
            dispatch(deleteElement(id, type, parentUrn, asideData, contentUrn, index))
        },
        glossaaryFootnotePopup: (glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, callback, typeWithPopup) => {
            dispatch(glossaaryFootnotePopup(glossaaryFootnote, popUpStatus, glossaryfootnoteid, elementWorkId, elementType, index, elementSubType, glossaryTermText, typeWithPopup)).then(() => {
                if (callback) {
                    callback();
                }
            })
        },
        updateElement: (updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement) => {
            dispatch(updateElement(updatedData, elementIndex, parentUrn, asideData, showHideType, parentElement))
        },
        updateFigureData: (figureData, index, elementId, cb) => {
            dispatch(updateFigureData(figureData, index, elementId, cb))
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
        showHideId: state.appStore.showHideId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElementContainer);
