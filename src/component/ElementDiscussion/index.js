import React, { useState } from "react";
import { Fragment } from "react";
import TinyMceEditor from "../tinyMceEditor";
import { dropdownArrow } from "../../images/ElementButtons/ElementButtons.jsx";
import { UsageTypeDropdown } from "../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx";
import "../../styles/ElementDiscussion/ElementDiscussion.css";
import { useSelector } from "react-redux";
import DiscussionDialog from "./DiscussionDialog";
import { createDiscussionForUpdateAPI } from "./Utils";
import { updateElement } from "../ElementContainer/ElementContainer_Actions";
import { connect } from "react-redux";
import {
  disableHeader,
  hideBlocker,
  hideTocBlocker,
  showTocBlocker,
} from "../../js/toggleLoader";
import { sendDataToIframe } from "../../constants/utility";
import config from "../../config/config";

// see review mode
// conditions

const ElementDiscussion = (props) => {
  const { title, itemId, selectedUsageType = null } = props;
  const LOB = useSelector((state) => state.projectInfo.lineOfBusiness);
  const USAGE_TYPES = useSelector((state) => state.projectInfo.usageType);
  const [showUsageTypeOptions, setshowUsageTypeOptions] = useState(false);
  const [usageType, setUsageType] = useState(selectedUsageType);
  const [showDialog, setShowDialog] = useState(false);

  const callUpdateApi = (elementDiscussion) => {
    /* @@createPSDataForUpdateAPI - Prepare the data to send to server */
    const { index, parentUrn, asideData, parentElement } = props;
    const dataToSend = createDiscussionForUpdateAPI(props, elementDiscussion);
    sendDataToIframe({ type: "isDirtyDoc", message: { isDirtyDoc: true } });
    config.isSavingElement = true;
    props.updateElement(
      dataToSend,
      index,
      parentUrn,
      asideData,
      null,
      parentElement,
      null
    );
  };
  return (
    <header class="container">
      <Fragment>
        <TinyMceEditor
          permissions={props.permissions}
          element={props.element}
          slateLockInfo={props.slateLockInfo}
          elementId={props.elementId}
          index={`${props.index}-DE-Label`}
          placeholder="Enter Label..."
          tagName={"h4"}
          model={props.element?.html?.label || "<p></p>"}
          handleBlur={(
            forceupdate,
            currentElement,
            eIndex,
            showHideType,
            eventTarget
          ) => {
            callUpdateApi({
              ...props.element,
              html: {
                ...props.element.html,
                label: "almighty cybress",
              },
            });
          }}
          handleEditorFocus={() => {}}
        />

        <div>
          <span class="discussionItemTitle">Title ID:</span>
          <span></span>
        </div>

        <div className="row">
          <span class="discussionItemTitle">ITEM ID:</span>
          <span class="lobNotPresent"></span>
        </div>

        <div className="row">
          <span class="lobTitle">Line of business:</span>

          {LOB === undefined && (
            <div class="lobNotPresent">
              Discussions vary by business. Please select your line of business
              for this project in the Universal Dashboard first
            </div>
          )}
          {typeof LOB === "string" && <span>{`${LOB}`}</span>}
        </div>

        {/* <p class="title">{`Title:   ${title}`}</p>
        <p class="discussionItemTitle">{`ITEM ID:   ${itemId}`}</p>
        {typeof LOB === 'string' && <p class="title">{`Line of business:   ${LOB}`}</p>} */}

        <div className="usageTypeContainer row">
          <div className="usageTypeTitle">Select usage type</div>
          <div
            className={`singleAssessment_Dropdown_activeDropdown`}
            onClick={() => {
              if (LOB !== null) {
                setshowUsageTypeOptions(!showUsageTypeOptions);
              }
            }}
          >
            <span className="singleAssessment_Dropdown_currentLabel">
              {usageType !== null ? usageType : "Select"}
            </span>
            <span className="singleAssessment_Dropdown_arrow">
              {dropdownArrow}
            </span>
            {showUsageTypeOptions ? (
              <ul className="slate_assessment_type_dropdown_options">
                {
                  <UsageTypeDropdown
                    usageTypeList={USAGE_TYPES.map((item) => item.label)}
                    clickHandlerFn={(usageType) => {
                      setshowUsageTypeOptions(false);
                      setUsageType(usageType);
                    }}
                  />
                }
              </ul>
            ) : null}
          </div>
        </div>
        <img
          onClick={() => {
            if (LOB !== undefined) {
              sendDataToIframe({ type: "hideToc", message: {} });
              showTocBlocker(true);
              disableHeader(true);
              setShowDialog(true);
            }
          }}
          src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
          className="discussionImage"
        />
      </Fragment>
      <DiscussionDialog
        selectItemId={(item) => {
        }}
        closeDialog={() => {
          setShowDialog(false);
          hideBlocker(true);
          hideTocBlocker(true);
          disableHeader(false);
        }}
        showDialog={showDialog}
      />
    </header>
  );
};

const dispatchActions = {
  updateElement,
};

export default connect(null, dispatchActions)(ElementDiscussion);
