import React from 'react';
import { mount } from 'enzyme';
import ElementContainerType from './../../../src/component/ElementContainerType/ElementContainerType';
let props = {
    closeDropDown:jest.fn(),
    data: [
        {
            "buttonType": "interactive-elem",
            "text": "Add MMI",
            "buttonHandler":jest.fn()
        },
        {
            "buttonType": "smartlink-elem",
            "text": "Add SmartLink",
            "buttonHandler":jest.fn()
        },
        {
            "buttonType": "popup-elem",
            "text": "Add Popup",
            "buttonHandler":jest.fn()
        },
        {
            "buttonType": "show-hide-elem",
            "text": "Add Show/ Hide",
            "buttonHandler":jest.fn()
        }
    ]
        
    
}
let wrapper = mount(<ElementContainerType  {...props} />)
describe('ContainerType Component', () => {
    it('render without crashing', () => {
        expect(wrapper.find('ElementContainerType')).toHaveLength(1);
})
it('On click handler', () => {
  
    const wrapperInstance = wrapper.find('ElementContainerType').instance();
   // const wrapperInstancebuttonHandler = jest.spyOn(wrapperInstance, 'buttonHandlerFunc')
   console.log(wrapper.debug())
    wrapper.find("li").first().simulate('click');
    //expect(wrapperInstancebuttonHandler).toHaveBeenCalled()
    //wrapperInstancebuttonHandler.mockClear()
})
})