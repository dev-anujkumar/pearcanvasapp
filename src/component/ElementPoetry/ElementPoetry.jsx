import React, { Component } from 'react';
import { connect } from 'react-redux';
import ElementContainerWrapper from "../HOCs/ElementContainerHOC";
import ElementContainer from '../ElementContainer';
import ElementSaprator from '../ElementSaprator';
import { sendDataToIframe } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import PageNumberElement from '../SlateWrapper/PageNumberElement.jsx';
import Sortable from 'react-sortablejs';
import { guid } from '../../constants/utility.js';

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
                    if(!_bodyMatter.length && this.props.deleteElement){
                        this.props.deleteElement();
                    }
                    this['cloneCOSlateControlledSource_2' + random] = this.renderStanzas(_bodyMatter, index ,parentUrn)
                    return (
                        <div>
                            <Sortable
                                options={{
                                    sort: true,  // sorting inside list
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
                                            poetryId: this.props.element.id
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
* @description - renderStanzas is a function for rendering the stanza element inside poetry element
* @param {*} stanzas is the array of stanza element
* @param {*} parentIndex is the index of poetry element
* @param {*} parentUrn is the URN of poetry elememt
*/
    renderStanzas = (stanzas, parentIndex, parentUrn) => {
        let poetryData = {
            type: "poetry",
            parentUrn: this.props.elementId,
            id: this.props.elementId,
            contentUrn : this.props.model.contentUrn,
            element : this.props.model           
        };
        try {
            if (stanzas !== undefined) {
                    return stanzas.map((element, index) => {
                            return (
                                <React.Fragment key={element.id}>                                   
                                    {index === 0 && <ElementSaprator
                                        index={index}
                                        esProps={this.props.elementSepratorProps(0, true, parentUrn, "", parentIndex, poetryData)}
                                        elementType="poetry"
                                        poetryData={poetryData}
                                        sectionBreak= {false}
                                        permissions={this.props.permissions}
                                        onClickCapture={this.props.onClickCapture}
                                    />}
                                    <ElementContainer
                                        element={element}
                                        index={`${parentIndex}-3-${index}`}
                                        parentUrn={parentUrn}
                                        showBlocker={this.props.showBlocker}
                                        poetryData={poetryData}
                                        permissions={this.props.permissions}
                                        handleCommentspanel={this.props.handleCommentspanel}
                                        isBlockerActive={this.props.isBlockerActive}
                                        onClickCapture={this.props.onClickCapture}
                                        showDeleteElemPopup={this.props.showDeleteElemPopup}
                                        parentElement = {this.props.element}
                                        onListSelect={this.props.onListSelect}>
                                        {
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
                                        }
                                    </ElementContainer>
                                    <ElementSaprator
                                        index={index}
                                        esProps={this.props.elementSepratorProps(index, false, parentUrn, "", parentIndex, poetryData)}
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