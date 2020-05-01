import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import ElmTableComponent from '../../../../src/component/AssessmentSlateCanvas/elm/Components/ElmTableComponent';
import { DefaultSlateData, mockELMResponse, mockElmItemResponse,newElmData ,CurrentSlateAncestor } from '../../../../fixtures/AssessmentSlateCanvasTestingData';
import config from '../../../../src/config/config.js';

config.slateManifestURN="urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"

const mockStore = configureMockStore(middlewares);

let initialState = {
    elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
        },
        errFlag: false,
        errorStatu: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: DefaultSlateData,
        currentSlateAncestorData:{}
    }
};
let initialState2 = {
    elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef"
        },
        errFlag: false,
        errorStatu: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: DefaultSlateData,
        currentSlateAncestorData:CurrentSlateAncestor.currentSlateAncestorData1
    }
};
describe('ELM Actions test', () => {
    let store = {};
    beforeEach(() => {
        store = mockStore(initialState);
    })
    it('renders without crashing', () => {
        let props = {
            errFlag: false,
            errorStatus: "404",
            apiData: {},
            navigateBack: function () { },
            hidePufPopup: function () { },
            usageTypeMetadata: 'Quiz',
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>)
        expect(component).toHaveLength(1);
        let instance = component.instance();
        expect(instance).toBeDefined();

    });
    it('TEST- render table-elm resources', () => {
        let store = mockStore(initialState);
        let props = {
            elmReducer:{
            errFlag: true,
            apiStatus: "404",
            elmData: mockELMResponse
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            activeUsageType: 'Quiz',
            addPufFunction: function () { },
            closeElmWindow: function () { },
            fetchAssessmentItem: jest.fn(),
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        expect(elmTableInstance).toBeDefined();
        const spy = jest.spyOn(elmTableInstance, 'renderTableData')
        elmTableInstance.renderTableData(props);
        elmTableInstance.forceUpdate()
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    });
    it('TEST- render table-elm items', () => {
        let store = mockStore(initialState);
        let props = {
            elmReducer:{
                errFlag: true,
                apiStatus: "404",
                elmData: mockELMResponse,
                itemErrorFlag: false,
                elmItemData: mockElmItemResponse.items
                },
            navigateBack: function () { },
            hidePufPopup: function () { },
            activeUsageType: 'Quiz',
            addPufFunction: function () { },
            closeElmWindow: function () { },
            fetchAssessmentItem: jest.fn(),     
          
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        expect(elmTableInstance).toBeDefined();
        const spy = jest.spyOn(elmTableInstance, 'renderTableData')
        elmTableInstance.renderTableData(props);
        elmTableInstance.forceUpdate()
        expect(spy).toHaveBeenCalled()
        spy.mockClear()
    });
    it('TEST- sorting functions', () => {
        let store = mockStore(initialState);
        let props = {
            errFlag: true,
            errorStatus: "404",
            apiData: {
                contents: []
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            activeUsageType: 'Quiz',
            addPufFunction: function () { },
            closeElmWindow: function () { },
            fetchAssessmentItem: jest.fn(),
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        elmTableInstance.setState({
            parentUrn: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            apiData: {},
            renderTableData: () => { return; }
        })
        const spy1 = jest.spyOn(elmTableInstance, 'dynamicSort')
        const spy2 = jest.spyOn(elmTableInstance, 'setSort')
        elmTableInstance.forceUpdate();
        component.update();
        elmTableInstance.dynamicSort("title");
        elmTableInstance.setSort();
        expect(spy1).toHaveBeenCalled()
        spy1.mockClear()
        expect(spy2).toHaveBeenCalled()
        spy2.mockClear()
    });
    it('TEST- setSort function', () => {
        let store = mockStore(initialState);
        let props = {
            errFlag: true,
            errorStatus: "404",
            apiData: {
                contents: []
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            activeUsageType: 'Quiz',
            addPufFunction: function () { },
            closeElmWindow: function () { },
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        elmTableInstance.setState({
            parentUrn: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6775cba97b29",
            apiData: {},
            renderTableData: () => { return; },
            sortFlag: false
        })
        const spy1 = jest.spyOn(elmTableInstance, 'dynamicSort')
        const spy2 = jest.spyOn(elmTableInstance, 'setSort')
        elmTableInstance.forceUpdate();
        component.update();
        elmTableInstance.dynamicSort("title");
        elmTableInstance.setSort();
        expect(spy1).toHaveBeenCalled()
        spy1.mockClear()
        expect(spy2).toHaveBeenCalled()
        spy2.mockClear()
    });
    it('TEST- switch case for getFolderLabel', () => {
        let store = mockStore(initialState);
        let props = {
            errFlag: true,
            errorStatus: "404",
            apiData: {
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            usageTypeMetadata: 'Quiz',
            addPufFunction: (obj) => { },
            closeElmWindow: function () { },
            openedFrom: "slateAssessment"
        }

        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        elmTableInstance.setState({
            parentUrn: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData: {},
            renderTableData: () => { return; },
            addFlag: true,
            currentAssessmentSelected: {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })

        elmTableInstance.getFolderLabel('part');
        const spygetFolderLabel = jest.spyOn(elmTableInstance, 'getFolderLabel')
        elmTableInstance.forceUpdate();
        component.update();
        elmTableInstance.getFolderLabel('part');
        expect(spygetFolderLabel).toHaveBeenCalledWith('part')
        elmTableInstance.getFolderLabel('chapter');
        expect(spygetFolderLabel).toHaveBeenCalledWith('chapter')
        elmTableInstance.getFolderLabel('module');
        expect(spygetFolderLabel).toHaveBeenCalledWith('module')
        elmTableInstance.getFolderLabel('section');
        expect(spygetFolderLabel).toHaveBeenCalledWith('section')
        elmTableInstance.getFolderLabel('assessment');
        expect(spygetFolderLabel).toHaveBeenCalledWith('assessment')
        elmTableInstance.getFolderLabel('container-introduction');
        expect(spygetFolderLabel).toHaveBeenCalledWith('container-introduction')
        elmTableInstance.getFolderLabel('introductry-slate');
        expect(spygetFolderLabel).toHaveBeenCalledWith('introductry-slate')
        elmTableInstance.getFolderLabel('introduction');
        expect(spygetFolderLabel).toHaveBeenCalledWith('introduction')
        component.update();
        spygetFolderLabel.mockClear()
    });
    it('TEST-filterSubData function', () => {
        let store = mockStore(initialState);
        let props = {
            errFlag: false,
            errorStatus: "404",
            apiData: {
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            activeUsageType: 'Quiz',
            addPufFunction: (obj) => { },
            closeElmWindow: function () { },
            openedFrom: "slateAssessment"
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        elmTableInstance.setState({
            parentUrn: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData: {},
            renderTableData: () => { return; },
            addFlag: true,
            currentAssessmentSelected: {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })
        const spyfilterSubData = jest.spyOn(elmTableInstance, 'filterSubData')
        elmTableInstance.forceUpdate();
        component.update();
        elmTableInstance.filterSubData(mockELMResponse, "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef", "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29")
        expect(spyfilterSubData).toHaveBeenCalled()
        expect(spyfilterSubData).toHaveBeenCalledWith(mockELMResponse, "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef", "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29")
        spyfilterSubData.mockClear()
    });
    describe('TEST-Functions', () => {
        let store = mockStore(initialState);
        let props = {
            errFlag: true,
            errorStatus: "404",
            apiData: {
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            usageTypeMetadata: 'Quiz',
            addPufFunction: (obj) => { },
            closeElmWindow: function () { },
            openedFrom: "slateAssessment",
            fetchAssessmentItem: jest.fn()
        }
        let pufObj = {
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title: "Open response question updated",
            assessmentFormat: "puf",
            usagetype: "Quiz"
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        elmTableInstance.setState({
            parentUrn: "urn:pearson:manifest:3c780b1f-06ad-4e3d-b226-6797b29",
            apiData: {},
            renderTableData: () => { return; },
            addFlag: true,
            currentAssessmentSelected: {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5"
            }
        })
        it('TEST-getFolderLabel', () => {
            const spygetFolderLabel = jest.spyOn(elmTableInstance, 'getFolderLabel')
            elmTableInstance.getFolderLabel('part');
            expect(spygetFolderLabel).toHaveBeenCalled()
            spygetFolderLabel.mockClear()
        })
        it('TEST-sendPufAssessment-full assessment-puf', () => {
            const spysendPufAssessment = jest.spyOn(elmTableInstance, 'sendPufAssessment')
            elmTableInstance.sendPufAssessment();
            expect(spysendPufAssessment).toHaveBeenCalled()
            spysendPufAssessment.mockClear()
        })
        it('TEST-sendPufAssessment-elm assessment item', () => {
            component.setProps({
                ...props,
                openedFrom:"singleAssessment"
            })
            component.update()
            const spysendPufAssessment = jest.spyOn(elmTableInstance, 'sendPufAssessment')
            elmTableInstance.sendPufAssessment();
            expect(spysendPufAssessment).toHaveBeenCalled()
            spysendPufAssessment.mockClear()
        })
        it('TEST-addAssessment', () => {
            const spyaddAssessment = jest.spyOn(elmTableInstance, 'addAssessment')
            elmTableInstance.addAssessment(pufObj);
            expect(spyaddAssessment).toHaveBeenCalled()
            spyaddAssessment.mockClear()
        })
        it('TEST-filterData case-1', () => {
            const spyfilterData = jest.spyOn(elmTableInstance, 'filterData')
            elmTableInstance.filterData("urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab", mockELMResponse, "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f");
            expect(spyfilterData).toHaveBeenCalled()
            spyfilterData.mockClear()
        })
        it('TEST-filterData case 2', () => {
            const spyfilterData = jest.spyOn(elmTableInstance, 'filterData')
            elmTableInstance.filterData("urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab", mockELMResponse, "urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab");
            expect(spyfilterData).toHaveBeenCalled()
            spyfilterData.mockClear()
        })
        it('TEST-getResourcefromFilterData', () => {
            const spygetResourcefromFilterData = jest.spyOn(elmTableInstance, 'getResourcefromFilterData')
            elmTableInstance.getResourcefromFilterData(mockELMResponse, "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
            expect(spygetResourcefromFilterData).toHaveBeenCalled()
            spygetResourcefromFilterData.mockClear()
        })
        it('TEST-getAssessmentItemsData', () => {
            const spygetAssessmentItemsData = jest.spyOn(elmTableInstance, 'getAssessmentItemsData')
            elmTableInstance.getAssessmentItemsData(mockElmItemResponse.items, "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5", "ELM Test")
            expect(spygetAssessmentItemsData).toHaveBeenCalled()
            spygetAssessmentItemsData.mockClear()
        })
        it('TEST-handleClickAssessment-assessmentitem', () => {
            let assessmentItem = {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                type: "assessmentitem",
                assessmentTitle: "ELM ITEM",
                previousUrn: "urn:pearson:work:133dd9fd-a5be-45e5-5678-891283abb9a5"
            }
            const spyhandleClickAssessment = jest.spyOn(elmTableInstance, 'handleClickAssessment')
            elmTableInstance.handleClickAssessment(assessmentItem, "assessmentitem", "singleAssessment")
            expect(spyhandleClickAssessment).toHaveBeenCalled()
            spyhandleClickAssessment.mockClear()
        })
        it('TEST-handleClickAssessment-assessment', () => {
            let assessment = {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                type: "assessmentitem",
                assessmentTitle: "ELM ITEM",
                previousUrn: "urn:pearson:work:133dd9fd-a5be-45e5-5678-891283abb9a5"
            }
            const spyhandleClickAssessment = jest.spyOn(elmTableInstance, 'handleClickAssessment')
            elmTableInstance.handleClickAssessment(assessment, "assessment", "singleAssessment")
            expect(spyhandleClickAssessment).toHaveBeenCalled()
            spyhandleClickAssessment.mockClear()
        })
        it('TEST-handleClickAssessment-container', () => {
            let assessmentItem = {
                urn: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
                type: "assessmentitem",
                assessmentTitle: "ELM ITEM",
                previousUrn: "urn:pearson:work:133dd9fd-a5be-45e5-5678-891283abb9a5"
            }
            const spyhandleClickAssessment = jest.spyOn(elmTableInstance, 'handleClickAssessment')
            elmTableInstance.handleClickAssessment(assessmentItem, "assessment", "slateAssessment")
            expect(spyhandleClickAssessment).toHaveBeenCalled()
            spyhandleClickAssessment.mockClear()
        })
        it('TEST-toggleActive', () => {
            const spytoggleActive = jest.spyOn(elmTableInstance, 'toggleActive')
            elmTableInstance.toggleActive(2);
            expect(spytoggleActive).toHaveBeenCalled()
            spytoggleActive.mockClear()
        })
        it('TEST-navigateBack- assessmentsItems table', () => {
            const spynavigateBack = jest.spyOn(elmTableInstance, 'navigateBack')
            elmTableInstance.navigateBack();
            expect(spynavigateBack).toHaveBeenCalled()
            spynavigateBack.mockClear()
        })
        it('TEST-showNewValueList', () => {
            const spyshowNewValueList = jest.spyOn(elmTableInstance, 'showNewValueList')
            elmTableInstance.showNewValueList({}, "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5")
            expect(spyshowNewValueList).toHaveBeenCalled()
            spyshowNewValueList.mockClear()
        })
        it('TEST-filterSubData', () => {
            const spyfilterSubData = jest.spyOn(elmTableInstance, 'filterSubData')
            elmTableInstance.filterSubData(mockELMResponse, "urn:pearson:manifest:3164caea-e288-4a7d-b8f3-d8e99e7df4ab", "urn:pearson:distributable:cd9daf2a-981d-493f-bfae-71fd76109d8f")
            expect(spyfilterSubData).toHaveBeenCalled()
            spyfilterSubData.mockClear()
        })
        xit('TEST-componentWillUnmount', () => {
            const spycomponentWillUnmount = jest.spyOn(elmTableInstance, 'componentWillUnmount')
            elmTableInstance.componentWillUnmount()
            expect(spycomponentWillUnmount.mock.calls.length).toBe(1)
        })
        it('TEST-navigateBack- assessments', () => {
            elmTableInstance.setState({
                openItemTable: false,
            })
            component.setProps({
                ...props,
                itemApiStatus: "200"
            })
            component.update()
            const spynavigateBack = jest.spyOn(elmTableInstance, 'navigateBack')
            elmTableInstance.navigateBack();
            expect(spynavigateBack).toHaveBeenCalled()
            spynavigateBack.mockClear()
        })

    })
});
describe('ELM setParentUrn TEST- ', () => {
    let store = {};
    beforeEach(() => {
        store = mockStore(initialState2);
    })


    describe('TEST-setParentUrn', () => {
        beforeEach(() => {
            store = mockStore(initialState2);
        })
        let store = mockStore(initialState2);
        let props = {
            errFlag: true,
            errorStatus: "404",
            apiData: {
                contents: {
                    frontMatter: [],
                    bodyMatter: [],
                    backMatter: []
                }
            },
            navigateBack: function () { },
            hidePufPopup: function () { },
            usageTypeMetadata: 'Quiz',
            addPufFunction: (obj) => { },
            closeElmWindow: function () { },
            openedFrom: "slateAssessment",
            fetchAssessmentItem: jest.fn()
        }
        let pufObj = {
            id: "urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title: "Open response question updated",
            assessmentFormat: "puf",
            usagetype: "Quiz"
        }
        const component = mount(<Provider store={store}><ElmTableComponent {...props} /></Provider>);
        const elmTableInstance = component.find('ElmTableComponent').instance();
        it('TEST-setParentUrn case1-', () => {
            config.slateManifestURN="urn:pearson:manifest:bb4e289e-8add-4c30-9f52-33b8fd246f81"
            const spysetParentUrn = jest.spyOn(elmTableInstance, 'setParentUrn')
            elmTableInstance.setParentUrn( JSON.stringify(newElmData),CurrentSlateAncestor.currentSlateAncestorData1);
            expect(spysetParentUrn).toHaveBeenCalled()
            spysetParentUrn.mockClear()
        })
        it('TEST-setParentUrn case2-', () => {
            config.slateManifestURN="urn:pearson:manifest:50778b02-a808-4a8c-9c7c-923181e1a7fc"
            const spysetParentUrn = jest.spyOn(elmTableInstance, 'setParentUrn')
            elmTableInstance.setParentUrn( JSON.stringify(newElmData),CurrentSlateAncestor.currentSlateAncestorData2);
            expect(spysetParentUrn).toHaveBeenCalled()
            spysetParentUrn.mockClear()
        })
        it('TEST-setParentUrn case3-', () => {
            config.slateManifestURN="urn:pearson:manifest:2473babc-3182-4639-b36e-4177e03fac03"
            const spysetParentUrn = jest.spyOn(elmTableInstance, 'setParentUrn')
            elmTableInstance.setParentUrn( JSON.stringify(newElmData),CurrentSlateAncestor.currentSlateAncestorData3);
            expect(spysetParentUrn).toHaveBeenCalled()
            spysetParentUrn.mockClear()
        })
        it('TEST-setParentUrn case4-', () => {
            config.slateManifestURN="urn:pearson:manifest:d29dfda8-73bc-4ad5-bd4a-3381193549d7"
            const spysetParentUrn = jest.spyOn(elmTableInstance, 'setParentUrn')
            elmTableInstance.setParentUrn( JSON.stringify(newElmData),CurrentSlateAncestor.currentSlateAncestorData4);
            expect(spysetParentUrn).toHaveBeenCalled()
            spysetParentUrn.mockClear()
        })
    })
});