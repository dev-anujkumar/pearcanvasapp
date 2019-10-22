import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
const middlewares = [thunk];
import configureMockStore from 'redux-mock-store';
import { AssessmentSlateData } from '../../../src/component/AssessmentSlateCanvas/AssessmentSlateData';
import { assessmentSlateDefault, assessmentSlateWithData, DefaultSaletData } from "./../../../fixtures/AssessmentSlateCanvasTestingData";
import { Provider } from 'react-redux';
const mockStore = configureMockStore(middlewares);

let initialState = {
    elmReducer: {
        elmData: {
            numberOfResources: 88,
            contentUrn: "urn:pearson:entity:dfeb8286-217e-40a4-8d40-3ced46e469e0",
            versionUrn: "urn:pearson:distributable:3e872df6-834c-45f5-b5c7-c7b525fab1ef",
        },
        errFlag: false,
        errorStatu: ""
    },
    appStore: {
        pageNumberData: {},
        slateLevelData: DefaultSaletData
    }
};
describe('Testing Assessment Slate Data component', () => {
    const div = document.createElement('div');
    const assessmentSlate = mount(<AssessmentSlateData />)
    let assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
    it('render Assessment Slate Data component ', () => {

        ReactDOM.render(<AssessmentSlateData />, div);
        ReactDOM.unmountComponentAtNode(div);
    })

    it('onClick Assessment Type Event', () => {
        assessmentSlateDataInstance = assessmentSlate.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: 'Select'
        });

        let activeAssessmentType = {
            activeAssessmentType: {
                getAttribute: function (dataValue) {
                    return 'Full Assessment CITE';
                }
            }
        }
        assessmentSlate.find('div.slate_assessment_type_dropdown.activeDropdown').simulate('click');
        assessmentSlate.find('ul.slate_assessment_type_dropdown_options>li:first-child').simulate('click');
    });
    it('onClick UsageType Event', () => {
        let props = {
            getAssessmentDataPopup: false,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,

        }
        const component = mount(<AssessmentSlateData {...props} />);
        const assessmentSlateDataInstance = component.instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment CITE",
            activeAssessmentUsageType: 'Quiz'
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        component.find('div.slate_assessment_metadata_container .singleAssessment_Dropdown_activeDropdown').simulate('click');
        component.find('ul.slate_assessment_metadata_type_dropdown_options>li:first-child').simulate('click');



    });
    it('Test-Render succcessfully addedd screen', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,

        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: 'Full Assessment PUF',
            showElmComponent: true,
        });
        assessmentSlateDataInstance.forceUpdate();
    });
    it('Test-Active assessment type handling', () => {
        let props = {
            getAssessmentData: true,
            getAssessmentDataPopup: false,
        }
        const component = mount(<AssessmentSlateData {...props} />);
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Learning App Type"
        });

        assessmentSlateDataInstance.forceUpdate();
    });
    it('Test-change assessment', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: false,
            assessmentId: "urn:pearson:work:4da32e71-a6b5-4daa-84ed-fb72d6b0aa74",
            assessmentItemTitle: "1.1 Homework",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn
        }

        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment CITE"
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        // let assessmentFormat = "puf";
        assessmentSlateDataInstance.changeAssessment();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: 'Full Assessment CITE',
            showElmComponent: true,
        })
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        assessmentSlateDataInstance.addC2MediaAssessment('Full Assessment CITE');
    })
    it('Test-main assessment', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment PUF"
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        assessmentSlateDataInstance.mainAddAssessment('', "Full Assessment CITE");
        assessmentSlateDataInstance.setState({
            showElmComponent: true,
        })
        assessmentSlateDataInstance.forceUpdate();
        component.update();
    })
    it('Test-close elm window', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn
        }
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment PUF",
            showElmComponent: true
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        assessmentSlateDataInstance.closeElmWindow();
    });
    it('Test-add puf assessment', () => {
        const mockLoginfn = jest.fn();
        let store = mockStore(initialState);
        let pufObj={
            id:"urn:pearson:work:133dd9fd-a5be-45e5-8d83-891283abb9a5",
            title:"Open response question updated",
            assessmentFormat:"puf",
            usagetype:"Quiz"
        }
        let props = {
            getAssessmentDataPopup: true,
            assessmentId: "",
            assessmentItemTitle: "",
            model: assessmentSlateWithData,
            getAssessmentData: true,
            toggleAssessmentPopup: function () { },
            selectAssessmentType: mockLoginfn,
            addPufAssessment:  function (pufObj) { }
        }      
        const component = mount(<Provider store={store}><AssessmentSlateData {...props} /></Provider>);
        let assessmentSlateDataInstance = component.find('AssessmentSlateData').instance();
        assessmentSlateDataInstance.setState({
            activeAssessmentType: "Full Assessment PUF",
            showElmComponent: true
        });
        assessmentSlateDataInstance.forceUpdate();
        component.update();
        assessmentSlateDataInstance.addPufAssessment (pufObj);

    });
})