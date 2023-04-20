import React from "react";
import { TCC_ELEMENT, TCC_ELEMENT_SUBTYPE, TCC_BOTTOM_NOTE } from "../ElementContainer/ElementConstants";
import config from "../../config/config";

const ElementTCC = (props) => {
  const { element, currentSlateAncestorData } = props;

  const subType = element?.subtype;
  const title = currentSlateAncestorData?.title;
  const tcc_project_link =
    "https://local-dev.pearson.com:4000/?proectUrn=urn:pearson:distributable:944da257-3b93-441d-9711-1f2978c6a642&entityUrn=urn:pearson:entity:7aaa2ef8-97ab-4f70-a4b4-bc67787d0b80";

  const handleClick = () => {
    window.open(tcc_project_link);
  };

  return (
    <div className="AssessmentSlateCanvas div-position-relative lti-slate">
      <div className="slate_fetch_canvas">
        <div className="slate_assessment_date_container">
          <div className="slate_assessment_data_content">
            <div className="slate_assessment_data_label">{TCC_ELEMENT}</div>
            <div className="slate_assessment_data_details">
              <div className="slate_assessment_data_title">{title}</div>
              {tcc_project_link ? 
                <div className="slate_lti_data_link" onClick={handleClick}>
                  {tcc_project_link}
                </div> : "" }
            </div>
            <div className="slate_assessment_data_label_subtype">{TCC_ELEMENT_SUBTYPE}</div>
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
