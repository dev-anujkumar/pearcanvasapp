import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as updateHelpers from '../../../src/component/ElementContainer/ElementContainerUpdate_helpers';
import { slateWithCitationElement, slateWithCitationElement2, slateWithPopupData, slateWithShowhideData, updateBL, updateBL2, updateBL3, updateBL4, updateBL_IN_AS, updateBL_IN_AS2, updateBL_IN_AS3, updateBL_IN_AS4, updateBL_IN_SH, updateBL_IN_SH2, updateBL_IN_SH3, updateBL_IN_WE, updateBL_IN_WE2, updateBL_IN_WE3, updateBL_IN_WE4, updateBL_IN_2C_3C, updateBL_IN_2C_3C2, updateBL_IN_2C_3C3, updateBL_IN_2C_3C4, communicationAssessmentSlateData, update_BL_in_TB1, update_BL_in_TB2, update_BL_in_TB3, update_BL_in_TB4} from "../../../fixtures/slateTestingData"
import { multiColumnContainer } from "../../../fixtures/multiColumnContainer";
import config from '../../../src/config/config.js';
import { stub } from 'sinon';
import { slateLevelData, newTabSlate } from "../../../fixtures/containerActionsTestingData"
import { AUTHORING_ELEMENT_UPDATE } from '../../../src/constants/Action_Constants';
import { JSDOM } from 'jsdom'
import metadataTestData from '../../../fixtures/ElementMetadataAnchorTestData';
import { mockAutoNumberReducerEmpty } from '../FigureHeader/AutoNumberApiTestData';
import { LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES, autoNumberFigureTypesAllowed } from '../../../src/component/FigureHeader/AutoNumberConstants';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
global.document = (new JSDOM()).window.Element;
jest.mock('../../../src/constants/utility.js', () => ({
    sendDataToIframe: jest.fn(),
    hasReviewerRole: jest.fn(),
    handleTinymceEditorPlugins: jest.fn(()=> 'lists advlist placeholder charmap paste image casechange' )
}))
jest.mock('../../../src/component/TcmSnapshots/TcmSnapshots_Utility.js', () => ({
    tcmSnapshotsForUpdate: jest.fn(),
    prepareTcmSnapshots: jest.fn()
}))
jest.mock('../../../src/component/ShowHide/ShowHide_Helper.js', () => ({
    getShowHideElement: jest.fn(() => {
        return {
            interactivedata: {
                show: [{
                    id: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a',
                    type: 'element-authoredtext',
                    elementdata: {
                        text: ''
                    }
                }]
            },
            type: 'showhide'
        }
    }),
    findSectionType: jest.fn(()=> "show")
}))
let cb = new stub();
jest.setTimeout(10000);

