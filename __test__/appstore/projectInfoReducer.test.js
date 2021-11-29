import { projectInfo } from "../../src/appstore/projectInfoReducer";
import { UPDATE_LOB_PERMISSIONS, SET_PROJECT_SHARING_ROLE, SET_PROJECT_SUBSCRIPTION_DETAILS, OWNERS_SUBSCRIBED_SLATE } from "../../src/constants/Action_Constants";

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