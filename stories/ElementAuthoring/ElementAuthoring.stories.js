import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { ElementAuthoring } from '../../src/component/ElementAuthoring/ElementAuthoring';


storiesOf('ElementAuthoring', module)
  .addDecorator(withInfo)
  .add('Paragraph', () => <ElementAuthoring type="element-authoredtext"  onKeyup = {action("Paragraph blured")} onFocus = {action("Paragraph blured")} onBlur = {action("Paragraph blured")} onClick={action('Add Paragraph')} />, { notes: "Paragraph Element" })
  