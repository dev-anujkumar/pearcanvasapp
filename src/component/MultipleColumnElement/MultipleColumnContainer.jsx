/** Libraries */
import React, { PureComponent } from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';

/** Contants and utitlity functions */
import constants from "./constants.js";
import { guid, sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import MultiColumnContainerContext from '../ElementContainer/MultiColumnContext';
import { MULTICOLUMN_SOURCE } from '../../constants/Element_Constants.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import config from "../../config/config.js";

/** External Components */
import ElementSaprator from '../ElementSaprator';
import ElementContainer from '../ElementContainer';

/** Action Creators */
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions'
import LazyLoad from "react-lazyload";
import { LargeLoader } from '../SlateWrapper/ContentLoader.jsx'

let random = guid();

class MultipleColumnContainer extends PureComponent {

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
            <ElementSaprator
                index={index}
                firstOne={true}
                esProps={_context.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                elementType="group"
                sectionBreak={false}
                permissions={_context.permissions}
                onClickCapture={_context.onClickCapture}
                asideData={asideData}
                parentUrn={parentUrn}
                parentIndex={parentIndex}
                splithandlerfunction={_context.splithandlerfunction}
                userRole={this.props.userRole}
                pasteElement={this.props.pasteElement}
                source={MULTICOLUMN_SOURCE}
                handleCopyPastePopup={this.props.handleCopyPastePopup}
            />
        )
    }

    /**
     * Render elements in a column group
     * @param {Array} _elements - Array of elements in the group
     * @param {object} parentUrn - object containing immediate parent information
     * @param {Number} parentIndex - Index of column
     */
     renderElement = (_elements, parentUrn, parentIndex) => {
        let columnIndex;
        for (let element of this.props.multipleColumnData) {
            if (element.containerId === parentUrn.mcId) {
                columnIndex = element.columnIndex;
            }
        }
        if (!columnIndex && parentUrn.columnName === "C1") {
            columnIndex = parentUrn.columnName;
        }

        let asideData = {
            type: "groupedcontent",
            id: this.context.element.id,
            contentUrn: this.context.element.contentUrn,
            element : this.context.element,
            index: parentIndex
        };
        try {
            if (_elements !== null && _elements !== undefined && parentUrn.columnName === columnIndex) {
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
                            { index == 0 && <ElementSaprator
                                    index={index}
                                    firstOne={index === 0}
                                    esProps={this.context.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                                    elementType="group"
                                    sectionBreak={false}
                                    permissions={this.context.permissions}
                                    onClickCapture={this.context.onClickCapture}
                                    asideData={asideData}
                                    parentUrn={parentUrn}
                                    parentIndex={parentIndex}
                                    splithandlerfunction={this.context.splithandlerfunction}
                                    userRole={this.props.userRole}
                                    pasteElement={this.props.pasteElement}
                                    source={MULTICOLUMN_SOURCE}
                                    handleCopyPastePopup={this.props.handleCopyPastePopup}
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
                                onListSelect={this.context.onListSelect}
                                userRole={this.props.userRole}
                                elementSepratorProps={this.context.elementSepratorProps}
                                splithandlerfunction={this.context.splithandlerfunction}
                                pasteElement={this.props.pasteElement}
                                handleUndoOption = {this.props.handleUndoOption}
                                closeUndoTimer = {this.props.closeUndoTimer}
                            />
                            <ElementSaprator
                                index={index}
                                esProps={this.context.elementSepratorProps(index, false, parentUrn, asideData, parentIndex)}
                                elementType="group"
                                sectionBreak={false}
                                permissions={this.context.permissions}
                                onClickCapture={this.context.onClickCapture}
                                asideData={asideData}
                                parentUrn={parentUrn}
                                parentIndex={parentIndex}
                                splithandlerfunction={this.context.splithandlerfunction}
                                userRole={this.props.userRole}
                                pasteElement={this.props.pasteElement}
                                source={MULTICOLUMN_SOURCE}
                                handleCopyPastePopup={this.props.handleCopyPastePopup}
                                dataId = {element.id}
                            />
                            </LazyLoad>
                        </React.Fragment>
                    )
                })
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
        swappedElementData = bodyMatterObj[event.oldDraggableIndex];
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: `${this.props.labelText}`,
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
                columnName: `C${columnIndex+1}`,
                columnIndex: columnIndex,
                manifestUrn: _containerId,
                contentUrn: group.contentUrn,
                elementType: _containerType,
                mcId: this.context?.element?.id, /* Will be used in tcm snapshot -2c->we */
                multiColumnType: `${this.props.labelText}` /* Will be used in tcm snapshot -2c->we */
            }
            this['cloneCOSlateControlledSource_4' + random] = this.renderElement(_bodyMatter, parentUrn, index)
            return (
                <div className={`container-multi-column-group-3c ${constants.setClassByElementType(this.context.element)} column-${columnIndex}`}
                data-id={_containerId} container-type={_containerType}>
                    <Sortable
                        options={{
                            ...constants.sortableOptions,
                            disabled: hasReviewerRole(),
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
     * Renders MultipleColumn container
     * @param {object} context - Context (Data about container)
     */
     renderContainer = (context) => {
        let groupedDataBodymatter = context.element && context.element.groupeddata && context.element.groupeddata.bodymatter || [];
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
        if(event && event.target && !(event.target.classList.contains('container-multi-column-group-3c'))){
            return false
        }
        this.context.handleFocus("", "", event)
    }

    render() {
        const { context } = this;
        return (
            <div className = "multi-column-container" onMouseUp = {this.handleFocus}>
                {/* Please select a column to start editing */}
                {this.renderContainer(context)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        multipleColumnData: state.appStore.multipleColumnData
    }
};

const mapDispatchToProps = {
    swapElement
}

MultipleColumnContainer.contextType = MultiColumnContainerContext;
MultipleColumnContainer.displayName = "MultipleColumnContainer";
export default connect(mapStateToProps, mapDispatchToProps)(MultipleColumnContainer)
