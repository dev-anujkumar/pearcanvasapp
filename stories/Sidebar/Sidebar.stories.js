import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Sidebar from './../../src/component/Sidebar';
import { updateElement } from './../../src/component/Sidebar/Sidebar_Action';

const mockStore = configureMockStore(middlewares);

const activeElement = {
    elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
    elementType: "element-authoredtext",
    primaryOption: "primary-heading",
    secondaryOption: "secondary-heading-1",
    tag: "H1"
};

const sidebarWithData = mockStore({
    appStore: {
        activeElement,
        updateElement
    }
  });


storiesOf('Sidebar')
    .addDecorator(withInfo)
    .add('Sidebar', () => {
        return (
            <Provider store={sidebarWithData}>
                <Sidebar elementType="element-authoredtext" onChange={action('Change Options')} />
            </Provider>
        );
    }, { notes: "Sidebar" });