import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Button from '../../src/component/ElementButtons/ElementButton';

const parentStyle = {
  display: 'flex'
}

const divStyle = {
  margin: '10px',
  padding: '20px'
}

const buttonTypes = () => ( 
  <div style={parentStyle}>
    <div title="Add comment" style = {divStyle}>
      <Button type="add-comment" onClick={action('Add comment')} />
    </div>
    <div title="Show comments panel" style = {divStyle}>
      <Button type="comment-flag" onClick={action('Open comments panel')} />
    </div>
    <div title="Shell tag" style = {divStyle}>
      <Button type="element-label" labelText="UL" onClick={action('This is for element')} />
    </div>
    <div title="delete-element" style = {divStyle}>
      <Button type="delete-element" onClick={action('Delete element')} />
    </div>
    <div title="TCM" style = {divStyle}>
      <Button type="tcm" onClick={action('Open TCM window')} />
    </div>
    <div title="forward navigation" style = {divStyle}>
      <Button type="forward-nav-active" onClick={action('Forward navigation')} />
    </div>
    <div title="backward navigation" style = {divStyle}>
      <Button type="backward-nav-active" onClick={action('Backward navigation')} />
    </div>
    <div title="Insert element" style = {divStyle}>
      <Button type="expand" onClick={action('Expand')} />
    </div>
    <div title="Split slate" style = {divStyle}>
      <Button type="split" onClick={action('Split slate')} />
    </div>
    <div title="color palette" style = {divStyle}>
      <Button type="color-palette" onClick={action('color-palette')} />
    </div>
    <div title="color text" style = {divStyle}>
      <Button type="color-text" onClick={action('color-text')} />
    </div>
    <div title="Text element" style = {divStyle}>
      <Button type="text-elem" onClick={action('text elem')} />
    </div>
    <div title="Image element" style = {divStyle}>
      <Button type="image-elem" onClick={action('image elem')} />
    </div>
    <div title="Audio element" style = {divStyle}>
      <Button type="audio-elem" onClick={action('audio elem')} />
    </div>
    <div title="Interactive element" style = {divStyle}>
      <Button type="interactive-elem" onClick={action('interactive elem')} />
    </div>
    <div title="Container element" style = {divStyle}>
      <Button type="container-elem" onClick={action('container elem')} />
    </div>
    <div title="Worked example element" style = {divStyle}>
      <Button type="worked-exp-elem" onClick={action('worked exp elem')} />
    </div>
    <div title="Assessment element" style = {divStyle}>
      <Button type="assessment-elem" onClick={action('assessment elem')} />
    </div>
    <div title="Opener element" style = {divStyle}>
      <Button type="opener-elem" onClick={action('opener elem')} />
    </div>
    <div title="Section break" style = {divStyle}>
      <Button type="section-break-elem" onClick={action('section break elem')} />
    </div>
  </div>
)


storiesOf('Components|Button', module)
  .addDecorator(withInfo)
  .add('Introduction', () => buttonTypes())
  .add('Add comment', () => <Button type="add-comment" onClick={action('Add comment')} />, { notes: "Add notes" })
  .add('Comment flag', () => <Button type="comment-flag" onClick={action('Open comments panel')} />, { notes: "open/view notes" })
  .add('Element block label', () => <div style={{width:"32px"}}>
                                      <Button type="element-label" labelText="UL" onClick={action('This is for element')} />
                                    </div>, 
                                    { notes: "Paragraph element block/shell tag", info:"This requires an additional prop 'labelText' to render any text inside this block." })
  .add('Delete element', () => <div style={{width:"32px"}}>
                                  <Button type="delete-element" onClick={action('Delete element')} />
                                </div>, 
                                { notes: "Remove element" })
  .add('TCM', () => <Button type="tcm" onClick={action('Open TCM window')} />)
  .add('Forward Navigation (active)', () => <Button type="forward-nav-active" onClick={action('Forward navigation')} />, { notes: "Next slate" })
  .add('Backward Navigation (active)', () => <Button type="backward-nav-active" onClick={action('Backward navigation')} />, { notes: "Previous slate" })
  .add('Expand', () => <Button type="expand" onClick={action('Expand element list')} />, { notes: "expand element list" })
  .add('Split', () => <Button type="split" onClick={action('Split slate')} />, { notes: "split slate" })
  .add('Color palette', () => <Button type="color-palette" onClick={action('color palette')} />, { notes: "Color palette for opener element" })
  .add('Color text', () => <Button type="color-text" onClick={action('color text')} />, { notes: "Color text for opener element" })
  .add('Paragraph Element', () => <Button type="text-elem" onClick={action('text elem')} />, { notes: "Paragraph element" })
  .add('Figure Element', () => <Button type="image-elem" onClick={action('image elem')} />, { notes: "Figure Element" })
  .add('Audio element', () => <Button type="audio-elem" onClick={action('audio elem')} />, { notes: "Audio Element" })
  .add('Interactive Element', () => <Button type="interactive-elem" onClick={action('interactive elem')} />, { notes: "Interactive Element" })
  .add('Container Element', () => <Button type="container-elem" onClick={action('container elem')} />, { notes: "Container Element" })
  .add('Worked Example Element ', () => <Button type="worked-exp-elem" onClick={action('worked exp elem')} />, { notes: "Worked Example Element" })
  .add('Assesment Element Button', () => <Button type="assessment-elem" onClick={action('assessment elem')} />, { notes: "Assesment Element Button" })
  .add('Opner Element Button', () => <Button type="opener-elem" onClick={action('opener elem')} />, { notes: "Opner Element Button" })
  .add('Section Break', () => <Button type="section-break-elem" onClick={action('section break elem')} />, { notes: "Section Break element" })
