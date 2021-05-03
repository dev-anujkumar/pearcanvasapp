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
import { element } from "prop-types";

// see review mode
// conditions

const ElementDiscussion = (props) => {
  let assessmentid = "";
  let assessmenttitle = "";
  let usagetype = null;

  let elementdata = props?.element?.elementdata;
  if (elementdata) {
    assessmentid = elementdata.assessmentid;
    assessmenttitle = elementdata.assessmenttitle;
    usagetype = elementdata.usagetype;
  }

  const LOB = useSelector((state) => state.projectInfo.lineOfBusiness);
  const USAGE_TYPES = useSelector((state) => state.projectInfo.usageType);
  const [showUsageTypeOptions, setshowUsageTypeOptions] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [usageType, setUsageType] = useState(usagetype);
  const [itemId, setItemId] = useState(assessmentid);
  const [title, setTitle] = useState(assessmenttitle);

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
    <div className="containerDiscussion">
      <div>
        <div className="figureElement">
          <div>
            <figure>
              <header>
                <TinyMceEditor
                  permissions={props.permissions}
                  element={props.element}
                  handleEditorFocus={props.handleFocus}
                  handleBlur={(
                    forceupdate,
                    currentElement,
                    eIndex,
                    showHideType,
                    eventTarget
                  ) => {
                    const html = {
                      title: eventTarget.innerHTML
                    }
                    callUpdateApi({
                      ...props.element,
                      html,
                    });
                  }}
                  index={`${props.index}-0`}
                  placeholder="Enter Label..."
                  tagName={"h4"}
                  className={" figureLabel "}
                  model={props.element.html.title}
                  slateLockInfo={props.slateLockInfo}
                  elementId={props.elementId}
                />
              </header>
            </figure>
          </div>
        </div>
        <div>
          <span className="discussionItemTitle">Title ID:</span>
          <span className="valueDiscussion">{title}</span>
        </div>

        <div className="rowDiscussion">
          <span className="discussionItemTitle">ITEM ID:</span>
          <span className="valueDiscussion">{itemId}</span>
        </div>

        <div className="rowDiscussion">
          <span className="lobTitleDiscussion">Line of business:</span>

          {LOB === undefined && (
            <div className="lobNotPresentDiscussion">
              Discussions vary by business. Please select your line of business
              for this project in the Universal Dashboard first
            </div>
          )}
          {typeof LOB === "string" && <span>{`${LOB}`}</span>}
        </div>

        {/* <p className="title">{`Title:   ${title}`}</p>
        <p className="discussionItemTitle">{`ITEM ID:   ${itemId}`}</p>
        {typeof LOB === 'string' && <p className="title">{`Line of business:   ${LOB}`}</p>} */}

        <div className="usageTypeContainerDiscussion rowDiscussion">
          <div className="usageTypeTitleDiscussion">Select usage type</div>
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
                      const elementdata = {
                        ...props.element.elementdata,
                        usagetype: usageType,
                      };

                      callUpdateApi({
                        ...props.element,
                        elementdata,
                      });
                    }}
                  />
                }
              </ul>
            ) : null}
          </div>
        </div>
        <img
          onClick={() => {
            if (LOB !== undefined && usageType !== null) {
              sendDataToIframe({ type: "hideToc", message: {} });
              showTocBlocker(true);
              disableHeader(true);
              setShowDialog(true);
            }
          }}
          src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
          className={`discussionImage ${
            usageType === null ? "imageNotSelectedDiscussion" : ""
          }`}
        />
      </div>
      <DiscussionDialog
        selectDiscussion={(item) => {
          // update itemid, title in update api
          console.log("the item is 5555 ", item);
          const elementdata = {
            assessmentid: item.discussionUrn,
            assessmenttitle: item.title,
            usagetype: usageType,
          };

          setItemId(item.discussionUrn);
          setTitle(item.title);
          callUpdateApi({
            ...props.element,
            elementdata,
          });
        }}
        closeDialog={() => {
          setShowDialog(false);
          hideBlocker(true);
          hideTocBlocker(true);
          disableHeader(false);
        }}
        showDialog={showDialog}
      />
    </div>
  );
};

const dispatchActions = {
  updateElement,
};

export default connect(null, dispatchActions)(ElementDiscussion);
