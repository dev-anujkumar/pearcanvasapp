import React from "react";
import {
  TCC_ELEMENT,
  TCC_ELEMENT_SUBTYPE,
  TCC_BOTTOM_NOTE,
} from "../ElementContainer/ElementConstants";

const ElementTCC = (props) => {
  const { element, currentSlateAncestorData } = props;

  const subType = element?.subtype;
  const title = currentSlateAncestorData?.title;

  const handleClick = () => {
    window.open(tcc_project_link);
  };

  return (
    <div className="AssessmentSlateCanvas div-position-relative">
      <div className="slate_fetch_canvas">
        <div className="slate_assessment_date_container">
          <div className="slate_assessment_data_content">
            <div className="slate_assessment_data_label">{TCC_ELEMENT}</div>
            <div className="slate_assessment_data_details">
              <div className="slate_assessment_data_title">{title}</div>
              <div className="slate_lti_data_link" onClick={handleClick}>
                {element?.elementdata?.secure_launch_url}
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

export default ElementTCC;
