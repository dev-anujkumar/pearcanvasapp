import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElementContainerWrapper from "../HOCs/ElementContainerHOC";
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import ElementConstants from '../ElementContainer/ElementConstants';
import { sendDataToIframe, guid, hasReviewerRole } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import Sortable from 'react-sortablejs';
import { POETRY_SOURCE } from '../../constants/Element_Constants.js';
import LazyLoad from "react-lazyload";
import { LargeLoader } from '../SlateWrapper/ContentLoader.jsx'

let random = guid();

/**
* @description - ElementPoetry is a class based component. It is defined simply
* to make a skeleton of the Poetry container.
*/
class ElementPoetry extends Component {

    renderStanzaContainer = (props) => {
        let context = this;
        return (
            <React.Fragment>
                {context.renderConatiner(props.model.contents)}
            </React.Fragment>
        )
    }

    /**
    * @description - renderConatiner is a function for rendering the container part inside poetry element
    * @param {*} _containerData is the array of stanza element
    */
    renderConatiner = (_containerData) =>{
        try {
            if (_containerData !== null && _containerData !== undefined) {
                if (Object.values(_containerData).length > 0) {
                    let { bodymatter: _bodyMatter } = _containerData;
                    let { index } = this.props
                    let parentUrn = {
                        manifestUrn: this.props.elementId,
                        contentUrn: this.props.model.contentUrn ,
                        elementType: "poetry"
                    }
                    this['cloneCOSlateControlledSource_2' + random] = this.renderStanzas(_bodyMatter, index, parentUrn)
                    return (
                        <div>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
                                    disabled: hasReviewerRole(),
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
                                    onStart: function (/**Event*/) {
                                        // same properties as onEnd
                                    },
                                    // Element dragging ended
                                    onUpdate: (/**Event*/evt) => {
                                        let swappedElementData;
                                        let bodyMatterObj = [];
                                        if(this.props.element && this.props.element.contents){
                                            bodyMatterObj = this.props.element.contents.bodymatter;
                                        }
                                        swappedElementData = bodyMatterObj[evt.oldDraggableIndex]
                                        let dataObj = {
                                            oldIndex: evt.oldDraggableIndex,
                                            newIndex: evt.newDraggableIndex,
                                            swappedElementData: swappedElementData,
                                            currentSlateEntityUrn: parentUrn.contentUrn,
                                            containerTypeElem: 'pe',
                                            poetryId: this.props.element.id,
                                            sectionType: this?.props?.showHideType,
                                            parentElement: this.props?.parentElement,
                                            elementIndex: this.props?.index
                                        }
                                        this.props.swapElement(dataObj, (bodyObj) => { })
                                        this.props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                        let showHideNode = document.querySelector('.show-hide-active')
                                        if(showHideNode){
                                            showHideNode.classList.remove("show-hide-active")
                                        }
                                    },
                                }}
                                ref={(c) => {
                                    if (c) {
                                        // let sortable = c.sortable;
                                    }
                                }}
                                tag="div"
                                onChange={function (items, sortable, evt) { }}
                            >
                                {this['cloneCOSlateControlledSource_2' + random]}
                            </Sortable>
                        </div>
                    )
                }
            }
        } catch (error) {
            console.log("error",error)
        }
    }

    /**
     * Renders blank container with one element picker (Separator)
     * @param {object} _context Poetry container props
     * @param {object} parentUrn Immediate parent data (Poetry container)
     * @param {object} asideData parent data (Poetry container)
     * @param {Number} parentIndex Container index
     */
    renderBlankContainer = (_props, parentUrn, parentIndex, poetryData) => {
        let index = 0
        return (
            <>
                <ElementSaprator
                    index={index}
                    esProps={_props.elementSepratorProps(index, true, parentUrn, "", parentIndex, poetryData)}
                    elementType="poetry"
                    poetryData={poetryData}
                    sectionBreak= {false}
                    permissions={_props.permissions}
                    onClickCapture={_props.onClickCapture}
                    userRole={this.props.userRole}
                    pasteElement={this.props.pasteElement}
                    source={POETRY_SOURCE}
                />
            </>
        )
    }
    
    /**
    * @description - renderStanzas is a function for rendering the stanza element inside poetry element
    * @param {*} stanzas is the array of stanza element
    * @param {*} parentIndex is the index of poetry element
    * @param {*} parentUrn is the URN of poetry elememt
    */
    renderStanzas = (stanzas, parentIndex, parentUrn) => {
        const { id, type, subtype, contentUrn, groupeddata } = this.props?.parentElement || {};
        let poetryData = {
            type: "poetry",
            parentUrn: this.props.elementId,
            id: this.props.elementId,
            contentUrn : this.props.model.contentUrn,
            element : this.props.model,
            index : this.props?.index        
        };
         /* @columnIndex@ */
         const columnIndex = this.props?.index?.toString().split("-").length === 3 ? this.props.index.split("-")[1] : "";
         const columnId = groupeddata?.bodymatter[columnIndex]?.id;
         const parentContentUrn = contentUrn;
         const columnContentUrn = groupeddata?.bodymatter[columnIndex]?.contentUrn;
         const multiColumnType = groupeddata?.bodymatter?.length ? `${groupeddata?.bodymatter?.length}C` : undefined;

        /* Adding parent id and type to update redux store while creating new element inside WE/Aside->Block Poetry->Stanza */
        poetryData = (type === "element-aside") ? {...poetryData, parent: { id, type, contentUrn }} : poetryData;
        
        /* Adding parent id and type to update redux store while creating new element inside 2c->Block Poetry->Stanza */
        poetryData = (type === ElementConstants.MULTI_COLUMN && !subtype) ? {...poetryData, parent: { id, type, columnId, columnName: columnIndex == 0 ? "C1" : columnIndex == 1 ? "C2" : "C3", multiColumnType: multiColumnType, parentContentUrn, columnContentUrn }} : poetryData;
        
        /* Adding parent id , type and showHideType to update redux store while creating new element inside SH->Block Poetry->Stanza */
        poetryData = (type === "showhide") ? { ...poetryData, parent: { id, type, contentUrn, showHideType: this.props?.showHideType } } : poetryData;
        /* Adding parent id and type to update redux store while creating new element inside TB->Tab->Aside->New */
        if (type === ElementConstants.MULTI_COLUMN && subtype === ElementConstants.TAB) {
            let indexes = this.props?.index?.toString()?.split('-') || [];
            let columnDetails = {
                columnIndex: Number(indexes[2]),
                columnId: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.id,
                columnContentUrn: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.contentUrn,
                columnName: Number(indexes[2]) === 0 ? "C1" : "C2"
            }
            poetryData = {...poetryData, parent: {...this.props.parentElement, columnDetails: columnDetails}}
        }
        try {
            if (stanzas !== undefined) {
                if (stanzas.length === 0) {
                    return this.renderBlankContainer(this.props, parentUrn, parentIndex, poetryData)
                }
                return stanzas.map((element, index) => {
                    const elementLineage = {
                        ...this.props.element,
                       grandParent: {
                           asideData: this.props.asideData,
                           parentUrn: this.props.parentUrn,
                           columnContentUrn,
                           parentContentUrn
                       },
                       stanzaIndex : index,
                       showHideType: this.props?.showHideType
                   }
                    return (
                        <React.Fragment key={element.id}>
                            <LazyLoad
                                once={true}
                                placeholder={<div data-id={element.id}><LargeLoader /></div>}
                            >                                  
                            {index === 0 && <ElementSaprator
                                index={index}
                                firstOne={index === 0}
                                esProps={this.props.elementSepratorProps(0, true, parentUrn, elementLineage, parentIndex, poetryData)}
                                elementType="poetry"
                                poetryData={poetryData}
                                parentUrn={parentUrn}
                                asideData={elementLineage}
                                sectionBreak= {false}
                                permissions={this.props.permissions}
                                onClickCapture={this.props.onClickCapture}
                                userRole={this.props.userRole}
                                pasteElement={this.props.pasteElement}
                                source={POETRY_SOURCE}
                            />}
                            <ElementContainer
                                element={element}
                                index={`${parentIndex}-3-${index}`}
                                parentUrn={parentUrn}
                                showBlocker={this.props.showBlocker}
                                poetryData={poetryData}
                                asideData={elementLineage}
                                permissions={this.props.permissions}
                                handleCommentspanel={this.props.handleCommentspanel}
                                isBlockerActive={this.props.isBlockerActive}
                                onClickCapture={this.props.onClickCapture}
                                showDeleteElemPopup={this.props.showDeleteElemPopup}
                                parentElement = {this.props.element}
                                onListSelect={this.props.onListSelect}
                                handleUndoOption = {this.props.handleUndoOption}
                                closeUndoTimer = {this.props.closeUndoTimer}
                                userRole={this.props.userRole}>
                            </ElementContainer>
                            <ElementSaprator
                                index={index}
                                esProps={this.props.elementSepratorProps(index, false, parentUrn, elementLineage, parentIndex, poetryData)}
                                elementType="poetry"
                                poetryData={poetryData}
                                parentUrn={parentUrn}
                                asideData={elementLineage}
                                sectionBreak= {false}
                                permissions={this.props.permissions}
                                onClickCapture={this.props.onClickCapture}
                                userRole={this.props.userRole}
                                pasteElement={this.props.pasteElement}
                                source={POETRY_SOURCE}
                                dataId = {element.id}
                            />
                            </LazyLoad> 
                        </React.Fragment>
                    )

                })

            }

        } catch (error) {
            console.log("error", error)
        }
    }
    
    render() {
        return this.renderStanzaContainer(this.props)
    }
  }

  ElementPoetry.defaultProps = {
    type: "element-poetrystanza"
  }

const mapStateToProps = state => {
    return {
    };
};


export default connect(
    mapStateToProps,
    {
        swapElement
    }
)(ElementContainerWrapper(ElementPoetry));
