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
import { get, isEmpty } from 'lodash';
import { handlePostMsgOnAddAssess } from '../../../../ElementContainer/AssessmentEventHandling';

const ElmFooter = (props) => {
  const { buttonText, sendPufAssessment, closeElmWindow, openAssessmentSearchBar } = props.elmFooterProps;
  const { addFlag, hideSearch, openItemTable, activeAssessmentType,
    activeUsageType,
    currentAssessmentSelected,
    openedFrom,
    addPufFunction,
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

  function openElmPortal() {
    let tempUrl = "";

    /* Open ELM portal for Add new Assessment */
    if (openedFrom === "slateAssessment") {
      tempUrl = //config.ELM_ASSESSMENT.ADD_NEW_ASSESSMENT;
        `${config.ELM_PORTAL_URL}/launch/editor/assessment/createInPlace`;
    }
    /* Open ELM portal for Add new Item in Existing Assessment */
    if (openedFrom === "singleAssessment") {
      const assessmentWUrn = get(currentAssessmentSelected, "urn");
      if (assessmentWUrn && openItemTable) {
        tempUrl = `${config.ELM_PORTAL_URL}/launch/editor/assessment/${assessmentWUrn}/item/createInPlace`
      }
      /* Open Elm portal for Add new Assessment */
      if (!openItemTable) {
        tempUrl =
          `${config.ELM_PORTAL_URL}/launch/editor/assessment/New/item/createInPlace`;
      }
    }

    if (tempUrl) {
      const url = tempUrl +
        "?containerUrn=" + config.slateManifestURN +
        "&projectUrn=" + config.projectUrn +
        "&usageType=" + activeUsageType;

      window.open(url);
      handlePostMsgOnAddAssess(addPufFunction, currentAssessmentSelected);
      closeElmWindow();
    }
  }

  function shouldNewDisable() {
    const flag = openItemTable ?
      get(currentAssessmentSelected, 'type') === "assessmentItem" :
      get(currentAssessmentSelected, 'type') === "assessment"
    return flag;
  }

  return (
    <div className="puf-footer">
      {activeAssessmentType === "puf" && (
        <button
          className="puf-button create-button"
          onClick={openElmPortal}
          disabled={shouldNewDisable()}
        >
          <span>
            {openItemTable && singleAssessmentItemIcon}
            {!openItemTable && elmAssessmentItem}
          </span>
          <span>&nbsp;NEW</span>
        </button>
      )}
      <button className={`puf-button add-button ${addFlag ? 'add-button-enabled' : ''}`} disabled={!addFlag} onClick={sendPufAssessment} onFocus={handleFocus}>{buttonText}</button>
      <button className="puf-button cancel" onClick={closeElmWindow} onFocus={handleFocus}>CANCEL</button>
      <button className={`puf-button search-button ${hideSearch ? "puf-assessment" : ""}`} onClick={openSearchBar}>SEARCH</button>
    </div>
  );
}
export default ElmFooter;