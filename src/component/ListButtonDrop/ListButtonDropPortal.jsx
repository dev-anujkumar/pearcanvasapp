/**
 * Module - ListButtonDropPortal
 * Description - portal component for ListButtonDrop element
 * Developer - Abhay Singh
 * Last modified - 04-09-2019
 */

// IMPORT - Plugins //
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ListButtonDropPortal extends Component {
    constructor(props) {
        super(props);
        this.portalElem = null;
        this.el = this.createParentElement();
    }

    componentDidUpdate() {
        // **********************************
        // DON'T remove this comment
        // **********************************
        // let { refToToolBar: refBtn } = this.props;
        // if (refBtn) {
        //     refBtn.appendChild(this.el);
        // }
        // **********************************
    }

    componentWillUnmount = () => {
        // **********************************
        // DON'T remove this comment
        // **********************************
        // let { refToToolBar: refBtn } = this.props;
        // if (refBtn) {
        //     refBtn.removeChild(this.el);
        // }
        // **********************************

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
     * render | mounts listDrop on custom div
     */
    render() {
        const { children } = this.props;
        return ReactDOM.createPortal(
            children,
            this.el
        );
    }
}

export default ListButtonDropPortal;