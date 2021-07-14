import React from 'react';
import { mount } from 'enzyme';
import ElementContainerType from './../../../src/component/ElementContainerType/ElementContainerType';
import { blocktextList, interactiveList } from "../../../fixtures/ElementContainerTypeTestingData";
let props = {
    closeDropDown: jest.fn(),
    data: [
        {
            "buttonType": "interactive-elem",
            "text": "Add MMI",
            "buttonHandler": jest.fn()
        },
        {
            "buttonType": "smartlink-elem",
            "text": "Add SmartLink",
            "buttonHandler": jest.fn()
        },
        {
            "buttonType": "popup-elem",
            "text": "Add Popup",
            "buttonHandler": jest.fn()
        },
        {
            "buttonType": "show-hide-elem",
            "text": "Add Show/ Hide",
            "buttonHandler": jest.fn()
        }
    ]


}

let wrapper = mount(<ElementContainerType  {...props} />)
describe('ContainerType Component', () => {
    it('render without crashing', () => {
        expect(wrapper.find('ElementContainerType')).toHaveLength(1);
    })
    it('On click handler', () => {
        wrapper.find("li").first().simulate('click');
    })
})

describe('Component renders List according to LOB permissions', () => {
    it('Playscript option renders when LOB permission is true', () => {
        const wrapper = mount(<ElementContainerType  showPlayscript={true} data={blocktextList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Playscript");
        expect(includes).toBe(true);
    })

    it('Playscript option does not renders when LOB permission is false', () => {
        const wrapper = mount(<ElementContainerType  showPlayscript={false} data={blocktextList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Playscript");
        expect(includes).toBe(false);
    })

    it('Add Discussion option renders when LOB permission is true', () => {
        const wrapper = mount(<ElementContainerType  showDiscussion={true} data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Discussion");
        expect(includes).toBe(true);
    })

    it('Add Discussion option does not renders when LOB permission is false', () => {
        const wrapper = mount(<ElementContainerType  showDiscussion={false} data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Discussion");
        expect(includes).toBe(false);
    })
})