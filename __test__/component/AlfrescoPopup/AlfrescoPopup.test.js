import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import AlfrescoPopup from "../../../src/component/AlfrescoPopup/AlfrescoPopup.jsx";
import Select from '@mui/material/Select';
import { act } from "react-dom/test-utils";

//Constants
const PRIMARY_BUTTON = "primary";
const SECONDARY_BUTTON = "secondary";

React.useRef = (value) => {
    if (value === null) {
        return {
            current: {
                classList: {
                    contains: () => false,
                    add: () => jest.fn(),
                    remove: () => jest.fn(),
                }
            }
        };
    } else {
        return {
            current: SECONDARY_BUTTON
        };
    }
}

jest.mock('../../../src/constants/utility.js', () => {
    return {
        sendDataToIframe: () => {
            return "testing"
        },
        getPrimaryButtonClass: (selectedOption, focusedButton) => {
            if(selectedOption !== '' && focusedButton === PRIMARY_BUTTON) {
                return "active-button-class primary";
            } else if(selectedOption !== '' && focusedButton !== PRIMARY_BUTTON) {
                return "active-button-class";
            } else if(selectedOption === '' && focusedButton === PRIMARY_BUTTON) {
                return "primary";
            } else {
                return null;
            }
        },
        handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
    }
})

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

let initialState = {
    alfrescoReducer: {
        elementId: 5,
        isInlineEditorOpen: false,
        locationData: {
            role: 'SiteCoordinator',
            visibility: 'MODERATED',
            guid: '6eb551b3-a5d0-46c6-a389-5a773ee2b772',
            id: 'cite-patterns-content-design',
            preset: 'site-dashboard',
            title: 'CITE Patterns Content Design'
        },
        calledFromGlossaryFootnote: false,
        calledFromImageGlossaryFootnote: false
    },
    alfrescoPopup: jest.fn(),
    saveSelectedAlfrescoElement: jest.fn()
}

describe('Testing AlfrescoPopup component', () => {
    let store = mockStore(initialState);
    let props = {
        alfrescoListOption: [{"entry":{"site":{"role":"SiteCollaborator","visibility":"MODERATED","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc","preset":"site-dashboard","title":"001_C5 Media POC"},"role":"SiteCollaborator","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":"c5-media-poc"}},{"entry":{"site":{"role":"SiteCoordinator","visibility":"MODERATED","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":"cite-patterns-content-design","preset":"site-dashboard","title":"CITE Patterns Content Design"},"role":"SiteCoordinator","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":"cite-patterns-content-design"}}],
        alfrescoReducer: {
            elementId: 5,
            isInlineEditorOpen: false,
            locationData: "",
            calledFromGlossaryFootnote: false,
            calledFromImageGlossaryFootnote: false
        },
        alfrescoPath: {
            alfresco:{},
            etag: "etagvalue",
            id:"test",
        },
        style: {
            width: 360,
            height: 208
        },
        handleCloseAlfrescoPicker: jest.fn(),
        alfrescoPopup: jest.fn(),
        saveSelectedAlfrescoElement: jest.fn(),
    }

    it('AlfrescoPopup Container', () => {
        const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
        expect(wrapper.find('AlfrescoPopup')).toHaveLength(1);
    });
    
    describe("Testing handleKeyDown() Method", () => {
        it("Testing handleKeyDown() for keyCode=39 ", () => {
            React.useRef = (value) => {
                if (value === null) {
                    return {
                        current: {
                            classList: {
                                contains: () => false,
                                add: () => jest.fn(),
                                remove: () => jest.fn(),
                            }
                        }
                    };
                } else {
                    return {
                        current: SECONDARY_BUTTON
                    };
                }
            }
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            act(() => {
                wrapper.find(Select).at(0).props().onChange({ target: { value: 'c5-media-poc' } });
            })
            const cancelButton = wrapper.find("button.secondary");
            expect(cancelButton.hasClass('secondary'));
            let event = new KeyboardEvent('keydown', {keyCode: 39});
            document.dispatchEvent(event);
        });

        it("Testing handleKeyDown() for keyCode=37 ", () => {
            React.useRef = () => {
                return {
                    current: PRIMARY_BUTTON
                };
            }
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            act(() => {
                wrapper.find(Select).at(0).props().onChange({ target: { value: 'c5-media-poc' } });
            })
            const cancelButton = wrapper.find("button.secondary");
            expect(cancelButton.hasClass('secondary'));
            let event = new KeyboardEvent('keydown', {keyCode: 37});
            document.dispatchEvent(event);
            expect(wrapper.find("button.secondary").hasClass('secondary'));
        });

        it("Testing handleKeyDown() for keyCode=13 ", () => {
            React.useRef = () => {
                return {
                    current: null
                };
            }
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            const spy = jest.spyOn(document, 'dispatchEvent');
            let event = new KeyboardEvent('keydown', {keyCode: 13});
            document.dispatchEvent(event);
            expect(spy).toBeCalled();
        });

        it("Testing handleKeyDown() for keyCode=27 ", () => {
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            const spy = jest.spyOn(document, 'dispatchEvent');
            let event = new KeyboardEvent('keydown', {keyCode: 27});
            document.dispatchEvent(event);
            expect(spy).toBeCalled();
        });
        it('AlfrescoPopup handleClose',() => {
            const mockFn = jest.fn()
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            const button = wrapper.find('button.secondary').at(0)
            button.simulate('click')
            expect(mockFn).toBeTruthy()
        })
        it('AlfrescoPopup handleChange',() => {
            const handleChange = jest.fn()
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            act(() => {
                wrapper.find(Select).at(0).props().onChange({ target: { value: 'c5-media-poc' } });
            })
            expect(handleChange).toBeTruthy();
        })
    });
});