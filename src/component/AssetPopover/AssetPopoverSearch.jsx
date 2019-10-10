//This is Root component of assetpopover
//have three parts Header (For search Bar), Currently Linked (Figure that is linked now to that text),
//Body(for search results) , Footer (for buttons like update link etc.)

import  React, { Component } from 'react';
const ReactDOM = require('react-dom');
import { connect } from 'react-redux';

import { apoSearchCloseAction, searchForFiguresAction, selectedFigureAction, apoSearchSaveAction,removeAssetLinkAction } from '../../actions/assetPopoverActions.js';
import './assetPopoverStyles.css';
import ApiResults from './ApiResults.jsx';
import FigureCard from './FigureCard.jsx';
import { saveAssetLinkedMedia } from '../editor_tools_module.jsx';
import { hasReviewerRole } from '../../js/utility_module'
const configModule = require('../../js/config_module.js');
const configObject = configModule.GET_CONFIG();
const WRAPPER_URL = `${configObject.WRAPPER_URL}`

class AssetPopoverSearch extends React.Component {

    constructor(props) {
        super(props);
    }

    //Close the popup
    apoSearchClose = () => {
        this.props.apoSearchClose();
        window.parent.postMessage({ 'type': 'enableToc', 'message': {} }, WRAPPER_URL);
    }

    //Take text to be searched 
    searchForFigures = (e, stateImageData) => {
       // if(e.charCode == 13){
           // let hittingApi = true
            let searchTermName = e.target.value;
           
            this.props.searchForFigures(searchTermName, stateImageData)
       // }
    }

    //Fn for return selectedfigure after save on selected figure 
    apoSearchSave = (apoObject, args) =>{
        //set id and args in state and after that trigger the function "saveAssetLinkedMedia" in editor_tools_modules
        this.props.apoSearchSave(apoObject, args);
        // //Check if nothing selected

        // if(args ==='undefiined' || args === ''){   
        //     //Handle if nothing selected eg. show errors
        // }else{
        //     //Now close the popup
        //     this.apoSearchClose();
        // }
        this.apoSearchClose(); 
    }

    //Function for setting state when any figure selected and store that id for future implementation
    //Args comming from figurecard onChange
    selectedFigure = (args) => {
        this.props.selectedFigure(args);
    }

    //Remove link 
    removeLink = () => {
        this.props.removeAssetLink();      
        this.apoSearchClose(); 
    }

    //Update link
    // updateLink = (apoObject, args) => {
    //     this.props.apoSearchSave(apoObject, args);
    // }

    //Jsx for currently linked
    currentlyLinkedJsx = () => {
        return (
           // <div className="blockerDiv">
                <section className= "modalSubHeader">
                    <h3 className= "currentlyLinkedHeader"><i>Currently Linked to-</i></h3>
                    <input type='radio' disabled name='selectedradio'  checked className= "currentlyLinkedRadio"/>
                    <span> {this.props.apoObject.title.text}</span>
                </section>
           // </div> 
        )
    }

    //Jsx for apo body or results from API
    apoBodyJsx = (ValueToBeSearch) => {
        return (
            <section className= "modalBody">
                 <p className="APOSearchResultText">Search took about {this.props.timeByAPI?this.props.timeByAPI.toFixed(): ' '} ms, Total hits: {this.props.figures?this.props.figures.length:0}</p>
                <ApiResults selectedFigure = {this.selectedFigure} ValueToBeSearch = {ValueToBeSearch} figures = {this.props.figures}/>
            </section>
        )
    }

    //Jsx for footer buttons
    apoFooterJsx = (isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound) => {
                {
                 return (   (() => {
                        if (shouldOpenCurrentlyLinked){
                            if(!isSearchResultFound){
                                return <section className= "modalFooter">
                                            <button disabled = {!isFigureSelected} className= "myButton" onClick= {() => this.apoSearchSave(this.props.apoObject, this.props.selectedFigureValue)}>Update Link</button>
                                            <button disabled = {!isFigureSelected} className= "myButton" onClick= { this.apoSearchClose}>Cancel</button>    
                                        </section>
                            }else{
                               // if(isSearchResultFound ||  shouldShowApoBody) {
                                    return  <section className= "modalFooter">
                                            <button disabled = {!shouldOpenCurrentlyLinked || hasReviewerRole() } className= "myButton" onClick= {() => this.removeLink()}>Remove Link</button>
                                            <button disabled = {!isFigureSelected} className= "myButton" onClick= { this.apoSearchClose}>Cancel</button>    
                                        </section>
                                //}
                            }
                        }else{
                            if(!isSearchResultFound && shouldShowApoBody){
                                return  <section className= "modalFooter">
                                        <button disabled = {!isFigureSelected } className= "myButton" onClick= {() => this.apoSearchSave(this.props.apoObject, this.props.selectedFigureValue)}>Save</button>
                                        <button disabled = {!isFigureSelected} className= "myButton" onClick= { this.apoSearchClose}>Cancel</button>    
                                    </section>
                            }
                        }
                    })())
                } 
    }

    hideAPOOnOuterClick = () => {
        this.apoSearchClose();
    }

    render() {
        const stateImageData = this.props.figures;

        return (
            <div>
               <div className= "containerApo">
                    <section className= "modalHeader header__search-bar">
   
                        <svg className="icon--16 header__search-icon">
                            <use xlinkHref="#search"/>
                        </svg>
                        <input className= "searchBarApo" placeholder= "Search for images..." type= "text"  readOnly = {hasReviewerRole()} onChange= {(e) => this.searchForFigures(e, stateImageData)}/>
                        <label className= "modal__close" onClick= { this.apoSearchClose}></label>

                    </section>

                    {this.props.showApoCurrentlyLinked ? this.currentlyLinkedJsx(): ''} 

                    {/* If showApoBody is true then -
                                            if noSearchResultFound is true show error else results */}
                    {this.props.showApoBody  ? this.apoBodyJsx(this.props.searchTerm) :''} 

                    {this.props.showApoFooter ? this.apoFooterJsx(this.props.figureIsSelected, this.props.showApoCurrentlyLinked, this.props.showApoBody, this.props.noSearchResultFound) : ''}

               </div>
               <div className = 'blockerBgDiv' tabIndex="0" onClick = {this.hideAPOOnOuterClick}>
               </div>
               </div>
        )
    }

}

//Auto dispatch Actions 
const mapActionToProps = {
    apoSearchClose : apoSearchCloseAction,
    searchForFigures : searchForFiguresAction,
    selectedFigure : selectedFigureAction,
    apoSearchSave : apoSearchSaveAction,
    removeAssetLink : removeAssetLinkAction
}
  
//Get State as a props here in this component
const mapStateToProps = (state, props) => {
    return {
        figures : state.assetPopOverSearch.figures,
        showApoCurrentlyLinked : state.assetPopOverSearch.showApoCurrentlyLinked,
        showApoBody : state.assetPopOverSearch.showApoBody,
        showApoFooter : state.assetPopOverSearch.showApoFooter,
        selectedFigureValue : state.assetPopOverSearch.selectedFigureValue,
        noSearchResultFound : state.assetPopOverSearch.noSearchResultFound,
        figureIsSelected : state.assetPopOverSearch.figureIsSelected,
        apoObject : state.assetPopOverSearch.apoObject,
        searchTerm : state.assetPopOverSearch.searchTerm,
        figureDetails : state.assetPopOverSearch.figureDetails,
        timeByAPI : state.assetPopOverSearch.timeByAPI
    }
}
 
//Connect HOC to React component
export default connect(
    mapStateToProps,
    mapActionToProps
)(AssetPopoverSearch)
  