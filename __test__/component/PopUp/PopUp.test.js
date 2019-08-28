import React from 'react';
import { mount } from 'enzyme';
import PopUp from '../../../src/component/PopUp';


describe('Testing PopUp component', () => {
    it('render PopUp component ', () => {
        const component = mount(<PopUp />);
        expect(component).toMatchSnapshot();
    })

    it('Testing Popup with props ', () => {
        const component = mount(<PopUp dialogText='Please enter a comment:' placeholder='Type...' rows='5' model={true}/>);
        expect(component).toMatchSnapshot();
    })

    it('Testing Popup with props ', () => {
        const component = mount(<PopUp dialogText='Please enter a comment:' placeholder='Type...' rows='5' model={false}/>);
        expect(component).toMatchSnapshot();
    })
})