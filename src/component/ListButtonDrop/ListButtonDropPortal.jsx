/**
 * Module - ListButtonDropPortal
 * Description - portal component for ListButtonDrop element
 * Developer - Abhay Singh
 * Last modified - 04-09-2019
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
                const slateObject = Object.values(slateData)[0];
                const { contents } = slateObject;
                const { bodymatter } = contents;
                const listElement = bodymatter.length && bodymatter.find((element) => element.id === activeElement.elementId && element.type === 'element-list');
                this.startValue = listElement.elementdata && listElement.elementdata.startNumber || null;
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
        activeElement: state.appStore.activeElement
    };
};

export default connect(
    mapStateToProps,
    null
)(ListButtonDropPortal);