// import React, { useState,useRef, useEffect } from 'react';
import React, { Component } from 'react';
import {Close, ErrorOutline} from '@material-ui/icons'
import '../../styles/PrintIndexPopup/PrintIndexPopup.css';
import TextField from '@material-ui/core/TextField';
import { ShowLoader } from '../../constants/IFrameMessageTypes';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import config from '../../config/config';
import { setFormattingToolbar } from '../GlossaryFootnotePopup/GlossaryFootnote_Actions';
import { saveGlossaryAndFootnote } from "../GlossaryFootnotePopup/GlossaryFootnote_Actions";
import ReactMarkedIndexEditor from "../tinyMceMarkedIndexEditor"
import { checkforToolbarClick } from '../../js/utils'
import { render } from 'enzyme';





  class PrintIndexPopup extends Component {
    constructor(props) {
      super(props);
      //context=this;
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
    //this.setWrapperRef(this);
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

  // const wrapperRef = useRef(null);
  // useOutsideAlerter(wrapperRef);
  // let propMarkIndexvalue = props.markIndexCurrentValue;
  // let firstLevel = (propMarkIndexvalue.firstLevel && tinyMCE.$(propMarkIndexvalue.firstLevel.trim()).length) ? (tinyMCE.$(propMarkIndexvalue.firstLevel))[0].innerHTML : propMarkIndexvalue.firstLevel;
  // let secondLevel = (propMarkIndexvalue.secondLevel && tinyMCE.$(propMarkIndexvalue.secondLevel.trim()).length) ? (tinyMCE.$(propMarkIndexvalue.secondLevel))[0].innerHTML : propMarkIndexvalue.secondLevel;

  // const [indexEntry, setIndexEntry] = useState(firstLevel || '');
  // const [subEntry, setSubEntry] = useState(secondLevel || '');

  // const handleDrawerClose = value => {
  //   props.showPrintIndexPopup(value);
  // };

  // const changeIndexEntry = e => {
  //   setIndexEntry(e.target.value);
  // }

  

  // const changeSubEntry = e => {
  //   setSubEntry(e.target.value);
  // }
 
glossaryFootnoteDifference = (newTerm, newDef, oldTerm, oldDef) => {
  let domparser, newTermDom, newDefDom, oldTermDom, oldDefDom, tempVar, tempTerm;
  tempVar = oldDef;
  tempTerm = oldTerm;
  tempVar = tempVar && tempVar.replace(/\sdata-mathml/g, 'data-temp-mathml')
  domparser = new DOMParser()
  newTermDom = domparser.parseFromString(newTerm, "text/html")
  oldTermDom = domparser.parseFromString(tempTerm, "text/html")
  oldDefDom = domparser.parseFromString(tempVar, "text/html")
  newDefDom = domparser.parseFromString(newDef, "text/html")

  // if(type==='markedindex'){
  return !(newTermDom.isEqualNode(oldTermDom) && newDefDom.isEqualNode(oldDefDom))
  // }
  // switch(type){
  //     case "glossary":
  //         return !(newTermDom.isEqualNode(oldTermDom) && newDefDom.isEqualNode(oldDefDom))
  //     case "footnote":
  //         return !newDefDom.isEqualNode(oldDefDom)
  // }
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

    // if (glossaryFootnoteDifference(firstLevel, secondLevel, props.markIndexCurrentValue.firstLevel, props.markIndexCurrentValue.secondLevel)) {
      config.isGlossarySaving = true;
      sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
      saveGlossaryAndFootnote(elementWorkId, elementType, markIndexid, type, firstLevel, secondLevel, elementSubType, typeWithPopup, poetryField)
    // }
  }
  props.showMarkedIndexPopup(false, '');
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
      // setFormattingToolbar('disableGlossaryFootnoteToolbar')
  }
  // if (document.querySelector('div#toolbarGlossaryFootnote .tox-toolbar')) {
  //     if (action === "add") {
  //         setFormattingToolbar('disableGlossaryFootnoteToolbar')
  //     } else if (action === "remove") {
  //         setFormattingToolbar('disableTinymceToolbar')
  //         setFormattingToolbar('enableGlossaryFootnoteToolbar')
  //     }
  // }
}

render(){

  console.log("this.props.markedIndexCurrentValu", this.props.markedIndexCurrentValue)
  
    return (
      <div>
      <div ref={this.wrapperRef} className='index-container'>
        <div className="index-setting">
          <span className="printIndex-label">Index Settings</span>
          <span><Close onClick={() => this.props.showMarkedIndexPopup(false)} /></span>
        </div>
        <div className="index-body">
          <div className="index-text">
            <ErrorOutline />
            <span>This data is used for print only</span>
          </div>

            
          <div className="markedindex-word-header">
            <div className="markedindex-word-title">Index Entry</div>
            <div className="markedindex-word-name markedindex-word-description" id='markedindex-editor' onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
              <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.firstLevel}  className='definition-editor place-holder' placeholder="Type Something" id='markedindex-0' />
            </div>
          </div>


            <div className="markedindex-secondlevel-header">
              <div className="markedindex-secondlevel-label">Sub-Entry (optional)</div>
              <div className="index-editor markedindex-secondlevel-description" id="index-secondlevel-attacher" onFocus={() => this.toolbarHandling(null, 'remove')} onBlur={(e) => this.toolbarHandling(e, 'add')}>
                <ReactMarkedIndexEditor permissions={this.props.permissions} markIndexCurrentValue={this.props.markedIndexCurrentValue?.secondLevel} className='definition-editor place-holder' placeholder="Type Something" id='markedindex-1' />
              </div>
            </div>


          {/* <div>
            <TextField
              // id="filled-size-normal"
              label="Index Entry"
              // defaultValue="1234"
              variant="filled"
              // margin="normal"
              // size="normal"
              value={indexEntry}
              onChange={changeIndexEntry}
              fullWidth 
              multiline={true}
              autoComplete="off"
            />
            <TextField
              id="filled-required"
              label="Sub-Entry (optional)"
              // defaultValue=""
              variant="filled"
              margin="normal"
              size="normal"
              value={subEntry}
              onChange={changeSubEntry}
              fullWidth
            />
          </div> */}
          <div className="button-group">
            <span className="printIndx-cancel-button" onClick={() => this.props.showMarkedIndexPopup(false,'')}>Cancel</span>
            <span className="printIndex-save-button" disabled={false} onClick={this.saveContent}>Save</span>
          </div>
        </div>

      </div>
      </div>
    );
}
}

export default PrintIndexPopup;