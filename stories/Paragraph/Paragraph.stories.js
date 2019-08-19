import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { Paragraph } from '../../src/component/Paragraph/Paragraph';

const paragraphDescription = "This is a section for Paragraph components to be used in Cypress. You just have to use a single 'Paragraph' component for rendering different types of element. You just have to pass the 'type' prop to the component."


const paragrahTypes = () => ( 
    <>
      <Paragraph type="element-authoredtext" onClick={action('Add Paragraph')} />
    </>
 
)

storiesOf('Paragraph', module)
  .add(
    'Introduction',
     withInfo(paragraphDescription)(paragrahTypes)
  )
  .add('Paragraph', () => <Paragraph type="element-authoredtext" onClick={action('Add Paragraph')} />, { notes: "Paragraph Added" })
  