/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { elmAssessmentItem } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import CiteLoader from './../CiteLoader/CiteLoader.jsx';
class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }
    tableHeaders = ["Title", "Type", "Date Modified", "Modified By", "UUID"];

    render() {
        const { citeApiData, tdxApiData } = this.props;
        const apiData = (this.props.assessmentType === "Full Assessment CITE") ? citeApiData : tdxApiData;
        return (
            <div>
                <div className='main-div'>
                    {apiData && apiData.assessments && apiData.assessments.length > 0 &&
                        <table className='assessment-table-class'>
                            <thead>
                                {this.tableHeaders.map(item => (
                                    <th className='assessment-row-class'>{item}
                                    </th>
                                ))}
                            </thead>
                            <tbody>
                                {apiData.assessments.map((item, index) => {
                                    return (
                                        <React.Fragment key={`assessment-${index}`}>
                                            <tr>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" />
                                                    <span className="elmAssessmentItem-icon">{elmAssessmentItem}</span>
                                                    <b>{item.name}</b>
                                                </td>
                                                <td>{this.props.assessmentType === "Full Assessment CITE" ? "CITE" : "TDX"}</td>
                                                <td>{item.modifiedDate ? item.modifiedDate : ""}</td>
                                                <td>{item.modifiedBy ? item.modifiedBy : ""}</td>
                                                <td>{item.versionUrn.slice(17)}</td>
                                            </tr></React.Fragment>)
                                })}


                            </tbody>
                        </table>
                    }
                    <CiteLoader isLoading={this.props.isLoading} citeErrorFlag={this.props.citeErrorFlag} />
                </div>
            </div>
        );

    }
}

export default connect((state) => {
    return {
        citeApiData: state.citeTdxReducer.citeData,
        tdxApiData: state.citeTdxReducer.tdxData,
        citeErrorFlag: state.citeTdxReducer.assessmenterrFlag,
        isLoading: state.citeTdxReducer.isLoading
    }

})(CiteTdxTable);
