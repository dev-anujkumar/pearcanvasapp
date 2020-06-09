/**
* Root Compoent of Learning App.
*/
import React from 'react';
import { connect } from 'react-redux';
import {removeSelectedData,toolTypeFilterSelectedAction, closeLtAction, selectedFigureAction, learningToolDisFilterAction, learningToolSearchAction, paginationFunctionAction } from './learningToolActions.js';
import ApiResults from './ApiResults.jsx';
import { disableHeader } from '../../../js/toggleLoader.js';
import error_icon from '../../../images/AssessmentSlateCanvas/error_icon.svg'
import './../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
import PropTypes from 'prop-types'


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
            selectedDisFilterValue:"",
            selectedTypeValue:"",
            showError:false,
            learningSystem :{
                "accounting-sims":"knowdl",
                "criminal-justice-sims":"knowdl",
                "digital-interactives":"knowdl",
                "economics-sims":"knowdl",
                "helpdesk":"knowdl",
                "hospitality-sims":"knowdl",
                "information-technology-sims":"knowdl",
                "Personal Finance":"knowdl",
                "Psychology Sims":"knowdl",
                "qual-sims":"knowdl",
                "soundbytes":"knowdl",
                "political-science-sims":"knowdl",
                "video-submission":"mediashare",
                "video-quiz":"mediashare",
                "myvirtual-child":"myvirtual-x",
                "myvirtual-life":"myvirtual-x",
                "socialexplorer-surveys":"socialexplorer",
                "writingsolutions":"writingsolutions"
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props.apiResponse != nextProps.apiResponse){
                this.setState({
                    currentPage:1
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
    learningToolSearch(e,tempLearningToolTypeValue) {

        let learningToolSearchValue = this.state.searchValue;
        let learningSystem = this.state.learningSystem[tempLearningToolTypeValue]
        // let search = $('#learningToolSearchBar').hasClass('error')
       // if(!search){
            if (learningToolSearchValue) {
                this.props.learningToolSearch(learningToolSearchValue, tempLearningToolTypeValue,learningSystem);
            } else {
                this.props.learningAppType(this.state.selectedTypeValue,learningSystem);
                this.props.learningToolDisFilter(this.state.selectedDisFilterValue);
            }
       // }
    }

    /**
    * @discription - This function is for rendering disipline filter dynamically
    * @param {Array} apiResponseForDis - Array of response from discipline API
    */
    renderDisFilter = (apiResponseForDis) => {
        let diciplineData = apiResponseForDis.options && apiResponseForDis.options.map((item, index) => {
            return <option key={index} value={item.prefLabel}>{item.prefLabel}</option>
        })
        return diciplineData;
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
                        <option value="25" selected>25</option>
                        <option value="50">50</option>
                    </select>
                    <span className="learningToolPagesDropdownLabel2">results</span>
                    <span className="paginationButtons">
                        <button className="leftPage previous round" onClick={this.prevPage}><span className="fa fa-caret-left arrow-icon"></span></button><span>{apiResponseForBody.length ? currentPage + "-" + totalPage : "0"}</span>
                        <button className="rightPage next round" onClick={this.nextPage}><span className="fa fa-caret-right arrow-icon"></span ></button>
                    </span>
                </div>
                <div className="learningToolBody scroller" id="style-2">
                   {apiResponseLearningTemp.length? <table className="tableForApiResults">
                        <tr>
                            <th className="tableHeader">Learning App Type</th>
                            <th className="tableHeader">Discipline</th>
                            <th className="tableHeader labelHeader">Label</th>
                            <th className="tableHeader">Date Modified</th>
                            <th className="tableHeader">Keyword(s)</th>
                        </tr>
                    </table> : ''} 
                    <ApiResults selectedResult={selectedResult} selectedFigure={this.selectedFigure} apiResponseData={apiResponseLearningTemp} />
                </div>
            </div>
        )
    }

    /**
     * @discription - This function is for validating the format of input in search bar
     */
   validateSearch =(e) => {
       this.setState({ searchValue: e.target.value })
        let searchValue = e.target.value
        let regex = /^[A-Za-z0-9 " "]{0,100}$/
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
                            <h1 className="learningToolHeaderString"> Search Learning App Type </h1>
                        </div>

                        {/* Filter dropdown of Learning App type */}
                        <div className="learningToolHeaderTypeFilter">
                            <span className="spanLTFilterType">Learning App Type <span style={{ "color": "red" }}>*</span></span>
                            <select className="learningToolType" onChange={this.learningAppType}>
                                <option value="" selected>Select One</option>
                                <option value="accounting-sims">Accounting Sims</option>
                                <option value="criminal-justice-sims"> Criminal Justice Sims</option>
                                <option value="economics-sims">Economic Sims</option>
                                <option value="helpdesk">HelpDesk</option>
                                <option value="hospitality-sims">Hospitality Sims</option>
                                <option value="information-technology-sims">Information Technology Sims</option>
                                <option value="video-quiz"> Media Quiz</option>
                                <option value="video-submission">Shared Media</option>
                                <option value="myvirtual-child">MyVirtualChild</option>
                                <option value="myvirtual-life">MyVirtualLife</option>
                                <option value="knowdl">Personal Finance </option>
                                <option value="political-science-sims">Political Science Sims</option>
                                <option value="qual-sims">Qualitative Business Sims</option>
                                <option value="soundbytes">Sound Bytes</option>
                                <option value="socialexplorer-surveys">Surveys and Inventories</option>
                                <option value="video-library">Video Library</option>
                                <option value="writingsolutions">Writing Solutions</option>
                            </select>

                            {/* Render the discipline dropwn dynamically */}
                            <span className="spanLTFilterDis">Discipline</span>
                            <select className="learningToolDis" onChange={this.learningToolDisFilter}>
                                <option value="" selected>Select One</option>
                                {this.props.showDisFilterValues ? this.renderDisFilter(this.props.apiResponseForDis) : '<option value="" selected disabled>Select One</option>'}
                            </select>

                        </div>

                        {/* Search Bar for searching */}
                        <div className="learningToolHeaderSearchBar">
                            <br />
                            <input className={`learningToolSearchBar ${this.state.showError ? "error":""}`} id="learningToolSearchBar" type="text" placeholder="Enter Keyword to search" onChange={this.validateSearch} name="search2" />
                          {/*   <svg  id="errorIcon"  className="exclamation-icon">
                                <use xlinkHref="#exlamation-error"/>
                             </svg>  */}
                             {this.state.showError ? <img  className="exclamation-icon" src = {error_icon}></img> :""}

                            <button disabled={!this.state.selectedTypeValue} className="learningToolSearchButton" onClick={(e) => this.learningToolSearch(e, this.state.selectedTypeValue)}>Search</button>
                            <div className={`learning-search-text ${this.state.showError ? "errorSpan":""}`}>Max. 100 characters of A-Z, a-z, 0-9, space allowed</div>
                        </div>
                    </div>
                    <hr />
                    {/* Body of the popup table */}
                    {this.props.showLTBody ? this.ltBodyJsx(this.props.apiResponse, this.props.selectedResultFormApi, this.props.learningToolDisValue, this.props.numberOfRows) : ''}

                    {/* Footer for the popUp */}
                    <div className="learningToolFooter">
                        <button disabled={this.props.linkButtonDisable == false?this.props.linkButtonDisable:true} className="learningToolFooterButtonLink" onClick={this.linkLearningApp}>Link</button>
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
        numberOfRows: state.learningToolReducer.numberOfRows
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
