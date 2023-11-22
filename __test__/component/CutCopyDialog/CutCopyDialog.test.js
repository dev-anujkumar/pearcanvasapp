import React from 'react'
import CutCopyDialog, * as cutCopyComp from "../../../src/component/CutCopyDialog/CutCopyDialog.jsx"
import config from '../../../src/config/config.js';
import { shallow } from 'enzyme';
import { JSDOM } from 'jsdom'
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
global.document.execCommand = () => true
global.document.getElementById = () => {
    return {
        innerText: "",
        style: {
            display: "block"
        }
    }
}

let initialState = {
    autoNumberReducer: {
        popupParentSlateData: {
            isPopupSlate: true
        }
    },
    appStore: {
        slateLevelData: {}
    }
}
let store = mockStore(() => initialState);
config.isPopupSlate = true


jest.mock('../../../src/component//TcmSnapshots/TcmSnapshot_Actions', () => {
    return {
        getLatestVersion: jest.fn(() => { return "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e22" })
    }
})
describe("CutCopyDialog - Component testing", () => {
    const props = {
        userRole: "admin",
        index: "1",
        inContainer: false,
        setElementDetails: jest.fn(),
        handleBlur: jest.fn(),
        element: {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "type": "figure",
            "subtype": "",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "elementdata": {
                "type": "blockquote",
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
        slateLevelData: {}
    }
    const props1 = {
        userRole: "admin",
        index: "1",
        inContainer: false,
        setElementDetails: jest.fn(),
        element: {
            "id": "urn:pearson:8a49e877-144a-4750-92d2-81d5188d8e0a",
            "type": "groupedcontent",
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
        slateLevelData: {}
    }
    const wrapper = shallow(<CutCopyDialog {...props} />);
    const wrapper1 = shallow(<CutCopyDialog {...props1} />);
    const wrapper2 = mount(<Provider store={store}><CutCopyDialog {...props} /></Provider>);
    it('The menu box is mounted : "work"', () => {
        expect(wrapper.find('.copy-menu-container')).toHaveLength(1)
    })
    it('The menu box is mounted : "manifest', () => {
        expect(wrapper1.find('.copy-menu-container')).toHaveLength(1)
    })

    it('testing onClick events', () => {
        wrapper2.find('.copyUrn').at(0).simulate("click");
        wrapper2.find('.copyUrn').at(1).simulate("click");
        wrapper2.find('.copyUrn').at(2).simulate("click");
        wrapper2.find('.copyUrn').at(3).simulate("click");
        wrapper2.find('.blockerBgDiv').simulate("click");
    })

    describe("Component methods", () => {
        it("performCutCopy method", () => {
            const eventObj = {
                getState: store.getState,
                stopPropagation: jest.fn(),
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
        it("renderCutCopyOption method - returning null dom", () => {
            const props1 = {
                userRole: "reviewer",
                element: {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a"
                }
            }
            const spyrenderCutCopyOption = jest.spyOn(cutCopyComp, "renderCutCopyOption")
            cutCopyComp.renderCutCopyOption(props1)
            expect(spyrenderCutCopyOption).toHaveBeenCalledWith(props1)
            expect(spyrenderCutCopyOption).toHaveReturnedWith(null)
        })
        it("copyToClipBoard method", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const props = {
                userRole: "admin",
                index: "1",
                inContainer: false,
                setElementDetails: jest.fn(),
                element: {
                    "type": "groupedcontent",
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
                slateLevelData: {},
            }
            const spycopyToClipBoard = jest.spyOn(cutCopyComp, "copyToClipBoard")
            cutCopyComp.copyToClipBoard(eventObj, props)
            expect(spycopyToClipBoard).toHaveBeenCalledWith(eventObj, props)
            expect(spycopyToClipBoard).not.toHaveReturnedWith(null)
        })
        it("copyToClipBoard method : if > else", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const spycopyToClipBoard = jest.spyOn(cutCopyComp, "copyToClipBoard")
            cutCopyComp.copyToClipBoard(eventObj, props1)
            expect(spycopyToClipBoard).toHaveBeenCalledWith(eventObj, props1)
            expect(spycopyToClipBoard).not.toHaveReturnedWith(null)
        })
        it("copyToClipBoard method: fetching latest manifest urn", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const props2 = {
                ...props1,
                element: {
                    ...props1.element,
                    "id": "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0a",
                }
            }
            const spycopyToClipBoard = jest.spyOn(cutCopyComp, "copyToClipBoard")
            cutCopyComp.copyToClipBoard(eventObj, props2)
            expect(spycopyToClipBoard).toHaveBeenCalledWith(eventObj, props2)
            expect(spycopyToClipBoard).not.toHaveReturnedWith(null)
        })
        it("hideAPOOnOuterClick method", () => {
            const eventObj = {
                stopPropagation: jest.fn()
            }
            const toggleFn = jest.fn()
            const spyhideAPOOnOuterClick = jest.spyOn(cutCopyComp, "hideAPOOnOuterClick")
            cutCopyComp.hideAPOOnOuterClick(eventObj, toggleFn)
            expect(spyhideAPOOnOuterClick).toHaveBeenCalledWith(eventObj, toggleFn)
            expect(toggleFn).toHaveBeenCalled()
        })
    })
})