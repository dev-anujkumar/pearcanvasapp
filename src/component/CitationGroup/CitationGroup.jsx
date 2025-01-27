import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from '../../config/config';
import { CitationGroupContext } from '../ElementContainer/ElementCitationContext'
import ElementContainer from '../ElementContainer';
import CGTinyMCE from './CGTinyMCE.jsx'
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import Sortable from 'react-sortablejs';
import './../../styles/CitationGroup/CitationGroup.css';
import { guid, hasReviewerRole, sendDataToIframe } from '../../constants/utility.js';
import ElementSaprator from '../ElementSaprator';
import { createPopupUnit } from '../CanvasWrapper/CanvasWrapper_Actions';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { CITATION_SOURCE } from '../../constants/Element_Constants.js';
import LazyLoad from "react-lazyload";
import { LargeLoader } from '../SlateWrapper/ContentLoader.jsx'

let random = guid();
export class CitationGroup extends Component {

    /**
     * Renders blank container with one element picker (Separator)
     * @param {object} _context Context data of CG container
     * @param {object} parentUrn Immediate parent data (CG container)
     * @param {object} asideData parent data (CG container)
     * @param {Number} parentIndex Container index
     */
    renderBlankContainer = (_context, parentUrn, asideData, parentIndex) => {
        let index = 0
        return (
            <>
                <ElementSaprator
                    index={index}
                    firstOne={true}
                    esProps={_context.elementSeparatorProps(index, true, parentUrn, asideData, parentIndex)}
                    elementType="citations"
                    sectionBreak={true}
                    parentUrn={parentUrn}
                    asideData={asideData}
                    permissions={_context.permissions}
                    onClickCapture={_context.onClickCapture}
                    userRole={this.props.userRole}
                    pasteElement={this.props.pasteElement}
                    source={CITATION_SOURCE}
                />
            </>
        )
    }

