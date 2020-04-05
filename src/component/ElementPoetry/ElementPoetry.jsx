import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ElementPoetryStanza from "./ElementPoetryStanza.jsx";
import ElementContainerWrapper from "../HOCs/ElementContainerHOC";
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions';
import Sortable from 'react-sortablejs';
import { guid } from '../../constants/utility.js';
import config from '../../config/config';
let random = guid();
class ElementPoetry extends Component {
    constructor() {
      super();
    }

    renderStanzaContainer = (props) => {
        let context = this;
        return (
            <React.Fragment>
                {context.renderConatiner(props.model.contents)}
                {/* <div className={designtype + "BorderBottom"} /> */}
            </React.Fragment>
        )
    }

    renderConatiner = (_containerData) =>{
        try {
            if (_containerData !== null && _containerData !== undefined) {
                if (Object.values(_containerData).length > 0) {
                    //let { id: _containerId, type: _containerType, contents: _contents, elementdata: _elementData } = _containerData;
                    let { bodymatter: _bodyMatter } = _containerData;
                    let { index } = this.props

                    //let filterElement = _bodyMatter.filter((ele) => ele.type == "manifest");
                    //let elementLength = _bodyMatter.length - filterElement.length;
                    if(!_bodyMatter.length && this.props.deleteElement){
                        this.props.deleteElement();
                    }
                    this['cloneCOSlateControlledSource_2' + random] = this.renderStanzas(_bodyMatter, index)
                    return (
                        <div>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
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
                                    draggable: ".editor",
                                    forceFallback: true,
                                    onStart: function (/**Event*/) {
                                        // same properties as onEnd
                                    },
                                    // Element dragging ended
                                    onUpdate: (/**Event*/evt) => {
                                        let swappedElementData;
                                        let bodyMatterObj = [];
                                        if(this.props.element.contents){
                                            bodyMatterObj = this.props.element.contents.bodymatter;
                                        }
                                        else{
                                            bodyMatterObj = this.props.element.elementdata.bodymatter;
                                        }
                                        swappedElementData = bodyMatterObj[evt.oldDraggableIndex]
                                        let dataObj = {
                                            oldIndex: evt.oldDraggableIndex,
                                            newIndex: evt.newDraggableIndex,
                                            swappedElementData: swappedElementData,
                                            currentSlateEntityUrn: parentUrn.contentUrn,
                                            containerTypeElem: 'pe',
                                        }
                                        this.props.swapElement(dataObj, (bodyObj) => { })
                                        this.props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                        sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } });
                                        // let showHideNode = document.querySelector('.show-hide-active')
                                        // if(showHideNode){
                                        //     showHideNode.classList.remove("show-hide-active")
                                        // }
                                    },
                                }}
                                ref={(c) => {
                                    if (c) {
                                        //let sortable = c.sortable;
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


    // renderStanzas = (stanzas) =>{
    //     const { className, model,openGlossaryFootnotePopUp, slateLockInfo,openAssetPopoverPopUp,glossaryFootnoteValue} = this.props
    //         return (
    //            <ElementPoetryStanza
    //              openAssetPopoverPopUp ={openAssetPopoverPopUp}
    //              openGlossaryFootnotePopUp={openGlossaryFootnotePopUp}
    //              index={this.props.index}
    //              elementId={this.props.elementId}
    //              element={this.props.element}
    //              className={className}
    //              model={model}
    //              tagName={this.props.tagName}
    //              handleEditorFocus={this.props.handleFocus}
    //              handleBlur = {this.props.handleBlur}
    //              slateLockInfo={slateLockInfo}
    //              onListSelect={this.props.onListSelect}
    //              permissions={this.props.permissions}
    //              glossaryFootnoteValue={glossaryFootnoteValue}
    //              glossaaryFootnotePopup={this.props.glossaaryFootnotePopup}
    //            />
    //        )
    // }

    renderStanzas = (stanzas, parentIndex) => {
        let poetryData = {
            type: "poetry",
            parentUrn: this.props.elementId,
            id: this.props.elementId
        };
        try {
            if (stanzas !== undefined) {
                    return stanzas.map((element, index) => {
                            return (
                                <React.Fragment key={element.id}>                                   
                                    {index === 0 && <ElementSaprator
                                        index={index}
                                        esProps={this.props.elementSepratorProps(index, false, this.props.parentUrn, "", parentIndex, poetryData)}
                                        elementType="poetry"
                                        sectionBreak= {false}
                                        permissions={this.props.permissions}
                                        onClickCapture={this.props.onClickCapture}
                                    />}
                                    <ElementContainer
                                        element={element}
                                        index={`${parentIndex}-3-${index}`}
                                        parentUrn={poetryData.parentUrn}
                                        showBlocker={this.props.showBlocker}
                                        poetryData={poetryData}
                                        permissions={this.props.permissions}
                                        handleCommentspanel={this.props.handleCommentspanel}
                                        isBlockerActive={this.props.isBlockerActive}
                                        onClickCapture={this.props.onClickCapture}
                                        parentElement = {this.props.element}
                                        onListSelect={this.props.onListSelect}
                                       // createPoetryElements={this.createPoetryElements}
                                    >
                                        {/* {
                                            (isHovered, isPageNumberEnabled, activeElement) => (
                                                <PageNumberElement
                                                    updatePageNumber={this.props.updatePageNumber}
                                                    poetryData={poetryData}
                                                    parentUrn={parentUrn}
                                                    element={element}
                                                    isHovered={isHovered}
                                                    isPageNumberEnabled={isPageNumberEnabled}
                                                    activeElement={activeElement}
                                                    permissions={this.props.permissions} />
                                            )
                                        } */}
                                    </ElementContainer>
                                    <ElementSaprator
                                        index={index}
                                        esProps={this.props.elementSepratorProps(index, false, this.props.parentUrn, "", parentIndex, poetryData)}
                                        elementType="poetry"
                                        sectionBreak= {false}
                                        permissions={this.props.permissions}
                                        onClickCapture={this.props.onClickCapture}
                                    />
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
  
  export default ElementContainerWrapper(ElementPoetry);