import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Paragraph } from '../../src/component/Paragraph/Paragraph';

const paragraphDescription = "This is a section for button components to be used in Cypress. You just have to use a single 'Button' component for rendering different types of buttons. You just have to pass the 'type' prop to the component."


const paragrahTypes = () => ( 
  <>
      <Paragraph type="add-comment" onClick={action('Add comment')} />
    </>
 
)

storiesOf('Paragraph', module)
  .add(
    'Introduction',
    withInfo(paragraphDescription)(paragrahTypes)
  )
  .add('Add comment', () => <Paragraph type="Paragraph" onClick={action('Add comment')} />, { notes: "Paragraph Added" })
  