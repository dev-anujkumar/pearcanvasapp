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
                                    else if(nestedElement.type === "showhide" && this.props.showHideObj && this.props.showHideObj.index){
                                        let indexes = this.props.showHideObj.index.split("-")
                                        let targetShowhideElem = nestedElement.interactivedata[this.props.showHideObj.showHideType][indexes[3]]
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
                                            else if(leafElement.type === "showhide" && this.props.showHideObj && this.props.showHideObj.index){
                                                let indexes = this.props.showHideObj.index.split("-")
                                                let targetShowhideElem = leafElement.interactivedata[this.props.showHideObj.showHideType][indexes[4]]
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
                            this.props.showHideObj && element.interactivedata[this.props.showHideObj.showHideType].find(
                                (nselement) => {
                                    // let isMatched = false
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
        } catch (error) {
            //console.error(error);
            this.startValue = null;
            this.selectedOption = null;
        }
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
        showHideObj:state.appStore.showHideObj
    };
};

export default connect(
    mapStateToProps,
    null
)(ListButtonDropPortal);