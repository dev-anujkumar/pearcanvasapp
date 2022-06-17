import React from 'react';
import ListButtonDrop from '../../../src/component/ListButtonDrop/ListButtonDrop.jsx';

jest.mock('../../../src/js/TinyMceUtility.js', () => ({
    isElementInsideBlocklist:() => {
        return false
    },
}));

describe('Testing ListButtonDrop component', () => {
    let spy = sinon.spy();
    let props = {
        activeElement: {
            index: "1"
        },
        slateData: {
            "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e": {
                contents: {
                    bodymatter: [{
                        id: 'urn:pearson:work:dcfbfd07-a00e-4497-bfe8-7a5c2824cb70',
                        type: 'element-list'
                    }]
                }
            }
        },
        onListSelect: spy,
    }
    const wrapper = mount(<ListButtonDrop {...props} />)

    it("Test - ListButtonDrop", () => {
        expect(wrapper).toHaveLength(1);
    })

    it("Test1 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'decimal'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(0).simulate('click', );
    })

    it("Test2 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'upper-alpha'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(1).simulate('click', _listFor, props);
    })

    it("Test3 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'lower-alpha'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(2).simulate('click', _listFor, props);
    })

    it("Test4 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'upper-roman'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(3).simulate('click', _listFor, props);
    })

    it("Test5 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'lower-roman'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(4).simulate('click', _listFor, props);
    })

    it("Test6 - ListButtonDrop", () => {
        document.getElementById = () => {
            return {
                value: "test"
            }
        }
        let _listWrapperDiv = document.querySelector = () => {
            return ""
        }
        _listWrapperDiv.querySelector = () => {
            return {
                classList: {
                    remove: jest.fn()
                }
            }
        }
        let _listFor = 'none'
        let props1 = {
            ...props,
            selectedOption: _listFor
        }
        const wrapper = mount(<ListButtonDrop {...props1} />)
        expect(wrapper).toHaveLength(1);
        wrapper.find('.list-options').at(5).simulate('click', _listFor, props);
    })

    it("numberValidatorHandler onKeyPress -- if", () => {
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            which: 50,
            keycode: 50
        }
        wrapper.find('#listINputBox').at(0).simulate('keyPress', event);
    });

    it("numberValidatorHandler onKeyPress -- else", () => {
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
        }
        wrapper.find('#listINputBox').at(0).simulate('keyPress', event);
    });

    it("handleCtrlV onKeydown", () => {
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            ctrlKey: true,
            which: 86
        }
        wrapper.find('#listINputBox').at(0).simulate('keyDown', event);
    });

    it("handleRightClickCtrlV onPaste", () => {
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        wrapper.find('#listINputBox').at(0).simulate('paste', event);
    });

    it("handleInputSubmit onKeyUp -- else", () => {
        document.getElementById = () => {
            return {
                value: "test",
                classList: {
                    add: jest.fn(),
                    remove: jest.fn()
                },
                querySelector: () => {
                    return {getAttribute: () => { return true }}
                },
            }
        }
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        wrapper.find('#listINputBox').at(0).simulate('keyUp', event, props);
    });

    it("handleInputSubmit click -- if", () => {
        document.getElementById = () => {
            return {
                value: "test",
                classList: {
                    remove: jest.fn()
                },
                querySelector: () => {
                    return {getAttribute: () => { return true }}
                },
            }
        }
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            which: 13,
            keycode: 13
        }
        wrapper.find('#popupGoBtn-1').at(0).simulate('click', event, props, true);
    });

    it("handleInputSubmit click -- else", () => {
        document.getElementById = () => {
            return {
                value: "",
                classList: {
                    add: jest.fn(),
                },
                querySelector: () => {
                    return {getAttribute: () => { return true }}
                },
            }
        }
        let event = {
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        }
        wrapper.find('#popupGoBtn-1').at(0).simulate('click', event, props, true);
    });

})