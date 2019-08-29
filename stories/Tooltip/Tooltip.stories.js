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

const itemArr = ['1', '2', '3', '4', '5', '6', '7', '8']

function renderList(){
  return itemArr.map((value, key)=>{
    return <Tooltip direction='right' tooltipText={`You have no pull requests to review${key}`} >
                  <li style={{padding:'4px'}}>Item {key}</li>
    </Tooltip>
  })
}

stories.add('Tooltip', () =>
    <div>
      <div style={{
        height: '80px',
        width: '60px',
        left: '30%',
        position: 'absolute'
      }}>
        <ul>
          {renderList()}
        </ul>
      </div>
      <Tooltip direction={direction} tooltipText={tooltipText} >
          <Button onClick={ toggleElementList} className="dropbtn" type="expand" />
      </Tooltip>
    </div>
 , {
    // notes: {
    //   markdown: markdownNotes
    // }, //Notes for a story
    info: 'This is a Higher Order component for place Tooltip',
    readme: {
      sidebar: markdownNotes,
    },
  })