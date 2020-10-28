/**
* Root Compoent of Learning Tool/ Learning App Assessment
*/
/** ----- Import - Plugins ----- */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
/** ----- Import - Components ----- */
import ApiResults from './ApiResults.jsx';
import LearningToolHeader from './Components/LearningToolHeader.jsx'
import LearningToolSearch from './Components/LearningToolSearch.jsx'
/** ----- Import - Dependencies ----- */
import { disableHeader } from '../../../js/toggleLoader.js';
import error_icon from '../../../images/AssessmentSlateCanvas/error_icon.svg'
import './../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
import { LT_LA_HEADER, LT_LA_SEARCH_TEXT, learningToolTableHeaders, learningToolPages, capitalizeString } from './learningToolUtility.js';
/** ----- Import - Action Creators ----- */
import {removeSelectedData,toolTypeFilterSelectedAction, closeLtAction, selectedFigureAction, learningToolDisFilterAction, learningToolSearchAction, paginationFunctionAction } from './learningToolActions.js';

/**
* @description - LearningTool is a class based component. It is defined simply
* to make a skelten of the Learning Tool UI
*/
class LearningTool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            resultsPerPage: 25,
            currentPage: 1,
            totalPage: 0,
            selectedDisFilterValue: "",
            selectedTypeValue: "",
            showError: false,
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.apiResponse != nextProps.apiResponse) {
            this.setState({
                currentPage: 1
            })
        }
    }

    /**
    * @description - Take the value of selected filter in learning App type and dispatch an action
    * @param {event} - event 
    */
    learningAppType = (e) => {
        let selectedTypeValue = e.target.value;
        this.setState({
            selectedTypeValue:selectedTypeValue
        })
    }

    /**
    * @description - Take the value of selected filter in discipline type and dispatch an action
    * @param {event} - event 
    */
    learningToolDisFilter = (e) => {
        let selectedDisFilterValue = e.target.value;
        this.setState({selectedDisFilterValue:selectedDisFilterValue})
        this.props.learningToolDisFilter(selectedDisFilterValue);
    }

    /**
    * @description - This function close the Popup by despatching an action
    */
    closeLt = () => {
        //this.props.closePopUp();
        this.props.closelearningPopup();
        this.props.closeLt();
        this.props.removeSelectedData();

    }

    /**
    * @discription - This function close popup when user click outside of popup
    * @param {event} - event 
    */
    hideLTOnOuterClick = () => {
        this.closeLt();
    }

    /**
    * @discription - This function is for searching in searchbar and dispatch an action
    * @param {event} - event 
    * @param {String} tempLearningToolTypeValue - value of learning tool type selected from dropdown
    */
    learningToolSearch(e, tempLearningToolTypeValue) {
        let that = this;
        let learningToolSearchValue = that.state.searchValue;
        let learningSystem = this.props.learningSystems[tempLearningToolTypeValue].appType
        if (learningToolSearchValue) {
            this.props.learningToolSearch(learningToolSearchValue, tempLearningToolTypeValue, learningSystem);
        } else {
            this.props.learningAppType(this.state.selectedTypeValue, learningSystem);
            this.props.learningToolDisFilter(this.state.selectedDisFilterValue);
        }
    }

    /**
    * @discription - This function is for handeling the data,when we select any entery from 
    * the table
    * @param {Object} args - Object of properties we want to send in wip
    */
    selectedFigure = (args) => {
        this.props.selectedFigure(args);
    }

    /**
    * @discription - This function is for implementing the pagination
    * @param {event} e
    */
    paginationFunction = (e) => {
        let numberOfRows = e.target.value;
        const totalPage = Math.ceil(this.props.apiResponse.length / numberOfRows);
        this.setState({
            resultsPerPage: numberOfRows,
            totalPage:totalPage,
            currentPage: 1
        })
    }

    /**
    * @discription - prevPage handles the button for prev in pagination
    */
    prevPage=() =>{
        let currentPage = this.state.currentPage
        if (currentPage > 1) {
            this.setState({ currentPage: currentPage - 1 });
        }
    }

    /**
    *@discription - nextPage handles the button for next in pagination
    */
    nextPage =() =>{
        let currentPage = this.state.currentPage
        const totalPage = Math.ceil(this.props.apiResponse.length / this.state.resultsPerPage)
        if (currentPage < totalPage) {
            this.setState({ currentPage: currentPage + 1 });
        }
    }

    /**
    * ```jsx of the POPUP body```
    * @discription - This function is for rendering the body of the popup table
    * 
    * @param {Array} tempFiguresForResults - Array of Api response
    * @param {Array} selectedResult - Array of results
    * @param {String} learningToolDisValue - String of the value selected from discipline dropdown
    * @param {Number} tempNumberOfRows - number that is selected from pagination dropdown
    * @return {String} - returns the jsx code of the body part of learning tool popup
    */
    ltBodyJsx = (tempFiguresForResults, selectedResult, learningToolDisValue) => {
        /**
        * If value of discipline selected
        */
        let apiResponseForBody;
        apiResponseForBody = tempFiguresForResults;
        const { currentPage, resultsPerPage } = this.state;
        const indexOfLastData = currentPage * resultsPerPage;
        const indexOfFirstData = indexOfLastData - resultsPerPage;
        const apiResponseLearningTemp = apiResponseForBody.slice(indexOfFirstData, indexOfLastData);
        const totalPage = Math.ceil(apiResponseForBody.length / resultsPerPage)

        return (
            <div>
                <div className="learningToolResultsTableHeader">
                    <span className="learningToolPagesDropdownLabel1">Displaying </span>
                    <select className="learningToolPages" onChange={(e) => this.paginationFunction(e)}>
                        {learningToolPages.map((pagesNos) =>
                            <option value={pagesNos}>{pagesNos}</option>)}
                    </select>
                    <span className="learningToolPagesDropdownLabel2">results</span>
                    <span className="paginationButtons">
                        <button className="leftPage previous round" onClick={this.prevPage}><span className="fa fa-caret-left arrow-icon"></span></button><span>{apiResponseForBody.length ? currentPage + "-" + totalPage : "0"}</span>
                        <button className="rightPage next round" onClick={this.nextPage}><span className="fa fa-caret-right arrow-icon"></span ></button>
                    </span>
                </div>
                <div className="learningToolBody scroller" id="style-2">
                    <table className="learningToolTable">
                        {apiResponseLearningTemp.length ? <thead className="tableForApiResults">
                            {learningToolTableHeaders.map((tableHeader, index) =>
                                <th key={index} className="tableHeader">{tableHeader}</th>)}
                        </thead>
                            : ''}
                        {<tbody  className="learning-tool-margin-left">
                            <ApiResults selectedResult={selectedResult} selectedFigure={this.selectedFigure} apiResponseData={apiResponseLearningTemp} capitalizeString={capitalizeString}/>
                            </tbody>}
                    </table>
                </div>
            </div>
        )
    }

    /**
     * @discription - This function is for validating the format of input in search bar
     */
   validateSearch =(e,searchText) => {
       this.setState({ searchValue: searchText })
        let searchValue = searchText
        let regex = /^[A-Za-z0-9 " "\-]{0,100}$/
        if (!regex.test(searchValue)) {
          this.setState({showError:true})
        } else {
            this.setState({showError:false})
        } 
   }
   
   linkLearningApp=() =>{
    this.props.linkLearningApp(this.props.selectedResultFormApi);
    this.props.closePopUp();
   }
    render() {
        disableHeader(true);
        return (
            <div>
                <div className="learningToolContainer">
                    <div className="learningToolHeader">
                        {/* Title of POPUP */}
                        <div className="learningToolHeaderTitle">
                            <h1 className="learningToolHeaderString">{LT_LA_HEADER}</h1>
                        </div>
                        <div className="learningToolHeaderMainDiv">
                            {/* LT/LA Dropdown Header */}
                            <LearningToolHeader learningAppType={this.learningAppType} learningSystems={this.props.learningSystems} learningToolDisFilter={this.learningToolDisFilter} apiResponseForDis={this.props.apiResponseForDis} showDisFilterValues={this.props.showDisFilterValues} capitalizeString={capitalizeString}/>
                            {/* Search Bar for searching */}
                            <LearningToolSearch error_icon={error_icon} showError={this.state.showError} validateSearch={this.validateSearch} selectedTypeValue={this.state.selectedTypeValue} learningToolSearch={this.learningToolSearch} searchTextCondition={LT_LA_SEARCH_TEXT} />
                        </div>
                    </div>
                    <hr />
                    {/* Body of the popup table */}
                    {this.props.showLTBody ? this.ltBodyJsx(this.props.apiResponse, this.props.selectedResultFormApi, this.props.learningToolDisValue, this.props.numberOfRows) : ''}
                    {/* Footer for the popUp */}
                    <div className="learningToolFooter">
                        <button disabled={this.props.linkButtonDisable == false ? this.props.linkButtonDisable : true} className="learningToolFooterButtonLink" onClick={this.linkLearningApp}>Link</button>
                        <button className="learningToolFooterButtonCancel" onClick={this.hideLTOnOuterClick}>Cancel</button>
                    </div>
                </div>
                {/* Background blocker div of Learning Tool */}
                <div className='blockerBgDivLT' tabIndex="0" onClick={this.hideLTOnOuterClick}>
                </div>
            </div>
        )
    }

}

