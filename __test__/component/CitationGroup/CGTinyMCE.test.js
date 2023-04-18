import React from 'react'
import * as cgtinymceFunction from '../../../src/component/CitationGroup/CGTinyMCE.jsx'

describe('Testing CGTinyMCE methods', () => {
    const context = {
        handleBlur : jest.fn(),
    }
    it('createPopupUnit', () => {
        const props = {
            createPopupUnit : jest.fn(),
        }
        const spycreatePopupUnit = jest.spyOn(cgtinymceFunction, 'createPopupUnit')
        cgtinymceFunction.createPopupUnit(null, null, "2-0", {}, props, context)
        expect(spycreatePopupUnit).toHaveBeenCalled()
    }) 
    it('createPopupUnit > if', () => {
        const props = {
            createPopupUnit : jest.fn(),
            citationAsideData: {
                parent: {
                    type: "showhide"
                }
            }
        }
        const spycreatePopupUnit = jest.spyOn(cgtinymceFunction, 'createPopupUnit')
        cgtinymceFunction.createPopupUnit(null, null, "2-0", {}, props, context)
        expect(spycreatePopupUnit).toHaveBeenCalled()
    })  
})