describe('Tests ElementContainer Actions - Update helper methods', () => {
    let initialState = {
        slateLevelData: slateLevelData,
        appStore: {
            slateLevelData: slateLevelData.slateLevelData,
            oldFiguredata: null,
            isCypressPlusEnabled: true
        },
        learningToolReducer: {
            shouldHitApi: false,
            learningToolTypeValue: '',
            apiResponse: [],
            showErrorMsg: true, //should be false
            showLTBody: false,
            learningTypeSelected: false,
            showDisFilterValues: false,
            selectedResultFormApi: '',
            resultIsSelected: false,
            toggleLT: false,
            linkButtonDisable: true,
            apiResponseForDis: [],
            learningToolDisValue: '',
            numberOfRows: 25,
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: { elementWorkId: "4343653" },
            glossaryFootNoteCurrentValue: "",
            elementIndex: ""
        },
        tcmReducer:{
            tcmSnapshot:[{
                elemURN : "urn:pearson:work:123"
            }]
        },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" },
        assessmentReducer: {
            saveAutoUpdateData : {
                newAssessmentId: "urn:pearson:work:23454423342",
                oldAssessmentId: "urn:pearson:work:23454424325"
            }
        },
        autoNumberReducer: mockAutoNumberReducerEmpty,
        markedIndexReducer:{
            markedIndexValue: {elementWorkId:""},
            markedIndexCurrentValue: "",
            elementIndex: ""
        }
    };

    let initialState2 = {
        slateLevelData: slateWithCitationElement,
        appStore: {
            slateLevelData: slateWithCitationElement.slateLevelData,
            oldFiguredata: null
        },
        learningToolReducer: {
            shouldHitApi: false,
            learningToolTypeValue: '',
            apiResponse: [],
            showErrorMsg: true, //should be false
            showLTBody: false,
            learningTypeSelected: false,
            showDisFilterValues: false,
            selectedResultFormApi: '',
            resultIsSelected: false,
            toggleLT: false,
            linkButtonDisable: true,
            apiResponseForDis: [],
            learningToolDisValue: '',
            numberOfRows: 25,
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: { elementWorkId: "4343653" },
            glossaryFootNoteCurrentValue: "",
            elementIndex: ""
        },
        tcmReducer:{
            tcmSnapshot:[{
                elemURN : "urn:pearson:work:123"
            }]
        },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState3 = {
        slateLevelData: slateWithCitationElement2,
        appStore: {
            slateLevelData: slateWithCitationElement2.slateLevelData,
            oldFiguredata: null
        },
        learningToolReducer: {
            shouldHitApi: false,
            learningToolTypeValue: '',
            apiResponse: [],
            showErrorMsg: true, //should be false
            showLTBody: false,
            learningTypeSelected: false,
            showDisFilterValues: false,
            selectedResultFormApi: '',
            resultIsSelected: false,
            toggleLT: false,
            linkButtonDisable: true,
            apiResponseForDis: [],
            learningToolDisValue: '',
            numberOfRows: 25,
        },
        glossaryFootnoteReducer: {
            glossaryFootnoteValue: { elementWorkId: "4343653" },
            glossaryFootNoteCurrentValue: "",
            elementIndex: ""
        },
        tcmReducer:{
            tcmSnapshot:[{
                elemURN : "urn:pearson:work:123"
            }]
        },
        assetPopOverSearch: { assetID: "urn:pearson:work:23454423342" },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState4 = {
        slateLevelData: updateBL_IN_SH,
        appStore: {
            slateLevelData: updateBL_IN_SH.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState5 = {
        slateLevelData: updateBL_IN_SH2,
        appStore: {
            slateLevelData: updateBL_IN_SH2.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState6 = {
        slateLevelData: updateBL_IN_SH3,
        appStore: {
            slateLevelData: updateBL_IN_SH3.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState7 = {
        slateLevelData: updateBL_IN_AS,
        appStore: {
            slateLevelData: updateBL_IN_AS.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState8 = {
        slateLevelData: updateBL_IN_AS2,
        appStore: {
            slateLevelData: updateBL_IN_AS2.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState9 = {
        slateLevelData: updateBL_IN_AS3,
        appStore: {
            slateLevelData: updateBL_IN_AS3.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    };

    let initialState10 = {
        slateLevelData: updateBL_IN_AS4,
        appStore: {
            slateLevelData: updateBL_IN_AS4.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState11 = {
        slateLevelData: updateBL_IN_WE,
        appStore: {
            slateLevelData: updateBL_IN_WE.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState12 = {
        slateLevelData: updateBL_IN_WE2,
        appStore: {
            slateLevelData: updateBL_IN_WE2.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState13 = {
        slateLevelData: updateBL_IN_WE3,
        appStore: {
            slateLevelData: updateBL_IN_WE3.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState14 = {
        slateLevelData: updateBL_IN_WE4,
        appStore: {
            slateLevelData: updateBL_IN_WE4.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState15 = {
        slateLevelData: updateBL,
        appStore: {
            slateLevelData: updateBL.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState16 = {
        slateLevelData: updateBL2,
        appStore: {
            slateLevelData: updateBL2.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState17 = {
        slateLevelData: updateBL3,
        appStore: {
            slateLevelData: updateBL3.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState18 = {
        slateLevelData: updateBL4,
        appStore: {
            slateLevelData: updateBL4.slateLevelData,
            oldFiguredata: null
        },
        autoNumberReducer: mockAutoNumberReducerEmpty
    }

    let initialState19 = {
      slateLevelData: updateBL_IN_2C_3C,
      appStore: {
          slateLevelData: updateBL_IN_2C_3C.slateLevelData,
          oldFiguredata: null
      },
      autoNumberReducer: mockAutoNumberReducerEmpty
  };

  let initialState20 = {
      slateLevelData: updateBL_IN_2C_3C2,
      appStore: {
          slateLevelData: updateBL_IN_2C_3C2.slateLevelData,
          oldFiguredata: null
      },
      autoNumberReducer: mockAutoNumberReducerEmpty
  };

  let initialState21 = {
      slateLevelData: updateBL_IN_2C_3C3,
      appStore: {
          slateLevelData: updateBL_IN_2C_3C3.slateLevelData,
          oldFiguredata: null
      },
      autoNumberReducer: mockAutoNumberReducerEmpty
  };

  let initialState22 = {
   slateLevelData: updateBL_IN_2C_3C4,
   appStore: {
       slateLevelData: updateBL_IN_2C_3C4.slateLevelData,
       oldFiguredata: null
   },
   autoNumberReducer: mockAutoNumberReducerEmpty
};

    let asideData = {
        id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
        type: "element-aside"
    }
    let updatedData = {
        "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "type": "element-authoredtext",
        "subtype": "",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
            "text": ""
        },
        "html": {
            "text": "<p class=\"paragraphNumeroUno\"><br></p>"
        },
        "comments": false,
        "tcm": true,
        "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
        "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
        "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
        "displayedlabel" : "displayedlabel",
        "manualoverride" : "manualoverride"
    }
    let updatedData2 = {
      "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
      "type": "element-pdf",
      "subtype": "",
      "schema": "http://schemas.pearson.com/wip-authoring/element/1",
      "elementdata": {
          "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
          "text": ""
      },
      "html": {
          "text": "<p class=\"paragraphNumeroUno\"><br></p>"
      },
      "comments": false,
      "tcm": true,
      "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
      "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
      "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
  }
    let assessmentUpdatedData = {
      "id":"urn:pearson:work:1a311208-368a-4d2c-bc62-0c48909e49e3",
      "type":"element-assessment",
      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
      "elementdata":{
        "schema":"http://schemas.pearson.com/wip-authoring/assessment/1#/definitions/assessment",
        "assessmentid":"urn:pearson:work:cefad992-88fb-4063-b9d5-14dd165e575e",
        "assessmenttitle":"test",
        "assessmentformat":"puf",
        "usagetype":"Concept Check",
        "loAssociation":true
      },
      "versionUrn":"urn:pearson:work:1a311208-368a-4d2c-bc62-0c48909e49e3",
      "contentUrn":"urn:pearson:entity:4e4d9ef2-7326-4dfb-9672-6a101b8b2baa",
      "inputType":"ELEMENT_ASSESSMENT",
      "inputSubType":"NA",
      "index":"0",
      "elementParentEntityUrn":"urn:pearson:entity:9d655572-b631-46a5-85ec-8634b503f9d2",
      "slateVersionUrn":"urn:pearson:manifest:16b18e5f-7aa4-4b55-8a05-af4ab708d36d",
      "html":{
        "title":"<p>test</p>"
      }
    }
    let parentElement = {
        "id": "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
        "type": "element-aside",
        "subtype": "sidebar",
        "designtype": "asideSidebar02",
        "elementdata": {
            "schema": "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
            "frontmatter": [],
            "bodymatter": [
                {
                    "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527"
                },
                {
                    "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "type": "showhide",
                    "subtype": "",
                    "designtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                    "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "interactivedata": {
                        "postertextobject": [
                            {
                                "type": "element-authoredtext",
                                "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                                "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                            }
                        ],
                        "show": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                            }
                        ],
                        "hide": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                            }
                        ]
                    }
                }
            ],
            "backmatter": []
        },
        "contentUrn": "urn:pearson:entity:2b489c98-5e61-46d8-967c-6354b28e3679",
        "versionUrn": "urn:pearson:manifest:591b8d42-7966-4337-912d-0635e328dfb2"
    }
    describe("UpdateStoreInCanvas helper method", () => {
        it("Versioned element - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData: {...updatedData, pageNumberRef: "1"}, 
                asideData,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: "1-2-2",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - asideData - showhide - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData: {...updatedData, pageNumberRef: "1"}, 
                asideData: {
                    ...asideData,
                    type: 'showhide',
               grandParent:
               {
                  asideData:
                  {
                        type: "groupedcontent"
                     }
               }
                },
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: "1-2-2",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData.slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - asideData - showhide - updateNewVersionElementInStore - getShowhideParent : if > if", () => {
         let args = { 
             updatedData: {...updatedData, pageNumberRef: "1"}, 
             asideData: {
                 ...asideData,
                 type: 'showhide',
            grandParent:
            {
               asideData:
               {
                     type: "element-aside"
                  }
            }
             },
             dispatch: jest.fn(),
             versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
             elementIndex: "1-2-2",
             parentElement,
             fetchSlateData: jest.fn(),
             newslateData: slateLevelData.slateLevelData,
             slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             }
         }

         const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
         updateHelpers.updateNewVersionElementInStore(args)
         expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
         spyUpdateNewVersionElementInStore.mockClear()
     })
     it("Versioned element - asideData - showhide - updateNewVersionElementInStore - getShowhideParent : if > if > else", () => {
      let args = { 
          updatedData: {...updatedData, pageNumberRef: "1"}, 
          asideData: {
              ...asideData,
              type: 'showhide',
         grandParent:
         {
            asideData:
            {
               parent :
               {
                     type: "groupedcontent"
                  }
            }
            }
          },
          dispatch: jest.fn(),
          versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
          elementIndex: "1-2-2",
          parentElement,
          fetchSlateData: jest.fn(),
          newslateData: slateLevelData.slateLevelData,
          slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
          autoNumberDetails : {
              autoNumberSettingsOption: '',
              isAutoNumberingEnabled: true
          }
      }

      const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
      updateHelpers.updateNewVersionElementInStore(args)
      expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
      spyUpdateNewVersionElementInStore.mockClear()
  })
  it("Versioned element - updateNewVersionElementInStore", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData:  {
         type: "element-aside",
         indexes: [4],
         parent:{type : 'groupedcontent'}
     },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2-2",
       parentElement,
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
it("Versioned element - updateNewVersionElementInStore2", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: {
         ...asideData,
         type: 'poetry',
    grandParent:
    {
       asideData:
       {
             type: "showhide",
             parent:
             {
                type: "groupedcontent"
             }
          }
    }
     },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2-2",
       parentElement,
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
  it("Versioned element - asideData - showhide - updateNewVersionElementInStore - getShowhideParent : if > if > if", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: {
           ...asideData,
           type: 'showhide',
      grandParent:
      {
         asideData:
         {
               type: "element-aside",
               parent:
               {
                  type: "groupedcontent"
               }
            }
      }
       },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2",
       parentElement,
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData.slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
it("Versioned element - updateNewVersionElementInStore3", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: {
         ...asideData,
         type: 'poetry',
    grandParent:
    {
       asideData:
       {
             type: "showhide",
             parent:
             {
                type: "groupedcontent"
             }
          }
    }
     },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2-2",
       parentElement,
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
  it("Versioned element - updateNewVersionElementInStore4", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: {
           type: 'poetry',
      grandParent:
      {
         asideData:
         {
               type: "groupedcontent",
               parent:
               {
                  type: "groupedcontent"
               }
            }
      }
       },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2-2-2",
      parentElement: { "type": "citations" },
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData.slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
it("Versioned element - updateNewVersionElementInStore4", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: {
           type: 'groupedcontent',
       },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
       elementIndex: "1-2-2-2-2",
      parentElement: { "type": "citations" },
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData.slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})
it("Versioned element - updateNewVersionElementInStore4", () => {
   let args = { 
       updatedData: {...updatedData, pageNumberRef: "1"}, 
       asideData: { id: "urn:pearson:manifest:8a49e877-144a-4750-92d2-81d5188d8e0b",
           type: 'groupedcontent',
           contentUrn: "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
       },
       dispatch: jest.fn(),
       versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c'},
       elementIndex: "1-2-2",
      parentElement: { "type": "citations" },
       fetchSlateData: jest.fn(),
       newslateData: slateLevelData.slateLevelData,
       slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
       autoNumberDetails : {
           autoNumberSettingsOption: '',
           isAutoNumberingEnabled: true
       }
   }

   const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
   updateHelpers.updateNewVersionElementInStore(args)
   expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
   spyUpdateNewVersionElementInStore.mockClear()
})

        it("Versioned element - showhide - updateNewVersionElementInStore", () => {
            let store = mockStore(() => initialState);
            let args = { 
                updatedData, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: null,
                parentElement: {
                    "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "type": "showhide",
                    "subtype": "",
                    "designtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                    "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                    "interactivedata": {
                        "postertextobject": [
                            {
                                "type": "element-authoredtext",
                                "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                                "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                            }
                        ],
                        "show": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                            }
                        ],
                        "hide": [
                            {
                                "type": "element-authoredtext",
                                "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                            }
                        ]
                    }
                },
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - paragraph - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: 0,
                parentElement: updatedData,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData.slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph element inside aside", () => {
            let store = mockStore(() => initialState);
            let args = { 
                updatedData,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph element inside aside-2", () => {
            let store = mockStore(() => initialState);
            let args = { 
                updatedData,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph element in a slate", () => {

            const elementToUpdate = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })

       it("updateElementInStore - update element in Tab inside TB element", () => {

          const elementToUpdate = {
             "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
             "type": "figure",
             "schema": "http://schemas.pearson.com/wip-authoring/element/1",
             "html": {
                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
             },
             "comments": false,
             "tcm": true,
             "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
             "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
             "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
          }
          let store = mockStore(() => initialState);
          let args = {
             updatedData: elementToUpdate,
             asideData: {subtype: 'tab'},
             parentUrn: null,
             elementIndex: { split: () => { return [1, 0, 0, 3]}},
             showHideType: null,
             parentElement: {type: 'groupedcontent'},
             dispatch: store.dispatch,
             newslateData: newTabSlate.slateLevelData,
             autoNumberDetails: {
                autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd" },
                isAutoNumberingEnabled: true
             }
          }
          const expectedAction = {
             type: AUTHORING_ELEMENT_UPDATE,
             payload: {
                slateLevelData: newTabSlate.slateLevelData
             }
          }
          const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
          updateHelpers.updateElementInStore(args)
          expect(spyupdateElementInStore).toHaveBeenCalled()
          expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
          spyupdateElementInStore.mockClear()
       })
       it("updateElementInStore - update element in Tab inside TB element else case conditional coverage", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "figure",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "html": {
               "text": "<p class=\"paragraphNumeroUno\"><br></p>"
            },
            "comments": false,
            "tcm": true,
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {subtype: 'tab'},
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 0, 3]}},
            showHideType: null,
            parentElement: {type: 'groupedcontent'},
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->HEAD->Popup if case (postertextobject)", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "popup",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
            "sectionType": "postertextobject"
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 0, 4, 0]}},
            showHideType: null,
            parentElement: {type: 'popup'},
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->HEAD->Popup else case for conditional coverage", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "popup",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c"
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 0, 4, 0]}},
            showHideType: null,
            parentElement: {type: 'popup'},
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->BODY->Popup if case (postertextobject)", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "popup",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
            "sectionType": "postertextobject"
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 0, 4, 1, 1]}},
            showHideType: null,
            parentElement: {type: 'popup'},
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->BODY->Popup else case for conditional coverage", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "popup",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 0, 4, 1, 1]}},
            showHideType: null,
            parentElement: {type: 'popup'},
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->HEAD->figure case 5 index length", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "figure",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 1, 1, 0]}},
            showHideType: null,
            parentElement: null,
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->HEAD->figure case 6 index length", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "figure",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 1, 1, 1, 0]}},
            showHideType: null,
            parentElement: null,
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbd" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update element in TB->Tab->WE->HEAD->figure case 6 index length else case for conditional coverage", () => {

         const elementToUpdate = {
            "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "type": "figure",
            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c",
            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
            "slateVersionUrn": "urn:pearson:manifest:61b991e6-8a64-4214-924c-bb60c34cbe1c",
         }
         let store = mockStore(() => initialState);
         let args = {
            updatedData: elementToUpdate,
            asideData: {type: 'element-aside', parent: {type: 'groupedcontent', subtype: 'tab'} },
            parentUrn: null,
            elementIndex: { split: () => { return [1, 0, 1, 1, 1, 0]}},
            showHideType: null,
            parentElement: null,
            dispatch: store.dispatch,
            newslateData: newTabSlate.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: { entityUrn: "urn:pearson:entity:778e227e-2da6-47d9-8afe-963f443f1dbe" },
               isAutoNumberingEnabled: true
            }
         }
         const expectedAction = {
            type: AUTHORING_ELEMENT_UPDATE,
            payload: {
               slateLevelData: newTabSlate.slateLevelData
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
      })
        it("updateElementInStore - opener element in a slate", () => {
            
            const elementToUpdate = { 
                "id": "urn:pearson:work:10061bb1-bf07-4406-ab1e-33545422d117", 
                "type": "openerelement", 
                "schema": "http://schemas.pearson.com/wip-authoring/openerelement/1", 
                "title": { 
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                }, 
                "versionUrn": "urn:pearson:work:10061bb1-bf07-4406-ab1e-33545422d117", 
                "contentUrn": "urn:pearson:entity:7b224cc4-7f41-4dfe-ba8a-8ced858e83c7", 
                "backgroundcolor": "#005A70", 
                "backgroundimage": { 
                    "path": "", 
                    "schema": "http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                    "imageid": "" 
                }, 
                "status": "wip", 
                "textcolor": "option1",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0d",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup formatted title inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup posterText object inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb7512",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4eb",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("Versioned element - popup - updateNewVersionElementInStore", () => {
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                    "type": "element-authoredtext",
                    "subtype": "",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": ""
                    },
                    "html": {
                        "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "comments": false,
                    "tcm": true,
                    "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                    "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                    "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                    "elementParentEntityUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                    "metaDataField" : "formattedTitle" 
                }, 
                asideData: null,
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b"},
                elementIndex: 0,
                parentElement: {
                    "id": "urn:pearson:manifest:98e4bdcc-9aa2-44c9-821e-1e5a0962578f",
                    "type": "popup",
                    "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/popup",
                    "contentUrn": "urn:pearson:entity:08e45ea5-03fe-42d9-9fd8-be02cab7c244",
                    "versionUrn": "urn:pearson:manifest:98e4bdcc-9aa2-44c9-821e-1e5a0962578f",
                    "popupdata": {
                        "postertextobject": {

                        },
                        "formatted-title": {
                            "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                            "type": "element-authoredtext",
                            "subtype": "",
                            "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata": {
                                "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text": ""
                            },
                            "html": {
                                "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                            },
                            "comments": false,
                            "tcm": true,
                            "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                            "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                            "slateUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                        },
                        "formatted-subtitle": {}

                    }
                },
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData.slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("updateElementInStore - citation element ", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-citation",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. Psychological Monographs, 47(211).",
                        "textsemantics":
                        [
                            {
                                "type": "strong",
                                "charStart": 81,
                                "charEnd": 105
                            }
                        ]
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: '0-1',
                showHideType: null,
                parentElement: { "type": "citations" },
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore2 - citation element ", () => {
            let store = mockStore(() => initialState3);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-citation",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. Psychological Monographs, 47(211).",
                        "textsemantics":
                        [
                            {
                                "type": "strong",
                                "charStart": 81,
                                "charEnd": 105
                            }
                        ]
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUnoCitation" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: '0-1',
                showHideType: null,
                parentElement: { "type": "citations" },
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement2.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement2.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph inside citation group", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. Psychological Monographs, 47(211).",
                        "textsemantics":
                        [
                            {
                                "type": "strong",
                                "charStart": 81,
                                "charEnd": 105
                            }
                        ]
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUno" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: null,
                parentElement: { "type": "citations" },
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - Multi-column", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    "id": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "type": "element-authoredtext",
                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata": {
                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text": "Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. Psychological Monographs, 47(211).",
                        "textsemantics":
                        [
                            {
                                "type": "strong",
                                "charStart": 81,
                                "charEnd": 105
                            }
                        ]
                    },
                    "html" : {
                        "text":`<p class="paragraphNumeroUno" data-contenturn="urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d" data-versionurn="urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635">Allport, G. W., &amp; Odbert, H. S. (1936). Trait names: A psycho-lexical study. <em>Psychological Monographs,</em> 47(211). The CITE classes for the containing the WiP's "element-citation" content should be decided based on the context of usage as described below. It follows the same logic as when paragraphNumeroUno and paragraphNummerEins. If the citation grouping.</p>`
                    },
                    "contentUrn": "urn:pearson:entity:fea111d6-7278-470c-934b-d96e334a7r4d",
                    "versionUrn": "urn:pearson:work:44d43f1b-3bdf-4386-a06c-bfa779f27635",
                    "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
                },
                asideData,
                parentUrn: null,
                elementIndex: "1-0-0",
                showHideType: null,
                parentElement: multiColumnContainer,
                dispatch: store.dispatch,
                newslateData: slateWithCitationElement.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateWithCitationElement.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
       it("updateNewVersionElementInStore - TB element ", () => {
          let store = mockStore(() => initialState);
          let args = {
             updatedData: {"slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"},
             asideData: { type: 'groupedcontent', subtype: 'tab', parent: { id: 'test id', contentUrn: 'test contentUrn' } },
             parentUrn: null,
             elementIndex: 0,
             showHideType: null,
             parentElement: {id: 'test id'},
             versionedData: {newParentVersion: ''},
             dispatch: jest.fn(),
             fetchSlateData: jest.fn(),
             newslateData: slateLevelData.slateLevelData,
             autoNumberDetails: {
                autoNumberSettingsOption: '',
                isAutoNumberingEnabled: true
             }
          }
          const spyupdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
          updateHelpers.updateNewVersionElementInStore(args);
          expect(spyupdateNewVersionElementInStore).toHaveBeenCalled();
          spyupdateNewVersionElementInStore.mockClear();
       })

        it("updateElementInStore - showhide inside aside element ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData,
                parentUrn: null,
                elementIndex: 0,
                showHideType: "show",
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - showhide inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34018",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec", type : 'element-aside' },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                },
                elementIndex: 0,
                showHideType: "show",
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - paragraph inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": "asdfasdfasdf"
                },
                "headers": [
                    {
                        "charStart": 0,
                        "charEnd": -1,
                        "level": 4
                    }
                ],
                "html": {
                    "text": "<h5 class=\"heading5NummerEins\">Heading 5</h5>"
                },
                "comments": true,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec", type : 'element-aside' },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                },
                elementIndex: 0,
                showHideType: "show",
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup postertext inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb79",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb79",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec", type : 'element-aside' },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                },
                elementIndex: 0,
                showHideType: "show",
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup formatted title inside Worked example ", () => {
            let store = mockStore(() => initialState);
            let updatedDataAsideShowhide = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0a",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let args = { 
                updatedData: updatedDataAsideShowhide,
                asideData: { id: "urn:pearson:manifest:c047b586-c963-47b7-bc59-9ec595c2c6ec", type : 'element-aside' },
                parentUrn: {
                    manifestUrn: "urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c"
                },
                elementIndex: 0,
                showHideType: "show",
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - showhide element", () => {
            const store = mockStore(() => initialState);
            const showHidePara = {
                ...updatedData,
                "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
            }
            const parentShowhide = {
                "id": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                "type": "showhide",
                "subtype": "",
                "designtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                "contentUrn": "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714",
                "versionUrn": "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02",
                "interactivedata": {
                    "postertextobject": [
                        {
                            "type": "element-authoredtext",
                            "contentUrn": "urn:pearson:entity:5e36e9b2-08f6-4841-bb2f-1beb08f28905",
                            "id": "urn:pearson:work:305cc470-3d3e-45f8-ae5d-4b10eff07e8f"
                        }
                    ],
                    "show": [
                        {
                            "type": "element-authoredtext",
                            "id": "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"
                        }
                    ],
                    "hide": [
                        {
                            "type": "element-authoredtext",
                            "id": "urn:pearson:work:743ddeed-104e-44ad-8f11-affdcf1b2019"
                        }
                    ]
                }
            }
            const args = { 
                updatedData: showHidePara,
                asideData: null,
                parentUrn: null,
                elementIndex: 0,
                showHideType: "show",
                parentElement: parentShowhide,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup formatted-title element in a slate", () => {

            const elementToUpdate = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb75",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - popup postertext element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:8a81206d-2fa2-4f62-a012-2b516dcebb7512",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:01e6b4a6-efb5-4f0b-b0e7-cdb47a84e4eb",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - poetry formatted title element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073g5w4",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - poetry creditsarray element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073go6t",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21073go6t",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - poetry stanza element in a slate", () => {
            const elementToUpdate = {
                "id": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                "type": "element-authoredtext",
                "subtype": "",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                    "text": ""
                },
                "html": {
                    "text": "<p class=\"paragraphNumeroUno\"><br></p>"
                },
                "comments": false,
                "tcm": true,
                "versionUrn": "urn:pearson:work:e1b59ae0-b04a-4b6e-a1a4-33e21077u97",
                "contentUrn": "urn:pearson:entity:b70a5dbe-cc3b-456d-87fc-e369ac59c527",
                "slateVersionUrn": "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
            }
            let store = mockStore(() => initialState);
            let args = { 
                updatedData: elementToUpdate,
                asideData: null,
                parentUrn: null,
                elementIndex: 2,
                showHideType: null,
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        xit("updateElementInStore - poetry stanza element in a slate", () => {
         let store = mockStore(() => initialState);
         const showHide = {
            "id":"urn:pearson:manifest:856a0a7f-e4f8-4cfa-9409-5f564ad1211f",
            "type":"showhide",
            "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
            "versionUrn":"urn:pearson:manifest:856a0a7f-e4f8-4cfa-9409-5f564ad1211f",
            "contentUrn":"urn:pearson:entity:b16f5b97-7ba9-4003-a252-26285d89efec",
            "status":"wip",
            "interactivedata":{
                "postertextobject":[
                    {
                    "id":"urn:pearson:work:1c35a5c1-0dc7-4616-a36d-158f976b13b0",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text":"Reveal Answer:"
                    },
                    "html":{
                        "text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>"
                    },
                    "versionUrn":"urn:pearson:work:1c35a5c1-0dc7-4616-a36d-158f976b13b0",
                    "contentUrn":"urn:pearson:entity:8d11dff2-9f0e-4773-817f-c57be2003340"
                    }
                ],
                "show":[{
                    "id":"urn:pearson:work:fc048ad1-475d-41f2-ab16-2b1131887647",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text":"sdasd"
                    },
                    "html":{
                        "text":"<p class=\"paragraphNumeroUno\">sdasd</p>"
                    },
                    "versionUrn":"urn:pearson:work:fc048ad1-475d-41f2-ab16-2b1131887647",
                    "contentUrn":"urn:pearson:entity:2630d7e2-f9ec-42fd-bb1d-fa654148d7ee"
                    }
                ],
                "hide":[
                    {
                    "id":"urn:pearson:work:9d8bb762-b8ee-43e8-b6a1-ce3489bbdb53",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                        "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                        "text":""
                    },
                    "html":{
                        "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:9d8bb762-b8ee-43e8-b6a1-ce3489bbdb53",
                    "contentUrn":"urn:pearson:entity:efdc2c7f-dd9b-47ce-a4f1-3fc712da04dd"
                    }
                ]
            },
            "index":"0-0-0-2"
        };
         const elementToUpdate = {
               id: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
               slateVersionUrn:"urn:pearson:manifest:9314e1bb-0cf9-45af-9529-adec388b8639",
               contents:{
                  bodymatter: [
                     {
                        contentUrn: "urn:pearson:entity:636eb51a-70a9-4cb8-81e2-b0ae0247ba76",
                        contents: {
                           bodymatter: []
                        },
                        id: "urn:pearson:manifest:43014725-efad-4056-ab61-a7b2e5ad6b2e",
                        index: 0,
                        numberedline: false,
                        schema: "http://schemas.pearson.com/wip-authoring/poetry/1",
                     },
                  ],
                  schema: "http://schemas.pearson.com/wip-authoring/manifest/1#/definitions/manifest",
                  title: {schema: "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", text: "Slate intro"}
               },
               pageCount: 0,
               pageLimit: 25,
               pageNo: 0,
               schema: "http://schemas.pearson.com/wip-authoring/intro/1",
               status: "approved",
               type: "chapterintro",
               contentUrn: "urn:pearson:entity:4657ec09-bde4-42e0-bebf-acba344829c5",
               versionUrn: "urn:pearson:manifest:9c5a75e1-5b38-4b03-bfc3-fb06aab65333",
         }
         let args = { 
             updatedData: elementToUpdate,
             asideData: { ...asideData, type: 'figure' },
             parentUrn: null,
             elementIndex: '0-0-0-0',
             showHideType: null,
             parentElement: {type: 'groupedcontent'},
             dispatch: store.dispatch,
            newslateData: elementToUpdate.slateVersionUrn,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             },
             isFromRC: true,
             slateParentData: elementToUpdate.slateVersionUrn,
             contents: {
               'formatted-title': {
                   html : {
                       text: "<p>test title</p>"
                   }
               }
           }
         }
         const expectedAction = {
             type: AUTHORING_ELEMENT_UPDATE,
             payload: {
                 slateLevelData: slateLevelData.slateLevelData
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
     })
        it("updateElementInStore - asideData - showhide", () => {
            let store = mockStore(() => initialState);
            let args = {
                updatedData,
                asideData: { ...asideData, type: 'showhide' },
                parentUrn: null,
                elementIndex: '0-1-1',
                showHideType: null,
                parentElement,
                dispatch: store.dispatch,
                newslateData: slateLevelData.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const expectedAction = {
                type: AUTHORING_ELEMENT_UPDATE,
                payload: {
                    slateLevelData: slateLevelData.slateLevelData
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
            spyupdateElementInStore.mockClear()
        })
        it("updateStore - approved element case", () => {
            const store = mockStore(() => initialState);
            
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: null,
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData, id: "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"},
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: store.dispatch,
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("updateStore - approved popup slate", () => {
            const store = mockStore(() => initialState);
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: null,
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData, id: "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019"},
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: jest.fn(),
            }
            args.currentSlateData.type = "popup"
            args.currentSlateData.status = "approved"
            config.tcmStatus = true
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("updateStore - showhide postertext update", () => {
            const store = mockStore(() => initialState);
            const args = { 
                updatedData,
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: "postertextobject",
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData },
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: jest.fn(),
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("Versioned element - updateNewVersionElementInStore - asideData - groupedcontent condition", () => {
            let args = { 
                updatedData: {...updatedData, pageNumberRef: "1"}, 
                asideData: {...asideData, parent: {type: 'groupedcontent'}},
                dispatch: jest.fn(),
                versionedData: {...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c'},
                elementIndex: "1-2-2-1",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - updateNewVersionElementInStore - asideData - newParentVersion", () => {
            let args = {
                updatedData: { ...updatedData, pageNumberRef: "1" },
                asideData: { ...asideData, parent: { type: 'groupedcontent' } },
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "1-2-2",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        xit("Versioned element - updateNewVersionElementInStore - asideData - showhide and groupedcontent", () => {
            let args = {
                updatedData: { ...updatedData, pageNumberRef: "1" },
                asideData: { ...asideData, type: 'showhide', grandParent: {asideData: {type: 'element-aside', parent: {type: 'groupedcontent'}}}},
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "1-2-2",
                parentElement,
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - updateNewVersionElementInStore - asideData - newParentVersion", () => {
            let args = {
                updatedData: { ...updatedData, pageNumberRef: "1", sectionType: "postertextobject", elementParentEntityUrn:'urn:pearson:entity:8a49e877-144a-4750-92d2-81d5188d8e0b'},
                asideData: null,
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "1-2-2",
                parentElement: {...parentElement, type:'popup'},
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })

        it("Versioned element - updateNewVersionElementInStore - asideData inside Showhide", () => {
            let args = {
                updatedData: { ...updatedData, pageNumberRef: "1", sectionType: "postertextobject", elementParentEntityUrn:'urn:pearson:entity:8a49e877-144a-4750-92d2-81d5188d8e0b'},
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-1-0-0",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "hide"},
                    subtype: "workedexample",
                    type: "element-aside"
                },
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "0-0-1-0-0",
                parentElement: {...parentElement, type:'showhide'},
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - updateNewVersionElementInStore - citations inside Showhide", () => {
            let args = {
                updatedData: { ...updatedData, pageNumberRef: "1", sectionType: "postertextobject", elementParentEntityUrn:'urn:pearson:entity:8a49e877-144a-4750-92d2-81d5188d8e0b'},
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-1",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "hide"},
                    type: "citations"
                },
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "0-0-1",
                parentElement: {...parentElement, type:'showhide'},
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("Versioned element - updateNewVersionElementInStore - citations title field inside Showhide", () => {
            let args = {
                updatedData: { ...updatedData, metaDataField: "formattedTitle", pageNumberRef: "1", sectionType: "postertextobject", elementParentEntityUrn:'urn:pearson:entity:8a49e877-144a-4750-92d2-81d5188d8e0b'},
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-1",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "hide"},
                },
                dispatch: jest.fn(),
                versionedData: { ...updatedData, id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b", newParentVersion: 'urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0c' },
                elementIndex: "0-0-1",
                parentElement: {...parentElement, type:'showhide'},
                fetchSlateData: jest.fn(),
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyUpdateNewVersionElementInStore = jest.spyOn(updateHelpers, "updateNewVersionElementInStore")
            updateHelpers.updateNewVersionElementInStore(args)
            expect(spyUpdateNewVersionElementInStore).toHaveBeenCalled()
            spyUpdateNewVersionElementInStore.mockClear()
        })
        it("updateElementInStore - AssessmentSlate from RC", () => {
         let store = mockStore(() => initialState);
         let args = { 
             asideData,
             parentUrn: null,
             elementIndex: 0,
             showHideType: null,
             parentElement,
             dispatch: store.dispatch,
             newslateData: communicationAssessmentSlateData.getRequiredSlateData,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             },
             isFromRC: true,
             slateParentData: communicationAssessmentSlateData.getRequiredSlateData,
             updatedData: assessmentUpdatedData
         }
         
         const expectedAction = {
             type: AUTHORING_ELEMENT_UPDATE,
             payload: {
                 slateLevelData: communicationAssessmentSlateData.getRequiredSlateData
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         expect(spyupdateElementInStore).toHaveReturnedWith(expectedAction);
         spyupdateElementInStore.mockClear()
     })
    })
    describe('updateShowhideElements testCases',()=>{
        const autoNumberDetails = {isAutoNumberingEnabled: true,autoNumberSettingsOption:'Default AutoNumber', updatedSH_Object:{}}
        it('updateShowhideElements for authoredText',()=>{
            let sh_Obj = {
                "id": "urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "type": "showhide",
                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                "versionUrn": "urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "contentUrn": "urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "status": "wip",
                "interactivedata": {
                    "postertextobject": [{
                        "id": "urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80", "type": "element-authoredtext", "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "Reveal Answer:" },
                        "html": { "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {} },
                        "versionUrn": "urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80", "contentUrn": "urn:pearson:entity:49d2396e-84fb-4c1a-986b-b4a829c69c27"
                    }],
                    "show": [{
                        "id": "urn:pearson:work:a62e2118-7274-4863-b6aa-5c6fabae19ee", "type": "element-authoredtext", "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "dxgcfg" },
                        "html": { "text": "<p class=\"paragraphNumeroUno\">dxgcfg</p>", "footnotes": {}, "glossaryentries": {} },
                        "versionUrn": "urn:pearson:work:a62e2118-7274-4863-b6aa-5c6fabae19ee", "contentUrn": "urn:pearson:entity:b9bf93da-8b21-4e43-9f70-1f6d21a210ef"
                    }],
                    "hide": [{
                        "id": "urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                        "type": "element-authoredtext",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                        "html": { "text": "<p class=\"paragraphNumeroUno\"><br></p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {} }, "versionUrn": "urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51", "contentUrn": "urn:pearson:entity:16aec971-0d02-49c3-b1af-596c1148e163"
                    }]
                },
                "index": "0-0-1-2-0"
            }
            let updatedData={
                "id":"urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                "type":"element-authoredtext",
                "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata":{"text":"cxhcg"},
                "html":{"text":"<p class=\"paragraphNumeroUno\">cxhcg</p>","footnotes":{},"glossaryentries":{}},
                "versionUrn":"urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                "contentUrn":"urn:pearson:entity:16aec971-0d02-49c3-b1af-596c1148e163",
                "inputType":"AUTHORED_TEXT",
                "inputSubType":"NA",
                "sectionType":"hide",
                "elementParentEntityUrn":"urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "slateVersionUrn":"urn:pearson:manifest:9314e1bb-0cf9-45af-9529-adec388b8639",
                "index":"0",
                "projectUrn":"urn:pearson:distributable:e6b375b3-c74e-4dd2-9cfb-d7cf36b2f4c1"
            }
            let iList=["0","0","1","2","0"]
            const spyupdateShowhideElements = jest.spyOn(updateHelpers, "updateShowhideElements")
            updateHelpers.updateShowhideElements(sh_Obj,updatedData,iList,autoNumberDetails)
            expect(spyupdateShowhideElements).toHaveBeenCalled()
            spyupdateShowhideElements.mockClear()  
        });
        it('updateShowhideElements for FigureElement',()=>{
            let sh_Obj={
                "id":"urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "type":"showhide",
                "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                "versionUrn":"urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "contentUrn":"urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "status":"wip",
                "interactivedata":{
                    "postertextobject":[
                        {
                            "id":"urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80",
                            "type":"element-authoredtext",
                            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"Reveal Answer:"},
                            "html":{"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{}},
                            "versionUrn":"urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80",
                            "contentUrn":"urn:pearson:entity:49d2396e-84fb-4c1a-986b-b4a829c69c27"
                        }]
                        ,"show":[{
                            "id":"urn:pearson:work:beedefeb-a595-4e16-8f19-dd0bc4a9e7d6",
                            "type":"figure","figuretype":"image",
                            "subtype":"imageTextWidth",
                            "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
                            "titlecontentintitlefield":true,
                            "alignment":"text-width",
                            "title":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":""},
                            "captions":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":""},
                            "credits":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":""},
                            "figuredata":{"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                            "imageid":"",
                            "path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                            "height":"422",
                            "width":"680",
                            "podwidth":""},
                            "html":{"title":"<p><br></p>","captions":"<p><br></p>","credits":"<p><br></p>","footnotes":{},"assetsPopover":{},"glossaryentries":{}},
                            "versionUrn":"urn:pearson:work:beedefeb-a595-4e16-8f19-dd0bc4a9e7d6",
                            "contentUrn":"urn:pearson:entity:626380ce-c43c-49a5-ac13-425209c6ebe6"
                        }],
                        "hide":[{
                            "id":"urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                            "type":"element-authoredtext",
                            "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                            "elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"cxhcg"},
                            "html":{"text":"<p class=\"paragraphNumeroUno\">cxhcg</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{}},
                            "versionUrn":"urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                            "contentUrn":"urn:pearson:entity:16aec971-0d02-49c3-b1af-596c1148e163"}]
                        },
                "index":"0-0-1-0-0"
            }
            let updatedData={
                "id":"urn:pearson:work:beedefeb-a595-4e16-8f19-dd0bc4a9e7d6",
                "type":"figure",
                "figuretype":"image",
                "subtype":"imageTextWidth",
                "schema":"http://schemas.pearson.com/wip-authoring/figure/1",
                "titlecontentintitlefield":true,
                "alignment":"text-width",
                "title":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","textsemantics":[],"mathml":[],"text":""},
                "captions":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","textsemantics":[],"mathml":[],"text":"","footnotes":[]},
                "credits":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","textsemantics":[],"mathml":[],"text":"","footnotes":[]},
                "figuredata":{"schema":"http://schemas.pearson.com/wip-authoring/image/1#/definitions/image",
                "imageid":"",
                "path":"https://cite-media-stg.pearson.com/legacy_paths/796ae729-d5af-49b5-8c99-437d41cd2ef7/FPO-image.png",
                "height":"422","width":"680","podwidth":""},
                "html":{"captions":"<p></p>","credits":"<p></p>","footnotes":{},"glossaryentries":{},"title":"<p>sasfsfaw</p>","postertext":"","text":""},
                "versionUrn":"urn:pearson:work:beedefeb-a595-4e16-8f19-dd0bc4a9e7d6",
                "contentUrn":"urn:pearson:entity:626380ce-c43c-49a5-ac13-425209c6ebe6",
                "inputType":"IMAGE",
                "inputSubType":"IMAGE_TEXT_WIDTH",
                "slateVersionUrn":"urn:pearson:manifest:9314e1bb-0cf9-45af-9529-adec388b8639",
                "index":"0",
                "elementParentEntityUrn":"urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "sectionType":"show",
                "projectUrn":"urn:pearson:distributable:e6b375b3-c74e-4dd2-9cfb-d7cf36b2f4c1"
            }
            let iList=["0","0","1","0","0"]
            const spyupdateShowhideElements = jest.spyOn(updateHelpers, "updateShowhideElements")
            updateHelpers.updateShowhideElements(sh_Obj,updatedData,iList,autoNumberDetails)
            expect(spyupdateShowhideElements).toHaveBeenCalled()
            spyupdateShowhideElements.mockClear()  
        });
        it('updateShowhideElements for dailogue',()=>{
            let sh_Obj = {
                "id": "urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "type": "showhide",
                "schema": "http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                "versionUrn": "urn:pearson:manifest:f8153499-14c4-4d0e-a9ef-aadf2aaacc13",
                "contentUrn": "urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "status": "wip",
                "interactivedata": {
                    "postertextobject": [{
                        "id": "urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80", "type": "element-authoredtext", "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "Reveal Answer:" },
                        "html": { "text": "<p class=\"paragraphNumeroUno\">Reveal Answer:</p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {} },
                        "versionUrn": "urn:pearson:work:81b1eeef-78a3-4e9a-afac-82825bc84a80",
                        "contentUrn": "urn:pearson:entity:49d2396e-84fb-4c1a-986b-b4a829c69c27"
                    }],
                    "show": [{
                        "id": "urn:pearson:work:e14964f1-4be5-406d-9812-7ce8cc624d7c", "type": "element-dialogue", "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": {
                            "startNumber": "1", "numberedlines": false, "acttitle": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                            "scenetitle": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                            "dialoguecontents": [{ "type": "stagedirection", "stagedirection": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" } },
                            {
                                "type": "lines", "speaker": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                                "lines": [{ "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" }]
                            }]
                        },
                        "credits": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                        "html": {
                            "actTitle": "<p>rft</p>", "sceneTitle": "<p>xfdhgf</p>",
                            "dialogueContent": [{ "type": "stagedirection", "text": "<p></p>" },
                            { "type": "lines", "characterName": "<p></p>", "text": "<p><span class=\"dialogueLine\"><br></span></p>" }],
                            "credits": "<p></p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {}
                        },
                        "versionUrn": "urn:pearson:work:e14964f1-4be5-406d-9812-7ce8cc624d7c",
                        "contentUrn": "urn:pearson:entity:757424d8-b98f-4988-b9d8-590f0a0f64c1"
                    }],
                    "hide": [{
                        "id": "urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                        "type": "element-authoredtext",
                        "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                        "elementdata": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "cxhcg" },
                        "html": { "text": "<p class=\"paragraphNumeroUno\">cxhcg</p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {} },
                        "versionUrn": "urn:pearson:work:b7e1c697-cdfc-48b0-a596-0239f7960e51",
                        "contentUrn": "urn:pearson:entity:16aec971-0d02-49c3-b1af-596c1148e163"
                    }]
                }
            }
            let updatedData = {
                "id": "urn:pearson:work:e14964f1-4be5-406d-9812-7ce8cc624d7c",
                "type": "element-dialogue",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                    "startNumber": "1",
                    "numberedlines": false,
                    "acttitle": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                    "scenetitle": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                    "dialoguecontents": [{ "type": "stagedirection", "stagedirection": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" } },
                    {
                        "type": "lines", "speaker": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" },
                        "lines": [{ "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" }]
                    }]
                }, "credits": { "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext", "text": "" }, "html": { "actTitle": "<p>rft</p>", "sceneTitle": "<p>xfdhgf</p>", "dialogueContent": [{ "type": "stagedirection", "text": "<p>xfdgfhtyhn rdgd gd</p>" }, { "type": "lines", "characterName": "<p></p>", "text": "<p><span class=\"dialogueLine\"><br></span></p>" }], "credits": "<p></p>", "footnotes": {}, "assetsPopover": {}, "glossaryentries": {} }, "versionUrn": "urn:pearson:work:e14964f1-4be5-406d-9812-7ce8cc624d7c", "contentUrn": "urn:pearson:entity:757424d8-b98f-4988-b9d8-590f0a0f64c1", "slateVersionUrn": "urn:pearson:manifest:9314e1bb-0cf9-45af-9529-adec388b8639",
                "elementParentEntityUrn": "urn:pearson:entity:62b5f97b-0ed8-42e4-9536-cccab389c5da",
                "inputType": "ELEMENT_DIALOGUE",
                "inputSubType": "NA",
                "index": "0",
                "projectUrn": "urn:pearson:distributable:e6b375b3-c74e-4dd2-9cfb-d7cf36b2f4c1"
            }
            let iList=["0","0","1","0","0"]
            const spyupdateShowhideElements = jest.spyOn(updateHelpers, "updateShowhideElements")
            updateHelpers.updateShowhideElements(sh_Obj,updatedData,iList,autoNumberDetails)
            expect(spyupdateShowhideElements).toHaveBeenCalled()
            spyupdateShowhideElements.mockClear()  
        })
    })
    describe("TCM helper methods", () => {
        config.isCreateGlossary = false
        it("collectDataAndPrepareTCMSnapshot ", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                responseData: updatedData,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter,
                showHideType: undefined,
                currentParentData: parentElement,
                elementIndex: null,
                parentElement,
                fetchSlateData: null,
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spycollectDataAndPrepareTCMSnapshot = jest.spyOn(updateHelpers, "collectDataAndPrepareTCMSnapshot")
            updateHelpers.collectDataAndPrepareTCMSnapshot(args)
            expect(spycollectDataAndPrepareTCMSnapshot).toHaveBeenCalled()
            spycollectDataAndPrepareTCMSnapshot.mockClear()
        })
        it("prepareDataForUpdateTcm ", async () => {
            let store = mockStore(() => initialState);
            let args = {
                updatedDataID: "urn:pearson:work:123",
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                versionedData: null,
            }

            const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
            updateHelpers.prepareDataForUpdateTcm(args)
            expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
            spyprepareDataForUpdateTcm.mockClear()
        }) 
        it("prepareDataForUpdateTcm - figuretype condition", async () => {
            let store = mockStore(() => initialState);
            let args = {
                updatedDataID: "urn:pearson:work:123",
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData: {...updatedData, figuretype: ''},
                versionedData: null,
            }

            const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
            updateHelpers.prepareDataForUpdateTcm(args)
            expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
            spyprepareDataForUpdateTcm.mockClear()
        }) 
        it("prepareDataForUpdateTcm - figuretype condition", async () => {
         let store = mockStore(() => initialState);
         let args = {
             updatedDataID: "urn:pearson:work:123",
             getState: store.getState,
             dispatch: store.dispatch,
             updatedData: {...updatedData2, figuretype: '', type: "element-pdf"},
             versionedData: null,
         }

         const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
         updateHelpers.prepareDataForUpdateTcm(args)
         expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
         spyprepareDataForUpdateTcm.mockClear()
     }) 
        it("collectDataAndPrepareTCMSnapshot - metaDataField", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData : {...updatedData, metaDataField: ''},
                responseData: updatedData,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter,
                showHideType: undefined,
                currentParentData: parentElement,
                elementIndex: null,
                parentElement: {...parentElement, type: "popup"},
                fetchSlateData: null,
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spycollectDataAndPrepareTCMSnapshot = jest.spyOn(updateHelpers, "collectDataAndPrepareTCMSnapshot")
            updateHelpers.collectDataAndPrepareTCMSnapshot(args)
            expect(spycollectDataAndPrepareTCMSnapshot).toHaveBeenCalled()
            spycollectDataAndPrepareTCMSnapshot.mockClear()
        })
        it("collectDataAndPrepareTCMSnapshot - sectionType", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData : {...updatedData, sectionType: 'sectionType'},
                responseData: updatedData,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"].contents.bodymatter,
                showHideType: undefined,
                currentParentData: parentElement,
                elementIndex: null,
                parentElement: {...parentElement, type: "popup"},
                fetchSlateData: null,
                newslateData: slateLevelData,
                slateManifestURN: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e",
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }

            const spycollectDataAndPrepareTCMSnapshot = jest.spyOn(updateHelpers, "collectDataAndPrepareTCMSnapshot")
            updateHelpers.collectDataAndPrepareTCMSnapshot(args)
            expect(spycollectDataAndPrepareTCMSnapshot).toHaveBeenCalled()
            spycollectDataAndPrepareTCMSnapshot.mockClear()
        })
    })
    describe("Other helper methods", () => {
        config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"
        xit("processAndStoreUpdatedResponse - versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: jest.fn(),
                updatedData,
                responseData: { ...updatedData, id: "urn:pearson:work:d9023151-3417-4482-8175-fc965466224c" },
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData[config.slateManifestURN].contents.bodymatter,
                showHideType: undefined,
                elementIndex: null,
                parentElement,
                fetchSlateData: jest.fn(),
            }
            config.isSavingElement = true
            const spyprocessAndStoreUpdatedResponse = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            updateHelpers.processAndStoreUpdatedResponse(args)
            expect(spyprocessAndStoreUpdatedResponse).toHaveBeenCalled()
            spyprocessAndStoreUpdatedResponse.mockClear()
        })
        xit("processAndStoreUpdatedResponse - non versioning", async () => {
            let store = mockStore(() => initialState);
            let args = {
                getState: store.getState,
                dispatch: jest.fn(),
                updatedData,
                responseData: updatedData,
                asideData,
                parentUrn: null,
                poetryData: null,
                updateBodymatter: slateLevelData.slateLevelData[config.slateManifestURN].contents.bodymatter,
                showHideType: undefined,
                elementIndex: null,
                parentElement,
                fetchSlateData: jest.fn(),
            }
            config.isSavingElement = true
            const spyprocessAndStoreUpdatedResponse = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            updateHelpers.processAndStoreUpdatedResponse(args)
            expect(spyprocessAndStoreUpdatedResponse).toHaveBeenCalled()
            spyprocessAndStoreUpdatedResponse.mockClear()
        })
        it("showLinkToast", () => {
            const toastNode = {
                style : {
                    display: "none"
                },
                innerText: "test"
            }
            const spyshowLinkToast = jest.spyOn(updateHelpers, "showLinkToast")
            updateHelpers.showLinkToast(toastNode)
            expect(spyshowLinkToast).toHaveBeenCalled()
            expect(toastNode.style.display).toEqual("block")
            spyshowLinkToast.mockClear()
        })
        it("showLinkToast : else", () => {
         const toastNode = {
             style : {
                 display: "none"
             },
             innerText: ""
         }
         const spyshowLinkToast = jest.spyOn(updateHelpers, "showLinkToast")
         updateHelpers.showLinkToast(toastNode)
         setTimeout(() => {
         expect(spyshowLinkToast).toHaveBeenCalled()
         expect(toastNode.style.display).toEqual("none")
        }, 4000);
        spyshowLinkToast.mockClear()
     })
        
    })
    describe("update BL methods",()=>{
        config.slateManifestURN = "urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f";
        it("updateElementInStore - update BL element inside S/H - l5", () => {
            let store = mockStore(() => initialState4);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                    "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                    "element":{
                       "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1",
                       "indexPos":[
                          "0"
                       ],
                       "parentDetails":[
                          "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                       ]
                    },
                    "index":"0-0-0",
                    "parent":{
                       "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                       "type":"showhide",
                       "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                       "showHideType":"show"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1",
                       "indexPos":[
                          "0"
                       ],
                       "parentDetails":[
                          "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                       ]
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-0",
                showHideType: "show",
                parentElement: {"id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4","type":"showhide","schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide","versionUrn":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4","contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c","status":"wip","interactivedata":{"postertextobject":[{"id":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"Reveal Answer:"},"html":{"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{},"indexEntries":{}},"versionUrn":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a","contentUrn":"urn:pearson:entity:aa8482c1-8772-49c7-b417-0612032da580"}],"show":[{"id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838","type":"manifestlist","subtype":"decimal","schema":"http://schemas.pearson.com/wip-authoring/list/1","versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838","contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3","status":"wip","listdata":{"bodymatter":[{"id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402","type":"manifestlistitem","schema":"http://schemas.pearson.com/wip-authoring/list/1","versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402","contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa","status":"wip","listitemdata":{"bodymatter":[{"id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"},"html":{"text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{},"indexEntries":{}},"versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c","contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"}]}}]},"listtype":"ordered","startNumber":1,"columnnumber":1,"iconcolor":"iconColor1","fontstyle":"fontStyle1","indexPos":["0"],"parentDetails":["urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"]}]},"indexPos":["0"],"index":"0-0-0-0-0"},
                dispatch: store.dispatch,
                newslateData: updateBL_IN_SH.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside S/H - l7", () => {
            let store = mockStore(() => initialState5);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"dfsfsdfd safsdfs sfdfsd"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfs sfdfsd</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                    "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                    "element":{
                       "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dfsfsdfd safsdfsd dsfdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                       "type":"showhide",
                       "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                       "showHideType":"show"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dfsfsdfd safsdfsd dsfdf"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                       "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                         "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                         "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                  "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "text":"dfsfsdfd safsdfsd dsfdf"
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                                              "footnotes":{
                                                                 
                                                              },
                                                              "glossaryentries":{
                                                                 
                                                              },
                                                              "indexEntries":{
                                                                 
                                                              }
                                                           },
                                                           "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                           "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                                           "status":"wip",
                                                           "inputType":"AUTHORED_TEXT",
                                                           "inputSubType":"NA",
                                                           "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                           "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                           "index":"0",
                                                           "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1",
                       "indexPos":[
                          "0"
                       ],
                       "parentDetails":[
                          "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                       ]
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-0",
                showHideType: "show",
                parentElement: {
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"showhide",
                    "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                    "status":"wip",
                    "interactivedata":{
                       "postertextobject":[
                          {
                             "id":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "type":"element-authoredtext",
                             "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                             "elementdata":{
                                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text":"Reveal Answer:"
                             },
                             "html":{
                                "text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes":{
                                   
                                },
                                "assetsPopover":{
                                   
                                },
                                "glossaryentries":{
                                   
                                },
                                "indexEntries":{
                                   
                                }
                             },
                             "versionUrn":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "contentUrn":"urn:pearson:entity:aa8482c1-8772-49c7-b417-0612032da580"
                          }
                       ],
                       "show":[
                          {
                             "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "type":"manifestlist",
                             "subtype":"decimal",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                             "status":"wip",
                             "listdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "type":"manifestlistitem",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                      "status":"wip",
                                      "listitemdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "type":"element-authoredtext",
                                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                               "elementdata":{
                                                  "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                                               },
                                               "html":{
                                                  "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                                                  "footnotes":{
                                                     
                                                  },
                                                  "glossaryentries":{
                                                     
                                                  },
                                                  "indexEntries":{
                                                     
                                                  }
                                               },
                                               "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                               "inputType":"AUTHORED_TEXT",
                                               "inputSubType":"NA",
                                               "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                               "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                               "index":"0",
                                               "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                            },
                                            {
                                               "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "type":"manifestlist",
                                               "subtype":"decimal",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                                               "listdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "type":"manifestlistitem",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                        "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                        "listitemdata":{
                                                           "bodymatter":[
                                                              {
                                                                 "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "type":"element-authoredtext",
                                                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                 "elementdata":{
                                                                    "text":"dfsfsdfd safsdfsd dsfdf"
                                                                 },
                                                                 "html":{
                                                                    "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                                                    "footnotes":{
                                                                       
                                                                    },
                                                                    "glossaryentries":{
                                                                       
                                                                    },
                                                                    "indexEntries":{
                                                                       
                                                                    }
                                                                 },
                                                                 "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                                                 "status":"wip",
                                                                 "inputType":"AUTHORED_TEXT",
                                                                 "inputSubType":"NA",
                                                                 "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                                 "index":"0",
                                                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                              }
                                                           ]
                                                        }
                                                     }
                                                  ]
                                               },
                                               "listtype":"ordered",
                                               "startNumber":1,
                                               "columnnumber":1,
                                               "iconcolor":"iconColor1",
                                               "fontstyle":"fontStyle1"
                                            }
                                         ]
                                      }
                                   }
                                ]
                             },
                             "listtype":"ordered",
                             "startNumber":1,
                             "columnnumber":1,
                             "iconcolor":"iconColor1",
                             "fontstyle":"fontStyle1",
                             "indexPos":[
                                "0"
                             ],
                             "parentDetails":[
                                "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                             ]
                          }
                       ]
                    },
                    "indexPos":[
                       "0"
                    ],
                    "index":"0-0-0-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_SH2.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside S/H - l9", () => {
            let store = mockStore(() => initialState6);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdffsdfdsfs"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdffsdfdsfs</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                    "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "elementParentEntityUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                    "element":{
                       "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                         "status":"wip"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                       "type":"showhide",
                       "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                       "showHideType":"show"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                         "status":"wip"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                       "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dfsfsdfd safsdfs sfdfsd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">dfsfsdfd safsdfs sfdfsd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                         "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                         "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                  "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                           "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                                           "status":"wip"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-1-0-0",
                showHideType: "show",
                parentElement: {
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"showhide",
                    "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                    "status":"wip",
                    "interactivedata":{
                       "postertextobject":[
                          {
                             "id":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "type":"element-authoredtext",
                             "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                             "elementdata":{
                                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text":"Reveal Answer:"
                             },
                             "html":{
                                "text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes":{
                                   
                                },
                                "assetsPopover":{
                                   
                                },
                                "glossaryentries":{
                                   
                                },
                                "indexEntries":{
                                   
                                }
                             },
                             "versionUrn":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "contentUrn":"urn:pearson:entity:aa8482c1-8772-49c7-b417-0612032da580"
                          }
                       ],
                       "show":[
                          {
                             "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "type":"manifestlist",
                             "subtype":"decimal",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                             "status":"wip",
                             "listdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "type":"manifestlistitem",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                      "status":"wip",
                                      "listitemdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "type":"element-authoredtext",
                                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                               "elementdata":{
                                                  "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                                               },
                                               "html":{
                                                  "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                                                  "footnotes":{
                                                     
                                                  },
                                                  "glossaryentries":{
                                                     
                                                  },
                                                  "indexEntries":{
                                                     
                                                  }
                                               },
                                               "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                               "inputType":"AUTHORED_TEXT",
                                               "inputSubType":"NA",
                                               "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                               "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                               "index":"0",
                                               "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                            },
                                            {
                                               "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "type":"manifestlist",
                                               "subtype":"decimal",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                                               "listdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "type":"manifestlistitem",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                        "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                        "listitemdata":{
                                                           "bodymatter":[
                                                              {
                                                                 "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "type":"element-authoredtext",
                                                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                 "elementdata":{
                                                                    "text":"dfsfsdfd safsdfs sfdfsd"
                                                                 },
                                                                 "html":{
                                                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">dfsfsdfd safsdfs sfdfsd</p>",
                                                                    "footnotes":{
                                                                       
                                                                    },
                                                                    "glossaryentries":{
                                                                       
                                                                    },
                                                                    "indexEntries":{
                                                                       
                                                                    }
                                                                 },
                                                                 "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                                                 "status":"wip",
                                                                 "inputType":"AUTHORED_TEXT",
                                                                 "inputSubType":"NA",
                                                                 "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                                 "index":"0",
                                                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                              },
                                                              {
                                                                 "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                                                 "type":"manifestlist",
                                                                 "subtype":"decimal",
                                                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                 "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                                                 "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                                                                 "listdata":{
                                                                    "bodymatter":[
                                                                       {
                                                                          "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                                          "type":"manifestlistitem",
                                                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                          "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                                          "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                                                          "listitemdata":{
                                                                             "bodymatter":[
                                                                                {
                                                                                   "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                                                   "type":"element-authoredtext",
                                                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                                   "elementdata":{
                                                                                      "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                                                      "text":""
                                                                                   },
                                                                                   "html":{
                                                                                      "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                                                   },
                                                                                   "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                                                   "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                                                                   "status":"wip"
                                                                                }
                                                                             ]
                                                                          }
                                                                       }
                                                                    ]
                                                                 },
                                                                 "listtype":"ordered",
                                                                 "startNumber":1,
                                                                 "columnnumber":1,
                                                                 "iconcolor":"iconColor1",
                                                                 "fontstyle":"fontStyle1"
                                                              }
                                                           ]
                                                        }
                                                     }
                                                  ]
                                               },
                                               "listtype":"ordered",
                                               "startNumber":1,
                                               "columnnumber":1,
                                               "iconcolor":"iconColor1",
                                               "fontstyle":"fontStyle1"
                                            }
                                         ]
                                      }
                                   }
                                ]
                             },
                             "listtype":"ordered",
                             "startNumber":1,
                             "columnnumber":1,
                             "iconcolor":"iconColor1",
                             "fontstyle":"fontStyle1",
                             "indexPos":[
                                "0"
                             ],
                             "parentDetails":[
                                "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                             ]
                          }
                       ]
                    },
                    "indexPos":[
                       "0"
                    ],
                    "index":"0-0-0-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_SH3.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside S/H - l11", () => {
            let store = mockStore(() => initialState6);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"fsdfsfsdfsd"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">fsdfsfsdfsd</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                    "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                    "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                    "element":{
                       "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                       "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"fsdfsd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                         "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                       "type":"showhide",
                       "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                       "showHideType":"show"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                       "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"fsdfsd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                         "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                       "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdffsdfdsfs"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdffsdfdsfs</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                         "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "elementParentEntityUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                         "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                                  "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "text":"fsdfsd"
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                                              "footnotes":{
                                                                 
                                                              },
                                                              "glossaryentries":{
                                                                 
                                                              },
                                                              "indexEntries":{
                                                                 
                                                              }
                                                           },
                                                           "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                           "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                                           "status":"wip",
                                                           "inputType":"AUTHORED_TEXT",
                                                           "inputSubType":"NA",
                                                           "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                                           "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                           "index":"0",
                                                           "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-1-0-1-0-0",
                showHideType: "show",
                parentElement: {
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"showhide",
                    "schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide",
                    "versionUrn":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                    "status":"wip",
                    "interactivedata":{
                       "postertextobject":[
                          {
                             "id":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "type":"element-authoredtext",
                             "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                             "elementdata":{
                                "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                "text":"Reveal Answer:"
                             },
                             "html":{
                                "text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>",
                                "footnotes":{
                                   
                                },
                                "assetsPopover":{
                                   
                                },
                                "glossaryentries":{
                                   
                                },
                                "indexEntries":{
                                   
                                }
                             },
                             "versionUrn":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a",
                             "contentUrn":"urn:pearson:entity:aa8482c1-8772-49c7-b417-0612032da580"
                          }
                       ],
                       "show":[
                          {
                             "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "type":"manifestlist",
                             "subtype":"decimal",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                             "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                             "status":"wip",
                             "listdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "type":"manifestlistitem",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                                      "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                      "status":"wip",
                                      "listitemdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "type":"element-authoredtext",
                                               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                               "elementdata":{
                                                  "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                                               },
                                               "html":{
                                                  "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                                                  "footnotes":{
                                                     
                                                  },
                                                  "glossaryentries":{
                                                     
                                                  },
                                                  "indexEntries":{
                                                     
                                                  }
                                               },
                                               "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                               "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                               "inputType":"AUTHORED_TEXT",
                                               "inputSubType":"NA",
                                               "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                               "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                               "index":"0",
                                               "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                            },
                                            {
                                               "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "type":"manifestlist",
                                               "subtype":"decimal",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                               "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                                               "listdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "type":"manifestlistitem",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                        "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                                        "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                        "listitemdata":{
                                                           "bodymatter":[
                                                              {
                                                                 "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "type":"element-authoredtext",
                                                                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                 "elementdata":{
                                                                    "text":"dfsfsdfd safsdfs sfdfsd"
                                                                 },
                                                                 "html":{
                                                                    "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">dfsfsdfd safsdfs sfdfsd</p>",
                                                                    "footnotes":{
                                                                       
                                                                    },
                                                                    "glossaryentries":{
                                                                       
                                                                    },
                                                                    "indexEntries":{
                                                                       
                                                                    }
                                                                 },
                                                                 "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                                 "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                                                 "status":"wip",
                                                                 "inputType":"AUTHORED_TEXT",
                                                                 "inputSubType":"NA",
                                                                 "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                                 "index":"0",
                                                                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                              },
                                                              {
                                                                 "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                                                 "type":"manifestlist",
                                                                 "subtype":"decimal",
                                                                 "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                 "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                                                 "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                                                                 "listdata":{
                                                                    "bodymatter":[
                                                                       {
                                                                          "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                                          "type":"manifestlistitem",
                                                                          "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                          "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                                                          "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                                                          "listitemdata":{
                                                                             "bodymatter":[
                                                                                {
                                                                                   "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                                                   "type":"element-authoredtext",
                                                                                   "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                                   "elementdata":{
                                                                                      "text":"sdffsdfdsfs"
                                                                                   },
                                                                                   "html":{
                                                                                      "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdffsdfdsfs</p>",
                                                                                      "footnotes":{
                                                                                         
                                                                                      },
                                                                                      "glossaryentries":{
                                                                                         
                                                                                      },
                                                                                      "indexEntries":{
                                                                                         
                                                                                      }
                                                                                   },
                                                                                   "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                                                   "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                                                                   "status":"wip",
                                                                                   "inputType":"AUTHORED_TEXT",
                                                                                   "inputSubType":"NA",
                                                                                   "elementParentEntityUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                                                                   "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                                                   "index":"0",
                                                                                   "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                                                },
                                                                                {
                                                                                   "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                                                                   "type":"manifestlist",
                                                                                   "subtype":"decimal",
                                                                                   "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                                   "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                                                                   "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                                                                                   "listdata":{
                                                                                      "bodymatter":[
                                                                                         {
                                                                                            "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                                                                            "type":"manifestlistitem",
                                                                                            "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                                                            "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                                                                            "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                                                                            "listitemdata":{
                                                                                               "bodymatter":[
                                                                                                  {
                                                                                                     "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                                                                     "type":"element-authoredtext",
                                                                                                     "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                                                                     "elementdata":{
                                                                                                        "text":"fsdfsd"
                                                                                                     },
                                                                                                     "html":{
                                                                                                        "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                                                                                        "footnotes":{
                                                                                                           
                                                                                                        },
                                                                                                        "glossaryentries":{
                                                                                                           
                                                                                                        },
                                                                                                        "indexEntries":{
                                                                                                           
                                                                                                        }
                                                                                                     },
                                                                                                     "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                                                                     "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                                                                                     "status":"wip",
                                                                                                     "inputType":"AUTHORED_TEXT",
                                                                                                     "inputSubType":"NA",
                                                                                                     "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                                                                                     "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                                                                     "index":"0",
                                                                                                     "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                                                                  }
                                                                                               ]
                                                                                            }
                                                                                         }
                                                                                      ]
                                                                                   },
                                                                                   "listtype":"ordered",
                                                                                   "startNumber":1,
                                                                                   "columnnumber":1,
                                                                                   "iconcolor":"iconColor1",
                                                                                   "fontstyle":"fontStyle1"
                                                                                }
                                                                             ]
                                                                          }
                                                                       }
                                                                    ]
                                                                 },
                                                                 "listtype":"ordered",
                                                                 "startNumber":1,
                                                                 "columnnumber":1,
                                                                 "iconcolor":"iconColor1",
                                                                 "fontstyle":"fontStyle1"
                                                              }
                                                           ]
                                                        }
                                                     }
                                                  ]
                                               },
                                               "listtype":"ordered",
                                               "startNumber":1,
                                               "columnnumber":1,
                                               "iconcolor":"iconColor1",
                                               "fontstyle":"fontStyle1"
                                            }
                                         ]
                                      }
                                   }
                                ]
                             },
                             "listtype":"ordered",
                             "startNumber":1,
                             "columnnumber":1,
                             "iconcolor":"iconColor1",
                             "fontstyle":"fontStyle1",
                             "indexPos":[
                                "0"
                             ],
                             "parentDetails":[
                                "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                             ]
                          }
                       ]
                    },
                    "indexPos":[
                       "0"
                    ],
                    "index":"0-0-0-0-1-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_SH3.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })

        it("updateElementInStore - update BL element inside 2C/3C - l5", () => {
         let store = mockStore(() => initialState19);
         let args = { 
             updatedData: {
                 "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                 "type":"element-authoredtext",
                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                 "elementdata":{
                    "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                 },
                 "html":{
                    "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                    "footnotes":{
                       
                    },
                    "glossaryentries":{
                       
                    },
                    "indexEntries":{
                       
                    }
                 },
                 "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                 "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                 "inputType":"AUTHORED_TEXT",
                 "inputSubType":"NA",
                 "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                 "index":"0",
                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
              },
             asideData:{
                 "type":"manifestlist",
                 "subtype":"decimal",
                 "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                 "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                 "element":{
                    "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                    "status":"wip",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                             "status":"wip",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                         "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                         "footnotes":{
                                            
                                         },
                                         "assetsPopover":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1",
                    "indexPos":[
                       "0"
                    ],
                    "parentDetails":[
                       "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                    ]
                 },
                 "index":"0-0-0",
                 "parent":{
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"groupedcontent",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                 },
                 "parentManifestList":{
                    "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                    "status":"wip",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                             "status":"wip",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                         "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                         "footnotes":{
                                            
                                         },
                                         "assetsPopover":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1",
                    "indexPos":[
                       "0"
                    ],
                    "parentDetails":[
                       "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                    ]
                 }
              },
             parentUrn: {},
             elementIndex: "0-0-0-0-0",
             parentElement: {"id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4","type":"showhide","schema":"http://schemas.pearson.com/wip-authoring/interactive/1#/definitions/showhide","versionUrn":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4","contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c","status":"wip","interactivedata":{"postertextobject":[{"id":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"Reveal Answer:"},"html":{"text":"<p class=\"paragraphNumeroUno\">Reveal Answer:</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{},"indexEntries":{}},"versionUrn":"urn:pearson:work:f6342abd-4bdd-4d97-8ce8-e2d9aac9aa2a","contentUrn":"urn:pearson:entity:aa8482c1-8772-49c7-b417-0612032da580"}],"show":[{"id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838","type":"manifestlist","subtype":"decimal","schema":"http://schemas.pearson.com/wip-authoring/list/1","versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838","contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3","status":"wip","listdata":{"bodymatter":[{"id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402","type":"manifestlistitem","schema":"http://schemas.pearson.com/wip-authoring/list/1","versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402","contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa","status":"wip","listitemdata":{"bodymatter":[{"id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c","type":"element-authoredtext","schema":"http://schemas.pearson.com/wip-authoring/element/1","elementdata":{"schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext","text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"},"html":{"text":"<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>","footnotes":{},"assetsPopover":{},"glossaryentries":{},"indexEntries":{}},"versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c","contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"}]}}]},"listtype":"ordered","startNumber":1,"columnnumber":1,"iconcolor":"iconColor1","fontstyle":"fontStyle1","indexPos":["0"],"parentDetails":["urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"]}]},"indexPos":["0"],"index":"0-0-0-0-0"},
             dispatch: store.dispatch,
             newslateData: updateBL_IN_2C_3C.slateLevelData,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
     })
     it("updateElementInStore - update BL element inside 2C/3C - l7", () => {
         let store = mockStore(() => initialState20);
         let args = { 
             updatedData: {
                 "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                 "type":"element-authoredtext",
                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                 "elementdata":{
                    "text":"dfsfsdfd safsdfs sfdfsd"
                 },
                 "html":{
                    "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfs sfdfsd</p>",
                    "footnotes":{
                       
                    },
                    "glossaryentries":{
                       
                    },
                    "indexEntries":{
                       
                    }
                 },
                 "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                 "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                 "status":"wip",
                 "inputType":"AUTHORED_TEXT",
                 "inputSubType":"NA",
                 "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                 "index":"0",
                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
              },
             asideData:{
                 "type":"manifestlist",
                 "subtype":"decimal",
                 "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                 "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                 "element":{
                    "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"dfsfsdfd safsdfsd dsfdf"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "index":"0-0-0-0-1",
                 "parent":{
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"groupedcontent",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                 },
                 "parentManifestList":{
                    "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"dfsfsdfd safsdfsd dsfdf"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "grandParentManifestList":{
                    "id":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                    "contentUrn":"urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                    "status":"wip",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                             "contentUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                             "status":"wip",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                      "contentUrn":"urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   },
                                   {
                                      "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                      "type":"manifestlist",
                                      "subtype":"decimal",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                                      "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                                      "listdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                               "type":"manifestlistitem",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                                               "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                               "listitemdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                        "type":"element-authoredtext",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                        "elementdata":{
                                                           "text":"dfsfsdfd safsdfsd dsfdf"
                                                        },
                                                        "html":{
                                                           "text":"<p class=\"paragraphNumeroUno\">dfsfsdfd safsdfsd dsfdf</p>",
                                                           "footnotes":{
                                                              
                                                           },
                                                           "glossaryentries":{
                                                              
                                                           },
                                                           "indexEntries":{
                                                              
                                                           }
                                                        },
                                                        "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                                        "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                                        "status":"wip",
                                                        "inputType":"AUTHORED_TEXT",
                                                        "inputSubType":"NA",
                                                        "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                                        "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                        "index":"0",
                                                        "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                     }
                                                  ]
                                               }
                                            }
                                         ]
                                      },
                                      "listtype":"ordered",
                                      "startNumber":1,
                                      "columnnumber":1,
                                      "iconcolor":"iconColor1",
                                      "fontstyle":"fontStyle1"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1",
                    "indexPos":[
                       "0"
                    ],
                    "parentDetails":[
                       "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                    ]
                 }
              },
             parentUrn: {},
             elementIndex: "0-0-0-0-1-0-0",
             parentElement: {
               "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "type":"element-authoredtext",
               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata":{
                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text":""
               },
               "html":{
                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
               },
               "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
               "status":"wip",
               "index":"0-0-0-0-1-0-0"
              },
             dispatch: store.dispatch,
             newslateData: updateBL_IN_2C_3C2.slateLevelData,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
     })
     it("updateElementInStore - update BL element inside 2C/3C - l9", () => {
         let store = mockStore(() => initialState21);
         let args = { 
             updatedData: {
                 "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                 "type":"element-authoredtext",
                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                 "elementdata":{
                    "text":"sdffsdfdsfs"
                 },
                 "html":{
                    "text":"<p class=\"paragraphNumeroUno\">sdffsdfdsfs</p>",
                    "footnotes":{
                       
                    },
                    "glossaryentries":{
                       
                    },
                    "indexEntries":{
                       
                    }
                 },
                 "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                 "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                 "status":"wip",
                 "inputType":"AUTHORED_TEXT",
                 "inputSubType":"NA",
                 "elementParentEntityUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                 "index":"0",
                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
              },
             asideData:{
                 "type":"manifestlist",
                 "subtype":"decimal",
                 "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                 "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                 "element":{
                    "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                         "text":""
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                      },
                                      "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                      "status":"wip"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "index":"0-0-0-0-1-0-1",
                 "parent":{
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"groupedcontent",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                 },
                 "parentManifestList":{
                    "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                         "text":""
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                      },
                                      "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                      "status":"wip"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "grandParentManifestList":{
                    "id":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:2a65c9aa-bb6b-4d7f-a221-6bc73012e325",
                    "contentUrn":"urn:pearson:entity:fdc5538b-e951-4b4b-b742-ff0152411d00",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:66b207dd-eee3-4205-bdfb-0630c34542f5",
                             "contentUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"dfsfsdfd safsdfs sfdfsd"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">dfsfsdfd safsdfs sfdfsd</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:172b3b85-3488-4b33-9c2b-851010d25993",
                                      "contentUrn":"urn:pearson:entity:200a7b7c-c97f-4852-badb-844fa4023db9",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:16f8624f-03d8-48f3-86c5-8760132eacd9",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   },
                                   {
                                      "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                      "type":"manifestlist",
                                      "subtype":"decimal",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                                      "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                                      "listdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                               "type":"manifestlistitem",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                                               "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                               "listitemdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                        "type":"element-authoredtext",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                        "elementdata":{
                                                           "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                           "text":""
                                                        },
                                                        "html":{
                                                           "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                        },
                                                        "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                                        "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                                        "status":"wip"
                                                     }
                                                  ]
                                               }
                                            }
                                         ]
                                      },
                                      "listtype":"ordered",
                                      "startNumber":1,
                                      "columnnumber":1,
                                      "iconcolor":"iconColor1",
                                      "fontstyle":"fontStyle1"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 }
              },
             parentUrn: {},
             elementIndex: "0-0-0-0-1-0-1-0-0",
             parentElement: {
               "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "type":"element-authoredtext",
               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata":{
                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text":""
               },
               "html":{
                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
               },
               "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
               "status":"wip",
               "index":"0-0-0-0-1-0-1-0-0"
              },
             dispatch: store.dispatch,
             newslateData: updateBL_IN_2C_3C3.slateLevelData,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
     })
     it("updateElementInStore - update BL element inside 2C/3C - l11", () => {
         let store = mockStore(() => initialState22);
         let args = { 
             updatedData: {
                 "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                 "type":"element-authoredtext",
                 "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                 "elementdata":{
                    "text":"fsdfsfsdfsd"
                 },
                 "html":{
                    "text":"<p class=\"paragraphNumeroUno\">fsdfsfsdfsd</p>",
                    "footnotes":{
                       
                    },
                    "glossaryentries":{
                       
                    },
                    "indexEntries":{
                       
                    }
                 },
                 "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                 "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                 "status":"wip",
                 "inputType":"AUTHORED_TEXT",
                 "inputSubType":"NA",
                 "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                 "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                 "index":"0",
                 "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
              },
             asideData:{
                 "type":"manifestlist",
                 "subtype":"decimal",
                 "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                 "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                 "element":{
                    "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                    "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                             "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"fsdfsd"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                      "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "index":"0-0-0-0-1-0-1-0-1",
                 "parent":{
                    "id":"urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                    "type":"groupedcontent",
                    "contentUrn":"urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                 },
                 "parentManifestList":{
                    "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                    "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                             "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"fsdfsd"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                      "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 },
                 "grandParentManifestList":{
                    "id":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                    "versionUrn":"urn:pearson:manifest:fdf13d8f-fc5a-492b-8aa9-020047b20a3d",
                    "contentUrn":"urn:pearson:entity:11c73892-80ea-453a-8294-78ad48fb65a6",
                    "listdata":{
                       "bodymatter":[
                          {
                             "id":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "type":"manifestlistitem",
                             "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                             "versionUrn":"urn:pearson:manifest:6e88c36b-b97c-444c-a1c3-e492b72586e6",
                             "contentUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                             "listitemdata":{
                                "bodymatter":[
                                   {
                                      "id":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "type":"element-authoredtext",
                                      "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                      "elementdata":{
                                         "text":"sdffsdfdsfs"
                                      },
                                      "html":{
                                         "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdffsdfdsfs</p>",
                                         "footnotes":{
                                            
                                         },
                                         "glossaryentries":{
                                            
                                         },
                                         "indexEntries":{
                                            
                                         }
                                      },
                                      "versionUrn":"urn:pearson:work:154915f4-be8c-4485-8c7e-47a27e23f816",
                                      "contentUrn":"urn:pearson:entity:4bd32fdb-b51a-484c-80df-dca9a374e43b",
                                      "status":"wip",
                                      "inputType":"AUTHORED_TEXT",
                                      "inputSubType":"NA",
                                      "elementParentEntityUrn":"urn:pearson:entity:0bf15f09-2ddc-4f72-98b7-223b664fe202",
                                      "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                      "index":"0",
                                      "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                   },
                                   {
                                      "id":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                      "type":"manifestlist",
                                      "subtype":"decimal",
                                      "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                      "versionUrn":"urn:pearson:manifest:5d5a2c39-f87f-4c0b-829e-f9d92dd7b5f0",
                                      "contentUrn":"urn:pearson:entity:c05c3044-b3c1-4600-b41b-3508e3848171",
                                      "listdata":{
                                         "bodymatter":[
                                            {
                                               "id":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                               "type":"manifestlistitem",
                                               "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                               "versionUrn":"urn:pearson:manifest:5f7f1dd8-f46d-403d-8dcb-de581b9a13a6",
                                               "contentUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                               "listitemdata":{
                                                  "bodymatter":[
                                                     {
                                                        "id":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                        "type":"element-authoredtext",
                                                        "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                        "elementdata":{
                                                           "text":"fsdfsd"
                                                        },
                                                        "html":{
                                                           "text":"<p class=\"paragraphNumeroUno\">fsdfsd</p>",
                                                           "footnotes":{
                                                              
                                                           },
                                                           "glossaryentries":{
                                                              
                                                           },
                                                           "indexEntries":{
                                                              
                                                           }
                                                        },
                                                        "versionUrn":"urn:pearson:work:959f28ea-1c20-4889-803c-e657302213e1",
                                                        "contentUrn":"urn:pearson:entity:79a3f106-5e0b-4e6b-b81e-573050832eda",
                                                        "status":"wip",
                                                        "inputType":"AUTHORED_TEXT",
                                                        "inputSubType":"NA",
                                                        "elementParentEntityUrn":"urn:pearson:entity:6dc7c5f7-a0cf-4221-9382-75e8331e04cf",
                                                        "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                        "index":"0",
                                                        "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                     }
                                                  ]
                                               }
                                            }
                                         ]
                                      },
                                      "listtype":"ordered",
                                      "startNumber":1,
                                      "columnnumber":1,
                                      "iconcolor":"iconColor1",
                                      "fontstyle":"fontStyle1"
                                   }
                                ]
                             }
                          }
                       ]
                    },
                    "listtype":"ordered",
                    "startNumber":1,
                    "columnnumber":1,
                    "iconcolor":"iconColor1",
                    "fontstyle":"fontStyle1"
                 }
              },
             parentUrn: {},
             elementIndex: "0-0-0-0-1-0-1-0-1-0-0",
             showHideType: "show",
             parentElement: {
               "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "type":"element-authoredtext",
               "schema":"http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata":{
                  "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                  "text":""
               },
               "html":{
                  "text":"<p class=\"paragraphNumeroUno\"><br></p>"
               },
               "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
               "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
               "status":"wip",
               "index":"0-0-0-0-1-0-1-0-1-0-0"
              },
             dispatch: store.dispatch,
             newslateData: updateBL_IN_2C_3C4.slateLevelData,
             autoNumberDetails : {
                 autoNumberSettingsOption: '',
                 isAutoNumberingEnabled: true
             }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
     })
       it("updateElementInStore - update BL element inside TB - l6", () => {
          let store = mockStore(() => initialState19);
          let args = {
             updatedData: {
                "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                "type": "element-authoredtext",
                "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                "elementdata": {
                   "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
                },
                "html": {
                   "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                   "footnotes": {

                   },
                   "glossaryentries": {

                   },
                   "indexEntries": {

                   }
                },
                "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
                "inputType": "AUTHORED_TEXT",
                "inputSubType": "NA",
                "elementParentEntityUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                "slateVersionUrn": "urn:pearson:manifest:5bcd4f2a-21f5-488f-ba77-90fc4c497bea",
                "index": "0",
                "projectUrn": "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
             },
             asideData: {
                "type": "manifestlist",
                "subtype": "decimal",
                "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                "element": {
                   "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                   "type": "manifestlist",
                   "subtype": "decimal",
                   "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                   "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                   "status": "wip",
                   "listdata": {
                      "bodymatter": [
                         {
                            "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                            "type": "manifestlistitem",
                            "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                            "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                            "status": "wip",
                            "listitemdata": {
                               "bodymatter": [
                                  {
                                     "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                     "type": "element-authoredtext",
                                     "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                     },
                                     "html": {
                                        "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                        "footnotes": {

                                        },
                                        "assetsPopover": {

                                        },
                                        "glossaryentries": {

                                        },
                                        "indexEntries": {

                                        }
                                     },
                                     "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                     "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype": "ordered",
                   "startNumber": 1,
                   "columnnumber": 1,
                   "iconcolor": "iconColor1",
                   "fontstyle": "fontStyle1",
                   "indexPos": [
                      "0"
                   ],
                   "parentDetails": [
                      "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                   ]
                },
                "index": "0-0-0",
                "parent": {
                   "id": "urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                   "type": "groupedcontent",
                   "subtype": 'tab',
                   "contentUrn": "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
                },
                "parentManifestList": {
                   "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                   "type": "manifestlist",
                   "subtype": "decimal",
                   "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                   "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                   "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                   "status": "wip",
                   "listdata": {
                      "bodymatter": [
                         {
                            "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                            "type": "manifestlistitem",
                            "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                            "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                            "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                            "status": "wip",
                            "listitemdata": {
                               "bodymatter": [
                                  {
                                     "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                     "type": "element-authoredtext",
                                     "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                     "elementdata": {
                                        "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                        "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                     },
                                     "html": {
                                        "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                        "footnotes": {

                                        },
                                        "assetsPopover": {

                                        },
                                        "glossaryentries": {

                                        },
                                        "indexEntries": {

                                        }
                                     },
                                     "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                     "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                  }
                               ]
                            }
                         }
                      ]
                   },
                   "listtype": "ordered",
                   "startNumber": 1,
                   "columnnumber": 1,
                   "iconcolor": "iconColor1",
                   "fontstyle": "fontStyle1",
                   "indexPos": [
                      "0"
                   ],
                   "parentDetails": [
                      "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                   ]
                }
             },
             parentUrn: {},
             elementIndex: "0-0-0-1-0-0",
             parentElement: { "index": "0-0-0-1-0-0" },
             dispatch: store.dispatch,
             newslateData: update_BL_in_TB1.slateLevelData,
             autoNumberDetails: {
                autoNumberSettingsOption: '',
                isAutoNumberingEnabled: true
             }
          }
          const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
          updateHelpers.updateElementInStore(args)
          expect(spyupdateElementInStore).toHaveBeenCalled()
          spyupdateElementInStore.mockClear()
       })
       it("updateElementInStore - update BL element inside TB - l8", () => {
         let store = mockStore(() => initialState19);
         let args = {
            updatedData: {
               "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "type": "element-authoredtext",
               "schema": "http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata": {
                  "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
               },
               "html": {
                  "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                  "footnotes": {

                  },
                  "glossaryentries": {

                  },
                  "indexEntries": {

                  }
               },
               "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
               "inputType": "AUTHORED_TEXT",
               "inputSubType": "NA",
               "elementParentEntityUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
               "slateVersionUrn": "urn:pearson:manifest:5bcd4f2a-21f5-488f-ba77-90fc4c497bea",
               "index": "0",
               "projectUrn": "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
            },
            asideData: {
               "type": "manifestlist",
               "subtype": "decimal",
               "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
               "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
               "element": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               },
               "index": "0-0-0",
               "parent": {
                  "id": "urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                  "type": "groupedcontent",
                  "subtype": 'tab',
                  "contentUrn": "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
               },
               "parentManifestList": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               }
            },
            parentUrn: {},
            elementIndex: "0-0-0-1-0-0-0-0",
            parentElement: { "index": "0-0-0-1-0-1-0-0" },
            dispatch: store.dispatch,
            newslateData: update_BL_in_TB2.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: '',
               isAutoNumberingEnabled: true
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update BL element inside TB - l10", () => {
         let store = mockStore(() => initialState19);
         let args = {
            updatedData: {
               "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "type": "element-authoredtext",
               "schema": "http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata": {
                  "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
               },
               "html": {
                  "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                  "footnotes": {

                  },
                  "glossaryentries": {

                  },
                  "indexEntries": {

                  }
               },
               "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
               "inputType": "AUTHORED_TEXT",
               "inputSubType": "NA",
               "elementParentEntityUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
               "slateVersionUrn": "urn:pearson:manifest:5bcd4f2a-21f5-488f-ba77-90fc4c497bea",
               "index": "0",
               "projectUrn": "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
            },
            asideData: {
               "type": "manifestlist",
               "subtype": "decimal",
               "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
               "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
               "element": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               },
               "index": "0-0-0",
               "parent": {
                  "id": "urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                  "type": "groupedcontent",
                  "subtype": 'tab',
                  "contentUrn": "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
               },
               "parentManifestList": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               }
            },
            parentUrn: {},
            elementIndex: "0-0-0-1-0-0-0-0",
            parentElement: { "index": "0-0-0-1-0-1-0-1-0-0" },
            dispatch: store.dispatch,
            newslateData: update_BL_in_TB3.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: '',
               isAutoNumberingEnabled: true
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
      })
      it("updateElementInStore - update BL element inside TB - l12", () => {
         let store = mockStore(() => initialState19);
         let args = {
            updatedData: {
               "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "type": "element-authoredtext",
               "schema": "http://schemas.pearson.com/wip-authoring/element/1",
               "elementdata": {
                  "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc sdsdsadasv "
               },
               "html": {
                  "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc sdsdsadasv&nbsp;</p>",
                  "footnotes": {

                  },
                  "glossaryentries": {

                  },
                  "indexEntries": {

                  }
               },
               "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
               "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a",
               "inputType": "AUTHORED_TEXT",
               "inputSubType": "NA",
               "elementParentEntityUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
               "slateVersionUrn": "urn:pearson:manifest:5bcd4f2a-21f5-488f-ba77-90fc4c497bea",
               "index": "0",
               "projectUrn": "urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
            },
            asideData: {
               "type": "manifestlist",
               "subtype": "decimal",
               "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
               "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
               "element": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               },
               "index": "0-0-0",
               "parent": {
                  "id": "urn:pearson:manifest:964b0f8d-b80a-4fef-afaf-837d7e97d3c4",
                  "type": "groupedcontent",
                  "subtype": 'tab',
                  "contentUrn": "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c",
               },
               "parentManifestList": {
                  "id": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "type": "manifestlist",
                  "subtype": "decimal",
                  "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                  "versionUrn": "urn:pearson:manifest:54046288-edaf-4503-8f58-34aec6a1f838",
                  "contentUrn": "urn:pearson:entity:aee8f706-19fe-46e4-a802-f450619c30a3",
                  "status": "wip",
                  "listdata": {
                     "bodymatter": [
                        {
                           "id": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "type": "manifestlistitem",
                           "schema": "http://schemas.pearson.com/wip-authoring/list/1",
                           "versionUrn": "urn:pearson:manifest:d9639bdf-315a-49e9-813c-dca092214402",
                           "contentUrn": "urn:pearson:entity:2dbd7985-9c9c-499a-a33e-b8b00f525aaa",
                           "status": "wip",
                           "listitemdata": {
                              "bodymatter": [
                                 {
                                    "id": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "type": "element-authoredtext",
                                    "schema": "http://schemas.pearson.com/wip-authoring/element/1",
                                    "elementdata": {
                                       "schema": "http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                       "text": "adasdsdfsdf dfsdfsdfsdfdsf  xvxcvxcxc"
                                    },
                                    "html": {
                                       "text": "<p class=\"paragraphNumeroUno\">adasdsdfsdf dfsdfsdfsdfdsf&nbsp; xvxcvxcxc</p>",
                                       "footnotes": {

                                       },
                                       "assetsPopover": {

                                       },
                                       "glossaryentries": {

                                       },
                                       "indexEntries": {

                                       }
                                    },
                                    "versionUrn": "urn:pearson:work:e64d01ba-f1df-4650-ae17-ab0f0075df3c",
                                    "contentUrn": "urn:pearson:entity:b17eb9fa-a921-4650-b3a7-c67d678e172a"
                                 }
                              ]
                           }
                        }
                     ]
                  },
                  "listtype": "ordered",
                  "startNumber": 1,
                  "columnnumber": 1,
                  "iconcolor": "iconColor1",
                  "fontstyle": "fontStyle1",
                  "indexPos": [
                     "0"
                  ],
                  "parentDetails": [
                     "urn:pearson:entity:8dd19ec9-5c30-4ca1-8c95-4df4cee6d14c"
                  ]
               }
            },
            parentUrn: {},
            elementIndex: "0-0-0-1-0-0-0-0",
            parentElement: { "index": "0-0-0-1-0-1-0-1-0-1-0-0" },
            dispatch: store.dispatch,
            newslateData: update_BL_in_TB4.slateLevelData,
            autoNumberDetails: {
               autoNumberSettingsOption: '',
               isAutoNumberingEnabled: true
            }
         }
         const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
         updateHelpers.updateElementInStore(args)
         expect(spyupdateElementInStore).toHaveBeenCalled()
         spyupdateElementInStore.mockClear()
      })


        it("updateElementInStore - update BL element inside AS - l4", () => {
            let store = mockStore(() => initialState7);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdasdasdas dsadas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdasdasdas dsadas</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                    "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                    "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                    "element":{
                       "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                         "status":"wip",
                                         "index":"0-0-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                         "status":"wip",
                                         "index":"0-0-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0",
                parentElement: {
                    "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                    "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                    "status":"wip",
                    "index":"0-0-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_AS.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside AS - l6", () => {
            let store = mockStore(() => initialState8);
            let args = { 
                updatedData:{
                    "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdasdasdas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdasdasdas</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                    "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                    "contentUrn":"urn:pearson:entity:bcadbd7d-6fbe-4387-ace4-f5962fd77ab1",
                    "element":{
                       "id":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "contentUrn":"urn:pearson:entity:bcadbd7d-6fbe-4387-ace4-f5962fd77ab1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "contentUrn":"urn:pearson:entity:cfbeefb8-2d6a-4650-a97b-aa02ed1f1be6",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                                         "status":"wip",
                                         "index":"0-0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "contentUrn":"urn:pearson:entity:bcadbd7d-6fbe-4387-ace4-f5962fd77ab1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "contentUrn":"urn:pearson:entity:cfbeefb8-2d6a-4650-a97b-aa02ed1f1be6",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                                         "status":"wip",
                                         "index":"0-0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:572857da-8942-448a-9344-ab6786a26e53",
                       "contentUrn":"urn:pearson:entity:0d5e8831-2d6d-4e72-9d16-b8c821a19170",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:82feb2c9-991e-4958-b866-8f6a0d48a538",
                                "contentUrn":"urn:pearson:entity:8cf01ccc-7817-4f35-ae7a-9f72ebbc882b",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdasdasdas dsadas "
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdasdasdas dsadas&nbsp;</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:839f0d4f-332d-4be6-af03-86fa72ff4fb8",
                                         "contentUrn":"urn:pearson:entity:fc6ad736-e1f7-4ba7-baa5-42f158b668ce",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                                         "contentUrn":"urn:pearson:entity:bcadbd7d-6fbe-4387-ace4-f5962fd77ab1",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                                  "contentUrn":"urn:pearson:entity:cfbeefb8-2d6a-4650-a97b-aa02ed1f1be6",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                                           "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                                                           "status":"wip",
                                                           "index":"0-0-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                    "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                    "status":"wip",
                    "index":"0-0-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_AS2.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside AS - l8", () => {
            let store = mockStore(() => initialState9);
            let args = { 
                updatedData:{
                    "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sadasdas asdsadasd sdsad"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd sdsad</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                    "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                    "contentUrn":"urn:pearson:entity:a08872dc-1a17-4fed-8c43-ca74f843245a",
                    "element":{
                       "id":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "contentUrn":"urn:pearson:entity:a08872dc-1a17-4fed-8c43-ca74f843245a",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "contentUrn":"urn:pearson:entity:2ec2e00a-e7a7-4323-85a1-1602982dc2d5",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sadasdas asdsadasd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-1-0-1-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "contentUrn":"urn:pearson:entity:a08872dc-1a17-4fed-8c43-ca74f843245a",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "contentUrn":"urn:pearson:entity:2ec2e00a-e7a7-4323-85a1-1602982dc2d5",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sadasdas asdsadasd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-1-0-1-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:1c0e2f20-fc17-4c9f-ae13-8dac911124e9",
                       "contentUrn":"urn:pearson:entity:bcadbd7d-6fbe-4387-ace4-f5962fd77ab1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:dfa86d89-8a4f-4e6f-a2a2-6fbc404cf74f",
                                "contentUrn":"urn:pearson:entity:cfbeefb8-2d6a-4650-a97b-aa02ed1f1be6",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdasdasdas"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdasdasdas</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:3336a27f-65b7-4ca5-aaf9-fd51a691e7a7",
                                         "contentUrn":"urn:pearson:entity:9ac0161f-0c2f-4378-b038-725a1bb9ddf0",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                                         "contentUrn":"urn:pearson:entity:a08872dc-1a17-4fed-8c43-ca74f843245a",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                                  "contentUrn":"urn:pearson:entity:2ec2e00a-e7a7-4323-85a1-1602982dc2d5",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "text":"sadasdas asdsadasd"
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd</p>",
                                                              "footnotes":{
                                                                 
                                                              },
                                                              "glossaryentries":{
                                                                 
                                                              },
                                                              "indexEntries":{
                                                                 
                                                              }
                                                           },
                                                           "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                                           "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a",
                                                           "status":"wip",
                                                           "inputType":"AUTHORED_TEXT",
                                                           "inputSubType":"NA",
                                                           "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                           "index":"0-0-0-1-0-1-0-0",
                                                           "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                           "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex:"0-0-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sadasdas asdsadasd"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                    "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0-0-0-1-0-1-0-0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_AS3.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside AS - l10", () => {
            let store = mockStore(() => initialState10);
            let args = { 
                updatedData:{
                    "id":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"dasda sdas asdadadas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">dasda sdas asdadadas</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                    "contentUrn":"urn:pearson:entity:872fb56b-4e55-449a-ae13-7b26fbfaab6f",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                    "contentUrn":"urn:pearson:entity:8de8fa9c-ef1d-4d44-9a8b-24527ba46eb7",
                    "element":{
                       "id":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                       "contentUrn":"urn:pearson:entity:8de8fa9c-ef1d-4d44-9a8b-24527ba46eb7",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                "contentUrn":"urn:pearson:entity:929eeefe-335d-4def-998e-d537e7c9ba0c",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"dasda sdas"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dasda sdas</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                         "contentUrn":"urn:pearson:entity:872fb56b-4e55-449a-ae13-7b26fbfaab6f",
                                         "index":"0-0-0-1-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-1-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                       "contentUrn":"urn:pearson:entity:8de8fa9c-ef1d-4d44-9a8b-24527ba46eb7",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                "contentUrn":"urn:pearson:entity:929eeefe-335d-4def-998e-d537e7c9ba0c",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"dasda sdas"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dasda sdas</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                         "contentUrn":"urn:pearson:entity:872fb56b-4e55-449a-ae13-7b26fbfaab6f",
                                         "index":"0-0-0-1-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:eccc64e9-3b21-4823-a44f-1a87d3501d8b",
                       "contentUrn":"urn:pearson:entity:a08872dc-1a17-4fed-8c43-ca74f843245a",
                       "status":"wip",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:36136248-a627-4860-adf8-464457901c04",
                                "contentUrn":"urn:pearson:entity:2ec2e00a-e7a7-4323-85a1-1602982dc2d5",
                                "status":"wip",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":"sadasdas asdsadasd sdsad"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sadasdas asdsadasd sdsad</p>",
                                            "footnotes":{
                                               
                                            },
                                            "assetsPopover":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:d6a638f6-cd27-46a4-9d80-a2355e178d39",
                                         "contentUrn":"urn:pearson:entity:c1d27e54-6125-4b9e-9e58-58e0f6beff9a"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:1109b847-8d62-479c-8b8d-08c7689c9c48",
                                         "contentUrn":"urn:pearson:entity:8de8fa9c-ef1d-4d44-9a8b-24527ba46eb7",
                                         "status":"wip",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:c570c9ae-f0e7-4370-af0f-489a7d7838b9",
                                                  "contentUrn":"urn:pearson:entity:929eeefe-335d-4def-998e-d537e7c9ba0c",
                                                  "status":"wip",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":"dasda sdas"
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\">dasda sdas</p>",
                                                              "footnotes":{
                                                                 
                                                              },
                                                              "assetsPopover":{
                                                                 
                                                              },
                                                              "glossaryentries":{
                                                                 
                                                              },
                                                              "indexEntries":{
                                                                 
                                                              }
                                                           },
                                                           "versionUrn":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                                                           "contentUrn":"urn:pearson:entity:872fb56b-4e55-449a-ae13-7b26fbfaab6f",
                                                           "index":"0-0-0-1-0-1-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-1-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":"dasda sdas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">dasda sdas</p>",
                       "footnotes":{
                          
                       },
                       "assetsPopover":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:42f99e03-fd03-446e-88a0-348eefb44bbe",
                    "contentUrn":"urn:pearson:entity:872fb56b-4e55-449a-ae13-7b26fbfaab6f",
                    "index":"0-0-0-1-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_AS4.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside WE - l5", () => {
            let store = mockStore(() => initialState11);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"dasfsfasfad sdasd dafas dsadas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd dafas dsadas</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                    "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                    "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                    "element":{
                       "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dasfsfasfad sdasd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dasfsfasfad sdasd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-0",
                parentElement: {
                    "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"dasfsfasfad sdasd"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">dasfsfasfad sdasd</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                    "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0-0-0-0-0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_WE.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside WE - l7", () => {
            let store = mockStore(() => initialState12);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdasdasdas"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdasdasdas</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                    "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                    "contentUrn":"urn:pearson:entity:81d61c77-51bb-43b7-a722-3ec05d13443e",
                    "element":{
                       "id":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "contentUrn":"urn:pearson:entity:81d61c77-51bb-43b7-a722-3ec05d13443e",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "contentUrn":"urn:pearson:entity:8ac7bb9e-3558-4dae-abcc-0d3a99004cf8",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                                         "status":"wip",
                                         "index":"0-0-0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "contentUrn":"urn:pearson:entity:81d61c77-51bb-43b7-a722-3ec05d13443e",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "contentUrn":"urn:pearson:entity:8ac7bb9e-3558-4dae-abcc-0d3a99004cf8",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                                         "status":"wip",
                                         "index":"0-0-0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:5d1e0b35-bcfc-4580-ad62-96824c86a17b",
                       "contentUrn":"urn:pearson:entity:f4b0d0f4-7f40-4b0e-9845-45b28e6ace11",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f683a64-980b-48e3-ad3c-d638678c2d79",
                                "contentUrn":"urn:pearson:entity:b2314342-6262-4740-8bf2-285a6c93a867",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"dasfsfasfad "
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">dasfsfasfad&nbsp;</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:402d15f8-fa7f-4216-b73d-59694c59c9d0",
                                         "contentUrn":"urn:pearson:entity:c43ce28f-4e5d-434e-a78e-cb6d7b9496e1",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                                         "contentUrn":"urn:pearson:entity:81d61c77-51bb-43b7-a722-3ec05d13443e",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                                  "contentUrn":"urn:pearson:entity:8ac7bb9e-3558-4dae-abcc-0d3a99004cf8",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                                           "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                                                           "status":"wip",
                                                           "index":"0-0-0-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                    "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                    "status":"wip",
                    "index":"0-0-0-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_WE2.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside WE - l9", () => {
            let store = mockStore(() => initialState13);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"asdasdasd"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">asdasdasd</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                    "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                    "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
                    "element":{
                       "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                         "status":"wip",
                                         "index":"0-0-0-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                         "status":"wip",
                                         "index":"0-0-0-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:7be12901-ca60-4e84-b850-b36390178dd0",
                       "contentUrn":"urn:pearson:entity:81d61c77-51bb-43b7-a722-3ec05d13443e",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:4f794dfc-d866-4398-ae8d-387dece1b0b0",
                                "contentUrn":"urn:pearson:entity:8ac7bb9e-3558-4dae-abcc-0d3a99004cf8",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdasdasdas"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdasdasdas</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:c341891e-0110-4c07-9d03-37078e65e479",
                                         "contentUrn":"urn:pearson:entity:941975fe-c593-4e6d-a711-5dbbd8d1e463",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                                         "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                                  "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                                           "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                                           "status":"wip",
                                                           "index":"0-0-0-0-1-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                    "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                    "status":"wip",
                    "index":"0-0-0-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_WE3.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element inside WE - l11", () => {
            let store = mockStore(() => initialState14);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"df sfsdf sdffs"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">df sfsdf sdffs</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                    "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                    "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                    "element":{
                       "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                       "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdffs"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                         "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-0-1-0-1-0-1-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-0-0-1-0-1-0-1",
                    "parent":{
                       "id":"urn:pearson:manifest:cf179ea5-0a5f-4dd7-b937-403cec80d43c",
                       "type":"element-aside",
                       "contentUrn":"urn:pearson:entity:2fe00637-5c5b-403e-b5e5-4ceb0c376570"
                    },
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                       "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdffs"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                         "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0-0-0-0-1-0-1-0-1-0-0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:e8fe3040-1fa9-4dcc-b2ba-19a7f02a2eca",
                       "contentUrn":"urn:pearson:entity:b3e24348-4921-48e1-af05-a4265d540545",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:a7f7636f-01dc-418c-8afe-f5ff668240f2",
                                "contentUrn":"urn:pearson:entity:6ab7d9bc-41e0-4c54-9430-03c4c4ef95b5",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"asdasdasd"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdasdasd</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:f026a1e5-f282-4f6c-aa27-dddcca840fc8",
                                         "contentUrn":"urn:pearson:entity:51c67554-72b8-40c8-9e37-5ac706385ded",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:c60e9bf1-e51e-4b77-8674-3b60033aff91",
                                         "contentUrn":"urn:pearson:entity:4a92adae-2b3d-40a1-93f8-5afe9fa092d6",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:c9721b8c-3a20-4c58-9a42-6a41d5faa088",
                                                  "contentUrn":"urn:pearson:entity:e4297f7f-3554-4dee-9acd-01873b03db0b",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "text":"sdffs"
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                                                              "footnotes":{
                                                                 
                                                              },
                                                              "glossaryentries":{
                                                                 
                                                              },
                                                              "indexEntries":{
                                                                 
                                                              }
                                                           },
                                                           "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                                                           "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                                                           "status":"wip",
                                                           "inputType":"AUTHORED_TEXT",
                                                           "inputSubType":"NA",
                                                           "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                                           "index":"0-0-0-0-1-0-1-0-1-0-0",
                                                           "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                                           "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0-0-1-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdffs"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdffs</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:cafc0d3a-46a8-4f68-aec4-7d526e55ea48",
                    "contentUrn":"urn:pearson:entity:85538611-9859-402a-bbc1-126b3c426a0a",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0-0-0-0-1-0-1-0-1-0-0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL_IN_WE4.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element l3", () => {
            let store = mockStore(() => initialState15);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"asasdsad"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">asasdsad</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                    "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                    "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                    "element":{
                       "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "contentUrn":"urn:pearson:entity:774efdd9-d15f-4b50-ac54-bfdf0a87b1e9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                                         "status":"wip",
                                         "index":"0-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":0,
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "contentUrn":"urn:pearson:entity:774efdd9-d15f-4b50-ac54-bfdf0a87b1e9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                                         "status":"wip",
                                         "index":"0-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-0",
                parentElement: {
                    "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                    "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                    "status":"wip",
                    "index":"0-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element l5", () => {
            let store = mockStore(() => initialState16);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdads"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdads</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                    "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                    "contentUrn":"urn:pearson:entity:6348e770-27a9-4fe1-8e30-916509908bf9",
                    "element":{
                       "id":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "contentUrn":"urn:pearson:entity:6348e770-27a9-4fe1-8e30-916509908bf9",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "contentUrn":"urn:pearson:entity:3890eb38-3bc4-41e6-9fdc-f331610decb4",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                                         "status":"wip",
                                         "index":"0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-1",
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "contentUrn":"urn:pearson:entity:6348e770-27a9-4fe1-8e30-916509908bf9",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "contentUrn":"urn:pearson:entity:3890eb38-3bc4-41e6-9fdc-f331610decb4",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                                         "status":"wip",
                                         "index":"0-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:045cde04-a001-47e0-9720-76fda6510d7b",
                       "contentUrn":"urn:pearson:entity:cfad7e8f-0c35-4429-9e09-5bfff8824fc1",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:ca64b7a5-2c4b-423d-8a37-0cebdecfef46",
                                "contentUrn":"urn:pearson:entity:774efdd9-d15f-4b50-ac54-bfdf0a87b1e9",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"asasdsad"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asasdsad</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:1a6c1bb8-9745-4206-94b0-2d31d74ad0fc",
                                         "contentUrn":"urn:pearson:entity:b89a9fed-a4d9-4312-8fe6-aeabd08e84ba",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                                         "contentUrn":"urn:pearson:entity:6348e770-27a9-4fe1-8e30-916509908bf9",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                                  "contentUrn":"urn:pearson:entity:3890eb38-3bc4-41e6-9fdc-f331610decb4",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                                           "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                                                           "status":"wip",
                                                           "index":"0-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                    "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                    "status":"wip",
                    "index":"0-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL2.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element l7", () => {
            let store = mockStore(() => initialState17);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"asdadsad"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">asdadsad</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                    "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                    "contentUrn":"urn:pearson:entity:7c8b7e95-e8f1-46b6-bf1a-2be7dafa15ad",
                    "element":{
                       "id":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "contentUrn":"urn:pearson:entity:7c8b7e95-e8f1-46b6-bf1a-2be7dafa15ad",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "contentUrn":"urn:pearson:entity:4bfe02ab-bef8-4b03-ac53-0382132a5f0a",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                                         "status":"wip",
                                         "index":"0-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-1-0-1",
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "contentUrn":"urn:pearson:entity:7c8b7e95-e8f1-46b6-bf1a-2be7dafa15ad",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "contentUrn":"urn:pearson:entity:4bfe02ab-bef8-4b03-ac53-0382132a5f0a",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                                         "status":"wip",
                                         "index":"0-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:922c1fa7-11e7-4bad-b56f-4513f060d283",
                       "contentUrn":"urn:pearson:entity:6348e770-27a9-4fe1-8e30-916509908bf9",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:770bcd74-f2c0-4175-8f84-37c867f1b762",
                                "contentUrn":"urn:pearson:entity:3890eb38-3bc4-41e6-9fdc-f331610decb4",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"sdads"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">sdads</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:b56caa91-f2ed-4553-aa8a-ba97d9906f7c",
                                         "contentUrn":"urn:pearson:entity:2578ef71-2286-4c04-911a-df027efe3b17",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                                         "contentUrn":"urn:pearson:entity:7c8b7e95-e8f1-46b6-bf1a-2be7dafa15ad",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                                  "contentUrn":"urn:pearson:entity:4bfe02ab-bef8-4b03-ac53-0382132a5f0a",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                                           "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                                                           "status":"wip",
                                                           "index":"0-0-1-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                    "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                    "status":"wip",
                    "index":"0-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL3.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update BL element l9", () => {
            let store = mockStore(() => initialState18);
            let args = { 
                updatedData: {
                    "id":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "text":"sdsdasds"
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\">sdsdasds</p>",
                       "footnotes":{
                          
                       },
                       "glossaryentries":{
                          
                       },
                       "indexEntries":{
                          
                       }
                    },
                    "versionUrn":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                    "contentUrn":"urn:pearson:entity:914eccd0-2596-471a-8b43-e5a13b0151ee",
                    "status":"wip",
                    "inputType":"AUTHORED_TEXT",
                    "inputSubType":"NA",
                    "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                    "index":"0",
                    "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                    "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                 },
                asideData:{
                    "type":"manifestlist",
                    "subtype":"decimal",
                    "id":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                    "contentUrn":"urn:pearson:entity:99167139-911b-4f44-b977-45015943941a",
                    "element":{
                       "id":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                       "contentUrn":"urn:pearson:entity:99167139-911b-4f44-b977-45015943941a",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                "contentUrn":"urn:pearson:entity:3f5cea3a-5aca-47e2-a1cf-beb741d41c89",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                         "contentUrn":"urn:pearson:entity:914eccd0-2596-471a-8b43-e5a13b0151ee",
                                         "status":"wip",
                                         "index":"0-0-1-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "index":"0-0-1-0-1-0-1",
                    "parentManifestList":{
                       "id":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                       "contentUrn":"urn:pearson:entity:99167139-911b-4f44-b977-45015943941a",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                "contentUrn":"urn:pearson:entity:3f5cea3a-5aca-47e2-a1cf-beb741d41c89",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                            "text":""
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                         },
                                         "versionUrn":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                         "contentUrn":"urn:pearson:entity:914eccd0-2596-471a-8b43-e5a13b0151ee",
                                         "status":"wip",
                                         "index":"0-0-1-0-1-0-1-0-0"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    },
                    "grandParentManifestList":{
                       "id":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "type":"manifestlist",
                       "subtype":"decimal",
                       "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                       "versionUrn":"urn:pearson:manifest:14700244-8e23-4b1c-b650-cec08340691e",
                       "contentUrn":"urn:pearson:entity:7c8b7e95-e8f1-46b6-bf1a-2be7dafa15ad",
                       "listdata":{
                          "bodymatter":[
                             {
                                "id":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "type":"manifestlistitem",
                                "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                "versionUrn":"urn:pearson:manifest:74d25ad7-28f9-4a73-a813-8a44747a403c",
                                "contentUrn":"urn:pearson:entity:4bfe02ab-bef8-4b03-ac53-0382132a5f0a",
                                "listitemdata":{
                                   "bodymatter":[
                                      {
                                         "id":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "type":"element-authoredtext",
                                         "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                         "elementdata":{
                                            "text":"asdadsad"
                                         },
                                         "html":{
                                            "text":"<p class=\"paragraphNumeroUno\" style=\"padding-left: 0px;\">asdadsad</p>",
                                            "footnotes":{
                                               
                                            },
                                            "glossaryentries":{
                                               
                                            },
                                            "indexEntries":{
                                               
                                            }
                                         },
                                         "versionUrn":"urn:pearson:work:356e254d-3cea-49e1-8b95-a8fe23913273",
                                         "contentUrn":"urn:pearson:entity:d7ed1ae3-c515-4964-9754-4410b92c4867",
                                         "status":"wip",
                                         "inputType":"AUTHORED_TEXT",
                                         "inputSubType":"NA",
                                         "slateVersionUrn":"urn:pearson:manifest:e5042835-1c9c-485d-ac89-c96a9a86473f",
                                         "index":"0",
                                         "elementParentEntityUrn":"urn:pearson:entity:04726058-a365-476c-aae6-4608b12fb5eb",
                                         "projectUrn":"urn:pearson:distributable:eb90768b-651c-4800-b8f1-f378a112e4f3"
                                      },
                                      {
                                         "id":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                                         "type":"manifestlist",
                                         "subtype":"decimal",
                                         "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                         "versionUrn":"urn:pearson:manifest:2058945f-a49f-445d-9c02-b44160917a98",
                                         "contentUrn":"urn:pearson:entity:99167139-911b-4f44-b977-45015943941a",
                                         "listdata":{
                                            "bodymatter":[
                                               {
                                                  "id":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                                  "type":"manifestlistitem",
                                                  "schema":"http://schemas.pearson.com/wip-authoring/list/1",
                                                  "versionUrn":"urn:pearson:manifest:9c734c99-6f06-4651-95e0-94cbb4ae0563",
                                                  "contentUrn":"urn:pearson:entity:3f5cea3a-5aca-47e2-a1cf-beb741d41c89",
                                                  "listitemdata":{
                                                     "bodymatter":[
                                                        {
                                                           "id":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                                           "type":"element-authoredtext",
                                                           "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                                                           "elementdata":{
                                                              "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                                                              "text":""
                                                           },
                                                           "html":{
                                                              "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                                                           },
                                                           "versionUrn":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                                                           "contentUrn":"urn:pearson:entity:914eccd0-2596-471a-8b43-e5a13b0151ee",
                                                           "status":"wip",
                                                           "index":"0-0-1-0-1-0-1-0-0"
                                                        }
                                                     ]
                                                  }
                                               }
                                            ]
                                         },
                                         "listtype":"ordered",
                                         "startNumber":1,
                                         "columnnumber":1,
                                         "iconcolor":"iconColor1",
                                         "fontstyle":"fontStyle1"
                                      }
                                   ]
                                }
                             }
                          ]
                       },
                       "listtype":"ordered",
                       "startNumber":1,
                       "columnnumber":1,
                       "iconcolor":"iconColor1",
                       "fontstyle":"fontStyle1"
                    }
                 },
                parentUrn: {},
                elementIndex: "0-0-1-0-1-0-1-0-0",
                parentElement: {
                    "id":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                    "type":"element-authoredtext",
                    "schema":"http://schemas.pearson.com/wip-authoring/element/1",
                    "elementdata":{
                       "schema":"http://schemas.pearson.com/wip-authoring/authoredtext/1#/definitions/authoredtext",
                       "text":""
                    },
                    "html":{
                       "text":"<p class=\"paragraphNumeroUno\"><br></p>"
                    },
                    "versionUrn":"urn:pearson:work:62e415a7-059d-489d-b5a5-5ddefe556662",
                    "contentUrn":"urn:pearson:entity:914eccd0-2596-471a-8b43-e5a13b0151ee",
                    "status":"wip",
                    "index":"0-0-1-0-1-0-1-0-0"
                 },
                dispatch: store.dispatch,
                newslateData: updateBL4.slateLevelData,
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })

    })
    describe("LO update methods", () => {
        config.slateManifestURN = "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd";
        let initialState3 = {
            appStore: {
                slateLevelData: metadataTestData.slateLevelData_1_MainSlate,
                oldFiguredata: null
            },
        };
        let reqPayload = {
            loData: [
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f95"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": [0]
                },
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b80"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": ["1-0"]
                },
                {
                    "elementdata": {
                        "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                    },
                    "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743d"],
                    "elementVersionType": "element-learningobjectivemapping",
                    "loIndex": ["1-2-0"]
                }
            ],
            slateVersionUrn: "urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd",
            projectUrn: "urn:dURN"
        }
        it("UpdateStoreInCanvas - updateLOInCanvasStore", async () => {
            let store = mockStore(() => initialState3);

            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateStoreInCanvas")
            updateHelpers.updateStoreInCanvas({
                updatedData: reqPayload, getState: store.getState,
                dispatch: store.dispatch,
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("Test updateMetadataAnchorLOsinStore - updateLOInStore", async () => {
            let store = mockStore(() => initialState3);
            let responseData = {
                loData: [
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f96"],
                        "loIndex": [0]
                    },
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b81"],
                        "loIndex": ["1-0"]
                    },
                    {
                        "elementdata": {
                            "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                        },
                        "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743e"],
                        "loIndex": ["1-2-0"]
                    }
                ]
            }
            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateMetadataAnchorLOsinStore")
            updateHelpers.updateMetadataAnchorLOsinStore({
                updatedData: reqPayload,
                responseData: responseData,
                getState: store.getState,
                dispatch: store.dispatch,
                currentSlateData: {
                    ...metadataTestData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"],
                    status: "wip"
                }
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("Test updateMetadataAnchorLOsinStore - updateLOInStore : else if", async () => {
         let store = mockStore(() => initialState3);
         let responseData = {
             loData: [
                 {
                     "elementdata": {
                         "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                     },
                     "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f96"],
                     "loIndex": [0]
                 },
                 {
                     "elementdata": {
                         "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                     },
                     "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b81"],
                     "loIndex": ["1-0"]
                 },
                 {
                     "elementdata": {
                         "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                     },
                     "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743e"],
                     "loIndex": ["1-2-0"]
                 }
             ]
         }
         const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateMetadataAnchorLOsinStore")
         updateHelpers.updateMetadataAnchorLOsinStore({
             updatedData: reqPayload,
             responseData: responseData,
             getState: store.getState,
             dispatch: store.dispatch,
             currentSlateData: {
                 ...metadataTestData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"],
                 status: "approved"
             }
         })
         expect(spyupdateLOInStore).toHaveBeenCalled()
         spyupdateLOInStore.mockClear()
     })
     it("Test updateMetadataAnchorLOsinStore - updateLOInStore : else if > else", async () => {
      let store = mockStore(() => initialState3);
      let responseData = {
          loData: [
              {
                  "elementdata": {
                      "loref": "urn:pearson:educationalgoal:f77c17cd-461a-447a-a592-b333eea0109f"
                  },
                  "metaDataAnchorID": ["urn:pearson:work:4d966e5e-bf9a-4672-952b-06e354796f96"],
                  "loIndex": [0]
              },
              {
                  "elementdata": {
                      "loref": "urn:pearson:educationalgoal:59169f05-96cd-4f83-acb9-fde0a6d89528"
                  },
                  "metaDataAnchorID": ["urn:pearson:work:13c99072-413a-4d59-85a2-3f4f4dce3b81"],
                  "loIndex": ["1-0"]
              },
              {
                  "elementdata": {
                      "loref": "urn:pearson:educationalgoal:ada3bee3-2e41-4c74-8817-509842cbc8b7"
                  },
                  "metaDataAnchorID": ["urn:pearson:work:77c5d6c0-fd0c-4e27-a94b-e2f39e3b743e"],
                  "loIndex": ["1-2-0"]
              }
          ]
      }
      const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateMetadataAnchorLOsinStore")
      updateHelpers.updateMetadataAnchorLOsinStore({
          updatedData: reqPayload,
          responseData: responseData,
          getState: store.getState,
          dispatch: store.dispatch,
          currentSlateData: {
              ...metadataTestData.slateLevelData_1_MainSlate["urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd"],
              status: "test"
          }
      })
      expect(spyupdateLOInStore).toHaveBeenCalled()
      spyupdateLOInStore.mockClear()
  })
        it("Test updateLOInStore function - default case ", async () => {
            const store = mockStore(() => initialState3);
            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateLOInStore")
            updateHelpers.updateLOInStore({
                oldLO_Data: {
                    loIndex: ['0-1-2-3']
                },
                newLO_Data: {},
                getState: store.getState,
                dispatch: store.dispatch,
                activeIndex: 0
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("Test updateLOInCanvasStore function - default case ", async () => {
            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateLOInCanvasStore")
            updateHelpers.updateLOInCanvasStore({
                updatedLO: {
                    loIndex: ['0-1-2-3']
                },
                _slateBodyMatter: [],
                activeIndex: 0
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("updateElementInStore - parentElement - popup", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    sectionType: "postertextobject"
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "element-aside"
                },
                elementIndex: "0-0-0-0",
                showHideType: null,
                parentElement: { type: "popup"},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentElement - showhide - poetry", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    sectionType: "postertextobject"
                },
                asideData: {
                    ...asideData,
                    showHideType: 'show',
                    type: 'poetry',
                    grandParent: {
                        asideData: {
                            id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0e"
                        }
                    }
                },
                elementIndex: "0-0-0-0",
                showHideType: 'show',
                parentElement: { type: ""},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithCitationElement.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"]
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentElement - without sectionType", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f"
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "element-aside"
                },
                elementIndex: "0-0-0-0",
                showHideType: null,
                parentElement: { type: "popup"},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - without parentElement", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: ''
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "element-aside"
                },
                elementIndex: "0-0-0-0",
                showHideType: 'show',
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - without parentElement - without elementdata", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    html: ''
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "element-aside"
                },
                elementIndex: "0-0-0-0",
                showHideType: 'show',
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentElement - showhide", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    html: '',
                    elementdata: {
                        text: ''
                    },
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "element-aside"
                },
                elementIndex: "0-0-0-0",
                showHideType: 'show',
                parentElement: {
                    type: 'showhide'
                },
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentUrn - manifest", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    sectionType: 'postertextobject'
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "manifest"
                },
                elementIndex: "0-0-0-0-0",
                showHideType: 'show',
                parentElement: {
                    type: 'popup'
                },
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentUrn - manifest - without sectionType", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: ''
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "manifest"
                },
                elementIndex: "0-0-0-0-0",
                showHideType: 'show',
                parentElement: {
                    type: 'popup'
                },
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentUrn - manifest - parentElement - showhide", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: ''
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "manifest"
                },
                elementIndex: "0-0-0-0-0",
                showHideType: 'show',
                parentElement: {
                    type: 'showhide'
                },
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - parentUrn - manifest - without parentElement", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: ''
                },
                asideData: {
                    ...asideData,
                    parent: {
                        type: 'groupedcontent'
                    }
                },
                parentUrn: {
                    elementType: "manifest"
                },
                elementIndex: "0-0-0-0-0",
                showHideType: 'show',
                parentElement: null,
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })

        it("updateElementInStore - element-citation of Citation inside showhide", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element-citation"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "show"},
                    type: "citations"
                },
                parentUrn: {
                    elementType: "showhide"
                },
                elementIndex: "0-0-0",
                showHideType: 'show',
                parentElement: {type: 'citations'},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - element-authoredtext of Citation inside showhide", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element-authoredtext"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "show"},
                    type: "citations"
                },
                parentUrn: {
                    elementType: "showhide"
                },
                elementIndex: "0-0-0",
                showHideType: 'show',
                parentElement: {type: 'citations'},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - Citation inside showhide conditional coverage", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220c",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:653fe158-8eb9-42fb-b7c0-62bfd12a6825", type: "showhide", contentUrn: "urn:pearson:entity:f81e38b1-e67a-4c2e-8dbb-ba8d7f572d2c", showHideType: "show"},
                    type: "citations"
                },
                parentUrn: {
                    elementType: "showhide"
                },
                elementIndex: "0-0-0",
                showHideType: 'show',
                parentElement: {type: 'citations'},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update elements inside body of WE inside S/H", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide"},
                    type: "element-aside",
                    subtype: 'workedexample'
                },
                parentUrn: {
                    elementType: 'manifest',
                    manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c'
                },
                elementIndex: "0-0-0-0",
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update elements inside head of WE inside S/H", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1be",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide"},
                    type: "element-aside",
                    subtype: 'workedexample'
                },
                parentUrn: {
                    elementType: 'element-authoredtext',
                    manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c'
                },
                elementIndex: "0-0-0-0",
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })

        it("updateElementInStore - update elements inside AS/WE inside S/H conditional coverage 1", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1bf",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714", showHideType: "hide"},
                    type: "element-aside",
                    subtype: 'workedexample'
                },
                parentUrn: {
                    elementType: 'element-authoredtext',
                    manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c'
                },
                elementIndex: "0-0-0-0",
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateElementInStore - update elements inside AS/WE inside S/H conditional coverage 2", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1bf",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", type: "showhide", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714"},
                    type: "element-aside",
                    subtype: 'workedexample'
                },
                parentUrn: {
                    elementType: 'element-authoredtext',
                    manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c'
                },
                elementIndex: "0-0-0-0",
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })

        it("updateElementInStore - update elements inside AS/WE inside S/H conditional coverage 3", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    id: "urn:pearson:work:8a49e877-144a-4750-92d2-81d5188d8e0b",
                    slateVersionUrn: "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f",
                    elementdata: {
                        text: ''
                    },
                    html: '',
                    type: "element"
                },
                asideData: {
                    contentUrn: "urn:pearson:entity:bda611d3-773d-4780-852b-efa14c18742f",
                    element: {id: "urn:pearson:manifest:37788369-3483-4c32-8bc9-470c965e6bbb", type: "element-aside", subtype: "workedexample", schema: "http://schemas.pearson.com/wip-authoring/element/1", designtype: "workedexample1"},
                    id: "urn:pearson:manifest:11c71298-c804-48f1-a8cc-323d107ba1bf",
                    index: "0-0-0",
                    parent: {id: "urn:pearson:manifest:80c230cd-73de-441b-80da-b93d5535fc02", contentUrn: "urn:pearson:entity:62008570-5ab8-4f2f-8ce1-e48ae80bc714"},
                    type: "element-aside",
                    subtype: 'workedexample'
                },
                parentUrn: {
                    elementType: 'element-authoredtext',
                    manifestUrn: 'urn:pearson:manifest:f0c610b8-337d-47b0-9680-83b73481289c'
                },
                elementIndex: "0-0-0-0",
                parentElement: {},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithShowhideData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
        it("updateStore - loData case", () => {
            const store = mockStore(() => initialState);
            
            const args = { 
                updatedData: {
                    ...updatedData,
                    loData: [{
                        elementdata: {
                            loref: ''
                        },
                        metaDataAnchorID: []
                    }],
                    elementVersionType: 'element-generateLOlist'
                },
                elementIndex: 0,
                parentUrn: null,
                asideData,
                showHideType: null,
                parentElement,
                currentSlateData: slateLevelData.slateLevelData["urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e"],
                responseData: { ...updatedData, id: "urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019", loData: [{
                    elementdata: {
                        loref: ''
                    }
                }]},
                fetchSlateData: jest.fn(),
                getState: store.getState,
                dispatch: store.dispatch,
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "updateStore")
            updateHelpers.updateStore(args)
            expect(spyupdateStore).toHaveBeenCalled()
            expect(spyupdateStore).toHaveReturnedWith(false);
            spyupdateStore.mockClear()
        })
        it("processAndStoreUpdatedResponse method - slateVersionUrn", () => {
            const store = mockStore(() => initialState);
            const params = {
                updatedData: {
                    id: 'urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019',
                    slateVersionUrn: 'urn:pearson:manifest:8f33291d-4b57-4fab-b890-68aa46a117bd'
                },
                elementIndex: 0,
                parentUrn: {},
                asideData: {},
                showHideType: '',
                parentElement: {},
                getState: store.getState,
                dispatch: store.dispatch,
                poetryData: {},
                updateBodymatter: {},
                responseData: {
                    id: 'urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34020'
                },
                fetchSlateData: {},
                showHideObj: {}
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            config.slateManifestURN = "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220e";
            jest.spyOn(document, 'getElementById').mockImplementation(() => {
                return {
                    innerText: "text",
                    style: {
                        display: ""
                    }
                }
            })
            updateHelpers.processAndStoreUpdatedResponse (params)
            expect(spyupdateStore).toHaveBeenCalled()
            spyupdateStore.mockClear()
        })
        it("processAndStoreUpdatedResponse method - without slateVersionUrn", () => {
            const store = mockStore(() => initialState);
            const params = {
                updatedData: {
                    id: 'urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34019'
                },
                elementIndex: 0,
                parentUrn: {},
                asideData: {},
                showHideType: '',
                parentElement: {},
                getState: store.getState,
                dispatch: store.dispatch,
                poetryData: {},
                updateBodymatter: {},
                responseData: {
                    id: 'urn:pearson:work:e4495bc8-7fd5-4d9c-bd4c-1a879ad34020'
                },
                fetchSlateData: {},
                showHideObj: {}
            }
            const spyupdateStore = jest.spyOn(updateHelpers, "processAndStoreUpdatedResponse")
            updateHelpers.processAndStoreUpdatedResponse (params)
            expect(spyupdateStore).toHaveBeenCalled()
            spyupdateStore.mockClear()
        })
        it("prepareDataForUpdateTcm - versionedData", async () => {
            let store = mockStore(() => initialState2);
            let args = {
                updatedDataID: "urn:pearson:work:123",
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                versionedData: {
                    id: 'urn:pearson:work:124'
                }
            }

            const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
            updateHelpers.prepareDataForUpdateTcm(args)
            expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
            spyprepareDataForUpdateTcm.mockClear()
        })
        it("prepareDataForUpdateTcm - versionedData - tcmData", async () => {
            const initialState4 = {
                ...initialState2, 
                tcmReducer: {
                    tcmSnapshot:[{
                        elemURN : "urn:pearson:work:123",
                        txCnt: 0,
                        feedback: null,
                        isPrevAcceptedTxAvailable: true
                    }]
                }
            }
            let store = mockStore(() => initialState4);
            let args = {
                updatedDataID: "urn:pearson:work:123",
                getState: store.getState,
                dispatch: store.dispatch,
                updatedData,
                versionedData: {
                    id: 'urn:pearson:work:123'
                }
            }

            const spyprepareDataForUpdateTcm = jest.spyOn(updateHelpers, "prepareDataForUpdateTcm")
            updateHelpers.prepareDataForUpdateTcm(args)
            expect(spyprepareDataForUpdateTcm).toHaveBeenCalled()
            spyprepareDataForUpdateTcm.mockClear()
        })
        it("UpdateStoreInCanvas - updateLOInCanvasStore - metaDataField ", async () => {
            let store = mockStore(() => initialState3);

            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateStoreInCanvas")
            updateHelpers.updateStoreInCanvas({
                updatedData: {...reqPayload, metaDataField: ''}, getState: store.getState,
                dispatch: store.dispatch, parentElement: {type: 'popup'}
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("UpdateStoreInCanvas - updateLOInCanvasStore - sectionType  ", async () => {
            let store = mockStore(() => initialState3);

            const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateStoreInCanvas")
            updateHelpers.updateStoreInCanvas({
                updatedData: {...reqPayload, sectionType: ''}, getState: store.getState,
                dispatch: store.dispatch, parentElement: {type: 'popup'}
            })
            expect(spyupdateLOInStore).toHaveBeenCalled()
            spyupdateLOInStore.mockClear()
        })
        it("UpdateStoreInCanvas - updateLOInCanvasStore - Assessment from  ", async () => {
         let store = mockStore(() => initialState);
         const spyupdateLOInStore = jest.spyOn(updateHelpers, "updateStoreInCanvas")
         updateHelpers.updateStoreInCanvas({
             getState: store.getState, dispatch: store.dispatch,
              updatedData: assessmentUpdatedData, upadtedSlateData: communicationAssessmentSlateData.getRequiredSlateData,
             isFromRC: true
         })
         expect(spyupdateLOInStore).toHaveBeenCalled()
         spyupdateLOInStore.mockClear()
     })
        it("updateElementInStore - parentElement - groupedcontent - without elementdata", () => {
            let store = mockStore(() => initialState2);
            let args = { 
                updatedData: {
                    slateVersionUrn: 'urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f'
                },
                asideData: null,
                parentUrn: null,
                elementIndex: "0-0-0",
                showHideType: null,
                parentElement: { type: "groupedcontent"},
                dispatch: store.dispatch,
                newslateData: {
                    "urn:pearson:manifest:d9023151-3417-4482-8175-fc965466220f": slateWithPopupData
                },
                autoNumberDetails : {
                    autoNumberSettingsOption: '',
                    isAutoNumberingEnabled: true
                }
            }
            const spyupdateElementInStore = jest.spyOn(updateHelpers, "updateElementInStore")
            updateHelpers.updateElementInStore(args)
            expect(spyupdateElementInStore).toHaveBeenCalled()
            spyupdateElementInStore.mockClear()
        })
       const {
          AUTO_NUMBER_SETTING_DEFAULT,
          AUTO_NUMBER_SETTING_RESUME_NUMBER,
          AUTO_NUMBER_SETTING_REMOVE_NUMBER,
          AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER
       } = LABEL_NUMBER_SETTINGS_DROPDOWN_VALUES
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER : if", () => {
          const oldElement = {
             displayedlabel: "displayedlabel",
             manualoverride: "manualoverride",
             numberedandlabel: true,
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER : else", () => {
          const oldElement = {
             manualoverride: "manualoverride",
             numberedandlabel: true,
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_OVERRIDE_LABLE_NUMBER, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_RESUME_NUMBER", () => {
          const oldElement = {
             displayedlabel: "displayedlabel"
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_RESUME_NUMBER, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_REMOVE_NUMBER : if", () => {
          const oldElement = {
             displayedlabel: "displayedlabel",
             manualoverride: "manualoverride",
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_REMOVE_NUMBER, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_REMOVE_NUMBER : else", () => {
          const oldElement = {
             numberedandlabel: false
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_REMOVE_NUMBER, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : AUTO_NUMBER_SETTING_DEFAULT", () => {
          const oldElement = {
             displayedlabel: "displayedlabel",
             manualoverride: "manualoverride",
             numberedandlabel: true,
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH(AUTO_NUMBER_SETTING_DEFAULT, oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : default : if", () => {
          const oldElement = {
             manualoverride: "manualoverride",
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH("default", oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
       it("updateFigureElement_InSH : default : else", () => {
          const oldElement = {
             numberedandlabel: true,
             displayedlabel: "displayedlabel"
          }
          const displayedlabel = updatedData.displayedlabel
          const manualoverride = updatedData.manualoverride
          const spyupdateFigureElement_InSH = jest.spyOn(updateHelpers, 'updateFigureElement_InSH')
          updateHelpers.updateFigureElement_InSH("default", oldElement, { displayedlabel, manualoverride });
          expect(spyupdateFigureElement_InSH).toHaveBeenCalled();
          spyupdateFigureElement_InSH.mockClear()
       })
    })
})