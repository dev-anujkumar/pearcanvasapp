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

class PrintIndexPopup extends Component {
  constructor(props) {
    super(props);
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
    this.props.showMarkedIndexPopup(false, '');
  }

  saveMarkedIndex = () => {
    if(this.props.isInGlossary){
      getGlossaryFootnoteId(this.props.glossaryData.glossaryFootnoteValue.elementWorkId, "MARKEDINDEX", res => {
        let firstLevel = document.querySelector('#markedindex-editor > div > p');
        let secondLevel = document.querySelector('#index-secondlevel-attacher > div > p');

      firstLevel = firstLevel.innerHTML.match(/<p>/g) ? firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${firstLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`;
      secondLevel = secondLevel.innerHTML.match(/<p>/g) ? secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")
        : `<p>${secondLevel.innerHTML.replace(/<br data-mce-bogus="1">/g, "")}</p>`;

        this.props.markedIndexPopupOverGlossary(false, firstLevel, secondLevel, res.data.id);
      });
    } else {
      this.saveContent();
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
    if (document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar')) {
      if (action === "add") {
        setFormattingToolbar('disableGlossaryFootnoteToolbar')
      } else if (action === "remove") {
        setFormattingToolbar('disableTinymceToolbar')
        setFormattingToolbar('enableGlossaryFootnoteToolbar')
      }
    }
  }

  closePopUp = () =>{
    if(this.props.isInGlossary){
      const {indexEntries, markedIndexEntryURN} = this.props.markedIndexData.markedIndexGlossary;
      const {firstLevelEntry, secondLevelEntry} = JSON.parse(indexEntries[markedIndexEntryURN])
      this.props.markedIndexPopupOverGlossary(false, firstLevelEntry, secondLevelEntry, markedIndexEntryURN);
    } else {
      this.props.showMarkedIndexPopup(false,'')
    }
  }

  render() {

    return (
      <div>
        <div className='index-container'>
          <div className="index-setting">
            <span className="printIndex-label">Index Settings</span>
            <span><Close onClick={this.closePopUp} /></span>
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
              <div className="markedindex-word-title">Index Entry</div>
              <div className="markedindex-word-name markedindex-word-description" id='markedindex-editor' onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.firstLevel} className='markedindex-editor place-holder' placeholder="Type Something" id='markedindex-0' />
              </div>
            </div>

            <div className="markedindex-secondlevel-header">
              <div className="markedindex-secondlevel-label">Sub-Entry (optional)</div>
              <div className="index-editor markedindex-secondlevel-description" id="index-secondlevel-attacher" onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.secondLevel} className='markedindex-editor place-holder' placeholder="Type Something" id='markedindex-1' />
              </div>
            </div>

            <div className="button-group">
              <span className="printIndx-cancel-button" onClick={this.closePopUp}>Cancel</span>
              <span className="printIndex-save-button" disabled={false} onClick={this.saveMarkedIndex}>Save</span>
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