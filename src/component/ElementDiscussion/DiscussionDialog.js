import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { discussionCloseIcon, searchDisussion } from "../../images/ElementButtons/ElementButtons.jsx";
import { withStyles } from '@mui/styles';
import { Select, MenuItem, Tooltip } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import clsx from "clsx";

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

// handle LOB dropdown select menu position
const selectMenuProps = {
  PaperProps: {
    sx: {
      height: 'auto',
      width: '93px',
      top: '91px !important',
      '@media screen and (max-width: 1396px)': {
        left: '182px !important',
      },
      '@media screen and (min-width: 1396px) and (max-width: 1535px)': {
        left: '199px !important',
      },
      '@media screen and (min-width: 1536px) and (max-width: 1705px)': {
        left: '213px !important',
      },
      '@media screen and (min-width: 1706px) and (max-width: 1919px)': {
        left: '230px !important',
      },
      '@media screen and (min-width: 1920px)': {
        left: '252px !important',
      },
    },
  },
}

const DiscussionDialog = ({
  showDialog = false,
  elemendId='',
  itemId = undefined,
  selectDiscussion = () => {},
  closeDialog = () => {},
  getLOBDiscussionItems,
  resetLOBDiscussionItems
}) => {
  const discussionItems = useSelector((state) => state.projectInfo.discussionItems);
  const options = useSelector((state) => state.projectInfo.LOBList)
  const showDiscussionLOBDropdown = useSelector((state) => state.projectInfo.showDiscussionLOBDropdown)
  const [selectedDiscussion, setSelectedDiscussion] = useState(getSelectedItemFromId(itemId));
  const [filteredItems, setFilteredItems] = useState(discussionItems);
  const [searchText, setSearchText] = useState("");
  const [defaultLOBDropdownValue, setLOBDropdownValue] = useState("select");

  useEffect(() => {
    if (showDialog) {
      setSelectedDiscussion(undefined);
      setFilteredItems(discussionItems);
      setSearchText("");
    }
  }, [showDialog,discussionItems]);

  // function to set LOB value selected and fetch discussion items for selected LOB
  const setSelectedLOBValue = (value) => {
    setLOBDropdownValue(value);
    getLOBDiscussionItems(value);
  }

  //function to reset LOB dropdown value to "select" and close dialog
  const resetSelectedLOBValue = () => {
    setLOBDropdownValue("select");
    closeDialog();
    if(showDiscussionLOBDropdown === true){
      resetLOBDiscussionItems()
    }
  }

  const CustomDropDownIcon = withStyles()(
    ({ className, classes, ...rest }) => {
      return (
        <KeyboardArrowDownIcon
          {...rest}
          className={clsx(className, classes.selectIcon)}
        />
      );
    }
  );

  return (
    <div
      className={`modalDiscussion ${showDialog? 'displayBlockDiscussion' : 'displayNoneDiscussion'}`}
    >
      <div className="popupContainerDiscussion">
        <div className="popupDiscussion">
          <div className="headingContainerDiscussion">
            <div className="headingTextDiscussion">Select a Discussion Item</div>
            <div onClick={() => resetSelectedLOBValue()} className="closeIconDiscussion">{discussionCloseIcon}</div>
          </div>
          <div className={showDiscussionLOBDropdown ? "LOBDropdownAndSearchboxContainer" : ""}>
            {showDiscussionLOBDropdown && <div className="LOBDropdownContainer"><div className="LOB-label">LOB</div>
            <div className="LOBDropdown" >
              <Select variant="standard" MenuProps={selectMenuProps} className={defaultLOBDropdownValue === "select" ?
               "selectInDropdown" : "LOBInDropdown"} value={defaultLOBDropdownValue} IconComponent={CustomDropDownIcon} onChange={(e) => setSelectedLOBValue(e.target.value)}>
                <MenuItem value="select" className="selectOption">Select</MenuItem>
                {options.map((x) => (<MenuItem className="LOBMenuList" value={x.lineOfBusiness}>{x.label}</MenuItem>))}
              </Select>
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
                      <TitleTooltip  placement="bottom-end" title={item.title} arrow>
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
                resetSelectedLOBValue();
              }}
              className="cancelDiscussion"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                if (typeof selectedDiscussion === "object") {
                  resetSelectedLOBValue();
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
