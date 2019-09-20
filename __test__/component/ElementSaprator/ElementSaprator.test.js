import React from 'react'
import Button from '../../../src/component/ElementButtons/ElementButton.jsx'
import ElementSaprator from '../../../src/component/ElementSaprator/'

let wrapper, useEffect

const mockUseEffect = () => {
    useEffect.mockImplementationOnce(cb => cb())
}

beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect")
    wrapper = shallow( < ElementSaprator / > )
    mockUseEffect()
})

xdescribe('Testing ElementSaprator component', () => {

    describe('UseEffect function', () => {

    }),

    describe('<ElementSaprator/> Rendering', () => {
            it('should have 9 buttons', () => {
                    expect(wrapper.find(Button)).toHaveLength(9)
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