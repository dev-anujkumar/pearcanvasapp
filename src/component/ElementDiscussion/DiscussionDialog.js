import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../ElementButtons";

const getSelectedItemFromId = (id) => {
  return undefined;
};

const DiscussionDialog = ({
  showDialog = false,
  itemId = undefined,
  selectDiscussion = () => {},
  closeDialog = () => {},
}) => {
  const discussionItems = useSelector(
    (state) => state.projectInfo.discussionItems
  );

  const [selectedDiscussion, setSelectedDiscussion] = useState(
    getSelectedItemFromId(itemId)
  );

  const [filteredItems, setFilteredItems] = useState(discussionItems);

  useEffect(() => {
    if (showDialog) {
      setSelectedDiscussion(undefined);
      setFilteredItems(discussionItems);
    }
  }, showDialog);

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
              onChange={(e) => {
                console.log("the text is ", e.target.value);
                setFilteredItems(
                  discussionItems.filter(
                    (item) =>
                      JSON.stringify(item)
                        .toUpperCase()
                        .indexOf(e.target.value.toUpperCase()) > -1
                  )
                );
              }}
              type="text"
              className="searchText"
              placeholder="Search By Discussion ID or Title"
            ></input>
          </div>
          {/* <span className="helpingText">Showing 1-25 of 345 </span> */}
          <div className="borderDiv"></div>
          <div className="tableContainer">
            <table className="discussTable">
              <tr>
                <th>
                  <div className="titlePadding">Title</div>
                </th>
                <th>Discussion ID</th>
                <th>Section Title</th>
              </tr>

              {filteredItems.map((item) => (
                <tr>
                  <td>
                    <div className="titleRadioContainer">
                      <input
                        checked={
                          selectedDiscussion?.discussionUrn ===
                          item.discussionUrn
                        }
                        className="radioIn"
                        onChange={() => {
                          setSelectedDiscussion(item);
                          console.log("selecting item", item);
                        }}
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
          <div className="footerContainer">
            <div className="paginationContainer"></div>
            <div
              onClick={() => {
                closeDialog();
                // setSelectedDiscussion(undefined);
              }}
              className="cancel"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                if (typeof selectedDiscussion === "object") {
                  closeDialog();
                  selectDiscussion(selectedDiscussion);
                }
              }}
              className={
                typeof selectedDiscussion === "undefined"
                  ? "notSelect"
                  : "select"
              }
            >
              Select
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDialog;
