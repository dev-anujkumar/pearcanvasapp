import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import  SlateHeader  from '../../src/component/CanvasSlateHeader';
import { withInfo } from '@storybook/addon-info';

storiesOf('SlateHeader', module)
.addDecorator(withInfo)
.add('Slate Header', () => <SlateHeader onClick={action('clicked')} />);