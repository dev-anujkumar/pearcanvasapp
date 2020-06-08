import React, { Component } from 'react'
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
class MultiColumnContainer extends Component {

    renderElement = (_elements, parentUrn, parentIndex) => {
        let asideData = {
            type: "multi-column",
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
                            {
                                <ElementSaprator
                                    index={index}
                                    esProps={this.context.elementSeparatorProps(index, false, parentUrn, asideData, parentIndex)}
                                    elementType="group"
                                    sectionBreak={true}
                                    permissions={this.context.permissions}
                                    onClickCapture={this.context.onClickCapture}                                       
                                />
                            }    
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
    
    renderGroup = (group, columnIndex) => {
        // const groupDataBodymatter = group.groupdata.bodymatter || []
        try {
            let { id: _containerId, type: _containerType, groupdata: _groupdata } = group
            let { bodymatter: _bodyMatter } = _groupdata
            let index = columnIndex
            let parentUrn = {
                manifestUrn: _containerId,
                contentUrn: group.contentUrn,
                elementType: _containerType
            }
                /* if(!_bodyMatter.length && this.context.deleteElement && config.citationDefaultElement==false){
                config.citationDefaultElement=true;
                this.context.deleteElement();
            } */
            this['cloneCOSlateControlledSource_4' + random] = this.renderElement(_bodyMatter, parentUrn, index)
            return (
                <div className="container-multi-column-group" data-id={_containerId} container-type={_containerType}>
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
                                cgThis.props.swapElement(dataObj, () => { })
                                cgThis.context.setActiveElement(dataObj.swappedElementData, dataObj.newIndex);
                                sendDataToIframe({ 'type': ShowLoader, 'message': { status: true } }); 
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

    renderContainer = (context) => {
        const groupedDataBodymatter = context.element && context.element.groupeddata && context.element.groupeddata.bodymatter || []

        return groupedDataBodymatter.map((group, index) => {
            return (
                <div className = {`column-${index}`} key = {index}>
                    { this.renderGroup(group, index) }
                </div>
            )
        })
        
    }
    
    render() {
        return (
            <div className = "multi-column-container">
                { this.renderContainer(this.context) }
            </div>
        )
    }
}

MultiColumnContainer.contextType = MultiColumnContainerContext;
MultiColumnContainer.displayName = "MultiColumnContainer";
export default MultiColumnContainer
