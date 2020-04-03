import React from 'react'
import Button from '../../../src/component/ElementButtons/ElementButton.jsx'
import ElementSaprator from '../../../src/component/ElementSaprator/'
import {renderDropdownButtons, addMediaClickHandler} from '../../../src/component/ElementSaprator/ElementSaprator.jsx'
import config from '../../../src/config/config.js';
import {shallow, mount} from 'enzyme';
const METADATA_ANCHOR = 'metadata-anchor',
ELEMENT_ASIDE = 'element-aside',
CONTAINER_INTRO = 'container-introduction'
let esProps

function splithandlerfunction(type) {
    return ;
}
let propsData={data:[],
    setData:jest.fn(),
    showInteractiveOption:{},
    setshowInteractiveOption:jest.fn(),
    props:{}}

esProps = [
    {
        buttonType: 'text-elem',
        buttonHandler: () => splithandlerfunction('text-elem'),
        tooltipText: 'Text',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'image-elem',
        buttonHandler: () => splithandlerfunction('image-elem'),
        tooltipText: 'Image',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'audio-elem',
        buttonHandler: () => splithandlerfunction('audio-elem'),
        tooltipText: 'Audio/Video',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'interactive-elem-button',
        buttonHandler: () => splithandlerfunction('interactive-elem'),
        tooltipText: 'Interactive',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'assessment-elem',
        buttonHandler: () => splithandlerfunction('assessment-elem'),
        tooltipText: 'Assessment',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'container-elem',
        buttonHandler: () => splithandlerfunction('container-elem'),
        tooltipText: 'Container',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'worked-exp-elem',
        buttonHandler: () => splithandlerfunction('worked-exp-elem'),
        tooltipText: 'Worked Example',
        tooltipDirection: 'left'
    },
    {
        buttonType: 'opener-elem',
        buttonHandler: () => splithandlerfunction('opener-elem'),
        tooltipText: 'Opener Element',
        tooltipDirection: 'left'
    }
]

describe('Testing ElementSaprator rendering', () => {
    it('Render ElementSaprator with props split_slate permission', () => {
        let permissions = ['split_slate'];
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn()
        }
        let Es = mount(<ElementSaprator {...props} esProps = {esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/>);
    })

    it('Render ElementSaprator with props elements_add_remove permission', () => {
        let permissions = ['elements_add_remove'];
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn()
        }
        let Es = mount(<ElementSaprator {...props} esProps = {esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/>);
    })
});

describe('Testing functions', () => {
    it('addMediaClickHandler testing', () => {
        addMediaClickHandler();
    })

    it('splitSlateClickHandler  testing', () => {
        let tempWrapper;
        let props = {
            permissions: ['split_slate'],
            onClickCapture: jest.fn()
        }
        
        tempWrapper = mount(<ElementSaprator esProps={esProps} {...props}/>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : true,
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })

    
    it('splitSlateClickHandler else testing', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
            openAudio: true
        }
        tempWrapper = mount(<ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })
    it('splitSlateClickHandler else-if testing', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
        }
        tempWrapper = mount(<ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })
    

    it('toggleElementList  testing', () => {
        let tempWrapper;
        let props = {
            permissions: ['elements_add_remove'],
            onClickCapture: jest.fn()
        }
        
        let samplediv = document.createElement('div');
        let samplediv1 = document.createElement('div');
        samplediv.setAttribute('class', 'show' );
        samplediv1.setAttribute('class', 'show' );
        document.body.appendChild(samplediv);
        document.body.appendChild(samplediv1);

        tempWrapper = mount(<ElementSaprator esProps={esProps} {...props}/>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : true,
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(0).simulate('click');
    })

    it('buttonhandler', () => {
        let tempWrapper;
        let permissions = ['split_slate', 'elements_add_remove']
        let elementType  = 'test';
        let firstOne = false;
        let props = {
            onClickCapture: jest.fn(),
        }
        tempWrapper = mount(<ElementSaprator {...props} esProps={esProps} permissions ={permissions} elementType = {elementType} firstOne= {firstOne}/>)
        tempWrapper.setProps({
            toggleSplitSlatePopup : jest.fn(),
            showAudioSplitPopup: jest.fn()
        })
        tempWrapper.find(Button).at(5).simulate('click');
    })
    
    it('Testing renderDropdownButtons function if condition',() => {
        let elementType = ''
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = CONTAINER_INTRO;
        config.isCO = false;
        config.isLOL = true;

        let samplediv2 = document.createElement('div');
        samplediv2.setAttribute('class', METADATA_ANCHOR );
        document.body.appendChild(samplediv2);

        renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown,propsData)
    })

    it('Testing renderDropdownButtons function isCO else condition',() => {
        let elementType = ''
        let sectionBreak = ''
        let closeDropDown = ''
        config.slateType = CONTAINER_INTRO;
        config.isCO = true;
        config.isLOL = true;

        let samplediv2 = document.createElement('div');
        samplediv2.setAttribute('class', METADATA_ANCHOR );
        document.body.appendChild(samplediv2);

        renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    
    it('Testing renderDropdownButtons function ELEMENT_ASIDE if condition',() => {
        let elementType = ELEMENT_ASIDE
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;

        config.parentEntityUrn = 'Front Matter' 
        config.parentEntityUrn = 'Back Matter'

        renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderDropdownButtons function ELEMENT_ASIDE if-else condition',() => {
        let elementType = ''
        let sectionBreak = true
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;

        config.parentEntityUrn = 'Front Matter' 
        config.parentEntityUrn = 'Back Matter'

        renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })

    it('Testing renderDropdownButtons function ELEMENT_ASIDE else condition',() => {
        let elementType = ELEMENT_ASIDE
        let sectionBreak = false
        let closeDropDown = ''
        config.slateType = 'adsdfsdf';
        config.isCO = true;
        config.isLOL = true;
        renderDropdownButtons(esProps, elementType, sectionBreak, closeDropDown, propsData)
    })
});