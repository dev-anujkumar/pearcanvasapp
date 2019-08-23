import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import CommentsPanel  from '../../src/component/CommentsPanel/CommentsPanel';


storiesOf('CommentsPanel', module)
  .addDecorator(withInfo)
  .add('Commnets Panel', () => <CommentsPanel onClick={action('Add Comments')} />, { notes: "Add Comments" })
  