import React from 'react';
import { mount , shallow } from 'enzyme';
import sinon from 'sinon'
import PopUp from '../../../src/component/PopUp';


describe('Testing PopUp component', () => {
    it('render PopUp component ', () => {
        const component = mount(<PopUp />);
        expect(component).toMatchSnapshot();
    })

    it('Testing Popup with props ', () => {
        const component = mount(<PopUp dialogText='Please enter a comment:' placeholder='Type...' rows='5' active={true}/>);
        expect(component).toMatchSnapshot();
    })

    it('Testing Popup with props ', () => {
        const component = mount(<PopUp dialogText='Please enter a comment:' placeholder='Type...' rows='5' active={false}/>);
        expect(component).toMatchSnapshot();
    })
    
    it('onClick Event', () => {
        let togglePopup= sinon.stub()
        const component = mount(<PopUp togglePopup={togglePopup}/>);
        component.find('span.close').simulate('click');
        component.find('span#close-container').simulate('click');
   })
})