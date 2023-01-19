
import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import CiteTdxTable from '../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Components/CiteTdxTable/CiteTdxTable'
let initialState = {
    citeTdxReducer:{ 
        currentAssessmentSelected:{
            "versionUrn":"dfer",
            "name":"mmoi"
        },
        citeApiData:{assessments:["dfsarfw","Sdfa"]},
        tdxApiData:{assessments:["dfsarfw","Sdfa"]},
        mmiApiData:{assessments:["dfsarfw","Sdfa"]},
        isLoading:false,
        currentSingleAssessmentSelected:{},
        citeErrorFlag:"",
        assessmenterrFlag:false,
        sortBy:"modifiedDate"

 },
 projectInfo: {isBannerVisible: true}
};


describe('Table component', () => {
    let props = {
        assessmentType:"Full Assessment QuAD CITE",
        assessmenterrFlag:false,
        isLoading:false,
        citeApiData:{assessments:["dfsarfw","Sdfa"]},
        tdxApiData:{assessments:["dfsarfw","Sdfa"]},
        mmiApiData:{assessments:["dfsarfw","Sdfa"]},
        sortingData:{sortBy:"modifiedDate"}

    }
    let store = mockStore(initialState);
    const component = mount(<Provider store={store}><CiteTdxTable {...props} /></Provider>);
    let componentInstance = component.find('CiteTdxTable').instance();
    const spyaddAssessment = jest.spyOn(componentInstance, 'addAssessment')

    it('renders without crashing', () => {
        expect(component).toHaveLength(1);
    })

    it('add assessment', () => {
        componentInstance.addAssessment();
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    })

    it('add assessment', () => {
        componentInstance.addAssessment();
        expect(spyaddAssessment).toHaveBeenCalled()
        spyaddAssessment.mockClear()
    })
    it('sorting', () => { 
         const spysetSorting = jest.spyOn(componentInstance, 'setSort')
         componentInstance.setSort("Title");
        expect(spysetSorting).toHaveBeenCalled()
        spysetSorting.mockClear()
    })
 
    it('checking sorting false case', () => { 
        const spysetSorting = jest.spyOn(componentInstance, 'setSort')
        componentInstance.setSort("");
       expect(spysetSorting).toHaveBeenCalled()
       spysetSorting.mockClear()
   })


    it('TDX', () => {
        let props = {
            assessmentType:"Full Assessment TDX",
        assessmenterrFlag:false,
        isLoading:false,
        citeApiData:{assessments:{"dfsarfw":"Sdfa"}},
        tdxApiData:{assessments:{"dfsarfw":"Sdfa"}},
        mmiApiData:{assessments:{"dfsarfw":"Sdfa"}},
        sortingData:{sortBy:"modifiedDate"}
    
        }
        let store = mockStore(initialState);
        const component = mount(<Provider store={store}><CiteTdxTable {...props} /></Provider>);
        expect(component).toHaveLength(1);
    })
    
    
    it('MMI', () => {
        let props = {
            assessmentType:"Full Assessment MMI",
        assessmenterrFlag:false,
        isLoading:false,
        citeApiData:{assessments:{"dfsarfw":"Sdfa"}},
        tdxApiData:{assessments:{"dfsarfw":"Sdfa"}},
        mmiApiData:{assessments:{"dfsarfw":"Sdfa"}},
        sortingData:{sortBy:"modifiedDate"}
    
        }
        let store = mockStore(initialState);
        const component = mount(<Provider store={store}><CiteTdxTable {...props} /></Provider>);
        expect(component).toHaveLength(1);
    })

    it("Assign Click checking whether setSort is called", () => {
        let addValue = {};
        const wrapperInstance = component.find('CiteTdxTable').instance();
        const spyOnupdateAssignee = jest.spyOn(wrapperInstance, 'setSort')
        wrapperInstance.setSort(addValue);
        expect(spyOnupdateAssignee).toHaveBeenCalled()
    });
    
    it("Assign Click checking whether addAssessment is called", () => {
        let addValue = {};
        const wrapperInstance = component.find('CiteTdxTable').instance();
        const spyOnupdateAssignee = jest.spyOn(wrapperInstance, 'addAssessment')
        wrapperInstance.addAssessment(addValue);
        expect(spyOnupdateAssignee).toHaveBeenCalled()
    });


    let initialState1 = {
        citeTdxReducer:{ 
            currentAssessmentSelected:{
                "versionUrn":"dfer",
                "name":"mmoi"
            },
            citeData: {
                page: 0,
                pageSize: 25,
                numberOfRemainingElements: 22142,
                assessments: [
                    {
                        "versionUrn": "urn:pearson:work:45a9474c-d21f-4d4e-9ff0-49727e06e8d8",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2021-06-28T12:36:30.408Z",
                        "modifiedBy": "LOMT-ADMIN"
                    },
                    {
                        "versionUrn": "urn:pearson:work:71554927-8614-46a1-8235-b988b250eb44",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2022-02-15T11:29:25.844Z",
                        "modifiedBy": "SERV.C4SMWIPNONPROD"
                    }
                ],
            },
            tdxData : {
                page: 1,
                pageSize: 20,
                numberOfRemainingElements: 22142,
                assessments: [
                    {
                        "versionUrn": "urn:pearson:work:45a9474c-d21f-4d4e-9ff0-49727e06e8d8",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2021-06-28T12:36:30.408Z",
                        "modifiedBy": "LOMT-ADMIN"
                    },
                    {
                        "versionUrn": "urn:pearson:work:71554927-8614-46a1-8235-b988b250eb44",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2022-02-15T11:29:25.844Z",
                        "modifiedBy": "SERV.C4SMWIPNONPROD"
                    }
                ],
            },
            mmiData: {
                page: 2,
                pageSize: 15,
                numberOfRemainingElements: 22142,
                assessments: [
                    {
                        "versionUrn": "urn:pearson:work:45a9474c-d21f-4d4e-9ff0-49727e06e8d8",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2021-06-28T12:36:30.408Z",
                        "modifiedBy": "LOMT-ADMIN"
                    },
                    {
                        "versionUrn": "urn:pearson:work:71554927-8614-46a1-8235-b988b250eb44",
                        "name": "ZXzXCzx",
                        "modifiedDate": "2022-02-15T11:29:25.844Z",
                        "modifiedBy": "SERV.C4SMWIPNONPROD"
                    }
                ],
            },
            isLoading:false,
            currentSingleAssessmentSelected:{},
            citeErrorFlag:"",
            assessmenterrFlag:false,
            sortBy:"modifiedDate"
    
     },
     projectInfo: {isBannerVisible: false}
    }
    
    let store1 = mockStore(initialState1);


    it('checking for rendering table when assessmentType=cite is passed ', () => {

         let props1 = {
            assessmentType:"cite",
            citeData: JSON.stringify({assessments:["cite","abc"]}),
            tdxApiData : JSON.stringify({assessments:["tdx","def"]}),
            mmiApiData: JSON.stringify({assessments:["mmi","hij"]}),
        }
 
        const component = mount(<Provider store={store1}>
                                   <CiteTdxTable {...props1} />
                                </Provider>)
        console.log(component.debug())
        expect(component.find('.assessment-table-class')).toHaveLength(1)
    })


    it('checking for rendering table when assessmentType=tdx is passed ', () => {

        let props2 = {
            assessmentType:"tdx",
            citeData: JSON.stringify({assessments:["cite","abc"]}),
            tdxApiData : JSON.stringify({assessments:["tdx","def"]}),
            mmiApiData: JSON.stringify({assessments:["mmi","hij"]}),
        }
 
        const component = mount(<Provider store={store1}>
                                   <CiteTdxTable {...props2} />
                                </Provider>)
        console.log(component.debug())
        expect(component.find('.assessment-table-class')).toHaveLength(1)
        component.find('.radio-button').at(0).simulate('click');
        component.find('.radio-button').at(1).simulate('click');
        component.find('.sort-icon').at(0).simulate('click');
        component.find('.sort-icon').at(1).simulate('click');
    })

    it('checking for div with classname no results is rendered', () => {

        
    let initialState2 = {
        citeTdxReducer:{ 
            currentAssessmentSelected:{
                "versionUrn":"dfer",
                "name":"mmoi"
            },
            citeData: {
                page: 0,
                pageSize: 25,
                numberOfRemainingElements: 22142,
                assessments: [],
            },
            tdxData : {
                page: 1,
                pageSize: 20,
                numberOfRemainingElements: 22142,
                assessments: [],
            },
            mmiData: {
                page: 2,
                pageSize: 15,
                numberOfRemainingElements: 22142,
                assessments: []},
            isLoading:false,
            currentSingleAssessmentSelected:{},
            citeErrorFlag:"",
            assessmenterrFlag:false,
            sortBy:"modifiedDate"
    
            },
            projectInfo: {isBannerVisible: false}
    }

    let store2 = mockStore(initialState2);
        let props2 = {
            assessmentType:"tdx"
        }
 
        const component = mount(<Provider store={store2}>
                                   <CiteTdxTable {...props2} />
                                </Provider>)
        console.log(component.debug())
        expect(component.find('.no-result')).toHaveLength(1)
    })




});