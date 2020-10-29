/**
* Search Bar Component of Learning Tool/Learning App Assessment
*/
import React, { useState } from 'react';
import ApiResults from '../ApiResults.jsx';
import '../../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
const LearningToolBody = (props) => {

    const [resultsPerPage, setResultsPerPage] = useState(25);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const { apiResponse, selectedResultData, learningToolPageLimit, selectedFigure, learningToolTableHeaders, capitalizeString } = props;

    /**
    * @discription - This function is for implementing the pagination
    * @param {event} e
    */
    const paginationFunction = (e) => {
        let numberOfRows = e.target.value;
        const totalPages = Math.ceil(apiResponse.length / numberOfRows);
        setTotalPage(totalPages);
        setCurrentPage(1);
        setResultsPerPage(numberOfRows);
    }

    /**
    * @discription - prevPage handles the button for prev in pagination
    */
    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    /**
    *@discription - nextPage handles the button for next in pagination
    */
    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
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
    const showltBodyJsx = (tempFiguresForResults, selectedResult) => {
        /**
        * If value of discipline selected
        */
        let ltBodyJsx;
        let apiResponseForBody;
        apiResponseForBody = tempFiguresForResults;
        const indexOfLastData = currentPage * resultsPerPage;
        const indexOfFirstData = indexOfLastData - resultsPerPage;
        const apiResponseLearningTemp = apiResponseForBody.slice(indexOfFirstData, indexOfLastData);

        ltBodyJsx = <div>
            <div className="learningToolResultsTableHeader">
                <span className="learningToolPagesDropdownLabel1">Displaying </span>
                <select className="learningToolPages" onChange={(e) => paginationFunction(e)}>
                    {learningToolPageLimit.map((pagesNos) =>
                        <option value={pagesNos}>{pagesNos}</option>)}
                </select>
                <span className="learningToolPagesDropdownLabel2">results</span>
                <span className="paginationButtons">
                    <button className="leftPage previous round" onClick={prevPage}><span className="fa fa-caret-left arrow-icon"></span></button><span>{apiResponseForBody.length ? currentPage + "-" + totalPage : "0"}</span>
                    <button className="rightPage next round" onClick={nextPage}><span className="fa fa-caret-right arrow-icon"></span ></button>
                </span>
            </div>
            <div className="learningToolBody scroller" id="style-2">
                <table className="learningToolTable">
                    {apiResponseLearningTemp.length ? <thead className="tableForApiResults">
                        {learningToolTableHeaders.map((tableHeader, index) =>
                            <th key={index} className="tableHeader">{tableHeader}</th>)}
                    </thead>
                        : ''}
                    {<tbody className="learning-tool-margin-left">
                        <ApiResults selectedResult={selectedResult} selectedFigure={selectedFigure} apiResponseData={apiResponseLearningTemp} capitalizeString={capitalizeString} />
                    </tbody>}
                </table>
            </div>
        </div>

        return ltBodyJsx;
    }
    return showltBodyJsx(apiResponse, selectedResultData);
}
export default LearningToolBody;