/*** 
 * @description - The Body component of ELM Assessment Table
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../../../../styles/AssessmentSlateCanvas/elm/ElmTable.css';
import config from './../../../../../config/config';
import ElmError from '../ElmError';
import ElmFooter from '../ElmFooter'
import { FULL_ASSESSMENT_PUF, PUF } from '../../../AssessmentSlateConstants.js'
import { elmAssessmentItem, elmSortUp, elmSortDown, elmNavigateBack, singleAssessmentItemIcon } from './../../../../../images/ElementButtons/ElementButtons.jsx';
import { objectExpression } from '@babel/types';


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

    /*** @description - This function is to render elm table data
     * @param currentProps- props
    */

    renderTableData = (currentProps) => {
        const { errFlag, elmData, elmItemData, elmLoading, itemErrorFlag } = currentProps.elmReducer;
        let apiData = JSON.stringify(elmData), parent=""
        const  {allSlateData} = currentProps
        if (((!errFlag && elmData) && !elmItemData)|| (this.state.openedFrom == "singleAssessment" && !itemErrorFlag && !errFlag && elmLoading)) {
            if(config.parentLabel=="frontmatter"||config.parentLabel=="backmatter"){
                this.filterData(false, config.projectUrn, elmData);
            }
            else if(apiData.includes(config.parentContainerUrn)){
                this.filterData(false, config.parentContainerUrn, elmData);
            }else{
                parent= this.setParentUrn(allSlateData,apiData)
                this.filterData(false, parent, elmData);
            }
        }
        else if (!itemErrorFlag && elmItemData && elmLoading==false) {
            this.filterData(true, config.parentContainerUrn,elmItemData)
        }
        else if(this.state.openedFrom == "slateAssessment" && !errFlag && elmLoading){
            this.filterData(false,config.parentContainerUrn, elmData);
        }               
        else {
            this.filterData(false,this.state.currentUrn, elmData);
        }
    }



    setParentUrn = (allSlateData, elmData) => {
        let parent1 = {
            urn: "",
            type: ""
        }
    
        allSlateData && allSlateData.forEach((container) => {
            if (container.type == 'chapter' && JSON.stringify(container).includes(config.parentContainerUrn)) {
                if (container.containerUrn == config.parentContainerUrn && elmData.includes(container.containerUrn)) {
                    parent1 = {
                        urn: config.parentContainerUrn,
                        type: "chapter"
                    }
                } else {
                    container && container.contents && container.contents.forEach((item) => {
                        if (item.type == 'module' && item.containerUrn === config.parentContainerUrn && elmData.includes(item.containerUrn)) {
                            parent1.urn = item.containerUrn // 
                            parent1.type = 'module'
                        } else if ((item.type == 'module' && item.containerUrn === config.parentContainerUrn && !elmData.includes(item.containerUrn))||(item.type != 'module' && config.slateManifestURN == item.containerUrn)) {
                            if (elmData.includes(container.containerUrn)) {
                                parent1.urn = container.containerUrn //
                                parent1.type = 'chapter'
                            } else {
                                parent1.urn = config.projectUrn //
                                parent1.type = 'project'
                            }
                        } 
                    })
                }
            } else if (container.type == 'part' && (JSON.stringify(container).includes(config.parentContainerUrn))) {
                if (container.containerUrn == config.parentContainerUrn && elmData.includes(container.containerUrn)) {
                    parent1 = {
                        urn: container.containerUrn,
                        type: "part"
                    }
                } else {
                    container && container.contents && container.contents.forEach((item) => {
                        if (item.type == 'chapter' && item.containerUrn == config.parentContainerUrn) {
                            if (elmData.includes(config.parentContainerUrn)) {
                                parent1.urn = item.containerUrn //
                                parent1.type = 'chapter'
                            } else if (item && item.type == 'chapter' && item.contents && item.contents.length) {
                                item && item.contents && item.contents.forEach((subitem) => {
                                    if (subitem.type == 'module' && subitem.containerUrn == config.parentContainerUrn) {
                                        if (elmData.includes(subitem.containerUrn)) {
                                            parent1.urn = subitem.containerUrn //
                                            parent1.type = 'module'
                                        } else {
                                            if (elmData.includes(item.containerUrn)) {
                                                parent1.urn = item.containerUrn //
                                                parent1.type = 'chapter'
                                            } else {
                                                if (elmData.includes(container.containerUrn)) {
                                                    parent1.urn = container.containerUrn //
                                                    parent1.type = 'part'
                                                } else {
                                                    parent1.urn = config.projectUrn //
                                                    parent1.type = 'project'
                                                }
                                            }
                                        }
                                    } else if (subitem.type != 'module' && subitem.containerUrn == config.slateManifestURN) {
                                        if (elmData.includes(item.containerUrn)) {
                                            parent1.urn = item.containerUrn //
                                            parent1.type = 'chapter'
                                        } else {
                                            if (elmData.includes(container.containerUrn)) {
                                                parent1.urn = container.containerUrn //
                                                parent1.type = 'part'
                                            } else {
                                                parent1.urn = config.projectUrn //
                                                parent1.type = 'project'
                                            }
                                        }
                                    }
                                })
                            }
                        }
                    })
    
                }
            }
    
        })
    
        if(parent1.urn==""){
            parent1.urn=config.projectUrn
        }

        return parent1.urn
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
                console.log(11111122222222)
                this.filterSubData(data, urn, parentUrn, getItems)
                //this.filterData(getItems, urn, data, parentUrn)
            })

            apiData.backMatter && apiData.backMatter.forEach((data) => {
                this.filterSubData(data, urn, parentUrn, getItems)
            })
        }
        else if (!(apiData.contents || this.preparedData.length)) {
            console.log(555566666666666)
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
            console.log(3333337777777777)
            return this.getResourcefromFilterData(getItems, data, parentUrn)
        }
        else {
            if (data.contents){
                console.log(33333344444444)
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
        let title = "";
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
            return this.setState({ tableValue: this.preparedData, parentUrn: parentUrn, parentTitle: (data.unformattedTitle && data.unformattedTitle.en) ? data.unformattedTitle.en : this.state.firstName })
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

    /*** @description - This function is to show table data based on parameters
         * @param e- event triggered
         * @param versionUrn- version urn of current item selected
        */
    showNewValueList = (e, versionUrn) => {
        this.filterData(false, versionUrn, this.props.elmReducer.elmData);
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
        if (this.state.openItemTable == true && this.props.elmReducer.itemApiStatus != "200") {
            this.navigateFromItemsTable();
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

    /*** @description - This function is to send puf assessment data to RootELMComponent */
    sendPufAssessment = () => {
        let obj = {}
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

    /*** @description - This function is triggered when a user clicks on table row
        * @param item - object that contains data of current table row
        * @param type - type of item
        * @param openedFrom - the component it is opened from - Full or Embedded Assessment
       */
    handleClickAssessment = (item, type, openedFrom) => {
        if (openedFrom === "singleAssessment" && type === "assessmentitem") {
            this.addAssessment(item)
        } else if (openedFrom === "singleAssessment" && type === "assessment") {
            this.props.fetchAssessmentItem(item.urn)
            this.setParentAssessment(item.urn, item.assessmentTitle, item.previousUrn)
        } else {
            this.addAssessment(item)
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
            parentTitle:assessmentTitle
        })
        
    }

    /*** @description - This function is to toggle the current row selected
         * @param i- index of the row
        */
    toggleActive = (i) => {
            this.setState({
                isActive: i
            });

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
            elmTableBody = <tbody key={index}>
                <tr className={`row-class ${this.state.isActive === index ? 'select':'not-select'}`} onClick={() => this.toggleActive(index)}>
                    <td className='td-class' key={index} onClick={() => this.handleClickAssessment(item, item.type, openedFrom)}>
                        <span className="elmAssessmentItem-icon">{elmIcon}</span>
                        <b className="elm-text-assesment">{item.assessmentTitle ? item.assessmentTitle : item.urn}</b>
                    </td>
                </tr>
            </tbody>
        } else {
            elmTableBody = <tbody key={index}>
                {(openedFrom == 'slateAssessment' || 'singleAssessment') && (item.type !== 'figure') && <tr className='row-class'>
                    <td className='td-class' key={index} onClick={(e) => { this.showNewValueList(e, item.urn) }}>
                        <div className="desc-box">{this.getFolderLabel(item.type)} <span className="folder-icon"></span> </div>
                        <b className="elm-text-folder">{item.title}</b></td>
                </tr>}
            </tbody>
        }
        return elmTableBody;
    }

    /*** @description - This function is to pass props to ElmError component*/
    elmErrorProps = {
        errorStatus: this.props.elmReducer.apiStatus,
        // 
        activeAssessmentType: this.props.activeAssessmentType,
        itemErrorStatus: this.props.elmReducer.itemApiStatus,
    }

    /*** @description - This function is to pass props to ElmFooter component*/
    elmFooterProps = {
        closeElmWindow: this.props.closeElmWindow,
        sendPufAssessment: this.sendPufAssessment,
        buttonText: (this.props.activeAssessmentType === FULL_ASSESSMENT_PUF || this.props.activeAssessmentType === PUF) ? "ADD" : "OK"
    };

    render() {
        const { isLoading, elmLoading } = this.props.elmReducer;
        {
            if (this.props.elmReducer.errFlag == true) {
                return <ElmError elmErrorProps={this.elmErrorProps} />
            } else {
                return (
                    <>
                        <div className='table-header'>
                            {(this.state.parentUrn) ?
                                <div className="elm-navigate-back-icon" onClick={this.navigateBack} >{elmNavigateBack}</div> : null}
                            <p className="title-header">{this.state.parentTitle}</p>
                        </div>
                        <div className='main-div'>
                            {(this.state.openItemTable == true && isLoading == true)? <div className="elm-loader"></div> : ""}
                            {(!this.props.elmReducer.itemErrorFlag && this.props.elmReducer.itemApiStatus != 200 && this.state.openItemTable == true && isLoading == false) ?
                                <ElmError elmErrorProps={this.elmErrorProps} itemErrorStatus={this.props.elmReducer.itemApiStatus}/>
                                :
                                (this.state.openItemTable == true && isLoading == false) || (this.state.openItemTable == false) ?
                                    <table className='table-class'>
                                        <thead>
                                            <th className='row-class'>
                                                <td className='td-class sort-icon'>Title</td>
                                                <div className="sort-icon" onClick={() => this.setSort()}>{this.state.sortIcon}</div>
                                            </th>
                                        </thead>
                                        {this.state.tableValue.map((item, index) => {
                                            return this.setElmTableJsx(item, index, this.state.openedFrom)
                                        })}
                                    </table> : ""
                            }
                        </div>
                        <ElmFooter elmFooterProps={this.elmFooterProps} addFlag={this.state.addFlag} />
                    </>
                );
            }
        }
    }
}


export default connect((state) => {
    return {
        elmReducer: state.elmReducer,
        allSlateData: state.appStore.allSlateData
    }
})(ElmTableComponent);
