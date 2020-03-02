/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCiteTdx } from '../../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions'
import moment from 'moment'
class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };


    }
    addAssessment = (addedValue) => {
        this.props.setCurrentCiteTdx(addedValue, this.props.openedFrom);
    }
    tableHeaders = ["Title", "Date Modified", "Modified By", "UUID"];

    render() {
        const { singleAssessmentData } = this.props;
        return (
            <div>
                <div className='main-div'>
                   
                        <table className='assessment-table-class'>
                            <thead>
                                {this.tableHeaders.map(item => (
                                    <th className='assessment-row-class'>{item}
                                    </th>
                                ))}
                            </thead>
                            {this.props.singleAssessmentData && this.props.singleAssessmentData.data && this.props.singleAssessmentData.data.length > 0 &&
                            <tbody>
                                {this.props.singleAssessmentData.data.map((item, index) => {
                                    return (
                                        <React.Fragment key={`assessment-${index}`}>
                                            <tr>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)} checked={this.props.currentSingleAssessmentSelected.versionUrn === item.versionUrn} />
                                                    <span className="elmAssessmentItem-icon"></span>
                                                    <b>{item.name}</b>
                                                </td>
                                                <td>{item.dateModified ? moment(item.modifiedDate).format('DD MMM YYYY, hh:MMA') : ""}</td>
                                                <td>{item.modifiedBy ? item.modifiedBy : ""}</td>
                                                <td>{item.versionUrn.slice(17)}</td>
                                            </tr>
                                        </React.Fragment>)
                                })}
                            </tbody>
                        }
                        {(singleAssessmentData && singleAssessmentData.data && singleAssessmentData.data.length == 0)  && <div className ="no-result">No Data Found..</div>}
                        </table>
                    

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
        singleAssessmentData: state.citeTdxReducer.singleAssessmentData,
        isLoading: state.citeTdxReducer.isLoading,
        currentSingleAssessmentSelected:state.citeTdxReducer.currentSingleAssessmentSelected
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxTable);

