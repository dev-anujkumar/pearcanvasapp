import * as CopyUtilMethods from "../../../src/component/CutCopyDialog/copyUtil.js"

describe("Cut/Copy utility methods", () => {
    it("OnCopyContext method", () => {
        const eventObj = {
            currentTarget: {
                classList:  {
                    contains: () => true
                }
            },
            clientX: 0,
            clientY: 0,
            preventDefault: jest.fn()
        }
        const toggleFunction = jest.fn()
        const spyOnCopyContext = jest.spyOn(CopyUtilMethods, "OnCopyContext")
        CopyUtilMethods.OnCopyContext(eventObj, toggleFunction, true)
        expect(spyOnCopyContext).toHaveBeenCalledWith(eventObj, toggleFunction, true)
        expect(toggleFunction).toHaveBeenCalled()
    })
    it("getParentPosition method - Body tag", () => {
        const elementObj = {
            tagName: "BODY",
            scrollLeft: 0,
            scrollTop: 0,
            offsetLeft: 0,
            clientLeft: 0,
            offsetTop: 0,
            clientTop: 0,
            offsetParent: {}
        }
        const spygetParentPosition = jest.spyOn(CopyUtilMethods, "getParentPosition")
        CopyUtilMethods.getParentPosition(elementObj)
        expect(spygetParentPosition).toHaveBeenCalledWith(elementObj)
    })
})