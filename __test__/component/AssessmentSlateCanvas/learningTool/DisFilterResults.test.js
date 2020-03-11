import React from 'react';
import { mount, shallow } from 'enzyme';
import DisFilterResults  from '../../../../src/component/AssessmentSlateCanvas/learningTool/DisFilterResults';
import {tempFiguresForResults,disciplinesForLearningTool,apiResultObject,selectedResult} from '../../../../fixtures/learningTool'
import { spy, stub } from 'sinon';
const selectedFigure = new stub();
describe('Testing Figure Card component with props', () => {
    let props = {
        apiResponseForDis: disciplinesForLearningTool,
        selectedResult:selectedResult
      }
    let wrapper = mount( < DisFilterResults   selectedFigure = {selectedFigure}
         {...props} />) 
    const instance = wrapper.find('DisFilterResults').instance();

     it('should have disApiResultsJsx  component', () => {
        expect(typeof(instance.disApiResultsJsx (disciplinesForLearningTool))).toBe('object');
    }) 
})
describe('Testing Figure Card component without props', () => {
  let props = {
      apiResponseForDis: [],
      selectedResult:selectedResult
    }
  let wrapper = mount( < DisFilterResults   selectedFigure = {selectedFigure}
       {...props} />) 
  const instance = wrapper.find('DisFilterResults').instance();

   it('should have disApiResultsJsx  component', () => {
    expect(typeof(instance.disApiResultsJsx ([]))).toBe('object');
  }) 
})