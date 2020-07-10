/** Libraries */
import React, { PureComponent } from 'react'
import Sortable from 'react-sortablejs'
import { connect } from 'react-redux'

/** Contants and utitlity functions */
import constants from "./constants.js"
import { guid, sendDataToIframe } from '../../constants/utility.js'
import config from "../../config/config.js"
import { ShowLoader } from '../../constants/IFrameMessageTypes.js'
import MultiColumnContainerContext from '../ElementContainer/MultiColumnContext.js'
import { checkSlateLock } from '../../js/slateLockUtility.js'


/** External Components */
import ElementSaprator from '../ElementSaprator'
import ElementContainer from '../ElementContainer'
import PageNumberElement from '../SlateWrapper/PageNumberElement.jsx';

/** Action Creators */
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'

/** Style/CSS */
import './../../styles/MultiColumn/style.css'

let random = guid();

class MultiColumnContainer extends PureComponent {

    /**
     * Renders blank container with an element picker (Separator)
     * @param {object} _context - React context
     * @param {object} parentUrn - object containing immediate parent information
     * @param {object} asideData - object containing Multicolumn container information
     * @param {Number} parentIndex - Index of column
     */
    renderBlankContainer = (_context, parentUrn, asideData, parentIndex) => {
        let index = 0
        return (
            <>
                <ElementSaprator
                    index={index}
                    firstOne={true}
                    esProps={_context.elementSeparatorProps(index, true, parentUrn, asideData, parentIndex)}
                    elementType="group"
                    sectionBreak={false}
                    permissions={_context.permissions}
                    onClickCapture={_context.onClickCapture}
                    splithandlerfunction={_context.splithandlerfunction}
                />
            </>
        )
    }
    
    /**
     * Render elements in a column group
     * @param {Array} _elements - Array of elements in the group
     * @param {object} parentUrn - object containing immediate parent information
     * @param {Number} parentIndex - Index of column
     */
    renderElement = (_elements, parentUrn, parentIndex) => {
        let asideData = {
            type: "groupedcontent",
            id: this.context.element.id,
            contentUrn: this.context.element.contentUrn,
            element : this.context.element
        };
        try {
            if (_elements !== null && _elements !== undefined) {
                if (_elements.length === 0) {
                    return this.renderBlankContainer(this.context, parentUrn, asideData, parentIndex)
                }
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                            index == 0 && <ElementSaprator
                                    index={index}
                                    firstOne={index === 0}
                                    esProps={this.context.elementSeparatorProps(index, true, parentUrn, asideData, parentIndex)}
                                    elementType="group"
                                    sectionBreak={false}
                                    permissions={this.context.permissions}
                                    onClickCapture={this.context.onClickCapture}
                                    asideData={asideData}
                                    parentUrn={parentUrn}
                                    parentIndex={parentIndex}
                                    splithandlerfunction={this.context.splithandlerfunction}
                                />
                            }
                            <ElementContainer
                                element={element}
                                index={`${parentIndex}-${index}`}
                                asideData={asideData}
                                parentUrn={parentUrn}
                                showBlocker={this.context.showBlocker}
                                permissions={this.context.permissions}
                                handleCommentspanel={this.context.handleCommentspanel}
                                isBlockerActive={this.context.isBlockerActive}
                                onClickCapture={this.context.onClickCapture}
                                parentElement = {this.context.element}
                            >
                                {
                                    (isHovered, isPageNumberEnabled, activeElement, permissions) => (
                                        <PageNumberElement 
                                            updatePageNumber={this.context.updatePageNumber}
                                            asideData={asideData}
                                            parentUrn={parentUrn}
                                            element={element}
                                            isHovered={isHovered}
                                            isPageNumberEnabled={isPageNumberEnabled}
                                            activeElement={activeElement}
                                            permissions={permissions}
                                            asideData={asideData}
                                            parentUrn={parentUrn}
                                            parentIndex={parentIndex}
                                        />
                                    )
                                }
                            </ElementContainer>
                            <ElementSaprator
                                index={index}
                                esProps={this.context.elementSeparatorProps(index, false, parentUrn, asideData, parentIndex)}
                                elementType="group"
                                sectionBreak={false}
                                permissions={this.context.permissions}
                                onClickCapture={this.context.onClickCapture}
                                asideData={asideData}
                                parentUrn={parentUrn}
                                parentIndex={parentIndex}
                                splithandlerfunction={this.context.splithandlerfunction}
                            />  
                        </React.Fragment>
                    )
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
        bodyMatterObj = this.context.element.groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter || [];
        swappedElementData = bodyMatterObj[event.oldDraggableIndex]
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: '2C',
            columnIndex: parentUrn.columnIndex,
            containerIndex: this.context.index
        }
        return dataObj
    }

    /**
     * Renders column group
     * @param {object} group - event object
     * @param {Number} columnIndex - Index of column
     */
    renderGroup = (group, columnIndex) => {
        try {
            let { id: _containerId, type: _containerType, groupdata: _groupdata } = group
            let { bodymatter: _bodyMatter } = _groupdata
            let index = `${this.context.index}-${columnIndex}`
            let parentUrn = {
                columnName: columnIndex === 0 ? "C1" : "C2",
                columnIndex: columnIndex,
                manifestUrn: _containerId,
                contentUrn: group.contentUrn,
                elementType: _containerType
            }
            this['cloneCOSlateControlledSource_4' + random] = this.renderElement(_bodyMatter, parentUrn, index)
            return (
                <div className={`container-multi-column-group ${constants.setClassByElementType(this.context.element)} column-${columnIndex}`} data-id={_containerId} container-type={_containerType}>
                    <Sortable
                        options={{
                            ...constants.sortableOptions,
                            onStart: (evt) => {
                                this.context.onClickCapture(evt)
                            },

                            // Element dragging ended
                            onUpdate: (evt) => {
                                if (config.savingInProgress) {
                                    evt.preventDefault()
                                    evt.stopPropagation()
                                    return false
                                }
                                let dataObj = this.prepareSwapData(evt, parentUrn)
                                this.props.swapElement(dataObj, () => { })
                                this.context.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } }); 
                            },
                        }}  
                        tag="div"
                        ref={(c) => {
                            if (c) {
                                //let sortable = c.sortable;
                            }
                        }}
                        onChange={function (items, sortable, evt) { }}
                    >
                        {this['cloneCOSlateControlledSource_4' + random]}
                    </Sortable>
                </div>
            )
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    /**
     * Renders MultiColumn container
     * @param {object} context - Context (Data about container)
     */
    renderContainer = (context) => {
        const groupedDataBodymatter = context.element && context.element.groupeddata && context.element.groupeddata.bodymatter || []

        return groupedDataBodymatter.map((group, index) => {
            return (
                <React.Fragment key={group.id}>
                    {this.renderGroup(group, index)}
                </React.Fragment>
            )
        })
        
    }

    /**
     * Handles focus
     * @param {Object} event 
     */
    handleFocus = (event) => {
        if(checkSlateLock(this.context.slateLockInfo)){
            return false
        }
        if(event && event.target && !(event.target.classList.contains('container-multi-column-group'))){
            return false
        }
        this.context.handleFocus("", "", event)
    }
    
    render() {
        const { context } = this
        return (
            <div className = "multi-column-container" onMouseUp = {this.handleFocus}>
                {this.renderContainer(context)}
            </div>
        )
    }
}

const mapDispatchToProps = {
    swapElement
}

MultiColumnContainer.contextType = MultiColumnContainerContext;
MultiColumnContainer.displayName = "MultiColumnContainer";
export default connect(null, mapDispatchToProps)(MultiColumnContainer)