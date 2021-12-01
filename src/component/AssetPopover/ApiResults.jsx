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
        let type = Object.keys(assetPopoverData)
        type = type[0].charAt(0).toUpperCase() + type[0].slice(1)
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
        let assetTypeTitle = type + " " + `(${figureDataLength})`

        // if (this.state.figureDataLength != figureDataLength) {
        //     this.setState({
        //         figureDataLength: figureDataLength
        //     })
        // }
        
        //If number figureforresults has 1> elements then muild cards otherwise 
        //No result found for this search term
        if (figureDataLength >= 1) {
            cardForApiResults = <>
                <h3 className="figureCount">{assetTypeTitle}</h3>
                {
                    tempFiguresForResults.map((value, index) => {
                        const assetTitle = value?.title ? value.title : value?.unformattedTitle?.en ? value.unformattedTitle.en : "";
                        return <FigureCard forInputKey={index} key={index} figureDetails={value} title={assetTitle} path={value.path ?? assetTitle} selectedFigure={selectedFigure} />
                    })
                }
            </>
        }
        // else {
        //     let errorMsg = "No Match found! ";
        //     cardForApiResults = <ErrorComp errorMsg={errorMsg} />
        // }
        return cardForApiResults;
    }

    renderByAssetType = (assetPopoverData, selectedFigure, ValueToBeSearch) => {
        let assetTypes = Object.keys(assetPopoverData);
        let assetData
        return assetTypes.map((assetType) => {
            assetData = {}
            assetData[`${assetType}`] = assetPopoverData[`${assetType}`]
            return this.apiResultsJsx(assetData, selectedFigure, ValueToBeSearch)
        })
    }

    render() {
        const {assetPopoverData, selectedFigure, ValueToBeSearch} = this.props;
        return (
            <div>
                {this.renderByAssetType(assetPopoverData, selectedFigure, ValueToBeSearch)}
            </div>
        )
    }
}

export default ApiResults;