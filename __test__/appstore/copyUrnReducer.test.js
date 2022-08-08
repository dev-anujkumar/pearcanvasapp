import {selectionReducer} from '../../src/appstore/copyUrnReducer';
import { SET_SELECTION } from "../../src/constants/Action_Constants";

const INITIAL_STATE = {
    selection: {}
};
const Copy = {
    selection: {
        selectionReducer: {
            selection: {
              activeAnimation: true,
              deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
              element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
              inputSubType: "NA",
              inputType: "AUTHORED_TEXT",
              operationType: "copy",
              sourceElementIndex: 2,
              sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
              sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
          },
        },
      },
    }

const INITIAL_ACTION = {
    type: '',
    payload: {}
}
describe("Testing LOB permissions", () => {
    it('should return the initial state', () => {
        expect(selectionReducer(INITIAL_STATE, {
        })).toEqual(INITIAL_STATE);
    });
    it('SET_SELECTION', () => {
        let output = {
            ...INITIAL_STATE,
            selection: {
            selection: {
            selectionReducer: {
                selection: {
                  activeAnimation: true,
                  deleteElm: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", parentUrn: undefined, asideData: undefined, contentUrn: "urn:pearson:entity:da9f3f72-2cc7-4567-8fb9-9a887c360979"},
                  element: {id: "urn:pearson:work:2b71e769-6e07-4776-ad94-13bedb5fff62", type: "element-authoredtext", schema: "http://schemas.pearson.com/wip-authoring/element/1"},
                  inputSubType: "NA",
                  inputType: "AUTHORED_TEXT",
                  operationType: "copy",
                  sourceElementIndex: 2,
                  sourceSlateEntityUrn: "urn:pearson:entity:d68e34b0-0bd9-4e8b-9935-e9f0ff83d1fb",
                  sourceSlateManifestUrn: "urn:pearson:manifest:e30674d0-f7b1-4974-833f-5f2e19a9fea6"
              },
            },
          },
        }
        }
        expect(selectionReducer(INITIAL_STATE, {
            type: SET_SELECTION,
            payload: Copy
        })).toEqual(output)
    });
});
