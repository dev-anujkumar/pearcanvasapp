import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Button } from '../../src/component/Buttons/Button';

const buttonDescription = "This is a section for button components to be used in Cypress. You just have to use a single 'Button' component for rendering different types of buttons. You just have to pass the 'type' prop to the component."

const parentStyle = {
  display: 'flex'
}
const divStyle = {
  margin: '10px',
  padding: '20px'
}

const buttonTypes = () => ( 
  <div style={parentStyle}>
    <div style = {divStyle}>
      <Button type="add-comment" onClick={action('Add comment')} />
    </div>
    <div style = {divStyle}>
      <Button type="comment-flag" onClick={action('Open comments panel')} />
    </div>
    <div style = {divStyle}>
      <Button type="block-label-P" onClick={action('This is for Paragraph element')} />
    </div>
    <div style = {divStyle}>
      <Button type="delete-element" onClick={action('Delete element')} />
    </div>
    <div style = {divStyle}>
      <Button type="tcm" onClick={action('Open TCM window')} />
    </div>
    <div style = {divStyle}>
      <Button type="forward-nav-active" onClick={action('Forward navigation')} />
    </div>
    <div style = {divStyle}>
      <Button type="backward-nav-active" onClick={action('Backward navigation')} />
    </div>
    <div style = {divStyle}>
      <Button type="expand" onClick={action('Expand')} />
    </div>
    <div style = {divStyle}>
      <Button type="split" onClick={action('Split slate')} />
    </div>
    <div style = {divStyle}>
      <Button type="color-palette" onClick={action('color-palette')} />
    </div> 
  </div>
)

storiesOf('Button', module)
  .add(
    'Introduction',
    withInfo(buttonDescription)(buttonTypes)
  )
  .add('Add comment', () => <Button type="add-comment" onClick={action('clicked')} />, { notes: "Add notes" })
  .add('Comment flag', () => <Button type="comment-flag" onClick={action('clicked')} />, { notes: "open/view notes" })
  .add('Paragraph block label', () => <Button type="block-label-P" onClick={action('clicked')} />, { notes: "Paragraph element block/shell tag" })
  .add('Delete element', () => <Button type="delete-element" onClick={action('clicked')} />, { notes: "Remove element" })
  .add('TCM', () => <Button type="tcm" onClick={action('clicked')} />)
  .add('Forward Navigation (active)', () => <Button type="forward-nav-active" onClick={action('clicked')} />, { notes: "Next slate" })
  .add('Backward Navigation (active)', () => <Button type="backward-nav-active" onClick={action('clicked')} />, { notes: "Previous slate" })
  .add('Expand', () => <Button type="expand" onClick={action('clicked')} />, { notes: "expand element list" })
  .add('Split', () => <Button type="split" onClick={action('clicked')} />, { notes: "split slate" })
  .add('Color palette', () => <Button type="color-palette" onClick={action('clicked')} />, { notes: "Color palette for opener element" })
