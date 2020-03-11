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

const esProps = [
  {
    buttonType : 'text-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'text',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'image-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'image',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'audio-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'audio/video',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'interactive-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'interactive',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'assessment-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'assessment',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'container-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'container',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'worked-exp-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'worked example',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'opener-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'opener element',
    tooltipDirection : 'left'
  },
]

stories.add('ElementSaprator', () =>{
  return (
    <div>
       < ElementSaprator key={'213123'} esProps = {esProps} elementType='WE'/ >
       < ElementSaprator key='654656546' esProps = {esProps} elementType='WE'/ >
       < ElementSaprator key='4535' esProps = {esProps} / >
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