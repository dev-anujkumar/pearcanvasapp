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
        }, 2000)
    }

    hideToast = () => {
        this.props.showToastMessage(false);
    }

    render() {
        return (
            <>
                {this.props.active ? <div id="toast-message">{this.props.toastMessage}</div> : null}
            </>
        );
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

