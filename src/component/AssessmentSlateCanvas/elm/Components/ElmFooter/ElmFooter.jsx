/**
* Footer Component of ELM Assessment
*/
import React from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import {
  elmAssessmentItem,
  singleAssessmentItemIcon,
  elmInteractiveIcon
} from "../../../../../images/ElementButtons/ElementButtons.jsx";
import config from "../../../../../config/config";
import { handlePostMsgOnAddAssess } from '../../../../ElementContainer/AssessmentEventHandling';
import { ELM_INT, ASSESSMENT_PICKER_OPENERS } from '../../../AssessmentSlateConstants.js';

const ElmFooter = (props) => {
  const { buttonText, sendPufAssessment, closeElmWindow, openAssessmentSearchBar,
    activeAssessmentType,
    addPufFunction,
    containerUrn,
    activeUsageType } = props.elmFooterProps;

  const { addFlag, hideSearch, openItemTable,
    currentAssessmentSelected,
    openedFrom,
    errorNoElmItem,
    activeRadioIndex = null
  } = props;

  const openSearchBar = (e) => {
    e.preventDefault();
    openAssessmentSearchBar(true, true)
  }
  const handleFocus = (event) => {
    event.stopPropagation();
  }

/* open elm portal */
  function openElmPortal() {
    try {
        let tempUrl = "";

        /* Open ELM portal for Add new Assessment in Assessment slate */
        if (openedFrom === ASSESSMENT_PICKER_OPENERS.FULL_ASSESSMENT) {
          tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/assessment/createInPlace`;
        }
        /* Open ELM portal for Add new Item in "Existing Assessment" */
        if (openedFrom === ASSESSMENT_PICKER_OPENERS.SINGLE_ASSESSMENT) {
          let assessmentWUrn = "";
          const type = currentAssessmentSelected?.type;
          if(type === "assessmentItem"){
              assessmentWUrn = currentAssessmentSelected?.assessmentId
          }else if(type === "assessment"){
              assessmentWUrn = currentAssessmentSelected?.urn
          }
          if (openItemTable && assessmentWUrn) {
            tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWUrn}/item/createInPlace`;
          }
          /* Open Elm portal for Add new Assessment in single assessment */ 
          if (!openItemTable) {
            tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/assessment/New/item/createInPlace`;
          }
          /* Open Elm portal for Add new -- interactive -- in elm-interactive */ 
          if (!openItemTable && activeAssessmentType === ELM_INT) {
            tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/interactive/createInPlace`;
          }
        }
        if (tempUrl) {
          let url = `${tempUrl}?containerUrn=${containerUrn}&projectUrn=${config.projectUrn}`;

          if (activeAssessmentType !== ELM_INT) { /* if NOT Interactive elm then append usageType param */
            const usageType = activeUsageType ? activeUsageType.replace(" ", "").toLowerCase() : "";
            url = `${url}&usageType=${usageType}`;
          }
        /* open elm portal */
          window.open(url);
        /**@function call for add listeners to get data from elm portal */
          handlePostMsgOnAddAssess(addPufFunction, activeUsageType);
          closeElmWindow();
        }
    } catch (err) {
          console.error("catch with err", err);
      }
  }

  return (
    <div className="puf-footer">
      {!errorNoElmItem && <button className={`puf-button search-button ${hideSearch ? "puf-assessment" : ""}`} onClick={openSearchBar}>SEARCH</button>}
      {/* Create new Assessment/Item from Cypress */}
      <button className="puf-button create-button" onClick={openElmPortal} disabled={activeRadioIndex !== null} >
        <span className="elm-create-button-icons">
          {openItemTable ? singleAssessmentItemIcon :
            (activeAssessmentType === ELM_INT) ? elmInteractiveIcon : elmAssessmentItem}
        </span>
        <span>NEW</span>
      </button>
      { !errorNoElmItem && (<>
          <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment} onFocus={handleFocus}>{buttonText}</button>
          <button className="puf-button cancel" onClick={closeElmWindow} onFocus={handleFocus}>CANCEL</button>
      </>)}
    </div>
  );
}
export default ElmFooter;