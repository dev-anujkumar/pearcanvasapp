import React, { useState } from "react";
import TinyMceEditor from "../tinyMceEditor";
import { dropdownArrow } from "../../images/ElementButtons/ElementButtons.jsx";
import { UsageTypeDropdown } from "../AssessmentSlateCanvas/UsageTypeDropdown/UsageTypeDropdown.jsx";
import "../../styles/ElementDiscussion/ElementDiscussion.css";
import { useSelector,connect } from "react-redux";
import DiscussionDialog from "./DiscussionDialog";
import { getLOBDiscussionItems } from "../CanvasWrapper/CanvasWrapper_Actions";
import { createDiscussionForUpdateAPI, clearElement, removeLabel } from "./Utils";
import { updateElement } from "../ElementContainer/ElementContainer_Actions";
import {
  disableHeader,
  hideBlocker,
  hideTocBlocker,
  showTocBlocker,
} from "../../js/toggleLoader";
import {
  hasReviewerRole,
  matchHTMLwithRegex,
  removeClassesFromHtml,
  sendDataToIframe,
} from "../../constants/utility";
import config from "../../config/config";
import { replaceUnwantedtags } from "../ElementContainer/UpdateElements";

// see review mode
// conditions

const ElementDiscussion = (props) => {
  let itemid = "";
  let importeddiscussiontitle = {};
  let usagetype = '';
  let htmltitle = props?.element?.html?.title;
  let smartlink = ''
  let blockdata = props?.element?.blockdata;
  if (blockdata) {
    itemid = blockdata.itemid;
    importeddiscussiontitle = blockdata.importeddiscussiontitle;
    usagetype = blockdata.usagetype;
    smartlink = blockdata.path;
  }

  const LOB = useSelector((state) => state.projectInfo.lineOfBusiness);
  const USAGE_TYPES = useSelector((state) => state.projectInfo.usageType);
  const [showUsageTypeOptions, setshowUsageTypeOptions] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [usageType, setUsageType] = useState(usagetype);
  const [itemId, setItemId] = useState(itemid);
  const [title, setTitle] = useState(importeddiscussiontitle.text);
  const [htmlTitle, setHtmlTitle] = useState(htmltitle);
  const [path, setPath] = useState(smartlink)
  const callUpdateApi = (elementDiscussion) => {
    // if there is any change only than update
    if (JSON.stringify(elementDiscussion) !== JSON.stringify(props.element)) {
      /* @@createPSDataForUpdateAPI - Prepare the data to send to server */
      if(hasReviewerRole()) {
        return true
      }
      const { index, parentUrn, asideData, parentElement } = props;
      const clearedElement = clearElement(elementDiscussion);
      const dataToSend = createDiscussionForUpdateAPI(props, clearedElement);
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
    }
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
                    const lastTitle = props?.element?.html?.title;

                    // create data and call update API
                    let newTitle = replaceUnwantedtags(
                      eventTarget?.innerHTML,
                      true
                    );
                    newTitle = matchHTMLwithRegex(newTitle)
                      ? newTitle
                      : `<p><label>${newTitle}</label></p>`;
                    const html = {
                      title: newTitle,
                    };
                    if (
                      removeClassesFromHtml(lastTitle) !==
                        removeClassesFromHtml(newTitle) &&
                      !config.savingInProgress
                    ) {
                      setHtmlTitle(newTitle);
                      callUpdateApi({
                        ...props.element,
                        html,
                      });
                    }
                  }}
                  index={`${props.index}-0`}
                  placeholder="Enter Label..."
                  tagName={"h4"}
                  className={" figureLabel "}
                  model={removeLabel(props.element.html.title)}
                  slateLockInfo={props.slateLockInfo}
                  elementId={props.elementId}
                />
              </header>
            </figure>
          </div>
        </div>
        <div className="rowDiscussion">
          <span className="discussionItemTitle">Title:</span>
          <span className="valueDiscussion">{title}</span>
        </div>

        <div className="rowDiscussion">
          <span className="discussionItemTitle">ITEM ID:</span>
          <span className="valueDiscussion itemIdDiscussion">{itemId}</span>
        </div>

        <div className="rowDiscussion">
          <span className="discussionItemTitle">Line of Business:</span>

          {LOB === undefined && (
            <div className="lobNotPresentDiscussion">
              Discussions vary by business. Please select your line of business
              for this project in the Universal Dashboard first
            </div>
          )}
          {typeof LOB === "string" && (
            <span className="valueDiscussion">{`${LOB}`}</span>
          )}
        </div>

        {/* <p className="title">{`Title:   ${title}`}</p>
        <p className="discussionItemTitle">{`ITEM ID:   ${itemId}`}</p>
        {typeof LOB === 'string' && <p className="title">{`Line of business:   ${LOB}`}</p>} */}
        <div className="rowUsageTypeDiscussion singleAssessment_Dropdown_Container">
          <div className="single-assessment-usagetype-container">
            <div className="singleAssessment_Dropdown_SelectLabel">
              Select usage type<span className="required">*</span>
            </div>
            <div className="singleAssessment_Dropdown_activeDropdown">
              <div
                onClick={() => {
                  if (LOB !== null) {
                    if(hasReviewerRole()) {
                      return;
                    }
                    setshowUsageTypeOptions(!showUsageTypeOptions);
                  }
                }}
              >
                <span>
                  <span className="singleAssessment_Dropdown_currentLabel">
                    {typeof usageType === "string" && usageType.length > 0
                      ? usageType
                      : "Select"}
                    <span className="singleAssessment_Dropdown_arrow">
                      {dropdownArrow}
                    </span>
                  </span>
                </span>

                {showUsageTypeOptions ? (
                  <ul className="slate_assessment_type_dropdown_options">
                    {
                      <UsageTypeDropdown
                        usageTypeList={USAGE_TYPES.map((item) => item.label)}
                        clickHandlerFn={(usageType) => {
                          if(hasReviewerRole()){
                            return true
                          }
                          setshowUsageTypeOptions(false);
                          setUsageType(usageType);
                          const blockdata = {
                            itemid: itemId,
                            path,
                            importeddiscussiontitle: {
                              ...props.element.blockdata.importeddiscussiontitle,
                              text: title,
                            },
                            business: LOB,
                            usagetype: usageType,
                          };

                          const html = {
                            ...props?.element?.html,
                            title: htmlTitle,
                          };

                          callUpdateApi({
                            ...props.element,
                            blockdata,
                            html,
                          });
                        }}
                      />
                    }
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <img
          onClick={() => {
            if(hasReviewerRole()){
              return true
            }
            setshowUsageTypeOptions(false);
            if (LOB !== undefined && usageType) {
              sendDataToIframe({ type: "hideToc", message: {} });
              showTocBlocker(true);
              disableHeader(true);
              setShowDialog(true);
            }
          }}
          src="https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"
          className={`discussionImage ${
            typeof usageType === "string" && usageType.length > 0
              ? ""
              : "imageNotSelectedDiscussion"
          }`}
        />
      </div>
      <DiscussionDialog
        elemendId={props?.element?.id}
        selectDiscussion={(item) => {
          // update itemid, title in update api
          const blockdata = {
            path: item.smartLink || '',
            itemid: item.discussionUrn,
            importeddiscussiontitle: {
              ...props.element.blockdata.importeddiscussiontitle,
              text: item.title,
            },
            business: LOB,
            usagetype: usageType,
          };

          setItemId(item.discussionUrn);
          setTitle(item.title);
          setPath(item.smartLink);
          callUpdateApi({
            ...props.element,
            blockdata,
          });
        }}
        closeDialog={() => {
          setShowDialog(false);
          hideBlocker(true);
          hideTocBlocker(true);
          disableHeader(false);
        }}
        showDialog={showDialog}
        getLOBDiscussionItems={props.getLOBDiscussionItems}
      />
    </div>
  );
};

const dispatchActions = {
  updateElement,getLOBDiscussionItems
};

const mapStateToProps = ({ appStore }) => {
  return {
    asideData: appStore.asideData,
    parentUrn: appStore.parentUrn,
  };
};

export default connect(mapStateToProps, dispatchActions)(ElementDiscussion);
