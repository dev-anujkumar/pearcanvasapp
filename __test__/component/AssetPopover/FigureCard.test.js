import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import FigureCard from '../../../src/component/AssetPopover/FigureCard';

const selectedFigure = new stub();
let FigureCardProps = {
    path : 'this is path',
    forInputKey : 'key',
    title : 'title',
    selectedFigure : selectedFigure
}

let wrapper;

beforeEach(() => {
    wrapper = mount(<FigureCard {...FigureCardProps}/>)
})

//Rendering test cases
describe('Test Rendering of FigureCard', () => {
    it('Have 1 input element ', () => {
        expect(wrapper.find('input')).toHaveLength(1);
       

    }),
    it('onclange clicked', () => {
        let event = {}
        wrapper.find('input').simulate('change', event);
        const onSearchMock = jest.fn();
        expect(onSearchMock).toHaveBeenCalledTimes(0)
    })
});