import React, { useState } from "react";
import { Fragment } from "react";
import TinyMceEditor from "../tinyMceEditor";
import { dropdownArrow } from "../../images/ElementButtons/ElementButtons.jsx";
import { UsageTypeDropdown } from "../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx";
import "../../styles/ElementDiscussion/ElementDiscussion.css";

const USAGE_TYPES = [
  "Standard Discussion",
  "Self Reflection First",
  " Self Reflection Second",
];

const ElementDiscussion = (props) => {
  const {
    title = "Preflight Decouple Migration",
    itemId = "urn:pearson:work:256fb5c8-093d-4fc0-bbcc-66370be5014e",
    LOB = 'HBO',
    selectedUsageType = null,
  } = props;
  const [showUsageTypeOptions, setshowUsageTypeOptions] = useState(false);
  const [usageType, setUsageType] = useState(selectedUsageType);
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
          model={props.element?.html?.label}
          handleBlur={(
            forceupdate,
            currentElement,
            eIndex,
            showHideType,
            eventTarget
          ) => {
            console.log("outer blur");
          }}
          handleEditorFocus={() => {}}
        />
        <p class="title">{`Title:   ${title}`}</p>
        <p class="title">{`ITEM ID:   ${itemId}`}</p>
        {LOB !== null && <p class="title">{`Line of business:   ${LOB}`}</p>}
        {LOB === null && (
          <div>
            <span class="title">Line of business:</span>
            <span>
              Discussions vary by business. Please select your line of business
              for this project in the Universal Dashboard first
            </span>
          </div>
        )}

        <div className="single-assessment-usagetype-container bottomMargin">
          <div className="singleAssessment_Dropdown_SelectLabel">
            Select usage type<span className="required"></span>
          </div>
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
                    usageTypeList={USAGE_TYPES}
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
          src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
          className="discussionImage"
        />
      </Fragment>
    </header>
  );
};

export default ElementDiscussion;