    /**
     * Renders Citation elements
     * @param {object} _slateBodyMatter - Bodymatter containing an array of citation elements
     * @param {object} parentUrn - Data about container element
     * @param {string} parentIndex - Index of parent container element
     */
    renderElement = (_elements, parentUrn, parentIndex) => {
        const { id, type, contentUrn } = this.context?.parentElement || {};
        let asideData = {
            type: "citations",
            id: this.context.element.id,
            contentUrn: this.context.element.contentUrn,
            element : this.context.element,
            index: this.context.index
        };
        asideData = (type === "showhide") ? {...asideData, parent: { id, type, contentUrn, showHideType: this.context?.showHideType }} : asideData;
        try {
            if (_elements !== null && _elements !== undefined) {
                if (_elements.length === 0) {
                    return this.renderBlankContainer(this.context, parentUrn, asideData, parentIndex)
                }
                return _elements.map((element, index) => {
                        return (
                           <React.Fragment key={element.id}>
                                <LazyLoad
                                    once={true}
                                    placeholder={<div data-id={element.id}><LargeLoader /></div>}
                                >
                               { index==0 && <ElementSaprator
                                        index={index}
                                        firstOne={index === 0}
                                        esProps={this.context.elementSeparatorProps(index, true, parentUrn, asideData, parentIndex)}
                                        elementType="citations"
                                        sectionBreak={true}
                                        parentUrn={parentUrn}
                                        asideData={asideData}
                                        permissions={this.context.permissions}
                                        onClickCapture={this.context.onClickCapture}
                                        userRole={this.props.userRole}
                                        pasteElement={this.props.pasteElement}
                                        source={CITATION_SOURCE}
                                    />}
                                <ElementContainer
                                    element={element}
                                    index={`${parentIndex}-${index+1}`}
                                    parentUrn={parentUrn}
                                    showBlocker={this.context.showBlocker}
                                    permissions={this.context.permissions}
                                    handleCommentspanel={this.context.handleCommentspanel}
                                    isBlockerActive={this.context.isBlockerActive}
                                    onClickCapture={this.context.onClickCapture}
                                    parentElement = {this.context.element}
                                    userRole={this.props.userRole}
                                    asideData={asideData}
                                    handleUndoOption = {this.props.handleUndoOption}
                                    closeUndoTimer = {this.props.closeUndoTimer}
                                >
                                </ElementContainer>
                                {
                                    <ElementSaprator
                                        index={index}
                                        esProps={this.context.elementSeparatorProps(index, false, parentUrn, asideData, parentIndex)}
                                        elementType="citations"
                                        sectionBreak={true}
                                        parentUrn={parentUrn}
                                        asideData={asideData}
                                        permissions={this.context.permissions}
                                        onClickCapture={this.context.onClickCapture}
                                        userRole={this.props.userRole}
                                        pasteElement={this.props.pasteElement}
                                        source={CITATION_SOURCE}
                                        dataId = {element.id}
                                    />
                                }
                              </LazyLoad>
                            </React.Fragment>

                        )
                   // }


                })
            }
            else {
                // handle error
            }
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    /**
     * Prepares data of elements to be swapped
     * @param {object} event - event object
     * @param {object} parentUrn - contains data about parent container
     */
    prepareSwapData = (event, parentUrn) => {
        let swappedElementData;
        let bodyMatterObj = [];
        bodyMatterObj = this.context.element.contents.bodymatter || [];
        swappedElementData = bodyMatterObj[event.oldDraggableIndex]
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: 'cg',
            elementIndex: this.context?.index,
            parentElement: { type: this.context?.parentElement?.type, showHideType: this.context?.showHideType }
        }
        return dataObj
    }

    /**
     * Renders a container containing Citation elements
     * @param {object} context - component's context object (destructured)
     */
    renderCitationElementContainer = ({ element: _containerData }) => {
        try {
            if (_containerData !== null && _containerData !== undefined) {
                if (Object.values(_containerData).length > 0) {
                    let { id: _containerId, type: _containerType, contents: _contents } = _containerData
                    let { bodymatter: _bodyMatter } = _contents
                    let { index } = this.context
                    let parentUrn = {
                        manifestUrn: _containerId,
                        contentUrn: _containerData.contentUrn,
                        elementType: _containerType
                    }
                    const cgThis = this
                    this['cloneCOSlateControlledSource_3' + random] = this.renderElement(_bodyMatter, parentUrn, index)
                    return (
                        <div className="container-citation" data-id={_containerId} container-type={_containerType}>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
                                    disabled: hasReviewerRole(),
                                    //preventOnFilter: true, // Call event.preventDefault() when triggered filter
                                    animation: 150,  // ms, animation speed moving items when sorting, 0 — without animation
                                    dragoverBubble: false,
                                    removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
                                    fallbackTolerance: 0, // Specify in pixels how far the mouse should move before it's considered as a drag.
                                    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
                                    scrollSpeed: 10,
                                    handle: '.element-label', //Drag only by element tag name button
                                    dataIdAttr: 'data-id',
                                    scroll: true, // or HTMLElement
                                    filter: ".ignore-for-drag",
                                    preventOnFilter: false,
                                    draggable: ".lazyload-wrapper",
                                    forceFallback: true,
                                    onStart: function (/**Event*/evt) {
                                        // same properties as onEnd
                                      cgThis.context.onClickCapture(evt)
                                    },

                                    // Element dragging ended
                                    onUpdate: (/**Event*/evt) => {
                                        if (config.savingInProgress) {
                                            evt.preventDefault()
                                            evt.stopPropagation()
                                            return false
                                        }
                                        let dataObj = this.prepareSwapData(evt, parentUrn)
                                        cgThis.props.swapElement(dataObj, () => { })
                                        cgThis.context.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                        config.citationFlag= false;
                                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                    },
                                }}
                                ref={(c) => {
                                }}
                                tag="div"
                                onChange={function (items, sortable, evt) { }}
                            >
                                {this['cloneCOSlateControlledSource_3' + random]}
                            </Sortable>
                        </div>
                    )
                }
            }
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    /**
     * Renders a container containing Citation Group contents
     * @param {object} context - component's context object
     */
    renderCitationGroupContainer = (context) => {
        const {id, type, contentUrn} = context?.parentElement || {};
        let asideData = (type === "showhide") ? { parent: { id, type, contentUrn, showHideType: context?.showHideType }} : {};
        return (
            <>
                <header>
                    <CGTinyMCE createPopupUnit = {this.props.createPopupUnit} citationAsideData = {asideData} parentElement = {this.context.element} />
                </header>
                <div >
                    {this.renderCitationElementContainer(context)}
                </div>
            </>
        )
    }
    handleFocus = (event) => {
        if(event && event.target && !(event.target.classList.contains('citationTitle'))){
            return false
        }
        this.context.handleFocus("", "", event)
    }

    render() {
        const { context } = this
        return (
            <div className = "citation citation-group-container" onMouseUp={this.handleFocus}>
                {this.renderCitationGroupContainer(context)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    swapElement,
    createPopupUnit
}

CitationGroup.contextType = CitationGroupContext;
CitationGroup.displayName = "CitationGroup";
export default connect(mapStateToProps, mapDispatchToProps)(CitationGroup)
