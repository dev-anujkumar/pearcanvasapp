/**
* Root Component of Glossary Footnote Component.
*/
import React from 'react';
import GlossaryFootnotePopup from "./GlossaryFootnotePopup.jsx";
import PropTypes from 'prop-types'
import { saveGlossaryAndFootnote } from "./GlossaryFootnote_Actions.js"
import { ShowLoader } from '../../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import config from '../../config/config';

/**
* @description - GlossaryFootnoteMenu is a class based component. It is defined simply
* to make a skeleton of Glossary and Footnote.
*/
class GlossaryFootnoteMenu extends React.Component {
    constructor(props) {
        super(props);
        this.wrapperRef = null;
    }
    
    handleClickOutside = (event) => {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            /** Case - event target is not even wiris modal */
            if (!(document.querySelector('.wrs_modal_dialogContainer:not(.wrs_closed)') && document.querySelector('.wrs_modal_dialogContainer:not(.wrs_closed)').contains(event.target)) && !document.getElementById('openAudioBook') && !document.getElementById('openFigureGlossary') && !document.getElementById('ext_AddAnAsset') && !document.getElementById('ext_ProductLink') && !document.getElementById('popup') && !document.querySelector('div.modal-content.wiris-alt-text-popup')?.contains(event.target) && !document.getElementById('alfresco-picker')) {
                this.saveContent()
            }
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    /**
      * Set the wrapper ref
      */
    setWrapperRef = (node) => {
        this.wrapperRef = node;
    }


    render() {
        const { showGlossaaryFootnote, glossaryFootnoteValue, glossaryFootNoteCurrentValue } = this.props;
        return (
            <div>
                <GlossaryFootnotePopup permissions={this.props.permissions} setWrapperRef={this.setWrapperRef} showGlossaaryFootnote={showGlossaaryFootnote} glossaryFootnoteValue={glossaryFootnoteValue} closePopup={this.closePopup} saveContent={this.saveContent} glossaryFootNoteCurrentValue={glossaryFootNoteCurrentValue} />
            </div>
        )
    }


    /**
    * @description - This function is to close the Glossary and Footnote Popup.
    * @param {event} 
    */
    closePopup = () => {
        this.props.showGlossaaryFootnote(false);
    }

    replaceUnwantedtags = (html) => {
        if(!html){
            return;
        }
        let tempDiv = document.createElement('div');
        html = html.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula').replace(/\uFEFF/g,"");
        html=html.trim();
        tempDiv.innerHTML = html;
        /** BG-2332 | PCAT-7409 | Multiple Superseeded formatting entry is created in WIP when 
         * entering text by selecting the strikethrough formatting in Footnote and Glossary  */
        while(tinyMCE.$(tempDiv).find('span#_mce_caret').length) {
            tinyMCE.$(tempDiv).find('span#_mce_caret').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            });
            if(tinyMCE.$(tempDiv).find('span#_mce_caret').length === 0) {
                break;
            }
        }
        tinyMCE.$(tempDiv).find('span#_mce_caret').remove();
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-style');
        tinyMCE.$(tempDiv).find('img').removeAttr('style');
        tinyMCE.$(tempDiv).find('img').removeAttr('data-mce-selected');
        tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeAttr('height');
        tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeAttr('width');
        tinyMCE.$(tempDiv).find('img').removeAttr('draggable');
        tinyMCE.$(tempDiv).find('img.temp_Wirisformula').removeClass('fr-draggable');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-href');
        tinyMCE.$(tempDiv).find('a').removeAttr('data-mce-selected');
        return tempDiv.innerHTML;
    }

    /**
     * Checks difference in glossary/footnote data
     */
    glossaryFootnoteDifference = (newTerm, newDef, oldTerm, oldDef, type) => {
        let domparser, newTermDom, newDefDom, oldTermDom, oldDefDom, tempVar, tempTerm;
        tempVar = oldDef;
        tempTerm = oldTerm;
        tempVar = tempVar && tempVar.replace(/\sdata-mathml/g, 'data-temp-mathml')
        domparser = new DOMParser()
        newTermDom = domparser.parseFromString(newTerm, "text/html")
        oldTermDom = domparser.parseFromString(tempTerm, "text/html")
        oldDefDom = domparser.parseFromString(tempVar, "text/html")
        newDefDom = domparser.parseFromString(newDef, "text/html")
        let defImag = oldDefDom.getElementsByTagName('img')
        for (let index = 0; index < defImag.length; index++) {
            if (!(defImag[index].classList.contains('imageAssetContent'))) {
                defImag[index].removeAttribute('draggable');
                defImag[index].removeAttribute('style');
                defImag[index].removeAttribute('class');
                defImag[index].classList.add('temp_Wirisformula')
            }
        }
        let newDefImag = newDefDom.getElementsByTagName('img')
        for (let index = 0; index < newDefImag.length; index++) {
            if (!(newDefImag[index].classList.contains('imageAssetContent'))) {
                newDefImag[index].removeAttribute('draggable')
                newDefImag[index].removeAttribute('style');
                newDefImag[index].removeAttribute('class');
                newDefImag[index].classList.add('temp_Wirisformula');
            }
        }
        switch(type){
            case "glossary":
                return !(newTermDom.isEqualNode(oldTermDom) && newDefDom.isEqualNode(oldDefDom))
            case "footnote":
                return !newDefDom.isEqualNode(oldDefDom)
        }
    }

    /**
    * @description - This function is to save the Content of Glossary and Footnote.
    * @param {event} 
    */
    saveContent = () => {
        if (!hasReviewerRole()) {
            const { glossaryFootnoteValue,audioGlossaryData,figureGlossaryData, markedIndexGlossaryData } = this.props;
            let { elementWorkId, elementType, glossaryfootnoteid, type, elementSubType, typeWithPopup, blockfeatureType, poetryField} = glossaryFootnoteValue;
            let term = null;
            let definition = null;
            let defaultValue = document.createElement('p')
            term = document.querySelector('#glossary-editor > div > p') || defaultValue;
            tinymce.$(term).find('[data-mce-bogus]').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            })
            definition = document.querySelector('#glossary-editor-attacher > div > p') || defaultValue;
            tinymce.$(definition).find('[data-mce-bogus]').each(function () {
                let innerHtml = this.innerHTML;
                this.outerHTML = innerHtml;
            })
            if(term.getElementsByClassName){
                let mathAllTermFormula = term.getElementsByClassName('Wirisformula');
                for (let index = 0; index < mathAllTermFormula.length; index++) {
                    let mathFormula = mathAllTermFormula[index].getAttribute('mathmlformula')
                    if (mathFormula) {
                        let res = mathFormula.substr(0, 2);
                        let res2 = mathFormula.substr(2, 2);
                        let s3ImagePath=config.S3MathImagePath?config.S3MathImagePath:"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/"
                        let path = s3ImagePath + res + '/' + res2 + '/' + mathFormula + '.png' + '?' + (new Date()).getTime()
                        mathAllTermFormula[index].setAttribute('src', path)
                        mathAllTermFormula[index].removeAttribute('mathmlformula')
                    }
                }
             }
             if(definition.getElementsByClassName){
                let mathAllDefinitionFormula = definition.getElementsByClassName('Wirisformula');
                for (let index = 0; index < mathAllDefinitionFormula.length; index++) {
                    let mathFormula = mathAllDefinitionFormula[index].getAttribute('mathmlformula')
                    if (mathFormula) {
                        let res = mathFormula.substr(0, 2);
                        let res2 = mathFormula.substr(2, 2);
                        let s3ImagePath=config.S3MathImagePath?config.S3MathImagePath:"https://cite-media-stg.pearson.com/legacy_paths/wiris-dev-mathtype-cache-use/cache/"
                        let path = s3ImagePath + res + '/' + res2 + '/' + mathFormula + '.png' + '?' + (new Date()).getTime()
                        mathAllDefinitionFormula[index].setAttribute('src', path)
                        mathAllDefinitionFormula[index].removeAttribute('mathmlformula')
                    }
                }
             }
            let isMarkedIndexPresent = (markedIndexGlossaryData?.markedIndexEntryURN) && (markedIndexGlossaryData?.markedIndexEntryURN !== "") ? true : false;
            let isAudioDataPresent = audioGlossaryData && Object.keys(audioGlossaryData).length > 0;
            let isFigureDataPresent = figureGlossaryData && Object.keys(figureGlossaryData).length > 0;
            const audioTerm = `<p audio-id=${audioGlossaryData.narrativeAudioUrn} audio-path=${audioGlossaryData.location} ${isMarkedIndexPresent?"mark-index-id="+markedIndexGlossaryData?.markedIndexEntryURN: ""}>${term.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`;
            term = term.innerHTML.match(/<p>/g) ? term.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
                : isAudioDataPresent ? audioTerm : `<p  ${isMarkedIndexPresent? "mark-index-id="+markedIndexGlossaryData?.markedIndexEntryURN : ""}>${term.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`
            const imageDefinition = `<p>${definition.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}<img src="${figureGlossaryData.path}" class="imageAssetContent" width="${figureGlossaryData.width}" height="${figureGlossaryData.height}" imageid="${figureGlossaryData.imageid}" ></p>`;
            definition = definition.innerHTML.match(/<p>/g) ? definition.innerHTML.replace(/<br data-mce-bogus="1">/g, "") 
                        : isFigureDataPresent ? imageDefinition : `<p>${definition.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`
            term = this.replaceUnwantedtags(term);
            definition = this.replaceUnwantedtags(definition);
            if(this.glossaryFootnoteDifference(term, definition, this.props.glossaryFootNoteCurrentValue.glossaryContentText, this.props.glossaryFootNoteCurrentValue.footnoteContentText, glossaryFootnoteValue.type.toLowerCase()) || this.props.markedIndexGlossaryData.isDifference == true ){
                config.isGlossarySaving = true;
                sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                saveGlossaryAndFootnote(elementWorkId, elementType, glossaryfootnoteid, type, term, definition, elementSubType, typeWithPopup, blockfeatureType, poetryField,audioGlossaryData,figureGlossaryData, markedIndexGlossaryData?.indexEntries)
            }
        }
        this.props.showGlossaaryFootnote(false);
    }
}

GlossaryFootnoteMenu.defaultProps = {
    glossaryFootnote: "Glossary"
}

GlossaryFootnoteMenu.propTypes = {
    /** Glossary or Footnote Popup to be rendered */
    glossaryFootnote: PropTypes.string,
    /** Handler to close popup on cancel button click */
    closePopup: PropTypes.func,
    /** Handler to save content of popup on save button click */
    saveContent: PropTypes.func
}

export default GlossaryFootnoteMenu;
