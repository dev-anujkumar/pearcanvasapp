import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Close, ErrorOutline } from '@material-ui/icons'
import '../../styles/MarkIndexPopup/MarkIndexPopup.css';
import { ShowLoader } from '../../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import config from '../../config/config';
import { setFormattingToolbar } from '../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import { saveGlossaryAndFootnote } from "../GlossaryFootnotePopup/GlossaryFootnote_Actions";
import { getGlossaryFootnoteId } from '../../js/glossaryFootnote';
import { markedIndexPopupOverGlossary } from '../MarkIndexPopup/MarkIndex_Action';
import ReactMarkedIndexEditor from "../tinyMceMarkedIndexEditor"
import { checkforToolbarClick } from '../../js/utils'
import { CrossReference } from './MarkIndex_CrossReference';

class PrintIndexPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markIndexCurrentValue: this.props.markedIndexCurrentValue?.secondLevel ? (tinyMCE.$(this.props.markedIndexCurrentValue?.secondLevel))[0].innerHTML : ''
    }
    this.wrapperRef = null;
  }


  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (!this.props.isInGlossary) {
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

  markedIndexValueDifference = (newEntry, newSubEntry, oldEntry, oldSubEntry) => {
    let domparser, newEntryDom, newSubEntryDom, oldEntryDom, oldSubEntryDom, tempVar, tempTerm;
    tempVar = oldSubEntry;
    tempTerm = oldEntry;
    tempVar = tempVar && tempVar.replace(/\sdata-mathml/g, 'data-temp-mathml')
    domparser = new DOMParser()
    newEntryDom = domparser.parseFromString(newEntry, "text/html")
    oldEntryDom = domparser.parseFromString(tempTerm, "text/html")
    oldSubEntryDom = domparser.parseFromString(tempVar, "text/html")
    newSubEntryDom = domparser.parseFromString(newSubEntry, "text/html")

    return !(newEntryDom.isEqualNode(oldEntryDom) && newSubEntryDom.isEqualNode(oldSubEntryDom))
  }

  saveContent = () => {

    if (!hasReviewerRole()) {
      const { markedIndexValue } = this.props;
      let { elementWorkId, elementType, markIndexid, type, elementSubType, typeWithPopup, poetryField } = markedIndexValue;
      let firstLevel = null;
      let secondLevel = null;
      let defaultValue = document.createElement('p')
      firstLevel = document.querySelector('#markedindex-editor > div > p') || defaultValue;
      tinymce.$(firstLevel).find('[data-mce-bogus]').each(function () {
        let innerHtml = innerHTML;
        outerHTML = innerHtml;
      })
      secondLevel = document.querySelector('#index-secondlevel-attacher > div > p') || defaultValue;
      tinymce.$(secondLevel).find('[data-mce-bogus]').each(function () {
        let innerHtml = this.innerHTML;
        this.outerHTML = innerHtml;
      })
      firstLevel = firstLevel.innerHTML.match(/<p>/g) ? firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`
      secondLevel = secondLevel.innerHTML.match(/<p>/g) ? secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`

      if (this.markedIndexValueDifference(firstLevel, secondLevel, this.props.markedIndexCurrentValue.firstLevel, this.props.markedIndexCurrentValue.secondLevel)) {
        config.isGlossarySaving = true;
        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
        saveGlossaryAndFootnote(elementWorkId, elementType, markIndexid, type, firstLevel, secondLevel, elementSubType, typeWithPopup, poetryField)
      }
    }
    this.props.showMarkedIndexPopup(false);
  }

  saveMarkedIndex = async () => {
    if(this.props.isInGlossary){
      let {elementWorkId, elementType,  type, elementSubType, typeWithPopup, poetryField} = this.props.markedIndexData.markedIndexValue;
      let { markedIndexEntryURN } = this.props.markedIndexData.markedIndexGlossary;
      let firstLevel = document.querySelector('#markedindex-editor > div > p');
      let secondLevel = document.querySelector('#index-secondlevel-attacher > div > p');

      firstLevel = firstLevel.innerHTML.match(/<p>/g) ? firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`;
      secondLevel = secondLevel.innerHTML.match(/<p>/g) ? secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`;

      
      let checkDifference = this.markedIndexValueDifference(firstLevel, secondLevel, this.props.markedIndexCurrentValue.firstLevel, this.props.markedIndexCurrentValue.secondLevel)
      if(markedIndexEntryURN){
        if(checkDifference){
          await saveGlossaryAndFootnote(elementWorkId, elementType, markedIndexEntryURN, type, firstLevel, secondLevel, elementSubType, typeWithPopup, poetryField);
        }
        this.props.markedIndexPopupOverGlossary(false, firstLevel, secondLevel, markedIndexEntryURN, checkDifference);
      } else{
        getGlossaryFootnoteId(this.props.glossaryData.glossaryFootnoteValue.elementWorkId, "MARKEDINDEX", async res => {
          await saveGlossaryAndFootnote(elementWorkId, elementType, res.data.id, type, firstLevel, secondLevel, elementSubType, typeWithPopup, poetryField);
          this.props.markedIndexPopupOverGlossary(false, firstLevel, secondLevel, res.data.id, checkDifference);
          this.props.showingToastMessage(true);
        });
      }
    } else {
      const { markedIndexValue } = this.props.markedIndexData;
      this.saveContent();
      if (Object.keys(markedIndexValue).includes('isNewIndex') && markedIndexValue?.isNewIndex) {
        this.props.showingToastMessage(true);
      }
    }
  }

  toolbarHandling = (e, action = "") => {
    let relatedTargets = (e && e.relatedTarget && e.relatedTarget.classList) ? e.relatedTarget.classList : [];
    if (e && checkforToolbarClick(relatedTargets)) {
      e.stopPropagation();
      return;
    }
    if (e && e.type == 'blur') {
      /** to disable both toolbars on glossary editor blur */
      setFormattingToolbar('disableTinymceToolbar')
      setFormattingToolbar('disableGlossaryFootnoteToolbar')
    }
  }

  closePopUp = () =>{
    if(this.props.isInGlossary){
      this.props.markedIndexPopupOverGlossary(false);
    } else {
      this.props.showMarkedIndexPopup(false)
    }
  }

 /** to removed tinymce instance */
  componentWillUnmount() {
    for (let i = tinymce.editors.length - 1; i > -1; i--) {
      let ed_id = tinymce.editors[i].id;
      if (ed_id.includes('markedindex')) {
        let tempContainerHtml = tinyMCE.$("#" + ed_id).html();
        tempContainerHtml = tempContainerHtml.replace(/\sdata-mathml/g, ' data-temp-mathml').replace(/\"Wirisformula/g, '"temp_Wirisformula').replace(/\sWirisformula/g, ' temp_Wirisformula');
        document.getElementById(ed_id).innerHTML = tempContainerHtml;
        tinymce.remove(`#${ed_id}`)
        tinymce.$('.wrs_modal_desktop').remove();
      }
    }
  }

  render() {
    let buttonText = ""
    const {markedIndexValue, markedIndexGlossary } =  this.props.markedIndexData;
    if(Object.keys(markedIndexValue).includes('isNewIndex')){
      buttonText = markedIndexValue.isNewIndex ? 'Add': 'Update'
    } else {
      buttonText = markedIndexGlossary.markedIndexEntryURN ? 'Update': 'Add'
    }
    return (
      <div>
        <div className='index-container' ref={this.setWrapperRef}>
          <div className="index-setting">
            <span className="printIndex-label">Index Settings</span>
            <span className="marked-close-icon"><Close onClick={this.closePopUp} /></span>
          </div>
          <div className="index-body">
            <div className="index-text">
              <ErrorOutline />
              <span>This data is used for print only</span>
            </div>
            <div className="hide-markedinde-toolbar">
              <div id="toolbarGlossaryFootnote"></div>
            </div>

            <div className="markedindex-word-header">
              <div id='markedindex-editor' onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                <div className="markedindex-word-title">
                  <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.firstLevel} className='markedindex-editor place-holder index-entry' id='markedindex-0' markedLabelId="firstLevel" />
                  <label id="firstLevel" className="transition-none">Index Entry</label>
                </div>
              </div>
            </div>

            <div className="markedindex-secondlevel-header">
              <div id="index-secondlevel-attacher" onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                <div className="markedindex-secondlevel-label">
                  <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.secondLevel} className='markedindex-editor place-holder sub-entry' id='markedindex-1' markedLabelId="secondLevel" />
                  <label id="secondLevel" className={this.state.markIndexCurrentValue === '' ? "floating-title" : "transition-none"} >Sub-Entry</label>
                </div>
              </div>
            </div>
            
            <CrossReference />

            <div className="button-group">
              <span className="printIndx-cancel-button" onClick={this.closePopUp}>Cancel</span>
              <span className="printIndex-save-button" disabled={false} onClick={this.saveMarkedIndex}>{buttonText}</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    glossaryData: state.glossaryFootnoteReducer,
    markedIndexData:  state.markedIndexReducer
  }
}

export default connect(mapStateToProps, { markedIndexPopupOverGlossary })(PrintIndexPopup);