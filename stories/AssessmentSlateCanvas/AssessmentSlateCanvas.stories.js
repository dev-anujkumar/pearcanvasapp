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


storiesOf('AssessmentSlateCanvas', module)

    .addDecorator(withInfo)
    .add('default Assessment Slate', () => <div style={{width:"504px", position:"relative", left:"100px"}}>  <AssessmentSlateCanvas type='assessment'/></div>)
    .add('Assessment Slate', () => <div style={{width:"504px", position:"relative", left:"100px"}}>  <AssessmentSlateCanvas /></div>)
    .add('Slate', () => <div style={{width:"504px", position:"relative", left:"100px"}}>  <AssessmentSlateCanvas type='assessment1'/></div>)