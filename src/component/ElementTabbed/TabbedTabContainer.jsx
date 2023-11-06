import React, { useReducer } from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import config from "../../config/config.js";
import ElementSaprator from '../ElementSaprator';
import ElementContainer from '../ElementContainer';
import TabbedTinyMCE from './TabbedTinyMce.jsx';
import constants from "./constants.js";
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions';
import { checkHTMLdataInsideString } from '../../constants/utility';
import { tabTitlePlaceholder } from '../../constants/Element_Constants'

let tabbedTabElements = {}
export const TabbedTabContainer = (props) => {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
        }
    );

    const renderTabElement = (tab) => {
        tabbedTabElements[tab.contentUrn] = tab
        let tabElementData = tab?.groupdata?.bodymatter[0];
        let groupedDataBodymatter = tabElementData?.groupeddata && tabElementData?.groupeddata?.bodymatter || [];
        let highlightTab = false;
        for (let element of props.multipleColumnData) {
            if (element.containerId === tabElementData.id && element.columnIndex === 'Ttl') {
                highlightTab = true;
            }
        }
        if (highlightTab) {
            return (
                <React.Fragment>
                    <div className='tabTitleContainer'>
                        <div className="floating-title-group">
                            <TabbedTinyMCE {...props} />
                            <label className={checkTabTitle(props) ? "transition-none" : "floating-title"}>{tabTitlePlaceholder}</label>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return groupedDataBodymatter?.map((columnData, index) => {
                return (
                    <React.Fragment key={columnData.id}>
                        {renderColumnContent(tab, columnData, index)}
                    </React.Fragment>
                )
            })
        }
    }

    const checkTabTitle = (props) => {
        if (props.element?.hasOwnProperty('html') && props.element["html"].title) {
            return checkHTMLdataInsideString(props?.element?.html?.title)
        }
    }

    /**
     * Prepares data of elements to be swapped
     * @param {object} event - event object
     * @param {object} parentUrn - contains data about parent container
     */
    const prepareSwapData = (event, parentUrn) => {
        let bodyMatterObj = tabbedTabElements[props?.element?.contentUrn]?.groupdata.bodymatter[0].groupeddata.bodymatter[parentUrn.columnIndex].groupdata.bodymatter || [];
        let swappedElementData = bodyMatterObj[event.oldDraggableIndex];
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: `${props.labelText}`,
            columnIndex: parentUrn.columnIndex,
            containerIndex: props.index
        }
        return dataObj
    }

    const renderColumnContent = (tab, column, columnIndex) => {
        try {
            let { id: _columnId, type: _columnType, groupdata: _groupdata } = column
            let { bodymatter: _bodyMatter } = _groupdata
            let index = `${props.index}-${columnIndex}`
            let parentUrn = {
                columnName: `C${columnIndex + 1}`,
                columnIndex: columnIndex,
                manifestUrn: _columnId,
                contentUrn: column.contentUrn,
                elementType: _columnType,
                tbId: props?.parentElement?.id /* Will be used in tcm snapshot -TB->Tab */
            }
            return (
                <div className={`container-multi-column-group-3c ${constants.setClassByElementType(column)} column-${columnIndex}`} data-id={_columnId} container-type={_columnType}>
                    <Sortable
                        options={{
                            ...constants.sortableOptions,
                            disabled: hasReviewerRole(),
                            onStart: (evt) => {
                                props.onClickCapture(evt)
                            },

                            // Element dragging ended
                            onUpdate: (evt) => {
                                if (config.savingInProgress) {
                                    evt.preventDefault()
                                    evt.stopPropagation()
                                    return false
                                }
                                let dataObj = prepareSwapData(evt, parentUrn)
                                props.swapElement(dataObj, () => { })
                                props.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
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
                        {renderElement(tab, _bodyMatter, parentUrn, index)}
                    </Sortable>
                </div>
            )
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    /**
 * Render elements in a column group
 * @param {Array} _elements - Array of elements in the group
 * @param {object} parentUrn - object containing immediate parent information
 * @param {Number} parentIndex - Index of column
 */
    const renderElement = (tab, _elements, parentUrn, parentIndex) => {
        let columnIndex;
        for (let element of props.multipleColumnData) {
            if (element.containerId === tab?.groupdata?.bodymatter[0].id) {
                columnIndex = element.columnIndex;
            }
        }
        if (!columnIndex && parentUrn.columnName === "C1") {
            columnIndex = parentUrn.columnName;
        }

        let asideData = {
            type: "groupedcontent",
            subtype: "tab",
            id: props.parentElement.id,
            contentUrn: props.parentElement.contentUrn,
            columnElement: props.element,
            columnName: columnIndex,
            index: parentIndex,
            parent: props.parentElement
        };
        try {
            if (_elements !== null && _elements !== undefined && parentUrn.columnName === columnIndex) {
                if (_elements.length === 0) {
                    return renderBlankContainer(props, parentUrn, asideData, parentIndex)
                }
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                                index == 0 && <ElementSaprator
                                    index={index}
                                    firstOne={index === 0}
                                    esProps={props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                                    elementType="group"
                                    sectionBreak={false}
                                    permissions={props.permissions}
                                    onClickCapture={props.onClickCapture}
                                    asideData={asideData}
                                    parentUrn={parentUrn}
                                    parentIndex={parentIndex}
                                    splithandlerfunction={props.splithandlerfunction}
                                    userRole={props.userRole}
                                    pasteElement={props.pasteElement}
                                    handleCopyPastePopup={props.handleCopyPastePopup}
                                />
                            }
                            <ElementContainer
                                element={element}
                                index={`${parentIndex}-${index}`}
                                asideData={asideData}
                                parentUrn={parentUrn}
                                showBlocker={props.showBlocker}
                                permissions={props.permissions}
                                handleCommentspanel={props.handleCommentspanel}
                                isBlockerActive={props.isBlockerActive}
                                onClickCapture={props.onClickCapture}
                                parentElement={props.parentElement}
                                onListSelect={props.onListSelect}
                                userRole={props.userRole}
                                elementSepratorProps={props.elementSepratorProps}
                                splithandlerfunction={props.splithandlerfunction}
                                pasteElement={props.pasteElement}
                                handleUndoOption={props.handleUndoOption}
                                closeUndoTimer={props.closeUndoTimer}
                            />
                            <ElementSaprator
                                index={index}
                                esProps={props.elementSepratorProps(index, false, parentUrn, asideData, parentIndex)}
                                elementType="group"
                                sectionBreak={false}
                                permissions={props.permissions}
                                onClickCapture={props.onClickCapture}
                                asideData={asideData}
                                parentUrn={parentUrn}
                                parentIndex={parentIndex}
                                splithandlerfunction={props.splithandlerfunction}
                                userRole={props.userRole}
                                pasteElement={props.pasteElement}
                                handleCopyPastePopup={props.handleCopyPastePopup}
                                dataId={props.element.id}
                            />
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
 * Renders blank container with an element picker (Separator)
 * @param {object} parentUrn - object containing immediate parent information
 * @param {object} asideData - object containing Multicolumn container information
 * @param {Number} parentIndex - Index of column
 */
    const renderBlankContainer = (props, parentUrn, asideData, parentIndex) => {
        let index = 0
        return (
            <ElementSaprator
                index={index}
                firstOne={true}
                esProps={props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                elementType="group"
                sectionBreak={false}
                permissions={props.permissions}
                onClickCapture={props.onClickCapture}
                asideData={asideData}
                parentUrn={parentUrn}
                parentIndex={parentIndex}
                splithandlerfunction={props.splithandlerfunction}
                userRole={props.userRole}
                pasteElement={props.pasteElement}
                handleCopyPastePopup={props.handleCopyPastePopup}
            />
        )
    }


    return (
        <>
            {renderTabElement(props.element)}
        </>
    );
}

const mapStateToProps = state => ({
    multipleColumnData: state.appStore.multipleColumnData
})

const mapActionsToProps = (dispatch) => {
    return {
        swapElement: (dataObj, cb) => {
            dispatch(swapElement(dataObj, cb))
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(TabbedTabContainer);
