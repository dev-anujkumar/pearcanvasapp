import React from 'react';

import { storiesOf } from '@storybook/react';
import Loadable from '../src/component/LoadableComponent.jsx';

storiesOf('Lazy', module)
  .add('Default', () => <Loadable />)
