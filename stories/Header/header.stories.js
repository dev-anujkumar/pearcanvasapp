import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  HeaderComponent  from '../../src/component/Header/header';

storiesOf('HeaderComponent', module)
.add('to Storybook', () => <HeaderComponent onClick={action('clicked')} />);