import React from 'react';

import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import Sidebar from './../../src/component/Sidebar';

storiesOf('Sidebar')
    .addDecorator(withInfo)
    .add('Sidebar', () => {
        return (
            <Sidebar />
        );
    });