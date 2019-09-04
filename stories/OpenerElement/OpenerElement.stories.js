import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  OpenerElement  from '../../src/component/OpenerElement';


storiesOf('Opener Element', module)
  .addDecorator(withInfo)
  .add('Opener', () => <OpenerElement  />, { notes: "Opener Element" })