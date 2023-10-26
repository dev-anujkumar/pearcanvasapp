/**
 * Module - ListButtonDropPortal
 * Description - portal component for ListButtonDrop element
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import config from '../../config/config.js'
import { checkBlockListElement } from '../../js/TinyMceUtility.js';
class ListButtonDropPortal extends Component {
    constructor(props) {
        super(props);
        this.portalElem = null;
        this.el = this.createParentElement();
        this.startValue = null;
        this.selectedOption = null;
        this.inputRef = React.createRef();
    }

    shouldComponentUpdate(nextProp, nextState) {
        if (this.props.slateData === nextProp.slateData && this.props.activeElement === nextProp.activeElement) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.inputRef.current.value = this.startValue;
    }

    componentWillUnmount = () => {
        if (this.portalElem) {
            this.portalElem.removeChild(this.el);
        }
    };

    componentDidMount = () => {
        this.portalElem = document.getElementById('editor-toolbar');
        if (this.portalElem) {
            this.portalElem.appendChild(this.el);
        }
    }

    /**
     * createParentElement | creates wrapper div#listDropWrapper for list drop
     */
    createParentElement = () => {
        let div = document.createElement('div');
        div.id = 'listDropWrapper';
        div.classList.add('listDropWrapper');
        return div;
    }

    /**
     * getListDropPopUpState | this method setup startValue and selectedOption to be passed into ListButtoDrop component instance
     * @param {object} slateData | current slateDate state in store
     * @param {object} activeElement | current activeElement in store
     */
    getListDropPopUpState = (slateData, activeElement) => {
        try {
            this.startValue = null;
            this.selectedOption = null;
            let blockListData = checkBlockListElement({slateLevelData:slateData,index:activeElement.index,asideData:this.props?.asideData}, 'ENTER');
            if (activeElement.elementWipType === 'element-list') {
                const slateObject = slateData[config.slateManifestURN];
                const { contents } = slateObject;
                const { bodymatter } = contents;
                let listElement = Object.create(null, {})
                bodymatter.length && bodymatter.find(
                    (element) => {
                        let isMatched = false
                        if (element.id === activeElement.elementId) {
                            isMatched = element.type === 'element-list'
                            isMatched && (listElement = element)
                        }
                        else if (element.type === "element-aside") {
                            element.elementdata.bodymatter.find(
                                (nestedElement) => {
                                    if (nestedElement.id === activeElement.elementId) {
                                        isMatched = nestedElement.type === 'element-list'
                                        isMatched && (listElement = nestedElement)
                                    }
                                    else if(nestedElement.type === "showhide" && this.props?.asideData?.type === "showhide"){
                                        let indexes = activeElement.index.split("-")
                                        let targetShowhideElem = nestedElement.interactivedata[this.props?.asideData?.sectionType][indexes[3]]
                                        if(targetShowhideElem && targetShowhideElem.id === activeElement.elementId){
                                            isMatched = targetShowhideElem.type === 'element-list'
                                            isMatched && (listElement = targetShowhideElem)
                                        }
                                    }
                                    else if (nestedElement.type === "manifest") {
                                        nestedElement.contents.bodymatter.find((leafElement) => {
                                            if (leafElement.id === activeElement.elementId) {
                                                isMatched = leafElement.type === 'element-list'
                                                isMatched && (listElement = leafElement)
                                            }
                                            else if(leafElement.type === "showhide" && this.props?.asideData?.type === "showhide"){
                                                let indexes = activeElement.index.split("-")
                                                let targetShowhideElem = leafElement.interactivedata[this.props?.asideData?.sectionType][indexes[4]]
                                                if(targetShowhideElem && targetShowhideElem.id === activeElement.elementId){
                                                    isMatched = targetShowhideElem.type === 'element-list'
                                                    isMatched && (listElement = targetShowhideElem)
                                                }
                                            }
                                        })
                                    }
                                }
                            )
                          
                        }else if (element.type === "showhide"){
                            this.props?.asideData?.type === "showhide" && this.props.asideData && element.interactivedata[this.props?.asideData?.sectionType].find(
                                (nselement) => {
                                    if (nselement.id === activeElement.elementId) {
                                        isMatched = nselement.type === 'element-list'
                                        isMatched && (listElement = nselement)
                                    }
                                }
                            )
                        } else if (element.type === "groupedcontent") {
                            let indexes = activeElement.index.split("-")
                            let liElement = element.groupeddata && element.groupeddata.bodymatter[indexes[1]] && element.groupeddata.bodymatter[indexes[1]].groupdata.bodymatter[indexes[2]]
                            if (liElement && liElement.id === activeElement.elementId) {
                                isMatched = liElement.type === 'element-list'
                                isMatched && (listElement = liElement)
                            }
                            element.groupeddata.bodymatter.map(data => {
                                data.groupdata.bodymatter.find(
                                    (subNestedElement) => {
                                        if (subNestedElement.type === 'element-aside') {
                                            subNestedElement.elementdata.bodymatter.find(
                                                (nestedElement) => {
                                                    if (nestedElement.id === activeElement.elementId) {
                                                        isMatched = nestedElement.type === 'element-list'
                                                        isMatched && (listElement = nestedElement)
                                                    }
                                                    else if (nestedElement.type === "showhide" && this.props?.asideData?.type === "showhide") {
                                                        let indexes = activeElement.index.split("-")
                                                        let targetShowhideElem = nestedElement.interactivedata[this.props?.asideData?.sectionType][indexes[5]]
                                                        if (targetShowhideElem && targetShowhideElem.id === activeElement.elementId) {
                                                            isMatched = targetShowhideElem.type === 'element-list'
                                                            isMatched && (listElement = targetShowhideElem)
                                                        }
                                                    }
                                                    else if (nestedElement.type === "manifest") {
                                                        nestedElement.contents.bodymatter.find((leafElement) => {
                                                            if (leafElement.id === activeElement.elementId) {
                                                                isMatched = leafElement.type === 'element-list'
                                                                isMatched && (listElement = leafElement)
                                                            }
                                                            else if (leafElement.type === "showhide" && this.props?.asideData?.type === "showhide") {
                                                                let indexes = activeElement.index.split("-")
                                                                let targetShowhideElem = leafElement.interactivedata[this.props?.asideData?.sectionType][indexes[6]]
                                                                if (targetShowhideElem && targetShowhideElem.id === activeElement.elementId) {
                                                                    isMatched = targetShowhideElem.type === 'element-list'
                                                                    isMatched && (listElement = targetShowhideElem)
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            )
                                        } else if (subNestedElement.type === "showhide" && this.props?.asideData?.type === "showhide") {
                                            let indexes = activeElement.index.split("-")
                                            let targetShowhideElem = subNestedElement.interactivedata[this.props?.asideData?.sectionType][indexes[4]]
                                            if (targetShowhideElem && targetShowhideElem.id === activeElement.elementId) {
                                                isMatched = targetShowhideElem.type === 'element-list'
                                                isMatched && (listElement = targetShowhideElem)
                                            }
                                        }
                                    }
                                )
                            })

                        }
                        return isMatched
                    });
                let counter = listElement.elementdata && listElement.elementdata.startNumber
                if(!isNaN(parseInt(counter)))
                {
                    counter = parseInt(counter) // parseInt(counter) + 1 // issues with migrated projects // earlier default by 0
                }
                this.startValue = counter || null
                this.selectedOption = listElement.subtype || null;
            }
            else if (blockListData && Object.keys(blockListData).length){
                let metaDataBlockList;
                let indexes = activeElement?.index.split("-");
                let parentElement= slateData[config.slateManifestURN]?.contents?.bodymatter[indexes[0]];
                if(this?.props?.asideData.parent && this?.props?.asideData.parent.type === "showhide"){
                    metaDataBlockList = this.getBlockListMetaData(blockListData.parentData.id,slateData[config.slateManifestURN].contents.bodymatter[indexes[0]].interactivedata[this?.props?.asideData?.parent?.showHideType][indexes[2]]);
                }else if(parentElement.type ==="element-aside" && parentElement.elementdata?.bodymatter[indexes[1]]?.type === "manifestlist"){
                    metaDataBlockList = this.getBlockListMetaData(blockListData.parentData.id,parentElement.elementdata?.bodymatter[indexes[1]]);
                }else if(parentElement.type ==="element-aside" && parentElement.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]?.type === "manifestlist"){
                    metaDataBlockList = this.getBlockListMetaData(blockListData.parentData.id,parentElement.elementdata?.bodymatter[indexes[1]]?.contents?.bodymatter[indexes[2]]);
                }else if(this?.props?.asideData?.parent?.type === 'groupedcontent' && parentElement?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]?.type === "manifestlist"){
                    metaDataBlockList = this.getBlockListMetaData(blockListData.parentData.id,parentElement?.groupeddata?.bodymatter[indexes[1]]?.groupdata?.bodymatter[indexes[2]]);
                }else{
                    metaDataBlockList = this.getBlockListMetaData(blockListData.parentData.id,slateData[config.slateManifestURN].contents.bodymatter[activeElement.index.split("-")[0]]);
                }
                if (metaDataBlockList && metaDataBlockList.length) {
                    this.startValue = metaDataBlockList[0].startValue
                    this.selectedOption = metaDataBlockList[0].selectedOption;
                }
            }
        } catch (error) {
            this.startValue = null;
            this.selectedOption = null;
        }
    }


 /**
  * function to get selected element metadata
  * @param {String} elementId
  * @param {Object} elementData 
  * @returns {Array} selected element metadata
 */
 getBlockListMetaData = (elementId, elementData) => {
    const selectedElementMetaData = [];
    if(elementData.id === elementId){
        selectedElementMetaData.push({
            startValue: elementData.startNumber,
            selectedOption: elementData.subtype
        });
    }
    if (elementData?.listdata?.bodymatter) {
        elementData.listdata?.bodymatter.forEach((listData) => selectedElementMetaData.push(...this.getBlockListMetaData(elementId, listData)))
    }
    if (elementData?.listitemdata?.bodymatter) {
        elementData.listitemdata.bodymatter.forEach((listItemData, index) => {
            if (listItemData.id === elementId) {
                selectedElementMetaData.push({
                    startValue:elementData.listitemdata.bodymatter[index].startNumber,
                    selectedOption:elementData.listitemdata.bodymatter[index].subtype
                })
            } else {
                selectedElementMetaData.push(...this.getBlockListMetaData(elementId, listItemData));
            }
        });
    }
    return selectedElementMetaData;
}


    /**
     * render | mounts listDrop on custom div
     */
    render() {
        const { children } = this.props;
        this.getListDropPopUpState(this.props.slateData, this.props.activeElement)
        return ReactDOM.createPortal(
            children(this.selectedOption, this.startValue, this.inputRef),
            this.el
        );
    }
}
ListButtonDropPortal.displayName = "ListButtonDropPortal"

ListButtonDropPortal.propTypes = {
    /** slate data attached to store and contains complete slate object */
    slateData: PropTypes.object.isRequired,
    /** child compoent to be ported via this portal component */
    children: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeElement: state.appStore.activeElement,
        showHideObj:state.appStore.showHideObj,
        asideData:state.appStore.asideData

    };
};

export default connect(
    mapStateToProps,
    null
)(ListButtonDropPortal);
