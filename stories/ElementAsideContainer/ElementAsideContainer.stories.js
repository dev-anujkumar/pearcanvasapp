import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  ElementAsideContainer  from '../../src/component/ElementAsideContainer';
import {elementAside} from '../../fixtures/elementAsideData'

import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
const mockStore = configureMockStore(middlewares);

const store = mockStore({
    toolbarReducer: {
        elemBorderToggle: true
    }
  });

storiesOf('Component container | workexample', module)
  .addDecorator(withInfo)
  .add('WorkExample', () => <Provider store = {store} ><ElementAsideContainer element= {elementAside} /></Provider> ,  { notes: "WorkExample Element" })
  