import React from 'react'

import { storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, number} from '@storybook/addon-knobs'
import Tooltip from '../../src/component/Tooltip'
import markdownNotes from './markdownNotes.md'
import Button from '../../src/component/ElementButtons/ElementButton'

const stories = storiesOf('Components|Tooltip', module)
stories.addDecorator(withKnobs)

const direction='right', tooltipText='You have no pull requests to review'

function toggleElementList(){
    alert('From story of tooltip')
}

stories.add('Tooltip', () => <Tooltip direction={direction} tooltipText={tooltipText} >
     <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
</Tooltip> , {
    // notes: {
    //   markdown: markdownNotes
    // }, //Notes for a story
    info: 'This is a Higher Order component for place Tooltip',
    readme: {
      sidebar: markdownNotes,
    },
  })