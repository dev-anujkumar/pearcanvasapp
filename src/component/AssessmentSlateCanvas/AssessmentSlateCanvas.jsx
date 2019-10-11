/**
* Root Component of Assessment Slate Canvas
*/


// IMPORT - Plugins //
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {AssessmentSlateData} from './AssessmentSlateData.jsx';
//import { closeLtAction,openLtAction,getDiscipline} from './learningTool/learningToolActions';



export class AssessmentSlateCanvas extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <AssessmentSlateData type={this.props.type}/>

        );
    }
}

// const mapStateToProps = (state, props) => {
//     return {
//         toggleLT : state.learningToolReducer.toggleLT,
//         selectedResultFormApi : state.learningToolReducer.selectedResultFormApi
//     }
// }
// const mapActionToProps = {
//     openLtAction:openLtAction,
//     closeLtAction:closeLtAction,
//     getDiscipline:getDiscipline
// }


AssessmentSlateCanvas.defaultProps = {
    /** Detail of element in JSON object */
    type: ''
}

// export default connect(mapStateToProps,mapActionToProps)(AssessmentSlateCanvas)