import React from 'react';
import ElementContainer from '../ElementContainer';
import { fetchLiClassName } from './BlockListHelperFunctions';

const BlockList = (props) => {
    let manifestList = props?.manifestList;

    const { id, type, groupeddata, contentUrn } = props?.parentElement || {};
    let asideData = {
        type: props.element.type,
        subtype: props.element.subtype,
        id: props.element.id,
        contentUrn: props.element.contentUrn,
        element: props.element,
        index: props.index
    };
    asideData = (type === "showhide") ? { ...asideData, parent: { id, type, contentUrn, showHideType: props?.showHideType } } : asideData;

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
            let indexToPass = `${typeof (props?.index) === 'number' ? props?.index : props?.index?.split('-')[0]}-${props?.indexTemp}${parentIndex}-${index}`;
           
            asideData.parentManifestListItem = manifestList[parentIndex];
            asideData.parentManifestList = props.element;
            asideData.grandParentManifestList = props.grandParentManifestList;
            if (type === "showhide") {
                 indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
            }
            return (
                <ElementContainer
                    element={item}
                    index={indexToPass}
                    indexTemp={indexT}
                    onClickCapture={props?.onClickCapture}
                    showBlocker={props?.showBlocker}
                    borderToggle={props?.borderToggle}
                    onListSelect={props.onListSelect}
                    model={props?.element.html}
                    handleCommentspanel={props?.handleCommentspanel}
                    placeholder={typeof (props?.index) === 'string' && props?.index?.split('-').length >= 3 ? "Press Shift+Tab to move out" : "Type something..."}
                    asideData={asideData}
                    currentManifestList={props.element}
                    parentElement={props?.parentElement}
                    showHideType={props?.showHideType}
                />
            )
        })

    }

    if (props?.element?.listtype === 'ordered') {
        if (props?.element?.startNumber > 1) {
            return (
                <ol class="decimal" style={{ 'counterIncrement': `section ${props?.element?.startNumber - 1}` }}>
                    {
                        fetchLi(props?.element?.subtype)
                    }
                </ol>
            )
        }
        else {
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