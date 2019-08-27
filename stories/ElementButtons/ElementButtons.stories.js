import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import Button from '../../src/component/ElementButtons/ElementButton';

storiesOf('Components|Button', module)
  .addDecorator(withInfo)
  .add('Add comment', () => <Button type="add-comment" onClick={action('Add comment')} />, { notes: "Add notes" })
  .add('Comment flag', () => <Button type="comment-flag" onClick={action('Open comments panel')} />, { notes: "open/view notes" })
  .add('Element block label', () => <Button type="element-label" labelText="UL" onClick={action('This is for Paragraph element')} />, { notes: "Paragraph element block/shell tag", info:"This requires an additional prop 'labelText' to render any text inside this block." })
  .add('Delete element', () => <Button type="delete-element" onClick={action('Delete element')} />, { notes: "Remove element" })
  .add('TCM', () => <Button type="tcm" onClick={action('Open TCM window')} />)
  .add('Forward Navigation (active)', () => <Button type="forward-nav-active" onClick={action('Forward navigation')} />, { notes: "Next slate" })
  .add('Backward Navigation (active)', () => <Button type="backward-nav-active" onClick={action('Backward navigation')} />, { notes: "Previous slate" })
  .add('Expand', () => <Button type="expand" onClick={action('Expand element list')} />, { notes: "expand element list" })
  .add('Split', () => <Button type="split" onClick={action('Split slate')} />, { notes: "split slate" })
  .add('Color palette', () => <Button type="color-palette" onClick={action('color palette')} />, { notes: "Color palette for opener element" })
  .add('Paragraph Element', () => <Button type="text-elem" onClick={action('text elem')} />, { notes: "Paragraph element" })
  .add('Figure Element', () => <Button type="image-elem" onClick={action('image elem')} />, { notes: "Figure Element" })
  .add('Audio element', () => <Button type="audio-elem" onClick={action('audio elem')} />, { notes: "Audio Element" })
  .add('Interactive Element', () => <Button type="interactive-elem" onClick={action('interactive elem')} />, { notes: "Interactive Element" })
  .add('Container Element', () => <Button type="container-elem" onClick={action('container elem')} />, { notes: "Container Element" })
  .add('Worked Example Element ', () => <Button type="worked-exp-elem" onClick={action('worked exp elem')} />, { notes: "Worked Example Element" })
  .add('Assesment Element Button', () => <Button type="assessment-elem" onClick={action('assessment elem')} />, { notes: "Assesment Element Button" })
  .add('Opner Element Button', () => <Button type="opener-elem" onClick={action('opener elem')} />, { notes: "Opner Element Button" })
  .add('Section Break', () => <Button type="section-break-elem" onClick={action('section break elem')} />, { notes: "Section Break element" })
