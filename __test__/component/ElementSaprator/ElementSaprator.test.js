import React from 'react'
import Button from '../../../src/component/ElementButtons/ElementButton.jsx'
import ElementSaprator from '../../../src/component/ElementSaprator/'

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
    useEffect.mockImplementationOnce(cb => cb())
}

beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect")
    wrapper = shallow( < ElementSaprator esProps={esProps}/ > )
    mockUseEffect()
})

describe('Testing ElementSaprator component', () => {

    describe('UseEffect function', () => {

    }),

    describe('<ElementSaprator/> Rendering', () => {
            it('should have 9 buttons', () => {
                    expect(wrapper.find(Button)).toHaveLength(10)
                }),

                it('Should have 1 <hr/>', () => {
                    expect(wrapper.find('hr')).toHaveLength(1)
                }),

                it('Should have 1 dropdown', () => {
                    expect(wrapper.find('.dropdown')).toHaveLength(1)
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
                    wrapper.find(Button).at(7).simulate('click')
                    wrapper.find(Button).at(8).simulate('click')
                }) 
            })
        })



    })

})