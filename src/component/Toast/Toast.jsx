/**
* Component | Toast
* description | This is the Component for Update Button Field on Assessments for Elm
*/
/** ----- Import - Plugins ----- */
import React, { Component } from 'react';
import { connect } from 'react-redux';
/** ----- Import - Dependencies ----- */
import '../../styles/SlateWrapper/style.css';
import { showToastMessage } from './ToastActions.js';
class Toast extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.hideToast();
        }, 4000)
    }

    hideToast = () => {
        this.props.showToastMessage(false);
    }

    render() {
        if (this.props.active) {
            return <div id="toast-message">{this.props.toastMessage}</div>
        } else {
            return null
        }
    }
}

Toast.displayName = "Toast"
const mapStateToProps = state => {
    return {
        toastMessage: state.appStore.toastMessage
    };
};

const mapActionToProps = {
    showToastMessage: showToastMessage
}

export default connect(
    mapStateToProps,
    mapActionToProps
)(Toast);

