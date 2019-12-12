/*** 
 * @description - The Body comoinent of ELM Assessment
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import config from './../../../../../config/config';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import {FULL_ASSESSMENT_PUF , PUF } from '../../../AssessmentSlateConstants.js'
import { elmAssessmentItem, elmSortUp, elmSortDown, elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';


/*** @description - ElmTable is a class based component to store ELM assessments in tabular form*/
class ElmTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValue: [],
            isActive: null,
            addFlag: false,
            noDataFound: false,
            currentUrn: this.props.apiData.versionUrn,
            parentUrn: null,
            firstName: this.getProjectTitle() || "",
            parentTitle: "",
            currentAssessmentSelected: {},
            sortIcon: elmSortDown,
            sortFlag: true
        };
        this.preparedData = [];
        this.renderTableData(this.props);
        this.timer = null;
        this.setSort();

    }

    componentDidMount() {
        let fName = this.getProjectTitle();
        this.setState({
            firstName: fName
        })
        this.renderTableData(this.props)
    }
    /*** @description - This function is to render elm table data
     * @param currentProps- props
    */
    renderTableData = (currentProps) => {
        if (!currentProps.errFlag && currentProps.apiData) {
            this.filterData(currentProps.getParentId, currentProps.apiData);
        }
        this.timer = setTimeout(() => {
            //if (!this.state.tableValue.length) {
                this.getResourcefromFilterData(currentProps.apiData);
            //}
        }, 0)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.apiData != this.props.apiData) {
            let _self = this;
            _self.renderTableData(this.props);
        }
    }
    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    /*** @description - This function is to filter table data based on parameters
         * @param data- api data
         * @param urn- assessment id
         * @param parentUrn- parent-Urn
        */
    filterData = (urn, apiData, parentUrn = this.state.currentUrn) => {
        this.preparedData = [];
        this.setState({ addFlag: false, isActive: null });
        if (urn === parentUrn) {
            this.getResourcefromFilterData(apiData)
        }
        else if (apiData.contents) {
            apiData = apiData.contents;

            apiData.frontMatter && apiData.frontMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })

            apiData.bodyMatter && apiData.bodyMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })

            apiData.backMatter && apiData.backMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn)
            })
        }
        else if (!(apiData.contents || this.preparedData.length)) {
            this.getResourcefromFilterData(apiData)
        }
    }
    /*** @description - Function to check if api data's versionUrn is same as current urn
        * @param data- api data
        * @param urn- assessment id
        * @param parentUrn- parent-Urn
       */
    filterSubData = (data, urn, parentUrn) => {

        if (data.versionUrn === urn) {
            return this.getResourcefromFilterData(data, parentUrn)
        }
        else {
            if (data.contents)
                this.filterData(urn, data, data.versionUrn)
            else
                return;
        }
    }

    /*** @description - This function is to get elm resource from the table based on parameters
         * @param data- api data
         * @param parentUrn- parent-Urn
        */
    getResourcefromFilterData = (data, parentUrn) => {
        if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
            data.alignments.resourceCollections.forEach((resource) => {
                if (resource.resources && resource.resources.length) {
                    resource.resources.forEach((assesments) => {
                        this.preparedData.push({ "type": assesments.type || "assessment", "urn": assesments.urn }) // "assessment" is added as type for resources where type-key is missing
                    })
                }
            })
        }
        if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
            data.contents.bodyMatter.forEach((item) => {
                this.preparedData.push({ "type": item.label, "urn": item.versionUrn, "title": item.unformattedTitle ? item.unformattedTitle.en : item.versionUrn })
            })
        }

        return this.setState({ tableValue: this.preparedData, parentUrn: parentUrn, parentTitle: (data.unformattedTitle && data.unformattedTitle.en) ? data.unformattedTitle.en : this.state.firstName })

    }

    /*** @description - This function is to fetch project title*/
    getProjectTitle = () => {
        let book_title = config.book_title;
        return book_title
        // return config.book_title
    }

    /*** @description - This function is to show table data based on parameters
         * @param e- event triggered
         * @param versionUrn- version urn of current item selected
        */
    showNewValueList = (e, versionUrn) => {
        this.filterData(versionUrn, this.props.apiData);
    }
    /*** @description - This function is to set puf assessment data in state variables 
     * @param addedValue- object containing puf assessment data
    */
    addAssessment = (addedValue) => {
        this.setState({
            addFlag: true,
            currentAssessmentSelected: { ...addedValue }
        });
    }
    /*** @description - This function is to navigate back to parent hierarchy
    */
    navigateBack = () => {
        this.filterData(this.state.parentUrn, this.props.apiData);
    }

    /*** @description - This function is to set the sort icon and call dynamicSort function
         * @param e- event triggered
        */
    setSort = () => {
        if (this.state.sortFlag) {
            this.setState({ sortIcon: elmSortDown })
            this.setState({ tableValue: this.state.tableValue.sort(this.dynamicSort("title")).reverse(), addFlag: false, isActive: null, sortFlag: !this.state.sortFlag });
        }
        else {
            this.setState({ sortIcon: elmSortUp })
            this.setState({ tableValue: this.state.tableValue.sort(this.dynamicSort("title")).reverse(), addFlag: false, isActive: null, sortFlag: !this.state.sortFlag });
        }
    }

    /*** @description - This function is to sort table data based on parameters
         * @param property- sorting criteria
         * @param event- event triggered
        */
    dynamicSort = (property, event) => {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            let result;
            let first = (a[property] ? a[property] : a.urn).toLowerCase();
            let second = (b[property] ? b[property] : b.urn).toLowerCase();
            if (this.state.sortFlag) {
                result = (first < second) ? -1 : (first > second) ? 1 : 0;
            }
            else {
                result = (first > second) ? -1 : 0;
            }
            return result * sortOrder;
        }
    }

    /*** @description - This function is to send puf assessment data to RootELMComponent
    */
    sendPufAssessment = () => {
        let obj = {
            id: this.state.currentAssessmentSelected.urn,
            title: "dummy",
            assessmentFormat: "puf",
            usagetype: this.props.usageTypeMetadata
        }
        this.props.addPufFunction(obj);
        this.props.closeElmWindow();
    }

    /*** @description - This function is to toggle the current row selected
         * @param i- index of the row
        */
    toggleActive = i => {
        this.setState({
            isActive: i
        });
    }

    /*** @description - This function is to set the folder name in folder-icon based on type of container
         * @param label- label of container
        */
    getFolderLabel = label => {
        switch (label) {
            case 'chapter': return 'C'
            case 'module': return 'M'
            case 'part': return 'P'
            case 'section': return 'S'
            case 'assessment': return 'AS'
            case 'container-introduction': return 'IS';
            case 'introductry-slate': return 'IS';
            default: return 'NA'
        }
    }

    render() {
        let buttonText = (this.props.activeAssessmentType === FULL_ASSESSMENT_PUF || this.props.activeAssessmentType === PUF) ? "ADD" : "OK";
        let errorMessage = (this.props.activeAssessmentType === FULL_ASSESSMENT_PUF || this.props.activeAssessmentType === PUF) ?
            <i>This project has no PUF assessments currently. Please add a PUF assessment to this project first</i> : <i>No Results Found</i>
        if (this.props.errFlag) {
            return (
                <div>
                    <div className='table-header'>
                        {(this.state.parentUrn > 1) ?
                            <div className="elm-navigate-back-icon" onClick={this.navigateBack} >{elmNavigateBack}</div> : null}
                        <p className="title-header">{this.state.parentTitle}</p>
                    </div>
                    <div className="elm-error-div">
                        <p className="elm-error-line">
                            {this.props.errorStatus == 404 ? errorMessage : <i>**Error occured, Please try again!!!</i>}
                        </p>
                    </div>
                </div>
            );
        }
        else if (!this.props.errFlag) {
            return (
                <div>
                    <div className='table-header'>
                        {(this.state.parentUrn) ?
                            <div className="elm-navigate-back-icon" onClick={this.navigateBack} >{elmNavigateBack}</div> : null}
                        <p className="title-header">{this.state.parentTitle}</p>
                    </div>
                    <div className='main-div'>
                        <table className='table-class'>
                            <thead>
                                <th className='row-class'>
                                    <td className='td-class sort-icon'>Title</td>
                                    <div className="sort-icon" onClick={() => this.setSort()}>{this.state.sortIcon}</div>
                                </th>
                            </thead>
                            {this.state.tableValue.map((item, index) => {
                                if (item.type == "assessment" && item.urn.includes("work")) {
                                    return (
                                        <tbody key={index}>
                                            <tr className={`row-class ${this.state.isActive === index ? 'select' : 'not-select'}`} onClick={() => this.toggleActive(index)}>
                                                <td className='td-class' key={index} onClick={() => this.addAssessment(item)}>
                                                    <span className="elmAssessmentItem-icon">{elmAssessmentItem}</span>
                                                    <b className="elm-text-assesment">{item.urn}</b>
                                                </td>
                                            </tr>
                                        </tbody>
                                    );
                                }
                                else {
                                    return (
                                        <tbody key={index}>
                                            {(this.props.openedFrom == 'slateAssessment') && (item.type !== 'figure') && <tr className='row-class'>
                                                <td className='td-class' key={index} onClick={(e) => { this.showNewValueList(e, item.urn) }}>
                                                    <div className="desc-box">{this.getFolderLabel(item.type)} <span className="folder-icon"></span> </div>
                                                    <b className="elm-text-folder">{item.title}</b></td>
                                            </tr>}
                                        </tbody>
                                    )
                                }
                            })}
                        </table>
                    </div>
                    <div className="puf-footer">
                        <button className="puf-button cancel" onClick={this.props.closeElmWindow}>CANCEL</button>
        <button className={`puf-button add-button ${this.state.addFlag ? 'add-button-enabled' : ''}`} disabled={!this.state.addFlag} onClick={this.sendPufAssessment}>{buttonText}</button>
                    </div>
                </div>
            );
        }
    }
}


export default connect((state) => {
    return {
        getParentId: state.appStore.slateLevelData[config.slateManifestURN].id,
        apiData: state.elmReducer.elmData
    }

})(ElmTable);