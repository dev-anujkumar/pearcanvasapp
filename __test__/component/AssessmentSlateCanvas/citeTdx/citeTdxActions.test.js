import * as CiteTdxActions from "../../../../src/component/AssessmentSlateCanvas/assessmentCiteTdx/Actions/CiteTdxActions";
import axios from "axios";
import {
  CITE,
  TDX,
} from "../../../../src/component/AssessmentSlateCanvas/AssessmentSlateConstants";
import * as functionsModule from "../../../../src/js/apiCancelRequestHandlers";


jest.mock("axios");
jest.mock("../../../../src/appstore/citeTdxReducer", () => {
  return function () {
    return <div>null</div>;
  };
});
// jest.mock("../../../../src/js/apiCancelRequestHandlers.js", () => ({
//   axiosGetAPI: function(){
//     return {
      // data: {
      //   name: 'testname',
      //   assesssments: [1,2,3],
      //   taxonomicTypes: ['a','b','c']
      // }
//     }}
// }));


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
  it("filterCiteTdxData when response.data has assesssments", async () => {
    let assessmentType = TDX,
      assessmentTitle = "ASSESSMENT ITEM7";
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        assesssments: [1,2,3],
        taxonomicTypes: ['a','b','c']
      }
    });
    await CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(jest.fn());
  });
  it("filterCiteTdxData when response.data does not have assesssments", async () => {
    let assessmentType = TDX,
      assessmentTitle = "testname";
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        tests: [1,2,3],
        taxonomicTypes: ['TDX','b','c']
      }
    });
    await CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(jest.fn());
  });
  it("filterCiteTdxData when response.data does not have assesssments", async () => {
    let assessmentType = TDX,
      assessmentTitle = "testname";
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        tests: [1,2,3],
        taxonomicTypes: ['TDX','b','c'],
        versionUrn: 'test',
        dateModified: '20-09-2023',
        createdBy: 'test user'
      }
    });
    await CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(jest.fn());
  });
  it("filterCiteTdxData when res.data.taxonomicTypes.length = 0", async () => {
    let assessmentType = TDX,
      assessmentTitle = "testname";
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: undefined,
        tests: [1,2,3],
        taxonomicTypes: [],
        versionUrn: 'https://test.com'
      }
    });
    await CiteTdxActions.filterCiteTdxData(assessmentType, assessmentTitle)(jest.fn());
  });
  it("getCiteTdxData with sortOrder = 0", async () => {
    let assessmentType = TDX,
      assessmentTitle = "ASSESSMENT ITEM7",
      filterUUID = '123';
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
    let getState = () => {
      return {
        citeTdxReducer: {
          sortBy: 'asc',
          sortOrder: 0
        }
      }
    };
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        assesssments: [1,2,3],
        taxonomicTypes: ['a','b','c']
      }
    });
    // const spyFunction = jest.spyOn(CiteTdxActions, "getCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    await CiteTdxActions.getCiteTdxData(assessmentType, assessmentTitle, filterUUID)(dispatch, getState);
  });
  it("getCiteTdxData with sortOrder = 1", async () => {
    let assessmentType = 'random',
      assessmentTitle = "",
      filterUUID = '123';
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
    let getState = () => {
      return {
        citeTdxReducer: {
          // sortBy: 'asc',
          sortOrder: 1
        }
      }
    };
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        // assesssments: [1,2,3],
        taxonomicTypes: ['a','b','c']
      }
    });
    // const spyFunction = jest.spyOn(CiteTdxActions, "getCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    await CiteTdxActions.getCiteTdxData(assessmentType, assessmentTitle, filterUUID)(dispatch, getState);
  });
  it("getCiteTdxData with no sortOrder", async () => {
    let assessmentType = CITE,
      assessmentTitle = "ASSESSMENT ITEM7",
      filterUUID = '123';
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
    let getState = () => {
      return {
        citeTdxReducer: {
          sortBy: 'asc',
        }
      }
    };
    const mockFetchData = jest.spyOn(functionsModule, 'axiosGetAPI');
    mockFetchData.mockReturnValue({
      data: {
        name: 'testname',
        assesssments: [1,2,3],
        taxonomicTypes: ['a','b','c']
      }
    });
    // const spyFunction = jest.spyOn(CiteTdxActions, "getCiteTdxData");
    axios.get = jest.fn(() => Promise.resolve(responseData));
    await CiteTdxActions.getCiteTdxData(assessmentType, assessmentTitle, filterUUID)(dispatch, getState);
  });
  it("getMCQGuidedData", async () => {
    let workUrn = "abcd1234";
    await CiteTdxActions.getMCQGuidedData(workUrn);
  });
  it("assessmentSorting", async () => {
    let sortBy = 'asc',sortOrder = 0;
    await CiteTdxActions.assessmentSorting(sortBy, sortOrder)(jest.fn(), jest.fn());
  });
  it("specialCharacterDecode", async () => {
    let encodedString="abcd345";
    await CiteTdxActions.specialCharacterDecode(encodedString);
  });
  it("specialCharacterDecode with encodedString as false", async () => {
    let encodedString=false;
    await CiteTdxActions.specialCharacterDecode(encodedString);
  });
  it("setAssessmentFilterParams", async () => {
    let title="abcd1234", uuid=123456;
    await CiteTdxActions.setAssessmentFilterParams(title, uuid);
  });
});
