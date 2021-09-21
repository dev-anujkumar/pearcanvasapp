import React from 'react';
import ElementContainer from '../ElementContainer';
import { fetchLiClassName } from './BlockListHelperFucntions';

const BlockList = (props) => {
    let manifestList = props.manifestList;

    const fetchLi = (subtype) => {
        return manifestList.map((item, index) => {
            return (<li className={fetchLiClassName(subtype)}>
                {renderElement(index)}
            </li>)
        })
    }

    const renderElement = (parentIndex) => {
        return manifestList[parentIndex].listitemdata.bodymatter.map((item, index) => {
            let indexT = item.type === 'manifestlist' ? `${props.indexTemp}${parentIndex}-${index}-` : '';
            return (
                <ElementContainer
                    element={item}
                    index={`${typeof (props.index) === 'number' ? props.index : props.index.split('-')[0]}-${props.indexTemp}${parentIndex}-${index}`}
                    indexTemp={indexT}
                    onlyElement={item.type === 'manifestlist' ? false : true}
                />
                // <ElementAuthoring index={index} element={item} model={item.html} onListSelect={()=>{}} elementId={item.id} {...commonProps}/>
            )
        })

    }

    if (props.element.listtype === 'ordered') {
        return (
            <ol class="decimal">
                {
                    fetchLi(props.element.subtype)
                }
            </ol>
        )
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