import React from 'react'

import { storiesOf } from '@storybook/react'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs'

import ElementSaprator from '../../src/component/ElementSaprator'
import markdownNotes from './ElementSaprator.md'

const stories = storiesOf('Components|Element Saprator', module)

stories.addDecorator(withKnobs)
function splithandlerfunction () {
  alert('Click handler function Called')
}

const typeHandler = ['text-elem', 'image-elem', 'audio-elem', 'interactive-elem', 'assessment-elem', 'container-elem', 'worked-exp-elem', 'opener-elem']
const clickHandler = [splithandlerfunction, splithandlerfunction, splithandlerfunction, splithandlerfunction, splithandlerfunction, splithandlerfunction, splithandlerfunction, splithandlerfunction]

stories.add('ElementSaprator', () =>{
  return (
    <div>
       < ElementSaprator key={'213123'} typeHandler={typeHandler} clickHandler={clickHandler}/ >
       < ElementSaprator key='654656546' typeHandler={typeHandler} clickHandler={clickHandler}/ >
       < ElementSaprator key='4535' typeHandler={typeHandler} clickHandler={clickHandler}/ >
    </div>
  )
} , {
  // notes: {
  //   markdown: markdownNotes
  // }, //Notes for a story
  info: 'This component is for spliting a slate and adding verious types of elements in the Cypress ',
  readme: {
    sidebar: markdownNotes,
  },
})