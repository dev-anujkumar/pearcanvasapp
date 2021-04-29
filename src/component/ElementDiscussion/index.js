import React, { useState } from "react";
import { Fragment } from "react";
import TinyMceEditor from "../tinyMceEditor";
import { dropdownArrow } from "../../images/ElementButtons/ElementButtons.jsx";
import { UsageTypeDropdown } from "../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx";
import "../../styles/ElementDiscussion/ElementDiscussion.css";
import { useSelector } from "react-redux";

const USAGE_TYPES = [
  "Standard Discussion",
  "Self Reflection First",
  " Self Reflection Second",
];

const ElementDiscussion = (props) => {
  const {
    title = "Preflight Decouple Migration",
    itemId = "urn:pearson:work:256fb5c8-093d-4fc0-bbcc-66370be5014e",
    selectedUsageType = null,
  } = props;
  const LOB = useSelector((state) => state.projectInfo.lineOfBusiness);
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
          model={props.element?.html?.label || '<p></p>'}
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
          <div className="usageTypeTitle">
            Select usage type
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
