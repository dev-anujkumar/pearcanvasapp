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
    const allowedElements = ["showhide", "element-aside", "groupedcontent"];
    asideData = allowedElements.includes(type) ? { ...asideData, parent: { id, type, contentUrn, showHideType: props?.showHideType } } : asideData;

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
            let parentManifestListItem = manifestList[parentIndex];
            let normalIndex = typeof (props.index) === 'string' ? (props.index).replaceAll('-', '') : props.index;
            asideData.parentManifestList = props.element;
            asideData.grandParentManifestList = props.grandParentManifestList;
            let placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 3 ? "Press Shift+Tab to move out" : "Type something...";
            if ((type === "showhide") || (type === "element-aside" && props.parentElement?.elementdata?.bodymatter[normalIndex[1]]?.contents?.bodymatter[normalIndex[2]].type === 'manifestlist')) {
                 indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                 placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? "Press Shift+Tab to move out" : "Type something...";
            }else if(type === "element-aside" && props.parentElement?.elementdata?.bodymatter[normalIndex[1]]?.type === 'manifestlist'){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 4 ? "Press Shift+Tab to move out" : "Type something...";
            }else if(type === "groupedcontent" && props?.parentElement?.groupeddata?.bodymatter[normalIndex[1]]?.groupdata?.bodymatter[normalIndex[2]]?.type === 'manifestlist'){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? "Press Shift+Tab to move out" : "Type something...";
            }else if(props?.parentElement){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                 placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? "Press Shift+Tab to move out" : "Type something...";
            }
            if(item.type === "element-authoredtext" && item?.html?.text.includes('imageAssetContent')){
                placeholder = '';
            }
            return (
                <ElementContainer
                    isBlockList={props?.isBlockList}
                    element={item}
                    index={indexToPass}
                    indexTemp={indexT}
                    onClickCapture={props?.onClickCapture}
                    showBlocker={props?.showBlocker}
                    borderToggle={props?.borderToggle}
                    onListSelect={props.onListSelect}
                    model={props?.element.html}
                    handleCommentspanel={props?.handleCommentspanel}
                    placeholder={placeholder}
                    asideData={asideData}
                    currentManifestList={props.element}
                    parentElement={props?.parentElement}
                    showHideType={props?.showHideType}
                    parentManifestListItem={parentManifestListItem}
                    pasteElement={props?.pasteElement}
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