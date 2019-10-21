import React from 'react';
import { mount, shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import FigureCard from '../../../../src/component/AssessmentSlateCanvas/learningTool/FigureCard';
import {tempFiguresForResults,disciplines,apiResultObject,selectedResult} from '../../../../fixtures/learningTool'
import { spy, stub } from 'sinon';
const selectedFigure = new stub();
describe('Testing Figure Card component with props', () => {
    let props = {
        apiResultObject: apiResultObject,
        selectedResult:selectedResult
      }
    let wrapper = mount( < FigureCard selectedFigure = {selectedFigure}
         {...props} />) 
    const instance = wrapper.find('FigureCard').instance();
  
    it('should have render component', () => {
        expect(wrapper.find(".inputElem")).toHaveLength(1)
    })

    it('should have figureCardFunction component', () => {
        instance.figureCardFunction();
    })

    })