/**
 *  @discription - get state variable as props in this component
 */
const mapStateToProps = (state) => {
    return {
        learningTypeSelected: state.learningToolReducer.learningTypeSelected,
        shouldHitApi: state.learningToolReducer.shouldHitApi,
        learningToolTypeValue: state.learningToolReducer.learningToolTypeValue,
        apiResponse: state.learningToolReducer.apiResponse,
        showErrorMsg: state.learningToolReducer.showErrorMsg,
        showLTBody: state.learningToolReducer.showLTBody,
        showDisFilterValues: state.learningToolReducer.showDisFilterValues,
        selectedResultFormApi: state.learningToolReducer.selectedResultFormApi,
        linkButtonDisable: state.learningToolReducer.linkButtonDisable,
        apiResponseForDis: state.learningToolReducer.apiResponseForDis,
        learningToolDisValue: state.learningToolReducer.learningToolDisValue,
        numberOfRows: state.learningToolReducer.numberOfRows,
        learningSystems: state.learningToolReducer.learningSystems,
    }
}

LearningTool.displayName = "LearningTool"

LearningTool.propTypes = {
    /** This function is called when saving of data */
    linkLearningApp: PropTypes.func,
     /** This function is called to close the popup */
     closePopUp: PropTypes.func,
     closelearningPopup:PropTypes.func
}

/** 
 * @discription - dispatch actions as props from this component
 */
const mapActionToProps = {
    learningAppType: toolTypeFilterSelectedAction,
    closeLt: closeLtAction,
    selectedFigure: selectedFigureAction,
    learningToolDisFilter: learningToolDisFilterAction,
    learningToolSearch: learningToolSearchAction,
    paginationFunction: paginationFunctionAction,
    removeSelectedData:removeSelectedData
}

/**
 * @discription - connect this component with redux
 */
export default connect(
    mapStateToProps,
    mapActionToProps
)(LearningTool)