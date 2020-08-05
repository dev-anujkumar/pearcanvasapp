import React from 'react';
import { mount, shallow } from 'enzyme';
import ApiResults  from '../../../../src/component/AssessmentSlateCanvas/learningTool/ApiResults';
import {tempFiguresForResults,disciplines,apiResultObject,selectedResult} from '../../../../fixtures/learningTool'
import { spy, stub } from 'sinon';
const selectedFigure = new stub();
xdescribe('Testing Figure Card component with props', () => {
    let props = {
        apiResponseData: apiResultObject,
        selectedResult:selectedResult
      }
    let wrapper = mount( < ApiResults  selectedFigure = {selectedFigure}
         {...props} />) 
    const instance = wrapper.find('ApiResults').instance();
  
    it('should have render component', () => {
        expect(wrapper.find(".learning-tool-margin-left")).toHaveLength(1)
    })

     it('should have apiResultsJsx  component', () => {
        instance.apiResultsJsx(tempFiguresForResults);
    }) 

    })