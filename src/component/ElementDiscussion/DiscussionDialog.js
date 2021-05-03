import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchDisussion } from "../../images/ElementButtons/ElementButtons.jsx";
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
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (showDialog) {
      setSelectedDiscussion(undefined);
      setFilteredItems(discussionItems);
      setSearchText("");
    }
  }, [showDialog]);

  return (
    <div
      style={{ display: showDialog ? "block" : "none" }}
      className="modalDiscussion"
    >
      <div className="popupContainerDiscussion">
        <div
          style={{
            height: 592,
            width: "100%",
            paddingTop: 13,
            backgroundColor: "white",
          }}
        >
          <div className="headingContainerDiscussion">
            <div className="headingTextDiscussion">Select Discussion Items</div>
            <Button
              type="close-discussion-dialog"
              onClick={() => {
                closeDialog(true);
              }}
            />
          </div>
          {filteredItems.length > 0 && (
            <div style={{}} className="searchContainerDiscussion">
              {searchDisussion}
              <input
                value={searchText}
                onChange={(e) => {
                  const text = e.target.value.trim();
                  setSearchText(text);
                  setFilteredItems(
                    discussionItems.filter(
                      (item) =>
                        JSON.stringify(Object.values(item))
                          .toUpperCase()
                          .indexOf(text.toUpperCase()) > -1
                    )
                  );
                }}
                type="text"
                className="searchTextDiscussion"
                placeholder="Search By Discussion ID or Title"
              ></input>
            </div>
          )}

          {/* <span className="helpingText">Showing 1-25 of 345 </span> */}
          <div className="borderDivDiscussion"></div>
          <div className="tableContainerDiscussion">
            <table className="discussTableDiscussion">
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
              {}
            </table>
            {filteredItems.length === 0 && (
              <div className="noDiscussionItem">No Discussion Items Found</div>
            )}
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
