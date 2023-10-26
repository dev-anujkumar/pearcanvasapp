import React, { useRef, useEffect, useState, useReducer } from 'react';
import Sortable from 'react-sortablejs';
import { connect } from 'react-redux';
import config from "../../config/config.js";
import ElementSaprator from '../ElementSaprator';
import ElementContainer from '../ElementContainer';
import constants from "./constants.js";
import { sendDataToIframe, hasReviewerRole } from '../../constants/utility.js';
import { ShowLoader } from '../../constants/IFrameMessageTypes.js';
import { swapElement } from '../SlateWrapper/SlateWrapper_Actions';
import { TABBED_SOURCE } from '../../constants/Element_Constants'

let tab2Element = {}
export const Tabbed2Column = (props) => {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
        }
    );

    /**
     * Prepares data of elements to be swapped
     * @param {object} event - event object
     * @param {object} parentUrn - contains data about parent container
     */
    const prepareSwapData = (event, parentUrn) => {
        let bodyMatterObj = tab2Element[props?.element?.contentUrn].groupeddata.bodymatter || [];
        let swappedElementData = bodyMatterObj[event.oldDraggableIndex];
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: `${props.labelText}`,
            containerIndex: props.index
        }
        return dataObj
    }

    const renderTabbedElement = (element) => {
        tab2Element[element.contentUrn] = element
        if (element?.groupeddata?.bodymatter.length) {
            let parentUrn = {
                type: 'groupedcontent',
                subtype: 'tab',
                manifestUrn: element.id,
                contentUrn: element.contentUrn,
                tbId: element.id, /* Will be used in tcm snapshot -2c->we */
            }
            let asideData = {
                parentElementType: 'groupedcontent',
                parentElementSubtype: 'tab',
                parentManifestUrn: element.id,
                parentContentUrn: element.contentUrn,
                parentElement: element
            }
            return (
                <div>
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
                                let dataObj = prepareSwapData(evt, parentUrn);
                                props.swapElement(dataObj, () => { });
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
                        {renderTabElement(element, element?.groupeddata?.bodymatter, parentUrn, asideData, props.index)}
                    </Sortable> 
                </div>
            )
        } else {
            return null;
        }
    }

    const renderTabElement = (tbElement, tabElements, parentUrn, asideData, parentIndex) => {
        try {
            if (tabElements !== null && tabElements !== undefined) {
                return tabElements.map((tabElement, index) => {
                    if (tabElement?.groupdata?.bodymatter) {
                        parentUrn = {...parentUrn, tabEntity: tabElement.contentUrn, tabManifest: tabElement.id}
                        let element = {...tabElement, parentUrn: parentUrn};
                        return (
                            <React.Fragment key={tabElement.id}>
                                {
                                    index == 0 && <ElementSaprator
                                        index={index}
                                        firstOne={index === 0}
                                        esProps={props.elementSepratorProps(index, true, parentUrn, asideData, parentIndex)}
                                        elementType="group"
                                        subtype= {tbElement.subtype}
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
                                        source={TABBED_SOURCE}
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
                                    parentElement={props.element}
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
                                    subtype= {tbElement.subtype}
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
                                    source={TABBED_SOURCE}
                                />
                            </React.Fragment>
                        )
                    } else return null
                })
            }
        } catch (error) {
            // handle error
            console.error(error)
        }
    }

    return (
        <>
            <div className='tb container'>
                {renderTabbedElement(props.element)}
            </div>
        </>
    );
}

const mapStateToProps = state => ({

})

const mapActionsToProps = (dispatch) => {
    return {
        swapElement: (dataObj, cb) => {
            dispatch(swapElement(dataObj, cb))
        }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(Tabbed2Column);
