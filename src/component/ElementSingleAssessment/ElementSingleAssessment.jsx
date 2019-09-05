// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// IMPORT - Assets //
import './../../styles/ElementSingleAssessment/ElementSingleAssessment.css';

/*** @description - ElementSingleAssessment is a class based component. It is defined simply
* to make a skeleton of the assessment-type element .*/

export class ElementSingleAssessment extends Component {
    constructor(props) {
        super(props);
    }
    /*** @description - This function is for handling the different types of figure-element.
       * @param model object that defined the type of element*/

    renderAssessmentType = (model = {}) => {
        var assessmentJSX;
       
        assessmentJSX=    <div className="divAssessment" onClick={setAssessment}>
                <figure className="figureAssessment">
                    <header>
                        <h4 className="heading4ImageTextWidthNumberLabel" onClick={getFigureAssessmentClick}>{model}</h4>
                    </header>
                    <div className="id-info" onClick={getFigureAssessmentClick}><strong>ID: </strong>{assessmentData ? assessmentData.id : ""}</div>
                    <div className="itemid-info" onClick={getFigureAssessmentClick}><strong>ITEM ID: </strong>{assessmentData ? assessmentData.itemid : ""}</div>
                    <div className="single_assessment_metadata_container">
                        <div className="single_assessment_metadata_type_selectlabel">Select usage type</div>
                        <div className="single_assessment_metadata_type_dropdown activeDropdown" onClick={!hasReviewerRole() && this.selectAssessmentMetaDataDropdown}>
                            <span className="single_assessment_metadata_dropdown_label">{assessmentData ? assessmentData.usagetype : "Quiz"}</span>
                            <span className="slate_assessment_metadata_dropdown_image"></span>
                            <div className="clr"></div>
                        </div>
                        <div className="clr"></div>
                    </div>
                    {
                        this.state.showDropdown ? (
                            <ul className="single_assessment_metadata_type_dropdown_options">
                                {/* {metaData} */}
                            </ul>
                        ) : null
                    }
                    <div className="clr"></div>
                    <div className="pearson-component image" data-uri="" data-type="image" data-width="600" data-height="399" onClick={handleC2AssessmentClick}>
                        <img src="./dist/images/loading.png" data-src={posterPath !== "" ? posterPath : "https://cite-media-stg.pearson.com/legacy_paths/8efb9941-4ed3-44a3-8310-1106d3715c3e/FPO-assessment.png"} title="View Image" alt="" className="imageTextWidth lazyload" />
                    </div>
                </figure>
            </div>
        

        return assessmentJSX;
    }
    render() {
        const { model } = this.props;
        return (
            <div className="figureElement">
                {this.renderAssessmentType(model)}
            </div>
        );
    }
}

ElementSingleAssessment.defaultProps = {
    /** Detail of element in JSON object */
    model: PropTypes.object,

}

ElementSingleAssessment.propTypes = {
    /** Handler to return the type of element based on the figuretype and alignment */
    renderFigureType: PropTypes.func,

}