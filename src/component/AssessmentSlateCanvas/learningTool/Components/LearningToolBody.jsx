/**
* Results Table Component of Learning Tool/Learning App Assessment
*/
import React, { useState, useEffect } from 'react';
import ErrorComp from '../ErrorComp.jsx';
import ApiResults from '../ApiResults.jsx';
import {ERROR_MESSAGE} from '../learningToolUtility.js';
import '../../../../styles/AssessmentSlateCanvas/LearningTool/LearningTool.css';
const LearningToolBody = (props) => {

    const [resultsPerPage, setResultsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);
    const { apiResponse, selectedResultData, learningToolPageLimit, selectedFigure, learningToolTableHeaders } = props;
    
    useEffect(() => {
        setCurrentPage(1);
    }, [apiResponse]);

    /**
    * @discription - This function is for implementing the pagination
    * @param {event} e
    */
    const paginationFunction = (e) => {
        let numberOfRows = e.target.value;
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
        const totalPages = Math.ceil(apiResponse.length / resultsPerPage)
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    /**
    * @discription - This function is for rendering the body of the popup table
    * @param {Array} tempFiguresForResults - Array of Api response
    * @param {Array} selectedResult - Array of results
    * @return {String} - returns the jsx code of the body part of learning tool popup
    */
    const showltBodyJsx = (tempFiguresForResults, selectedResult) => {

        let ltBodyJsx;
        let apiResponseForBody = tempFiguresForResults;
        const indexOfLastData = currentPage * resultsPerPage;
        const indexOfFirstData = indexOfLastData - resultsPerPage;
        const apiResponseLearningTemp = tempFiguresForResults.slice(indexOfFirstData, indexOfLastData);
        const totalPages = Math.ceil(apiResponseForBody.length / resultsPerPage)
        ltBodyJsx = (
        <>
            <div className="learningToolResultsTableHeader">
                <span className="learningToolPagesDropdownLabel1">Displaying </span>
                <select className="learningToolPages" onChange={(e) => paginationFunction(e)}>
                    {learningToolPageLimit.map((pagesNos) =>
                        <option value={pagesNos}>{pagesNos}</option>)}
                </select>
                <span className="learningToolPagesDropdownLabel2">results</span>
                <span className="paginationButtons">
                    <button className="leftPage previous round" onClick={prevPage}><span className="fa fa-caret-left arrow-icon"></span></button>
                    <span className="page-limit">{apiResponseForBody.length ? currentPage + "-" + totalPages : "0"}</span>
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
                            {apiResponseLearningTemp.length >= 1 ? <ApiResults
                                selectedResult={selectedResult}
                                selectedFigure={selectedFigure}
                                apiResponseData={apiResponseLearningTemp}
                            />
                                : <ErrorComp errorMsg={ERROR_MESSAGE} />}
                        </tbody>}
                    </table>
            </div>
        </>
        )

        return ltBodyJsx;
    }
    return showltBodyJsx(apiResponse, selectedResultData);
}
export default LearningToolBody;