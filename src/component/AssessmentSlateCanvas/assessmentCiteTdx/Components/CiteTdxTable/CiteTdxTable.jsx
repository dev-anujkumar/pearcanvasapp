/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { elmAssessmentItem } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import {setCurrentCiteTdx} from '../../Actions/CiteTdxActions'
class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        
    }
    addAssessment = (addedValue) => {
       this.props.setCurrentCiteTdx(addedValue);
    }
    tableHeaders = ["Title", "Type", "Date Modified", "Modified By", "UUID"];

    render() {
        return (
            <div>
                <div className='main-div'>
                    {this.props.apiData && this.props.apiData.assessments && this.props.apiData.assessments.length > 0 &&
                        <table className='assessment-table-class'>
                            <thead>
                                {this.tableHeaders.map(item => (
                                    <th className='assessment-row-class'>{item}
                                    </th>
                                ))}
                            </thead>
                            <tbody>
                                {this.props.apiData.assessments.map((item, index) => {
                                    return (<tr>
                                        <td className="td-class">
                                            <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)}/>
                                            <span className="elmAssessmentItem-icon">{elmAssessmentItem}</span>
                                            <b>{item.name}</b>
                                        </td>
                                        <td>{this.props.assessmentType==="Full Assessment CITE" ? "CITE" : "TDX"}</td>
                                        <td>1 Aug 2019, 12:06PM</td>
                                        <td>Bob Ross</td>
                                        <td>{item.versionUrn.slice(17)}</td>
                                    </tr>)
                                })}


                            </tbody>
                        </table>
                    }
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
        apiData: state.citeTdxReducer.citeTdxData
    }
  }
  
  export default connect(
    mapStateToProps,
    mapActionToProps
  )(CiteTdxTable);

