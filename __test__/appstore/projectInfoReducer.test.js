import { projectInfo } from "../../src/appstore/projectInfoReducer";
import { UPDATE_LOB_PERMISSIONS, SET_PROJECT_SHARING_ROLE, SET_PROJECT_SUBSCRIPTION_DETAILS, OWNERS_SUBSCRIBED_SLATE, PROJECT_LOB_LIST, NO_DISCUSSION_ITEMS } from "../../src/constants/Action_Constants";

const INITIAL_STATE = {
    usageType: [],
    discussionItems: [],
    showPlayscript: true,
    showDiscussion: true,
    projectSharingRole: '',
    projectSubscriptionDetails: {
        isSubscribed: false,
        owner: {}
    },
    isOwnersSubscribedSlateChecked: true,
    LOBList:[],
    showDiscussionLOBDropdown: false
}

describe("Testing LOB permissions", () => {

    it('should return the initial state', () => {
        expect(projectInfo(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });

    it('UPDATE_LOB_PERMISSIONS', () => {
        let output = {
            ...INITIAL_STATE,
            showPlayscript: true,
            showDiscussion: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: UPDATE_LOB_PERMISSIONS,
            payload: {
                playscript: true,
                discussion: true
            }
        })).toEqual(output)
    });

    it('PROJECT_LOB_LIST', () => {
        let LOBList = ['test']
        let output = {
            ...INITIAL_STATE,
            LOBList: ['test']
        }
        expect(projectInfo(INITIAL_STATE, {
            type: PROJECT_LOB_LIST,
            payload: LOBList

        })).toEqual(output)
    });

    it('NO_DISCUSSION_ITEMS', () => {
        let showDiscussionLOBDropdown = true
        let output = {
            ...INITIAL_STATE,
            showDiscussionLOBDropdown: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: NO_DISCUSSION_ITEMS,
            payload: showDiscussionLOBDropdown

        })).toEqual(output)
    });

    it('SET_PROJECT_SHARING_ROLE', () => {
        let output = {
            ...INITIAL_STATE,
            projectSharingRole: 'OWNER'
        }
        let owner = "OWNER";
        expect(projectInfo(INITIAL_STATE, {
            type: SET_PROJECT_SHARING_ROLE,
            payload: owner
        })).toEqual(output)
    });
    it('SET_PROJECT_SUBSCRIPTION_DETAILS', () => {
        let projectSubscriptionDetails = {
            isSubscribed: true,
            owner: {}
        }
        let output = {
            ...INITIAL_STATE,
            projectSubscriptionDetails: {
                isSubscribed: true,
                owner: {}
            }
        }
        expect(projectInfo(INITIAL_STATE, {
            type: SET_PROJECT_SUBSCRIPTION_DETAILS,
            payload: projectSubscriptionDetails
        })).toEqual(output)
    });
    it('OWNERS_SUBSCRIBED_SLATE', () => {
        let isOwnersSubscribedSlateChecked = true
        let output = {
            ...INITIAL_STATE,
            isOwnersSubscribedSlateChecked: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: OWNERS_SUBSCRIBED_SLATE,
            payload:
                isOwnersSubscribedSlateChecked

        })).toEqual(output)
    });
})