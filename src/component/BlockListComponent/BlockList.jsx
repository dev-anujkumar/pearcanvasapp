import React from 'react';
import ElementContainer from '../ElementContainer';
import ElementConstants from '../ElementContainer/ElementConstants';
import { fetchLiClassName } from './BlockListHelperFunctions';
import { elementAsideText, pressShiftTabText, typeSomethingText } from '../../constants/Element_Constants';

const BlockList = (props) => {
    let manifestList = props?.manifestList;

    const { id, type, subtype, groupeddata, contentUrn } = props?.parentElement || {};
    let asideData = {
        type: props.element.type,
        subtype: props.element.subtype,
        id: props.element.id,
        contentUrn: props.element.contentUrn,
        element: props.element,
        index: props.index
    };
    const allowedElements = ["showhide", elementAsideText, "groupedcontent"];
    asideData = allowedElements.includes(type) ? { ...asideData, parent: { id, type, contentUrn, showHideType: props?.showHideType } } : asideData;
    // if BL is inside Tab element then attach the data of TB element for handelling
    if (type === ElementConstants.MULTI_COLUMN && subtype === ElementConstants.TAB) {
        let indexes = props?.index?.toString()?.split('-') || [];
        let columnDetails = {
            columnIndex: Number(indexes[2]),
            columnId: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.id,
            columnContentUrn: groupeddata?.bodymatter[indexes[1]].groupdata.bodymatter[0].groupeddata.bodymatter[indexes[2]]?.contentUrn,
            columnName: Number(indexes[2]) === 0 ? "C1" : "C2"
        }
        asideData = {...asideData, parent: {...props.parentElement, columnDetails: columnDetails}}
    }

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
            let placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 3 ? pressShiftTabText : typeSomethingText;
            if ((type === "showhide") || (type === elementAsideText && props.parentElement?.elementdata?.bodymatter[normalIndex[1]]?.contents?.bodymatter[normalIndex[2]].type === 'manifestlist')) {
                 indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                 placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? pressShiftTabText : typeSomethingText;
            }else if(type === elementAsideText && props.parentElement?.elementdata?.bodymatter[normalIndex[1]]?.type === 'manifestlist'){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 4 ? pressShiftTabText : typeSomethingText;
                // Condition for passing correct index when BL is inside Tab element of TB
            } else if (type === ElementConstants.MULTI_COLUMN && subtype === ElementConstants.TAB && groupeddata?.bodymatter[normalIndex[1]].groupdata.bodymatter[0].groupeddata.bodymatter[normalIndex[2]]?.groupdata?.bodymatter[normalIndex[3]]?.type === 'manifestlist') {
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}-${props?.index?.split('-')[3]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 6 ? pressShiftTabText : typeSomethingText;
            }else if(type === "groupedcontent" && props?.parentElement?.groupeddata?.bodymatter[normalIndex[1]]?.groupdata?.bodymatter[normalIndex[2]]?.type === 'manifestlist'){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? pressShiftTabText : typeSomethingText;
            }else if(props?.parentElement){
                indexToPass = `${typeof (props?.index) === 'number' ? props?.index : `${props?.index?.split('-')[0]}-${props?.index?.split('-')[1]}-${props?.index?.split('-')[2]}`}-${props?.indexTemp}${parentIndex}-${index}`;
                 placeholder = typeof (props?.index) === 'string' && props?.index?.split('-').length >= 5 ? pressShiftTabText : typeSomethingText;
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
