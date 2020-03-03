/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCiteTdx, setCurrentInnerCiteTdx } from '../../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { singleAssessmentItemIcon } from './../../../images/ElementButtons/ElementButtons.jsx';
import moment from 'moment'
class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow:""
        };


    }
    addAssessment = (addedValue) => {
        this.setState({
            activeRow: addedValue.versionUrn
        })
        this.props.setCurrentInnerCiteTdx(addedValue, this.props.openedFrom);
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
                                            <tr className ={this.state.activeRow && this.state.activeRow== item.versionUrn ? 'selected':''}>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)} />
                                                    <span className="elmAssessmentItem-icon">{singleAssessmentItemIcon}</span>
                                                    <b>{item.name}</b>
                                                </td>
                                                <td>{item.dateModified ? moment(item.modifiedDate).format('DD MMM YYYY, hh:MMA') : "NA"}</td>
                                                <td>{item.modifiedBy ? item.modifiedBy : "NA"}</td>
                                                <td>{item.versionUrn.slice(17)}</td>
                                            </tr>
                                        </React.Fragment>)
                                })}
                            </tbody>
                        }
                        </table>
                        {(singleAssessmentData && singleAssessmentData.data && singleAssessmentData.data.length == 0)  && <div className ="no-result">No results found</div>}
                    

                </div>
            </div>
        );

    }
}
const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    setCurrentInnerCiteTdx:setCurrentInnerCiteTdx
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

