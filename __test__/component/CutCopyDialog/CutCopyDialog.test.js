import React from 'react'
import CutCopyDialog, * as cutCopyComp from "../../../src/component/CutCopyDialog/CutCopyDialog.jsx"
import { shallow } from 'enzyme';
// import { JSDOM } from 'jsdom'
// global.document = (new JSDOM()).window.Element;
describe("CutCopyDialog - Component testing", () => {
    const props = {
        userRole: "admin",
        index: "1",
        inContainer: false,
        setElementDetails: jest.fn(),
        element: {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "type": "element-authoredtext",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                "text": ""
            },
            "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
        },
        toggleCopyMenu: jest.fn(),
        copyClickedX: 3,
        copyClickedY: 3,
    }
    const wrapper = shallow(<CutCopyDialog {...props} />);
    it('The menu box is mounted', () => {
        expect(wrapper.find('.copy-menu-container')).toHaveLength(1)
    })

    describe("Component methods", () => {
        it("performCutCopy method", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const spyperformCutCopy = jest.spyOn(cutCopyComp, "performCutCopy")
            cutCopyComp.performCutCopy(eventObj, props, 'copy')
            expect(spyperformCutCopy).toHaveBeenCalledWith(eventObj, props, 'copy')
        })
        it("renderCutCopyOption method", () => {
            
            const spyrenderCutCopyOption = jest.spyOn(cutCopyComp, "renderCutCopyOption")
            cutCopyComp.renderCutCopyOption(props)
            expect(spyrenderCutCopyOption).toHaveBeenCalledWith(props)
            expect(spyrenderCutCopyOption).not.toHaveReturnedWith(null)
        })
        xit("copyToClipBoard method", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const spycopyToClipBoard = jest.spyOn(cutCopyComp, "copyToClipBoard")
            cutCopyComp.copyToClipBoard(eventObj, props)
            expect(spycopyToClipBoard).toHaveBeenCalledWith(eventObj, props)
            expect(spycopyToClipBoard).not.toHaveReturnedWith(null)
        })
        
    })
})