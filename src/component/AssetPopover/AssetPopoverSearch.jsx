/**
 * This is Root component of assetpopover
 * have three parts Header (For search Bar), Currently Linked (Figure that is linked now to that text),
 * Body(for search results) , Footer (for buttons like update link etc.)
 */

import React from 'react';
import { connect } from 'react-redux';
import { apoSearchCloseAction, searchForFiguresAction, selectedFigureAction, apoSearchSaveAction, removeAssetLinkAction, getAssetPopoverId, assetIdForSnapshot } from './AssetPopover_Actions.js';
import '../../styles/AssetPopover/assetPopoverStyles.css';
import ApiResults from './ApiResults.jsx';
import { clearAssetPopoverLink } from './openApoFunction.js';
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import searchIcon from './asset_popover_search_icon.svg';
import { customEvent } from '../../js/utils';
import { showTocBlocker, disableHeader} from '../../js/toggleLoader';

class AssetPopoverSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Close the popup
     */
    apoSearchClose = () => {
        let originalText, assetPopoverSpan
        assetPopoverSpan = document.getElementById('asset-popover-attacher');
        if (assetPopoverSpan) {
            originalText = assetPopoverSpan.innerHTML;
            document.getElementById('asset-popover-attacher').outerHTML = originalText;
        }
        this.props.apoSearchClose();
        sendDataToIframe({ 'type': 'enableToc', 'message': {} });
        this.props.showBlocker(false);
        disableHeader(false);
    }

    /**
     * Take text to be searched
    */
    searchForFigures = (e, stateImageData) => {
        let searchTermName = e.target.value;
        this.props.searchForFigures(searchTermName, stateImageData)
    }


    /**
 * Handler for save assetpopover link
 */
    saveAssetLinkedMedia(apoObject, imageObj) {
        let elementId = imageObj['entityUrn'] || imageObj['contentUrn'];
        let originalText, domNode, assetPopoverDomId;

        if (Object.keys(apoObject).length) {
            const currentElementNode = document.getElementById(tinymce.activeEditor.id)
            currentElementNode.focus()
            domNode = currentElementNode.querySelector('abbr[asset-id="' + apoObject.assetId + '"');
            originalText = domNode.innerHTML;
            assetPopoverDomId = apoObject.assetId;
            domNode.outerHTML = '<abbr title="Asset Popover" asset-id="' + assetPopoverDomId + '" data-uri="' + elementId + '" class="Pearson-Component AssetPopoverTerm">' + originalText + '</abbr>';
            this.apoSearchClose();
            setTimeout(() => {
                let currentElem = document.getElementById(tinymce.activeEditor.id);
                if (tinymce.$(currentElem).find('blockquote').length) {
                    tinymce.$(currentElem).find('blockquote p.paragraphNummerEins')[0].focus();
                    tinymce.$(currentElem).find('blockquote p.paragraphNummerEins')[0].blur();
                }
                else {
                    currentElem.blur()
                }
            }, 0);
        } else {
            //Hit api for asset popover Id
            getAssetPopoverId(imageObj.versionUrn).then((assetPopoverId) => {
                if (assetPopoverId) {
                    document.getElementById(tinymce.activeEditor.id).focus()
                    tinymce.activeEditor.undoManager.transact(() => {
                        domNode = document.getElementById('asset-popover-attacher');
                        originalText = domNode.innerHTML;
                        assetPopoverDomId = assetPopoverId;
                        domNode.outerHTML = '<abbr title="Asset Popover" asset-id="' + assetPopoverDomId + '" data-uri="' + elementId + '" class="Pearson-Component AssetPopoverTerm">' + originalText + '</abbr>';
                    });
                    this.apoSearchClose();
                    setTimeout(() => {
                        customEvent.trigger('assetPopoverSave');
                    }, 100);

                }
            })
        }
    }

    /**
     * Fn for return selectedfigure after save on selected figure 
     */
    apoSearchSave = (apoObject, imageObj) => {
        this.saveAssetLinkedMedia(apoObject, imageObj)
    }

    /**
     *Function for setting state when any figure selected and store that id for future implementation 
     *Args comming from figurecard onChange
     */
    selectedFigure = (figureData) => {
        this.props.selectedFigure(figureData);
    }

    /**
     * Remove link 
    */
    removeLink = () => {
        let assetId = this.props.apoObject && this.props.apoObject.assetId;       
        this.props.assetIdForSnapshot(assetId)
        clearAssetPopoverLink(assetId);
        this.apoSearchClose();
        setTimeout(() => {
            let currentElem = document.getElementById(tinymce.activeEditor.id);
            if (tinymce.$(currentElem).find('blockquote').length) {
                tinymce.$(currentElem).find('blockquote p.paragraphNummerEins')[0].focus();
                tinymce.$(currentElem).find('blockquote p.paragraphNummerEins')[0].blur();
            }
            else {
                currentElem.focus()
                currentElem.blur()
            }
        }, 0);
    }

    /**
     * Jsx for currently linked
     */
    currentlyLinkedJsx = () => {
        return (<section className="modalSubHeader">
            <h3 className="currentlyLinkedHeader"><i>Currently Linked to-</i></h3>
            <input type='radio' disabled name='selectedradio' checked className="currentlyLinkedRadio" />
            <span> {this.props.currentlyLinkedImageData.title}</span>
        </section>
        )
    }

    /**
     *Jsx for apo body or results from API 
     */
    apoBodyJsx = (ValueToBeSearch) => {
        const assetArray = {
            figures: this.props.figures,
            audios: this.props.audios,
            videos: this.props.videos,
            interactives: this.props.interactives,
            asides: this.props.asides
        }
        return (<section className="modalBody">
            <p className="APOSearchResultText">Search took about {this.props.timeByAPI ? this.props.timeByAPI.toFixed() : ' '} ms, Total hits: {this.props.figures ? this.props.figures.length : 0}</p>
            <ApiResults assetPopoverData={assetArray} selectedFigure={this.selectedFigure} ValueToBeSearch={ValueToBeSearch}/>
        </section>
        )
    }

    /**
     * Jsx for footer buttons
     */
    apoFooterJsx = (isFigureSelected, shouldOpenCurrentlyLinked, shouldShowApoBody, isSearchResultFound) => {
        {
            return ((() => {
                if (shouldOpenCurrentlyLinked) {
                    if (!isSearchResultFound) {
                        return <section className="modalFooter">
                            <button disabled={!isFigureSelected} className="myButton" onClick={() => this.apoSearchSave(this.props.apoObject, this.props.selectedFigureValue)}>Update Link</button>
                            <button className="myButton" onClick={this.apoSearchClose}>Cancel</button>
                        </section>
                    } else {
                        return <section className="modalFooter">
                            <button disabled={!shouldOpenCurrentlyLinked || hasReviewerRole()} className="myButton" onClick={() => this.removeLink()}>Remove Link</button>
                            <button  className="myButton" onClick={this.apoSearchClose}>Cancel</button>
                        </section>
                    }
                } else {
                    if (!isSearchResultFound && shouldShowApoBody) {
                        return <section className="modalFooter">
                            <button disabled={!isFigureSelected} className="myButton" onClick={() => this.apoSearchSave(this.props.apoObject, this.props.selectedFigureValue)}>Save</button>
                            <button  className="myButton" onClick={this.apoSearchClose}>Cancel</button>
                        </section>
                    }
                }
            }
            )()
            )
        }
    }

    hideAPOOnOuterClick = () => {
        this.apoSearchClose();
    }

    handleBlur=()=>{
        this.props.showBlocker(true);
        showTocBlocker(true);
        disableHeader(true);
    }

    render() {
        const stateImageData = this.props.figures;
        const { showApoFooter, showApoBody, figureIsSelected, showApoCurrentlyLinked, noSearchResultFound, searchTerm } = this.props;
        return (
            <div>
                {this.handleBlur()}
                <div className="containerApo">
                    <section className="modalHeader header__search-bar">
                        <img className="seach_icon" src={searchIcon} />
                        <input className="searchBarApo" placeholder="Search figures, asides, worked exmaples etc..." type="text" readOnly={hasReviewerRole()} onChange={(e) => this.searchForFigures(e, stateImageData)} />
                        <label className="modal__close" onClick={this.apoSearchClose}></label>
                    </section>

                    {showApoCurrentlyLinked ? this.currentlyLinkedJsx() : ''}

                    {/* If showApoBody is true then -
                                            if noSearchResultFound is true show error else results */}
                    {showApoBody ? this.apoBodyJsx(searchTerm) : ''}

                    {showApoFooter ? this.apoFooterJsx(figureIsSelected, showApoCurrentlyLinked, showApoBody, noSearchResultFound) : ''}

                </div>
                <div className='blockerBgDiv' tabIndex="0" onClick={this.hideAPOOnOuterClick}></div>
            </div>
        )
    }

}

/**
 * Auto dispatch Actions 
 */
const mapActionToProps = {
    apoSearchClose: apoSearchCloseAction,
    searchForFigures: searchForFiguresAction,
    selectedFigure: selectedFigureAction,
    apoSearchSave: apoSearchSaveAction,
    removeAssetLink: removeAssetLinkAction,
    assetIdForSnapshot: assetIdForSnapshot
}

/**
 * Get State as a props here in this component
 */
const mapStateToProps = (state, props) => {
    const { figures,videos, audios, interactives, asides, showApoCurrentlyLinked, showApoBody, showApoFooter, selectedFigureValue, noSearchResultFound, figureIsSelected, apoObject, searchTerm, figureDetails, timeByAPI, currentlyLinkedImageData } = state.assetPopOverSearch;
    return {
        figures,
        videos,
        audios,
        interactives,
        asides,
        showApoCurrentlyLinked,
        showApoBody,
        showApoFooter,
        selectedFigureValue,
        noSearchResultFound,
        figureIsSelected,
        apoObject,
        searchTerm,
        figureDetails,
        timeByAPI,
        currentlyLinkedImageData
    }
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(AssetPopoverSearch)
