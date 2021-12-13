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

    //This functions finds any matching assets according to search value
    findMatchingAssets = (assetPopoverData, ValueToBeSearch) => {
        let tempFiguresForResults = []
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
        return tempFiguresForResults
    }

    //This function renders Asset Type & its matching Assets List
    apiResultsJsx = (assetData, selectedFigure, ValueToBeSearch) => {
        let cardForApiResults
        let assetType = Object.keys(assetData)
        assetType = assetType[0].charAt(0).toUpperCase() + assetType[0].slice(1)
        let matchingAssets = this.findMatchingAssets(assetData, ValueToBeSearch)
        let assetTypeTitle = assetType + " " + `(${matchingAssets.length})`
        
        //If number matching Assets has 1> elements then List of matching assets is displayed
        if (matchingAssets.length >= 1) {
            cardForApiResults = <>
                <h3 className="figureCount">{assetTypeTitle}</h3>
                {
                    matchingAssets.map((value, index) => {
                        const assetTitle = value?.title ? value.title : value?.unformattedTitle?.en ? value.unformattedTitle.en : "";
                        return <FigureCard forInputKey={index} key={index} figureDetails={value} title={assetTitle} path={value.path ?? assetTitle} selectedFigure={selectedFigure} />
                    })
                }
            </>
        }
        return cardForApiResults;
    }

    //This function calls apiResultsJsx for each Asset Type for eg Figures,Audios,Videos & etc
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
        let matchingAssets = this.findMatchingAssets(assetPopoverData, ValueToBeSearch)
        return (
            <div>
                {matchingAssets.length >= 1 ? this.renderByAssetType(assetPopoverData, selectedFigure, ValueToBeSearch) : <ErrorComp errorMsg={"No Match found! "} />}
            </div>
        )
    }
}

export default ApiResults;