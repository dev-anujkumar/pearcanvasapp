import React, { useRef, useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import ElementSaprator from '../ElementSaprator';
import ElementContainer from '../ElementContainer';


export const Tabbed2Column = (props) => {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
        }
    );

    const renderTabbedElement = (element) => {
        if (element?.groupeddata?.bodymatter.length) {
            let parentUrn = {
                type: 'tabbed-element',
                manifestUrn: element.id,
                contentUrn: element.contentUrn,
                tbId: element.id, /* Will be used in tcm snapshot -2c->we */
            }
            let asideData = {
                parentElementtype: 'tabbed-element',
                parentManifestUrn: element.id,
                parentContentUrn: element.contentUrn,
            }
            return renderTabElement(element, element?.groupeddata?.bodymatter, parentUrn, asideData, props.index);
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
                        let element = {...tabElement.groupdata.bodymatter[0], parentUrn: parentUrn};
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

    }
}

export default connect(mapStateToProps, mapActionsToProps)(Tabbed2Column);