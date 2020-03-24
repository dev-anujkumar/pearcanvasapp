import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CitationGroupContext } from '../ElementContainer/ElementCitationContext'
import ElementContainer from '../ElementContainer';
import CGTinyMCE from './CGTinyMCE.jsx'
import { guid } from '../../constants/utility.js';

let random = guid();

export class CitationGroup extends Component {

    renderElement = (_slateBodyMatter, parentUrn, parentIndex) => {
        try {
            if (_elements !== null && _elements !== undefined) {
                // this.renderButtonsonCondition(_elements);
                return _elements.map((element, index) => {
                        return (
                           <React.Fragment key={element.id}>
                                <ElementContainer
                                    element={element}
                                    index={`${parentIndex}-${index}`}
                                    parentUrn={parentUrn}
                                    showBlocker={this.context.showBlocker}
                                    permissions={this.context.permissions}
                                    handleCommentspanel={this.context.handleCommentspanel}
                                    isBlockerActive={this.context.isBlockerActive}
                                    onClickCapture={this.context.onClickCapture}
                                    parentElement = {this.context.element}
                                >
                                    {/* PAGE NUMBER FUNCTIONALITY. REMOVE THIS IF YOU WANT IT IN A DIFFERENT WAY
                                     {
                                        (isHovered, isPageNumberEnabled, activeElement, permissions) => (
                                            <PageNumberElement pageLoading={pageLoading}
                                                updatePageNumber={updatePageNumber}
                                                element={element} _slateType={_slateType}
                                                isHovered={isHovered}
                                                isPageNumberEnabled={isPageNumberEnabled}
                                                activeElement={activeElement}
                                                permissions={permissions} />
                                        )
                                    } */}
                                </ElementContainer>
                                {/* {
                                    <ElementSaprator
                                        index={index}
                                        esProps={this.context.elementSeparatorProps(index, false, parentUrn, null, parentIndex)}
                                        elementType=""
                                        // slateType={_slateType}
                                        toggleSplitSlatePopup={this.toggleSplitSlatePopup}
                                        permissions={this.props.permissions}
                                        showAudioSplitPopup={this.props.showAudioSplitPopup}
                                        openAudio={this.props.openAudio}
                                        onClickCapture={this.checkSlateLockStatus}
                                    />
                                } */}
                              
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
            //console.error(error);
        }
    }
    
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
                    /* let filterElement = _bodyMatter.filter((ele) => ele.type == "manifest");
                    let elementLength = _bodyMatter.length - filterElement.length;
                     if(!_bodyMatter.length && this.props.deleteElement){
                        this.props.deleteElement();
                    } */
                    this['cloneCOSlateControlledSource_3' + random] = this.renderElement(_bodyMatter, parentUrn, index)
                    return (
                        <div className="container-aside" data-id={_containerId} container-type={_containerType}>
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
                                    onStart: function (/**Event*/evt) {
                                        // same properties as onEnd
                                        _context.checkSlateLockStatus(evt)
                                    },

                                    // Element dragging ended
                                    onUpdate: (/**Event*/evt) => {
                                        if (this.checkOpener(evt) || config.savingInProgress) {
                                            evt.preventDefault()
                                            evt.stopPropagation()
                                            return false
                                        }
                                        let dataObj = this.prepareSwapData(evt)
                                        this.props.swapElement(dataObj, () => { })
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
                                        //let sortable = c.sortable;
                                    }
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
        }
    }
    
    renderCitationGroupContainer = (context) => {
        return (
            <>
                <header>
                    <CGTinyMCE />
                </header>
                <div >
                    {this.renderCitationElementContainer(context)}
                </div>
            </>
        )
    }
    
    render() {
        const { context } = this
        return (
            <div className = "citation citation-group-container" onClick={(e)=>this.context.handleFocus("","",e)}>
                {this.renderCitationGroupContainer(context)}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

CitationGroup.contextType = CitationGroupContext;
CitationGroup.displayName = "CitationGroup";
export default connect(mapStateToProps, mapDispatchToProps)(CitationGroup)
