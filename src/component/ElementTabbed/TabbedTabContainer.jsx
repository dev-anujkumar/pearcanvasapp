import React, { useRef, useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import ElementSaprator from '../ElementSaprator';
import ElementContainer from '../ElementContainer';
import TabbedTinyMCE from './TabbedTinyMce.jsx';
import constants from "./constants.js";


export const TabbedTabContainer = (props) => {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
        }
    );

    const renderTabElement = (tab) => {
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
                    <TabbedTinyMCE {...props}/>
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
                    {renderElement(tab, _bodyMatter, parentUrn, index)}
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

    }
}

export default connect(mapStateToProps, mapActionsToProps)(TabbedTabContainer);