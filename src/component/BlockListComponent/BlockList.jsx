import React from 'react';
import ElementContainer from '../ElementContainer';
import { fetchLiClassName } from './BlockListHelperFunctions';

const BlockList = (props) => {
    let manifestList = props?.manifestList;

    const fetchLi = (subtype) => {
        return manifestList?.map((item, index) => {
            return (<li className={`${fetchLiClassName(subtype)} manifest-list-li`}>
                {renderElement(index)}
            </li>)
        })
    }

    const renderElement = (parentIndex) => {
        return manifestList[parentIndex]?.listitemdata?.bodymatter.map((item, index) => {
            let indexT = item?.type === 'manifestlist' ? `${props?.indexTemp}${parentIndex}-${index}-` : '';
            return (
                <ElementContainer
                    element={item}
                    index={`${typeof (props?.index) === 'number' ? props?.index : props?.index?.split('-')[0]}-${props?.indexTemp}${parentIndex}-${index}`}
                    indexTemp={indexT}
                    onlyElement={item?.type === 'manifestlist' ? false : true}
                    onClickCapture={props?.onClickCapture}
                    showBlocker={props?.showBlocker}
                    borderToggle={props?.borderToggle}
                    onListSelect={props.onListSelect}
                    model={props?.element.html}
                    handleCommentspanel={props?.handleCommentspanel}
                />
            )
        })

    }

    if (props?.element?.listtype === 'ordered') {
        if(props?.element?.startNumber>1){
            return (
                <ol class="decimal" style={{'counterIncrement': `section ${props?.element?.startNumber - 1}`}}>
                    {
                        fetchLi(props?.element?.subtype)
                    }
                </ol>
            )
        }
        else{
            return (
                <ol class="decimal">
                    {
                        fetchLi(props?.element?.subtype)
                    }
                </ol>
            )
        }
       
    }
    else {
        return (
            <ul class="disc">
                {
                    fetchLi("unordered")
                }
            </ul>
        )
    }

}

export default BlockList;