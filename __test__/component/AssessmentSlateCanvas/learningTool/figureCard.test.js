import React from 'react';
import { mount } from 'enzyme';
import FigureCard from '../../../../src/component/AssessmentSlateCanvas/learningTool/FigureCard';
import {apiResultObject, selectedResult, apiList} from '../../../../fixtures/learningTool'

describe('Testing Learning Tool FigureCard component', () => {
    let props = {
        forInputKey: 2,
        apiResultObject: apiResultObject,
        selectedResult: selectedResult,
        selectedFigure: jest.fn(),
        learningSystems: apiList
    }
    let wrapper = mount(< FigureCard {...props} />)
    const instance = wrapper.find('FigureCard').instance();

    it('Render FigureCard', () => {
        expect(wrapper.find(".modalCard")).toHaveLength(1);
        expect(instance).toBeDefined();
        expect(instance.props.apiResultObject.label.en).toBe("Accounting Sim -1");
        expect(instance.props.apiResultObject.templateid).toBe("W-x02_001");
        jest.spyOn(instance,'figureCardFunction');
        instance.figureCardFunction();
    })

})