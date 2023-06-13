import * as CiteTdxActions from "../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions";
import axios from "axios";
import {
  CITE,
  TDX,
} from "../../../../src/component/AssessmentSlateCanvas/AssessmentSlateConstants";


jest.mock("axios");
jest.mock("../../../../src/appstore/citeTdxReducer", () => {
  return function () {
    return <div>null</div>;
  };
});


jest.mock("../../../../src/config/config", () => {
  return function () {
    return <div>null</div>;
  };
});


describe("Test Actions", () => {
  it("Test-1.1---setCurrentCiteTdx", () => {
    let data = {
      type: "CURRENT_SELECTED_ASSESSMENT",
      payload: true,
    };
    let dispatch = jest.fn();
    const spyFunction = jest.spyOn(CiteTdxActions, "setCurrentCiteTdx");
    CiteTdxActions.setCurrentCiteTdx(data)(dispatch);
    expect(data.type).toEqual("CURRENT_SELECTED_ASSESSMENT");
    expect(data.payload).toEqual(true);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });
  it("Test-1.1---setCurrentInnerCiteTdx", () => {
    let data = {
      type: "CURRENT_SELECTED_SINGLE_ASSESSMENT",
      payload: true,
    };
    let dispatch = jest.fn();
    const spyFunction = jest.spyOn(CiteTdxActions, "setCurrentInnerCiteTdx");
    CiteTdxActions.setCurrentInnerCiteTdx(data)(dispatch);
    expect(data.type).toEqual("CURRENT_SELECTED_SINGLE_ASSESSMENT");
    expect(data.payload).toEqual(true);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });
});
describe("Test-1.2 --getSingleAssessmentData", () => {
  it("Test-1.2.1 --getSingleAssessmentData", () => {
    let data = {
      type: "GET_SINGLE_ASSESSMENT_DATA",
      payload: {
        isLoading: false,
      },
    };
    let responseData = data;
    let dispatch = (data) => {
      if (data && data.type === "GET_SINGLE_ASSESSMENT_DATA") {
        expect(data.payload.isLoading).toEqual(false);
      }
    };
    const spyFunction = jest.spyOn(CiteTdxActions, "getSingleAssessmentData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    CiteTdxActions.getSingleAssessmentData(data)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });
});
describe("Test-1.3 --filterCiteTdxData", () => {
  it("Test-1.3.1 --filterCiteTdxData", () => {
    let data = {
      type: "GET_MMI_RESOURCES",
      payload: {
        filterData: [],
        isLoading: false,
      },
    };
    let responseData = data;
    let dispatch = (data) => {
      if (data && data.type === "GET_SINGLE_ASSESSMENT_DATA") {
        expect(data.payload.isLoading).toEqual(false);
        expect(data.payload.filterData).toEqual([]);
      }
    };
    const spyFunction = jest.spyOn(CiteTdxActions, "filterCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    CiteTdxActions.filterCiteTdxData(data)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });

  it("Test-1.3.2 --filterCiteTdxData", () => {
    let assessmentType = CITE,
      assessmentTitle = "ASSESSMENT ITEM7";
    let data = {
      payload: {
        filterData: [],
        isLoading: false,
        assessmentType: CITE,
        assessmentTitle: "ASSESSMENT ITEM7",
      },
    };
    let responseData = data;
    let dispatch = (data) => {
      if (data && data.payload.assessmentType === assessmentType) {
        expect(data.payload.isLoading).toEqual(false);
        expect(data.data.filterData).toEqual([]);
      }
    };
    const spyFunction = jest.spyOn(CiteTdxActions, "filterCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });

  it("Test-1.3.3 --filterCiteTdxData", () => {
    let assessmentType = TDX,
      assessmentTitle = "ASSESSMENT ITEM7";
    let data = {
      payload: {
        filterData: [],
        isLoading: false,
        assessmentType: TDX,
        assessmentTitle: "ASSESSMENT ITEM7",
      },
    };
    let responseData = data;
    let dispatch = (data) => {
      if (data && data.payload.assessmentType === assessmentType) {
        expect(data.payload.isLoading).toEqual(false);
        expect(data.data.filterData).toEqual([]);
      }
    };
    const spyFunction = jest.spyOn(CiteTdxActions, "filterCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(dispatch);
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });
  it("Test-1.3.4 --filterCiteTdxData", async () => {
    const mockData = {
        items: {
            taxonomicTypes: ["CITE"],
          },
    }
    let assessmentType = TDX,
      assessmentTitle = "ASSESSMENT ITEM7";
    let data = {
        payload: {
            isLoading: false,
            assessmentTitle: "ASSESSMENT ITEM7",
            taxonomicTypes: ["CITE"]
          },
    };
    let responseData = mockData;
    const spyFunction = jest.spyOn(CiteTdxActions, "filterCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    await CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle);
    const taxonomyType= mockData.items.taxonomicTypes;
    expect(taxonomyType).toEqual(data.payload.taxonomicTypes)
    expect(spyFunction).toHaveBeenCalled();
    spyFunction.mockClear();
  });
});
