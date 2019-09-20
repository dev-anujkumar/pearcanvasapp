import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  ElementAsideContainer  from '../../src/component/ElementAsideContainer';
import {elementAside,elementAsideWorkExample} from '../../fixtures/elementAsideData'

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

function elementSepratorProps(){
  return []
}
storiesOf('Element Aside container', module)
  .addDecorator(withInfo)
  .add('WorkExample', () => <Provider store = {store} ><ElementAsideContainer  elementSepratorProps  = {elementSepratorProps} element= {elementAsideWorkExample} /></Provider> ,  { notes: "WorkExample Element" })
  .add('Container', () => <Provider store = {store} ><ElementAsideContainer elementSepratorProps  = {elementSepratorProps} element= {elementAside} /></Provider> ,  { notes: "Container Element" })
  