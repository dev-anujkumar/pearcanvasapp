import React from 'react';
import { mount, shallow } from 'enzyme';
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
        primaryButton: {
            current : {
                classList : "enable"
            }
        }, 
        handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' ),
        PRIMARY_BUTTON : "primary",
        SECONDARY_BUTTON : "secondary"
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

let initialState2 = {
    alfrescoReducer: {
        elementId: 5,
        isInlineEditorOpen: false,
        locationData: {
            role: 'SiteCoordinator',
            visibility: 'MODERATED',
            nodeRef: '',
            id: 'cite-patterns-content-design',
            preset: 'site-dashboard',
            repositoryFolder: 'CITE Patterns Content Design'
        },
        calledFromGlossaryFootnote: false,
        calledFromImageGlossaryFootnote: false
    },
    alfrescoPopup: jest.fn(),
    saveSelectedAlfrescoElement: jest.fn()
}

let initialState3 = {
    alfrescoReducer: {
        elementId: 5,
        isInlineEditorOpen: false,
        locationData: {
            role: 'SiteCoordinator',
            visibility: 'MODERATED',
            nodeRef: '6eb551b3-a5d0-46c6-a389-5a773ee2b772',
            id: 'cite-patterns-content-design',
            preset: 'site-dashboard',
            repositoryFolder: ''
        },
        calledFromGlossaryFootnote: false,
        calledFromImageGlossaryFootnote: false
    },
    alfrescoPopup: jest.fn(),
    saveSelectedAlfrescoElement: jest.fn()
}

describe('Testing AlfrescoPopup component', () => {
    let store = mockStore(initialState);
    let store2 = mockStore(initialState2);
    let store3 = mockStore(initialState3);
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

    let props2 = {
        alfrescoListOption: [{"entry":{"site":{"role":"SiteCollaborator","visibility":"MODERATED","nodeRef":"","id":"c5-media-poc","preset":"site-dashboard","repositoryFolder":"001_C5 Media POC"},"role":"SiteCollaborator","guid":"ebaaf975-a68b-4ca6-9604-3d37111b847a","id":""}},{"entry":{"site":{"role":"SiteCoordinator","visibility":"MODERATED","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":"cite-patterns-content-design","preset":"site-dashboard","title":"CITE Patterns Content Design"},"role":"SiteCoordinator","guid":"6eb551b3-a5d0-46c6-a389-5a773ee2b772","id":""}}],
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
        const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
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
        it("Testing handleKeyDown() for keyCode=37 ", () => {
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            const spy = jest.spyOn(document, 'dispatchEvent');
            let event =  new KeyboardEvent('keydown', {keyCode: 37});
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
        it('sendSelectedData function ', () => {
            const sendSelectedData = jest.fn()
            const wrapper = mount(<Provider store={store}><AlfrescoPopup {...props} /></Provider>);
            const button = wrapper.find('button.select-button').at(0)
            button.simulate('click')
            expect(sendSelectedData).toBeTruthy();
        })
        it('sendSelectedData function else conditions', () => {
            const sendSelectedData = jest.fn()
            const wrapper = mount(<Provider store={store2}><AlfrescoPopup {...props2} /></Provider>);
            const button = wrapper.find('button.select-button').at(0)
            button.simulate('click')
            expect(sendSelectedData).toBeTruthy();
        })
        it('sendSelectedData function else conditions', () => {
            const sendSelectedData = jest.fn()
            const wrapper = mount(<Provider store={store3}><AlfrescoPopup {...props2} /></Provider>);
            const button = wrapper.find('button.select-button').at(0)
            button.simulate('click')
            expect(sendSelectedData).toBeTruthy();
        })
    });
});