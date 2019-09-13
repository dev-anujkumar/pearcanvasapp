import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  ElementAsideContainer  from '../../src/component/ElementAsideContainer';
import {elementAside} from '../../fixtures/elementAsideData'

storiesOf('Component container | workexample', module)
  .addDecorator(withInfo)
  .add('WorkExample', () => <ElementAsideContainer element= {elementAside} />, { notes: "WorkExample Element" })
  