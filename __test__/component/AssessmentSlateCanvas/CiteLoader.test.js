import React from 'react';
import { mount } from 'enzyme';
import CiteLoader from '../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteLoader/CiteLoader.jsx';

let props1 = {
    isLoading: true
}
let props2 = {
    isLoading: false,
    citeErrorFlag: false
}
let props3 = {
    isLoading: false,
    citeErrorFlag: true
}
describe('Testing ElmUpdateButton component', () => {
    it('Test 1- While Loading', () => {
        mount(<CiteLoader {...props1} />)
    })
    it('Test 2- With citeErrorFlag not present', () => {
        mount(<CiteLoader {...props2} />)
    })
    it('Test 2- With citeErrorFlag present', () => {
        mount(<CiteLoader {...props3} />)
    })
});