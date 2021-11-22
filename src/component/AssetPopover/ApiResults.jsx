//This component generate a list of each result and then render that list ☻
//on body part of the serachbar component

import React from 'react';
import FigureCard from './FigureCard.jsx';
import ErrorComp from './ErrorComp.jsx';
class ApiResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            figureDetails:[]
        }
    }

    apiResultsJsx = (assetPopoverData, selectedFigure, ValueToBeSearch) => {
        let cardForApiResults
        var tempFiguresForResults = [], figureDataLength
        const AssetDetails = Object.values(assetPopoverData);
        let filteredDetails = AssetDetails.filter(assetType => {
            if (Array.isArray(assetType) && assetType?.length >= 1) {
                return assetType;
            }
        });
        const finalAssetDetails = filteredDetails?.flat()
        if (ValueToBeSearch && finalAssetDetails) {
            tempFiguresForResults = finalAssetDetails.filter((value, index, array) => {
                if (typeof (value.title) !== 'undefined' || (typeof (value?.unformattedTitle) !== 'undefined')) {
                    let searchItem = value?.title ? value.title : value?.unformattedTitle?.en ? value.unformattedTitle.en : "";
                    searchItem = String(searchItem).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, ' ');
                    let searchValue = ValueToBeSearch;
                    searchValue = String(searchValue).replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ').replace(/ /g, ' ');
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
                const assetTitle = value?.title ? value.title : value?.unformattedTitle?.en ? value.unformattedTitle.en : "";
                return <FigureCard forInputKey={index} key={index} figureDetails={value} title={assetTitle} path={value.path ?? assetTitle} selectedFigure={selectedFigure} />
            });
        } else {
            let errorMsg = "No Match found! ";
            cardForApiResults = <ErrorComp errorMsg={errorMsg} />
        }
        return cardForApiResults;
    }

    render() {
        const {selectedFigure, ValueToBeSearch,assetPopoverData} = this.props;
        return (
            <div>
                <h3 className="figureCount">Assets Matched</h3>
                {this.apiResultsJsx(assetPopoverData, selectedFigure, ValueToBeSearch)}
                <hr />
            </div>
        )
    }
}

export default ApiResults;