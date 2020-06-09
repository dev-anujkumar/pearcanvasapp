import React, { PureComponent } from 'react'
import constants from "./constants.js"
import { guid } from '../../constants/utility.js'
import ElementSaprator from '../ElementSaprator'
import Sortable from 'react-sortablejs'
import { sendDataToIframe } from '../../constants/utility.js'
import { ShowLoader } from '../../constants/IFrameMessageTypes.js'
import ElementContainer from '../ElementContainer'
import MultiColumnContainerContext from '../ElementContainer/MultiColumnContext.js'
import './../../styles/MultiColumn/style.css'

let random = guid();

class MultiColumnContainer extends PureComponent {

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
                return _elements.map((element, index) => {
                    return (
                        <React.Fragment key={element.id}>
                            {
                            index == 0 && <ElementSaprator
                                    index={index}
                                    firstOne={index === 0}
                                    esProps={this.context.elementSeparatorProps(index, true, parentUrn, asideData, parentIndex)}
                                    elementType="group"
                                    sectionBreak={true}
                                    permissions={this.context.permissions}
                                    onClickCapture={this.context.onClickCapture}
                                />
                            }
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
                            />
                            <ElementSaprator
                                index={index}
                                esProps={this.context.elementSeparatorProps(index, false, parentUrn, asideData, parentIndex)}
                                elementType="group"
                                sectionBreak={true}
                                permissions={this.context.permissions}
                                onClickCapture={this.context.onClickCapture}                                       
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
        bodyMatterObj = this.context.element.contents.bodymatter || [];
        swappedElementData = bodyMatterObj[event.oldDraggableIndex]
        let dataObj = {
            oldIndex: event.oldDraggableIndex,
            newIndex: event.newDraggableIndex,
            swappedElementData: swappedElementData,
            currentSlateEntityUrn: parentUrn.contentUrn,
            containerTypeElem: '2C',
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
            let index = columnIndex
            let parentUrn = {
                manifestUrn: _containerId,
                contentUrn: group.contentUrn,
                elementType: _containerType
            }
            this['cloneCOSlateControlledSource_4' + random] = this.renderElement(_bodyMatter, parentUrn, index)
            return (
                <div className={`container-multi-column-group column-${index}`} data-id={_containerId} container-type={_containerType}>
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
                                // this.props.swapElement(dataObj, () => { })
                                // this.context.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                // sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } }); 
                            },
                        }}  
                        tag="div"
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
                <React.Fragment key={index}>
                    { this.renderGroup(group, index) }
                </React.Fragment>
            )
        })
        
    }
    
    render() {
        const { context } = this

        return (
            <div className = "multi-column-container">
                { this.renderContainer(context) }
            </div>
        )
    }
}

MultiColumnContainer.contextType = MultiColumnContainerContext;
MultiColumnContainer.displayName = "MultiColumnContainer";
export default MultiColumnContainer
