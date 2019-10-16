import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import { withInfo } from '@storybook/addon-info';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore(middlewares);
import {AssessmentSlateCanvas} from '../../src/component/AssessmentSlateCanvas/AssessmentSlateCanvas.jsx';
import {assessmentSlateWithData}  from "../../fixtures/AssessmentSlateCanvasTestingData";

storiesOf('AssessmentSlateCanvas', module)

    .addDecorator(withInfo)

    .add('Assessment Slate', () => <div style={{width:"504px", position:"relative", left:"100px"}}>  <AssessmentSlateCanvas 
    type={this.props.type} getAssessmentDataPopup="false" getAssessmentData="true" assessmentId="urn:pearson:work:fa7bcbce-1cc5-467e-be1d-66cc513ec464"  assessmentItemTitle="1.1 Homework" model={assessmentSlateWithData}/></div>)
