import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../src/component/Sidebar';
import { updateElement } from './../../../src/component/Sidebar/Sidebar_Action';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import slateLevelData from './slateData';

describe('Test for Sidebar component', () => {
    const mockStore = configureMockStore(middlewares);

    const activeElement = {
        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        elementType: "element-authoredtext",
        elementWipType: "element-authoredtext",
        primaryOption: "primary-heading",
        secondaryOption: "secondary-heading-1",
        index: "1-0",
        tag: "H1"
    };
    
    const sidebarWithData = mockStore({
        appStore: {
            activeElement,
            updateElement,
            slateLevelData,
        },
        metadataReducer: {
            showModule: true
        },
    });
    let props = {
        slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f'
    };

    let sidebar = mount(<Provider store={sidebarWithData}>
        <Sidebar />
    </Provider>);

    it('onClick Event', () => {
        const sidebarInstance = sidebar.find('Sidebar').instance();
        sidebarInstance.setState({
            elementDropdown: 'primary',
            activeElementType: 'element-authoredtext',
            activePrimaryOption: 'primary-paragraph',
            activeSecondaryOption: 'secondary-paragraph',
            activeLabelText: 'P'
        });

        let target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'primary-heading';
                }
            }
        }

        sidebar.find('div.element-dropdown-title').at(0).simulate('click');
        sidebar.find('ul.element-dropdown-content.primary-options').simulate('click');
        sidebarInstance.handlePrimaryOptionChange(target);

        sidebarInstance.setState({
            elementDropdown: 'secondary'
        });

        target = {
            target: {
                getAttribute: function(dataValue) {
                    return 'secondary-heading-1';
                }
            }
        }

        sidebar.find('ul.element-dropdown-content.secondary-options').simulate('click');
        sidebarInstance.handleSecondaryOptionChange(target);

        // Attribution for secondary element type
        sidebarInstance.setState({
            elementDropdown: 'primary',
            activePrimaryOption: 'primary-blockquote',
            activeSecondaryOption: 'secondary-marginalia-attribution'
        });

        sidebarInstance.attributions();

        // Attribution for primary element type
        sidebarInstance.setState({
            activeElementType: 'figure',
            activePrimaryOption: 'primary-image-figure',
            activeSecondaryOption: 'secondary-image-figure-half'
        });

        sidebarInstance.attributions();
    });

    it('Test Case for Metadata Anchor LO', () => {
        const activeElement = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "",
            elementWipType: "element-learningobjectivemapping",
            primaryOption: "",
            secondaryOption: "",
            index: 2,
            tag: "LO"
        };

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                updateElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
    });

    it('Test Case for Metadata Anchor MA', () => {
        const activeElement = {
            elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
            elementType: "",
            elementWipType: "element-generateLOlist",
            primaryOption: "",
            secondaryOption: "",
            index: 1,
            tag: "LO"
        };

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                updateElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
    });

    it("With no activeElement", () => {
        const activeElement = {}
        
        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                updateElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
        });
    let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
    })

    describe("Blockquote", () => {

        it("Checking data for pullquote", () => {
            const activeElement = {
                elementId: "urn:pearson:work:28493c52-4356-48e5-8328-c24337bb3200",
                elementType: "element-authoredtext",
                elementWipType: "element-blockfeature",
                index: 0,
                primaryOption: "primary-blockquote",
                secondaryOption: "secondary-pullquote",
                tag: "BQ"
            }
            
            const sidebarWithData = mockStore({
                appStore: {
                    activeElement,
                    updateElement,
                    slateLevelData
                },
                metadataReducer: {
                    currentSlateLOData: {}
                },
            });
        let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            expect(sidebar.find('.element-dropdown').length).toBe(2)
            expect(sidebar.find('.element-dropdown-title[data-element="primary"]').text()).toBe("Blockquotes")
            expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').text()).toBe("Pullquote")
        })

        it("Checking data for Marginalia with attribution", () => {
            const activeElement = {
                elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e2t",
                elementType: "element-authoredtext",
                elementWipType: "element-blockfeature",
                primaryOption: "primary-blockquote",
                secondaryOption: "secondary-marginalia-attribution",
                index: 1,
                tag: "BQ"
            }
            
            const sidebarWithData = mockStore({
                appStore: {
                    activeElement,
                    updateElement,
                    slateLevelData
                },
                metadataReducer: {
                    currentSlateLOData: {}
                },
            });
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            expect(sidebar.find('.element-dropdown').length).toBe(2)
            expect(sidebar.find('.element-dropdown-title[data-element="primary"]').text()).toBe("Blockquotes")
            expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').text()).toBe("Marginalia with Attribution")
        }) 
    })
});