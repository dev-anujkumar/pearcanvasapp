import { projectInfo } from "../../src/appstore/projectInfoReducer";
import { UPDATE_LOB_PERMISSIONS, SET_PROJECT_SHARING_ROLE, SET_PROJECT_SUBSCRIPTION_DETAILS, OWNERS_SUBSCRIBED_SLATE, PROJECT_LOB_LIST, NO_DISCUSSION_ITEMS, UPDATE_PROJECT_INFO, UPDATE_USAGE_TYPE, UPDATE_DISCUSSION_ITEMS, UPDATE_LOB_WORKFLOW, BANNER_IS_VISIBLE, SUBSCRIBERS_SUBSCRIBED_SLATE, SET_TOC_SLATE_LABEL } from "../../src/constants/Action_Constants";

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
    isOwnerKeyExist: false,
    LOBList:[],
    showDiscussionLOBDropdown: false,
    isBannerVisible: false,
    isSubscribersSubscribedSlateChecked: true,
    isSubscriberKeyExist: false,
}

describe("Testing LOB permissions", () => {

    it('should return the initial state', () => {
        expect(projectInfo(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
    });
    it(' UPDATE_PROJECT_INFO', () => {
        let output = {
            ...INITIAL_STATE,
        }
        expect(projectInfo(INITIAL_STATE, {
            type:  UPDATE_PROJECT_INFO 
        })).toEqual(output)
    });
    it('UPDATE_USAGE_TYPE', () => {
        let output = {
            ...INITIAL_STATE,   
            usageType: 'OWNER'
        }
        let owner = "OWNER";
        expect(projectInfo(INITIAL_STATE, {
            type: UPDATE_USAGE_TYPE,
            payload: owner
        })).toEqual(output)
    });
    it('UPDATE_DISCUSSION_ITEMS', () => {
        let output = {
            ...INITIAL_STATE,   
            discussionItems: 'OWNER'
        }
        let owner = "OWNER";
        expect(projectInfo(INITIAL_STATE, {
            type: UPDATE_DISCUSSION_ITEMS,
            payload: owner
        })).toEqual(output)
    });
    it(' UPDATE_LOB_WORKFLOW', () => {
        let output = {
            ...INITIAL_STATE,   
            workflowRole: 'OWNER'
        }
        let owner = "OWNER";
        expect(projectInfo(INITIAL_STATE, {
            type:  UPDATE_LOB_WORKFLOW,
            payload: owner
        })).toEqual(output)
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
    it('SUBSCRIBERS_SUBSCRIBED_SLATE', () => {
        let isSubscribersSubscribedSlateChecked = true
        let output = {
            ...INITIAL_STATE,
            isSubscribersSubscribedSlateChecked: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: SUBSCRIBERS_SUBSCRIBED_SLATE,
            payload:
            isSubscribersSubscribedSlateChecked
        })).toEqual(output)
    });
    it('BANNER_IS_VISIBLE', () => {
        let isBannerVisible = true
        let output = {
            ...INITIAL_STATE,
            isBannerVisible: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: BANNER_IS_VISIBLE,
            payload:
            isBannerVisible

        })).toEqual(output)
    });
    it('SET_TOC_SLATE_LABEL', () => {
        let slateTocLabel = true
        let output = {
            ...INITIAL_STATE,
            slateTocLabel: true
        }
        expect(projectInfo(INITIAL_STATE, {
            type: SET_TOC_SLATE_LABEL,
            payload:
            slateTocLabel

        })).toEqual(output)
    });
})