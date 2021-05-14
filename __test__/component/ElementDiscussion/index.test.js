import React from "react";
import { mount  } from "enzyme";
import thunk from "redux-thunk";
import ElementDiscussion from "../../../src/component/ElementDiscussion/index";
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
const middlewares = [thunk];
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore(middlewares);

const initialState = {
  appStore: {
    asideData: {},
    parentUrn: {},
    activeElement: {},
  },
  projectInfo: {
      LOB: 'OEP',
      usageType: [{label:'self reflection'}],
      discussionItems: [{discussionUrn:'', title:""}]
  },
};

const props = {
    element:{
        html: {
            title: "I am label of discussion"
        }
    }
}

describe("Element Discussion is being rendered", () => {
  const store = mockStore(initialState);
  const ConnectedDiscussion = mount(
    <Provider store={store}>
      <ElementDiscussion {...props} />
    </Provider>
  );

  it("renders main component without crashing", () => {
  });
  it("renders exact value of class without crashing", () => {
    
    const wrapper = ConnectedDiscussion.find(".single-assessment-usagetype-container");
    expect(wrapper).toHaveLength(1);
  });
  it("renders exact value of class without crashing", () => {
    
    const wrapper = ConnectedDiscussion.find(".singleAssessment_Dropdown_SelectLabel");
    expect(wrapper).toHaveLength(1);
  });
  it("renders exact value of class without crashing", () => {
    
    const wrapper = ConnectedDiscussion.find(".singleAssessment_Dropdown_currentLabel");
    expect(wrapper).toHaveLength(1);
  });
  it("renders exact value of class without crashing", () => {
    
    const wrapper = ConnectedDiscussion.find(".singleAssessment_Dropdown_arrow");
    expect(wrapper).toHaveLength(1);
  });
  it("renders exact value of class without crashing", () => {
    
    const usageTypeDropDown = ConnectedDiscussion.find(
      ".singleAssessment_Dropdown_activeDropdown"
    ).childAt(0);
    usageTypeDropDown.simulate("click");
    const wrapper = ConnectedDiscussion.find(".slate_assessment_type_dropdown_options");
    expect(wrapper).toHaveLength(1);
  });
});
