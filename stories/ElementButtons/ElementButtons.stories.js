import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';

import { Button } from '../../src/component/ElementButtons/ElementButton';

storiesOf('Button', module)
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
