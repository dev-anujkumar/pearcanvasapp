/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { elmAssessmentItem } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import CiteLoader from './../CiteLoader/CiteLoader.jsx';
import { setCurrentCiteTdx } from '../../Actions/CiteTdxActions'
import moment from 'moment'

class CiteTdxTable extends Component {
    constructor(props) {
        super(props);


    }
    addAssessment = (addedValue) => {
        this.props.setCurrentCiteTdx(addedValue);
    }
    tableHeaders = ["Title", "Type", "Date Modified", "Modified By", "UUID"];

    render() {
        const { citeApiData, tdxApiData, mmiApiData, isLoading } = this.props;
        const apiData = (this.props.assessmentType === "Full Assessment CITE") ? citeApiData : (this.props.assessmentType === "Full Assessment TDX") ? tdxApiData : mmiApiData;
        return (
            <div>
                <div className='main-div'>
                <CiteLoader isLoading={this.props.isLoading} citeErrorFlag={this.props.citeErrorFlag} />
                    { (isLoading == false) && apiData && apiData.assessments && apiData.assessments.length > 0 &&
                        <table className='assessment-table-class'>
                            <thead>
                                {this.tableHeaders.map(item => (
                                    <th className={`assessment-row-class ${item.toLowerCase()}`}>{item}
                                    </th>
                                ))}
                            </thead>
                            <tbody>
                                {apiData.assessments.map((item, index) => {
                                    return (
                                        <React.Fragment key={`assessment-${index}`}>
                                            <tr className ={(this.props.currentAssessmentSelected && this.props.currentAssessmentSelected.versionUrn=== item.versionUrn) ? 'selected':''}>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)} checked={this.props.currentAssessmentSelected.versionUrn=== item.versionUrn} />
                                                    <span className="elmAssessmentItem-icon">{elmAssessmentItem}</span>
                                                    <span className="assessment-titles" title={item.name}>{item.name}</span>
                                                </td>
                                                <td>{this.props.assessmentType === "Full Assessment CITE" ? "CITE" : this.props.assessmentType === "Full Assessment TDX"? "TDX" : "MMI"}</td>
                                                <td>{item.modifiedDate ? moment(item.modifiedDate).format('DD MMM YYYY, hh:MMA') : 'NA'}</td>
                                                <td><span className="modifiedby-data">{item.modifiedBy ? item.modifiedBy : 'NA'}</span></td>
                                                <td>{item.versionUrn.slice(17)}</td>
                                            </tr>
                                        </React.Fragment>)
                                })}
                            </tbody>
                        </table>
                    }
                    {(apiData && apiData.assessments && apiData.assessments.length == 0) && (this.props.isLoading == false) && <div className ="no-result">No results found</div>}
                </div>
            </div>
        );

    }
}


const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
}

const mapStateToProps = (state) => {
    return {
        citeApiData: state.citeTdxReducer.citeData,
        tdxApiData: state.citeTdxReducer.tdxData,
        mmiApiData: state.citeTdxReducer.mmiData,
        citeErrorFlag: state.citeTdxReducer.assessmenterrFlag,
        isLoading: state.citeTdxReducer.isLoading,
        currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxTable);

