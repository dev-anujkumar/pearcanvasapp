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
    it('render default Slate ', () => {
        const component = mount(<SlateHeader slateType='' />);
        expect(component).toMatchSnapshot();
    })
})
describe('onClick Event', () => {

    const onLoadMock = jest.fn();
    const CanvasSlateHeader = mount(<SlateHeader onNavigate={onLoadMock} />)
    let CanvasSlateHeaderInstance = CanvasSlateHeader.find('SlateHeader').instance();

    it('onClick Event', () => {
        CanvasSlateHeaderInstance.handleNavClick("back")
    })
    it('navigate Event ', () => {
        const onLoadMock = jest.fn();
        const component = mount(<SlateHeader onNavigate={onLoadMock} disabled='next' />);
        expect(component.props().onNavigate).toEqual(onLoadMock);
    })
})