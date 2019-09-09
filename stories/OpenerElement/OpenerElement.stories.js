import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  OpenerElement  from '../../src/component/OpenerElement';

const openerModel = {
  html: {
    label: "Ch",
    number: "166",
    title: "Opener element title 1"
  }
}

storiesOf('Opener Element', module)
  .addDecorator(withInfo)
  .add('Opener', () => <div style = {{width: '500px', position: 'relative', left: '100px'}}><OpenerElement model={openerModel.html} /></div>, { notes: "Opener Element" })