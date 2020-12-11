/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { elmAssessmentItem } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import CiteLoader from './../CiteLoader/CiteLoader.jsx';
import moment from 'moment'
import { elmSortDown, elmSortUp } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import { getCiteTdxData, assessmentSorting, setCurrentCiteTdx, specialCharacterDecode } from './../../Actions/CiteTdxActions.js'
import { CITE, TDX , MMI} from '../../../AssessmentSlateConstants.js';
class CiteTdxTable extends Component {
    constructor(props) {
        super(props);
        this.sortingArray = {
            "Title": "name",
            "Date Modified": "modifiedDate"
        }
        let sortingData = Object.keys(this.sortingArray).map((item, index) => {
            return {
                [item]: {
                    sortIcon: elmSortDown,
                    sortFlag: true,
                    className: item === 'Title' ?' active' : 'inactive'
                }
            }
        })
        sortingData = sortingData.reduce((a, b) => Object.assign(a, b), {})
        this.state = {
            sortBy: sortingData
        };
    }
    componentDidMount() {
        if (this.props.sortingData.sortBy) {
            let sortByParameter = Object.keys(this.sortingArray).find(key => this.sortingArray[key] === this.props.sortingData.sortBy);
            let sortingData = Object.keys(this.state.sortBy).map((ele, index) => {
                return {
                    [ele]: {
                        sortIcon: sortByParameter === ele ? this.props.sortingData.sortOrder ? elmSortUp : elmSortDown : this.state.sortBy[sortByParameter].sortFlag ? elmSortDown : elmSortUp,
                        sortFlag: sortByParameter === ele ? this.props.sortingData.sortOrder ? false : true : this.state.sortBy[sortByParameter].sortFlag,
                        className: sortByParameter === ele ? 'active' : 'inactive'
                    }
                }
            })
            sortingData = sortingData.reduce((a, b) => Object.assign(a, b), {})
            this.setState({
                sortBy: sortingData
            })
        }
    }
    
    addAssessment = (addedValue) => {
        this.props.setCurrentCiteTdx(addedValue);
    }
    /*** @description - This function is to set the sort icon and call dynamicSort function
      * @param e- event triggered
     */
    setSort = (item) => {
        if (item && this.sortingArray[item]) {
            let sortByParameter = this.sortingArray[item] ? this.sortingArray[item] : "";
            let sortOrder = this.state.sortBy[item].sortFlag == true ? 1 : this.state.sortBy[item].sortFlag == false ? 0 : ''
            let sortingData = Object.keys(this.state.sortBy).map((ele, index) => {
                return {
                    [ele]: {
                        sortIcon: ele === item ? this.state.sortBy[ele].sortFlag ? elmSortUp : elmSortDown : this.state.sortBy[ele].sortFlag ? elmSortDown : elmSortUp,
                        sortFlag: ele === item ? !this.state.sortBy[ele].sortFlag : this.state.sortBy[ele].sortFlag,
                        className: ele === item ? 'active' : 'inactive'
                    }
                }
            })
            sortingData = sortingData.reduce((a, b) => Object.assign(a, b), {})
            this.setState({
                sortBy: sortingData
            })
        this.props.assessmentSorting(sortByParameter,sortOrder);
        this.props.getCiteTdxData(this.props.assessmentType, this.props.searchTitle, this.props.filterUUID,this.props.currentPageNo);
        }
        
    }
    tableHeaders = ["Title", "Type", "Date Modified", "Modified By", "UUID"];


    render() {
        const { citeApiData, tdxApiData, mmiApiData, isLoading, assessmenterrFlag } = this.props;
        const apiData = (this.props.assessmentType === CITE) ? citeApiData : (this.props.assessmentType === TDX) ? tdxApiData : mmiApiData;
        return (
            <div>
                <div className='cite-wrapper main-div'>
                <CiteLoader isLoading={this.props.isLoading} citeErrorFlag={this.props.citeErrorFlag} />
                    { (isLoading == false) && (assessmenterrFlag == false) && apiData && apiData.assessments && apiData.assessments.length > 0 &&
                        <table className='assessment-table-class'>
                            <thead>
                                <tr>
                                {this.tableHeaders.map(item => (
                                    <th key={`assessment-${item}`} className={`assessment-row-class ${item.toLowerCase()}`}>{item}
                                    {(item === "Title" || item === "Date Modified")  && this.state.sortBy[item] &&
                                    <div className={`sort-icon ${this.state.sortBy[item].className} ${apiData.assessments.length > 1 ? '':'disabled'}`} onClick={() => this.setSort(item)}>{this.state.sortBy[item].sortIcon}</div>
                                    }
                                    </th>

                                ))}
                                </tr>
                            </thead>
                            <tbody>
                                {apiData.assessments.map((item, index) => {
                                    return (
                                        <React.Fragment key={`assessment-${index}`}>
                                            <tr className ={(this.props.currentAssessmentSelected && this.props.currentAssessmentSelected.versionUrn=== item.versionUrn) ? 'selected':''}>
                                                <td className="td-class">
                                                    <input type="radio" className="radio-button" name="assessment-radio" value={item.versionUrn} onClick={() => this.addAssessment(item)} checked={this.props.currentAssessmentSelected.versionUrn=== item.versionUrn} />
                                                    <span className="elmAssessmentItem-icon">{elmAssessmentItem}</span>
                                                    <span className="assessment-titles" title={specialCharacterDecode(item.name)}>{specialCharacterDecode(item.name)}</span>
                                                </td>
                                                <td><span className="assessment-type">{this.props.assessmentType === CITE ? CITE.toUpperCase() : this.props.assessmentType === TDX? TDX.toUpperCase() : MMI.toUpperCase()}</span></td>
                                                <td><span className="modifiedby-date" title={item.modifiedDate ? moment(item.modifiedDate).format('DD MMM YYYY, hh:mmA') : ""}>{item.modifiedDate ? moment(item.modifiedDate).format('DD MMM YYYY, hh:mmA') : 'NA'}</span></td>
                                                <td><span className="modifiedby-data" title={item.modifiedBy ? item.modifiedBy : ""}>{item.modifiedBy ? item.modifiedBy : 'NA'}</span></td>
                                                <td><span className="assessment-uuid" title={item.versionUrn.slice(17)}>{item.versionUrn.slice(17)}</span></td>
                                            </tr>
                                        </React.Fragment>)
                                })}
                            </tbody>
                        </table>
                    }
                    {(apiData && apiData.assessments && apiData.assessments.length == 0) && (this.props.isLoading == false) && (assessmenterrFlag == false)&& <div className ="no-result">No results found</div>}
                </div>
            </div>
        );

    }
}


const mapActionToProps = {
    setCurrentCiteTdx: setCurrentCiteTdx,
    getCiteTdxData: getCiteTdxData,
    assessmentSorting:assessmentSorting
}

const mapStateToProps = (state) => {
    return {
        citeApiData: state.citeTdxReducer.citeData,
        tdxApiData: state.citeTdxReducer.tdxData,
        mmiApiData: state.citeTdxReducer.mmiData,
        citeErrorFlag: state.citeTdxReducer.assessmenterrFlag,
        isLoading: state.citeTdxReducer.isLoading,
        currentAssessmentSelected: state.citeTdxReducer.currentAssessmentSelected,
        assessmenterrFlag: state.citeTdxReducer.assessmenterrFlag,
        sortingData:state.citeTdxReducer
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(CiteTdxTable);

