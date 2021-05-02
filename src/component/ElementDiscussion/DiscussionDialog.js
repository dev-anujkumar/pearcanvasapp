import React from "react";
import Button from "../ElementButtons";

const DiscussionDialog = ({ showDialog = false, closeDialog = () => {} }) => {
  return (
    <div
      style={{ display: showDialog ? "block" : "none" }}
      class="modal-discussion"
    >
      <div className="popupContainer">
        <div style={{ height: 500, width: "100%", backgroundColor: "white" }}>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <div style={{ flex: 1 }}>Select Discussion Items</div>
            <Button
              type="assessmentCloseWindowIcon"
              onClick={() => {
                closeDialog(true);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDialog;
