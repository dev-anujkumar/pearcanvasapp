import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  SlateHeader  from '../../src/component/SlateHeader/slateHeader';

storiesOf('SlateHeader', module)
.add('Slate Header', () => <SlateHeader onClick={action('clicked')} />);