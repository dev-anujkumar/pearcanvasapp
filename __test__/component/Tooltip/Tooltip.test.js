import React from 'react'
import Tooltip from '../../../src/component/Tooltip/'

let wrapper, useEffect

const mockUseEffect = () => {
    useEffect.mockImplementationOnce(cb => cb())
}

beforeEach(() => {
    useEffect = jest.spyOn(React, "useEffect")
    wrapper = shallow( <Tooltip / > )
    mockUseEffect()
})

xdescribe('Tooltip testing', () => {
    it('Should have 1 tooltip class div', () => {
        expect(wrapper.find('.tooltip')).toHaveLength(1)
    }),

    it('Should have 1 span for tooltip', () => {
        expect(wrapper.find('span')).toHaveLength(1)
    })
})