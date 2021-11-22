//This component generate a list of each result and then render that list ☻
//on body part of the serachbar component

import React from 'react';
import FigureCard from './FigureCard.jsx';

class ApiResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figureDetails:[]
        }
    }

    getFigureTypeData = (ValueToBeSearch, Details) => {
        if (ValueToBeSearch && (typeof (Details?.title) !== 'undefined' || typeof (Details?.unformattedTitle) !== 'undefined')) {
            let searchItem = Details?.title ?? Details?.unformattedTitle?.en ?? '';
            searchItem = String(searchItem).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, ' ');
            let searchValue = ValueToBeSearch;
            searchValue = String(searchValue).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, ' ');
            if (searchItem.toUpperCase().includes(searchValue.toUpperCase())) {
                return Details
            }
        }
    }

    //dynamically generate cards of each result so call FigureCard
    //component with some props
    apiResultsJsx = (selectedFigure, ValueToBeSearch) => {
        let cardForApiResults,filteredDetails,finalDetails
        let AssetDetails=Object.values(this.props.assetPopoverData);
        filteredDetails=AssetDetails.filter(value=>{
            if( Array.isArray(value) && value?.length >=1){
                return value;
            }
        });
        finalDetails=filteredDetails.flat().map((data)=>{
            return this.getFigureTypeData(ValueToBeSearch,data)
        });
      
        cardForApiResults = finalDetails.map((value, index) => {
            if ( value && value?.title || value?.unformattedTitle?.en) {
                return (
                    <>
                        <FigureCard forInputKey={index} key={index} figureDetails={value} title={value.title} path={value.path} selectedFigure={selectedFigure} />
                    </>
                )
            }
        });
        return cardForApiResults;
    }

    render() {
        const {selectedFigure, ValueToBeSearch,assetPopoverData} = this.props;
        return (
            <div>
                <h3 className="figureCount">Assets Matched</h3>
                {this.apiResultsJsx(selectedFigure, ValueToBeSearch)}
                <hr />
            </div>
        )
    }
}

export default ApiResults;