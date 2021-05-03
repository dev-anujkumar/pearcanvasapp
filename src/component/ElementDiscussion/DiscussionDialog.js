import React from "react";
import { useSelector } from "react-redux";
import Button from "../ElementButtons";

const DiscussionDialog = ({
  showDialog = false,
  elementSelected = false,
  closeDialog = () => {},
}) => {
  const discussionItems = useSelector(
    (state) => state.projectInfo.discussionItems
  );
  return (
    <div
      style={{ display: showDialog ? "block" : "none" }}
      class="modal-discussion"
    >
      <div className="popupContainer">
        <div
          style={{
            height: 592,
            width: "100%",
            paddingTop: 13,
            backgroundColor: "white",
          }}
        >
          <div className="headingContainer">
            <div className="headingText">Select Discussion Items</div>
            <Button
              type="close-discussion-dialog"
              onClick={() => {
                closeDialog(true);
              }}
            />
          </div>
          <div style={{}} className="searchContainer">
            <span>
              <i
                style={{ fontSize: 18 }}
                className="searchIcon fa fa-search "
              ></i>
            </span>
            <input
              type="text"
              className="searchText"
              placeholder="Search By Discussion ID or Title"
            ></input>
          </div>
          {/* <span className="helpingText">Showing 1-25 of 345 </span> */}
          <div className="borderDiv"></div>
          <div style={{ height: 402, overflowY: "scroll" }}>
            <table className="discussTable">
              <tr>
                <th>
                  <div style={{ paddingLeft: 20 }}>Title</div>
                </th>
                <th>Discussion ID</th>
                <th>Section Title</th>
              </tr>
              {discussionItems.map((item) => (
                <tr>
                  <td>
                    <div className="titleRadioContainer">
                      <input
                        className="radioIn"
                        type="radio"
                        id="titleTextId"
                        name={item.title}
                        value={item.title}
                      />
                      <label for={item.title} className="radioLabel">
                        {item.title}
                      </label>
                    </div>
                  </td>
                  <td>{item.discussionUrn}</td>
                  <td>Discussion</td>
                </tr>
              ))}
            </table>
          </div>
          <div style={{ flexDirection: "row", paddingTop:14, paddingBottom:14, paddingRight:24, display:'flex' }}>
            <div style={{ flex: 1 }}></div>
            <div style={{ flexDirection: "row", display:'flex' }}>
              <div onClick={() => {closeDialog()}} className="cancel">Cancel</div>
              <div className={elementSelected ? "select" : "notSelect"}>
                Select
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDialog;
