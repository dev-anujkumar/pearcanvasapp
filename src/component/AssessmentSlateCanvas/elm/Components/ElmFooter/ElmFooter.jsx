/**
* Footer Component of ELM Assessment
*/
import React, { useEffect } from 'react';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import {
  elmAssessmentItem,
  singleAssessmentItemIcon,
} from "../../../../../images/ElementButtons/ElementButtons.jsx";
import config from "../../../../../config/config";
import { handlePostMsgOnAddAssess } from '../../../../ElementContainer/AssessmentEventHandling';
import { PUF } from '../../../AssessmentSlateConstants.js';

const ElmFooter = (props) => {
  const { buttonText, sendPufAssessment, closeElmWindow, openAssessmentSearchBar,
    activeAssessmentType,
    addPufFunction,
    containerUrn,
    activeUsageType } = props.elmFooterProps;

  const { addFlag, hideSearch, openItemTable,
    currentAssessmentSelected,
    openedFrom,
    error
  } = props;

  /* render on change in openItemTable */
  useEffect(() => { }, [openItemTable]);

  const openSearchBar = (e) => {
    e.preventDefault();
    openAssessmentSearchBar(true, true)
  }
  const handleFocus = (event) => {
    event.stopPropagation();
  }

/* open elm portal */
  function openElmPortal() {
    let tempUrl = "";

  /* Open ELM portal for Add new Assessment in Assessment slate */
    if (openedFrom === "slateAssessment") {
      tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/assessment/createInPlace`;
    }
    /* Open ELM portal for Add new Item in Existing Assessment */
    if (openedFrom === "singleAssessment") {
      const assessmentWUrn = currentAssessmentSelected?.urn;
      if (assessmentWUrn && openItemTable) {
        tempUrl =
          `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWUrn}/item/createInPlace`
      }
    /* Open Elm portal for Add new Assessment in single assessment */
      if (!openItemTable) {
        tempUrl =
          `${config.ELM_PORTAL_URL}/launch/editor/assessment/New/item/createInPlace`;
      }
    }

    if (tempUrl) {
      const usageType = activeUsageType ? activeUsageType.replace(" ", "").toLowerCase() : "";
      const url = tempUrl +
        "?containerUrn=" + containerUrn +
        "&projectUrn=" + config.projectUrn +
        "&usageType=" + usageType;

    /* open elm portal */
      window.open(url);
    /**@function call for add listeners to get data from elm portal */
      handlePostMsgOnAddAssess(addPufFunction, activeUsageType);
      closeElmWindow();
    }
  }

/** @function to disable new button */
  function shouldNewDisable() {
    const flag = openItemTable ?
      currentAssessmentSelected?.type === "assessmentItem" :
      currentAssessmentSelected?.type === "assessment";
    return flag;
  }

  return (
    <div className="puf-footer">
      {/* Create new Assessment/Item only for PUF */}
      {activeAssessmentType === PUF && (
        <button
          className="puf-button create-button"
          onClick={openElmPortal}
          disabled={shouldNewDisable()}
        >
          <span className="margin-right-5px">
            {openItemTable ? singleAssessmentItemIcon : elmAssessmentItem}
          </span>
          <span>NEW</span>
        </button>
      )}
      {/* hide following when project has no Elm assessments */}
      { !error && (<>
          <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment} onFocus={handleFocus}>{buttonText}</button>
          <button className="puf-button cancel" onClick={closeElmWindow} onFocus={handleFocus}>CANCEL</button>
          <button className={`puf-button search-button ${hideSearch ? "puf-assessment" : ""}`} onClick={openSearchBar}>SEARCH</button>
      </>)}
    </div>
  );
}
export default ElmFooter;