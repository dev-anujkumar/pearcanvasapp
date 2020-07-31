/*** 
 * @description - The Table component of ELM/Learnosity/Elm Intearctives Picker
*/

// IMPORT - Plugins //
import React, { Component } from 'react';
import { connect } from 'react-redux';
// IMPORT - Components //
import ElmError from '../ElmError';
import ElmFooter from '../ElmFooter';
import ElmTableBody from '../ElmTableBody';
import AssessmentSearchBar from '../AssessmentSearchBar';
// IMPORT - Dependencies // 
import config from './../../../../../config/config';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import { FULL_ASSESSMENT_PUF, PUF, LEARNOSITY_BETA, ELM_INT } from '../../../AssessmentSlateConstants.js'
import { elmSortUp, elmSortDown, elmNavigateBack } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import { openAssessmentSearchBar, setSearchTerm,setElmLoading } from '../../Actions/ElmActions.js';
import { setStatus, searchAndFilterAssessmentData, setParentUrn, tableDataSorting, setInteractiveType } from '../../UtilityFunctions/ElmLearnosityUtility.js';

/*** @description - ElmTableComponent is a class based component to store ELM assessments in tabular form*/
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
            sortIcon: elmSortUp,
            sortFlag: false,
            activeAssessmentId: '',
            openItemTable: false,
            openedFrom: this.setOpenedFrom() || "",
            filterResults: ''
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
            // if(this.props.elmReducer.openSearch !=true){
                _self.renderTableData(this.props);
            // }
        }
    }

    /*** @description - This function is to fetch project title*/
    getProjectTitle = () => {
        return config.book_title
    }

    /*** @description - This function is to set the current slate type for assessment picker*/
    setOpenedFrom = () =>{
        let openedFrom=''
        if(config.slateType==="assessment"){
            openedFrom="slateAssessment"
        }else{
            openedFrom="singleAssessment"
        }
        return openedFrom
    }

    /*** @description - This function is to fetch the search results for given searchTerm
        * @param assessmentType- type of assessment-(puf/learnosity)
        * @param searchAssessmentTitle- term to search in API data
    */
    searchAssessmentData = (assessmentType, searchAssessmentTitle) => {
        let searchResults = [];
        this.searchData = [];
        this.props.setSearchTerm(searchAssessmentTitle);
        this.setState({ isActive: null, addFlag: false })
        searchResults = searchAndFilterAssessmentData(assessmentType, searchAssessmentTitle, this.props.elmReducer.elmData)
        this.searchData = searchResults
        if (searchResults.length != 0) {
            return this.setState({
                tableValue: searchResults,
                filterResults: 'Search Results Exist',
                sortIcon: elmSortUp
            })
        } else {
            return this.setState({
                tableValue: [],
                filterResults: 'No Results'
            })
        }
    }

    /*** @description - This function is to render elm table data
     * @param currentProps- props
    */
    renderTableData = (currentProps) => {
        const { errFlag, elmData, elmItemData, elmLoading, itemErrorFlag } = currentProps.elmReducer;
        const { elementType } = currentProps
        let apiData = JSON.stringify(elmData),
            parent = "";
        if (((!errFlag && elmData) && !elmItemData) || (this.state.openedFrom == "singleAssessment" && !itemErrorFlag && !errFlag && elmLoading)) {
            if (config.parentLabel == "frontmatter" || config.parentLabel == "backmatter") {
                this.filterData(elementType, false, config.projectUrn, elmData);
            }
            else if (apiData.includes(config.parentContainerUrn) && config.parentContainerUrn) {
                this.filterData(elementType, false, config.parentContainerUrn, elmData);
            } else {
                parent = setParentUrn(apiData, this.props.currentSlateAncestorData)
                this.filterData(elementType, false, parent, elmData);
            }
        }
        else if ((!itemErrorFlag && elmItemData && elmLoading == false) && (config.parentContainerUrn || (config.parentLabel == "frontmatter" || config.parentLabel == "backmatter"))) {
            if (config.parentLabel == "frontmatter" || config.parentLabel == "backmatter") {
                this.filterData(elementType, true, config.projectUrn, elmItemData)
            } else {
                this.filterData(elementType, true, config.parentContainerUrn, elmItemData)
            }
        }
        else if (this.state.openedFrom == "slateAssessment" && !errFlag && elmLoading) {
            parent = setParentUrn(apiData, this.props.currentSlateAncestorData)
            this.filterData(elementType, false, parent, elmData);
        }
        else {
            this.filterData(elementType, false, this.state.currentUrn, elmData);
        }
    }

    /*** @description - This function is to filter table data based on parameters
         * @param getItems - check for type of data |true=assessment-item data|false- elm-resouces data     
         * @param data- api data
         * @param urn- assessment id
         * @param parentUrn- parent-Urn
        */
    filterData = (activeElementType, getItems, urn, apiData, parentUrn = config.projectUrn) => {
        this.preparedData = [];
        this.setState({ addFlag: false, isActive: null });
        if (urn === parentUrn) {
            this.getResourcefromFilterData(activeElementType, getItems, apiData)
        }
        else if (apiData.contents) {
            apiData = apiData.contents;
            apiData.frontMatter && apiData.frontMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems, activeElementType)
            })

            apiData.bodyMatter && apiData.bodyMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems, activeElementType)
                //this.filterData(getItems, urn, data, parentUrn)
            })

            apiData.backMatter && apiData.backMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems, activeElementType)
            })
        }
        else if (!(apiData.contents || this.preparedData.length)) {
            this.getResourcefromFilterData(activeElementType, getItems, apiData)
        }
    }

    /*** @description - Function to check if api data's versionUrn is same as current urn
        * @param data- api data
        * @param urn- assessment id
        * @param parentUrn- parent-Urn
        * @param getItems - check for type of data |true=assessment-item data|false- elm-resouces data
       */
    filterSubData = (data, urn, parentUrn, getItems,activeElementType) => {

        if (data.versionUrn === urn) {
            return this.getResourcefromFilterData(activeElementType, getItems, data, parentUrn)
        }
        else {
            if (data.contents){
                this.filterData(activeElementType, getItems, urn, data, data.versionUrn)
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
    getResourcefromFilterData = (activeElementType, getItems, data, parentUrn) => {
        let title = "", setParentTitle = "";
        if (data.alignments && data.alignments.resourceCollections && data.alignments.resourceCollections.length) {
            data.alignments.resourceCollections.forEach((resource) => {
                if (resource.resources && resource.resources.length) {
                    resource.resources.forEach((assessments) => {
                        if (assessments && assessments.title && assessments.title.en) {
                            title = assessments.title.en
                        }
                        if(assessments && assessments.type && (assessments.type == activeElementType)){
                            // let elmInteractiveType = assessments.additionalMetadata && assessments.additionalMetadata.interactiveType ? assessments.additionalMetadata.interactiveType : "";
                            let elmInteractiveType = assessments.type == 'interactive' ? setInteractiveType(assessments) : {};
                            this.preparedData.push({ "type": assessments.type? assessments.type:"assessment", "title": title, "urn": assessments.urn, "parentUrn": parentUrn, "previousUrn": data.versionUrn, "interactiveType" : elmInteractiveType });
                        }
                    })
                }
            })
        }
        if (data.contents && data.contents.bodyMatter && data.contents.bodyMatter.length) {
            data.contents.bodyMatter.forEach((item) => {
                if (item && ((item.alignments && item.alignments != null) || (item.contents && item.contents != null))) {
                    this.preparedData.push({ "type": item.type, "urn": item.versionUrn, "title": item.unformattedTitle ? item.unformattedTitle.en : "", "label": item.label ? item.label : "" })
                }
            })
        }
        if (this.state.openedFrom === "singleAssessment" && getItems == true && this.state.openItemTable === true) {
            this.getAssessmentItemsData(data, this.state.activeAssessmentId, this.state.parentTitle)
        } 
        else if(this.props && this.props.elmReducer && this.props.elmReducer.openSearch && this.props.elmReducer.openSearch ==true){
            return this.setState({ tableValue: [], parentUrn: parentUrn, parentTitle: setParentTitle })
        }
        else {
            setParentTitle = (data.unformattedTitle && data.unformattedTitle.en) ? data.unformattedTitle.en : data.label == 'project' ? this.state.firstName : "";
            this.preparedData = tableDataSorting(false, this.preparedData, 'asc')
            return this.setState({ tableValue: this.preparedData, parentUrn: parentUrn, parentTitle: setParentTitle })
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
                this.preparedData.push({ "type": "assessmentItem", "title": item.name ? item.name : "", "urn": item.versionUrn, "assessmentId": assessmentId })
            })
            this.preparedData = tableDataSorting(true, this.preparedData, 'asc')
            return this.setState({ tableValue: this.preparedData, parentTitle: assessmentTitle, sortIcon: elmSortUp })
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
        if(this.state.filterResults !=='Search Results Exist'){
            this.setState({
                openItemTable: false,
                sortIcon: elmSortUp,
            }, this.filterData(this.props.elementType, false, this.state.parentUrn, this.props.elmReducer.elmData))
        }else{
            this.openAssessmentSearchBar(true);
            this.setState({
                openItemTable: false,
                tableValue:this.searchData,
                sortIcon: elmSortUp
            })
            
        }
      
    }

    /*** @description - This function is to navigate back to parent hierarchy */
    navigateBack = () => {
        if (this.state.openItemTable == true) {
            this.navigateFromItemsTable()
        } else {
            this.setState({
                sortIcon: elmSortUp
            }, this.filterData(this.props.elementType, false, this.state.parentUrn, this.props.elmReducer.elmData))
        }
    }

    /*** @description - This function is to set the sort icon and call dynamicSort function
         * @param e- event triggered
        */
    setSort = () => {
        if (this.state.sortIcon == elmSortUp) {
            this.setState({ 
                sortIcon: elmSortDown, 
                tableValue: tableDataSorting(this.state.openItemTable,this.state.tableValue,'desc'),
                addFlag: false, 
                isActive: null, 
                sortFlag: true 
            });
        }
        else if (this.state.sortIcon == elmSortDown){
            this.setState({ 
                sortIcon: elmSortUp, 
                tableValue:  tableDataSorting(this.state.openItemTable,this.state.tableValue,'asc'),
                addFlag: false, 
                isActive: null, 
                sortFlag: false });
        }
    }

    /*** @description - This function is to show table data based on parameters
         * @param e- event triggered
         * @param versionUrn- version urn of current item selected
        */
    showNewValueList = (e, versionUrn) => {
        this.setState({
            sortIcon: elmSortUp, 
        }, this.filterData(this.props.elementType, false, versionUrn, this.props.elmReducer.elmData))
       
    }

    /*** @description - This function is to send puf assessment data to RootELMSingleComponent */
    sendPufAssessment = () => {
        let obj = {}
        if (this.state.openedFrom === "singleAssessment" && this.state.currentAssessmentSelected.type === "assessment" && this.state.openItemTable==false) {
            this.setState({
                tableValue:[]
            })
            this.props.fetchAssessmentItem(this.state.activeAssessmentId)
            this.setParentAssessment(this.state.currentAssessmentSelected.urn, this.state.currentAssessmentSelected.title, this.state.currentAssessmentSelected.previousUrn)
        }
        else{
            let assessmentFormat = (this.props.activeAssessmentType == FULL_ASSESSMENT_PUF || this.props.activeAssessmentType == PUF) ? PUF : LEARNOSITY_BETA;
            
            if(this.props.activeAssessmentType == ELM_INT){
                obj = {
                    id: this.state.currentAssessmentSelected.urn,
                    title: this.state.currentAssessmentSelected.title,
                    interactiveType: this.state.currentAssessmentSelected.interactiveType.wipValue,
                }
            }else if (this.state.openedFrom === "slateAssessment") {
                obj = {
                    id: this.state.currentAssessmentSelected.urn,
                    title: this.state.currentAssessmentSelected && this.state.currentAssessmentSelected.title ? this.state.currentAssessmentSelected.title : "Elm assessment",//PCAT-6326-ELM assessment default title added
                    assessmentFormat: assessmentFormat,
                    usagetype: this.props.activeUsageType
                }
            } else {
                obj = {
                    id: this.state.currentAssessmentSelected.assessmentId,
                    itemid: this.state.currentAssessmentSelected.urn,
                    title: this.state.parentTitle,
                    assessmentFormat: assessmentFormat,
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

        switch (type) {
            case "assessmentItem":
            case "interactive":
                this.addAssessment(item);
                break;
            case "assessment":
            default:
                if (openedFrom === "singleAssessment") {
                    this.setState({
                        activeAssessmentId: item.urn,
                    });
                }
                this.addAssessment(item);
                break;
        }
    }

    /*** @description - This function is to save the parent-assessment data before assessment items API is triggerd
        * @param assessmentId- unique id of the assessment
        * @param assessmentTitle- name of the assessment
        * @param parentUrn- parentUrn of current assessment
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

    /*** @description - This function is to open the assessment search bar menu
        * @param flag- true- open menu | false-close menu
        * @param fromFooter-true if called from footer component(to set search term blank again) | false- other cases
    */
    openAssessmentSearchBar=(flag,fromFooter)=>{
        this.setState({ isActive: null, tableValue:[], addFlag:false })
        this.props.setElmLoading(false);
        if(fromFooter==true){
            this.props.setSearchTerm('');
        }
        this.props.openAssessmentSearchBar(this.props.activeAssessmentType,flag)
    }

    /*** @description - This function is to pass props to ElmFooter component*/
    elmFooterProps = {
        closeElmWindow: this.props.closeElmWindow,
        sendPufAssessment: this.sendPufAssessment,
        buttonText: this.props.activeAssessmentType === ELM_INT ? "SELECT" : (this.props.activeAssessmentType === FULL_ASSESSMENT_PUF || this.props.activeAssessmentType === PUF) ? "ADD" : "OK",
        openAssessmentSearchBar:this.openAssessmentSearchBar
    };

    render() {
        const { isLoading, itemApiStatus, errFlag, elmLoading, itemErrorFlag, openSearch,searchTerm } = this.props.elmReducer;
        const { tableValue, openItemTable, parentUrn, parentTitle, sortIcon, openedFrom, addFlag,filterResults } = this.state;
        let assessmentFormat = (this.props.activeAssessmentType == FULL_ASSESSMENT_PUF || this.props.activeAssessmentType == PUF) ? PUF : LEARNOSITY_BETA;
        /** Set render condition variables using setStatus function */
        if(this.props.activeAssessmentType == ELM_INT){
            assessmentFormat = ELM_INT
        }
        let hideSearch = setStatus('setSearchButtonStatus', assessmentFormat, this.props.elmReducer, this.state)
        let showNavigationBar = setStatus('setNavigationBarStatus', assessmentFormat, this.props.elmReducer, this.state)
        /** Condition to show loader */
        let showLoader = (((openItemTable==false && elmLoading ==true )||  
        (openItemTable == true && isLoading == true) )&& 
         tableValue.length <=0)  ? true:false
        /** Condition to show error */
        let showErrorStatus =((( openItemTable==false && !itemApiStatus && errFlag ) || 
        (openItemTable == true&& (itemErrorFlag ||(itemErrorFlag==false && itemApiStatus!=200)) && itemApiStatus!=200 && !showLoader) ) &&
        (tableValue.length <=0))||(filterResults=='No Results') ? true:false
        /** Condition to show table */
        let showTable = tableValue.length ? true:false
  
        {
            if (errFlag == true) {
                /** ELM Picker Error Div */
                return <ElmError
                    errFlag={errFlag}
                    itemErrorFlag={itemErrorFlag}
                    itemApiStatus={itemApiStatus}
                    filterResults={filterResults}
                    errorStatus={showErrorStatus}
                    activeAssessmentType={assessmentFormat}
                />
            } else {
                return (
                    <>
                        {/** Navigation Bar */}
                        {showNavigationBar && <div className={`table-header `}>
                            {parentUrn && <div className="elm-navigate-back-icon" onClick={this.navigateBack} >{elmNavigateBack}</div>}
                            <p className="title-header">{parentTitle}</p>
                        </div>}
                        {/** Assessment Search Bar */}
                        {(assessmentFormat == LEARNOSITY_BETA && openSearch && openItemTable==false) && <AssessmentSearchBar filterAssessmentData={this.searchAssessmentData} assessmentType={'learnosity'} searchTerm={searchTerm}/>}
                        <div className={`main-div ${(assessmentFormat == LEARNOSITY_BETA && openSearch && showLoader==false) ? 'has-search' : openItemTable == true && showLoader==true ? 'item-table' : (showNavigationBar==false && showLoader==true)?'show-loader':''}`}>
                            {showLoader &&  <div className="elm-loader"></div>}
                            {showErrorStatus ?
                                /** ELM Picker Error Div */
                                <ElmError
                                    errFlag={errFlag}
                                    itemErrorFlag={itemErrorFlag}
                                    itemApiStatus={itemApiStatus}
                                    filterResults={filterResults}
                                    errorStatus={showErrorStatus}
                                    activeAssessmentType={assessmentFormat}
                                />
                                /** ELM Picker Table */
                                : showTable && <table className='table-class'>
                                    <thead>
                                        <th className='row-class assessment-title'>
                                            <td className='td-class sort-icon'>Title</td>
                                            <div className="sort-icon" onClick={() => this.setSort()}>{sortIcon}</div>
                                        </th>
                                        {assessmentFormat == ELM_INT && <th className='row-class assessment-id'>Type</th>}
                                        <th className='row-class assessment-id'>{assessmentFormat == ELM_INT ? "URN" : "Assessment URN"}</th>
                                    </thead>
                                    {/** ELM Picker Table Body*/}
                                    <ElmTableBody
                                        openedFrom={openedFrom}
                                        tableValue={tableValue}
                                        elementType={assessmentFormat}
                                        isActiveRow={this.state.isActive}
                                        showNewValueList={this.showNewValueList}
                                        handleClickAssessment={this.handleClickAssessment}
                                    />
                                </table>
                            }
                        </div>
                        {/** ELM Picker Footer */}
                        <ElmFooter elmFooterProps={this.elmFooterProps} addFlag={addFlag} hideSearch={hideSearch} />
                    </>
                );
            }
        }
    }
}

const mapActionToProps = {
    setSearchTerm: setSearchTerm,
    setElmLoading: setElmLoading,
    openAssessmentSearchBar: openAssessmentSearchBar
}

export default connect((state) => {
    return {
        elmReducer: state.elmReducer,
        currentSlateAncestorData: state.appStore.currentSlateAncestorData
    }
},mapActionToProps)(ElmTableComponent);
