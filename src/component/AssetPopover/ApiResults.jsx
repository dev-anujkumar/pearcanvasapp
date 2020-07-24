//This component generate a list of each result and then render that list ☻
//on body part of the serachbar component

import React from 'react';
import FigureCard from './FigureCard.jsx';
import ErrorComp from './ErrorComp.jsx';

class ApiResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figureDataLength: ''
        }
    }

    //dynamically generate cards of each result so call FigureCard
    //component with some props
    apiResultsJsx = (figuresForResults, selectedFigure, ValueToBeSearch) => {
        let cardForApiResults
        var tempFiguresForResults = [], figureDataLength

        if (ValueToBeSearch && figuresForResults) {
            tempFiguresForResults = figuresForResults.filter((value, index, array) => {
                if (typeof (value.title) !== 'undefined') {
                    let searchItem = value.title;
                    searchItem = String(searchItem).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, '&nbsp;');
                    let searchValue = ValueToBeSearch;
                    searchValue = String(searchValue).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, '&nbsp;');
                    return searchItem.toUpperCase().includes(searchValue.toUpperCase());
                }
            });
        }

        figureDataLength = tempFiguresForResults.length;

        if (this.state.figureDataLength != figureDataLength) {
            this.setState({
                figureDataLength: figureDataLength
            })
        }
        //If number figureforresults has 1> elements then muild cards otherwise 
        //No result found for this search term
        if (figureDataLength >= 1) {
            cardForApiResults = tempFiguresForResults.map((value, index) => {
                return <FigureCard forInputKey={index} key={index} figureDetails={value} title={value.title} path={value.path} selectedFigure={selectedFigure} />
            });
        } else {
            let errorMsg = "No Match found! ";
            cardForApiResults = <ErrorComp errorMsg={errorMsg} />
        }
        return cardForApiResults;
    }

    render() {
        let noOfFigures = this.state.figureDataLength ? this.state.figureDataLength : '0';
        const {figures, selectedFigure, ValueToBeSearch} = this.props;

        return (
            <div>
                <h3 className="figureCount">Figures ({noOfFigures})</h3>
                {this.apiResultsJsx(figures, selectedFigure, ValueToBeSearch)}
                <hr />
            </div>
        )
    }
}

export default ApiResults;