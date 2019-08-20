import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  SlateHeader  from '../../src/component/Header/header';

storiesOf('SlateHeader', module)
.add('to Storybook', () => <SlateHeader onClick={action('clicked')} />);