import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  Popup  from '../../src/component/PopUp';
import { withInfo } from '@storybook/addon-info';

storiesOf('Popup', module)
.addDecorator(withInfo)
.add('Popup', () => <Popup onClick={action('clicked')}/>);