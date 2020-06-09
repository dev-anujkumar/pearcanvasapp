/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentCiteTdx, setCurrentInnerCiteTdx, specialCharacterDecode } from '../../AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions';
import { singleAssessmentItemIcon } from './../../../images/ElementButtons/ElementButtons.jsx';
import moment from 'moment'
import CiteLoader from './../assessmentCiteTdx/Components/CiteLoader/CiteLoader.jsx';

class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRow:""
        };


    }
    componentDidMount(){
        if(this.props.currentSingleAssessmentSelected && this.props.currentSingleAssessmentSelected.versionUrn){
            this.setState({
                activeRow: this.props.currentSingleAssessmentSelected.versionUrn ? this.props.currentSingleAssessmentSelected.versionUrn:""
            })
        }
       
    }
    addAssessment = (addedValue) => {
        this.setState({
            activeRow: addedValue.versionUrn
        })
        this.props.setCurrentInnerCiteTdx(addedValue, this.props.openedFrom);
    }
    tableHeaders = ["Title", "Date Modified", "Modified By", "UUID"];

    render() {
        const { singleAssessmentData, isLoading, assessmenterrFlag } = this.props;
        return (
            <div>
                <div className='cite-tdx-wrapper main-div'>
                <CiteLoader isLoading={this.props.isLoading} citeErrorFlag={this.props.citeErrorFlag} />
                        <table className='assessment-table-class single-assessment'>
                            <thead>
                                {(isLoading == false) && (assessmenterrFlag == false) && this.tableHeaders.map(item => (
                                     <th className={`assessment-row-class ${item.toLowerCase()}`}>{item}
                                    </th>
                                ))}
                            </thead>
                            {(isLoading == false) && (assessmenterrFlag == false) && this.props.singleAssessmentData && this.props.singleAssessmentData.data && this.props.singleAssessmentData.data.length > 0 &&
                            <tbody>
                                {this.props.singleAssessmentData.data.map((item, index) => {
                                    return (
                                        <React.Fragment key={`assessment-${index}`}>
                                            <tr className ={this.state.activeRow && this.state.activeRow== item.versionUrn ? 'selected':''}>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)} checked={this.props.currentSingleAssessmentSelected.versionUrn=== item.versionUrn} />
                                                    <span className="elmAssessmentItem-icon">{singleAssessmentItemIcon}</span>
                                                    <span className="assessment-titles" title={specialCharacterDecode(item.name)}>{specialCharacterDecode(item.name)}</span>
                                                </td>
                                                <td><span className="modifiedby-date" title={item.dateModified ? moment(item.dateModified).format('DD MMM YYYY, hh:mmA') : ""}>{item.dateModified ? moment(item.dateModified).format('DD MMM YYYY, hh:mmA') : "NA"}</span></td>
                                                <td><span className="modifiedby-data" title={item.modifiedBy ? item.modifiedBy : ""}>{item.modifiedBy ? item.modifiedBy : "NA"}</span></td>
                                                <td><span className="assessment-uuid" title={item.versionUrn.slice(17)}>{item.versionUrn.slice(17)}</span></td>
                                            </tr>
                                        </React.Fragment>)
                                })}
                            </tbody>
                        }
                        </table>
                        {(singleAssessmentData && singleAssessmentData.data && singleAssessmentData.data.length == 0) && (isLoading == false) && (assessmenterrFlag == false) && <div className ="no-result">No results found</div>}
                    

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
        currentSingleAssessmentSelected:state.citeTdxReducer.currentSingleAssessmentSelected,
        citeErrorFlag: state.citeTdxReducer.assessmenterrFlag,
        assessmenterrFlag: state.citeTdxReducer.assessmenterrFlag,
        currentSingleAssessmentSelected: state.citeTdxReducer.currentSingleAssessmentSelected
        
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxTable);

