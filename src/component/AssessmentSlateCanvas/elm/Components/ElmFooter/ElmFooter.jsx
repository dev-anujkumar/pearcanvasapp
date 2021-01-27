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

const ElmFooter = (props) => {
    const { buttonText, sendPufAssessment, closeElmWindow, openAssessmentSearchBar } = props.elmFooterProps;
    const { addFlag, hideSearch, openItemTable, handlePostMsgOnAddAssess, activeAssessmentType,
              activeUsageType,
              isAssessmentSeleted,
              } = props;

     /* render on change in openItemTable */
    useEffect(() => {}, [openItemTable]);

    const openSearchBar = (e) => {
        e.preventDefault();
        openAssessmentSearchBar(true,true)
    }
    const handleFocus = (event) => {
        event.stopPropagation();
     }

    function openElmPortal() {
      let tempUrl = "";
      if (openItemTable) {
        /* Open portal for Add new Item in Assessment */
        tempUrl =
          "https://assessmentauthoring-dev.pearson.com/launch/editor/assessment/New/item/createInPlace";
      } else {
        /* Open portal for Add new Assessment */
        tempUrl = //config.ELM_ASSESSMENT.ADD_NEW_ASSESSMENT;
          "https://assessmentauthoring-dev.pearson.com/launch/editor/assessment/createInPlace";
      }
      const url =
        tempUrl +
        "?containerUrn=" + config.slateManifestURN +
        "&projectUrn=" + config.projectUrn +
        "&usageType=" + activeUsageType;
  
      window.open(url);
      handlePostMsgOnAddAssess();
      //handleElmPortalEvents();
      closeElmWindow();
    }

    return (
        <div className="puf-footer">
            {activeAssessmentType === "puf" && (
                <button
                  className="puf-button create-button"
                  onClick={openElmPortal}
                  disabled={isAssessmentSeleted}
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