import React from 'react';
import SlateHeader from '../../../src/component/CanvasSlateHeader';


describe('Testing SlateHeader component with props', () => {

    it('render SlateHeader component ', () => {
        const component = mount(<SlateHeader />);
        expect(component).toMatchSnapshot();
    })

    it('render container-introduction Slate ', () => {
        const component = mount(<SlateHeader slateType='container-introduction' />);
        expect(component).toMatchSnapshot();
    })

    it('render assessment Slate ', () => {
        const component = mount(<SlateHeader slateType='assessment' />);
        expect(component).toMatchSnapshot();
    })

    it('render section Slate ', () => {
        const component = mount(<SlateHeader slateType='section' />);
        expect(component).toMatchSnapshot();
    })

    it('onClick Event', () => {
        const component = mount(<SlateHeader />);
        component.find('span#backward-nav-active').simulate('click');
        component.find('span#forward-nav-active').simulate('click');
    })
})