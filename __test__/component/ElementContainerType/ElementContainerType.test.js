import React from 'react';
import { mount } from 'enzyme';
import ElementContainerType from './../../../src/component/ElementContainerType/ElementContainerType';
import { blocktextList, interactiveList } from "../../../fixtures/ElementContainerTypeTestingData";
import config from '../../../src/config/config.js';
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
        const wrapper = mount(<ElementContainerType showPlayscript={true} data={blocktextList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Playscript");
        expect(includes).toBe(true);
    })

    it('Playscript option does not renders when LOB permission is false', () => {
        const wrapper = mount(<ElementContainerType showPlayscript={false} data={blocktextList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Playscript");
        expect(includes).toBe(false);
    })

    it('Add Discussion option renders when LOB permission is true', () => {
        const wrapper = mount(<ElementContainerType showDiscussion={true} data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Discussion");
        expect(includes).toBe(true);
    })

    it('Add Discussion option does not renders when LOB permission is false', () => {
        const wrapper = mount(<ElementContainerType showDiscussion={false} data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Discussion");
        expect(includes).toBe(false);
    })
})

describe('Component renders list in Multicolumn', () => {
    it('Add Show/Hide option renders when Element type is 2C || 3C', () => {
        const wrapper = mount(<ElementContainerType elementType="group" text="interactive-elem-button" data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(true);
    })
    it('Test : ElementContainerType : container-elem-button : true', () => {
        const wrapper = mount(<ElementContainerType elementType="showhide" text="container-elem-button" data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(false);
    })
    it('Test : ElementContainerType : container-elem-button : false', () => {
        const wrapper = mount(<ElementContainerType elementType="group" text="container-elem-button" data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(true);
    })
    it('Test : ElementContainerType : block-text-button', () => {
        const wrapper = mount(<ElementContainerType elementType="group" text="block-text-button" data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(true);
    })
    it('Test : ElementContainerType : multi-column-group', () => {
        const wrapper = mount(<ElementContainerType elementType="group" text="multi-column-group" data={interactiveList} />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(true);
    })
    it('renderMenu ', () => {
        config.isPopupSlate = true
        const asideData = {parent:{type: "groupedcontent"}}
        const wrapper = mount(<ElementContainerType elementType="element-aside" text="block-text-button" data={interactiveList} asideData={asideData}/>)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Add Show Hide");
        expect(includes).toBe(true);
    })
})

describe('Component renders list in Show/Hide', () => {
    it('When Show/Hide is already in Container like Aside,WE,2C or 3C', () => {
        const wrapper = mount(<ElementContainerType  elementType="showhide" data={blocktextList} elementIndex="0-0-0-1" />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Block List");
        expect(includes).toBe(false);
    })
    it('When Show/Hide is on Slate Level', () => {
        const wrapper = mount(<ElementContainerType  elementType="showhide" data={blocktextList} elementIndex="0-0-0" />)
        const texts = wrapper.find('li').map((node) => node.text());
        const includes = texts.includes("Block List");
        expect(includes).toBe(true);
    })
})