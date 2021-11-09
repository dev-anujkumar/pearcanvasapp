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
        citeApiData:{assessments:{"dfsarfw":"Sdfa"}},
        tdxApiData:{assessments:{"dfsarfw":"Sdfa"}},
        mmiApiData:{assessments:{"dfsarfw":"Sdfa"}},
        isLoading:false,
        currentSingleAssessmentSelected:{},
        citeErrorFlag:"",
        assessmenterrFlag:false,
        sortBy:"modifiedDate"

 },
};
describe('Table component', () => {
    let props = {
        assessmentType:"Full Assessment QuAD CITE",
        assessmenterrFlag:false,
        isLoading:false,
        citeApiData:{assessments:{"dfsarfw":"Sdfa"}},
        tdxApiData:{assessments:{"dfsarfw":"Sdfa"}},
        mmiApiData:{assessments:{"dfsarfw":"Sdfa"}},
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
    

});