import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { discussionCloseIcon, searchDisussion } from "../../images/ElementButtons/ElementButtons.jsx";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

//Function for display tooltip in title
const TitleTooltip = withStyles({
  arrow: {
    color: "black"
  },
  tooltip: {
    backgroundColor: "black",
    fontSize: "11px",
    marginLeft: "40px",
    fontWeight: "50",
    marginTop: "6px"
  }
})(Tooltip);

const getSelectedItemFromId = (id) => {
  return undefined;
};

const DiscussionDialog = ({
  showDialog = false,
  elemendId='',
  itemId = undefined,
  selectDiscussion = () => {},
  closeDialog = () => {},
  getLOBDiscussionItems
}) => {
  const discussionItems = useSelector((state) => state.projectInfo.discussionItems);
  const options = useSelector((state) => state.projectInfo.LOBList)
  const showDiscussionLOBDropdown = useSelector((state) => state.projectInfo.showDiscussionLOBDropdown)

  const [selectedDiscussion, setSelectedDiscussion] = useState(getSelectedItemFromId(itemId));
  const [filteredItems, setFilteredItems] = useState(discussionItems);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (showDialog) {
      setSelectedDiscussion(undefined);
      setFilteredItems(discussionItems);
      setSearchText("");
    }
  }, [showDialog,discussionItems]);

  return (
    <div
      className={`modalDiscussion ${showDialog? 'displayBlockDiscussion' : 'displayNoneDiscussion'}`}
    >
      <div className="popupContainerDiscussion">
        <div
          className="popupDiscussion"
        >
          <div className="headingContainerDiscussion">
            <div className="headingTextDiscussion">Select a Discussion Item</div>
            <div onClick={() =>  closeDialog()} className="closeIconDiscussion">{discussionCloseIcon}</div>
          </div>
          <div className={showDiscussionLOBDropdown ? "const" : ""}>{showDiscussionLOBDropdown && <div className="opt"><div className="LOB-label">LOB</div>
          <div>
          <select className="LOBdropdown" defaultValue="select" onChange={(e) => getLOBDiscussionItems(e.target.value)}>
          <option value="select" disabled hidden>Select</option>
          {options.map((x) => (<option value={x.lineOfBusiness}>{x.label}</option>))}
        </select>
        </div>
          </div>}
            <div className={showDiscussionLOBDropdown ? "searchContainerDiscussionWithLOBDropdown" : "searchContainerDiscussion"}>
              {searchDisussion}
              <input
                value={searchText}
                onChange={(e) => {
                  const text = e.target.value;
                  setSearchText(text);
                  setFilteredItems(
                    discussionItems.filter(
                      (item) =>
                        `${item.title}${item.discussionUrn}`
                          .toUpperCase()
                          .indexOf(text.trim().toUpperCase()) > -1
                    )
                  );
                }}
                type="text"
                className="searchTextDiscussion"
                placeholder="Search By Discussion ID or Title"
              ></input>
            </div>
          </div>

          {/* <span className="helpingText">Showing 1-25 of 345 </span> */}
          <div className="borderDivDiscussion"></div>
          <div className="tableContainerDiscussion">
            <table className="discussTableDiscussion">
              <tr>
                <th>
                  <div className="titlePaddingDiscussion">Title</div>
                </th>
                <th>Discussion ID</th>
                <th>Section Title</th>
              </tr>

              {filteredItems.map((item) => (
                <tr>
                  <td>
                    <div className="titleRadioContainerDiscussion">
                      <input
                        
                        checked={
                          selectedDiscussion?.discussionUrn ===
                          item.discussionUrn
                        }
                        className="radioInDiscussion"
                        onChange={() => {
                          setSelectedDiscussion(item);
                        }}
                        type="radio"
                        name={elemendId + "-" + item.discussionUrn}
                        value={item.title}
                      />
                      <TitleTooltip  title={item.title} arrow>
                      <label htmlFor={item.title} className="radioLabelDiscussion">
                        {item.title}
                      </label>
                      </TitleTooltip>
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

          <div className="footerContainerDiscussion">
            <div className="paginationContainerDiscussion">
              
            </div>
            <div
              onClick={() => {
                closeDialog();
              }}
              className="cancelDiscussion"
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
                  ? "notSelectDiscussion"
                  : "selectDiscussion"
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
