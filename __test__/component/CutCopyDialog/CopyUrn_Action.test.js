import React from 'react'
import * as actions from "../../../src/component/CutCopyDialog/CopyUrn_Action"

describe("Cut/Copy Action creators", () => {
    it("setSelection action", () => {
        const SET_SELECTION = "SET_SELECTION"

        const expectedAction = {
            type: SET_SELECTION,
            payload: {}
        }
        const spysetSelection = jest.spyOn(actions, "setSelection")
        actions.setSelection({})
        expect(spysetSelection).toHaveReturnedWith(expectedAction)
    })
})