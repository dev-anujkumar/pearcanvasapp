import React from 'react'

import { storiesOf } from '@storybook/react'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs'

import ElementSaprator from '../../src/component/ElementSaprator'
import markdownNotes from './ElementSaprator.md'

const stories = storiesOf('Components|Element Saprator', module)

stories.addDecorator(withKnobs)

stories.add('ElementSaprator', () => < ElementSaprator / > , {
  // notes: {
  //   markdown: markdownNotes
  // }, //Notes for a story
  info: 'This component is for spliting a slate and adding verious types of elements in the Cypress ',
  readme: {
    sidebar: markdownNotes,
  },
})