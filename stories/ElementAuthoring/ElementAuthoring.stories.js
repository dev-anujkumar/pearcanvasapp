import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import  ElementAuthoring  from '../../src/component/ElementAuthoring';

const paragraphModel = {
  text: `<p class="paragraphNumeroUno"> This is a Paragraph element </p>`
}
const pullquoteModel = {
  text: `<h3 class="pullQuoteNumeroUno">This is a Pullquote element.</h3>`
} 
const marginaliaModel = {
  text: `<blockquote class="blockquoteMarginalia"><p class="paragraphNummerEins">This is BQ with Marginalia.</p></blockquote>`
}
const marginaliaWithAttrModel = {
  text: `<blockquote class="blockquoteMarginaliaAttr"><p class="paragraphNummerEins">This is BQ marginalia with attribution.</p><p class="blockquoteTextCredit" contenteditable="false">You  cannot edit this attribution text here.</p></blockquote>`
}

storiesOf('ElementAuthoring', module)
  .addDecorator(withInfo)
  .add('Paragraph', () => <ElementAuthoring type="element-authoredtext" model={paragraphModel} onKeyup = {action("Paragraph blured")} onFocus = {action("Paragraph blured")} onBlur = {action("Paragraph blured")} onClick={action('Add Paragraph')} />, { notes: "Paragraph Element" })
  .add('Blockquote | Pullquote', () => <ElementAuthoring type="element-blockfeature" model={pullquoteModel}  onKeyup = {action("Pullquote blured")} onFocus = {action("Pullquote blured")} onBlur = {action("Pullquote blured")} onClick={action('Add Pullquote')} />, { notes: "Pullquote Element" })
  .add('Blockquote | Marginalia', () => <ElementAuthoring type="element-blockfeature" model={marginaliaModel} onKeyup = {action("Blockquote blured")} onFocus = {action("Blockquote blured")} onBlur = {action("Blockquote blured")} onClick={action('Add Blockquote')} />, { notes: "Blockquote Element" })
  .add('Blockquote | Marginalia with attribution', () => <ElementAuthoring type="element-blockfeature" model={marginaliaWithAttrModel}  onKeyup = {action("Marginalia blured")} onFocus = {action("Marginalia blured")} onBlur = {action("Marginalia blured")} onClick={action('Add Marginalia')} />, { notes: "Marginalia Element" })