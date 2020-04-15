import React from 'react'
import * as cgtinymceFunction from '../../../src/component/CitationGroup/CGTinyMCE.jsx'

describe('Testing CGTinyMCE methods', () => {
    const context = {
        handleBlur : jest.fn(),
    }
    const props = {
        createPopupUnit : jest.fn(),
    }
    it('createPopupUnit', () => {
        const spycreatePopupUnit = jest.spyOn(cgtinymceFunction, 'createPopupUnit')
        cgtinymceFunction.createPopupUnit(null, null, "2-0", {}, props, context)
        expect(spycreatePopupUnit).toHaveBeenCalled()
    })  
})