import  projectInfoReducer  from "../../src/appstore/projectInfoReducer";
import { UPDATE_LOB_PERMISSIONS } from "../../src/constants/Action_Constants";

const INITIAL_STATE = {
    usageType: [],
    discussionItems: [],
    showPlayscript: true,
    showDiscussion: true
}

describe("Testing LOB permissions", () => {

    it('should return the initial state', () => {
        expect(projectInfoReducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('set showPlayscript true', () => {
        expect(projectInfoReducer(INITIAL_STATE, {
            type: UPDATE_LOB_PERMISSIONS,
            payload: {
                playscript: true,
                discussion: true
            }
        })).toEqual({
            usageType: [],
            discussionItems: [],
            showPlayscript: true,
            showDiscussion: true
        })
    })

    it('set showPlayscript false', () => {
        expect(projectInfoReducer(INITIAL_STATE, {
            type: UPDATE_LOB_PERMISSIONS,
            payload: {
                playscript: false,
                discussion: true
            }
        })).toEqual({
            usageType: [],
            discussionItems: [],
            showPlayscript: false,
            showDiscussion: true
        })
    })

    it('set showDiscussion true', () => {
        expect(projectInfoReducer(INITIAL_STATE, {
            type: UPDATE_LOB_PERMISSIONS,
            payload: {
                playscript: false,
                discussion: true
            }
        })).toEqual({
            usageType: [],
            discussionItems: [],
            showPlayscript: false,
            showDiscussion: true
        })
    })

    it('set showDiscussion false', () => {
        expect(projectInfoReducer(INITIAL_STATE, {
            type: UPDATE_LOB_PERMISSIONS,
            payload: {
                playscript: false,
                discussion: false
            }
        })).toEqual({
            usageType: [],
            discussionItems: [],
            showPlayscript: false,
            showDiscussion: false
        })
    })
})