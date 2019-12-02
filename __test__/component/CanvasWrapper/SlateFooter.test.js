import React from 'react'
import ReactDOM from 'react-dom';
import {SmalllLoader, LargeLoader} from '../../../src/component/SlateWrapper/ContentLoader'
import { SlateFooter } from '../../../src/component/SlateWrapper/SlateFooter.jsx';
describe('', () => {
   xtest('renders SlateFooter without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<SlateFooter  />, div);
       ReactDOM.unmountComponentAtNode(div);
   })
   test('renders SmalllLoader without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<SmalllLoader  />, div);
       ReactDOM.unmountComponentAtNode(div);
   })
   test('renders LargeLoader without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<LargeLoader  />, div);
       ReactDOM.unmountComponentAtNode(div);
   })
})