/*** 
 * @description - The Body component of ELM/Learnosity Assessment Table
*/
// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
// IMPORT - Components //
import ElmError from '../ElmError';
import ElmFooter from '../ElmFooter'
import AssessmentSearchBar from '../AssessmentSearchBar';
// IMPORT - Assets // 
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { FULL_ASSESSMENT_PUF, PUF, LEARNOSITY_BETA } from '../../../AssessmentSlateConstants.js'
import { elmAssessmentItem, elmSortUp, elmSortDown, elmNavigateBack, singleAssessmentItemIcon } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import config from './../../../../../config/config';

import { openAssessmentSearchBar, setSearchBlock } from '../../Actions/ElmActions.js';
import { setStatus, searchAndFilterAssessmentData, getFolderLabel, setParentUrn } from '../../UtilityFunctions/ElmLearnosityUtility.js';
/*** @description - ElmTable is a class based component to store ELM assessments in tabular form*/
class ElmTableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableValue: [],
            isActive: null,
            addFlag: false,
            currentUrn: this.props.elmReducer.elmData.versionUrn,
            parentUrn: null,
            firstName: this.getProjectTitle() || "",
            parentTitle: "",
            currentAssessmentSelected: {},
            sortIcon: elmSortDown,
            sortFlag: true,
            activeAssessmentId: '',
            openItemTable: false,
            openedFrom: this.setOpenedFrom() || ""
        };
        this.preparedData = [];
        this.searchData = [];
        this.setSort();
        
    }

    componentDidMount() {
        let fName = this.getProjectTitle();
        let slateType = this.setOpenedFrom();
        this.setState({
            firstName: fName,
            openedFrom: slateType
        })
        this.renderTableData(this.props)

    }

    componentDidUpdate(prevProps) {
        if ((prevProps.elmReducer.elmItemData != this.props.elmReducer.elmItemData) ||
            (prevProps.elmReducer.elmData != this.props.elmReducer.elmData)) {
            let _self = this;
            _self.renderTableData(this.props);
        }
    }

    /*** @description - This function is to fetch project title*/
    getProjectTitle = () => {
        return config.book_title
    }

    setOpenedFrom = () =>{
        let openedFrom=''
        if(config.slateType==="assessment"){
            openedFrom="slateAssessment"
        }else{
            openedFrom="singleAssessment"
        }
        return openedFrom
    }

    searchAssessmentData = (assessmentType, searchAssessmentTitle) => {
        let searchResults = [];
        this.props.setSearchBlock(assessmentType,true);
        searchResults = searchAndFilterAssessmentData(assessmentType, searchAssessmentTitle, this.props.elmReducer.elmData)
        // if(searchAssessmentTitle.trim()!=""){
            if(searchResults.length!=0){
                return this.setState({
                    tableValue: searchResults
                })
            }else{
                return this.setState({
                    tableValue: []
                })
            }
        // }else{
        //     let parent= setParentUrn(JSON.stringify(this.props.elmReducer.elmData),this.props.setCurrentSlateAncestorData)
        //     this.filterData(false, parent, this.props.elmReducer.elmData);
        // }
    }

    /*** @description - This function is to render elm table data
     * @param currentProps- props
    */
   renderTableData = (currentProps) => {
    const { errFlag, elmData, elmItemData, elmLoading, itemErrorFlag } = currentProps.elmReducer;
    let apiData = JSON.stringify(elmData), parent=""
    if (((!errFlag && elmData) && !elmItemData)|| (this.state.openedFrom == "singleAssessment" && !itemErrorFlag && !errFlag && elmLoading)) {
        if(config.parentLabel=="frontmatter"||config.parentLabel=="backmatter"){
            this.filterData(false, config.projectUrn, elmData);
        }
        else if(apiData.includes(config.parentContainerUrn) && config.parentContainerUrn){
            this.filterData(false, config.parentContainerUrn, elmData);
        }else{
            parent= setParentUrn(apiData,this.props.setCurrentSlateAncestorData)
            this.filterData(false, parent, elmData);
        }
    }
    else if ((!itemErrorFlag && elmItemData && elmLoading==false) && (config.parentContainerUrn || (config.parentLabel=="frontmatter"||config.parentLabel=="backmatter"))) {
        if(config.parentLabel=="frontmatter"||config.parentLabel=="backmatter"){
         this.filterData(true, config.projectUrn,elmItemData)
        }else{
         this.filterData(true, config.parentContainerUrn,elmItemData)
        } 
     }
    else if(this.state.openedFrom == "slateAssessment" && !errFlag && elmLoading){
        parent= setParentUrn(apiData,this.props.setCurrentSlateAncestorData)
        this.filterData(false, parent, elmData);
        //this.filterData(false,config.parentContainerUrn, elmData);
    }               
    else {
        this.filterData(false,this.state.currentUrn, elmData);
    }
}

    /*** @description - This function is to filter table data based on parameters
         * @param getItems - check for type of data |true=assessment-item data|false- elm-resouces data     
         * @param data- api data
         * @param urn- assessment id
         * @param parentUrn- parent-Urn
        */
    filterData = (getItems, urn, apiData, parentUrn = config.projectUrn) => {
        this.preparedData = [];
        this.setState({ addFlag: false, isActive: null });
        if (urn === parentUrn) {
            this.getResourcefromFilterData(getItems, apiData)
        }
        else if (apiData.contents) {
            apiData = apiData.contents;
            apiData.frontMatter && apiData.frontMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems)
            })

            apiData.bodyMatter && apiData.bodyMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems)
                //this.filterData(getItems, urn, data, parentUrn)
            })

            apiData.backMatter && apiData.backMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems)
            })
        }
        else if (!(apiData.contents || this.preparedData.length)) {
            this.getResourcefromFilterData(getItems, apiData)
        }
    }

    /*** @description - Function to check if api data's versionUrn is same as current urn
        * @param data- api data
        * @param urn- assessment id
        * @param parentUrn- parent-Urn
        * @param getItems - check for type of data |true=assessment-item data|false- elm-resouces data
       */
    filterSubData = (data, urn, parentUrn, getItems) => {

        if (data.versionUrn === urn) {
            return this.getResourcefromFilterData(getItems, data, parentUrn)
        }
        else {
            if (data.contents){
                this.filterData(getItems, urn, data, data.versionUrn)
            }
            else
            {
                return;
            }
                
        }
    }

    /*** @description - This function is to get elm resource from the table based on parameters
         * @param getItems - check for type of data |true=assessment-item data|false- elm-resouces data
         * @param data- api data
         * @param parentUrn- parent-Urn
        */
    getResourcefromFilterData = (getItems, data, parentUrn) => {
        let title = "", setParentTitle = "";
        if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
            data.alignments.resourceCollections.forEach((resource) => {
                if (resource.resources && resource.resources.length) {
                    resource.resources.forEach((assessments) => {
                        if (assessments && assessments.title && assessments.title.en) {
                            title = assessments.title.en
                        }
                        if(assessments && assessments.type && assessments.type !="assessmentItem"){
                            this.preparedData.push({ "type": assessments.type? assessments.type:"assessment", "urn": assessments.urn, "assessmentTitle": title, "parentUrn": parentUrn, previousUrn: data.versionUrn }) // "assessment" is added as type for resources where type-key is missing
                        }
                    })
                }
            })
        }
        if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
            data.contents.bodyMatter.forEach((item) => {
                if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                    this.preparedData.push({ "type": item.label, "urn": item.versionUrn, "title": item.unformattedTitle ? item.unformattedTitle.en : "" })
                }
            })
        }
        if (this.state.openedFrom === "singleAssessment" && getItems == true && this.state.openItemTable === true) {
            this.getAssessmentItemsData(data, this.state.activeAssessmentId, this.state.parentTitle)
        } else {
            setParentTitle = (data.unformattedTitle && data.unformattedTitle.en) ? data.unformattedTitle.en : this.state.firstName;
            return this.setState({ tableValue: this.preparedData, parentUrn: parentUrn, parentTitle: setParentTitle})
        }
    }

    /*** @description - This function is to get elm assessment items from the API data based on parameters
        * @param itemsData- api data
        * @param assessmentId - id of the assessment selected
        * @param assessmentTitle - title of the assessment selected
       */
    getAssessmentItemsData = (itemsData, assessmentId, assessmentTitle) => {
        if (itemsData && itemsData.length) {
            itemsData.forEach((item) => {
                this.preparedData.push({ "type": "assessmentitem", "urn": item.versionUrn, "assessmentTitle": item.name ? item.name : "", "assessmentId": assessmentId })
            })
            return this.setState({ tableValue: this.preparedData, parentTitle: assessmentTitle })
        }

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

    /*** @description - This function is to navigate back from items-table to elm-parent-table */
    navigateFromItemsTable = () => {
        this.setState({
            openItemTable: false,
        }, this.filterData(false, this.state.parentUrn, this.props.elmReducer.elmData))
    }

    /*** @description - This function is to navigate back to parent hierarchy */
    navigateBack = () => {
        if (this.state.openItemTable == true) {
             this.navigateFromItemsTable()            
        } else {
            this.filterData(false, this.state.parentUrn, this.props.elmReducer.elmData);
        }
    }

    /*** @description - This function is to set the sort icon and call dynamicSort function
         * @param e- event triggered
        */
    setSort = () => {
        if (this.state.sortFlag) {
            this.setState({ sortIcon: elmSortDown, tableValue: this.state.tableValue.sort(this.dynamicSort("title")).reverse(), addFlag: false, isActive: null, sortFlag: !this.state.sortFlag });
        }
        else {
            this.setState({ sortIcon: elmSortUp, tableValue: this.state.tableValue.sort(this.dynamicSort("title")).reverse(), addFlag: false, isActive: null, sortFlag: !this.state.sortFlag });
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

    /*** @description - This function is to show table data based on parameters
         * @param e- event triggered
         * @param versionUrn- version urn of current item selected
        */
    showNewValueList = (e, versionUrn) => {
        this.filterData(false, versionUrn, this.props.elmReducer.elmData);
    }

    /*** @description - This function is to send puf assessment data to RootELMComponent */
    sendPufAssessment = () => {
        let obj = {}
        if (this.state.openedFrom === "singleAssessment" && this.state.currentAssessmentSelected.type === "assessment" && this.state.openItemTable==false) {
            this.props.fetchAssessmentItem(this.state.activeAssessmentId)
            this.setParentAssessment(this.state.currentAssessmentSelected.urn, this.state.currentAssessmentSelected.assessmentTitle, this.state.currentAssessmentSelected.previousUrn)
        }
        else{
            if (this.state.openedFrom === "slateAssessment") {
                obj = {
                    id: this.state.currentAssessmentSelected.urn,
                    title: this.state.currentAssessmentSelected && this.state.currentAssessmentSelected.assessmentTitle ? this.state.currentAssessmentSelected.assessmentTitle : "PUF assessment",//PCAT-6326-ELM assessment default title added
                    assessmentFormat: "puf",
                    usagetype: this.props.activeUsageType
                }
            } else {
                obj = {
                    id: this.state.currentAssessmentSelected.assessmentId,
                    itemid: this.state.currentAssessmentSelected.urn,
                    title: this.state.parentTitle,
                    assessmentFormat: "puf",
                    usagetype: this.props.activeUsageType
                }
            }
            this.props.addPufFunction(obj);
            this.props.closeElmWindow();
        }

    }

    /*** @description - This function is triggered when a user clicks on table row
        * @param item - object that contains data of current table row
        * @param type - type of item
        * @param openedFrom - the component it is opened from - Full or Embedded Assessment
       */
    handleClickAssessment = (index, item, type, openedFrom) => {
        this.setState({
            isActive: index,
        });
        if ((openedFrom === "singleAssessment" && type === "assessmentitem")|| openedFrom === 'slateAssessment') {
            this.addAssessment(item);
        } 
        else if ((openedFrom === "singleAssessment" && type === "assessment")) {
            this.setState({
                activeAssessmentId: item.urn,
            });
            this.addAssessment(item);
        }
    }

    /*** @description - This function is to toggle the current row selected
        * @param i- index of the row
       */
    setParentAssessment = (assessmentId, assessmentTitle, parentUrn) => {
        this.setState({
            activeAssessmentId: assessmentId,
            openItemTable: true,
            parentUrn: parentUrn,
            parentTitle:assessmentTitle,
            addFlag:false
        })
        
    }

    openAssessmentSearchBar=(flag)=>{
        this.props.openAssessmentSearchBar(this.props.activeAssessmentType,flag)
    }

    /*** @description - Function to render Table structure 
        * @param item - object that contains data of current table row
        * @param type - type of item
        * @param openedFrom - the component it is opened from - Full or Embedded Assessment
    */
    setElmTableJsx = (item, index, openedFrom) => {
        let elmTableBody,
            elmIcon = item.type == "assessment" ? elmAssessmentItem : singleAssessmentItemIcon;
        if ((item.type == "assessment" || item.type == "assessmentitem") && item.urn.includes("work")) {
            elmTableBody = <tr key={index} className={`row-class ${this.state.isActive === index ? 'select' : 'not-select'}`}>
                <td className='td-class elm-text-assesment' key={index} >
                    <div className="icon-div">
                    <input type="radio" className="radio-button" name="assessment-radio" value={item.urn} checked={this.state.isActive === index} onClick={() => this.handleClickAssessment(index, item, item.type, openedFrom)} />
                    <span className="elmAssessmentItem-icon">{elmIcon}</span>
                    </div>
                    <span className="elm-data-span"><b className='elm-assessment-title'> {item.assessmentTitle ? item.assessmentTitle : item.urn}</b></span>
                </td>
                <td className='td-class'><b className="elm-text-assesment">{item.urn}</b></td>
            </tr>
        } else {
            elmTableBody = (openedFrom == 'slateAssessment' || 'singleAssessment') && (item.type !== 'figure') && <tr key={index} className={`row-class ${this.state.isActive === index ? 'select' : 'not-select'}`} onClick={(e) => { this.showNewValueList(e, item.urn) }}>
                <td className='td-class assessment-container' key={index} colSpan="2">
                    <div className="desc-box">{getFolderLabel(item.type)} <span className="folder-icon"></span> </div>
                    <b className="elm-text-folder elm-assessment-title">{item.title}</b>
                </td>
            </tr>
        }
        return elmTableBody;
    }

    /*** @description - This function is to pass props to ElmError component*/
    elmErrorProps = {
        errorStatus: this.props.elmReducer.apiStatus,
        activeAssessmentType: this.props.activeAssessmentType,
        itemErrorStatus: this.props.elmReducer.itemApiStatus,
    }

    /*** @description - This function is to pass props to ElmFooter component*/
    elmFooterProps = {
        closeElmWindow: this.props.closeElmWindow,
        sendPufAssessment: this.sendPufAssessment,
        buttonText: (this.props.activeAssessmentType === FULL_ASSESSMENT_PUF || this.props.activeAssessmentType === PUF) ? "ADD" : "OK",
        openAssessmentSearchBar:this.openAssessmentSearchBar
    };

    render() {
        const { isLoading, itemApiStatus, errFlag } = this.props.elmReducer;
        const { tableValue, openItemTable, parentUrn, parentTitle, sortIcon, openedFrom, addFlag } = this.state;
        let assessmentFormat = (this.props.activeAssessmentType == FULL_ASSESSMENT_PUF || this.props.activeAssessmentType == PUF) ? PUF : LEARNOSITY_BETA;
        /** Set render condition variables using setStatus function */
        let showTable = setStatus('setTableStatus', assessmentFormat, this.props.elmReducer, this.state)
        let hideSearch = setStatus('setSearchButtonStatus', assessmentFormat, this.props.elmReducer, this.state)
        let showSearchBar = setStatus('setSearchBarStatus', assessmentFormat, this.props.elmReducer, this.state)
        let showErrorStatus = setStatus('setErrorStatus', assessmentFormat, this.props.elmReducer, this.state)
        let showBlankSearch = setStatus('setBlankSearchStatus', assessmentFormat, this.props.elmReducer, this.state)
        let showNavigationBar = setStatus('setNavigationBarStatus', assessmentFormat, this.props.elmReducer, this.state)

        {
            if (errFlag == true) {
                return <ElmError elmErrorProps={this.elmErrorProps} />
            } else {
                return (
                    <>
                        {showNavigationBar && <div className={`table-header `}>
                            {parentUrn && <div className="elm-navigate-back-icon" onClick={this.navigateBack} >{elmNavigateBack}</div>}
                            <p className="title-header">{parentTitle}</p>
                        </div>}
                        {showSearchBar && <AssessmentSearchBar filterAssessmentData={this.searchAssessmentData} assessmentType={'learnosity'} />}
                        <div className={`main-div ${(showSearchBar) ? 'has-search' : openItemTable == true ? 'item-table' : ''}`}>
                            {(openItemTable == true && isLoading == true) ? <div className="elm-loader"></div> : ""}
                            {showErrorStatus ?
                                <ElmError elmErrorProps={this.elmErrorProps} itemErrorStatus={itemApiStatus} showSearchScreen={showBlankSearch} noSearchResults={tableValue.length <= 0} />
                                : showTable && <table className='table-class'>
                                    <thead>
                                        <th className='row-class assessment-title'>
                                            <td className='td-class sort-icon'>Title</td>
                                            <div className="sort-icon" onClick={() => this.setSort()}>{sortIcon}</div>
                                        </th>
                                        <th className='row-class assessment-id'>Assessment URN</th>
                                    </thead>
                                    <tbody>
                                        {tableValue.map((item, index) => {
                                            return this.setElmTableJsx(item, index, openedFrom)
                                        })}
                                    </tbody>
                                </table>
                            }
                        </div>
                        <ElmFooter elmFooterProps={this.elmFooterProps} addFlag={addFlag} hideSearch={hideSearch} />
                    </>
                );
            }
        }
    }
}

const mapActionToProps = {
    openAssessmentSearchBar : openAssessmentSearchBar,
    setSearchBlock : setSearchBlock
  }

export default connect((state) => {
    return {
        elmReducer: state.elmReducer,
        currentSlateAncestorData: state.appStore.currentSlateAncestorData
    }
},mapActionToProps)(ElmTableComponent);
