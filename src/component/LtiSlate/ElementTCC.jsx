/**
 * Element TCC is the default read only element added on LTI Slates in TCC Projects
 */
import React from "react";
import { connect } from "react-redux";
import {
  TCC_ELEMENT,
  TCC_ELEMENT_SUBTYPE,
  TCC_BOTTOM_NOTE,
} from "../ElementContainer/ElementConstants";

const ElementTCC = (props) => {
  const { element, slateTitleUpdated } = props;

  const subType = element?.subtype;
  let html = slateTitleUpdated;
  let div = document.createElement("div");
  div.innerHTML = html;
  let slateTitleData = div.innerText

  /**
   * Redirecting to secure url in new tab
   */
  const handleUrlClick = () => {
    if (element?.elementdata?.secure_launch_url) {
      window.open(element.elementdata.secure_launch_url);
    }
  };

  return (
    <div className="AssessmentSlateCanvas div-position-relative">
      <div className="slate_fetch_canvas">
        <div className="slate_assessment_date_container">
          <div className="slate_assessment_data_content">
            <div className="slate_assessment_data_label_tcc">{TCC_ELEMENT}</div>
            <div className="slate_assessment_data_details">
              <div className="slate_assessment_data_title">{slateTitleData}</div>
              <div className="slate_lti_data_link" onClick={handleUrlClick}>
                {element?.elementdata?.secure_launch_url ?? "N/A"}
              </div>
            </div>
            <div className="slate_assessment_data_label_subtype">
              {TCC_ELEMENT_SUBTYPE}
            </div>
            <div className="slate_assessment_data_details">
              <div className="slate_assessment_detail_subtype">{subType}</div>
            </div>
            <div className="slate_assessment_data_details">
              <div className="slate_assessment_tcc_data_note">
                <span>{TCC_BOTTOM_NOTE}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
      slateTitleUpdated: state.appStore.slateTitleUpdated,
  }
}
export default connect(mapStateToProps,{})(ElementTCC);
