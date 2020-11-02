import React from 'react';
import { mount } from 'enzyme';
import ApiResults from '../../../../src/component/AssessmentSlateCanvas/learningTool/ApiResults';
import { tempFiguresForResults, selectedResult } from '../../../../fixtures/learningTool'

jest.mock('../../../../src/component/AssessmentSlateCanvas/learningTool/FigureCard.jsx', () => {
    return function () {
        return (<tr className="modalCard">null</tr>)
    }
})

describe('Testing Learning Tool ApiResults component', () => {
    let props = {
        apiResponseData: tempFiguresForResults,
        selectedResult: selectedResult,
        selectedFigure: jest.fn()
    }
    let wrapper = mount(< ApiResults  {...props} />)
    const instance = wrapper.find('ApiResults').instance();

    it('Render ApiResults', () => {
        expect(wrapper).toHaveLength(1);
        expect(instance).toBeDefined();
    })

})