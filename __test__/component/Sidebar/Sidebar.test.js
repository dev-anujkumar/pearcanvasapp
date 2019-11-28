import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '../../../src/component/Sidebar';
import { conversionElement } from './../../../src/component/Sidebar/Sidebar_Action';
import { updateElement } from './../../../src/component/ElementContainer/ElementContainer_Actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import { Provider } from 'react-redux';
import slateLevelData from './slateData';
import { JestEnvironment } from '@jest/environment';

describe('Test for Sidebar component', () => {
    const mockStore = configureMockStore(middlewares);
    const activeElement = {
        elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b",
        elementType: "element-authoredtext",
        elementWipType: "element-authoredtext",
        primaryOption: "primary-heading",
        secondaryOption: "secondary-heading-1",
        index: "1-0",
        tag: "H1",
        toolbar: []
    };

    const sidebarWithData = mockStore({
        appStore: {
            activeElement,
            updateElement,
            conversionElement,
            slateLevelData,
        },
        metadataReducer: {
            showModule: true
        },
    });
    let props = {
        slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
        activeElement: { elementId: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b" },
    };

    let sidebar = mount(<Provider store={sidebarWithData}>
        <Sidebar  />
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
        expect(sidebar.find('.element-dropdown').length).toBe(2)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(1)
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
                sidebarWithData,
                conversionElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(1)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').text()).toBe("Learning Objective")
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(0)
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
                conversionElement,
                slateLevelData
            },
            metadataReducer: {
                currentSlateLOData: {}
            },
        });

        let sidebar = mount(<Provider store={sidebarWithData}>
            <Sidebar />
        </Provider>);
        expect(sidebar.find('.element-dropdown').length).toBe(0)
        expect(sidebar.find('.element-dropdown-title[data-element="primary"]').length).toBe(0)
        expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').length).toBe(0)
    });

    it("With no activeElement", () => {
        const activeElement = {}

        const sidebarWithData = mockStore({
            appStore: {
                activeElement,
                conversionElement,
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
    expect(sidebar.find('.element-dropdown').length).toBe(2)
    expect(sidebar.find('.element-dropdown-title[data-element="primary"]').text()).toBe('Headings')
    expect(sidebar.find('.element-dropdown-title[data-element="secondary"]').text()).toBe('Heading 1')

    describe("Blockquote", () => {

        it("Checking data for pullquote", () => {
            const activeElement = {
                elementId: "urn:pearson:work:28493c52-4356-48e5-8328-c24337bb3200",
                elementType: "element-authoredtext",
                elementWipType: "element-blockfeature",
                index: 0,
                primaryOption: "primary-blockquote",
                secondaryOption: "secondary-pullquote",
                tag: "BQ",
                toolbar: []
            }

            const sidebarWithData = mockStore({
                appStore: {
                    activeElement,
                    conversionElement,
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
                    conversionElement,
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
        }),

            it("Checking toggleElementDropdown function for Else Condition", () => {
                let e = { target: { dataset: { element: "Primary" }, getAttribute: jest.fn() }, stopPropagation: jest.fn() }
                const activeElement = {
                    primaryOption: "primary-single-assessment",
                    secondaryOption: "secondary-single-assessment"
                };
                const sidebarWithData = mockStore({
                    appStore: {
                        activeElement
                    },
                    metadataReducer: {
                        currentSlateLOData: {}
                    },
                });
                let sidebar = mount(<Provider store={sidebarWithData}><Sidebar {...props} /></Provider>);
                const sidebarInstance = sidebar.find('Sidebar').instance();
                sidebarInstance.props = {
                    slateId: 'urn:pearson:manifest:e652706d-b04b-4111-a083-557ae121af0f',
                    activeElement:
                        { elementId: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e1b' },
                    permissions: ['access_formatting_bar']
                };
                sidebarInstance.toggleElementDropdown(e);
                expect(sidebarInstance.state.activePrimaryOption).toBe("primary-single-assessment");
            })

        it("Checking showModuleName function for checked value true if condition", () => {
            let e = { currentTarget: { checked: true } }
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for checked value false", () => {
            let e = { currentTarget: { checked: false } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData showmodule";
            document.body.appendChild(elementIdInfo);
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking showModuleName function for checked value true else condition", () => {
            let e = { currentTarget: { checked: true } }
            const elementIdInfo = document.createElement('div');
            elementIdInfo.className = "moduleContainer learningObjectiveData";
            document.body.appendChild(elementIdInfo);
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.showModuleName(e);
        })

        it("Checking renderLanguageLabel function If Condition", () => {
            let tag = 'BCE'
            let sidebar = mount(<Provider store={sidebarWithData}><Sidebar /></Provider>);
            const sidebarInstance = sidebar.find('Sidebar').instance();
            sidebarInstance.renderLanguageLabel(tag);
        })
    })
});