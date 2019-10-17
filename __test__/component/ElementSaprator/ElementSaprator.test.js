import React from 'react'
import Button from '../../../src/component/ElementButtons/ElementButton.jsx'
import ElementSaprator from '../../../src/component/ElementSaprator/'
import {renderDropdownButtons, addMediaClickHandler} from '../../../src/component/ElementSaprator/ElementSaprator.jsx'
import config from '../../../src/config/config.js';
import {shallow, mount} from 'enzyme';

let wrapper, useEffect, esProps

function splithandlerfunction(type) {
    console.log(type);
}

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
        buttonType: 'interactive-elem',
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

const mockUseEffect = () => {
    let document = {
        addEventListener : jest.fn()
    }
    let getParents = jest.fn();
    useEffect.mockImplementationOnce(cb => {
        return jest.fn()
    })
}

beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect")
    wrapper = shallow( < ElementSaprator esProps={esProps} /> )
    mockUseEffect()
})

describe('Testing ElementSaprator component', () => {

    describe('UseEffect function', () => {
        let tempWrapper = mount( < ElementSaprator esProps={esProps}/> )
    }),

    describe('<ElementSaprator/> Rendering', () => {

                it('Should have 1 <hr/>', () => {
                    expect(wrapper.find('hr')).toHaveLength(1)
                }),

                it('Should have 1 dropdown', () => {
                    expect(wrapper.find('.dropdown')).toHaveLength(1)
                }),
                it('Should render ', () => {
                    config.slateType = 'container-introduction';
                    config.isCO = false;
                    let tempWrapper = shallow( < ElementSaprator esProps={esProps}/> )
                })
        }),

    describe('<ElementSaprator/> interactions', () => {
        it('Should call the onClick function when \'Split slate\' button is clicked', () => {
                wrapper.find(Button).at(0).simulate('click')
            }),

        it('Should call the onClick function when \'expend\' button is clicked', () => {
            wrapper.find(Button).at(1).simulate('click')
        }),

        describe('Expend Button interactions', () => {
            describe('On click Expend button', () => {
                it('On click Expend button dropdown should be render', () => {
                    wrapper.find('.dropdown').hasClass('dropdown-content show')
                }),
                it('Click on dropdown buttons', () => {
                    wrapper.find(Button).at(2).simulate('click')
                    wrapper.find(Button).at(3).simulate('click')
                    wrapper.find(Button).at(4).simulate('click')
                    wrapper.find(Button).at(5).simulate('click')
                    wrapper.find(Button).at(6).simulate('click')
                }) 
            })
        })
    })
})

describe('Testing functions', () => {
    it ('Testing renderDropdownButtons function', () => {
        let slateType = 'container-introduction', closeDropDown;
        let elementType = 'element-aside';
        let sectionBreak = true;

        renderDropdownButtons(esProps, slateType, elementType, sectionBreak, closeDropDown)
    }),
    it ('Testing renderDropdownButtons function else part', () => {
        let slateType = 'container-introduction', closeDropDown;
        let elementType = 'element-aside';
        let sectionBreak = false;
        
        renderDropdownButtons(esProps, slateType, elementType, sectionBreak, closeDropDown)
    }),
    it('Testing addMediaClikHandler', () => {
        addMediaClickHandler()
    }),
    it('simulate dropbtn button onclick', () => {
        config.PERMISSIONS = ['elements_add_remove']

        let samplediv = document.createElement('div');
        samplediv.setAttribute('class', 'show' );
        samplediv.innerHTML = "test";
        document.body.appendChild(samplediv);

        let tempWrapper = mount( <ElementSaprator esProps={esProps}/> )
        tempWrapper.find('.dropbtn').simulate('click');
    }),
    it('simulate splitSlateClickHandler ', () => {
        config.PERMISSIONS = ['elements_add_remove']
        let tempWrapper = mount( <ElementSaprator esProps={esProps}/> )
        tempWrapper.find(Button).at(0).simulate('click');
    })
})