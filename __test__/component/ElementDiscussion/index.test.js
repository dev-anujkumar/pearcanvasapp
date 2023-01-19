import React from "react";
import { mount  } from "enzyme";
import thunk from "redux-thunk";
import ElementDiscussion from "../../../src/component/ElementDiscussion/index";
jest.mock('../../../src/component/tinyMceEditor.js', () => {
    return function () {
        return (<div>null</div>)
    }
})
jest.mock('./../../../src/component/CanvasWrapper/CanvasWrapper_Actions', () => {
  return { 
    getLOBDiscussionItems: ()=>{
        return jest.fn()
    },
    resetLOBDiscussionItems: ()=>{
        return jest.fn()
    },
}
})
jest.mock('./../../../src/component/ElementContainer/ElementContainer_Actions', () => {
  return { 
    updateElement: ()=>{
        return jest.fn()
    }
}
})
jest.mock('../../../src/constants/utility.js', () => {
  return {
      hasReviewerRole: () => {
          return false
      },
      handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' ),
      sendDataToIframe: jest.fn(),
  }
});
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
      discussionItems: [{discussionUrn:'', title:""}],
      lineOfBusiness: "lineOfBusiness"
  },
};

const props = {
  element: {
    html: {
      title: "I am label of discussion"
    },
    blockdata: {
      itemid: "test",
      importeddiscussiontitle: "test",
      usagetype: "test",
      smartlink: "test",
      lineOfBusiness: "LOB"
    }
  },
  permissions: "test",
  handleEditorFocus: "test",
  index: "test",
  slateLockInfo: "test",
  elementId: "test",
  hasReviewerRole: jest.fn(),
  getLOBDiscussionItems: jest.fn(),
  resetLOBDiscussionItems: jest.fn(),
  updateElement: jest.fn()
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
    
    const usageTypeDropDown = ConnectedDiscussion.find(".singleAssessment_Dropdown_activeDropdown").childAt(0);
    usageTypeDropDown.simulate("click");
    const wrapper = ConnectedDiscussion.find(".slate_assessment_type_dropdown_options").simulate('click');
    expect(wrapper).toHaveLength(1);
    const wrapper2 = ConnectedDiscussion.find(".discussionImage").simulate('click');
    expect(wrapper2).toHaveLength(1);
  });
});
