import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { Provider } from 'react-redux';
import { withInfo } from '@storybook/addon-info';
import { ElementParagraph } from '../../src/component/ElementParagraph/ElementParagraph';



storiesOf('ElementParagraph', module)
  .addDecorator(withInfo)
  .add('Paragraph',   () => <ElementParagraph element='p' eValue='Paragraph'/>, { notes: "This is paragraph in Paragraph element" })
  .add('Heading 1', () => <ElementParagraph eType='h1'    eValue='<h1>Heading 1</h1>'/>, { notes: "This is Heading 1 in Heading element" })
  .add('Heading 2', () => <ElementParagraph eType='h2'    eValue='<h2>Heading 2</h2>'/>, { notes: "This is Heading 2 in Heading element" })
  .add('Heading 3', () => <ElementParagraph eType='h3'    eValue='<h3>Heading 3</h3>'/>, { notes: "This is Heading 3 in Heading element" })
  .add('Heading 4', () => <ElementParagraph eType='h4'    eValue='<h4>Heading 4</h4>'/>, { notes: "This is Heading 4 in Heading element" })
  .add('Heading 5', () => <ElementParagraph eType='h5'    eValue='<h5>Heading 5</h5>'/>, { notes: "This is Heading 5 in Heading element" })
  .add('Heading 6', () => <ElementParagraph eType='h6'    eValue='<h6>Heading 6</h6>'/>, { notes: "This is Heading 6 in Heading element" })
  .add('Learning Objective', () => <ElementParagraph eType='LO'    eValue='<h2>Learning Objective</h2>'/>, { notes: "This is Learning Objective in Heading element" })
  .add('Blockquote', () => <ElementParagraph eType='BQ'    eValue='<p class="paragraphNummerEins">Blockquote Marginalia</p>'/>, { notes: "This is Marginalia in blockquote element" })
  .add('Pullquote', () => <ElementParagraph eType='PQ'    eValue='<h3>Pullquote</h3>'/>, { notes: "This is pullquote in blockquote element" })
  .add('BQ-M with Attr', () => <ElementParagraph eType='MA'    eValue='<p class="paragraphNummerEins">Blockquote Marginalia with Attribution</p><p class="blockquoteTextCredit" contenteditable="false">Attribution</p>'/>, { notes: "This is Marginalia with attribution in blockquote element" })

 